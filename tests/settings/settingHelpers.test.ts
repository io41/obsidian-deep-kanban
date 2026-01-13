import { TFile, TFolder } from 'obsidian';

import { getFolderChoices, getTemplateChoices } from '../../src/settingHelpers';

jest.mock('../../src/components/helpers', () => ({
  getTemplatePlugins: jest.fn().mockReturnValue({
    templateFolder: 'Templates',
    templatesEnabled: true,
    templaterPlugin: null,
  }),
}));

const TFileCtor = TFile as unknown as { new (path: string): { path: string; basename: string } };
const TFolderCtor = TFolder as unknown as { new (path: string): { path: string } };

describe('setting helpers', () => {
  it('limits folder dropdowns and flags overflow', () => {
    const folders = Array.from({ length: 501 }, (_, index) => new TFolderCtor(`Folder/${index}`));
    const app = {
      vault: {
        getAllLoadedFiles: jest.fn().mockReturnValue(folders),
      },
    };

    const result = getFolderChoices(app as any);

    expect(result.choices).toHaveLength(500);
    expect(result.limitReached).toBe(true);
  });

  it('filters templates by folder prefix', () => {
    const templatesFolder = new TFolderCtor('Templates');
    const otherFolder = new TFolderCtor('Other');
    const templatesFile = new TFileCtor('Templates/template.md');
    const otherFile = new TFileCtor('Other/note.md');
    const app = {
      vault: {
        getAllLoadedFiles: jest
          .fn()
          .mockReturnValue([templatesFolder, otherFolder, templatesFile, otherFile]),
        getAbstractFileByPath: jest.fn().mockReturnValue(templatesFolder),
        getRoot: jest.fn().mockReturnValue(templatesFolder),
      },
    };

    const result = getTemplateChoices(app as any, 'Templates');

    expect(result.choices).toHaveLength(1);
    expect(result.choices[0]?.value).toBe('Templates/template.md');
    expect(result.limitReached).toBe(false);
  });
});
