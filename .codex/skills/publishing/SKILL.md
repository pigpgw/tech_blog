---
name: publishing
description: >
  Use when writing, reviewing, or repairing HTML/CSS publishing work. Applies to semantic markup, responsive layout, cross-browser checks, web standards, WAI-ARIA/accessibility, CSS components, and converting design requirements or Figma-like specs into HTML/CSS. Trigger keywords: 퍼블리싱, 마크업, HTML, CSS, 반응형, 레이아웃, 웹표준, 접근성.
---

# Web Publishing

## Mission

Turn designs or requirements into semantic, accessible, responsive HTML/CSS that follows web standards and the project's existing conventions.

Use this skill for publishing work in this repository. For framework architecture, data flow, backend, deployment, or article planning, follow the project roadmap and official framework documentation instead of a blog-specific publishing skill.

## When To Use

Use this skill when:

- Converting a design, Figma frame, image, or written requirement into HTML/CSS.
- Publishing Admin or tool screens from verbal requirements when no formal design exists.
- Implementing responsive layouts for desktop, tablet, and mobile.
- Applying web accessibility, keyboard navigation, WAI-ARIA, or web standards.
- Handling Chrome, Safari, Firefox, Edge, Android Chrome, or iOS Safari differences.
- Creating common UI components such as buttons, forms, cards, modals, tabs, or accordions.
- Fixing existing markup, CSS, accessibility, or cross-browser issues.

Do not use this skill for:

- Pure business logic with no markup/CSS impact.
- Framework-specific architecture decisions unless they affect publishing.
- Large design system strategy unless explicitly requested.

## Preflight

Before editing:

1. Identify the source: design file, screenshot, existing page, or written requirement.
2. Confirm responsive strategy: responsive web or separate mobile page.
3. Check browser support range, especially legacy IE or old iOS Safari requirements.
4. Check framework context: plain HTML/CSS, React, Next.js, Vue, or another stack.
5. Inspect existing reset, variables, tokens, class naming, component patterns, and shared styles.
6. Reuse project conventions before introducing new naming, tokens, or components.
7. If no design exists, infer layout from the current product tone and write down assumptions.

## Project Defaults

When the request is "현재 톤과 비슷하게 퍼블리싱해줘" or no design is provided:

- Match the existing pages before inventing a new visual direction.
- Use the project's current stack and conventions first: Next.js, JSX, Tailwind utilities, existing shared components, and existing spacing/radius/color patterns.
- Use Tailwind's default spacing, font, color, and breakpoint scale unless the project already has a stronger token.
- Keep visual styling restrained: clear hierarchy, readable spacing, visible borders/focus, and no decorative layout that does not help the task.
- Do not add a new design system, theme, animation language, or component abstraction unless repeated code proves it is needed.
- Record assumptions in the final response or AI usage log when the design was inferred.

For Admin screens:

- Prioritize task completion over brand expression.
- Prefer dense but readable layouts: page header, primary action, filters/search, list/table/card list, form, preview, and clear status regions.
- Implement loading, empty, error, disabled, dirty, saving, success, and validation states when the screen needs them.
- Use semantic form, table/list, dialog, disclosure, and status markup before tuning visual details.
- Keep Admin UI consistent with public pages, but allow a quieter operational tone.
- Validate at desktop-first working sizes first, then refine mobile only when it is a real target for the Admin flow.

Admin publishing workflow:

1. Name the route, user, task, and success state.
2. Build the semantic shell: heading, navigation/back link, primary action, content region.
3. Add the minimum useful layout with existing utilities and components.
4. Add interaction states and accessible labels.
5. Check keyboard flow, visible focus, overflow, and responsive width.
6. If the same pattern repeats, extract a small component and document why.

## HTML Rules

Use semantic tags where they match the content role:

```html
<header></header>
<nav></nav>
<main></main>
<section></section>
<article></article>
<aside></aside>
<footer></footer>
```

Avoid replacing semantic structure with role-like class names:

```html
<!-- Avoid -->
<div id="header"></div>
<div class="nav"></div>
<div class="content"></div>
```

Heading rules:

- Use one `h1` per page unless the project has a clear document outline reason.
- Do not skip heading levels for visual size.
- Match heading level to document structure, then style size with CSS.

Wrapper rules:

- Minimize unnecessary `div` nesting.
- Use `div` for layout, spacing, or styling wrappers that do not create a meaningful document section.
- Put classes on semantic tags when the semantic tag already fits the role.

Image rules:

- Meaningful images need useful `alt`.
- Decorative images use empty alt: `alt=""`.
- SVG icons inside named buttons/links should usually use `aria-hidden="true"`.

Form rules:

- Connect every form control with a visible label, `sr-only` label, or justified accessible name.
- Prefer explicit label connection with `htmlFor`/`id` or `for`/`id`.
- Do not use placeholder as the only label.

```html
<label for="email">이메일</label>
<input type="email" id="email" name="email" />
```

## CSS Rules

Follow existing project conventions first. If no convention exists, use these defaults.

Design tokens:

- Use CSS custom properties for shared color, spacing, typography, radius, and shadow values.
- Avoid one-off magic values when the value is repeated or part of a visual system.

```css
:root {
  --color-primary: #1a73e8;
  --color-text: #1a1a1a;
  --color-border: #e0e0e0;
  --font-size-base: 16px;
  --line-height-base: 1.6;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --radius-md: 8px;
}
```

Class naming:

- Use the project's existing naming convention.
- If none exists, BEM is a safe default: `.card`, `.card__title`, `.card--featured`.
- Avoid deep BEM nesting beyond what is needed to express ownership.

Layout:

- Use Flexbox for one-dimensional alignment.
- Use Grid for two-dimensional layout or responsive card lists.
- Do not use `float` for layout. Reserve it for text wrapping only.
- Use `position: absolute` only for clear overlay, badge, or anchored UI needs.

```css
.nav {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.card-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--spacing-md);
}
```

Reset:

- Use project-level reset or normalize files.
- Do not reset browser defaults inside every component.
- If no reset exists, add only the minimal reset required for the component.

## Responsive Rules

Use the project's existing breakpoints first.

If no breakpoint system exists, define mobile-first breakpoints before use:

```css
/* sm: 480px, md: 768px, lg: 1024px, xl: 1280px */
@media (min-width: 768px) {
}
```

Responsive requirements:

- Prefer mobile-first CSS unless the project is explicitly desktop-first.
- Keep important touch targets at least `44px` by `44px`.
- Use `rem` for font sizes.
- Use `px` for fixed borders, hairlines, and icon dimensions when appropriate.
- Prevent text, tables, code blocks, long URLs, and media from causing horizontal overflow.

## Accessibility Rules

Keyboard:

- Native interactive elements must be keyboard reachable.
- Do not add click handlers to `div` or `span` when `button` or `a` is appropriate.
- Use `a` for navigation and `button` for actions.
- If a custom role is unavoidable, provide role, `tabindex`, keyboard handlers, and accessible state.

Focus:

- Do not globally remove focus outlines.
- If default focus is replaced, provide a visible `:focus-visible` style.

```css
.btn:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

ARIA:

- Prefer semantic HTML before ARIA.
- Use ARIA only to provide missing name, role, state, or live updates.
- Hide decorative SVGs with `aria-hidden="true"`.
- Use `aria-current="page"` for current navigation page state.
- Use `aria-live="polite"` for non-urgent dynamic status updates.

Color:

- Do not communicate meaning with color alone.
- Meet WCAG AA contrast where relevant:
  - Normal text: at least `4.5:1`.
  - Large text: at least `3:1`.
  - UI component boundaries and meaningful graphics: at least `3:1`.

## Component Patterns

Buttons:

```html
<button type="button" class="btn btn--primary">확인</button>

<button type="button" class="btn btn--secondary">
  <svg class="btn__icon" aria-hidden="true"></svg>
  다운로드
</button>

<button type="button" class="btn-icon" aria-label="닫기">
  <svg aria-hidden="true"></svg>
</button>
```

Forms:

```html
<div class="form-field">
  <label class="form-field__label" for="name">
    이름 <span aria-label="필수">*</span>
  </label>
  <input
    class="form-field__input"
    type="text"
    id="name"
    name="name"
    autocomplete="name"
    required
  />
  <p class="form-field__error" role="alert" hidden>
    이름을 입력해주세요.
  </p>
</div>
```

Modals:

- Use `role="dialog"` and `aria-modal="true"`.
- Connect the modal title with `aria-labelledby`.
- Move focus into the modal when opened.
- Trap focus inside the modal while open.
- Restore focus to the trigger when closed.
- Prevent background scroll while the modal is open.

Tabs:

- Prefer a proven accessible component if available.
- If custom tabs are required, implement `tablist`, `tab`, `tabpanel`, `aria-selected`, and keyboard arrow behavior.

## Cross-Browser Checks

After implementation, check the required support matrix:

- Chrome latest.
- Safari latest on macOS and iOS.
- Firefox latest.
- Edge latest.
- Android Chrome when mobile support matters.

Common Safari risks:

- Flexbox `gap` on old iOS versions.
- `aspect-ratio` on old iOS versions.
- Native date input styling limitations.
- Form control styling that needs `-webkit-appearance`.

Use feature queries, fallback CSS, or simpler layout when browser support requires it.

## Final Checklist

Before finishing publishing work:

- HTML has valid structure and no obvious validator errors.
- Heading hierarchy is correct.
- Semantic tags match content roles.
- Images have useful or intentionally empty `alt`.
- Form controls have labels.
- All functions work with keyboard only.
- Focus style is visible.
- ARIA is minimal and accurate.
- Color is not the only source of meaning.
- Contrast meets the required standard.
- Responsive behavior is checked at agreed widths.
- No unnecessary inline style remains.
- No unused classes or obvious dead CSS remain.
- `!important` is avoided unless the reason is documented.

## Maintenance Rules

- Keep this Skill focused on HTML/CSS publishing execution.
- Move long browser compatibility notes into `references/` when they exceed quick-use guidance.
- Add examples only for patterns that Codex should copy.
- Update CSS token, breakpoint, and responsive rules after the project CSS study defines final conventions.

## Output

When using this skill, report:

- `Publishing Scope`: source, target page/component, responsive requirements.
- `Markup Notes`: semantic structure and heading decisions.
- `CSS Notes`: tokens, layout approach, responsive strategy.
- `Accessibility Notes`: keyboard, labels, ARIA, alt, focus.
- `Cross-Browser Notes`: browsers checked or risks found.
- `Validation`: commands, browser checks, screenshots, or limitations.
