import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Info, Clock, ArrowRight, ShieldCheck } from "lucide-react";
import { getResourceById, RESOURCES } from "../data/resources";
import EmptyState from "../components/EmptyState";

export default function ResourceDetail() {
  const { id } = useParams();
  const resource = getResourceById(id);

  if (!resource) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <EmptyState
          title="Guide article not found"
          description="This article does not exist or may have been updated. Browse our wellness library for available topics."
          action={
            <Link
              to="/resources"
              className="rounded-full bg-navy-900 px-5 py-2.5 text-xs font-semibold text-white shadow-soft hover:bg-navy-800"
            >
              Back to Library
            </Link>
          }
        />
      </div>
    );
  }

  const related = RESOURCES.filter(
    (r) => r.category === resource.category && r.id !== resource.id
  ).slice(0, 2);

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Back link */}
      <Link
        to="/resources"
        className="mb-8 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft size={14} /> Back to Wellness Library
      </Link>

      {/* Article Header */}
      <header className="border-b border-slate-200/70 pb-8">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-sage-50 px-3 py-1 text-xs font-medium text-sage-800 border border-sage-200/60">
            {resource.category}
          </span>
          <span className="flex items-center gap-1 text-xs text-slate-400">
            <Clock size={12} /> 3 min read
          </span>
        </div>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 font-heading sm:text-4xl leading-tight">
          {resource.title}
        </h1>

        <p className="mt-3 text-base leading-relaxed text-slate-600 font-medium">
          {resource.summary}
        </p>

        <div className="mt-5 flex items-center gap-2 text-xs text-slate-400">
          <ShieldCheck size={14} className="text-sage-600" />
          <span>Educational Student Prototype Content · Verified by Counseling Peer Guidelines</span>
        </div>
      </header>

      {/* Main Body */}
      <div className="py-8 prose prose-slate max-w-none">
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-card">
          <p className="text-base leading-relaxed text-slate-700 whitespace-pre-line font-normal">
            {resource.content}
          </p>
        </div>
      </div>

      {/* Advisory Callout */}
      <div className="mt-6 flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4.5 text-xs text-slate-600 shadow-subtle">
        <Info size={16} className="mt-0.5 shrink-0 text-sage-700" />
        <p className="leading-relaxed">
          <strong className="font-semibold text-slate-900">Health Advisory: </strong>
          This article provides general psychological education and is not a substitute for formal diagnosis or clinical treatment.
          If symptoms feel unmanageable, consider{" "}
          <Link to="/find" className="font-semibold text-sage-800 underline hover:text-navy-900">
            booking a confidential consultation
          </Link>{" "}
          or accessing{" "}
          <Link to="/emergency" className="font-semibold text-rose-700 underline hover:text-rose-900">
            Emergency Crisis Helplines
          </Link>.
        </p>
      </div>

      {/* Related Reads */}
      {related.length > 0 && (
        <section className="mt-14 border-t border-slate-200/70 pt-8">
          <h2 className="text-sm font-bold text-slate-900 font-heading">
            More guides in {resource.category}
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {related.map((r) => (
              <Link
                key={r.id}
                to={`/resources/${r.id}`}
                className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-soft transition-all hover:border-slate-300 hover:shadow-card flex flex-col justify-between"
              >
                <div>
                  <span className="text-[11px] font-medium text-sage-700">
                    {r.category}
                  </span>
                  <h3 className="mt-1 text-sm font-bold text-slate-900 font-heading group-hover:text-navy-900 transition-colors">
                    {r.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 line-clamp-2">
                    {r.summary}
                  </p>
                </div>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-sage-700">
                  Read guide <ArrowRight size={12} />
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
