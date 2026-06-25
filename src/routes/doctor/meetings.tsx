import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { DoctorNav } from "@/components/DoctorNav";
import { ProtectedPage } from "@/context/AuthContext";

export const Route = createFileRoute("/doctor/meetings")({
  head: () => ({
    meta: [
      { title: "Meetings List – Nalora" },
      { name: "description", content: "View and filter upcoming and past consultation sessions." },
    ],
  }),
  component: DoctorMeetings,
});

// Mock detailed meetings
const ALL_MEETINGS = [
  { id: 1, patient: "Anjali Menon", date: "2026-06-25", time: "09:00 AM", duration: "45 mins", type: "Postpartum Anxiety Session", status: "completed" },
  { id: 2, patient: "Priyanka Raj", date: "2026-06-25", time: "11:30 AM", duration: "45 mins", type: "PPD Routine Followup", status: "completed" },
  { id: 3, patient: "Sneha Nair", date: "2026-06-25", time: "02:00 PM", duration: "60 mins", type: "Birth Trauma Consultation", status: "in-progress", meetLink: "https://meet.google.com/abc-defg-hij" },
  { id: 4, patient: "Divya Pillai", date: "2026-06-25", time: "04:00 PM", duration: "45 mins", type: "Hormonal Mood Shifts Review", status: "upcoming", meetLink: "https://meet.google.com/klm-nopq-rst" },
  { id: 5, patient: "Meera Krishnan", date: "2026-06-25", time: "06:30 PM", duration: "45 mins", type: "First Time Motherhood Exhaustion", status: "upcoming", meetLink: "https://meet.google.com/uvw-xyz1-abc" },
  { id: 6, patient: "Kavitha R.", date: "2026-06-24", time: "10:00 AM", duration: "45 mins", type: "Postpartum Depression Therapy", status: "completed" },
  { id: 7, patient: "Sruthy V.", date: "2026-06-24", time: "03:30 PM", duration: "45 mins", type: "Perinatal Loss Support", status: "completed" },
  { id: 8, patient: "Reshma S.", date: "2026-06-23", time: "11:00 AM", duration: "45 mins", type: "Postpartum Anxiety Session", status: "completed" },
  { id: 9, patient: "Neethu Mohan", date: "2026-06-22", time: "04:00 PM", duration: "45 mins", type: "Sleep Deprivation Support", status: "cancelled" },
];

function DoctorMeetings() {
  const [activeTab, setActiveTab] = useState<"all" | "upcoming" | "past" | "cancelled">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = ALL_MEETINGS.filter((meet) => {
    // Filter by tab
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "upcoming" && (meet.status === "upcoming" || meet.status === "in-progress")) ||
      (activeTab === "past" && meet.status === "completed") ||
      (activeTab === "cancelled" && meet.status === "cancelled");

    // Filter by search query
    const matchesSearch =
      meet.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meet.type.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  return (
    <ProtectedPage allowedRole="doctor">
      <div style={{ minHeight: "100vh", background: "oklch(0.985 0.005 240)", fontFamily: "var(--font-sans)" }}>
        <DoctorNav />

        {/* Header section */}
        <div style={{ background: "linear-gradient(160deg, oklch(0.92 0.01 240) 0%, oklch(0.95 0.01 240) 100%)", borderBottom: "1px solid oklch(0.9 0.01 240)", padding: "48px 32px 40px" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "oklch(0.5 0.04 200)", marginBottom: "8px" }}>
              Consultations Log
            </p>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2.2rem", fontWeight: 600, color: "var(--charcoal)", margin: 0 }}>
              Your Consultation Meetings
            </h1>
            <p style={{ color: "oklch(0.55 0.01 240)", fontSize: "0.95rem", marginTop: "6px" }}>
              Review upcoming bookings, start video calls, and inspect clinical summaries.
            </p>
          </div>
        </div>

        {/* Main Body */}
        <div style={{ maxWidth: "1000px", margin: "32px auto", padding: "0 24px 80px" }}>
          
          {/* Controls Bar */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "16px", marginBottom: "28px" }}>
            
            {/* Tabs */}
            <div style={{ display: "flex", gap: "6px", background: "oklch(0.94 0.005 240)", padding: "4px", borderRadius: "12px", border: "1px solid oklch(0.92 0.01 240)" }}>
              {(["all", "upcoming", "past", "cancelled"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "9px",
                    border: "none",
                    background: activeTab === tab ? "white" : "transparent",
                    color: activeTab === tab ? "var(--charcoal)" : "oklch(0.5 0.01 240)",
                    fontWeight: activeTab === tab ? 600 : 400,
                    fontSize: "0.82rem",
                    cursor: "pointer",
                    textTransform: "capitalize",
                    transition: "all 0.2s",
                    boxShadow: activeTab === tab ? "0 2px 8px oklch(0 0 0 / 0.04)" : "none",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Search */}
            <div style={{ position: "relative", width: "100%", maxWidth: "320px" }}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search patient or session..."
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

          {/* List of Meetings */}
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 20px", background: "white", borderRadius: "24px", border: "1px solid oklch(0.92 0.01 240)" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "12px" }}>🗓️</div>
              <p style={{ fontSize: "0.95rem", color: "oklch(0.55 0.01 240)", margin: 0 }}>No sessions found matching your filters.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {filtered.map((meet) => (
                <div
                  key={meet.id}
                  className="meeting-row"
                  style={{
                    background: "white",
                    padding: "24px 32px",
                    borderRadius: "20px",
                    border: "1px solid oklch(0.92 0.01 240)",
                    boxShadow: "0 4px 16px oklch(0 0 0 / 0.01)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "24px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "20px" }}>
                    {/* Calendar Badge */}
                    <div
                      style={{
                        padding: "10px 14px",
                        borderRadius: "14px",
                        background: "oklch(0.96 0.01 240)",
                        textAlign: "center",
                        border: "1px solid oklch(0.92 0.01 240)",
                        minWidth: "64px",
                      }}
                    >
                      <div style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "oklch(0.5 0.04 200)" }}>
                        {new Date(meet.date).toLocaleDateString("en-US", { month: 'short' })}
                      </div>
                      <div style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--charcoal)", marginTop: "2px" }}>
                        {new Date(meet.date).toLocaleDateString("en-US", { day: 'numeric' })}
                      </div>
                    </div>

                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                        <span style={{ fontSize: "0.88rem", fontWeight: 600, color: "oklch(0.4 0.01 240)" }}>{meet.time}</span>
                        <span style={{ fontSize: "0.8rem", color: "oklch(0.6 0.01 240)" }}>({meet.duration})</span>

                        {meet.status === "completed" && (
                          <span style={{ fontSize: "0.74rem", fontWeight: 700, padding: "2px 8px", borderRadius: "99px", background: "oklch(0.95 0.02 145)", color: "oklch(0.35 0.06 145)" }}>
                            Completed
                          </span>
                        )}
                        {meet.status === "in-progress" && (
                          <span style={{ fontSize: "0.74rem", fontWeight: 700, padding: "2px 8px", borderRadius: "99px", background: "oklch(0.95 0.02 240)", color: "oklch(0.45 0.08 240)" }}>
                            In Progress
                          </span>
                        )}
                        {meet.status === "upcoming" && (
                          <span style={{ fontSize: "0.74rem", fontWeight: 700, padding: "2px 8px", borderRadius: "99px", background: "oklch(0.96 0.01 240)", color: "oklch(0.5 0.01 240)" }}>
                            Upcoming
                          </span>
                        )}
                        {meet.status === "cancelled" && (
                          <span style={{ fontSize: "0.74rem", fontWeight: 700, padding: "2px 8px", borderRadius: "99px", background: "oklch(0.97 0.02 18)", color: "oklch(0.45 0.1 18)" }}>
                            Cancelled
                          </span>
                        )}
                      </div>

                      <h3 style={{ fontSize: "1.22rem", fontWeight: 600, color: "var(--charcoal)", margin: "8px 0 2px" }}>
                        {meet.patient}
                      </h3>
                      <p style={{ fontSize: "0.9rem", color: "oklch(0.55 0.01 240)", margin: 0 }}>
                        {meet.type}
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "8px", flexShrink: 0 }} className="meeting-actions">
                    {meet.status !== "cancelled" && (
                      <Link
                        to="/doctor/meeting-detail"
                        search={{ id: meet.id }}
                        style={{
                          padding: "10px 20px",
                          borderRadius: "12px",
                          border: "1.5px solid oklch(0.88 0.02 240)",
                          background: "white",
                          color: "var(--charcoal)",
                          fontSize: "0.9rem",
                          fontWeight: 600,
                          textDecoration: "none",
                          transition: "all 0.2s",
                        }}
                      >
                        {meet.status === "completed" ? "Review Notes" : "Session Console"}
                      </Link>
                    )}
                    {(meet.status === "upcoming" || meet.status === "in-progress") && meet.meetLink && (
                      <a
                        href={meet.meetLink}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          padding: "10px 20px",
                          borderRadius: "12px",
                          border: "none",
                          background: "oklch(0.4 0.03 240)",
                          color: "white",
                          fontSize: "0.9rem",
                          fontWeight: 600,
                          textDecoration: "none",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
                        Join Meet
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
        <style>{`
          @media (max-width: 768px) {
            .meeting-row {
              flex-direction: column !important;
              align-items: flex-start !important;
              padding: 20px !important;
              gap: 16px !important;
            }
            .meeting-actions {
              width: 100% !important;
              display: flex !important;
              gap: 8px !important;
            }
            .meeting-actions > * {
              flex: 1 !important;
              text-align: center !important;
              justify-content: center !important;
            }
          }
        `}</style>
      </div>
    </ProtectedPage>
  );
}
