"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMnsApp } from "@/lib/i18n/context";
import { gameAudio } from "@/lib/sound";
import {
  Globe,
  Sun,
  Moon,
  Laptop,
  Sparkles,
  Compass,
  Timer,
  Sliders,
  Home,
  Menu,
  X,
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const { locale, setLocale, theme, setTheme, t, isLoaded, preferences } = useMnsApp();

  const [timeString, setTimeString] = useState<string>("");
  const [dateString, setDateString] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const soundEnabled = preferences.soundFxEnabled ?? true;

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      try {
        const timeFmt = new Intl.DateTimeFormat(locale === "hi" ? "hi-IN" : "en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }).format(now);

        const dateFmt = new Intl.DateTimeFormat(locale === "hi" ? "hi-IN" : "en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        }).format(now);

        setTimeString(timeFmt);
        setDateString(dateFmt);
      } catch {
        setTimeString(now.toLocaleTimeString());
        setDateString(now.toLocaleDateString());
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [locale]);

  const navItems = [
    { href: "/", label: t("common.appName"), icon: Home },
    { href: "/bored", label: t("home.boredTitle"), icon: Sparkles },
    { href: "/career", label: t("home.careerTitle"), icon: Compass },
    { href: "/focus", label: t("home.focusTitle"), icon: Timer },
    { href: "/settings", label: t("home.settingsTitle"), icon: Sliders },
  ];

  const cycleTheme = () => {
    gameAudio.playClick(soundEnabled);
    if (theme === "dark") setTheme("light");
    else if (theme === "light") setTheme("system");
    else setTheme("dark");
  };

  const toggleLanguage = () => {
    gameAudio.playClick(soundEnabled);
    setLocale(locale === "en" ? "hi" : "en");
  };

  return (
    <header className="sticky top-0 z-40 w-full px-4 sm:px-8 py-2.5 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 glass-base rounded-2xl px-4 sm:px-6 py-2.5 border border-[var(--border-base)]">
        {/* Brand */}
        <Link
          href="/"
          onClick={() => gameAudio.playClick(soundEnabled)}
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-lg p-1"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-zinc-700 via-zinc-400 to-zinc-100 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.2)] group-hover:scale-105 transition-transform duration-200">
            <span className="font-black text-black text-sm tracking-tighter">MW</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold tracking-tight text-sm text-[var(--text-primary)]">
              MnsWorld
            </span>
            <span className="text-[10px] text-[var(--text-muted)] tracking-wider uppercase font-mono">
              Web OS
            </span>
          </div>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => gameAudio.playClick(soundEnabled)}
                onMouseEnter={() => gameAudio.playHover(soundEnabled)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                  isActive
                    ? "bg-white/20 text-[var(--text-primary)] shadow-sm border border-[var(--border-base)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/10"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[var(--text-primary)]" : "text-[var(--text-muted)]"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Section: Live Telemetry, Language, Theme */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          {/* Live Clock & Date */}
          {isLoaded && timeString && (
            <div className="hidden lg:flex flex-col items-end border-r border-[var(--border-subtle)] pr-4 select-none">
              <span className="text-xs font-mono font-bold tracking-tight text-[var(--text-primary)]">
                {timeString}
              </span>
              <span className="text-[10px] font-sans text-[var(--text-muted)]">
                {dateString}
              </span>
            </div>
          )}

          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            title={locale === "en" ? "Switch to Hindi (हिन्दी)" : "Switch to English"}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl glass-subtle hover:bg-white/15 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
            aria-label="Toggle language"
          >
            <Globe className="w-3.5 h-3.5" />
            <span className="uppercase text-[11px] font-mono font-bold">
              {locale}
            </span>
          </button>

          {/* Theme Switcher */}
          <button
            onClick={cycleTheme}
            title={`Current theme: ${theme}. Click to switch.`}
            className="flex items-center justify-center w-8 h-8 rounded-xl glass-subtle hover:bg-white/15 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
            aria-label="Cycle theme"
          >
            {theme === "dark" && <Moon className="w-4 h-4 text-indigo-300" />}
            {theme === "light" && <Sun className="w-4 h-4 text-amber-500" />}
            {theme === "system" && <Laptop className="w-4 h-4 text-blue-400" />}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-8 h-8 rounded-xl glass-subtle text-[var(--text-primary)] hover:bg-white/15"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 p-3 rounded-2xl glass-elevated flex flex-col gap-1.5 animate-card-pop border border-[var(--border-base)]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => {
                  gameAudio.playClick(soundEnabled);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-white/20 text-[var(--text-primary)]"
                    : "text-[var(--text-secondary)] hover:bg-white/10"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
          {timeString && (
            <div className="mt-2 pt-2 border-t border-[var(--border-subtle)] px-4 flex items-center justify-between text-xs text-[var(--text-muted)] font-mono">
              <span>{dateString}</span>
              <span>{timeString}</span>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
