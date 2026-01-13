import { insertBlankLine } from '@codemirror/commands';
import { EditorSelection, Extension, Prec } from '@codemirror/state';
import { EditorView, ViewUpdate, keymap, placeholder as placeholderExt } from '@codemirror/view';
import classcat from 'classcat';
import { EditorPosition, Editor as ObsidianEditor, Platform } from 'obsidian';
import { MutableRefObject, useContext, useEffect, useRef } from 'preact/compat';
import { KanbanView } from 'src/KanbanView';
import { StateManager } from 'src/StateManager';
import { t } from 'src/lang/helpers';

import { KanbanContext } from '../context';
import { c, noop } from '../helpers';
import { EditState, isEditing } from '../types';
import { datePlugins, stateManagerField } from './dateWidget';
import { matchDateTrigger, matchTimeTrigger } from './suggest';

interface MarkdownEditorProps {
  editorRef?: MutableRefObject<EditorView>;
  editState?: EditState;
  onEnter: (cm: EditorView, mod: boolean, shift: boolean) => boolean;
  onEscape: (cm: EditorView) => void;
  onSubmit: (cm: EditorView) => void;
  onPaste?: (e: ClipboardEvent, cm: EditorView) => void;
  onChange?: (update: ViewUpdate) => void;
  value?: string;
  className: string;
  placeholder?: string;
}

export function allowNewLine(stateManager: StateManager, mod: boolean, shift: boolean) {
  return stateManager.getSetting('new-line-trigger') === 'enter' ? !(mod || shift) : mod || shift;
}

function getEditorAppProxy(view: KanbanView) {
  return new Proxy(view.app, {
    get(target, prop, reveiver) {
      if (prop === 'vault') {
        return new Proxy(view.app.vault, {
          get(target, prop, reveiver) {
            if (prop === 'config') {
              return new Proxy((view.app.vault as any).config, {
                get(target, prop, reveiver) {
                  if (['showLineNumber', 'foldHeading', 'foldIndent'].includes(prop as string)) {
                    return false;
                  }
                  return Reflect.get(target, prop, reveiver);
                },
              });
            }
            return Reflect.get(target, prop, reveiver);
          },
        });
      }
      return Reflect.get(target, prop, reveiver);
    },
  });
}

function getMarkdownController(
  view: KanbanView,
  getEditor: () => ObsidianEditor,
  onSave?: () => void
): Record<any, any> {
  return {
    app: view.app,
    showSearch: noop,
    toggleMode: noop,
    onMarkdownScroll: noop,
    getMode: () => 'source',
    scroll: 0,
    editMode: null,
    get editor() {
      return getEditor();
    },
    get file() {
      return view.file;
    },
    get path() {
      return view.file.path;
    },
    // Handle vim :w and other save triggers
    save() {
      if (onSave) onSave();
    },
    requestSave() {
      if (onSave) onSave();
    },
  };
}

function setInsertMode(cm: EditorView) {
  const vim = getVimPlugin(cm);
  if (vim) {
    (window as any).CodeMirrorAdapter?.Vim?.enterInsertMode(vim);
  }
}

function getVimPlugin(cm: EditorView): string {
  return (cm as any)?.plugins?.find((p: any) => {
    if (!p?.value) return false;
    return 'useNextTextInput' in p.value && 'waitForCopy' in p.value;
  })?.value?.cm;
}

export function MarkdownEditor({
  editorRef,
  onEnter,
  onEscape,
  onChange,
  onPaste,
  className,
  onSubmit,
  editState,
  value,
  placeholder,
}: MarkdownEditorProps) {
  const { view, stateManager } = useContext(KanbanContext);
  const elRef = useRef<HTMLDivElement>();
  const internalRef = useRef<EditorView>();

  useEffect(() => {
    class Editor extends view.plugin.MarkdownEditor {
      isKanbanEditor = true;

      showTasksPluginAutoSuggest(
        cursor: EditorPosition,
        editor: ObsidianEditor,
        lineHasGlobalFilter: boolean
      ) {
        if (matchTimeTrigger(stateManager.getSetting('time-trigger'), editor, cursor)) return false;
        if (matchDateTrigger(stateManager.getSetting('date-trigger'), editor, cursor)) return false;
        if (lineHasGlobalFilter && cursor.line === 0) return true;
        return undefined;
      }

      updateBottomPadding() {}
      onUpdate(update: ViewUpdate, changed: boolean) {
        super.onUpdate(update, changed);
        onChange && onChange(update);
      }
      buildLocalExtensions(): Extension[] {
        const extensions = super.buildLocalExtensions();

        extensions.push(stateManagerField.init(() => stateManager));
        extensions.push(datePlugins);
        extensions.push(
          Prec.highest(
            EditorView.domEventHandlers({
              focus: (evt) => {
                view.activeEditor = this.owner;
                if (Platform.isMobile) {
                  view.contentEl.addClass('is-mobile-editing');
                }

                evt.win.setTimeout(() => {
                  this.app.workspace.activeEditor = this.owner;
                  if (Platform.isMobile) {
                    this.app.mobileToolbar.update();
                  }
                });
                return true;
              },
              blur: () => {
                (this.cm as any)._contextMenuOpen = false;
                if (Platform.isMobile) {
                  view.contentEl.removeClass('is-mobile-editing');
                  this.app.mobileToolbar.update();
                }
                return true;
              },
              contextmenu: () => {
                // Track when context menu opens (e.g., for spell check suggestions)
                (this.cm as any)._contextMenuOpen = true;
                return false;
              },
              click: () => {
                // Context menu dismissed on click
                (this.cm as any)._contextMenuOpen = false;
                return false;
              },
              keydown: (evt) => {
                // Stop arrow key events from propagating to Obsidian's workspace navigation
                if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(evt.key)) {
                  evt.stopPropagation();
                }
                return false;
              },
            })
          )
        );

        if (placeholder) extensions.push(placeholderExt(placeholder));
        if (onPaste) {
          extensions.push(
            Prec.high(
              EditorView.domEventHandlers({
                paste: onPaste,
              })
            )
          );
        }

        const makeEnterHandler = (mod: boolean, shift: boolean) => (cm: EditorView) => {
          // If context menu is open (e.g., spell check), let the browser handle Enter
          if ((cm as any)._contextMenuOpen) {
            (cm as any)._contextMenuOpen = false;
            return false;
          }
          const didRun = onEnter(cm, mod, shift);
          if (didRun) return true;
          if (this.app.vault.getConfig('smartIndentList')) {
            this.editor.newlineAndIndentContinueMarkdownList();
          } else {
            insertBlankLine(cm as any);
          }
          return true;
        };

        extensions.push(
          Prec.highest(
            keymap.of([
              {
                key: 'Enter',
                run: makeEnterHandler(false, false),
                shift: makeEnterHandler(false, true),
              },
              {
                key: 'Mod-Enter',
                run: makeEnterHandler(true, false),
                shift: makeEnterHandler(true, true),
              },
              {
                key: 'Escape',
                run: (cm) => {
                  (cm as any)._contextMenuOpen = false;
                  onEscape(cm);
                  return false;
                },
                preventDefault: true,
              },
              {
                // Cmd+S / Ctrl+S saves the card (for vim users and general UX)
                key: 'Mod-s',
                run: (cm) => {
                  onSubmit(cm);
                  return true;
                },
                preventDefault: true,
              },
              {
                // Cmd+K / Ctrl+K creates a markdown link from selection
                key: 'Mod-k',
                run: (cm) => {
                  const selection = cm.state.selection.main;
                  const selectedText = cm.state.sliceDoc(selection.from, selection.to);
                  const linkText = selectedText || 'link text';
                  const newText = `[${linkText}]()`;
                  // Position cursor inside the parentheses
                  const cursorPos = selection.from + linkText.length + 3;
                  cm.dispatch({
                    changes: { from: selection.from, to: selection.to, insert: newText },
                    selection: EditorSelection.cursor(cursorPos),
                  });
                  return true;
                },
                preventDefault: true,
              },
              {
                // Cmd+L / Ctrl+L toggles checkbox status (cycle through states) (#668)
                key: 'Mod-l',
                run: (cm) => {
                  const line = cm.state.doc.lineAt(cm.state.selection.main.head);
                  const lineText = line.text;
                  // Match checkbox pattern: optional leading whitespace, -, optional whitespace, [char]
                  const checkboxMatch = lineText.match(/^(\s*-\s*)\[(.)\]/);
                  if (checkboxMatch) {
                    const prefix = checkboxMatch[1];
                    const currentChar = checkboxMatch[2];
                    // Cycle: space -> x -> - -> space
                    let newChar: string;
                    if (currentChar === ' ') newChar = 'x';
                    else if (currentChar === 'x') newChar = '-';
                    else newChar = ' ';
                    const newText = `${prefix}[${newChar}]${lineText.slice(checkboxMatch[0].length)}`;
                    cm.dispatch({
                      changes: { from: line.from, to: line.to, insert: newText },
                    });
                  } else {
                    // No checkbox found, add one at the start of the line (after any whitespace)
                    const leadingWhitespace = lineText.match(/^(\s*)/)?.[1] || '';
                    const restOfLine = lineText.slice(leadingWhitespace.length);
                    // If line already starts with -, replace it with checkbox
                    if (restOfLine.startsWith('- ')) {
                      const newText = `${leadingWhitespace}- [ ] ${restOfLine.slice(2)}`;
                      cm.dispatch({
                        changes: { from: line.from, to: line.to, insert: newText },
                      });
                    } else if (restOfLine.startsWith('-')) {
                      const newText = `${leadingWhitespace}- [ ] ${restOfLine.slice(1).trimStart()}`;
                      cm.dispatch({
                        changes: { from: line.from, to: line.to, insert: newText },
                      });
                    } else {
                      // Add checkbox to plain text
                      const newText = `${leadingWhitespace}- [ ] ${restOfLine}`;
                      cm.dispatch({
                        changes: { from: line.from, to: line.to, insert: newText },
                      });
                    }
                  }
                  return true;
                },
                preventDefault: true,
              },
            ])
          )
        );

        return extensions;
      }
    }

    const controller = getMarkdownController(
      view,
      () => editor.editor,
      // onSave callback for vim :w and Cmd+S
      () => {
        if (internalRef.current) onSubmit(internalRef.current);
      }
    );
    const app = getEditorAppProxy(view);
    const editor = view.plugin.addChild(new (Editor as any)(app, elRef.current, controller));
    const cm: EditorView = editor.cm;

    internalRef.current = cm;
    if (editorRef) editorRef.current = cm;

    controller.editMode = editor;
    editor.set(value || '');
    if (isEditing(editState)) {
      // Delay posAtCoords until after the DOM has settled to avoid
      // CodeMirror "Measure loop restarted more than 5 times" errors
      cm.dom.win.requestAnimationFrame(() => {
        if (!internalRef.current) return; // Editor was unmounted
        try {
          cm.dispatch({
            userEvent: 'select.pointer',
            selection: EditorSelection.single(cm.posAtCoords(editState, false)),
          });
        } catch (e) {
          // Fall back to end of document if posAtCoords fails
          cm.dispatch({
            userEvent: 'select.pointer',
            selection: EditorSelection.cursor(cm.state.doc.length),
          });
        }
        setInsertMode(cm);
      });
    }

    const onShow = () => {
      elRef.current.scrollIntoView({ block: 'end' });
    };

    if (Platform.isMobile) {
      cm.dom.win.addEventListener('keyboardDidShow', onShow);
    }

    return () => {
      // Blur the editor to release focus and keyboard control
      if (cm.hasFocus) {
        cm.contentDOM.blur();
      }

      // Clear activeEditor on all platforms to prevent keyboard shortcut blocking
      if (view.activeEditor === controller) {
        view.activeEditor = null;
      }

      if (app.workspace.activeEditor === controller) {
        app.workspace.activeEditor = null;
      }

      if (Platform.isMobile) {
        cm.dom.win.removeEventListener('keyboardDidShow', onShow);
        (app as any).mobileToolbar.update();
        view.contentEl.removeClass('is-mobile-editing');
      }

      view.plugin.removeChild(editor);
      internalRef.current = null;
      if (editorRef) editorRef.current = null;
    };
  }, []);

  const cls = ['cm-table-widget'];
  if (className) cls.push(className);

  return (
    <>
      <div className={classcat(cls)} ref={elRef}></div>
      {Platform.isMobile && (
        <button
          onPointerUp={() => onSubmit(internalRef.current)}
          className={classcat([c('item-submit-button'), 'mod-cta'])}
        >
          {t('Submit')}
        </button>
      )}
    </>
  );
}
