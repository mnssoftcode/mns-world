# MnsWorld — i18n, Theme, and Accessibility

## Languages

MVP:
- English (`en`)
- Hindi (`hi`)

The system must allow future languages without changing components.

## Messages

```text
messages/
├── en.json
└── hi.json
```

Namespaces:
- common
- home
- bored
- career
- focus
- settings
- onboarding
- errors

User-generated content does not belong in translation files.

## Language Switching

- update UI immediately
- persist choice
- preserve current route
- set `lang`
- format date/time using the active locale

## Theme

Support:
- system
- light
- dark

Use a robust theme provider and prevent theme flashing.

## Glass Fallback

If `backdrop-filter` is unavailable:
- use opaque neutral surfaces
- keep borders/shadows
- preserve readability

## Accessibility

- keyboard navigation
- visible focus
- semantic headings
- accessible button labels
- reduced motion
- sufficient contrast
- no color-only status meaning
- timer usable without animation

## RTL Readiness

Prefer logical CSS properties (`margin-inline`, `padding-inline`, etc.) so future RTL languages can be added.
