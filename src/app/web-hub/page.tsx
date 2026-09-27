import { WebHubModule } from "@/modules/web-hub/WebHubModule";

export const metadata = {
  title: "Web Hub — MnsWorld",
  description: "Curated launchpad for everyday web services, developer tools, and travel.",
};

export default function WebHubPage() {
  return <WebHubModule />;
}
