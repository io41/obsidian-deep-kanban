import update from 'immutability-helper';
import { moment } from 'obsidian';
import { KanbanView } from 'src/KanbanView';
import { StateManager } from 'src/StateManager';
import { Path } from 'src/dnd/types';
import {
  appendEntities,
  getEntityFromPath,
  insertEntity,
  moveEntity,
  prependEntities,
  removeEntity,
  updateEntity,
  updateParentEntity,
} from 'src/dnd/util/data';

import { generateInstanceId } from '../components/helpers';
import { Board, DataTypes, Item, Lane } from '../components/types';
import { triggerCardEvent, triggerLaneEvent } from './kanbanEvents';

export interface BoardModifiers {
  appendItems: (path: Path, items: Item[]) => void;
  prependItems: (path: Path, items: Item[]) => void;
  insertItems: (path: Path, items: Item[]) => void;
  replaceItem: (path: Path, items: Item[]) => void;
  splitItem: (path: Path, items: Item[]) => void;
  moveItemToTop: (path: Path) => void;
  moveItemToBottom: (path: Path) => void;
  addLane: (lane: Lane) => void;
  insertLane: (path: Path, lane: Lane) => void;
  updateLane: (path: Path, lane: Lane) => void;
  archiveLane: (path: Path) => void;
  archiveLaneItems: (path: Path) => void;
  deleteEntity: (path: Path) => void;
  updateItem: (path: Path, item: Item) => void;
  archiveItem: (path: Path) => void;
  duplicateEntity: (path: Path) => void;
}

export function getBoardModifiers(view: KanbanView, stateManager: StateManager): BoardModifiers {
  const appendArchiveDate = (item: Item) => {
    const archiveDateFormat = stateManager.getSetting('archive-date-format');
    const archiveDateSeparator = stateManager.getSetting('archive-date-separator');
    const archiveDateAfterTitle = stateManager.getSetting('append-archive-date');

    const newTitle = [moment().format(archiveDateFormat)];

    if (archiveDateSeparator) newTitle.push(archiveDateSeparator);

    newTitle.push(item.data.titleRaw);

    if (archiveDateAfterTitle) newTitle.reverse();

    const titleRaw = newTitle.join(' ');
    return stateManager.updateItemContent(item, titleRaw);
  };

  return {
    appendItems: (path: Path, items: Item[]) => {
      stateManager.setState((boardData) => appendEntities(boardData, path, items));
      const lane = getEntityFromPath(stateManager.state, path);
      items.forEach((item, i) => {
        triggerCardEvent(stateManager.app, 'kanban:card-added', item, [...path, lane.children.length - items.length + i], stateManager.file.path);
      });
    },

    prependItems: (path: Path, items: Item[]) => {
      stateManager.setState((boardData) => prependEntities(boardData, path, items));
      items.forEach((item, i) => {
        triggerCardEvent(stateManager.app, 'kanban:card-added', item, [...path, i], stateManager.file.path);
      });
    },

    insertItems: (path: Path, items: Item[]) => {
      stateManager.setState((boardData) => insertEntity(boardData, path, items));
      items.forEach((item, i) => {
        triggerCardEvent(stateManager.app, 'kanban:card-added', item, [...path.slice(0, -1), path[path.length - 1] + i], stateManager.file.path);
      });
    },

    replaceItem: (path: Path, items: Item[]) => {
      stateManager.setState((boardData) =>
        insertEntity(removeEntity(boardData, path), path, items)
      );
    },

    splitItem: (path: Path, items: Item[]) => {
      stateManager.setState((boardData) => {
        return insertEntity(removeEntity(boardData, path), path, items);
      });
    },

    moveItemToTop: (path: Path) => {
      const item = getEntityFromPath(stateManager.state, path) as Item;
      const newPath: Path = [path[0], 0];
      stateManager.setState((boardData) => moveEntity(boardData, path, newPath));
      triggerCardEvent(stateManager.app, 'kanban:card-moved', item, newPath, stateManager.file.path, path);
    },

    moveItemToBottom: (path: Path) => {
      const item = getEntityFromPath(stateManager.state, path) as Item;
      stateManager.setState((boardData) => {
        const laneIndex = path[0];
        const lane = boardData.children[laneIndex];
        return moveEntity(boardData, path, [laneIndex, lane.children.length]);
      });
      const lane = stateManager.state.children[path[0]];
      const newPath: Path = [path[0], lane.children.length - 1];
      triggerCardEvent(stateManager.app, 'kanban:card-moved', item, newPath, stateManager.file.path, path);
    },

    addLane: (lane: Lane) => {
      stateManager.setState((boardData) => {
        const collapseState = view.getViewState('list-collapse') || [];
        const op = (collapseState: boolean[]) => {
          const newState = [...collapseState];
          newState.push(false);
          return newState;
        };

        view.setViewState('list-collapse', undefined, op);
        return update<Board>(appendEntities(boardData, [], [lane]), {
          data: { settings: { 'list-collapse': { $set: op(collapseState) } } },
        });
      });
      const newPath: Path = [stateManager.state.children.length - 1];
      triggerLaneEvent(stateManager.app, 'kanban:lane-added', lane, newPath, stateManager.file.path);
    },

    insertLane: (path: Path, lane: Lane) => {
      stateManager.setState((boardData) => {
        const collapseState = view.getViewState('list-collapse');
        const op = (collapseState: boolean[]) => {
          const newState = [...collapseState];
          newState.splice(path.last(), 0, false);
          return newState;
        };

        view.setViewState('list-collapse', undefined, op);

        return update<Board>(insertEntity(boardData, path, [lane]), {
          data: { settings: { 'list-collapse': { $set: op(collapseState) } } },
        });
      });
      triggerLaneEvent(stateManager.app, 'kanban:lane-added', lane, path, stateManager.file.path);
    },

    updateLane: (path: Path, lane: Lane) => {
      stateManager.setState((boardData) =>
        updateParentEntity(boardData, path, {
          children: {
            [path[path.length - 1]]: {
              $set: lane,
            },
          },
        })
      );
      triggerLaneEvent(stateManager.app, 'kanban:lane-updated', lane, path, stateManager.file.path);
    },

    archiveLane: (path: Path) => {
      const lane = getEntityFromPath(stateManager.state, path) as Lane;
      stateManager.setState((boardData) => {
        const laneData = getEntityFromPath(boardData, path);
        const items = laneData.children;

        try {
          const collapseState = view.getViewState('list-collapse');
          const op = (collapseState: boolean[]) => {
            const newState = [...collapseState];
            newState.splice(path.last(), 1);
            return newState;
          };
          view.setViewState('list-collapse', undefined, op);

          return update<Board>(removeEntity(boardData, path), {
            data: {
              settings: { 'list-collapse': { $set: op(collapseState) } },
              archive: {
                $unshift: stateManager.getSetting('archive-with-date')
                  ? items.map(appendArchiveDate)
                  : items,
              },
            },
          });
        } catch (e) {
          stateManager.setError(e);
          return boardData;
        }
      });
      triggerLaneEvent(stateManager.app, 'kanban:lane-archived', lane, path, stateManager.file.path);
    },

    archiveLaneItems: (path: Path) => {
      stateManager.setState((boardData) => {
        const lane = getEntityFromPath(boardData, path);
        const items = lane.children;

        try {
          return update(
            updateEntity(boardData, path, {
              children: {
                $set: [],
              },
            }),
            {
              data: {
                archive: {
                  $unshift: stateManager.getSetting('archive-with-date')
                    ? items.map(appendArchiveDate)
                    : items,
                },
              },
            }
          );
        } catch (e) {
          stateManager.setError(e);
          return boardData;
        }
      });
    },

    deleteEntity: (path: Path) => {
      const entity = getEntityFromPath(stateManager.state, path);
      stateManager.setState((boardData) => {
        const entityData = getEntityFromPath(boardData, path);

        if (entityData.type === DataTypes.Lane) {
          const collapseState = view.getViewState('list-collapse');
          const op = (collapseState: boolean[]) => {
            const newState = [...collapseState];
            newState.splice(path.last(), 1);
            return newState;
          };
          view.setViewState('list-collapse', undefined, op);

          return update<Board>(removeEntity(boardData, path), {
            data: { settings: { 'list-collapse': { $set: op(collapseState) } } },
          });
        }

        return removeEntity(boardData, path);
      });
      if (entity.type === DataTypes.Lane) {
        triggerLaneEvent(stateManager.app, 'kanban:lane-deleted', entity as Lane, path, stateManager.file.path);
      } else if (entity.type === DataTypes.Item) {
        triggerCardEvent(stateManager.app, 'kanban:card-deleted', entity as Item, path, stateManager.file.path);
      }
    },

    updateItem: (path: Path, item: Item) => {
      stateManager.setState((boardData) => {
        return updateParentEntity(boardData, path, {
          children: {
            [path[path.length - 1]]: {
              $set: item,
            },
          },
        });
      });
      triggerCardEvent(stateManager.app, 'kanban:card-updated', item, path, stateManager.file.path);
    },

    archiveItem: (path: Path) => {
      const item = getEntityFromPath(stateManager.state, path) as Item;
      stateManager.setState((boardData) => {
        const itemData = getEntityFromPath(boardData, path);
        try {
          return update(removeEntity(boardData, path), {
            data: {
              archive: {
                $push: [
                  stateManager.getSetting('archive-with-date') ? appendArchiveDate(itemData) : itemData,
                ],
              },
            },
          });
        } catch (e) {
          stateManager.setError(e);
          return boardData;
        }
      });
      triggerCardEvent(stateManager.app, 'kanban:card-archived', item, path, stateManager.file.path);
    },

    duplicateEntity: (path: Path) => {
      stateManager.setState((boardData) => {
        const entity = getEntityFromPath(boardData, path);
        let entityWithNewID = update(entity, {
          id: {
            $set: generateInstanceId(),
          },
        });

        // Clear blockId for duplicated items so they get unique link identifiers
        if (entity.type === DataTypes.Item) {
          entityWithNewID = update(entityWithNewID, {
            data: {
              blockId: { $set: undefined },
            },
          });
        }

        if (entity.type === DataTypes.Lane) {
          const collapseState = view.getViewState('list-collapse');
          const op = (collapseState: boolean[]) => {
            const newState = [...collapseState];
            newState.splice(path.last(), 0, collapseState[path.last()]);
            return newState;
          };
          view.setViewState('list-collapse', undefined, op);

          return update<Board>(insertEntity(boardData, path, [entityWithNewID]), {
            data: { settings: { 'list-collapse': { $set: op(collapseState) } } },
          });
        }

        return insertEntity(boardData, path, [entityWithNewID]);
      });
    },
  };
}
