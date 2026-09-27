import { JaipurMissionModule } from "@/modules/jaipur/JaipurMissionModule";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jaipur 90-Day Mission — MnsWorld",
  description: "3-Month Mission: IELTS, AI/ML engineering, interview prep, routine discipline, and independent living preparation.",
};

export default function JaipurPage() {
  return <JaipurMissionModule />;
}
