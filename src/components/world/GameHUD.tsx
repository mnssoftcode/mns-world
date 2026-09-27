"use client";

import React, { useState } from "react";
import { useMnsApp } from "@/lib/i18n/context";
import { WallpaperModal } from "@/components/world/WallpaperModal";
import { gameAudio } from "@/lib/sound";
import {
  Sparkles,
  Zap,
  Volume2,
  VolumeX,
  Image as ImageIcon,
  Trophy,
} from "lucide-react";

const LEVEL_TITLES = [
  "Novice Operator",
  "Digital Vanguard",
  "AI Specialist",
  "Neural Architect",
  "System Archon",
  "World Pioneer",
  "Cosmic Master",
];

export function GameHUD() {
  const { preferences, toggleSoundFx, xpNotification, isLoaded } = useMnsApp();
  const [wallpaperModalOpen, setWallpaperModalOpen] = useState(false);

  if (!isLoaded) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 pt-2 pb-1 h-9 select-none" />
    );
  }

  const xp = preferences.xp ?? 0;
  const level = preferences.level ?? 1;
  const soundEnabled = preferences.soundFxEnabled ?? true;

  // Calculate current level progress (each level is 150 XP)
  const xpInCurrentLevel = xp % 150;
  const levelPercent = Math.min(100, Math.round((xpInCurrentLevel / 150) * 100));
  const rankTitle = LEVEL_TITLES[(level - 1) % LEVEL_TITLES.length];

  return (
    <>
      {/* Top Floating Mini Game Status HUD */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 pt-2 pb-1 flex items-center justify-between text-[11px] font-mono text-[var(--text-secondary)] select-none">
        {/* Left: Player Rank & Level Progress */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg glass-subtle border border-indigo-400/30 text-indigo-300">
            <Zap className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span className="font-bold" suppressHydrationWarning>LVL {level}</span>
            <span className="opacity-75 hidden sm:inline" suppressHydrationWarning>• {rankTitle}</span>
          </div>

          {/* Mini XP Bar */}
          <div className="hidden md:flex items-center gap-2">
            <div className="w-24 h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full transition-all duration-300"
                style={{ width: `${levelPercent}%` }}
              />
            </div>
            <span className="text-[10px] text-[var(--text-muted)]" suppressHydrationWarning>
              {xpInCurrentLevel}/150 XP
            </span>
          </div>
        </div>

        {/* Right: Sound FX & Wallpaper Trigger */}
        <div className="flex items-center gap-2">
          {/* Quick Wallpaper Switcher */}
          <button
            onClick={() => {
              gameAudio.playClick(soundEnabled);
              setWallpaperModalOpen(true);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg glass-subtle hover:bg-white/10 text-[var(--text-secondary)] hover:text-white transition-all cursor-pointer"
            title="Customize Game World Wallpaper"
          >
            <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Wallpaper</span>
          </button>

          {/* Sound FX Toggle */}
          <button
            onClick={toggleSoundFx}
            className="flex items-center gap-1 px-2 py-1 rounded-lg glass-subtle hover:bg-white/10 text-[var(--text-secondary)] hover:text-white transition-all cursor-pointer"
            title={soundEnabled ? "Game audio ON" : "Game audio MUTED"}
          >
            {soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-rose-400" />
            )}
          </button>
        </div>
      </div>

      {/* Floating XP Reward Notification Banner */}
      {xpNotification && (
        <div className="fixed top-20 right-6 z-50 glass-elevated px-4 py-3 rounded-2xl border border-indigo-400/50 shadow-2xl flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300">
            {xpNotification.leveledUp ? (
              <Trophy className="w-5 h-5 text-amber-300" />
            ) : (
              <Sparkles className="w-5 h-5 text-indigo-300" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                {xpNotification.leveledUp ? "Level Up!" : "Quest Cleared"}
              </span>
              <span className="text-xs font-black font-mono text-amber-300">
                +{xpNotification.amount} XP
              </span>
            </div>
            <p className="text-[11px] text-zinc-300">
              {xpNotification.leveledUp
                ? `You reached Level ${xpNotification.newLevel}!`
                : xpNotification.message}
            </p>
          </div>
        </div>
      )}

      {/* Wallpaper Customization Modal */}
      <WallpaperModal
        isOpen={wallpaperModalOpen}
        onClose={() => setWallpaperModalOpen(false)}
      />
    </>
  );
}
