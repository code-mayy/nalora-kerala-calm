import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, type FormEvent } from "react";
import { DarkNav } from "@/components/DarkNav";

import morningBg from "@/assets/image copy.png";
import afternoonBg from "@/assets/image copy 3.png";
import eveningBg from "@/assets/hero.png";
import nightBg from "@/assets/image copy 2.png";
import cloud1 from "@/assets/IMG_20260626_215755.png";
import cloud2 from "@/assets/IMG_20260626_215815.png";
import cloud3 from "@/assets/IMG_20260626_215818.png";
import cloud4 from "@/assets/IMG_20260626_215821.png";
import cloud5 from "@/assets/IMG_20260626_215824.png";

const CLOUDS_CONFIG = [
  { id: 1, img: cloud1, width: "320px", height: "85px", top: "10%", duration: "75s", delay: "0s", opacity: 0.7 },
  { id: 2, img: cloud2, width: "380px", height: "100px", top: "30%", duration: "95s", delay: "-25s", opacity: 0.7 },
  { id: 3, img: cloud3, width: "260px", height: "80px", top: "8%", duration: "115s", delay: "-55s", opacity: 0.65 },
  { id: 4, img: cloud4, width: "350px", height: "90px", top: "48%", duration: "60s", delay: "-15s", opacity: 0.65 },
  { id: 5, img: cloud5, width: "300px", height: "85px", top: "22%", duration: "100s", delay: "-40s", opacity: 0.7 },
];

export const Route = createFileRoute("/create-account")({
  head: () => ({
    meta: [
      { title: "Create Account – Nalora" },
      { name: "description", content: "Join Nalora and begin your postpartum care journey. Create your personal account in minutes." },
    ],
  }),
  component: CreateAccount,
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
  { top: "16%", left: "18%", size: 2, delay: "0.9s" },
  { top: "5%", left: "40%", size: 1, delay: "2.3s" },
  { top: "20%", left: "50%", size: 2.5, delay: "1.5s" },
  { top: "14%", left: "76%", size: 1.5, delay: "0.7s" },
  { top: "32%", left: "25%", size: 2, delay: "3.1s" },
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

/* ─────────────────────── sky background ─────────────────────────────────── */
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
        {STATIC_STARS.map((s, i) => <div key={i} className="sstar" style={{ position: "absolute", top: s.top, left: s.left, width: `${s.size}px`, height: `${s.size}px`, borderRadius: "50%", background: "#fff", boxShadow: "0 0 6px 1.5px rgba(255,255,255,0.8)", animationDelay: s.delay }} />)}
      </div>
      <div style={{ position: "absolute", bottom: phase.sun.bottom, left: phase.sun.left, width: "50px", height: "50px", borderRadius: "50%", background: sunStyle.bg, boxShadow: sunStyle.glow, filter: "drop-shadow(0 0 14px rgba(255,255,255,0.4))", opacity: phase.sun.opacity, transform: `scale(${phase.sun.scale})`, transition: "all 1.5s cubic-bezier(0.4,0,0.2,1)", pointerEvents: "none", zIndex: 11 }} />
      <div style={{ position: "absolute", bottom: phase.moon.bottom, left: phase.moon.left, width: "36px", height: "36px", borderRadius: "50%", background: "transparent", boxShadow: "-9px 9px 0 0 #fffdeb", filter: "drop-shadow(0 0 18px rgba(255,255,255,0.6))", opacity: phase.moon.opacity, transition: "all 1.5s cubic-bezier(0.4,0,0.2,1)", pointerEvents: "none", zIndex: 11 }} />
      
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
            zIndex: 12,
          }}
        />
      ))}

      <div style={{ position: "absolute", inset: 0, background: "rgba(4,10,20,0.42)", zIndex: 13, pointerEvents: "none" }} />
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
        <path d="M44 64 C14 44 5 78 30 90 C42 96 48 78 58 70" fill="white" />
        <path d="M92 70 C122 55 130 88 104 96 C94 100 88 84 80 76" fill="rgba(255,255,255,0.5)" />
        <path d="M96 64 C126 44 135 78 110 90 C98 96 92 78 82 70" fill="white" />
      </svg>
    ),
    title: "A warm community awaits",
    desc: "Join thousands of mothers who found calm, care, and connection through Nalora's Kerala-rooted support network.",
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
    desc: "Schedule with certified therapists in Kerala. Your care journey, managed in one place.",
  },
];

function RightPanel() {
  const [slide, setSlide] = useState(0);
  const [fading, setFading] = useState(false);
  function goTo(idx: number) { if (idx === slide) return; setFading(true); setTimeout(() => { setSlide(idx); setFading(false); }, 240); }
  useEffect(() => { const t = setInterval(() => { setFading(true); setTimeout(() => { setSlide((s) => (s + 1) % SLIDES.length); setFading(false); }, 240); }, 4500); return () => clearInterval(t); }, []);
  const current = SLIDES[slide];
  return (
    <div className="signup-feature-card" style={{ flex: 1, background: "rgba(18, 20, 28, 0.18)", backdropFilter: "blur(48px) saturate(180%)", WebkitBackdropFilter: "blur(48px) saturate(180%)", borderRadius: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "36px 32px 28px", color: "white", boxSizing: "border-box", position: "relative", overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)" }}>
      <div style={{ position: "absolute", top: "-50px", right: "-50px", width: "180px", height: "180px", borderRadius: "50%", background: "radial-gradient(circle,rgba(255,255,255,0.04),transparent 70%)", pointerEvents: "none" }} />
      <div style={{ display: "flex", alignItems: "center", gap: "8px", position: "relative", zIndex: 2 }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" fill="none" /><path d="M12 8v8M9 12h6" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" /></svg>
        <span style={{ fontSize: "1.3rem", fontWeight: 700, letterSpacing: "-0.01em", color: "rgba(255,255,255,0.9)" }}>Nalora</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "18px", flex: 1, justifyContent: "center", padding: "16px 0", opacity: fading ? 0 : 1, transform: fading ? "translateY(8px)" : "translateY(0)", transition: "opacity 0.24s ease,transform 0.24s ease", position: "relative", zIndex: 2 }}>
        <div>{current.icon}</div>
        <div>
          <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "white", margin: "0 0 10px 0", lineHeight: 1.3, letterSpacing: "-0.01em" }}>{current.title}</h2>
          <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.55)", margin: 0, lineHeight: 1.65, maxWidth: "280px" }}>{current.desc}</p>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", position: "relative", zIndex: 2 }}>
        <button onClick={() => goTo((slide - 1 + SLIDES.length) % SLIDES.length)} style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.6)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "background 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.14)")} onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <div style={{ display: "flex", gap: "6px" }}>
          {SLIDES.map((_, i) => <button key={i} onClick={() => goTo(i)} style={{ width: i === slide ? "20px" : "7px", height: "7px", borderRadius: "4px", background: i === slide ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.25)", border: "none", cursor: "pointer", padding: 0, transition: "width 0.3s ease,background 0.3s ease" }} />)}
        </div>
        <button onClick={() => goTo((slide + 1) % SLIDES.length)} style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.6)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "background 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.14)")} onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────── form types ─────────────────────────────────────── */
type FormData = { name: string; email: string; phone: string; gender: string; bystanderName: string; bystanderPhone: string; address: string; age: string; };
const INITIAL: FormData = { name: "", email: "", phone: "", gender: "", bystanderName: "", bystanderPhone: "", address: "", age: "" };

function InputField({ label, id, type = "text", value, onChange, placeholder, required = false }: { label: string; id: string; type?: string; value: string; onChange: (v: string) => void; placeholder?: string; required?: boolean; }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      <label htmlFor={id} style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.05em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>
        {label}{required && <span style={{ color: "rgba(255,255,255,0.6)", marginLeft: "3px" }}>*</span>}
      </label>
      <input id={id} type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} required={required}
        style={{ width: "100%", padding: "12px 16px", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.06)", fontSize: "0.88rem", color: "white", outline: "none", transition: "all 0.2s", boxSizing: "border-box", fontFamily: "inherit" }}
        onFocus={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.4)"; e.target.style.background = "rgba(255,255,255,0.09)"; e.target.style.boxShadow = "0 0 0 3px rgba(255,255,255,0.05)"; }}
        onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.background = "rgba(255,255,255,0.06)"; e.target.style.boxShadow = "none"; }} />
    </div>
  );
}

function Step1({ data, update }: { data: FormData; update: (k: keyof FormData, v: string) => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div>
        <h2 style={{ fontSize: "1.55rem", fontWeight: 700, color: "white", margin: "0 0 5px 0", letterSpacing: "-0.02em" }}>About You</h2>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.88rem", margin: 0 }}>Let's start with your basic details.</p>
      </div>
      <InputField label="Full Name" id="name" value={data.name} onChange={(v) => update("name", v)} placeholder="e.g. Anjali Menon" required />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        <InputField label="Email" id="email" type="email" value={data.email} onChange={(v) => update("email", v)} placeholder="you@email.com" required />
        <InputField label="Phone" id="phone" type="tel" value={data.phone} onChange={(v) => update("phone", v)} placeholder="+91 98765 43210" required />
      </div>
    </div>
  );
}

function Step2({ data, update }: { data: FormData; update: (k: keyof FormData, v: string) => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div>
        <h2 style={{ fontSize: "1.55rem", fontWeight: 700, color: "white", margin: "0 0 5px 0", letterSpacing: "-0.02em" }}>Personal Details</h2>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.88rem", margin: 0 }}>Help us personalise your care experience.</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
        <label style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.05em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>Gender <span style={{ color: "rgba(255,255,255,0.6)" }}>*</span></label>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {["Female", "Male", "Non-binary", "Prefer not to say"].map((g) => (
            <button key={g} type="button" onClick={() => update("gender", g)} style={{ padding: "8px 16px", borderRadius: "99px", border: "1px solid", borderColor: data.gender === g ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.12)", background: data.gender === g ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.04)", color: data.gender === g ? "white" : "rgba(255,255,255,0.45)", fontWeight: 500, fontSize: "0.84rem", cursor: "pointer", transition: "all 0.2s", fontFamily: "inherit" }}>{g}</button>
          ))}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        <InputField label="Age" id="age" type="number" value={data.age} onChange={(v) => update("age", v)} placeholder="e.g. 28" required />
        <InputField label="Home Address" id="address" value={data.address} onChange={(v) => update("address", v)} placeholder="City, Kerala" required />
      </div>
    </div>
  );
}

function Step3({ data, update }: { data: FormData; update: (k: keyof FormData, v: string) => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div>
        <h2 style={{ fontSize: "1.55rem", fontWeight: 700, color: "white", margin: "0 0 5px 0", letterSpacing: "-0.02em" }}>Emergency Contact</h2>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.88rem", margin: 0 }}>A trusted person we can reach when you need extra support.</p>
      </div>
      <div style={{ padding: "12px 16px", borderRadius: "14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", fontSize: "0.84rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>
        💛 A bystander can be your partner, parent, or close friend — someone who will journey alongside you.
      </div>
      <InputField label="Bystander's Name" id="bystanderName" value={data.bystanderName} onChange={(v) => update("bystanderName", v)} placeholder="e.g. Rahul Menon" required />
      <InputField label="Bystander's Phone" id="bystanderPhone" type="tel" value={data.bystanderPhone} onChange={(v) => update("bystanderPhone", v)} placeholder="+91 98765 43210" required />
    </div>
  );
}

function SuccessScreen() {
  return (
    <div style={{ textAlign: "center", padding: "30px 16px" }}>
      <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", boxShadow: "0 8px 32px rgba(0,0,0,0.2)", animation: "cpop 0.4s ease" }}>
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: "auto" }}><polyline points="20 6 9 17 4 12" /></svg>
      </div>
      <h2 style={{ fontSize: "1.8rem", fontWeight: 700, color: "white", marginBottom: "10px", letterSpacing: "-0.02em" }}>Welcome to Nalora 🌸</h2>
      <p style={{ color: "rgba(255,255,255,0.42)", fontSize: "0.92rem", maxWidth: "320px", margin: "0 auto 28px", lineHeight: 1.7 }}>Your account has been created. You're now part of a caring community built just for you.</p>
      <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 28px", borderRadius: "20px", background: "rgba(255,255,255,0.12)", color: "white", fontWeight: 600, fontSize: "0.92rem", textDecoration: "none", border: "1px solid rgba(255,255,255,0.2)", boxShadow: "0 8px 24px rgba(0,0,0,0.35)", transition: "transform 0.2s" }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.transform = "translateY(-2px)")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.transform = "translateY(0)")}>
        Go to Home
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
      </Link>
    </div>
  );
}

/* ─────────────────────── main component ─────────────────────────────────── */
function CreateAccount() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(INITIAL);
  const [done, setDone] = useState(false);
  const [currentRealHour, setCurrentRealHour] = useState<number>(12);
  const TOTAL = 3;

  const getIndianDecimalHour = () => { const now = new Date(); const ist = new Date(now.getTime() + 5.5 * 60 * 60 * 1000); return ist.getUTCHours() + ist.getUTCMinutes() / 60 + ist.getUTCSeconds() / 3600; };
  useEffect(() => { setCurrentRealHour(getIndianDecimalHour()); const iv = setInterval(() => setCurrentRealHour(getIndianDecimalHour()), 1000); return () => clearInterval(iv); }, []);

  function update(key: keyof FormData, value: string) { setData((p) => ({ ...p, [key]: value })); }
  function next(e: FormEvent) { e.preventDefault(); if (step < TOTAL - 1) setStep((s) => s + 1); else setDone(true); }
  function back() { setStep((s) => Math.max(0, s - 1)); }

  const LABELS = ["Basic Info", "Personal Details", "Emergency Contact"];

  return (
    <div style={{ minHeight: "100vh", position: "relative", overflow: "hidden", background: "#080318", fontFamily: "'Outfit','Inter',sans-serif" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes twinkle{0%,100%{opacity:.15;transform:scale(.8)}50%{opacity:1;transform:scale(1.2)}}
        .sstar{animation:twinkle 3.5s infinite ease-in-out;}
        @keyframes cslide{from{opacity:0;transform:translateX(14px)}to{opacity:1;transform:translateX(0)}}
        @keyframes cpop{0%{transform:scale(.5);opacity:0}70%{transform:scale(1.1)}100%{transform:scale(1);opacity:1}}
        input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none}
        input::placeholder{color:rgba(255,255,255,.25)!important}
        @media(max-width:820px){.signup-feature-card{display:none!important}}
        @keyframes slideCloud {
          0% { transform: translate3d(-350px, 0, 0); }
          100% { transform: translate3d(100vw, 0, 0); }
        }
        .cloud-slide {
          animation: slideCloud infinite linear;
        }
      `}} />

      <SkyBackground hour={currentRealHour} />

      <DarkNav />

      <div style={{ position: "relative", zIndex: 20, minHeight: "100vh", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "32px 16px", boxSizing: "border-box" }}>
        <div style={{ width: "100%", maxWidth: "860px", margin: "0 auto", background: "rgba(18, 20, 28, 0.24)", backdropFilter: "blur(48px) saturate(180%)", WebkitBackdropFilter: "blur(48px) saturate(180%)", borderRadius: "28px", border: "1px solid rgba(255, 255, 255, 0.12)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.07), 0 24px 60px rgba(0,0,0,0.45)", display: "flex", flexDirection: "row", overflow: "hidden", padding: "14px", gap: "14px", minHeight: "580px" }}>

          {/* Left: Form */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "22px 28px", boxSizing: "border-box" }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <Link to="/" style={{ display: "flex", alignItems: "center", gap: "7px", textDecoration: "none", color: "white", fontWeight: 700, fontSize: "1.2rem" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="rgba(255,255,255,0.85)" />
                  <path d="M12 7v10M7 12h10" stroke="rgba(0,0,0,0.5)" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span>Nalora</span>
              </Link>
              {!done && (
                <span style={{ padding: "4px 12px", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.22)", background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.85)", fontSize: "0.74rem", fontWeight: 600 }}>
                  Step {step + 1} / {TOTAL}
                </span>
              )}
            </div>

            {/* Progress */}
            {!done && (
              <div style={{ marginBottom: "22px" }}>
                <div style={{ display: "flex", marginBottom: "10px" }}>
                  {LABELS.map((label, i) => (
                    <span key={label} style={{ flex: 1, fontSize: "0.7rem", fontWeight: 600, textAlign: "center", color: i === step ? "white" : i < step ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.22)", letterSpacing: "0.03em", transition: "color 0.2s" }}>{label}</span>
                  ))}
                </div>
                <div style={{ height: "2.5px", background: "rgba(255,255,255,0.08)", borderRadius: "2px" }}>
                  <div style={{ height: "100%", width: `${((step + 1) / TOTAL) * 100}%`, background: "rgba(255,255,255,0.8)", transition: "width 0.4s ease", borderRadius: "2px" }} />
                </div>
              </div>
            )}

            {/* Content */}
            <div style={{ flex: 1, overflowY: "auto" }}>
              {done ? (
                <SuccessScreen />
              ) : (
                <form onSubmit={next} noValidate>
                  <div key={step} style={{ animation: "cslide 0.3s ease" }}>
                    {step === 0 && <Step1 data={data} update={update} />}
                    {step === 1 && <Step2 data={data} update={update} />}
                    {step === 2 && <Step3 data={data} update={update} />}
                  </div>

                  <div style={{ display: "flex", gap: "10px", marginTop: "22px" }}>
                    {step > 0 && (
                      <button type="button" onClick={back} style={{ flex: "0 0 auto", padding: "12px 20px", borderRadius: "18px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.5)", fontWeight: 600, fontSize: "0.88rem", cursor: "pointer", transition: "all 0.2s", fontFamily: "inherit" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.35)"; (e.currentTarget as HTMLElement).style.color = "white"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)"; }}>
                        Back
                      </button>
                    )}
                    <button type="submit" style={{ flex: 1, padding: "12px 20px", borderRadius: "18px", border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.12)", color: "white", fontWeight: 700, fontSize: "0.92rem", cursor: "pointer", boxShadow: "0 6px 20px rgba(0,0,0,0.3)", transition: "transform 0.18s,box-shadow 0.18s,background 0.18s", letterSpacing: "0.02em", fontFamily: "inherit" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.18)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 10px 28px rgba(0,0,0,0.4)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.12)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 20px rgba(0,0,0,0.3)"; }}>
                      {step < TOTAL - 1 ? "Continue →" : "Create My Account"}
                    </button>
                  </div>

                  {step === 0 && (
                    <p style={{ textAlign: "center", marginTop: "16px", fontSize: "0.82rem", color: "rgba(255,255,255,0.32)" }}>
                      Already have an account?{" "}
                      <Link to="/login" style={{ color: "white", fontWeight: 600, textDecoration: "none" }}>Sign in</Link>
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>

          <RightPanel />
        </div>
      </div>
    </div>
  );
}
