// A simple, transparent scoring function used to simulate an "AI-powered"
// recommendation flow, inspired by the interview's request for smart
// matching. This is a demo heuristic, not a real recommendation engine.

export function scorePsychologist(p, prefs) {
  let score = 0;
  const reasons = [];

  if (prefs.concern && p.specializations.includes(prefs.concern)) {
    score += 40;
    reasons.push(`specializes in ${prefs.concern.toLowerCase()}`);
  }

  if (prefs.mode && p.modes.includes(prefs.mode)) {
    score += 20;
    reasons.push(`offers ${prefs.mode.toLowerCase()} sessions`);
  }

  if (prefs.language && p.languages.includes(prefs.language)) {
    score += 15;
    reasons.push(`speaks ${prefs.language}`);
  }

  if (prefs.availability && p.availability === prefs.availability) {
    score += 15;
    reasons.push(p.availability.toLowerCase());
  }

  // Slight boost for closer, better-rated demo profiles so results feel sensible
  score += Math.max(0, 10 - p.distanceKm) * 0.5;
  score += p.rating * 2;

  if (reasons.length === 0) {
    reasons.push("broadly matches your general preferences");
  }

  return {
    psychologist: p,
    score,
    reason: `This demo profile ${reasons.join(", ")}.`,
  };
}

export function rankPsychologists(list, prefs) {
  return list
    .map((p) => scorePsychologist(p, prefs))
    .sort((a, b) => b.score - a.score);
}
