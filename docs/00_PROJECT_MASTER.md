# MnsWorld — Project Master

## Product Identity

**Product:** MnsWorld  
**Type:** Personal web OS / personal life dashboard  
**Goal:** A fast, private, beautiful website that feels like entering a personal digital world.

MnsWorld is not a generic productivity dashboard. It is a personal environment where the user can see their world, decide what to do next, focus, explore their career, and later add more personal modules without rebuilding the application.

## Core Principles

1. The home screen is the world.
2. Build the useful core before adding complexity.
3. Local-first by default.
4. Every major area is a module with clear boundaries.
5. Premium glass UI using mostly white/black/gray.
6. Fast on real devices; avoid heavy 3D in MVP.
7. Accessible: keyboard, touch, readable contrast, reduced motion.
8. Internationalized from day one.
9. Private by design.

## MVP Modules

- Home / World
- I'm Bored
- Career
- Focus Now
- Settings

## Future Modules

Journal, Notes, Goals, Habits, Ideas, Projects, Reading, Travel, Finance, Calendar, AI Assistant, optional cloud sync.

These are extension points, not MVP obligations.

## Recommended Stack — 2026-09-26

- Next.js 16.3 App Router
- React 19.3
- TypeScript
- Tailwind CSS 4.3
- shadcn/ui
- Motion for React
- next-intl
- Lucide icons
- localStorage + IndexedDB via a repository abstraction
- optional PWA after the core UX is stable

Official references:
- https://nextjs.org/blog
- https://react.dev/versions
- https://tailwindcss.com/blog/tailwindcss-v4-3
- https://ui.shadcn.com/docs/installation/next
- https://next-intl.dev/docs/getting-started/app-router
- https://motion.dev/docs/react

## Non-Goals for MVP

- No login
- No server database
- No social network
- No unnecessary AI
- No full WebGL/3D dependency unless later justified
- No microfrontends
- No giant state-management abstraction

## Definition of Done

- First-run onboarding asks for the user's name.
- Home feels like a personal world.
- Live time/date work.
- I'm Bored works with supplied activities.
- Career renders cleanly.
- Focus timer is reliable.
- Light/dark mode works.
- English/Hindi work.
- Responsive on desktop/tablet/mobile.
- Preferences persist locally.
- Production build succeeds.
- Accessibility/performance issues are addressed.

## Build Rule

Build the smallest version that fully delivers the feeling, then expand module-by-module.
