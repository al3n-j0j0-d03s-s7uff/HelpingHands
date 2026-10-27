import { ShieldCheck } from "lucide-react";

export default function DemoBadge({ className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-sage-200/80 bg-sage-50/70 px-2.5 py-0.5 text-[11px] font-medium text-sage-800 ${className}`}
      title="This is a demo verification badge for prototype purposes only"
    >
      <ShieldCheck size={12} className="text-sage-600" />
      <span>Prototype Verified</span>
    </span>
  );
}
