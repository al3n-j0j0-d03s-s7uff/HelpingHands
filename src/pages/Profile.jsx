import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Video,
  Phone,
  Users,
  Clock,
  IndianRupee,
  Languages,
  Map as MapIcon,
  CheckCircle2,
  CalendarCheck,
  Sparkles,
} from "lucide-react";
import { getPsychologistById } from "../data/psychologists";
import RatingStars from "../components/RatingStars";
import DemoBadge from "../components/DemoBadge";
import EmptyState from "../components/EmptyState";

const modeConfig = {
  "In-person": { icon: Users, label: "In-person Consultation" },
  "Video call": { icon: Video, label: "Encrypted Video Call" },
  "Phone call": { icon: Phone, label: "Confidential Phone Call" },
};

const demoReviews = [
  {
    author: "Third-Year Engineering Student",
    text: "Sessions felt structured, calm, and practical. Dr. Rao helped me break down exam anxiety into daily actionable steps without feeling overwhelmed.",
    rating: 5,
    tag: "Exam Anxiety",
  },
  {
    author: "Postgraduate Scholar",
    text: "Very empathetic and non-judgmental approach. Easy to schedule around thesis deadlines and gave me grounding tools I still use every day.",
    rating: 5,
    tag: "Burnout & Stress",
  },
];

export default function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const psychologist = getPsychologistById(id);

  if (!psychologist) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <EmptyState
          title="Psychologist profile not found"
          description="We couldn't find a demo practitioner matching this profile link. Browse our full directory to find available specialists."
          action={
            <Link
              to="/find"
              className="rounded-full bg-navy-900 px-5 py-2.5 text-xs font-semibold text-white shadow-soft hover:bg-navy-800"
            >
              Browse Directory
            </Link>
          }
        />
      </div>
    );
  }

  const p = psychologist;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft size={14} /> Back to Search Results
      </button>

      {/* Hero Header Card */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-soft sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-5">
            <div className="relative shrink-0">
              <span className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-sage-100 to-sage-200 text-2xl font-bold text-navy-950 shadow-sm ring-1 ring-sage-300/80">
                {p.image}
              </span>
              <span
                className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-emerald-500 text-white shadow-sm"
                title="Verified Active"
              >
                <CheckCircle2 size={13} strokeWidth={3} />
              </span>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold text-slate-900 font-heading sm:text-3xl">
                  {p.name}
                </h1>
                <DemoBadge />
              </div>
              <p className="mt-1 text-sm text-slate-500 font-medium">
                {p.title} · <span className="text-slate-700">{p.experienceYears} years clinical experience</span>
              </p>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.specializations.map((s) => (
                  <span
                    key={s}
                    className="rounded-full bg-sage-50 px-3 py-1 text-xs font-medium text-sage-800 border border-sage-200/60"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing & Rating Box */}
          <div className="flex sm:flex-col items-start sm:items-end justify-between border-t border-slate-100 pt-4 sm:border-t-0 sm:pt-0">
            <RatingStars rating={p.rating} reviewCount={p.reviewCount} size={15} />
            <div className="mt-2 text-right">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">Rate per session</span>
              <div className="flex items-center text-xl font-bold text-slate-900 font-heading">
                <IndianRupee size={17} className="text-slate-700" />
                <span>{p.fee}</span>
                <span className="ml-1 text-xs font-normal text-slate-500">/ 50 mins</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick details & Primary CTA strip */}
        <div className="mt-8 flex flex-col gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-600">
            <span className="flex items-center gap-1.5">
              <MapPin size={14} className="text-sage-600" />
              <span className="font-medium text-slate-800">{p.location}</span> ({p.distanceKm} km from campus)
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} className="text-sage-600" />
              <span className="font-medium text-slate-800">{p.availability}</span>
            </span>
          </div>

          <Link
            to={`/book/${p.id}`}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-navy-900 px-6 py-3 text-xs font-semibold text-white shadow-soft transition-all hover:bg-navy-800 hover:shadow-card active:scale-[0.98]"
          >
            <CalendarCheck size={15} />
            Book Consultation
          </Link>
        </div>
      </div>

      {/* Detailed Content Columns */}
      <div className="mt-8 grid gap-8 lg:grid-cols-12 items-start">
        {/* Left Column (Main description, reviews, location) */}
        <div className="lg:col-span-8 space-y-6">
          {/* About Section */}
          <Section title="About & Clinical Approach">
            <p className="text-sm leading-relaxed text-slate-600">
              {p.about}
            </p>
            <div className="mt-4 rounded-xl bg-sage-50/70 border border-sage-200/60 p-3.5 text-xs text-sage-900 flex items-start gap-2.5">
              <Sparkles size={16} className="text-sage-700 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong className="font-semibold text-sage-950">Student-focused methodology: </strong>
                Sessions are structured around academic calendars, exam periods, and independent skill-building rather than long waitlists.
              </p>
            </div>
          </Section>

          {/* Reviews Section */}
          <Section title="Student Feedback & Experiences">
            <div className="space-y-3.5">
              {demoReviews.map((r, i) => (
                <div key={i} className="rounded-2xl bg-slate-50/80 border border-slate-100 p-4.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-bold text-slate-700 shadow-subtle border border-slate-200">
                        {r.author.charAt(0)}
                      </span>
                      <span className="text-xs font-bold text-slate-800 font-heading">{r.author}</span>
                    </div>
                    <span className="rounded-full bg-white px-2.5 py-0.5 text-[10px] font-medium text-slate-600 border border-slate-200">
                      {r.tag}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">{r.text}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[11px] text-slate-400 italic">
              * Student testimonials shown are illustrative demo scenarios for this prototype.
            </p>
          </Section>

          {/* Clinic Location & Map preview */}
          <Section title="Clinic Location">
            <div className="flex h-44 flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-200 bg-slate-50 text-slate-500">
              <MapIcon size={26} className="text-sage-600" />
              <p className="text-xs font-medium text-slate-700">{p.location}</p>
              <span className="text-[11px] text-slate-400">Map view available for confirmed in-person sessions</span>
            </div>
          </Section>
        </div>

        {/* Right Column (Sidebar details & quick book) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Consultation Modes */}
          <Section title="Available Modalities">
            <div className="space-y-2">
              {p.modes.map((m) => {
                const conf = modeConfig[m] || { icon: Users, label: m };
                const Icon = conf.icon;
                return (
                  <div
                    key={m}
                    className="flex items-center gap-2.5 rounded-xl bg-slate-50/80 border border-slate-200/70 px-3.5 py-2.5 text-xs font-semibold text-slate-800"
                  >
                    <Icon size={15} className="text-sage-700" />
                    <span>{conf.label}</span>
                  </div>
                );
              })}
            </div>
          </Section>

          {/* Languages */}
          <Section title="Languages Spoken">
            <div className="flex flex-wrap gap-1.5">
              {p.languages.map((l) => (
                <span
                  key={l}
                  className="flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                >
                  <Languages size={12} className="text-slate-500" />
                  {l}
                </span>
              ))}
            </div>
          </Section>

          {/* Booking Card Box */}
          <div className="rounded-2xl border border-sage-200 bg-gradient-to-br from-sage-50/80 to-white p-5 shadow-soft">
            <span className="text-[11px] font-bold uppercase tracking-wider text-sage-800 font-heading">Next Availability</span>
            <p className="mt-1 text-base font-bold text-slate-900 font-heading">{p.availability}</p>
            <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
              Real-time demo calendar with morning and evening slots suited to university class schedules.
            </p>
            <Link
              to={`/book/${p.id}`}
              className="mt-4 block w-full rounded-full bg-navy-900 px-4 py-2.5 text-center text-xs font-semibold text-white shadow-soft hover:bg-navy-800 transition-all active:scale-[0.98]"
            >
              Book with {p.name.split(" ")[0]}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-soft">
      <h2 className="mb-3.5 text-sm font-bold text-slate-900 font-heading">{title}</h2>
      {children}
    </div>
  );
}
