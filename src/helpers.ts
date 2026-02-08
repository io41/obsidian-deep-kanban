import { App, Modal, TFile } from 'obsidian';
import { getDailyNoteSettings, getDateFromFile } from 'obsidian-daily-notes-interface';

import { frontmatterKey } from './parsers/common';
import { t } from './lang/helpers';

export function gotoNextDailyNote(app: App, file: TFile) {
  const date = getDateFromFile(file as any, 'day');

  if (!date || !date.isValid()) {
    return;
  }

  const dailyNotePlugin = (app as any).internalPlugins.plugins['daily-notes'].instance;

  dailyNotePlugin.gotoNextExisting(date);
}

export function gotoPrevDailyNote(app: App, file: TFile) {
  const date = getDateFromFile(file as any, 'day');

  if (!date || !date.isValid()) {
    return;
  }

  const dailyNotePlugin = (app as any).internalPlugins.plugins['daily-notes'].instance;

  dailyNotePlugin.gotoPreviousExisting(date);
}

// Encode path for markdown links - only encode characters that break link syntax
function encodeMarkdownLinkPath(path: string): string {
  // Only encode parentheses which would break markdown link syntax
  // Spaces and other characters work fine in Obsidian markdown links
  return path.replace(/\(/g, '%28').replace(/\)/g, '%29');
}

export function buildLinkToDailyNote(app: App, dateStr: string) {
  const dailyNoteSettings = getDailyNoteSettings();
  const shouldUseMarkdownLinks = !!(app.vault as any).getConfig('useMarkdownLinks');

  if (shouldUseMarkdownLinks) {
    const folder = dailyNoteSettings.folder
      ? `${encodeMarkdownLinkPath(dailyNoteSettings.folder)}/`
      : '';
    return `[${dateStr}](${folder}${encodeMarkdownLinkPath(dateStr)}.md)`;
  }

  return `[[${dateStr}]]`;
}

export function hasFrontmatterKeyRaw(data: string) {
  if (!data) return false;

  const match = data.match(/---\s+([\w\W]+?)\s+---/);

  if (!match) {
    return false;
  }

  if (!match[1].contains(frontmatterKey)) {
    return false;
  }

  return true;
}

export function hasFrontmatterKey(file: TFile) {
  if (!file) return false;
  const cache = app.metadataCache.getFileCache(file);
  return !!cache?.frontmatter?.[frontmatterKey];
}

export function laneTitleWithMaxItems(title: string, maxItems?: number) {
  if (!maxItems) return title;
  return `${title} (${maxItems})`;
}

/**
 * Checks if a file contains content that would be lost when converting to kanban format.
 * Kanban only preserves headings (lanes), list items (cards), and frontmatter.
 * Tables, images, code blocks, and other content would be deleted.
 */
export async function hasNonKanbanContent(app: App, file: TFile): Promise<boolean> {
  const content = await app.vault.read(file);

  // Remove frontmatter from analysis
  const withoutFrontmatter = content.replace(/^---\s*[\s\S]*?\s*---\s*/, '');

  // Check for content that would be lost:
  // - Tables (|---|)
  // - Code blocks (```)
  // - Images/embeds (![[...]] or ![...](...)
  // - Horizontal rules (---, ***, ___)
  // - Block quotes (>)
  // - Non-standard content (anything that's not a heading or list item)

  const lines = withoutFrontmatter.split('\n');

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // Allow headings (lanes)
    if (trimmed.startsWith('#')) continue;

    // Allow list items (cards)
    if (/^[-*+]\s/.test(trimmed) || /^\d+\.\s/.test(trimmed)) continue;

    // Allow task list items
    if (/^[-*+]\s*\[[ xX]\]/.test(trimmed)) continue;

    // Allow continuation lines that are indented (part of list items)
    if (line.startsWith('  ') || line.startsWith('\t')) continue;

    // Any other content would be lost
    return true;
  }

  return false;
}

/**
 * Confirmation modal for warning about data loss when opening as kanban
 */
export class KanbanConversionWarningModal extends Modal {
  private resolved = false;
  private resolvePromise: (value: boolean) => void;

  constructor(app: App) {
    super(app);
  }

  onOpen() {
    const { contentEl } = this;

    contentEl.createEl('h2', { text: t('Warning: Content may be lost') });

    contentEl.createEl('p', {
      text: t('This file contains content that is not compatible with Kanban format (such as tables, images, code blocks, or other non-list content).'),
    });

    contentEl.createEl('p', {
      text: t('Opening as a Kanban board will only preserve headings (as lanes) and list items (as cards). All other content will be permanently deleted.'),
    });

    contentEl.createEl('p', {
      text: t('Consider backing up the file before proceeding.'),
      cls: 'mod-warning',
    });

    const buttonContainer = contentEl.createDiv({ cls: 'modal-button-container' });

    buttonContainer.createEl('button', { text: t('Cancel') }).addEventListener('click', () => {
      this.resolved = true;
      this.resolvePromise(false);
      this.close();
    });

    const confirmBtn = buttonContainer.createEl('button', {
      text: t('Open as Kanban anyway'),
      cls: 'mod-warning',
    });
    confirmBtn.addEventListener('click', () => {
      this.resolved = true;
      this.resolvePromise(true);
      this.close();
    });
  }

  onClose() {
    const { contentEl } = this;
    contentEl.empty();

    // If modal was closed without clicking a button, resolve as false
    if (!this.resolved) {
      this.resolvePromise(false);
    }
  }

  waitForResult(): Promise<boolean> {
    return new Promise((resolve) => {
      this.resolvePromise = resolve;
    });
  }
}
