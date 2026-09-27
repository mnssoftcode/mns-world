"use client";

import React, { useState, useCallback } from "react";
import { BORED_ACTIVITIES, BORED_CATEGORIES } from "@/data/bored/activities";
import { BoredActivity } from "@/types";
import { storageRepository } from "@/lib/storage";
import { useMnsApp } from "@/lib/i18n/context";
import { gameAudio } from "@/lib/sound";
import {
  RefreshCw,
  Bookmark,
  Check,
  ArrowRight,
  Dice5,
  Zap,
} from "lucide-react";
import Link from "next/link";

export function BoredModule() {
  const { t, preferences, awardXp } = useMnsApp();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [currentActivity, setCurrentActivity] = useState<BoredActivity>(() => BORED_ACTIVITIES[0]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [savedActivities, setSavedActivities] = useState<string[]>(() => storageRepository.getBoredHistory());
  const [justSaved, setJustSaved] = useState<boolean>(false);
  const [questCompleted, setQuestCompleted] = useState<boolean>(false);

  const soundEnabled = preferences.soundFxEnabled ?? true;

  // Filter pool
  const pool = React.useMemo(() => {
    if (selectedCategory === "All") return BORED_ACTIVITIES;
    return BORED_ACTIVITIES.filter((a) => a.category === selectedCategory);
  }, [selectedCategory]);

  const selectRandomActivity = useCallback(
    (customPool?: BoredActivity[]) => {
      const activePool = customPool || pool;
      if (activePool.length === 0) return;

      gameAudio.playRoll(soundEnabled);
      setQuestCompleted(false);

      let nextIndex = Math.floor(Math.random() * activePool.length);
      if (activePool.length > 1 && currentActivity && activePool[nextIndex].id === currentActivity.id) {
        nextIndex = (nextIndex + 1) % activePool.length;
      }

      const selected = activePool[nextIndex];
      setCurrentIndex(nextIndex);
      setCurrentActivity(selected);

      // Save to history
      storageRepository.addBoredHistory(selected.id);
    },
    [pool, currentActivity, soundEnabled]
  );

  const handleCategoryChange = (category: string) => {
    gameAudio.playClick(soundEnabled);
    setSelectedCategory(category);
    const newPool =
      category === "All"
        ? BORED_ACTIVITIES
        : BORED_ACTIVITIES.filter((a) => a.category === category);
    selectRandomActivity(newPool);
  };

  const toggleBookmark = () => {
    if (!currentActivity) return;
    gameAudio.playClick(soundEnabled);
    const history = storageRepository.addBoredHistory(currentActivity.id);
    setSavedActivities(history);
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 1500);
  };

  const handleCompleteQuest = () => {
    if (!currentActivity || questCompleted) return;
    setQuestCompleted(true);
    awardXp(25, `Completed: ${currentActivity.title}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-6 sm:py-10 px-4 sm:px-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-subtle mb-3 text-xs font-mono tracking-wider uppercase text-[var(--text-secondary)] border border-[var(--border-subtle)]">
          <Dice5 className="w-3.5 h-3.5 text-purple-400" />
          <span>Game World Quest Terminal</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[var(--text-primary)] mb-2">
          {t("bored.title")}
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-md mx-auto">
          {t("bored.subtitle")}
        </p>
      </div>

      {/* Main Terminal Container */}
      <div className="glass-strong rounded-3xl p-4 sm:p-8 shadow-2xl border border-[var(--border-base)] relative overflow-hidden">
        {/* Category Filter Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar" role="tablist">
          {BORED_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={isActive}
                onClick={() => handleCategoryChange(cat)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all duration-150 cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md border border-indigo-400/40"
                    : "glass-subtle text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Center Quest Card */}
        <div className="min-h-[340px] sm:min-h-[380px] flex items-center justify-center py-4">
          {currentActivity && (
            <article
              className="w-full max-w-xl min-h-[320px] p-6 sm:p-10 rounded-3xl glass-elevated border border-[var(--border-base)] flex flex-col justify-between relative overflow-hidden shadow-2xl"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs uppercase tracking-widest font-mono font-bold text-purple-400">
                  {currentActivity.category}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-[var(--text-muted)]">
                    QUEST {currentIndex + 1} OF {pool.length}
                  </span>
                </div>
              </div>

              {/* Main Content */}
              <div className="my-6">
                <div className="text-5xl sm:text-6xl mb-4 select-none">
                  {currentActivity.emoji}
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)] leading-tight mb-2">
                  {currentActivity.title}
                </h2>
                <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                  {currentActivity.hint}
                </p>
              </div>

              {/* Quest Bottom Interactive Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[var(--border-subtle)] text-xs">
                {/* Complete Quest Button (+25 XP) */}
                <button
                  onClick={handleCompleteQuest}
                  disabled={questCompleted}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                    questCompleted
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : "bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40"
                  }`}
                >
                  {questCompleted ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Quest Completed (+25 XP)</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-3.5 h-3.5 text-amber-300" />
                      <span>Claim +25 XP</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-4">
                  {/* Bookmark Button */}
                  <button
                    onClick={toggleBookmark}
                    className="flex items-center gap-1.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                    title="Bookmark activity"
                  >
                    {justSaved ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-semibold">Saved</span>
                      </>
                    ) : (
                      <>
                        <Bookmark className="w-3.5 h-3.5" />
                        <span>{savedActivities.includes(currentActivity.id) ? "Bookmarked" : "Bookmark"}</span>
                      </>
                    )}
                  </button>

                  {/* If activity involves study or work, link to Focus module */}
                  {(currentActivity.category === "Learn / Think" ||
                    currentActivity.category === "Build / Create" ||
                    currentActivity.category === "Career") && (
                    <Link
                      href="/focus"
                      className="flex items-center gap-1 font-semibold text-indigo-400 hover:text-indigo-300 transition-colors group"
                    >
                      <span>Warp to Focus</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  )}
                </div>
              </div>
            </article>
          )}
        </div>

        {/* Primary Action Button */}
        <div className="flex flex-col items-center gap-3 mt-6">
          <button
            onClick={() => selectRandomActivity()}
            className="w-full sm:w-auto px-8 sm:px-12 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white font-black text-base sm:text-lg tracking-tight hover:opacity-95 active:scale-[0.98] transition-opacity shadow-[0_4px_20px_rgba(99,102,241,0.25)] flex items-center justify-center gap-3 cursor-pointer"
          >
            <RefreshCw className="w-5 h-5" />
            <span>{t("bored.generate")}</span>
          </button>

          {/* Counts */}
          <p className="text-xs text-[var(--text-muted)] font-mono text-center">
            {t("bored.counter", {
              count: BORED_ACTIVITIES.length,
              filtered: pool.length,
              category: selectedCategory,
            })}
          </p>
        </div>
      </div>

      {/* Footer Note */}
      <footer className="text-center text-xs text-[var(--text-muted)] mt-8">
        {t("bored.footerNote")}
      </footer>
    </div>
  );
}
