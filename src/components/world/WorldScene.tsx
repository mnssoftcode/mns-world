"use client";

import React, { useEffect, useState } from "react";
import { useMnsApp } from "@/lib/i18n/context";

export function WorldScene() {
  const { preferences } = useMnsApp();
  const isReduced = preferences.reducedMotionOverride;

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isReduced) return;

    let animationFrameId: number;
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized mouse coords (-1 to 1)
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;

      animationFrameId = requestAnimationFrame(() => {
        setMousePos({ x: nx, y: ny });
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isReduced]);

  const wallpaperUrl = preferences.customWallpaper || "";
  const blurVal = preferences.wallpaperBlur ?? 8;
  const dimVal = (preferences.wallpaperDim ?? 45) / 100;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Custom or Preset Wallpaper Image Layer */}
      {wallpaperUrl ? (
        <div className="absolute inset-0 transition-all duration-700">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-300"
            style={{
              backgroundImage: `url(${wallpaperUrl})`,
              filter: `blur(${blurVal}px) brightness(${1 - dimVal * 0.4})`,
              transform: isReduced
                ? "scale(1.05)"
                : `scale(1.08) translate3d(${mousePos.x * -8}px, ${mousePos.y * -8}px, 0)`,
            }}
          />
          {/* Wallpaper Dimming Tint based on theme */}
          <div
            className="absolute inset-0 transition-opacity duration-300"
            style={{
              backgroundColor: "var(--bg)",
              opacity: dimVal,
            }}
          />
        </div>
      ) : (
        /* Procedural Cosmic Nebula Gradient */
        <div
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            background: `radial-gradient(circle at ${50 + mousePos.x * 5}% ${25 + mousePos.y * 5}%, rgba(120, 130, 240, 0.12) 0%, transparent 60%),
                         radial-gradient(circle at ${80 - mousePos.x * 5}% ${80 - mousePos.y * 5}%, rgba(220, 90, 180, 0.08) 0%, transparent 50%),
                         radial-gradient(circle at 15% 75%, rgba(60, 180, 240, 0.07) 0%, transparent 55%),
                         var(--bg)`,
          }}
        />
      )}

      {/* Futuristic Perspective Grid Plane */}
      <div
        className="absolute inset-x-0 bottom-0 h-[45vh] game-grid-plane opacity-25"
        style={{
          transform: isReduced
            ? "perspective(600px) rotateX(60deg)"
            : `perspective(600px) rotateX(60deg) translateY(${mousePos.y * 10}px)`,
        }}
      />

      {/* Ambient Sci-Fi Light Orbs */}
      <div
        className={`absolute -top-32 -left-32 w-96 h-96 rounded-full blur-[100px] opacity-25 ${
          isReduced ? "" : "animate-glow"
        }`}
        style={{
          background: "radial-gradient(circle, rgba(130, 140, 255, 0.4) 0%, transparent 70%)",
          transform: isReduced ? "none" : `translate3d(${mousePos.x * 15}px, ${mousePos.y * 15}px, 0)`,
        }}
      />
      <div
        className={`absolute -bottom-36 -right-36 w-[28rem] h-[28rem] rounded-full blur-[110px] opacity-20 ${
          isReduced ? "" : "animate-glow"
        }`}
        style={{
          background: "radial-gradient(circle, rgba(220, 120, 180, 0.35) 0%, transparent 70%)",
          animationDelay: "4s",
          transform: isReduced ? "none" : `translate3d(${mousePos.x * -15}px, ${mousePos.y * -15}px, 0)`,
        }}
      />

      {/* Orbital Rings - Game World Horizon */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[760px] h-[760px] rounded-full border border-white/5 pointer-events-none opacity-40 transition-transform duration-300"
        style={{
          transform: isReduced
            ? "translate(-50%, -50%)"
            : `translate(calc(-50% + ${mousePos.x * -12}px), calc(-50% + ${mousePos.y * -12}px))`,
        }}
      >
        <div
          className={`w-full h-full rounded-full border border-dashed border-indigo-400/20 ${
            isReduced ? "" : "animate-orbital"
          }`}
        />
      </div>

      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1080px] h-[1080px] rounded-full border border-white/5 pointer-events-none opacity-20 transition-transform duration-300"
        style={{
          transform: isReduced
            ? "translate(-50%, -50%)"
            : `translate(calc(-50% + ${mousePos.x * 8}px), calc(-50% + ${mousePos.y * 8}px))`,
        }}
      >
        <div
          className={`w-full h-full rounded-full border border-dotted border-purple-400/20 ${
            isReduced ? "" : "animate-orbital-reverse"
          }`}
        />
      </div>

      {/* Micro Star Particles Layer */}
      <div
        className="absolute inset-0 opacity-40 transition-transform duration-200"
        style={{
          transform: isReduced
            ? "none"
            : `translate3d(${mousePos.x * 20}px, ${mousePos.y * 20}px, 0)`,
        }}
      >
        <div className="absolute top-[15%] left-[20%] w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
        <div className="absolute top-[24%] right-[22%] w-1 h-1 rounded-full bg-indigo-300/80 shadow-[0_0_6px_rgba(165,180,252,0.8)]" />
        <div className="absolute top-[68%] left-[12%] w-1.5 h-1.5 rounded-full bg-cyan-300/70 shadow-[0_0_8px_rgba(103,232,249,0.8)]" />
        <div className="absolute top-[75%] right-[16%] w-2 h-2 rounded-full bg-purple-400/70 shadow-[0_0_12px_rgba(192,132,252,0.9)]" />
        <div className="absolute top-[38%] left-[8%] w-1 h-1 rounded-full bg-white/50" />
        <div className="absolute top-[85%] left-[48%] w-1.5 h-1.5 rounded-full bg-pink-300/60" />
      </div>

      {/* Holographic Scanline Overlay */}
      <div className="absolute inset-0 scanline-overlay" />
    </div>
  );
}
