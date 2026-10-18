import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { InnerNav } from "@/components/InnerNav";
import { SiteFooter } from "@/components/SiteFooter";
import amarRajan from "@/assets/amar-rajan.png";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us – Nalora" },
      {
        name: "description",
        content:
          "Nalora is building the relationship layer for ageing — psychologically informed, human-in-the-loop voice conversations for older adults.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const [isReadMore, setIsReadMore] = useState(false);
  const [isStoryReadMore, setIsStoryReadMore] = useState(false);
  return (
    <div style={{ minHeight: "100vh", background: "var(--ivory)", fontFamily: "var(--font-sans)" }}>
      <InnerNav />

      {/* Hero Section */}
      <section
        style={{
          background: "linear-gradient(135deg, var(--forest), var(--forest-deep))",
          padding: "110px 24px 90px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        {/* Soft background light blooms */}
        <div
          style={{
            position: "absolute",
            top: "-10%",
            left: "-10%",
            width: "50%",
            height: "120%",
            background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
            filter: "blur(25px)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "-10%",
            right: "-10%",
            width: "55%",
            height: "120%",
            background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)",
            filter: "blur(25px)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: "850px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "15px",
              fontWeight: 500,
              color: "white",
              fontStyle: "italic",
              marginBottom: "16px",
              fontFamily: "var(--font-sans)",
            }}
          >
            {/* Outline circle-sphere loop icon */}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
            </svg>
            About Us
          </div>

          {/* Heading */}
          <h1
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(2.4rem, 5.5vw, 4rem)",
              fontWeight: 700,
              color: "white",
              margin: "0",
              lineHeight: 1.18,
              letterSpacing: "-0.02em",
              textShadow: "0 2px 10px rgba(0,0,0,0.25)",
            }}
          >
            The relationship layer
            <br />
            for <span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, color: "var(--sage-200)" }}>ageing</span>
          </h1>
          <p
            style={{
              marginTop: "20px",
              fontSize: "1.1rem",
              color: "rgba(255,255,255,0.8)",
              lineHeight: 1.6,
            }}
          >
            Human-centred AI for ageing well.
          </p>
        </div>
      </section>

      {/* The Story Section */}
      <section style={{ padding: "80px 24px", maxWidth: "1100px", margin: "0 auto" }}>
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          {/* Left Column - Text Content */}
          <div style={{ textAlign: "left" }}>
            <h2
              className="font-display"
              style={{
                fontSize: "2.8rem",
                fontWeight: 600,
                marginBottom: "24px",
                color: "var(--charcoal)",
                lineHeight: 1.2,
              }}
            >
              We started with <span className="text-rose">people</span>, not technology
            </h2>

            <p style={{ color: "oklch(0.45 0.01 150)", marginBottom: "20px", lineHeight: 1.8 }} className="text-[15px] sm:text-base font-sans font-normal">
              Many older adults have families who care deeply about them. But loved ones may live in different cities, States or countries, and maintaining regular conversation can be difficult. <strong className="font-semibold text-charcoal">The problem is not always absence of love. It is often absence of continuity.</strong>
            </p>

            {isStoryReadMore && (
              <>
                <p style={{ color: "oklch(0.45 0.01 150)", marginBottom: "20px", lineHeight: 1.8 }} className="text-[15px] sm:text-base font-sans font-normal transition-all duration-300">
                  Nalora began with a small human-led pilot involving 10 older adults. Psychology postgraduate students were trained before conducting scheduled telephone conversations focused on wellbeing, reflection and engagement. Participants were receptive and engaged naturally, and some began expecting and anticipating the calls.
                </p>
                <p style={{ color: "oklch(0.45 0.01 150)", marginBottom: "20px", lineHeight: 1.8 }} className="text-[15px] sm:text-base font-sans font-normal transition-all duration-300">
                  This is early behavioural validation — not evidence of clinical efficacy. We are building carefully, testing with people and learning before scaling.
                </p>
              </>
            )}

            <button
              onClick={() => setIsStoryReadMore(!isStoryReadMore)}
              style={{
                background: "var(--forest-deep)",
                color: "white",
                border: "none",
                padding: "10px 24px",
                borderRadius: "30px",
                fontSize: "0.9rem",
                fontWeight: 700,
                cursor: "pointer",
                marginTop: "12px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s ease",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                fontFamily: "var(--font-sans)",
              }}
              className="hover:-translate-y-0.5 active:scale-95 transition"
            >
              {isStoryReadMore ? "Read Less" : "Read More"}
            </button>
          </div>

          {/* Right Column - Vision card */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div
              style={{
                width: "100%",
                maxWidth: "450px",
                borderRadius: "32px",
                padding: "40px 36px",
                background: "linear-gradient(160deg, var(--sage-100), var(--sage-200))",
                border: "1px solid var(--border)",
                boxShadow: "var(--shadow-lift)",
              }}
            >
              <div
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--clay)",
                }}
              >
                Our vision
              </div>
              <p
                className="font-display"
                style={{
                  margin: "16px 0 0",
                  fontSize: "1.7rem",
                  lineHeight: 1.3,
                  color: "var(--forest-deep)",
                }}
              >
                A future where ageing does not mean becoming socially invisible.
              </p>
              <p style={{ margin: "20px 0 0", color: "var(--forest)", fontWeight: 600 }}>
                AI for connection. Humans for care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Founder Section */}
      <section
        id="meet-founder"
        className="relative z-10 grid grid-cols-1 md:grid-cols-2 overflow-hidden shadow-[0_24px_50px_-20px_rgba(0,0,0,0.15)]"
        style={{ width: "100%" }}
      >
        {/* Left Pane - Solid Rose Theme Background */}
        <div
          style={{
            background: "var(--forest)",
            padding: "80px 40px",
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            position: "relative",
          }}
          className="px-8 py-20 sm:py-28 md:px-16 lg:px-24"
        >
          {/* Background radial glow */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_30%,white_0%,transparent_60%)] pointer-events-none" />
          <div className="relative z-10 max-w-xl">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl leading-tight text-white font-medium uppercase tracking-tight font-semibold">
              MEET OUR <span style={{ color: "var(--coconut-soft)" }}>FOUNDER</span>
            </h2>
            
            <div
              style={{
                fontSize: "1.25rem",
                fontWeight: 500,
                fontStyle: "italic",
                lineHeight: 1.5,
                marginTop: "32px",
                marginBottom: "24px",
                color: "rgba(255, 255, 255, 0.95)",
                borderLeft: "4px solid var(--coconut-soft)",
                paddingLeft: "16px",
              }}
            >
              "Committed to human growth and emotional well-being through scientific interventions."
            </div>

            <p style={{ marginBottom: "20px" }} className="text-[14.5px] sm:text-[15px] text-white/90 leading-relaxed font-sans font-normal">
              Amar Rajan is an experienced entrepreneur, organizational psychologist, and trainer with over a decade of corporate firm experience. With an academic foundation in Applied Psychology and an MPhil in Consulting Psychology, Amar brings a wealth of expertise spanning psychometric assessments, people development, and counseling—further augmented by specialized training in Occupational Test Use (Ability & Personality) from the University of Cambridge, UK. In 2015, he established MindCarter, a thriving enterprise offering comprehensive psychological interventions.
            </p>

            {isReadMore && (
              <p style={{ marginBottom: "20px" }} className="text-[14.5px] sm:text-[15px] text-white/85 leading-relaxed font-sans font-normal transition-all duration-300">
                Internationally recognized for his training and consulting contributions across Qatar and the UAE, Amar pioneered the introduction of personality assessment rounds to television reality shows. He is a frequent speaker at national and international academic conferences and holds multiple research publications in peer-reviewed journals focusing on organizational, sports, and human factors psychology. He was also honored with the prestigious Duke of Edinburgh's Award in 1996.
              </p>
            )}

            <button
              onClick={() => setIsReadMore(!isReadMore)}
              style={{
                background: "white",
                color: "var(--rose)",
                border: "none",
                padding: "10px 24px",
                borderRadius: "30px",
                fontSize: "0.9rem",
                fontWeight: 700,
                cursor: "pointer",
                marginTop: "12px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s ease",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                fontFamily: "var(--font-sans)",
              }}
              className="hover:bg-neutral-50 hover:-translate-y-0.5 active:scale-95 transition"
            >
              {isReadMore ? "Read Less" : "Read More"}
            </button>

            <div
              style={{
                marginTop: "40px",
                display: "flex",
                flexWrap: "wrap",
                gap: "20px",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                <span style={{ fontSize: "1.1rem", fontWeight: 700, color: "white" }}>
                  Amar Rajan
                </span>
                <span style={{ fontSize: "0.85rem", color: "var(--coconut-soft)", fontWeight: 500 }}>
                  Founder, Director & CEO
                </span>
              </div>
              
              {/* Social links row */}
              <div style={{ display: "flex", gap: "12px" }}>
                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/amarrajan/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: "white",
                    color: "var(--rose)",
                    display: "grid",
                    placeItems: "center",
                    transition: "all 0.2s ease",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
                  }}
                  className="hover:scale-110 hover:shadow-md transition active:scale-95"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/amar.rajan/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: "white",
                    color: "var(--rose)",
                    display: "grid",
                    placeItems: "center",
                    transition: "all 0.2s ease",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
                  }}
                  className="hover:scale-110 hover:shadow-md transition active:scale-95"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="https://www.youtube.com/@amarrajan"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: "white",
                    color: "var(--rose)",
                    display: "grid",
                    placeItems: "center",
                    transition: "all 0.2s ease",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
                  }}
                  className="hover:scale-110 hover:shadow-md transition active:scale-95"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Pane - Soft sage backdrop, founder image aligned bottom-right */}
        <div className="relative min-h-[380px] md:min-h-full w-full overflow-hidden bg-[linear-gradient(160deg,var(--sage-100),var(--sage-200))]">
          <div className="absolute -left-16 top-10 h-64 w-64 rounded-full bg-[var(--sage-400)]/30 blur-3xl pointer-events-none" />
          <div className="absolute right-10 -top-10 h-40 w-40 rounded-full bg-white/60 blur-2xl pointer-events-none" />
          {/* Founder Image (Aligned flush bottom, offset slightly from right for spacing, height scaled to prevent top cutoff) */}
          <img
            src={amarRajan}
            alt="Amar Rajan"
            className="absolute right-[4%] md:right-[8%] bottom-0 h-[85%] md:h-[92%] w-auto object-contain object-bottom z-10"
            style={{ display: "block" }}
          />
        </div>
      </section>

      {/* Core Values Section */}
      <section style={{ background: "var(--sage-100)", padding: "80px 24px" }}>
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
                title: "Consent & Privacy",
                desc: "Families see a structured view of engagement and wellbeing-related signals — with appropriate consent, and without unnecessarily exposing private conversation content.",
                icon: "🔒",
                color: "var(--sage-100)",
              },
              {
                title: "Dignity & Autonomy",
                desc: "Older adults choose their language, calling time and conversation interests. Nalora is designed around their preferences, not around surveillance.",
                icon: "🌿",
                color: "var(--sage-200)",
              },
              {
                title: "Human Oversight",
                desc: "AI provides continuity; trained professionals remain responsible for the psychological framework, risk review, escalation, referrals and human follow-up.",
                icon: "🤝",
                color: "oklch(0.95 0.03 145)",
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
                <p style={{ color: "oklch(0.5 0.01 150)", fontSize: "0.95rem", lineHeight: 1.6 }}>
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
            Stay connected to <em className="italic text-rose">the Nalora journey</em>
          </h2>
          <p style={{ color: "oklch(0.5 0.01 150)", marginBottom: "32px", lineHeight: 1.7 }}>
            If you are an older adult, a family member, caregiver, senior-care organisation or
            potential partner, we would like to hear from you.
          </p>
          <Link
            to="/create-account"
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
              boxShadow: "0 6px 20px oklch(0.55 0.08 158 / 0.3)",
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
