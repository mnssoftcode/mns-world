import { SettingsModule } from "@/modules/settings/SettingsModule";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings — MnsWorld",
  description: "Manage system preferences, localization, appearance, and local data backups.",
};

export default function SettingsPage() {
  return <SettingsModule />;
}
