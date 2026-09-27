"use client";

import React from "react";
import Link from "next/link";
import {
  Sparkles,
  Compass,
  Timer,
  Sliders,
  ArrowUpRight,
  Target,
  Globe,
  BookOpen,
  MapPin,
  LucideIcon,
} from "lucide-react";
import { useMnsApp } from "@/lib/i18n/context";
import { gameAudio } from "@/lib/sound";

const iconMap: Record<string, LucideIcon> = {
  Sparkles,
  Compass,
  Timer,
  Sliders,
  Target,
  Globe,
  BookOpen,
  MapPin,
};

interface PortalCardProps {
  id: string;
  route: string;
  titleKey: string;
  descriptionKey: string;
  iconName: string;
  badge?: string;
}

export function PortalCard({
  route,
  titleKey,
  descriptionKey,
  iconName,
  badge,
}: PortalCardProps) {
  const { t, preferences } = useMnsApp();
  const soundEnabled = preferences.soundFxEnabled ?? true;
  const Icon = iconMap[iconName] || Sparkles;

  return (
    <Link
      href={route}
      onClick={() => gameAudio.playClick(soundEnabled)}
      onMouseEnter={() => gameAudio.playHover(soundEnabled)}
      className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-3xl glass-base hover:glass-elevated transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 overflow-hidden border border-[var(--border-subtle)] hover:border-indigo-400/50 shadow-md"
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="p-3.5 rounded-2xl bg-white/10 text-[var(--text-primary)] shadow-inner group-hover:bg-indigo-500/20 group-hover:text-indigo-300 transition-colors">
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex items-center gap-2">
          {badge && (
            <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-white/10 text-[var(--text-secondary)] border border-[var(--border-subtle)]">
              {badge}
            </span>
          )}
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 group-hover:bg-white/20 transition-colors">
            <ArrowUpRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div>
        <h3 className="text-xl font-bold tracking-tight text-[var(--text-primary)] mb-2 group-hover:text-indigo-400 transition-colors">
          {t(titleKey)}
        </h3>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
          {t(descriptionKey)}
        </p>
      </div>

      {/* Futuristic bottom highlight */}
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </Link>
  );
}
