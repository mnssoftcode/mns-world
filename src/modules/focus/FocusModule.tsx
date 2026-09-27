"use client";

import React, { useState, useEffect, useRef } from "react";
import { useMnsApp } from "@/lib/i18n/context";
import { storageRepository } from "@/lib/storage";
import { FocusSession, FocusSettings } from "@/types";
import { gameAudio } from "@/lib/sound";
import {
  Timer,
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Flame,
  CheckCircle,
} from "lucide-react";

type TimerState = "IDLE" | "RUNNING" | "PAUSED" | "COMPLETED";
type TimerMode = "work" | "break";

export function FocusModule() {
  const { t, awardXp } = useMnsApp();

  const [settings, setSettings] = useState<FocusSettings>(() => storageRepository.getFocusSettings());
  const [mode, setMode] = useState<TimerMode>("work");
  const [timerState, setTimerState] = useState<TimerState>("IDLE");
  const [remainingSeconds, setRemainingSeconds] = useState<number>(() => {
    return storageRepository.getFocusSettings().workMinutes * 60;
  });
  const [totalSeconds, setTotalSeconds] = useState<number>(() => {
    return storageRepository.getFocusSettings().workMinutes * 60;
  });
  const [ambientMode, setAmbientMode] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    return storageRepository.getFocusSettings().soundEnabled;
  });
  const [todayMinutes, setTodayMinutes] = useState<number>(() => {
    const sessions = storageRepository.getFocusSessions();
    const today = new Date().toDateString();
    const todaySessions = sessions.filter(
      (s) => s.completed && new Date(s.startedAt).toDateString() === today
    );
    const totalSecs = todaySessions.reduce((acc, s) => acc + (s.durationSeconds || 0), 0);
    return Math.round(totalSecs / 60);
  });
  const [completedCount, setCompletedCount] = useState<number>(() => {
    const sessions = storageRepository.getFocusSessions();
    const today = new Date().toDateString();
    return sessions.filter(
      (s) => s.completed && new Date(s.startedAt).toDateString() === today
    ).length;
  });

  // Custom inputs
  const [customWork, setCustomWork] = useState<number>(25);
  const [customBreak, setCustomBreak] = useState<number>(5);
  const [showCustomModal, setShowCustomModal] = useState<boolean>(false);

  // Precision timestamp refs to avoid drift
  const targetEndTimeRef = useRef<number | null>(null);
  const pausedRemainingRef = useRef<number>(settings.workMinutes * 60);
  const sessionStartTimeRef = useRef<string | null>(null);

  const calculateTodayStats = () => {
    const sessions = storageRepository.getFocusSessions();
    const today = new Date().toDateString();

    const todaySessions = sessions.filter((s) => {
      return s.completed && new Date(s.startedAt).toDateString() === today;
    });

    const totalSecs = todaySessions.reduce((acc, s) => acc + (s.durationSeconds || 0), 0);
    setTodayMinutes(Math.round(totalSecs / 60));
    setCompletedCount(todaySessions.length);
  };

  const handleTimerCompletion = () => {
    setTimerState("COMPLETED");

    if (mode === "work") {
      awardXp(100, "Deep Focus Session Cleared!");

      // Record completed work session
      const newSession: FocusSession = {
        id: `sess-${Date.now()}`,
        startedAt: sessionStartTimeRef.current || new Date().toISOString(),
        completedAt: new Date().toISOString(),
        durationSeconds: totalSeconds,
        completed: true,
      };
      storageRepository.saveFocusSession(newSession);

      // Transition to break
      const breakSecs = settings.breakMinutes * 60;
      setMode("break");
      setRemainingSeconds(breakSecs);
      setTotalSeconds(breakSecs);
      pausedRemainingRef.current = breakSecs;
    } else {
      gameAudio.playQuestComplete(soundEnabled);
      // Transition back to work
      const workSecs = settings.workMinutes * 60;
      setMode("work");
      setRemainingSeconds(workSecs);
      setTotalSeconds(workSecs);
      pausedRemainingRef.current = workSecs;
    }
  };

  // Sync session updates
  useEffect(() => {
    const handleUpdate = () => {
      calculateTodayStats();
    };

    window.addEventListener("mnsworld:focus-sessions:updated", handleUpdate);
    return () => window.removeEventListener("mnsworld:focus-sessions:updated", handleUpdate);
  }, []);

  // Timestamp interval loop
  useEffect(() => {
    if (timerState !== "RUNNING") return;

    const interval = setInterval(() => {
      if (!targetEndTimeRef.current) return;

      const now = Date.now();
      const diffMs = targetEndTimeRef.current - now;
      const diffSec = Math.max(0, Math.ceil(diffMs / 1000));

      setRemainingSeconds(diffSec);

      if (diffSec <= 0) {
        clearInterval(interval);
        handleTimerCompletion();
      }
    }, 200);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerState, mode]);

  const startTimer = () => {
    gameAudio.playClick(soundEnabled);
    if (timerState === "IDLE" || timerState === "COMPLETED") {
      sessionStartTimeRef.current = new Date().toISOString();
      targetEndTimeRef.current = Date.now() + remainingSeconds * 1000;
    } else if (timerState === "PAUSED") {
      targetEndTimeRef.current = Date.now() + pausedRemainingRef.current * 1000;
    }
    setTimerState("RUNNING");
  };

  const pauseTimer = () => {
    gameAudio.playClick(soundEnabled);
    if (targetEndTimeRef.current) {
      const remainingMs = targetEndTimeRef.current - Date.now();
      const remSec = Math.max(0, Math.ceil(remainingMs / 1000));
      pausedRemainingRef.current = remSec;
      setRemainingSeconds(remSec);
    }
    setTimerState("PAUSED");
  };

  const resetTimer = () => {
    gameAudio.playClick(soundEnabled);
    setTimerState("IDLE");
    const secs = mode === "work" ? settings.workMinutes * 60 : settings.breakMinutes * 60;
    setRemainingSeconds(secs);
    setTotalSeconds(secs);
    pausedRemainingRef.current = secs;
    targetEndTimeRef.current = null;
  };

  const skipBreak = () => {
    gameAudio.playClick(soundEnabled);
    setMode("work");
    const workSecs = settings.workMinutes * 60;
    setRemainingSeconds(workSecs);
    setTotalSeconds(workSecs);
    pausedRemainingRef.current = workSecs;
    setTimerState("IDLE");
  };

  const applyPreset = (workMin: number, breakMin: number) => {
    gameAudio.playClick(soundEnabled);
    setTimerState("IDLE");
    setMode("work");
    const updated = storageRepository.saveFocusSettings({
      workMinutes: workMin,
      breakMinutes: breakMin,
    });
    setSettings(updated);
    const secs = workMin * 60;
    setRemainingSeconds(secs);
    setTotalSeconds(secs);
    pausedRemainingRef.current = secs;
    setShowCustomModal(false);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(mins).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const progressPercent = totalSeconds > 0 ? ((totalSeconds - remainingSeconds) / totalSeconds) * 100 : 0;

  return (
    <div
      className={`w-full transition-all duration-500 py-6 sm:py-10 px-4 sm:px-6 ${
        ambientMode ? "max-w-2xl mx-auto flex flex-col justify-center min-h-[75vh]" : "max-w-4xl mx-auto"
      }`}
    >
      {/* Module Header (hidden in ambient mode) */}
      {!ambientMode && (
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-subtle mb-3 text-xs font-mono tracking-wider uppercase text-[var(--text-secondary)] border border-[var(--border-subtle)]">
            <Timer className="w-3.5 h-3.5 text-emerald-400" />
            <span>Hyper-Focus Warp Engine</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[var(--text-primary)] mb-2">
            {t("focus.title")}
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-md mx-auto">
            {t("focus.subtitle")}
          </p>
        </div>
      )}

      {/* Main Focus Console */}
      <div className="glass-strong rounded-3xl p-6 sm:p-12 shadow-2xl border border-[var(--border-base)] relative overflow-hidden">
        {/* Top Console Controls */}
        <div className="flex items-center justify-between gap-4 mb-6">
          {/* Mode Pill */}
          <div className="flex items-center gap-2">
            <span
              className={`px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider ${
                mode === "work"
                  ? "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30"
                  : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
              }`}
            >
              {mode === "work" ? t("focus.modeWork") : t("focus.modeBreak")}
            </span>
            {timerState === "RUNNING" && (
              <span className="flex h-2.5 w-2.5 relative">
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
            )}
          </div>

          {/* Quick Toolbar (Sound, Ambient) */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const next = !soundEnabled;
                setSoundEnabled(next);
                storageRepository.saveFocusSettings({ soundEnabled: next });
              }}
              title={soundEnabled ? "Disable sound cue" : "Enable sound cue"}
              className="p-2.5 rounded-xl glass-subtle hover:bg-white/10 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-rose-400" />}
            </button>
            <button
              onClick={() => {
                gameAudio.playClick(soundEnabled);
                setAmbientMode(!ambientMode);
              }}
              title={ambientMode ? "Exit Zen View" : "Enter Zen View"}
              className="p-2.5 rounded-xl glass-subtle hover:bg-white/10 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            >
              {ambientMode ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Display Clock */}
        <div className="my-8 text-center select-none">
          <div className="text-6xl sm:text-8xl md:text-9xl font-mono font-light tracking-tighter text-[var(--text-primary)]">
            {formatTime(remainingSeconds)}
          </div>

          {/* Circular/Linear Progress Bar */}
          <div className="w-full max-w-md mx-auto h-2 rounded-full bg-white/10 mt-6 overflow-hidden">
            <div
              className={`h-full transition-all duration-300 rounded-full ${
                mode === "work" ? "bg-gradient-to-r from-indigo-500 to-purple-500" : "bg-emerald-400"
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Primary Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-8">
          {timerState !== "RUNNING" ? (
            <button
              onClick={startTimer}
              className="px-8 sm:px-10 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-black text-base tracking-tight hover:opacity-95 active:scale-[0.98] transition-all flex items-center gap-2.5 shadow-[0_10px_35px_rgba(99,102,241,0.3)] cursor-pointer"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>{timerState === "PAUSED" ? t("focus.resume") : t("focus.start")}</span>
            </button>
          ) : (
            <button
              onClick={pauseTimer}
              className="px-8 sm:px-10 py-4 rounded-2xl glass-elevated border border-[var(--border-base)] text-[var(--text-primary)] font-black text-base tracking-tight hover:bg-white/15 active:scale-[0.98] transition-all flex items-center gap-2.5 cursor-pointer"
            >
              <Pause className="w-5 h-5 fill-current" />
              <span>{t("focus.pause")}</span>
            </button>
          )}

          <button
            onClick={resetTimer}
            title={t("focus.reset")}
            className="p-4 rounded-2xl glass-subtle hover:bg-white/10 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          {mode === "break" && (
            <button
              onClick={skipBreak}
              className="px-4 py-4 rounded-2xl glass-subtle hover:bg-white/10 text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all flex items-center gap-2 cursor-pointer"
            >
              <SkipForward className="w-4 h-4" />
              <span>{t("focus.skipBreak")}</span>
            </button>
          )}
        </div>

        {/* Presets Row (hidden in ambient mode) */}
        {!ambientMode && (
          <div className="mt-10 pt-6 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => applyPreset(25, 5)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                settings.workMinutes === 25 && settings.breakMinutes === 5
                  ? "bg-white/20 text-[var(--text-primary)] border border-indigo-400/50"
                  : "glass-subtle text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              25m / 5m
            </button>
            <button
              onClick={() => applyPreset(50, 10)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                settings.workMinutes === 50 && settings.breakMinutes === 10
                  ? "bg-white/20 text-[var(--text-primary)] border border-indigo-400/50"
                  : "glass-subtle text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              50m / 10m
            </button>
            <button
              onClick={() => setShowCustomModal(true)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold glass-subtle text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
            >
              {t("focus.presetCustom")}...
            </button>
          </div>
        )}
      </div>

      {/* Daily Metrics (hidden in ambient mode) */}
      {!ambientMode && (
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="glass-base rounded-2xl p-4 sm:p-5 flex items-center gap-4 border border-[var(--border-subtle)]">
            <div className="p-3 rounded-xl bg-orange-500/15 text-orange-400">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-mono font-black text-[var(--text-primary)] block">
                {todayMinutes}m
              </span>
              <span className="text-xs text-[var(--text-muted)] font-sans">
                {t("focus.todayMinutes")}
              </span>
            </div>
          </div>

          <div className="glass-base rounded-2xl p-4 sm:p-5 flex items-center gap-4 border border-[var(--border-subtle)]">
            <div className="p-3 rounded-xl bg-emerald-500/15 text-emerald-400">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-mono font-black text-[var(--text-primary)] block">
                {completedCount}
              </span>
              <span className="text-xs text-[var(--text-muted)] font-sans">
                {t("focus.completedSessions")}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Custom Duration Modal */}
      {showCustomModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-sm glass-elevated rounded-3xl p-6 border border-[var(--border-base)]">
            <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">
              {t("focus.presetCustom")}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-[var(--text-secondary)] uppercase tracking-wider block mb-1">
                  {t("focus.customWork")}
                </label>
                <input
                  type="number"
                  min="1"
                  max="180"
                  value={customWork}
                  onChange={(e) => setCustomWork(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full px-4 py-2.5 rounded-xl glass-base text-[var(--text-primary)] font-mono focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              <div>
                <label className="text-xs text-[var(--text-secondary)] uppercase tracking-wider block mb-1">
                  {t("focus.customBreak")}
                </label>
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={customBreak}
                  onChange={(e) => setCustomBreak(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full px-4 py-2.5 rounded-xl glass-base text-[var(--text-primary)] font-mono focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCustomModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                >
                  {t("common.cancel")}
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset(customWork, customBreak)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-xs hover:opacity-90"
                >
                  {t("focus.applyPreset")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
