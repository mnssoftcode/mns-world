# MnsWorld — AI Coding Agent Rules

## Mission

Build MnsWorld as a polished personal web OS from these project documents. Prefer working code over long explanations.

## Before Coding

Read:
1. `00_PROJECT_MASTER.md`
2. relevant module spec
3. design system
4. architecture/data rules

## Rules

1. Do not invent conflicting product requirements.
2. Preserve supplied behavior when porting the source activity module.
3. Keep modules independent.
4. Prefer reusable components.
5. Keep content/data separate from UI.
6. Avoid unnecessary dependencies.
7. No backend in MVP.
8. Do not replace the selected stack without a concrete reason.
9. Make mobile behavior intentional.
10. Keep accessibility active while coding.
11. Use semantic HTML.
12. Keep UI strings in translation messages.
13. Do not hard-code personal data in components.
14. Keep the palette mostly grayscale.
15. Avoid excessive blur and animation.
16. Respect reduced motion.
17. Never commit secrets.
18. Keep the production build passing.

## Feature Workflow

```text
data contract
-> module logic
-> reusable UI
-> route integration
-> responsive behavior
-> accessibility
-> tests/checks
```

## Scope Control

When asked to add "one more thing":
- decide whether it belongs to the current MVP
- if not, record it as a future module/idea
- do not expand scope automatically

## Visual Quality

A feature is not complete just because it works. It must match:
- spacing
- typography
- glass materials
- motion
- theme behavior
- responsive behavior

## Completion Report

After implementation, report:
- what changed
- files changed
- how to test
- known limitation

Keep the report concise.
