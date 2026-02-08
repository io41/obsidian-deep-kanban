import { TFile } from 'obsidian';
import { memo, useCallback, useContext, useEffect, useState } from 'preact/compat';
import { t } from 'src/lang/helpers';
import { CountingSettings, SubBoardCache } from 'src/services/SubBoardCache';

import { Icon } from '../Icon/Icon';
import { KanbanContext } from '../context';
import { c } from '../helpers';
import { SubBoardInfo } from '../types';

interface SubBoardIndicatorProps {
  subBoard: SubBoardInfo;
  file: TFile | null | undefined;
  sourcePath: string;
}

// Module-level cache instance (shared across all indicators)
let subBoardCache: SubBoardCache | null = null;

function getSubBoardCache(app: any): SubBoardCache {
  if (!subBoardCache) {
    subBoardCache = new SubBoardCache(app);
  }
  return subBoardCache;
}

export const SubBoardIndicator = memo(function SubBoardIndicator({
  subBoard,
  file,
  sourcePath,
}: SubBoardIndicatorProps) {
  const { stateManager } = useContext(KanbanContext);
  const showSummary = stateManager.useSetting('sub-board-show-summary');

  const [counts, setCounts] = useState<{ open: number; total: number }>({
    open: subBoard.openCount,
    total: subBoard.totalCount,
  });
  const [error, setError] = useState<string | undefined>(subBoard.error);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Function to fetch counts
  const fetchCounts = useCallback(async () => {
    if (!file || !subBoard.isSubBoard || showSummary === false) {
      return;
    }

    const cache = getSubBoardCache(stateManager.app);

    const countUnchecked = stateManager.getSetting('sub-board-count-unchecked') !== false;
    const countNonArchived = stateManager.getSetting('sub-board-count-non-archived') !== false;
    const countNonCompleteLane =
      stateManager.getSetting('sub-board-count-non-complete-lane') !== false;

    const settings: CountingSettings = {
      countUnchecked,
      countNonArchived,
      countNonCompleteLane,
    };

    // Invalidate cache to get fresh data
    cache.invalidate(file.path);

    const info = await cache.getSubBoardInfo(file.path, settings, sourcePath);
    if (info) {
      setCounts({ open: info.openCount, total: info.totalCount });
      if (info.error) {
        setError(info.error);
      } else {
        setError(undefined);
      }
    }
  }, [file, subBoard.isSubBoard, showSummary, stateManager, sourcePath]);

  // Load counts initially and when dependencies change
  useEffect(() => {
    fetchCounts();
  }, [fetchCounts, refreshTrigger]);

  // Listen for file modifications to the sub-board
  useEffect(() => {
    if (!file || !subBoard.isSubBoard || showSummary === false) {
      return;
    }

    const handleModify = (modifiedFile: TFile) => {
      if (modifiedFile.path === file.path) {
        // Sub-board was modified, trigger refresh
        setRefreshTrigger((prev) => prev + 1);
      }
    };

    // Register for vault modify events
    stateManager.app.vault.on('modify', handleModify);

    return () => {
      stateManager.app.vault.off('modify', handleModify);
    };
  }, [file, subBoard.isSubBoard, showSummary, stateManager]);

  if (!subBoard?.isSubBoard || showSummary === false) {
    return null;
  }

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (!file || error === 'File not found') {
      return;
    }

    stateManager.app.workspace.openLinkText(file.path, sourcePath, false);
  };

  const getDisplayText = () => {
    if (error === 'File not found') {
      return t('Missing');
    }
    if (error === 'Circular reference') {
      return t('Circular');
    }
    if (counts.open === 1) {
      return t('1 open');
    }
    return t('{count} open').replace('{count}', counts.open.toString());
  };

  return (
    <div className={c('sub-board-indicator')}>
      <a
        className={c('sub-board-link')}
        onClick={handleClick}
        aria-label={t('Open sub-board')}
        href={file?.path}
      >
        <Icon name="lucide-layers" />
        <span className={c('sub-board-count')}>{getDisplayText()}</span>
      </a>
    </div>
  );
});
