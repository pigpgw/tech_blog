---
name: blog-ui-publisher
description: >
  Use when designing, implementing, reviewing, or documenting this personal tech blog publishing work. Applies to Home, Resume, Blog list, Blog detail, Next.js App Router structure, metadata, semantic HTML, accessibility basics, route/page intent, existing component reuse, AI-assisted publishing review, and basic-guide style blog writing. Do not use for detailed CSS layout, responsive styling, Tailwind token, or visual design rules until the CSS publishing skill is updated.
---

# Blog UI Publisher

## Mission

Turn vague blog publishing ideas into practical page structure, Next.js App Router constraints, semantic HTML/accessibility checks, and concise basic-guide style documentation for this personal tech blog.

This skill is for a workflow where design happens through AI-assisted publishing, not through a separate heavy design phase.

AI output is a draft. Validate structure, framework responsibility, accessibility basics, and page intent before accepting it.

The goal is not just to make screens quickly. The result should fit the existing codebase, distinguish project decisions from framework defaults, reuse established components, and stay maintainable.

## Project Context

- Product: personal tech blog / learning portfolio
- First MVP pages: `/`, `/resume`, `/blog`, `/blog/[slug]`
- Stack focus for this skill: Next.js App Router and TypeScript
- Current publishing focus: Next.js structure, semantic HTML, accessibility basics, metadata, and content quality
- CSS/responsive styling details are intentionally out of scope until the CSS study is documented and reflected in a separate skill update.

## Non-Goals

Do not introduce these unless the user explicitly asks:

- Heavy design system
- Separate native mobile app
- React Native implementation
- Admin/CMS
- Comments, likes, view counts
- Decorative landing-page effects that reduce clarity
- Marketing-style hero sections that hide navigation or content
- Figma-to-code visual implementation
- Detailed CSS layout instruction
- Tailwind token, spacing, color, breakpoint, animation, or visual theme rules
- Responsive layout repair beyond noting that a CSS-focused follow-up is required

## Use When

Use this skill for:

- Blog project pages: Home, Resume, Blog list, Blog detail
- React / Next.js / TypeScript publishing work
- Landing, event, promotion, list/detail, admin, or API-connected screens
- Semantic HTML, accessibility basics, SEO metadata, or API state validation
- Blog article drafting/review when the article should read like a frontend basic guide instead of a personal diary

## Preflight

Before writing or reviewing UI code:

- Search existing components, route conventions, page structure, metadata patterns, and accessibility patterns before creating new components.
- Check existing API state patterns before introducing loading, error, empty, success, disabled, or retry UI.
- Reuse existing components first. Create a new component only when reuse would increase coupling or produce unclear code.
- Check local docs, Cursor Docs, PR context, or project notes when available.

## Core Rules

- Prefer clarity over decorative complexity.
- Make the first screen explain: who this is, what this site is, where to go next.
- Use AI to shorten publishing time, but make the review criteria explicit.
- Do not compensate for weak criteria with very long prompts. Turn repeated checks into skill rules or documentation.
- Use progressive disclosure: show core identity and navigation first, details later.
- Keep the first MVP small: Home, Resume, Blog list, Blog detail.
- Use semantic HTML and accessible navigation.
- Require `header`, `nav`, `main`, `section`, `article`, and `footer` where they fit the page structure.
- Keep one `h1` per page and preserve heading order.
- Set or verify page `title` and `description`; consider Open Graph and canonical only when the page needs them.
- Use `button` or `a` for interactive elements. Avoid clickable `div`.
- Give icon-only controls an accessible name.
- Meaningful images need `alt`; decorative images should not add noise.
- Do not leave placeholder copy in final UI.
- Explain what the project explicitly owns versus what Next.js provides by default.
- Avoid wording that makes the author look unsure or inexperienced. Prefer confident guide-style explanations.
- Keep blog explanations concise, necessary, and easy to understand.
- Do not turn implementation notes into long personal experience essays.

## Next.js Responsibility Split

When writing or reviewing docs/code, separate framework defaults from project decisions:

- `<!DOCTYPE html>`: do not write it in `app/layout.tsx`; Next.js handles the rendered document declaration.
- `<meta charset>`: Next.js adds the default charset meta tag.
- `<meta name="viewport">`: Next.js adds the default viewport meta tag; override only with `viewport` or `generateViewport` when needed.
- `<html>` and `<body>`: define them in the root layout.
- `lang`: project-owned decision. Korean-first content should set `lang="ko"`.
- `title` and `description`: manage with `metadata` or `generateMetadata`.
- Do not write “we used X” when X is a framework default. Use “Next.js provides/adds/handles X by default.”
- Do write “the project sets/defines X” when the code explicitly owns the value.

## Blog Writing Rules

Use these rules when drafting or editing blog content:

- Write as a frontend basics guide or official-doc style note, not as a personal diary.
- The background can mention AI-assisted publishing and Skill usage as the reason for documenting basic criteria.
- Do not include self-lowering phrases or question lists that make the author look unprepared.
- Prefer definition, reason, rule, example, and project application in that order.
- Keep paragraphs short. Remove repetition and unnecessary motivation.
- For project examples, say `예시 프로젝트` or `이 프로젝트` only when the codebase example matters.
- Do not overstate. If a framework handles something, say so directly.
- Avoid repeated endings such as `~할 수 있습니다`.
- Replace hesitant phrases such as `~하는 편이 좋습니다`, `~에 가깝습니다`, and `~라고 볼 수 있습니다` with direct rules.
- Remove duplicated explanations when the same reason already appeared.
- Prefer `한다`, `사용한다`, `제공한다`, `정의한다`, `구분한다`, and `검증한다`.
- Use examples only when they clarify a rule or project application.

Good:

```txt
ARIA는 HTML만으로 전달되지 않는 이름, 상태, 동적 변경을 보완한다.
```

Avoid:

```txt
ARIA는 HTML만으로 전달되지 않는 정보를 보완할 수 있습니다.
```

Good:

```txt
semantic tag를 먼저 선택하고, 부족한 상태 정보만 ARIA로 보완한다.
```

Avoid:

```txt
semantic tag를 먼저 선택하는 편이 좋습니다.
```

## Page Intent

### Home `/`

Must show:

- Name
- Short developer introduction
- Resume link
- Blog button/link
- GitHub is available from the shared header only.

Primary action: go to Blog or Resume.

### Resume `/resume`

Must show:

- Used tech stack
- Learning, project, and career/activity experience
- Interests and direction
- Project evidence links only when they belong to a specific experience.
- GitHub is available from the shared header only.

Primary action: understand the person and inspect evidence.

### Blog List `/blog`

Must show:

- Article list
- Title
- Description
- Published date
- Tag or category
- Empty state
- Link to article detail

Primary action: choose an article to read.

### Blog Detail `/blog/[slug]`

Must show:

- Article title
- Description
- Published date
- Tag or category
- Article body
- Back link to Blog

Primary action: read the article and return to the list when needed.

## Header Contract

- Left: name
- Right: `Home`, `Resume`, `Blog`, `GitHub`
- `GitHub` is an external link.
- Navigation must expose the core links with correct link semantics.
- Current page state should use `aria-current` when applicable. Visual state styling belongs to the CSS follow-up.

## Implementation Constraints

- Use Next.js App Router conventions.
- Structure pages with semantic tags before CSS styling work.
- Prefer existing components and project patterns over one-off components.
- Buttons and links must have clear roles.
- API-connected screens must define loading, error, empty, success, disabled, and retry behavior where relevant.
- Do not expose secrets or sensitive values in client bundles.
- Do not add CSS-specific implementation rules in this skill. If styling, breakpoint, spacing, token, color, or animation decisions are needed, mark them as CSS follow-up work.

## Validation And Repair Workflow

When reviewing generated publishing output:

1. Check semantic structure first:
   - `header` for top navigation
   - `nav` for navigation groups
   - `main` for page content
   - `section` for major content blocks
   - `article` for blog post content or post cards when appropriate
   - `footer` for bottom site information
2. Check Next.js responsibility split:
   - framework default vs project-owned setting is described correctly
   - root layout owns `<html>`, `<body>`, and `lang`
   - metadata is handled with `metadata` or `generateMetadata`
3. Check accessibility basics:
   - heading order
   - link/button role separation
   - accessible name
   - descriptive link text
   - decorative icons/images are hidden from assistive tech when appropriate
   - current page state is exposed with `aria-current` when needed
4. Check implementation fit:
   - existing component reuse
   - route and layout convention
   - API state coverage
   - unnecessary new dependencies
5. Check writing quality for blog docs:
   - basic-guide tone
   - no self-lowering wording
   - no long question-list framing
   - official-doc style where possible
   - no repeated `~할 수 있습니다`
   - no hesitant `~하는 편이 좋습니다` or `~에 가깝습니다`
   - concise explanation
6. Patch the implementation notes when a check fails.
7. Do not mark the work as ready until failed checks have a concrete fix or a clearly named CSS follow-up.

## Validation Checklist

For generated UI or implementation, check:

- Can a first-time visitor understand the site purpose in 5 seconds?
- Is there one obvious next action on Home?
- Can the user reach Home, Resume, Blog, and GitHub from the header?
- Does Resume explain stack, project/career experience, and direction without becoming too heavy?
- Does Blog expose a clear article list structure?
- Does Blog detail provide a clear article content structure?
- Are headings ordered correctly?
- Are semantic tags present where they are expected?
- Are Next.js defaults and project-owned settings described separately?
- Are `DOCTYPE`, default charset, and default viewport described as framework-handled in Next.js App Router?
- Is `lang="ko"` described as a project-owned root layout decision?
- Are link/button meanings correct?
- Are accessible names, `aria-current`, decorative `aria-hidden`, and image alt decisions appropriate?
- Does the blog article read like a frontend basic guide rather than a personal retrospective?
- Are API loading, error, empty, and success states handled when data is involved?
- Did the implementation reuse project components or explain why it did not?

## Output Format

When using this skill, return:

- `Spec Delta` when docs or roadmap should change
- `Implementation Notes` when code constraints matter
- `Component Reuse` when existing components or new component reasons matter
- `Validation Findings` when generated UI, implementation, or article output has issues
- `Repair Notes` when semantic structure, accessibility, Next.js responsibility split, or writing tone needs changes
- `Validation Checklist` for final self-check
- `Verdict` with:
  - `Page Intent`: PASS or FAIL
  - `Next.js Responsibility Split`: PASS or FAIL
  - `Accessibility Structure`: PASS or FAIL
  - `Guide Writing Quality`: PASS or FAIL

If CSS/responsive/visual styling concerns appear, do not solve them inside this skill. List them under `CSS Follow-up`.
