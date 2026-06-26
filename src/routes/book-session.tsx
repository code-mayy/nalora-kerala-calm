import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { InnerNav } from "@/components/InnerNav";
import { ProtectedPage } from "@/context/AuthContext";
import therapist1 from "@/assets/therapist-1.jpg";
import therapist2 from "@/assets/therapist-2.jpg";
import therapist3 from "@/assets/therapist-3.jpg";

export const Route = createFileRoute("/book-session")({
  head: () => ({
    meta: [
      { title: "Book a Session – Nalora" },
      {
        name: "description",
        content:
          "Select a preferred doctor, pick an available date and time slot, and confirm your appointment on Nalora.",
      },
    ],
  }),
  component: BookSessionPage,
});

const DOCTORS = [
  {
    id: 1,
    name: "Aisha Menon",
    role: "Consultant Psychologist",
    price: "₹1,000",
    rating: 4.9,
    img: therapist1,
    accent: "#FFF1C2",
    tags: ["Postpartum Anxiety", "Mood Concerns"],
  },
  {
    id: 2,
    name: "Lakshmi Pillai",
    role: "Clinical Psychologist",
    price: "₹1,200",
    rating: 4.8,
    img: therapist2,
    accent: "#FCD7D1",
    tags: ["Birth Trauma", "Life Transitions"],
  },
  {
    id: 3,
    name: "Dr. Rohan Iyer",
    role: "Perinatal Psychiatrist",
    price: "₹1,500",
    rating: 4.9,
    img: therapist3,
    accent: "#D6EFD9",
    tags: ["Hormonal Mood Shifts", "PPD"],
  },
  {
    id: 4,
    name: "Dr. Meera Krishnan",
    role: "Perinatal Counselor",
    price: "₹900",
    rating: 4.7,
    img: null,
    accent: "#C8D8F0",
    tags: ["Mood Concerns", "Postpartum Anxiety"],
  },
  {
    id: 5,
    name: "Dr. Priya Nair",
    role: "Family Therapist",
    price: "₹1,100",
    rating: 4.6,
    img: null,
    accent: "#E8D8F0",
    tags: ["Relationship Concerns"],
  },
  {
    id: 6,
    name: "Dr. Sanjana Thomas",
    role: "Child & Perinatal Psychologist",
    price: "₹1,300",
    rating: 4.8,
    img: null,
    accent: "#D8F0E8",
    tags: ["Sleep & Identity", "Birth Trauma"],
  },
];

const TIME_SLOTS = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
];
const UNAVAILABLE = new Set(["10:00 AM", "03:00 PM"]);

function getUpcomingDays(count: number) {
  const days: Date[] = [];
  for (let i = 1; i <= count; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    days.push(d);
  }
  return days;
}

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

type SelectedDoctor = (typeof DOCTORS)[number];

function StepBar({ step }: { step: number }) {
  const steps = ["Choose Doctor", "Pick Date", "Pick Time", "Confirm"];
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0",
        marginBottom: "36px",
        overflowX: "auto",
      }}
    >
      {steps.map((label, i) => (
        <div
          key={label}
          style={{ display: "flex", alignItems: "center", flex: i < steps.length - 1 ? 1 : 0 }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}
          >
            <div
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "50%",
                display: "grid",
                placeItems: "center",
                background:
                  i < step
                    ? "var(--coconut)"
                    : i === step
                      ? "linear-gradient(135deg, var(--rose), var(--sunset))"
                      : "oklch(0.92 0.01 60)",
                color: i <= step ? "white" : "oklch(0.6 0.01 60)",
                fontSize: "0.85rem",
                fontWeight: 700,
                boxShadow: i === step ? "0 4px 14px oklch(0.74 0.11 18 / 0.3)" : "none",
                transition: "all 0.3s",
              }}
            >
              {i < step ? (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                i + 1
              )}
            </div>
            <span
              style={{
                fontSize: "0.68rem",
                fontWeight: i === step ? 700 : 400,
                color: i === step ? "var(--rose)" : "oklch(0.6 0.01 60)",
                whiteSpace: "nowrap",
              }}
            >
              {label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              style={{
                flex: 1,
                height: "2px",
                background: i < step ? "var(--coconut)" : "oklch(0.9 0.01 60)",
                margin: "0 6px",
                marginBottom: "20px",
                transition: "background 0.3s",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function BookSessionPage() {
  const [step, setStep] = useState(0);
  const [doctor, setDoctor] = useState<SelectedDoctor | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const days = mounted ? getUpcomingDays(10) : [];

  function reset() {
    setStep(0);
    setDoctor(null);
    setDate(null);
    setTime(null);
    setConfirmed(false);
  }

  return (
    <ProtectedPage allowedRole="patient">
      <div
        style={{ minHeight: "100vh", background: "var(--ivory)", fontFamily: "var(--font-sans)" }}
      >
        <InnerNav />

        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "48px 24px 80px" }}>
          {/* Page heading */}
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
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
              Schedule a Visit
            </p>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                fontWeight: 600,
                color: "var(--charcoal)",
                margin: 0,
              }}
            >
              Book a Session
            </h1>
          </div>

          {confirmed ? (
            /* ── Confirmation screen ── */
            <div
              style={{
                background: "white",
                borderRadius: "24px",
                padding: "56px 40px",
                textAlign: "center",
                boxShadow: "0 8px 40px oklch(0.74 0.11 18 / 0.1)",
                border: "1px solid oklch(0.92 0.02 55)",
              }}
            >
              <div
                style={{
                  width: "72px",
                  height: "72px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, var(--coconut), #4ade80)",
                  display: "grid",
                  placeItems: "center",
                  margin: "0 auto 20px",
                  boxShadow: "0 12px 40px oklch(0.62 0.08 145 / 0.35)",
                  animation: "pop 0.4s ease",
                }}
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.8rem",
                  fontWeight: 600,
                  color: "var(--charcoal)",
                  marginBottom: "8px",
                }}
              >
                Session Booked! 🎉
              </h2>
              <p
                style={{
                  color: "oklch(0.55 0.01 60)",
                  fontSize: "0.9rem",
                  maxWidth: "380px",
                  margin: "0 auto 28px",
                  lineHeight: 1.7,
                }}
              >
                Your appointment with <strong>{doctor?.name}</strong> on{" "}
                <strong>
                  {date
                    ? `${DAY_LABELS[date.getDay()]}, ${MONTH_LABELS[date.getMonth()]} ${date.getDate()}`
                    : ""}
                </strong>{" "}
                at <strong>{time}</strong> is confirmed. A reminder will be sent to your email.
              </p>
              <div
                style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}
              >
                <Link
                  to="/bookings"
                  style={{
                    padding: "13px 28px",
                    borderRadius: "99px",
                    background: "linear-gradient(135deg, var(--rose), var(--sunset))",
                    color: "white",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    textDecoration: "none",
                    boxShadow: "0 6px 20px oklch(0.74 0.11 18 / 0.28)",
                  }}
                >
                  View My Bookings
                </Link>
                <button
                  onClick={reset}
                  style={{
                    padding: "13px 28px",
                    borderRadius: "99px",
                    border: "1.5px solid oklch(0.88 0.02 55)",
                    background: "white",
                    color: "oklch(0.45 0.01 60)",
                    fontWeight: 500,
                    fontSize: "0.9rem",
                    cursor: "pointer",
                  }}
                >
                  Book Another
                </button>
              </div>
            </div>
          ) : (
            <div
              style={{
                background: "white",
                borderRadius: "24px",
                padding: "36px",
                boxShadow: "0 8px 40px oklch(0.74 0.11 18 / 0.08)",
                border: "1px solid oklch(0.92 0.02 55)",
              }}
            >
              <StepBar step={step} />

              {/* Step 0 — Choose Doctor */}
              {step === 0 && (
                <div>
                  <h2
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.4rem",
                      fontWeight: 600,
                      color: "var(--charcoal)",
                      marginBottom: "6px",
                    }}
                  >
                    Choose a Professional
                  </h2>
                  <p
                    style={{
                      color: "oklch(0.55 0.01 60)",
                      fontSize: "0.88rem",
                      marginBottom: "24px",
                    }}
                  >
                    Select the therapist you'd like to meet.
                  </p>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                      gap: "14px",
                    }}
                  >
                    {DOCTORS.map((d) => (
                      <button
                        key={d.id}
                        onClick={() => {
                          setDoctor(d);
                          setStep(1);
                        }}
                        style={{
                          textAlign: "left",
                          background:
                            doctor?.id === d.id
                              ? "oklch(0.74 0.11 18 / 0.07)"
                              : "oklch(0.98 0.008 60)",
                          border: `2px solid ${doctor?.id === d.id ? "var(--rose)" : "oklch(0.91 0.02 55)"}`,
                          borderRadius: "16px",
                          padding: "16px",
                          cursor: "pointer",
                          transition: "all 0.2s",
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                        }}
                        onMouseEnter={(e) => {
                          if (doctor?.id !== d.id)
                            (e.currentTarget as HTMLElement).style.borderColor =
                              "oklch(0.74 0.11 18 / 0.5)";
                        }}
                        onMouseLeave={(e) => {
                          if (doctor?.id !== d.id)
                            (e.currentTarget as HTMLElement).style.borderColor =
                              "oklch(0.91 0.02 55)";
                        }}
                      >
                        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                          {d.img ? (
                            <img
                              src={d.img}
                              alt={d.name}
                              style={{
                                width: "44px",
                                height: "44px",
                                borderRadius: "10px",
                                objectFit: "cover",
                              }}
                            />
                          ) : (
                            <div
                              style={{
                                width: "44px",
                                height: "44px",
                                borderRadius: "10px",
                                background: d.accent,
                                display: "grid",
                                placeItems: "center",
                                fontFamily: "var(--font-display)",
                                fontSize: "1.2rem",
                                color: "var(--rose)",
                                fontWeight: 600,
                              }}
                            >
                              {d.name.charAt(0)}
                            </div>
                          )}
                          <div>
                            <div
                              style={{
                                fontFamily: "var(--font-display)",
                                fontSize: "0.95rem",
                                fontWeight: 600,
                                color: "var(--charcoal)",
                              }}
                            >
                              {d.name}
                            </div>
                            <div
                              style={{ fontSize: "0.74rem", color: "var(--rose)", fontWeight: 500 }}
                            >
                              {d.role}
                            </div>
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                            {d.tags.slice(0, 1).map((t) => (
                              <span
                                key={t}
                                style={{
                                  fontSize: "0.66rem",
                                  padding: "3px 8px",
                                  borderRadius: "99px",
                                  background: "oklch(0.96 0.02 18)",
                                  color: "oklch(0.42 0.08 18)",
                                  fontWeight: 500,
                                }}
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                          <span
                            style={{
                              fontSize: "0.88rem",
                              fontWeight: 700,
                              color: "var(--charcoal)",
                            }}
                          >
                            {d.price}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 1 — Pick Date */}
              {step === 1 && (
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginBottom: "20px",
                    }}
                  >
                    {doctor?.img ? (
                      <img
                        src={doctor.img}
                        alt={doctor.name}
                        style={{
                          width: "42px",
                          height: "42px",
                          borderRadius: "10px",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: "42px",
                          height: "42px",
                          borderRadius: "10px",
                          background: doctor?.accent,
                          display: "grid",
                          placeItems: "center",
                          fontFamily: "var(--font-display)",
                          fontSize: "1.1rem",
                          color: "var(--rose)",
                          fontWeight: 600,
                        }}
                      >
                        {doctor?.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <div
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "1rem",
                          fontWeight: 600,
                          color: "var(--charcoal)",
                        }}
                      >
                        {doctor?.name}
                      </div>
                      <div style={{ fontSize: "0.76rem", color: "var(--rose)", fontWeight: 500 }}>
                        {doctor?.role}
                      </div>
                    </div>
                  </div>
                  <h2
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.4rem",
                      fontWeight: 600,
                      color: "var(--charcoal)",
                      marginBottom: "6px",
                    }}
                  >
                    Select a Date
                  </h2>
                  <p
                    style={{
                      color: "oklch(0.55 0.01 60)",
                      fontSize: "0.88rem",
                      marginBottom: "24px",
                    }}
                  >
                    Available slots for the next 10 days.
                  </p>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
                      gap: "10px",
                    }}
                  >
                    {days.map((d) => {
                      const isSelected = date?.toDateString() === d.toDateString();
                      const isWeekend = d.getDay() === 0;
                      return (
                        <button
                          key={d.toISOString()}
                          onClick={() => !isWeekend && setDate(d)}
                          disabled={isWeekend}
                          style={{
                            padding: "14px 8px",
                            borderRadius: "14px",
                            border: `2px solid ${isSelected ? "var(--rose)" : isWeekend ? "transparent" : "oklch(0.91 0.02 55)"}`,
                            background: isSelected
                              ? "oklch(0.74 0.11 18 / 0.08)"
                              : isWeekend
                                ? "oklch(0.95 0.01 60)"
                                : "white",
                            color: isSelected
                              ? "var(--rose)"
                              : isWeekend
                                ? "oklch(0.75 0.01 60)"
                                : "var(--charcoal)",
                            cursor: isWeekend ? "not-allowed" : "pointer",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "4px",
                            transition: "all 0.2s",
                            opacity: isWeekend ? 0.45 : 1,
                          }}
                        >
                          <span
                            style={{
                              fontSize: "0.7rem",
                              fontWeight: 600,
                              letterSpacing: "0.06em",
                              textTransform: "uppercase",
                              color: isSelected ? "var(--rose)" : "oklch(0.6 0.01 60)",
                            }}
                          >
                            {DAY_LABELS[d.getDay()]}
                          </span>
                          <span
                            style={{
                              fontSize: "1.3rem",
                              fontWeight: 700,
                              fontFamily: "var(--font-display)",
                            }}
                          >
                            {d.getDate()}
                          </span>
                          <span
                            style={{
                              fontSize: "0.68rem",
                              color: isSelected ? "var(--rose)" : "oklch(0.65 0.01 60)",
                            }}
                          >
                            {MONTH_LABELS[d.getMonth()]}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  <div style={{ display: "flex", gap: "12px", marginTop: "32px" }}>
                    <button
                      onClick={() => setStep(0)}
                      style={{
                        padding: "13px 24px",
                        borderRadius: "12px",
                        border: "1.5px solid oklch(0.88 0.02 55)",
                        background: "white",
                        color: "oklch(0.45 0.01 60)",
                        fontWeight: 500,
                        cursor: "pointer",
                        fontSize: "0.9rem",
                      }}
                    >
                      ← Back
                    </button>
                    <button
                      onClick={() => date && setStep(2)}
                      disabled={!date}
                      style={{
                        flex: 1,
                        padding: "13px",
                        borderRadius: "12px",
                        border: "none",
                        background: date
                          ? "linear-gradient(135deg, var(--rose), var(--sunset))"
                          : "oklch(0.92 0.01 60)",
                        color: "white",
                        fontWeight: 700,
                        cursor: date ? "pointer" : "not-allowed",
                        fontSize: "0.9rem",
                        boxShadow: date ? "0 6px 20px oklch(0.74 0.11 18 / 0.28)" : "none",
                      }}
                    >
                      Continue →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2 — Pick Time */}
              {step === 2 && (
                <div>
                  <div
                    style={{
                      marginBottom: "20px",
                      padding: "14px 18px",
                      borderRadius: "14px",
                      background: "oklch(0.97 0.015 60)",
                      border: "1px solid oklch(0.91 0.02 55)",
                      fontSize: "0.85rem",
                      color: "oklch(0.45 0.01 60)",
                    }}
                  >
                    📅 <strong>{doctor?.name}</strong> ·{" "}
                    {date
                      ? `${DAY_LABELS[date.getDay()]}, ${MONTH_LABELS[date.getMonth()]} ${date.getDate()}`
                      : ""}
                  </div>
                  <h2
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.4rem",
                      fontWeight: 600,
                      color: "var(--charcoal)",
                      marginBottom: "6px",
                    }}
                  >
                    Choose a Time Slot
                  </h2>
                  <p
                    style={{
                      color: "oklch(0.55 0.01 60)",
                      fontSize: "0.88rem",
                      marginBottom: "24px",
                    }}
                  >
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                      <span
                        style={{
                          width: "10px",
                          height: "10px",
                          borderRadius: "2px",
                          background: "oklch(0.92 0.01 60)",
                          display: "inline-block",
                        }}
                      />{" "}
                      Unavailable
                      <span
                        style={{
                          marginLeft: "10px",
                          width: "10px",
                          height: "10px",
                          borderRadius: "2px",
                          background: "oklch(0.74 0.11 18 / 0.1)",
                          border: "2px solid var(--rose)",
                          display: "inline-block",
                        }}
                      />{" "}
                      Your pick
                    </span>
                  </p>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))",
                      gap: "10px",
                    }}
                  >
                    {TIME_SLOTS.map((slot) => {
                      const unavail = UNAVAILABLE.has(slot);
                      const selected = time === slot;
                      return (
                        <button
                          key={slot}
                          onClick={() => !unavail && setTime(slot)}
                          disabled={unavail}
                          style={{
                            padding: "14px 8px",
                            borderRadius: "12px",
                            border: `2px solid ${selected ? "var(--rose)" : unavail ? "transparent" : "oklch(0.91 0.02 55)"}`,
                            background: selected
                              ? "oklch(0.74 0.11 18 / 0.08)"
                              : unavail
                                ? "oklch(0.93 0.01 60)"
                                : "white",
                            color: selected
                              ? "var(--rose)"
                              : unavail
                                ? "oklch(0.72 0.01 60)"
                                : "var(--charcoal)",
                            fontWeight: selected ? 700 : 500,
                            fontSize: "0.88rem",
                            cursor: unavail ? "not-allowed" : "pointer",
                            opacity: unavail ? 0.5 : 1,
                            transition: "all 0.2s",
                            textDecoration: unavail ? "line-through" : "none",
                          }}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                  <div style={{ display: "flex", gap: "12px", marginTop: "32px" }}>
                    <button
                      onClick={() => setStep(1)}
                      style={{
                        padding: "13px 24px",
                        borderRadius: "12px",
                        border: "1.5px solid oklch(0.88 0.02 55)",
                        background: "white",
                        color: "oklch(0.45 0.01 60)",
                        fontWeight: 500,
                        cursor: "pointer",
                        fontSize: "0.9rem",
                      }}
                    >
                      ← Back
                    </button>
                    <button
                      onClick={() => time && setStep(3)}
                      disabled={!time}
                      style={{
                        flex: 1,
                        padding: "13px",
                        borderRadius: "12px",
                        border: "none",
                        background: time
                          ? "linear-gradient(135deg, var(--rose), var(--sunset))"
                          : "oklch(0.92 0.01 60)",
                        color: "white",
                        fontWeight: 700,
                        cursor: time ? "pointer" : "not-allowed",
                        fontSize: "0.9rem",
                        boxShadow: time ? "0 6px 20px oklch(0.74 0.11 18 / 0.28)" : "none",
                      }}
                    >
                      Continue →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3 — Confirm */}
              {step === 3 && (
                <div>
                  <h2
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.4rem",
                      fontWeight: 600,
                      color: "var(--charcoal)",
                      marginBottom: "6px",
                    }}
                  >
                    Confirm Booking
                  </h2>
                  <p
                    style={{
                      color: "oklch(0.55 0.01 60)",
                      fontSize: "0.88rem",
                      marginBottom: "24px",
                    }}
                  >
                    Review your appointment details before confirming.
                  </p>

                  {/* Summary card */}
                  <div
                    style={{
                      borderRadius: "18px",
                      border: "1.5px solid oklch(0.9 0.02 55)",
                      overflow: "hidden",
                      marginBottom: "24px",
                    }}
                  >
                    <div
                      style={{
                        background: "linear-gradient(135deg, var(--rose), var(--sunset))",
                        padding: "18px 22px",
                        color: "white",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          marginBottom: "4px",
                          opacity: 0.85,
                        }}
                      >
                        Appointment Summary
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "1.2rem",
                          fontWeight: 600,
                        }}
                      >
                        Nalora Care Session
                      </div>
                    </div>
                    <div
                      style={{
                        background: "white",
                        padding: "20px 22px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "14px",
                      }}
                    >
                      {[
                        {
                          icon: "👩‍⚕️",
                          label: "Professional",
                          value: `${doctor?.name} · ${doctor?.role}`,
                        },
                        {
                          icon: "📅",
                          label: "Date",
                          value: date
                            ? `${DAY_LABELS[date.getDay()]}, ${MONTH_LABELS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
                            : "",
                        },
                        { icon: "🕐", label: "Time", value: time ?? "" },
                        { icon: "💳", label: "Session Fee", value: doctor?.price ?? "" },
                        { icon: "🎥", label: "Session Type", value: "Video Call (60 min)" },
                      ].map(({ icon, label, value }) => (
                        <div
                          key={label}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            paddingBottom: "12px",
                            borderBottom: "1px solid oklch(0.95 0.01 60)",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "0.82rem",
                              color: "oklch(0.55 0.01 60)",
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                            }}
                          >
                            {icon} {label}
                          </span>
                          <span
                            style={{
                              fontSize: "0.88rem",
                              fontWeight: 600,
                              color: "var(--charcoal)",
                            }}
                          >
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div
                    style={{
                      padding: "14px 18px",
                      borderRadius: "12px",
                      background: "oklch(0.97 0.02 145 / 0.5)",
                      border: "1px solid oklch(0.88 0.04 145)",
                      fontSize: "0.8rem",
                      color: "oklch(0.38 0.06 145)",
                      marginBottom: "24px",
                      lineHeight: 1.6,
                    }}
                  >
                    ✅ Free cancellation up to 24 hours before your appointment. You'll receive a
                    confirmation email with the video link.
                  </div>

                  <div style={{ display: "flex", gap: "12px" }}>
                    <button
                      onClick={() => setStep(2)}
                      style={{
                        padding: "13px 24px",
                        borderRadius: "12px",
                        border: "1.5px solid oklch(0.88 0.02 55)",
                        background: "white",
                        color: "oklch(0.45 0.01 60)",
                        fontWeight: 500,
                        cursor: "pointer",
                        fontSize: "0.9rem",
                      }}
                    >
                      ← Back
                    </button>
                    <button
                      id="confirm-booking-btn"
                      onClick={() => setConfirmed(true)}
                      style={{
                        flex: 1,
                        padding: "15px",
                        borderRadius: "12px",
                        border: "none",
                        background: "linear-gradient(135deg, var(--rose), var(--sunset))",
                        color: "white",
                        fontWeight: 700,
                        cursor: "pointer",
                        fontSize: "0.95rem",
                        boxShadow: "0 8px 28px oklch(0.74 0.11 18 / 0.32)",
                        letterSpacing: "0.02em",
                      }}
                    >
                      Confirm & Book Session →
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <style>{`
        @keyframes pop {
          0% { transform: scale(0.5); opacity: 0; }
          70% { transform: scale(1.08); }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
      </div>
    </ProtectedPage>
  );
}
