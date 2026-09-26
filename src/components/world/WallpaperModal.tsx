"use client";

import React, { useState } from "react";
import { useMnsApp } from "@/lib/i18n/context";
import { WALLPAPER_PRESETS } from "@/data/wallpapers";
import {
  Image as ImageIcon,
  Upload,
  Link as LinkIcon,
  X,
  Sparkles,
  Sliders,
  Check,
  RotateCcw,
} from "lucide-react";

interface WallpaperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WallpaperModal({ isOpen, onClose }: WallpaperModalProps) {
  const { preferences, setWallpaper, setWallpaperBlur, setWallpaperDim } = useMnsApp();

  const [customUrl, setCustomUrl] = useState("");
  const [urlError, setUrlError] = useState("");

  if (!isOpen) return null;

  const currentPreset = preferences.wallpaperPreset || "procedural";
  const currentBlur = preferences.wallpaperBlur ?? 8;
  const currentDim = preferences.wallpaperDim ?? 45;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 8 * 1024 * 1024) {
      setUrlError("Image size should be under 8MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setWallpaper(base64, "custom-upload");
      setUrlError("");
    };
    reader.readAsDataURL(file);
  };

  const handleApplyUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customUrl.trim()) return;
    setWallpaper(customUrl.trim(), "custom-url");
    setCustomUrl("");
    setUrlError("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <div className="w-full max-w-2xl glass-elevated rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl animate-card-pop max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)] mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-500/15 text-indigo-400">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[var(--text-primary)]">
                Game World Wallpaper & Environment
              </h2>
              <span className="text-xs text-[var(--text-muted)] font-mono">
                Select a preset, upload your wallpaper, or paste an image URL
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl glass-subtle text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Presets Grid */}
        <div className="mb-6">
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] block mb-3 font-semibold">
            Curated World Themes
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {WALLPAPER_PRESETS.map((preset) => {
              const isSelected = currentPreset === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => setWallpaper(preset.url, preset.id)}
                  className={`relative p-3.5 rounded-2xl text-left transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[105px] border overflow-hidden ${
                    isSelected
                      ? "bg-white/15 border-indigo-400/80 shadow-[0_0_20px_rgba(129,140,248,0.25)]"
                      : "glass-subtle border-[var(--border-subtle)] hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl select-none">{preset.thumbnail}</span>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-indigo-500 text-white flex items-center justify-center text-[10px]">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[var(--text-primary)] block truncate">
                      {preset.name}
                    </span>
                    <span className="text-[10px] text-[var(--text-muted)] line-clamp-1">
                      {preset.description}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom Upload & URL Input */}
        <div className="mb-6 p-4 rounded-2xl glass-subtle space-y-4">
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] block font-semibold">
            Add Your Own Custom Wallpaper
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* File Upload Button */}
            <label className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-dashed border-white/25 hover:border-white/50 glass-base text-xs font-medium text-[var(--text-primary)] cursor-pointer hover:bg-white/5 transition-all">
              <Upload className="w-4 h-4 text-indigo-400" />
              <span>Upload Image File</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            {/* URL Input */}
            <form onSubmit={handleApplyUrl} className="flex gap-2">
              <input
                type="url"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                placeholder="Paste Image URL..."
                className="flex-1 px-3 py-2 rounded-xl glass-base text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-1 focus:ring-indigo-400"
              />
              <button
                type="submit"
                className="px-3 py-2 rounded-xl bg-white text-black font-semibold text-xs hover:opacity-90 transition-opacity cursor-pointer shrink-0"
              >
                Apply
              </button>
            </form>
          </div>

          {urlError && <p className="text-xs text-rose-400">{urlError}</p>}
        </div>

        {/* Visual Adjustments: Blur & Dim Sliders */}
        <div className="mb-6 p-4 rounded-2xl glass-subtle space-y-4">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] font-semibold">
              Background Glass Adjustments
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Blur Slider */}
            <div>
              <div className="flex justify-between text-xs text-[var(--text-secondary)] mb-1">
                <span>Wallpaper Blur</span>
                <span className="font-mono">{currentBlur}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="25"
                value={currentBlur}
                onChange={(e) => setWallpaperBlur(parseInt(e.target.value))}
                className="w-full accent-indigo-400 cursor-pointer"
              />
              <span className="text-[10px] text-[var(--text-muted)]">
                Higher blur increases text readability over busy images.
              </span>
            </div>

            {/* Darkness / Dim Slider */}
            <div>
              <div className="flex justify-between text-xs text-[var(--text-secondary)] mb-1">
                <span>Overlay Dimming</span>
                <span className="font-mono">{currentDim}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="85"
                value={currentDim}
                onChange={(e) => setWallpaperDim(parseInt(e.target.value))}
                className="w-full accent-indigo-400 cursor-pointer"
              />
              <span className="text-[10px] text-[var(--text-muted)]">
                Darkens the wallpaper so glass cards stand out clearly.
              </span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={() => setWallpaper("", "procedural")}
            className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-white transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Default Scene</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-white text-black font-bold text-xs hover:opacity-90 transition-opacity cursor-pointer"
          >
            Save & Exit
          </button>
        </div>
      </div>
    </div>
  );
}
