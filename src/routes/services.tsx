import { createFileRoute, Link } from "@tanstack/react-router";
import { InnerNav } from "@/components/InnerNav";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "How Nalora Works – Nalora" },
      {
        name: "description",
        content:
          "Scheduled AI voice conversations, memory and continuity, a consent-based family dashboard and human review — how Nalora supports older adults.",
      },
    ],
  }),
  component: ServicesPage,
});

const SERVICES = [
  {
    title: "Scheduled Voice Conversations",
    desc: "Nalora's first product is an AI voice agent that makes scheduled telephone calls to registered older adults. Calls may be offered once, twice, three times a week or daily, and typically last around 5–20 minutes.",
    benefits: ["Telephone-based", "Your preferred time", "Your preferred language"],
    icon: "📞",
    color: "var(--sage-100)",
  },
  {
    title: "Memory & Continuity",
    desc: "Relevant memories, interests and preferences can provide context for future conversations — so each call can build on the last, and conversations become more meaningful over time.",
    benefits: ["Longitudinal personalisation", "Interests remembered", "Conversations that build"],
    icon: "🌱",
    color: "var(--sage-200)",
  },
  {
    title: "Meaningful Engagement",
    desc: "Conversations may include reflection, life stories, interests, cognitive activities and meaningful prompts — psychologically informed by perspectives such as life review, reminiscence and meaning-making.",
    benefits: ["Life stories & reflection", "Cognitive activities", "Gratitude & everyday joys"],
    icon: "💬",
    color: "oklch(0.95 0.03 145)",
  },
  {
    title: "Family Dashboard",
    desc: "A digital dashboard for authorised family members, relatives or primary caregivers. With appropriate consent and privacy safeguards, it shows engagement and wellbeing-related signals without unnecessarily exposing private conversation content.",
    benefits: ["Consent-based", "Wellbeing signals, not transcripts", "Suggested follow-up"],
    icon: "👨‍👩‍👧",
    color: "var(--sage-100)",
  },
  {
    title: "Human Review & Escalation",
    desc: "Nalora is human-in-the-loop. Trained professionals remain responsible for the psychological framework, quality monitoring, risk review, escalation protocols, appropriate referrals and human follow-up when required.",
    benefits: ["Risk review", "Escalation protocols", "Human follow-up"],
    icon: "🤝",
    color: "var(--sage-200)",
  },
];

const STEPS = [
  {
    step: "1",
    title: "Connect",
    desc: "Register and choose preferences such as language, calling time and conversation interests.",
  },
  {
    step: "2",
    title: "Converse",
    desc: "Nalora makes a scheduled voice call and engages in a natural, personalised conversation.",
  },
  {
    step: "3",
    title: "Support",
    desc: "Defined human-review pathways allow trained professionals to provide attention when appropriate.",
  },
];

function ServicesPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--ivory)", fontFamily: "var(--font-sans)" }}>
      <InnerNav />

      {/* Hero Section */}
      <section
        style={{
          background: "linear-gradient(160deg, var(--sage-100) 0%, var(--sage-50) 60%, var(--sage-200) 100%)",
          padding: "80px 24px 70px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <p
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--clay)",
              marginBottom: "12px",
            }}
          >
            How Nalora Works
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
              fontWeight: 500,
              color: "var(--charcoal)",
              margin: "0 0 20px",
              lineHeight: 1.15,
            }}
          >
            AI for connection.
            <br />
            <em className="italic text-rose">Humans for care.</em>
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              color: "oklch(0.45 0.01 150)",
              maxWidth: "600px",
              margin: "0 auto 40px",
              lineHeight: 1.8,
            }}
          >
            Regular, personalised voice conversations that help older adults stay connected with
            themselves, their memories, their relationships and their sense of meaning — with
            trained professionals in the loop.
          </p>
        </div>
      </section>

      {/* Core Services Detailed Grid */}
      <section style={{ padding: "80px 24px", maxWidth: "1100px", margin: "0 auto" }}>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr", gap: "40px" }}
          className="md:grid-cols-2"
        >
          {SERVICES.map((s) => (
            <div
              key={s.title}
              style={{
                background: "white",
                padding: "40px",
                borderRadius: "28px",
                border: "1px solid var(--border)",
                boxShadow: "var(--shadow-soft)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    marginBottom: "20px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "1.8rem",
                      width: "48px",
                      height: "48px",
                      borderRadius: "14px",
                      background: s.color,
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    {s.icon}
                  </span>
                  <h3
                    style={{
                      fontSize: "1.35rem",
                      fontWeight: 600,
                      color: "var(--charcoal)",
                      fontFamily: "var(--font-sans)",
                    }}
                  >
                    {s.title}
                  </h3>
                </div>
                <p
                  style={{
                    color: "oklch(0.5 0.01 150)",
                    fontSize: "0.95rem",
                    lineHeight: 1.7,
                    marginBottom: "24px",
                  }}
                >
                  {s.desc}
                </p>
              </div>

              <div
                style={{
                  borderTop: "1px solid var(--border)",
                  paddingTop: "20px",
                  marginTop: "10px",
                }}
              >
                <h4
                  style={{
                    fontSize: "0.8rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "oklch(0.6 0.01 150)",
                    marginBottom: "10px",
                    fontWeight: 700,
                  }}
                >
                  Key Features
                </h4>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {s.benefits.map((b) => (
                    <span
                      key={b}
                      style={{
                        padding: "5px 12px",
                        background: "var(--sage-50)",
                        borderRadius: "99px",
                        fontSize: "0.78rem",
                        color: "var(--charcoal)",
                        fontWeight: 500,
                        border: "1px solid var(--border)",
                      }}
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Boundaries card */}
          <div
            style={{
              background: "var(--forest)",
              color: "white",
              padding: "40px",
              borderRadius: "28px",
              boxShadow: "var(--shadow-lift)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h3 style={{ fontSize: "1.35rem", fontWeight: 600, fontFamily: "var(--font-sans)", margin: "0 0 16px" }}>
              What Nalora is not
            </h3>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.95rem", lineHeight: 1.7, margin: 0 }}>
              Nalora is psychologically informed rather than medically positioned. It is not an AI
              therapist, a diagnostic system or a medical treatment platform — and it is not a
              replacement for psychologists, doctors, caregivers or family relationships.
            </p>
            <p style={{ color: "var(--sage-200)", fontWeight: 600, margin: "20px 0 0" }}>
              Technology should augment human care, never impersonate human care.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section style={{ background: "var(--sage-100)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "2.2rem", marginBottom: "16px", color: "var(--charcoal)" }}>
            How to <em className="italic text-rose">Get Started</em>
          </h2>
          <p style={{ color: "oklch(0.5 0.01 150)", marginBottom: "48px" }}>
            A conversation that becomes more meaningful over time.
          </p>

          <div
            style={{ display: "grid", gridTemplateColumns: "1fr", gap: "30px" }}
            className="md:grid-cols-3"
          >
            {STEPS.map((step) => (
              <div
                key={step.step}
                style={{
                  background: "white",
                  padding: "30px",
                  borderRadius: "20px",
                  border: "1px solid var(--border)",
                  position: "relative",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: "-15px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    background: "var(--gradient-sunset)",
                    color: "white",
                    display: "grid",
                    placeItems: "center",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                  }}
                >
                  {step.step}
                </span>
                <h3
                  style={{
                    fontSize: "1.15rem",
                    marginTop: "10px",
                    marginBottom: "12px",
                    color: "var(--charcoal)",
                    fontFamily: "var(--font-sans)",
                    fontWeight: 600,
                  }}
                >
                  {step.title}
                </h3>
                <p style={{ color: "oklch(0.5 0.01 150)", fontSize: "0.88rem", lineHeight: 1.6 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section style={{ padding: "100px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: "650px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "2.20rem", marginBottom: "16px", color: "var(--charcoal)" }}>
            Explore <em className="italic text-rose">early access</em>
          </h2>
          <p style={{ color: "oklch(0.5 0.01 150)", marginBottom: "32px", lineHeight: 1.7 }}>
            We are building carefully, testing with people and learning before scaling. Register
            your interest and we'll keep you updated on the next pilot.
          </p>
          <Link
            to="/create-account"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "14px 32px",
              borderRadius: "99px",
              background: "var(--gradient-sunset)",
              color: "white",
              fontSize: "0.95rem",
              fontWeight: 600,
              textDecoration: "none",
              boxShadow: "0 6px 20px oklch(0.45 0.06 160 / 0.3)",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            Explore Early Access
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
