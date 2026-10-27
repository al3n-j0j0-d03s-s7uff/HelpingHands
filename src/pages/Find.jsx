import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, MapPin, SlidersHorizontal, SearchX, RotateCcw } from "lucide-react";
import { PSYCHOLOGISTS } from "../data/psychologists";
import {
  SPECIALIZATIONS,
  LANGUAGES,
  CONSULTATION_MODES,
  AVAILABILITY_OPTIONS,
  PRICE_RANGES,
  SORT_OPTIONS,
} from "../data/constants";
import PsychologistCard from "../components/PsychologistCard";
import EmptyState from "../components/EmptyState";
import LoadingCards from "../components/LoadingCards";

const defaultFilters = {
  specialization: "",
  availability: "",
  mode: "",
  language: "",
  price: "any",
};

export default function Find() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [location, setLocation] = useState(searchParams.get("loc") || "");
  const [filters, setFilters] = useState(defaultFilters);
  const [sort, setSort] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  // Sync url param if user navigated with ?q=
  useEffect(() => {
    const q = searchParams.get("q");
    if (q) setQuery(q);
    const loc = searchParams.get("loc");
    if (loc) setLocation(loc);
  }, [searchParams]);

  // Simulate a brief loading state whenever search terms change
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 380);
    return () => clearTimeout(timer);
  }, [query, location, filters, sort]);

  function updateFilter(key, value) {
    setFilters((prev) => ({ ...prev, [key]: prev[key] === value ? "" : value }));
  }

  function clearFilters() {
    setFilters(defaultFilters);
  }

  function handleUseMyLocation() {
    setLocation("Bengaluru, Karnataka (Campus Demo)");
  }

  function handleSubmit(e) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (location) params.set("loc", location);
    setSearchParams(params);
  }

  const activeFilterCount = Object.entries(filters).filter(
    ([k, v]) => v && !(k === "price" && v === "any")
  ).length;

  const results = useMemo(() => {
    const priceRange =
      PRICE_RANGES.find((p) => p.id === filters.price) || PRICE_RANGES[0];

    let list = PSYCHOLOGISTS.filter((p) => {
      const matchesQuery =
        !query ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.specializations.some((s) =>
          s.toLowerCase().includes(query.toLowerCase())
        );

      const matchesSpecialization =
        !filters.specialization ||
        p.specializations.includes(filters.specialization);

      const matchesAvailability =
        !filters.availability || p.availability === filters.availability;

      const matchesMode = !filters.mode || p.modes.includes(filters.mode);

      const matchesLanguage =
        !filters.language || p.languages.includes(filters.language);

      const matchesPrice = p.fee >= priceRange.min && p.fee <= priceRange.max;

      return (
        matchesQuery &&
        matchesSpecialization &&
        matchesAvailability &&
        matchesMode &&
        matchesLanguage &&
        matchesPrice
      );
    });

    const availabilityRank = {
      "Available today": 0,
      "Available this week": 1,
      "Available next week": 2,
    };

    switch (sort) {
      case "distance":
        list = [...list].sort((a, b) => a.distanceKm - b.distanceKm);
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      case "availability":
        list = [...list].sort(
          (a, b) => availabilityRank[a.availability] - availabilityRank[b.availability]
        );
        break;
      default:
        list = [...list].sort(
          (a, b) => (b.rating - b.distanceKm * 0.05) - (a.rating - a.distanceKm * 0.05)
        );
    }

    return list;
  }, [query, filters, sort]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-sage-700 font-heading">
          Directory
        </span>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900 font-heading sm:text-4xl">
          Find a Psychologist
        </h1>
        <p className="mt-1.5 text-sm text-slate-500 max-w-2xl">
          Filter verified demo profiles by campus proximity, clinical focus, language, and session fee.
        </p>
      </div>

      {/* Dual Search Bar */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 rounded-2xl border border-slate-200/90 bg-white p-2.5 shadow-card sm:flex-row sm:items-center"
      >
        <div className="flex flex-1 items-center gap-2.5 rounded-xl px-3.5 py-2.5 sm:border-r sm:border-slate-100">
          <Search size={18} className="text-slate-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by practitioner name or specialization..."
            className="w-full border-none bg-transparent text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
            aria-label="Search by name or specialization"
          />
        </div>
        <div className="flex flex-1 items-center gap-2.5 rounded-xl px-3.5 py-2.5">
          <MapPin size={18} className="text-slate-400 shrink-0" />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter campus, neighborhood or city..."
            className="w-full border-none bg-transparent text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
            aria-label="Enter your location"
          />
          <button
            type="button"
            onClick={handleUseMyLocation}
            className="shrink-0 whitespace-nowrap text-xs font-semibold text-sage-700 hover:text-sage-900 transition-colors"
          >
            Nearby
          </button>
        </div>
        <button
          type="button"
          onClick={() => setShowFilters((v) => !v)}
          className="flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 sm:hidden"
        >
          <SlidersHorizontal size={15} /> Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
        </button>
        <button
          type="submit"
          className="rounded-full bg-navy-900 px-6 py-3 text-sm font-semibold text-white shadow-subtle transition-all hover:bg-navy-800 active:scale-[0.98]"
        >
          Search
        </button>
      </form>

      {/* Main Grid: Sidebar + Results */}
      <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr] items-start">
        {/* Filters sidebar */}
        <aside
          className={`${
            showFilters ? "block" : "hidden"
          } lg:block lg:sticky lg:top-24 rounded-2xl border border-slate-200/80 bg-white p-5.5 shadow-soft`}
        >
          <div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-3.5">
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={15} className="text-slate-600" />
              <h2 className="text-sm font-bold text-slate-900 font-heading">Filters</h2>
              {activeFilterCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sage-100 text-[11px] font-bold text-sage-800">
                  {activeFilterCount}
                </span>
              )}
            </div>
            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 text-xs font-semibold text-sage-700 hover:text-sage-900 transition-colors"
              >
                <RotateCcw size={12} /> Reset
              </button>
            )}
          </div>

          <div className="space-y-5 text-sm">
            {/* Specialization */}
            <FilterGroup label="Specialization">
              <div className="flex flex-wrap gap-1.5">
                {SPECIALIZATIONS.map((s) => (
                  <FilterChip
                    key={s}
                    label={s}
                    active={filters.specialization === s}
                    onClick={() => updateFilter("specialization", s)}
                  />
                ))}
              </div>
            </FilterGroup>

            {/* Availability */}
            <FilterGroup label="Availability">
              <div className="flex flex-col gap-2">
                {AVAILABILITY_OPTIONS.map((a) => (
                  <RadioRow
                    key={a}
                    label={a}
                    checked={filters.availability === a}
                    onChange={() => updateFilter("availability", a)}
                    name="availability"
                  />
                ))}
              </div>
            </FilterGroup>

            {/* Consultation Mode */}
            <FilterGroup label="Consultation mode">
              <div className="flex flex-col gap-2">
                {CONSULTATION_MODES.map((m) => (
                  <RadioRow
                    key={m}
                    label={m}
                    checked={filters.mode === m}
                    onChange={() => updateFilter("mode", m)}
                    name="mode"
                  />
                ))}
              </div>
            </FilterGroup>

            {/* Language */}
            <FilterGroup label="Language">
              <div className="flex flex-wrap gap-1.5">
                {LANGUAGES.map((l) => (
                  <FilterChip
                    key={l}
                    label={l}
                    active={filters.language === l}
                    onClick={() => updateFilter("language", l)}
                  />
                ))}
              </div>
            </FilterGroup>

            {/* Price Range */}
            <FilterGroup label="Session fee" last>
              <div className="flex flex-col gap-2">
                {PRICE_RANGES.map((p) => (
                  <RadioRow
                    key={p.id}
                    label={p.label}
                    checked={filters.price === p.id}
                    onChange={() => setFilters((prev) => ({ ...prev, price: p.id }))}
                    name="price"
                  />
                ))}
              </div>
            </FilterGroup>
          </div>
        </aside>

        {/* Results column */}
        <div>
          {/* Controls Bar */}
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/70 pb-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 font-heading">
              {loading ? (
                "Scanning available practitioners..."
              ) : (
                <>
                  <span className="text-slate-900 font-bold">{results.length}</span> verified{" "}
                  {results.length === 1 ? "profile" : "profiles"} available
                </>
              )}
            </p>

            <label className="flex items-center gap-2 text-xs font-medium text-slate-600">
              <span>Sort by</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-subtle focus:border-sage-400 focus:outline-none"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {/* List / Loading / Empty */}
          {loading ? (
            <LoadingCards count={4} />
          ) : results.length === 0 ? (
            <EmptyState
              icon={SearchX}
              title="No matching psychologists found"
              description="Try softening your filters or searching by a broader concern. You can also clear all active filters to view all available demo profiles."
              action={
                <button
                  onClick={() => {
                    clearFilters();
                    setQuery("");
                  }}
                  className="rounded-full bg-navy-900 px-5 py-2.5 text-xs font-semibold text-white shadow-soft hover:bg-navy-800"
                >
                  Clear search & filters
                </button>
              }
            />
          ) : (
            <div className="grid gap-5 sm:grid-cols-2">
              {results.map((p) => (
                <PsychologistCard key={p.id} psychologist={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ label, children, last }) {
  return (
    <div className={`${last ? "" : "border-b border-slate-100 pb-4"}`}>
      <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 font-heading">
        {label}
      </p>
      {children}
    </div>
  );
}

function FilterChip({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-2.5 py-1 text-xs font-medium transition-all ${
        active
          ? "border-sage-700 bg-sage-700 text-white shadow-subtle"
          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
      }`}
    >
      {label}
    </button>
  );
}

function RadioRow({ label, checked, onChange, name }) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-xs font-medium text-slate-700 hover:text-slate-900">
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        className="h-3.5 w-3.5 accent-sage-700"
      />
      <span>{label}</span>
    </label>
  );
}
