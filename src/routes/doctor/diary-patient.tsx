import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { DoctorNav } from "@/components/DoctorNav";
import { ProtectedPage } from "@/context/AuthContext";

export const Route = createFileRoute("/doctor/diary-patient")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      id: Number(search.id) || 1, // Default to Anjali Menon
    };
  },
  head: () => ({
    meta: [
      { title: "Clinical Timeline – Nalora" },
      {
        name: "description",
        content: "Dedicated patient clinical timeline and therapeutic notes manager.",
      },
    ],
  }),
  component: DoctorDiaryPatient,
});

// Mock database patient entries
const PATIENTS_DB: Record<
  number,
  {
    id: number;
    name: string;
    age: number;
    gender: string;
    email: string;
    phone: string;
    address: string;
    bystanderName: string;
    bystanderPhone: string;
    defaultLogs: { date: string; timestamp: string; author: string; text: string }[];
  }
> = {
  1: {
    id: 1,
    name: "Anjali Menon",
    age: 29,
    gender: "Female",
    email: "anjali@example.com",
    phone: "+91 94471 23456",
    address: "TC 4/1234, Kowdiar, Trivandrum, Kerala",
    bystanderName: "Harish Menon (Husband)",
    bystanderPhone: "+91 94471 98765",
    defaultLogs: [
      {
        date: "2026-06-25",
        timestamp: "09:45 AM",
        author: "Dr. Aisha Menon",
        text: "Patient displays steady recovery. Anxiety scale down to 4/10. Sleep routine improved. Prescribed continuing light breathing exercises.",
      },
      {
        date: "2026-06-20",
        timestamp: "10:30 AM",
        author: "Dr. Aisha Menon",
        text: "First followup. Patient reported elevated postpartum anxiety levels (anxiety scale 7/10). Advised partner integration in overnight care cycles.",
      },
    ],
  },
  2: {
    id: 2,
    name: "Priyanka Raj",
    age: 31,
    gender: "Female",
    email: "priyanka.raj@example.com",
    phone: "+91 98950 11223",
    address: "Villa 12, Sobha City, Thrissur, Kerala",
    bystanderName: "Rajesh K. (Husband)",
    bystanderPhone: "+91 98950 44556",
    defaultLogs: [
      {
        date: "2026-06-25",
        timestamp: "12:15 PM",
        author: "Dr. Aisha Menon",
        text: "Routine review. Discussed stress factors. Advised breathing exercises and partner support. Scheduled review in 1 week.",
      },
      {
        date: "2026-06-22",
        timestamp: "02:00 PM",
        author: "Dr. Aisha Menon",
        text: "Initial consultation. Patient experiencing severe postpartum tiredness. Lack of structural social support from remote family. Encouraged join of mother's circle group.",
      },
    ],
  },
  3: {
    id: 3,
    name: "Sneha Nair",
    age: 27,
    gender: "Female",
    email: "sneha.nair@example.com",
    phone: "+91 97440 55667",
    address: "Flat 4B, Heera Heights, Kochi, Kerala",
    bystanderName: "Radha Nair (Mother)",
    bystanderPhone: "+91 97440 99887",
    defaultLogs: [
      {
        date: "2026-06-25",
        timestamp: "03:00 PM",
        author: "Dr. Aisha Menon",
        text: "Acute distress due to difficult birth. Focusing on trauma release techniques and validation. Sneha showed active engagement. Will monitor weekly.",
      },
    ],
  },
  4: {
    id: 4,
    name: "Divya Pillai",
    age: 33,
    gender: "Female",
    email: "divya.p@example.com",
    phone: "+91 96560 33445",
    address: "Pillai House, Haripad, Alappuzha, Kerala",
    bystanderName: "Prashanth Pillai (Husband)",
    bystanderPhone: "+91 96560 77889",
    defaultLogs: [],
  },
  5: {
    id: 5,
    name: "Meera Krishnan",
    age: 26,
    gender: "Female",
    email: "meera.krishnan@example.com",
    phone: "+91 95670 99001",
    address: "Krishna Nivas, Calicut, Kerala",
    bystanderName: "Krishnan Unni (Father)",
    bystanderPhone: "+91 95670 11224",
    defaultLogs: [],
  },
};

function DoctorDiaryPatient() {
  const { id } = Route.useSearch();
  const info = PATIENTS_DB[id] || PATIENTS_DB[1];

  const [newLogText, setNewLogText] = useState("");
  const [logs, setLogs] = useState<
    { date: string; timestamp: string; author: string; text: string }[]
  >([]);
  const [successMessage, setSuccessMessage] = useState("");

  // Load logs
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storageKey = `nalora_patient_diary_logs_${info.id}`;
      const savedLogsRaw = localStorage.getItem(storageKey);
      if (savedLogsRaw) {
        try {
          const parsed = JSON.parse(savedLogsRaw);
          // Merge custom logs with default ones
          const merged = [...parsed, ...info.defaultLogs];
          // Remove duplicates based on text or date-timestamp
          const unique = merged.filter(
            (item, index, self) =>
              index ===
              self.findIndex(
                (t) =>
                  t.text === item.text && t.date === item.date && t.timestamp === item.timestamp,
              ),
          );
          setLogs(unique);
        } catch (e) {
          setLogs(info.defaultLogs);
        }
      } else {
        setLogs(info.defaultLogs);
      }
    }
  }, [info.id, info.defaultLogs]);

  function handleAddLog(e: React.FormEvent) {
    e.preventDefault();
    if (!newLogText.trim()) return;

    const newLog = {
      date: new Date().toISOString().split("T")[0],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      author: "Dr. Aisha Menon",
      text: newLogText.trim(),
    };

    const updatedLogs = [newLog, ...logs];
    setLogs(updatedLogs);

    if (typeof window !== "undefined") {
      const storageKey = `nalora_patient_diary_logs_${info.id}`;
      // Save only custom logs to localStorage (we filter out default logs to avoid duplicating them)
      const customOnly = updatedLogs.filter(
        (log) => !info.defaultLogs.some((def) => def.text === log.text && def.date === log.date),
      );
      localStorage.setItem(storageKey, JSON.stringify(customOnly));
    }

    setNewLogText("");
    setSuccessMessage("Entry added to timeline! ✓");
    setTimeout(() => setSuccessMessage(""), 2500);
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
        <DoctorNav />

        {/* Back Link */}
        <div style={{ maxWidth: "1100px", margin: "24px auto 0", padding: "0 24px" }}>
          <Link
            to="/doctor/diary-all"
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
            ← Back to Patient Index
          </Link>
        </div>

        {/* Main Columns */}
        <div
          style={{
            maxWidth: "1100px",
            margin: "20px auto 80px",
            padding: "0 24px",
            display: "grid",
            gridTemplateColumns: "1.2fr 2fr",
            gap: "32px",
          }}
          className="timeline-layout"
        >
          {/* Patient profile sidebar (Left) */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {/* Profile Info */}
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
                  paddingBottom: "16px",
                  borderBottom: "1px solid oklch(0.95 0.01 240)",
                  marginBottom: "16px",
                }}
              >
                <span
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, oklch(0.4 0.03 240 / 0.15), oklch(0.5 0.04 200 / 0.15))",
                    display: "grid",
                    placeItems: "center",
                    color: "oklch(0.4 0.03 240)",
                    fontFamily: "var(--font-display)",
                    fontSize: "1.3rem",
                    fontWeight: 700,
                    margin: "0 auto 12px",
                  }}
                >
                  {info.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")}
                </span>
                <h2
                  style={{
                    fontSize: "1.3rem",
                    fontWeight: 700,
                    color: "var(--charcoal)",
                    margin: 0,
                  }}
                >
                  {info.name}
                </h2>
                <p
                  style={{ fontSize: "0.84rem", color: "oklch(0.55 0.01 240)", margin: "4px 0 0" }}
                >
                  {info.gender} · {info.age} years old
                </p>
              </div>

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
                    Contact Details
                  </label>
                  <span style={{ fontSize: "0.88rem", color: "var(--charcoal)" }}>
                    {info.email}
                  </span>
                  <div style={{ fontSize: "0.88rem", color: "var(--charcoal)", marginTop: "2px" }}>
                    {info.phone}
                  </div>
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
                  <span style={{ fontSize: "0.88rem", color: "var(--charcoal)", fontWeight: 600 }}>
                    {info.bystanderName}
                  </span>
                  <div
                    style={{ fontSize: "0.82rem", color: "oklch(0.55 0.01 240)", marginTop: "2px" }}
                  >
                    {info.bystanderPhone}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Clinical timeline & write new notes workspace (Right) */}
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            {/* Add therapeutic log form */}
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
                <h3
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    color: "var(--charcoal)",
                    margin: 0,
                  }}
                >
                  Add New Therapeutic Diary Entry
                </h3>
                {successMessage && (
                  <span style={{ fontSize: "0.88rem", color: "#16a34a", fontWeight: 600 }}>
                    {successMessage}
                  </span>
                )}
              </div>

              <form onSubmit={handleAddLog}>
                <textarea
                  value={newLogText}
                  onChange={(e) => setNewLogText(e.target.value)}
                  placeholder="Record formal clinical summaries, postpartum progress notes, emotional triggers noted, or follow-up schedules..."
                  required
                  style={{
                    width: "100%",
                    height: "110px",
                    padding: "14px 16px",
                    borderRadius: "12px",
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

                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "14px" }}>
                  <button
                    type="submit"
                    style={{
                      padding: "10px 24px",
                      borderRadius: "10px",
                      border: "none",
                      background: "oklch(0.4 0.03 240)",
                      color: "white",
                      fontWeight: 700,
                      fontSize: "0.88rem",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      boxShadow: "0 4px 12px oklch(0.4 0.03 240 / 0.15)",
                    }}
                  >
                    Add to Clinical Timeline
                  </button>
                </div>
              </form>
            </div>

            {/* Timeline log */}
            <div
              style={{
                background: "white",
                padding: "32px",
                borderRadius: "24px",
                border: "1px solid oklch(0.92 0.01 240)",
                boxShadow: "0 4px 20px oklch(0 0 0 / 0.01)",
              }}
            >
              <h3
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  color: "var(--charcoal)",
                  margin: "0 0 24px",
                }}
              >
                Patient Clinical Timeline
              </h3>

              {logs.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "40px 10px",
                    color: "oklch(0.55 0.01 240)",
                  }}
                >
                  <span style={{ fontSize: "2rem" }}>📓</span>
                  <p style={{ fontSize: "0.9rem", marginTop: "10px", margin: "10px 0 0" }}>
                    No diary logs recorded on this file yet.
                  </p>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "24px",
                    position: "relative",
                    paddingLeft: "24px",
                  }}
                >
                  {/* Vertical line of timeline */}
                  <div
                    style={{
                      position: "absolute",
                      left: "7px",
                      top: "10px",
                      bottom: "10px",
                      width: "1.5px",
                      background: "oklch(0.9 0.01 240)",
                    }}
                  />

                  {logs.map((log, idx) => (
                    <div key={idx} style={{ position: "relative" }}>
                      {/* Timeline Dot */}
                      <span
                        style={{
                          position: "absolute",
                          left: "-22px",
                          top: "5px",
                          width: "11px",
                          height: "11px",
                          borderRadius: "50%",
                          background: "white",
                          border: "2px solid oklch(0.4 0.03 240)",
                          boxShadow: "0 0 0 4px white",
                        }}
                      />

                      <div>
                        {/* Meta */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            flexWrap: "wrap",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "0.84rem",
                              fontWeight: 700,
                              color: "var(--charcoal)",
                            }}
                          >
                            {log.date}
                          </span>
                          <span style={{ fontSize: "0.78rem", color: "oklch(0.55 0.01 240)" }}>
                            {log.timestamp}
                          </span>
                          <span
                            style={{
                              fontSize: "0.76rem",
                              fontWeight: 600,
                              color: "oklch(0.5 0.04 200)",
                              background: "oklch(0.96 0.01 240)",
                              padding: "1px 6px",
                              borderRadius: "4px",
                            }}
                          >
                            {log.author}
                          </span>
                        </div>

                        {/* Text */}
                        <p
                          style={{
                            fontSize: "0.92rem",
                            color: "oklch(0.3 0.01 240)",
                            margin: "8px 0 0",
                            lineHeight: 1.5,
                            whiteSpace: "pre-wrap",
                          }}
                        >
                          {log.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 900px) {
            .timeline-layout {
              grid-template-columns: 1fr !important;
              gap: 24px !important;
            }
          }
          @media (max-width: 600px) {
            .timeline-layout {
              padding: 0 16px 60px !important;
            }
            .timeline-layout > div {
              padding: 20px !important;
            }
          }
        `}</style>
      </div>
    </ProtectedPage>
  );
}
