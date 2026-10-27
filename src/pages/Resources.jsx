import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, BookX, Clock, ArrowRight } from "lucide-react";
import { RESOURCES } from "../data/resources";
import { RESOURCE_CATEGORIES } from "../data/constants";
import EmptyState from "../components/EmptyState";

export default function Resources() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    return RESOURCES.filter((r) => {
      const matchesCategory = category === "All" || r.category === category;
      const matchesQuery =
        !query ||
        r.title.toLowerCase().includes(query.toLowerCase()) ||
        r.summary.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-sage-700 font-heading">
          Knowledge Base
        </span>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900 font-heading sm:text-4xl">
          Mental Wellness Resources
        </h1>
        <p className="mt-1.5 max-w-2xl text-sm text-slate-500 leading-relaxed">
          Grounded, student-focused reads on navigating academic burnout, sleep disruption,
          exam anxiety, and understanding when to seek specialized clinical care.
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-2.5 rounded-2xl border border-slate-200/90 bg-white px-4 py-3 shadow-subtle focus-within:border-sage-400">
          <Search size={18} className="text-slate-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search guides by title or concern (e.g. sleep, exams, burnout)..."
            className="w-full border-none bg-transparent text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none"
            aria-label="Search resources"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="mt-5 flex flex-wrap gap-1.5">
        {["All", ...RESOURCE_CATEGORIES].map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all ${
              category === c
                ? "border-navy-900 bg-navy-900 text-white shadow-subtle"
                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="mt-8">
        {filtered.length === 0 ? (
          <EmptyState
            icon={BookX}
            title="No wellness guides found"
            description="Try searching with a broader keyword or switch back to the 'All' category filter."
            action={
              <button
                onClick={() => {
                  setCategory("All");
                  setQuery("");
                }}
                className="rounded-full bg-navy-900 px-5 py-2.5 text-xs font-semibold text-white shadow-soft hover:bg-navy-800"
              >
                Reset filters
              </button>
            }
          />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((r) => (
              <Link
                key={r.id}
                to={`/resources/${r.id}`}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-soft transition-all duration-200 hover:border-slate-300 hover:shadow-card"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full bg-sage-50 px-2.5 py-0.5 text-[11px] font-medium text-sage-800 border border-sage-200/60">
                      {r.category}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-slate-400">
                      <Clock size={11} /> 3 min read
                    </span>
                  </div>

                  <h3 className="mt-3.5 text-sm font-bold text-slate-900 font-heading group-hover:text-navy-900 transition-colors">
                    {r.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-500 line-clamp-3">
                    {r.summary}
                  </p>
                </div>

                <div className="mt-5 border-t border-slate-100 pt-3 flex items-center justify-between text-xs font-semibold text-sage-700">
                  <span>Read full guide</span>
                  <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
