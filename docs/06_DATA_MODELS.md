# MnsWorld — Data Models and Persistence

## User Preferences

```ts
type ThemeMode = "system" | "light" | "dark";

interface UserPreferences {
  version: 1;
  name: string;
  locale: string;
  theme: ThemeMode;
  reducedMotionOverride?: boolean;
}
```

## Bored Activity

```ts
interface BoredActivity {
  id: string;
  category: string;
  emoji?: string;
  title: string;
  hint: string;
  key?: string;
  enabled: boolean;
}
```

## Focus Settings

```ts
interface FocusSettings {
  version: 1;
  workMinutes: number;
  breakMinutes: number;
  autoStartBreak: boolean;
  soundEnabled: boolean;
}
```

## Focus Session

```ts
interface FocusSession {
  id: string;
  startedAt: string;
  completedAt?: string;
  durationSeconds: number;
  completed: boolean;
}
```

## Career

```ts
interface CareerPhase {
  id: string;
  title: string;
  order: number;
  status: "todo" | "active" | "done" | "paused";
  items: CareerItem[];
}

interface CareerItem {
  id: string;
  title: string;
  description?: string;
  status?: "todo" | "active" | "done" | "paused";
}
```

## Storage Keys

```text
mnsworld:user
mnsworld:preferences
mnsworld:focus:settings
mnsworld:focus:sessions
mnsworld:bored:history
mnsworld:career:content
```

## Migration

Every structured dataset has a version.

On schema change:
1. detect old version
2. migrate
3. write new version
4. never silently delete user data

## Future Export/Import

Settings should eventually support:
- JSON export
- JSON import
- clear local data with confirmation
