import { Lightbulb, Users, ShieldCheck, GraduationCap, Compass, Target } from "lucide-react";

export default function About() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-sage-100 px-3.5 py-1 text-xs font-semibold text-sage-800">
          <GraduationCap size={13} className="text-sage-700" /> ADS336: Design Thinking Case Study
        </span>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 font-heading sm:text-4xl">
          About HelpingHands
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
          HelpingHands is an academic prototype exploring how a centralized discovery platform can
          alleviate faculty referral burdens and provide university students with a direct, confidential path to professional care.
        </p>
      </div>

      {/* Case Study Grid */}
      <div className="space-y-6">
        <SectionCard
          icon={Target}
          tag="Problem Formulation"
          title="The Core Problem We Are Addressing"
        >
          <p>
            University educators currently dedicate substantial mentoring and office hours to
            counselling students and navigating ad-hoc psychologist referrals. At the same time,
            students experiencing academic anxiety or depression face multi-week delays trying to find
            nearby, trusted clinicians through word-of-mouth or uncurated internet queries.
          </p>
        </SectionCard>

        <SectionCard
          icon={Users}
          tag="Empathize & Define"
          title="Why Students Delay Seeking Support"
        >
          <p>
            Mental health distress compounds when the initial hurdle to getting help is overwhelming.
            The stigma of having to approach a professor or disclose personal struggles to administrative
            staff often leads students to postpone care until an acute crisis develops. A dignified, self-serve
            platform closes this critical gap.
          </p>
        </SectionCard>

        <SectionCard
          icon={Lightbulb}
          tag="The Proposed Solution"
          title="How HelpingHands Restructures the Pathway"
        >
          <p>
            By consolidating verified proximity data, consultation format filters (video, in-person, audio),
            transparent fees, and immediate calendar slot booking, students can transition from "I should talk to someone"
            to a confirmed session within two minutes. The prototype also includes a Smart Match questionnaire to guide students
            who feel overwhelmed by choice.
          </p>
        </SectionCard>

        <SectionCard
          icon={GraduationCap}
          tag="Faculty Workload Reduction"
          title="Freeing Educators to Focus on Academic Mentorship"
        >
          <p>
            Rather than asking individual faculty members to maintain personal contact books of therapists or navigate
            sensitive clinical referrals, HelpingHands gives professors an authoritative, verified university tool they can
            confidently share with students.
          </p>
        </SectionCard>

        <SectionCard
          icon={Compass}
          tag="Academic Methodology"
          title="Our Design Thinking Process"
        >
          <p>
            Rooted in Stanford d.school Design Thinking methodology, this project began with primary faculty interviews
            on student distress patterns. Moving through <em>Empathize, Define, Ideate, Prototype,</em> and <em>Test</em>,
            HelpingHands illustrates how human-centered design principles can solve administrative friction and improve student wellbeing.
          </p>
        </SectionCard>

        <SectionCard
          icon={ShieldCheck}
          tag="Ethics & Privacy"
          title="Prototype Principles & Safety Guardrails"
        >
          <ul className="space-y-2 list-disc pl-4 text-xs text-slate-600">
            <li>No clinical diagnostic or treatment claims are made anywhere on this platform.</li>
            <li>All psychologist profiles, reviews, and booking confirmations are strictly simulated demo records.</li>
            <li>No sensitive medical histories are collected, and data remains on your local browser.</li>
            <li>Crisis guidance always prioritizes real, verified national and local emergency hotlines.</li>
          </ul>
        </SectionCard>
      </div>
    </div>
  );
}

function SectionCard({ icon: Icon, tag, title, children }) {
  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-soft transition-all hover:border-slate-300">
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sage-50 text-sage-700 ring-1 ring-sage-200/60 shadow-subtle">
          <Icon size={20} strokeWidth={2} />
        </span>
        <div className="flex-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-sage-700 font-heading">
            {tag}
          </span>
          <h2 className="mt-1 text-base font-bold text-slate-900 font-heading sm:text-lg">{title}</h2>
          <div className="mt-3 text-xs leading-relaxed text-slate-600 space-y-2">{children}</div>
        </div>
      </div>
    </div>
  );
}
