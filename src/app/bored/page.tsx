import { BoredModule } from "@/modules/bored/BoredModule";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "I'm Bored — MnsWorld",
  description: "Turn boredom into one concrete next action.",
};

export default function BoredPage() {
  return <BoredModule />;
}
