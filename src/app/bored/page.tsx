import { EnjoyModule } from "@/modules/enjoy/EnjoyModule";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enjoy & I'm Bored — MnsWorld",
  description: "Turn boredom into one concrete next action.",
};

export default function BoredPage() {
  return <EnjoyModule />;
}
