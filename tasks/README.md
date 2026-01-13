# Obsidian Kanban Bug Triage

## Summary Statistics

- **Total Open Bugs:** 202
- **Generated:** 2026-01-10
- **Last Updated:** 2026-01-12

### Triage Progress

| Status           | Count |
| ---------------- | ----- |
| Fixed            | 92    |
| Verified         | 21    |
| Cannot Reproduce | 30    |
| Won't Fix        | 24    |
| Needs Info       | 20    |
| Duplicate        | 15    |
| Unverified       | 0     |

### By Operating System

| OS      | Count |
| ------- | ----- |
| Windows | 98    |
| macOS   | 56    |
| Linux   | 24    |
| iOS     | 17    |
| Android | 6     |
| Unknown | 1     |

## Status Legend

- `unverified` - Not yet investigated
- `verified` - Bug confirmed, investigating
- `fixed` - Fix implemented
- `cannot_reproduce` - Unable to reproduce
- `wontfix` - Not a bug or out of scope
- `needs_info` - Requires more information from reporter
- `duplicate` - Duplicate of another issue

## Fixes Applied

### Commit: (pending) (2026-01-12)

| Issue              | Title                           | Fix                                                                     |
| ------------------ | ------------------------------- | ----------------------------------------------------------------------- |
| [#883](bug-883.md) | Grey lozenge on short titles    | Add CSS to reset background on inner wrapper divs in lane titles        |
| [#899](bug-899.md) | Callout icons not displayed     | Add CSS for .callout-icon display flex with proper SVG sizing           |
| [#655](bug-655.md) | Callout icons missing           | Same fix as #899                                                        |
| [#904](bug-904.md) | Date showing both raw and chip  | Hide inline dates/times in preprocessTitle when moveDates is true       |
| [#647](bug-647.md) | Markdown syntax not rendering   | Tags/dates controlled by settings; highlight CSS already present        |
| [#711](bug-711.md) | CJK text cut-off in cards       | Use --line-height-normal instead of --line-height-tight for item titles |
| [#668](bug-668.md) | Checkbox cycle hotkey           | Add Mod-l keybinding to cycle checkbox states in card editor            |
| [#908](bug-908.md) | Mobile settings positioning     | Add mobile-specific CSS for full-screen modal on iOS                    |
| [#783](bug-783.md) | Kanban in callout gap           | Negative margin to compensate for callout padding                       |
| [#876](bug-876.md) | Checkbox/strikethrough mismatch | Add preventDefault/stopPropagation to checkbox handler                  |
| [#296](bug-296.md) | Can't always drag to bottom     | Ensure placeholder hitboxes have a minimum size for drop targeting      |
| [#576](bug-576.md) | Nested tasks/subtasks not saved | Normalize list indentation when serializing multi-line card content     |
| [#580](bug-580.md) | Trackpad drag unreliable iPadOS | Disable native drag on links/images inside cards                        |
| [#583](bug-583.md) | Sliding panes drop behind pane  | Filter hitbox targets by drag scope                                     |
| [#595](bug-595.md) | Embedded block task toggle      | Allow embedded checkbox clicks to propagate                             |
| [#603](bug-603.md) | ResizeObserver loop crash       | Throttle resize observer updates with requestAnimationFrame             |
| [#666](bug-666.md) | Reading mode resets on switch   | Preserve markdown view state when toggling kanban                       |
| [#693](bug-693.md) | Drag state degrades over time   | Refresh hitbox and scroll entities when drag starts                     |
| [#731](bug-731.md) | Tasks query render glitch       | Trigger markdown preview render after card render                       |
| [#751](bug-751.md) | Mobile drag performance         | Skip drag updates for sub-pixel movement                                |
| [#759](bug-759.md) | File explorer links             | Open Windows/file links via default app                                 |
| [#779](bug-779.md) | Split-pane typing lag           | Yield markdown preview work with requestIdleCallback                    |
| [#839](bug-839.md) | External edit switches view     | Keep kanban view if frontmatter still present                           |
| [#851](bug-851.md) | Date colors missing             | Apply date color styling to relative date badge                         |
| [#855](bug-855.md) | Non-list content data loss      | Block saves when non-kanban content is detected                         |
| [#867](bug-867.md) | Embedded checkbox refresh       | Force refresh after embedded checkbox toggle                            |
| [#884](bug-884.md) | Settings freeze                 | Filter folders/templates from loaded files instead of recursion         |
| [#901](bug-901.md) | Image zoom cropped              | Allow image embed overflow within card preview                          |
| [#945](bug-945.md) | ChromeOS drag failure           | Set touch-action none on item wrapper                                   |
| [#981](bug-981.md) | Visual card duplication         | Force refresh after same-board drag                                     |
| [#998](bug-998.md) | Enter key stuck in edit         | Only treat Shift+Enter as newline when configured                       |

### Commit: 9ca8685 (2026-01-12)

| Issue                | Title                     | Fix                                                                                |
| -------------------- | ------------------------- | ---------------------------------------------------------------------------------- |
| [#1103](bug-1103.md) | Typing lag in long cards  | Use updateDeco() instead of createDeco() for incremental decoration updates        |
| [#1111](bug-1111.md) | DnD glitch in narrow tabs | Make scroll trigger zones proportional to container size (20%, min 10px, max 35px) |

### Commit: 3c08425 (2026-01-12)

| Issue                | Title                            | Fix                                                                   |
| -------------------- | -------------------------------- | --------------------------------------------------------------------- |
| [#1023](bug-1023.md) | CodeMirror measure loop errors   | Delay posAtCoords() with requestAnimationFrame until DOM settles      |
| [#1067](bug-1067.md) | LaTeX expressions breaking cards | Restrict blockid parser to alphanumeric chars and hyphens             |
| [#1078](bug-1078.md) | iOS board converting to note     | Add fallback to check kanbanFileModes when metadata cache unavailable |

### Commit: 765d130 (2026-01-12)

| Issue              | Title                                           | Fix                                                                 |
| ------------------ | ----------------------------------------------- | ------------------------------------------------------------------- |
| [#754](bug-754.md) | Copy link to card doesn't scroll                | Added ephemeral state for block refs, scroll-to-card with highlight |
| [#870](bug-870.md) | Archive incorrectly includes non-complete tasks | Only archive items with [x] status, not all items in complete lanes |
| [#802](bug-802.md) | Add card button off screen on mobile            | Added CSS for proper flexbox layout on mobile                       |

### Commit: (pending) (2026-01-11)

| Issue              | Title                                        | Fix                                                    |
| ------------------ | -------------------------------------------- | ------------------------------------------------------ |
| [#652](bug-652.md) | Note folder dropdown empty after folder move | Show stale values in dropdown with '(not found)' label |

### Commit: b877c41 (2026-01-11)

| Issue                | Title                                        | Fix                                                                   |
| -------------------- | -------------------------------------------- | --------------------------------------------------------------------- |
| [#970](bug-970.md)   | Non-md files rendered as embeds              | Strip ! prefix from generateMarkdownLink for non-md files in linkTo() |
| [#1121](bug-1121.md) | Table column resize broken in popout windows | Create custom resize handler using e.view.document                    |
| [#1082](bug-1082.md) | Data loss when opening non-kanban file       | Add warning modal before opening files with non-kanban content        |

### Commit: b7589f0 (2026-01-11)

| Issue              | Title                             | Fix                                           |
| ------------------ | --------------------------------- | --------------------------------------------- |
| [#680](bug-680.md) | Tab title bar shows when disabled | Remove !important forcing view-header display |

### Commit: d03a264 (2026-01-11)

| Issue              | Title                                | Fix                                                                        |
| ------------------ | ------------------------------------ | -------------------------------------------------------------------------- |
| [#665](bug-665.md) | Add a card button not visible on iOS | Add flex: 1, min-height: 0 to lane-items for proper iOS Safari flex sizing |

### Commit: fc52b5b (2026-01-11)

| Issue                | Title                                | Fix                                                                     |
| -------------------- | ------------------------------------ | ----------------------------------------------------------------------- |
| [#638](bug-638.md)   | Context menu spell check not working | Track contextmenu events and allow Enter to pass through when menu open |
| [#1002](bug-1002.md) | Settings freeze with 80k+ files      | Limit dropdown items to 500 to prevent UI freeze on large vaults        |

### Commit: a8342bd (2026-01-11)

| Issue                | Title                               | Fix                                                |
| -------------------- | ----------------------------------- | -------------------------------------------------- |
| [#996](bug-996.md)   | New notes not created in set folder | Check folder exists with instanceof before using   |
| [#1172](bug-1172.md) | Multiline code blocks broken        | Preserve newlines inside code blocks in replaceBrs |

### Commit: d2b109f (2026-01-11)

| Issue                | Title                       | Fix                                                                                   |
| -------------------- | --------------------------- | ------------------------------------------------------------------------------------- |
| [#1162](bug-1162.md) | Cannot drag to reorder list | Register entity immediately in hitboxEntities to fix IntersectionObserver timing race |
| [#636](bug-636.md)   | Cmd+K doesn't create link   | Add Mod-k keymap handler to create markdown link from selection                       |

### Commit: 3e54dc3 (2026-01-11)

| Issue              | Title                                    | Fix                                                     |
| ------------------ | ---------------------------------------- | ------------------------------------------------------- |
| [#516](bug-516.md) | Markdown links with date selector broken | Use minimal encoding for path (only encode parentheses) |

### Commit: 3aba230 (2026-01-11)

| Issue                | Title                                        | Fix                                                             |
| -------------------- | -------------------------------------------- | --------------------------------------------------------------- |
| [#465](bug-465.md)   | Quick switcher doesn't recognize kanban pane | Add click handler to set active leaf                            |
| [#1083](bug-1083.md) | Sort tags submenu not working on iPad        | Use Platform.isMobile instead of Platform.isPhone for flat menu |

### Commit: e8f05ba (2026-01-11)

| Issue                | Title                                     | Fix                                                                   |
| -------------------- | ----------------------------------------- | --------------------------------------------------------------------- |
| [#1148](bug-1148.md) | Typewriter Scroll plugin conflict         | Override padding in .cm-scroller/.cm-content for kanban editors       |
| [#1167](bug-1167.md) | Move line up/down fails after kanban edit | Same root cause as #1132 - fixed by activeEditor cleanup              |
| [#1043](bug-1043.md) | Tasks/Dataview checkboxes not clickable   | Allow clicks on checkboxes inside .dataview and .block-language-tasks |

### Commit: a9c2e18 (2026-01-11)

| Issue                | Title                                | Fix                                                     |
| -------------------- | ------------------------------------ | ------------------------------------------------------- |
| [#1112](bug-1112.md) | Arrow keys in list title change tabs | Stop propagation of arrow key events in MarkdownEditor  |
| [#787](bug-787.md)   | YAML frontmatter extra newlines      | Trim `stringifyYaml` output to remove extra blank lines |

### Commit: 4acecb7 (2026-01-10)

| Issue              | Title                                            | Fix                                                           |
| ------------------ | ------------------------------------------------ | ------------------------------------------------------------- |
| [#831](bug-831.md) | Date color rules - longer spans override shorter | Sort by distance from now so shorter time spans checked first |

### Commit: 2d4790c (2026-01-10)

| Issue              | Title                                  | Fix                                                             |
| ------------------ | -------------------------------------- | --------------------------------------------------------------- |
| [#810](bug-810.md) | Calendar 'today' marker doesn't update | Add `now: new Date()` to flatpickr in `constructMenuDatePicker` |

### Commit: 83aafa4 (2026-01-10)

| Issue                | Title                                        | Fix                                                                            |
| -------------------- | -------------------------------------------- | ------------------------------------------------------------------------------ |
| [#1132](bug-1132.md) | Keyboard shortcuts blocked after view switch | Move `activeEditor` cleanup outside mobile block, add explicit blur on cleanup |

### Commit: 3f08e49 (2026-01-10)

| Issue                | Title                         | Fix                                                                                          |
| -------------------- | ----------------------------- | -------------------------------------------------------------------------------------------- |
| [#1072](bug-1072.md) | Vim mode :w doesn't save card | Added `save()` and `requestSave()` methods to editor controller, plus `Mod-s` keymap handler |

### Commit: 047825f (2026-01-10)

| Issue                | Title                                      | Fix                                                                                                 |
| -------------------- | ------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| [#1036](bug-1036.md) | Relative date text doesn't update          | Added 1-minute refresh interval to `RelativeDate` component (`src/components/Item/DateAndTime.tsx`) |
| [#1051](bug-1051.md) | Cross-board drag scroll affects all boards | Filter scroll entities by `scopeId` in `DragManager.calculateDragIntersect()`                       |

### Commit: deea7b3 (2026-01-10)

| Issue                | Title                                   | Fix                                                                                                |
| -------------------- | --------------------------------------- | -------------------------------------------------------------------------------------------------- |
| [#1004](bug-1004.md) | kanban:card-moved events no longer fire | Created `kanbanEvents.ts` helper and added event triggers throughout board modifiers               |
| [#1066](bug-1066.md) | Daily Notes Settings not respected      | Integrated `obsidian-daily-notes-interface` to use Daily Notes plugin settings when creating notes |
| [#1024](bug-1024.md) | Table `<br>` tags disappear             | Made `replaceBrs()` table-aware to preserve `<br>` in table cells                                  |
| [#1000](bug-1000.md) | Multiple dates only edits first         | Added `data-date-index` attribute tracking for multiple inline dates                               |

### Commit: 08a44bf (2026-01-10)

| Issue                | Title                                               | Fix                                                                                                 |
| -------------------- | --------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| [#1160](bug-1160.md) | Dropping link on board causes the link to be opened | Added `e.preventDefault()` in `onDrop` handler (`src/dnd/managers/DragManager.ts:498`)              |
| [#1055](bug-1055.md) | Non-passive touchstart listener warning             | Added `{ passive: true }` to touchstart listener (`src/dnd/managers/DragManager.ts:469`)            |
| [#1075](bug-1075.md) | Broken roadmap link in README                       | Removed broken link from `README.md`                                                                |
| [#705](bug-705.md)   | Checkboxes cropped in cards                         | Changed `overflow: hidden` to `overflow: visible` on `.kanban-plugin__item` (`src/styles.less:691`) |
| [#714](bug-714.md)   | Subbullet checkboxes cut off                        | Same fix as #705                                                                                    |
| [#730](bug-730.md)   | Checkboxes are cut off                              | Same fix as #705                                                                                    |

### Commit: cf56fdf (2026-01-10)

| Issue                | Title                        | Fix                                                                                   |
| -------------------- | ---------------------------- | ------------------------------------------------------------------------------------- |
| [#1110](bug-1110.md) | Scroll speed too fast        | Reduced `scrollStrengthModifier` from 8 to 5 (`src/dnd/managers/ScrollManager.ts:26`) |
| [#596](bug-596.md)   | Middle click opens two panes | Added `stopPropagation()` to onLinkClick handler (`src/helpers/renderMarkdown.ts:60`) |

### Commit: fc50e41 (2026-01-10)

| Issue                | Title                                                         | Fix                                                                                                    |
| -------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| [#700](bug-700.md)   | Cannot submit card with trackpad on iPad                      | Changed Submit button from `onClick` to `onPointerUp` (`src/components/Editor/MarkdownEditor.tsx:277`) |
| [#766](bug-766.md)   | Submit button not working with mouse/trackpad on iPad         | Same fix as #700                                                                                       |
| [#579](bug-579.md)   | Enter doesn't create new card on iPad                         | Removed Platform.isMobile override in `allowNewLine()` (`src/components/Editor/MarkdownEditor.tsx:30`) |
| [#703](bug-703.md)   | Both New line trigger settings always create new line on iPad | Same fix as #579                                                                                       |
| [#1006](bug-1006.md) | Time trigger 23:01 interpreted as 2023-01-01                  | Added strict mode to moment.js time parsing (`src/parsers/helpers/hydrateBoard.ts:79,107`)             |

### Commit: 92775ab (2026-01-10)

| Issue              | Title                                                 | Fix                                                                            |
| ------------------ | ----------------------------------------------------- | ------------------------------------------------------------------------------ |
| [#830](bug-830.md) | Copy link to card links to wrong card after duplicate | Clear blockId when duplicating items (`src/helpers/boardModifiers.ts:262-269`) |

### Commit: f3090d1 (2026-01-10)

| Issue              | Title                                           | Fix                                                                                                      |
| ------------------ | ----------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| [#848](bug-848.md) | Card title badly formatted with Dataview fields | Also strip Dataview inline fields from filename, preserve after link (`src/components/Item/ItemMenu.ts`) |

### Commit: 68069de (2026-01-10)

| Issue              | Title                                       | Fix                                                                                   |
| ------------------ | ------------------------------------------- | ------------------------------------------------------------------------------------- |
| [#957](bug-957.md) | Tags breaking links in "New note from card" | Strip tags from filename, preserve after link (`src/components/Item/ItemMenu.ts`)     |
| [#984](bug-984.md) | Lane "mark complete" toggle not working     | Added `shouldMarkAsComplete` to useCallback deps (`src/components/Lane/LaneForm.tsx`) |

### Bugs Marked Won't Fix (Theme/Plugin Issues)

| Issue                                  | Title                                   | Reason                                             |
| -------------------------------------- | --------------------------------------- | -------------------------------------------------- |
| [#818](bug-818.md)                     | Add list button text is always white    | Uses Obsidian CSS variables; theme-dependent       |
| [#673](bug-673.md)                     | Button text invisible                   | Uses Obsidian CSS variables; theme-dependent       |
| [#879](bug-879.md)                     | New card text contrast                  | Uses Obsidian CSS variables; theme-dependent       |
| [#793](bug-793.md)                     | Red Graphite theme black text           | Theme doesn't define Kanban CSS variables properly |
| [#822](bug-822.md)                     | Cards not linked to Calendar plugins    | Cross-plugin integration; feature request          |
| [#965](bug-965.md)                     | Templater file rename not updating card | Cross-plugin compatibility                         |
| [#979](bug-979.md)                     | Dataview JS scripts breaking            | Cross-plugin compatibility                         |
| [#985](bug-985.md), [#986](bug-986.md) | Tasks plugin UI issues                  | Cross-plugin compatibility                         |

### Bugs Verified (Complex, Needs More Work)

| Issue              | Title                                                                                                                          | Notes                                                                                                                                                                                                                                                                                                                                                                                   |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [#296](bug-296.md) | Can't always drag to bottom of different list                                                                                  | Intermittent DnD issue - can't drag card to bottom of list sometimes. The hitbox detection for 'after last item' position may fail in certain scroll states. Related to DnD collision/scroll detection algorithms. Hard to reproduce consistently.                                                                                                                                      |
| [#576](bug-576.md) | Nested tasks/subtasks not being saved as such in markdown                                                                      | Nested tasks/subtasks not preserved as indented list items in markdown output. The serializer may be flattening nested structure. Related to proper task hierarchy handling.                                                                                                                                                                                                            |
| [#580](bug-580.md) | Drag/Drop with trackpad isn't reliable iPadOS                                                                                  | iPadOS trackpad DnD unreliable. Sometimes grabs URL instead of card, sometimes nothing happens. Related to #1005 (iPad move cards). The pointer event handling for trackpad may differ from touch.                                                                                                                                                                                      |
| [#583](bug-583.md) | When using Sliding Panes and Kanban plugins together, drag and drop cards can fall into another kanban behind the current one. | Sliding Panes plugin conflict: cards can drop into overlapping kanban behind current one. DnD hit detection doesn't respect z-order/visibility when panes overlap. Need to check if drop target is visible/frontmost.                                                                                                                                                                   |
| [#595](bug-595.md) | Use "![[]]" in Kanban to display block task, unable to complete/cancel task（multi-level）                                     | Multi-level/nested tasks in embedded block content (![[file#heading]]) can't be toggled. The checkbox click handler may not be finding correct line for nested tasks. Related to #1043 (external plugin checkboxes).                                                                                                                                                                    |
| [#603](bug-603.md) | Crashes with "ResizeObserver loop limit exceeded" or hangs in requestAnimationFrame loop                                       | ResizeObserver loop limit exceeded crash when switching workspaces with popout windows containing kanbans. Complex rendering/lifecycle issue. RAF calls piling up. May need cleanup on workspace change events.                                                                                                                                                                         |
| [#666](bug-666.md) | Switching away from kanban board no longer maintain reading-mode status in split pane layout                                   | Reading mode not maintained when switching away from kanban in split pane layout. Kanban registers as a custom view type, which may affect how Obsidian handles view state preservation. Complex view lifecycle issue.                                                                                                                                                                  |
| [#693](bug-693.md) | Kanban will sometimes have issues if left open for long periods of time                                                        | Visual issues after leaving kanban open for extended periods. Cards turn invisible when dragging, drag/drop fails. Likely memory/state management issue. Related to #810 (calendar date caching). May be React state going stale or event handlers accumulating.                                                                                                                        |
| [#731](bug-731.md) | Initial entry of a task query does not render correctly in kanban card                                                         | Tasks plugin queries don't render correctly on initial card creation - only first task shows checkbox. Related to #550 (Dataview rendering) and #655 (callouts). External plugin code blocks may not be fully processed by the markdown renderer on initial render. Works after reload.                                                                                                 |
| [#751](bug-751.md) | Moving of cards in a large board on mobile is extremely slow and laggy                                                         | Performance issue on older iOS device (iPhone SE 1st gen) with 300+ cards. DnD operations become extremely slow. Works on newer device. Related to mobile performance issues - may need virtualization or reduced re-renders.                                                                                                                                                           |
| [#759](bug-759.md) | can't open file explorer links                                                                                                 | Windows file paths like [c](c:\) don't open in kanban view but work in markdown view. The link renderer may not handle file:// or Windows UNC paths correctly.                                                                                                                                                                                                                          |
| [#779](bug-779.md) | Typing lag if opened in split window                                                                                           | Typing lag in other panes when kanban is open in split view. Related to #693 (performance after long periods). Kanban rendering/updating may be blocking or causing excessive repaints. Old version (1.5.2) but pattern may still exist.                                                                                                                                                |
| [#839](bug-839.md) | Externally modifying an open Kanban board changes it to markdown mode                                                          | External file modification switches kanban to markdown mode. File watcher detects change and triggers view mode change. The view should stay in kanban mode and just refresh data. Need to check file change handler in the view.                                                                                                                                                       |
| [#851](bug-851.md) |                                                                                                                                | Date color definitions not working. User configured colors for relative dates but they're not applied. Need to check date color logic in card rendering and the settings application.                                                                                                                                                                                                   |
| [#855](bug-855.md) | Lost content in daily note which is not displayed in Kanban mode                                                               | CRITICAL: Potential data loss bug. Content not in list items (paragraphs, headings) lost when file reopens as Kanban. Happens with Templater/obligator plugin templates. The Kanban parser may be stripping non-list content on save. Needs urgent investigation of parser and file save logic. HIGH PRIORITY.                                                                          |
| [#867](bug-867.md) | Checkbox linked from an other part of the file is not updated on checked                                                       | Embedded content (![[File#Part]]) checkbox not updating in real-time. When checking a card that references another part of the file via embed, the embedded display doesn't refresh until file is reopened. Cross-file/section reactivity issue.                                                                                                                                        |
| [#884](bug-884.md) | Freeze on Settings Open                                                                                                        | Settings freeze on large vaults (50k+ files). Root cause: getFolderChoices() and getTemplateChoices() in settingHelpers.ts use Vault.recurseChildren synchronously, blocking UI while iterating all files/folders. Fix options: 1) Cache results, 2) Async loading with web worker, 3) Virtualized dropdown, 4) Use Obsidian's search API. Complex fix requiring architectural changes. |
| [#901](bug-901.md) | Enlarging an image in a long list either hides or crops the image                                                              | Image enlarging/zoom feature shows cropped or hidden image in scrollable lists. CSS positioning issue with image zoom overlay. The enlarged image position is calculated relative to list top, not viewport. Related to image embed rendering.                                                                                                                                          |
| [#945](bug-945.md) | Can't drag cards on ChromeOS                                                                                                   | ChromeOS drag and drop not working. May be related to touch/pointer event handling issues we fixed for iPad. ChromeOS runs Linux mode with Electron - may need different pointer event handling. Related to #943 iPad issues.                                                                                                                                                           |
| [#981](bug-981.md) | Random duplication of every cards in Kanban after moving cards                                                                 | Visual-only card duplication after drag/drop - markdown file shows correct state. Likely a React state/rendering issue where UI doesn't match actual data. Toggling view mode resets the UI correctly. Related to #943. Complex state management bug.                                                                                                                                   |
| [#998](bug-998.md) | Pushing Enter wont close the card                                                                                              | User on Windows reports both Enter and Shift+Enter create newlines regardless of setting. Different from #579 (mobile issue). The allowNewLine logic looks correct for desktop. May be related to CodeMirror keymap configuration or another plugin conflict. Needs more investigation.                                                                                                 |

### Commit: f2e93f2 (2026-01-10)

| Issue              | Title                               | Fix                                                                  |
| ------------------ | ----------------------------------- | -------------------------------------------------------------------- |
| [#624](bug-624.md) | Dropped link creates invisible link | Only apply alias if non-empty (`src/components/Item/helpers.ts:606`) |

### Bugs Marked as Duplicate

| Issue              | Title                     | Duplicate of |
| ------------------ | ------------------------- | ------------ |
| [#905](bug-905.md) | Tags showing twice        | #889         |
| [#808](bug-808.md) | Date code appearing       | #904         |
| [#871](bug-871.md) | Time code still appearing | #904         |

### Bugs Marked Won't Fix

| Issue                | Title                                                                                                         | Reason                                                                                                                                                                                                                                                                                                                                                               |
| -------------------- | ------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [#351](bug-351.md)   | No one is thanking Mg Meyers Enough for This Awesome Plugin                                                   | Not a bug. This is a 'thank you' appreciation post for the plugin author, not a bug report. Closing as not applicable.                                                                                                                                                                                                                                               |
| [#395](bug-395.md)   | Dragging an email message into a card does not display the email title on the link                            | Email dragged from AppleMail doesn't show email title as link text. This is a feature request for enhanced drag-drop handling to parse email metadata. Kanban receives raw URL from drag event, not the email title. Would require custom drag data parsing for message:// URLs.                                                                                     |
| [#407](bug-407.md)   | Date and time trigger format appends incorrectly rendering in preview                                         | This is expected moment.js behavior, not a bug. In moment.js format strings, square brackets [] are escape characters - text inside them is output literally. To get literal brackets in output, you need to escape them with additional brackets: use [[]due:: ]YYYY-MM-DD[]] to get [due:: 2021-12-11]. This is a moment.js documentation issue, not a kanban bug. |
| [#439](bug-439.md)   | Syncing issue (between laptop and mobile?)                                                                    | Syncing issues between laptop and mobile. This is an Obsidian Sync / iCloud / cloud service conflict issue, not kanban-specific. Kanban stores data as markdown which syncs normally. User may have file conflicts from sync service or Obsidian Sync configuration issues.                                                                                          |
| [#450](bug-450.md)   | Some conflict with Metaedit plugin                                                                            | Metaedit plugin right-click context menu doesn't work in kanban markdown mode. Third-party plugin compatibility issue. Kanban uses CodeMirror for markdown editing which may not expose the same context menu hooks as regular Obsidian editor. Out of scope.                                                                                                        |
| [#531](bug-531.md)   | Add Date and Time Doesn't Show up if Kanban is opened by HoverEdit plugin                                     | HoverEdit plugin compatibility issue - date picker doesn't show when kanban opened via HoverEdit popup. This is a third-party plugin compatibility issue. HoverEdit may not fully initialize the view context needed for date picker modal. User acknowledges this is more of a feature request.                                                                     |
| [#542](bug-542.md)   | Cannot drag notes from the file list and the Recent files list to the kanban                                  | Cannot drag files from file list into kanban to create cards. This is a feature request, not a bug - kanban has never supported drag-drop file creation. Would require implementing file drop handling in Lane component with custom drop zone. Out of scope for bug fixing.                                                                                         |
| [#649](bug-649.md)   | tags don't show up for meta data                                                                              | User wants tags from linked note's frontmatter to show on kanban card. Kanban only displays tags that are directly in the card text, not metadata from linked notes. This is a feature request, not a bug. Would require fetching and parsing linked note metadata.                                                                                                  |
| [#673](bug-673.md)   | Button text invisible                                                                                         | Similar to #818 - button styling uses Obsidian CSS variables. This is a theme-dependent issue. The plugin correctly uses standard Obsidian theming. User likely has a theme or CSS snippet causing the issue.                                                                                                                                                        |
| [#678](bug-678.md)   |                                                                                                               | User expects markdown mode to not show checkboxes when 'Display card checkbox' is off. However, the checkbox format (- [ ]) IS the underlying data format for kanban items. The setting only controls visual display in kanban view, not the source markdown. This is by design.                                                                                     |
| [#720](bug-720.md)   | (Minor) When title of Kanban column ends with digits in (), digits are displayed as # of cards in this column | Working as designed. The (n) syntax at end of lane titles is used to set WIP limits (src/parsers/helpers/parser.ts:63). Changing would break backwards compatibility. Users should avoid ending lane titles with numbers in parentheses.                                                                                                                             |
| [#780](bug-780.md)   | Default Folder per Kanban Board                                                                               | Feature request, not a bug. User wants per-board folder settings. Currently only global settings for new note folder. Would need to add board-level setting for 'New note folder'.                                                                                                                                                                                   |
| [#793](bug-793.md)   |                                                                                                               | Red Graphite theme causing black on black text in light mode. Theme compatibility issue - the theme doesn't properly define CSS variables used by Kanban. Users should report to theme author or adjust theme settings.                                                                                                                                              |
| [#818](bug-818.md)   | 'Add list' button text is always white in light mode                                                          | Button uses var(--text-on-accent) which is a standard Obsidian CSS variable. The behavior is theme-dependent. The plugin correctly uses Obsidian's theming system. This is a theme configuration issue, not a plugin bug.                                                                                                                                            |
| [#822](bug-822.md)   | Card created don't linked to the Calendars                                                                    | Feature request for Calendar plugin integration. Kanban dates not appearing in Calendar plugins is a cross-plugin integration issue. Would require specific Calendar plugin API support.                                                                                                                                                                             |
| [#879](bug-879.md)   | New card... dark theme... pale grey text on white background                                                  | Text styling uses Obsidian CSS variables (--text-normal, --text-muted, etc.). This is likely a theme or Obsidian version issue, not a plugin bug. User should try with a different theme or default theme.                                                                                                                                                           |
| [#965](bug-965.md)   | Linked note title not updating / refreshing after templater script runs and adjusted the title.               | Templater plugin compatibility issue. When Templater renames a file, Kanban doesn't update the link in the card. This would require listening to Obsidian's file rename events and updating card content accordingly. Cross-plugin interaction issue.                                                                                                                |
| [#979](bug-979.md)   | Kanban V2 with Dataviewjs scripts / Moving files leeds to errors                                              | Dataview JS plugin compatibility issue. The dataviewjs script relies on dv.current().file.folder which may not work correctly inside Kanban cards. Cross-plugin interaction issue.                                                                                                                                                                                   |
| [#985](bug-985.md)   | Failed to save "file name" automatically. Please save the file to make sure edits are retained                | Tasks plugin (v7.4.0) compatibility issue. The 'Failed to save' error appears when Tasks plugin interacts with Kanban editor. This is a cross-plugin interaction issue that would need coordination with Tasks plugin maintainer.                                                                                                                                    |
| [#986](bug-986.md)   | Tasks Pane stays open even after card is created                                                              | Tasks plugin (v7.4.0) compatibility issue. Tasks pane and date picker staying open is a cross-plugin interaction issue. Tasks plugin is injecting UI into Kanban editor that doesn't properly clean up.                                                                                                                                                              |
| [#1080](bug-1080.md) | Dataview inline field "due" not recognized                                                                    | By design: 'due' is in taskFields set and treated specially. Task fields (due, start, created, scheduled, completion) are only extracted from the first line to avoid picking up mentions in card descriptions. This matches Tasks plugin conventions.                                                                                                               |
| [#1104](bug-1104.md) | Command palette is showing only the "Create new board" option                                                 | User expects all kanban commands in palette when no board is open. This is expected behavior - 'Toggle between Kanban and Markdown' and other commands only appear when a kanban board is active. Only 'Create new board' is always available.                                                                                                                       |
| [#1159](bug-1159.md) | "Tag sort order" setting does nothing                                                                         | Not a bug - user misunderstood the feature. 'Tag sort order' controls the order when sorting CARDS by tags (Lane menu > Sort by tags). It does NOT control display order of tags within each card. Tags within cards are sorted alphabetically. The setting description could be clearer.                                                                            |
| [#1168](bug-1168.md) | singboard.exe flagged as threat by corporate antivirus                                                        | Not a kanban bug. User reports 'singboard.exe' (likely signingblock.exe from esbuild dependency) flagged by corporate antivirus. This is a false positive in upstream dependency, not actionable in kanban plugin code.                                                                                                                                              |

### Cannot Reproduce

| Issue                | Title                                                                                                       | Notes                                                                                                                                                                                                                                                                                                                         |
| -------------------- | ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [#529](bug-529.md)   | Can't activate kanban plugin on Android                                                                     | Android 9 plugin activation failure from 2022. 'Unexpected token .' suggests old browser compatibility issue with optional chaining (?.). Very old Android version (Android 9) and old plugin version (1.2.39). Build system likely updated since then. Cannot reproduce on current codebase.                                 |
| [#536](bug-536.md)   | note folder ignores names with hyphens                                                                      | Note folder path with hyphens not working. Investigated code - getFolderChoices() in settingHelpers.ts uses actual folder paths from vault, and ItemMenu.ts uses getAbstractFileByPath() directly. No regex escaping or path manipulation that would strip hyphens. Bug from 2022 likely resolved or was user-specific issue. |
| [#549](bug-549.md)   | Can not show time if choose to hide date on card                                                            | The settings mentioned in bug report ('Hide date on Card', 'Hide data on Card Title') don't exist in current codebase. Settings have been refactored since 2022. Current setting 'move-dates' controls whether dates appear in footer vs body. Cannot reproduce original bug with current UI.                                 |
| [#591](bug-591.md)   | dataview inline metadata is not rendering                                                                   | Old version (1.3.x). Dataview inline metadata [project:: name] value not showing. The metadata rendering system was completely rewritten in 2.0 with proper inline metadata display. Should test with current version.                                                                                                        |
| [#593](bug-593.md)   | In v0.15.6, using "![[]]" to associate files in a new window kanban will error                              | Old version (0.15.6). Embed autocomplete for ![[file#heading]] duplicated heading text. Editor and autocomplete system has been significantly updated since then. Likely fixed in current version.                                                                                                                            |
| [#594](bug-594.md)   | On an existing link, adding "#" to point to the title will add extra symbols                                | Old version. Adding # heading reference to existing wikilink adds extra ]] symbols. Related to #593. Editor autocomplete rewritten in later versions.                                                                                                                                                                         |
| [#617](bug-617.md)   | Drag and drop not working on Debian (any 1.3 version)                                                       | Old Debian/Obsidian version (0.15.9, kanban 1.3.2). DnD not working but works on 1.2.40. Related to #742. These DnD issues were addressed in later versions with the new DnD system.                                                                                                                                          |
| [#618](bug-618.md)   | Plugin doesn't load on Chromebook                                                                           | Old Chromebook issue (2018 model, Obsidian 1.3.0). 'Failed to load plugin' error. May be due to 32-bit Chromium or outdated Chrome version. Likely fixed in newer versions.                                                                                                                                                   |
| [#627](bug-627.md)   | Editing card in 0.16 with multiple lines does not expand                                                    | Old version (Obsidian 0.16). The card editor was completely rewritten in later versions. User should update to current version 2.0.51.                                                                                                                                                                                        |
| [#639](bug-639.md)   | (v 1.3.17) Plugin deactivates on iPad                                                                       | iPad plugin deactivation from 2022 (v1.3.17). Old iOS/Obsidian version. No specific error details provided. Likely resolved in subsequent updates or iOS-specific issue. Cannot reproduce with current codebase.                                                                                                              |
| [#658](bug-658.md)   | Some items are not displaying correctly                                                                     | Visual display issues with 'Add list' button and archive button from 2022 (v1.4.6). Old plugin version. Screenshots show light theme styling issues that have likely been addressed in subsequent CSS updates. Cannot reproduce with current codebase.                                                                        |
| [#670](bug-670.md)   | Slow down / freeze, when opening "new note from card"                                                       | Typing lag when opening note to the right, from Obsidian 1.0 era (2022). This was a common issue during the Obsidian 1.0 transition. Performance improvements since then likely resolved this. Cannot reproduce with current codebase.                                                                                        |
| [#677](bug-677.md)   | A scroll bar appears on the right                                                                           | Scrollbar appears on right side of card on one computer but not another. User couldn't reproduce consistently. CSS overflow issue that may be theme or font-specific. Cannot reproduce without specific conditions.                                                                                                           |
| [#682](bug-682.md)   | Failed to enable plugin in 1.0                                                                              | Old bug from Obsidian 1.0.3 (Nov 2022). DOM insertion error likely fixed in subsequent updates. Would need to reproduce on current Obsidian version to investigate.                                                                                                                                                           |
| [#701](bug-701.md)   | Cannot use command + option + click to open a link to the right                                             | Investigated renderMarkdown.ts - link click handler uses Keymap.isModEvent(evt) which is the correct Obsidian API for detecting modifier keys (Cmd+Alt=split, etc). Code appears correct. Bug from 2022 may have been fixed in subsequent updates or was platform-specific. Needs user testing to confirm.                    |
| [#724](bug-724.md)   | Plugin fails to load on ChromeOS                                                                            | Plugin fails on ChromeOS but works on Android. ChromeOS runs Android apps via container. Other plugins also fail. This is likely a ChromeOS-specific JavaScript engine limitation or container issue, not kanban-specific. Similar to #529 (Android 9 issue).                                                                 |
| [#733](bug-733.md)   | Clicking on Canvas Link in Kanban triggers "Open in App" dialog, instead of opening the canvas in Obsidian. | Canvas links opening external app dialog on Flatpak. The kanban plugin uses openLinkText which should handle all internal files including .canvas. Likely Flatpak sandboxing/MIME handling issue, not plugin bug.                                                                                                             |
| [#735](bug-735.md)   | plugin options (settings dialog) freezes                                                                    | Settings dialog freezing on macOS. From Feb 2023, Obsidian 1.1.9. May be fixed in newer versions or specific to user environment. No recent similar reports.                                                                                                                                                                  |
| [#742](bug-742.md)   | Cannot drag cards and lists when using obsidian under Debian GNOME                                          | Cannot drag on Debian GNOME but works on GNOME Classic. Likely Wayland vs X11 or GNOME-specific pointer handling issue. May be resolved in newer Obsidian versions with better Wayland support.                                                                                                                               |
| [#758](bug-758.md)   | Error with Kanban 1.5.2 in sidebar at startup of Obsidian 1.1.16                                            | Old version (1.5.2, Obsidian 1.1.16). Error: 'Cannot destructure property markdown of null' at startup with kanban in sidebar. Likely fixed in later versions - board parsing improved significantly.                                                                                                                         |
| [#878](bug-878.md)   | adding todays date in the task card is reverting it to Jan 1st 2024                                         | Date picker showing Jan 1st 2024 instead of current date. May be related to date format parsing issues we fixed (strict mode in moment.js). User should update to latest version and verify date format settings match expected format.                                                                                       |
| [#898](bug-898.md)   | Kanaban does not works                                                                                      | Old version 1.5.3 showing 'chaos'. User should update to current version 2.0.51. The 'switch to markdown' and 'back to kanban' functionality was completely rewritten.                                                                                                                                                        |
| [#902](bug-902.md)   | Can't drag and drop cards                                                                                   | Can't drag/drop on old version 1.5.10. Current version 2.0.51 has completely rewritten drag-and-drop system. User should update to latest version.                                                                                                                                                                            |
| [#903](bug-903.md)   | Checkboxes (manual and automatic) in Kanban boards not displayed correctly                                  | Checkbox styling issue on old version 1.5.3. Current version is 2.0.51 with completely rewritten rendering. User should update to latest version.                                                                                                                                                                             |
| [#907](bug-907.md)   | No submission of new ticket possible on mobile when typing a long text in card                              | Submit button hidden with long text on mobile. Related to #925, #943 - mobile submit button issues. The onPointerUp fix and mobile input improvements should address this. May also be scrolling issue that needs CSS fix.                                                                                                    |
| [#925](bug-925.md)   | Can't add new item                                                                                          | User reports missing submit button. This was likely the same issue as #943 which was fixed - the submit button wasn't responding on touch devices. Previous fix changed onClick to onPointerUp which should resolve this.                                                                                                     |
| [#1005](bug-1005.md) | Unable to move cards between lists on iPad.                                                                 | iOS 18 beta 2 specific - unable to move cards via drag or dropdown. Beta software specific issue. May be resolved in later iOS 18 versions or Obsidian TestFlight updates.                                                                                                                                                    |
| [#1058](bug-1058.md) | Text Font broken after new Obsidian update                                                                  | Font sizes larger after Obsidian update. Likely a transient CSS issue with a specific Obsidian version or theme conflict. No other reports. User should try updating Obsidian and disabling themes.                                                                                                                           |
| [#1107](bug-1107.md) | Failed to load plugin                                                                                       | 'h is not a constructor' error on plugin load. This is a minified error suggesting bundling/version mismatch. Likely fixed in newer releases or specific to user's environment. No other reports with same error signature.                                                                                                   |
| [#1163](bug-1163.md) | Kanban board disappeared after git sync?                                                                    | User resolved issue themselves - board reappeared after 2 hours/lock screen. Likely Obsidian file watching issue during git sync, not a kanban bug. No actionable reproduction steps.                                                                                                                                         |

### Bugs Needing More Info

| Issue              | Title                                     | Notes                                                        |
| ------------------ | ----------------------------------------- | ------------------------------------------------------------ |
| [#732](bug-732.md) | Can't switch back to kanban from markdown | Code appears correct, may need specific version to reproduce |

---

## Bug Index

| Issue                | Title                                                              | OS      | Created    |
| -------------------- | ------------------------------------------------------------------ | ------- | ---------- |
| [#1172](bug-1172.md) | Multiline code block not rendered correctly                        | macOS   | 2025-10-30 |
| [#1168](bug-1168.md) | singboard.exe flagged as threat by corporate antivirus             | Windows | 2025-09-29 |
| [#1167](bug-1167.md) | move line up or down fails                                         | macOS   | 2025-09-27 |
| [#1163](bug-1163.md) | Kanban board disappeared after git sync?                           | iOS     | 2025-09-20 |
| [#1162](bug-1162.md) | Cannot drag to reorder list                                        | Windows | 2025-09-07 |
| [#1160](bug-1160.md) | Dropping link on board causes the link to be opened                | Windows | 2025-09-06 |
| [#1159](bug-1159.md) | "Tag sort order" setting does nothing                              | Windows | 2025-09-03 |
| [#1155](bug-1155.md) | No text is printed on Obsidian 1.9.10                              | Windows | 2025-08-22 |
| [#1148](bug-1148.md) | Does not work with Typewriter Scroll plug-in: Large verti...       | Windows | 2025-07-25 |
| [#1137](bug-1137.md) | New note from card                                                 | Windows | 2025-06-02 |
| [#1136](bug-1136.md) |                                                                    | Windows | 2025-06-02 |
| [#1132](bug-1132.md) | Plugin blocks using keyboard shortcuts after switching to...       | macOS   | 2025-05-01 |
| [#1128](bug-1128.md) | 求助一直创建不了                                                   | Windows | 2025-04-19 |
| [#1123](bug-1123.md) | The saving issue of the obsidian-kanban plugin                     | Windows | 2025-04-05 |
| [#1121](bug-1121.md) | Resizing Collumns in Table View inside a floating Window ...       | Windows | 2025-04-01 |
| [#1118](bug-1118.md) | Tags sort order not work                                           | Windows | 2025-03-26 |
| [#1115](bug-1115.md) | Kanban extension not working.                                      | macOS   | 2025-03-17 |
| [#1112](bug-1112.md) | Using left- and right-arrow keys inside list title change...       | Windows | 2025-03-10 |
| [#1111](bug-1111.md) | Glitch when moving card between lists with board displaye...       | macOS   | 2025-03-07 |
| [#1110](bug-1110.md) | Scroll speed too fast                                              | Windows | 2025-03-05 |
| [#1107](bug-1107.md) | Failed to load plugin                                              | Windows | 2025-02-25 |
| [#1104](bug-1104.md) | Command palette is showing only the "Create new board" op...       | macOS   | 2025-02-10 |
| [#1103](bug-1103.md) | When a note on the Kanban board is too long the input sta...       | Linux   | 2025-02-06 |
| [#1102](bug-1102.md) | Opening an active board with the Quick Switcher or URI tu...       | macOS   | 2025-02-06 |
| [#1100](bug-1100.md) | Clicking when adding a new card cancels the add operation...       | macOS   | 2025-01-31 |
| [#1098](bug-1098.md) | In boardview, when list is collapsed, Chinese Characters ...       | Windows | 2025-01-26 |
| [#1096](bug-1096.md) | error message in console on renaming kanban board                  | macOS   | 2025-01-23 |
| [#1094](bug-1094.md) | Tag colour doesn't reset                                           | Linux   | 2025-01-20 |
| [#1091](bug-1091.md) | Edit changes lost when dragging different card                     | macOS   | 2025-01-14 |
| [#1090](bug-1090.md) | Archived cards get lost                                            | macOS   | 2025-01-14 |
| [#1083](bug-1083.md) | Sort tags functions working on iPhone, but not iPad                | iOS     | 2024-12-23 |
| [#1082](bug-1082.md) | Deletes anything not formatted for Kanban board                    | Windows | 2024-12-22 |
| [#1081](bug-1081.md) | All dates in dataview inline fields in the card are colored        | Windows | 2024-12-20 |
| [#1080](bug-1080.md) | Dataview inline field "due" not recognized                         | Linux   | 2024-12-20 |
| [#1079](bug-1079.md) | Enter key nor Shift-Enter key adds card                            | Linux   | 2024-12-11 |
| [#1078](bug-1078.md) | keeps converting my boards to a note                               | iOS     | 2024-12-02 |
| [#1075](bug-1075.md) | README contains link to roadmap, but the link is broken            | macOS   | 2024-11-21 |
| [#1072](bug-1072.md) | Vim mode editing kanban card does not write to file                | macOS   | 2024-11-17 |
| [#1070](bug-1070.md) | Cards moved to a "Complete" list aren't marked as complete         | macOS   | 2024-11-15 |
| [#1069](bug-1069.md) | Extra --- added automatically on card                              | Windows | 2024-11-14 |
| [#1067](bug-1067.md) | Latex tripping up card content                                     | Windows | 2024-11-11 |
| [#1066](bug-1066.md) | Daily Notes Settings should be respected                           | macOS   | 2024-11-07 |
| [#1058](bug-1058.md) | Text Font broken after new Obsidian update                         | Windows | 2024-10-17 |
| [#1055](bug-1055.md) | [Violation] Added non-passive event listener to a scroll-...       | macOS   | 2024-10-08 |
| [#1051](bug-1051.md) | Unwanted scroll when draggin a card from one board to ano...       | Windows | 2024-09-22 |
| [#1048](bug-1048.md) | Date colors don't update when the date changes                     | Windows | 2024-09-16 |
| [#1047](bug-1047.md) | Multi-Column plugin interference with kanban plugins               | Android | 2024-09-08 |
| [#1044](bug-1044.md) | Cannot Drag Before Startup                                         | macOS   | 2024-09-03 |
| [#1043](bug-1043.md) | inline metadata rendered as tasks - checkboxes are not cl...       | Windows | 2024-09-02 |
| [#1036](bug-1036.md) | Time until: not working properly                                   | macOS   | 2024-08-20 |
| [#1029](bug-1029.md) | Unable to open the Kanban in Obsidian 无法在 Obsidian 中打开 ka... | macOS   | 2024-08-07 |
| [#1028](bug-1028.md) | Silent error when failing to create a new note from a card         | Linux   | 2024-08-06 |
| [#1024](bug-1024.md) | Table error display                                                | Windows | 2024-07-29 |
| [#1023](bug-1023.md) | Card edit                                                          | Linux   | 2024-07-21 |
| [#1016](bug-1016.md) | Tag removed and used in the note title when creating new ...       | Linux   | 2024-07-13 |
| [#1013](bug-1013.md) | If you write something, the space is stretched.                    | Windows | 2024-07-04 |
| [#1006](bug-1006.md) | Time trigger not recognized when time's minute is between...       | Windows | 2024-06-27 |
| [#1005](bug-1005.md) | Unable to move cards between lists on iPad.                        | iOS     | 2024-06-27 |
| [#1004](bug-1004.md) | kanban:card-updated and other events no longer fire                | Windows | 2024-06-27 |
| [#1002](bug-1002.md) | 我的天...卡爆我了                                                  | Windows | 2024-06-22 |
| [#1000](bug-1000.md) | Multiple dates can be inserted with `@`, but only the fir...       | Linux   | 2024-06-21 |
| [#998](bug-998.md)   | Pushing Enter wont close the card                                  | Windows | 2024-06-20 |
| [#996](bug-996.md)   | New notes from cards notes not created in folder set in "...       | macOS   | 2024-06-19 |
| [#986](bug-986.md)   | Tasks Pane stays open even after card is created                   | Windows | 2024-06-10 |
| [#985](bug-985.md)   | Failed to save "file name" automatically. Please save the...       | Windows | 2024-06-10 |
| [#984](bug-984.md)   | When creating a list, toggling "Mark card in this list as...       | Linux   | 2024-06-10 |
| [#981](bug-981.md)   | Random duplication of every cards in Kanban after moving ...       | macOS   | 2024-06-07 |
| [#979](bug-979.md)   | Kanban V2 with Dataviewjs scripts / Moving files leeds to...       | Windows | 2024-06-04 |
| [#978](bug-978.md)   | Clicking outline of the Kanban note in the sidebar mak...          | Linux   | 2024-06-03 |
| [#974](bug-974.md)   | Kanban v2 rendering to be very slow when installed togeth...       | Windows | 2024-05-31 |
| [#970](bug-970.md)   | Previously dragging a non-md file onto board displayed a ...       | Windows | 2024-05-30 |
| [#965](bug-965.md)   | Linked note title not updating / refreshing after templat...       | macOS   | 2024-05-27 |
| [#957](bug-957.md)   | New Note from Card with a tag in the heading breaking the...       | Linux   | 2024-05-24 |
| [#945](bug-945.md)   | Can't drag cards on ChromeOS                                       | Linux   | 2024-05-06 |
| [#925](bug-925.md)   | Can't add new item                                                 | macOS   | 2024-04-25 |
| [#908](bug-908.md)   | Mobile positioning of settings tab is off                          | iOS     | 2024-03-09 |
| [#907](bug-907.md)   | No submission of new ticket possible on mobile when typin...       | iOS     | 2024-03-08 |
| [#905](bug-905.md)   | Tags are showing twice in same card                                | macOS   | 2024-03-06 |
| [#904](bug-904.md)   | Date is showing both formatted and in chip                         | macOS   | 2024-03-06 |
| [#903](bug-903.md)   | Checkboxes (manual and automatic) in Kanban boards not di...       | Windows | 2024-03-05 |
| [#902](bug-902.md)   | Can't drag and drop cards                                          | macOS   | 2024-03-05 |
| [#901](bug-901.md)   | Enlarging an image in a long list either hides or crops t...       | Windows | 2024-03-04 |
| [#899](bug-899.md)   | logo of callouts not displayed in card                             | Windows | 2024-02-21 |
| [#898](bug-898.md)   | Kanaban does not works                                             | Windows | 2024-02-21 |
| [#889](bug-889.md)   | Duplicate tags are displayed in cards                              | Windows | 2024-01-31 |
| [#884](bug-884.md)   | Freeze on Settings Open                                            | Windows | 2024-01-22 |
| [#883](bug-883.md)   | Grey Lozenge Appears on List and Card Titles When Title i...       | macOS   | 2024-01-20 |
| [#879](bug-879.md)   | New card... dark theme... pale grey text on white background       | macOS   | 2024-01-15 |
| [#878](bug-878.md)   | adding todays date in the task card is reverting it to Ja...       | Windows | 2024-01-13 |
| [#876](bug-876.md)   | checkbox mismatch with strikethrough                               | Android | 2024-01-04 |
| [#871](bug-871.md)   | after submit, time code still appear on the text                   | iOS     | 2023-12-22 |
| [#870](bug-870.md)   | Archiving does not honor cancelled and in progress task s...       | macOS   | 2023-12-20 |
| [#867](bug-867.md)   | Checkbox linked from an other part of the file is not upd...       | macOS   | 2023-12-15 |
| [#855](bug-855.md)   | Lost content in daily note which is not displayed in Kanb...       | Windows | 2023-11-15 |
| [#851](bug-851.md)   |                                                                    | Windows | 2023-10-27 |
| [#848](bug-848.md)   | card title gets badly formatted                                    | macOS   | 2023-10-25 |
| [#846](bug-846.md)   | card with a linked note sticks to cursor when note is ope...       | macOS   | 2023-10-21 |
| [#839](bug-839.md)   | Externally modifying an open Kanban board changes it to m...       | Windows | 2023-10-05 |
| [#833](bug-833.md)   |                                                                    | macOS   | 2023-09-29 |
| [#831](bug-831.md)   | multi date tag colors [ between now and [x] before now ] ...       | Windows | 2023-09-25 |
| [#830](bug-830.md)   | "Copy Link to Card" links to wrong card, if the card was ...       | Windows | 2023-09-21 |
| [#822](bug-822.md)   | Card created don't linked to the Calendars                         | macOS   | 2023-08-31 |
| [#818](bug-818.md)   | 'Add list' button text is always white in light mode               | Windows | 2023-08-21 |
| [#811](bug-811.md)   | Calendar cursor navigation does not consider alternate fi...       | Windows | 2023-08-11 |
| [#810](bug-810.md)   | calendar current date doesn't change until application is...       | Windows | 2023-08-06 |
| [#808](bug-808.md)   | date code appearing                                                | macOS   | 2023-08-01 |
| [#802](bug-802.md)   | Adding 15+ cards to a single list causes a bug on mobile           | iOS     | 2023-07-22 |
| [#801](bug-801.md)   | Display Tag Colours Not Working                                    | Linux   | 2023-07-19 |
| [#798](bug-798.md)   | Custom Task Statuses Not Preserved                                 | Windows | 2023-07-13 |
| [#793](bug-793.md)   |                                                                    | macOS   | 2023-06-26 |
| [#787](bug-787.md)   | Plugin reformats `yml` front matter undesirably                    | macOS   | 2023-06-04 |
| [#785](bug-785.md)   | Create new notes each time I click on a card                       | Windows | 2023-06-02 |
| [#783](bug-783.md)   | Embedding Kanban in Callout renders a gap                          | macOS   | 2023-05-29 |
| [#780](bug-780.md)   | Default Folder per Kanban Board                                    | Linux   | 2023-05-13 |
| [#779](bug-779.md)   | Typing lag if opened in split window                               | Windows | 2023-05-11 |
| [#778](bug-778.md)   | "Link dates to daily notes" doesn't support date format            | Windows | 2023-05-09 |
| [#766](bug-766.md)   | Submit button not working with mouse / trackpad on iPad            | iOS     | 2023-04-18 |
| [#759](bug-759.md)   | can't open file explorer links                                     | Windows | 2023-04-13 |
| [#758](bug-758.md)   | Error with Kanban 1.5.2 in sidebar at startup of Obsidian...       | Windows | 2023-04-10 |
| [#754](bug-754.md)   | "Copy Link to Card" links don't work as expected                   | Windows | 2023-03-25 |
| [#751](bug-751.md)   | Moving of cards in a large board on mobile is extremely s...       | iOS     | 2023-03-21 |
| [#745](bug-745.md)   | Dates are not highlighted                                          | macOS   | 2023-03-13 |
| [#742](bug-742.md)   | Cannot drag cards and lists when using obsidian under Deb...       | Linux   | 2023-03-03 |
| [#735](bug-735.md)   | plugin options (settings dialog) freezes                           | macOS   | 2023-02-13 |
| [#734](bug-734.md)   | Tasks not saved somtimes                                           | Linux   | 2023-02-11 |
| [#733](bug-733.md)   | Clicking on Canvas Link in Kanban triggers "Open in App" ...       | Linux   | 2023-02-10 |
| [#732](bug-732.md)   | When switching to markdown view, the menu emtry to switch...       | Windows | 2023-02-09 |
| [#731](bug-731.md)   | Initial entry of a task query does not render correctly i...       | macOS   | 2023-02-04 |
| [#730](bug-730.md)   | check boxes are cutted                                             | Linux   | 2023-02-01 |
| [#728](bug-728.md)   | The template function cannot working                               | Windows | 2023-02-01 |
| [#724](bug-724.md)   | Plugin fails to load on ChromeOS                                   | Android | 2023-01-17 |
| [#722](bug-722.md)   | list has multiplied when new card is created                       | macOS   | 2023-01-16 |
| [#720](bug-720.md)   | (Minor) When title of Kanban column ends with digits in (...       | Linux   | 2023-01-10 |
| [#714](bug-714.md)   | Subbullet checkboxes are partially cut of on the left              | macOS   | 2023-01-03 |
| [#713](bug-713.md)   | Dataview metadata in YAML frontmatter is rewritten                 | Windows | 2023-01-03 |
| [#711](bug-711.md)   |                                                                    | Windows | 2022-12-29 |
| [#710](bug-710.md)   | "kanban-plugin":"basic" is not a valid attribute name              | macOS   | 2022-12-28 |
| [#709](bug-709.md)   | Always insert todo blank column                                    | macOS   | 2022-12-27 |
| [#707](bug-707.md)   | Date picker not working or updating set dates                      | Windows | 2022-12-23 |
| [#705](bug-705.md)   | Left side of checkboxes cropped out in inside checkbox lists       | Windows | 2022-12-23 |
| [#704](bug-704.md)   | Unable to display hidden callout contents                          | Linux   | 2022-12-22 |
| [#703](bug-703.md)   | Both _New line trigger_ settings trigger new line on iPad...       | iOS     | 2022-12-22 |
| [#702](bug-702.md)   | Panning/scrolling on mobile (Android) activates links              | Android | 2022-12-22 |
| [#701](bug-701.md)   | Cannot use command + option + click to open a link to the...       | macOS   | 2022-12-21 |
| [#700](bug-700.md)   | Cannot submit new card with cursor/trackpad on iPad                | iOS     | 2022-12-19 |
| [#699](bug-699.md)   | Contents of one of my kanban board just disapeared                 | Windows | 2022-12-18 |
| [#696](bug-696.md)   | Tags don't display at all                                          | macOS   | 2022-12-14 |
| [#695](bug-695.md)   | Local Setting maximum number of archived card doesn't work         | Windows | 2022-12-14 |
| [#693](bug-693.md)   | Kanban will sometimes have issues if left open for long p...       | Windows | 2022-12-09 |
| [#691](bug-691.md)   | Duplicate template content in notes more than two folders...       | Windows | 2022-12-08 |
| [#682](bug-682.md)   | Failed to enable plugin in 1.0                                     | Windows | 2022-11-15 |
| [#680](bug-680.md)   | Turn off the tab title bar but still exist in kanban view          | Windows | 2022-11-10 |
| [#678](bug-678.md)   |                                                                    | Windows | 2022-11-07 |
| [#677](bug-677.md)   | A scroll bar appears on the right                                  | macOS   | 2022-11-07 |
| [#676](bug-676.md)   | didn't support new tab/new group/new window feature when ...       | Windows | 2022-11-05 |
| [#673](bug-673.md)   | Button text invisible                                              | macOS   | 2022-10-28 |
| [#670](bug-670.md)   | Slow down / freeze, when opening "new note from card"              | Windows | 2022-10-26 |
| [#668](bug-668.md)   | Checkbox Cycle Hotkey does not work                                | Linux   | 2022-10-21 |
| [#666](bug-666.md)   | Switching away from kanban board no longer maintain readi...       | Windows | 2022-10-20 |
| [#665](bug-665.md)   | "+Add a card" not showing up on IOS for long kanban lists          | iOS     | 2022-10-18 |
| [#658](bug-658.md)   | Some items are not displaying correctly                            | Linux   | 2022-10-15 |
| [#656](bug-656.md)   | date colors not affecting text nor the relative date               | Windows | 2022-10-10 |
| [#655](bug-655.md)   | Blockquotes are not Rendered; Callouts are missing icon i...       | Windows | 2022-10-09 |
| [#652](bug-652.md)   |                                                                    | Windows | 2022-10-05 |
| [#649](bug-649.md)   | tags don't show up for meta data                                   | macOS   | 2022-10-01 |
| [#647](bug-647.md)   | Some Markdown Syntax not parsed/hidden in Cards                    | Windows | 2022-09-28 |
| [#639](bug-639.md)   | (v 1.3.17) Plugin deactivates on iPad                              | iOS     | 2022-09-14 |
| [#638](bug-638.md)   | Cannot Use context menu to correct spelling.                       | Windows | 2022-09-14 |
| [#636](bug-636.md)   | Cannot create a hyperlink in Kanban mode                           | macOS   | 2022-09-13 |
| [#632](bug-632.md)   | new note from card discards urls                                   | Linux   | 2022-09-07 |
| [#627](bug-627.md)   | Editing card in 0.16 with multiple lines does not expand           | Windows | 2022-08-30 |
| [#624](bug-624.md)   | Dropping live preview link in 0.16 creates an invisible link       | Windows | 2022-08-25 |
| [#618](bug-618.md)   | Plugin doesn't load on Chromebook                                  | Android | 2022-08-12 |
| [#617](bug-617.md)   | Drag and drop not working on Debian (any 1.3 version)              | Linux   | 2022-08-12 |
| [#607](bug-607.md)   | Drag drop stops working in secondary window if main windo...       | Windows | 2022-08-01 |
| [#603](bug-603.md)   | Crashes with "ResizeObserver loop limit exceeded" or hang...       | Windows | 2022-07-28 |
| [#596](bug-596.md)   | Middle click (scroll button) on wikilink opens two new panes       | Windows | 2022-07-19 |
| [#595](bug-595.md)   | Use "![[]]" in Kanban to display block task, unable to co...       | Windows | 2022-07-19 |
| [#594](bug-594.md)   | On an existing link, adding "#" to point to the title wil...       | Windows | 2022-07-19 |
| [#593](bug-593.md)   | In v0.15.6, using "![[]]" to associate files in a new win...       | Windows | 2022-07-19 |
| [#591](bug-591.md)   | dataview inline metadata is not rendering                          | macOS   | 2022-07-15 |
| [#587](bug-587.md)   | in v0.15.5, in Kanban opened in a new window, cards canno...       | Windows | 2022-07-11 |
| [#583](bug-583.md)   | When using Sliding Panes and Kanban plugins together, dra...       | Windows | 2022-07-07 |
| [#580](bug-580.md)   | Drag/Drop with trackpad isn't reliable iPadOS                      | iOS     | 2022-07-04 |
| [#579](bug-579.md)   | Enter doesn't create new card on iPad                              | iOS     | 2022-07-04 |
| [#576](bug-576.md)   | Nested tasks/subtasks not being saved as such in markdown          | Windows | 2022-07-01 |
| [#550](bug-550.md)   | Dataview cannot be rendered in Kanban                              | macOS   | 2022-06-08 |
| [#549](bug-549.md)   | Can not show time if choose to hide date on card                   | macOS   | 2022-06-07 |
| [#542](bug-542.md)   | Cannot drag notes from the file list and the Recent files...       | Windows | 2022-05-24 |
| [#536](bug-536.md)   | note folder ignores names with hyphens                             | macOS   | 2022-05-11 |
| [#531](bug-531.md)   | Add Date and Time Doesn't Show up if Kanban is opened by ...       | Windows | 2022-05-04 |
| [#529](bug-529.md)   | Can't activate kanban plugin on Android                            | Android | 2022-04-30 |
| [#516](bug-516.md)   | Markdown links makes date selector wrong                           | Windows | 2022-04-16 |
| [#465](bug-465.md)   | Quick switcher and active pane issue                               | Windows | 2022-02-15 |
| [#450](bug-450.md)   | Some conflict with Metaedit plugin                                 | Windows | 2022-01-28 |
| [#439](bug-439.md)   | Syncing issue (between laptop and mobile?)                         | Windows | 2022-01-18 |
| [#407](bug-407.md)   | Date and time trigger format appends incorrectly renderin...       | Windows | 2021-12-11 |
| [#395](bug-395.md)   | Dragging an email message into a card does not display th...       | macOS   | 2021-11-30 |
| [#377](bug-377.md)   | Embed preview icon not working on iPad                             | iOS     | 2021-11-10 |
| [#351](bug-351.md)   | No one is thanking Mg Meyers Enough for This Awesome Plugin        | Windows | 2021-10-17 |
| [#296](bug-296.md)   | Can't always drag to bottom of different list                      | Windows | 2021-09-16 |
| [#248](bug-248.md)   | Always switches pane back to edit mode.                            | Unknown | 2021-08-05 |

---

_Auto-generated from GitHub issues_
