import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useState } from "react";
import { InnerNav } from "@/components/InnerNav";
import therapist1 from "@/assets/therapist-1.jpg";
import therapist2 from "@/assets/therapist-2.jpg";
import therapist3 from "@/assets/therapist-3.jpg";

export const Route = createFileRoute("/doctor-profile/$id")({
  head: () => ({
    meta: [
      { title: "Doctor Profile - Nalora" },
      {
        name: "description",
        content: "View detailed doctor profile, specialisations, availability and book a session on Nalora.",
      },
    ],
  }),
  component: DoctorProfilePage,
});

const DOCTORS = [
  {
    id: 1,
    name: "Aisha Menon",
    role: "Consultant Psychologist",
    tags: ["Postpartum Anxiety", "Mood Concerns", "Sleep & Identity"],
    issueCategories: ["Anxiety & Worry", "Postpartum Depression", "Sleep Disorders", "Mood & Emotional Wellbeing", "Identity & Self-Worth"],
    languages: ["Malayalam", "English"],
    price: "Rs.1,000",
    rating: 4.9,
    reviews: 124,
    nextAvailable: "Today, 4:00 PM",
    experience: "8 yrs",
    sessions: "250+",
    img: therapist1,
    accent: "#FFF1C2",
    accentDark: "#E8C840",
    affiliation: "M.Sc. in Clinical Psychology, University of Kerala",
    bio: "Aisha Menon is a compassionate consultant psychologist with 8 years of experience supporting mothers through postpartum anxiety, identity shifts, and mood disorders.",
    approach: "Cognitive Behavioural Therapy (CBT), Mindfulness-Based Stress Reduction (MBSR), Emotion-Focused Therapy",
    concerns: [
      "I am feeling overwhelmed and anxious after having my baby.",
      "I am struggling to connect with my newborn and feeling guilty about it.",
      "I cannot sleep even when my baby sleeps and feel exhausted all the time.",
      "I feel like I have lost my sense of self since becoming a mother.",
      "My mood swings are affecting my relationship with my partner.",
      "I am experiencing intrusive thoughts that scare me.",
      "I feel isolated and disconnected from the people around me.",
    ],
  },
  {
    id: 2,
    name: "Lakshmi Pillai",
    role: "Clinical Psychologist",
    tags: ["Birth Trauma", "Relationship Concerns", "Life Transitions"],
    issueCategories: ["Birth Trauma & PTSD", "Relationship & Couple Dynamics", "Life Transitions", "Grief & Loss", "Family Conflicts"],
    languages: ["Malayalam", "Tamil"],
    price: "Rs.1,200",
    rating: 4.8,
    reviews: 89,
    nextAvailable: "Tomorrow, 10:00 AM",
    experience: "12 yrs",
    sessions: "500+",
    img: therapist2,
    accent: "#FCD7D1",
    accentDark: "#E8725A",
    affiliation: "M.Phil. Clinical Psychology, NIMHANS Bangalore",
    bio: "Lakshmi Pillai is a highly experienced clinical psychologist specialising in birth trauma and relationship dynamics during the perinatal period.",
    approach: "Trauma-Focused CBT, EMDR, Narrative Therapy, Family Systems Therapy",
    concerns: [
      "My birth experience was traumatic and I keep reliving it.",
      "I feel my partner does not understand what I am going through.",
      "I am grieving the birth experience I had planned and hoped for.",
      "Becoming a parent has brought up unresolved childhood memories.",
      "My relationship with my family has become strained since the baby arrived.",
      "I feel I am failing at every role - mother, partner, daughter.",
      "I am finding it hard to adjust to this new chapter of life.",
    ],
  },
  {
    id: 3,
    name: "Dr. Rohan Iyer",
    role: "Perinatal Psychiatrist",
    tags: ["Hormonal Mood Shifts", "Medication Reviews", "PPD"],
    issueCategories: ["Postpartum Depression", "Perinatal Anxiety", "Medication Management", "Hormonal Mood Disorders", "Psychosis & Severe Mood"],
    languages: ["English", "Hindi"],
    price: "Rs.1,500",
    rating: 4.9,
    reviews: 203,
    nextAvailable: "Today, 6:00 PM",
    experience: "15 yrs",
    sessions: "800+",
    img: therapist3,
    accent: "#D6EFD9",
    accentDark: "#3A8F4A",
    affiliation: "MD Psychiatry, AIIMS New Delhi | Perinatal Mental Health Fellowship",
    bio: "Dr. Rohan Iyer is a leading perinatal psychiatrist with 15 years of expertise in managing hormonal mood disorders and postpartum depression.",
    approach: "Perinatal Psychopharmacology, Interpersonal Therapy (IPT), Collaborative Care Model",
    concerns: [
      "I have been feeling deeply depressed since my baby was born.",
      "I am unsure if my medication is safe to take while breastfeeding.",
      "My mood changes dramatically and I cannot predict how I will feel.",
      "I am having thoughts of harming myself and need urgent help.",
      "I feel detached from reality and worried about my mental state.",
      "I was diagnosed with a mood disorder before pregnancy and need specialist support.",
      "My previous psychiatrist is not available and I need continuity of care.",
    ],
  },
  {
    id: 4,
    name: "Dr. Meera Krishnan",
    role: "Perinatal Counselor",
    tags: ["Mood Concerns", "Birth Trauma", "Postpartum Anxiety"],
    issueCategories: ["Mood & Emotional Wellbeing", "Postpartum Anxiety", "Birth Trauma", "Mother-Baby Bonding", "Cultural Adjustment"],
    languages: ["Malayalam", "English", "Tamil"],
    price: "Rs.900",
    rating: 4.7,
    reviews: 67,
    nextAvailable: "Today, 2:00 PM",
    experience: "6 yrs",
    sessions: "180+",
    img: null,
    accent: "#C8D8F0",
    accentDark: "#3A5FA0",
    affiliation: "M.A. Counselling Psychology, Loyola College Chennai",
    bio: "Dr. Meera Krishnan brings a nurturing, holistic perspective to perinatal counselling, creating safe spaces across three languages.",
    approach: "Person-Centred Therapy, Solution-Focused Brief Therapy (SFBT), Psychoeducation",
    concerns: [
      "I feel anxious all the time and cannot calm my mind.",
      "I am struggling to bond with my baby and feel ashamed.",
      "My family has high expectations and I feel I cannot cope.",
      "I am from a different cultural background and feel misunderstood.",
      "I feel numb and empty rather than joyful about becoming a mother.",
      "I need support but do not know where to start.",
      "I want affordable counselling that understands my background.",
    ],
  },
  {
    id: 5,
    name: "Dr. Priya Nair",
    role: "Family Therapist",
    tags: ["Relationship Concerns", "Life Transitions", "Mood Concerns"],
    issueCategories: ["Couple & Relationship Issues", "Family Dynamics", "Life Transitions", "Communication Breakdown", "Parenting Stress"],
    languages: ["Malayalam", "Hindi"],
    price: "Rs.1,100",
    rating: 4.6,
    reviews: 91,
    nextAvailable: "Fri, 11:00 AM",
    experience: "10 yrs",
    sessions: "320+",
    img: null,
    accent: "#E8D8F0",
    accentDark: "#7A3FA0",
    affiliation: "M.Sc. Family Therapy, TISS Mumbai",
    bio: "Dr. Priya Nair is a seasoned family therapist who helps couples and families navigate the profound relationship shifts that accompany new parenthood.",
    approach: "Gottman Method Couples Therapy, Systemic Family Therapy, Attachment-Based Therapy",
    concerns: [
      "My partner and I argue constantly since the baby was born.",
      "I feel unsupported by my family and completely alone.",
      "Intimacy and connection with my partner has disappeared.",
      "We disagree on parenting styles and it is creating conflict.",
      "My in-laws are interfering and causing tension in my marriage.",
      "I feel resentful towards my partner for not sharing the load.",
      "We need someone to help us communicate better as a couple.",
    ],
  },
  {
    id: 6,
    name: "Dr. Sanjana Thomas",
    role: "Child & Perinatal Psychologist",
    tags: ["Sleep & Identity", "Postpartum Anxiety", "Birth Trauma"],
    issueCategories: ["Sleep & Rest Issues", "Maternal Identity", "Mother-Infant Relationship", "Developmental Concerns", "Postpartum Anxiety"],
    languages: ["English", "Malayalam"],
    price: "Rs.1,300",
    rating: 4.8,
    reviews: 55,
    nextAvailable: "Tomorrow, 3:00 PM",
    experience: "9 yrs",
    sessions: "290+",
    img: null,
    accent: "#D8F0E8",
    accentDark: "#1A7A50",
    affiliation: "Ph.D. Child & Developmental Psychology, University of Madras",
    bio: "Dr. Sanjana Thomas uniquely bridges child development and maternal psychology, empowering mothers to thrive alongside their growing children.",
    approach: "Dyadic Therapy, Infant-Parent Psychotherapy, ACT (Acceptance & Commitment Therapy)",
    concerns: [
      "I cannot sleep and feel like a zombie caring for my baby.",
      "I no longer know who I am beyond being a mother.",
      "I am worried my mental health is affecting my baby's development.",
      "I feel my baby does not respond to me the way I hoped.",
      "I am anxious every time my baby cries and do not know why.",
      "I want to be a present mother but feel I am falling short.",
      "I need help understanding my baby and myself at the same time.",
    ],
  },
];

function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "2px" }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width={size} height={size} viewBox="0 0 24 24"
          fill={s <= Math.round(rating) ? "#F5A25D" : "none"}
          stroke={s <= Math.round(rating) ? "#F5A25D" : "#D0D0D0"}
          strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </span>
  );
}

function AudioPlayer() {
  const [playing, setPlaying] = useState(false);
  const bars = Array.from({ length: 28 }, (_, i) => i);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <button
        onClick={() => setPlaying(!playing)}
        style={{
          width: "36px", height: "36px", borderRadius: "50%",
          background: "var(--rose)", border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0, boxShadow: "0 4px 12px oklch(0.74 0.11 18 / 0.3)",
          transition: "transform 0.15s",
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.08)")}
        onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
      >
        {playing ? (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
        ) : (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        )}
      </button>
      <div style={{ display: "flex", alignItems: "center", gap: "2px", flex: 1 }}>
        {bars.map((_, i) => {
          const h = 4 + Math.sin(i * 0.8) * 8 + Math.cos(i * 0.5) * 6;
          return (
            <div key={i} style={{
              width: "3px", height: `${Math.max(4, Math.abs(h))}px`,
              borderRadius: "2px",
              background: playing && i < 10 ? "var(--rose)" : "oklch(0.85 0.02 18)",
              transition: "background 0.3s",
              animation: playing ? `pulse-bar ${0.4 + (i % 5) * 0.1}s ease-in-out infinite alternate` : "none",
            }} />
          );
        })}
      </div>
    </div>
  );
}

function DoctorProfilePage() {
  const { id } = useParams({ from: "/doctor-profile/$id" });
  const doc = DOCTORS.find((d) => d.id === Number(id));

  if (!doc) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--ivory)", fontFamily: "var(--font-sans)" }}>
        <InnerNav />
        <div style={{ textAlign: "center", padding: "120px 24px" }}>
          <div style={{ fontSize: "4rem", marginBottom: "16px" }}>404</div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", color: "var(--charcoal)", marginBottom: "12px" }}>
            Doctor not found
          </h1>
          <Link to="/doctors" style={{ padding: "12px 28px", borderRadius: "99px", background: "linear-gradient(135deg, var(--rose), var(--sunset))", color: "white", fontWeight: 700, textDecoration: "none" }}>
            Back to Doctors
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @keyframes pulse-bar {
          from { transform: scaleY(0.6); }
          to { transform: scaleY(1.4); }
        }
        .concern-row {
          transition: background 0.18s, transform 0.18s;
          cursor: default;
        }
        .concern-row:hover {
          background: oklch(0.97 0.02 18) !important;
          transform: translateX(4px);
        }
        .issue-pill {
          transition: all 0.18s;
          cursor: default;
        }
        .issue-pill:hover {
          background: var(--rose) !important;
          color: white !important;
          border-color: var(--rose) !important;
        }
      `}</style>

      <div style={{ minHeight: "100vh", background: "oklch(0.97 0.01 55)", fontFamily: "var(--font-sans)" }}>
        <InnerNav />

        {/* Thin accent top bar */}
        <div style={{ height: "4px", background: `linear-gradient(90deg, ${doc.accent}, ${doc.accentDark}, var(--rose))` }} />

        {/* Back nav */}
        <div style={{ maxWidth: "1180px", margin: "0 auto", padding: "20px 24px 0" }}>
          <Link to="/doctors" style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            fontSize: "0.8rem", fontWeight: 600, color: "oklch(0.5 0.06 18)",
            textDecoration: "none", letterSpacing: "0.03em",
            padding: "6px 14px", borderRadius: "99px",
            background: "white", border: "1px solid oklch(0.90 0.02 55)",
            transition: "all 0.18s",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "var(--rose)"; e.currentTarget.style.color = "white"; e.currentTarget.style.borderColor = "var(--rose)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "white"; e.currentTarget.style.color = "oklch(0.5 0.06 18)"; e.currentTarget.style.borderColor = "oklch(0.90 0.02 55)"; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M5 12l7 7M5 12l7-7"/></svg>
            All Doctors
          </Link>
        </div>

        {/* Main two-column layout */}
        <div style={{
          maxWidth: "1180px", margin: "0 auto",
          padding: "24px 24px 80px",
          display: "grid",
          gridTemplateColumns: "340px 1fr",
          gap: "24px",
          alignItems: "start",
        }}>

          {/* ── LEFT STICKY SIDEBAR ── */}
          <div style={{ position: "sticky", top: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>

            {/* Profile card */}
            <div style={{
              background: "white", borderRadius: "24px",
              border: "1px solid oklch(0.92 0.02 55)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
              overflow: "hidden",
            }}>
              {/* Colored header */}
              <div style={{
                background: `linear-gradient(160deg, ${doc.accent} 0%, ${doc.accent}AA 100%)`,
                padding: "24px 24px 0",
                display: "flex", alignItems: "flex-end", gap: "16px",
              }}>
                {doc.img ? (
                  <img src={doc.img} alt={doc.name} style={{
                    width: "88px", height: "100px", objectFit: "cover", objectPosition: "top",
                    borderRadius: "16px 16px 0 0",
                    border: "3px solid white", borderBottom: "none",
                    boxShadow: "0 -4px 20px rgba(0,0,0,0.12)", flexShrink: 0,
                  }} />
                ) : (
                  <div style={{
                    width: "88px", height: "100px", borderRadius: "16px 16px 0 0",
                    background: "white", display: "grid", placeItems: "center",
                    fontFamily: "var(--font-display)", fontSize: "2.6rem",
                    color: "var(--rose)", fontWeight: 700, flexShrink: 0,
                    boxShadow: "0 -4px 20px rgba(0,0,0,0.1)",
                  }}>
                    {doc.name.charAt(0)}
                  </div>
                )}
                <div style={{ paddingBottom: "16px" }}>
                  <div style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: doc.accentDark, marginBottom: "4px" }}>
                    Nalora Verified
                  </div>
                  <Stars rating={doc.rating} size={13} />
                  <div style={{ fontSize: "0.75rem", color: "oklch(0.5 0.01 60)", marginTop: "3px" }}>
                    {doc.rating} · {doc.reviews} reviews
                  </div>
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: "20px 24px" }}>
                {/* Name & role */}
                <h1 style={{
                  fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 700,
                  color: "var(--charcoal)", margin: "0 0 3px", lineHeight: 1.2,
                }}>
                  {doc.name}
                </h1>
                <p style={{ fontSize: "0.82rem", color: "var(--rose)", fontWeight: 600, margin: "0 0 16px", letterSpacing: "0.02em" }}>
                  {doc.role}
                </p>

                {/* Experience badge */}
                <div style={{
                  background: `linear-gradient(135deg, ${doc.accentDark}22, ${doc.accentDark}11)`,
                  border: `1.5px solid ${doc.accentDark}44`,
                  borderRadius: "10px", padding: "10px 14px",
                  display: "flex", alignItems: "center", gap: "10px",
                  marginBottom: "20px",
                }}>
                  <span style={{ fontSize: "1.3rem" }}>🏅</span>
                  <div>
                    <div style={{ fontSize: "0.92rem", fontWeight: 800, color: doc.accentDark }}>{doc.sessions}</div>
                    <div style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "oklch(0.55 0.01 60)" }}>
                      Sessions completed
                    </div>
                  </div>
                  <div style={{ marginLeft: "auto", textAlign: "right" }}>
                    <div style={{ fontSize: "0.92rem", fontWeight: 800, color: doc.accentDark }}>{doc.experience}</div>
                    <div style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "oklch(0.55 0.01 60)" }}>
                      Experience
                    </div>
                  </div>
                </div>

                {/* Audio intro */}
                <div style={{
                  background: "oklch(0.97 0.01 55)", borderRadius: "12px", padding: "14px",
                  marginBottom: "20px", border: "1px solid oklch(0.92 0.02 55)",
                }}>
                  <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "oklch(0.55 0.01 60)", marginBottom: "10px" }}>
                    Listen to the therapist
                  </div>
                  <AudioPlayer />
                </div>

                {/* Details list */}
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <div>
                    <div style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--rose)", marginBottom: "4px" }}>
                      Affiliation
                    </div>
                    <p style={{ fontSize: "0.82rem", color: "var(--charcoal)", margin: 0, lineHeight: 1.5 }}>{doc.affiliation}</p>
                  </div>
                  <div>
                    <div style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--rose)", marginBottom: "4px" }}>
                      Languages
                    </div>
                    <p style={{ fontSize: "0.82rem", color: "var(--charcoal)", margin: 0 }}>{doc.languages.join(", ")}</p>
                  </div>
                  <div>
                    <div style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--rose)", marginBottom: "4px" }}>
                      Session Fee
                    </div>
                    <p style={{ fontSize: "0.82rem", color: "var(--charcoal)", margin: 0, fontWeight: 700 }}>{doc.price} / hr</p>
                  </div>
                </div>
              </div>

              {/* Availability + CTA */}
              <div style={{ padding: "0 24px 24px" }}>
                <div style={{
                  background: "oklch(0.97 0.01 55)", borderRadius: "12px", padding: "12px 16px",
                  marginBottom: "14px", border: "1px solid oklch(0.92 0.02 55)",
                  display: "flex", alignItems: "center", gap: "10px",
                }}>
                  <div style={{
                    width: "8px", height: "8px", borderRadius: "50%",
                    background: "#2ECC71", boxShadow: "0 0 0 3px #2ECC7122", flexShrink: 0,
                  }} />
                  <div>
                    <div style={{ fontSize: "0.65rem", color: "oklch(0.6 0.01 60)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>Next available</div>
                    <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--charcoal)" }}>{doc.nextAvailable}</div>
                  </div>
                </div>

                <Link
                  to="/book-session"
                  style={{
                    display: "block", textAlign: "center", padding: "14px",
                    borderRadius: "14px",
                    background: "linear-gradient(135deg, var(--rose) 0%, var(--sunset) 100%)",
                    color: "white", fontWeight: 800, fontSize: "0.88rem",
                    textDecoration: "none", letterSpacing: "0.06em", textTransform: "uppercase",
                    boxShadow: "0 6px 24px oklch(0.74 0.11 18 / 0.3)",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 32px oklch(0.74 0.11 18 / 0.38)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 24px oklch(0.74 0.11 18 / 0.3)"; }}
                >
                  Book a Session
                </Link>
              </div>
            </div>

            {/* Approach card */}
            <div style={{
              background: "white", borderRadius: "20px", padding: "20px 22px",
              border: "1px solid oklch(0.92 0.02 55)",
              boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
            }}>
              <div style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--rose)", marginBottom: "10px" }}>
                Therapeutic Approach
              </div>
              <p style={{ fontSize: "0.82rem", color: "oklch(0.45 0.01 60)", lineHeight: 1.75, margin: 0 }}>
                {doc.approach}
              </p>
            </div>
          </div>

          {/* ── RIGHT CONTENT PANEL ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

            {/* Concerns section */}
            <div style={{
              background: "white", borderRadius: "24px",
              border: "1px solid oklch(0.92 0.02 55)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
              overflow: "hidden",
            }}>
              <div style={{
                padding: "28px 32px 20px",
                borderBottom: "1px solid oklch(0.94 0.01 55)",
              }}>
                <h2 style={{
                  fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: 600,
                  color: "var(--charcoal)", margin: "0 0 4px",
                }}>
                  Concerns I can help with
                </h2>
                <p style={{ fontSize: "0.82rem", color: "oklch(0.6 0.01 60)", margin: 0 }}>
                  If any of these resonate with you, I am here to listen.
                </p>
              </div>

              <div style={{ padding: "12px 12px" }}>
                {doc.concerns.map((concern, i) => (
                  <div key={i} className="concern-row" style={{
                    padding: "14px 20px", borderRadius: "12px",
                    display: "flex", alignItems: "flex-start", gap: "14px",
                    borderBottom: i < doc.concerns.length - 1 ? "1px solid oklch(0.95 0.01 55)" : "none",
                    background: "white",
                  }}>
                    <div style={{
                      width: "28px", height: "28px", borderRadius: "50%", flexShrink: 0,
                      background: `${doc.accent}`, border: `1.5px solid ${doc.accentDark}33`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "0.75rem", fontWeight: 700, color: doc.accentDark,
                    }}>
                      {i + 1}
                    </div>
                    <p style={{ fontSize: "0.9rem", color: "oklch(0.4 0.01 60)", lineHeight: 1.65, margin: 0 }}>
                      {concern}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Issues / specialisation tags */}
            <div style={{
              background: "white", borderRadius: "24px", padding: "28px 32px",
              border: "1px solid oklch(0.92 0.02 55)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
            }}>
              <h2 style={{
                fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: 600,
                color: "var(--charcoal)", margin: "0 0 16px",
              }}>
                Issues I can help with
              </h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {doc.issueCategories.map((issue) => (
                  <span key={issue} className="issue-pill" style={{
                    fontSize: "0.82rem", padding: "8px 18px", borderRadius: "99px",
                    background: "oklch(0.97 0.01 55)",
                    color: "oklch(0.4 0.02 18)", fontWeight: 600,
                    border: "1.5px solid oklch(0.90 0.02 55)",
                  }}>
                    {issue}
                  </span>
                ))}
                {doc.tags.map((tag) => (
                  <span key={tag} className="issue-pill" style={{
                    fontSize: "0.82rem", padding: "8px 18px", borderRadius: "99px",
                    background: `${doc.accent}55`,
                    color: doc.accentDark, fontWeight: 600,
                    border: `1.5px solid ${doc.accentDark}33`,
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* About section */}
            <div style={{
              background: "white", borderRadius: "24px", padding: "28px 32px",
              border: "1px solid oklch(0.92 0.02 55)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
            }}>
              <h2 style={{
                fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: 600,
                color: "var(--charcoal)", margin: "0 0 14px",
              }}>
                About {doc.name.split(" ")[0]}
              </h2>
              <p style={{ fontSize: "0.92rem", color: "oklch(0.45 0.01 60)", lineHeight: 1.85, margin: 0 }}>
                {doc.bio}
              </p>
            </div>

            {/* Bottom CTA banner */}
            <div style={{
              background: `linear-gradient(135deg, ${doc.accentDark}EE 0%, var(--rose) 100%)`,
              borderRadius: "24px", padding: "32px",
              boxShadow: `0 8px 32px ${doc.accentDark}44`,
              display: "flex", alignItems: "center", justifyContent: "space-between",
              flexWrap: "wrap", gap: "20px",
            }}>
              <div>
                <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.75)", marginBottom: "8px" }}>
                  Ready to begin your journey?
                </div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700, color: "white", lineHeight: 1.2 }}>
                  Book a session with {doc.name.split(" ")[0]}
                </div>
                <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.8)", marginTop: "6px" }}>
                  {doc.nextAvailable} · {doc.price}/hr · {doc.experience} experience
                </div>
              </div>
              <Link
                to="/book-session"
                style={{
                  padding: "14px 32px", borderRadius: "14px",
                  background: "white", color: "var(--rose)",
                  fontSize: "0.9rem", fontWeight: 800, textDecoration: "none",
                  whiteSpace: "nowrap", letterSpacing: "0.04em",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.15)", transition: "all 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,0.22)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.15)"; }}
              >
                Book Now →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

