import { useState } from "react";
import { ShieldAlert, Phone, Users, Save, Info, Heart, CheckCircle2 } from "lucide-react";

export default function Emergency() {
  const [contact, setContact] = useState({ name: "", phone: "" });
  const [saved, setSaved] = useState(false);

  function handleSave(e) {
    e.preventDefault();
    if (!contact.name.trim() || !contact.phone.trim()) return;
    setSaved(true);
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 space-y-8">
      {/* High-Priority Crisis Banner */}
      <div className="flex items-start gap-4 rounded-3xl border border-rose-300 bg-gradient-to-br from-rose-50 via-white to-rose-50/40 p-6 sm:p-8 shadow-card">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-rose-600 text-white shadow-soft">
          <ShieldAlert size={26} />
        </span>
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700 font-heading">
            Immediate Crisis Support
          </span>
          <h1 className="mt-1 text-xl font-bold text-slate-900 font-heading sm:text-2xl leading-snug">
            If you or someone you know is in immediate danger, contact local emergency services immediately.
          </h1>
          <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm">
            HelpingHands is an academic design prototype and <strong>does not provide real-time clinical intervention or emergency services</strong>. Please do not wait for an appointment if you are experiencing thoughts of self-harm.
          </p>
        </div>
      </div>

      {/* Primary Emergency Hotlines */}
      <section className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-soft">
        <div className="flex items-center gap-2.5 mb-2">
          <Phone size={18} className="text-rose-600" />
          <h2 className="text-base font-bold text-slate-900 font-heading">
            Emergency & Crisis Helplines
          </h2>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed mb-6">
          National mental health and emergency numbers available 24 hours a day, 7 days a week.
          Free and confidential.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-heading">
                  National Emergency Services
                </span>
                <span className="rounded-full bg-slate-200/80 px-2 py-0.5 text-[10px] font-semibold text-slate-700">
                  Police / Ambulance
                </span>
              </div>
              <h3 className="mt-2 text-2xl font-extrabold text-slate-900 font-heading">112</h3>
              <p className="mt-1 text-xs text-slate-500">
                Unified emergency helpline across India for immediate medical assistance.
              </p>
            </div>
            <a
              href="tel:112"
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white hover:bg-slate-800 transition-colors"
            >
              <Phone size={13} /> Call 112
            </a>
          </div>

          <div className="rounded-2xl border border-rose-200/80 bg-rose-50/40 p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700 font-heading">
                  National Mental Health Helpline
                </span>
                <span className="rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-semibold text-rose-800">
                  KIRAN / Tele-MANAS
                </span>
              </div>
              <h3 className="mt-2 text-2xl font-extrabold text-slate-900 font-heading">14416 / 1800-891-4416</h3>
              <p className="mt-1 text-xs text-slate-500">
                Ministry of Health mental health helpline providing free, 24/7 tele-counselling in 20+ languages.
              </p>
            </div>
            <a
              href="tel:14416"
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-rose-700 px-4 py-2.5 text-xs font-semibold text-white hover:bg-rose-800 transition-colors"
            >
              <Phone size={13} /> Call Tele-MANAS
            </a>
          </div>
        </div>
      </section>

      {/* Trusted Person Safety Net */}
      <section className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-soft">
        <div className="flex items-center gap-2.5 mb-2">
          <Users size={18} className="text-sage-700" />
          <h2 className="text-base font-bold text-slate-900 font-heading">
            Your Trusted Person Contact
          </h2>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed mb-5">
          Save the contact details of a roommate, parent, close friend, or campus mentor so you have one less thing to think about in an overwhelming moment. Saved only on this browser.
        </p>

        {saved ? (
          <div className="rounded-2xl border border-sage-200 bg-sage-50/80 p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sage-600 text-white">
                <CheckCircle2 size={18} />
              </span>
              <div>
                <p className="text-xs font-bold text-slate-900 font-heading">{contact.name}</p>
                <p className="text-xs text-slate-600">{contact.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={`tel:${contact.phone}`}
                className="inline-flex items-center gap-1.5 rounded-full bg-sage-800 px-4 py-2 text-xs font-semibold text-white hover:bg-sage-900 transition-colors"
              >
                <Phone size={12} /> Call Now
              </a>
              <button
                onClick={() => setSaved(false)}
                className="text-xs font-semibold text-slate-500 underline hover:text-slate-800"
              >
                Edit
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSave} className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
            <input
              type="text"
              placeholder="Full name (e.g. Roommate Priya)"
              value={contact.name}
              onChange={(e) => setContact((c) => ({ ...c, name: e.target.value }))}
              className="rounded-xl border border-slate-200 bg-slate-50/40 px-3.5 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:border-sage-400 focus:bg-white focus:outline-none"
              aria-label="Trusted person's name"
            />
            <input
              type="tel"
              placeholder="Phone number"
              value={contact.phone}
              onChange={(e) => setContact((c) => ({ ...c, phone: e.target.value }))}
              className="rounded-xl border border-slate-200 bg-slate-50/40 px-3.5 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:border-sage-400 focus:bg-white focus:outline-none"
              aria-label="Trusted person's phone number"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-1.5 rounded-full bg-navy-900 px-5 py-2.5 text-xs font-semibold text-white shadow-soft hover:bg-navy-800 transition-colors"
            >
              <Save size={13} /> Save Contact
            </button>
          </form>
        )}
      </section>

      {/* Grounding & De-escalation Advice */}
      <section className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-soft">
        <div className="flex items-center gap-2.5 mb-2">
          <Heart size={18} className="text-sage-700" />
          <h2 className="text-base font-bold text-slate-900 font-heading">
            Gentle Steps If You Are Struggling Right Now
          </h2>
        </div>
        <ul className="mt-4 space-y-3 text-xs leading-relaxed text-slate-600">
          <li className="flex items-start gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-sage-600 mt-1.5 shrink-0" />
            <span>
              <strong>Shift your environment: </strong> Move to a well-lit common space, stepped out onto a balcony, or sit near someone you trust. Physical isolation amplifies mental spirals.
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-sage-600 mt-1.5 shrink-0" />
            <span>
              <strong>The 5-4-3-2-1 Grounding Rule: </strong> Name 5 things you can see, 4 things you can physically feel, 3 sounds you can hear, 2 scents you can identify, and 1 taste. It reconnects your nervous system to the present.
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-sage-600 mt-1.5 shrink-0" />
            <span>
              <strong>Delay impulsive decisions: </strong> Promise yourself you will wait 24 hours before acting on distressing thoughts. Remind yourself that feelings peak and subside like waves.
            </span>
          </li>
        </ul>
      </section>

      {/* Prototype Advisory */}
      <div className="flex items-start gap-2.5 rounded-2xl border border-slate-200/70 bg-slate-50/60 p-4 text-xs text-slate-500">
        <Info size={16} className="mt-0.5 shrink-0 text-slate-400" />
        <p>
          HelpingHands does not monitor this web application in real time. In any critical health emergency,
          always reach out directly to licensed hospital emergency rooms or emergency numbers.
        </p>
      </div>
    </div>
  );
}
