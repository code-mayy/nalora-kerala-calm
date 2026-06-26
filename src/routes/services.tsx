import { createFileRoute, Link } from "@tanstack/react-router";
import { InnerNav } from "@/components/InnerNav";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Our Services – Nalora" },
      {
        name: "description",
        content:
          "Explore Nalora's postpartum care services including 24/7 AI chat support, professional therapist matching, family circles, and vernacular libraries.",
      },
    ],
  }),
  component: ServicesPage,
});

function Footer() {
  return (
    <footer className="border-t border-border bg-[var(--ivory-deep)] py-14">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--gradient-sunset)] text-white font-display">
              n
            </span>
            <span className="font-display text-xl">nalora</span>
          </div>
          <p className="mt-4 text-sm text-foreground/60 max-w-xs">
            Emotional support for motherhood. Rooted in Kerala, built for every home.
          </p>
        </div>
        {[
          ["Care", ["Late-night support", "Therapist matching", "Family circle", "Library"]],
          ["Company", ["Our story", "Therapists", "Careers", "Press"]],
          ["Support", ["Help centre", "Privacy", "Terms", "Contact"]],
        ].map(([h, items]) => (
          <div key={h as string}>
            <div className="font-display text-sm uppercase tracking-[0.16em] text-foreground/60">
              {h}
            </div>
            <ul className="mt-4 space-y-2.5 text-sm">
              {(items as string[]).map((i) => (
                <li key={i}>
                  <a href="#" className="text-foreground/75 hover:text-rose transition">
                    {i}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-12 max-w-6xl px-6 text-xs text-foreground/50">
        © {new Date().getFullYear()} Nalora Care. Made with care in Kerala.
      </div>
    </footer>
  );
}

function ServicesPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--ivory)", fontFamily: "var(--font-sans)" }}>
      <InnerNav />

      {/* Hero Section */}
      <section
        style={{
          background:
            "linear-gradient(160deg, oklch(0.96 0.02 145) 0%, oklch(0.97 0.025 55) 60%, oklch(0.96 0.03 18) 100%)",
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
              color: "var(--rose)",
              marginBottom: "12px",
            }}
          >
            What We Offer
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
            Holistic Postpartum Care,
            <br />
            <em className="italic text-rose">Whenever You Need It</em>
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              color: "oklch(0.45 0.01 60)",
              maxWidth: "600px",
              margin: "0 auto 40px",
              lineHeight: 1.8,
            }}
          >
            Whether you need a late-night companion, direct counseling with maternal experts, or
            family integration, we have customized services tailored for your journey.
          </p>
        </div>
      </section>

      {/* Core Services Detailed Grid */}
      <section style={{ padding: "80px 24px", maxWidth: "1100px", margin: "0 auto" }}>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr", gap: "40px" }}
          className="md:grid-cols-2"
        >
          {[
            {
              title: "Late-Night Companion (AI Chat)",
              desc: "An always-active, empathetic AI companion trained in maternal mental health. Available in local languages (Malayalam, Tamil, Kannada, Hindi) to answer your concerns, help you track symptoms, or simply listen to your story at 3 AM without judgment.",
              benefits: [
                "24/7 Availability",
                "Vernacular Conversations",
                "Perinatal Guidelines Trained",
              ],
              icon: "🌙",
              color: "#E8F5E9",
            },
            {
              title: "Perinatal Therapist Matching",
              desc: "Direct virtual consultations with certified maternal mental health psychologists and perinatal psychiatrists. We assess your specific challenges (postpartum anxiety, baby blues, trauma, or relationship stress) and pair you with a specialist in under 24 hours.",
              benefits: [
                "Licensed Professionals Only",
                "Tailored Matching Assessment",
                "Secure Video/Audio Consults",
              ],
              icon: "🩺",
              color: "#FFF3E0",
            },
            {
              title: "Family Circle Integration",
              desc: "Motherhood is a shared ecosystem. Nalora allows you to securely invite your partner, parents, or in-laws into your care plan, sharing updates, notifications, and guided educational tips so they know how to support you.",
              benefits: [
                "Partner Syncing",
                "Support Coordination",
                "Educational Guides for Family",
              ],
              icon: "👨‍👩‍👧‍👦",
              color: "#E3F2FD",
            },
            {
              title: "Recovery Rhythms & Tracking",
              desc: "A beautiful, interactive space to log your daily sleep, mood shifts, anxiety levels, and baby's feeding cycles. The platform analyzes your patterns and offers gentle, personalized care tips to balance your body and mind.",
              benefits: [
                "Insightful Weekly Reports",
                "Customized Health Nudges",
                "Mood & Rest Correlation",
              ],
              icon: "📊",
              color: "#FCE4EC",
            },
            {
              title: "Vernacular Audio Library",
              desc: "Access a rich repository of guided meditations, stories, and postpartum care techniques recorded by local experts in regional languages. Designed to fit into your brief moments of quiet throughout the day.",
              benefits: [
                "Traditional Wellness Insights",
                "Guided Breathing & Relaxations",
                "Malayalam & Regional Audio Guides",
              ],
              icon: "🎧",
              color: "#EDE7F6",
            },
          ].map((s) => (
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
                    color: "oklch(0.5 0.01 60)",
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
                    color: "oklch(0.6 0.01 60)",
                    marginBottom: "10px",
                    fontWeight: 700,
                  }}
                >
                  Key Benefits
                </h4>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {s.benefits.map((b) => (
                    <span
                      key={b}
                      style={{
                        padding: "5px 12px",
                        background: "oklch(0.975 0.01 60)",
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
        </div>
      </section>

      {/* How It Works Section */}
      <section style={{ background: "oklch(0.975 0.015 55)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "2.2rem", marginBottom: "16px", color: "var(--charcoal)" }}>
            How to <em className="italic text-rose">Get Started</em>
          </h2>
          <p style={{ color: "oklch(0.5 0.01 60)", marginBottom: "48px" }}>
            Begin your recovery in three simple steps.
          </p>

          <div
            style={{ display: "grid", gridTemplateColumns: "1fr", gap: "30px" }}
            className="md:grid-cols-3"
          >
            {[
              {
                step: "1",
                title: "Setup Profile",
                desc: "Create an account and answer a brief wellness assessment about your health history and preferences.",
              },
              {
                step: "2",
                title: "Customize Plan",
                desc: "Get matched with a dedicated psychologist and invite family members to coordinate care.",
              },
              {
                step: "3",
                title: "Daily Check-ins",
                desc: "Interact with our AI companion, log parameters, and attend virtual therapy sessions weekly.",
              },
            ].map((step) => (
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
                <p style={{ color: "oklch(0.5 0.01 60)", fontSize: "0.88rem", lineHeight: 1.6 }}>
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
            Let's customize <em className="italic text-rose">your plan</em>
          </h2>
          <p style={{ color: "oklch(0.5 0.01 60)", marginBottom: "32px", lineHeight: 1.7 }}>
            Your first week is entirely free. Start monitoring your progress and talking with our
            guides today.
          </p>
          <Link
            to="/login"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "14px 32px",
              borderRadius: "99px",
              background: "linear-gradient(135deg, var(--rose), var(--sunset))",
              color: "white",
              fontSize: "0.95rem",
              fontWeight: 600,
              textDecoration: "none",
              boxShadow: "0 6px 20px oklch(0.74 0.11 18 / 0.3)",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            Start Free Trial
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
