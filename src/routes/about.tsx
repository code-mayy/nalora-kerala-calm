import { createFileRoute, Link } from "@tanstack/react-router";
import { InnerNav } from "@/components/InnerNav";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us – Nalora" },
      {
        name: "description",
        content:
          "Learn about Nalora's mission to provide Kerala-rooted, compassionate postpartum care and emotional support for mothers.",
      },
    ],
  }),
  component: AboutPage,
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

function AboutPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--ivory)", fontFamily: "var(--font-sans)" }}>
      <InnerNav />

      {/* Hero Section */}
      <section
        style={{
          background:
            "linear-gradient(160deg, oklch(0.96 0.03 18) 0%, oklch(0.97 0.025 55) 60%, oklch(0.96 0.02 145) 100%)",
          padding: "80px 24px 70px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Soft decorative background circles */}
        <div
          style={{
            position: "absolute",
            top: "-50px",
            left: "-50px",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: "var(--rose-soft)",
            opacity: 0.4,
            filter: "blur(40px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-30px",
            right: "-30px",
            width: "220px",
            height: "220px",
            borderRadius: "50%",
            background: "var(--coconut-soft)",
            opacity: 0.4,
            filter: "blur(40px)",
          }}
        />

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
            Our Mission & Roots
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
            Rooted in Kerala,
            <br />
            <em className="italic text-rose">Cradled by Community</em>
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
            Postpartum recovery is not just a medical process; it is a transition of identity,
            heart, and community. We build tools that combine local wisdom with perinatal care to
            make mothers feel seen, heard, and supported.
          </p>
        </div>
      </section>

      {/* The Story Section */}
      <section style={{ padding: "80px 24px", maxWidth: "1000px", margin: "0 auto" }}>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr", gap: "50px", alignItems: "center" }}
          className="md:grid-cols-2"
        >
          <div>
            <h2
              style={{
                fontSize: "2.4rem",
                marginBottom: "20px",
                color: "var(--charcoal)",
                lineHeight: 1.2,
              }}
            >
              Why <em className="italic text-rose">Nalora</em> was born
            </h2>
            <p style={{ color: "oklch(0.45 0.01 60)", marginBottom: "16px", lineHeight: 1.75 }}>
              postpartum care in Kerala has traditionally been rooted in the "Prasava Raksha" —
              forty days of customized herbs, food, massages, and surrounding care. Yet, as the
              world moved into nuclear families and digital workspaces, mothers began navigating
              early motherhood in isolation.
            </p>
            <p style={{ color: "oklch(0.45 0.01 60)", marginBottom: "20px", lineHeight: 1.75 }}>
              Nalora was founded to bring back that cradle of care in a modern, digital form. We
              integrate maternal mental health tracking, support networks, and expert local
              counselors to ensure that recovery is deep, comforting, and always accessible.
            </p>
          </div>
          <div
            style={{
              background: "white",
              padding: "40px",
              borderRadius: "32px",
              border: "1px solid var(--border)",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <h3
              style={{
                fontSize: "1.4rem",
                marginBottom: "14px",
                color: "var(--charcoal)",
                fontFamily: "var(--font-display)",
              }}
            >
              "No mother should heal alone."
            </h3>
            <p
              style={{
                color: "oklch(0.45 0.01 60)",
                fontSize: "0.95rem",
                lineHeight: 1.7,
                marginBottom: "24px",
              }}
            >
              Nalora brings clinical psychologists trained in perinatal counseling, 24/7 vernacular
              assistance, and a structured platform for husband and family onboarding, preserving
              traditional warmth in a busy digital world.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  background: "var(--gradient-sunset)",
                  display: "grid",
                  placeItems: "center",
                  color: "white",
                  fontWeight: 700,
                }}
              >
                IH
              </div>
              <div>
                <div style={{ fontWeight: 600, color: "var(--charcoal)", fontSize: "0.95rem" }}>
                  Ibrahim Hawaaz
                </div>
                <div style={{ fontSize: "0.8rem", color: "oklch(0.55 0.01 60)" }}>
                  Co-founder & CEO, Nalora Care
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section style={{ background: "oklch(0.975 0.015 55)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h2
            style={{
              textAlign: "center",
              fontSize: "2.2rem",
              marginBottom: "50px",
              color: "var(--charcoal)",
            }}
          >
            Our Core <em className="italic text-rose">Values</em>
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "28px",
            }}
          >
            {[
              {
                title: "Vernacular First",
                desc: "Care is best delivered in the mother's own tongue. We provide support, audio libraries, and therapist matching in Malayalam, Tamil, Kannada, Hindi, and English.",
                icon: "💬",
                color: "var(--rose-soft)",
              },
              {
                title: "Clinical Excellence",
                desc: "All our therapists are hand-picked, certified clinical or consultant psychologists trained specifically in maternal mental health, PPD, and birth trauma care.",
                icon: "🩺",
                color: "var(--coconut-soft)",
              },
              {
                title: "Absolute Privacy",
                desc: "We ensure end-to-end encrypted messaging, strict patient-doctor confidentiality, and a secure ecosystem so mothers can share their stories safely.",
                icon: "🔒",
                color: "oklch(0.96 0.03 55)",
              },
            ].map((v) => (
              <div
                key={v.title}
                style={{
                  background: "white",
                  padding: "32px",
                  borderRadius: "24px",
                  border: "1px solid var(--border)",
                  boxShadow: "var(--shadow-soft)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <span
                  style={{
                    fontSize: "2rem",
                    width: "50px",
                    height: "50px",
                    borderRadius: "16px",
                    background: v.color,
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  {v.icon}
                </span>
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    color: "var(--charcoal)",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  {v.title}
                </h3>
                <p style={{ color: "oklch(0.5 0.01 60)", fontSize: "0.95rem", lineHeight: 1.6 }}>
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: "100px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: "650px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "2.20rem", marginBottom: "16px", color: "var(--charcoal)" }}>
            Ready to start <em className="italic text-rose">your journey?</em>
          </h2>
          <p style={{ color: "oklch(0.5 0.01 60)", marginBottom: "32px", lineHeight: 1.7 }}>
            Sign up today to explore our resources, connect with certified professionals, and
            receive support every step of the way.
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
