export type ThemeMode = "system" | "light" | "dark";
export type SupportedLocale = "en" | "hi";

export interface UserPreferences {
  version: 1;
  name: string;
  locale: SupportedLocale;
  theme: ThemeMode;
  reducedMotionOverride?: boolean;
  // Wallpaper customization
  customWallpaper?: string;
  wallpaperPreset?: string;
  wallpaperBlur?: number; // 0 to 30px
  wallpaperDim?: number; // 10 to 90%
  // Game & Audio immersion
  soundFxEnabled?: boolean;
  xp?: number;
  level?: number;
  completedQuests?: string[];
}

export interface BoredActivity {
  id: string;
  category: string;
  emoji: string;
  title: string;
  hint: string;
  key?: string;
  enabled: boolean;
}

export interface FocusSettings {
  version: 1;
  workMinutes: number;
  breakMinutes: number;
  autoStartBreak: boolean;
  soundEnabled: boolean;
}

export interface FocusSession {
  id: string;
  startedAt: string;
  completedAt?: string;
  durationSeconds: number;
  completed: boolean;
  label?: string;
}

export type CareerStatus = "todo" | "active" | "done" | "paused";

export interface CareerItem {
  id: string;
  title: string;
  description?: string;
  status?: CareerStatus;
  completed?: boolean;
}

export interface CareerPhase {
  id: string;
  title: string;
  order: number;
  status: CareerStatus;
  description?: string;
  items: CareerItem[];
  meta?: Record<string, string>;
}

export interface CareerIdentity {
  primaryRole: string;
  secondaryRoles: string[];
  backupRole: string;
  targetCountryPrimary: string;
  targetCountriesOther: string[];
  longTermDream: string;
  coreStrengths: string[];
  specialAdvantage: string[];
  metrics: {
    installs: string;
    users: string;
    productsShipped: string;
    experienceYears: string;
    education: string;
  };
}

export interface MnsWorldModule {
  id: string;
  route: string;
  titleKey: string;
  descriptionKey: string;
  icon: string;
  badge?: string;
  enabled: boolean;
}

export interface WallpaperPreset {
  id: string;
  name: string;
  description: string;
  url: string;
  thumbnail: string;
}
