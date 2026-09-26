# MnsWorld — Technology Stack

## Required

### Framework
**Next.js 16.3 + App Router**

Use server rendering where it improves startup performance and client components only where interactivity requires them.

### UI Runtime
**React 19.3 + TypeScript**

Use current React APIs and keep types strict.

### Styling
**Tailwind CSS 4.3**

Use CSS variables for MnsWorld design tokens.

### Components
**shadcn/ui**

Use as a component foundation and customize it to the MnsWorld visual language.

### Animation
**Motion for React**

Use for meaningful transitions, card movement, route/module transitions, and gestures. Use CSS for trivial transitions.

### i18n
**next-intl**

Use locale message files, locale-aware formatting, and an architecture that makes adding languages cheap.

### Icons
**Lucide**

Use one consistent icon family.

### Persistence
- localStorage for small preferences
- IndexedDB for structured/history data
- repository interface between storage and UI

## Optional Later

- PWA/service worker
- Playwright
- Vitest + React Testing Library
- monitoring/error reporting when public

## Dependency Rules

1. Do not add a package when a modern web API is enough.
2. Prefer tree-shakable packages.
3. Every dependency must have a clear purpose.
4. Keep decorative libraries out of the critical path.
5. Do not introduce a backend for hypothetical future needs.

## Performance Rules

- server-render static UI when useful
- dynamic import large optional features
- avoid unnecessary global state
- stop decorative animation when not visible
- respect reduced motion
- limit backdrop-filter surfaces on weaker devices

## Browser Target

Target modern browsers. Provide a readable opaque fallback when advanced glass effects are unavailable.
