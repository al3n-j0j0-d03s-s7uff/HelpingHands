import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  MapPin,
  Search,
  Compass,
  CalendarCheck2,
  Users,
  BookOpen,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  Clock3,
  CheckCircle2,
  Lock,
  GraduationCap,
  HeartHandshake,
} from "lucide-react";
import { RESOURCES } from "../data/resources";

const quickPills = [
  { label: "Anxiety & Stress", query: "Anxiety" },
  { label: "Exam Pressure", query: "Exam" },
  { label: "Depression", query: "Depression" },
  { label: "Relationship Support", query: "Relationship" },
  { label: "Available Today", query: "Available today" },
];

const features = [
  {
    icon: MapPin,
    title: "Campus-Proximity Discovery",
    description:
      "Find licensed professionals close to your university or residence, with verified distance calculations on every profile.",
  },
  {
    icon: Compass,
    title: "Thoughtful Filtering",
    description:
      "Filter by specific student concerns, preferred consultation mode (video or in-person), spoken language, and transparent fees.",
  },
  {
    icon: CalendarCheck2,
    title: "Frictionless Booking",
    description:
      "Select your date and available time slot in a few serene steps — avoiding awkward back-and-forth phone calls or delays.",
  },
  {
    icon: BookOpen,
    title: "Evidence-Based Resources",
    description:
      "Read bite-sized wellness guides written for university life — from dealing with exam panic to recognizing burnout.",
  },
];

const steps = [
  {
    number: "01",
    title: "Explore & Filter",
    description: "Search by your specific concern, campus location, or consultation mode without sharing sensitive data.",
  },
  {
    number: "02",
    title: "Compare Profiles",
    description: "Review practitioner background, clinical specializations, session fees, and peer demo reviews side-by-side.",
  },
  {
    number: "03",
    title: "Pick Your Slot",
    description: "Choose an available date and consultation format (in-person, video, or audio) that fits your academic timetable.",
  },
  {
    number: "04",
    title: "Begin Support",
    description: "Receive instant session confirmation and access calm preparatory resources before your consultation.",
  },
];

export default function Landing() {
  const [location, setLocation] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSearch(e) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (location) params.set("loc", location);
    navigate(`/find${params.toString() ? `?${params.toString()}` : ""}`);
  }

  function handleQuickPill(q) {
    navigate(`/find?q=${encodeURIComponent(q)}`);
  }

  function useMyLocation() {
    setLocation("Bengaluru, Karnataka (Campus Demo)");
  }

  return (
    <div className="pb-16">
      {/* Hero — asymmetric editorial layout */}
      <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 sm:pt-14 lg:px-8 lg:pt-16">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Text column */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-sage-300/80 bg-sage-50 px-3.5 py-1 text-xs font-medium text-sage-800">
              <span className="flex h-1.5 w-1.5 rounded-full bg-sage-600" />
              Compassionate student mental wellness
            </div>

            <h1 className="mt-6 font-heading text-5xl font-medium leading-[1.05] tracking-tight text-navy-900 sm:text-6xl lg:text-[4.2rem]">
              Support for
              <br />
              every mind.
            </h1>

            <p className="mt-6 max-w-md text-base leading-relaxed text-slate-600">
              HelpingHands helps university students connect with verified, nearby
              psychologists — transparent fees, zero phone-tag booking, and guided
              matching, without the stress of scattered searches.
            </p>

            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <Link
                to="/find"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-navy-900 bg-navy-900 px-6 py-3.5 text-sm font-medium text-white transition-all hover:bg-transparent hover:text-navy-900"
              >
                Find a Psychologist
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/match"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-6 py-3.5 text-sm font-medium text-slate-700 transition-all hover:border-navy-900 hover:text-navy-900"
              >
                <Sparkles size={15} className="text-sage-600" />
                Take the Smart Match Quiz
              </Link>
            </div>
          </div>

          {/* Visual column */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-beige-100 via-warm-100 to-sage-100">
              <div className="absolute -left-10 top-10 h-56 w-56 rounded-full bg-sage-300/50 blur-3xl" />
              <div className="absolute -right-6 bottom-16 h-64 w-64 rounded-full bg-beige-400/40 blur-3xl" />
              <div className="absolute inset-0 flex items-center justify-center p-10">
                <div className="flex h-40 w-40 items-center justify-center rounded-full border border-white/70 bg-white/60 shadow-elevated backdrop-blur-sm sm:h-52 sm:w-52">
                  <HeartHandshake size={64} strokeWidth={1.3} className="text-sage-700" />
                </div>
              </div>
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/60 bg-white/70 p-4 backdrop-blur-sm">
                <p className="font-heading text-sm text-navy-900">
                  "A calm place to start, when starting feels hardest."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search card */}
        <div className="mx-auto mt-16 max-w-4xl">
          <form
            onSubmit={handleSearch}
            className="flex flex-col gap-2 rounded-full border border-slate-300 bg-white p-2 shadow-soft sm:flex-row sm:items-center"
          >
            <div className="flex flex-1 items-center gap-2.5 rounded-full px-4 py-2.5 sm:border-r sm:border-slate-200">
              <Search size={17} className="text-slate-400 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Concern, therapist name, or focus..."
                className="w-full border-none bg-transparent text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
                aria-label="Search by name or specialization"
              />
            </div>

            <div className="flex flex-1 items-center gap-2.5 rounded-full px-4 py-2.5">
              <MapPin size={17} className="text-slate-400 shrink-0" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Campus or city..."
                className="w-full border-none bg-transparent text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
                aria-label="Enter your location"
              />
              <button
                type="button"
                onClick={useMyLocation}
                className="shrink-0 whitespace-nowrap text-xs font-medium text-sage-700 hover:text-sage-900 transition-colors"
              >
                Nearby
              </button>
            </div>

            <button
              type="submit"
              className="rounded-full bg-navy-900 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-navy-800"
            >
              Search
            </button>
          </form>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5 text-xs text-slate-500">
            <span className="font-medium text-slate-400">Popular:</span>
            {quickPills.map((pill) => (
              <button
                key={pill.label}
                type="button"
                onClick={() => handleQuickPill(pill.query)}
                className="rounded-full border border-slate-300 px-2.5 py-1 text-xs text-slate-600 transition-colors hover:border-navy-900 hover:text-navy-900"
              >
                {pill.label}
              </button>
            ))}
          </div>
        </div>

        {/* Trust metrics */}
        <div className="mx-auto mt-16 max-w-4xl border-y border-slate-200 py-6">
          <div className="grid grid-cols-2 gap-6 text-center sm:grid-cols-4">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-navy-900">
                <CheckCircle2 size={15} className="text-sage-600" />
                <span>Verified Profiles</span>
              </div>
              <p className="mt-1 text-[11px] text-slate-500">Carefully structured demo clinicians</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-navy-900">
                <Lock size={15} className="text-sage-600" />
                <span>Confidential</span>
              </div>
              <p className="mt-1 text-[11px] text-slate-500">No medical data saved to servers</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-navy-900">
                <Clock3 size={15} className="text-sage-600" />
                <span>Fast Booking</span>
              </div>
              <p className="mt-1 text-[11px] text-slate-500">Real-time slots in under 2 mins</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-navy-900">
                <GraduationCap size={15} className="text-sage-600" />
                <span>Student Pricing</span>
              </div>
              <p className="mt-1 text-[11px] text-slate-500">Transparent rates from ₹700</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-sage-100 px-3 py-1 text-xs font-medium text-sage-800">
              The Design Thinking Problem
            </div>
            <h2 className="mt-4 font-heading text-3xl font-medium tracking-tight text-navy-900 sm:text-4xl">
              Why finding mental health care is broken for students today
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              When a student faces academic pressure, anxiety, or depressive episodes,
              the current journey to care is disjointed. Usually, it requires approaching busy
              professors, waiting weeks for campus counseling appointments, or sifting through
              unfiltered internet search results.
            </p>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              This friction causes immense delay. Too many students postpone reaching out
              until a manageable challenge becomes an acute crisis.
            </p>
            <div className="mt-6">
              <Link
                to="/about"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-sage-700 hover:text-sage-900 transition-colors"
              >
                Read our Design Thinking research case study <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sage-50 text-sage-700">
                <Clock3 size={20} />
              </div>
              <h3 className="mt-4 font-heading text-base font-medium text-navy-900">Prolonged Delays</h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">
                Manual referral chains average 10–14 days before a student speaks with a professional.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sage-50 text-sage-700">
                <Users size={20} />
              </div>
              <h3 className="mt-4 font-heading text-base font-medium text-navy-900">Faculty Overload</h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">
                Professors spend significant non-teaching hours trying to vet and recommend local contacts.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sage-50 text-sage-700">
                <Search size={20} />
              </div>
              <h3 className="mt-4 font-heading text-base font-medium text-navy-900">Scattered Discovery</h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">
                No single student-tailored directory shows proximity, modality, language, and transparent fees.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sage-50 text-sage-700">
                <Compass size={20} />
              </div>
              <h3 className="mt-4 font-heading text-base font-medium text-navy-900">Decision Paralysis</h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">
                Without clear guidance, students don't know who has expertise in academic stress vs trauma.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="border-y border-slate-200 bg-[#f2ede3] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-sage-700">
              Platform Features
            </span>
            <h2 className="mt-2 font-heading text-3xl font-medium tracking-tight text-navy-900 sm:text-4xl">
              Everything required to make care accessible
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              A serene, human-centered toolkit designed specifically for university life.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 transition-colors hover:border-slate-300"
              >
                <div>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sage-50 text-sage-700">
                    <f.icon size={20} strokeWidth={1.8} />
                  </span>
                  <h3 className="mt-5 font-heading text-base font-medium text-navy-900">{f.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-500">{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-sage-700">
            Simple 4-Step Process
          </span>
          <h2 className="mt-2 font-heading text-3xl font-medium tracking-tight text-navy-900 sm:text-4xl">
            From hesitation to care in minutes
          </h2>
          <p className="mt-3 text-sm text-slate-500">
            No endless queues, no uncomfortable phone calls. Transparent and self-directed.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div
              key={s.title}
              className="relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6"
            >
              <div>
                <span className="font-heading text-2xl font-medium text-sage-600">{s.number}</span>
                <h3 className="mt-3 font-heading text-base font-medium text-navy-900">{s.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-500">{s.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Faculty & University Impact Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-navy-950 px-6 py-14 text-white sm:px-12 sm:py-16">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-navy-800 bg-navy-900 px-3 py-1 text-xs font-medium text-sage-300">
                For Faculty & Educational Mentors
              </span>
              <h2 className="mt-4 font-heading text-2xl font-medium leading-tight sm:text-3xl lg:text-4xl">
                Empowering students to self-serve support, freeing mentors to guide
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
                Faculty members often act as informal first-responders for distressed students.
                HelpingHands provides an authoritative, direct discovery channel so educators can
                confidently hand students a trusted tool, rather than having to maintain personal referral lists.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-6">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-rose-300">Before HelpingHands</span>
                <h3 className="mt-2 font-heading text-sm font-medium text-white">Manual Referral Chain</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-300">
                  Ad-hoc phone calls, informal referrals, uncertainty about availability, and delay for the student.
                </p>
              </div>

              <div className="rounded-2xl border border-sage-500/30 bg-sage-950/40 p-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-sage-300">With HelpingHands</span>
                <h3 className="mt-2 font-heading text-sm font-medium text-white">Structured Direct Booking</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-300">
                  Direct filters, verified session slots, transparent pricing, and immediate appointment confirmation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curated Resources Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-sage-700">
              Mental Wellness Reads
            </span>
            <h2 className="mt-1 font-heading text-2xl font-medium tracking-tight text-navy-900 sm:text-3xl">
              Practical guides for university life
            </h2>
          </div>
          <Link
            to="/resources"
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-navy-900 transition-colors"
          >
            Explore all guides <ArrowRight size={14} />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {RESOURCES.slice(0, 3).map((r) => (
            <Link
              key={r.id}
              to={`/resources/${r.id}`}
              className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 transition-colors hover:border-slate-300"
            >
              <div>
                <span className="inline-block rounded-full border border-sage-200 bg-sage-50 px-2.5 py-0.5 text-[11px] font-medium text-sage-800">
                  {r.category}
                </span>
                <h3 className="mt-4 font-heading text-base font-medium text-navy-900 transition-colors">
                  {r.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-500 line-clamp-3">
                  {r.summary}
                </p>
              </div>
              <span className="mt-4 flex items-center gap-1 text-xs font-semibold text-sage-700 group-hover:translate-x-0.5 transition-transform">
                Read article <ArrowRight size={13} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Gentle Crisis Support Callout */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-rose-200 bg-rose-50/60 p-6 sm:flex-row sm:p-8">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-700">
              <ShieldAlert size={24} />
            </span>
            <div>
              <h3 className="font-heading text-base font-medium text-rose-900">Experiencing an acute crisis right now?</h3>
              <p className="mt-1 max-w-xl text-xs leading-relaxed text-rose-800/90">
                If you or a peer are experiencing severe distress or thoughts of self-harm,
                please do not wait for a demo session. Access immediate emergency helplines.
              </p>
            </div>
          </div>
          <Link
            to="/emergency"
            className="w-full shrink-0 rounded-full bg-rose-700 px-5 py-3 text-center text-xs font-semibold text-white transition-colors hover:bg-rose-800 sm:w-auto"
          >
            Emergency Helplines
          </Link>
        </div>
      </section>
    </div>
  );
}
