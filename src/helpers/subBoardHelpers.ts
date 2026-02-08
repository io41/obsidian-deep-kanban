import { TFile, TFolder } from 'obsidian';
import { StateManager } from '../StateManager';
import { BoardModifiers } from './boardModifiers';
import { Item } from '../components/types';
import { Path } from '../dnd/types';
import { frontmatterKey } from '../parsers/common';

const illegalCharsRegEx = /[\\/:"*?<>|]+/g;
const embedRegEx = /!?\[\[([^\]]*)\.[^\]]+\]\]/g;
const wikilinkRegEx = /!?\[\[([^\]]*)\]\]/g;
const mdLinkRegEx = /!?\[([^\]]*)\]\([^)]*\)/g;
const tagRegEx = /#([^\u2000-\u206F\u2E00-\u2E7F'!"#$%&()*+,.:;<=>?@^`{|}~[\]\\\s\n\r]+)/g;
const condenceWhiteSpaceRE = /\s+/g;

/**
 * Create a new sub-board from a card
 */
export async function createSubBoard(
  stateManager: StateManager,
  boardModifiers: BoardModifiers,
  item: Item,
  path: Path
): Promise<TFile | null> {
  const app = stateManager.app;

  // Extract title from card content (first line, cleaned up)
  const prevTitle = item.data.titleRaw.split('\n')[0].trim();
  const sanitizedTitle = prevTitle
    .replace(embedRegEx, '$1')
    .replace(wikilinkRegEx, '$1')
    .replace(mdLinkRegEx, '$1')
    .replace(tagRegEx, '$1')
    .replace(illegalCharsRegEx, ' ')
    .trim()
    .replace(condenceWhiteSpaceRE, ' ')
    .slice(0, 100) // Limit filename length
    || 'Untitled Sub-board';

  // Determine target folder
  const newNoteFolder = stateManager.getSetting('new-note-folder');
  const targetFolder = newNoteFolder
    ? (app.vault.getAbstractFileByPath(newNoteFolder as string) as TFolder)
    : app.fileManager.getNewFileParent(stateManager.file.path);

  try {
    // Create the new kanban file
    const newFile = (await (app.fileManager as any).createNewMarkdownFile(
      targetFolder,
      sanitizedTitle
    )) as TFile;

    // Build the initial content with frontmatter including parent reference
    const parentPath = stateManager.file.path;
    const frontmatter = [
      '---',
      '',
      `${frontmatterKey}: board`,
      `kanban-parent-boards:`,
      `  - "${parentPath}"`,
      '',
      '---',
      '',
      '## To Do',
      '',
      '- [ ] ',
      '',
      '',
    ].join('\n');

    await app.vault.modify(newFile, frontmatter);

    // Generate link to the new file - use the sanitized title as display text
    const link = app.fileManager.generateMarkdownLink(newFile, stateManager.file.path);

    // Replace the card content with just the link to the sub-board
    boardModifiers.updateItem(path, stateManager.updateItemContent(item, link));

    // Open the new sub-board in a split pane with kanban view
    const newLeaf = app.workspace.splitActiveLeaf();
    await newLeaf.setViewState({
      type: 'kanban',
      state: { file: newFile.path },
    });
    app.workspace.setActiveLeaf(newLeaf, false, true);

    return newFile;
  } catch (error) {
    console.error('Error creating sub-board:', error);
    return null;
  }
}

/**
 * Add a parent reference to an existing sub-board's frontmatter
 */
export async function addParentReference(
  app: any,
  subBoardFile: TFile,
  parentPath: string
): Promise<void> {
  try {
    await app.fileManager.processFrontMatter(subBoardFile, (frontmatter: any) => {
      const existingParents = frontmatter['kanban-parent-boards'] || [];
      const parentSet = new Set(
        Array.isArray(existingParents) ? existingParents : [existingParents]
      );
      parentSet.add(parentPath);
      frontmatter['kanban-parent-boards'] = Array.from(parentSet);
    });
  } catch (error) {
    console.error('Error adding parent reference:', error);
  }
}

/**
 * Open a sub-board file
 */
export function openSubBoard(
  stateManager: StateManager,
  filePath: string,
  sourcePath: string
): void {
  stateManager.app.workspace.openLinkText(filePath, sourcePath, false);
}
