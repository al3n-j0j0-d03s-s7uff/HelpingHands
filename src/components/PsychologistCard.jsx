import { Link } from "react-router-dom";
import { MapPin, Video, Phone, Users, Clock, IndianRupee, Sparkles } from "lucide-react";
import RatingStars from "./RatingStars";

const modeConfig = {
  "In-person": { icon: Users, label: "In-person" },
  "Video call": { icon: Video, label: "Video" },
  "Phone call": { icon: Phone, label: "Phone" },
};

export default function PsychologistCard({ psychologist, matchReason }) {
  const p = psychologist;

  return (
    <article className="group flex flex-col justify-between rounded-2xl border border-slate-200/85 bg-white p-6 shadow-soft transition-all duration-200 hover:border-slate-300 hover:shadow-card">
      <div>
        {/* Header: Avatar & Info */}
        <div className="flex items-start gap-4">
          <div className="relative shrink-0">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sage-100 to-sage-200/80 text-base font-bold text-navy-950 shadow-sm ring-1 ring-sage-300/60">
              {p.image}
            </span>
            <span
              className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500"
              title="Verified Active Practitioner"
            />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center justify-between gap-1">
              <h3 className="text-base font-bold text-slate-900 tracking-tight font-heading group-hover:text-navy-900 transition-colors">
                {p.name}
              </h3>
              <RatingStars rating={p.rating} reviewCount={p.reviewCount} size={13} />
            </div>
            <p className="mt-0.5 text-xs text-slate-500 font-medium">
              {p.title} · <span className="text-slate-600">{p.experienceYears} yrs exp</span>
            </p>
          </div>
        </div>

        {/* Specialization tags */}
        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {p.specializations.map((s) => (
            <span
              key={s}
              className="rounded-full bg-sage-50/90 px-2.5 py-0.5 text-[11px] font-medium text-sage-800 border border-sage-200/60"
            >
              {s}
            </span>
          ))}
        </div>

        {/* Location & Availability info */}
        <div className="mt-3.5 grid grid-cols-1 gap-1.5 text-xs text-slate-600 sm:grid-cols-2">
          <span className="flex items-center gap-1.5 truncate">
            <MapPin size={13} className="text-sage-600 shrink-0" />
            <span className="truncate">{p.location} ({p.distanceKm} km)</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={13} className="text-sage-600 shrink-0" />
            <span className="font-medium text-slate-700">{p.availability}</span>
          </span>
        </div>

        {/* Consultation Mode Badges */}
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          {p.modes.map((m) => {
            const config = modeConfig[m] || { icon: Users, label: m };
            const Icon = config.icon;
            return (
              <span
                key={m}
                className="flex items-center gap-1 rounded-md bg-slate-100/80 px-2 py-0.5 text-[11px] font-medium text-slate-600 border border-slate-200/60"
              >
                <Icon size={11} className="text-slate-500" />
                <span>{config.label}</span>
              </span>
            );
          })}
        </div>

        {/* Match reason (if provided by Smart Match) */}
        {matchReason && (
          <div className="mt-4 flex items-start gap-2 rounded-xl bg-sage-50/80 border border-sage-200/80 p-2.5 text-xs text-sage-900">
            <Sparkles size={14} className="mt-0.5 text-sage-700 shrink-0" />
            <p className="leading-relaxed">
              <strong className="font-semibold text-sage-950">Match insight: </strong>
              {matchReason}
            </p>
          </div>
        )}
      </div>

      {/* Footer: Fee & Action Buttons */}
      <div className="mt-5 border-t border-slate-100 pt-4">
        <div className="flex items-center justify-between gap-2">
          <div>
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">Session fee</span>
            <div className="flex items-center text-sm font-bold text-slate-900">
              <IndianRupee size={13} className="text-slate-700" />
              <span>{p.fee}</span>
              <span className="ml-1 text-[11px] font-normal text-slate-500">/ 50 mins</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/psychologist/${p.id}`}
              className="rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition-all hover:border-navy-900 hover:text-navy-900 active:scale-[0.98]"
            >
              Profile
            </Link>
            <Link
              to={`/book/${p.id}`}
              className="inline-flex items-center justify-center rounded-full border border-navy-900 bg-navy-900 px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-transparent hover:text-navy-900 active:scale-[0.98]"
            >
              Book Session
            </Link>
          </div>
        </div>

        <p className="mt-3 text-[10px] text-slate-400 italic">
          Prototype demo profile · Not a real healthcare listing.
        </p>
      </div>
    </article>
  );
}
