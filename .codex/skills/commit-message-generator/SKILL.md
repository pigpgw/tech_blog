---
name: commit-message-generator
description: Use when generating, reviewing, or refining commit messages from code or documentation changes. Applies to this project's Korean Conventional Commits rule: analyze git changes, choose an appropriate type and optional scope, write the subject in Korean ending with "~한다", and include body/footer only when useful.
---

# Commit Message Generator

## One-Line Definition

Code change analysis automation that generates a good commit message from the actual diff.

## Mission

Analyze the current changes and produce a commit message that follows this project's commit convention.

## Commit Rules

- Use Conventional Commits.
- Write commit content in Korean.
- End the subject sentence with `~한다`.
- Use body and footer only when needed.
- Prefer `type: subject` by default.
- Use `scope` only when it makes the affected area clearer.
- Mark breaking changes with `!` or `BREAKING CHANGE:` in the footer.
- Suggest `Co-authored-by: Codex <codex@openai.com>` only when Codex directly produced or edited meaningful committed artifacts.
- Do not add `Co-authored-by` when the user did the actual work and Codex only answered a question, gave light feedback, or checked wording.
- Do not add `Co-authored-by` for trivial formatting, simple questions, or low-value boilerplate.

## Format

```txt
type(scope)!: subject

body

footer
```

For most commits, output only:

```txt
type: subject
```

## Types

- `feature`: 새로운 기능 추가
- `fix`: 버그 수정
- `refactor`: 동작 변경 없는 코드 구조 개선
- `docs`: 문서 수정
- `style`: UI 스타일 또는 CSS 수정
- `chore`: 설정, 패키지, 빌드 관련 작업
- `test`: 테스트 추가 또는 수정

## Workflow

1. Inspect changed files with `git status --short`.
2. Prefer staged changes when they exist:
   - Use `git diff --cached --stat`.
   - Use `git diff --cached` when more detail is needed.
3. If there are no staged changes, inspect unstaged changes:
   - Use `git diff --stat`.
   - Use `git diff` when more detail is needed.
4. Decide whether the changes are one logical commit.
5. If changes mix unrelated purposes, recommend splitting before generating a final single message.
6. Choose the narrowest accurate type.
7. Add a scope only when it improves clarity.
8. Generate one recommended message and, when useful, 1-2 alternatives.

## Type Selection

- Documentation-only changes: `docs`
- New user-facing behavior or route: `feature`
- Incorrect behavior fixed: `fix`
- Internal code structure changed without behavior change: `refactor`
- CSS or visual layout change: `style`
- Tooling, package, CI, config, setup: `chore`
- Test files or test setup: `test`

When multiple types seem possible, choose the type that reflects the main user-visible or project-management purpose of the commit.

## Body Guidelines

Write a body only when the subject cannot explain the reason or intent.

Good body content:

- Why the change was made
- Important implementation context
- Tradeoff or migration note

Avoid repeating the subject in the body.

## Footer Guidelines

Write a footer only for:

- `BREAKING CHANGE:`
- related issue or reference link
- Codex directly producing or editing committed artifacts:

```txt
Co-authored-by: Codex <codex@openai.com>
```

Do not use `Co-authored-by` just because Codex discussed the task. Use it only when Codex-authored changes are part of the commit.

## Output

When the user asks for a commit message, return:

- Recommended message
- Reason for type/scope choice
- Optional alternatives when useful
- Split recommendation if the diff contains unrelated changes

When the user asks to commit, show the chosen message before committing unless the user already provided an exact message.

## Examples

```txt
docs: 기술스택 선정 이유를 정리한다
feature: 홈 페이지를 구현한다
feature(blog): slug 기반 게시글 상세 페이지를 구현한다
fix: draft 게시글이 노출되는 문제를 수정한다
refactor: 게시글 조회 로직을 별도 함수로 분리한다
style: 모바일 글 목록 레이아웃을 개선한다
chore: Next.js 초기 설정을 추가한다
test: 게시글 정렬 로직 테스트를 추가한다
fix(post)!: 게시글 slug 생성 방식을 변경한다
```

With Codex attribution:

```txt
docs: 1차 프로젝트 문서와 AI 활용 기록을 정리한다

Co-authored-by: Codex <codex@openai.com>
```
