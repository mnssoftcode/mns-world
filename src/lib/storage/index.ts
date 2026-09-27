import {
  UserPreferences,
  FocusSettings,
  FocusSession,
  ProductivityTask,
  LifeGoal,
  LifeHabit,
  CustomExternalLink,
} from "@/types";

const KEYS = {
  PREFERENCES: "mnsworld:preferences",
  FOCUS_SETTINGS: "mnsworld:focus:settings",
  FOCUS_SESSIONS: "mnsworld:focus:sessions",
  BORED_HISTORY: "mnsworld:bored:history",
  CAREER_PROGRESS: "mnsworld:career:progress",
  PRODUCTIVITY_TASKS: "mnsworld:productivity:tasks",
  LIFE_GOALS: "mnsworld:life:goals",
  LIFE_HABITS: "mnsworld:life:habits",
  CUSTOM_LINKS: "mnsworld:custom-links",
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
  visibleModules: ["career", "life-goals", "enjoy", "web-hub", "library", "settings"],
};

export const DEFAULT_FOCUS_SETTINGS: FocusSettings = {
  version: 1,
  workMinutes: 25,
  breakMinutes: 5,
  autoStartBreak: false,
  soundEnabled: true,
};

export const DEFAULT_GOALS: LifeGoal[] = [
  {
    id: "aus-job-2027",
    title: "Secure AI/ML Engineer Job in Australia with Visa Sponsorship (2027)",
    description: "Land a role in Sydney/Melbourne utilizing fullstack AI, React Native on-device ML, and Python expertise.",
    timeframe: "long-term",
    category: "career",
    progress: 35,
    milestones: [
      { id: "m1", title: "Complete Passport & Documentation", completed: false },
      { id: "m2", title: "Score 8.0+ in IELTS Academic", completed: false },
      { id: "m3", title: "Complete MCA Degree verification", completed: true },
      { id: "m4", title: "Ship 3 Production Mobile AI Apps (TFLite/ONNX)", completed: true },
      { id: "m5", title: "Australian CV & LinkedIn Optimization", completed: false },
      { id: "m6", title: "ACS Skills Assessment application", completed: false },
    ],
  },
  {
    id: "us-dream",
    title: "Long-term US Relocation / Tech Leadership",
    description: "Ultimate horizon: Architect global AI systems in the United States.",
    timeframe: "long-term",
    category: "adventure",
    progress: 15,
    milestones: [
      { id: "m-us-1", title: "Establish international work track record", completed: false },
      { id: "m-us-2", title: "Publish open source AI models / papers", completed: false },
    ],
  },
  {
    id: "financial-runway",
    title: "Build 18-Month Offshore Financial Emergency Buffer",
    description: "Accumulate target relocation capital in AUD equivalent before moving.",
    timeframe: "yearly",
    category: "wealth",
    progress: 40,
    milestones: [
      { id: "m-fin-1", title: "Save initial moving allowance", completed: true },
      { id: "m-fin-2", title: "Establish foreign currency remittance accounts", completed: false },
    ],
  },
  {
    id: "physical-health",
    title: "Peak Mental & Physical Fitness",
    description: "Maintain high stamina, clear focus, and regular exercise routine.",
    timeframe: "current",
    category: "health",
    progress: 60,
    milestones: [
      { id: "m-h-1", title: "Consistent daily hydration & 7h sleep", completed: true },
      { id: "m-h-2", title: "Daily 30m brisk walk or gym workout", completed: true },
    ],
  },
];

export const DEFAULT_HABITS: LifeHabit[] = [
  {
    id: "daily-deep-focus",
    title: "Deep Work Focus Session (2h minimum)",
    frequency: "daily",
    streak: 5,
    category: "career",
  },
  {
    id: "english-immersion",
    title: "IELTS English Listening & Speaking Practice",
    frequency: "daily",
    streak: 12,
    category: "career",
  },
  {
    id: "ai-learning",
    title: "Study 1 AI/ML Research Concept or Paper",
    frequency: "daily",
    streak: 8,
    category: "learning",
  },
  {
    id: "exercise",
    title: "Physical Workout / Cardiovascular Activity",
    frequency: "daily",
    streak: 4,
    category: "health",
  },
];

export const DEFAULT_TASKS: ProductivityTask[] = [
  {
    id: "t1",
    title: "Finalize Passport Police Verification Documents",
    completed: false,
    priority: "high",
    category: "career",
    createdAt: new Date().toISOString(),
  },
  {
    id: "t2",
    title: "Implement ONNX Runtime benchmark on React Native demo",
    completed: false,
    priority: "high",
    category: "project",
    createdAt: new Date().toISOString(),
  },
  {
    id: "t3",
    title: "Review IELTS Listening Section 3 & 4 tactics",
    completed: true,
    priority: "medium",
    category: "career",
    createdAt: new Date().toISOString(),
  },
  {
    id: "t4",
    title: "Audit LinkedIn headline and featured projects for Australian recruiters",
    completed: false,
    priority: "medium",
    category: "career",
    createdAt: new Date().toISOString(),
  },
];

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

  // Productivity
  getProductivityTasks(): ProductivityTask[];
  addTask(task: Omit<ProductivityTask, "id" | "createdAt">): ProductivityTask[];
  toggleTask(taskId: string): ProductivityTask[];
  deleteTask(taskId: string): ProductivityTask[];

  // Life Goals
  getLifeGoals(): LifeGoal[];
  saveGoal(goal: LifeGoal): LifeGoal[];
  toggleMilestone(goalId: string, milestoneId: string): LifeGoal[];
  deleteGoal(goalId: string): LifeGoal[];

  // Habits
  getHabits(): LifeHabit[];
  toggleHabit(habitId: string): LifeHabit[];
  addHabit(title: string, frequency?: "daily" | "weekly"): LifeHabit[];
  deleteHabit(habitId: string): LifeHabit[];

  // Custom Links
  getCustomLinks(): CustomExternalLink[];
  addCustomLink(link: Omit<CustomExternalLink, "id">): CustomExternalLink[];
  deleteCustomLink(id: string): CustomExternalLink[];

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

  // Productivity
  getProductivityTasks(): ProductivityTask[] {
    if (!this.isClient()) return DEFAULT_TASKS;
    try {
      const data = localStorage.getItem(KEYS.PRODUCTIVITY_TASKS);
      if (!data) {
        localStorage.setItem(KEYS.PRODUCTIVITY_TASKS, JSON.stringify(DEFAULT_TASKS));
        return DEFAULT_TASKS;
      }
      return JSON.parse(data);
    } catch {
      return DEFAULT_TASKS;
    }
  }

  addTask(taskData: Omit<ProductivityTask, "id" | "createdAt">): ProductivityTask[] {
    const tasks = this.getProductivityTasks();
    const newTask: ProductivityTask = {
      ...taskData,
      id: "task-" + Date.now(),
      createdAt: new Date().toISOString(),
    };
    const updated = [newTask, ...tasks];
    if (this.isClient()) {
      localStorage.setItem(KEYS.PRODUCTIVITY_TASKS, JSON.stringify(updated));
      window.dispatchEvent(new Event("mnsworld:tasks:updated"));
    }
    return updated;
  }

  toggleTask(taskId: string): ProductivityTask[] {
    const tasks = this.getProductivityTasks();
    const updated = tasks.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t));
    if (this.isClient()) {
      localStorage.setItem(KEYS.PRODUCTIVITY_TASKS, JSON.stringify(updated));
      window.dispatchEvent(new Event("mnsworld:tasks:updated"));
    }
    return updated;
  }

  deleteTask(taskId: string): ProductivityTask[] {
    const tasks = this.getProductivityTasks();
    const updated = tasks.filter((t) => t.id !== taskId);
    if (this.isClient()) {
      localStorage.setItem(KEYS.PRODUCTIVITY_TASKS, JSON.stringify(updated));
      window.dispatchEvent(new Event("mnsworld:tasks:updated"));
    }
    return updated;
  }

  // Life Goals
  getLifeGoals(): LifeGoal[] {
    if (!this.isClient()) return DEFAULT_GOALS;
    try {
      const data = localStorage.getItem(KEYS.LIFE_GOALS);
      if (!data) {
        localStorage.setItem(KEYS.LIFE_GOALS, JSON.stringify(DEFAULT_GOALS));
        return DEFAULT_GOALS;
      }
      return JSON.parse(data);
    } catch {
      return DEFAULT_GOALS;
    }
  }

  saveGoal(goal: LifeGoal): LifeGoal[] {
    const goals = this.getLifeGoals();
    const exists = goals.some((g) => g.id === goal.id);
    const updated = exists ? goals.map((g) => (g.id === goal.id ? goal : g)) : [goal, ...goals];
    if (this.isClient()) {
      localStorage.setItem(KEYS.LIFE_GOALS, JSON.stringify(updated));
      window.dispatchEvent(new Event("mnsworld:goals:updated"));
    }
    return updated;
  }

  toggleMilestone(goalId: string, milestoneId: string): LifeGoal[] {
    const goals = this.getLifeGoals();
    const updated = goals.map((g) => {
      if (g.id !== goalId) return g;
      const updatedMilestones = g.milestones.map((m) =>
        m.id === milestoneId ? { ...m, completed: !m.completed } : m
      );
      const doneCount = updatedMilestones.filter((m) => m.completed).length;
      const progress =
        updatedMilestones.length > 0 ? Math.round((doneCount / updatedMilestones.length) * 100) : 0;
      return {
        ...g,
        milestones: updatedMilestones,
        progress,
        completed: progress === 100,
      };
    });
    if (this.isClient()) {
      localStorage.setItem(KEYS.LIFE_GOALS, JSON.stringify(updated));
      window.dispatchEvent(new Event("mnsworld:goals:updated"));
    }
    return updated;
  }

  deleteGoal(goalId: string): LifeGoal[] {
    const goals = this.getLifeGoals();
    const updated = goals.filter((g) => g.id !== goalId);
    if (this.isClient()) {
      localStorage.setItem(KEYS.LIFE_GOALS, JSON.stringify(updated));
      window.dispatchEvent(new Event("mnsworld:goals:updated"));
    }
    return updated;
  }

  // Habits
  getHabits(): LifeHabit[] {
    if (!this.isClient()) return DEFAULT_HABITS;
    try {
      const data = localStorage.getItem(KEYS.LIFE_HABITS);
      if (!data) {
        localStorage.setItem(KEYS.LIFE_HABITS, JSON.stringify(DEFAULT_HABITS));
        return DEFAULT_HABITS;
      }
      return JSON.parse(data);
    } catch {
      return DEFAULT_HABITS;
    }
  }

  toggleHabit(habitId: string): LifeHabit[] {
    const habits = this.getHabits();
    const today = new Date().toISOString().split("T")[0];
    const updated = habits.map((h) => {
      if (h.id !== habitId) return h;
      const wasDoneToday = h.lastCompletedDate === today;
      return {
        ...h,
        streak: wasDoneToday ? Math.max(0, h.streak - 1) : h.streak + 1,
        lastCompletedDate: wasDoneToday ? undefined : today,
      };
    });
    if (this.isClient()) {
      localStorage.setItem(KEYS.LIFE_HABITS, JSON.stringify(updated));
      window.dispatchEvent(new Event("mnsworld:habits:updated"));
    }
    return updated;
  }

  addHabit(title: string, frequency: "daily" | "weekly" = "daily"): LifeHabit[] {
    const habits = this.getHabits();
    const newHabit: LifeHabit = {
      id: "habit-" + Date.now(),
      title,
      frequency,
      streak: 1,
      lastCompletedDate: new Date().toISOString().split("T")[0],
    };
    const updated = [newHabit, ...habits];
    if (this.isClient()) {
      localStorage.setItem(KEYS.LIFE_HABITS, JSON.stringify(updated));
      window.dispatchEvent(new Event("mnsworld:habits:updated"));
    }
    return updated;
  }

  deleteHabit(habitId: string): LifeHabit[] {
    const habits = this.getHabits();
    const updated = habits.filter((h) => h.id !== habitId);
    if (this.isClient()) {
      localStorage.setItem(KEYS.LIFE_HABITS, JSON.stringify(updated));
      window.dispatchEvent(new Event("mnsworld:habits:updated"));
    }
    return updated;
  }

  // Custom Links
  getCustomLinks(): CustomExternalLink[] {
    if (!this.isClient()) return [];
    try {
      const data = localStorage.getItem(KEYS.CUSTOM_LINKS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  addCustomLink(linkData: Omit<CustomExternalLink, "id">): CustomExternalLink[] {
    const links = this.getCustomLinks();
    const newLink: CustomExternalLink = {
      ...linkData,
      id: "link-" + Date.now(),
    };
    const updated = [...links, newLink];
    if (this.isClient()) {
      localStorage.setItem(KEYS.CUSTOM_LINKS, JSON.stringify(updated));
      window.dispatchEvent(new Event("mnsworld:custom-links:updated"));
    }
    return updated;
  }

  deleteCustomLink(id: string): CustomExternalLink[] {
    const links = this.getCustomLinks();
    const updated = links.filter((l) => l.id !== id);
    if (this.isClient()) {
      localStorage.setItem(KEYS.CUSTOM_LINKS, JSON.stringify(updated));
      window.dispatchEvent(new Event("mnsworld:custom-links:updated"));
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
      if (!data || typeof data !== "object" || Array.isArray(data)) return false;

      let importedAny = false;
      if (data.PREFERENCES && typeof data.PREFERENCES === "object") {
        localStorage.setItem(KEYS.PREFERENCES, JSON.stringify(data.PREFERENCES));
        importedAny = true;
      }
      if (data.FOCUS_SETTINGS && typeof data.FOCUS_SETTINGS === "object") {
        localStorage.setItem(KEYS.FOCUS_SETTINGS, JSON.stringify(data.FOCUS_SETTINGS));
        importedAny = true;
      }
      if (Array.isArray(data.FOCUS_SESSIONS)) {
        localStorage.setItem(KEYS.FOCUS_SESSIONS, JSON.stringify(data.FOCUS_SESSIONS));
        importedAny = true;
      }
      if (data.CAREER_PROGRESS && typeof data.CAREER_PROGRESS === "object") {
        localStorage.setItem(KEYS.CAREER_PROGRESS, JSON.stringify(data.CAREER_PROGRESS));
        importedAny = true;
      }
      if (Array.isArray(data.BORED_HISTORY)) {
        localStorage.setItem(KEYS.BORED_HISTORY, JSON.stringify(data.BORED_HISTORY));
        importedAny = true;
      }
      if (Array.isArray(data.PRODUCTIVITY_TASKS)) {
        localStorage.setItem(KEYS.PRODUCTIVITY_TASKS, JSON.stringify(data.PRODUCTIVITY_TASKS));
        importedAny = true;
      }
      if (Array.isArray(data.LIFE_GOALS)) {
        localStorage.setItem(KEYS.LIFE_GOALS, JSON.stringify(data.LIFE_GOALS));
        importedAny = true;
      }
      if (Array.isArray(data.LIFE_HABITS)) {
        localStorage.setItem(KEYS.LIFE_HABITS, JSON.stringify(data.LIFE_HABITS));
        importedAny = true;
      }
      if (Array.isArray(data.CUSTOM_LINKS)) {
        localStorage.setItem(KEYS.CUSTOM_LINKS, JSON.stringify(data.CUSTOM_LINKS));
        importedAny = true;
      }

      if (importedAny) {
        window.dispatchEvent(new Event("mnsworld:preferences:updated"));
        window.dispatchEvent(new Event("mnsworld:tasks:updated"));
        window.dispatchEvent(new Event("mnsworld:focus-sessions:updated"));
        window.dispatchEvent(new Event("mnsworld:goals:updated"));
        window.dispatchEvent(new Event("mnsworld:habits:updated"));
        window.dispatchEvent(new Event("mnsworld:custom-links:updated"));
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }
}

export const storageRepository = new BrowserStorageRepository();
