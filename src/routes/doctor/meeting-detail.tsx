import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { InnerNav } from "@/components/InnerNav";
import { ProtectedPage } from "@/context/AuthContext";

export const Route = createFileRoute("/doctor/meeting-detail")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      id: Number(search.id) || 3, // Default to Sneha Nair (in-progress)
    };
  },
  head: () => ({
    meta: [
      { title: "Consultation Console – Nalora" },
      {
        name: "description",
        content: "Clinical console to launch Google Meet and log patient session notes.",
      },
    ],
  }),
  component: MeetingDetail,
});

// Mock database mapping id -> patient details
const PATIENT_DETAILS: Record<
  number,
  {
    id: number;
    patient: string;
    age: number;
    email: string;
    phone: string;
    address: string;
    bystanderName: string;
    bystanderPhone: string;
    gender: string;
    time: string;
    type: string;
    status: string;
    meetLink: string;
    history: string[];
  }
> = {
  1: {
    id: 1,
    patient: "Anjali Menon",
    age: 29,
    gender: "Female",
    email: "anjali@example.com",
    phone: "+91 94471 23456",
    address: "TC 4/1234, Kowdiar, Trivandrum, Kerala",
    bystanderName: "Harish Menon (Husband)",
    bystanderPhone: "+91 94471 98765",
    time: "09:00 AM",
    type: "Postpartum Anxiety Session",
    status: "completed",
    meetLink: "https://meet.google.com/abc-defg-hij",
    history: [
      "Completed initial intake questionnaire (2026-06-20)",
      "Reported moderate postpartum sleep anxiety levels.",
    ],
  },
  2: {
    id: 2,
    patient: "Priyanka Raj",
    age: 31,
    gender: "Female",
    email: "priyanka.raj@example.com",
    phone: "+91 98950 11223",
    address: "Villa 12, Sobha City, Thrissur, Kerala",
    bystanderName: "Rajesh K. (Husband)",
    bystanderPhone: "+91 98950 44556",
    time: "11:30 AM",
    type: "PPD Routine Followup",
    status: "completed",
    meetLink: "https://meet.google.com/abc-defg-hij",
    history: [
      "Intake review completed (2026-06-22)",
      "Struggling with lack of social support and exhaustion.",
    ],
  },
  3: {
    id: 3,
    patient: "Sneha Nair",
    age: 27,
    gender: "Female",
    email: "sneha.nair@example.com",
    phone: "+91 97440 55667",
    address: "Flat 4B, Heera Heights, Kochi, Kerala",
    bystanderName: "Radha Nair (Mother)",
    bystanderPhone: "+91 97440 99887",
    time: "02:00 PM",
    type: "Birth Trauma Consultation",
    status: "in-progress",
    meetLink: "https://meet.google.com/abc-defg-hij",
    history: [
      "Difficult delivery experience leading to acute birth stress",
      "Husband traveling, mother supporting locally.",
    ],
  },
  4: {
    id: 4,
    patient: "Divya Pillai",
    age: 33,
    gender: "Female",
    email: "divya.p@example.com",
    phone: "+91 96560 33445",
    address: "Pillai House, Haripad, Alappuzha, Kerala",
    bystanderName: "Prashanth Pillai (Husband)",
    bystanderPhone: "+91 96560 77889",
    time: "04:00 PM",
    type: "Hormonal Mood Shifts Review",
    status: "upcoming",
    meetLink: "https://meet.google.com/klm-nopq-rst",
    history: [
      "Hormonal mood shifts starting week 3 postpartum",
      "Exhibiting severe mood fluctuations during evenings.",
    ],
  },
  5: {
    id: 5,
    patient: "Meera Krishnan",
    age: 26,
    gender: "Female",
    email: "meera.krishnan@example.com",
    phone: "+91 95670 99001",
    address: "Krishna Nivas, Calicut, Kerala",
    bystanderName: "Krishnan Unni (Father)",
    bystanderPhone: "+91 95670 11224",
    time: "06:30 PM",
    type: "First Time Motherhood Exhaustion",
    status: "upcoming",
    meetLink: "https://meet.google.com/uvw-xyz1-abc",
    history: [
      "Overwhelmed by new breastfeeding routines and severe sleep deficit",
      "Has mild postpartum sadness signs.",
    ],
  },
};

function MeetingDetail() {
  const { id } = Route.useSearch();
  const info = PATIENT_DETAILS[id] || PATIENT_DETAILS[3];

  const [sessionNotes, setSessionNotes] = useState("");
  const [diaryNote, setDiaryNote] = useState("");
  const [savedNotesMessage, setSavedNotesMessage] = useState("");
  const [savedDiaryMessage, setSavedDiaryMessage] = useState("");

  // Rehydrate notes from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedNotes = localStorage.getItem(`nalora_session_notes_${info.id}`);
      if (savedNotes) setSessionNotes(savedNotes);

      const savedDiary = localStorage.getItem(`nalora_patient_diary_${info.id}`);
      if (savedDiary) setDiaryNote(savedDiary);
    }
  }, [info.id]);

  function handleSaveNotes() {
    if (typeof window !== "undefined") {
      localStorage.setItem(`nalora_session_notes_${info.id}`, sessionNotes);
      setSavedNotesMessage("Saved to draft session notes!");
      setTimeout(() => setSavedNotesMessage(""), 2500);
    }
  }

  function handleSaveDiary() {
    if (typeof window !== "undefined") {
      // Append to the list of therapeutic logs
      const storageKey = `nalora_patient_diary_logs_${info.id}`;
      const existingLogsRaw = localStorage.getItem(storageKey);
      const existingLogs = existingLogsRaw ? JSON.parse(existingLogsRaw) : [];

      const newLog = {
        date: new Date().toISOString().split("T")[0],
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        author: "Dr. Aisha Menon",
        text: diaryNote,
      };

      localStorage.setItem(storageKey, JSON.stringify([newLog, ...existingLogs]));
      localStorage.setItem(`nalora_patient_diary_${info.id}`, diaryNote);

      setSavedDiaryMessage("Saved and appended to patient's clinical timeline! ✓");
      setTimeout(() => setSavedDiaryMessage(""), 3000);
    }
  }

  return (
    <ProtectedPage allowedRole="doctor">
      <div
        style={{
          minHeight: "100vh",
          background: "oklch(0.985 0.005 240)",
          fontFamily: "var(--font-sans)",
        }}
      >
        <InnerNav />

        {/* Back and Breadcrumbs */}
        <div style={{ maxWidth: "1200px", margin: "24px auto 0", padding: "0 24px" }}>
          <Link
            to="/doctor/dashboard"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              textDecoration: "none",
              color: "oklch(0.5 0.04 200)",
              fontSize: "0.85rem",
              fontWeight: 600,
            }}
          >
            ← Return to Dashboard
          </Link>
        </div>

        {/* Workspace Console Grid */}
        <div
          style={{
            maxWidth: "1200px",
            margin: "20px auto 80px",
            padding: "0 24px",
            display: "grid",
            gridTemplateColumns: "350px 1fr",
            gap: "28px",
          }}
          className="console-grid"
        >
          {/* Patient Card Detail Panel (Left) */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {/* Patient General Info Card */}
            <div
              style={{
                background: "white",
                padding: "28px",
                borderRadius: "24px",
                border: "1px solid oklch(0.92 0.01 240)",
                boxShadow: "0 4px 20px oklch(0 0 0 / 0.01)",
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  paddingBottom: "20px",
                  borderBottom: "1px solid oklch(0.95 0.01 240)",
                  marginBottom: "20px",
                }}
              >
                <span
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, oklch(0.4 0.03 240), oklch(0.5 0.04 200))",
                    display: "grid",
                    placeItems: "center",
                    color: "white",
                    fontFamily: "var(--font-display)",
                    fontSize: "1.6rem",
                    fontWeight: 600,
                    margin: "0 auto 12px",
                  }}
                >
                  {info.patient
                    .split(" ")
                    .map((w) => w[0])
                    .join("")}
                </span>
                <h2
                  style={{
                    fontSize: "1.35rem",
                    fontWeight: 700,
                    color: "var(--charcoal)",
                    margin: 0,
                  }}
                >
                  {info.patient}
                </h2>
                <p
                  style={{
                    fontSize: "0.84rem",
                    color: "oklch(0.55 0.01 240)",
                    margin: "4px 0 12px",
                  }}
                >
                  {info.gender} · {info.age} years old
                </p>

                {/* Meet Button */}
                {info.status !== "completed" ? (
                  <a
                    href={info.meetLink}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      background: "oklch(0.4 0.03 240)",
                      color: "white",
                      padding: "12px",
                      borderRadius: "12px",
                      fontSize: "0.92rem",
                      fontWeight: 700,
                      textDecoration: "none",
                      boxShadow: "0 4px 14px oklch(0.4 0.03 240 / 0.25)",
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M23 7l-7 5 7 5V7z" />
                      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                    </svg>
                    Launch Google Meet
                  </a>
                ) : (
                  <div
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      background: "oklch(0.95 0.02 145)",
                      color: "oklch(0.35 0.06 145)",
                      fontSize: "0.84rem",
                      fontWeight: 700,
                    }}
                  >
                    Consultation Completed ✓
                  </div>
                )}
              </div>

              {/* Patient Fields */}
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: "oklch(0.55 0.01 240)",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Contact Email
                  </label>
                  <span style={{ fontSize: "0.92rem", color: "var(--charcoal)", fontWeight: 500 }}>
                    {info.email}
                  </span>
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: "oklch(0.55 0.01 240)",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Phone Number
                  </label>
                  <span style={{ fontSize: "0.92rem", color: "var(--charcoal)", fontWeight: 500 }}>
                    {info.phone}
                  </span>
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: "oklch(0.55 0.01 240)",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Kerala Address
                  </label>
                  <span style={{ fontSize: "0.88rem", color: "var(--charcoal)", lineHeight: 1.4 }}>
                    {info.address}
                  </span>
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: "oklch(0.55 0.01 240)",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Bystander / Emergency Caretaker
                  </label>
                  <span style={{ fontSize: "0.9rem", color: "var(--charcoal)", fontWeight: 600 }}>
                    {info.bystanderName}
                  </span>
                  <div
                    style={{ fontSize: "0.84rem", color: "oklch(0.55 0.01 240)", marginTop: "2px" }}
                  >
                    {info.bystanderPhone}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Session Context */}
            <div
              style={{
                background: "white",
                padding: "24px",
                borderRadius: "20px",
                border: "1px solid oklch(0.92 0.01 240)",
                boxShadow: "0 4px 16px oklch(0 0 0 / 0.01)",
              }}
            >
              <h3
                style={{
                  fontSize: "0.94rem",
                  fontWeight: 700,
                  color: "var(--charcoal)",
                  margin: "0 0 12px",
                }}
              >
                Previous Case Notes
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {info.history.map((hist, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: "10px 12px",
                      background: "oklch(0.99 0.003 240)",
                      borderLeft: "3.5px solid oklch(0.5 0.04 200 / 0.6)",
                      borderRadius: "6px",
                      fontSize: "0.84rem",
                      color: "oklch(0.45 0.01 240)",
                      lineHeight: 1.4,
                    }}
                  >
                    {hist}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Console Workspaces (Right) */}
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            {/* Real-time Patient Session Notes Card */}
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
                  marginBottom: "16px",
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: 700,
                      color: "var(--charcoal)",
                      margin: 0,
                    }}
                  >
                    Real-time Consultation Notes
                  </h3>
                  <p
                    style={{ fontSize: "0.84rem", color: "oklch(0.55 0.01 240)", marginTop: "2px" }}
                  >
                    Draft clinical notes during the call. These are autosaved to draft.
                  </p>
                </div>
                {savedNotesMessage && (
                  <span
                    style={{ fontSize: "0.84rem", color: "oklch(0.4 0.03 240)", fontWeight: 600 }}
                  >
                    {savedNotesMessage}
                  </span>
                )}
              </div>

              <textarea
                value={sessionNotes}
                onChange={(e) => setSessionNotes(e.target.value)}
                placeholder="Record clinical signs, symptoms, patient feedback, anxiety scores, and discussion points..."
                style={{
                  width: "100%",
                  height: "240px",
                  padding: "16px",
                  borderRadius: "14px",
                  border: "1.5px solid oklch(0.88 0.02 240)",
                  background: "oklch(0.985 0.003 240)",
                  fontSize: "0.95rem",
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

              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "14px" }}>
                <button
                  onClick={handleSaveNotes}
                  style={{
                    padding: "10px 24px",
                    borderRadius: "10px",
                    border: "1.5px solid oklch(0.4 0.03 240)",
                    background: "white",
                    color: "oklch(0.4 0.03 240)",
                    fontWeight: 600,
                    fontSize: "0.88rem",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "oklch(0.4 0.03 240 / 0.05)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "white";
                  }}
                >
                  Save Draft Notes
                </button>
              </div>
            </div>

            {/* Permanent Patient Diary Records Card */}
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
                  marginBottom: "16px",
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: 700,
                      color: "var(--charcoal)",
                      margin: 0,
                    }}
                  >
                    Append to Patient's Permanent Clinical Diary
                  </h3>
                  <p
                    style={{ fontSize: "0.84rem", color: "oklch(0.55 0.01 240)", marginTop: "2px" }}
                  >
                    Write the formal diagnosis, care summaries, or treatment recommendations that
                    commit to the patient's record timeline.
                  </p>
                </div>
                {savedDiaryMessage && (
                  <span style={{ fontSize: "0.84rem", color: "#16a34a", fontWeight: 600 }}>
                    {savedDiaryMessage}
                  </span>
                )}
              </div>

              <textarea
                value={diaryNote}
                onChange={(e) => setDiaryNote(e.target.value)}
                placeholder="Type formal clinical recommendations, prescription logs, postpartum wellness action plans, or follow-up timelines..."
                style={{
                  width: "100%",
                  height: "160px",
                  padding: "16px",
                  borderRadius: "14px",
                  border: "1.5px solid oklch(0.88 0.02 240)",
                  background: "oklch(0.985 0.003 240)",
                  fontSize: "0.9rem",
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

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "14px",
                }}
                className="diary-footer"
              >
                <Link
                  to="/doctor/diary-all"
                  style={{
                    fontSize: "0.88rem",
                    color: "oklch(0.5 0.04 200)",
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  View patient clinical timeline →
                </Link>

                <button
                  onClick={handleSaveDiary}
                  style={{
                    padding: "12px 28px",
                    borderRadius: "10px",
                    border: "none",
                    background: "oklch(0.4 0.03 240)",
                    color: "white",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    boxShadow: "0 4px 12px oklch(0.4 0.03 240 / 0.2)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "oklch(0.35 0.03 240)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "oklch(0.4 0.03 240)";
                  }}
                >
                  Commit to Diary Timeline
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .console-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 600px) {
          .diary-footer {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 16px !important;
            text-align: center !important;
          }
        }
      `}</style>
    </ProtectedPage>
  );
}
