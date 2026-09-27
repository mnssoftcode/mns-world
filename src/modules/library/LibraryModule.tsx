"use client";

import React, { useState } from "react";
import { LIBRARY_SITES } from "@/data/external-sites/library";
import { ExternalResourceCard } from "@/components/common/ExternalResourceCard";
import { useMnsApp } from "@/lib/i18n/context";
import { gameAudio } from "@/lib/sound";
import {
  BookOpen,
  Search,
  BookMarked,
  Microscope,
  Glasses,
  Scroll,
  Globe,
} from "lucide-react";

export function LibraryModule() {
  const { t, preferences } = useMnsApp();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const soundEnabled = preferences.soundFxEnabled ?? true;

  const categories = [
    { id: "All", label: "All Resources", icon: BookOpen },
    { id: "Books", label: "Books & Catalogs", icon: BookMarked },
    { id: "Research", label: "Scientific Research", icon: Microscope },
    { id: "Reading Tools", label: "Reading Tools", icon: Glasses },
    { id: "Public Domain", label: "Public Domain", icon: Scroll },
    { id: "Reference", label: "Reference & Directories", icon: Globe },
  ];

  const filteredResources = LIBRARY_SITES.filter((item) => {
    const matchesCat =
      selectedCategory === "All" ||
      item.category.toLowerCase() === selectedCategory.toLowerCase();

    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      item.name.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.tags?.some((t) => t.toLowerCase().includes(q));

    return matchesCat && matchesSearch;
  });

  return (
    <div className="w-full max-w-6xl mx-auto py-6 sm:py-10 px-4 sm:px-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-subtle mb-3 text-xs font-mono tracking-wider uppercase text-[var(--text-secondary)] border border-[var(--border-subtle)]">
          <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
          <span>Knowledge & Free Reading Index</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[var(--text-primary)] mb-2">
          {t("library.title")}
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-xl mx-auto">
          {t("library.subtitle")}
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-xl mx-auto mb-8">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("library.searchPlaceholder")}
            className="w-full pl-11 pr-4 py-3 rounded-2xl glass-base border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-indigo-400"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center justify-start sm:justify-center overflow-x-auto gap-2 mb-8 pb-2 border-b border-[var(--border-subtle)] scrollbar-none">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                gameAudio.playClick(soundEnabled);
                setSelectedCategory(cat.id);
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                isActive
                  ? "bg-white/20 text-[var(--text-primary)] border border-[var(--border-base)] shadow-sm"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/10"
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? "text-indigo-400" : "text-[var(--text-muted)]"}`} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Notice */}
      <div className="mb-6 px-4 py-2.5 rounded-xl glass-subtle text-[11px] text-[var(--text-muted)] font-mono text-center border border-[var(--border-subtle)]">
        {t("library.notice")}
      </div>

      {/* Resources Grid */}
      {filteredResources.length === 0 ? (
        <div className="p-12 text-center text-xs font-mono text-[var(--text-muted)]">
          No library resources match &quot;{searchQuery}&quot; in {selectedCategory}.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredResources.map((res) => (
            <ExternalResourceCard key={res.id} resource={res} />
          ))}
        </div>
      )}
    </div>
  );
}
