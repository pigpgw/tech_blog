---
name: code-review-fundamentals
description: >
  Use when the user asks for "리뷰", "코드리뷰", "review", PR review, code review, or asks Codex to inspect changed frontend code for quality. Review with Toss Frontend Fundamentals criteria: readability, predictability, cohesion, coupling, plus accessibility, bundling/performance, and debugging evidence when relevant.
---

# Code Review Fundamentals

## Mission

Review frontend changes as a code reviewer. Prioritize bugs, regressions, maintainability risks, and missing validation. Do not rewrite code unless the user explicitly asks for fixes.

## References

- First read `docs/03-code-review-fundamentals.md` when this repository is available.
- If that document is not available or a portable summary is enough, read `references/toss-frontend-fundamentals.md`.
- Use official Toss Frontend Fundamentals as the source of the quality criteria, but do not quote long passages.

## Workflow

1. Identify the review scope.
   - If the user provides files or a diff, review that scope.
   - Otherwise inspect local changes with `git status --short`, `git diff --stat`, and focused `git diff` reads.
2. Check correctness first.
   - Look for behavior regressions, broken links, invalid semantics, stale state, async race conditions, accessibility regressions, and missing tests.
3. Apply the four code quality criteria.
   - Readability: reduce context, split code that does not run together, name complex conditions and magic numbers, simplify nested conditionals and ternaries.
   - Predictability: keep names, parameters, return values, side effects, and component roles consistent.
   - Cohesion: keep code that must change together close together; commonize values only when missing one update is risky.
   - Coupling: reduce change impact; split responsibilities; avoid props drilling and over-commonization; allow duplication when change cycles are different.
4. Add auxiliary checks only when relevant.
   - Accessibility: semantic HTML, labels, roles, keyboard behavior, state exposure, image alt text.
   - Bundling/performance: code splitting, tree-shaking blockers, unnecessary initial imports, client bundle exposure.
   - Debugging: reproducibility, logs, root cause fix, regression prevention.
5. Report findings first.
   - Order by severity.
   - Include file and line when possible.
   - If no serious issue is found, say that clearly and mention residual risks or test gaps.

## Output Format

Use Korean by default.

```md
**Findings**
- [높음|중간|낮음] path/to/file.tsx:120
  기준: 가독성 / 예측 가능성 / 응집도 / 결합도 / 접근성 / 성능
  문제: ...
  영향: ...
  제안: ...

**Open Questions**
- ...

**검증**
- ...
```

For small reviews, omit empty sections. Do not list all criteria if they do not reveal a useful issue.

## Guardrails

- Do not invent line numbers or claim tests were run when they were not.
- Do not treat style preferences as findings unless they create maintainability or behavior risk.
- Do not automatically demand abstraction. Explain whether readability, cohesion, or coupling should win in this context.
- Do not fix files unless the user asks `고쳐줘`, `수정해줘`, `반영해줘`, or equivalent.
- Keep findings direct and evidence-based.
- Avoid filler, praise, and repeated general advice.
