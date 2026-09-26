# MnsWorld — Development Roadmap

## Phase 0 — Scaffold

- Next.js app
- TypeScript
- Tailwind
- shadcn/ui
- Motion
- next-intl
- module structure
- lint/format
- responsive shell

## Phase 1 — World Home

- immersive background
- glass shell
- name
- clock/date
- onboarding
- navigation
- module portals

## Phase 2 — I'm Bored

- activity dataset
- filters
- random generator
- card transitions
- responsive behavior

Port the supplied source behavior.

## Phase 3 — Career

- content model
- timeline
- phases
- statuses
- responsive details

Use the supplied career content as initial data.

## Phase 4 — Focus Now

- timer state machine
- presets
- custom time
- local session persistence
- completion state

Test timer accuracy carefully.

## Phase 5 — Polish

- accessibility
- reduced motion
- keyboard navigation
- performance
- mobile polish
- loading/error/empty states
- metadata/favicon

## Phase 6 — Persistence/PWA

Only after core UX is stable:
- IndexedDB repository
- installable PWA
- offline caching
- import/export

## Phase 7 — One Future Module

Pick the most useful module based on actual use. Do not build every future idea.

## Build Order

```text
Shell
-> Home
-> Bored
-> Career
-> Focus
-> Polish
-> Persistence
-> One next module
```

## Anti-Distraction Rule

Do not stop core implementation to redesign architecture repeatedly, add unnecessary packages, build a backend, or add AI before the core experience works.
