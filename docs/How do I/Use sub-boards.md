# Sub-boards (Recursive Kanban Boards)

Sub-boards allow you to create hierarchical kanban structures by linking cards to other kanban boards. This is useful for breaking down complex projects into manageable pieces while maintaining visibility into the overall progress.

## How It Works

Any card that contains a link to another kanban board file automatically becomes a **sub-board reference**. The plugin detects this and displays:

- A **layers icon** and **task count** (e.g., "6 open") in the card footer
- Clicking the indicator opens the linked sub-board

When viewing a sub-board, a **breadcrumb header** appears at the top showing the parent board(s), allowing easy navigation back.

## Creating a Sub-board

### Method 1: Link to an Existing Board

Simply add a wikilink to any existing kanban board in your card:

```markdown
- [ ] [[Project Alpha Board]] Sprint planning
```

The plugin will automatically detect that `Project Alpha Board.md` is a kanban file and display the sub-board indicator.

### Method 2: Create from Context Menu

1. Right-click on any card
2. Select **"Create sub-board"**
3. A new kanban board is created with:
   - A title based on the card content
   - A reference back to the parent board in its frontmatter
4. The card is updated to link to the new board
5. The new board opens in a split pane

## Sub-board Frontmatter

When a sub-board is created (or when you want to manually set up parent references), the frontmatter includes:

```yaml
---
kanban-plugin: board
kanban-parent-boards:
  - "Projects/Main Board.md"
  - "Sprints/Sprint 5.md"
---
```

The `kanban-parent-boards` field is an array, allowing a single board to be referenced from multiple parents.

## Task Count Display

The sub-board indicator shows "X open" where X is the count of open tasks. By default, this counts:

- **Unchecked cards**: Cards with `[ ]` checkbox (not `[x]`)
- **Non-archived cards**: Cards not in the archive section
- **Cards not in complete lanes**: Cards in lanes not marked as "Complete"

Each counting method can be toggled independently in settings.

## Settings

The following settings control sub-board behavior (found in the plugin settings under **Sub-boards**):

| Setting | Default | Description |
|---------|---------|-------------|
| Show sub-board summary | On | Display the sub-board indicator on cards |
| Count unchecked cards | On | Include unchecked `[ ]` cards in open count |
| Count non-archived cards | On | Include non-archived cards in open count |
| Count cards not in complete lanes | On | Exclude cards in "Complete" lanes from count |

## Nesting Depth

Sub-boards can contain their own sub-boards, allowing unlimited nesting depth. Each level will show its parent breadcrumb when opened.

## Edge Cases

### Deleted Sub-boards
If a linked board file is deleted, the indicator shows "Missing" and clicking has no effect.

### Circular References
The plugin detects circular references (Board A → Board B → Board A) and displays "Circular" instead of a task count.

### Multiple Parents
A single board can be a sub-board of multiple parent boards. The breadcrumb will show all parents, separated by commas.

## Example Workflow

1. Create a main project board with high-level epics
2. For each epic card, right-click → "Create sub-board"
3. The epic sub-board opens; add user stories as cards
4. For complex stories, create further sub-boards
5. Parent boards show progress summaries (e.g., "3 open")
6. Navigate up via breadcrumbs, down by clicking indicators
