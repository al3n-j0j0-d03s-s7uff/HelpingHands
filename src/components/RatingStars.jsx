import { Star } from "lucide-react";

export default function RatingStars({ rating, reviewCount, size = 14, className = "" }) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`} aria-label={`Demo rating ${rating} out of 5`}>
      <div className="flex items-center text-amber-500">
        <Star size={size} className="fill-amber-400 text-amber-400 drop-shadow-[0_1px_2px_rgba(251,191,36,0.2)]" />
      </div>
      <span className="text-xs font-bold text-slate-800 tracking-tight">{rating.toFixed(1)}</span>
      {reviewCount != null && (
        <span className="text-[11px] font-medium text-slate-500">({reviewCount})</span>
      )}
    </div>
  );
}
