import { Fragment, memo, useContext } from 'preact/compat';
import { t } from 'src/lang/helpers';

import { c } from '../helpers';
import { KanbanContext } from '../context';
import { Icon } from '../Icon/Icon';

interface BreadcrumbProps {
  parentBoards: string | string[];
  currentBoardPath: string;
}

/**
 * Get the display name from a file path
 */
function getBasename(path: string): string {
  // Remove .md extension and get filename
  const parts = path.split('/');
  const filename = parts[parts.length - 1];
  return filename.replace(/\.md$/, '');
}

export const Breadcrumb = memo(function Breadcrumb({
  parentBoards,
  currentBoardPath,
}: BreadcrumbProps) {
  const { stateManager } = useContext(KanbanContext);

  // Normalize to array
  const parents = Array.isArray(parentBoards) ? parentBoards : [parentBoards];

  if (!parents.length || parents.every((p) => !p)) {
    return null;
  }

  const validParents = parents.filter((p) => p && typeof p === 'string');

  if (!validParents.length) {
    return null;
  }

  const openParent = (path: string, e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    stateManager.app.workspace.openLinkText(path, currentBoardPath, false);
  };

  return (
    <div className={c('breadcrumb')}>
      <Icon name="lucide-arrow-left" />
      <span className={c('breadcrumb-label')}>{t('Parent')}:</span>
      {validParents.map((parent, idx) => (
        <Fragment key={parent}>
          {idx > 0 && <span className={c('breadcrumb-separator')}>,</span>}
          <a
            className={c('breadcrumb-link')}
            href={parent}
            onClick={(e) => openParent(parent, e)}
          >
            {getBasename(parent)}
          </a>
        </Fragment>
      ))}
    </div>
  );
});
