import Choices, { Choices as IChoices } from 'choices.js';
import update from 'immutability-helper';
import { App, Setting, TFile, TFolder, Vault } from 'obsidian';

import { KanbanSettings, SettingsManager } from './Settings';
import { getTemplatePlugins } from './components/helpers';
import { t } from './lang/helpers';

export const defaultDateTrigger = '@';
export const defaultTimeTrigger = '@@';
export const defaultMetadataPosition = 'body';

// Maximum number of items to show in dropdowns to prevent UI freeze on large vaults
const MAX_DROPDOWN_ITEMS = 500;

export function getFolderChoices(app: App) {
  const folders = app.vault
    .getAllLoadedFiles()
    .filter((file) => file instanceof TFolder) as TFolder[];
  const limitReached = folders.length > MAX_DROPDOWN_ITEMS;

  const folderList = folders.slice(0, MAX_DROPDOWN_ITEMS).map((folder) => {
    return {
      value: folder.path,
      label: folder.path,
      selected: false,
      disabled: false,
    };
  });

  return { choices: folderList, limitReached };
}

export function getTemplateChoices(app: App, folderStr?: string) {
  let folder = folderStr ? app.vault.getAbstractFileByPath(folderStr) : null;

  if (!folder || !(folder instanceof TFolder)) {
    folder = app.vault.getRoot();
  }

  const prefix = folder.path === '/' ? '' : `${folder.path}/`;
  const files = app.vault
    .getAllLoadedFiles()
    .filter(
      (file) => file instanceof TFile && (prefix === '' || file.path.startsWith(prefix))
    ) as TFile[];
  const limitReached = files.length > MAX_DROPDOWN_ITEMS;

  const fileList = files.slice(0, MAX_DROPDOWN_ITEMS).map((file) => {
    return {
      value: file.path,
      label: file.basename,
      selected: false,
      disabled: false,
    };
  });

  return { choices: fileList, limitReached };
}

export function getListOptions(app: App) {
  const { templateFolder, templatesEnabled, templaterPlugin } = getTemplatePlugins(app);

  const templateResult = getTemplateChoices(app, templateFolder);
  const folderResult = getFolderChoices(app);

  let templateWarning = '';

  if (!templatesEnabled && !templaterPlugin) {
    templateWarning = t('Note: No template plugins are currently enabled.');
  }

  // Add warning if limits were reached
  const limitWarnings: string[] = [];
  if (templateResult.limitReached) {
    limitWarnings.push(
      t('Only first %1 templates shown. Use search to filter.', MAX_DROPDOWN_ITEMS.toString())
    );
  }
  if (folderResult.limitReached) {
    limitWarnings.push(
      t('Only first %1 folders shown. Use search to filter.', MAX_DROPDOWN_ITEMS.toString())
    );
  }

  return {
    templateFiles: templateResult.choices,
    vaultFolders: folderResult.choices,
    templateWarning,
    limitWarnings,
  };
}

interface CreateSearchSelectParams {
  choices: IChoices.Choice[];
  key: keyof KanbanSettings;
  warningText?: string;
  local: boolean;
  placeHolderStr: string;
  manager: SettingsManager;
}

export function createSearchSelect({
  choices,
  key,
  warningText,
  local,
  placeHolderStr,
  manager,
}: CreateSearchSelectParams) {
  return (setting: Setting) => {
    setting.controlEl.createEl('select', {}, (el) => {
      // el must be in the dom, so we setTimeout
      el.win.setTimeout(() => {
        let list = choices;

        const [value, globalValue] = manager.getSetting(key, local);

        let didSetPlaceholder = false;
        if (globalValue) {
          const index = list.findIndex((f) => f.value === globalValue);

          if (index > -1) {
            didSetPlaceholder = true;
            const choice = choices[index];

            list = update(list, {
              $splice: [[index, 1]],
              $unshift: [
                update(choice, {
                  placeholder: {
                    $set: true,
                  },
                  value: {
                    $set: '',
                  },
                  label: {
                    $apply: (v) => `${v} (${t('default')})`,
                  },
                }),
              ],
            });
          }
        }

        if (!didSetPlaceholder) {
          list = update(list, {
            $unshift: [
              {
                placeholder: true,
                value: '',
                label: placeHolderStr,
                selected: false,
                disabled: false,
              },
            ],
          });
        }

        // If we have a stored value that doesn't exist in the list (e.g., folder was moved/deleted),
        // add it to the dropdown so users can see what was configured and change it
        let staleValueAdded = false;
        if (value && typeof value === 'string' && list.findIndex((f) => f.value === value) === -1) {
          staleValueAdded = true;
          list = update(list, {
            $push: [
              {
                value: value,
                label: `${value} (${t('not found')})`,
                selected: false,
                disabled: false,
              },
            ],
          });
        }

        const c = new Choices(el, {
          placeholder: true,
          position: 'bottom' as 'auto',
          searchPlaceholderValue: t('Search...'),
          searchEnabled: list.length > 10,
          choices: list,
        }).setChoiceByValue('');

        if (
          value &&
          typeof value === 'string' &&
          (staleValueAdded || list.findIndex((f) => f.value === value) > -1)
        ) {
          c.setChoiceByValue(value);
        }

        const onChange = (e: CustomEvent) => {
          const val = e.detail.value;

          if (val) {
            manager.applySettingsUpdate({
              [key]: {
                $set: val,
              },
            });
          } else {
            manager.applySettingsUpdate({
              $unset: [key],
            });
          }
        };

        el.addEventListener('change', onChange);

        manager.cleanupFns.push(() => {
          c.destroy();
          el.removeEventListener('change', onChange);
        });
      });

      if (warningText) {
        setting.descEl.createDiv({}, (div) => {
          div.createEl('strong', { text: warningText });
        });
      }
    });
  };
}
