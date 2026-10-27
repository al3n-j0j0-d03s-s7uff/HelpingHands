/**
 * Client helper for HelpingHands chat endpoint.
 * Talks to POST /api/chat (proxied to Express -> Ollama).
 */
export async function sendChatMessage(message, history = []) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, history }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || data.detail || `Request failed (${res.status})`);
  }

  return data.reply;
}

export function looksLikeCrisis(text) {
  const t = text.toLowerCase();
  return /suicid|self.?harm|kill myself|end my life|want to die|hurt myself|overdose/.test(t);
}

export const QUICK_PROMPTS = [
  "I'm feeling stressed about exams",
  "How do I find a psychologist near me?",
  "What is the Smart Match quiz?",
  "Help with sleep and anxiety",
];
