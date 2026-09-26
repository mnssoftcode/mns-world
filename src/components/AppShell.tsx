"use client";

import React from "react";
import { MnsAppProvider, useMnsApp } from "@/lib/i18n/context";
import { Navbar } from "@/components/navigation/Navbar";
import { WorldScene } from "@/components/world/WorldScene";
import { GameHUD } from "@/components/world/GameHUD";
import { OnboardingModal } from "@/modules/onboarding/OnboardingModal";

function AppContent({ children }: { children: React.ReactNode }) {
  const { needsOnboarding, isLoaded } = useMnsApp();

  return (
    <div className="relative min-h-screen flex flex-col selection:bg-white/20 selection:text-white">
      <WorldScene />
      <GameHUD />
      <Navbar />
      <main className="relative z-10 flex-1 flex flex-col">
        {children}
      </main>
      {isLoaded && needsOnboarding && <OnboardingModal />}
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <MnsAppProvider>
      <AppContent>{children}</AppContent>
    </MnsAppProvider>
  );
}
