import { Stat } from 'obsidian';
import { Item } from 'src/components/types';

export interface FileAccessor {
  isEmbed: boolean;
  target: string;
  stats?: Stat;
}

export function markRangeForDeletion(str: string, range: { start: number; end: number }): string {
  const len = str.length;

  let start = range.start;
  while (start > 0 && str[start - 1] === ' ') start--;

  let end = range.end;
  while (end < len - 1 && str[end + 1] === ' ') end++;

  return str.slice(0, start) + '\u0000'.repeat(end - start) + str.slice(end);
}

export function executeDeletion(str: string) {
  return str.replace(/ *\0+ */g, ' ').trim();
}

export function replaceNewLines(str: string) {
  return str.trim().replace(/(?:\r\n|\n)/g, '<br>');
}

export function replaceBrs(str: string) {
  // Split by lines to preserve <br> inside table cells and code blocks
  const lines = str.split('\n');
  const result: string[] = [];
  let inCodeBlock = false;

  for (const line of lines) {
    // Track code block state (``` markers)
    if (line.trim().startsWith('```')) {
      inCodeBlock = !inCodeBlock;
    }

    // Check if line looks like a table row (contains | character not at line start/end only)
    const isTableRow = /\|.*\|/.test(line.trim()) || line.trim().startsWith('|');

    if (isTableRow || inCodeBlock) {
      // Preserve <br> in table cells and code blocks - don't convert them
      result.push(line);
    } else {
      // For non-table/non-code content, convert <br> to newlines
      result.push(line.replace(/<br>/g, '\n'));
    }
  }

  return result.join('\n').trim();
}

export function indentNewLines(str: string) {
  const useTab = (app.vault as any).getConfig('useTab');
  return str.trim().replace(/(?:\r\n|\n)/g, useTab ? '\n\t' : '\n    ');
}

export function addBlockId(str: string, item: Item) {
  if (!item.data.blockId) return str;

  const lines = str.split(/(?:\r\n|\n)/g);
  lines[0] += ' ^' + item.data.blockId;

  return lines.join('\n');
}

export function removeBlockId(str: string) {
  const lines = str.split(/(?:\r\n|\n)/g);

  lines[0] = lines[0].replace(/\s+\^([a-zA-Z0-9-]+)$/, '');

  return lines.join('\n');
}

export function dedentNewLines(str: string) {
  return str.trim().replace(/(?:\r\n|\n)(?: {4}|\t)/g, '\n');
}

export function parseLaneTitle(str: string) {
  str = replaceBrs(str);

  const match = str.match(/^(.*?)\s*\((\d+)\)$/);
  if (match == null) return { title: str, maxItems: 0 };

  return { title: match[1], maxItems: Number(match[2]) };
}
