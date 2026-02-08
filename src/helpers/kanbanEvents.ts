import { App } from 'obsidian';
import { Path } from 'src/dnd/types';
import { Item, Lane } from '../components/types';

export type KanbanEventType =
  | 'kanban:card-added'
  | 'kanban:card-updated'
  | 'kanban:card-moved'
  | 'kanban:card-deleted'
  | 'kanban:card-archived'
  | 'kanban:lane-added'
  | 'kanban:lane-updated'
  | 'kanban:lane-moved'
  | 'kanban:lane-deleted'
  | 'kanban:lane-archived';

export interface KanbanCardEvent {
  card: Item;
  path: Path;
  sourcePath: string;
}

export interface KanbanCardMovedEvent extends KanbanCardEvent {
  oldPath: Path;
  oldSourcePath?: string;
}

export interface KanbanLaneEvent {
  lane: Lane;
  path: Path;
  sourcePath: string;
}

export interface KanbanLaneMovedEvent extends KanbanLaneEvent {
  oldPath: Path;
}

export function triggerCardEvent(
  app: App,
  eventType: KanbanEventType,
  card: Item,
  path: Path,
  sourcePath: string,
  oldPath?: Path,
  oldSourcePath?: string
) {
  if (eventType === 'kanban:card-moved') {
    (app.workspace as any).trigger(eventType, {
      card,
      path,
      sourcePath,
      oldPath,
      oldSourcePath: oldSourcePath || sourcePath,
    } as KanbanCardMovedEvent);
  } else {
    (app.workspace as any).trigger(eventType, {
      card,
      path,
      sourcePath,
    } as KanbanCardEvent);
  }
}

export function triggerLaneEvent(
  app: App,
  eventType: KanbanEventType,
  lane: Lane,
  path: Path,
  sourcePath: string,
  oldPath?: Path
) {
  if (eventType === 'kanban:lane-moved') {
    (app.workspace as any).trigger(eventType, {
      lane,
      path,
      sourcePath,
      oldPath,
    } as KanbanLaneMovedEvent);
  } else {
    (app.workspace as any).trigger(eventType, {
      lane,
      path,
      sourcePath,
    } as KanbanLaneEvent);
  }
}
