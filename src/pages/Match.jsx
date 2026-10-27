import { useState } from "react";
import { Sparkles, MapPin, Info, RotateCcw } from "lucide-react";
import { PSYCHOLOGISTS } from "../data/psychologists";
import {
  MATCH_CONCERNS,
  CONSULTATION_MODES,
  LANGUAGES,
  AVAILABILITY_OPTIONS,
} from "../data/constants";
import PsychologistCard from "../components/PsychologistCard";
import { rankPsychologists } from "../utils/matching";
import LoadingCards from "../components/LoadingCards";

const initialPrefs = {
  location: "",
  concern: "",
  mode: "",
  language: "",
  availability: "",
};

export default function Match() {
  const [prefs, setPrefs] = useState(initialPrefs);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  function update(key, value) {
    setPrefs((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setSubmitted(true);
    // Simulate smart matching calculation
    setTimeout(() => {
      const ranked = rankPsychologists(PSYCHOLOGISTS, prefs).slice(0, 5);
      setResults(ranked);
      setLoading(false);
    }, 550);
  }

  function handleReset() {
    setPrefs(initialPrefs);
    setSubmitted(false);
    setResults([]);
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 text-center max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-sage-100 px-3.5 py-1 text-xs font-semibold text-sage-800">
          <Sparkles size={13} className="text-sage-700" /> Smart Match Engine
        </span>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 font-heading sm:text-4xl">
          Find your best-fit psychologist
        </h1>
        <p className="mt-2 text-sm text-slate-500 leading-relaxed">
          Answer five quick questions to receive personalized demo practitioner recommendations
          matched to your unique concerns, preferred format, and schedule.
        </p>
      </div>

      {/* Advisory Callout */}
      <div className="mb-8 flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-white p-4.5 text-xs text-slate-600 shadow-subtle">
        <Info size={16} className="mt-0.5 shrink-0 text-sage-700" />
        <p className="leading-relaxed">
          <strong className="font-semibold text-slate-900">Prototype Disclaimer: </strong>
          Smart Match uses heuristic preference scoring for academic design demonstration. It is{" "}
          <strong>not a clinical assessment or medical triage system</strong>. If you are experiencing acute distress, please access our{" "}
          <a href="/emergency" className="font-semibold text-rose-700 underline hover:text-rose-900">
            Emergency Support
          </a>{" "}
          page.
        </p>
      </div>

      {!submitted ? (
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-card"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Preferred location */}
            <Field label="Your Preferred Location or Campus Area">
              <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 transition-colors focus-within:border-sage-400 focus-within:bg-white">
                <MapPin size={16} className="text-slate-400 shrink-0" />
                <input
                  type="text"
                  value={prefs.location}
                  onChange={(e) => update("location", e.target.value)}
                  placeholder="e.g. Koramangala, Bengaluru"
                  className="w-full border-none bg-transparent text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none"
                />
              </div>
            </Field>

            {/* Main concern */}
            <Field label="Primary Concern or Focus Area" required>
              <Select
                value={prefs.concern}
                onChange={(v) => update("concern", v)}
                options={MATCH_CONCERNS}
                placeholder="Select your main focus area"
                required
              />
            </Field>

            {/* Consultation mode */}
            <Field label="Preferred Consultation Format">
              <Select
                value={prefs.mode}
                onChange={(v) => update("mode", v)}
                options={CONSULTATION_MODES}
                placeholder="No format preference"
              />
            </Field>

            {/* Preferred language */}
            <Field label="Preferred Conversation Language">
              <Select
                value={prefs.language}
                onChange={(v) => update("language", v)}
                options={LANGUAGES}
                placeholder="No language preference"
              />
            </Field>

            {/* Availability */}
            <Field label="Timeline / Urgency Preference" className="sm:col-span-2">
              <Select
                value={prefs.availability}
                onChange={(v) => update("availability", v)}
                options={AVAILABILITY_OPTIONS}
                placeholder="Flexible timeline"
              />
            </Field>
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
            <p className="text-xs text-slate-400">Takes less than 30 seconds · No sign-up required</p>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-navy-900 px-6 py-3 text-xs font-semibold text-white shadow-soft transition-all hover:bg-navy-800 hover:shadow-card active:scale-[0.98]"
            >
              <Sparkles size={14} />
              Calculate Recommended Matches
            </button>
          </div>
        </form>
      ) : (
        <div>
          {/* Results Header Bar */}
          <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center border-b border-slate-200/70 pb-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-sage-700 font-heading">
                Match Results
              </span>
              <h2 className="mt-0.5 text-xl font-bold text-slate-900 font-heading">
                Your Top Recommended Practitioners
              </h2>
              <p className="mt-0.5 text-xs text-slate-500">
                Ranked using your focus on{" "}
                <span className="font-semibold text-slate-700">{prefs.concern || "General Support"}</span>
                {prefs.location && ` near ${prefs.location}`}.
              </p>
            </div>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-subtle hover:bg-slate-50 transition-colors"
            >
              <RotateCcw size={13} />
              Adjust Preferences
            </button>
          </div>

          {loading ? (
            <LoadingCards count={3} />
          ) : (
            <div className="grid gap-5">
              {results.map(({ psychologist, reason }) => (
                <PsychologistCard
                  key={psychologist.id}
                  psychologist={psychologist}
                  matchReason={reason}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Field({ label, children, required, className = "" }) {
  return (
    <div className={className}>
      <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-600 font-heading">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      {children}
    </div>
  );
}

function Select({ value, onChange, options, placeholder, required }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs font-medium text-slate-800 shadow-subtle transition-colors focus:border-sage-400 focus:bg-white focus:outline-none"
    >
      <option value="">{placeholder}</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}
