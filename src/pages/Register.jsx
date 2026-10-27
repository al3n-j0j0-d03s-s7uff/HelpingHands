import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, Info, ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Logo from "../components/Logo";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});

  function validate() {
    const errs = {};
    if (!form.name.trim()) errs.name = "Please enter your full name.";
    if (!form.email.trim()) {
      errs.email = "Please enter your student or personal email.";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      errs.email = "Please enter a valid email address.";
    }
    if (!form.password) {
      errs.password = "Please create a password.";
    } else if (form.password.length < 4) {
      errs.password = "Password must be at least 4 characters.";
    }
    if (form.confirm !== form.password) {
      errs.confirm = "Passwords do not match.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    register({ name: form.name, email: form.email });
    navigate("/appointments");
  }

  return (
    <div className="mx-auto flex min-h-[75vh] max-w-md flex-col justify-center px-4 py-12 sm:px-6">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <Logo />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 font-heading sm:text-3xl">
          Create student account
        </h1>
        <p className="mt-1.5 text-xs text-slate-500">
          Get started with demo session booking and personalized wellness resources.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-4 rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-card"
      >
        <Field label="Full name" error={errors.name}>
          <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50/40 px-3.5 py-2.5 transition-colors focus-within:border-sage-400 focus-within:bg-white">
            <User size={16} className="text-slate-400 shrink-0" />
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="e.g. Alen Thomas"
              className="w-full border-none bg-transparent text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none"
            />
          </div>
        </Field>

        <Field label="Email address" error={errors.email}>
          <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50/40 px-3.5 py-2.5 transition-colors focus-within:border-sage-400 focus-within:bg-white">
            <Mail size={16} className="text-slate-400 shrink-0" />
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              placeholder="student@university.edu"
              className="w-full border-none bg-transparent text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none"
            />
          </div>
        </Field>

        <Field label="Create password" error={errors.password}>
          <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50/40 px-3.5 py-2.5 transition-colors focus-within:border-sage-400 focus-within:bg-white">
            <Lock size={16} className="text-slate-400 shrink-0" />
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              placeholder="••••••••"
              className="w-full border-none bg-transparent text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none"
            />
          </div>
        </Field>

        <Field label="Confirm password" error={errors.confirm}>
          <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50/40 px-3.5 py-2.5 transition-colors focus-within:border-sage-400 focus-within:bg-white">
            <Lock size={16} className="text-slate-400 shrink-0" />
            <input
              type="password"
              value={form.confirm}
              onChange={(e) => setForm((f) => ({ ...f, confirm: e.target.value }))}
              placeholder="••••••••"
              className="w-full border-none bg-transparent text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none"
            />
          </div>
        </Field>

        <button
          type="submit"
          className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-navy-900 px-6 py-3 text-xs font-semibold text-white shadow-soft transition-all hover:bg-navy-800 active:scale-[0.98]"
        >
          Create Demo Account <ArrowRight size={14} />
        </button>

        <div className="flex items-start gap-2.5 rounded-xl bg-slate-50 border border-slate-200/60 p-3 text-[11px] text-slate-500 leading-relaxed">
          <Info size={14} className="mt-0.5 shrink-0 text-sage-600" />
          <span>
            Prototype note: No server authentication or external tracking is used. Data remains in this browser's local storage.
          </span>
        </div>
      </form>

      <p className="mt-6 text-center text-xs text-slate-500">
        Already registered?{" "}
        <Link to="/login" className="font-semibold text-navy-900 underline hover:text-navy-700">
          Sign in
        </Link>
      </p>
    </div>
  );
}

function Field({ label, children, error }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-600 font-heading">
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-[11px] text-rose-600">{error}</p>}
    </div>
  );
}
