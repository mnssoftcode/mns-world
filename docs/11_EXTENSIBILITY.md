# MnsWorld — Extensibility

## Core Rule

Adding a module should not require rewriting the application shell.

## Module Registry

Concept:

```ts
interface MnsWorldModule {
  id: string;
  route: string;
  titleKey: string;
  descriptionKey: string;
  icon: React.ComponentType;
  enabled: boolean;
}
```

The registry can drive navigation, home portals, command palette, and module discovery.

## Possible Future Modules

- Journal
- Notes
- Goals
- Habits
- Ideas
- Projects
- Library
- Travel
- Finance
- optional local/private AI Assistant

AI assistant must be opt-in.

## Content-First Design

Modules should load content/data from dedicated files rather than hard-coding text inside page components.

## Future Sync

```text
Local-first
    |
    +--> Cloud Sync Adapter
    |
    +--> Backup/Export
```

Cloud remains optional.

## Feature Flags

Use one typed configuration layer for experimental modules. Do not scatter flags across components.
