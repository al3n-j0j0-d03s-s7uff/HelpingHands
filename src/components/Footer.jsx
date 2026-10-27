import { Link } from "react-router-dom";
import { ShieldAlert, ArrowUpRight } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-[#f2ede3] text-slate-700">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand & mission */}
          <div className="lg:col-span-2">
            <Logo className="mb-4" />
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-600">
              Connecting students with qualified mental health professionals, smart matching,
              and grounded psychological resources — reducing referral friction for students and faculty alike.
            </p>
            <div className="mt-6 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white/70 px-3 py-1 text-xs font-medium text-slate-600">
                <span className="h-1.5 w-1.5 rounded-full bg-sage-600" />
                Design Thinking Student Prototype
              </span>
            </div>
          </div>

          {/* Column: Platform */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-navy-900 font-heading">Platform</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-600">
              <li>
                <Link className="transition-colors hover:text-navy-900" to="/find">
                  Find a Psychologist
                </Link>
              </li>
              <li>
                <Link className="transition-colors hover:text-navy-900" to="/match">
                  Smart Match
                </Link>
              </li>
              <li>
                <Link className="transition-colors hover:text-navy-900" to="/resources">
                  Wellness Library
                </Link>
              </li>
              <li>
                <Link className="transition-colors hover:text-navy-900" to="/appointments">
                  My Appointments
                </Link>
              </li>
            </ul>
          </div>

          {/* Column: Project */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-navy-900 font-heading">Project</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-600">
              <li>
                <Link className="transition-colors hover:text-navy-900" to="/about">
                  Our Story & Problem
                </Link>
              </li>
              <li>
                <Link className="transition-colors hover:text-navy-900" to="/about">
                  Design Thinking Process
                </Link>
              </li>
              <li>
                <Link className="transition-colors hover:text-navy-900" to="/login">
                  Demo Login / Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Column: Crisis Support */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-rose-700 font-heading">Need Urgent Help?</h3>
            <p className="mt-3 text-xs leading-relaxed text-slate-600">
              If you or someone you know is in immediate crisis, do not wait for an appointment.
            </p>
            <Link
              to="/emergency"
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-rose-300 bg-rose-50 px-4 py-2 text-xs font-semibold text-rose-700 transition-colors hover:bg-rose-100"
            >
              <ShieldAlert size={14} />
              <span>Crisis Support</span>
              <ArrowUpRight size={12} />
            </Link>
          </div>
        </div>

        {/* Lower footer */}
        <div className="mt-14 border-t border-slate-300/70 pt-8 flex flex-col gap-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} HelpingHands · Academic Prototype for Design Thinking.</p>
          <p className="max-w-xl text-slate-500 leading-relaxed sm:text-right">
            HelpingHands does not provide medical diagnosis, clinical treatment, or real-time emergency care.
            All psychologist profiles and reviews shown are simulated demo data.
          </p>
        </div>
      </div>
    </footer>
  );
}
