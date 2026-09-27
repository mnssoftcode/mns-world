"use client";

import React, { useState, useCallback } from "react";
import { BORED_ACTIVITIES } from "@/data/bored/activities";
import { ENTERTAINMENT_SITES } from "@/data/external-sites/entertainment";
import { BoredActivity } from "@/types";
import { storageRepository } from "@/lib/storage";
import { useMnsApp } from "@/lib/i18n/context";
import { gameAudio } from "@/lib/sound";
import { ExternalResourceCard } from "@/components/common/ExternalResourceCard";
import {
  Sparkles,
  Dice5,
  RefreshCw,
  Tv,
  Film,
  Gamepad2,
  Music,
  Compass,
  Zap,
  CheckCircle,
  BookOpen,
} from "lucide-react";

type EnjoyTab = "bored" | "random" | "media";

const RANDOM_PROMPTS: Record<string, string[]> = {
  Activity: [
    "Take a 15-minute walk outside without taking your phone.",
    "Sketch your current room layout from an isometric bird-eye view.",
    "Do 25 pushups, drink 500ml water, and stretch your spine for 5 minutes.",
    "Organize your computer desktop and clean your Downloads folder.",
    "Write a 100-word micro-story about a time traveler arriving in 2027.",
  ],
  Movie: [
    "Sci-Fi Classic: 'Interstellar' (2014) — Direction by Christopher Nolan",
    "Mind-Bender: 'Arrival' (2016) — Linguistics & first alien contact",
    "Cyberpunk: 'Blade Runner 2049' (2017) — Atmospheric AI & identity",
    "Engineering Grit: 'The Martian' (2015) — Scientific problem-solving under pressure",
    "Animation Masterpiece: 'Spider-Man: Into the Spider-Verse' (2018)",
  ],
  Series: [
    "Tech & Systems: 'Silicon Valley' (HBO) — Hilarious tech startup realism",
    "Dystopian AI: 'Severance' (Apple TV+) — Workplace bifurcation mystery",
    "Historical Depth: 'Chernobyl' (HBO) — Uncompromising engineering truth",
    "Sci-Fi Exploration: 'The Expanse' (Prime Video) — Hard science space realism",
    "Mind Games: 'Dark' (Netflix) — Multi-generational time travel puzzle",
  ],
  Game: [
    "Indie Puzzle: 'Portal 2' — Master physics and spatial reasoning",
    "Calm Architecture: 'Mini Metro' / 'Mini Motorways' — Urban transit simulation",
    "Atmospheric Roguelike: 'Hades' — Fast reflexes and narrative craft",
    "Tactical Sci-Fi: 'FTL: Faster Than Light' — Spaceship management",
    "Relaxation: 'A Short Hike' — Gentle mountain climbing exploration",
  ],
  Music: [
    "Synthwave Focus: Synthwave / Retrowave Cyber Chill Instrumental",
    "Deep Coding: Lofi Girl 24/7 Deep Concentration Beats",
    "Cinematic Drive: Hans Zimmer Live in Prague Orchestral Score",
    "Calm Classical: Max Richter — 'Sleep' / 'Blue Notebooks'",
    "Ambient Drone: Brian Eno — 'Music for Airports'",
  ],
  Learning: [
    "Watch a 20-minute 3Blue1Brown video on Neural Networks and Backpropagation.",
    "Read the original 2017 'Attention Is All You Need' paper abstract and diagrams.",
    "Explore how SQLite implements B-Tree storage under the hood.",
    "Inspect the source code of an open-source React Native camera library.",
  ],
  Adventure: [
    "Visit a local coffee shop or tea stall you have never walked into before.",
    "Take a completely different street route home today.",
    "Wake up 45 minutes before sunrise and watch dawn break from the rooftop.",
    "Plan a weekend solo bike exploration to a nearby nature spot.",
  ],
  Challenge: [
    "Zero sugar and zero ultra-processed foods for the next 48 hours.",
    "Complete 100 deep bodyweight squats throughout today.",
    "No social media or video feeds until after 6:00 PM today.",
    "Explain how a Transformer neural network works out loud to an empty room.",
  ],
};

export function EnjoyModule() {
  const { t, preferences, awardXp } = useMnsApp();
  const [activeTab, setActiveTab] = useState<EnjoyTab>("bored");

  // I'm Bored State
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [currentActivity, setCurrentActivity] = useState<BoredActivity>(() => BORED_ACTIVITIES[0]);
  const [lastActivityId, setLastActivityId] = useState<string>(() => BORED_ACTIVITIES[0].id);

  // Random Mode State
  const [selectedRandomMode, setSelectedRandomMode] = useState<string>("Activity");
  const [randomResult, setRandomResult] = useState<string>("");

  const soundEnabled = preferences.soundFxEnabled ?? true;

  // Categories
  const categories = ["All", ...Array.from(new Set(BORED_ACTIVITIES.map((a) => a.category)))];

  const pool = BORED_ACTIVITIES.filter((a) => {
    if (!a.enabled) return false;
    if (categoryFilter === "All") return true;
    return a.category.toLowerCase() === categoryFilter.toLowerCase();
  });

  const selectRandomActivity = useCallback(
    (poolOverride?: BoredActivity[]) => {
      const activePool = poolOverride || pool;
      if (activePool.length === 0) return;

      gameAudio.playRoll(soundEnabled);

      let eligible = activePool.filter((a) => a.id !== lastActivityId);
      if (eligible.length === 0) eligible = activePool;

      const randomIndex = Math.floor(Math.random() * eligible.length);
      const chosen = eligible[randomIndex];

      setCurrentActivity(chosen);
      setLastActivityId(chosen.id);
      storageRepository.addBoredHistory(chosen.id);
    },
    [pool, lastActivityId, soundEnabled]
  );

  const handleCategoryChange = (cat: string) => {
    gameAudio.playClick(soundEnabled);
    setCategoryFilter(cat);
    const newPool = BORED_ACTIVITIES.filter((a) => {
      if (!a.enabled) return false;
      if (cat === "All") return true;
      return a.category.toLowerCase() === cat.toLowerCase();
    });
    selectRandomActivity(newPool);
  };

  const handleSpinRandomPrompt = useCallback(
    (modeName: string) => {
      setSelectedRandomMode(modeName);
      gameAudio.playRoll(soundEnabled);
      const options = RANDOM_PROMPTS[modeName] || RANDOM_PROMPTS.Activity;
      const item = options[Math.floor(Math.random() * options.length)];
      setRandomResult(item);
      awardXp(10, `Rolled Random ${modeName}`);
    },
    [soundEnabled, awardXp]
  );

  const randomModes = [
    { name: "Activity", icon: Zap },
    { name: "Movie", icon: Film },
    { name: "Series", icon: Tv },
    { name: "Game", icon: Gamepad2 },
    { name: "Music", icon: Music },
    { name: "Learning", icon: BookOpen },
    { name: "Adventure", icon: Compass },
    { name: "Challenge", icon: Sparkles },
  ];

  const tabs: { id: EnjoyTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "bored", label: "I'm Bored (118 Quests)", icon: Dice5 },
    { id: "random", label: "Random Generator", icon: Sparkles },
    { id: "media", label: "Entertainment Hub", icon: Film },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto py-6 sm:py-10 px-4 sm:px-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-subtle mb-3 text-xs font-mono tracking-wider uppercase text-[var(--text-secondary)] border border-[var(--border-subtle)]">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>Anti-Boredom & Entertainment Terminal</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[var(--text-primary)] mb-2">
          {t("enjoy.title")}
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-xl mx-auto">
          {t("enjoy.subtitle")}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-center overflow-x-auto gap-2 mb-8 pb-2 border-b border-[var(--border-subtle)] scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                gameAudio.playClick(soundEnabled);
                setActiveTab(tab.id);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-colors duration-150 cursor-pointer ${
                isActive
                  ? "bg-white/20 text-[var(--text-primary)] border border-[var(--border-base)] shadow-sm"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/10"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-purple-400" : "text-[var(--text-muted)]"}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: I'M BORED (AUTHENTIC 118 ACTIVITIES) */}
      {activeTab === "bored" && (
        <div className="space-y-6">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-2xl mx-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-3 py-1 rounded-full text-xs font-mono font-medium transition-colors cursor-pointer ${
                  categoryFilter === cat
                    ? "bg-purple-600 text-white shadow-sm"
                    : "glass-subtle text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/10 border border-[var(--border-subtle)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Activity Card Stage */}
          <div className="min-h-[300px] flex items-center justify-center py-4">
            {currentActivity && (
              <div className="w-full max-w-xl min-h-[300px] p-8 sm:p-10 rounded-3xl glass-elevated border border-[var(--border-base)] flex flex-col justify-between shadow-2xl relative">
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="text-xs uppercase tracking-widest font-mono font-bold text-purple-400">
                      {currentActivity.category}
                    </span>
                    <span className="text-3xl select-none" role="img" aria-label="activity icon">
                      {currentActivity.emoji}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] mb-3 leading-snug">
                    {currentActivity.title}
                  </h2>

                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {currentActivity.hint}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs text-[var(--text-muted)] font-mono">
                  <span>Pool: {pool.length} available</span>
                  <button
                    onClick={() => {
                      awardXp(25, `Cleared: ${currentActivity.title}`);
                      selectRandomActivity();
                    }}
                    className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-bold cursor-pointer"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Done (+25 XP)</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Roll Button */}
          <div className="flex flex-col items-center gap-3">
            <button
              onClick={() => selectRandomActivity()}
              className="px-10 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white font-black text-base sm:text-lg tracking-tight hover:opacity-95 active:scale-[0.98] transition-opacity shadow-[0_4px_20px_rgba(99,102,241,0.25)] flex items-center gap-3 cursor-pointer"
            >
              <RefreshCw className="w-5 h-5" />
              <span>{t("bored.generate")}</span>
            </button>
            <p className="text-xs text-[var(--text-muted)] font-mono text-center">
              118 curated offline and digital activities • Zero friction
            </p>
          </div>
        </div>
      )}

      {/* TAB 2: RANDOM ENJOYMENT GENERATOR */}
      {activeTab === "random" && (
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1">
              Select Random Domain
            </h3>
            <p className="text-xs text-[var(--text-secondary)]">
              Choose a creative catalyst to break mental stagnation.
            </p>
          </div>

          {/* Random Mode Buttons Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
            {randomModes.map((m) => {
              const Icon = m.icon;
              const isSelected = selectedRandomMode === m.name;
              return (
                <button
                  key={m.name}
                  onClick={() => handleSpinRandomPrompt(m.name)}
                  className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-purple-600/20 border-purple-400 text-white shadow-md"
                      : "glass-base border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-white hover:border-purple-400/40"
                  }`}
                >
                  <Icon className="w-5 h-5 text-purple-400" />
                  <span className="text-xs font-bold">{m.name}</span>
                </button>
              );
            })}
          </div>

          {/* Random Display Card */}
          <div className="max-w-xl mx-auto p-8 rounded-3xl glass-elevated border border-[var(--border-base)] text-center shadow-xl min-h-[180px] flex flex-col justify-center items-center">
            {randomResult ? (
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 font-bold block mb-2">
                  Random {selectedRandomMode} Catalyst
                </span>
                <p className="text-base sm:text-lg font-bold text-[var(--text-primary)] leading-relaxed">
                  &quot;{randomResult}&quot;
                </p>
              </div>
            ) : (
              <p className="text-xs text-[var(--text-muted)] font-mono">
                Click any category above to generate a spontaneous idea.
              </p>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: ENTERTAINMENT LAUNCHPAD */}
      {activeTab === "media" && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl glass-base border border-[var(--border-subtle)]">
            <h3 className="text-base font-bold text-[var(--text-primary)] mb-1">
              Curated Entertainment Launcher
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              MnsWorld connects to these external services directly. Links open in a new tab without embedding or mirroring.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ENTERTAINMENT_SITES.map((site) => (
              <ExternalResourceCard key={site.id} resource={site} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
