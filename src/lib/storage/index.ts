import { UserPreferences, FocusSettings, FocusSession } from "@/types";

const KEYS = {
  PREFERENCES: "mnsworld:preferences",
  FOCUS_SETTINGS: "mnsworld:focus:settings",
  FOCUS_SESSIONS: "mnsworld:focus:sessions",
  BORED_HISTORY: "mnsworld:bored:history",
  CAREER_PROGRESS: "mnsworld:career:progress",
} as const;

export const DEFAULT_PREFERENCES: UserPreferences = {
  version: 1,
  name: "",
  locale: "en",
  theme: "dark",
  reducedMotionOverride: false,
  customWallpaper: "",
  wallpaperPreset: "procedural",
  wallpaperBlur: 8,
  wallpaperDim: 45,
  soundFxEnabled: true,
  xp: 120,
  level: 1,
  completedQuests: [],
};

export const DEFAULT_FOCUS_SETTINGS: FocusSettings = {
  version: 1,
  workMinutes: 25,
  breakMinutes: 5,
  autoStartBreak: false,
  soundEnabled: true,
};

export interface LocalRepository {
  getPreferences(): UserPreferences;
  savePreferences(prefs: Partial<UserPreferences>): UserPreferences;
  addXp(amount: number): { newXp: number; newLevel: number; leveledUp: boolean };
  getFocusSettings(): FocusSettings;
  saveFocusSettings(settings: Partial<FocusSettings>): FocusSettings;
  getFocusSessions(): FocusSession[];
  saveFocusSession(session: FocusSession): FocusSession[];
  clearFocusSessions(): void;
  getBoredHistory(): string[];
  addBoredHistory(id: string): string[];
  getCareerProgress(): Record<string, boolean>;
  toggleCareerItem(itemId: string): Record<string, boolean>;
  clearAllData(): void;
  exportData(): string;
  importData(jsonString: string): boolean;
}

class BrowserStorageRepository implements LocalRepository {
  private isClient(): boolean {
    return typeof window !== "undefined" && typeof localStorage !== "undefined";
  }

  getPreferences(): UserPreferences {
    if (!this.isClient()) return DEFAULT_PREFERENCES;
    try {
      const data = localStorage.getItem(KEYS.PREFERENCES);
      if (!data) return DEFAULT_PREFERENCES;
      const parsed = JSON.parse(data);
      return { ...DEFAULT_PREFERENCES, ...parsed };
    } catch {
      return DEFAULT_PREFERENCES;
    }
  }

  savePreferences(prefs: Partial<UserPreferences>): UserPreferences {
    const current = this.getPreferences();
    const updated: UserPreferences = { ...current, ...prefs };
    if (this.isClient()) {
      localStorage.setItem(KEYS.PREFERENCES, JSON.stringify(updated));
      window.dispatchEvent(new Event("mnsworld:preferences:updated"));
    }
    return updated;
  }

  addXp(amount: number): { newXp: number; newLevel: number; leveledUp: boolean } {
    const current = this.getPreferences();
    const oldXp = current.xp ?? 0;
    const oldLevel = current.level ?? 1;
    const newXp = oldXp + amount;
    // Each level requires 150 XP
    const newLevel = Math.max(1, Math.floor(newXp / 150) + 1);
    const leveledUp = newLevel > oldLevel;

    this.savePreferences({
      xp: newXp,
      level: newLevel,
    });

    if (this.isClient()) {
      window.dispatchEvent(
        new CustomEvent("mnsworld:xp:awarded", {
          detail: { amount, newXp, newLevel, leveledUp },
        })
      );
    }

    return { newXp, newLevel, leveledUp };
  }

  getFocusSettings(): FocusSettings {
    if (!this.isClient()) return DEFAULT_FOCUS_SETTINGS;
    try {
      const data = localStorage.getItem(KEYS.FOCUS_SETTINGS);
      if (!data) return DEFAULT_FOCUS_SETTINGS;
      const parsed = JSON.parse(data);
      return { ...DEFAULT_FOCUS_SETTINGS, ...parsed };
    } catch {
      return DEFAULT_FOCUS_SETTINGS;
    }
  }

  saveFocusSettings(settings: Partial<FocusSettings>): FocusSettings {
    const current = this.getFocusSettings();
    const updated: FocusSettings = { ...current, ...settings };
    if (this.isClient()) {
      localStorage.setItem(KEYS.FOCUS_SETTINGS, JSON.stringify(updated));
      window.dispatchEvent(new Event("mnsworld:focus-settings:updated"));
    }
    return updated;
  }

  getFocusSessions(): FocusSession[] {
    if (!this.isClient()) return [];
    try {
      const data = localStorage.getItem(KEYS.FOCUS_SESSIONS);
      if (!data) return [];
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  saveFocusSession(session: FocusSession): FocusSession[] {
    const sessions = this.getFocusSessions();
    const updated = [session, ...sessions].slice(0, 100);
    if (this.isClient()) {
      localStorage.setItem(KEYS.FOCUS_SESSIONS, JSON.stringify(updated));
      window.dispatchEvent(new Event("mnsworld:focus-sessions:updated"));
    }
    return updated;
  }

  clearFocusSessions(): void {
    if (this.isClient()) {
      localStorage.removeItem(KEYS.FOCUS_SESSIONS);
      window.dispatchEvent(new Event("mnsworld:focus-sessions:updated"));
    }
  }

  getBoredHistory(): string[] {
    if (!this.isClient()) return [];
    try {
      const data = localStorage.getItem(KEYS.BORED_HISTORY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  addBoredHistory(id: string): string[] {
    const history = this.getBoredHistory();
    const updated = [id, ...history.filter((item) => item !== id)].slice(0, 50);
    if (this.isClient()) {
      localStorage.setItem(KEYS.BORED_HISTORY, JSON.stringify(updated));
    }
    return updated;
  }

  getCareerProgress(): Record<string, boolean> {
    if (!this.isClient()) return {};
    try {
      const data = localStorage.getItem(KEYS.CAREER_PROGRESS);
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  }

  toggleCareerItem(itemId: string): Record<string, boolean> {
    const current = this.getCareerProgress();
    const updated = { ...current, [itemId]: !current[itemId] };
    if (this.isClient()) {
      localStorage.setItem(KEYS.CAREER_PROGRESS, JSON.stringify(updated));
      window.dispatchEvent(new Event("mnsworld:career-progress:updated"));
    }
    return updated;
  }

  clearAllData(): void {
    if (this.isClient()) {
      Object.values(KEYS).forEach((k) => localStorage.removeItem(k));
      window.dispatchEvent(new Event("mnsworld:reset"));
    }
  }

  exportData(): string {
    if (!this.isClient()) return "{}";
    const backup: Record<string, unknown> = {};
    Object.entries(KEYS).forEach(([key, storageKey]) => {
      try {
        const item = localStorage.getItem(storageKey);
        if (item) backup[key] = JSON.parse(item);
      } catch {
        // ignore invalid
      }
    });
    return JSON.stringify(backup, null, 2);
  }

  importData(jsonString: string): boolean {
    if (!this.isClient()) return false;
    try {
      const data = JSON.parse(jsonString);
      if (data.PREFERENCES) localStorage.setItem(KEYS.PREFERENCES, JSON.stringify(data.PREFERENCES));
      if (data.FOCUS_SETTINGS) localStorage.setItem(KEYS.FOCUS_SETTINGS, JSON.stringify(data.FOCUS_SETTINGS));
      if (data.FOCUS_SESSIONS) localStorage.setItem(KEYS.FOCUS_SESSIONS, JSON.stringify(data.FOCUS_SESSIONS));
      if (data.CAREER_PROGRESS) localStorage.setItem(KEYS.CAREER_PROGRESS, JSON.stringify(data.CAREER_PROGRESS));
      if (data.BORED_HISTORY) localStorage.setItem(KEYS.BORED_HISTORY, JSON.stringify(data.BORED_HISTORY));
      window.dispatchEvent(new Event("mnsworld:preferences:updated"));
      return true;
    } catch {
      return false;
    }
  }
}

export const storageRepository = new BrowserStorageRepository();
