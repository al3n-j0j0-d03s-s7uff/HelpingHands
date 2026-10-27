import { useEffect, useState, useRef } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut, CalendarClock, ChevronDown, ShieldAlert } from "lucide-react";
import Logo from "./Logo";
import { useAuth } from "../context/AuthContext";

const navLinks = [
  { label: "Find a Psychologist", to: "/find" },
  { label: "Smart Match", to: "/match" },
  { label: "How It Works", to: "/#how-it-works" },
  { label: "Resources", to: "/resources" },
  { label: "Chat", to: "/chat" },
  { label: "About", to: "/about" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    setOpen(false);
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleHowItWorks(e) {
    e.preventDefault();
    setOpen(false);
    if (location.pathname === "/") {
      document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/#how-it-works");
    }
  }

  function handleLogout() {
    logout();
    setMenuOpen(false);
    navigate("/");
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-[#faf7f2]/95 backdrop-blur-md">
      {/* Top row: crisis link · logo · account actions */}
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="hidden lg:flex lg:items-center lg:gap-1 lg:w-48">
          <Link
            to="/emergency"
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-rose-700 transition-colors hover:bg-rose-50"
            title="Immediate Crisis & Emergency Support"
          >
            <ShieldAlert size={13} />
            <span>Crisis</span>
          </Link>
        </div>

        <Logo className="mx-auto lg:mx-0" />

        {/* Desktop actions */}
        <div className="hidden lg:flex lg:w-48 lg:items-center lg:justify-end lg:gap-4">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="flex items-center gap-2 rounded-full border border-slate-300 bg-transparent py-1.5 pl-1.5 pr-3 text-sm text-slate-700 transition-colors hover:border-slate-400 focus:outline-none"
                aria-haspopup="true"
                aria-expanded={menuOpen}
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-navy-900 text-[11px] font-semibold text-white">
                  {user.name.charAt(0).toUpperCase()}
                </span>
                <span className="max-w-[90px] truncate text-[13px] font-medium">
                  {user.name.split(" ")[0]}
                </span>
                <ChevronDown size={13} className="text-slate-400" />
              </button>

              {menuOpen && (
                <div className="absolute right-0 top-12 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 shadow-card">
                  <div className="border-b border-slate-100 px-3 py-2">
                    <p className="text-xs text-slate-500">Signed in as</p>
                    <p className="truncate text-xs font-semibold text-slate-900">{user.email}</p>
                  </div>
                  <Link
                    to="/appointments"
                    className="mt-1 flex items-center gap-2.5 rounded-xl px-3 py-2 text-[13px] font-medium text-slate-700 transition-colors hover:bg-sage-50 hover:text-sage-900"
                    onClick={() => setMenuOpen(false)}
                  >
                    <CalendarClock size={15} className="text-sage-600" /> My Appointments
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-[13px] font-medium text-rose-600 transition-colors hover:bg-rose-50"
                  >
                    <LogOut size={15} /> Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-1.5 text-[13px] font-medium text-slate-700 transition-colors hover:text-navy-900"
            >
              <User size={15} className="text-slate-500" />
              <span>Login</span>
            </Link>
          )}

          <Link
            to="/find"
            className="inline-flex items-center justify-center rounded-full border border-navy-900 bg-navy-900 px-4 py-2 text-[13px] font-medium text-white transition-all hover:bg-transparent hover:text-navy-900"
          >
            Find Support
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="inline-flex items-center justify-center rounded-full p-2 text-slate-700 transition-colors hover:bg-slate-100 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Bottom row: centered editorial nav links */}
      <nav
        className="hidden border-t border-slate-200/70 lg:block"
        aria-label="Main navigation"
      >
        <div className="mx-auto flex h-12 max-w-7xl items-center justify-center gap-8 px-4">
          {navLinks.map((link) =>
            link.label === "How It Works" ? (
              <a
                key={link.label}
                href={link.to}
                onClick={handleHowItWorks}
                className="text-[12.5px] font-medium uppercase tracking-wide text-slate-600 transition-colors hover:text-navy-900"
              >
                {link.label}
              </a>
            ) : (
              <NavLink
                key={link.label}
                to={link.to}
                className={({ isActive }) =>
                  `text-[12.5px] font-medium uppercase tracking-wide transition-colors ${
                    isActive ? "text-navy-900" : "text-slate-600 hover:text-navy-900"
                  }`
                }
              >
                {link.label}
              </NavLink>
            )
          )}
        </div>
      </nav>

      {/* Mobile navigation drawer */}
      {open && (
        <div className="border-t border-slate-200 bg-[#faf7f2] px-5 pb-6 pt-3 lg:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) =>
              link.label === "How It Works" ? (
                <a
                  key={link.label}
                  href={link.to}
                  onClick={handleHowItWorks}
                  className="rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
                >
                  {link.label}
                </a>
              ) : (
                <NavLink
                  key={link.label}
                  to={link.to}
                  className={({ isActive }) =>
                    `rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
                      isActive ? "bg-sage-100 text-sage-900" : "text-slate-700 hover:bg-slate-100"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              )
            )}

            <Link
              to="/emergency"
              className="mt-1 flex items-center gap-2 rounded-xl bg-rose-50 px-3.5 py-2.5 text-sm font-semibold text-rose-700"
            >
              <ShieldAlert size={16} /> Crisis Support
            </Link>

            <div className="mt-3 flex flex-col gap-2.5 border-t border-slate-200 pt-4">
              {user ? (
                <>
                  <div className="flex items-center gap-2.5 px-3 py-1">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-900 text-xs font-bold text-white">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-slate-900">{user.name}</span>
                      <span className="text-[11px] text-slate-500">{user.email}</span>
                    </div>
                  </div>
                  <Link
                    to="/appointments"
                    className="flex items-center gap-2 rounded-full border border-slate-300 px-3.5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    <CalendarClock size={16} className="text-sage-600" /> My Appointments
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 rounded-full px-3.5 py-2 text-left text-sm font-medium text-rose-600 hover:bg-rose-50"
                  >
                    <LogOut size={16} /> Log out
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center justify-center gap-2 rounded-full border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  <User size={16} /> Login to Demo Account
                </Link>
              )}
              <Link
                to="/find"
                className="mt-1 flex items-center justify-center rounded-full bg-navy-900 px-4 py-2.5 text-center text-sm font-medium text-white"
              >
                Find Support
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
