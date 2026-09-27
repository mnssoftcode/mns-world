"use client";

import React from "react";
import { ExternalResource } from "@/types";
import { ExternalLink, Star } from "lucide-react";
import { useMnsApp } from "@/lib/i18n/context";
import { gameAudio } from "@/lib/sound";

interface Props {
  resource: ExternalResource;
}

export function ExternalResourceCard({ resource }: Props) {
  const { preferences } = useMnsApp();
  const soundEnabled = preferences.soundFxEnabled ?? true;

  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => gameAudio.playClick(soundEnabled)}
      className="group relative p-5 rounded-2xl glass-base hover:glass-strong border border-[var(--border-subtle)] hover:border-indigo-400/40 transition-colors duration-150 flex flex-col justify-between text-left select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-mono font-bold tracking-wider text-indigo-400">
              {resource.category}
            </span>
            {resource.featured && (
              <span className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/20">
                <Star className="w-2.5 h-2.5 fill-amber-300" />
                Featured
              </span>
            )}
          </div>
          <div className="p-1.5 rounded-lg bg-white/5 text-[var(--text-muted)] group-hover:text-[var(--text-primary)] group-hover:bg-white/10 transition-colors">
            <ExternalLink className="w-4 h-4" />
          </div>
        </div>

        <h3 className="text-base font-bold text-[var(--text-primary)] mb-1.5 group-hover:text-indigo-300 transition-colors">
          {resource.name}
        </h3>
        <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
          {resource.description}
        </p>
      </div>

      {resource.tags && resource.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-[var(--border-subtle)]">
          {resource.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-[var(--text-muted)] group-hover:text-[var(--text-secondary)] transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </a>
  );
}
