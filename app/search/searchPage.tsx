import { SearchTabs } from "@/components/search/search-tabs";
import Link from "next/link";

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="text-2xl font-semibold text-slate-600 underline"
              >
                Accueil
              </Link>
              <span className="text-slate-300">•</span>
              <h1 className="text-2xl font-semibold text-slate-800">
                Recherche
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <SearchTabs />
      </main>
    </div>
  );
}
