import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { DoctorNav } from "@/components/DoctorNav";
import { ProtectedPage } from "@/context/AuthContext";

export const Route = createFileRoute("/doctor/dashboard")({
  head: () => ({
    meta: [
      { title: "Doctor Dashboard – Nalora" },
      {
        name: "description",
        content: "View your upcoming consultations, patient stats, and log clinical diary entries.",
      },
    ],
  }),
  component: DoctorDashboard,
});

// Mock initial data
const MOCK_MEETINGS = [
  {
    id: 1,
    patient: "Anjali Menon",
    time: "09:00 AM",
    duration: "45 mins",
    type: "Postpartum Anxiety Session",
    status: "completed",
    notesLogged: true,
  },
  {
    id: 2,
    patient: "Priyanka Raj",
    time: "11:30 AM",
    duration: "45 mins",
    type: "PPD Routine Followup",
    status: "completed",
    notesLogged: true,
  },
  {
    id: 3,
    patient: "Sneha Nair",
    time: "02:00 PM",
    duration: "60 mins",
    type: "Birth Trauma Consultation",
    status: "in-progress",
    notesLogged: false,
    meetLink: "https://meet.google.com/abc-defg-hij",
  },
  {
    id: 4,
    patient: "Divya Pillai",
    time: "04:00 PM",
    duration: "45 mins",
    type: "Hormonal Mood Shifts Review",
    status: "upcoming",
    notesLogged: false,
    meetLink: "https://meet.google.com/klm-nopq-rst",
  },
  {
    id: 5,
    patient: "Meera Krishnan",
    time: "06:30 PM",
    duration: "45 mins",
    type: "First Time Motherhood Exhaustion",
    status: "upcoming",
    notesLogged: false,
    meetLink: "https://meet.google.com/uvw-xyz1-abc",
  },
];

function DoctorDashboard() {
  const [diaryText, setDiaryText] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [meetings, setMeetings] = useState(MOCK_MEETINGS);
  const [mounted, setMounted] = useState(false);

  // Load clinical diary entries
  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("nalora_doctor_diary_summary");
      if (saved) setDiaryText(saved);
    }
  }, []);

  function handleSaveDiary() {
    if (typeof window !== "undefined") {
      localStorage.setItem("nalora_doctor_diary_summary", diaryText);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    }
  }

  // Calculate metrics
  const totalToday = meetings.length;
  const completed = meetings.filter((m) => m.status === "completed").length;
  const hoursCompleted = (completed * 45) / 60; // Estimate
  const pendingNotes = meetings.filter((m) => m.status === "completed" && !m.notesLogged).length;

  return (
    <ProtectedPage allowedRole="doctor">
      <div
        style={{
          minHeight: "100vh",
          background: "oklch(0.985 0.005 240)",
          fontFamily: "var(--font-sans)",
        }}
      >
        <DoctorNav />

        {/* Top welcome banner */}
        <div
          style={{
            background:
              "linear-gradient(160deg, oklch(0.92 0.01 240) 0%, oklch(0.95 0.01 240) 100%)",
            borderBottom: "1px solid oklch(0.9 0.01 240)",
            padding: "48px 32px 40px",
          }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <p
              style={{
                fontSize: "0.8rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "oklch(0.5 0.04 200)",
                marginBottom: "8px",
              }}
            >
              Practitioner Portal
            </p>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.1rem, 3.8vw, 2.7rem)",
                fontWeight: 600,
                color: "var(--charcoal)",
                margin: 0,
              }}
            >
              Welcome Back, Dr. Aisha Menon
            </h1>
            <p style={{ color: "oklch(0.55 0.01 240)", fontSize: "1rem", marginTop: "6px" }}>
              Here is your overview for today,{" "}
              {mounted
                ? new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : ""}
              .
            </p>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div
          style={{
            maxWidth: "1200px",
            margin: "32px auto",
            padding: "0 24px 80px",
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "28px",
          }}
          className="dashboard-layout"
        >
          {/* Stats / Metrics */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "20px",
            }}
          >
            {/* Stat 1 */}
            <div
              style={{
                background: "white",
                padding: "24px",
                borderRadius: "20px",
                border: "1px solid oklch(0.92 0.01 240)",
                boxShadow: "0 4px 16px oklch(0 0 0 / 0.02)",
              }}
            >
              <div
                style={{
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  color: "oklch(0.55 0.01 240)",
                  letterSpacing: "0.06em",
                }}
              >
                Today's Sessions
              </div>
              <div
                style={{
                  fontSize: "2.3rem",
                  fontWeight: 700,
                  color: "var(--charcoal)",
                  marginTop: "10px",
                }}
              >
                {totalToday}
              </div>
              <div
                style={{
                  fontSize: "0.85rem",
                  color: "oklch(0.5 0.04 200)",
                  fontWeight: 500,
                  marginTop: "6px",
                }}
              >
                {completed} Completed / {totalToday - completed} Remaining
              </div>
            </div>

            {/* Stat 2 */}
            <div
              style={{
                background: "white",
                padding: "24px",
                borderRadius: "20px",
                border: "1px solid oklch(0.92 0.01 240)",
                boxShadow: "0 4px 16px oklch(0 0 0 / 0.02)",
              }}
            >
              <div
                style={{
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  color: "oklch(0.55 0.01 240)",
                  letterSpacing: "0.06em",
                }}
              >
                Clinical Hours
              </div>
              <div
                style={{
                  fontSize: "2.3rem",
                  fontWeight: 700,
                  color: "var(--charcoal)",
                  marginTop: "10px",
                }}
              >
                {hoursCompleted.toFixed(1)}{" "}
                <span
                  style={{ fontSize: "1.05rem", fontWeight: 500, color: "oklch(0.6 0.01 240)" }}
                >
                  hrs
                </span>
              </div>
              <div style={{ fontSize: "0.85rem", color: "oklch(0.6 0.01 240)", marginTop: "6px" }}>
                Delivered sessions today
              </div>
            </div>

            {/* Stat 3 */}
            <div
              style={{
                background: "white",
                padding: "24px",
                borderRadius: "20px",
                border: "1px solid oklch(0.92 0.01 240)",
                boxShadow: "0 4px 16px oklch(0 0 0 / 0.02)",
              }}
            >
              <div
                style={{
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  color: "oklch(0.55 0.01 240)",
                  letterSpacing: "0.06em",
                }}
              >
                Pending Clinic Notes
              </div>
              <div
                style={{
                  fontSize: "2.3rem",
                  fontWeight: 700,
                  color: pendingNotes > 0 ? "oklch(0.55 0.1 20)" : "var(--charcoal)",
                  marginTop: "10px",
                }}
              >
                {pendingNotes}
              </div>
              <div style={{ fontSize: "0.85rem", color: "oklch(0.6 0.01 240)", marginTop: "6px" }}>
                Requires patient records log
              </div>
            </div>

            {/* Stat 4 */}
            <div
              style={{
                background: "white",
                padding: "24px",
                borderRadius: "20px",
                border: "1px solid oklch(0.92 0.01 240)",
                boxShadow: "0 4px 16px oklch(0 0 0 / 0.02)",
              }}
            >
              <div
                style={{
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  color: "oklch(0.55 0.01 240)",
                  letterSpacing: "0.06em",
                }}
              >
                Avg Session Rating
              </div>
              <div
                style={{
                  fontSize: "2.3rem",
                  fontWeight: 700,
                  color: "var(--charcoal)",
                  marginTop: "10px",
                }}
              >
                4.9⭐
              </div>
              <div
                style={{
                  fontSize: "0.85rem",
                  color: "oklch(0.5 0.04 200)",
                  fontWeight: 500,
                  marginTop: "6px",
                }}
              >
                Based on last 30 reviews
              </div>
            </div>
          </div>

          {/* Main sections: Schedule (Left) & Personal Diary (Right) */}
          <div
            style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "28px" }}
            className="dashboard-content-split"
          >
            {/* Today's Schedule */}
            <div
              style={{
                background: "white",
                padding: "32px",
                borderRadius: "24px",
                border: "1px solid oklch(0.92 0.01 240)",
                boxShadow: "0 4px 20px oklch(0 0 0 / 0.01)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "24px",
                }}
              >
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.35rem",
                    fontWeight: 600,
                    color: "var(--charcoal)",
                    margin: 0,
                  }}
                >
                  Today's consultation schedule
                </h2>
                <Link
                  to="/doctor/meetings"
                  style={{
                    fontSize: "0.88rem",
                    color: "oklch(0.5 0.04 200)",
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  View All Meetings →
                </Link>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {meetings.map((meet) => (
                  <div
                    key={meet.id}
                    className="schedule-row"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "20px",
                      borderRadius: "16px",
                      background: "oklch(0.99 0.003 240)",
                      border: `1px solid ${meet.status === "in-progress" ? "oklch(0.5 0.04 200 / 0.3)" : "oklch(0.95 0.01 240)"}`,
                      boxShadow:
                        meet.status === "in-progress"
                          ? "0 4px 16px oklch(0.5 0.04 200 / 0.06)"
                          : "none",
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <span
                          style={{
                            fontSize: "0.82rem",
                            color: "oklch(0.5 0.01 240)",
                            fontWeight: 600,
                          }}
                        >
                          {meet.time}
                        </span>
                        <span style={{ fontSize: "0.78rem", color: "oklch(0.6 0.01 240)" }}>
                          ({meet.duration})
                        </span>

                        {/* Status Tag */}
                        {meet.status === "completed" && (
                          <span
                            style={{
                              fontSize: "0.75rem",
                              fontWeight: 700,
                              padding: "2px 8px",
                              borderRadius: "99px",
                              background: "oklch(0.95 0.02 145)",
                              color: "oklch(0.35 0.06 145)",
                            }}
                          >
                            Completed
                          </span>
                        )}
                        {meet.status === "in-progress" && (
                          <span
                            style={{
                              fontSize: "0.75rem",
                              fontWeight: 700,
                              padding: "2px 8px",
                              borderRadius: "99px",
                              background: "oklch(0.95 0.02 240)",
                              color: "oklch(0.45 0.08 240)",
                              animation: "pulse-tag 2s infinite",
                            }}
                          >
                            In Session
                          </span>
                        )}
                        {meet.status === "upcoming" && (
                          <span
                            style={{
                              fontSize: "0.75rem",
                              fontWeight: 700,
                              padding: "2px 8px",
                              borderRadius: "99px",
                              background: "oklch(0.96 0.01 240)",
                              color: "oklch(0.5 0.01 240)",
                            }}
                          >
                            Upcoming
                          </span>
                        )}
                      </div>

                      <h3
                        style={{
                          fontSize: "1.15rem",
                          fontWeight: 600,
                          color: "var(--charcoal)",
                          margin: "8px 0 2px",
                        }}
                      >
                        {meet.patient}
                      </h3>
                      <p style={{ fontSize: "0.88rem", color: "oklch(0.55 0.01 240)", margin: 0 }}>
                        {meet.type}
                      </p>
                    </div>

                    <div style={{ display: "flex", gap: "8px" }} className="schedule-row-actions">
                      <Link
                        to="/doctor/meeting-detail"
                        search={{ id: meet.id }}
                        style={{
                          padding: "8px 16px",
                          borderRadius: "10px",
                          border: "1.5px solid oklch(0.88 0.02 240)",
                          background: "white",
                          color: "var(--charcoal)",
                          fontSize: "0.85rem",
                          fontWeight: 600,
                          textDecoration: "none",
                          cursor: "pointer",
                          transition: "all 0.2s",
                        }}
                      >
                        {meet.status === "completed" ? "Review Notes" : "View Details"}
                      </Link>

                      {meet.status === "in-progress" && meet.meetLink && (
                        <a
                          href={meet.meetLink}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            padding: "8px 16px",
                            borderRadius: "10px",
                            border: "none",
                            background: "oklch(0.4 0.03 240)",
                            color: "white",
                            fontSize: "0.85rem",
                            fontWeight: 600,
                            textDecoration: "none",
                            cursor: "pointer",
                            transition: "all 0.2s",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                          }}
                        >
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                          >
                            <path d="M23 7l-7 5 7 5V7z" />
                            <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                          </svg>
                          Join Meet
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* General Clinic Diary Summary */}
            <div
              style={{
                background: "white",
                padding: "32px",
                borderRadius: "24px",
                border: "1px solid oklch(0.92 0.01 240)",
                boxShadow: "0 4px 20px oklch(0 0 0 / 0.01)",
                display: "flex",
                flexDirection: "column",
                height: "fit-content",
              }}
            >
              <div style={{ marginBottom: "18px" }}>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.35rem",
                    fontWeight: 600,
                    color: "var(--charcoal)",
                    margin: 0,
                  }}
                >
                  Clinical Diary
                </h2>
                <p
                  style={{
                    fontSize: "0.82rem",
                    color: "oklch(0.55 0.01 240)",
                    marginTop: "4px",
                    lineHeight: 1.4,
                  }}
                >
                  Write down reminders, checklist summaries, or general thoughts for your clinic
                  day. Safe & persistent locally.
                </p>
              </div>

              <textarea
                value={diaryText}
                onChange={(e) => setDiaryText(e.target.value)}
                placeholder="Type your clinic notes, reminders, or observations here..."
                style={{
                  width: "100%",
                  height: "220px",
                  padding: "14px 16px",
                  borderRadius: "16px",
                  border: "1.5px solid oklch(0.88 0.02 240)",
                  background: "oklch(0.985 0.003 240)",
                  fontSize: "0.92rem",
                  color: "var(--charcoal)",
                  outline: "none",
                  resize: "vertical",
                  boxSizing: "border-box",
                  fontFamily: "var(--font-sans)",
                  lineHeight: 1.5,
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "oklch(0.4 0.03 240)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "oklch(0.88 0.02 240)";
                }}
              />

              <button
                onClick={handleSaveDiary}
                style={{
                  marginTop: "16px",
                  padding: "12px",
                  borderRadius: "12px",
                  border: "none",
                  background: "oklch(0.4 0.03 240)",
                  color: "white",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                {isSaved ? "Saved! ✓" : "Save Log Entries"}
              </button>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .dashboard-content-split {
              grid-template-columns: 1fr !important;
            }
          }
          @media (max-width: 600px) {
            .schedule-row {
              flex-direction: column !important;
              align-items: flex-start !important;
              gap: 16px !important;
            }
            .schedule-row-actions {
              width: 100% !important;
              display: flex !important;
              gap: 8px !important;
            }
            .schedule-row-actions > * {
              flex: 1 !important;
              text-align: center !important;
              justify-content: center !important;
            }
          }
          @keyframes pulse-tag {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.6; }
          }
        `}</style>
      </div>
    </ProtectedPage>
  );
}
