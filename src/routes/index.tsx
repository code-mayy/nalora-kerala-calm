import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { useAuth } from "@/context/AuthContext";
import { Sun, CloudSun, Sunset, Moon, Sparkles } from "lucide-react";

import blobRose from "@/assets/blob-rose.png";
import motherBaby from "@/assets/mother-baby.png";
import keralaArch from "@/assets/kerala-architecture.jpg";
import therapist1 from "@/assets/therapist-1.jpg";
import therapist2 from "@/assets/therapist-2.jpg";
import therapist3 from "@/assets/therapist-3.jpg";
import morningBg from "@/assets/image copy.png";
import afternoonBg from "@/assets/image copy 3.png";
import eveningBg from "@/assets/hero.png";
import nightBg from "@/assets/image copy 2.png";
import cloud1 from "@/assets/cloud_crop_1.png";
import cloud4 from "@/assets/cloud_crop_4.png";
import cloud6 from "@/assets/cloud_crop_6.png";
import cloud7 from "@/assets/cloud_crop_7.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nalora â€” Emotional Support for Motherhood" },
      { name: "description", content: "Kerala-rooted, AI-supported postpartum care. A calm digital ecosystem for mothers and the family around them." },
      { property: "og:title", content: "Nalora â€” Emotional Support for Motherhood" },
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

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? "bg-[var(--ivory-deep)]/95 backdrop-blur-md border-b border-border/60"
          : "bg-transparent"
        }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10">
        <Link to="/" className="flex items-center gap-2">
          <span
            className={`grid h-9 w-9 place-items-center rounded-full font-display text-lg transition ${scrolled ? "bg-[var(--gradient-sunset)] text-white" : "border-2 border-white/80 text-white"
              }`}
          >
            n
          </span>
          <span
            className={`font-display text-2xl tracking-tight transition ${scrolled ? "text-foreground" : "text-white"
              }`}
          >
            nalora
          </span>
        </Link>
        <nav
          className={`hidden md:flex items-center gap-7 text-[15px] font-medium transition ${scrolled ? "text-foreground/80" : "text-white/90"
            }`}
        >
          <Link to="/" className="hover:opacity-70 transition">Home</Link>
          <Link to="/about" className="hover:opacity-70 transition">About Us</Link>
          <Link to="/services" className="hover:opacity-70 transition">Services</Link>
          {user && (
            <Link to="/bookings" className="hover:opacity-70 transition">Bookings</Link>
          )}
          <Link to="/contact" className="hover:opacity-70 transition">Contact</Link>
        </nav>
        <div className="hidden sm:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-4">
              <span className={`text-sm font-semibold ${scrolled ? "text-foreground/80" : "text-white/90"}`}>
                Hi, {user.name.split(" ")[0]}
              </span>
              <button
                onClick={() => logout()}
                className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition hover:-translate-y-0.5 ${scrolled
                    ? "border-[var(--rose)] text-[var(--rose)] hover:bg-[var(--rose)]/10"
                    : "border-white/80 text-white hover:bg-white/10"
                  }`}
                style={{ cursor: "pointer" }}
              >
                Sign Out
              </button>
              {user.role === "doctor" ? (
                <Link
                  to="/doctor/dashboard"
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition ${scrolled
                      ? "bg-[var(--gradient-sunset)] text-white shadow-soft hover:-translate-y-0.5"
                      : "bg-white/95 text-foreground hover:bg-white"
                    }`}
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  to="/book-session"
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition ${scrolled
                      ? "bg-[var(--gradient-sunset)] text-white shadow-soft hover:-translate-y-0.5"
                      : "bg-white/95 text-foreground hover:bg-white"
                    }`}
                >
                  Book a Session
                </Link>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition hover:-translate-y-0.5 ${scrolled
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
          style={{ color: scrolled ? "var(--charcoal)" : "white", cursor: "pointer", background: "none", border: "none" }}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            {menuOpen ? <path d="M18 6 6 18M6 6l12 12" /> : <><line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="18" x2="20" y2="18" /></>}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[var(--ivory-deep)]/95 backdrop-blur-md border-b border-border/60 px-6 py-4 flex flex-col gap-4">
          <Link to="/" onClick={() => setMenuOpen(false)} className="text-foreground/80 hover:text-rose font-medium py-1">Home</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)} className="text-foreground/80 hover:text-rose font-medium py-1">About Us</Link>
          <Link to="/services" onClick={() => setMenuOpen(false)} className="text-foreground/80 hover:text-rose font-medium py-1">Services</Link>
          {user && (
            <Link to="/bookings" onClick={() => setMenuOpen(false)} className="text-foreground/80 hover:text-rose font-medium py-1">Bookings</Link>
          )}
          <Link to="/contact" onClick={() => setMenuOpen(false)} className="text-foreground/80 hover:text-rose font-medium py-1">Contact</Link>
          
          <div className="border-t border-border/40 pt-4 flex flex-col gap-3">
            {user ? (
              <>
                <div className="text-sm font-semibold text-foreground/80 py-1">
                  Logged in as {user.name}
                </div>
                {user.role === "doctor" ? (
                  <Link
                    to="/doctor/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--gradient-sunset)] text-white px-5 py-2.5 text-sm font-medium shadow-soft"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <Link
                    to="/book-session"
                    onClick={() => setMenuOpen(false)}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--gradient-sunset)] text-white px-5 py-2.5 text-sm font-medium shadow-soft"
                  >
                    Book a Session
                  </Link>
                )}
                <button
                  onClick={() => { setMenuOpen(false); logout(); }}
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
  { top: "27%", left: "72%", size: 1, delay: "1.1s" }
];

const CLOUDS_CONFIG = [
  { id: 1, img: cloud1, width: "260px", height: "60px", top: "15%", duration: "75s", delay: "0s", opacity: 0.55 },
  { id: 2, img: cloud4, width: "320px", height: "84px", top: "35%", duration: "95s", delay: "-25s", opacity: 0.6 },
  { id: 3, img: cloud6, width: "300px", height: "84px", top: "8%", duration: "125s", delay: "-60s", opacity: 0.65 },
  { id: 4, img: cloud7, width: "250px", height: "87px", top: "52%", duration: "60s", delay: "-15s", opacity: 0.45 }
];

function getSunStyle(hour: number) {
  if (hour < 5 || hour > 19) return { bg: "transparent", glow: "none" };
  if (hour >= 5 && hour < 8) {
    return {
      bg: "radial-gradient(circle, #ffe066 10%, #ff7e5f 70%, #feb47b 100%)",
      glow: "0 0 50px 15px rgba(255, 126, 95, 0.6), 0 0 100px 30px rgba(254, 180, 123, 0.4)"
    };
  }
  if (hour >= 8 && hour < 12) {
    return {
      bg: "radial-gradient(circle, #ffffff 20%, #fff176 60%, #ffb300 100%)",
      glow: "0 0 60px 20px rgba(255, 235, 59, 0.7), 0 0 120px 40px rgba(255, 193, 7, 0.4)"
    };
  }
  if (hour >= 12 && hour < 16) {
    return {
      bg: "radial-gradient(circle, #ffffff 40%, #fffde7 80%, #fff9c4 100%)",
      glow: "0 0 80px 30px rgba(255, 255, 255, 0.9), 0 0 160px 60px rgba(255, 253, 231, 0.5)"
    };
  }
  // Evening/Sunset: 16 to 19
  return {
    bg: "radial-gradient(circle, #ffd54f 20%, #f4511e 60%, #b71c1c 100%)",
    glow: "0 0 70px 25px rgba(244, 81, 30, 0.85), 0 0 140px 50px rgba(230, 81, 0, 0.6), 0 0 200px 80px rgba(255, 142, 90, 0.4)"
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
      sunOpacity = (hour - 5);
    } else if (hour > 18 && hour <= 19) {
      sunOpacity = (19 - hour);
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
      overlay: "linear-gradient(180deg, rgba(232, 168, 124, 0.25) 0%, rgba(107, 74, 122, 0.25) 60%, rgba(43, 27, 74, 0.4) 100%)",
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
      moon: { opacity: moonOpacity, left: moonX, bottom: moonY }
    };
  } else if (hour >= 7 && hour < 12) {
    return {
      label: "Morning",
      overlay: "linear-gradient(180deg, rgba(255, 243, 176, 0.1) 0%, rgba(168, 211, 237, 0.05) 60%, rgba(220, 238, 248, 0) 100%)",
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
      moon: { opacity: moonOpacity, left: moonX, bottom: moonY }
    };
  } else if (hour >= 12 && hour < 16) {
    return {
      label: "Afternoon",
      overlay: "linear-gradient(180deg, rgba(255, 252, 224, 0.08) 0%, rgba(143, 196, 229, 0.05) 60%, rgba(214, 235, 245, 0) 100%)",
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
      moon: { opacity: moonOpacity, left: moonX, bottom: moonY }
    };
  } else if (hour >= 16 && hour < 20) {
    return {
      label: "Sunset/Evening",
      overlay: "linear-gradient(180deg, rgba(197, 107, 125, 0.3) 0%, rgba(232, 154, 108, 0.25) 50%, rgba(244, 194, 138, 0.1) 100%)",
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
      moon: { opacity: moonOpacity, left: moonX, bottom: moonY }
    };
  } else {
    return {
      label: "Night",
      overlay: "linear-gradient(180deg, rgba(10, 5, 30, 0.5) 0%, rgba(18, 8, 64, 0.3) 50%, rgba(42, 27, 92, 0.1) 100%)",
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
      moon: { opacity: moonOpacity, left: moonX, bottom: moonY }
    };
  }
}

const getIndianTimeString = (decimalHour: number) => {
  const totalSeconds = Math.round(decimalHour * 3600);
  const hours = Math.floor(totalSeconds / 3600) % 24;
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  const displayMinutes = minutes.toString().padStart(2, '0');
  const displaySeconds = seconds.toString().padStart(2, '0');
  
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
        zIndex: 1
      }}
    >
      {/* CSS Animation keyframe inline styles to handle Twinkling stars and sliding clouds */}
      <style dangerouslySetInnerHTML={{__html: `
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
      `}} />

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
          transition: "filter 1.5s ease-in-out"
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
            zIndex: 1
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
            zIndex: 2
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
            zIndex: 3
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
            zIndex: 4
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
            zIndex: 4
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
            zIndex: 10
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
                animationDelay: star.delay
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
            zIndex: 11
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
            filter: "drop-shadow(0 0 20px rgba(255, 255, 255, 0.65)) drop-shadow(0 0 40px rgba(187, 222, 251, 0.35))",
            opacity: phase.moon.opacity,
            transform: "scale(1.0)",
            transition: "all 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
            pointerEvents: "none",
            zIndex: 11
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
              zIndex: 12 // In front of Sun/Moon and Stars, but behind horizon glow
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
          transition: "background 1.5s ease-in-out"
        }}
      />

      {/* Dark overlay for text readability */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0, 0, 0, 0.22)",
          zIndex: 10,
          pointerEvents: "none"
        }}
      />

      {/* Hero Content (Split Column Layout) */}
      <div
        className="mx-auto flex max-w-6xl w-full h-full items-center justify-between px-6 pt-16 md:pt-0 flex-col md:flex-row gap-10 md:gap-12"
        style={{
          position: "relative",
          zIndex: 11,
          color: "white"
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
              margin: "0 0 24px 0"
            }}
          >
            She gave everything.<br />
            <em style={{ fontFamily: "var(--font-display)", fontStyle: "italic", color: "var(--accent)" }}>
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
              textShadow: "0 2px 8px rgba(0, 0, 0, 0.3)"
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
                letterSpacing: "0.02em"
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
                letterSpacing: "0.02em"
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
              WebkitMaskImage: "linear-gradient(to bottom, black 80%, transparent 100%)"
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
          maxWidth: "280px"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
          <div>
            <div style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em", opacity: 0.6 }}>
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
              background: simulatedHour !== null ? "rgba(251, 146, 60, 0.2)" : "rgba(34, 197, 94, 0.2)",
              color: simulatedHour !== null ? "#fb923c" : "#4ade80",
              border: simulatedHour !== null ? "1px solid rgba(251, 146, 60, 0.3)" : "1px solid rgba(34, 197, 94, 0.3)"
            }}
          >
            {simulatedHour !== null ? "Simulated" : "Live"}
          </span>
        </div>

        {simulatedHour !== null && (
          <div style={{ marginTop: "4px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "4px" }}>
              <span>Simulating:</span>
              <span style={{ fontWeight: 600, color: "var(--accent)" }}>{getIndianTimeString(simulatedHour)} ({phase.label})</span>
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
                background: "rgba(255, 255, 255, 0.2)"
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
            textAlign: "center"
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
];

/* ---------- What is Nalora (Introduction) ---------- */
function WhatIsNalora() {
  return (
    <section id="what-is-nalora" className="relative z-10 bg-background py-24 sm:py-32 rounded-t-[2.5rem] sm:rounded-t-[4rem] shadow-[0_-24px_50px_-20px_rgba(0,0,0,0.3)]">
      <div className="mx-auto max-w-5xl px-6">
        <div className="reveal mx-auto max-w-3xl text-center">
          <span className="chip">Introduction</span>
          <h2 className="mt-5 font-display text-4xl sm:text-5xl leading-tight">
            What is <em className="italic text-rose">nalora</em>?
          </h2>
          <p className="mt-6 text-[17px] sm:text-lg text-foreground/70 leading-relaxed">
            Nalora is a compassionate, research-backed digital ecosystem built to support emotional well-being throughout pregnancy and early motherhood. By combining thoughtful, culturally rooted support with evidence-based psychological frameworks, we help you understand, track, and process your emotional experiences with absolute clarity.
          </p>
        </div>
      </div>
    </section>
  );
}

function Therapists() {
  return (
    <section id="therapists" className="relative z-10 bg-background py-16 sm:py-24 border-t border-border/40">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="reveal text-center font-display text-4xl sm:text-5xl">
          How can we <em className="italic text-rose">help you?</em>
        </h2>
        <p className="reveal mx-auto mt-4 max-w-xl text-center text-foreground/65">
          Hand-picked therapists trained in maternal mental health, in your tongue.
        </p>

        {/* Filter chips */}
        <div className="reveal mt-10 flex flex-wrap items-center justify-center gap-3">
          {["à´®à´²à´¯à´¾à´³à´‚ Online", "Consultant Psychologist", "Clinical Psychologist", "Perinatal Care", "Psychiatrist"].map(
            (t, i) => (
              <span
                key={t}
                className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm shadow-soft ${i === 0 ? "bg-foreground text-background" : "bg-card text-foreground/75"
                  }`}
              >
                {t}
              </span>
            ),
          )}
        </div>

        <div className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {THERAPISTS.map((t) => (
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
                <img
                  src={t.img}
                  alt={t.name}
                  width={800}
                  height={800}
                  loading="lazy"
                  className="h-32 w-28 rounded-t-2xl object-cover object-top"
                />
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
                    <div className="text-[11px] uppercase tracking-wide text-foreground/50">Therapy hrs</div>
                  </div>
                  <div>
                    <div className="font-display text-[13px] leading-tight">{t.lang}</div>
                    <div className="text-[11px] uppercase tracking-wide text-foreground/50">Languages</div>
                  </div>
                  <div>
                    <div className="font-display text-lg text-coconut">{t.price}</div>
                    <div className="text-[11px] uppercase tracking-wide text-foreground/50">Per session</div>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-[var(--ivory-deep)] px-4 py-3">
                  <div>
                    <div className="text-[11px] uppercase tracking-wide text-foreground/55">
                      Next available in
                    </div>
                    <div className="font-display text-lg">{t.next}</div>
                  </div>
                  <button className="rounded-full bg-foreground px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-background transition hover:bg-rose">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ---------- Story ---------- */
function Story() {
  return (
    <section id="story" className="relative z-10 bg-[#F1F3F4] py-28">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <h2 className="reveal font-display text-5xl leading-tight sm:text-6xl">
          Our <em className="italic font-display">Change</em> Makers
        </h2>

        <div className="mt-20 grid gap-14 md:grid-cols-[minmax(0,420px)_1fr] md:items-center md:text-left">
          <div className="reveal relative mx-auto w-full max-w-md">
            {/* Organic green blob */}
            <svg viewBox="0 0 400 460" className="absolute inset-0 -z-0 h-full w-full" aria-hidden>
              <path
                fill="#2DD4A8"
                d="M203,30 C290,18 370,90 378,190 C386,290 332,380 232,420 C140,456 50,400 28,300 C8,210 50,120 110,70 C140,46 170,34 203,30 Z"
              />
            </svg>
            <div className="relative">
              <img
                src={motherBaby}
                alt="Founder portrait"
                width={1024}
                height={1536}
                loading="lazy"
                className="relative mx-auto h-[28rem] w-full object-cover grayscale"
                style={{ maskImage: "radial-gradient(ellipse at center, black 70%, transparent 100%)" }}
              />
            </div>
          </div>

          <div className="reveal">
            <div className="flex items-center gap-4">
              <h3 className="font-display italic text-2xl">Ibrahim Hawaaz</h3>
              <a href="#" aria-label="LinkedIn" className="grid h-9 w-9 place-items-center rounded-md bg-foreground text-background text-xs font-bold">in</a>
            </div>
            <div className="mt-1 text-foreground/70">( Co-founder &amp; CEO )</div>

            <div className="mt-6 text-foreground/45">
              Engineer-Turned-Growth Marketer | Problem Solver
            </div>

            <p className="mt-6 text-lg leading-relaxed text-foreground/80">
              Nalora wasn't just an idea â€” it was a realisation. When new mothers
              around us struggled to find the kind of support they needed, we
              couldn't shake the thought: if things need to change, why not start
              with us?
            </p>
            <p className="mt-4 text-lg leading-relaxed text-foreground/80">
              Instead of waiting for a better system, we decided to build one.
              That's how Nalora came to life â€” with a mission to make postpartum
              therapy accessible, vernacular, and deeply human, so that no mother
              ever feels unheard.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <img src={keralaArch} alt="" width={120} height={120} loading="lazy" className="h-16 w-16 rounded-2xl object-cover shadow-soft" />
              <div className="text-sm text-foreground/60">
                Rooted in Kerala. <br /> Designed for every home.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Bento care features ---------- */
const FEATURES = [
  { title: "Late-night companion", desc: "An always-on listener trained in maternal mental health, in your tongue.", tag: "AI Care", grad: "linear-gradient(135deg,#E58A98,#F5A25D)" },
  { title: "Therapist matching", desc: "Hand-picked certified therapists, matched in under a day.", tag: "Human", grad: "linear-gradient(135deg,#6D9B73,#A7C5AC)" },
  { title: "Family circle", desc: "Invite your partner, parents and in-laws into the same care plan.", tag: "Together", grad: "linear-gradient(135deg,#F5A25D,#FFD2A8)" },
  { title: "Recovery rhythms", desc: "Sleep, mood and feeding tracked with gentle, never judgmental, nudges.", tag: "Daily", grad: "linear-gradient(135deg,#E58A98,#F4C2C9)" },
  { title: "Vernacular library", desc: "Audio sessions in Malayalam, Tamil, Hindi, Kannada and more.", tag: "Listen", grad: "linear-gradient(135deg,#6D9B73,#E58A98)" },
  { title: "Private by design", desc: "End-to-end encrypted. Your story never leaves your circle.", tag: "Safe", grad: "linear-gradient(135deg,#2E2E2E,#6D9B73)" },
];

function Care() {
  return (
    <section id="care" className="relative z-10 bg-background py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="reveal mx-auto max-w-3xl text-center">
          <span className="chip">What we offer</span>
          <h2 className="mt-5 font-display text-4xl leading-tight sm:text-5xl">
            Care that <em className="italic text-rose">breathes with you.</em>
          </h2>
          <p className="mt-5 text-lg text-foreground/70">
            A small, deliberate set of tools â€” built with mothers, therapists and families.
          </p>
        </div>

        <div className="mt-16 grid auto-rows-[14rem] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => {
            const span =
              i === 0 ? "lg:col-span-2 lg:row-span-2" : i === 3 ? "lg:col-span-2" : "";
            return (
              <TiltCard key={f.title} className={`reveal rounded-3xl ${span}`}>
                <div className="relative h-full overflow-hidden rounded-3xl bg-card p-6 shadow-soft transition hover:shadow-lift">
                  <div
                    className="absolute -right-12 -top-12 h-44 w-44 rounded-full opacity-70 blur-2xl"
                    style={{ background: f.grad }}
                  />
                  <div className="relative flex h-full flex-col">
                    <span className="chip self-start">{f.tag}</span>
                    <h3 className="mt-auto font-display text-2xl leading-tight">{f.title}</h3>
                    <p className="mt-2 text-sm text-foreground/70">{f.desc}</p>
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Family ecosystem with connection lines ---------- */
const ROLES = [
  { id: "mother", label: "Mother", desc: "At the heart of every Nalora circle â€” supported, never alone.", x: 50, y: 50, big: true },
  { id: "partner", label: "Partner", desc: "Daily check-ins, conversation prompts and a private therapist channel.", x: 15, y: 18 },
  { id: "baby", label: "Baby", desc: "Milestones tracked gently, with sleep and feeding rhythms.", x: 85, y: 18 },
  { id: "grand", label: "Grandparents", desc: "Bite-sized guides on modern postpartum care, in their language.", x: 14, y: 82 },
  { id: "therapist", label: "Therapist", desc: "Hand-picked, vernacular, available within 24 hours.", x: 86, y: 82 },
];

function Family() {
  const [active, setActive] = useState("mother");
  const cur = ROLES.find((r) => r.id === active)!;
  const mother = ROLES[0];

  return (
    <section id="family" className="relative z-10 bg-[var(--ivory-deep)] py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="reveal mx-auto max-w-3xl text-center">
          <span className="chip">The Circle</span>
          <h2 className="mt-5 font-display text-4xl leading-tight sm:text-5xl">
            Healing is a <em className="italic text-rose">team sport.</em>
          </h2>
          <p className="mt-5 text-lg text-foreground/70">
            Tap a role to see how Nalora supports each person in the circle.
          </p>
        </div>

        <div className="reveal mt-16 grid gap-10 lg:grid-cols-[1fr_360px] lg:items-center">
          <div className="relative aspect-square w-full rounded-[2.5rem] bg-card shadow-soft overflow-hidden">
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
              {ROLES.slice(1).map((r) => {
                const isActive = active === r.id || active === "mother";
                return (
                  <line
                    key={r.id}
                    x1={mother.x}
                    y1={mother.y}
                    x2={r.x}
                    y2={r.y}
                    stroke={isActive ? "var(--rose)" : "var(--coconut)"}
                    strokeWidth="0.35"
                    strokeDasharray={isActive ? "0" : "0.8 0.8"}
                    className={isActive ? "animate-pulse-line" : ""}
                    style={{ opacity: isActive ? 0.9 : 0.25 }}
                  />
                );
              })}
            </svg>

            {ROLES.map((r) => {
              const isActive = active === r.id;
              return (
                <button
                  key={r.id}
                  onClick={() => setActive(r.id)}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${r.x}%`, top: `${r.y}%` }}
                  aria-label={r.label}
                >
                  <span className="relative grid place-items-center">
                    {isActive && (
                      <span className="absolute h-full w-full rounded-full bg-rose/40 animate-ripple" />
                    )}
                    <span
                      className={`grid place-items-center rounded-full font-display transition-all ${r.big ? "h-24 w-24 text-lg" : "h-16 w-16 text-sm"
                        } ${isActive
                          ? "bg-[var(--gradient-sunset)] text-white shadow-glow scale-110"
                          : "bg-white text-foreground shadow-soft hover:scale-105"
                        }`}
                    >
                      {r.label.split(" ")[0]}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="rounded-3xl bg-card p-8 shadow-soft">
            <span className="chip">{cur.label}</span>
            <h3 className="mt-4 font-display text-3xl leading-tight">
              How Nalora supports the <em className="italic text-rose">{cur.label.toLowerCase()}</em>
            </h3>
            <p className="mt-4 text-foreground/75 leading-relaxed">{cur.desc}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {ROLES.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setActive(r.id)}
                  className={`rounded-full border px-3 py-1.5 text-xs transition ${active === r.id
                      ? "border-rose bg-rose/10 text-rose"
                      : "border-border text-foreground/60 hover:border-rose"
                    }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Timeline / Journey ---------- */
const STAGES = [
  { week: "Wk 0â€“2", title: "The fourth trimester", body: "Quiet voice notes through the night. Sleep tracking that doesn't judge missed naps.", color: "var(--rose)" },
  { week: "Wk 3â€“6", title: "Finding rhythm", body: "Daily 7-minute check-ins, hormone-aware mood support, partner prompts.", color: "var(--sunset)" },
  { week: "Wk 7â€“12", title: "Rebuilding self", body: "Pelvic floor, identity work, return-to-work coaching â€” gently paced.", color: "var(--coconut)" },
  { week: "Mo 4â€“6", title: "Re-entering the world", body: "Weaning support, anxiety toolkits, and live group rooms in your language.", color: "var(--rose)" },
  { week: "Mo 6â€“12", title: "Long-form healing", body: "Therapist continuity, family workshops, milestone celebrations.", color: "var(--sunset)" },
];

function Journey() {
  const [idx, setIdx] = useState(0);
  const stage = STAGES[idx];
  return (
    <section id="journey" className="relative z-10 bg-background py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="reveal mx-auto max-w-3xl text-center">
          <span className="chip">The Journey</span>
          <h2 className="mt-5 font-display text-4xl leading-tight sm:text-5xl">
            A first year, <em className="italic text-rose">held softly.</em>
          </h2>
        </div>

        <div className="reveal mt-14 rounded-[2.5rem] bg-card p-8 shadow-soft sm:p-12">
          <div
            className="relative grid gap-10 transition-all duration-700"
            key={idx}
          >
            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <div className="font-display text-sm uppercase tracking-[0.18em] text-foreground/50">{stage.week}</div>
                <h3 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
                  {stage.title}
                </h3>
                <p className="mt-4 max-w-xl text-lg leading-relaxed text-foreground/70">{stage.body}</p>
              </div>
              <div className="font-display text-7xl sm:text-8xl" style={{ color: stage.color }}>
                0{idx + 1}
              </div>
            </div>
          </div>

          {/* slider */}
          <div className="mt-10">
            <div className="relative h-1 w-full rounded-full bg-[var(--ivory-deep)]">
              <div
                className="absolute top-0 left-0 h-full rounded-full transition-all duration-500"
                style={{
                  width: `${((idx + 1) / STAGES.length) * 100}%`,
                  background: "var(--gradient-sunset)",
                }}
              />
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              {STAGES.map((s, i) => (
                <button
                  key={s.week}
                  onClick={() => setIdx(i)}
                  className={`flex-1 min-w-[7rem] rounded-full px-3 py-2 text-xs font-medium transition ${i === idx
                      ? "bg-foreground text-background"
                      : "text-foreground/50 hover:text-foreground"
                    }`}
                >
                  {s.week}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Live chat simulator ---------- */
type Msg = { role: "user" | "ai"; text: string };
const SCRIPTS: { prompt: string; replies: string[] }[] = [
  {
    prompt: "I haven't slept properly in 3 days.",
    replies: [
      "Three nights is a long time to carry alone â€” I hear you.",
      "Let's start small: do you want a 4-minute guided rest, or to talk first?",
    ],
  },
  {
    prompt: "I feel like I'm failing as a mother.",
    replies: [
      "That feeling is so common, and so unfair to you. You're not failing.",
      "Want to tell me what happened today, in your own words? I'll just listen.",
    ],
  },
  {
    prompt: "My partner doesn't understand what I'm going through.",
    replies: [
      "That distance can ache more than the tiredness itself.",
      "I can prepare a 3-minute note for your partner, in their language. Would that help?",
    ],
  },
];

function Chat() {
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "ai", text: "Hello, I'm Nalora. There's no wrong way to begin." },
  ]);
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (msgs.length > 1) {
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [msgs, typing]);

  const send = (s: { prompt: string; replies: string[] }) => {
    if (typing) return;
    setMsgs((m) => [...m, { role: "user", text: s.prompt }]);
    setTyping(true);
    let delay = 700;
    s.replies.forEach((r, i) => {
      setTimeout(() => {
        setMsgs((m) => [...m, { role: "ai", text: r }]);
        if (i === s.replies.length - 1) setTyping(false);
      }, delay);
      delay += 1100 + r.length * 18;
    });
  };

  return (
    <section id="talk" className="relative z-10 bg-background py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="reveal">
            <span className="chip">Try Nalora</span>
            <h2 className="mt-5 font-display text-4xl leading-tight sm:text-5xl">
              The first message is the <em className="italic text-rose">hardest.</em>
            </h2>
            <p className="mt-5 text-lg text-foreground/70 leading-relaxed">
              Pick a prompt that feels close. Nalora will respond the way a calm,
              trained friend would â€” without scripts, without judgement.
            </p>
            <div className="mt-8 space-y-3">
              {SCRIPTS.map((s) => (
                <button
                  key={s.prompt}
                  onClick={() => send(s)}
                  disabled={typing}
                  className="group flex w-full items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4 text-left transition hover:border-rose hover:shadow-soft disabled:opacity-50"
                >
                  <span className="text-foreground/80 group-hover:text-foreground">{s.prompt}</span>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--ivory-deep)] text-rose transition group-hover:bg-rose group-hover:text-white">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                  </span>
                </button>
              ))}
            </div>
          </div>

          <TiltCard className="reveal">
            <div className="overflow-hidden rounded-[2rem] bg-card shadow-lift">
              <div className="flex items-center gap-3 border-b border-border px-5 py-4">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--gradient-sunset)] text-white font-display">n</span>
                <div>
                  <div className="text-sm font-medium">Nalora</div>
                  <div className="flex items-center gap-1.5 text-xs text-foreground/55">
                    <span className="h-1.5 w-1.5 rounded-full bg-coconut" /> here with you
                  </div>
                </div>
              </div>
              <div className="h-[28rem] space-y-3 overflow-y-auto bg-[var(--ivory-deep)]/40 p-5">
                {msgs.map((m, i) => (
                  <div
                    key={i}
                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                    style={{ animation: "fade-in 0.4s ease-out" }}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-soft ${m.role === "user"
                          ? "bg-[var(--gradient-sunset)] text-white rounded-br-md"
                          : "bg-white text-foreground rounded-bl-md"
                        }`}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
                {typing && (
                  <div className="flex justify-start">
                    <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-white px-4 py-3 shadow-soft">
                      <span className="h-2 w-2 rounded-full bg-rose animate-bounce-dot" style={{ animationDelay: "0s" }} />
                      <span className="h-2 w-2 rounded-full bg-rose animate-bounce-dot" style={{ animationDelay: "0.15s" }} />
                      <span className="h-2 w-2 rounded-full bg-rose animate-bounce-dot" style={{ animationDelay: "0.3s" }} />
                    </div>
                  </div>
                )}
                <div ref={endRef} />
              </div>
              <div className="border-t border-border px-5 py-3 text-xs text-foreground/50">
                Demo conversation â€¢ Real Nalora is private & end-to-end encrypted
              </div>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}

/* ---------- CTA ---------- */
function FinalCta() {
  return (
    <section className="relative z-10 bg-background py-28">
      <div className="mx-auto max-w-5xl px-6">
        <div className="relative overflow-hidden rounded-[2.5rem] p-12 text-center shadow-lift sm:p-20"
          style={{ background: "var(--gradient-sunset)" }}>
          <img src={blobRose} alt="" aria-hidden className="pointer-events-none absolute -left-20 -top-20 w-96 opacity-30" />
          <div className="absolute -right-20 -bottom-32 h-96 w-96 rounded-full bg-white/20 blur-3xl" />
          <div className="relative">
            <h2 className="font-display text-4xl text-white leading-tight sm:text-6xl">
              You don't have to <em className="italic">carry this alone.</em>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-white/85">
              Begin with one conversation. We'll meet you exactly where you are.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <a href="#talk" className="rounded-full bg-white px-7 py-4 text-foreground font-medium shadow-soft transition hover:-translate-y-0.5">
                Start with Nalora â€” free
              </a>
              <a href="#care" className="rounded-full border border-white/40 px-7 py-4 text-white font-medium hover:bg-white/10 transition">
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
    <footer id="footer" className="relative z-10 border-t border-border bg-[var(--ivory-deep)] py-14">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--gradient-sunset)] text-white font-display">n</span>
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
            <div className="font-display text-sm uppercase tracking-[0.16em] text-foreground/60">{h}</div>
            <ul className="mt-4 space-y-2.5 text-sm">
              {(items as string[]).map((i) => (
                <li key={i}><a href="#" className="text-foreground/75 hover:text-rose transition">{i}</a></li>
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
      <Story />
      <Care />
      <Family />
      <Journey />
      <Chat />
      <FinalCta />
      <Footer />
    </main>
  );
}
