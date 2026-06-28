import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, type FormEvent } from "react";
import { useAuth } from "@/context/AuthContext";

import morningBg from "@/assets/image copy.png";
import afternoonBg from "@/assets/image copy 3.png";
import eveningBg from "@/assets/hero.png";
import nightBg from "@/assets/image copy 2.png";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login – Nalora" },
      { name: "description", content: "Sign in to your Nalora account to access your care dashboard, AI chat, and appointments." },
    ],
  }),
  component: LoginPage,
});

/* ─────────────────────── sky helpers ─────────────────────────────────────── */
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

function getSunStyle(hour: number) {
  if (hour < 5 || hour > 19) return { bg: "transparent", glow: "none" };
  if (hour >= 5 && hour < 8) return { bg: "radial-gradient(circle,#ffe066 10%,#ff7e5f 70%,#feb47b 100%)", glow: "0 0 50px 15px rgba(255,126,95,0.6),0 0 100px 30px rgba(254,180,123,0.4)" };
  if (hour >= 8 && hour < 12) return { bg: "radial-gradient(circle,#ffffff 20%,#fff176 60%,#ffb300 100%)", glow: "0 0 60px 20px rgba(255,235,59,0.7),0 0 120px 40px rgba(255,193,7,0.4)" };
  if (hour >= 12 && hour < 16) return { bg: "radial-gradient(circle,#ffffff 40%,#fffde7 80%,#fff9c4 100%)", glow: "0 0 80px 30px rgba(255,255,255,0.9),0 0 160px 60px rgba(255,253,231,0.5)" };
  return { bg: "radial-gradient(circle,#ffd54f 20%,#f4511e 60%,#b71c1c 100%)", glow: "0 0 70px 25px rgba(244,81,30,0.85),0 0 140px 50px rgba(230,81,0,0.6)" };
}

function getSkyPhase(hour: number) {
  let sunOpacity = 0, sunX = "50%", sunY = "-20%", sunScale = 1.0;
  if (hour >= 5 && hour <= 19) {
    const t = (hour - 5) / 14; sunX = `${5 + t * 90}%`; sunY = `${12 + Math.sin(t * Math.PI) * 65}%`;
    if (hour >= 5 && hour < 6) sunOpacity = hour - 5;
    else if (hour > 18 && hour <= 19) sunOpacity = 19 - hour;
    else sunOpacity = 1;
    sunScale = 1 + Math.sin(t * Math.PI) * 0.1;
  }
  let moonOpacity = 0, moonX = "50%", moonY = "-20%";
  if (hour >= 17 || hour <= 7) {
    const hRel = hour >= 17 ? hour - 17 : hour + 7; const tm = hRel / 14;
    moonX = `${5 + tm * 90}%`; moonY = `${15 + Math.sin(tm * Math.PI) * 55}%`;
    if (hour >= 17 && hour < 19) moonOpacity = ((hour - 17) / 2) * 0.9;
    else if (hour > 5 && hour <= 7) moonOpacity = ((7 - hour) / 2) * 0.9;
    else moonOpacity = 0.9;
  }
  let starsOpacity = 0;
  if (hour >= 20 || hour <= 4) starsOpacity = 1;
  else if (hour > 18 && hour < 20) starsOpacity = (hour - 18) / 2;
  else if (hour > 4 && hour < 6) starsOpacity = (6 - hour) / 2;
  let mO = 0, aO = 0, eO = 0, nO = 0;
  if (hour >= 5 && hour < 7) { const t = (hour - 5) / 2; mO = t; nO = 1 - t; }
  else if (hour >= 7 && hour < 11) mO = 1;
  else if (hour >= 11 && hour < 12) { const t = hour - 11; aO = t; mO = 1 - t; }
  else if (hour >= 12 && hour < 16) aO = 1;
  else if (hour >= 16 && hour < 17) { const t = hour - 16; eO = t; aO = 1 - t; }
  else if (hour >= 17 && hour < 19) eO = 1;
  else if (hour >= 19 && hour < 20) { const t = hour - 19; nO = t; eO = 1 - t; }
  else nO = 1;
  const base = { starsOpacity, morningOpacity: mO, afternoonOpacity: aO, eveningOpacity: eO, nightOpacity: nO, sun: { opacity: sunOpacity, left: sunX, bottom: sunY, scale: sunScale }, moon: { opacity: moonOpacity, left: moonX, bottom: moonY } };
  if (hour >= 5 && hour < 7) return { ...base, overlay: "linear-gradient(180deg,rgba(232,168,124,0.25) 0%,rgba(107,74,122,0.25) 60%,rgba(43,27,74,0.4) 100%)", filter: "brightness(0.9) saturate(1.1) sepia(0.05) contrast(0.98) hue-rotate(5deg)" };
  if (hour >= 7 && hour < 12) return { ...base, overlay: "linear-gradient(180deg,rgba(255,243,176,0.1) 0%,rgba(168,211,237,0.05) 60%,rgba(220,238,248,0) 100%)", filter: "brightness(1.02) saturate(1.05) contrast(1.0) hue-rotate(0deg)" };
  if (hour >= 12 && hour < 16) return { ...base, overlay: "linear-gradient(180deg,rgba(255,252,224,0.08) 0%,rgba(143,196,229,0.05) 60%,rgba(214,235,245,0) 100%)", filter: "brightness(1.05) saturate(1.1) contrast(1.02) hue-rotate(-5deg)" };
  if (hour >= 16 && hour < 20) return { ...base, overlay: "linear-gradient(180deg,rgba(197,107,125,0.3) 0%,rgba(232,154,108,0.25) 50%,rgba(244,194,138,0.1) 100%)", filter: "brightness(0.95) saturate(1.1) sepia(0.05) contrast(1.0) hue-rotate(-10deg)" };
  return { ...base, overlay: "linear-gradient(180deg,rgba(10,5,30,0.5) 0%,rgba(18,8,64,0.3) 50%,rgba(42,27,92,0.1) 100%)", filter: "brightness(0.85) saturate(0.9) contrast(1.05) hue-rotate(0deg)" };
}

/* ─────────────────────── sky bg component ───────────────────────────────── */
function SkyBackground({ hour }: { hour: number }) {
  const phase = getSkyPhase(hour);
  const sunStyle = getSunStyle(hour);
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, filter: phase.filter, transition: "filter 1.5s ease-in-out" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${morningBg})`, backgroundSize: "cover", backgroundPosition: "top center", opacity: phase.morningOpacity, transition: "opacity 1.5s ease-in-out", zIndex: 1 }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${afternoonBg})`, backgroundSize: "cover", backgroundPosition: "top center", opacity: phase.afternoonOpacity, transition: "opacity 1.5s ease-in-out", zIndex: 2 }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${eveningBg})`, backgroundSize: "cover", backgroundPosition: "top center", opacity: phase.eveningOpacity, transition: "opacity 1.5s ease-in-out", zIndex: 3 }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${nightBg})`, backgroundSize: "cover", backgroundPosition: "top center", opacity: phase.nightOpacity, transition: "opacity 1.5s ease-in-out", zIndex: 4 }} />
      <div style={{ position: "absolute", inset: 0, background: phase.overlay, pointerEvents: "none", transition: "background 1.5s ease-in-out", zIndex: 5 }} />
      <div style={{ position: "absolute", inset: 0, opacity: phase.starsOpacity, transition: "opacity 1.5s ease-in-out", pointerEvents: "none", zIndex: 10 }}>
        {STATIC_STARS.map((s, i) => <div key={i} className="lstar" style={{ position: "absolute", top: s.top, left: s.left, width: `${s.size}px`, height: `${s.size}px`, borderRadius: "50%", background: "#fff", boxShadow: "0 0 6px 1.5px rgba(255,255,255,0.8)", animationDelay: s.delay }} />)}
      </div>
      <div style={{ position: "absolute", bottom: phase.sun.bottom, left: phase.sun.left, width: "50px", height: "50px", borderRadius: "50%", background: sunStyle.bg, boxShadow: sunStyle.glow, filter: "drop-shadow(0 0 14px rgba(255,255,255,0.4))", opacity: phase.sun.opacity, transform: `scale(${phase.sun.scale})`, transition: "all 1.5s cubic-bezier(0.4,0,0.2,1)", pointerEvents: "none", zIndex: 11 }} />
      <div style={{ position: "absolute", bottom: phase.moon.bottom, left: phase.moon.left, width: "36px", height: "36px", borderRadius: "50%", background: "transparent", boxShadow: "-9px 9px 0 0 #fffdeb", filter: "drop-shadow(0 0 18px rgba(255,255,255,0.6))", opacity: phase.moon.opacity, transition: "all 1.5s cubic-bezier(0.4,0,0.2,1)", pointerEvents: "none", zIndex: 11 }} />
      <div style={{ position: "absolute", inset: 0, background: "rgba(4,10,20,0.42)", zIndex: 12, pointerEvents: "none" }} />
    </div>
  );
}

/* ─────────────────────── slideshow ──────────────────────────────────────── */
const SLIDES = [
  {
    icon: (
      <svg width="100" height="100" viewBox="0 0 140 140" fill="none" style={{ filter: "drop-shadow(0 6px 18px rgba(255,255,255,0.2))" }}>
        <circle cx="70" cy="70" r="48" fill="rgba(255,255,255,0.06)" />
        <path d="M70 97l-5-4.6C38 73 22 60.5 22 45.5 22 33.6 31.6 24 43.5 24c6.6 0 12.9 3.1 17 7.9C64.6 27.1 70.9 24 77.5 24 89.4 24 99 33.6 99 45.5c0 15-16 27.5-29.5 47L70 97z" fill="rgba(255,255,255,0.85)" />
        <path d="M48 70 C18 55 10 88 36 96 C46 100 52 84 60 76" fill="rgba(255,255,255,0.5)" />
        <path d="M44 64 C14 44 5 78 30 90 C42 96 48 78 58 70" fill="rgba(255,255,255,0.7)" />
        <path d="M92 70 C122 55 130 88 104 96 C94 100 88 84 80 76" fill="rgba(255,255,255,0.5)" />
        <path d="M96 64 C126 44 135 78 110 90 C98 96 92 78 82 70" fill="rgba(255,255,255,0.7)" />
      </svg>
    ),
    title: "Track your inner calm",
    desc: "View and manage every session without switching screens. Organized, clear, always accessible.",
  },
  {
    icon: (
      <svg width="100" height="100" viewBox="0 0 140 140" fill="none" style={{ filter: "drop-shadow(0 6px 18px rgba(255,255,255,0.2))" }}>
        <circle cx="70" cy="70" r="48" fill="rgba(255,255,255,0.06)" />
        <rect x="28" y="38" width="68" height="38" rx="13" fill="rgba(255,255,255,0.85)" />
        <path d="M42 76 L36 90 L55 76" fill="rgba(255,255,255,0.85)" />
        <rect x="44" y="70" width="68" height="34" rx="13" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
        <path d="M97 104 L103 116 L86 104" fill="rgba(255,255,255,0.15)" />
        <circle cx="47" cy="57" r="4" fill="rgba(0,0,0,0.4)" /><circle cx="62" cy="57" r="4" fill="rgba(0,0,0,0.4)" /><circle cx="77" cy="57" r="4" fill="rgba(0,0,0,0.4)" />
      </svg>
    ),
    title: "AI-powered care support",
    desc: "Our assistant is available 24×7 to answer postpartum questions and connect you to expert doctors.",
  },
  {
    icon: (
      <svg width="100" height="100" viewBox="0 0 140 140" fill="none" style={{ filter: "drop-shadow(0 6px 18px rgba(255,255,255,0.2))" }}>
        <circle cx="70" cy="70" r="48" fill="rgba(255,255,255,0.06)" />
        <rect x="28" y="42" width="84" height="66" rx="14" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
        <rect x="28" y="42" width="84" height="27" rx="14" fill="rgba(255,255,255,0.8)" />
        <rect x="50" y="38" width="6" height="13" rx="3" fill="rgba(255,255,255,0.9)" /><rect x="84" y="38" width="6" height="13" rx="3" fill="rgba(255,255,255,0.9)" />
        <circle cx="46" cy="86" r="4" fill="rgba(255,255,255,0.7)" /><circle cx="62" cy="86" r="4" fill="rgba(255,255,255,0.7)" />
        <circle cx="78" cy="86" r="4" fill="rgba(255,255,255,0.3)" /><circle cx="94" cy="86" r="4" fill="rgba(255,255,255,0.3)" />
        <circle cx="46" cy="102" r="4" fill="rgba(255,255,255,0.3)" /><circle cx="62" cy="102" r="4" fill="rgba(255,255,255,0.5)" />
      </svg>
    ),
    title: "Book sessions effortlessly",
    desc: "Schedule appointments with certified therapists in Kerala. Your care journey, managed in one place.",
  },
];

/* ─────────────────────── right panel ───────────────────────────────────── */
function RightPanel() {
  const [slide, setSlide] = useState(0);
  const [fading, setFading] = useState(false);
  function goTo(idx: number) { if (idx === slide) return; setFading(true); setTimeout(() => { setSlide(idx); setFading(false); }, 240); }
  useEffect(() => {
    const t = setInterval(() => { setFading(true); setTimeout(() => { setSlide((s) => (s + 1) % SLIDES.length); setFading(false); }, 240); }, 4500);
    return () => clearInterval(t);
  }, []);
  const current = SLIDES[slide];
  return (
    <div className="login-feature-card" style={{ flex: 1, background: "rgba(8,16,30,0.85)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderRadius: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "36px 32px 28px", color: "white", boxSizing: "border-box", position: "relative", overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)" }}>
      <div style={{ position: "absolute", top: "-50px", right: "-50px", width: "180px", height: "180px", borderRadius: "50%", background: "radial-gradient(circle,rgba(255,255,255,0.04),transparent 70%)", pointerEvents: "none" }} />

      {/* Brand */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", position: "relative", zIndex: 2 }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" fill="none" />
          <path d="M12 8v8M9 12h6" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span style={{ fontSize: "1.3rem", fontWeight: 700, letterSpacing: "-0.01em", color: "rgba(255,255,255,0.9)" }}>Nalora</span>
      </div>

      {/* Slide */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "18px", flex: 1, justifyContent: "center", padding: "16px 0", opacity: fading ? 0 : 1, transform: fading ? "translateY(8px)" : "translateY(0)", transition: "opacity 0.24s ease,transform 0.24s ease", position: "relative", zIndex: 2 }}>
        <div>{current.icon}</div>
        <div>
          <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "white", margin: "0 0 10px 0", lineHeight: 1.3, letterSpacing: "-0.01em" }}>{current.title}</h2>
          <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.55)", margin: 0, lineHeight: 1.65, maxWidth: "280px" }}>{current.desc}</p>
        </div>
      </div>

      {/* Nav */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", position: "relative", zIndex: 2 }}>
        <button onClick={() => goTo((slide - 1 + SLIDES.length) % SLIDES.length)} aria-label="Prev"
          style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.6)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "background 0.2s" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.14)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <div style={{ display: "flex", gap: "6px" }}>
          {SLIDES.map((_, i) => <button key={i} onClick={() => goTo(i)} style={{ width: i === slide ? "20px" : "7px", height: "7px", borderRadius: "4px", background: i === slide ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.25)", border: "none", cursor: "pointer", padding: 0, transition: "width 0.3s ease,background 0.3s ease" }} />)}
        </div>
        <button onClick={() => goTo((slide + 1) % SLIDES.length)} aria-label="Next"
          style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.6)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "background 0.2s" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.14)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────── login page ─────────────────────────────────────── */
function LoginPage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [currentRealHour, setCurrentRealHour] = useState<number>(12);

  const getIndianDecimalHour = () => {
    const now = new Date();
    const ist = new Date(now.getTime() + 5.5 * 60 * 60 * 1000);
    return ist.getUTCHours() + ist.getUTCMinutes() / 60 + ist.getUTCSeconds() / 3600;
  };

  useEffect(() => {
    setCurrentRealHour(getIndianDecimalHour());
    const iv = setInterval(() => setCurrentRealHour(getIndianDecimalHour()), 1000);
    return () => clearInterval(iv);
  }, []);

  const [isDoctor, setIsDoctor] = useState(false);
  const [mode, setMode] = useState<"email" | "phone">("email");
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => { if (user) navigate({ to: "/" }); }, [user, navigate]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (!credential.trim()) { setError(isDoctor ? "Please enter your doctor email." : mode === "email" ? "Please enter your email." : "Please enter your phone number."); return; }
    if (!password.trim()) { setError("Please enter your password."); return; }
    setLoading(true);
    const res = await login(credential.trim(), password, isDoctor);
    setLoading(false);
    if (res.ok) navigate({ to: "/" });
    else setError(res.error ?? "Login failed. Please try again.");
  }

  const isEmail = mode === "email";

  return (
    <div style={{ minHeight: "100vh", position: "relative", overflow: "hidden", background: "#080318", fontFamily: "'Outfit','Inter',sans-serif" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes twinkle{0%,100%{opacity:.15;transform:scale(.8)}50%{opacity:1;transform:scale(1.2)}}
        .lstar{animation:twinkle 3.5s infinite ease-in-out;}
        @keyframes spin{to{transform:rotate(360deg)}}
        input::placeholder{color:rgba(255,255,255,.28)!important}
        @media(max-width:820px){.login-feature-card{display:none!important}}
      `}} />

      <SkyBackground hour={currentRealHour} />

      {/* Back to home */}
      <div style={{ position: "fixed", top: "20px", left: "20px", zIndex: 30 }}>
        <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "8px 16px", borderRadius: "99px", background: "rgba(6,14,26,0.6)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.8)", textDecoration: "none", fontSize: "0.82rem", fontWeight: 600, transition: "all 0.2s" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.12)"; (e.currentTarget as HTMLElement).style.color = "white"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(6,14,26,0.6)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.8)"; }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
          Back to Home
        </Link>
      </div>

      <div style={{ position: "relative", zIndex: 20, minHeight: "100vh", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "32px 16px", boxSizing: "border-box" }}>
        <div style={{ width: "100%", maxWidth: "860px", margin: "0 auto", background: "rgba(6,14,26,0.72)", backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)", borderRadius: "28px", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 28px 70px rgba(0,0,0,0.55),inset 0 1px 0 rgba(255,255,255,0.05)", display: "flex", flexDirection: "row", overflow: "hidden", padding: "14px", gap: "14px", minHeight: "580px" }}>

          {/* Left: Form */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "22px 28px", boxSizing: "border-box" }}>
            {/* Logo + toggle */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Link to="/" style={{ display: "flex", alignItems: "center", gap: "7px", textDecoration: "none", color: "white", fontWeight: 700, fontSize: "1.2rem" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="rgba(255,255,255,0.85)" />
                  <path d="M12 7v10M7 12h10" stroke="rgba(0,0,0,0.5)" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span>Nalora</span>
              </Link>
              <button onClick={() => { setIsDoctor(!isDoctor); setCredential(""); setError(""); }}
                style={{ padding: "5px 12px", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.8)", fontSize: "0.76rem", fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.14)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; }}>
                {isDoctor ? "Patient Login" : "Doctor Login"}
              </button>
            </div>

            {/* Form */}
            <div style={{ margin: "auto 0", padding: "16px 0" }}>
              <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "white", margin: "0 0 6px 0", letterSpacing: "-0.02em" }}>Welcome Back !</h1>
              <p style={{ color: "rgba(255,255,255,0.42)", fontSize: "0.88rem", margin: "0 0 26px 0" }}>
                Enter your credentials to login as {isDoctor ? "Doctor" : "Patient"}
              </p>

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {!isDoctor && (
                  <div style={{ display: "flex", background: "rgba(255,255,255,0.04)", borderRadius: "14px", padding: "3px", border: "1px solid rgba(255,255,255,0.07)", marginBottom: "2px" }}>
                    {(["email", "phone"] as const).map((m) => (
                      <button key={m} type="button" onClick={() => { setMode(m); setCredential(""); setError(""); }}
                        style={{ flex: 1, padding: "8px", borderRadius: "12px", border: "none", cursor: "pointer", background: mode === m ? "rgba(255,255,255,0.12)" : "transparent", color: mode === m ? "white" : "rgba(255,255,255,0.38)", fontWeight: mode === m ? 600 : 400, fontSize: "0.82rem", transition: "all 0.2s", fontFamily: "inherit" }}>
                        {m === "email" ? "📧 Email" : "📱 Phone"}
                      </button>
                    ))}
                  </div>
                )}

                <input id="credential" type={isDoctor || isEmail ? "email" : "tel"} value={credential}
                  onChange={(e) => { setCredential(e.target.value); setError(""); }}
                  placeholder={isDoctor ? "Doctor Email" : isEmail ? "Email Address" : "Phone Number"}
                  autoComplete={isDoctor || isEmail ? "email" : "tel"}
                  style={{ width: "100%", padding: "13px 18px", borderRadius: "20px", border: `1px solid ${error ? "#f87171" : "rgba(255,255,255,0.1)"}`, background: "rgba(255,255,255,0.06)", fontSize: "0.9rem", color: "white", outline: "none", boxSizing: "border-box", transition: "all 0.2s", fontFamily: "inherit" }}
                  onFocus={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.4)"; e.target.style.background = "rgba(255,255,255,0.09)"; e.target.style.boxShadow = "0 0 0 3px rgba(255,255,255,0.05)"; }}
                  onBlur={(e) => { e.target.style.borderColor = error ? "#f87171" : "rgba(255,255,255,0.1)"; e.target.style.background = "rgba(255,255,255,0.06)"; e.target.style.boxShadow = "none"; }} />

                <div style={{ position: "relative" }}>
                  <input id="password" type={showPw ? "text" : "password"} value={password}
                    onChange={(e) => setPassword(e.target.value)} placeholder="Password" autoComplete="current-password"
                    style={{ width: "100%", padding: "13px 46px 13px 18px", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.06)", fontSize: "0.9rem", color: "white", outline: "none", boxSizing: "border-box", transition: "all 0.2s", fontFamily: "inherit" }}
                    onFocus={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.4)"; e.target.style.background = "rgba(255,255,255,0.09)"; e.target.style.boxShadow = "0 0 0 3px rgba(255,255,255,0.05)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.background = "rgba(255,255,255,0.06)"; e.target.style.boxShadow = "none"; }} />
                  <button type="button" onClick={() => setShowPw((v) => !v)}
                    style={{ position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.38)", padding: "2px", display: "flex" }}>
                    {showPw
                      ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                      : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>}
                  </button>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <a href="#" style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.4)", textDecoration: "none", fontWeight: 500 }}>Forget password?</a>
                </div>

                {error && (
                  <div style={{ color: "#f87171", fontSize: "0.82rem", display: "flex", alignItems: "center", gap: "6px", padding: "0 2px" }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                    {error}
                  </div>
                )}

                <button id="login-submit-btn" type="submit" disabled={loading}
                  style={{ width: "100%", padding: "13px", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.15)", background: loading ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.12)", color: loading ? "rgba(255,255,255,0.38)" : "white", fontWeight: 700, fontSize: "0.95rem", cursor: loading ? "not-allowed" : "pointer", boxShadow: loading ? "none" : "0 4px 16px rgba(0,0,0,0.3)", transition: "transform 0.18s,box-shadow 0.18s,background 0.18s", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontFamily: "inherit", letterSpacing: "0.02em" } as React.CSSProperties}
                  onMouseEnter={(e) => { if (!loading) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.18)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = loading ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.12)"; }}
                  onMouseDown={(e) => { if (!loading) e.currentTarget.style.transform = "scale(0.98)"; }}
                  onMouseUp={(e) => { e.currentTarget.style.transform = "scale(1)"; }}>
                  {loading ? <><span style={{ width: "16px", height: "16px", borderRadius: "50%", border: "2px solid rgba(255,255,255,0.18)", borderTopColor: "white", animation: "spin 0.7s linear infinite", display: "block" }} />Signing in...</> : "Sign in"}
                </button>
              </form>
            </div>

            {/* Footer — hidden for doctor login */}
            {!isDoctor && (
              <div style={{ textAlign: "center", fontSize: "0.84rem", color: "rgba(255,255,255,0.32)" }}>
                Don't have an account?{" "}
                <Link to="/create-account" style={{ color: "rgba(255,255,255,0.75)", fontWeight: 700, textDecoration: "none" }}>Sign Up</Link>
              </div>
            )}
          </div>

          <RightPanel />
        </div>
      </div>
    </div>
  );
}
