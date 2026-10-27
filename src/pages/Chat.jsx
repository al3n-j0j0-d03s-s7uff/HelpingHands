import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Send, Loader2, Sparkles, Trash2, ArrowLeft, ShieldAlert, AlertTriangle } from "lucide-react";
import { sendChatMessage, looksLikeCrisis, QUICK_PROMPTS } from "../utils/chatApi";

const WELCOME = {
  role: "assistant",
  content:
    "Welcome to HelpingHands Chat.\n\nI’m your calm wellness companion — here to listen, answer general wellness questions, and guide you through HelpingHands (finding psychologists, Smart Match, resources, and booking).\n\nHow are you feeling today? You can also try one of the prompts below.",
};

function Bubble({ role, content }) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[78%] rounded-2xl px-5 py-3.5 text-[14px] leading-relaxed shadow-subtle ${
          isUser ? "rounded-br-sm bg-navy-900 text-white" : "rounded-bl-sm border border-slate-200 bg-white text-slate-800"
        }`}
      >
        <p className="whitespace-pre-wrap break-words">{content}</p>
      </div>
    </div>
  );
}

export default function Chat() {
  const [messages, setMessages] = useState([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [crisis, setCrisis] = useState(false);
  const listRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, loading, error]);

  async function send(promptOverride) {
    const raw = (promptOverride ?? input).trim();
    if (!raw || loading) return;
    if (looksLikeCrisis(raw)) setCrisis(true);
    const next = [...messages, { role: "user", content: raw }];
    setMessages(next);
    setInput("");
    setError("");
    setLoading(true);
    const history = messages.slice(-10);
    try {
      const reply = await sendChatMessage(raw, history);
      setMessages((p) => [...p, { role: "assistant", content: reply }]);
    } catch (e) {
      const msg = e.message || "Request failed.";
      const isDown = /Cannot reach Ollama|ollama serve|ECONNREFUSED|Failed to fetch/i.test(msg);
      setError(isDown ? "Can’t reach Ollama. Run: ollama serve  and  ollama pull gemma3, then try again." : msg);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }

  return (
    <div className="mx-auto flex max-w-5xl flex-col px-4 py-6 sm:px-6 lg:px-8">
      <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-navy-900">
        <ArrowLeft size={14} /> Back to home
      </Link>

      <div className="mt-4 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft">
        {/* header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-[#faf7f2] px-5 py-4 sm:px-7">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sage-600 text-white">
              <Sparkles size={18} />
            </span>
            <div>
              <h1 className="font-heading text-base font-medium text-navy-900">HelpingHands Chat</h1>
              <p className="text-xs text-slate-500">Local · gemma3 via Ollama · supportive, non-diagnostic</p>
            </div>
          </div>
          <button
            onClick={() => {
              setMessages([WELCOME]);
              setError("");
              setCrisis(false);
            }}
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:border-navy-900 hover:text-navy-900"
          >
            <Trash2 size={13} /> Clear
          </button>
        </div>

        {crisis && (
          <div className="flex items-start gap-2 border-b border-rose-200 bg-rose-50 px-5 py-3 text-xs leading-relaxed text-rose-800 sm:px-7">
            <ShieldAlert size={16} className="mt-0.5 shrink-0 text-rose-600" />
            <div className="flex-1">
              If you’re feeling unsafe or having thoughts of harming yourself, please reach out right now — talk to a trusted person and visit{" "}
              <Link to="/emergency" className="underline decoration-rose-300 underline-offset-2 hover:text-rose-900">
                Emergency support
              </Link>{" "}
              for immediate helplines.
            </div>
            <button onClick={() => setCrisis(false)} className="text-rose-400 hover:text-rose-700">
              Dismiss
            </button>
          </div>
        )}

        {/* messages */}
        <div ref={listRef} className="h-[52vh] overflow-y-auto bg-[#faf7f2] px-4 py-6 sm:h-[56vh] sm:px-7">
          <div className="flex flex-col gap-4">
            {messages.map((m, i) => (
              <Bubble key={i} role={m.role} content={m.content} />
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl rounded-bl-sm border border-slate-200 bg-white px-4 py-3 text-xs text-slate-500 shadow-subtle">
                  <Loader2 size={14} className="animate-spin text-sage-600" /> HelpingHands is thinking…
                </div>
              </div>
            )}
            {error && (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs leading-relaxed text-rose-800">
                <div className="flex items-start gap-2">
                  <AlertTriangle size={14} className="mt-0.5 shrink-0 text-rose-600" />
                  <span>{error}</span>
                </div>
              </div>
            )}
          </div>

          {messages.length <= 2 && (
            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Quick starts</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {QUICK_PROMPTS.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    disabled={loading}
                    className="rounded-full border border-slate-300 bg-[#faf7f2] px-4 py-2 text-xs font-medium text-slate-700 hover:border-navy-900 hover:text-navy-900 disabled:opacity-50"
                  >
                    {q}
                  </button>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <Link to="/find" className="rounded-full border border-sage-300 bg-sage-50 px-3 py-1.5 font-medium text-sage-800 hover:bg-sage-100">
                  → Find a Psychologist
                </Link>
                <Link to="/match" className="rounded-full border border-slate-300 bg-white px-3 py-1.5 font-medium text-slate-700 hover:border-navy-900">
                  → Take Smart Match Quiz
                </Link>
                <Link to="/resources" className="rounded-full border border-slate-300 bg-white px-3 py-1.5 font-medium text-slate-700 hover:border-navy-900">
                  → Wellness Library
                </Link>
              </div>
            </div>
          )}

          <p className="mt-6 text-center text-[11px] leading-relaxed text-slate-400">
            General wellness information only — not a diagnosis, prescription, or substitute for a licensed professional. In crisis, go to{" "}
            <Link to="/emergency" className="underline decoration-slate-300 underline-offset-2">
              Emergency
            </Link>
            .
          </p>
        </div>

        {/* input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
          className="border-t border-slate-200 bg-white p-4 sm:p-5"
        >
          <div className="flex items-center gap-2 rounded-full border border-slate-300 bg-white px-2 py-1.5 shadow-subtle focus-within:border-sage-400 focus-within:ring-2 focus-within:ring-sage-100">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message…"
              className="flex-1 bg-transparent px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
              disabled={loading}
              maxLength={4000}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy-900 text-white hover:bg-navy-800 disabled:opacity-40"
              aria-label="Send"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} className="ml-0.5" />}
            </button>
          </div>
          <div className="mt-2 text-right text-[10px] text-slate-400">{input.length}/4000</div>
        </form>
      </div>

      <p className="mx-auto mt-4 max-w-2xl text-center text-xs leading-relaxed text-slate-500">
        Tip: HelpingHands keeps the Ollama connection server-side. Your chat is sent to <code className="rounded bg-slate-100 px-1 py-0.5 text-[11px]">POST /api/chat → http://localhost:11434/api/chat</code> using local model <code className="rounded bg-slate-100 px-1 py-0.5 text-[11px]">gemma3</code>.
      </p>
    </div>
  );
}
