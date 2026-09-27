"use client";

import React, { useState, useEffect, useRef } from "react";
import { CAREER_IDENTITY, CAREER_PHASES } from "@/data/career/roadmap";
import { ProductivityTask, FocusSession, FocusSettings } from "@/types";
import { storageRepository } from "@/lib/storage";
import { useMnsApp } from "@/lib/i18n/context";
import { gameAudio } from "@/lib/sound";
import {
  Compass,
  CheckCircle2,
  Circle,
  ChevronDown,
  ChevronUp,
  Target,
  ListTodo,
  Timer,
  BookOpen,
  Briefcase,
  Play,
  Pause,
  RotateCcw,
  Plus,
  Trash2,
  Flame,
  Award,
  Layers,
} from "lucide-react";

type CareerTab = "overview" | "roadmap" | "productivity" | "focus" | "learning" | "execution";

interface Props {
  initialTab?: CareerTab;
}

const LEARNING_MODULES = [
  {
    id: "learn-1",
    title: "Python & Numerical Foundation for AI",
    level: "Advanced",
    status: "Completed",
    skills: ["NumPy Vectorization", "Pandas DataFrames", "SciPy", "FastAPI AI Endpoints"],
    description: "High-performance Python for data processing, vector computations, and serving machine learning models.",
  },
  {
    id: "learn-2",
    title: "Deep Learning Foundations & PyTorch",
    level: "Intermediate",
    status: "In Progress",
    skills: ["Tensors & Autograd", "Neural Net Architectures", "Optimization & Loss Functions", "PyTorch 2.x"],
    description: "Understanding feedforward networks, backpropagation calculus from scratch, and modern PyTorch pipelines.",
  },
  {
    id: "learn-3",
    title: "Mobile & Edge AI (TFLite & ONNX)",
    level: "Specialist",
    status: "Active Focus",
    skills: ["TFLite FlatBuffers", "ONNX Runtime Mobile", "8-bit Quantization", "React Native Native Modules"],
    description: "Exporting, pruning, and deploying low-latency AI inference models directly on iOS and Android devices.",
  },
  {
    id: "learn-4",
    title: "Transformers, LLMs & Retrieval Augmented Generation (RAG)",
    level: "Advanced",
    status: "Planned",
    skills: ["Self-Attention Mechanisms", "Hugging Face Transformers", "Vector Embeddings & pgvector", "LangChain / LlamaIndex"],
    description: "Building production-grade contextual search, document question-answering, and autonomous AI agents.",
  },
  {
    id: "learn-5",
    title: "Computer Vision & Edge Perception",
    level: "Intermediate",
    status: "Planned",
    skills: ["OpenCV", "YOLOv8 Object Detection", "MediaPipe Landmarks", "Realtime Frame Processing"],
    description: "Real-time edge perception algorithms for camera feeds on mobile hardware without server roundtrips.",
  },
  {
    id: "learn-6",
    title: "Production MLOps & Model Deployment",
    level: "Production",
    status: "Planned",
    skills: ["Docker Containers", "Model Registry (MLflow)", "Cloud Serving (AWS/GCP)", "CI/CD Model Testing"],
    description: "Packaging trained models into reproducible containerized microservices with telemetry and monitoring.",
  },
];

const EXECUTION_STAGES = [
  {
    id: "exec-1",
    stage: "Stage 1",
    title: "Personal Identity & Passport Verification",
    badge: "In Progress",
    tasks: [
      { id: "e1-1", title: "Passport Application Submission", done: true },
      { id: "e1-2", title: "Police Station Verification Prep", done: true },
      { id: "e1-3", title: "Physical Passport Dispatch & Delivery", done: false },
      { id: "e1-4", title: "Digital Certified Notarized Scans", done: false },
    ],
  },
  {
    id: "exec-2",
    stage: "Stage 2",
    title: "IELTS Academic English Excellence",
    badge: "Active",
    tasks: [
      { id: "e2-1", title: "Diagnostic Benchmark Test (Target 8.0+)", done: true },
      { id: "e2-2", title: "Listening Section 3 & 4 Daily Tactics", done: false },
      { id: "e2-3", title: "Reading Speed & Skimming Drills", done: false },
      { id: "e2-4", title: "Writing Task 1 Academic Chart Analysis", done: false },
      { id: "e2-5", title: "Writing Task 2 Essay Structure & Lexical Resource", done: false },
      { id: "e2-6", title: "Speaking Mock Interviews with Native Accents", done: false },
    ],
  },
  {
    id: "exec-3",
    stage: "Stage 3",
    title: "Education & Degree Credentialing",
    badge: "Milestone",
    tasks: [
      { id: "e3-1", title: "MCA Final Degree Completion (2026)", done: true },
      { id: "e3-2", title: "University Consolidated Marksheets & Transcripts", done: true },
      { id: "e3-3", title: "Course Syllabus & ICT Content Alignment Verification", done: false },
    ],
  },
  {
    id: "exec-4",
    stage: "Stage 4",
    title: "ACS Migration Skills Assessment",
    badge: "Planned",
    tasks: [
      { id: "e4-1", title: "ANZSCO 261313 / Software & Applications Engineer Mapping", done: false },
      { id: "e4-2", title: "Professional Reference Letters with Role Details", done: false },
      { id: "e4-3", title: "Submit ACS Skills Assessment Application", done: false },
      { id: "e4-4", title: "Receive Positive ACS Assessment Result", done: false },
    ],
  },
  {
    id: "exec-5",
    stage: "Stage 5",
    title: "Australian Job Market & Sponsoring Employers",
    badge: "Strategy",
    tasks: [
      { id: "e5-1", title: "Australian CV Format (2-Page, Metric Driven)", done: false },
      { id: "e5-2", title: "LinkedIn Sydney/Melbourne Regional Targeting", done: false },
      { id: "e5-3", title: "List 50 Australian Companies Sponsoring Subclass 482 Visas", done: false },
      { id: "e5-4", title: "Direct Outreach to Tech Leads & Recruiters in Australia", done: false },
    ],
  },
  {
    id: "exec-6",
    stage: "Stage 6",
    title: "Offshore Financial Runway & Migration Logistics",
    badge: "Target",
    tasks: [
      { id: "e6-1", title: "Target AUD $15,000 Emergency Relocation Fund", done: false },
      { id: "e6-2", title: "Tax & Bank Accounts Planning (Forex / Remittance)", done: false },
      { id: "e6-3", title: "Flight, Initial Accommodation, and Visa Lodgement", done: false },
    ],
  },
];

export function CareerModule({ initialTab = "overview" }: Props) {
  const { t, preferences, awardXp } = useMnsApp();
  const [activeTab, setActiveTab] = useState<CareerTab>(initialTab);

  // Roadmap State
  const [progressState, setProgressState] = useState<Record<string, boolean>>(() => {
    const saved = storageRepository.getCareerProgress();
    const initial: Record<string, boolean> = { ...saved };
    CAREER_PHASES.forEach((phase) => {
      phase.items.forEach((item) => {
        if (!(item.id in initial)) {
          initial[item.id] = !!item.completed;
        }
      });
    });
    return initial;
  });

  const [expandedPhases, setExpandedPhases] = useState<Record<string, boolean>>(() => {
    const defaultExpanded: Record<string, boolean> = {};
    CAREER_PHASES.slice(0, 3).forEach((p) => {
      defaultExpanded[p.id] = true;
    });
    return defaultExpanded;
  });

  // Productivity State
  const [tasks, setTasks] = useState<ProductivityTask[]>(() => storageRepository.getProductivityTasks());
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState<"high" | "medium" | "low">("high");

  // Focus Timer State
  const [focusSettings, setFocusSettings] = useState<FocusSettings>(() => storageRepository.getFocusSettings());
  const [focusMode, setFocusMode] = useState<"work" | "break">("work");
  const [timerState, setTimerState] = useState<"IDLE" | "RUNNING" | "PAUSED" | "COMPLETED">("IDLE");
  const [remainingSeconds, setRemainingSeconds] = useState<number>(() => {
    const s = storageRepository.getFocusSettings();
    return s.workMinutes * 60;
  });
  const [totalSeconds, setTotalSeconds] = useState<number>(() => {
    const s = storageRepository.getFocusSettings();
    return s.workMinutes * 60;
  });
  const [todayFocusMinutes, setTodayFocusMinutes] = useState<number>(() => {
    const sessions = storageRepository.getFocusSessions();
    const today = new Date().toDateString();
    const todaySessions = sessions.filter(
      (s) => s.completed && new Date(s.startedAt).toDateString() === today
    );
    const totalSecs = todaySessions.reduce((acc, s) => acc + (s.durationSeconds || 0), 0);
    return Math.round(totalSecs / 60);
  });
  const [completedFocusCount, setCompletedFocusCount] = useState<number>(() => {
    const sessions = storageRepository.getFocusSessions();
    const today = new Date().toDateString();
    return sessions.filter(
      (s) => s.completed && new Date(s.startedAt).toDateString() === today
    ).length;
  });

  const targetEndTimeRef = useRef<number | null>(null);
  const pausedRemainingRef = useRef<number>(focusSettings.workMinutes * 60);
  const sessionStartTimeRef = useRef<string | null>(null);

  const soundEnabled = preferences.soundFxEnabled ?? true;

  const updateFocusStats = () => {
    const sessions = storageRepository.getFocusSessions();
    const today = new Date().toDateString();
    const todaySessions = sessions.filter(
      (s) => s.completed && new Date(s.startedAt).toDateString() === today
    );
    const totalSecs = todaySessions.reduce((acc, s) => acc + (s.durationSeconds || 0), 0);
    setTodayFocusMinutes(Math.round(totalSecs / 60));
    setCompletedFocusCount(todaySessions.length);
  };

  const handleTimerComplete = () => {
    setTimerState("COMPLETED");
    if (focusMode === "work") {
      awardXp(100, "Deep Focus Session Cleared!");
      const session: FocusSession = {
        id: `sess-${Date.now()}`,
        startedAt: sessionStartTimeRef.current || new Date().toISOString(),
        completedAt: new Date().toISOString(),
        durationSeconds: totalSeconds,
        completed: true,
      };
      storageRepository.saveFocusSession(session);
      gameAudio.playQuestComplete(soundEnabled);
      // Switch to break
      setFocusMode("break");
      const breakSecs = focusSettings.breakMinutes * 60;
      setRemainingSeconds(breakSecs);
      setTotalSeconds(breakSecs);
      pausedRemainingRef.current = breakSecs;
    } else {
      awardXp(25, "Break Finished!");
      gameAudio.playQuestComplete(soundEnabled);
      setFocusMode("work");
      const workSecs = focusSettings.workMinutes * 60;
      setRemainingSeconds(workSecs);
      setTotalSeconds(workSecs);
      pausedRemainingRef.current = workSecs;
    }
  };

  // Sync external storage events
  useEffect(() => {
    const handleTasksUpdate = () => {
      setTasks(storageRepository.getProductivityTasks());
    };
    const handleSessionsUpdate = () => {
      updateFocusStats();
    };

    window.addEventListener("mnsworld:tasks:updated", handleTasksUpdate);
    window.addEventListener("mnsworld:focus-sessions:updated", handleSessionsUpdate);
    return () => {
      window.removeEventListener("mnsworld:tasks:updated", handleTasksUpdate);
      window.removeEventListener("mnsworld:focus-sessions:updated", handleSessionsUpdate);
    };
  }, []);

  // Timestamp precision loop for focus timer
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
        handleTimerComplete();
      }
    }, 250);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerState, focusMode]);

  const startTimer = () => {
    gameAudio.playClick(soundEnabled);
    const now = Date.now();
    targetEndTimeRef.current = now + pausedRemainingRef.current * 1000;
    if (timerState === "IDLE") {
      sessionStartTimeRef.current = new Date().toISOString();
    }
    setTimerState("RUNNING");
  };

  const pauseTimer = () => {
    gameAudio.playClick(soundEnabled);
    if (targetEndTimeRef.current) {
      const now = Date.now();
      const remainingMs = Math.max(0, targetEndTimeRef.current - now);
      pausedRemainingRef.current = Math.ceil(remainingMs / 1000);
      setRemainingSeconds(pausedRemainingRef.current);
    }
    targetEndTimeRef.current = null;
    setTimerState("PAUSED");
  };

  const resetTimer = () => {
    gameAudio.playClick(soundEnabled);
    targetEndTimeRef.current = null;
    setTimerState("IDLE");
    const secs = (focusMode === "work" ? focusSettings.workMinutes : focusSettings.breakMinutes) * 60;
    setRemainingSeconds(secs);
    setTotalSeconds(secs);
    pausedRemainingRef.current = secs;
  };

  const applyFocusPreset = (workMins: number, breakMins: number) => {
    gameAudio.playClick(soundEnabled);
    const updated = storageRepository.saveFocusSettings({
      workMinutes: workMins,
      breakMinutes: breakMins,
    });
    setFocusSettings(updated);
    setTimerState("IDLE");
    targetEndTimeRef.current = null;
    const secs = (focusMode === "work" ? workMins : breakMins) * 60;
    setRemainingSeconds(secs);
    setTotalSeconds(secs);
    pausedRemainingRef.current = secs;
  };

  // Format MM:SS
  const formatTimerTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Roadmap actions
  const toggleItem = (itemId: string, itemTitle: string) => {
    const wasChecked = !!progressState[itemId];
    const willBeChecked = !wasChecked;
    storageRepository.toggleCareerItem(itemId);
    setProgressState((prev) => ({ ...prev, [itemId]: willBeChecked }));
    if (willBeChecked) {
      awardXp(50, `Cleared: ${itemTitle}`);
    } else {
      gameAudio.playClick(soundEnabled);
    }
  };

  const togglePhaseExpand = (phaseId: string) => {
    gameAudio.playClick(soundEnabled);
    setExpandedPhases((prev) => ({ ...prev, [phaseId]: !prev[phaseId] }));
  };

  // Productivity actions
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    storageRepository.addTask({
      title: newTaskTitle.trim(),
      completed: false,
      priority: newTaskPriority,
      category: "career",
    });
    setNewTaskTitle("");
    awardXp(10, "Task Created");
  };

  const handleToggleTask = (taskId: string) => {
    storageRepository.toggleTask(taskId);
    gameAudio.playClick(soundEnabled);
  };

  const handleDeleteTask = (taskId: string) => {
    storageRepository.deleteTask(taskId);
    gameAudio.playClick(soundEnabled);
  };

  const allItems = CAREER_PHASES.flatMap((p) => p.items);
  const totalCount = allItems.length;
  const doneCount = allItems.filter((i) => progressState[i.id]).length;
  const percentComplete = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;

  const tabs: { id: CareerTab; labelKey: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "overview", labelKey: "career.tabOverview", icon: Compass },
    { id: "roadmap", labelKey: "career.tabRoadmap", icon: Layers },
    { id: "productivity", labelKey: "career.tabProductivity", icon: ListTodo },
    { id: "focus", labelKey: "career.tabFocus", icon: Timer },
    { id: "learning", labelKey: "career.tabLearning", icon: BookOpen },
    { id: "execution", labelKey: "career.tabExecution", icon: Briefcase },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto py-6 sm:py-10 px-4 sm:px-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-subtle mb-3 text-xs font-mono tracking-wider uppercase text-[var(--text-secondary)] border border-[var(--border-subtle)]">
          <Compass className="w-3.5 h-3.5 text-indigo-400" />
          <span>Personal Execution Center • V2</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[var(--text-primary)] mb-2">
          {t("career.title")}
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl mx-auto">
          {t("career.subtitle")}
        </p>
      </div>

      {/* Tabs Navigation */}
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
              <span>{t(tab.labelKey)}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          {/* Identity & Core Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 sm:p-5 rounded-2xl glass-base border border-[var(--border-subtle)]">
              <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase block mb-1">
                {t("career.statsInstalls")}
              </span>
              <span className="text-2xl sm:text-3xl font-black text-indigo-400">
                {CAREER_IDENTITY.metrics.installs}
              </span>
              <span className="text-[11px] text-[var(--text-secondary)] block mt-1">
                Across Play Store & iOS
              </span>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl glass-base border border-[var(--border-subtle)]">
              <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase block mb-1">
                {t("career.statsUsers")}
              </span>
              <span className="text-2xl sm:text-3xl font-black text-purple-400">
                {CAREER_IDENTITY.metrics.users}
              </span>
              <span className="text-[11px] text-[var(--text-secondary)] block mt-1">
                Active registered accounts
              </span>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl glass-base border border-[var(--border-subtle)]">
              <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase block mb-1">
                {t("career.statsShipped")}
              </span>
              <span className="text-2xl sm:text-3xl font-black text-emerald-400">
                {CAREER_IDENTITY.metrics.productsShipped}
              </span>
              <span className="text-[11px] text-[var(--text-secondary)] block mt-1">
                End-to-end applications
              </span>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl glass-base border border-[var(--border-subtle)]">
              <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase block mb-1">
                {t("career.statsExperience")}
              </span>
              <span className="text-2xl sm:text-3xl font-black text-amber-400">
                {CAREER_IDENTITY.metrics.experienceYears}
              </span>
              <span className="text-[11px] text-[var(--text-secondary)] block mt-1">
                React Native & Python
              </span>
            </div>
          </div>

          {/* Primary Strategy & Target Country */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl glass-strong border border-indigo-500/30 md:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-5 h-5 text-indigo-400" />
                <h3 className="text-lg font-bold text-[var(--text-primary)]">
                  Professional Identity & Direction
                </h3>
              </div>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                <strong>AI/ML Engineer specializing in AI-powered mobile applications.</strong> Transitioning from 2 years of production React Native and full-stack software development into applied machine learning, edge inference (TFLite/ONNX), and LLM agent architectures.
              </p>
              <div className="flex flex-wrap gap-2 pt-2 border-t border-[var(--border-subtle)]">
                {CAREER_IDENTITY.coreStrengths.map((str) => (
                  <span
                    key={str}
                    className="px-2.5 py-1 rounded-lg bg-indigo-500/15 text-indigo-300 text-xs font-mono font-medium"
                  >
                    {str}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-3xl glass-base border border-[var(--border-subtle)] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🇦🇺</span>
                  <h3 className="text-base font-bold text-[var(--text-primary)]">
                    Target: Australia 2027
                  </h3>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-3">
                  Primary target country for PR & TSS Visa sponsorship. High demand for mobile engineers moving into applied AI.
                </p>
                <div className="space-y-1 text-xs font-mono text-[var(--text-muted)]">
                  <div>• Subclass 482 Employer Sponsor</div>
                  <div>• Subclass 189/190 PR Pathway</div>
                  <div>• Sydney / Melbourne Tech Ecosystem</div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-400">Roadmap Progress</span>
                <span className="text-indigo-400 font-bold">{percentComplete}% Cleared</span>
              </div>
            </div>
          </div>

          {/* Unfair Advantage Callout */}
          <div className="p-6 rounded-3xl glass-subtle border border-[var(--border-subtle)]">
            <div className="flex items-center gap-2 text-amber-400 mb-2 font-bold text-sm">
              <Award className="w-4 h-4" />
              <span>Unfair Career Advantage</span>
            </div>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              &quot;You are not starting from zero. You are an experienced software engineer with 10k+ installs, shipped production apps, and an MCA completed in 2026 moving into AI/ML. Most AI graduates cannot ship full products; most mobile developers cannot run on-device neural networks. You sit right in the intersection.&quot;
            </p>
          </div>
        </div>
      )}

      {/* TAB 2: ROADMAP (15 PHASES) */}
      {activeTab === "roadmap" && (
        <div className="space-y-6">
          {/* Progress Header Bar */}
          <div className="p-5 rounded-2xl glass-base border border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-[var(--text-muted)] uppercase block">
                Master Roadmap Execution
              </span>
              <span className="text-base font-bold text-[var(--text-primary)]">
                {doneCount} of {totalCount} checkpoints completed ({percentComplete}%)
              </span>
            </div>
            <div className="w-full sm:w-64 h-2.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-300"
                style={{ width: `${percentComplete}%` }}
              />
            </div>
          </div>

          {/* Phases List */}
          <div className="space-y-4">
            {CAREER_PHASES.map((phase) => {
              const isExpanded = !!expandedPhases[phase.id];
              const phaseDone = phase.items.filter((i) => progressState[i.id]).length;
              const phaseTotal = phase.items.length;
              const isComplete = phaseDone === phaseTotal && phaseTotal > 0;

              return (
                <div
                  key={phase.id}
                  className={`rounded-2xl glass-base border transition-colors duration-150 overflow-hidden ${
                    isComplete ? "border-emerald-500/30" : "border-[var(--border-subtle)] hover:border-indigo-400/40"
                  }`}
                >
                  <button
                    onClick={() => togglePhaseExpand(phase.id)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold font-mono ${
                          isComplete ? "bg-emerald-500/20 text-emerald-300" : "bg-white/10 text-white"
                        }`}
                      >
                        {phase.order}
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-bold text-[var(--text-primary)]">
                          {phase.title}
                        </h4>
                        <span className="text-xs text-[var(--text-muted)] font-mono">
                          {phaseDone}/{phaseTotal} items
                        </span>
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-[var(--text-muted)]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[var(--text-muted)]" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="px-4 sm:px-6 pb-5 pt-2 border-t border-[var(--border-subtle)] space-y-2.5">
                      {phase.items.map((item) => {
                        const isChecked = !!progressState[item.id];
                        return (
                          <div
                            key={item.id}
                            onClick={() => toggleItem(item.id, item.title)}
                            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors cursor-pointer select-none"
                          >
                            {isChecked ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                            ) : (
                              <Circle className="w-4 h-4 text-[var(--text-muted)] mt-0.5 shrink-0" />
                            )}
                            <span
                              className={`text-xs sm:text-sm leading-relaxed ${
                                isChecked
                                  ? "line-through text-[var(--text-muted)]"
                                  : "text-[var(--text-primary)] font-medium"
                              }`}
                            >
                              {item.title}
                            </span>
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
      )}

      {/* TAB 3: PRODUCTIVITY (TASKS & PRIORITIES) */}
      {activeTab === "productivity" && (
        <div className="space-y-6">
          {/* New Task Bar */}
          <form
            onSubmit={handleAddTask}
            className="p-4 rounded-2xl glass-base border border-[var(--border-subtle)] flex flex-col sm:flex-row items-center gap-3"
          >
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Add immediate action item (e.g. Test TFLite on iOS)..."
              className="flex-1 w-full bg-white/5 border border-[var(--border-subtle)] rounded-xl px-4 py-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:border-indigo-400"
            />
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <select
                value={newTaskPriority}
                onChange={(e) => setNewTaskPriority(e.target.value as "high" | "medium" | "low")}
                className="bg-[var(--surface-elevated)] border border-[var(--border-subtle)] text-xs rounded-xl px-3 py-2.5 text-[var(--text-secondary)] focus:outline-none"
              >
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Task</span>
              </button>
            </div>
          </form>

          {/* Tasks List */}
          <div className="rounded-2xl glass-base border border-[var(--border-subtle)] divide-y divide-[var(--border-subtle)]">
            {tasks.length === 0 ? (
              <div className="p-8 text-center text-xs text-[var(--text-muted)] font-mono">
                No active tasks logged. Create your first priority action above.
              </div>
            ) : (
              tasks.map((task) => (
                <div
                  key={task.id}
                  className="p-4 flex items-center justify-between gap-4 hover:bg-white/5 transition-colors"
                >
                  <div
                    onClick={() => handleToggleTask(task.id)}
                    className="flex items-center gap-3 cursor-pointer flex-1 select-none"
                  >
                    {task.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    ) : (
                      <Circle className="w-5 h-5 text-[var(--text-muted)] shrink-0" />
                    )}
                    <span
                      className={`text-sm ${
                        task.completed
                          ? "line-through text-[var(--text-muted)]"
                          : "text-[var(--text-primary)] font-medium"
                      }`}
                    >
                      {task.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${
                        task.priority === "high"
                          ? "bg-rose-500/15 text-rose-300"
                          : task.priority === "medium"
                          ? "bg-amber-500/15 text-amber-300"
                          : "bg-blue-500/15 text-blue-300"
                      }`}
                    >
                      {task.priority.toUpperCase()}
                    </span>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="text-[var(--text-muted)] hover:text-rose-400 p-1 cursor-pointer"
                      title="Delete task"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 4: FOCUS NOW (TIMESTAMP ENGINE) */}
      {activeTab === "focus" && (
        <div className="max-w-xl mx-auto space-y-8 text-center">
          {/* Telemetry pill */}
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full glass-subtle text-xs font-mono text-[var(--text-secondary)] border border-[var(--border-subtle)]">
            <span className="flex items-center gap-1.5 text-amber-400 font-bold">
              <Flame className="w-3.5 h-3.5" />
              {todayFocusMinutes}m Logged Today
            </span>
            <span>•</span>
            <span>{completedFocusCount} Sessions Cleared</span>
          </div>

          {/* Large Clean Timer Circle */}
          <div className="p-8 sm:p-12 rounded-3xl glass-elevated border border-[var(--border-base)] shadow-2xl relative">
            <div className="text-xs uppercase font-mono tracking-widest text-indigo-400 font-bold mb-2">
              {focusMode === "work" ? "Deep Focus Interval" : "Rest & Recharge"}
            </div>

            <div className="text-6xl sm:text-8xl font-black font-mono tracking-tight text-[var(--text-primary)] my-4">
              {formatTimerTime(remainingSeconds)}
            </div>

            {/* Presets */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <button
                onClick={() => applyFocusPreset(25, 5)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold border transition-colors cursor-pointer ${
                  focusSettings.workMinutes === 25
                    ? "bg-indigo-600/30 text-indigo-300 border-indigo-400/50"
                    : "glass-subtle text-[var(--text-muted)] border-[var(--border-subtle)] hover:text-white"
                }`}
              >
                25 / 5
              </button>
              <button
                onClick={() => applyFocusPreset(50, 10)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold border transition-colors cursor-pointer ${
                  focusSettings.workMinutes === 50
                    ? "bg-indigo-600/30 text-indigo-300 border-indigo-400/50"
                    : "glass-subtle text-[var(--text-muted)] border-[var(--border-subtle)] hover:text-white"
                }`}
              >
                50 / 10
              </button>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4">
              {timerState === "RUNNING" ? (
                <button
                  onClick={pauseTimer}
                  className="px-8 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-black text-sm tracking-tight transition-colors shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  <Pause className="w-4 h-4 fill-black" />
                  <span>Pause</span>
                </button>
              ) : (
                <button
                  onClick={startTimer}
                  className="px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-sm tracking-tight transition-colors shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>{timerState === "PAUSED" ? "Resume" : "Start Focus"}</span>
                </button>
              )}

              <button
                onClick={resetTimer}
                className="p-3.5 rounded-2xl glass-subtle hover:bg-white/10 text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)] transition-colors cursor-pointer"
                title="Reset interval"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: LEARNING (AI/ML ROADMAP) */}
      {activeTab === "learning" && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl glass-base border border-[var(--border-subtle)]">
            <h3 className="text-base font-bold text-[var(--text-primary)] mb-1">
              Applied AI / ML Engineering Curriculum
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Curated progression from foundational vector mathematics to on-device neural edge computing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {LEARNING_MODULES.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl glass-base border border-[var(--border-subtle)] hover:border-indigo-400/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-white/10 text-[var(--text-secondary)]">
                      {item.level}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-md font-bold ${
                        item.status === "Completed"
                          ? "bg-emerald-500/15 text-emerald-300"
                          : item.status === "Active Focus"
                          ? "bg-indigo-500/20 text-indigo-300"
                          : "bg-white/5 text-[var(--text-muted)]"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-[var(--text-primary)] mb-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[var(--border-subtle)]">
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-[var(--text-muted)]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: EXECUTION (AUSTRALIA 2027) */}
      {activeTab === "execution" && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl glass-base border border-[var(--border-subtle)]">
            <h3 className="text-base font-bold text-[var(--text-primary)] mb-1">
              Australia 2027 Master Execution Checklist
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Step-by-step verified action checklist for relocation, skills assessment, IELTS 8.0+, and direct visa sponsorship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {EXECUTION_STAGES.map((stage) => (
              <div
                key={stage.id}
                className="p-5 rounded-2xl glass-base border border-[var(--border-subtle)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono font-bold text-indigo-400 uppercase">
                      {stage.stage}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-[var(--text-secondary)]">
                      {stage.badge}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-[var(--text-primary)] mb-4">
                    {stage.title}
                  </h4>
                  <div className="space-y-2">
                    {stage.tasks.map((task) => (
                      <div
                        key={task.id}
                        className="flex items-start gap-2.5 text-xs text-[var(--text-secondary)]"
                      >
                        {task.done ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                        ) : (
                          <Circle className="w-4 h-4 text-[var(--text-muted)] mt-0.5 shrink-0" />
                        )}
                        <span className={task.done ? "line-through text-[var(--text-muted)]" : ""}>
                          {task.title}
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
    </div>
  );
}
