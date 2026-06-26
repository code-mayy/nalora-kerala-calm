import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { DoctorNav } from "@/components/DoctorNav";
import { ProtectedPage } from "@/context/AuthContext";

export const Route = createFileRoute("/doctor/google-calendar")({
  head: () => ({
    meta: [
      { title: "Integrated Google Calendar – Nalora" },
      {
        name: "description",
        content: "Integrated clinical calendar showcasing all booked consultations.",
      },
    ],
  }),
  component: DoctorCalendar,
});

// Mock appointments mapped to days of June 2026
const CALENDAR_APPOINTMENTS: Record<
  number,
  { patient: string; time: string; status: string; id: number }[]
> = {
  22: [{ id: 9, patient: "Neethu Mohan", time: "04:00 PM", status: "cancelled" }],
  23: [{ id: 8, patient: "Reshma S.", time: "11:00 AM", status: "completed" }],
  24: [
    { id: 6, patient: "Kavitha R.", time: "10:00 AM", status: "completed" },
    { id: 7, patient: "Sruthy V.", time: "03:30 PM", status: "completed" },
  ],
  25: [
    { id: 1, patient: "Anjali Menon", time: "09:00 AM", status: "completed" },
    { id: 2, patient: "Priyanka Raj", time: "11:30 AM", status: "completed" },
    { id: 3, patient: "Sneha Nair", time: "02:00 PM", status: "in-progress" },
    { id: 4, patient: "Divya Pillai", time: "04:00 PM", status: "upcoming" },
    { id: 5, patient: "Meera Krishnan", time: "06:30 PM", status: "upcoming" },
  ],
  26: [
    { id: 10, patient: "Aria James", time: "10:30 AM", status: "upcoming" },
    { id: 11, patient: "Leila Salim", time: "02:00 PM", status: "upcoming" },
  ],
  29: [{ id: 12, patient: "Dhanya K.", time: "09:30 AM", status: "upcoming" }],
};

function DoctorCalendar() {
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(5); // June (0-indexed 5)
  const [selectedDay, setSelectedDay] = useState<number | null>(25);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Total days in June 2026 is 30. Starting day of June 2026 is Monday (index 1)
  const startDayOffset = 1; // Mon
  const totalDays = 30;

  const daysGrid: (number | null)[] = [];
  // Add empty slots before Monday
  for (let i = 0; i < startDayOffset; i++) {
    daysGrid.push(null);
  }
  // Add actual days
  for (let d = 1; d <= totalDays; d++) {
    daysGrid.push(d);
  }

  const selectedDayAppointments = selectedDay ? CALENDAR_APPOINTMENTS[selectedDay] || [] : [];

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

        {/* Header section */}
        <div
          style={{
            background:
              "linear-gradient(160deg, oklch(0.92 0.01 240) 0%, oklch(0.95 0.01 240) 100%)",
            borderBottom: "1px solid oklch(0.9 0.01 240)",
            padding: "48px 32px 40px",
          }}
        >
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <p
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "oklch(0.5 0.04 200)",
                marginBottom: "8px",
              }}
            >
              Scheduling Integrations
            </p>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "2.2rem",
                fontWeight: 600,
                color: "var(--charcoal)",
                margin: 0,
              }}
            >
              Google Calendar Sync
            </h1>
            <p style={{ color: "oklch(0.55 0.01 240)", fontSize: "0.95rem", marginTop: "6px" }}>
              Manage your booked clinical hours, sync availability, and review dates.
            </p>
          </div>
        </div>

        {/* Calendar Workspace Grid */}
        <div
          style={{
            maxWidth: "1100px",
            margin: "32px auto 80px",
            padding: "0 24px",
            display: "grid",
            gridTemplateColumns: "1.8fr 1fr",
            gap: "28px",
          }}
          className="calendar-workspace"
        >
          {/* Calendar Month Grid (Left) */}
          <div
            style={{
              background: "white",
              padding: "32px",
              borderRadius: "24px",
              border: "1px solid oklch(0.92 0.01 240)",
              boxShadow: "0 4px 20px oklch(0 0 0 / 0.01)",
            }}
          >
            {/* Header / Month Switcher */}
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
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: "var(--charcoal)",
                  margin: 0,
                }}
              >
                {monthNames[currentMonth]} {currentYear}
              </h2>

              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    border: "1.5px solid oklch(0.88 0.02 240)",
                    background: "white",
                    cursor: "pointer",
                    display: "grid",
                    placeItems: "center",
                  }}
                  disabled
                >
                  ‹
                </button>
                <button
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    border: "1.5px solid oklch(0.88 0.02 240)",
                    background: "white",
                    cursor: "pointer",
                    display: "grid",
                    placeItems: "center",
                  }}
                  disabled
                >
                  ›
                </button>
              </div>
            </div>

            {/* Weekday headers */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gap: "8px",
                textAlign: "center",
                marginBottom: "12px",
              }}
            >
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <div
                  key={day}
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    color: "oklch(0.55 0.01 240)",
                    letterSpacing: "0.04em",
                    padding: "6px 0",
                  }}
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Days Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "8px" }}>
              {daysGrid.map((day, idx) => {
                if (day === null) {
                  return <div key={`empty-${idx}`} style={{ minHeight: "80px" }} />;
                }

                const hasAppointments = !!CALENDAR_APPOINTMENTS[day];
                const count = hasAppointments ? CALENDAR_APPOINTMENTS[day].length : 0;
                const isSelected = selectedDay === day;

                return (
                  <button
                    key={`day-${day}`}
                    onClick={() => setSelectedDay(day)}
                    style={{
                      minHeight: "80px",
                      background: isSelected ? "oklch(0.97 0.015 240)" : "white",
                      border: isSelected
                        ? "1.8px solid oklch(0.4 0.03 240)"
                        : "1px solid oklch(0.93 0.01 240)",
                      borderRadius: "14px",
                      padding: "8px",
                      cursor: "pointer",
                      textAlign: "left",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      transition: "all 0.15s",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "1rem",
                        fontWeight: isSelected ? 700 : 500,
                        color: isSelected ? "oklch(0.4 0.03 240)" : "var(--charcoal)",
                      }}
                    >
                      {day}
                    </span>

                    {hasAppointments && (
                      <div
                        style={{
                          width: "100%",
                          padding: "3px 6px",
                          borderRadius: "6px",
                          background: "oklch(0.4 0.03 240 / 0.08)",
                          color: "oklch(0.4 0.03 240)",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          textAlign: "center",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {count} session{count > 1 ? "s" : ""}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Agenda Sidebar (Right) */}
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
            <div
              style={{
                borderBottom: "1px solid oklch(0.95 0.01 240)",
                paddingBottom: "16px",
                marginBottom: "20px",
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.15rem",
                  fontWeight: 700,
                  color: "var(--charcoal)",
                  margin: 0,
                }}
              >
                Agenda Details
              </h3>
              <p style={{ fontSize: "0.78rem", color: "oklch(0.55 0.01 240)", marginTop: "4px" }}>
                {monthNames[currentMonth]} {selectedDay}, {currentYear}
              </p>
            </div>

            {selectedDayAppointments.length === 0 ? (
              <div
                style={{ textAlign: "center", padding: "40px 10px", color: "oklch(0.55 0.01 240)" }}
              >
                <span style={{ fontSize: "2rem" }}>🏝️</span>
                <p style={{ fontSize: "0.82rem", marginTop: "10px", margin: "10px 0 0" }}>
                  No bookings synced for this date.
                </p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {selectedDayAppointments.map((app) => (
                  <div
                    key={app.id}
                    style={{
                      padding: "16px",
                      borderRadius: "12px",
                      background: "oklch(0.99 0.003 240)",
                      border: "1px solid oklch(0.95 0.01 240)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.8rem",
                          color: "oklch(0.5 0.04 200)",
                          fontWeight: 700,
                        }}
                      >
                        {app.time}
                      </span>

                      {app.status === "completed" && (
                        <span
                          style={{
                            fontSize: "0.72rem",
                            fontWeight: 700,
                            padding: "1px 6px",
                            borderRadius: "99px",
                            background: "oklch(0.95 0.02 145)",
                            color: "oklch(0.35 0.06 145)",
                          }}
                        >
                          Done
                        </span>
                      )}
                      {app.status === "in-progress" && (
                        <span
                          style={{
                            fontSize: "0.72rem",
                            fontWeight: 700,
                            padding: "1px 6px",
                            borderRadius: "99px",
                            background: "oklch(0.95 0.02 240)",
                            color: "oklch(0.45 0.08 240)",
                          }}
                        >
                          Session
                        </span>
                      )}
                      {app.status === "upcoming" && (
                        <span
                          style={{
                            fontSize: "0.72rem",
                            fontWeight: 700,
                            padding: "1px 6px",
                            borderRadius: "99px",
                            background: "oklch(0.96 0.01 240)",
                            color: "oklch(0.5 0.01 240)",
                          }}
                        >
                          Upcoming
                        </span>
                      )}
                    </div>

                    <h4
                      style={{
                        fontSize: "1.05rem",
                        fontWeight: 600,
                        color: "var(--charcoal)",
                        margin: "8px 0 2px",
                      }}
                    >
                      {app.patient}
                    </h4>

                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "8px" }}>
                      <Link
                        to="/doctor/meeting-detail"
                        search={{ id: app.id }}
                        style={{
                          fontSize: "0.84rem",
                          color: "oklch(0.4 0.03 240)",
                          fontWeight: 600,
                          textDecoration: "none",
                        }}
                      >
                        View Console →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <style>{`
          @media (max-width: 900px) {
            .calendar-workspace {
              grid-template-columns: 1fr !important;
              gap: 24px !important;
            }
          }
          @media (max-width: 600px) {
            .calendar-workspace {
              padding: 0 16px 60px !important;
            }
            .calendar-workspace > div {
              padding: 20px !important;
            }
            .calendar-workspace button {
              min-height: 54px !important;
              padding: 4px 6px !important;
              border-radius: 8px !important;
            }
            .calendar-workspace button span {
              font-size: 0.8rem !important;
            }
            .calendar-workspace button div {
              font-size: 0.6rem !important;
              padding: 2px 4px !important;
              border-radius: 4px !important;
            }
          }
        `}</style>
      </div>
    </ProtectedPage>
  );
}
