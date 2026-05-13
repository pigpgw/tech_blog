---
name: semantic-a11y-publisher
description: Use when implementing or reviewing publishing requests from screenshots, Figma links, verbal requirements, or existing React/Next.js markup where semantic structure and accessibility must be handled first. Applies to JSX/HTML structure, landmarks, headings, links, buttons, form labels, image text alternatives, keyboard navigation, and ARIA state.
---

# Semantic A11y Publisher

## Mission

Turn screenshots, Figma links, verbal requirements, or existing markup into semantic, accessible JSX/HTML structure before expanding implementation scope.

Use this Skill when the user asks for publishing work and the main risk is unclear document structure, missing accessible names, incorrect interactive elements, or weak keyboard flow.

## Workflow

1. Identify the page or component purpose.
2. Separate content, navigation, and user actions.
3. Inspect existing landmarks, heading order, links, buttons, labels, and dynamic states.
4. Make the smallest structural change that fixes the issue.
5. Preserve existing visual intent unless the user explicitly asks for a visual change.
6. Verify with lint/build and a keyboard walkthrough.
7. Report the changed files, accessibility decisions, and remaining follow-up items.

## Rules

- Use one representative `h1` per page unless the page has a documented reason not to.
- Match heading levels to document structure, not visual size.
- Use `header`, `nav`, `main`, `section`, `article`, `aside`, and `footer` only when their meaning matches the content.
- Use `div` for layout wrappers that do not create a meaningful document section.
- Use links for navigation and buttons for actions.
- Do not add click handlers to non-interactive elements when a native link or button fits.
- Give every icon-only link or button an accessible name.
- Do not overwrite a useful visible label with a different `aria-label`.
- Hide decorative icons with `aria-hidden="true"`.
- Represent dates with `time dateTime` when the value is a date or datetime.
- Represent repeated content as `ul`/`ol` and `li` when it is a list.
- Wrap independent repeatable content in `article` when each item can stand on its own.
- Connect form controls to visible labels or justified hidden labels.
- Use `aria-current="page"` for the current navigation item.
- Use `aria-expanded`, `aria-controls`, and keyboard support for disclosure-like controls.
- Use `role="status"` or `aria-live="polite"` only for dynamic messages users need to hear.
- Avoid ARIA when native HTML already provides the role, name, or state.

## Publishing Request Checklist

When the input is a screenshot or Figma link:

1. Name the page or component.
2. Identify the visible heading hierarchy.
3. Identify navigation targets and user actions.
4. Identify lists, cards, articles, forms, dialogs, tabs, and disclosure controls.
5. Decide which elements need accessible names or state.
6. Implement structure in small file-scoped changes.

When the input is a verbal request:

1. Restate the target screen and user action in one sentence.
2. Ask for missing content only if the structure cannot be inferred.
3. Prefer existing project components and conventions.
4. Keep the first implementation focused on semantic structure and accessibility.

## Validation

Run the relevant project checks after edits:

```sh
npm run lint
npm run build
```

If files were formatted by the project, also run the project format check for the changed files.

Keyboard walkthrough:

1. Tab from the header into the main content.
2. Confirm focus is visible on links, buttons, inputs, and cards.
3. Confirm Enter activates links.
4. Confirm Space activates buttons.
5. Confirm dynamic messages are announced only when useful.

## Output

When finishing, summarize:

- Files changed
- Semantic structure decisions
- Accessible names, labels, and ARIA decisions
- Keyboard or build checks performed
- Follow-up work that should be handled separately
