import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { useAuth } from "@/context/AuthContext";
import { Sun, CloudSun, Sunset, Moon, Sparkles } from "lucide-react";

import blobRose from "@/assets/blob-rose.png";
import motherBaby from "@/assets/mother-baby.png";
import introImg from "@/assets/image.png";
import introOverlayImg from "@/assets/image copy 4.png";
import therapist1 from "@/assets/therapist-1.jpg";
import therapist2 from "@/assets/therapist-2.jpg";
import therapist3 from "@/assets/therapist-3.jpg";
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
      { title: "Nalora — Emotional Support for Motherhood" },
      {
        name: "description",
        content:
          "Kerala-rooted, AI-supported postpartum care. A calm digital ecosystem for mothers and the family around them.",
      },
      { property: "og:title", content: "Nalora — Emotional Support for Motherhood" },
      { property: "og:description", content: "A calm digital ecosystem for postpartum care." },
    ],
  }),
  component: Index,
});

/* ---------- Tilt card ---------- */
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 9}deg) rotateX(${-y * 9}deg) translateY(-4px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "perspective(900px) rotateY(0) rotateX(0)";
  };
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={`tilt-card ${className}`}>
      {children}
    </div>
  );
}

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
    const on = () => setScrolled(window.scrollY > 40);
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
          { to: "/book-session", label: "Book a Session" },
          { to: "/bookings", label: "Your Bookings" },
          { to: "/feedback", label: "Feedback" },
        ]
    : [];

  const pages = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About Us" },
    { to: "/services", label: "Services" },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[var(--ivory-deep)]/95 backdrop-blur-md border-b border-border/60"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10">
        <Link to="/" className="flex items-center gap-2">
          <span
            className={`grid h-9 w-9 place-items-center rounded-full font-display text-lg transition ${
              scrolled
                ? "bg-[var(--gradient-sunset)] text-white"
                : "border-2 border-white/80 text-white"
            }`}
          >
            n
          </span>
          <span
            className={`font-display text-2xl tracking-tight transition flex items-center gap-1.5 ${
              scrolled ? "text-foreground" : "text-white"
            }`}
          >
            nalora
            {user?.role === "doctor" && (
              <span
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  color: scrolled ? "oklch(0.5 0.04 200)" : "white",
                  border: scrolled ? "1px solid oklch(0.5 0.04 200 / 0.3)" : "1px solid rgba(255,255,255,0.4)",
                  padding: "1px 6px",
                  borderRadius: "6px",
                  marginLeft: "4px",
                }}
              >
                Doctor
              </span>
            )}
          </span>
        </Link>
        <nav
          className={`hidden md:flex items-center gap-7 text-[15px] font-medium transition ${
            scrolled ? "text-foreground/80" : "text-white/90"
          }`}
        >
          {pages.map(({ to, label }) => (
            <Link key={to} to={to} className="hover:opacity-70 transition">
              {label}
            </Link>
          ))}
        </nav>
        <div className="hidden sm:flex items-center gap-3">
          {user ? (
            /* ── Logged-in state ── */
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setProfileOpen((o) => !o)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "7px 12px 7px 7px",
                  borderRadius: "99px",
                  border: scrolled ? "1.5px solid oklch(0.88 0.02 55)" : "1.5px solid rgba(255,255,255,0.4)",
                  background: scrolled ? "white" : "rgba(255, 255, 255, 0.1)",
                  cursor: "pointer",
                  color: scrolled ? "var(--charcoal)" : "white",
                  backdropFilter: scrolled ? "none" : "blur(8px)",
                  transition: "border-color 0.2s, box-shadow 0.2s, background-color 0.2s",
                }}
              >
                {/* Avatar */}
                <span
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    background: user.role === "doctor"
                      ? "linear-gradient(135deg, oklch(0.4 0.03 240), oklch(0.5 0.04 200))"
                      : "linear-gradient(135deg, var(--rose), var(--sunset))",
                    display: "grid",
                    placeItems: "center",
                    color: "white",
                    fontWeight: 700,
                    fontSize: "0.72rem",
                    letterSpacing: "0.04em",
                  }}
                >
                  {initials}
                </span>
                <span style={{ fontSize: "0.82rem", fontWeight: 600, maxWidth: "100px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {user.name.split(" ")[0]}
                </span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  style={{
                    transition: "transform 0.2s",
                    transform: profileOpen ? "rotate(180deg)" : "rotate(0)",
                  }}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              {/* Dropdown */}
              {profileOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "calc(100% + 10px)",
                    right: 0,
                    background: "white",
                    borderRadius: "16px",
                    border: "1px solid oklch(0.9 0.02 55)",
                    boxShadow: "0 16px 48px oklch(0 0 0 / 0.12)",
                    minWidth: "200px",
                    overflow: "hidden",
                    animation: "dropIn 0.18s ease",
                  }}
                  onMouseLeave={() => setProfileOpen(false)}
                >
                  {/* User info */}
                  <div
                    style={{
                      padding: "16px 18px",
                      borderBottom: "1px solid oklch(0.93 0.01 60)",
                      background: "oklch(0.975 0.012 60)",
                      textAlign: "left",
                    }}
                  >
                    <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--charcoal)" }}>
                      {user.name}
                    </div>
                    {user.specialization && (
                      <div
                        style={{
                          fontSize: "0.72rem",
                          color: "oklch(0.5 0.04 200)",
                          fontWeight: 600,
                          marginTop: "2px",
                        }}
                      >
                        {user.specialization}
                      </div>
                    )}
                    <div
                      style={{ fontSize: "0.74rem", color: "oklch(0.6 0.01 60)", marginTop: "2px" }}
                    >
                      {user.email || user.phone}
                    </div>
                  </div>

                  {/* Nav links in dropdown for quick access */}
                  {roleSpecificPages.slice(0, 3).map(({ to, label }) => (
                    <Link
                      key={to}
                      to={to}
                      onClick={() => setProfileOpen(false)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "12px 18px",
                        textDecoration: "none",
                        fontSize: "0.84rem",
                        color: "oklch(0.45 0.01 60)",
                        fontWeight: 500,
                        transition: "background 0.15s",
                        textAlign: "left",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "oklch(0.97 0.015 60)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "transparent";
                      }}
                    >
                      {label}
                    </Link>
                  ))}

                  <div style={{ borderTop: "1px solid oklch(0.93 0.01 60)", padding: "6px" }}>
                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        logout();
                      }}
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        borderRadius: "10px",
                        border: "none",
                        background: "none",
                        cursor: "pointer",
                        fontSize: "0.84rem",
                        fontWeight: 600,
                        color: "oklch(0.5 0.1 18)",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        transition: "background 0.15s",
                        fontFamily: "var(--font-sans)",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "oklch(0.97 0.02 18)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "none";
                      }}
                    >
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
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
              to="/login"
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition hover:-translate-y-0.5 ${
                scrolled
                  ? "bg-[var(--gradient-sunset)] text-white shadow-soft"
                  : "bg-white/95 text-foreground hover:bg-white"
              }`}
            >
              Start Free Trial
            </Link>
          )}
        </div>
        <button
          className="md:hidden flex items-center p-2 rounded-lg"
          onClick={() => setMenuOpen((o) => !o)}
          style={{
            color: scrolled ? "var(--charcoal)" : "white",
            cursor: "pointer",
            background: "none",
            border: "none",
          }}
          aria-label="Toggle menu"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
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

      {menuOpen && (
        <div className="md:hidden bg-[var(--ivory-deep)]/95 backdrop-blur-md border-b border-border/60 px-6 py-4 flex flex-col gap-4">
          {pages.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className="text-foreground/80 hover:text-rose font-medium py-1"
            >
              {label}
            </Link>
          ))}

          <div className="border-t border-border/40 pt-4 flex flex-col gap-3">
            {user ? (
              <>
                <div className="text-sm font-semibold text-foreground/80 py-1 flex items-center gap-2">
                  <span
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      background: user.role === "doctor"
                        ? "linear-gradient(135deg, oklch(0.4 0.03 240), oklch(0.5 0.04 200))"
                        : "linear-gradient(135deg, var(--rose), var(--sunset))",
                      display: "grid",
                      placeItems: "center",
                      color: "white",
                      fontWeight: 700,
                      fontSize: "0.68rem",
                    }}
                  >
                    {initials}
                  </span>
                  Logged in as {user.name}
                </div>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    logout();
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-rose/40 text-rose hover:bg-rose/5 px-5 py-2.5 text-sm font-medium"
                  style={{ cursor: "pointer" }}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--gradient-sunset)] text-white px-5 py-2.5 text-sm font-medium shadow-soft"
              >
                Start Free Trial
              </Link>
            )}
          </div>
        </div>
      )}
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
      subtitle: "Dawn · waking up with you as the day begins.",
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
      subtitle: "Morning · supporting your morning rhythms and care.",
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
      subtitle: "Afternoon · gentle guidance through the active hours.",
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
      subtitle: "Evening · wind down with warm postpartum care.",
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
      subtitle: "Night · awake for late-night nursing and support, 24×7.",
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

      {/* Horizon ambient glow (changes color based on time of day) */}
      <div
        style={{
          position: "absolute",
          bottom: "220px",
          left: 0,
          right: 0,
          height: "220px",
          background: `linear-gradient(to top, ${phase.glowColor} 0%, transparent 100%)`,
          pointerEvents: "none",
          zIndex: 2,
          transition: "background 1.5s ease-in-out",
        }}
      />

      {/* Dark overlay for text readability */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0, 0, 0, 0.22)",
          zIndex: 10,
          pointerEvents: "none",
        }}
      />

      {/* Hero Content (Split Column Layout) */}
      <div
        className="mx-auto flex max-w-6xl w-full h-full items-center justify-between px-6 pt-16 md:pt-0 flex-col md:flex-row gap-10 md:gap-12"
        style={{
          position: "relative",
          zIndex: 11,
          color: "white",
        }}
      >
        {/* Left Column: Text Content */}
        <div className="flex-1 text-center md:text-left flex flex-col items-center md:items-start justify-center max-w-[620px] md:max-w-[550px] transform md:translate-y-[-10px]">
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.3rem, 5.5vw, 3.8rem)",
              fontWeight: 500,
              color: "white",
              lineHeight: 1.15,
              textShadow: "0 4px 18px rgba(0, 0, 0, 0.45)",
              margin: "0 0 24px 0",
            }}
          >
            She gave everything.
            <br />
            <em
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                color: "var(--accent)",
              }}
            >
              Now it's her turn.
            </em>
          </h1>

          <p
            style={{
              fontSize: "clamp(0.95rem, 2.2vw, 1.15rem)",
              color: "rgba(255, 255, 255, 0.85)",
              maxWidth: "520px",
              margin: "0 0 36px 0",
              lineHeight: 1.65,
              textShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
            }}
          >
            <span style={{ color: "var(--accent)", fontWeight: 500 }}>{phase.subtitle} </span>
            Postpartum care, rooted in Kerala — gentle, vernacular, and always awake.
          </p>

          <div className="flex gap-4 justify-center md:justify-start flex-wrap w-full">
            <Link
              to="/login"
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
              Start Free Trial
            </Link>
            <Link
              to="/about"
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
              Learn More
            </Link>
          </div>
        </div>

        {/* Right Column: Image Content */}
        <div className="flex-1 w-full max-w-[450px] md:max-w-none flex justify-center items-center h-[35vh] md:h-[65vh] md:translate-y-[-5px]">
          <img
            src={motherBaby}
            alt="Mother and Baby"
            className="w-auto h-full max-h-[30vh] md:max-h-[60vh] object-contain image-float"
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

      {/* Time Simulation & IST Badge Control Panel */}
      <div
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
          transition: "all 0.3s ease",
          maxWidth: "280px",
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

/* ---------- Therapists showcase (Oppam-style pastel cards) ---------- */
const THERAPISTS = [
  {
    name: "Aisha Menon",
    role: "Consultant Psychologist",
    img: therapist1,
    bg: "#FFF1C2",
    tags: ["Postpartum Anxiety", "Mood Concerns", "Sleep & Identity"],
    hours: "250+",
    lang: "Malayalam, English",
    price: "₹1,000",
    next: "15 mins",
  },
  {
    name: "Lakshmi Pillai",
    role: "Clinical Psychologist",
    img: therapist2,
    bg: "#FCD7D1",
    tags: ["Birth Trauma", "Relationship Concerns", "Life Transitions"],
    hours: "500+",
    lang: "Malayalam, Tamil",
    price: "₹1,200",
    next: "20 mins",
  },
  {
    name: "Dr. Rohan Iyer",
    role: "Perinatal Psychiatrist",
    img: therapist3,
    bg: "#D6EFD9",
    tags: ["Hormonal Mood Shifts", "Medication Reviews", "PPD"],
    hours: "800+",
    lang: "English, Hindi",
    price: "₹1,500",
    next: "30 mins",
  },
  {
    name: "Dr. Meera Krishnan",
    role: "Perinatal Counselor",
    img: null,
    bg: "#C8D8F0",
    tags: ["Mood Concerns", "Birth Trauma", "Postpartum Anxiety"],
    hours: "180+",
    lang: "Malayalam, English, Tamil",
    price: "₹900",
    next: "1 hour",
  },
  {
    name: "Dr. Priya Nair",
    role: "Family Therapist",
    img: null,
    bg: "#E8D8F0",
    tags: ["Relationship Concerns", "Life Transitions", "Mood Concerns"],
    hours: "320+",
    lang: "Malayalam, Hindi",
    price: "₹1,100",
    next: "Tomorrow",
  },
  {
    name: "Dr. Sanjana Thomas",
    role: "Child & Perinatal Psychologist",
    img: null,
    bg: "#D8F0E8",
    tags: ["Sleep & Identity", "Postpartum Anxiety", "Birth Trauma"],
    hours: "290+",
    lang: "English, Malayalam",
    price: "₹1,300",
    next: "Tomorrow",
  },
];


/* ---------- What is Nalora (Introduction) ---------- */
function WhatIsNalora() {
  return (
    <section
      id="what-is-nalora"
      className="relative z-10 grid grid-cols-1 md:grid-cols-2 rounded-t-[2.5rem] sm:rounded-t-[4rem] overflow-hidden shadow-[0_-24px_50px_-20px_rgba(0,0,0,0.25)]"
    >
      {/* Left Pane - Solid Rose Theme Background */}
      <div className="bg-[var(--rose)] px-8 py-20 sm:py-28 md:px-16 lg:px-24 flex flex-col justify-center items-start text-white relative">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_30%,white_0%,transparent_60%)] pointer-events-none" />
        <div className="reveal max-w-xl relative z-10">
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl leading-tight text-white font-medium uppercase tracking-tight">
            What is <span className="text-[var(--coconut-soft)]">nalora</span>?
          </h2>
          <p className="mt-8 text-[17px] sm:text-lg md:text-xl text-white/90 leading-relaxed font-sans font-normal">
            Nalora is a compassionate, research-backed digital ecosystem built to support emotional
            well-being throughout pregnancy and early motherhood.
          </p>
          <p className="mt-6 text-[15px] sm:text-base text-white/75 leading-relaxed">
            By combining thoughtful, culturally rooted support with evidence-based psychological
            frameworks, we help you understand, track, and process your emotional experiences
            with absolute clarity.
          </p>
        </div>
      </div>

      {/* Right Pane - Base background mirrored to the left, overlay frame aligned bottom-right and sized up to 95% */}
      <div className="relative min-h-[380px] md:min-h-full w-full bg-white overflow-hidden">
        {/* Base Image (Mirrored horizontally to the left) */}
        <img
          src={introImg}
          alt="Motherhood background pattern"
          className="absolute inset-0 w-full h-full object-cover scale-x-[-1]"
        />
        {/* Frame / Overlay Image (Aligned bottom-right and increased size) */}
        <img
          src={introOverlayImg}
          alt="Visual frame overlay"
          className="absolute right-0 bottom-0 w-[95%] h-[95%] object-contain object-bottom-right pointer-events-none z-10"
        />
      </div>
    </section>
  );
}

function Therapists() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const els = document.querySelectorAll("#therapists .reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("reveal-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.05 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [searchQuery, showAll]);

  const filteredTherapists = THERAPISTS.filter((t) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;

    return (
      t.name.toLowerCase().includes(query) ||
      t.role.toLowerCase().includes(query) ||
      t.lang.toLowerCase().includes(query) ||
      t.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  });

  const displayedTherapists = showAll ? filteredTherapists : filteredTherapists.slice(0, 3);

  return (
    <section
      id="therapists"
      className="relative z-10 bg-background pt-16 pb-16 sm:pt-24 sm:pb-16 border-t border-border/40"
    >
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="reveal text-center font-display text-4xl sm:text-5xl">
          How can we <span className="text-rose">help you?</span>
        </h2>

        {/* Search Option */}
        <div className="reveal mx-auto mt-8 max-w-md relative">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name, specialty, language, or tags..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowAll(false);
              }}
              className="w-full rounded-2xl border border-border/70 bg-card px-5 py-3.5 pl-12 text-sm shadow-soft outline-none transition-all duration-300 focus:border-rose focus:ring-2 focus:ring-rose/20 placeholder:text-foreground/45"
            />
            <svg
              className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-foreground/40"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground transition-colors cursor-pointer"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        <div className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {displayedTherapists.map((t) => {
            return (
              <div
                key={t.name}
                className="reveal group overflow-hidden rounded-[1.75rem] bg-card shadow-soft transition hover:-translate-y-1 hover:shadow-lift"
              >
                <div
                  className="relative flex items-end gap-4 px-6 pt-6"
                  style={{ backgroundColor: t.bg }}
                >
                  <div className="flex-1 pb-5">
                    <h3 className="font-display text-xl leading-tight">{t.name}</h3>
                    <div className="mt-1 text-sm text-foreground/70">{t.role}</div>
                  </div>
                  {t.img ? (
                    <img
                      src={t.img}
                      alt={t.name}
                      width={800}
                      height={800}
                      loading="lazy"
                      className="h-32 w-28 rounded-t-2xl object-cover object-top"
                    />
                  ) : (
                    <div className="h-32 w-28 rounded-t-2xl bg-white/60 flex items-center justify-center font-display text-4xl text-rose font-bold">
                      {t.name.charAt(0)}
                    </div>
                  )}
                </div>

                <div className="space-y-4 p-6">
                  <div className="flex flex-wrap gap-1.5">
                    {t.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border/70 px-2.5 py-1 text-[11px] text-foreground/65"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-3 border-t border-border/60 pt-4 text-center">
                    <div>
                      <div className="font-display text-lg text-rose">{t.hours}</div>
                      <div className="text-[11px] uppercase tracking-wide text-foreground/50">
                        Therapy hrs
                      </div>
                    </div>
                    <div>
                      <div className="font-display text-[13px] leading-tight">{t.lang}</div>
                      <div className="text-[11px] uppercase tracking-wide text-foreground/50">
                        Languages
                      </div>
                    </div>
                    <div>
                      <div className="font-display text-lg text-coconut">{t.price}</div>
                      <div className="text-[11px] uppercase tracking-wide text-foreground/50">
                        Per session
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 rounded-2xl bg-[var(--ivory-deep)] px-4 py-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[11px] uppercase tracking-wide text-foreground/55">
                          Next available in
                        </div>
                        <div className="font-display text-lg">{t.next}</div>
                      </div>
                      <button className="rounded-full bg-foreground px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-background transition hover:bg-rose cursor-pointer">
                        Book Now
                      </button>
                    </div>
                    <Link
                      to="/doctors"
                      className="block text-center rounded-xl border border-foreground/15 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-foreground/70 transition hover:bg-foreground hover:text-background hover:border-foreground cursor-pointer"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* No Results State */}
        {filteredTherapists.length === 0 && (
          <div className="reveal mt-14 text-center py-12 px-6 rounded-2xl bg-card border border-border/50 shadow-soft">
            <div className="text-rose text-3xl font-display uppercase">No therapists found</div>
            <p className="mt-2 text-sm text-foreground/50">
              Try adjusting your search keywords.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
              }}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-rose px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-rose/90 cursor-pointer"
            >
              Reset Search
            </button>
          </div>
        )}

        {/* View More/Less Button */}
        {filteredTherapists.length > 3 && (
          <div className="reveal mt-12 flex justify-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 rounded-full border-2 border-rose bg-white px-7 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-rose transition-all duration-300 hover:bg-rose hover:text-white cursor-pointer shadow-soft hover:shadow-lift"
            >
              {showAll ? "View Less" : "View More"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}



/* ---------- Bento care features ---------- */
const FEATURES = [
  {
    title: "Late-night companion",
    desc: "An always-on listener trained in maternal mental health, in your tongue.",
    tag: "AI Care",
    bg: "var(--rose)",
  },
  {
    title: "Therapist matching",
    desc: "Hand-picked certified therapists, matched in under a day.",
    tag: "Human",
    bg: "oklch(0.52 0.05 150)", // sage green
  },
  {
    title: "Family circle",
    desc: "Invite your partner, parents and in-laws into the same care plan.",
    tag: "Together",
    bg: "var(--sunset)",
  },
  {
    title: "Recovery rhythms",
    desc: "Sleep, mood and feeding tracked with gentle, never judgmental, nudges.",
    tag: "Daily",
    bg: "oklch(0.48 0.07 240)", // calm blue
  },
  {
    title: "Vernacular library",
    desc: "Audio sessions in Malayalam, Tamil, Hindi, Kannada and more.",
    tag: "Listen",
    bg: "oklch(0.62 0.1 320)", // lavender
  },
  {
    title: "Private by design",
    desc: "End-to-end encrypted. Your story never leaves your circle.",
    tag: "Safe",
    bg: "oklch(0.3 0.02 60)", // deep charcoal
  },
];

function renderFeatureGraphic(index: number) {
  switch (index) {
    case 0:
      return (
        <div className="relative w-48 h-48">
          <div
            className="absolute top-4 left-4 w-36 h-36 rounded-full bg-transparent"
            style={{ boxShadow: "-22px 22px 0 0 oklch(0.75 0.1 45)" }}
          />
          <div className="absolute top-2 right-6 w-3 h-3 rounded-full bg-rose animate-pulse" />
          <div className="absolute top-12 right-2 w-1.5 h-1.5 rounded-full bg-sunset" />
          <div className="absolute bottom-6 left-12 w-2 h-2 rounded-full bg-rose animate-bounce" />
          <div className="absolute bottom-2 right-12 w-3.5 h-3.5 rounded-full bg-coconut opacity-70" />
        </div>
      );
    case 1:
      return (
        <div className="relative w-48 h-48 flex items-center justify-center">
          <div className="absolute w-28 h-28 rounded-full bg-rose/10 -translate-x-8" />
          <div className="absolute w-28 h-28 rounded-full bg-sunset/15 translate-x-8" />
          <div className="absolute w-12 h-12 rounded-full bg-[oklch(0.52_0.05_150)]/20 -translate-y-12 animate-pulse" />
          <div className="absolute w-20 h-0.5 bg-gradient-to-r from-rose to-sunset" />
        </div>
      );
    case 2:
      return (
        <div className="relative w-48 h-48 flex items-center justify-center">
          <div
            className="absolute w-36 h-36 rounded-full border-2 border-dashed border-rose/30"
            style={{ animation: "spin 25s linear infinite" }}
          />
          <div className="absolute w-28 h-28 rounded-full border-2 border-sunset/40" />
          <div className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-rose/20 to-sunset/20" />
          <div className="absolute w-8 h-8 rounded-full bg-rose" />
        </div>
      );
    case 3:
      return (
        <div className="relative w-56 h-36 flex items-center justify-around gap-1.5">
          {[40, 70, 100, 60, 80, 50, 90, 60, 40].map((h, idx) => (
            <div
              key={idx}
              className="w-2.5 rounded-full bg-gradient-to-t from-[oklch(0.48_0.07_240)] to-rose"
              style={{
                height: `${h}%`,
                opacity: 0.25 + (idx % 3) * 0.3,
                animation: "floatImage 4s infinite ease-in-out",
                animationDelay: `${idx * 0.15}s`,
              }}
            />
          ))}
        </div>
      );
    case 4:
      return (
        <div className="relative w-48 h-48 flex items-center justify-center">
          <div
            className="absolute w-36 h-36 rounded-full border border-[oklch(0.62_0.1_320)]/20"
            style={{ animation: "ping 4s cubic-bezier(0, 0, 0.2, 1) infinite" }}
          />
          <div className="absolute w-24 h-24 rounded-full border-2 border-[oklch(0.62_0.1_320)]/40" />
          <div className="absolute w-12 h-12 rounded-full bg-[oklch(0.62_0.1_320)] text-white grid place-items-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          </div>
        </div>
      );
    case 5:
      return (
        <div className="relative w-48 h-48 flex items-center justify-center">
          <div className="absolute w-32 h-32 rounded-3xl bg-[oklch(0.3_0.02_60)]/5 rotate-12" />
          <div className="absolute w-28 h-28 rounded-3xl bg-[oklch(0.3_0.02_60)]/10 -rotate-12" />
          <div className="w-16 h-20 bg-gradient-to-b from-rose to-sunset rounded-2xl relative shadow-soft flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border-4 border-white absolute -top-5" />
            <div className="w-2.5 h-2.5 rounded-full bg-white mt-1" />
            <div className="w-1 h-4 bg-white mt-3 absolute" />
          </div>
        </div>
      );
    default:
      return null;
  }
}

function Care() {
  return (
    <section id="care" className="relative z-10 bg-background pt-16 pb-28">
      {/* Centered Header */}
      <div className="mx-auto max-w-6xl px-6">
        <div className="reveal mx-auto max-w-3xl text-center">
          <h2 className="font-display text-4xl leading-tight sm:text-5xl">
            Care that <span className="text-rose">breathes with you.</span>
          </h2>
        </div>
      </div>

      {/* Full Screen Edge-to-Edge Feature Panels */}
      <div className="mt-32 flex flex-col">
        {FEATURES.map((f, i) => {
          const isEven = i % 2 === 0;
          return (
            <div
              key={f.title}
              className="reveal grid grid-cols-1 md:grid-cols-2 w-full overflow-hidden shadow-soft border-y border-border/10"
            >
              {/* Text Pane */}
              <div
                className={`px-8 py-20 sm:py-28 md:px-16 lg:px-24 flex flex-col justify-center items-start text-white relative ${
                  isEven ? "md:order-1" : "md:order-2"
                }`}
                style={{ background: f.bg }}
              >
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_30%,white_0%,transparent_60%)] pointer-events-none" />
                <div className="reveal max-w-xl relative z-10">
                  <span className="inline-block rounded-full bg-white/20 backdrop-blur-md px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-white mb-6">
                    {f.tag}
                  </span>
                  <h3 className="font-display text-3xl sm:text-4xl md:text-5xl leading-tight font-medium uppercase tracking-tight text-white">
                    {f.title}
                  </h3>
                  <p className="mt-8 text-[17px] sm:text-lg md:text-xl text-white/90 leading-relaxed font-sans font-normal">
                    {f.desc}
                  </p>
                </div>
              </div>

              {/* Graphic Pane */}
              <div
                className={`relative min-h-[380px] md:min-h-full w-full bg-white overflow-hidden flex justify-center items-center ${
                  isEven ? "md:order-2" : "md:order-1"
                }`}
              >
                <div className="absolute inset-0 flex justify-center items-center pointer-events-none select-none">
                  {renderFeatureGraphic(i)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}





/* ---------- CTA ---------- */
function FinalCta() {
  return (
    <section className="relative z-10 bg-background py-28">
      <div className="mx-auto max-w-5xl px-6">
        <div
          className="relative overflow-hidden rounded-[2.5rem] p-12 text-center shadow-lift sm:p-20"
          style={{ background: "var(--gradient-sunset)" }}
        >
          <img
            src={blobRose}
            alt=""
            aria-hidden
            className="pointer-events-none absolute -left-20 -top-20 w-96 opacity-30"
          />
          <div className="absolute -right-20 -bottom-32 h-96 w-96 rounded-full bg-white/20 blur-3xl" />
          <div className="relative">
            <h2 className="font-display text-4xl text-white leading-tight sm:text-6xl">
              You don't have to <em className="italic">carry this alone.</em>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-white/85">
              Begin with one conversation. We'll meet you exactly where you are.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#talk"
                className="rounded-full bg-white px-7 py-4 text-foreground font-medium shadow-soft transition hover:-translate-y-0.5"
              >
                Start with Nalora — free
              </a>
              <a
                href="#care"
                className="rounded-full border border-white/40 px-7 py-4 text-white font-medium hover:bg-white/10 transition"
              >
                Talk to a therapist
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      id="footer"
      className="relative z-10 border-t border-border bg-[var(--ivory-deep)] py-14"
    >
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
        Â© {new Date().getFullYear()} Nalora Care. Made with care in Kerala.
      </div>
    </footer>
  );
}

function Index() {
  useReveal();
  return (
    <main>
      <Nav />
      <Hero />
      <div style={{ height: "100vh", minHeight: "650px", pointerEvents: "none" }} />
      <WhatIsNalora />
      <Therapists />
      <Care />
      <FinalCta />
      <Footer />
    </main>
  );
}
