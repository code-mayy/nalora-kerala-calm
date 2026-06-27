import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { InnerNav } from "@/components/InnerNav";
import motherBaby from "@/assets/mother-baby.png";
import amarRajan from "@/assets/amar-rajan.png";
import introImg from "@/assets/image.png";

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
  const [isReadMore, setIsReadMore] = useState(false);
  const [isStoryReadMore, setIsStoryReadMore] = useState(false);
  return (
    <div style={{ minHeight: "100vh", background: "var(--ivory)", fontFamily: "var(--font-sans)" }}>
      <InnerNav />

      {/* Hero Section */}
      <section
        style={{
          background: "linear-gradient(135deg, #1E275B, #111737)", // base Hex #1E275B
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
            Caring for the heart that
            <br />
            just – <span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, color: "white" }}>holds the cradle</span>
          </h1>
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
              Why <span className="text-rose">Nalora</span> was born
            </h2>
            
            <p style={{ color: "oklch(0.45 0.01 60)", marginBottom: "20px", lineHeight: 1.8 }} className="text-[15px] sm:text-base font-sans font-normal">
              In Kerala, postpartum recovery was never a solitary journey. It was defined by the <strong className="font-semibold text-charcoal">Prasava Raksha</strong>—a sacred forty-day period of personalized herbal wellness, nourishing traditional diets, comforting massages, and a protective circle of wisdom that enveloped a new mother. But as families transitioned into modern nuclear homes and fast-paced digital workspaces, that essential circle began to fade, leaving mothers to navigate the complex emotional landscape of early motherhood in isolation.
            </p>

            {isStoryReadMore && (
              <p style={{ color: "oklch(0.45 0.01 60)", marginBottom: "20px", lineHeight: 1.8 }} className="text-[15px] sm:text-base font-sans font-normal transition-all duration-300">
                Nalora was born to bridge this gap, rebuilding that maternal cradle for the modern era. We combine culturally rooted, vernacular counseling with modern perinatal psychology and private family circles. Our mission is to ensure that no mother feels alone in the dark, translating ancient support systems into a gentle digital sanctuary that is always awake, listening, and holding her close.
              </p>
            )}

            <button
              onClick={() => setIsStoryReadMore(!isStoryReadMore)}
              style={{
                background: "#121212", // dark pill button matching user screenshot
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
              className="hover:bg-neutral-800 hover:-translate-y-0.5 active:scale-95 transition"
            >
              {isStoryReadMore ? "Read Less" : "Read More"}
            </button>
          </div>

          {/* Right Column - Illustration Image */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <img
              src={motherBaby}
              alt="Mother cradling baby illustration"
              style={{
                width: "100%",
                maxWidth: "450px",
                height: "auto",
                objectFit: "contain",
              }}
            />
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
            background: "var(--rose)", // that red color from the hero section
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
          {/* Background pattern overlay on the left pane */}
          <img
            src={introImg}
            alt="Left pane background pattern"
            className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none scale-x-[-1]"
            style={{ mixBlendMode: "overlay" }}
          />
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

        {/* Right Pane - Base background mirrored to the left, founder image aligned bottom-right */}
        <div className="relative min-h-[380px] md:min-h-full w-full bg-white overflow-hidden">
          {/* Base Image (Mirrored horizontally to the left) */}
          <img
            src={introImg}
            alt="Motherhood background pattern left"
            className="absolute inset-0 w-full h-full object-cover scale-x-[-1]"
          />
          {/* Base Image (Normal on the right, blended) */}
          <img
            src={introImg}
            alt="Motherhood background pattern right"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ mixBlendMode: "multiply" }}
          />
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
