import { FocusModule } from "@/modules/focus/FocusModule";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Focus Now — MnsWorld",
  description: "Minimalist, zero-friction timestamp interval timer for deep work.",
};

export default function FocusPage() {
  return <FocusModule />;
}
