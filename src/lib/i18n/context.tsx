"use client";

import React, { createContext, useContext, useEffect, useState, useTransition } from "react";
import { SupportedLocale, ThemeMode, UserPreferences } from "@/types";
import { storageRepository, DEFAULT_PREFERENCES } from "@/lib/storage";
import { gameAudio } from "@/lib/sound";
import enMessages from "../../../messages/en.json";
import hiMessages from "../../../messages/hi.json";

type Messages = typeof enMessages;

interface XpNotification {
  id: string;
  amount: number;
  message: string;
  leveledUp?: boolean;
  newLevel?: number;
}

interface MnsAppContextType {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  preferences: UserPreferences;
  updatePreferences: (updates: Partial<UserPreferences>) => void;
  awardXp: (amount: number, reason?: string) => void;
  setWallpaper: (url: string, presetId?: string) => void;
  setWallpaperBlur: (blur: number) => void;
  setWallpaperDim: (dim: number) => void;
  toggleSoundFx: () => void;
  t: (keyPath: string, params?: Record<string, string | number>) => string;
  isLoaded: boolean;
  needsOnboarding: boolean;
  completeOnboarding: (name: string, locale: SupportedLocale, theme: ThemeMode) => void;
  xpNotification: XpNotification | null;
}

const dictionaries: Record<SupportedLocale, Messages> = {
  en: enMessages,
  hi: hiMessages,
};

const MnsAppContext = createContext<MnsAppContextType | null>(null);

export function MnsAppProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = useState<UserPreferences>(DEFAULT_PREFERENCES);
  const [isLoaded, setIsLoaded] = useState(false);
  const [xpNotification, setXpNotification] = useState<XpNotification | null>(null);
  const [, startTransition] = useTransition();

  useEffect(() => {
    const loadedPrefs = storageRepository.getPreferences();
    setPreferences(loadedPrefs);
    setIsLoaded(true);

    const handleStorageUpdate = () => {
      setPreferences(storageRepository.getPreferences());
    };

    window.addEventListener("mnsworld:preferences:updated", handleStorageUpdate);
    window.addEventListener("mnsworld:reset", handleStorageUpdate);

    return () => {
      window.removeEventListener("mnsworld:preferences:updated", handleStorageUpdate);
      window.removeEventListener("mnsworld:reset", handleStorageUpdate);
    };
  }, []);

  // Theme application - rock solid dark & light toggling
  useEffect(() => {
    if (!isLoaded) return;

    const applyTheme = () => {
      const isDark =
        preferences.theme === "dark" ||
        (preferences.theme === "system" &&
          window.matchMedia("(prefers-color-scheme: dark)").matches);

      if (isDark) {
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
        document.documentElement.style.colorScheme = "dark";
      } else {
        document.documentElement.classList.add("light");
        document.documentElement.classList.remove("dark");
        document.documentElement.style.colorScheme = "light";
      }
    };

    applyTheme();

    if (preferences.theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => applyTheme();
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [preferences.theme, isLoaded]);

  // Reduced motion
  useEffect(() => {
    if (!isLoaded) return;
    if (preferences.reducedMotionOverride) {
      document.documentElement.classList.add("reduced-motion");
    } else {
      document.documentElement.classList.remove("reduced-motion");
    }
  }, [preferences.reducedMotionOverride, isLoaded]);

  // Document language
  useEffect(() => {
    if (!isLoaded) return;
    document.documentElement.lang = preferences.locale;
  }, [preferences.locale, isLoaded]);

  const updatePreferences = (updates: Partial<UserPreferences>) => {
    startTransition(() => {
      const saved = storageRepository.savePreferences(updates);
      setPreferences(saved);
    });
  };

  const setLocale = (locale: SupportedLocale) => {
    gameAudio.playClick(preferences.soundFxEnabled ?? true);
    updatePreferences({ locale });
  };

  const setTheme = (theme: ThemeMode) => {
    gameAudio.playClick(preferences.soundFxEnabled ?? true);
    updatePreferences({ theme });
  };

  const setWallpaper = (url: string, presetId = "custom") => {
    gameAudio.playClick(preferences.soundFxEnabled ?? true);
    updatePreferences({
      customWallpaper: url,
      wallpaperPreset: presetId,
    });
  };

  const setWallpaperBlur = (blur: number) => {
    updatePreferences({ wallpaperBlur: blur });
  };

  const setWallpaperDim = (dim: number) => {
    updatePreferences({ wallpaperDim: dim });
  };

  const toggleSoundFx = () => {
    const next = !(preferences.soundFxEnabled ?? true);
    if (next) gameAudio.playClick(true);
    updatePreferences({ soundFxEnabled: next });
  };

  const awardXp = (amount: number, reason = "Quest Completed") => {
    const res = storageRepository.addXp(amount);
    setPreferences(storageRepository.getPreferences());

    if (res.leveledUp) {
      gameAudio.playLevelUp(preferences.soundFxEnabled ?? true);
    } else {
      gameAudio.playQuestComplete(preferences.soundFxEnabled ?? true);
    }

    setXpNotification({
      id: `xp-${Date.now()}`,
      amount,
      message: reason,
      leveledUp: res.leveledUp,
      newLevel: res.newLevel,
    });

    setTimeout(() => {
      setXpNotification(null);
    }, 2800);
  };

  const completeOnboarding = (name: string, locale: SupportedLocale, theme: ThemeMode) => {
    gameAudio.playQuestComplete(true);
    updatePreferences({
      name: name.trim(),
      locale,
      theme,
      xp: 150,
      level: 1,
    });
  };

  const t = (keyPath: string, params?: Record<string, string | number>): string => {
    const currentDict = dictionaries[preferences.locale] || dictionaries.en;
    const parts = keyPath.split(".");
    let current: unknown = currentDict;

    for (const part of parts) {
      if (current && typeof current === "object" && part in current) {
        current = (current as Record<string, unknown>)[part];
      } else {
        let fallbackCurrent: unknown = dictionaries.en;
        for (const fbPart of parts) {
          if (fallbackCurrent && typeof fallbackCurrent === "object" && fbPart in fallbackCurrent) {
            fallbackCurrent = (fallbackCurrent as Record<string, unknown>)[fbPart];
          } else {
            return keyPath;
          }
        }
        current = fallbackCurrent;
        break;
      }
    }

    if (typeof current !== "string") {
      return keyPath;
    }

    let result = current;
    if (params) {
      Object.entries(params).forEach(([paramKey, val]) => {
        result = result.replace(new RegExp(`\\{${paramKey}\\}`, "g"), String(val));
      });
    }

    return result;
  };

  const needsOnboarding = isLoaded && !preferences.name;

  return (
    <MnsAppContext.Provider
      value={{
        locale: preferences.locale,
        setLocale,
        theme: preferences.theme,
        setTheme,
        preferences,
        updatePreferences,
        awardXp,
        setWallpaper,
        setWallpaperBlur,
        setWallpaperDim,
        toggleSoundFx,
        t,
        isLoaded,
        needsOnboarding,
        completeOnboarding,
        xpNotification,
      }}
    >
      {children}
    </MnsAppContext.Provider>
  );
}

export function useMnsApp() {
  const context = useContext(MnsAppContext);
  if (!context) {
    throw new Error("useMnsApp must be used within a MnsAppProvider");
  }
  return context;
}
