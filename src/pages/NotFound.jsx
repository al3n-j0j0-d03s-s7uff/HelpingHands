import { Link } from "react-router-dom";
import { Compass, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[65vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-sage-50 text-sage-700 ring-1 ring-sage-200/80 shadow-sm">
        <Compass size={28} strokeWidth={1.8} />
      </span>
      <span className="mt-5 text-xs font-bold uppercase tracking-wider text-sage-700 font-heading">
        404 Error
      </span>
      <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 font-heading sm:text-3xl">
        Page not found
      </h1>
      <p className="mt-2 text-xs leading-relaxed text-slate-500 max-w-sm">
        The page you are looking for may have been moved or does not exist. Return to our home directory to explore support.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-navy-900 px-6 py-3 text-xs font-semibold text-white shadow-soft transition-all hover:bg-navy-800 active:scale-[0.98]"
      >
        Return to Homepage <ArrowRight size={13} />
      </Link>
    </div>
  );
}
