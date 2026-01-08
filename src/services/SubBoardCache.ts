import { App, TFile } from 'obsidian';
import { KanbanSettings } from '../Settings';
import { Board, Item, Lane, SubBoardInfo } from '../components/types';
import { frontmatterKey } from '../parsers/common';
import { getTaskStatusDone } from '../parsers/helpers/inlineMetadata';

export interface CountingSettings {
  countUnchecked: boolean;
  countNonArchived: boolean;
  countNonCompleteLane: boolean;
}

interface CacheEntry {
  info: SubBoardInfo;
  expiry: number;
}

export class SubBoardCache {
  private cache: Map<string, CacheEntry> = new Map();
  private readonly TTL = 30000; // 30 seconds
  private app: App;
  private visitedPaths: Set<string> = new Set();

  constructor(app: App) {
    this.app = app;
  }

  /**
   * Check if a file is a kanban board by examining its frontmatter
   */
  isKanbanFile(file: TFile): boolean {
    const cache = this.app.metadataCache.getFileCache(file);
    return cache?.frontmatter?.[frontmatterKey] === 'board';
  }

  /**
   * Get sub-board info for a file, using cache if available
   */
  async getSubBoardInfo(
    filePath: string,
    settings: CountingSettings,
    originPath?: string
  ): Promise<SubBoardInfo | null> {
    const file = this.app.vault.getAbstractFileByPath(filePath);

    if (!(file instanceof TFile)) {
      return {
        isSubBoard: false,
        openCount: 0,
        totalCount: 0,
        lastUpdated: Date.now(),
        error: 'File not found',
      };
    }

    // Check if it's a kanban file
    if (!this.isKanbanFile(file)) {
      return null;
    }

    // Check for circular reference
    if (originPath && this.detectCircularReference(originPath, filePath)) {
      return {
        isSubBoard: true,
        openCount: 0,
        totalCount: 0,
        lastUpdated: Date.now(),
        error: 'Circular reference',
      };
    }

    // Check cache
    const cacheKey = this.getCacheKey(filePath, settings);
    const cached = this.cache.get(cacheKey);

    if (cached && Date.now() < cached.expiry) {
      return cached.info;
    }

    // Parse the board and count tasks
    try {
      const counts = await this.countOpenTasks(file, settings);

      const info: SubBoardInfo = {
        isSubBoard: true,
        openCount: counts.open,
        totalCount: counts.total,
        lastUpdated: Date.now(),
      };

      // Cache the result
      this.cache.set(cacheKey, {
        info,
        expiry: Date.now() + this.TTL,
      });

      return info;
    } catch (error) {
      console.error('Error counting sub-board tasks:', error);
      return {
        isSubBoard: true,
        openCount: 0,
        totalCount: 0,
        lastUpdated: Date.now(),
        error: 'Parse error',
      };
    }
  }

  /**
   * Invalidate cache for a specific file
   */
  invalidate(filePath: string): void {
    // Remove all cache entries for this file (regardless of settings)
    for (const key of this.cache.keys()) {
      if (key.startsWith(filePath + ':')) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * Clear all cache entries
   */
  clearAll(): void {
    this.cache.clear();
  }

  /**
   * Detect circular references between boards
   * A circular reference is when the sub-board contains a link back to the origin board
   * (i.e., A links to B, and B links to A)
   */
  private detectCircularReference(originPath: string, targetPath: string): boolean {
    // Simple check: if we're trying to reference the same file
    if (originPath === targetPath) {
      return true;
    }

    // Check if the target board contains a card linking back to the origin
    const targetFile = this.app.vault.getAbstractFileByPath(targetPath);
    if (!(targetFile instanceof TFile)) {
      return false;
    }

    // Check outgoing links from target board
    const cache = this.app.metadataCache.getFileCache(targetFile);
    if (cache?.links) {
      for (const link of cache.links) {
        const linkedFile = this.app.metadataCache.getFirstLinkpathDest(link.link, targetPath);
        if (linkedFile && linkedFile.path === originPath) {
          // Target board has a card linking back to origin - that's circular
          return true;
        }
      }
    }

    return false;
  }

  /**
   * Count open tasks in a board file
   */
  private async countOpenTasks(
    file: TFile,
    settings: CountingSettings
  ): Promise<{ open: number; total: number }> {
    const content = await this.app.vault.read(file);
    const lines = content.split('\n');

    let open = 0;
    let total = 0;
    let inArchive = false;
    let currentLaneIsComplete = false;
    let sawArchiveSeparator = false;
    let inFrontmatter = false;

    const doneChar = getTaskStatusDone();

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();

      // Handle frontmatter (skip it)
      if (i === 0 && trimmed === '---') {
        inFrontmatter = true;
        continue;
      }
      if (inFrontmatter) {
        if (trimmed === '---') {
          inFrontmatter = false;
        }
        continue;
      }

      // Archive section starts with *** followed by ## Archive
      if (trimmed === '***') {
        sawArchiveSeparator = true;
        continue;
      }

      // Detect lane headings
      if (line.startsWith('## ')) {
        if (sawArchiveSeparator && trimmed.toLowerCase().includes('archive')) {
          inArchive = true;
        } else {
          inArchive = false;
          sawArchiveSeparator = false;
        }
        currentLaneIsComplete = false;
        continue;
      }

      // Detect **Complete** marker (indicates lane marks items complete)
      if (trimmed === '**Complete**') {
        currentLaneIsComplete = true;
        continue;
      }

      // Count list items with checkboxes
      const checkboxMatch = line.match(/^(\s*[-*+]\s+)\[(.)\]/);
      if (checkboxMatch) {
        const checkChar = checkboxMatch[2];
        const isChecked = checkChar === 'x' || checkChar === 'X' || checkChar === doneChar;

        total++;

        // Determine if this card is "open" based on settings
        // A card is open if it's unchecked AND meets the enabled criteria
        if (isChecked) {
          continue; // Checked cards are never counted as open
        }

        let isOpen = false;

        // Count if ANY of the enabled settings match
        if (settings.countUnchecked) {
          isOpen = true;
        }
        if (settings.countNonArchived && !inArchive) {
          isOpen = true;
        }
        if (settings.countNonCompleteLane && !currentLaneIsComplete) {
          isOpen = true;
        }

        if (isOpen) {
          open++;
        }
      }
    }

    return { open, total };
  }

  /**
   * Generate cache key from file path and settings
   */
  private getCacheKey(filePath: string, settings: CountingSettings): string {
    return `${filePath}:${settings.countUnchecked}:${settings.countNonArchived}:${settings.countNonCompleteLane}`;
  }
}
