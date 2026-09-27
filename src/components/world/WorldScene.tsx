"use client";

import React from "react";
import { useMnsApp } from "@/lib/i18n/context";

export function WorldScene() {
  const { preferences, isLoaded } = useMnsApp();

  const wallpaperUrl = isLoaded ? preferences.customWallpaper || "" : "";
  const blurVal = Math.min(preferences.wallpaperBlur ?? 6, 12);
  const dimVal = (preferences.wallpaperDim ?? 40) / 100;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none" aria-hidden="true">
      {/* Custom or Preset Wallpaper Image Layer */}
      {wallpaperUrl ? (
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${wallpaperUrl})`,
              filter: `blur(${blurVal}px) brightness(${1 - dimVal * 0.35})`,
            }}
          />
          {/* Wallpaper Dimming Tint based on theme */}
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: "var(--bg)",
              opacity: dimVal,
            }}
          />
        </div>
      ) : (
        /* Calm, Restrained Atmospheric Gradient - Pure CSS, zero JS calculations */
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 50% 15%, rgba(120, 130, 240, 0.08) 0%, transparent 50%),
                         radial-gradient(circle at 85% 75%, rgba(180, 120, 220, 0.05) 0%, transparent 45%),
                         radial-gradient(circle at 15% 65%, rgba(60, 180, 240, 0.04) 0%, transparent 45%),
                         var(--bg)`,
          }}
        />
      )}

      {/* Clean, Subtle Static Horizon / Grid */}
      <div className="absolute inset-x-0 bottom-0 h-64 game-grid-plane opacity-10" />

      {/* Static Subtle Ambient Light Accents - No Infinite Keyframes or Transforms */}
      <div
        className="absolute -top-24 -left-24 w-80 h-80 rounded-full opacity-15"
        style={{
          background: "radial-gradient(circle, rgba(130, 140, 255, 0.3) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, rgba(220, 120, 180, 0.25) 0%, transparent 70%)",
        }}
      />

      {/* Minimal Static Orbital Ring Lines for Architectural Depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] rounded-full border border-white/[0.04] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1040px] h-[1040px] rounded-full border border-white/[0.02] pointer-events-none" />
    </div>
  );
}
