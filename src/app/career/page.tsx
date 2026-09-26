import { CareerModule } from "@/modules/career/CareerModule";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Career Command Center — MnsWorld",
  description: "Master roadmap from Software Engineer to AI/ML Engineer in Australia.",
};

export default function CareerPage() {
  return <CareerModule />;
}
