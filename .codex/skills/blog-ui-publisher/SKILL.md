---
name: blog-ui-publisher
description: Use when designing, prompting, implementing, or reviewing the personal tech blog UI through AI-assisted publishing. Applies to the blog project's Home, Resume, Blog list, Blog detail, responsive web, accessibility, Tailwind/shadcn UI constraints, publishing prompts, and UI validation. Use when the user asks to make a publishing AI prompt, design while publishing, review a page UI, validate mobile layout, or decide whether PWA/React Native is needed.
---

# Blog UI Publisher

## Mission

Turn vague blog UI ideas into implementation-ready publishing prompts, practical UI specs, and validation checklists for this personal tech blog.

This skill is for a workflow where design happens through AI-assisted publishing, not through a separate heavy design phase.

AI output is a draft. Validate structure, accessibility, and mobile usability before accepting it.

## Project Context

- Product: personal tech blog / learning portfolio
- First MVP pages: `/`, `/resume`, `/blog`, `/blog/[slug]`
- Stack: Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui
- First mobile strategy: responsive web
- Later mobile options: PWA first, React Native or Expo only if native mobile capabilities are clearly required

## Non-Goals

Do not introduce these unless the user explicitly asks:

- Heavy design system
- Separate native mobile app
- React Native implementation
- Admin/CMS
- Comments, likes, view counts
- Decorative landing-page effects that reduce clarity
- Marketing-style hero sections that hide navigation or content

## Core Rules

- Prefer clarity over visual cleverness.
- Make the first screen explain: who this is, what this site is, where to go next.
- Design while producing implementation instructions.
- Use progressive disclosure: show core identity and navigation first, details later.
- Keep the first MVP small: Home, Resume, Blog list, Blog detail.
- Treat mobile layout as required, not optional.
- Use semantic HTML and accessible navigation.
- Require `header`, `nav`, `main`, `section`, `article`, and `footer` where they fit the page structure.
- Ensure primary links and buttons have comfortable mobile click/tap areas.
- Avoid cards inside cards.
- Avoid meaningless gradient orbs, bokeh, and decorative SVG backgrounds.
- Do not rely on color alone for meaning.

## Page Intent

### Home `/`

Must show:

- Name
- Short developer introduction
- GitHub link
- Resume link
- Blog button/link

Primary action: go to Blog or Resume.

### Resume `/resume`

Must show:

- Used tech stack
- Learning, project, and career/activity experience
- Interests and direction
- GitHub link
- Blog link

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
- Navigation must work on mobile.
- Current page state should be visible with text, underline, weight, or aria-current.

## AI Publishing Prompt Workflow

When asked to create a prompt for a publishing AI, produce a prompt with these sections:

1. Role
2. Project context
3. Implementation scope
4. Excluded scope
5. Page-by-page layout
6. Components
7. Styling constraints
8. Responsive requirements
9. Accessibility requirements
10. Completion criteria
11. Self-check checklist

The prompt must be specific enough that another AI can implement without asking follow-up questions.

## Implementation Constraints

- Use Next.js App Router conventions.
- Use Tailwind CSS utility classes.
- Use shadcn/ui only when it improves consistency.
- Structure pages with semantic tags before adding visual styling.
- Keep layout readable at:
  - 360px mobile
  - 390px mobile
  - 768px tablet
  - 1280px desktop
- Text must not overflow buttons, cards, or sections.
- Buttons and links must have clear roles.
- Touch targets should be comfortable on mobile; prefer at least 44px height for important actions.
- Use padding and gap intentionally so mobile controls do not feel cramped.

## Validation And Repair Workflow

When reviewing generated publishing output:

1. Check semantic structure first:
   - `header` for top navigation
   - `nav` for navigation groups
   - `main` for page content
   - `section` for major content blocks
   - `article` for blog post content or post cards when appropriate
   - `footer` for bottom site information
2. Check accessibility:
   - heading order
   - link/button role separation
   - visible focus style
   - descriptive link text
   - color contrast
3. Check mobile usability:
   - no horizontal overflow at 360px and 390px
   - clickable controls have enough padding
   - header navigation does not overlap
   - text does not escape cards, buttons, or sections
4. Patch the prompt or implementation notes when a check fails.
5. Do not mark the UI as ready until failed checks have a concrete fix.

## Validation Checklist

For generated UI or implementation prompts, check:

- Can a first-time visitor understand the site purpose in 5 seconds?
- Is there one obvious next action on Home?
- Can the user reach Home, Resume, Blog, and GitHub from the header?
- Does Resume explain stack, project/career experience, and direction without becoming too heavy?
- Does Blog work as a scannable list?
- Does Blog detail provide a readable article layout?
- Does mobile navigation fit without overlap?
- Are important buttons and links easy to tap on mobile?
- Are focus states visible?
- Are headings ordered correctly?
- Are semantic tags present where they are expected?
- Is the layout still usable in both light and dark themes if dark mode exists?

## Output Format

When using this skill, return:

- `Publishing Prompt` when the user needs a prompt for another AI
- `Spec Delta` when docs or roadmap should change
- `Implementation Notes` when code constraints matter
- `Validation Findings` when generated UI or prompt output has issues
- `Repair Notes` when semantic structure, accessibility, or mobile layout needs changes
- `Validation Checklist` for final self-check
- `Verdict` with:
  - `First Impression`: PASS or FAIL
  - `Mobile Readiness`: PASS or FAIL
  - `Accessibility Structure`: PASS or FAIL
  - `Implementation Clarity`: PASS or FAIL

If UI is already running, include tested URL/path, console errors, network errors, and screenshot/visual validation notes when available.
