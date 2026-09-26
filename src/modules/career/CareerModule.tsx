"use client";

import React, { useState, useEffect } from "react";
import { CAREER_IDENTITY, CAREER_PHASES } from "@/data/career/roadmap";
import { CareerPhase } from "@/types";
import { storageRepository } from "@/lib/storage";
import { useMnsApp } from "@/lib/i18n/context";
import { gameAudio } from "@/lib/sound";
import {
  Compass,
  CheckCircle2,
  Circle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Zap,
} from "lucide-react";

export function CareerModule() {
  const { t, preferences, awardXp } = useMnsApp();
  const [progressState, setProgressState] = useState<Record<string, boolean>>({});
  const [expandedPhases, setExpandedPhases] = useState<Record<string, boolean>>({});
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const soundEnabled = preferences.soundFxEnabled ?? true;

  useEffect(() => {
    const saved = storageRepository.getCareerProgress();
    const initial: Record<string, boolean> = { ...saved };
    CAREER_PHASES.forEach((phase) => {
      phase.items.forEach((item) => {
        if (!(item.id in initial)) {
          initial[item.id] = !!item.completed;
        }
      });
    });
    setProgressState(initial);

    const defaultExpanded: Record<string, boolean> = {};
    CAREER_PHASES.slice(0, 3).forEach((p) => {
      defaultExpanded[p.id] = true;
    });
    setExpandedPhases(defaultExpanded);
  }, []);

  const toggleItem = (itemId: string, itemTitle: string) => {
    const wasChecked = !!progressState[itemId];
    const willBeChecked = !wasChecked;

    storageRepository.toggleCareerItem(itemId);
    setProgressState((prev) => ({
      ...prev,
      [itemId]: willBeChecked,
    }));

    if (willBeChecked) {
      awardXp(50, `Cleared: ${itemTitle}`);
    } else {
      gameAudio.playClick(soundEnabled);
    }
  };

  const togglePhaseExpand = (phaseId: string) => {
    gameAudio.playClick(soundEnabled);
    setExpandedPhases((prev) => ({
      ...prev,
      [phaseId]: !prev[phaseId],
    }));
  };

  const expandAll = () => {
    gameAudio.playClick(soundEnabled);
    const all: Record<string, boolean> = {};
    CAREER_PHASES.forEach((p) => (all[p.id] = true));
    setExpandedPhases(all);
  };

  const collapseAll = () => {
    gameAudio.playClick(soundEnabled);
    setExpandedPhases({});
  };

  const allItems = CAREER_PHASES.flatMap((p) => p.items);
  const totalCount = allItems.length;
  const doneCount = allItems.filter((i) => progressState[i.id]).length;
  const percentComplete = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;

  const filteredPhases = CAREER_PHASES.filter((p) => {
    if (filterStatus === "all") return true;
    if (filterStatus === "active") return p.status === "active";
    if (filterStatus === "done") return p.status === "done";
    if (filterStatus === "todo") return p.status === "todo";
    return true;
  });

  return (
    <div className="w-full max-w-5xl mx-auto py-6 sm:py-10 px-4 sm:px-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-subtle mb-3 text-xs font-mono tracking-wider uppercase text-[var(--text-secondary)] border border-[var(--border-subtle)]">
          <Compass className="w-3.5 h-3.5 text-blue-400" />
          <span>{CAREER_IDENTITY.targetCountryPrimary} 2027 Master Campaign</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[var(--text-primary)] mb-2">
          {t("career.title")}
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl mx-auto">
          {t("career.subtitle")}
        </p>
      </div>

      {/* Career Identity Card */}
      <div className="glass-strong rounded-3xl p-6 sm:p-8 mb-8 border border-[var(--border-base)] shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Roles */}
          <div className="space-y-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] block mb-1">
                {t("career.primaryRole")}
              </span>
              <div className="inline-flex items-center gap-2 text-xl font-black text-[var(--text-primary)] bg-indigo-500/15 px-3.5 py-1.5 rounded-xl border border-indigo-400/30">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>{CAREER_IDENTITY.primaryRole}</span>
              </div>
            </div>

            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] block mb-1">
                {t("career.secondaryRoles")}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {CAREER_IDENTITY.secondaryRoles.map((role) => (
                  <span
                    key={role}
                    className="text-xs px-2.5 py-1 rounded-lg glass-subtle text-[var(--text-secondary)] font-medium"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] block mb-1">
                {t("career.backupRole")}
              </span>
              <span className="text-xs text-[var(--text-secondary)] font-semibold">
                {CAREER_IDENTITY.backupRole}
              </span>
            </div>
          </div>

          {/* Shipped Product Evidence */}
          <div className="lg:border-x lg:border-[var(--border-subtle)] lg:px-6 space-y-4">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] block mb-1">
              Live Product Proof (Kodix Labs)
            </span>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-2xl glass-subtle">
                <span className="text-lg sm:text-2xl font-black text-[var(--text-primary)] block">
                  {CAREER_IDENTITY.metrics.installs}
                </span>
                <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-mono">
                  {t("career.statsInstalls")}
                </span>
              </div>
              <div className="p-3 rounded-2xl glass-subtle">
                <span className="text-lg sm:text-2xl font-black text-[var(--text-primary)] block">
                  {CAREER_IDENTITY.metrics.users}
                </span>
                <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-mono">
                  {t("career.statsUsers")}
                </span>
              </div>
              <div className="p-3 rounded-2xl glass-subtle">
                <span className="text-lg sm:text-2xl font-black text-[var(--text-primary)] block">
                  {CAREER_IDENTITY.metrics.productsShipped}
                </span>
                <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-mono">
                  {t("career.statsShipped")}
                </span>
              </div>
              <div className="p-3 rounded-2xl glass-subtle">
                <span className="text-xs sm:text-sm font-bold text-[var(--text-primary)] block truncate">
                  2+ Yrs RN + MCA
                </span>
                <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-mono">
                  Credentials
                </span>
              </div>
            </div>
          </div>

          {/* Core Strengths & Advantage */}
          <div className="space-y-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] block mb-1">
                {t("career.coreStrengths")}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {CAREER_IDENTITY.coreStrengths.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-400/20 text-[var(--text-primary)] font-mono font-semibold"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] block mb-1">
                {t("career.specialAdvantage")}
              </span>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {CAREER_IDENTITY.specialAdvantage[0]}
              </p>
            </div>
          </div>
        </div>

        {/* Global Campaign Progress Bar */}
        <div className="mt-8 pt-6 border-t border-[var(--border-subtle)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
            <span className="text-xs font-mono text-[var(--text-secondary)]">
              {t("career.progressSummary", {
                done: doneCount,
                total: totalCount,
                pct: percentComplete,
              })}
            </span>
            <span className="text-xs font-mono font-bold text-[var(--text-primary)]">
              {percentComplete}% Campaign Cleared
            </span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transition-all duration-500 rounded-full"
              style={{ width: `${percentComplete}%` }}
            />
          </div>
        </div>
      </div>

      {/* Timeline Controls & Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        {/* Status Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {[
            { id: "all", label: "All Phases (15)" },
            { id: "active", label: "Active Execution" },
            { id: "done", label: "Completed" },
            { id: "todo", label: "Upcoming" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                gameAudio.playClick(soundEnabled);
                setFilterStatus(item.id);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filterStatus === item.id
                  ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-sm border border-indigo-400/40"
                  : "glass-subtle text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Expand / Collapse All */}
        <div className="flex items-center gap-2">
          <button
            onClick={expandAll}
            className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
          >
            {t("career.expandAll")}
          </button>
          <span className="text-[var(--text-muted)] text-xs">•</span>
          <button
            onClick={collapseAll}
            className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
          >
            {t("career.collapseAll")}
          </button>
        </div>
      </div>

      {/* Phases Accordion / Timeline */}
      <div className="space-y-4">
        {filteredPhases.map((phase: CareerPhase) => {
          const isExpanded = !!expandedPhases[phase.id];
          const phaseDone = phase.items.filter((i) => progressState[i.id]).length;
          const phaseTotal = phase.items.length;
          const isAllDone = phaseTotal > 0 && phaseDone === phaseTotal;

          return (
            <div
              key={phase.id}
              className="glass-base rounded-2xl border border-[var(--border-subtle)] hover:border-[var(--border-base)] overflow-hidden transition-all duration-200"
            >
              {/* Phase Header */}
              <button
                type="button"
                onClick={() => togglePhaseExpand(phase.id)}
                className="w-full px-5 sm:px-6 py-4 flex items-center justify-between gap-4 text-left hover:bg-white/5 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-mono font-bold ${
                      isAllDone
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : phase.status === "active"
                        ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                        : "bg-white/10 text-[var(--text-muted)] border border-[var(--border-subtle)]"
                    }`}
                  >
                    {phase.order}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)]">
                        {phase.title}
                      </h3>
                      {phase.meta?.badge && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-[var(--text-secondary)] font-semibold">
                          {phase.meta.badge}
                        </span>
                      )}
                    </div>
                    {phase.description && (
                      <p className="text-xs text-[var(--text-muted)] mt-0.5 line-clamp-1">
                        {phase.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <span className="text-xs font-mono font-bold text-[var(--text-muted)]">
                    {phaseDone}/{phaseTotal}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-[var(--text-muted)]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[var(--text-muted)]" />
                  )}
                </div>
              </button>

              {/* Items List */}
              {isExpanded && (
                <div className="px-5 sm:px-6 pb-5 pt-2 border-t border-[var(--border-subtle)] space-y-2.5">
                  {phase.items.map((item) => {
                    const isChecked = !!progressState[item.id];
                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleItem(item.id, item.title)}
                        className={`flex items-start justify-between gap-3 p-3 rounded-xl transition-all cursor-pointer ${
                          isChecked
                            ? "bg-emerald-950/20 border border-emerald-500/30 text-emerald-300"
                            : "glass-subtle border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-indigo-400/40"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <button
                            type="button"
                            className="mt-0.5 shrink-0 focus:outline-none"
                            aria-label={`Toggle ${item.title}`}
                          >
                            {isChecked ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            ) : (
                              <Circle className="w-4 h-4 text-[var(--text-muted)]" />
                            )}
                          </button>
                          <span
                            className={`text-xs sm:text-sm leading-relaxed ${
                              isChecked ? "line-through opacity-75" : "font-medium"
                            }`}
                          >
                            {item.title}
                          </span>
                        </div>

                        {/* XP Badge */}
                        <div className="shrink-0">
                          {isChecked ? (
                            <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                              CLEARED
                            </span>
                          ) : (
                            <span className="text-[10px] font-mono font-bold text-amber-400 flex items-center gap-0.5 bg-amber-500/10 px-2 py-0.5 rounded-md">
                              <Zap className="w-2.5 h-2.5" />
                              +50 XP
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
