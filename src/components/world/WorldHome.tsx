"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useMnsApp } from "@/lib/i18n/context";
import { APP_MODULES } from "@/lib/modules";
import { PortalCard } from "@/components/world/PortalCard";
import { storageRepository } from "@/lib/storage";
import { CAREER_PHASES } from "@/data/career/roadmap";
import { BORED_ACTIVITIES } from "@/data/bored/activities";
import { gameAudio } from "@/lib/sound";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Flame,
  Compass,
  Zap,
  Dice5,
  Gamepad2,
} from "lucide-react";

export function WorldHome() {
  const { preferences, t, locale, isLoaded } = useMnsApp();

  const [greetingKey, setGreetingKey] = useState<string>("home.greetingMorning");
  const [liveTime, setLiveTime] = useState<string>("");
  const [liveDate, setLiveDate] = useState<string>("");
  const [careerPct, setCareerPct] = useState<number>(0);
  const [todayFocusMinutes, setTodayFocusMinutes] = useState<number>(0);

  const soundEnabled = preferences.soundFxEnabled ?? true;
  const level = preferences.level ?? 1;

  // Time & greeting
  useEffect(() => {
    const updateGreetingAndTime = () => {
      const now = new Date();
      const hours = now.getHours();

      if (hours >= 5 && hours < 12) {
        setGreetingKey("home.greetingMorning");
      } else if (hours >= 12 && hours < 17) {
        setGreetingKey("home.greetingAfternoon");
      } else if (hours >= 17 && hours < 22) {
        setGreetingKey("home.greetingEvening");
      } else {
        setGreetingKey("home.greetingNight");
      }

      try {
        const timeFmt = new Intl.DateTimeFormat(locale === "hi" ? "hi-IN" : "en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }).format(now);

        const dateFmt = new Intl.DateTimeFormat(locale === "hi" ? "hi-IN" : "en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        }).format(now);

        setLiveTime(timeFmt);
        setLiveDate(dateFmt);
      } catch {
        setLiveTime(now.toLocaleTimeString());
        setLiveDate(now.toLocaleDateString());
      }
    };

    updateGreetingAndTime();
    const timer = setInterval(updateGreetingAndTime, 1000);
    return () => clearInterval(timer);
  }, [locale]);

  // Telemetry stats
  useEffect(() => {
    const progress = storageRepository.getCareerProgress();
    const allItems = CAREER_PHASES.flatMap((p) => p.items);
    let done = 0;
    allItems.forEach((i) => {
      if (progress[i.id] || (i.completed && !(i.id in progress))) done++;
    });
    setCareerPct(allItems.length > 0 ? Math.round((done / allItems.length) * 100) : 0);

    const sessions = storageRepository.getFocusSessions();
    const today = new Date().toDateString();
    const todaySecs = sessions
      .filter((s) => s.completed && new Date(s.startedAt).toDateString() === today)
      .reduce((acc, s) => acc + (s.durationSeconds || 0), 0);
    setTodayFocusMinutes(Math.round(todaySecs / 60));
  }, []);

  const userName = isLoaded && preferences.name ? preferences.name : "Player One";

  return (
    <div className="w-full max-w-6xl mx-auto py-6 sm:py-10 px-4 sm:px-8">
      {/* Central Visual Stage */}
      <section className="relative text-center my-4 sm:my-8">
        {/* Central Core Sphere Orb */}
        <div className="mx-auto w-32 h-32 sm:w-44 sm:h-44 rounded-full bg-gradient-to-tr from-indigo-600 via-purple-500 to-amber-300 p-[1.5px] shadow-[0_0_80px_rgba(99,102,241,0.28)] flex items-center justify-center mb-6 relative">
          {/* Subtle Outer Radar Ring */}
          <div className="absolute inset-0 rounded-full border border-indigo-400/30 animate-radar pointer-events-none" />

          <div className="w-full h-full rounded-full bg-black/75 backdrop-blur-2xl flex flex-col items-center justify-center border border-white/20 select-none">
            <span className="text-xs sm:text-base font-mono font-black tracking-widest text-zinc-100">
              {liveTime || "00:00:00"}
            </span>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[10px] font-mono text-emerald-300 font-bold uppercase tracking-wider">
                WORLD ONLINE
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Greeting & Player Status */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-subtle mb-3 text-xs font-mono tracking-wider uppercase text-[var(--text-secondary)] border border-[var(--border-subtle)]">
          <Gamepad2 className="w-3.5 h-3.5 text-indigo-400" />
          <span>{liveDate}</span>
          <span className="text-[var(--text-muted)]">•</span>
          <span className="text-amber-400 font-bold">LVL {level}</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-[var(--text-primary)] mb-3">
          {t(greetingKey)},{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">
            {userName}
          </span>
          .
        </h1>

        <p className="text-sm sm:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed mb-8">
          {t("home.worldSubheading")}
        </p>

        {/* Game Quick Action: Roll Random Activity */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <Link
            href="/bored"
            onClick={() => gameAudio.playRoll(soundEnabled)}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white font-extrabold text-sm tracking-tight hover:opacity-95 active:scale-95 transition-all shadow-[0_10px_30px_rgba(99,102,241,0.35)] flex items-center gap-2.5 cursor-pointer"
          >
            <Dice5 className="w-4 h-4 animate-spin" />
            <span>Roll Random Quest</span>
          </Link>

          <Link
            href="/career"
            onClick={() => gameAudio.playClick(soundEnabled)}
            className="px-6 py-3 rounded-2xl glass-strong hover:glass-elevated text-[var(--text-primary)] font-bold text-sm tracking-tight border border-[var(--border-base)] hover:border-indigo-400/50 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Compass className="w-4 h-4 text-indigo-400" />
            <span>Career Campaign</span>
          </Link>
        </div>

        {/* Telemetry Quick Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto mb-10">
          <div className="p-3.5 rounded-2xl glass-subtle flex items-center gap-3 border border-[var(--border-subtle)]">
            <div className="p-2 rounded-xl bg-blue-500/15 text-blue-400">
              <Compass className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="text-xs font-mono font-bold text-[var(--text-primary)] block">
                {careerPct}% Cleared
              </span>
              <span className="text-[10px] text-[var(--text-muted)] font-mono">
                Career Roadmap
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl glass-subtle flex items-center gap-3 border border-[var(--border-subtle)]">
            <div className="p-2 rounded-xl bg-orange-500/15 text-orange-400">
              <Flame className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="text-xs font-mono font-bold text-[var(--text-primary)] block">
                {todayFocusMinutes}m Logged
              </span>
              <span className="text-[10px] text-[var(--text-muted)] font-mono">
                Focus Engine
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl glass-subtle flex items-center gap-3 border border-[var(--border-subtle)]">
            <div className="p-2 rounded-xl bg-purple-500/15 text-purple-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="text-xs font-mono font-bold text-[var(--text-primary)] block">
                {BORED_ACTIVITIES.length} Quests
              </span>
              <span className="text-[10px] text-[var(--text-muted)] font-mono">
                Boredom Catalog
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl glass-subtle flex items-center gap-3 border border-[var(--border-subtle)]">
            <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="text-xs font-mono font-bold text-[var(--text-primary)] block">
                100% Local
              </span>
              <span className="text-[10px] text-[var(--text-muted)] font-mono">
                Private OS
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Portals Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between gap-4 mb-6 px-1">
          <div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[var(--text-primary)]">
              {t("home.portalsHeading")}
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
              Select an environment to enter
            </p>
          </div>
          <Link
            href="/bored"
            onClick={() => gameAudio.playClick(soundEnabled)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl glass-subtle hover:bg-white/15 text-xs font-bold text-[var(--text-primary)] transition-all group border border-[var(--border-subtle)]"
          >
            <span>Enter Quests</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Portals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {APP_MODULES.map((module) => (
            <PortalCard
              key={module.id}
              id={module.id}
              route={module.route}
              titleKey={module.titleKey}
              descriptionKey={module.descriptionKey}
              iconName={module.icon}
              badge={module.badge}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
