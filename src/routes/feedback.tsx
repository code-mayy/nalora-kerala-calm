import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { InnerNav } from "@/components/InnerNav";
import { ProtectedPage } from "@/context/AuthContext";
import therapist1 from "@/assets/therapist-1.jpg";
import therapist2 from "@/assets/therapist-2.jpg";
import therapist3 from "@/assets/therapist-3.jpg";

export const Route = createFileRoute("/feedback")({
  head: () => ({
    meta: [
      { title: "Feedback – Nalora" },
      { name: "description", content: "Rate and write performance reviews for your completed Nalora sessions." },
    ],
  }),
  component: FeedbackPage,
});

type Session = {
  id: number;
  doctorName: string;
  doctorRole: string;
  doctorImg: string | null;
  date: string;
  time: string;
  reviewed: boolean;
};

const SESSIONS: Session[] = [
  {
    id: 1,
    doctorName: "Lakshmi Pillai",
    doctorRole: "Clinical Psychologist",
    doctorImg: therapist2,
    date: "Tue, Jun 17, 2026",
    time: "10:00 AM",
    reviewed: false,
  },
  {
    id: 2,
    doctorName: "Aisha Menon",
    doctorRole: "Consultant Psychologist",
    doctorImg: therapist1,
    date: "Wed, Jun 4, 2026",
    time: "02:00 PM",
    reviewed: false,
  },
  {
    id: 3,
    doctorName: "Dr. Rohan Iyer",
    doctorRole: "Perinatal Psychiatrist",
    doctorImg: therapist3,
    date: "Mon, May 19, 2026",
    time: "11:00 AM",
    reviewed: true,
  },
];

const FEEDBACK_TAGS = [
  "Very helpful", "Felt heard", "Calming", "Professional",
  "Great listener", "Practical advice", "Would recommend", "Punctual",
];

function StarInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div style={{ display: "flex", gap: "6px" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange(star)}
          style={{ background: "none", border: "none", cursor: "pointer", padding: "2px", transition: "transform 0.15s", transform: hover >= star || value >= star ? "scale(1.15)" : "scale(1)" }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill={(hover || value) >= star ? "#F5A25D" : "none"}
            stroke={(hover || value) >= star ? "#F5A25D" : "#d4d4d4"}
            strokeWidth="1.5"
            style={{ transition: "fill 0.15s, stroke 0.15s", filter: (hover || value) >= star ? "drop-shadow(0 2px 4px rgba(245,162,93,0.4))" : "none" }}
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </button>
      ))}
    </div>
  );
}

const RATING_LABELS: Record<number, string> = {
  1: "Poor experience",
  2: "Below expectations",
  3: "Good session",
  4: "Very helpful",
  5: "Exceptional! 🌸",
};

function ReviewCard({ session, onSubmit }: { session: Session; onSubmit: (id: number) => void }) {
  const [rating, setRating] = useState(0);
  const [tags, setTags] = useState<string[]>([]);
  const [review, setReview] = useState("");
  const [submitted, setSubmitted] = useState(session.reviewed);
  const [anonymous, setAnonymous] = useState(false);

  function toggleTag(tag: string) {
    setTags((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]);
  }

  function handleSubmit() {
    if (rating === 0) return;
    setSubmitted(true);
    onSubmit(session.id);
  }

  return (
    <div
      style={{
        background: "white",
        borderRadius: "22px",
        border: "1px solid oklch(0.92 0.02 55)",
        overflow: "hidden",
        boxShadow: "0 2px 12px oklch(0 0 0 / 0.04)",
        transition: "box-shadow 0.25s",
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px oklch(0 0 0 / 0.08)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px oklch(0 0 0 / 0.04)"; }}
    >
      {/* Accent bar */}
      <div style={{ height: "4px", background: submitted ? "linear-gradient(90deg, var(--coconut), #4ade80)" : "linear-gradient(90deg, var(--rose), var(--sunset))" }} />

      <div style={{ padding: "24px 28px" }}>
        {/* Doctor info row */}
        <div style={{ display: "flex", gap: "14px", alignItems: "center", marginBottom: "20px" }}>
          {session.doctorImg ? (
            <img src={session.doctorImg} alt={session.doctorName} style={{ width: "52px", height: "52px", borderRadius: "12px", objectFit: "cover" }} />
          ) : (
            <div style={{ width: "52px", height: "52px", borderRadius: "12px", background: "oklch(0.96 0.02 18)", display: "grid", placeItems: "center", fontFamily: "var(--font-display)", fontSize: "1.4rem", color: "var(--rose)", fontWeight: 600 }}>
              {session.doctorName.charAt(0)}
            </div>
          )}
          <div style={{ flex: 1 }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", fontWeight: 600, color: "var(--charcoal)", margin: 0 }}>{session.doctorName}</h3>
            <p style={{ fontSize: "0.76rem", color: "var(--rose)", fontWeight: 500, margin: "2px 0 0" }}>{session.doctorRole}</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "0.76rem", color: "oklch(0.6 0.01 60)" }}>{session.date}</div>
            <div style={{ fontSize: "0.76rem", color: "oklch(0.6 0.01 60)" }}>{session.time}</div>
          </div>
        </div>

        {submitted ? (
          /* Submitted state */
          <div style={{ textAlign: "center", padding: "28px 16px" }}>
            <div
              style={{
                width: "56px", height: "56px", borderRadius: "50%",
                background: "linear-gradient(135deg, var(--coconut), #4ade80)",
                display: "grid", placeItems: "center", margin: "0 auto 16px",
                boxShadow: "0 8px 24px oklch(0.62 0.08 145 / 0.3)",
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 600, color: "var(--charcoal)", marginBottom: "6px" }}>
              Thank you for your feedback!
            </p>
            <p style={{ fontSize: "0.82rem", color: "oklch(0.58 0.01 60)" }}>
              Your review helps us improve care for every mother.
            </p>
          </div>
        ) : (
          /* Review form */
          <div>
            {/* Star rating */}
            <div style={{ marginBottom: "20px" }}>
              <div style={{ fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "oklch(0.5 0.01 60)", marginBottom: "10px" }}>
                How was your session?
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <StarInput value={rating} onChange={setRating} />
                {rating > 0 && (
                  <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "oklch(0.55 0.07 55)", animation: "fadeIn 0.2s ease" }}>
                    {RATING_LABELS[rating]}
                  </span>
                )}
              </div>
            </div>

            {/* Quick tags */}
            <div style={{ marginBottom: "20px" }}>
              <div style={{ fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "oklch(0.5 0.01 60)", marginBottom: "10px" }}>
                What stood out? (optional)
              </div>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {FEEDBACK_TAGS.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    type="button"
                    style={{
                      padding: "7px 14px",
                      borderRadius: "99px",
                      border: `1.5px solid ${tags.includes(tag) ? "var(--rose)" : "oklch(0.88 0.02 55)"}`,
                      background: tags.includes(tag) ? "oklch(0.74 0.11 18 / 0.09)" : "white",
                      color: tags.includes(tag) ? "var(--rose)" : "oklch(0.5 0.01 60)",
                      fontSize: "0.78rem",
                      fontWeight: tags.includes(tag) ? 700 : 400,
                      cursor: "pointer",
                      transition: "all 0.18s",
                    }}
                  >
                    {tags.includes(tag) ? "✓ " : ""}
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Written review */}
            <div style={{ marginBottom: "16px" }}>
              <label style={{ fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "oklch(0.5 0.01 60)", display: "block", marginBottom: "8px" }}>
                Written Review (optional)
              </label>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Share your experience to help other mothers find the right support…"
                rows={3}
                style={{
                  width: "100%",
                  padding: "13px 16px",
                  borderRadius: "14px",
                  border: "1.5px solid oklch(0.88 0.02 55)",
                  background: "oklch(0.985 0.008 60)",
                  fontSize: "0.88rem",
                  color: "var(--charcoal)",
                  outline: "none",
                  resize: "vertical",
                  fontFamily: "var(--font-sans)",
                  lineHeight: 1.55,
                  boxSizing: "border-box",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => { e.target.style.borderColor = "var(--rose)"; }}
                onBlur={(e) => { e.target.style.borderColor = "oklch(0.88 0.02 55)"; }}
              />
              <div style={{ fontSize: "0.7rem", color: "oklch(0.7 0.01 60)", marginTop: "4px", textAlign: "right" }}>{review.length}/500</div>
            </div>

            {/* Anonymous toggle */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
              <button
                type="button"
                onClick={() => setAnonymous((a) => !a)}
                style={{
                  width: "42px", height: "24px", borderRadius: "99px", border: "none", cursor: "pointer", padding: "2px",
                  background: anonymous ? "var(--rose)" : "oklch(0.88 0.02 55)",
                  transition: "background 0.2s",
                  display: "flex", alignItems: "center",
                  justifyContent: anonymous ? "flex-end" : "flex-start",
                }}
              >
                <span style={{ width: "20px", height: "20px", borderRadius: "50%", background: "white", display: "block", boxShadow: "0 1px 4px rgba(0,0,0,0.2)", transition: "all 0.2s" }} />
              </button>
              <span style={{ fontSize: "0.82rem", color: "oklch(0.5 0.01 60)" }}>Submit anonymously</span>
            </div>

            <button
              onClick={handleSubmit}
              disabled={rating === 0}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "14px",
                border: "none",
                background: rating > 0 ? "linear-gradient(135deg, var(--rose), var(--sunset))" : "oklch(0.92 0.01 60)",
                color: "white",
                fontWeight: 700,
                fontSize: "0.92rem",
                cursor: rating > 0 ? "pointer" : "not-allowed",
                boxShadow: rating > 0 ? "0 6px 22px oklch(0.74 0.11 18 / 0.3)" : "none",
                transition: "all 0.2s",
                letterSpacing: "0.02em",
              }}
            >
              {rating === 0 ? "Select a rating to submit" : "Submit Feedback →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function FeedbackPage() {
  const [sessions, setSessions] = useState(SESSIONS);

  function markReviewed(id: number) {
    setSessions((prev) => prev.map((s) => (s.id === id ? { ...s, reviewed: true } : s)));
  }

  const pending = sessions.filter((s) => !s.reviewed);
  const done = sessions.filter((s) => s.reviewed);

  return (
    <ProtectedPage allowedRole="patient">
    <div style={{ minHeight: "100vh", background: "var(--ivory)", fontFamily: "var(--font-sans)" }}>
      <InnerNav />

      {/* Hero */}
      <div style={{ background: "linear-gradient(160deg, oklch(0.96 0.03 18) 0%, oklch(0.97 0.025 55) 100%)", padding: "52px 24px 36px", textAlign: "center" }}>
        <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--rose)", marginBottom: "8px" }}>Share Your Experience</p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 600, color: "var(--charcoal)", margin: "0 0 14px" }}>
          Session Feedback
        </h1>
        <p style={{ fontSize: "0.92rem", color: "oklch(0.55 0.01 60)", maxWidth: "440px", margin: "0 auto", lineHeight: 1.7 }}>
          Your honest reviews help other mothers find the right support and help us improve every session.
        </p>
      </div>

      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "36px 24px 80px" }}>
        {/* Stats bar */}
        <div
          style={{
            display: "flex", gap: "16px", marginBottom: "32px", padding: "18px 24px",
            borderRadius: "18px", background: "white", border: "1px solid oklch(0.92 0.02 55)",
            boxShadow: "0 2px 12px oklch(0 0 0 / 0.04)",
            flexWrap: "wrap",
          }}
        >
          {[
            { label: "Total Sessions", value: sessions.length, icon: "🎯" },
            { label: "Reviewed", value: done.length, icon: "✅" },
            { label: "Pending Review", value: pending.length, icon: "📝" },
          ].map(({ label, value, icon }) => (
            <div key={label} style={{ flex: 1, minWidth: "100px", textAlign: "center" }}>
              <div style={{ fontSize: "1.6rem", marginBottom: "4px" }}>{icon}</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700, color: "var(--charcoal)" }}>{value}</div>
              <div style={{ fontSize: "0.75rem", color: "oklch(0.6 0.01 60)", marginTop: "2px" }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Pending reviews */}
        {pending.length > 0 && (
          <div style={{ marginBottom: "36px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <span
                style={{
                  width: "8px", height: "8px", borderRadius: "50%",
                  background: "var(--rose)", display: "block",
                  animation: "pulse-dot 2s infinite",
                }}
              />
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", fontWeight: 600, color: "var(--charcoal)", margin: 0 }}>
                Awaiting Your Review
              </h2>
              <span style={{ fontSize: "0.75rem", padding: "3px 10px", borderRadius: "99px", background: "oklch(0.74 0.11 18 / 0.1)", color: "var(--rose)", fontWeight: 700 }}>
                {pending.length}
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {pending.map((s) => (
                <ReviewCard key={s.id} session={s} onSubmit={markReviewed} />
              ))}
            </div>
          </div>
        )}

        {/* Completed reviews */}
        {done.length > 0 && (
          <div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", fontWeight: 600, color: "oklch(0.55 0.01 60)", margin: "0 0 16px" }}>
              Reviewed Sessions
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {done.map((s) => (
                <ReviewCard key={s.id} session={s} onSubmit={markReviewed} />
              ))}
            </div>
          </div>
        )}

        {sessions.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 20px", color: "oklch(0.6 0.01 60)" }}>
            <div style={{ fontSize: "3rem", marginBottom: "14px" }}>📋</div>
            <p style={{ marginBottom: "20px" }}>You haven't completed any sessions yet.</p>
            <Link to="/book-session" style={{ padding: "12px 28px", borderRadius: "99px", background: "linear-gradient(135deg, var(--rose), var(--sunset))", color: "white", fontWeight: 600, fontSize: "0.9rem", textDecoration: "none" }}>
              Book Your First Session
            </Link>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(6px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.4); }
        }
      `}</style>
    </div>
    </ProtectedPage>
  );
}
