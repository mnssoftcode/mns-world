"use client";

import React, { useState, useEffect } from "react";
import { ExternalResource, CustomExternalLink } from "@/types";
import { TRAVEL_SITES } from "@/data/external-sites/travel";
import { PROJECT_SITES } from "@/data/external-sites/projects";
import { DEVELOPER_SITES } from "@/data/external-sites/developer";
import { EVERYDAY_TOOLS } from "@/data/external-sites/tools";
import { storageRepository } from "@/lib/storage";
import { ExternalResourceCard } from "@/components/common/ExternalResourceCard";
import { useMnsApp } from "@/lib/i18n/context";
import { gameAudio } from "@/lib/sound";
import {
  Globe,
  Search,
  Plus,
  Plane,
  FolderGit2,
  Code2,
  Wrench,
  Bookmark,
  Trash2,
} from "lucide-react";

const BUILTIN_RESOURCES: ExternalResource[] = [
  ...TRAVEL_SITES,
  ...PROJECT_SITES,
  ...DEVELOPER_SITES,
  ...EVERYDAY_TOOLS,
];

export function WebHubModule() {
  const { t, preferences, awardXp } = useMnsApp();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [customLinks, setCustomLinks] = useState<CustomExternalLink[]>(() => storageRepository.getCustomLinks());
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // Form
  const [linkName, setLinkName] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [linkCategory, setLinkCategory] = useState("Developer");
  const [linkDesc, setLinkDesc] = useState("");

  const soundEnabled = preferences.soundFxEnabled ?? true;

  useEffect(() => {
    const handleUpdate = () => {
      setCustomLinks(storageRepository.getCustomLinks());
    };
    window.addEventListener("mnsworld:custom-links:updated", handleUpdate);
    return () => window.removeEventListener("mnsworld:custom-links:updated", handleUpdate);
  }, []);

  const handleAddCustomLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!linkName.trim() || !linkUrl.trim()) return;

    let formattedUrl = linkUrl.trim();
    if (!/^https?:\/\//i.test(formattedUrl)) {
      formattedUrl = "https://" + formattedUrl;
    }

    const updated = storageRepository.addCustomLink({
      name: linkName.trim(),
      url: formattedUrl,
      category: linkCategory,
      description: linkDesc.trim() || "User added custom launcher bookmark.",
    });

    setCustomLinks(updated);
    setLinkName("");
    setLinkUrl("");
    setLinkDesc("");
    setShowAddModal(false);
    awardXp(15, "Custom Web Launcher Saved");
  };

  const handleDeleteCustomLink = (id: string) => {
    gameAudio.playClick(soundEnabled);
    const updated = storageRepository.deleteCustomLink(id);
    setCustomLinks(updated);
  };

  // Convert custom links to ExternalResource format
  const customAsResources: ExternalResource[] = customLinks.map((cl) => ({
    id: cl.id,
    category: cl.category || "Custom",
    name: cl.name,
    description: cl.description || "Custom external web bookmark",
    url: cl.url,
    tags: ["custom"],
  }));

  const allResources = [...BUILTIN_RESOURCES, ...customAsResources];

  const categories = [
    { id: "All", label: "All Tools", icon: Globe },
    { id: "Travel", label: "Travel & Relocation", icon: Plane },
    { id: "Projects", label: "Projects & Deploy", icon: FolderGit2 },
    { id: "Developer", label: "Developer Toolbox", icon: Code2 },
    { id: "Everyday Tools", label: "Everyday Utilities", icon: Wrench },
    { id: "Custom", label: "My Custom Links", icon: Bookmark },
  ];

  const filteredResources = allResources.filter((item) => {
    const matchesCat =
      selectedCategory === "All" ||
      (selectedCategory === "Custom"
        ? item.tags?.includes("custom")
        : item.category.toLowerCase() === selectedCategory.toLowerCase());

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
          <Globe className="w-3.5 h-3.5 text-indigo-400" />
          <span>Curated External Launchpad</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[var(--text-primary)] mb-2">
          {t("webHub.title")}
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-xl mx-auto">
          {t("webHub.subtitle")}
        </p>
      </div>

      {/* Search & Actions Bar */}
      <div className="max-w-2xl mx-auto mb-8 flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("webHub.searchPlaceholder")}
            className="w-full pl-11 pr-4 py-3 rounded-2xl glass-base border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-indigo-400"
          />
        </div>

        <button
          onClick={() => {
            gameAudio.playClick(soundEnabled);
            setShowAddModal(true);
          }}
          className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Add Bookmark</span>
        </button>
      </div>

      {/* Category Pills */}
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

      {/* Disclaimer Notice */}
      <div className="mb-6 px-4 py-2.5 rounded-xl glass-subtle text-[11px] text-[var(--text-muted)] font-mono text-center border border-[var(--border-subtle)]">
        {t("webHub.disclaimer")}
      </div>

      {/* Resources Grid */}
      {filteredResources.length === 0 ? (
        <div className="p-12 text-center text-xs font-mono text-[var(--text-muted)]">
          No external websites match &quot;{searchQuery}&quot; in {selectedCategory}.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredResources.map((res) => (
            <div key={res.id} className="relative group">
              <ExternalResourceCard resource={res} />
              {res.tags?.includes("custom") && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleDeleteCustomLink(res.id);
                  }}
                  className="absolute top-3 right-10 p-1 rounded-md text-[var(--text-muted)] hover:text-rose-400 hover:bg-white/10 transition-colors z-10 cursor-pointer"
                  title="Delete bookmark"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add Custom Bookmark Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md glass-elevated rounded-3xl p-6 sm:p-8 border border-[var(--border-base)] shadow-2xl">
            <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">
              Add Custom Web Bookmark
            </h3>
            <form onSubmit={handleAddCustomLink} className="space-y-4">
              <div>
                <label className="text-xs text-[var(--text-secondary)] uppercase font-mono block mb-1">
                  Service Name
                </label>
                <input
                  type="text"
                  required
                  value={linkName}
                  onChange={(e) => setLinkName(e.target.value)}
                  placeholder="e.g. My Australian Bank"
                  className="w-full bg-white/5 border border-[var(--border-subtle)] rounded-xl px-4 py-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:border-indigo-400"
                />
              </div>

              <div>
                <label className="text-xs text-[var(--text-secondary)] uppercase font-mono block mb-1">
                  Website URL
                </label>
                <input
                  type="text"
                  required
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full bg-white/5 border border-[var(--border-subtle)] rounded-xl px-4 py-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:border-indigo-400"
                />
              </div>

              <div>
                <label className="text-xs text-[var(--text-secondary)] uppercase font-mono block mb-1">
                  Category
                </label>
                <select
                  value={linkCategory}
                  onChange={(e) => setLinkCategory(e.target.value)}
                  className="w-full bg-[var(--surface-elevated)] border border-[var(--border-subtle)] text-xs rounded-xl px-3 py-2.5 text-[var(--text-secondary)] focus:outline-none"
                >
                  <option value="Travel">Travel</option>
                  <option value="Projects">Projects</option>
                  <option value="Developer">Developer</option>
                  <option value="Everyday Tools">Everyday Tools</option>
                  <option value="Custom">Custom</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-[var(--text-secondary)] uppercase font-mono block mb-1">
                  Description (Optional)
                </label>
                <input
                  type="text"
                  value={linkDesc}
                  onChange={(e) => setLinkDesc(e.target.value)}
                  placeholder="Brief description of what you use this site for"
                  className="w-full bg-white/5 border border-[var(--border-subtle)] rounded-xl px-4 py-2.5 text-sm text-[var(--text-primary)] focus:outline-none focus:border-indigo-400"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--border-subtle)]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-[var(--text-secondary)] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs"
                >
                  Save Bookmark
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
