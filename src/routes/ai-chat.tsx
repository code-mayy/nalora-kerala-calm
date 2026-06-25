import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { InnerNav } from "@/components/InnerNav";
import { ProtectedPage } from "@/context/AuthContext";

export const Route = createFileRoute("/ai-chat")({
  head: () => ({
    meta: [
      { title: "Free AI Chat – Nalora" },
      { name: "description", content: "Talk to Nalora's AI-powered emotional support companion, available 24/7 for postpartum care and support." },
    ],
  }),
  component: AiChatPage,
});

type Msg = { id: number; role: "user" | "bot"; text: string; time: string };

const QUICK_PROMPTS = [
  "I'm feeling overwhelmed today",
  "I can't sleep at night",
  "I feel disconnected from my baby",
  "How do I manage anxiety?",
];

const BOT_REPLIES = [
  "I hear you, and I want you to know — what you're feeling is completely valid. Postpartum emotions can be intense and unpredictable. Would you like to share a little more about what's been weighing on you?",
  "Thank you for trusting me with that. Many mothers experience exactly this. You're not alone in this journey, and reaching out is already a brave step. 💛",
  "That sounds really difficult. Let's take a slow breath together. Inhale for 4 counts, hold for 4, exhale for 4. Would you like me to walk you through a gentle grounding exercise?",
  "I understand. Sleep deprivation can amplify every emotion. Have you been able to speak with anyone close to you about how you're feeling? I'm also here whenever you need to talk.",
  "Your feelings are real and important. Postpartum identity shifts are more common than many realise. Would you like to explore some gentle strategies that have helped other mothers through similar experiences?",
  "It takes strength to reach out. I'm here, and together we can navigate this. Would you like me to connect you with one of our therapists for a more in-depth conversation?",
];

function getTime() {
  return new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
}

function AiChatPage() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: 0,
      role: "bot",
      text: "Namaste 🌸 I'm Nalora, your emotional support companion. I'm here to listen without judgment, anytime you need. How are you feeling today?",
      time: "",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const replyIdx = useRef(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Populate correct time after mounting to avoid hydration mismatch
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].id === 0 && prev[0].time === "") {
        return [{ ...prev[0], time: getTime() }];
      }
      return prev;
    });
  }, []);

  useEffect(() => {
    if (messages.length > 1) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  function sendMessage(text?: string) {
    const msg = (text ?? input).trim();
    if (!msg || isTyping) return;
    setInput("");
    const userMsg: Msg = { id: Date.now(), role: "user", text: msg, time: getTime() };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // n8n webhook integration point — replace with actual endpoint
    // fetch("https://your-n8n-instance.com/webhook/nalora-chat", { method: "POST", body: JSON.stringify({ message: msg }) })
    setTimeout(
      () => {
        setIsTyping(false);
        const reply = BOT_REPLIES[replyIdx.current % BOT_REPLIES.length];
        replyIdx.current++;
        setMessages((prev) => [...prev, { id: Date.now() + 1, role: "bot", text: reply, time: getTime() }]);
      },
      1400 + Math.random() * 800,
    );
  }

  return (
    <ProtectedPage allowedRole="patient">
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: "var(--ivory)", fontFamily: "var(--font-sans)" }}>
      <InnerNav />

      {/* Chat container */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", maxWidth: "780px", width: "100%", margin: "0 auto", overflow: "hidden" }}>
        {/* Chat header bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            padding: "16px 24px",
            background: "white",
            borderBottom: "1px solid oklch(0.92 0.02 55)",
            boxShadow: "0 2px 12px oklch(0 0 0 / 0.04)",
          }}
        >
          <div
            style={{
              width: "44px", height: "44px", borderRadius: "50%",
              background: "linear-gradient(135deg, var(--rose), var(--sunset))",
              display: "grid", placeItems: "center", flexShrink: 0,
              boxShadow: "0 4px 12px oklch(0.74 0.11 18 / 0.3)",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", fontWeight: 600, color: "var(--charcoal)" }}>Nalora AI</div>
            <div style={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "2px" }}>
              <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#4ade80", display: "block", animation: "pulse-green 2s infinite" }} />
              <span style={{ fontSize: "0.75rem", color: "oklch(0.55 0.01 60)" }}>Online · n8n-powered emotional support</span>
            </div>
          </div>
          <div
            style={{
              fontSize: "0.7rem", padding: "5px 12px", borderRadius: "99px",
              background: "oklch(0.74 0.11 18 / 0.1)", color: "var(--rose)", fontWeight: 600, letterSpacing: "0.04em",
            }}
          >
            FREE
          </div>
        </div>

        {/* Quick prompts */}
        {messages.length <= 1 && (
          <div style={{ padding: "16px 24px 0", display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {QUICK_PROMPTS.map((p) => (
              <button
                key={p}
                onClick={() => sendMessage(p)}
                style={{
                  padding: "8px 14px",
                  borderRadius: "99px",
                  border: "1.5px solid oklch(0.88 0.02 55)",
                  background: "white",
                  fontSize: "0.78rem",
                  color: "oklch(0.45 0.01 60)",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  fontFamily: "var(--font-sans)",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--rose)"; (e.currentTarget as HTMLElement).style.color = "var(--rose)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.88 0.02 55)"; (e.currentTarget as HTMLElement).style.color = "oklch(0.45 0.01 60)"; }}
              >
                {p}
              </button>
            ))}
          </div>
        )}

        {/* Messages */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px", display: "flex", flexDirection: "column", gap: "14px" }}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{ display: "flex", flexDirection: msg.role === "user" ? "row-reverse" : "row", gap: "10px", alignItems: "flex-end" }}
            >
              {msg.role === "bot" && (
                <div
                  style={{
                    width: "30px", height: "30px", borderRadius: "50%", flexShrink: 0,
                    background: "linear-gradient(135deg, var(--rose), var(--sunset))",
                    display: "grid", placeItems: "center",
                  }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
              )}

              <div style={{ maxWidth: "72%" }}>
                <div
                  style={{
                    padding: "13px 17px",
                    borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                    background: msg.role === "user"
                      ? "linear-gradient(135deg, var(--rose), var(--sunset))"
                      : "white",
                    color: msg.role === "user" ? "white" : "var(--charcoal)",
                    fontSize: "0.88rem",
                    lineHeight: 1.65,
                    boxShadow: msg.role === "user"
                      ? "0 4px 14px oklch(0.74 0.11 18 / 0.22)"
                      : "0 2px 10px oklch(0 0 0 / 0.05)",
                    border: msg.role === "bot" ? "1px solid oklch(0.92 0.02 55)" : "none",
                  }}
                >
                  {msg.text}
                </div>
                <div
                  style={{
                    fontSize: "0.68rem",
                    color: "oklch(0.7 0.01 60)",
                    marginTop: "4px",
                    textAlign: msg.role === "user" ? "right" : "left",
                    paddingInline: "4px",
                  }}
                >
                  {msg.time}
                </div>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div style={{ display: "flex", alignItems: "flex-end", gap: "10px" }}>
              <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: "linear-gradient(135deg, var(--rose), var(--sunset))", display: "grid", placeItems: "center" }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <div
                style={{
                  padding: "14px 18px", borderRadius: "18px 18px 18px 4px",
                  background: "white", border: "1px solid oklch(0.92 0.02 55)",
                  boxShadow: "0 2px 10px oklch(0 0 0 / 0.05)",
                  display: "flex", gap: "5px", alignItems: "center",
                }}
              >
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    style={{
                      width: "7px", height: "7px", borderRadius: "50%",
                      background: "var(--rose)",
                      display: "block",
                      animation: `typing-dot 1.2s ${i * 0.2}s ease-in-out infinite`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Disclaimer */}
        <div style={{ padding: "8px 24px 0", fontSize: "0.7rem", color: "oklch(0.65 0.01 60)", textAlign: "center" }}>
          🔒 This chat is confidential and powered by n8n AI. For emergencies, call 112 or iCall: 9152987821.
        </div>

        {/* Input area */}
        <div style={{ padding: "14px 24px 20px", display: "flex", gap: "10px", alignItems: "flex-end" }}>
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
            }}
            placeholder="Share what's on your mind… (Enter to send, Shift+Enter for new line)"
            rows={2}
            style={{
              flex: 1,
              padding: "13px 16px",
              borderRadius: "16px",
              border: "1.5px solid oklch(0.88 0.02 55)",
              background: "white",
              fontSize: "0.88rem",
              color: "var(--charcoal)",
              outline: "none",
              resize: "none",
              fontFamily: "var(--font-sans)",
              lineHeight: 1.55,
              boxSizing: "border-box",
              transition: "border-color 0.2s",
              boxShadow: "0 2px 10px oklch(0 0 0 / 0.04)",
            }}
            onFocus={(e) => { e.target.style.borderColor = "var(--rose)"; }}
            onBlur={(e) => { e.target.style.borderColor = "oklch(0.88 0.02 55)"; }}
          />
          <button
            id="chat-send-btn"
            onClick={() => sendMessage()}
            disabled={!input.trim() || isTyping}
            style={{
              width: "50px", height: "50px", borderRadius: "14px", border: "none", flexShrink: 0,
              background: input.trim() && !isTyping
                ? "linear-gradient(135deg, var(--rose), var(--sunset))"
                : "oklch(0.92 0.01 60)",
              color: "white", cursor: input.trim() && !isTyping ? "pointer" : "not-allowed",
              display: "grid", placeItems: "center",
              transition: "all 0.2s",
              boxShadow: input.trim() && !isTyping ? "0 4px 14px oklch(0.74 0.11 18 / 0.28)" : "none",
            }}
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes typing-dot {
          0%, 60%, 100% { transform: scale(0.75); opacity: 0.4; }
          30% { transform: scale(1.15); opacity: 1; }
        }
        @keyframes pulse-green {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
    </ProtectedPage>
  );
}
