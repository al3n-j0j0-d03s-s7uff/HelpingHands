export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200/80 bg-white px-6 py-16 text-center shadow-subtle">
      {Icon && (
        <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-sage-50 text-sage-700 ring-1 ring-sage-200/60 shadow-sm">
          <Icon size={24} strokeWidth={1.8} />
        </span>
      )}
      <h3 className="text-base font-semibold text-slate-900 font-heading">{title}</h3>
      {description && (
        <p className="mt-1.5 max-w-md text-sm text-slate-500 leading-relaxed">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
