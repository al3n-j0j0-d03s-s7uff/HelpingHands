import { Link } from "react-router-dom";

export default function Logo({ className = "", light = false }) {
  return (
    <Link
      to="/"
      className={`flex items-center gap-2 shrink-0 group ${className}`}
      aria-label="HelpingHands home"
    >
      <span
        className={`font-heading text-[22px] font-medium tracking-tight leading-none transition-colors ${
          light ? "text-white" : "text-navy-900"
        }`}
      >
        Helping<span className={light ? "text-sage-300" : "text-sage-600"}>Hands</span>
      </span>
    </Link>
  );
}
