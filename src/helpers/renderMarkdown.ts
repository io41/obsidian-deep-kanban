import { Keymap, Menu } from 'obsidian';
import { KanbanView } from 'src/KanbanView';

const noBreakSpace = /\u00A0/g;

interface NormalizedPath {
  root: string;
  subpath: string;
  alias: string;
}

export function getNormalizedPath(path: string): NormalizedPath {
  const stripped = path.replace(noBreakSpace, ' ').normalize('NFC');

  // split on first occurance of '|'
  // "root#subpath##subsubpath|alias with |# chars"
  //             0            ^        1
  const splitOnAlias = stripped.split(/\|(.*)/);

  // split on first occurance of '#' (in substring)
  // "root#subpath##subsubpath"
  //   0  ^        1
  const splitOnHash = splitOnAlias[0].split(/#(.*)/);

  return {
    root: splitOnHash[0],
    subpath: splitOnHash[1] ? '#' + splitOnHash[1] : '',
    alias: splitOnAlias[1] || '',
  };
}

export function applyCheckboxIndexes(dom: HTMLElement) {
  const checkboxes = dom.querySelectorAll('.task-list-item-checkbox');

  checkboxes.forEach((el, i) => {
    (el as HTMLElement).dataset.checkboxIndex = i.toString();
  });
}

export function bindMarkdownEvents(view: KanbanView) {
  const { contentEl, app } = view;

  // Track touch movement to prevent link activation during scroll
  let touchStartPos: { x: number; y: number } | null = null;
  let touchMoved = false;
  const TOUCH_MOVE_THRESHOLD = 10; // pixels

  contentEl.addEventListener(
    'touchstart',
    (evt: TouchEvent) => {
      if (evt.touches.length === 1) {
        touchStartPos = { x: evt.touches[0].clientX, y: evt.touches[0].clientY };
        touchMoved = false;
      }
    },
    { passive: true }
  );

  contentEl.addEventListener(
    'touchmove',
    (evt: TouchEvent) => {
      if (touchStartPos && evt.touches.length === 1) {
        const dx = Math.abs(evt.touches[0].clientX - touchStartPos.x);
        const dy = Math.abs(evt.touches[0].clientY - touchStartPos.y);
        if (dx > TOUCH_MOVE_THRESHOLD || dy > TOUCH_MOVE_THRESHOLD) {
          touchMoved = true;
        }
      }
    },
    { passive: true }
  );

  contentEl.addEventListener(
    'touchend',
    () => {
      // Reset after a short delay to allow click event to check touchMoved
      setTimeout(() => {
        touchStartPos = null;
        touchMoved = false;
      }, 100);
    },
    { passive: true }
  );

  const parseLink = (el: HTMLElement) => {
    const href = el.getAttr('data-href') || el.getAttr('href');
    if (!href) return null;

    return {
      href,
      displayText: el.getText().trim(),
    };
  };

  const onLinkClick = (evt: MouseEvent, targetEl: HTMLElement) => {
    if (evt.button !== 0 && evt.button !== 1) return;

    // Don't activate link if touch was a scroll gesture
    if (touchMoved) {
      evt.preventDefault();
      evt.stopPropagation();
      return;
    }

    const link = parseLink(targetEl);
    if (!link) return;

    evt.preventDefault();
    evt.stopPropagation();
    app.workspace.openLinkText(link.href, view.file.path, Keymap.isModEvent(evt));
  };

  contentEl.on('click', 'a.internal-link', onLinkClick);
  contentEl.on('auxclick', 'a.internal-link', onLinkClick);
  contentEl.on('dragstart', 'a.internal-link', (evt: DragEvent) => {
    evt.preventDefault();
  });
  contentEl.on('contextmenu', 'a.internal-link', (evt: PointerEvent, targetEl: HTMLElement) => {
    const link = parseLink(targetEl);
    if (!link) return;

    const menu = new Menu();
    (menu as any).addSections(['title', 'open', 'action', 'view', 'info', '', 'danger']);
    (app.workspace as any).handleLinkContextMenu(menu, link.href, view.file.path);
    menu.showAtMouseEvent(evt);
  });
  contentEl.on('mouseover', 'a.internal-link', (evt: MouseEvent, targetEl: HTMLElement) => {
    const link = parseLink(targetEl);
    if (!link) return;
    app.workspace.trigger('hover-link', {
      event: evt,
      source: 'preview',
      hoverParent: view,
      targetEl,
      linktext: link.href,
      sourcePath: view.file.path,
    });
  });
  contentEl.on('click', 'a.external-link', (evt: MouseEvent, targetEl: HTMLElement) => {
    // Don't activate link if touch was a scroll gesture
    if (touchMoved) {
      evt.preventDefault();
      evt.stopPropagation();
      return;
    }

    const link = parseLink(targetEl);
    if (!link) return;

    evt.preventDefault();

    if (!link.href || link.href.contains(' ')) return;
    try {
      new URL(link.href);
    } catch (e) {
      return;
    }

    const paneType = Keymap.isModEvent(evt);
    const clickTarget = typeof paneType === 'boolean' ? '' : paneType;
    window.open(link.href, clickTarget);
  });
  contentEl.on('contextmenu', 'a.external-link', (evt: PointerEvent, targetEl: HTMLElement) => {
    const link = parseLink(targetEl);
    if (!link) return;

    const menu = new Menu();
    (menu as any).addSections([
      'title',
      'open',
      'selection',
      'clipboard',
      'action',
      'view',
      'info',
      '',
      'danger',
    ]);
    (app.workspace as any).handleExternalLinkContextMenu(menu, link.href);
    menu.showAtMouseEvent(evt);
  });
  contentEl.on('click', 'a.tag', (evt: MouseEvent, targetEl: HTMLElement) => {
    if (evt.button !== 0) return;

    const tag = targetEl.getText();
    const searchPlugin = (app as any).internalPlugins.getPluginById('global-search');
    const stateManager = view.plugin.getStateManager(view.file);
    const tagAction = stateManager.getSetting('tag-action');

    if (tagAction === 'kanban') {
      view.emitter.emit('hotkey', { commandId: 'editor:open-search', data: tag });
    } else if (searchPlugin) {
      searchPlugin.instance.openGlobalSearch(`tag:${tag}`);
    }
  });
}
