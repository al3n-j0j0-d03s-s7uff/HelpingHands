import { useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Check,
  Users,
  Video,
  Phone,
  CalendarDays,
  Clock3,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { getPsychologistById } from "../data/psychologists";
import { useAppointments } from "../context/AppointmentsContext";
import { useAuth } from "../context/AuthContext";
import { getNextDays, getSlotsForDate, formatDateLabel, formatDateFull } from "../utils/slots";
import EmptyState from "../components/EmptyState";

const modeConfig = {
  "In-person": {
    icon: Users,
    desc: "Meet face-to-face at the campus-adjacent clinic.",
  },
  "Video call": {
    icon: Video,
    desc: "Private 1-on-1 session via encrypted student video link.",
  },
  "Phone call": {
    icon: Phone,
    desc: "Audio-only confidential phone consultation.",
  },
};

const STEPS = ["Format", "Date", "Time", "Details", "Review"];

export default function Book() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addAppointment } = useAppointments();
  const psychologist = getPsychologistById(id);

  const [step, setStep] = useState(0);
  const [mode, setMode] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [slot, setSlot] = useState("");
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    note: "",
  });
  const [errors, setErrors] = useState({});
  const [confirmed, setConfirmed] = useState(null);

  const days = useMemo(() => getNextDays(7), []);
  const slots = useMemo(
    () => (selectedDate ? getSlotsForDate(id, selectedDate) : []),
    [id, selectedDate]
  );

  if (!psychologist) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <EmptyState
          title="Psychologist not found"
          description="We couldn't find a practitioner matching this booking link."
          action={
            <Link
              to="/find"
              className="rounded-full bg-navy-900 px-5 py-2.5 text-xs font-semibold text-white shadow-soft hover:bg-navy-800"
            >
              Back to Directory
            </Link>
          }
        />
      </div>
    );
  }

  function validateDetails() {
    const errs = {};
    if (!form.name.trim()) errs.name = "Please enter your full name.";
    if (!form.email.trim()) {
      errs.email = "Please enter your email.";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      errs.email = "Please enter a valid email address.";
    }
    if (!form.phone.trim()) {
      errs.phone = "Please enter a contact number.";
    } else if (!/^[0-9+\-\s]{7,15}$/.test(form.phone)) {
      errs.phone = "Please enter a valid phone number.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function goNext() {
    if (step === 0 && !mode) return;
    if (step === 1 && !selectedDate) return;
    if (step === 2 && !slot) return;
    if (step === 3 && !validateDetails()) return;
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  function goBack() {
    setStep((s) => Math.max(s - 1, 0));
  }

  function handleConfirm() {
    const record = addAppointment({
      psychologistId: psychologist.id,
      psychologistName: psychologist.name,
      mode,
      date: selectedDate.toISOString(),
      slot,
      name: form.name,
      email: form.email,
      phone: form.phone,
      note: form.note,
      fee: psychologist.fee,
    });
    setConfirmed(record);
  }

  if (confirmed) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-sage-100 text-sage-800 ring-1 ring-sage-300 shadow-soft">
          <CheckCircle2 size={32} strokeWidth={2.2} />
        </span>
        <h1 className="mt-5 text-2xl font-bold text-slate-900 font-heading sm:text-3xl">
          Consultation confirmed
        </h1>
        <p className="mt-2 text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
          Your demo session has been scheduled and stored to your local profile.
          No payment was charged and no clinical records were transmitted.
        </p>

        {/* Confirmation Card */}
        <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200/90 bg-white text-left shadow-card">
          <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/70 px-6 py-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-heading">
                Booking ID
              </span>
              <p className="font-mono text-sm font-bold text-slate-800">{confirmed.id}</p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Confirmed
            </span>
          </div>

          <dl className="p-6 space-y-3.5 text-xs">
            <Row label="Practitioner" value={confirmed.psychologistName} />
            <Row label="Consultation Format" value={confirmed.mode} />
            <Row label="Scheduled Date" value={formatDateFull(new Date(confirmed.date))} />
            <Row label="Time Slot" value={confirmed.slot} />
            <Row label="Student Name" value={confirmed.name} />
            <Row label="Session Fee (Pay at Session)" value={`₹${confirmed.fee}`} highlight />
          </dl>
        </div>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/appointments"
            className="rounded-full bg-navy-900 px-6 py-3 text-xs font-semibold text-white shadow-soft hover:bg-navy-800 transition-all"
          >
            View My Appointments
          </Link>
          <Link
            to="/find"
            className="rounded-full border border-slate-200 bg-white px-6 py-3 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-subtle transition-all"
          >
            Back to Directory
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Back button */}
      <button
        onClick={() => (step === 0 ? navigate(-1) : goBack())}
        className="mb-5 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft size={14} /> {step === 0 ? "Cancel & Return" : "Previous Step"}
      </button>

      {/* Practitioner summary header */}
      <div className="mb-8 flex items-center justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white p-4.5 shadow-subtle">
        <div className="flex items-center gap-3.5">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sage-100 text-base font-bold text-navy-950 ring-1 ring-sage-300/60">
            {psychologist.image}
          </span>
          <div>
            <h2 className="text-sm font-bold text-slate-900 font-heading">
              Scheduling with {psychologist.name}
            </h2>
            <p className="text-xs text-slate-500">
              {psychologist.title} · <span className="text-slate-800 font-semibold">₹{psychologist.fee}</span> per session
            </p>
          </div>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-sage-50 px-2.5 py-1 text-[11px] font-medium text-sage-800 border border-sage-200/60">
          <ShieldCheck size={13} className="text-sage-600" />
          Verified Practitioner
        </span>
      </div>

      {/* Modern Stepper */}
      <nav aria-label="Progress" className="mb-8">
        <ol className="flex items-center justify-between">
          {STEPS.map((label, i) => (
            <li key={label} className="relative flex flex-1 items-center">
              <div className="flex flex-col items-center">
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-all ${
                    i < step
                      ? "bg-sage-700 text-white"
                      : i === step
                      ? "bg-navy-900 text-white shadow-subtle ring-4 ring-slate-100"
                      : "border border-slate-200 bg-white text-slate-400"
                  }`}
                >
                  {i < step ? <Check size={13} strokeWidth={3} /> : i + 1}
                </span>
                <span
                  className={`mt-1.5 text-[11px] font-semibold ${
                    i === step ? "text-slate-900" : "text-slate-400"
                  }`}
                >
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`mx-2 h-0.5 flex-1 transition-colors ${
                    i < step ? "bg-sage-600" : "bg-slate-200"
                  }`}
                />
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* Step Content Container */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-card">
        {/* Step 0: Mode */}
        {step === 0 && (
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-sage-700 font-heading">
              Step 1 of 5
            </span>
            <h2 className="mt-1 text-xl font-bold text-slate-900 font-heading">
              Select your consultation format
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Choose the setting you feel most comfortable talking in.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {psychologist.modes.map((m) => {
                const conf = modeConfig[m] || { icon: Users, desc: "Consultation session." };
                const Icon = conf.icon;
                const isSelected = mode === m;
                return (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMode(m)}
                    className={`flex flex-col items-start rounded-2xl border-2 p-5 text-left transition-all ${
                      isSelected
                        ? "border-sage-700 bg-sage-50/80 shadow-subtle"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50"
                    }`}
                  >
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
                        isSelected
                          ? "bg-sage-700 text-white"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      <Icon size={18} />
                    </span>
                    <h3 className="mt-4 text-xs font-bold text-slate-900 font-heading">{m}</h3>
                    <p className="mt-1 text-[11px] leading-relaxed text-slate-500">{conf.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 1: Date */}
        {step === 1 && (
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-sage-700 font-heading">
              Step 2 of 5
            </span>
            <h2 className="mt-1 text-xl font-bold text-slate-900 font-heading">
              Choose a consultation date
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Select a day that doesn't conflict with lectures or exams.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {days.map((d) => {
                const isSelected = selectedDate && d.toDateString() === selectedDate.toDateString();
                return (
                  <button
                    key={d.toISOString()}
                    type="button"
                    onClick={() => {
                      setSelectedDate(d);
                      setSlot("");
                    }}
                    className={`flex flex-col items-center justify-center rounded-2xl border-2 py-4 px-3 text-center transition-all ${
                      isSelected
                        ? "border-sage-700 bg-sage-50/90 shadow-subtle text-sage-900"
                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <CalendarDays
                      size={16}
                      className={isSelected ? "text-sage-700" : "text-slate-400"}
                    />
                    <span className="mt-2 text-xs font-bold font-heading">{formatDateLabel(d)}</span>
                    <span className="text-[10px] text-slate-400 mt-0.5">
                      {d.toLocaleDateString(undefined, { weekday: "short" })}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Time */}
        {step === 2 && (
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-sage-700 font-heading">
              Step 3 of 5
            </span>
            <h2 className="mt-1 text-xl font-bold text-slate-900 font-heading">
              Pick an available time slot
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Times shown for {selectedDate && formatDateLabel(selectedDate)}.
            </p>

            {slots.length === 0 ? (
              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">
                <p className="text-xs text-slate-500">
                  No slots available on this date. Please go back to choose an alternative date.
                </p>
              </div>
            ) : (
              <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {slots.map((s) => {
                  const isSelected = slot === s;
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSlot(s)}
                      className={`flex items-center justify-center gap-1.5 rounded-xl border-2 py-3 px-3 text-xs font-semibold transition-all ${
                        isSelected
                          ? "border-sage-700 bg-sage-700 text-white shadow-subtle"
                          : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      <Clock3 size={13} className={isSelected ? "text-white" : "text-slate-400"} />
                      <span>{s}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Step 3: Details */}
        {step === 3 && (
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-sage-700 font-heading">
              Step 4 of 5
            </span>
            <h2 className="mt-1 text-xl font-bold text-slate-900 font-heading">
              Your contact details
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Only required to generate your booking pass. No health diagnosis is recorded.
            </p>

            <div className="mt-6 grid gap-4.5 sm:grid-cols-2">
              <TextField
                label="Full name"
                value={form.name}
                onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                error={errors.name}
                required
              />
              <TextField
                label="Student or personal email"
                type="email"
                value={form.email}
                onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                error={errors.email}
                required
              />
              <TextField
                label="Phone number"
                value={form.phone}
                onChange={(v) => setForm((f) => ({ ...f, phone: v }))}
                error={errors.phone}
                required
                placeholder="+91 98765 43210"
              />
              <TextField
                label="Anything you'd like the clinician to know? (Optional)"
                value={form.note}
                onChange={(v) => setForm((f) => ({ ...f, note: v }))}
                placeholder="e.g. preferred reminder via SMS"
              />
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {step === 4 && (
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-sage-700 font-heading">
              Step 5 of 5
            </span>
            <h2 className="mt-1 text-xl font-bold text-slate-900 font-heading">
              Review your appointment summary
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Please check your selected details before confirming.
            </p>

            <div className="mt-6 rounded-2xl border border-slate-200/80 bg-slate-50/60 p-5">
              <dl className="space-y-3 text-xs">
                <Row label="Practitioner" value={psychologist.name} />
                <Row label="Consultation Format" value={mode} />
                <Row label="Date" value={selectedDate ? formatDateFull(selectedDate) : "—"} />
                <Row label="Time Slot" value={slot} />
                <Row label="Student Name" value={form.name} />
                <Row label="Contact Email" value={form.email} />
                <Row label="Phone" value={form.phone} />
                {form.note && <Row label="Notes" value={form.note} />}
                <Row label="Session Fee (Pay at Session)" value={`₹${psychologist.fee}`} highlight />
              </dl>
            </div>

            <div className="mt-4 flex items-center gap-2 text-[11px] text-slate-400">
              <Sparkles size={13} className="text-sage-600 shrink-0" />
              <span>Free cancellation up to 2 hours before the appointment via your dashboard.</span>
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
          <button
            onClick={goBack}
            disabled={step === 0}
            className="rounded-full border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-subtle hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            Back
          </button>

          {step < 4 ? (
            <button
              onClick={goNext}
              disabled={
                (step === 0 && !mode) ||
                (step === 1 && !selectedDate) ||
                (step === 2 && !slot)
              }
              className="inline-flex items-center gap-1.5 rounded-full bg-navy-900 px-5 py-2.5 text-xs font-semibold text-white shadow-soft hover:bg-navy-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
            >
              Continue <ArrowRight size={14} />
            </button>
          ) : (
            <button
              onClick={handleConfirm}
              className="inline-flex items-center gap-1.5 rounded-full bg-navy-900 px-6 py-2.5 text-xs font-semibold text-white shadow-soft hover:bg-navy-800 transition-all active:scale-[0.98]"
            >
              Confirm Appointment <Check size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, highlight }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-slate-500 font-medium">{label}</dt>
      <dd
        className={`font-semibold ${
          highlight ? "text-slate-900 font-bold" : "text-slate-800"
        }`}
      >
        {value}
      </dd>
    </div>
  );
}

function TextField({ label, value, onChange, error, type = "text", required, placeholder }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600 font-heading">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-xl border px-3.5 py-2.5 text-xs text-slate-800 shadow-subtle transition-colors focus:outline-none ${
          error
            ? "border-rose-300 focus:border-rose-500 bg-rose-50/20"
            : "border-slate-200 bg-slate-50/40 focus:border-sage-400 focus:bg-white"
        }`}
        aria-invalid={!!error}
      />
      {error && <p className="mt-1 text-[11px] text-rose-600">{error}</p>}
    </div>
  );
}
