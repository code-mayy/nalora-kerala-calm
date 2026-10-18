import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { SiteFooter } from "@/components/SiteFooter";
import {
  Phone,
  MessagesSquare,
  Brain,
  Users,
  ShieldCheck,
  Check,
  X,
  HeartHandshake,
  Bot,
  UserCheck,
  Settings2,
  Repeat,
  Lightbulb,
  Sprout,
  Quote,
  Globe,
} from "lucide-react";

import motherBaby from "@/assets/mother-baby.png";
import morningBg from "@/assets/image copy.png";
import afternoonBg from "@/assets/image copy 3.png";
import eveningBg from "@/assets/hero.png";
import nightBg from "@/assets/image copy 2.png";
import cloud1 from "@/assets/IMG_20260626_215755.png";
import cloud2 from "@/assets/IMG_20260626_215815.png";
import cloud3 from "@/assets/IMG_20260626_215818.png";
import cloud4 from "@/assets/IMG_20260626_215821.png";
import cloud5 from "@/assets/IMG_20260626_215824.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nalora — The Relationship Layer for Ageing" },
      {
        name: "description",
        content:
          "Nalora is a human-in-the-loop emotional care and wellbeing platform for older adults, using AI to create regular, personalised voice conversations.",
      },
      { property: "og:title", content: "Nalora — The Relationship Layer for Ageing" },
      {
        property: "og:description",
        content: "Meaningful conversations. Continuous connection. AI for connection. Humans for care.",
      },
    ],
  }),
  component: Index,
});

/* ---------- Reveal on scroll ---------- */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("reveal-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ---------- Nav (transparent over twilight, solidifies on scroll) ---------- */
function Nav() {
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    // Switch to the solid forest pill once the content sheet covers the hero sky
    const on = () => setScrolled(window.scrollY > window.innerHeight * 0.85);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const roleSpecificPages = user
    ? user.role === "doctor"
      ? [
          { to: "/doctor/dashboard", label: "Dashboard" },
          { to: "/doctor/meetings", label: "Meetings" },
          { to: "/doctor/google-calendar", label: "Google Calendar" },
          { to: "/doctor/diary-all", label: "Patients Diary" },
        ]
      : [
          { to: "/doctors", label: "Our Doctors" },
        ]
    : [];

  const pages = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About Us" },
    { to: "/services", label: "How it Works" },
    { to: "/contact", label: "Contact" },
    ...roleSpecificPages,
  ];

  const initials = user?.name
    ? user.name
        .replace("Dr. ", "")
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "N";

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: "12px 16px",
        pointerEvents: "none",
      }}
    >
      {/* Liquid glass floating pill */}
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 8px 8px 18px",
          borderRadius: "999px",
          background: scrolled ? "rgba(30, 58, 51, 0.86)" : "rgba(18, 20, 28, 0.18)",
          backdropFilter: "blur(48px) saturate(180%)",
          WebkitBackdropFilter: "blur(48px) saturate(180%)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.07), 0 8px 32px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3)",
          pointerEvents: "auto",
          transition: "all 0.4s ease",
        }}
      >
        <div className="reveal reveal-down" style={{ transitionDelay: "50ms", display: "flex", alignItems: "center", gap: "12px" }}>
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
            <span
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.18)",
                display: "grid",
                placeItems: "center",
                color: "white",
                fontFamily: "var(--font-display)",
                fontSize: "0.95rem",
              }}
            >
              n
            </span>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.2rem",
                color: "rgba(255,255,255,0.95)",
                letterSpacing: "-0.02em",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              nalora
              {user?.role === "doctor" && (
                <span
                  style={{
                    fontSize: "0.6rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.6)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    padding: "1px 5px",
                    borderRadius: "4px",
                  }}
                >
                  Doctor
                </span>
              )}
            </span>
          </Link>
          {/* Vertical separator */}
          <span style={{ width: "1px", height: "18px", background: "rgba(255,255,255,0.15)", display: "block", marginLeft: "4px" }} />
        </div>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-1">
          {pages.map(({ to, label }, idx) => (
            <span
              key={to}
              className="reveal reveal-down"
              style={{ transitionDelay: `${100 + idx * 50}ms` }}
            >
              <Link
                to={to}
                style={{
                  color: "rgba(255,255,255,0.75)",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  textDecoration: "none",
                  padding: "6px 14px",
                  borderRadius: "999px",
                  transition: "color 0.2s, background 0.2s",
                  whiteSpace: "nowrap",
                  display: "block",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = "rgba(255,255,255,1)";
                  el.style.background = "rgba(255,255,255,0.08)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = "rgba(255,255,255,0.75)";
                  el.style.background = "transparent";
                }}
              >
                {label}
              </Link>
            </span>
          ))}
        </nav>

        {/* Right side — auth */}
        <div
          className="hidden sm:flex items-center gap-3 reveal reveal-down"
          style={{ transitionDelay: `${100 + pages.length * 50}ms` }}
        >
          {user ? (
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setProfileOpen((o) => !o)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "7px 14px 7px 8px",
                  borderRadius: "99px",
                  border: "1px solid rgba(255,255,255,0.15)",
                  background: "rgba(255,255,255,0.1)",
                  cursor: "pointer",
                  color: "rgba(255,255,255,0.9)",
                  transition: "all 0.2s",
                  backdropFilter: "blur(12px)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.18)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)";
                }}
              >
                <span
                  style={{
                    width: "26px",
                    height: "26px",
                    borderRadius: "50%",
                    background: user.role === "doctor"
                      ? "linear-gradient(135deg, oklch(0.4 0.03 165), oklch(0.5 0.04 165))"
                      : "linear-gradient(135deg, var(--rose), var(--sunset))",
                    display: "grid",
                    placeItems: "center",
                    color: "white",
                    fontWeight: 700,
                    fontSize: "0.68rem",
                    letterSpacing: "0.04em",
                  }}
                >
                  {initials}
                </span>
                <span style={{ fontSize: "0.82rem", fontWeight: 600, maxWidth: "90px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {user.name.split(" ")[0]}
                </span>
                <svg
                  width="12" height="12" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2.5"
                  style={{ transition: "transform 0.2s", transform: profileOpen ? "rotate(180deg)" : "rotate(0)" }}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              {profileOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "calc(100% + 10px)",
                    right: 0,
                    background: "rgba(30,58,51,0.94)",
                    backdropFilter: "blur(28px) saturate(180%)",
                    WebkitBackdropFilter: "blur(28px) saturate(180%)",
                    borderRadius: "20px",
                    border: "1px solid rgba(255,255,255,0.18)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2), 0 16px 48px rgba(0,0,0,0.45)",
                    minWidth: "200px",
                    overflow: "hidden",
                    animation: "dropIn 0.18s ease",
                  }}
                  onMouseLeave={() => setProfileOpen(false)}
                >
                  <div style={{ padding: "16px 18px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                    <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "white" }}>{user.name}</div>
                    {user.specialization && (
                      <div style={{ fontSize: "0.72rem", color: "rgba(180,210,255,0.9)", fontWeight: 600, marginTop: "2px" }}>
                        {user.specialization}
                      </div>
                    )}
                    <div style={{ fontSize: "0.74rem", color: "rgba(255,255,255,0.5)", marginTop: "2px" }}>
                      {user.email || user.phone}
                    </div>
                  </div>

                  {roleSpecificPages.slice(0, 3).map(({ to, label }) => (
                    <Link
                      key={to}
                      to={to}
                      onClick={() => setProfileOpen(false)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "12px 18px",
                        textDecoration: "none",
                        fontSize: "0.84rem",
                        color: "rgba(255,255,255,0.8)",
                        fontWeight: 500,
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "transparent";
                      }}
                    >
                      {label}
                    </Link>
                  ))}

                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", padding: "6px" }}>
                    <button
                      onClick={() => { setProfileOpen(false); logout(); }}
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        borderRadius: "12px",
                        border: "none",
                        background: "none",
                        cursor: "pointer",
                        fontSize: "0.84rem",
                        fontWeight: 600,
                        color: "oklch(0.75 0.12 18)",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        transition: "background 0.15s",
                        fontFamily: "var(--font-sans)",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "rgba(255,80,80,0.12)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "none";
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                      </svg>
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/create-account"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "9px 22px",
                borderRadius: "999px",
                background: "rgba(240, 240, 245, 0.92)",
                border: "1px solid rgba(255,255,255,0.6)",
                color: "#111118",
                fontSize: "0.875rem",
                fontWeight: 600,
                textDecoration: "none",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.8), 0 2px 8px rgba(0,0,0,0.25)",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
                letterSpacing: "-0.01em",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(240,240,245,0.92)";
              }}
            >
              Explore Early Access
            </Link>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex items-center p-1.5 rounded-full"
          onClick={() => setMenuOpen((o) => !o)}
          style={{
            color: "white",
            cursor: "pointer",
            background: "rgba(255,255,255,0.12)",
            border: "1px solid rgba(255,255,255,0.25)",
          }}
          aria-label="Toggle menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            {menuOpen ? (
              <path d="M18 6 6 18M6 6l12 12" />
            ) : (
              <>
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu — liquid glass dropdown */}
      {menuOpen && (
        <div
          style={{
            maxWidth: "900px",
            margin: "8px auto 0",
            borderRadius: "24px",
            background: "rgba(30,58,51,0.94)",
            backdropFilter: "blur(28px) saturate(180%)",
            WebkitBackdropFilter: "blur(28px) saturate(180%)",
            border: "1px solid rgba(255,255,255,0.18)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2), 0 16px 48px rgba(0,0,0,0.4)",
            padding: "16px 24px 20px",
            pointerEvents: "auto",
          }}
        >
          {pages.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                padding: "12px 0",
                fontSize: "0.95rem",
                fontWeight: 500,
                color: "rgba(255,255,255,0.85)",
                textDecoration: "none",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {label}
            </Link>
          ))}

          <div style={{ marginTop: "14px" }}>
            {user ? (
              <button
                onClick={() => { setMenuOpen(false); logout(); }}
                style={{
                  width: "100%",
                  padding: "13px",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.15)",
                  background: "rgba(255,255,255,0.08)",
                  color: "rgba(255,120,120,0.95)",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "var(--font-sans)",
                }}
              >
                Sign Out
              </button>
            ) : (
              <Link
                to="/create-account"
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "block",
                  padding: "13px",
                  borderRadius: "12px",
                  background: "rgba(255,255,255,0.15)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  color: "white",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  textAlign: "center",
                  textDecoration: "none",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.25)",
                }}
              >
                Explore Early Access
              </Link>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-8px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </header>
  );

}

const STATIC_STARS = [
  { top: "12%", left: "8%", size: 2, delay: "0s" },
  { top: "25%", left: "15%", size: 1.5, delay: "1.2s" },
  { top: "8%", left: "28%", size: 3, delay: "0.5s" },
  { top: "18%", left: "33%", size: 1, delay: "2.1s" },
  { top: "30%", left: "42%", size: 2, delay: "1.7s" },
  { top: "10%", left: "55%", size: 1.5, delay: "0.8s" },
  { top: "22%", left: "62%", size: 2.5, delay: "2.5s" },
  { top: "7%", left: "70%", size: 1, delay: "0.3s" },
  { top: "28%", left: "80%", size: 2, delay: "1.9s" },
  { top: "15%", left: "88%", size: 3, delay: "1.4s" },
  { top: "35%", left: "93%", size: 1.5, delay: "2.8s" },
  { top: "16%", left: "18%", size: 2, delay: "0.9s" },
  { top: "5%", left: "40%", size: 1, delay: "2.3s" },
  { top: "20%", left: "50%", size: 2.5, delay: "1.5s" },
  { top: "14%", left: "76%", size: 1.5, delay: "0.7s" },
  { top: "32%", left: "25%", size: 2, delay: "3.1s" },
  { top: "27%", left: "72%", size: 1, delay: "1.1s" },
];

const CLOUDS_CONFIG = [
  {
    id: 1,
    img: cloud1,
    width: "320px",
    height: "85px",
    top: "10%",
    duration: "75s",
    delay: "0s",
    opacity: 0.7,
  },
  {
    id: 2,
    img: cloud2,
    width: "380px",
    height: "100px",
    top: "30%",
    duration: "95s",
    delay: "-25s",
    opacity: 0.7,
  },
  {
    id: 3,
    img: cloud3,
    width: "260px",
    height: "80px",
    top: "8%",
    duration: "115s",
    delay: "-55s",
    opacity: 0.65,
  },
  {
    id: 4,
    img: cloud4,
    width: "350px",
    height: "90px",
    top: "48%",
    duration: "60s",
    delay: "-15s",
    opacity: 0.65,
  },
  {
    id: 5,
    img: cloud5,
    width: "300px",
    height: "85px",
    top: "22%",
    duration: "100s",
    delay: "-40s",
    opacity: 0.7,
  },
];

function getSunStyle(hour: number) {
  if (hour < 5 || hour > 19) return { bg: "transparent", glow: "none" };
  if (hour >= 5 && hour < 8) {
    return {
      bg: "radial-gradient(circle, #ffe066 10%, #ff7e5f 70%, #feb47b 100%)",
      glow: "0 0 50px 15px rgba(255, 126, 95, 0.6), 0 0 100px 30px rgba(254, 180, 123, 0.4)",
    };
  }
  if (hour >= 8 && hour < 12) {
    return {
      bg: "radial-gradient(circle, #ffffff 20%, #fff176 60%, #ffb300 100%)",
      glow: "0 0 60px 20px rgba(255, 235, 59, 0.7), 0 0 120px 40px rgba(255, 193, 7, 0.4)",
    };
  }
  if (hour >= 12 && hour < 16) {
    return {
      bg: "radial-gradient(circle, #ffffff 40%, #fffde7 80%, #fff9c4 100%)",
      glow: "0 0 80px 30px rgba(255, 255, 255, 0.9), 0 0 160px 60px rgba(255, 253, 231, 0.5)",
    };
  }
  // Evening/Sunset: 16 to 19
  return {
    bg: "radial-gradient(circle, #ffd54f 20%, #f4511e 60%, #b71c1c 100%)",
    glow: "0 0 70px 25px rgba(244, 81, 30, 0.85), 0 0 140px 50px rgba(230, 81, 0, 0.6), 0 0 200px 80px rgba(255, 142, 90, 0.4)",
  };
}

function getSkyPhase(hour: number) {
  // Night: 20:00 to 05:00
  // Dawn: 05:00 to 07:00
  // Morning: 07:00 to 12:00
  // Afternoon: 12:00 to 16:00
  // Evening/Sunset: 16:00 to 20:00

  // 1. Calculate Sun Trajectory (active 5:00 to 19:00, i.e., 14 hours)
  let sunOpacity = 0;
  let sunX = "50%";
  let sunY = "-20%"; // Hidden below
  let sunScale = 1.0;

  if (hour >= 5 && hour <= 19) {
    const tSun = (hour - 5) / 14;
    sunX = `${5 + tSun * 90}%`;
    sunY = `${12 + Math.sin(tSun * Math.PI) * 65}%`;

    // Smooth opacity transitions at sunrise (5 to 6) and sunset (18 to 19)
    if (hour >= 5 && hour < 6) {
      sunOpacity = hour - 5;
    } else if (hour > 18 && hour <= 19) {
      sunOpacity = 19 - hour;
    } else {
      sunOpacity = 1.0;
    }

    // Scale peaks at noon
    sunScale = 1.0 + Math.sin(tSun * Math.PI) * 0.1;
  }

  // 2. Calculate Moon Trajectory (active 17:00 to 7:00, i.e., 14 hours)
  let moonOpacity = 0;
  let moonX = "50%";
  let moonY = "-20%"; // Hidden below

  // Check if we are in moon range
  const isMoonTime = hour >= 17 || hour <= 7;
  if (isMoonTime) {
    const hRel = hour >= 17 ? hour - 17 : hour + 7;
    const tMoon = hRel / 14;
    moonX = `${5 + tMoon * 90}%`;
    moonY = `${15 + Math.sin(tMoon * Math.PI) * 55}%`;

    // Smooth opacity transitions
    if (hour >= 17 && hour < 19) {
      // Fade in moon from 17:00 to 19:00
      moonOpacity = ((hour - 17) / 2) * 0.9;
    } else if (hour > 5 && hour <= 7) {
      // Fade out moon from 5:00 to 7:00
      moonOpacity = ((7 - hour) / 2) * 0.9;
    } else {
      moonOpacity = 0.9;
    }
  }

  // 3. Stars Opacity
  let starsOpacity = 0;
  if (hour >= 20 || hour <= 4) {
    starsOpacity = 1.0;
  } else if (hour > 18 && hour < 20) {
    // Fade in stars from 18:00 to 20:00
    starsOpacity = (hour - 18) / 2;
  } else if (hour > 4 && hour < 6) {
    // Fade out stars from 4:00 to 6:00
    starsOpacity = (6 - hour) / 2;
  }

  // 4. Calculate Background Cross-Fade Opacities (morningBg, afternoonBg, eveningBg, nightBg)
  let morningOpacity = 0;
  let afternoonOpacity = 0;
  let eveningOpacity = 0;
  let nightOpacity = 0;

  if (hour >= 5 && hour < 7) {
    // Dawn transition (Night -> Morning)
    const t = (hour - 5) / 2; // 0 to 1
    morningOpacity = t;
    nightOpacity = 1 - t;
  } else if (hour >= 7 && hour < 11) {
    // Morning Peak
    morningOpacity = 1.0;
  } else if (hour >= 11 && hour < 12) {
    // Morning -> Afternoon transition
    const t = (hour - 11) / 1; // 0 to 1
    afternoonOpacity = t;
    morningOpacity = 1 - t;
  } else if (hour >= 12 && hour < 16) {
    // Afternoon Peak
    afternoonOpacity = 1.0;
  } else if (hour >= 16 && hour < 17) {
    // Afternoon -> Evening transition
    const t = (hour - 16) / 1; // 0 to 1
    eveningOpacity = t;
    afternoonOpacity = 1 - t;
  } else if (hour >= 17 && hour < 19) {
    // Evening Peak
    eveningOpacity = 1.0;
  } else if (hour >= 19 && hour < 20) {
    // Evening -> Night transition
    const t = (hour - 19) / 1; // 0 to 1
    nightOpacity = t;
    eveningOpacity = 1 - t;
  } else {
    // Night Peak (20:00 to 5:00)
    nightOpacity = 1.0;
  }

  // 5. Return Phase specific configurations
  if (hour >= 5 && hour < 7) {
    return {
      label: "Dawn",
      overlay:
        "linear-gradient(180deg, rgba(232, 168, 124, 0.25) 0%, rgba(107, 74, 122, 0.25) 60%, rgba(43, 27, 74, 0.4) 100%)",
      filter: "brightness(0.9) saturate(1.1) sepia(0.05) contrast(0.98) hue-rotate(5deg)",
      glowColor: "rgba(232, 168, 124, 0.2)",
      subtitle: "Dawn · a gentle start to a connected day.",
      starsOpacity,
      morningOpacity,
      afternoonOpacity,
      eveningOpacity,
      nightOpacity,
      invertImage: hour < 6.5,
      sun: { opacity: sunOpacity, left: sunX, bottom: sunY, scale: sunScale },
      moon: { opacity: moonOpacity, left: moonX, bottom: moonY },
    };
  } else if (hour >= 7 && hour < 12) {
    return {
      label: "Morning",
      overlay:
        "linear-gradient(180deg, rgba(255, 243, 176, 0.1) 0%, rgba(168, 211, 237, 0.05) 60%, rgba(220, 238, 248, 0) 100%)",
      filter: "brightness(1.02) saturate(1.05) contrast(1.0) hue-rotate(0deg)",
      glowColor: "rgba(255, 243, 176, 0.25)",
      subtitle: "Morning · a familiar voice at the time you choose.",
      starsOpacity,
      morningOpacity,
      afternoonOpacity,
      eveningOpacity,
      nightOpacity,
      invertImage: false,
      sun: { opacity: sunOpacity, left: sunX, bottom: sunY, scale: sunScale },
      moon: { opacity: moonOpacity, left: moonX, bottom: moonY },
    };
  } else if (hour >= 12 && hour < 16) {
    return {
      label: "Afternoon",
      overlay:
        "linear-gradient(180deg, rgba(255, 252, 224, 0.08) 0%, rgba(143, 196, 229, 0.05) 60%, rgba(214, 235, 245, 0) 100%)",
      filter: "brightness(1.05) saturate(1.1) contrast(1.02) hue-rotate(-5deg)",
      glowColor: "rgba(255, 252, 224, 0.15)",
      subtitle: "Afternoon · stories, memories and meaningful moments.",
      starsOpacity,
      morningOpacity,
      afternoonOpacity,
      eveningOpacity,
      nightOpacity,
      invertImage: false,
      sun: { opacity: sunOpacity, left: sunX, bottom: sunY, scale: sunScale },
      moon: { opacity: moonOpacity, left: moonX, bottom: moonY },
    };
  } else if (hour >= 16 && hour < 20) {
    return {
      label: "Sunset/Evening",
      overlay:
        "linear-gradient(180deg, rgba(197, 107, 125, 0.3) 0%, rgba(232, 154, 108, 0.25) 50%, rgba(244, 194, 138, 0.1) 100%)",
      filter: "brightness(0.95) saturate(1.1) sepia(0.05) contrast(1.0) hue-rotate(-10deg)",
      glowColor: "rgba(255, 142, 90, 0.35)",
      subtitle: "Evening · reflecting on the small joys of the day.",
      starsOpacity,
      morningOpacity,
      afternoonOpacity,
      eveningOpacity,
      nightOpacity,
      invertImage: hour >= 18.5,
      sun: { opacity: sunOpacity, left: sunX, bottom: sunY, scale: sunScale },
      moon: { opacity: moonOpacity, left: moonX, bottom: moonY },
    };
  } else {
    return {
      label: "Night",
      overlay:
        "linear-gradient(180deg, rgba(10, 5, 30, 0.5) 0%, rgba(18, 8, 64, 0.3) 50%, rgba(42, 27, 92, 0.1) 100%)",
      filter: "brightness(0.85) saturate(0.9) contrast(1.05) hue-rotate(0deg)",
      glowColor: "rgba(255, 244, 214, 0.08)",
      subtitle: "Night · rest well. Your next conversation is already scheduled.",
      starsOpacity,
      morningOpacity,
      afternoonOpacity,
      eveningOpacity,
      nightOpacity,
      invertImage: true,
      sun: { opacity: sunOpacity, left: sunX, bottom: sunY, scale: sunScale },
      moon: { opacity: moonOpacity, left: moonX, bottom: moonY },
    };
  }
}

const getIndianTimeString = (decimalHour: number) => {
  const totalSeconds = Math.round(decimalHour * 3600);
  const hours = Math.floor(totalSeconds / 3600) % 24;
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const ampm = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;
  const displayMinutes = minutes.toString().padStart(2, "0");
  const displaySeconds = seconds.toString().padStart(2, "0");

  return `${displayHours}:${displayMinutes}:${displaySeconds} ${ampm}`;
};

function Hero() {
  const skyRef = useRef<HTMLDivElement>(null);
  const [simulatedHour, setSimulatedHour] = useState<number | null>(null);
  const [currentRealHour, setCurrentRealHour] = useState<number>(12);

  const getIndianDecimalHour = () => {
    const now = new Date();
    // IST is UTC + 5:30
    const istTime = new Date(now.getTime() + 5.5 * 60 * 60 * 1000);
    return istTime.getUTCHours() + istTime.getUTCMinutes() / 60 + istTime.getUTCSeconds() / 3600;
  };

  useEffect(() => {
    setCurrentRealHour(getIndianDecimalHour());
    const interval = setInterval(() => {
      setCurrentRealHour(getIndianDecimalHour());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const hour = simulatedHour !== null ? simulatedHour : currentRealHour;
  const phase = getSkyPhase(hour);
  const sunStyle = getSunStyle(hour);

  useEffect(() => {
    let ticked = false;
    const handleScroll = () => {
      if (!ticked) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY;

          // GPU accelerated background scroll
          if (skyRef.current) {
            skyRef.current.style.transform = `translate3d(0, ${scrolled * 0.3}px, 0)`;
          }

          ticked = false;
        });
        ticked = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        minHeight: "650px",
        overflow: "hidden",
        background: "#080318",
        transformStyle: "preserve-3d",
        zIndex: 1,
      }}
    >
      {/* CSS Animation keyframe inline styles to handle Twinkling stars and sliding clouds */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes twinkle {
          0%, 100% { opacity: 0.15; transform: scale(0.8); }
          50% { opacity: 1.0; transform: scale(1.2); }
        }
        .star-twinkle {
          animation: twinkle 3.5s infinite ease-in-out;
        }
        @keyframes slideCloud {
          0% { transform: translate3d(-350px, 0, 0); }
          100% { transform: translate3d(100vw, 0, 0); }
        }
        .cloud-slide {
          animation: slideCloud infinite linear;
        }
        @keyframes floatImage {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        .image-float {
          animation: floatImage 6s infinite ease-in-out;
        }
      `,
        }}
      />

      {/* Background Parallax Layer (using layered custom morning, afternoon, night images) */}
      <div
        ref={skyRef}
        style={{
          position: "absolute",
          top: "-150px",
          left: 0,
          right: 0,
          bottom: "-150px",
          zIndex: 1,
          willChange: "transform",
          filter: phase.filter,
          transition: "filter 1.5s ease-in-out",
        }}
      >
        {/* Morning Background Layer */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${morningBg})`,
            backgroundSize: "cover",
            backgroundPosition: "top center",
            backgroundRepeat: "no-repeat",
            opacity: phase.morningOpacity,
            transition: "opacity 1.5s ease-in-out",
            zIndex: 1,
          }}
        />

        {/* Afternoon Background Layer */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${afternoonBg})`,
            backgroundSize: "cover",
            backgroundPosition: "top center",
            backgroundRepeat: "no-repeat",
            opacity: phase.afternoonOpacity,
            transition: "opacity 1.5s ease-in-out",
            zIndex: 2,
          }}
        />

        {/* Evening Background Layer */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${eveningBg})`,
            backgroundSize: "cover",
            backgroundPosition: "top center",
            backgroundRepeat: "no-repeat",
            opacity: phase.eveningOpacity,
            transition: "opacity 1.5s ease-in-out",
            zIndex: 3,
          }}
        />

        {/* Night Background Layer */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${nightBg})`,
            backgroundSize: "cover",
            backgroundPosition: "top center",
            backgroundRepeat: "no-repeat",
            opacity: phase.nightOpacity,
            transition: "opacity 1.5s ease-in-out",
            zIndex: 4,
          }}
        />

        {/* Phase color-correction overlay (sits above all image layers) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: phase.overlay,
            pointerEvents: "none",
            transition: "background 1.5s ease-in-out",
            zIndex: 4,
          }}
        />

        {/* Twinkling Stars Overlay (Only visible in dusk/night/dawn phases) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: phase.starsOpacity,
            transition: "opacity 1.5s ease-in-out",
            pointerEvents: "none",
            zIndex: 10,
          }}
        >
          {STATIC_STARS.map((star, idx) => (
            <div
              key={idx}
              className="star-twinkle"
              style={{
                position: "absolute",
                top: star.top,
                left: star.left,
                width: `${star.size}px`,
                height: `${star.size}px`,
                borderRadius: "50%",
                background: "#ffffff",
                boxShadow: "0 0 6px 1.5px rgba(255, 255, 255, 0.8)",
                animationDelay: star.delay,
              }}
            />
          ))}
        </div>

        {/* Dynamic Sun Layer (Active during daylight hours) */}
        <div
          style={{
            position: "absolute",
            bottom: phase.sun.bottom,
            left: phase.sun.left,
            width: "54px",
            height: "54px",
            borderRadius: "50%",
            background: sunStyle.bg,
            boxShadow: sunStyle.glow,
            filter: "drop-shadow(0 0 15px rgba(255, 255, 255, 0.4))",
            opacity: phase.sun.opacity,
            transform: `scale(${phase.sun.scale})`,
            transition: "all 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
            pointerEvents: "none",
            zIndex: 11,
          }}
        />

        {/* Dynamic Moon Layer (Active during night/dawn hours) */}
        <div
          style={{
            position: "absolute",
            bottom: phase.moon.bottom,
            left: phase.moon.left,
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "transparent",
            boxShadow: "-10px 10px 0 0 #fffdeb",
            filter:
              "drop-shadow(0 0 20px rgba(255, 255, 255, 0.65)) drop-shadow(0 0 40px rgba(187, 222, 251, 0.35))",
            opacity: phase.moon.opacity,
            transform: "scale(1.0)",
            transition: "all 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
            pointerEvents: "none",
            zIndex: 11,
          }}
        />

        {/* Sliding 3D Clouds Layer */}
        {CLOUDS_CONFIG.map((cloud) => (
          <div
            key={cloud.id}
            className="cloud-slide"
            style={{
              position: "absolute",
              top: cloud.top,
              width: cloud.width,
              height: cloud.height,
              backgroundImage: `url(${cloud.img})`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              opacity: cloud.opacity,
              animationDuration: cloud.duration,
              animationDelay: cloud.delay,
              pointerEvents: "none",
              zIndex: 12, // In front of Sun/Moon and Stars, but behind horizon glow
            }}
          />
        ))}
      </div>



      {/* Hero Content (Split Column Layout) */}
      <div
        className="mx-auto flex max-w-6xl w-full h-full items-center justify-between px-6 pt-24 md:pt-20 flex-col md:flex-row gap-10 md:gap-10"
        style={{
          position: "relative",
          zIndex: 11,
          color: "white",
        }}
      >
        {/* Left Column: Text Content */}
        <div className="flex-1 text-center md:text-left flex flex-col items-center md:items-start justify-center max-w-[620px] md:max-w-[640px]">
          <h1
            className="reveal reveal-up"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.3rem, 5.2vw, 4.4rem)",
              fontWeight: 600,
              color: "#F1F8EE",
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              // drop-shadow (not text-shadow) so it also works on the gradient-clipped line
              filter:
                "drop-shadow(0 6px 22px rgba(8, 28, 22, 0.6)) drop-shadow(0 2px 4px rgba(8, 28, 22, 0.45))",
              margin: "0 0 22px 0",
              transitionDelay: "200ms",
            }}
          >
            Meaningful conversations.
            <br />
            <em
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                backgroundImage: "linear-gradient(100deg, #DDF2D6 0%, #A9DCA3 55%, #8DBE8A 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitBoxDecorationBreak: "clone",
                boxDecorationBreak: "clone",
                color: "transparent",
                paddingRight: "0.08em",
              }}
            >
              Continuous connection.
            </em>
          </h1>

          <p
            className="reveal reveal-up"
            style={{
              fontSize: "clamp(0.95rem, 2vw, 1.08rem)",
              color: "rgba(255, 255, 255, 0.88)",
              maxWidth: "500px",
              margin: "0 0 16px 0",
              lineHeight: 1.6,
              textShadow: "0 2px 8px rgba(0, 0, 0, 0.35)",
              transitionDelay: "350ms",
            }}
          >
            Regular, personalised voice conversations that help older adults stay connected with
            their memories, relationships and sense of meaning.
          </p>

          <p
            className="reveal reveal-up"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.05rem",
              fontWeight: 600,
              color: "#E9C2B2",
              margin: "0 0 28px 0",
              letterSpacing: "0.01em",
              textShadow: "0 2px 8px rgba(0, 0, 0, 0.35)",
              transitionDelay: "420ms",
            }}
          >
            AI for connection. Humans for care.
          </p>

          <div
            className="reveal reveal-up flex gap-4 justify-center md:justify-start flex-wrap w-full"
            style={{ transitionDelay: "500ms" }}
          >
            <a
              href="#what-is-nalora"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "14px 32px",
                borderRadius: "99px",
                background: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.25)",
                color: "white",
                fontSize: "0.95rem",
                fontWeight: 600,
                textDecoration: "none",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                transition: "all 0.3s ease",
                letterSpacing: "0.02em",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255, 255, 255, 0.25)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255, 255, 255, 0.15)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              Discover Nalora
            </a>
            <a
              href="#experience"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "14px 32px",
                borderRadius: "99px",
                background: "transparent",
                border: "1px solid rgba(255, 255, 255, 0.4)",
                color: "rgba(255, 255, 255, 0.9)",
                fontSize: "0.95rem",
                fontWeight: 600,
                textDecoration: "none",
                transition: "all 0.3s ease",
                letterSpacing: "0.02em",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255, 255, 255, 0.05)";
                (e.currentTarget as HTMLElement).style.borderColor = "white";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255, 255, 255, 0.4)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              How Nalora Works
            </a>
          </div>
        </div>

        {/* Right Column: Image Content */}
        <div className="flex-1 w-full max-w-[450px] md:max-w-none flex justify-center items-center h-[35vh] md:h-[65vh] md:translate-y-[-5px]">
          <div className="reveal reveal-scale h-full max-h-[30vh] md:max-h-[60vh] flex items-center justify-center" style={{ transitionDelay: "650ms" }}>
            <img
              src={motherBaby}
              alt="Nalora illustration"
              className="w-auto h-full object-contain image-float"
              style={{
                filter: phase.invertImage
                  ? "invert(1) drop-shadow(0 20px 40px rgba(0, 0, 0, 0.5))"
                  : "invert(0) drop-shadow(0 20px 40px rgba(0, 0, 0, 0.25))",
                transition: "filter 1.5s ease-in-out",
                maskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Time Simulation & IST Badge Control Panel */}
      <div
        className="reveal reveal-up"
        style={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
          zIndex: 40,
          background: "rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          borderRadius: "16px",
          padding: "12px 18px",
          color: "white",
          fontFamily: "var(--font-sans, sans-serif)",
          fontSize: "13px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.35)",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          transition: "all 0.3s ease, opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1), transform 1.1s cubic-bezier(0.16, 1, 0.3, 1)",
          maxWidth: "280px",
          transitionDelay: "800ms",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "10px",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                opacity: 0.6,
              }}
            >
              India Standard Time
            </div>
            <div style={{ fontWeight: 600, fontSize: "14px", marginTop: "2px" }}>
              {getIndianTimeString(currentRealHour)}
            </div>
          </div>
          <span
            style={{
              padding: "3px 8px",
              borderRadius: "12px",
              fontSize: "10px",
              fontWeight: 600,
              background:
                simulatedHour !== null ? "rgba(251, 146, 60, 0.2)" : "rgba(34, 197, 94, 0.2)",
              color: simulatedHour !== null ? "#fb923c" : "#4ade80",
              border:
                simulatedHour !== null
                  ? "1px solid rgba(251, 146, 60, 0.3)"
                  : "1px solid rgba(34, 197, 94, 0.3)",
            }}
          >
            {simulatedHour !== null ? "Simulated" : "Live"}
          </span>
        </div>

        {simulatedHour !== null && (
          <div style={{ marginTop: "4px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "11px",
                marginBottom: "4px",
              }}
            >
              <span>Simulating:</span>
              <span style={{ fontWeight: 600, color: "var(--accent)" }}>
                {getIndianTimeString(simulatedHour)} ({phase.label})
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="23.99"
              step="0.05"
              value={simulatedHour}
              onChange={(e) => setSimulatedHour(parseFloat(e.target.value))}
              style={{
                width: "100%",
                accentColor: "var(--accent)",
                cursor: "pointer",
                height: "4px",
                borderRadius: "2px",
                background: "rgba(255, 255, 255, 0.2)",
              }}
            />
          </div>
        )}

        <button
          onClick={() => setSimulatedHour(simulatedHour === null ? currentRealHour : null)}
          style={{
            background: "rgba(255, 255, 255, 0.15)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "8px",
            color: "white",
            padding: "5px 10px",
            fontSize: "11px",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s ease",
            textAlign: "center",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.25)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)")}
        >
          {simulatedHour !== null ? "Reset to Live IST Time" : "Open Time Simulator"}
        </button>
      </div>
    </section>
  );
}

/* ---------- Shared bits ---------- */
function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div
      className={`text-xs font-bold uppercase tracking-[0.2em] ${
        light ? "text-[var(--sage-200)]" : "text-[var(--clay)]"
      }`}
    >
      {children}
    </div>
  );
}

function PullQuote({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <blockquote
      className={`reveal reveal-up relative mx-auto max-w-3xl border-l-4 border-[var(--sage-400)] pl-6 text-left font-display text-xl leading-snug text-[var(--forest)] sm:text-2xl ${className}`}
    >
      {children}
    </blockquote>
  );
}

/* ---------- 2. The human problem ---------- */
function HumanProblem() {
  return (
    <section
      id="problem"
      className="relative z-10 rounded-t-[2.5rem] sm:rounded-t-[4rem] bg-[var(--sage-50)] px-6 pt-20 pb-20 sm:pt-28 shadow-[0_-24px_50px_-20px_rgba(0,0,0,0.25)]"
    >
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:gap-16">
        <div className="reveal reveal-left">
          <Eyebrow>The human problem</Eyebrow>
          <h2 className="mt-4 font-display text-4xl leading-tight text-[var(--forest-deep)] sm:text-5xl">
            Families care. <span className="text-[var(--forest)]">Distance creates discontinuity.</span>
          </h2>
        </div>
        <div className="reveal reveal-right space-y-5 text-[1.02rem] leading-relaxed text-foreground/75" style={{ transitionDelay: "150ms" }}>
          <p>
            Many older adults have families who care deeply about them. But children and loved ones
            may live in different cities, States or countries, have demanding schedules, or simply
            find it difficult to maintain regular conversations.
          </p>
          <p>
            Ageing can also bring changes in identity, role, autonomy, social networks, purpose and
            opportunities for meaningful conversation. Retirement may change daily routines, while
            familiar colleagues and social networks may become less present.
          </p>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-6xl">
        <PullQuote>
          The problem is not always absence of love. It is often absence of continuity.
        </PullQuote>
        <p className="reveal reveal-up mx-auto mt-6 max-w-3xl pl-7 text-foreground/70" style={{ transitionDelay: "120ms" }}>
          Nalora explores whether technology can create an additional layer of consistent
          connection without replacing family relationships or human care.
        </p>
      </div>
    </section>
  );
}

/* ---------- 3. What is Nalora ---------- */
const TOPICS = [
  "Life experiences",
  "Memories",
  "Achievements",
  "Meaning & purpose",
  "Relationships",
  "Interests",
  "Gratitude",
  "Daily experiences",
  "Cognitive & reflective activities",
  "Belonging",
  "Enjoyment of everyday life",
];

function WhatIsNalora() {
  return (
    <section id="what-is-nalora" className="relative z-10 grid grid-cols-1 md:grid-cols-2">
      <div className="relative flex flex-col justify-center bg-[var(--forest)] px-8 py-20 text-white sm:py-28 md:px-16 lg:px-24">
        <div className="pointer-events-none absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_30%,white_0%,transparent_60%)]" />
        <div className="relative z-10 max-w-xl">
          <Eyebrow light>What is Nalora?</Eyebrow>
          <h2 className="reveal reveal-left mt-4 font-display text-4xl leading-tight sm:text-5xl">
            A continuous emotional connection layer for <span className="text-[var(--sage-200)]">ageing.</span>
          </h2>
          <p className="reveal reveal-left mt-8 text-[1.05rem] leading-relaxed text-white/90" style={{ transitionDelay: "150ms" }}>
            Nalora is designed around a simple idea: consistent conversation can become a meaningful
            part of everyday wellbeing. Its first product is an AI voice agent capable of making
            scheduled telephone calls to registered older adults.
          </p>
          <p className="reveal reveal-left mt-8 border-l-4 border-[var(--sage-200)] pl-5 font-display text-lg leading-snug text-white" style={{ transitionDelay: "300ms" }}>
            Nalora does not try to replace human connection. It uses technology to help make
            meaningful connection more continuous.
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-center bg-[var(--sage-100)] px-8 py-20 sm:py-28 md:px-14 lg:px-20">
        <div className="reveal reveal-right max-w-lg">
          <div className="flex items-center gap-3 text-[var(--forest)]">
            <MessagesSquare size={22} />
            <span className="font-display text-lg">Conversations can explore</span>
          </div>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {TOPICS.map((t, i) => (
              <span
                key={t}
                className="reveal reveal-scale rounded-full border border-[var(--sage-400)]/50 bg-white px-4 py-2 text-sm font-medium text-[var(--forest-deep)] shadow-soft"
                style={{ transitionDelay: `${150 + i * 50}ms` }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 4. The Nalora experience ---------- */
const STEPS = [
  { n: "01", title: "Connect", desc: "The user registers and chooses preferences such as language, calling time and conversation interests.", icon: Settings2 },
  { n: "02", title: "Converse", desc: "Nalora makes a scheduled voice call and engages the older adult in a natural conversation.", icon: Phone },
  { n: "03", title: "Remember", desc: "Relevant memories, interests and preferences can provide context for future conversations.", icon: Repeat },
  { n: "04", title: "Engage", desc: "Conversations may include reflection, life stories, interests, cognitive activities and meaningful prompts.", icon: Lightbulb },
  { n: "05", title: "Support", desc: "Defined human-review pathways allow trained professionals to provide human attention when appropriate.", icon: HeartHandshake },
];

function Experience() {
  return (
    <section id="experience" className="relative z-10 bg-[var(--sage-50)] px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="reveal reveal-up mx-auto max-w-3xl text-center">
          <Eyebrow>The Nalora experience</Eyebrow>
          <h2 className="mt-4 font-display text-4xl leading-tight text-[var(--forest-deep)] sm:text-5xl">
            A conversation that becomes <span className="text-[var(--forest)]">more meaningful over time.</span>
          </h2>
        </div>

        <ol className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map(({ n, title, desc, icon: Icon }, idx) => (
            <li
              key={n}
              className="reveal reveal-up group relative flex flex-col rounded-[1.75rem] border border-border bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-lift"
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-sm font-bold tracking-wider text-[var(--clay)]">{n}</span>
                <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--sage-100)] text-[var(--forest)] transition group-hover:bg-[var(--forest)] group-hover:text-white">
                  <Icon size={18} />
                </span>
              </div>
              <h3 className="mt-5 font-display text-xl text-[var(--forest-deep)]">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/70">{desc}</p>
            </li>
          ))}
        </ol>

        <p className="reveal reveal-up mx-auto mt-14 max-w-2xl text-center font-display text-xl leading-snug text-[var(--forest)] sm:text-2xl">
          The intelligence is not only in answering questions. It is in maintaining continuity.
        </p>
      </div>
    </section>
  );
}

/* ---------- 5. What might Nalora talk about? ---------- */
const PROMPTS = [
  { tag: "Life stories", text: "What is one experience from your life that you are especially proud of?" },
  { tag: "Memory", text: "You mentioned your garden last week. Did you get a chance to spend time with your plants this week?" },
  { tag: "Reflection", text: "Looking back, what is one decision you made that shaped your life in an important way?" },
  { tag: "Meaning", text: "If you could teach one lesson from your life to a younger person, what would it be?" },
  { tag: "Everyday life", text: "What was one small thing that made you smile today?" },
  { tag: "Cognitive engagement", text: "Let's try a short activity together and see what you remember." },
];

function Conversations() {
  return (
    <section id="conversations" className="relative z-10 bg-[var(--sage-100)] px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="reveal reveal-up mx-auto max-w-3xl text-center">
          <Eyebrow>Conversation examples</Eyebrow>
          <h2 className="mt-4 font-display text-4xl leading-tight text-[var(--forest-deep)] sm:text-5xl">
            What might <span className="text-[var(--forest)]">Nalora talk about?</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROMPTS.map(({ tag, text }, idx) => {
            const dark = idx === 1 || idx === 5;
            return (
              <figure
                key={tag}
                className={`reveal reveal-up relative flex flex-col justify-between rounded-[1.75rem] p-8 shadow-soft transition hover:-translate-y-1 hover:shadow-lift ${
                  dark ? "bg-[var(--forest)] text-white" : "bg-white text-[var(--forest-deep)]"
                }`}
                style={{ transitionDelay: `${idx * 90}ms`, minHeight: "220px" }}
              >
                <Quote size={28} className={dark ? "text-[var(--sage-200)]/60" : "text-[var(--sage-400)]"} />
                <blockquote className="mt-4 font-display text-lg leading-snug">“{text}”</blockquote>
                <figcaption
                  className={`mt-6 inline-flex w-fit rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] ${
                    dark ? "bg-white/15 text-[var(--sage-200)]" : "bg-[var(--sage-100)] text-[var(--clay)]"
                  }`}
                >
                  {tag}
                </figcaption>
              </figure>
            );
          })}
        </div>

        <p className="reveal reveal-up mx-auto mt-12 max-w-3xl text-center text-sm italic text-foreground/60">
          These examples illustrate the intended character of the conversations: memory + continuity
          + reflection + dignity + personalisation.
        </p>
      </div>
    </section>
  );
}

/* ---------- 6. Built with psychology ---------- */
const FRAMEWORKS = [
  "Positive psychology",
  "Socioemotional selectivity",
  "Erikson's psychosocial development",
  "Life review",
  "Reminiscence",
  "Meaning-making",
  "Self-determination",
  "Narrative identity",
  "Social connectedness",
  "Psychological wellbeing",
  "Generativity",
  "Strength-based approaches",
];

function Psychology() {
  return (
    <section id="approach" className="relative z-10 bg-[var(--sage-50)] px-6 py-24 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-start gap-12 md:grid-cols-[1fr_1.1fr] md:gap-16">
        <div className="reveal reveal-left">
          <Eyebrow>Our approach</Eyebrow>
          <h2 className="mt-4 font-display text-4xl leading-tight text-[var(--forest-deep)] sm:text-5xl">
            Built with psychology. <span className="text-[var(--forest)]">Delivered through technology.</span>
          </h2>
          <p className="mt-6 leading-relaxed text-foreground/75">
            Nalora is psychologically informed rather than medically positioned. Its conversation
            design draws on perspectives from across psychology.
          </p>
          <p className="mt-6 rounded-2xl border border-[var(--sage-400)]/40 bg-[var(--sage-100)] p-5 text-sm leading-relaxed text-foreground/75">
            These frameworks inform conversation themes and engagement mechanisms. Their practical
            value within the Nalora experience is intended to be evaluated through structured
            validation.
          </p>
        </div>

        <div className="reveal reveal-right flex flex-wrap gap-3" style={{ transitionDelay: "150ms" }}>
          {FRAMEWORKS.map((f, i) => (
            <span
              key={f}
              className="reveal reveal-scale inline-flex items-center gap-2 rounded-2xl border border-border bg-white px-4 py-3 text-sm font-medium text-[var(--forest-deep)] shadow-soft"
              style={{ transitionDelay: `${150 + i * 40}ms` }}
            >
              <Brain size={15} className="text-[var(--sage-400)]" />
              {f}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 7. AI + Psychology + Human oversight ---------- */
const PILLARS = [
  {
    title: "AI",
    icon: Bot,
    desc: "Scheduled calls, conversational engagement, personalised prompts, memory and preference continuity, reflective questions, activities, summaries and routine check-ins.",
  },
  {
    title: "Psychology",
    icon: Brain,
    desc: "Conversation frameworks, engagement principles and intervention boundaries.",
  },
  {
    title: "Human oversight",
    icon: UserCheck,
    desc: "Risk review, escalation, quality monitoring, referrals and human follow-up.",
  },
];

function Oversight() {
  return (
    <section id="oversight" className="relative z-10 bg-[var(--forest-deep)] px-6 py-24 text-white sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="reveal reveal-up mx-auto max-w-3xl text-center">
          <Eyebrow light>AI + Psychology + Human oversight</Eyebrow>
          <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
            AI provides continuity. <span className="text-[var(--sage-200)]">Humans provide care.</span>
          </h2>
          <p className="mt-6 leading-relaxed text-white/75">
            Nalora is deliberately designed as a human-in-the-loop system. AI can provide scale,
            consistency and conversational continuity, while trained professionals remain
            responsible for the psychological framework, quality monitoring, risk review, escalation
            protocols, appropriate referrals and human follow-up when required.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {PILLARS.map(({ title, icon: Icon, desc }, idx) => (
            <div
              key={title}
              className="reveal reveal-up rounded-[1.75rem] border border-white/10 bg-white/5 p-8 backdrop-blur"
              style={{ transitionDelay: `${idx * 120}ms` }}
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--sage-200)] text-[var(--forest-deep)]">
                <Icon size={22} />
              </span>
              <h3 className="mt-6 font-display text-2xl">{title}</h3>
              <p className="mt-3 leading-relaxed text-white/75">{desc}</p>
            </div>
          ))}
        </div>

        <p className="reveal reveal-up mx-auto mt-14 max-w-2xl text-center font-display text-xl leading-snug text-[var(--sage-200)] sm:text-2xl">
          Technology should augment human care, never impersonate human care.
        </p>
      </div>
    </section>
  );
}

/* ---------- 8. Keeping families connected ---------- */
const SIGNALS = [
  "Conversation frequency and engagement consistency",
  "General emotional tone and themes",
  "Activities completed and positive experiences",
  "Social engagement indicators",
  "Changes from previous weeks",
  "Areas that may require attention",
  "Suggested follow-up where appropriate",
];

function Families() {
  return (
    <section id="families" className="relative z-10 bg-[var(--sage-50)] px-6 py-24 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-16">
        <div className="reveal reveal-left">
          <Eyebrow>Keeping families connected</Eyebrow>
          <h2 className="mt-4 font-display text-4xl leading-tight text-[var(--forest-deep)] sm:text-5xl">
            A window into wellbeing — <span className="text-[var(--forest)]">not a window into private conversations.</span>
          </h2>
          <p className="mt-6 leading-relaxed text-foreground/75">
            Nalora is designed to include a digital dashboard for authorised family members,
            relatives or primary caregivers. With appropriate consent and privacy safeguards, the
            dashboard can provide a structured view of engagement and wellbeing-related signals
            without unnecessarily exposing private conversation content.
          </p>
          <p className="mt-6 italic text-[var(--clay)]">
            The intention is to help families stay connected, not to turn care into surveillance.
          </p>
        </div>

        <div className="reveal reveal-right rounded-[2rem] border border-border bg-white p-7 shadow-lift sm:p-9" style={{ transitionDelay: "150ms" }}>
          <div className="flex items-center gap-3 border-b border-border pb-5">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-[var(--sage-100)] text-[var(--forest)]">
              <Users size={20} />
            </span>
            <div>
              <div className="font-display text-lg text-[var(--forest-deep)]">Family dashboard</div>
              <div className="text-xs text-foreground/55">With consent · privacy safeguarded</div>
            </div>
            <ShieldCheck size={20} className="ml-auto text-[var(--sage-400)]" />
          </div>
          <ul className="mt-5 space-y-3.5">
            {SIGNALS.map((s) => (
              <li key={s} className="flex items-start gap-3 text-[0.95rem] text-foreground/80">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--sage-200)] text-[var(--forest-deep)]">
                  <Check size={12} strokeWidth={3} />
                </span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------- 9. What Nalora is — and is not ---------- */
const IS = [
  "A voice-based AI conversation system for regular interaction",
  "Psychologically informed",
  "Designed for longitudinal personalisation",
  "Human-in-the-loop",
  "Focused on connection, reflection and engagement",
  "Designed around consent, privacy, dignity and autonomy",
];
const IS_NOT = [
  "An AI therapist",
  "A diagnostic system",
  "A medical treatment platform",
  "A replacement for psychologists or doctors",
  "A replacement for caregivers",
  "A replacement for family relationships",
];

function IsAndIsNot() {
  return (
    <section id="is-and-is-not" className="relative z-10 bg-[var(--sage-100)] px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="reveal reveal-up text-center">
          <Eyebrow>Clarity matters</Eyebrow>
          <h2 className="mt-4 font-display text-4xl leading-tight text-[var(--forest-deep)] sm:text-5xl">
            What Nalora is — <span className="text-[var(--forest)]">and is not</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <div className="reveal reveal-left rounded-[2rem] bg-[var(--forest)] p-8 text-white shadow-lift sm:p-10">
            <h3 className="font-display text-2xl">Nalora is</h3>
            <ul className="mt-6 space-y-4">
              {IS.map((s) => (
                <li key={s} className="flex items-start gap-3 leading-snug">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[var(--sage-200)] text-[var(--forest-deep)]">
                    <Check size={14} strokeWidth={3} />
                  </span>
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal reveal-right rounded-[2rem] border border-border bg-white p-8 shadow-soft sm:p-10" style={{ transitionDelay: "120ms" }}>
            <h3 className="font-display text-2xl text-[var(--clay)]">Nalora is not</h3>
            <ul className="mt-6 space-y-4">
              {IS_NOT.map((s) => (
                <li key={s} className="flex items-start gap-3 leading-snug text-foreground/80">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[var(--clay)]/15 text-[var(--clay)]">
                    <X size={14} strokeWidth={3} />
                  </span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 10 + 11. Pilot and next experiment ---------- */
const VALIDATION = [
  "Engagement and call completion",
  "Retention and frequency preference",
  "Satisfaction and conversation quality",
  "Safety and reliability",
  "Human escalation mechanisms",
  "Family satisfaction",
  "Unit economics",
];

function Validation() {
  return (
    <section id="pilot" className="relative z-10 bg-[var(--sage-50)] px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="reveal reveal-up mx-auto max-w-3xl text-center">
          <Eyebrow>Evidence, carefully</Eyebrow>
          <h2 className="mt-4 font-display text-4xl leading-tight text-[var(--forest-deep)] sm:text-5xl">
            We started with people, <span className="text-[var(--forest)]">not technology.</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {/* Completed human-led pilot */}
          <article className="reveal reveal-left flex flex-col rounded-[2rem] border border-border bg-white p-8 shadow-soft sm:p-10">
            <span className="w-fit rounded-full bg-[var(--sage-100)] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--forest)]">
              Completed · Early human-led pilot
            </span>
            <div className="mt-6 flex items-baseline gap-3">
              <span className="font-display text-6xl text-[var(--forest)]">10</span>
              <span className="text-foreground/65">older adults</span>
            </div>
            <p className="mt-5 leading-relaxed text-foreground/75">
              Nalora began with a small human-led pilot. Psychology postgraduate students were
              trained before conducting scheduled telephone conversations focused on wellbeing,
              reflection and engagement.
            </p>
            <p className="mt-4 leading-relaxed text-foreground/75">
              Participants were receptive and engaged naturally with the conversations. Some began
              expecting and anticipating the calls, providing an encouraging early signal that older
              adults may be willing to engage with recurring, structured conversations.
            </p>
            <p className="mt-auto pt-6 font-display text-[var(--forest)]">
              This is early behavioural validation — not evidence of clinical efficacy.
            </p>
          </article>

          {/* Planned AI voice pilot */}
          <article className="reveal reveal-right flex flex-col rounded-[2rem] bg-[var(--forest)] p-8 text-white shadow-lift sm:p-10" style={{ transitionDelay: "120ms" }}>
            <span className="w-fit rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--sage-200)]">
              Next · AI voice pilot
            </span>
            <h3 className="mt-6 font-display text-2xl leading-snug">
              From human-led conversations to an AI voice pilot.
            </h3>
            <div className="mt-6 grid grid-cols-3 gap-3 text-center">
              {[
                ["~200", "older adults"],
                ["1×–7×", "calls a week"],
                ["5–20", "minutes a call"],
              ].map(([v, l]) => (
                <div key={l} className="rounded-2xl bg-white/10 px-2 py-4">
                  <div className="font-display text-2xl text-[var(--sage-200)]">{v}</div>
                  <div className="mt-1 text-[11px] uppercase tracking-wide text-white/65">{l}</div>
                </div>
              ))}
            </div>
            <p className="mt-6 leading-relaxed text-white/80">
              The next planned validation phase is designed to scale the behavioural test to
              approximately 200 older adults using an AI voice agent. Calls may be offered once,
              twice, three times a week or daily, depending on user preference and product design.
              Conversations may typically last around 5–20 minutes.
            </p>
          </article>
        </div>

        <div className="reveal reveal-up mt-10 rounded-[2rem] border border-border bg-[var(--sage-100)] p-8 sm:p-10">
          <h3 className="font-display text-xl text-[var(--forest-deep)]">The validation will examine</h3>
          <div className="mt-5 flex flex-wrap gap-2.5">
            {VALIDATION.map((v) => (
              <span key={v} className="rounded-full border border-[var(--sage-400)]/50 bg-white px-4 py-2 text-sm text-[var(--forest-deep)]">
                {v}
              </span>
            ))}
          </div>
          <p className="mt-6 font-semibold text-[var(--clay)]">
            We are building carefully, testing with people and learning before scaling.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- 12. Why it matters ---------- */
const WHY = [
  {
    title: "For older adults",
    icon: Sprout,
    desc: "Regular conversation, reflection, feeling heard, meaningful engagement, memory sharing, cognitive engagement and continuity.",
  },
  {
    title: "For families",
    icon: Users,
    desc: "An additional layer of connection despite geographical distance, with appropriate visibility where consent permits.",
  },
  {
    title: "For society",
    icon: Globe,
    desc: "A human-centred application of AI that explores ageing with connection, meaning and dignity.",
  },
];

function WhyItMatters() {
  return (
    <section id="why" className="relative z-10 bg-[var(--sage-100)] px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="reveal reveal-up text-center">
          <Eyebrow>Why it matters</Eyebrow>
          <h2 className="mt-4 font-display text-4xl leading-tight text-[var(--forest-deep)] sm:text-5xl">
            Connection, meaning <span className="text-[var(--forest)]">and dignity.</span>
          </h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {WHY.map(({ title, icon: Icon, desc }, idx) => (
            <div
              key={title}
              className="reveal reveal-up rounded-[1.75rem] border border-border bg-white p-8 shadow-soft transition hover:-translate-y-1 hover:shadow-lift"
              style={{ transitionDelay: `${idx * 120}ms` }}
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--sage-100)] text-[var(--forest)]">
                <Icon size={22} />
              </span>
              <h3 className="mt-6 font-display text-2xl text-[var(--forest-deep)]">{title}</h3>
              <p className="mt-3 leading-relaxed text-foreground/70">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 13 + 14. Vision and call to action ---------- */
function VisionAndCta() {
  return (
    <section id="vision" className="relative z-10 bg-[var(--sage-50)] px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="reveal reveal-up text-center">
          <Eyebrow>Our vision</Eyebrow>
          <p className="mx-auto mt-5 max-w-3xl font-display text-3xl leading-snug text-[var(--forest-deep)] sm:text-4xl">
            A future where ageing does not mean becoming socially invisible.
          </p>
          <p className="mt-5 font-display text-lg text-[var(--clay)]">
            Helping people age with connection, meaning and dignity.
          </p>
        </div>

        <div
          className="reveal reveal-scale relative mt-20 overflow-hidden rounded-[2.5rem] p-10 text-center shadow-lift sm:p-16"
          style={{ background: "var(--gradient-sunset)" }}
        >
          <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[var(--sage-400)]/25 blur-3xl" />
          <div className="pointer-events-none absolute -right-20 -bottom-32 h-96 w-96 rounded-full bg-white/15 blur-3xl" />
          <div className="relative">
            <h2 className="font-display text-4xl leading-tight text-white sm:text-5xl">
              Stay connected to the <em className="italic text-[var(--sage-200)]">Nalora journey.</em>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/85">
              We are building Nalora carefully — with psychology, technology and human oversight at
              the centre. If you are an older adult, a family member, caregiver, senior-care
              organisation or potential partner, we would like to hear from you.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/contact"
                className="rounded-full bg-white px-7 py-4 font-medium text-[var(--forest-deep)] shadow-soft transition hover:-translate-y-0.5"
              >
                Talk to Us
              </Link>
              <Link
                to="/create-account"
                className="rounded-full border border-white/40 px-7 py-4 font-medium text-white transition hover:bg-white/10"
              >
                Explore Early Access
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Index() {
  useReveal();
  return (
    <main>
      <Nav />
      <Hero />
      <div style={{ height: "100vh", minHeight: "650px", pointerEvents: "none" }} />
      <HumanProblem />
      <WhatIsNalora />
      <Experience />
      <Conversations />
      <Psychology />
      <Oversight />
      <Families />
      <IsAndIsNot />
      <Validation />
      <WhyItMatters />
      <VisionAndCta />
      <SiteFooter animated />
    </main>
  );
}
