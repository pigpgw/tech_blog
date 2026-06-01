---
name: blog-ui-publisher
description: Use when implementing, reviewing, or repairing this blog project's UI publishing work. Applies to Home, Resume, Blog, Lab, Admin, semantic JSX/HTML, accessibility, Tailwind/CSS layout, responsive checks, no-design requests, and current-tone UI execution.
---

# Blog UI Publisher

## Mission

Implement and review basic UI publishing for this blog project with one workflow: clarify the screen purpose, build semantic structure first, apply the current visual tone, then validate accessibility, layout, and responsive behavior.

Use this Skill for public pages, Lab pages, Admin screens, and local JSX/HTML/CSS publishing work. Keep code aligned with the existing Next.js, React, TypeScript, Tailwind, and shadcn/ui conventions.

## When To Use

Use this Skill when the user asks to:

- Build or repair UI publishing from a screenshot, Figma link, verbal requirement, or existing page.
- Implement Home, Resume, Blog list, Blog detail, category tree, Lab, or Admin UI.
- Match the current site tone when no formal design exists.
- Fix semantic HTML, accessibility, keyboard flow, focus, overflow, or responsive layout.
- Create or refine a publishing prompt for another AI tool.
- Make local publishing changes without component extraction or refactoring.

Do not use this Skill for:

- Pure backend, database, CI, or deployment work with no UI impact.
- Code review findings format. Use `code-review-fundamentals` for review-only requests.
- Heavy product strategy, article planning, or roadmap restructuring.
- Refactoring, component extraction, headless UI patterns, compound components, or abstraction design unless the user explicitly asks.

## Project Context

- Product: personal tech blog, resume, lab, and admin CMS.
- Public routes: `/`, `/resume`, `/blog`, `/blog/[slug]`, `/blog/categories/[...segments]`, `/lab`, `/lab/[slug]`.
- Admin routes: `/admin/login`, `/admin/posts`, `/admin/posts/new`, `/admin/posts/[id]/edit`, `/admin/posts/[id]/preview`.
- Stack: Next.js App Router, React, TypeScript, Tailwind CSS, shadcn/ui style conventions.
- Public UI tone: clear, content-first, technical, restrained, readable.
- Admin UI tone: quiet, dense, task-focused, form/list/status oriented.

## Workflow

1. Name the route, user, task, and success state.
2. Identify the input source: screenshot, Figma link, verbal requirement, existing code, or current page tone.
3. Inspect existing local markup, tokens, Tailwind patterns, spacing, radius, focus, and page structure.
4. Build semantic structure before styling.
5. Add the minimum layout needed for the task.
6. Add interaction states: loading, empty, error, disabled, dirty, saving, success, validation, and not-found when relevant.
7. Check keyboard flow, focus visibility, accessible names, overflow, and responsive widths.
8. Keep changes local to the requested page or component. Do not extract shared components or reorganize code ownership.
9. If repetition or abstraction looks useful, mention it as follow-up instead of implementing it.
10. If Codex repeats a UI mistake, update this Skill instead of relying on the next prompt.

## No-Design Defaults

When the request is "현재 톤과 비슷하게 퍼블리싱해줘" or no design is provided:

- Match existing pages before inventing a new visual direction.
- Use Tailwind default spacing, font, color, radius, and breakpoint scale unless the project already has a stronger local pattern.
- Keep hierarchy clear: page title, supporting text, primary action, secondary actions, content area.
- Avoid decorative sections, gradient-only backgrounds, nested cards, and marketing-style composition for operational screens.
- Prefer visible borders, restrained backgrounds, readable spacing, and strong focus states.
- Record assumptions in the final response when design decisions were inferred.

## Semantic And Accessibility Rules

- Use one representative `h1` per page unless there is a documented reason not to.
- Match heading levels to document structure, not visual size.
- Use `header`, `nav`, `main`, `section`, `article`, `aside`, and `footer` only when their meaning matches the content.
- Use `div` for layout wrappers that do not create a meaningful document section.
- Use links for navigation and buttons for actions.
- Do not add click handlers to non-interactive elements when a native link or button fits.
- Give every icon-only link or button an accessible name.
- Do not overwrite useful visible text with a different `aria-label`.
- Hide decorative icons with `aria-hidden="true"`.
- Represent dates with `time dateTime`.
- Represent repeated content as `ul`/`ol` and `li` when it is a list.
- Wrap independent repeatable content in `article` when each item can stand on its own.
- Connect form controls to visible labels or justified hidden labels.
- Use `aria-current="page"` for the current navigation item.
- Use `aria-expanded`, `aria-controls`, and keyboard support for disclosure-like controls.
- Use `role="status"` or `aria-live="polite"` only for dynamic messages users need to hear.
- Avoid ARIA when native HTML already provides the role, name, or state.

## Tailwind And CSS Rules

- Follow existing Tailwind class patterns before adding custom CSS.
- Use Flexbox for one-dimensional alignment and Grid for two-dimensional layouts or card lists.
- Prevent horizontal overflow from long titles, URLs, code blocks, tables, and media.
- Keep source order and keyboard order aligned even when using Flexbox or Grid.
- Do not globally remove focus outlines.
- Prefer `:focus-visible` styles that are visible against both light and dark backgrounds.
- Use responsive breakpoints only when content needs them.
- Check desktop working widths first for Admin: 768px and 1280px.
- Check public pages at 360px, 390px, 768px, and 1280px when mobile support is in scope.
- If a new CSS feature is used, confirm browser support or provide a simpler fallback.

## Admin Publishing Rules

- Admin exists to manage Resume, Blog, and Lab content: create, edit, preview, publish, unpublish, and delete.
- Prioritize task completion over brand expression.
- Prefer predictable structures: page header, primary action, filters/search, list/table/card list, form, preview, status region.
- Forms must include labels, validation messages, disabled/saving state, dirty/reset behavior, and server error display when relevant.
- Lists must include loading, empty, error, retry, and pagination or filter state when relevant.
- Preview screens must make draft/published state and public URL expectations clear.
- Use DB `id` for Admin edit routes and public `slug` for public detail routes.

## Refactoring Boundary

This Skill is for basic publishing execution, not refactoring.

- Do not extract shared components unless the user explicitly asks.
- Do not introduce headless, compound, polymorphic, or slot-based patterns.
- Do not reorganize folders, state ownership, data loading, or component boundaries.
- Do not create a design system while publishing a single screen.
- If repeated markup appears, finish the local publishing request first and list component extraction as a follow-up.
- Keep the user in control of refactoring decisions so they can study abstraction and component design separately.

## Publishing Prompt Pattern

When producing a prompt for another AI tool, include:

1. Role
2. Project context
3. Target route/component
4. User task and success criteria
5. Existing tone to match
6. Excluded scope
7. Semantic/accessibility requirements
8. Tailwind/layout constraints
9. Responsive requirements
10. States to implement
11. Validation checklist

## Validation

Run relevant checks after edits:

```sh
npm run lint
npm run build
```

Use narrower checks when the user asked for documentation or Skill-only changes.

Keyboard walkthrough:

1. Tab from header into main content.
2. Confirm focus is visible on links, buttons, inputs, cards, and tree controls.
3. Confirm Enter activates links.
4. Confirm Space activates buttons.
5. Confirm dynamic messages are announced only when useful.

Layout walkthrough:

1. Check no horizontal overflow at the agreed widths.
2. Check long titles, long URLs, code blocks, tables, and form errors.
3. Check header, skip link, sticky elements, and focus outline do not cover each other.
4. Check light/dark mode only if dark mode is implemented or requested.

## Output

When using this Skill, report only what matters for the request:

- `Scope`: page/component and source input.
- `Implementation`: files changed and UI structure.
- `Accessibility`: headings, labels, ARIA, keyboard, focus.
- `Layout`: Tailwind/CSS approach, overflow, responsive widths.
- `States`: loading, empty, error, validation, disabled, saving, success.
- `Validation`: commands, browser checks, screenshots, or limitations.
- `Skill Feedback`: repeated AI mistake or rule that should be added next.
