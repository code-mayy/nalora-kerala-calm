import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { DoctorNav } from "@/components/DoctorNav";
import { ProtectedPage } from "@/context/AuthContext";

export const Route = createFileRoute("/doctor/diary-all")({
  head: () => ({
    meta: [
      { title: "Patients Clinical Diary – Nalora" },
      { name: "description", content: "Master database of all patients and their historical clinical logs." },
    ],
  }),
  component: DoctorDiaryAll,
});

// Mock patients database
const PATIENT_LIST = [
  { id: 1, name: "Anjali Menon", age: 29, phone: "+91 94471 23456", lastConsultation: "2026-06-25", defaultLog: "Patient displays steady recovery. Anxiety scale down to 4/10. Sleep routine improved." },
  { id: 2, name: "Priyanka Raj", age: 31, phone: "+91 98950 11223", lastConsultation: "2026-06-25", defaultLog: "Routine review. Discussed stress factors. Advised breathing exercises and partner support." },
  { id: 3, name: "Sneha Nair", age: 27, phone: "+91 97440 55667", lastConsultation: "2026-06-25", defaultLog: "Acute distress due to difficult birth. Focusing on trauma release techniques and validation." },
  { id: 4, name: "Divya Pillai", age: 33, phone: "+91 96560 33445", lastConsultation: "Pending", defaultLog: "No diary entries logged yet. Consultation scheduled." },
  { id: 5, name: "Meera Krishnan", age: 26, phone: "+91 95670 99001", lastConsultation: "Pending", defaultLog: "No diary entries logged yet. Consultation scheduled." },
];

function DoctorDiaryAll() {
  const [patients, setPatients] = useState(PATIENT_LIST);
  const [searchQuery, setSearchQuery] = useState("");
  const [latestLogs, setLatestLogs] = useState<Record<number, string>>({});

  // Load custom logged diaries from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const logsMap: Record<number, string> = {};
      patients.forEach((p) => {
        const customLogsRaw = localStorage.getItem(`nalora_patient_diary_logs_${p.id}`);
        if (customLogsRaw) {
          try {
            const logs = JSON.parse(customLogsRaw);
            if (logs && logs.length > 0) {
              logsMap[p.id] = logs[0].text; // Pick latest written log
            }
          } catch (e) {
            // ignore
          }
        }
      });
      setLatestLogs(logsMap);
    }
  }, [patients]);

  const filtered = patients.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ProtectedPage allowedRole="doctor">
      <div style={{ minHeight: "100vh", background: "oklch(0.985 0.005 240)", fontFamily: "var(--font-sans)" }}>
        <DoctorNav />

        {/* Header section */}
        <div style={{ background: "linear-gradient(160deg, oklch(0.92 0.01 240) 0%, oklch(0.95 0.01 240) 100%)", borderBottom: "1px solid oklch(0.9 0.01 240)", padding: "48px 32px 40px" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "oklch(0.5 0.04 200)", marginBottom: "8px" }}>
              Clinical Documentation
            </p>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2.2rem", fontWeight: 600, color: "var(--charcoal)", margin: 0 }}>
              Master Patients Diary
            </h1>
            <p style={{ color: "oklch(0.55 0.01 240)", fontSize: "0.95rem", marginTop: "6px" }}>
              Browse your assigned patient files, inspect clinical history timelines, and add therapeutic entries.
            </p>
          </div>
        </div>

        {/* Main Body */}
        <div style={{ maxWidth: "1000px", margin: "32px auto", padding: "0 24px 80px" }}>
          
          {/* Controls */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
            <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "oklch(0.5 0.01 240)" }}>
              Showing {filtered.length} Patients
            </div>
            
            {/* Search */}
            <div style={{ position: "relative", width: "100%", maxWidth: "320px" }}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search patient files by name..."
                style={{
                  width: "100%",
                  padding: "11px 16px 11px 36px",
                  borderRadius: "12px",
                  border: "1.5px solid oklch(0.88 0.02 240)",
                  background: "white",
                  fontSize: "0.88rem",
                  color: "var(--charcoal)",
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => { e.target.style.borderColor = "oklch(0.4 0.03 240)"; }}
                onBlur={(e) => { e.target.style.borderColor = "oklch(0.88 0.02 240)"; }}
              />
              <svg
                style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "oklch(0.6 0.01 240)" }}
                width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
              >
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </div>
          </div>

          {/* Patients Listing Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "20px" }}>
            {filtered.map((patient) => {
              const activeLog = latestLogs[patient.id] || patient.defaultLog;
              return (
                <div
                  key={patient.id}
                  style={{
                    background: "white",
                    padding: "28px",
                    borderRadius: "20px",
                    border: "1px solid oklch(0.92 0.01 240)",
                    boxShadow: "0 4px 16px oklch(0 0 0 / 0.01)",
                    display: "grid",
                    gridTemplateColumns: "240px 1fr 150px",
                    alignItems: "center",
                    gap: "24px",
                  }}
                  className="patient-diary-row"
                >
                  {/* Patient Info */}
                  <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <span
                      style={{
                        width: "44px", height: "44px", borderRadius: "50%",
                        background: "linear-gradient(135deg, oklch(0.4 0.03 240 / 0.1), oklch(0.5 0.04 200 / 0.1))",
                        display: "grid", placeItems: "center", color: "oklch(0.4 0.03 240)",
                        fontFamily: "var(--font-display)", fontSize: "1.05rem", fontWeight: 700,
                      }}
                    >
                      {patient.name.split(" ").map((w) => w[0]).join("")}
                    </span>
                    <div>
                      <h3 style={{ fontSize: "1.12rem", fontWeight: 700, color: "var(--charcoal)", margin: 0 }}>
                        {patient.name}
                      </h3>
                      <p style={{ fontSize: "0.84rem", color: "oklch(0.55 0.01 240)", margin: "3px 0 0" }}>
                        Age: {patient.age} · Phone: {patient.phone.slice(0, 10)}...
                      </p>
                    </div>
                  </div>

                  {/* Latest Diary Summary */}
                  <div style={{ padding: "0 10px" }}>
                    <div style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "oklch(0.5 0.04 200)", letterSpacing: "0.06em", marginBottom: "4px" }}>
                      Latest clinical timeline log
                    </div>
                    <p style={{ fontSize: "0.88rem", color: "oklch(0.45 0.01 240)", margin: 0, lineHeight: 1.45, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      "{activeLog}"
                    </p>
                  </div>

                  {/* Action Link */}
                  <div style={{ textAlign: "right" }}>
                    <Link
                      to="/doctor/diary-patient"
                      search={{ id: patient.id }}
                      style={{
                        display: "inline-block",
                        padding: "10px 18px",
                        borderRadius: "10px",
                        border: "1.5px solid oklch(0.4 0.03 240)",
                        background: "white",
                        color: "oklch(0.4 0.03 240)",
                        fontSize: "0.86rem",
                        fontWeight: 700,
                        textDecoration: "none",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "oklch(0.4 0.03 240 / 0.05)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "white"; }}
                    >
                      Open File
                    </Link>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
        
        <style>{`
          @media (max-width: 920px) {
            .patient-diary-row {
              grid-template-columns: 1fr !important;
              gap: 16px !important;
              text-align: left !important;
            }
            .patient-diary-row div:last-child {
              text-align: left !important;
            }
            .patient-diary-row div:last-child a {
              display: block !important;
              width: 100% !important;
              text-align: center !important;
              box-sizing: border-box !important;
            }
          }
        `}</style>
      </div>
    </ProtectedPage>
  );
}
