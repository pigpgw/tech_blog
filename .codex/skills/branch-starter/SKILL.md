---
name: branch-starter
description: Use when starting a new task branch in this repository. Analyzes the requested work, chooses the correct branch type, proposes a kebab-case branch name, checks git state, and creates the branch from dev unless the user explicitly asks otherwise.
---

# Branch Starter

## Mission

Start new work from the correct base branch with a consistent branch name.

## Branch Rules

- Use `main` only for stable production-ready code.
- Use `dev` as the integration branch.
- Create task branches from `dev`.
- Do not create a task branch from `main` unless the user explicitly requests it.
- Do not switch branches when the working tree has uncommitted changes unless the user confirms how to handle them.
- If the user provides an exact branch name, prefer it after checking it follows the project convention.

## Branch Format

```txt
type/task-name
```

Use English kebab-case for `task-name`.

## Types

- `feature`: new feature
- `fix`: bug fix
- `refactor`: code structure improvement without behavior change
- `docs`: documentation change
- `style`: CSS or UI style change
- `chore`: config, package, build, CI, setup
- `test`: test addition or update

## Type Selection

- New route, page, component behavior: `feature`
- Incorrect behavior or broken flow: `fix`
- Internal restructuring without behavior change: `refactor`
- README, roadmap, docs, AI usage log, AGENTS, skill docs: `docs`
- Visual style, layout, spacing, responsive CSS: `style`
- Git, package, lint, prettier, Tailwind, CI, Vercel setup: `chore`
- Unit, integration, e2e, test config: `test`

When multiple types seem possible, choose the type that best represents the main purpose of the task.

## Workflow

1. Inspect current state:
   - `git status --short --branch`
   - `git branch -vv`
2. If there are uncommitted changes:
   - Stop.
   - Explain that branch creation may move existing work.
   - Ask whether to commit, stash, keep changes while switching, or cancel.
3. If not on `dev`:
   - Switch to `dev`.
4. Update local `dev` before branching when network is available:
   - `git pull --ff-only origin dev`
5. Generate or confirm branch name.
6. Create and switch to the branch:
   - `git switch -c type/task-name`
7. Confirm result:
   - `git status --short --branch`

## Naming Guidelines

- Keep names short and specific.
- Use nouns that describe the task, not vague process words.
- Avoid Korean in branch names.
- Avoid spaces, underscores, uppercase letters, and special characters.

Good examples:

```txt
feature/blog-detail
feature/resume-page
fix/post-slug
refactor/post-model
docs/ai-usage-log
style/mobile-header
chore/eslint-prettier
test/post-sort
```

Bad examples:

```txt
feature/work
docs/update
fix/bug
Feature/Blog_Page
docs/문서수정
```

## Output

When proposing a branch, return:

- Selected type
- Branch name
- Reason
- Commands to run or commands already run

When creating a branch, do not commit anything unless the user explicitly asks.
