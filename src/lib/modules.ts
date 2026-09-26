import { MnsWorldModule } from "@/types";

export const APP_MODULES: MnsWorldModule[] = [
  {
    id: "bored",
    route: "/bored",
    titleKey: "home.boredTitle",
    descriptionKey: "home.boredDesc",
    icon: "Sparkles",
    badge: "118 Activities",
    enabled: true,
  },
  {
    id: "career",
    route: "/career",
    titleKey: "home.careerTitle",
    descriptionKey: "home.careerDesc",
    icon: "Compass",
    badge: "15 Phases",
    enabled: true,
  },
  {
    id: "focus",
    route: "/focus",
    titleKey: "home.focusTitle",
    descriptionKey: "home.focusDesc",
    icon: "Timer",
    badge: "Timestamp Engine",
    enabled: true,
  },
  {
    id: "settings",
    route: "/settings",
    titleKey: "home.settingsTitle",
    descriptionKey: "home.settingsDesc",
    icon: "Sliders",
    badge: "Local-First",
    enabled: true,
  },
];
