import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { InnerNav } from "@/components/InnerNav";
import { ProtectedPage } from "@/context/AuthContext";
import therapist1 from "@/assets/therapist-1.jpg";
import therapist2 from "@/assets/therapist-2.jpg";
import therapist3 from "@/assets/therapist-3.jpg";

export const Route = createFileRoute("/bookings")({
  head: () => ({
    meta: [
      { title: "Your Bookings – Nalora" },
      {
        name: "description",
        content:
          "View and track your upcoming appointments, past session histories, and cancelled sessions on Nalora.",
      },
    ],
  }),
  component: BookingsPage,
});

type BookingStatus = "upcoming" | "past" | "cancelled";

type Booking = {
  id: number;
  doctorName: string;
  doctorRole: string;
  doctorImg: string | null;
  date: string;
  time: string;
  type: string;
  price: string;
  status: BookingStatus;
  sessionNote?: string;
};

const BOOKINGS: Booking[] = [
  {
    id: 1,
    doctorName: "Aisha Menon",
    doctorRole: "Consultant Psychologist",
    doctorImg: therapist1,
    date: "Sat, Jul 5, 2026",
    time: "04:00 PM",
    type: "Video Call · 60 min",
    price: "₹1,000",
    status: "upcoming",
  },
  {
    id: 2,
    doctorName: "Dr. Rohan Iyer",
    doctorRole: "Perinatal Psychiatrist",
    doctorImg: therapist3,
    date: "Mon, Jul 7, 2026",
    time: "11:00 AM",
    type: "Video Call · 60 min",
    price: "₹1,500",
    status: "upcoming",
  },
  {
    id: 3,
    doctorName: "Lakshmi Pillai",
    doctorRole: "Clinical Psychologist",
    doctorImg: therapist2,
    date: "Tue, Jun 17, 2026",
    time: "10:00 AM",
    type: "Video Call · 60 min",
    price: "₹1,200",
    status: "past",
    sessionNote:
      "Focused on birth trauma processing and coping strategies. Follow-up exercises assigned.",
  },
  {
    id: 4,
    doctorName: "Aisha Menon",
    doctorRole: "Consultant Psychologist",
    doctorImg: therapist1,
    date: "Wed, Jun 4, 2026",
    time: "02:00 PM",
    type: "Video Call · 60 min",
    price: "₹1,000",
    status: "past",
    sessionNote:
      "Introductory session. Discussed postpartum anxiety triggers and sleep support plan.",
  },
  {
    id: 5,
    doctorName: "Dr. Meera Krishnan",
    doctorRole: "Perinatal Counselor",
    doctorImg: null,
    date: "Mon, Jun 23, 2026",
    time: "03:00 PM",
    type: "Video Call · 60 min",
    price: "₹900",
    status: "cancelled",
    sessionNote: "Cancelled by patient 2 hours before session. No charge applied.",
  },
];

const STATUS_CONFIG = {
  upcoming: { label: "Upcoming", color: "#2563eb", bg: "#eff6ff", dot: "#60a5fa" },
  past: { label: "Completed", color: "#16a34a", bg: "#f0fdf4", dot: "#4ade80" },
  cancelled: { label: "Cancelled", color: "#dc2626", bg: "#fef2f2", dot: "#f87171" },
};

function BookingCard({ booking, onCancel }: { booking: Booking; onCancel?: (id: number) => void }) {
  const [expanded, setExpanded] = useState(false);
  const cfg = STATUS_CONFIG[booking.status];

  return (
    <div
      style={{
        background: "white",
        borderRadius: "20px",
        border: "1px solid oklch(0.92 0.02 55)",
        overflow: "hidden",
        transition: "box-shadow 0.25s",
        boxShadow: "0 2px 12px oklch(0 0 0 / 0.04)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px oklch(0 0 0 / 0.09)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px oklch(0 0 0 / 0.04)";
      }}
    >
      {/* Status bar */}
      <div
        style={{ height: "4px", background: `linear-gradient(90deg, ${cfg.color}, ${cfg.dot})` }}
      />

      <div style={{ padding: "20px 24px" }}>
        <div
          style={{
            display: "flex",
            gap: "14px",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", gap: "14px", alignItems: "center", flex: 1 }}>
            {booking.doctorImg ? (
              <img
                src={booking.doctorImg}
                alt={booking.doctorName}
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "12px",
                  objectFit: "cover",
                  flexShrink: 0,
                }}
              />
            ) : (
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "12px",
                  background: "oklch(0.95 0.02 18)",
                  display: "grid",
                  placeItems: "center",
                  fontFamily: "var(--font-display)",
                  fontSize: "1.4rem",
                  color: "var(--rose)",
                  fontWeight: 600,
                  flexShrink: 0,
                }}
              >
                {booking.doctorName.charAt(0)}
              </div>
            )}
            <div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "var(--charcoal)",
                  margin: 0,
                }}
              >
                {booking.doctorName}
              </h3>
              <p
                style={{
                  fontSize: "0.76rem",
                  color: "var(--rose)",
                  fontWeight: 500,
                  margin: "2px 0 0",
                }}
              >
                {booking.doctorRole}
              </p>
            </div>
          </div>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
              padding: "5px 11px",
              borderRadius: "99px",
              background: cfg.bg,
              color: cfg.color,
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.04em",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: cfg.dot,
                display: "block",
              }}
            />
            {cfg.label}
          </span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
            gap: "10px",
            marginTop: "18px",
          }}
        >
          {[
            { icon: "📅", label: booking.date },
            { icon: "🕐", label: booking.time },
            { icon: "🎥", label: booking.type },
            { icon: "💳", label: booking.price },
          ].map(({ icon, label }) => (
            <div
              key={label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "9px 12px",
                borderRadius: "10px",
                background: "oklch(0.97 0.01 60)",
                fontSize: "0.8rem",
                color: "oklch(0.45 0.01 60)",
                fontWeight: 500,
              }}
            >
              <span>{icon}</span> {label}
            </div>
          ))}
        </div>

        {booking.sessionNote && (
          <div style={{ marginTop: "14px" }}>
            <button
              onClick={() => setExpanded((e) => !e)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "0.78rem",
                color: "oklch(0.55 0.05 55)",
                fontWeight: 600,
                padding: 0,
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              {expanded ? "▲" : "▼"}{" "}
              {booking.status === "cancelled" ? "Cancellation note" : "Session note"}
            </button>
            {expanded && (
              <div
                style={{
                  marginTop: "10px",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  background: "oklch(0.97 0.015 60)",
                  border: "1px solid oklch(0.91 0.02 55)",
                  fontSize: "0.82rem",
                  color: "oklch(0.45 0.01 60)",
                  lineHeight: 1.65,
                }}
              >
                {booking.sessionNote}
              </div>
            )}
          </div>
        )}

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "18px",
            paddingTop: "16px",
            borderTop: "1px solid oklch(0.94 0.01 60)",
          }}
        >
          {booking.status === "upcoming" && (
            <>
              <Link
                to="/book-session"
                style={{
                  flex: 1,
                  padding: "11px",
                  borderRadius: "12px",
                  textAlign: "center",
                  background: "linear-gradient(135deg, var(--rose), var(--sunset))",
                  color: "white",
                  fontSize: "0.84rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  boxShadow: "0 4px 14px oklch(0.74 0.11 18 / 0.22)",
                }}
              >
                Reschedule
              </Link>
              <button
                onClick={() => onCancel?.(booking.id)}
                style={{
                  flex: 1,
                  padding: "11px",
                  borderRadius: "12px",
                  border: "1.5px solid oklch(0.88 0.02 55)",
                  background: "white",
                  color: "oklch(0.5 0.01 60)",
                  fontSize: "0.84rem",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </>
          )}
          {booking.status === "past" && (
            <>
              <Link
                to="/feedback"
                style={{
                  flex: 1,
                  padding: "11px",
                  borderRadius: "12px",
                  textAlign: "center",
                  background: "linear-gradient(135deg, var(--rose), var(--sunset))",
                  color: "white",
                  fontSize: "0.84rem",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Leave Feedback
              </Link>
              <Link
                to="/book-session"
                style={{
                  flex: 1,
                  padding: "11px",
                  borderRadius: "12px",
                  textAlign: "center",
                  border: "1.5px solid oklch(0.88 0.02 55)",
                  background: "white",
                  color: "oklch(0.45 0.01 60)",
                  fontSize: "0.84rem",
                  fontWeight: 500,
                  textDecoration: "none",
                }}
              >
                Book Again
              </Link>
            </>
          )}
          {booking.status === "cancelled" && (
            <Link
              to="/book-session"
              style={{
                flex: 1,
                padding: "11px",
                borderRadius: "12px",
                textAlign: "center",
                background: "oklch(0.97 0.01 60)",
                border: "1.5px solid oklch(0.88 0.02 55)",
                color: "oklch(0.45 0.01 60)",
                fontSize: "0.84rem",
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              Book a New Session
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

const TABS: { key: BookingStatus; label: string; emoji: string }[] = [
  { key: "upcoming", label: "Upcoming", emoji: "📆" },
  { key: "past", label: "Past Sessions", emoji: "✅" },
  { key: "cancelled", label: "Cancelled", emoji: "❌" },
];

function BookingsPage() {
  const [activeTab, setActiveTab] = useState<BookingStatus>("upcoming");
  const [bookings, setBookings] = useState(BOOKINGS);

  function cancelBooking(id: number) {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "cancelled" as BookingStatus } : b)),
    );
  }

  const filtered = bookings.filter((b) => b.status === activeTab);
  const counts = {
    upcoming: bookings.filter((b) => b.status === "upcoming").length,
    past: bookings.filter((b) => b.status === "past").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
  };

  return (
    <ProtectedPage allowedRole="patient">
      <div
        style={{ minHeight: "100vh", background: "var(--ivory)", fontFamily: "var(--font-sans)" }}
      >
        <InnerNav />

        {/* Hero */}
        <div
          style={{
            background:
              "linear-gradient(160deg, oklch(0.96 0.03 18) 0%, oklch(0.97 0.025 55) 100%)",
            padding: "52px 24px 36px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--rose)",
              marginBottom: "8px",
            }}
          >
            My Appointments
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
              fontWeight: 600,
              color: "var(--charcoal)",
              margin: "0 0 14px",
            }}
          >
            Your Bookings
          </h1>
          <p
            style={{
              fontSize: "0.92rem",
              color: "oklch(0.55 0.01 60)",
              maxWidth: "400px",
              margin: "0 auto 28px",
              lineHeight: 1.7,
            }}
          >
            Track your upcoming sessions, view past history, and manage your appointments.
          </p>
          <Link
            to="/book-session"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "13px 28px",
              borderRadius: "99px",
              background: "linear-gradient(135deg, var(--rose), var(--sunset))",
              color: "white",
              fontWeight: 600,
              fontSize: "0.9rem",
              textDecoration: "none",
              boxShadow: "0 8px 24px oklch(0.74 0.11 18 / 0.28)",
            }}
          >
            + Book New Session
          </Link>
        </div>

        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "32px 24px 80px" }}>
          {/* Tabs */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "28px", flexWrap: "wrap" }}>
            {TABS.map(({ key, label, emoji }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                style={{
                  padding: "11px 20px",
                  borderRadius: "99px",
                  border: `2px solid ${activeTab === key ? "var(--rose)" : "oklch(0.89 0.02 55)"}`,
                  background: activeTab === key ? "oklch(0.74 0.11 18 / 0.09)" : "white",
                  color: activeTab === key ? "var(--rose)" : "oklch(0.5 0.01 60)",
                  fontWeight: activeTab === key ? 700 : 500,
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span>{emoji}</span>
                {label}
                <span
                  style={{
                    minWidth: "20px",
                    height: "20px",
                    borderRadius: "99px",
                    background: activeTab === key ? "var(--rose)" : "oklch(0.9 0.01 60)",
                    color: activeTab === key ? "white" : "oklch(0.55 0.01 60)",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    display: "grid",
                    placeItems: "center",
                    padding: "0 5px",
                  }}
                >
                  {counts[key]}
                </span>
              </button>
            ))}
          </div>

          {/* Booking list */}
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 20px", color: "oklch(0.6 0.01 60)" }}>
              <div style={{ fontSize: "3rem", marginBottom: "14px" }}>
                {activeTab === "upcoming" ? "📅" : activeTab === "past" ? "📋" : "🚫"}
              </div>
              <p style={{ fontSize: "1rem", marginBottom: "20px" }}>
                {activeTab === "upcoming"
                  ? "No upcoming sessions."
                  : activeTab === "past"
                    ? "No past sessions yet."
                    : "No cancelled sessions."}
              </p>
              {activeTab === "upcoming" && (
                <Link
                  to="/book-session"
                  style={{
                    display: "inline-flex",
                    padding: "12px 28px",
                    borderRadius: "99px",
                    background: "linear-gradient(135deg, var(--rose), var(--sunset))",
                    color: "white",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    textDecoration: "none",
                  }}
                >
                  Book Your First Session
                </Link>
              )}
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {filtered.map((b) => (
                <BookingCard key={b.id} booking={b} onCancel={cancelBooking} />
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedPage>
  );
}
