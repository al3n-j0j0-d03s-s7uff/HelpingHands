import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Mail, Lock, Info, ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Logo from "../components/Logo";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  function validate() {
    const errs = {};
    if (!form.email.trim()) {
      errs.email = "Please enter your student or personal email.";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      errs.email = "Please enter a valid email address.";
    }
    if (!form.password) {
      errs.password = "Please enter your password.";
    } else if (form.password.length < 4) {
      errs.password = "Password must be at least 4 characters.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    const name = form.email.split("@")[0].replace(/\W/g, " ").trim() || "Student";
    login({ name: capitalize(name), email: form.email });
    const redirectTo = location.state?.from || "/appointments";
    navigate(redirectTo);
  }

  return (
    <div className="mx-auto flex min-h-[75vh] max-w-md flex-col justify-center px-4 py-12 sm:px-6">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <Logo />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 font-heading sm:text-3xl">
          Welcome back
        </h1>
        <p className="mt-1.5 text-xs text-slate-500">
          Sign in to access your appointments and saved session details.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-4.5 rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-card"
      >
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

        <Field label="Password" error={errors.password}>
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

        <button
          type="submit"
          className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-navy-900 px-6 py-3 text-xs font-semibold text-white shadow-soft transition-all hover:bg-navy-800 active:scale-[0.98]"
        >
          Sign in to Demo Account <ArrowRight size={14} />
        </button>

        <div className="flex items-start gap-2.5 rounded-xl bg-slate-50 border border-slate-200/60 p-3 text-[11px] text-slate-500 leading-relaxed">
          <Info size={14} className="mt-0.5 shrink-0 text-sage-600" />
          <span>
            Any simulated email and 4+ character password will create an active demo session stored locally.
          </span>
        </div>
      </form>

      <p className="mt-6 text-center text-xs text-slate-500">
        New student user?{" "}
        <Link to="/register" className="font-semibold text-navy-900 underline hover:text-navy-700">
          Create a demo account
        </Link>
      </p>
    </div>
  );
}

function capitalize(s) {
  return s.replace(/\b\w/g, (c) => c.toUpperCase());
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
