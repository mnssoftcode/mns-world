import Link from "next/link";
import { Compass, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
      <div className="glass-strong rounded-3xl p-8 sm:p-12 max-w-md border border-white/10 shadow-2xl">
        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4 text-white">
          <Compass className="w-6 h-6 text-indigo-400" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Portal Not Found</h1>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] mb-6">
          The requested coordinate does not exist in MnsWorld.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-xs hover:opacity-90 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to World</span>
        </Link>
      </div>
    </div>
  );
}
