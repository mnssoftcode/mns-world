"use client";

import React, { useState } from "react";
import { useMnsApp } from "@/lib/i18n/context";
import { storageRepository } from "@/lib/storage";
import { ThemeMode } from "@/types";
import { WallpaperModal } from "@/components/world/WallpaperModal";
import { gameAudio } from "@/lib/sound";
import {
  Sliders,
  User,
  Globe,
  Sun,
  Moon,
  Laptop,
  Shield,
  Download,
  Upload,
  Trash2,
  Check,
  AlertTriangle,
  Image as ImageIcon,
  Volume2,
  VolumeX,
} from "lucide-react";

export function SettingsModule() {
  const {
    preferences,
    updatePreferences,
    locale,
    setLocale,
    theme,
    setTheme,
    toggleSoundFx,
    t,
  } = useMnsApp();

  const [name, setName] = useState(preferences.name);
  const [showSavedToast, setShowSavedToast] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const [wallpaperModalOpen, setWallpaperModalOpen] = useState(false);

  const soundEnabled = preferences.soundFxEnabled ?? true;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      gameAudio.playQuestComplete(soundEnabled);
      updatePreferences({ name: name.trim() });
      triggerToast();
    }
  };

  const triggerToast = () => {
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 2500);
  };

  const handleExport = () => {
    gameAudio.playClick(soundEnabled);
    const json = storageRepository.exportData();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `mnsworld-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = storageRepository.importData(content);
      if (success) {
        gameAudio.playQuestComplete(soundEnabled);
        setImportStatus("Backup successfully restored!");
        setTimeout(() => setImportStatus(null), 3000);
      } else {
        setImportStatus("Invalid backup file format.");
        setTimeout(() => setImportStatus(null), 3000);
      }
    };
    reader.readAsText(file);
  };

  const handleFactoryReset = () => {
    storageRepository.clearAllData();
    setShowResetConfirm(false);
    window.location.href = "/";
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-6 sm:py-10 px-4 sm:px-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-subtle mb-3 text-xs font-mono tracking-wider uppercase text-[var(--text-secondary)] border border-[var(--border-subtle)]">
          <Sliders className="w-3.5 h-3.5 text-zinc-400" />
          <span>System Console</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[var(--text-primary)] mb-2">
          {t("settings.title")}
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-md mx-auto">
          {t("settings.subtitle")}
        </p>
      </div>

      {/* Main Settings Sections */}
      <div className="space-y-6">
        {/* Game World Wallpaper Atmosphere Card */}
        <div className="glass-strong rounded-3xl p-6 sm:p-8 border border-[var(--border-base)] shadow-xl">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-500/15 text-indigo-400">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[var(--text-primary)]">
                  Game World Wallpaper & Ambience
                </h2>
                <span className="text-xs text-[var(--text-muted)] font-mono">
                  Personalize with custom wallpaper, blur, and opacity
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                gameAudio.playClick(soundEnabled);
                setWallpaperModalOpen(true);
              }}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-xs hover:opacity-90 transition-all cursor-pointer shadow-md"
            >
              Configure Wallpaper
            </button>
          </div>

          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Upload your favorite gaming background, wallpaper, or choose from our curated sci-fi presets. You can freely adjust background blur and tinting so readability remains pristine.
          </p>
        </div>

        {/* Profile & Name */}
        <div className="glass-strong rounded-3xl p-6 sm:p-8 border border-[var(--border-base)] shadow-xl">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2.5 rounded-xl bg-white/10 text-[var(--text-primary)]">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[var(--text-primary)]">
                {t("settings.profileHeading")}
              </h2>
              <span className="text-xs text-[var(--text-muted)] font-mono">
                Player Identity & Localization
              </span>
            </div>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-5">
            <div>
              <label className="text-xs text-[var(--text-secondary)] uppercase tracking-wider block mb-1.5 font-bold">
                {t("settings.userName")}
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl glass-base text-[var(--text-primary)] text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="e.g. Manish"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-xs hover:opacity-90 active:scale-95 transition-all cursor-pointer shadow-sm"
                >
                  {t("common.save")}
                </button>
              </div>
            </div>

            {/* Language Selection */}
            <div>
              <label className="text-xs text-[var(--text-secondary)] uppercase tracking-wider block mb-1.5 font-bold">
                {t("common.language")}
              </label>
              <div className="grid grid-cols-2 gap-3 max-w-sm">
                <button
                  type="button"
                  onClick={() => setLocale("en")}
                  className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    locale === "en"
                      ? "bg-white text-black shadow-md border border-white/20"
                      : "glass-subtle text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>English (EN)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLocale("hi")}
                  className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    locale === "hi"
                      ? "bg-white text-black shadow-md border border-white/20"
                      : "glass-subtle text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>हिन्दी (HI)</span>
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Appearance & Motion */}
        <div className="glass-strong rounded-3xl p-6 sm:p-8 border border-[var(--border-base)] shadow-xl">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2.5 rounded-xl bg-amber-500/15 text-amber-400">
              <Sun className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[var(--text-primary)]">
                {t("settings.appearanceHeading")}
              </h2>
              <span className="text-xs text-[var(--text-muted)] font-mono">
                Theme and tactile audio controls
              </span>
            </div>
          </div>

          <div className="space-y-6">
            {/* Theme Toggle */}
            <div>
              <label className="text-xs text-[var(--text-secondary)] uppercase tracking-wider block mb-2 font-bold">
                {t("settings.themeMode")}
              </label>
              <div className="grid grid-cols-3 gap-2.5 max-w-md">
                {[
                  { id: "dark", label: t("common.dark"), icon: Moon },
                  { id: "light", label: t("common.light"), icon: Sun },
                  { id: "system", label: t("common.system"), icon: Laptop },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = theme === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setTheme(item.id as ThemeMode)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        isSelected
                          ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md border border-indigo-400/40"
                          : "glass-subtle text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sound FX Toggle */}
            <div className="flex items-start justify-between gap-4 pt-4 border-t border-[var(--border-subtle)]">
              <div>
                <span className="text-sm font-bold text-[var(--text-primary)] block">
                  Game Audio Feedback
                </span>
                <p className="text-xs text-[var(--text-secondary)] max-w-lg mt-0.5 leading-relaxed">
                  Tactile high-tech audio cues for button clicks, roll sounds, and quest completion fanfares.
                </p>
              </div>
              <button
                type="button"
                onClick={toggleSoundFx}
                className={`p-2.5 rounded-xl transition-all cursor-pointer ${
                  soundEnabled
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : "glass-subtle text-[var(--text-muted)] border border-[var(--border-subtle)]"
                }`}
              >
                {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5 text-rose-400" />}
              </button>
            </div>

            {/* Reduced Motion Toggle */}
            <div className="flex items-start justify-between gap-4 pt-4 border-t border-[var(--border-subtle)]">
              <div>
                <span className="text-sm font-bold text-[var(--text-primary)] block">
                  {t("settings.reducedMotion")}
                </span>
                <p className="text-xs text-[var(--text-secondary)] max-w-lg mt-0.5 leading-relaxed">
                  {t("settings.reducedMotionDesc")}
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  updatePreferences({
                    reducedMotionOverride: !preferences.reducedMotionOverride,
                  })
                }
                className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                  preferences.reducedMotionOverride ? "bg-indigo-500" : "bg-white/20"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                    preferences.reducedMotionOverride ? "left-7" : "left-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Local Storage & Backup */}
        <div className="glass-strong rounded-3xl p-6 sm:p-8 border border-[var(--border-base)] shadow-xl">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[var(--text-primary)]">
                {t("settings.storageHeading")}
              </h2>
              <span className="text-xs text-[var(--text-muted)] font-mono">
                100% private on-device state
              </span>
            </div>
          </div>

          <p className="text-xs text-[var(--text-secondary)] mb-6 leading-relaxed">
            {t("settings.storageDesc")}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleExport}
              className="px-4 py-2.5 rounded-xl glass-subtle hover:bg-white/10 text-xs font-bold text-[var(--text-primary)] flex items-center gap-2 transition-all cursor-pointer border border-[var(--border-subtle)]"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>{t("settings.exportButton")}</span>
            </button>

            <label className="px-4 py-2.5 rounded-xl glass-subtle hover:bg-white/10 text-xs font-bold text-[var(--text-primary)] flex items-center gap-2 transition-all cursor-pointer border border-[var(--border-subtle)]">
              <Upload className="w-4 h-4 text-blue-400" />
              <span>{t("settings.importButton")}</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImportFile}
                className="hidden"
              />
            </label>

            <button
              onClick={() => setShowResetConfirm(true)}
              className="px-4 py-2.5 rounded-xl glass-subtle hover:bg-rose-500/20 text-xs font-bold text-rose-400 flex items-center gap-2 transition-all cursor-pointer border border-rose-500/30"
            >
              <Trash2 className="w-4 h-4" />
              <span>{t("settings.clearAllButton")}</span>
            </button>
          </div>

          {importStatus && (
            <p className="mt-3 text-xs font-mono text-emerald-400">{importStatus}</p>
          )}
        </div>
      </div>

      {/* Confirmation Modal for Reset */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md glass-elevated rounded-3xl p-6 border border-rose-500/30 animate-card-pop">
            <div className="flex items-center gap-3 text-rose-400 mb-3">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-lg font-bold text-[var(--text-primary)]">Confirm Local Data Reset</h3>
            </div>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] mb-6 leading-relaxed">
              {t("settings.clearConfirm")}
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 rounded-xl text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                {t("common.cancel")}
              </button>
              <button
                type="button"
                onClick={handleFactoryReset}
                className="px-4 py-2 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-500 cursor-pointer"
              >
                Yes, Reset All Data
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Saved Toast */}
      {showSavedToast && (
        <div className="fixed bottom-6 right-6 z-50 glass-elevated px-4 py-3 rounded-2xl flex items-center gap-2 border border-emerald-500/40 text-emerald-300 text-xs font-bold shadow-2xl animate-card-pop">
          <Check className="w-4 h-4" />
          <span>{t("settings.savedNotice")}</span>
        </div>
      )}

      {/* Wallpaper Customization Modal */}
      <WallpaperModal
        isOpen={wallpaperModalOpen}
        onClose={() => setWallpaperModalOpen(false)}
      />
    </div>
  );
}
