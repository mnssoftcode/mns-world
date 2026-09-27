import { CareerModule } from "@/modules/career/CareerModule";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Focus Now — Career Execution — MnsWorld",
  description: "Minimalist, zero-friction timestamp interval timer for deep work.",
};

export default function FocusPage() {
  return <CareerModule initialTab="focus" />;
}
