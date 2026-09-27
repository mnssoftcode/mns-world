"use client";

import React, { useState, useEffect } from "react";
import { useMnsApp } from "@/lib/i18n/context";
import { gameAudio } from "@/lib/sound";
import { storageRepository } from "@/lib/storage";
import {
  STUDY_CURRICULUM,
  LIVING_JOURNEY_PLAN,
  JAIPUR_ROUTINE,
  JAIPUR_RULES,
  JaipurContacts,
  JaipurCustomTask,
  JaipurTask,
} from "@/data/jaipur/mission";
import {
  MapPin,
  CheckCircle2,
  Circle,
  Plus,
  Trash2,
  Flame,
  Target,
  Sparkles,
  Download,
  RotateCcw,
  Clock,
  Compass,
  Utensils,
  Dumbbell,
  Wallet,
  Home,
  ChevronDown,
  ChevronUp,
  Phone,
  Bed,
  Droplets,
  Wifi,
  Stethoscope,
  BookOpen,
  Filter,
} from "lucide-react";

type ModuleTab = "m1" | "m2" | "m3" | "living" | "routine";
type LivingFilter = "all" | "setup" | "food" | "health" | "budget" | "jaipur" | "weekly" | "custom";

export function JaipurMissionModule() {
  const { preferences, awardXp } = useMnsApp();
  const soundEnabled = preferences.soundFxEnabled ?? true;

  const [activeTab, setActiveTab] = useState<ModuleTab>("living");
  const [activeLivingFilter, setActiveLivingFilter] = useState<LivingFilter>("all");
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const [customTasks, setCustomTasks] = useState<JaipurCustomTask[]>([]);
  const [contacts, setContacts] = useState<JaipurContacts>({
    landlord: "",
    water: "",
    chemist: "",
    gym: "",
    wifi: "",
    rent: "",
  });
  const [collapsedWeeks, setCollapsedWeeks] = useState<Record<string, boolean>>({});
  const [newCustomText, setNewCustomText] = useState("");
  const [newCustomCategory, setNewCustomCategory] = useState<"setup" | "food" | "health" | "budget" | "jaipur" | "weekly" | "custom">("setup");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Sync state on mount and listen to storage events
  useEffect(() => {
    const syncState = () => {
      setProgress(storageRepository.getJaipurProgress());
      setCustomTasks(storageRepository.getJaipurCustomTasks());
      setContacts(storageRepository.getJaipurContacts());
    };

    syncState();
    window.addEventListener("mnsworld:jaipur:updated", syncState);
    return () => window.removeEventListener("mnsworld:jaipur:updated", syncState);
  }, []);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg((prev) => (prev === msg ? null : prev));
    }, 2000);
  };

  // Toggle standard checklist task
  const handleToggleTask = (taskId: string) => {
    gameAudio.playClick(soundEnabled);
    const updated = storageRepository.toggleJaipurTask(taskId);
    setProgress(updated);
    if (updated[taskId]) {
      awardXp(15, "Jaipur Task Cleared");
      showToast("Task completed! 🎉 (+15 XP)");
    } else {
      showToast("Task marked incomplete");
    }
  };

  // Toggle custom living task
  const handleToggleCustomTask = (taskId: string) => {
    gameAudio.playClick(soundEnabled);
    const updated = storageRepository.toggleJaipurCustomTask(taskId);
    setCustomTasks(updated);
    const item = updated.find((t) => t.id === taskId);
    if (item?.done) {
      awardXp(15, "Custom Task Cleared");
      showToast("Custom task cleared! ⭐ (+15 XP)");
    }
  };

  // Add custom living task
  const handleAddCustomTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomText.trim()) return;
    gameAudio.playClick(soundEnabled);
    const updated = storageRepository.addJaipurCustomTask(newCustomText.trim(), newCustomCategory);
    setCustomTasks(updated);
    setNewCustomText("");
    awardXp(10, "Task Created");
    showToast("Added personal task 🎯");
  };

  // Delete custom living task
  const handleDeleteCustomTask = (taskId: string) => {
    gameAudio.playClick(soundEnabled);
    const updated = storageRepository.deleteJaipurCustomTask(taskId);
    setCustomTasks(updated);
    showToast("Task removed");
  };

  // Contacts handler
  const handleContactChange = (field: keyof JaipurContacts, val: string) => {
    const updated = storageRepository.saveJaipurContacts({ [field]: val });
    setContacts(updated);
  };

  // Toggle week collapse
  const toggleWeekCollapse = (weekKey: string) => {
    setCollapsedWeeks((prev) => ({ ...prev, [weekKey]: !prev[weekKey] }));
  };

  // Reset progress
  const handleResetProgress = () => {
    if (window.confirm("Reset all 90-day progress? Your contacts will be preserved, but all completed checks will be cleared.")) {
      storageRepository.resetJaipurProgress();
      showToast("Progress has been reset");
    }
  };

  // Export JSON backup
  const handleExportData = () => {
    const dataToExport = {
      progress: storageRepository.getJaipurProgress(),
      customTasks: storageRepository.getJaipurCustomTasks(),
      contacts: storageRepository.getJaipurContacts(),
      exportedAt: new Date().toISOString(),
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dataToExport, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `jaipur_90day_mission_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("Data backup downloaded 📁");
  };

  // Metrics calculations
  const allCurriculumTasks: JaipurTask[] = STUDY_CURRICULUM.flatMap((m) => m.weeks.flatMap((w) => w.tasks));
  const curriculumTotal = allCurriculumTasks.length;
  const curriculumDone = allCurriculumTasks.filter((t) => progress[t.id]).length;
  const curriculumPct = curriculumTotal > 0 ? Math.round((curriculumDone / curriculumTotal) * 100) : 0;

  const allLivingStandardTasks: JaipurTask[] = LIVING_JOURNEY_PLAN.weeks.flatMap((w) => w.tasks);
  const livingTotal = allLivingStandardTasks.length + customTasks.length;
  const livingStandardDone = allLivingStandardTasks.filter((t) => progress[t.id]).length;
  const livingCustomDone = customTasks.filter((t) => t.done).length;
  const livingDone = livingStandardDone + livingCustomDone;
  const livingPct = livingTotal > 0 ? Math.round((livingDone / livingTotal) * 100) : 0;

  const overallTotal = curriculumTotal + livingTotal;
  const overallDone = curriculumDone + livingDone;
  const overallPct = overallTotal > 0 ? Math.round((overallDone / overallTotal) * 100) : 0;

  // Tag badge helper
  const renderTagBadge = (tag: string) => {
    switch (tag) {
      case "setup":
        return <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-sky-500/15 text-sky-400 border border-sky-500/25">Setup</span>;
      case "food":
        return <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">Cooking/Food</span>;
      case "health":
        return <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-orange-500/15 text-orange-400 border border-orange-500/25">Gym/Health</span>;
      case "budget":
        return <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-yellow-500/15 text-yellow-400 border border-yellow-500/25">Budget</span>;
      case "jaipur":
        return <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-pink-500/15 text-pink-400 border border-pink-500/25">Jaipur Life</span>;
      case "weekly":
        return <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-purple-500/15 text-purple-400 border border-purple-500/25">Weekly Reset</span>;
      case "tech":
        return <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-indigo-500/15 text-indigo-400 border border-indigo-500/25">AI/ML</span>;
      case "ielts":
        return <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-cyan-500/15 text-cyan-400 border border-cyan-500/25">IELTS</span>;
      case "interview":
        return <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-400 border border-amber-500/25">Interview</span>;
      case "career":
        return <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-fuchsia-500/15 text-fuchsia-400 border border-fuchsia-500/25">Career</span>;
      case "living":
        return <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-teal-500/15 text-teal-400 border border-teal-500/25">Living</span>;
      default:
        return <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-zinc-500/15 text-zinc-300 border border-zinc-500/25">{tag}</span>;
    }
  };

  const currentModule = activeTab === "living" ? LIVING_JOURNEY_PLAN : STUDY_CURRICULUM.find((m) => m.id === activeTab);

  return (
    <div className="w-full max-w-6xl mx-auto py-6 sm:py-10 px-4 sm:px-6">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-2xl bg-zinc-900/90 text-white font-medium text-xs shadow-2xl border border-zinc-700/80 backdrop-blur-md animate-fade-in flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl glass-base border border-[var(--border-subtle)] flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-mono font-bold tracking-wider uppercase mb-3 w-fit">
            <MapPin className="w-3.5 h-3.5 text-indigo-400" />
            <span>Jaipur • 90-Day Mission</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse ml-1" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[var(--text-primary)] mb-3">
            Build the next version of you.
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-2xl">
            IELTS + AI/ML engineering + interview readiness + a stronger body + independent living in Jaipur.
            Maintain your daily routine, master your cooking and life systems, check off the work, and let 90 days compound into your overseas career.
          </p>
        </div>

        {/* Circular Progress & Stat Card */}
        <div className="p-6 rounded-3xl glass-base border border-[var(--border-subtle)] flex flex-col items-center justify-center text-center">
          {/* Circular Progress Ring */}
          <div className="relative w-32 h-32 mb-4 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                className="stroke-zinc-800"
                strokeWidth="8"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                className="stroke-indigo-500 transition-all duration-500 ease-out"
                strokeWidth="8"
                strokeDasharray={251.2}
                strokeDashoffset={251.2 - (251.2 * overallPct) / 100}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-black text-[var(--text-primary)]">{overallPct}%</span>
              <span className="text-[10px] text-[var(--text-muted)] font-mono uppercase tracking-wider">Mission Done</span>
            </div>
          </div>

          <div className="text-xs font-medium text-[var(--text-secondary)] mb-4">
            <strong className="text-[var(--text-primary)] font-bold">{overallDone}</strong> of {overallTotal} total tasks completed
          </div>

          {/* Sub stats row */}
          <div className="grid grid-cols-2 gap-2.5 w-full">
            <button
              onClick={() => {
                gameAudio.playClick(soundEnabled);
                setActiveTab("m1");
              }}
              className="p-2.5 rounded-2xl glass-subtle hover:bg-white/10 transition-colors border border-[var(--border-subtle)] text-left cursor-pointer"
            >
              <div className="text-[10px] text-[var(--text-muted)] font-semibold flex items-center gap-1 mb-0.5">
                <BookOpen className="w-3 h-3 text-indigo-400" />
                <span>Curriculum</span>
              </div>
              <div className="text-xs font-bold text-[var(--text-primary)]">
                {curriculumDone}/{curriculumTotal} ({curriculumPct}%)
              </div>
            </button>

            <button
              onClick={() => {
                gameAudio.playClick(soundEnabled);
                setActiveTab("living");
              }}
              className="p-2.5 rounded-2xl glass-subtle hover:bg-white/10 transition-colors border border-[var(--border-subtle)] text-left cursor-pointer"
            >
              <div className="text-[10px] text-[var(--text-muted)] font-semibold flex items-center gap-1 mb-0.5">
                <Home className="w-3 h-3 text-emerald-400" />
                <span>Living & Prep</span>
              </div>
              <div className="text-xs font-bold text-[var(--text-primary)]">
                {livingDone}/{livingTotal} ({livingPct}%)
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-2 border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
          {STUDY_CURRICULUM.map((mod, idx) => {
            const allModTasks = mod.weeks.flatMap((w) => w.tasks);
            const modDone = allModTasks.filter((t) => progress[t.id]).length;
            const isActive = activeTab === mod.id;
            return (
              <button
                key={mod.id}
                onClick={() => {
                  gameAudio.playClick(soundEnabled);
                  setActiveTab(mod.id as ModuleTab);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "glass-subtle text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/10"
                }`}
              >
                <span>Month {idx + 1}</span>
                <span className="text-[10px] opacity-75 font-mono">({modDone}/{allModTasks.length})</span>
              </button>
            );
          })}

          {/* Living & Preparation Tab */}
          <button
            onClick={() => {
              gameAudio.playClick(soundEnabled);
              setActiveTab("living");
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer border ${
              activeTab === "living"
                ? "bg-gradient-to-r from-indigo-600 to-emerald-600 text-white shadow-md shadow-emerald-500/20 border-emerald-400/50"
                : "glass-subtle text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/10 border-emerald-500/30"
            }`}
          >
            <Home className="w-3.5 h-3.5 text-emerald-400" />
            <span>3-Month Living & Prep</span>
            <span className="text-[10px] opacity-80 font-mono">({livingDone}/{livingTotal})</span>
          </button>

          {/* Routine & Rules Tab */}
          <button
            onClick={() => {
              gameAudio.playClick(soundEnabled);
              setActiveTab("routine");
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === "routine"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "glass-subtle text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/10"
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>Daily Routine & Rules</span>
          </button>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportData}
            title="Download JSON backup of your progress"
            className="px-3 py-2 rounded-xl glass-subtle hover:bg-white/15 text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export</span>
          </button>
          <button
            onClick={handleResetProgress}
            title="Reset checks"
            className="px-3 py-2 rounded-xl glass-subtle hover:bg-rose-500/20 text-rose-400 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-rose-500/20"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* TAB: ROUTINE & 90-DAY RULES */}
      {activeTab === "routine" && (
        <div className="space-y-6 animate-fade-in">
          {/* Daily Schedule Card */}
          <div className="p-6 sm:p-8 rounded-3xl glass-base border border-[var(--border-subtle)]">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-bold text-[var(--text-primary)] flex items-center gap-2">
                  <Clock className="w-5 h-5 text-indigo-400" />
                  <span>The Unbreakable 90-Day Daily Structure</span>
                </h2>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                  14h Productive & Independent Living • 7h Sleep • 3h Enjoyment. Keeps your mind and energy stable.
                </p>
              </div>
              <span className="hidden sm:inline-block px-3 py-1 rounded-full text-xs font-mono font-bold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                16 Fixed Time Blocks
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {JAIPUR_ROUTINE.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl glass-subtle border border-[var(--border-subtle)] hover:border-zinc-700/60 transition-colors flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="px-2 py-0.5 rounded-md text-[9px] font-mono font-bold uppercase tracking-wider bg-white/10 text-zinc-300 shrink-0">
                      {item.category}
                    </span>
                    <span className="text-xs font-bold text-[var(--text-primary)] whitespace-nowrap">
                      {item.time}
                    </span>
                  </div>
                  <div className="text-right text-xs text-[var(--text-secondary)] truncate">
                    <span>{item.task}</span>
                    <span className="text-[10px] text-indigo-400 font-mono ml-1.5 shrink-0">({item.duration})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 90-Day Rules Card */}
          <div className="p-6 sm:p-8 rounded-3xl glass-base border border-[var(--border-subtle)]">
            <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2 mb-4">
              <Flame className="w-5 h-5 text-amber-400" />
              <span>90-Day Mindset & Principles</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {JAIPUR_RULES.map((rule, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl glass-subtle border border-[var(--border-subtle)]">
                  <div className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    {rule}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB: MODULE WEEKS VIEW (Study Months OR Living Journey) */}
      {activeTab !== "routine" && currentModule && (
        <div className="space-y-6 animate-fade-in">
          {/* Header Info Banner */}
          <div className="p-6 rounded-3xl glass-base border border-[var(--border-subtle)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] mb-1">
                {currentModule.title}
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                {currentModule.subtitle}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                {activeTab === "living" ? `${livingDone}/${livingTotal} (${livingPct}%)` : `${curriculumDone}/${curriculumTotal}`}
              </span>
            </div>
          </div>

          {/* Quick Filter Bar for Living Module */}
          {activeTab === "living" && (
            <div className="flex flex-wrap items-center gap-2 py-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--text-muted)] mr-1">
                <Filter className="w-3.5 h-3.5" />
                <span>Filter:</span>
              </div>
              {(
                [
                  { id: "all", label: "All Items" },
                  { id: "setup", label: "Setup & Relocation" },
                  { id: "food", label: "Cooking & Food" },
                  { id: "health", label: "Gym & Health" },
                  { id: "budget", label: "Budget & Bills" },
                  { id: "jaipur", label: "Jaipur Life" },
                  { id: "weekly", label: "Weekly Reset" },
                  { id: "custom", label: "Custom Tasks" },
                ] as const
              ).map((f) => (
                <button
                  key={f.id}
                  onClick={() => {
                    gameAudio.playClick(soundEnabled);
                    setActiveLivingFilter(f.id);
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                    activeLivingFilter === f.id
                      ? "bg-indigo-600 text-white"
                      : "glass-subtle text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/10"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          )}

          {/* Weeks / Phases Cards */}
          <div className="space-y-4">
            {currentModule.weeks.map((week, wIdx) => {
              // Filter visible tasks
              const visibleTasks = week.tasks.filter((t) => {
                if (activeTab !== "living") return true;
                if (activeLivingFilter === "all") return true;
                return t.tag === activeLivingFilter;
              });

              if (activeTab === "living" && activeLivingFilter !== "all" && visibleTasks.length === 0) {
                return null;
              }

              const weekKey = `${currentModule.id}-${week.id}`;
              const isCollapsed = !!collapsedWeeks[weekKey];
              const weekTotal = week.tasks.length;
              const weekDone = week.tasks.filter((t) => progress[t.id]).length;
              const isAllDone = weekTotal > 0 && weekDone === weekTotal;

              return (
                <div
                  key={week.id}
                  className="rounded-3xl glass-base border border-[var(--border-subtle)] overflow-hidden transition-all duration-200"
                >
                  {/* Week Accordion Header */}
                  <div
                    onClick={() => toggleWeekCollapse(weekKey)}
                    className="p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer hover:bg-white/5 transition-colors select-none"
                  >
                    <div>
                      <h3 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
                        <span>{week.title}</span>
                        {isAllDone && <span className="text-xs text-emerald-400">✅ Complete</span>}
                      </h3>
                      <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                        {week.subtitle}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold ${
                          isAllDone
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : "bg-white/10 text-[var(--text-secondary)]"
                        }`}
                      >
                        {weekDone}/{weekTotal}
                      </span>
                      {isCollapsed ? (
                        <ChevronDown className="w-4 h-4 text-[var(--text-muted)]" />
                      ) : (
                        <ChevronUp className="w-4 h-4 text-[var(--text-muted)]" />
                      )}
                    </div>
                  </div>

                  {/* Week Tasks Body */}
                  {!isCollapsed && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 space-y-2.5 border-t border-[var(--border-subtle)]">
                      {visibleTasks.map((task) => {
                        const isDone = !!progress[task.id];
                        return (
                          <div
                            key={task.id}
                            onClick={() => handleToggleTask(task.id)}
                            className={`flex items-start gap-3 p-3 rounded-2xl transition-colors cursor-pointer border ${
                              isDone
                                ? "bg-white/5 border-emerald-500/20 text-[var(--text-muted)]"
                                : "glass-subtle border-[var(--border-subtle)] hover:border-indigo-400/40 text-[var(--text-primary)]"
                            }`}
                          >
                            <button
                              type="button"
                              className="mt-0.5 shrink-0 focus:outline-none cursor-pointer"
                              aria-label={isDone ? "Uncheck task" : "Check task"}
                            >
                              {isDone ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                              ) : (
                                <Circle className="w-4 h-4 text-zinc-500 hover:text-indigo-400 transition-colors" />
                              )}
                            </button>
                            <div className="flex-1 text-xs sm:text-sm leading-relaxed">
                              <span className="mr-2">{renderTagBadge(task.tag)}</span>
                              <span className={isDone ? "line-through text-[var(--text-muted)]" : ""}>
                                {task.text}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Custom Tasks Section (Living Module only) */}
            {activeTab === "living" && (activeLivingFilter === "all" || activeLivingFilter === "custom") && (
              <div className="rounded-3xl glass-base border border-[var(--border-subtle)] overflow-hidden">
                <div className="p-5 sm:p-6 flex items-center justify-between gap-4 border-b border-[var(--border-subtle)]">
                  <div>
                    <h3 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-indigo-400" />
                      <span>Personal Custom Living Tasks</span>
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                      Checklist tasks added by you for your specific Jaipur daily needs
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-white/10 text-[var(--text-secondary)]">
                    {customTasks.filter((t) => t.done).length}/{customTasks.length}
                  </span>
                </div>

                <div className="p-5 sm:p-6 space-y-3">
                  {customTasks.length === 0 ? (
                    <div className="py-4 text-center text-xs text-[var(--text-muted)]">
                      No custom tasks added yet. Use the form below to add personal Jaipur errands!
                    </div>
                  ) : (
                    customTasks.map((ct) => (
                      <div
                        key={ct.id}
                        className={`flex items-start justify-between gap-3 p-3 rounded-2xl transition-colors border ${
                          ct.done
                            ? "bg-white/5 border-emerald-500/20 text-[var(--text-muted)]"
                            : "glass-subtle border-[var(--border-subtle)] hover:border-indigo-400/40 text-[var(--text-primary)]"
                        }`}
                      >
                        <div
                          onClick={() => handleToggleCustomTask(ct.id)}
                          className="flex items-start gap-3 flex-1 cursor-pointer"
                        >
                          <button
                            type="button"
                            className="mt-0.5 shrink-0 focus:outline-none"
                          >
                            {ct.done ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            ) : (
                              <Circle className="w-4 h-4 text-zinc-500 hover:text-indigo-400 transition-colors" />
                            )}
                          </button>
                          <div className="text-xs sm:text-sm leading-relaxed">
                            <span className="mr-2">{renderTagBadge(ct.category)}</span>
                            <span className={ct.done ? "line-through text-[var(--text-muted)]" : ""}>
                              {ct.text}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleDeleteCustomTask(ct.id)}
                          title="Delete task"
                          className="p-1 rounded-lg text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer shrink-0"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))
                  )}

                  {/* Add Custom Task Form */}
                  <form onSubmit={handleAddCustomTask} className="flex flex-wrap sm:flex-nowrap gap-2.5 pt-3">
                    <input
                      type="text"
                      value={newCustomText}
                      onChange={(e) => setNewCustomText(e.target.value)}
                      placeholder="Add personal task (e.g. Buy induction, check RO filter, visit Albert Hall)..."
                      className="flex-1 px-4 py-2.5 rounded-2xl glass-subtle border border-[var(--border-subtle)] text-xs sm:text-sm text-[var(--text-primary)] focus:outline-none focus:border-indigo-400"
                    />
                    <select
                      value={newCustomCategory}
                      onChange={(e) => setNewCustomCategory(e.target.value as any)}
                      className="px-3 py-2.5 rounded-2xl glass-subtle border border-[var(--border-subtle)] text-xs text-[var(--text-primary)] bg-zinc-900 focus:outline-none"
                    >
                      <option value="setup">Setup</option>
                      <option value="food">Cooking</option>
                      <option value="health">Gym</option>
                      <option value="budget">Budget</option>
                      <option value="jaipur">Jaipur</option>
                      <option value="weekly">Weekly</option>
                    </select>
                    <button
                      type="submit"
                      className="px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>

          {/* Jaipur Quick Contacts Card (Living Module) */}
          {activeTab === "living" && (
            <div className="p-6 sm:p-8 rounded-3xl glass-base border border-[var(--border-subtle)] mt-8">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-indigo-400" />
                <h3 className="text-lg font-bold text-[var(--text-primary)]">
                  Jaipur Local Contacts & Room Quick Reference
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] mb-6">
                Never lose your crucial local numbers. Everything you type is automatically saved to your private local storage.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl glass-subtle border border-[var(--border-subtle)]">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">
                    <Phone className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Landlord / Caretaker</span>
                  </div>
                  <input
                    type="text"
                    value={contacts.landlord}
                    onChange={(e) => handleContactChange("landlord", e.target.value)}
                    placeholder="Name & Contact number"
                    className="w-full bg-transparent border-b border-zinc-700/70 focus:border-indigo-400 text-xs sm:text-sm text-[var(--text-primary)] pb-1 focus:outline-none"
                  />
                </div>

                <div className="p-4 rounded-2xl glass-subtle border border-[var(--border-subtle)]">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">
                    <Droplets className="w-3.5 h-3.5 text-sky-400" />
                    <span>20L RO Water Jar Delivery</span>
                  </div>
                  <input
                    type="text"
                    value={contacts.water}
                    onChange={(e) => handleContactChange("water", e.target.value)}
                    placeholder="Delivery person & phone"
                    className="w-full bg-transparent border-b border-zinc-700/70 focus:border-sky-400 text-xs sm:text-sm text-[var(--text-primary)] pb-1 focus:outline-none"
                  />
                </div>

                <div className="p-4 rounded-2xl glass-subtle border border-[var(--border-subtle)]">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">
                    <Stethoscope className="w-3.5 h-3.5 text-rose-400" />
                    <span>24/7 Chemist & Doctor</span>
                  </div>
                  <input
                    type="text"
                    value={contacts.chemist}
                    onChange={(e) => handleContactChange("chemist", e.target.value)}
                    placeholder="Pharmacy name & address"
                    className="w-full bg-transparent border-b border-zinc-700/70 focus:border-rose-400 text-xs sm:text-sm text-[var(--text-primary)] pb-1 focus:outline-none"
                  />
                </div>

                <div className="p-4 rounded-2xl glass-subtle border border-[var(--border-subtle)]">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">
                    <Dumbbell className="w-3.5 h-3.5 text-orange-400" />
                    <span>Gym Front Desk / Trainer</span>
                  </div>
                  <input
                    type="text"
                    value={contacts.gym}
                    onChange={(e) => handleContactChange("gym", e.target.value)}
                    placeholder="Gym name & coach phone"
                    className="w-full bg-transparent border-b border-zinc-700/70 focus:border-orange-400 text-xs sm:text-sm text-[var(--text-primary)] pb-1 focus:outline-none"
                  />
                </div>

                <div className="p-4 rounded-2xl glass-subtle border border-[var(--border-subtle)]">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">
                    <Wifi className="w-3.5 h-3.5 text-purple-400" />
                    <span>Broadband / Wi-Fi Provider</span>
                  </div>
                  <input
                    type="text"
                    value={contacts.wifi}
                    onChange={(e) => handleContactChange("wifi", e.target.value)}
                    placeholder="ISP account ID & hotline"
                    className="w-full bg-transparent border-b border-zinc-700/70 focus:border-purple-400 text-xs sm:text-sm text-[var(--text-primary)] pb-1 focus:outline-none"
                  />
                </div>

                <div className="p-4 rounded-2xl glass-subtle border border-[var(--border-subtle)]">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">
                    <Wallet className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Monthly Rent & Due Date</span>
                  </div>
                  <input
                    type="text"
                    value={contacts.rent}
                    onChange={(e) => handleContactChange("rent", e.target.value)}
                    placeholder="₹ Amount & Due date"
                    className="w-full bg-transparent border-b border-zinc-700/70 focus:border-emerald-400 text-xs sm:text-sm text-[var(--text-primary)] pb-1 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
