import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarX2,
  Clock3,
  MapPin,
  XCircle,
  CalendarCheck,
  CalendarDays,
  ShieldCheck,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { useAppointments } from "../context/AppointmentsContext";
import { useAuth } from "../context/AuthContext";
import { getPsychologistById } from "../data/psychologists";
import EmptyState from "../components/EmptyState";
import { formatDateFull } from "../utils/slots";

export default function Appointments() {
  const { appointments, cancelAppointment } = useAppointments();
  const { user } = useAuth();
  const [tab, setTab] = useState("upcoming");
  const [cancelTarget, setCancelTarget] = useState(null);

  const now = new Date();

  const { upcoming, past } = useMemo(() => {
    const upcoming = [];
    const past = [];
    for (const a of appointments) {
      const isPastDate = new Date(a.date) < now && a.status !== "cancelled";
      if (a.status === "cancelled" || isPastDate) {
        past.push(a);
      } else {
        upcoming.push(a);
      }
    }
    upcoming.sort((a, b) => new Date(a.date) - new Date(b.date));
    past.sort((a, b) => new Date(b.date) - new Date(a.date));
    return { upcoming, past };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appointments]);

  const list = tab === "upcoming" ? upcoming : past;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Dashboard Header */}
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between border-b border-slate-200/70 pb-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-sage-700 font-heading">
            Student Wellness Dashboard
          </span>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900 font-heading sm:text-4xl">
            My Appointments
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            {user ? `Logged in as ${user.name} (${user.email})` : "Managing your scheduled demo consultations"}
          </p>
        </div>

        <Link
          to="/find"
          className="inline-flex items-center gap-1.5 rounded-full bg-navy-900 px-4 py-2.5 text-xs font-semibold text-white shadow-soft hover:bg-navy-800 transition-all active:scale-[0.98]"
        >
          Book New Session <ArrowRight size={13} />
        </Link>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1 shadow-subtle">
          {[
            { id: "upcoming", label: "Upcoming", count: upcoming.length },
            { id: "past", label: "Past & Cancelled", count: past.length },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
                tab === t.id
                  ? "bg-navy-900 text-white shadow-subtle"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <span>{t.label}</span>
              <span
                className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                  tab === t.id ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                }`}
              >
                {t.count}
              </span>
            </button>
          ))}
        </div>

        <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-slate-400">
          <ShieldCheck size={13} className="text-sage-600" /> Stored locally on this browser
        </span>
      </div>

      {/* Appointment Cards */}
      {list.length === 0 ? (
        <EmptyState
          icon={tab === "upcoming" ? CalendarCheck : CalendarX2}
          title={tab === "upcoming" ? "No upcoming consultations scheduled" : "No past sessions found"}
          description={
            tab === "upcoming"
              ? "You haven't booked any demo sessions yet. Explore psychologists near your campus to schedule your first conversation."
              : "Completed, historical, or cancelled sessions will appear here for your records."
          }
          action={
            tab === "upcoming" && (
              <Link
                to="/find"
                className="rounded-full bg-navy-900 px-5 py-2.5 text-xs font-semibold text-white shadow-soft hover:bg-navy-800 transition-all"
              >
                Find a Psychologist
              </Link>
            )
          }
        />
      ) : (
        <div className="space-y-4">
          {list.map((a) => {
            const p = getPsychologistById(a.psychologistId);
            const isCancelled = a.status === "cancelled";
            const isPast = new Date(a.date) < now && !isCancelled;

            return (
              <div
                key={a.id}
                className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-soft transition-all hover:border-slate-300"
              >
                {/* Top status banner */}
                <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/60 px-5 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-medium text-slate-500">Pass #</span>
                    <span className="font-mono text-xs font-bold text-slate-800">{a.id}</span>
                  </div>
                  <StatusBadge status={a.status} isPast={isPast} />
                </div>

                {/* Card body */}
                <div className="p-5 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                  <div className="flex items-start gap-4">
                    <span className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-sage-100 text-sm font-bold text-navy-950 ring-1 ring-sage-300/60 shadow-sm">
                      {p ? p.image : "?"}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-slate-900 font-heading">
                          {a.psychologistName}
                        </h3>
                        {p && (
                          <span className="text-[11px] text-slate-500 hidden sm:inline">
                            · {p.title}
                          </span>
                        )}
                      </div>

                      <div className="mt-2.5 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-slate-600">
                        <span className="flex items-center gap-1.5 font-medium text-slate-800">
                          <CalendarDays size={13} className="text-sage-600" />
                          {formatDateFull(new Date(a.date))}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock3 size={13} className="text-sage-600" />
                          {a.slot}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin size={13} className="text-sage-600" />
                          {a.mode}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 self-end sm:self-center border-t border-slate-100 pt-3 sm:border-t-0 sm:pt-0">
                    {p && (
                      <Link
                        to={`/psychologist/${p.id}`}
                        className="rounded-full border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-subtle hover:bg-slate-50 transition-colors"
                      >
                        Practitioner Details
                      </Link>
                    )}
                    {a.status === "upcoming" && !isPast && (
                      <button
                        onClick={() => setCancelTarget(a.id)}
                        className="inline-flex items-center gap-1 rounded-xl border border-rose-200 bg-rose-50/50 px-3.5 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-100 transition-colors"
                      >
                        <XCircle size={13} /> Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Cancellation confirmation modal */}
      {cancelTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 backdrop-blur-sm animate-in fade-in duration-150"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-sm rounded-3xl border border-slate-200 bg-white p-6 shadow-elevated">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-100 text-rose-700">
                <AlertCircle size={20} />
              </span>
              <div>
                <h2 className="text-base font-bold text-slate-900 font-heading">
                  Cancel Consultation?
                </h2>
                <p className="text-xs text-slate-500">This demo slot will be released.</p>
              </div>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-slate-600">
              Are you sure you wish to cancel this appointment? This action will mark your demo
              booking pass as cancelled.
            </p>

            <div className="mt-6 flex justify-end gap-2.5">
              <button
                onClick={() => setCancelTarget(null)}
                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Keep Session
              </button>
              <button
                onClick={() => {
                  cancelAppointment(cancelTarget);
                  setCancelTarget(null);
                }}
                className="rounded-full bg-rose-700 px-4 py-2 text-xs font-semibold text-white shadow-soft hover:bg-rose-800 transition-colors"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status, isPast }) {
  if (status === "cancelled") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-0.5 text-[11px] font-semibold text-rose-700 border border-rose-200">
        <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
        Cancelled
      </span>
    );
  }
  if (isPast) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-600">
        Completed
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 border border-emerald-200">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
      Confirmed
    </span>
  );
}
