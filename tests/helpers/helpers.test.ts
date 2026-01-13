import * as fs from 'node:fs';
import * as path from 'node:path';

import { buildLinkToDailyNote, hasFrontmatterKeyRaw, hasNonKanbanContent } from '../../src/helpers';

jest.mock('../../src/parsers/common', () => ({
  frontmatterKey: 'kanban-plugin',
}));

jest.mock('obsidian-daily-notes-interface', () => ({
  getDailyNoteSettings: () => ({
    folder: 'Daily Notes (Work)',
  }),
  getDateFromFile: jest.fn(),
}));

describe('helpers', () => {
  it('builds markdown links with minimal encoding', () => {
    const app = {
      vault: {
        getConfig: jest.fn().mockReturnValue(true),
      },
    };

    const link = buildLinkToDailyNote(app as any, '2024-01-01');

    expect(link).toBe('[2024-01-01](Daily Notes %28Work%29/2024-01-01.md)');
  });

  it('detects frontmatter keys from raw text', () => {
    const content = ['---', 'kanban-plugin: basic', '---', '', '# Lane'].join('\n');

    expect(hasFrontmatterKeyRaw(content)).toBe(true);
  });

  it('flags non-kanban content in markdown files', async () => {
    const fixturePath = path.join(__dirname, '..', 'fixtures', 'board-non-kanban.md');
    const file = { path: 'Notes/Board.md' };
    const app = {
      vault: {
        read: jest.fn().mockResolvedValue(fs.readFileSync(fixturePath, 'utf-8')),
      },
    };

    await expect(hasNonKanbanContent(app as any, file as any)).resolves.toBe(true);
  });

  it('allows standard kanban content', async () => {
    const fixturePath = path.join(__dirname, '..', 'fixtures', 'board-basic.md');
    const file = { path: 'Boards/Board.md' };
    const app = {
      vault: {
        read: jest.fn().mockResolvedValue(fs.readFileSync(fixturePath, 'utf-8')),
      },
    };

    await expect(hasNonKanbanContent(app as any, file as any)).resolves.toBe(false);
  });
});
