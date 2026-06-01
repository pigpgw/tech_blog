---
name: agent-skill-builder
description: Use when creating, updating, or reviewing Codex Agent Skills and SKILL.md files. Applies to designing focused skill scope, writing trigger descriptions, structuring actionable instructions, deciding scripts/references/assets, creating agents/openai.yaml metadata, validating skill folders, and iterating skills from real usage feedback.
---

# Agent Skill Builder

## Mission

Create focused Agent Skills that Codex can reliably activate and follow for repeatable work.

Use this skill to turn an article, workflow, team convention, repeated prompt, or project-specific process into a maintainable `SKILL.md`.

## Core Principle

A Skill is an operational manual for a repeatable task, not a general knowledge article.

Prefer:

- Narrow scope over broad scope
- Actionable instructions over abstract advice
- Concrete trigger descriptions over generic names
- Small `SKILL.md` body over long background explanation
- Optional resources only when they remove repeated work

Avoid creating a Skill for one-off answers, simple concept explanations, disposable boilerplate, or tasks that do not need repeated guidance.

## Workflow

1. Define the skill purpose.
2. Collect concrete trigger examples.
3. Choose a focused skill name and location.
4. Decide whether resources are needed.
5. Write `SKILL.md`.
6. Add `agents/openai.yaml` when this repository uses UI metadata.
7. Validate the skill folder.
8. Record or summarize meaningful AI-assisted creation work when project policy requires it.

## 1. Define Purpose

Before writing files, answer these questions:

- What repeated task should this Skill improve?
- Who or what will use it?
- What errors or inconsistencies should it prevent?
- What should be out of scope?
- What artifact should Codex produce after using it?

Good purpose:

```txt
Create Korean Conventional Commit messages from the actual git diff.
```

Weak purpose:

```txt
Help with Git.
```

If the purpose cannot be written in one or two sentences, split it into smaller Skills.

## 2. Define Activation Boundary

Define the requests and contexts that should activate the Skill.

Also define adjacent tasks that should not activate it. This prevents descriptions that are too broad.

## 3. Name And Location

Use lowercase kebab-case for the folder name.

Good:

```txt
agent-skill-builder
code-review-fundamentals
api-contract-reviewer
```

Avoid:

```txt
SkillMaker
web-dev
helper
```

Use a project-local skill when the workflow depends on this repository:

```txt
.agents/skills/<skill-name>/SKILL.md
```

Use a global skill when the workflow is reusable across many repositories:

```txt
~/.agents/skills/<skill-name>/SKILL.md
```

If the user did not specify a location and the repository already has `.agents/skills`, prefer the repository-local path.

## 4. Decide Resources

Create only resources that directly support execution.

Use `scripts/` when:

- Codex would otherwise rewrite the same code repeatedly.
- Deterministic validation or generation is important.
- A shell/Python helper reduces fragile manual steps.

Use `references/` when:

- Detailed policy, schema, examples, or domain knowledge is useful but too long for `SKILL.md`.
- Codex should load the detail only for relevant tasks.

Use `assets/` when:

- The Skill needs templates, images, fonts, boilerplate, or other files used in final outputs.

Do not create extra `README.md`, changelog, quick reference, installation guide, or process notes unless the user explicitly asks. Extra documents make Skills harder to maintain.

## 5. Write Frontmatter

Every `SKILL.md` must start with YAML frontmatter containing only `name` and `description`.

```md
---
name: agent-skill-builder
description: Use when creating, updating, or reviewing Codex Agent Skills and SKILL.md files. Applies to designing focused skill scope, writing trigger descriptions, structuring actionable instructions, deciding scripts/references/assets, creating agents/openai.yaml metadata, validating skill folders, and iterating skills from real usage feedback.
---
```

Description rules:

- Include what the Skill does.
- Include when to use it.
- Include likely trigger words or contexts.
- Mention important file types or tools.
- Keep it specific enough to avoid accidental activation.

Good:

```yaml
description: Use when generating, reviewing, or refining commit messages from code or documentation changes. Applies to this project's Korean Conventional Commits rule...
```

Weak:

```yaml
description: Helps with commits.
```

The body is loaded only after activation, so do not hide trigger rules only in the body.

## 6. Write Body Instructions

Use imperative, concrete instructions.

Prefer:

```txt
Inspect `git status --short` before proposing a commit message.
Use Conventional Commits.
End the Korean subject with `~한다`.
```

Avoid:

```txt
Try to write a good commit message.
It may be useful to inspect changes.
```

Recommended body structure:

```md
# Skill Name

## Mission

One or two sentences.

## Workflow

Numbered steps Codex should follow.

## Rules

Specific requirements and non-goals.

## Examples

Good and bad examples when they clarify behavior.

## Validation

Commands or checks to run before finishing.

## Output

Expected response shape when useful.
```

Keep the body concise. Move detailed examples or long policy text into `references/` if the file starts becoming hard to scan.

Writing style rules:

- Use direct instructions, not suggestions.
- Avoid hedging words such as "try", "consider", "may", "가능하면", and "하는 편이 좋다".
- Remove repeated explanations after the rule is clear.
- Write for execution, not persuasion.

## 7. Add Examples Carefully

Examples should show patterns Codex should copy.

Use contrast when helpful:

```md
Good: `UserProfile.tsx`
Bad: `userProfile.tsx`
```

Prefer small, realistic examples over large generic samples.

When a pattern has a reason, include the reason briefly.

```txt
Use `rel="noopener noreferrer"` with untrusted external links opened in a new tab because the opened page should not access `window.opener`.
```

Do not turn `SKILL.md` into a tutorial article. Keep only the details another Codex instance needs to execute the task.

## 8. Add `agents/openai.yaml`

When this repository uses `agents/openai.yaml`, create or update it with UI metadata.

Minimal shape:

```yaml
interface:
  display_name: "Agent Skill Builder"
  short_description: "Agent Skill 작성 기준을 설계하고 검증한다"
  default_prompt: "Use $agent-skill-builder to create a focused SKILL.md for a repeatable Codex workflow."
```

Rules:

- Keep `short_description` short and human-readable.
- Make `default_prompt` mention the skill with `$skill-name`.
- Do not add icons, brand colors, or dependencies unless explicitly needed.

## 9. Validate

Run the available validator when possible:

```bash
python3 /path/to/quick_validate.py .agents/skills/<skill-name>
```

If the validator is unavailable, manually check:

- Folder name matches frontmatter `name`.
- `SKILL.md` starts with valid YAML frontmatter.
- `name` and `description` exist.
- No TODO placeholders remain.
- The description includes usage triggers.
- Resource directories exist only when useful.
- `agents/openai.yaml` is valid YAML if present.

Also inspect the final diff to ensure the Skill is not mixed with unrelated changes.

## 10. Iterate From Use

After first use, improve the Skill based on actual failures.

Common fixes:

- Skill did not activate: make `description` more specific to user prompts.
- Skill activates too often: narrow the description and scope.
- Output is vague: replace advice with step-by-step instructions.
- Codex repeats boilerplate: add a small example or script.
- Skill is too long: move details into `references/`.

Do not expand a Skill just because a topic is related. Expand only when the added rule prevents a real mistake or improves repeated execution.

Check activation after meaningful edits. If relevant requests do not match, strengthen `description`. If unrelated requests match, narrow scope.

## Final Checklist

Before finishing a new or updated Skill, confirm:

- The scope is narrow and repeatable.
- The description clearly explains when to use the Skill.
- The body contains executable workflow, rules, examples, and validation.
- The Skill avoids broad tutorial content.
- Optional resources are justified.
- Validation has run or the reason it could not run is stated.
- Project documentation or AI usage logs are updated when project policy requires it.
