import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  Loader2,
  AlertTriangle,
  ShieldAlert,
  Trash2,
  Maximize2,
} from "lucide-react";
import { sendChatMessage, looksLikeCrisis, QUICK_PROMPTS } from "../utils/chatApi";

const WELCOME = {
  role: "assistant",
  content:
    "Hi, I’m HelpingHands’ wellness companion — a calm, supportive space to talk. I can answer general wellness questions, explain how HelpingHands works, and point you to the right resources or psychologists.\n\nTry asking about exam stress, sleep, or how to book a psychologist. I’m not a diagnosis or replacement for a professional — but I’m here to listen and guide you.",
};

function MessageBubble({ role, content }) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[82%] rounded-2xl px-4 py-3 text-[13.5px] leading-relaxed shadow-subtle ${
          isUser
            ? "rounded-br-sm bg-navy-900 text-white"
            : "rounded-bl-sm border border-slate-200 bg-white text-slate-800"
        }`}
      >
        <p className="whitespace-pre-wrap break-words">{content}</p>
      </div>
    </div>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([WELCOME]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showCrisisHint, setShowCrisisHint] = useState(false);

  const listRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, loading, error]);

  async function handleSend(e) {
    e?.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const crisis = looksLikeCrisis(trimmed);
    if (crisis) setShowCrisisHint(true);

    const nextMessages = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setError("");
    setLoading(true);

    // Build history for backend (exclude welcome if you want, but keep)
    const history = nextMessages
      .filter((m) => m.role === "user" || m.role === "assistant")
      .slice(-12) // keep last 12 to limit context
      .slice(0, -1); // exclude the just-added user msg (backend adds it again); or include — backend builds correctly either way
    // Simpler: pass all except last user, but backend also pushes user message, so dedupe by passing history without last user
    // We'll pass history = messages (previous) as backend expects
    const backendHistory = messages.slice(-10);

    try {
      const reply = await sendChatMessage(trimmed, backendHistory);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      const msg = err.message || "Something went wrong.";
      const isOllamaDown = /Cannot reach Ollama|ollama serve|ECONNREFUSED|Failed to fetch/i.test(msg);
      setError(
        isOllamaDown
          ? "Can’t reach Ollama. Make sure Ollama is running (ollama serve) and model gemma3 is pulled (ollama pull gemma3). Then try again."
          : msg
      );
    } finally {
      setLoading(false);
    }
  }

  function handleQuick(prompt) {
    setInput(prompt);
    // auto-send on next tick
    setTimeout(() => {
      // we need to trigger send with that prompt directly
      const el = document.getElementById("hh-chat-input");
      if (el) el.focus();
    }, 0);
  }

  function handleQuickSend(prompt) {
    if (loading) return;
    setInput("");
    // inject directly
    const crisis = looksLikeCrisis(prompt);
    if (crisis) setShowCrisisHint(true);
    const next = [...messages, { role: "user", content: prompt }];
    setMessages(next);
    setError("");
    setLoading(true);
    const backendHistory = messages.slice(-10);
    sendChatMessage(prompt, backendHistory)
      .then((reply) => setMessages((prev) => [...prev, { role: "assistant", content: reply }]))
      .catch((err) => {
        const msg = err.message || "Something went wrong.";
        const isOllamaDown = /Cannot reach Ollama|ollama serve|ECONNREFUSED|Failed to fetch/i.test(msg);
        setError(
          isOllamaDown
            ? "Can’t reach Ollama. Make sure Ollama is running (ollama serve) and model gemma3 is pulled (ollama pull gemma3)."
            : msg
        );
      })
      .finally(() => setLoading(false));
  }

  function clearChat() {
    setMessages([WELCOME]);
    setError("");
    setShowCrisisHint(false);
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open HelpingHands chat"}
        className={`fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full border shadow-elevated transition-all
          ${open ? "border-slate-300 bg-white text-slate-700" : "border-navy-900 bg-navy-900 text-white hover:bg-navy-800"}
        `}
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
        {!open && (
          <span className="absolute -right-1 -top-1 flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sage-400 opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-sage-500" />
          </span>
        )}
      </button>

      {/* Panel */}
      {open && (
        <div
          className="fixed inset-0 z-40 flex items-end justify-end bg-black/10 backdrop-blur-[1px] sm:bg-transparent sm:backdrop-blur-none"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex h-[min(78vh,640px)] w-full flex-col overflow-hidden border border-slate-200 bg-[#faf7f2] shadow-elevated
              sm:bottom-20 sm:right-5 sm:mb-0 sm:h-[560px] sm:w-[380px] sm:rounded-3xl
              max-sm:rounded-t-3xl max-sm:h-[84vh]"
            role="dialog"
            aria-label="HelpingHands chat"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3.5">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sage-600 text-white">
                  <Sparkles size={16} />
                </span>
                <div>
                  <p className="font-heading text-sm font-medium leading-none text-navy-900">HelpingHands Chat</p>
                  <p className="mt-1 flex items-center gap-1.5 text-[11px] text-slate-500">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Wellness companion · powered by gemma3 (local)
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={clearChat}
                  title="Clear chat"
                  className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                >
                  <Trash2 size={16} />
                </button>
                <Link
                  to="/chat"
                  onClick={() => setOpen(false)}
                  title="Open full page"
                  className="hidden sm:inline-flex rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                >
                  <Maximize2 size={16} />
                </Link>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Crisis soft banner */}
            {showCrisisHint && (
              <div className="flex items-start gap-2 border-b border-rose-200 bg-rose-50 px-4 py-3 text-xs leading-relaxed text-rose-800">
                <ShieldAlert size={16} className="mt-0.5 shrink-0 text-rose-600" />
                <div className="flex-1">
                  <p className="font-medium">If you’re in distress right now, please reach out immediately.</p>
                  <p className="mt-0.5 text-rose-700/90">
                    Talk to someone you trust, or visit our{" "}
                    <Link to="/emergency" onClick={() => setOpen(false)} className="underline decoration-rose-300 underline-offset-2 hover:text-rose-900">
                      Emergency support
                    </Link>{" "}
                    for helplines. You don’t have to face this alone.
                  </p>
                </div>
                <button onClick={() => setShowCrisisHint(false)} className="shrink-0 text-rose-400 hover:text-rose-700">
                  <X size={14} />
                </button>
              </div>
            )}

            {/* Messages */}
            <div ref={listRef} className="flex-1 overflow-y-auto bg-[#faf7f2] px-4 py-5">
              <div className="flex flex-col gap-3.5">
                {messages.map((m, i) => (
                  <MessageBubble key={i} role={m.role} content={m.content} />
                ))}

                {loading && (
                  <div className="flex justify-start">
                    <div className="flex items-center gap-2 rounded-2xl rounded-bl-sm border border-slate-200 bg-white px-4 py-3 shadow-subtle">
                      <Loader2 size={14} className="animate-spin text-sage-600" />
                      <span className="text-xs text-slate-500">HelpingHands is thinking…</span>
                      <span className="flex gap-1">
                        <span className="h-1 w-1 animate-bounce rounded-full bg-sage-400 [animation-delay:0ms]" />
                        <span className="h-1 w-1 animate-bounce rounded-full bg-sage-400 [animation-delay:150ms]" />
                        <span className="h-1 w-1 animate-bounce rounded-full bg-sage-400 [animation-delay:300ms]" />
                      </span>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs leading-relaxed text-rose-800">
                    <div className="flex items-start gap-2">
                      <AlertTriangle size={14} className="mt-0.5 shrink-0 text-rose-600" />
                      <p className="flex-1">{error}</p>
                    </div>
                    <button
                      onClick={() => setError("")}
                      className="mt-2 text-xs font-medium text-rose-700 underline decoration-rose-300 underline-offset-2 hover:text-rose-900"
                    >
                      Dismiss
                    </button>
                  </div>
                )}
              </div>

              {/* Quick prompts — show when only welcome + maybe 1 exchange */}
              {messages.length <= 3 && !loading && (
                <div className="mt-6">
                  <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">Try asking</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {QUICK_PROMPTS.map((q) => (
                      <button
                        key={q}
                        onClick={() => handleQuickSend(q)}
                        className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-700 hover:border-navy-900 hover:text-navy-900"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <p className="mt-6 text-center text-[10.5px] leading-relaxed text-slate-400">
                This companion offers general wellness information only. It doesn’t diagnose, prescribe, or replace a professional.
                <br />
                For urgent help, visit <Link to="/emergency" onClick={() => setOpen(false)} className="underline decoration-slate-300 underline-offset-2 hover:text-slate-600">Emergency</Link>.
              </p>
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="border-t border-slate-200 bg-white p-3">
              <div className="flex items-center gap-2 rounded-full border border-slate-300 bg-white px-2 py-1.5 shadow-subtle focus-within:border-sage-400 focus-within:ring-2 focus-within:ring-sage-100">
                <input
                  id="hh-chat-input"
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Share what’s on your mind…"
                  className="flex-1 bg-transparent px-3 py-1.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
                  aria-label="Chat message"
                  disabled={loading}
                  maxLength={4000}
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-900 text-white transition-colors hover:bg-navy-800 disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} className="ml-0.5" />}
                </button>
              </div>
              <div className="mt-2 flex items-center justify-between px-1">
                <Link to="/chat" onClick={() => setOpen(false)} className="text-[11px] text-slate-400 hover:text-slate-600 underline decoration-slate-300 underline-offset-2">
                  Open full chat page →
                </Link>
                <span className="text-[10px] text-slate-400">{input.length}/4000</span>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
