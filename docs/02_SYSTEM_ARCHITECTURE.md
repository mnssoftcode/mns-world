# MnsWorld — System Architecture

## Architecture

Use a **modular monolith frontend**:

- one Next.js application
- clear module boundaries
- local-first state
- storage repository interfaces
- future cloud adapter without UI redesign

Do not use microfrontends.

## Layers

```text
MnsWorld
├── App Shell
│   ├── Navigation
│   ├── Theme
│   ├── i18n
│   ├── Global UI
│   └── Command/Quick Actions
├── World/Home
│   ├── World Scene
│   ├── Clock
│   ├── Greeting
│   └── Module Portals
├── Modules
│   ├── Bored
│   ├── Career
│   └── Focus
├── Shared UI
│   ├── Glass surfaces
│   ├── Cards
│   ├── Buttons
│   ├── Dialogs
│   └── Navigation
└── Data
    ├── User preferences
    ├── Bored activities
    ├── Career content
    └── Focus sessions
```

## Suggested Folder Structure

```text
src/
├── app/
│   ├── page.tsx
│   ├── bored/page.tsx
│   ├── career/page.tsx
│   ├── focus/page.tsx
│   └── settings/page.tsx
├── components/
│   ├── ui/
│   ├── glass/
│   ├── navigation/
│   └── world/
├── modules/
│   ├── bored/
│   ├── career/
│   └── focus/
├── lib/
│   ├── storage/
│   ├── i18n/
│   ├── time/
│   └── utils/
├── data/
│   ├── bored/
│   └── career/
├── hooks/
├── types/
└── styles/
```

## Module Contract

Each module should define:
- metadata
- route
- label key
- icon
- entry component
- optional home-card
- content/data provider
- optional settings

## State Separation

**UI state:** dialogs, active cards, animation state.  
**Persistent state:** user preferences, timer settings, completed sessions.  
**Content:** career roadmap and activity data.

Content must not be buried inside page components.

## Persistence Boundary

```text
UI -> Domain Store -> Repository Interface
                         ├── LocalRepository
                         └── CloudRepository (future)
```

The UI must not directly depend on localStorage/IndexedDB.

## Future Sync

Cloud sync is an adapter, not the foundation.
