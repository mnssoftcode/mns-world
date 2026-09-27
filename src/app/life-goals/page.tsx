import { LifeGoalsModule } from "@/modules/goals/LifeGoalsModule";

export const metadata = {
  title: "Life Goals — MnsWorld",
  description: "Define your horizon, track daily habits, and steer your life direction.",
};

export default function LifeGoalsPage() {
  return <LifeGoalsModule />;
}
