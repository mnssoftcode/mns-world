import { LibraryModule } from "@/modules/library/LibraryModule";

export const metadata = {
  title: "Library — MnsWorld",
  description: "Directory of free public domain classics, open repositories, and reading utilities.",
};

export default function LibraryPage() {
  return <LibraryModule />;
}
