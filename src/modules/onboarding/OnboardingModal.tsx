"use client";

import React, { useState } from "react";
import { useMnsApp } from "@/lib/i18n/context";
import { SupportedLocale, ThemeMode } from "@/types";
import { Sparkles, ArrowRight, ShieldCheck, Sun, Moon, Laptop } from "lucide-react";

export function OnboardingModal() {
  const { completeOnboarding, t, locale: defaultLocale, theme: defaultTheme } = useMnsApp();

  const [name, setName] = useState("");
  const [selectedLocale, setSelectedLocale] = useState<SupportedLocale>(defaultLocale);
  const [selectedTheme, setSelectedTheme] = useState<ThemeMode>(defaultTheme);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError(t("onboarding.validationName"));
      return;
    }
    completeOnboarding(name, selectedLocale, selectedTheme);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-lg glass-elevated rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20">
        {/* Header Badge */}
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-xl bg-white/10 text-white">
            <Sparkles className="w-4 h-4 text-indigo-300" />
          </div>
          <span className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-mono">
            {t("common.appName")} Initialization
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--text-primary)] mb-2">
          {t("onboarding.welcome")}
        </h1>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
          {t("onboarding.subtitle")}
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Field */}
          <div>
            <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5 uppercase tracking-wider">
              {t("onboarding.nameLabel")}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError("");
              }}
              placeholder={t("onboarding.namePlaceholder")}
              autoFocus
              className="w-full px-4 py-3 rounded-2xl glass-base text-[var(--text-primary)] placeholder-[var(--text-muted)] text-base font-medium focus:outline-none focus:ring-2 focus:ring-white/40 transition-all"
            />
            {error && (
              <p className="mt-1.5 text-xs text-rose-400 font-medium">{error}</p>
            )}
          </div>

          {/* Preferred Language */}
          <div>
            <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5 uppercase tracking-wider">
              {t("onboarding.languageLabel")}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSelectedLocale("en")}
                className={`py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  selectedLocale === "en"
                    ? "bg-white text-black shadow-md font-bold"
                    : "glass-subtle text-[var(--text-secondary)] hover:text-white"
                }`}
              >
                <span>English</span>
                <span className="text-[10px] opacity-70">EN</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedLocale("hi")}
                className={`py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  selectedLocale === "hi"
                    ? "bg-white text-black shadow-md font-bold"
                    : "glass-subtle text-[var(--text-secondary)] hover:text-white"
                }`}
              >
                <span>हिन्दी</span>
                <span className="text-[10px] opacity-70">HI</span>
              </button>
            </div>
          </div>

          {/* Initial Theme */}
          <div>
            <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5 uppercase tracking-wider">
              {t("onboarding.themeLabel")}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "dark", label: t("common.dark"), icon: Moon },
                { id: "light", label: t("common.light"), icon: Sun },
                { id: "system", label: t("common.system"), icon: Laptop },
              ].map((item) => {
                const Icon = item.icon;
                const isSelected = selectedTheme === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedTheme(item.id as ThemeMode)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      isSelected
                        ? "bg-white text-black font-semibold shadow-sm"
                        : "glass-subtle text-[var(--text-secondary)] hover:text-white"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Privacy Note */}
          <div className="flex items-center gap-2 pt-1 text-[11px] text-[var(--text-muted)]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>100% Local-First. Your profile never leaves this browser.</span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full mt-2 py-3.5 px-5 rounded-2xl bg-gradient-to-r from-zinc-100 to-zinc-300 text-black font-semibold text-sm hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(255,255,255,0.15)] cursor-pointer"
          >
            <span>{t("onboarding.submit")}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
