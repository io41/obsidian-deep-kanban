import { TFile, moment } from 'obsidian';
import { StateManager } from 'src/StateManager';
import { c, escapeRegExpStr, getDateColorFn } from 'src/components/helpers';
import { Board, DataTypes, DateColor, Item, Lane } from 'src/components/types';
import { Path } from 'src/dnd/types';
import { getEntityFromPath } from 'src/dnd/util/data';
import { Op } from 'src/helpers/patch';

import { frontmatterKey, getSearchValue } from '../common';

export function hydrateLane(stateManager: StateManager, lane: Lane) {
  return lane;
}

export function preprocessTitle(stateManager: StateManager, title: string) {
  const getDateColor = getDateColorFn(stateManager.getSetting('date-colors'));
  const dateTrigger = stateManager.getSetting('date-trigger');
  const dateFormat = stateManager.getSetting('date-format');
  const dateDisplayFormat = stateManager.getSetting('date-display-format');
  const timeTrigger = stateManager.getSetting('time-trigger');
  const timeFormat = stateManager.getSetting('time-format');
  const moveDates = stateManager.getSetting('move-dates');
  const moveTimes = stateManager.getSetting('move-dates'); // times follow same setting

  const { app } = stateManager;

  let date: moment.Moment;
  let dateColor: DateColor;
  let dateIndex = 0; // Track which date occurrence we're on
  const getWrapperStyles = (baseClass: string) => {
    let wrapperStyle = '';
    if (dateColor) {
      if (dateColor.backgroundColor) {
        baseClass += ' has-background';
        wrapperStyle = ` style="--date-color: ${dateColor.color}; --date-background-color: ${dateColor.backgroundColor};"`;
      } else {
        wrapperStyle = ` style="--date-color: ${dateColor.color};"`;
      }
    }
    return { wrapperClass: baseClass, wrapperStyle };
  };

  title = title.replace(
    new RegExp(`(^|\\s)${escapeRegExpStr(dateTrigger)}\\[\\[([^\\]]+)\\]\\]`, 'g'),
    (match, space, content) => {
      const parsed = moment(content, dateFormat);
      if (!parsed.isValid()) return match;
      date = parsed;
      // When moveDates is true, hide inline dates (they show in the chip area instead)
      if (moveDates) {
        return space.trim() ? ' ' : '';
      }
      const linkPath = app.metadataCache.getFirstLinkpathDest(content, stateManager.file.path);
      if (!dateColor) dateColor = getDateColor(parsed);
      const { wrapperClass, wrapperStyle } = getWrapperStyles(c('preview-date-wrapper'));
      const currentIndex = dateIndex++;
      return `${space}<span data-date="${date.toISOString()}" data-date-index="${currentIndex}" class="${wrapperClass} ${c('date')} ${c('preview-date-link')}"${wrapperStyle}><a class="${c('preview-date')} internal-link" data-href="${linkPath?.path ?? content}" href="${linkPath?.path ?? content}" target="_blank" rel="noopener">${parsed.format(dateDisplayFormat)}</a></span>`;
    }
  );
  title = title.replace(
    new RegExp(`(^|\\s)${escapeRegExpStr(dateTrigger)}\\[([^\\]]+)\\]\\([^)]+\\)`, 'g'),
    (match, space, content) => {
      const parsed = moment(content, dateFormat);
      if (!parsed.isValid()) return match;
      date = parsed;
      // When moveDates is true, hide inline dates (they show in the chip area instead)
      if (moveDates) {
        return space.trim() ? ' ' : '';
      }
      const linkPath = app.metadataCache.getFirstLinkpathDest(content, stateManager.file.path);
      if (!dateColor) dateColor = getDateColor(parsed);
      const { wrapperClass, wrapperStyle } = getWrapperStyles(c('preview-date-wrapper'));
      const currentIndex = dateIndex++;
      return `${space}<span data-date="${date.toISOString()}" data-date-index="${currentIndex}" class="${wrapperClass} ${c('date')} ${c('preview-date-link')}"${wrapperStyle}><a class="${c('preview-date')} internal-link" data-href="${linkPath?.path ?? content}" href="${linkPath?.path ?? content}" target="_blank" rel="noopener">${parsed.format(dateDisplayFormat)}</a></span>`;
    }
  );
  title = title.replace(
    new RegExp(`(^|\\s)${escapeRegExpStr(dateTrigger)}{([^}]+)}`, 'g'),
    (match, space, content) => {
      const parsed = moment(content, dateFormat);
      if (!parsed.isValid()) return match;
      date = parsed;
      // When moveDates is true, hide inline dates (they show in the chip area instead)
      // This handles cases where date deletion didn't work properly (#904)
      if (moveDates) {
        return space.trim() ? ' ' : '';
      }
      if (!dateColor) dateColor = getDateColor(parsed);
      const { wrapperClass, wrapperStyle } = getWrapperStyles(c('preview-date-wrapper'));
      const currentIndex = dateIndex++;
      return `${space}<span data-date="${date.toISOString()}" data-date-index="${currentIndex}" class="${wrapperClass} ${c('date')}"${wrapperStyle}><span class="${c('preview-date')} ${c('item-metadata-date')}">${parsed.format(dateDisplayFormat)}</span></span>`;
    }
  );

  title = title.replace(
    new RegExp(`(^|\\s)${escapeRegExpStr(timeTrigger)}{([^}]+)}`, 'g'),
    (match, space, content) => {
      const parsed = moment(content, timeFormat, true);
      if (!parsed.isValid()) return match;

      // When moveDates/moveTimes is true, hide inline times (they show in the chip area instead)
      if (moveTimes) {
        return space.trim() ? ' ' : '';
      }

      if (!date) {
        date = parsed;
        date.year(1970);
      } else {
        date.hour(parsed.hour());
        date.minute(parsed.minute());
        date.second(parsed.second());
      }

      const { wrapperClass, wrapperStyle } = getWrapperStyles(c('preview-time-wrapper'));
      return `${space}<span data-date="${date.toISOString()}" class="${wrapperClass} ${c('date')}"${wrapperStyle}><span class="${c('preview-time')} ${c('item-metadata-time')}">${parsed.format(timeFormat)}</span></span>`;
    }
  );

  // Escape --- at the start of lines to prevent horizontal rule rendering
  // Use zero-width space (U+200B) to break the thematic break pattern
  title = title.replace(/^---$/gm, '\u200B---');
  title = title.replace(/^---(\s)/gm, '\u200B---$1');

  return title;
}

export function hydrateItem(stateManager: StateManager, item: Item) {
  const { dateStr, timeStr, fileAccessor } = item.data.metadata;

  if (dateStr) {
    item.data.metadata.date = moment(dateStr, stateManager.getSetting('date-format'));
  }

  if (timeStr) {
    let time = moment(timeStr, stateManager.getSetting('time-format'), true);

    if (item.data.metadata.date) {
      const date = item.data.metadata.date;

      date.hour(time.hour());
      date.minute(time.minute());
      date.second(time.second());

      time = date.clone();
    }

    item.data.metadata.time = time;
  }

  if (fileAccessor) {
    const file = stateManager.app.metadataCache.getFirstLinkpathDest(
      fileAccessor.target,
      stateManager.file.path
    );

    if (file) {
      item.data.metadata.file = file;

      // Check if linked file is a kanban board (sub-board detection)
      if (file instanceof TFile) {
        const linkedFileCache = stateManager.app.metadataCache.getFileCache(file);
        if (linkedFileCache?.frontmatter?.[frontmatterKey] === 'board') {
          // Mark as sub-board - counts will be loaded async by the component
          item.data.metadata.subBoard = {
            isSubBoard: true,
            openCount: 0,
            totalCount: 0,
            lastUpdated: Date.now(),
          };
        }
      }
    }
  }

  item.data.titleSearch = getSearchValue(item, stateManager);

  return item;
}

export function hydrateBoard(stateManager: StateManager, board: Board): Board {
  try {
    board.children.map((lane) => {
      hydrateLane(stateManager, lane);
      lane.children.map((item) => {
        return hydrateItem(stateManager, item);
      });
    });
  } catch (e) {
    stateManager.setError(e);
    throw e;
  }

  return board;
}

function opAffectsHydration(op: Op) {
  return (
    (op.op === 'add' || op.op === 'replace') &&
    ['title', 'titleRaw', 'dateStr', 'timeStr', /\d$/, /\/fileAccessor\/.+$/].some((postFix) => {
      if (typeof postFix === 'string') {
        return op.path.last().toString().endsWith(postFix);
      } else {
        return postFix.test(op.path.last().toString());
      }
    })
  );
}

export function hydratePostOp(stateManager: StateManager, board: Board, ops: Op[]): Board {
  const seen: Record<string, boolean> = {};
  const toHydrate = ops.reduce((paths, op) => {
    if (!opAffectsHydration(op)) {
      return paths;
    }

    const path = op.path.reduce((path, segment) => {
      if (typeof segment === 'number') {
        path.push(segment);
      }

      return path;
    }, [] as Path);

    const key = path.join(',');

    if (!seen[key]) {
      seen[key] = true;
      paths.push(path);
    }

    return paths;
  }, [] as Path[]);

  toHydrate.map((path) => {
    const entity = getEntityFromPath(board, path);

    if (entity.type === DataTypes.Lane) {
      return hydrateLane(stateManager, entity);
    }

    if (entity.type === DataTypes.Item) {
      return hydrateItem(stateManager, entity);
    }
  });

  return board;
}
