"use client";

import React, { useState, useEffect } from "react";
import { LifeGoal, LifeHabit } from "@/types";
import { storageRepository } from "@/lib/storage";
import { useMnsApp } from "@/lib/i18n/context";
import { gameAudio } from "@/lib/sound";
import {
  Target,
  CheckCircle2,
  Circle,
  Plus,
  Trash2,
  Flame,
  ArrowRight,
  TrendingUp,
  Heart,
  Sparkles,
} from "lucide-react";

type GoalsTab = "goals" | "habits" | "personal" | "direction";

export function LifeGoalsModule() {
  const { t, preferences, awardXp } = useMnsApp();
  const [activeTab, setActiveTab] = useState<GoalsTab>("goals");
  const [goals, setGoals] = useState<LifeGoal[]>(() => storageRepository.getLifeGoals());
  const [habits, setHabits] = useState<LifeHabit[]>(() => storageRepository.getHabits());

  // Modal / Inputs
  const [showAddGoalModal, setShowAddGoalModal] = useState(false);
  const [newGoalTitle, setNewGoalTitle] = useState("");
  const [newGoalDescription, setNewGoalDescription] = useState("");
  const [newGoalTimeframe, setNewGoalTimeframe] = useState<"long-term" | "yearly" | "current">("yearly");
  const [newGoalCategory, setNewGoalCategory] = useState<"career" | "wealth" | "health" | "personal" | "adventure">("career");

  const [newHabitTitle, setNewHabitTitle] = useState("");
  const [newHabitFrequency, setNewHabitFrequency] = useState<"daily" | "weekly">("daily");

  const soundEnabled = preferences.soundFxEnabled ?? true;

  useEffect(() => {
    const handleGoalsUpdate = () => {
      setGoals(storageRepository.getLifeGoals());
    };
    const handleHabitsUpdate = () => {
      setHabits(storageRepository.getHabits());
    };

    window.addEventListener("mnsworld:goals:updated", handleGoalsUpdate);
    window.addEventListener("mnsworld:habits:updated", handleHabitsUpdate);
    return () => {
      window.removeEventListener("mnsworld:goals:updated", handleGoalsUpdate);
      window.removeEventListener("mnsworld:habits:updated", handleHabitsUpdate);
    };
  }, []);

  const handleToggleMilestone = (goalId: string, milestoneId: string) => {
    gameAudio.playClick(soundEnabled);
    const updated = storageRepository.toggleMilestone(goalId, milestoneId);
    setGoals(updated);
    awardXp(30, "Milestone Cleared");
  };

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoalTitle.trim()) return;

    const newGoal: LifeGoal = {
      id: "goal-" + Date.now(),
      title: newGoalTitle.trim(),
      description: newGoalDescription.trim(),
      timeframe: newGoalTimeframe,
      category: newGoalCategory,
      progress: 0,
      milestones: [
        { id: "m1", title: "Initial step defined", completed: false },
        { id: "m2", title: "Execution in progress", completed: false },
        { id: "m3", title: "Final target reached", completed: false },
      ],
    };

    const updated = storageRepository.saveGoal(newGoal);
    setGoals(updated);
    setNewGoalTitle("");
    setNewGoalDescription("");
    setShowAddGoalModal(false);
    awardXp(20, "Life Goal Created");
  };

  const handleDeleteGoal = (goalId: string) => {
    gameAudio.playClick(soundEnabled);
    const updated = storageRepository.deleteGoal(goalId);
    setGoals(updated);
  };

  const handleToggleHabit = (habitId: string) => {
    gameAudio.playClick(soundEnabled);
    const updated = storageRepository.toggleHabit(habitId);
    setHabits(updated);
    awardXp(15, "Habit Completed Today");
  };

  const handleAddHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHabitTitle.trim()) return;
    const updated = storageRepository.addHabit(newHabitTitle.trim(), newHabitFrequency);
    setHabits(updated);
    setNewHabitTitle("");
    awardXp(15, "Habit Initiated");
  };

  const handleDeleteHabit = (habitId: string) => {
    gameAudio.playClick(soundEnabled);
    const updated = storageRepository.deleteHabit(habitId);
    setHabits(updated);
  };

  const todayStr = new Date().toISOString().split("T")[0];

  const tabs: { id: GoalsTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "goals", label: "Goals & Milestones", icon: Target },
    { id: "habits", label: "Daily Habits", icon: Flame },
    { id: "personal", label: "Personal Life", icon: Heart },
    { id: "direction", label: "Life Direction", icon: TrendingUp },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto py-6 sm:py-10 px-4 sm:px-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-subtle mb-3 text-xs font-mono tracking-wider uppercase text-[var(--text-secondary)] border border-[var(--border-subtle)]">
          <Target className="w-3.5 h-3.5 text-indigo-400" />
          <span>Life Architecture & Direction</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[var(--text-primary)] mb-2">
          {t("goals.title")}
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl mx-auto">
          {t("goals.subtitle")}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-start sm:justify-center overflow-x-auto gap-2 mb-8 pb-2 border-b border-[var(--border-subtle)] scrollbar-none">
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
              <Icon className={`w-4 h-4 ${isActive ? "text-indigo-400" : "text-[var(--text-muted)]"}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: GOALS & MILESTONES */}
      {activeTab === "goals" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              Active Life Goals & Targets
            </h2>
            <button
              onClick={() => setShowAddGoalModal(true)}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Goal</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {goals.map((goal) => (
              <div
                key={goal.id}
                className="p-6 rounded-3xl glass-base border border-[var(--border-subtle)] hover:border-indigo-400/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-white/10 text-[var(--text-secondary)]">
                      {goal.timeframe} • {goal.category}
                    </span>
                    <button
                      onClick={() => handleDeleteGoal(goal.id)}
                      className="text-[var(--text-muted)] hover:text-rose-400 p-1 cursor-pointer"
                      title="Delete goal"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h3 className="text-base font-bold text-[var(--text-primary)] mb-1">
                    {goal.title}
                  </h3>
                  {goal.description && (
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                      {goal.description}
                    </p>
                  )}

                  {/* Progress Bar */}
                  <div className="space-y-1 mb-4">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-[var(--text-muted)]">Progress</span>
                      <span className="text-indigo-400 font-bold">{goal.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-300"
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Milestones */}
                  <div className="space-y-2 pt-2 border-t border-[var(--border-subtle)]">
                    <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase block mb-1">
                      Checkpoints ({goal.milestones.filter((m) => m.completed).length}/{goal.milestones.length})
                    </span>
                    {goal.milestones.map((m) => (
                      <div
                        key={m.id}
                        onClick={() => handleToggleMilestone(goal.id, m.id)}
                        className="flex items-start gap-2.5 p-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer select-none text-xs"
                      >
                        {m.completed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                        ) : (
                          <Circle className="w-4 h-4 text-[var(--text-muted)] mt-0.5 shrink-0" />
                        )}
                        <span className={m.completed ? "line-through text-[var(--text-muted)]" : "text-[var(--text-secondary)]"}>
                          {m.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: HABITS */}
      {activeTab === "habits" && (
        <div className="space-y-6">
          {/* Add Habit Form */}
          <form
            onSubmit={handleAddHabit}
            className="p-4 rounded-2xl glass-base border border-[var(--border-subtle)] flex flex-col sm:flex-row items-center gap-3"
          >
            <input
              type="text"
              value={newHabitTitle}
              onChange={(e) => setNewHabitTitle(e.target.value)}
              placeholder="Add a daily recurring discipline (e.g. 30m IELTS Speaking practice)..."
              className="flex-1 w-full bg-white/5 border border-[var(--border-subtle)] rounded-xl px-4 py-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:border-indigo-400"
            />
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <select
                value={newHabitFrequency}
                onChange={(e) => setNewHabitFrequency(e.target.value as "daily" | "weekly")}
                className="bg-[var(--surface-elevated)] border border-[var(--border-subtle)] text-xs rounded-xl px-3 py-2.5 text-[var(--text-secondary)] focus:outline-none"
              >
                <option value="daily">Daily Habit</option>
                <option value="weekly">Weekly Routine</option>
              </select>
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Habit</span>
              </button>
            </div>
          </form>

          {/* Habits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {habits.map((habit) => {
              const isDoneToday = habit.lastCompletedDate === todayStr;
              return (
                <div
                  key={habit.id}
                  className={`p-5 rounded-2xl glass-base border transition-colors flex items-center justify-between gap-4 ${
                    isDoneToday ? "border-emerald-500/30 bg-emerald-500/5" : "border-[var(--border-subtle)]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleToggleHabit(habit.id)}
                      className="cursor-pointer"
                      title={isDoneToday ? "Completed today!" : "Click to mark done today"}
                    >
                      {isDoneToday ? (
                        <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                      ) : (
                        <Circle className="w-6 h-6 text-[var(--text-muted)] hover:text-indigo-400" />
                      )}
                    </button>
                    <div>
                      <h4
                        className={`text-sm font-bold ${
                          isDoneToday ? "line-through text-[var(--text-muted)]" : "text-[var(--text-primary)]"
                        }`}
                      >
                        {habit.title}
                      </h4>
                      <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase">
                        {habit.frequency}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-300 text-xs font-mono font-bold">
                      <Flame className="w-3.5 h-3.5" />
                      <span>{habit.streak}d streak</span>
                    </div>
                    <button
                      onClick={() => handleDeleteHabit(habit.id)}
                      className="text-[var(--text-muted)] hover:text-rose-400 p-1 cursor-pointer"
                      title="Delete habit"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: PERSONAL LIFE */}
      {activeTab === "personal" && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl glass-strong border border-[var(--border-subtle)]">
            <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">
              Life Priorities & Well-being Compass
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
              Long-term achievement without personal health, mental clarity, and meaningful connection creates burnout. Keep these non-negotiables calibrated.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl glass-base border border-[var(--border-subtle)]">
                <span className="text-xs font-mono font-bold text-rose-400 block mb-1">
                  1. Physical Resilience
                </span>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Consistent 7 hours of restorative sleep, daily clean hydration, and 30m of cardiovascular or strength training.
                </p>
              </div>

              <div className="p-4 rounded-2xl glass-base border border-[var(--border-subtle)]">
                <span className="text-xs font-mono font-bold text-indigo-400 block mb-1">
                  2. Deep Cognitive Focus
                </span>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Protecting 2-3 hour uninterrupted blocks for engineering without social media or notification interruption.
                </p>
              </div>

              <div className="p-4 rounded-2xl glass-base border border-[var(--border-subtle)]">
                <span className="text-xs font-mono font-bold text-amber-400 block mb-1">
                  3. Relocation Runway
                </span>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Maintaining financial prudence and accumulating the capital required for seamless offshore migration to Australia.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: LIFE DIRECTION */}
      {activeTab === "direction" && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl glass-base border border-[var(--border-subtle)]">
            <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1">
              Visual Execution Alignment
            </h3>
            <p className="text-xs text-[var(--text-secondary)] mb-6">
              How daily actions cascade upward into your ultimate vision.
            </p>

            {/* Visual Pipeline */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl glass-elevated border border-purple-500/30 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-purple-400 font-bold block mb-1">
                    Level 1 • Horizon
                  </span>
                  <h4 className="text-sm font-bold text-[var(--text-primary)] mb-2">
                    Long-Term Dream
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    AI Tech Leadership & Global System Architecture (Australia 2027 → United States).
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-purple-500/20 text-right">
                  <ArrowRight className="w-4 h-4 text-purple-400 inline" />
                </div>
              </div>

              <div className="p-5 rounded-2xl glass-elevated border border-indigo-500/30 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-indigo-400 font-bold block mb-1">
                    Level 2 • Milestones
                  </span>
                  <h4 className="text-sm font-bold text-[var(--text-primary)] mb-2">
                    Concrete Goals
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    Pass IELTS 8.0, secure Australia TSS 482 visa sponsorship, ship 3 edge AI apps.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-indigo-500/20 text-right">
                  <ArrowRight className="w-4 h-4 text-indigo-400 inline" />
                </div>
              </div>

              <div className="p-5 rounded-2xl glass-elevated border border-emerald-500/30 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block mb-1">
                    Level 3 • Execution
                  </span>
                  <h4 className="text-sm font-bold text-[var(--text-primary)] mb-2">
                    Checkpoints
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    Passport dispatch, ONNX benchmark, IELTS Section 3 practice, Australian CV format.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-emerald-500/20 text-right">
                  <ArrowRight className="w-4 h-4 text-emerald-400 inline" />
                </div>
              </div>

              <div className="p-5 rounded-2xl glass-elevated border border-amber-500/30 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block mb-1">
                    Level 4 • Today
                  </span>
                  <h4 className="text-sm font-bold text-[var(--text-primary)] mb-2">
                    Current Habits
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    2 hours Deep Focus session, 30m IELTS immersion, 1 AI research concept.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-amber-500/20 text-right">
                  <Sparkles className="w-4 h-4 text-amber-400 inline" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Goal Modal */}
      {showAddGoalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md glass-elevated rounded-3xl p-6 sm:p-8 border border-[var(--border-base)] shadow-2xl">
            <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">
              Create New Life Goal
            </h3>
            <form onSubmit={handleAddGoal} className="space-y-4">
              <div>
                <label className="text-xs text-[var(--text-secondary)] uppercase font-mono block mb-1">
                  Goal Title
                </label>
                <input
                  type="text"
                  required
                  value={newGoalTitle}
                  onChange={(e) => setNewGoalTitle(e.target.value)}
                  placeholder="e.g. Master PyTorch and Transformer Architecture"
                  className="w-full bg-white/5 border border-[var(--border-subtle)] rounded-xl px-4 py-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:border-indigo-400"
                />
              </div>

              <div>
                <label className="text-xs text-[var(--text-secondary)] uppercase font-mono block mb-1">
                  Description (Optional)
                </label>
                <textarea
                  rows={2}
                  value={newGoalDescription}
                  onChange={(e) => setNewGoalDescription(e.target.value)}
                  placeholder="Details and motivation..."
                  className="w-full bg-white/5 border border-[var(--border-subtle)] rounded-xl px-4 py-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:border-indigo-400 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-[var(--text-secondary)] uppercase font-mono block mb-1">
                    Timeframe
                  </label>
                  <select
                    value={newGoalTimeframe}
                    onChange={(e) => setNewGoalTimeframe(e.target.value as "long-term" | "yearly" | "current")}
                    className="w-full bg-[var(--surface-elevated)] border border-[var(--border-subtle)] text-xs rounded-xl px-3 py-2.5 text-[var(--text-secondary)] focus:outline-none"
                  >
                    <option value="long-term">Long-Term (3-5y)</option>
                    <option value="yearly">Yearly (12m)</option>
                    <option value="current">Current Quarter</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-[var(--text-secondary)] uppercase font-mono block mb-1">
                    Category
                  </label>
                  <select
                    value={newGoalCategory}
                    onChange={(e) => setNewGoalCategory(e.target.value as "career" | "wealth" | "health" | "personal" | "adventure")}
                    className="w-full bg-[var(--surface-elevated)] border border-[var(--border-subtle)] text-xs rounded-xl px-3 py-2.5 text-[var(--text-secondary)] focus:outline-none"
                  >
                    <option value="career">Career</option>
                    <option value="wealth">Wealth</option>
                    <option value="health">Health</option>
                    <option value="personal">Personal</option>
                    <option value="adventure">Adventure</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--border-subtle)]">
                <button
                  type="button"
                  onClick={() => setShowAddGoalModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-[var(--text-secondary)] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs"
                >
                  Create Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
