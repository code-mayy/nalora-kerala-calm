import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type MouseEvent } from "react";

import blobRose from "@/assets/blob-rose.png";
import motherBaby from "@/assets/mother-baby.png";
import keralaArch from "@/assets/kerala-architecture.jpg";
import therapist1 from "@/assets/therapist-1.jpg";
import therapist2 from "@/assets/therapist-2.jpg";
import therapist3 from "@/assets/therapist-3.jpg";

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
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[var(--ivory-deep)]/95 backdrop-blur-md border-b border-border/60"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10">
        <a href="#" className="flex items-center gap-2">
          <span
            className={`grid h-9 w-9 place-items-center rounded-full font-display text-lg transition ${
              scrolled ? "bg-[var(--gradient-sunset)] text-white" : "border-2 border-white/80 text-white"
            }`}
          >
            n
          </span>
          <span
            className={`font-display text-2xl tracking-tight transition ${
              scrolled ? "text-foreground" : "text-white"
            }`}
          >
            nalora
          </span>
        </a>
        <nav
          className={`hidden md:flex items-center gap-9 text-[15px] font-medium transition ${
            scrolled ? "text-foreground/80" : "text-white/90"
          }`}
        >
          <a href="#story" className="hover:opacity-70 transition">About Us</a>
          <a href="#care" className="hover:opacity-70 transition">Services</a>
          <a href="#family" className="hover:opacity-70 transition">Family</a>
          <a href="#journey" className="hover:opacity-70 transition">Journey</a>
          <a href="#therapists" className="hover:opacity-70 transition">Therapists</a>
        </nav>
        <div className="hidden sm:flex items-center gap-3">
          <Link
            to="/login"
            className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition hover:-translate-y-0.5 ${
              scrolled
                ? "border-[var(--rose)] text-[var(--rose)] hover:bg-[var(--rose)]/10"
                : "border-white/80 text-white hover:bg-white/10"
            }`}
          >
            Login
          </Link>
          <Link
            to="/book-session"
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition ${
              scrolled
                ? "bg-[var(--gradient-sunset)] text-white shadow-soft hover:-translate-y-0.5"
                : "bg-white/95 text-foreground hover:bg-white"
            }`}
          >
            Book a Session
          </Link>
        </div>
      </div>
    </header>
  );
}

/* ---------- Time-of-day helpers ---------- */
type SkyPhase = {
  label: string;
  sky: string;
  body: "sun" | "moon";
  bodyColor: string;
  bodyGlow: string;
  hillColor: string;
  palmColor: string;
  starOpacity: number;
};

function getSkyPhase(hour: number): SkyPhase {
  // Dawn 5-8
  if (hour >= 5 && hour < 8)
    return {
      label: "Dawn",
      sky: "linear-gradient(180deg, #2B1B4A 0%, #6B4A7A 30%, #E8A87C 65%, #F8C9A6 100%)",
      body: "sun",
      bodyColor: "#FFE4B0",
      bodyGlow: "#FFD089",
      hillColor: "#3A2452",
      palmColor: "#1F1138",
      starOpacity: 0.25,
    };
  // Morning 8-12
  if (hour >= 8 && hour < 12)
    return {
      label: "Morning",
      sky: "linear-gradient(180deg, #7BB8E0 0%, #A8D3ED 50%, #DCEEF8 100%)",
      body: "sun",
      bodyColor: "#FFF3B0",
      bodyGlow: "#FFE680",
      hillColor: "#4A6B8A",
      palmColor: "#2A3D55",
      starOpacity: 0,
    };
  // Midday 12-16
  if (hour >= 12 && hour < 16)
    return {
      label: "Afternoon",
      sky: "linear-gradient(180deg, #4A9FD6 0%, #8FC4E5 60%, #D6EBF5 100%)",
      body: "sun",
      bodyColor: "#FFFCE0",
      bodyGlow: "#FFEC8C",
      hillColor: "#3A5878",
      palmColor: "#1F344A",
      starOpacity: 0,
    };
  // Dusk 16-19
  if (hour >= 16 && hour < 19)
    return {
      label: "Sunset",
      sky: "linear-gradient(180deg, #5B3A7A 0%, #C56B7D 40%, #E89A6C 75%, #F4C28A 100%)",
      body: "sun",
      bodyColor: "#FFB87A",
      bodyGlow: "#FF8E5A",
      hillColor: "#2E1A48",
      palmColor: "#150A28",
      starOpacity: 0.4,
    };
  // Evening 19-22
  if (hour >= 19 && hour < 22)
    return {
      label: "Evening",
      sky: "linear-gradient(180deg, #0F0930 0%, #2A1B5C 45%, #5B3A7A 80%, #8B5A8C 100%)",
      body: "moon",
      bodyColor: "#FFF4D6",
      bodyGlow: "#FFE9B0",
      hillColor: "#1F1244",
      palmColor: "#0B0625",
      starOpacity: 0.85,
    };
  // Night 22-5
  return {
    label: "Night",
    sky: "linear-gradient(180deg, #050118 0%, #120840 50%, #2A1B5C 100%)",
    body: "moon",
    bodyColor: "#F5F0DC",
    bodyGlow: "#E8DCB4",
    hillColor: "#120730",
    palmColor: "#03010F",
    starOpacity: 1,
  };
}

function getBodyArcPosition(hour: number, minute: number) {
  const h = hour + minute / 60;
  // Sun arc: 6 -> 18; Moon arc: 18 -> 30 (=6 next day)
  const isDay = h >= 6 && h < 18;
  const t = isDay ? (h - 6) / 12 : ((h < 6 ? h + 24 : h) - 18) / 12;
  // x: 5% -> 95%; y: arc from 75% to 12% peak back to 75%
  const x = 5 + t * 90;
  const y = 75 - Math.sin(t * Math.PI) * 63;
  return { x, y, isDay };
}

/* ---------- Hero (time-aware sky + parallax) ---------- */
function Hero() {
  const [m, setM] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const onScroll = () => setScrollY(window.scrollY);
    const onMove = (e: globalThis.MouseEvent) => {
      setM({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    const tick = setInterval(() => setNow(new Date()), 30_000);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
      clearInterval(tick);
    };
  }, []);

  const defaultDate = new Date("2026-06-25T12:00:00");
  const currentNow = now || defaultDate;
  const hour = currentNow.getHours();
  const minute = currentNow.getMinutes();
  const phase = getSkyPhase(hour);
  const arc = getBodyArcPosition(hour, minute);
  const timeLabel = now ? now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) : "";

  return (
    <section className="relative overflow-hidden">
      {/* Layer 1 â€” sky gradient (transitions across the day) */}
      <div
        className="absolute inset-0 transition-[background] duration-[2000ms]"
        style={{
          background: phase.sky,
          transform: `translateY(${scrollY * 0.05}px)`,
        }}
        aria-hidden
      />

      {/* Layer 2 â€” stars (fade out during day) */}
      <div
        className="absolute inset-0 transition-opacity duration-[2000ms]"
        style={{ transform: `translateY(${scrollY * 0.15}px)`, opacity: phase.starOpacity }}
        aria-hidden
      >
        {Array.from({ length: 50 }).map((_, i) => {
          const top = (i * 37) % 65;
          const left = (i * 53) % 100;
          const size = (i % 3) + 1;
          return (
            <span
              key={i}
              className="absolute rounded-full bg-white animate-pulse"
              style={{
                top: `${top}%`,
                left: `${left}%`,
                width: size,
                height: size,
                opacity: 0.4 + ((i % 5) / 10),
                animationDelay: `${(i % 7) * 0.4}s`,
                animationDuration: `${2 + (i % 4)}s`,
              }}
            />
          );
        })}
      </div>

      {/* Layer 3 â€” celestial body (sun or moon) traveling its arc */}
      <div
        className="pointer-events-none absolute transition-[left,top,background-color] duration-[2000ms] ease-out"
        style={{
          left: `${arc.x}%`,
          top: `${arc.y}%`,
          transform: `translate(calc(-50% + ${m.x * 14}px), calc(-50% + ${m.y * 14}px + ${scrollY * 0.2}px))`,
        }}
        aria-hidden
      >
        {/* outer glow */}
        <div
          className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${phase.bodyGlow}, transparent 70%)`,
            opacity: 0.7,
          }}
        />
        {/* body */}
        <div
          className="relative h-24 w-24 rounded-full shadow-2xl"
          style={{
            background: `radial-gradient(circle at 35% 35%, ${phase.bodyColor}, ${phase.bodyGlow})`,
            boxShadow: `0 0 60px ${phase.bodyGlow}`,
          }}
        >
          {phase.body === "moon" && (
            <div
              className="absolute right-2 top-3 h-16 w-16 rounded-full"
              style={{ background: phase.sky.includes("0F0930") || phase.sky.includes("050118") ? "#0F0930" : "#2A1B5C", opacity: 0.85 }}
            />
          )}
        </div>
      </div>

      {/* Layer 4 â€” distant hill silhouette */}
      <svg
        className="absolute inset-x-0 bottom-0 w-full transition-[fill] duration-[2000ms]"
        viewBox="0 0 1440 240"
        preserveAspectRatio="none"
        style={{ transform: `translateY(${scrollY * 0.35}px)`, height: "32%" }}
        aria-hidden
      >
        <path
          fill={phase.hillColor}
          opacity="0.9"
          d="M0,160 C220,90 460,200 760,140 C1040,90 1240,200 1440,130 L1440,240 L0,240 Z"
        />
      </svg>

      {/* Layer 5 â€” foreground palm silhouettes (fastest, mouse-tracked) */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between px-2 sm:px-10"
        style={{
          transform: `translate(${m.x * 20}px, ${scrollY * 0.45}px)`,
          willChange: "transform",
        }}
        aria-hidden
      >
        <svg width="180" height="320" viewBox="0 0 180 320" className="drop-shadow-2xl">
          <path
            fill={phase.palmColor}
            d="M90 320 L82 140 C70 90 30 70 10 80 C40 60 70 70 84 110 C70 50 30 30 0 40 C40 10 80 30 90 90 C100 30 140 10 180 40 C150 30 110 50 96 110 C110 70 140 60 170 80 C150 70 110 90 98 140 Z"
          />
        </svg>
        <svg width="220" height="380" viewBox="0 0 220 380" className="drop-shadow-2xl">
          <path
            fill={phase.palmColor}
            d="M110 380 L100 160 C85 100 35 80 10 90 C50 65 90 75 105 125 C90 60 40 35 5 50 C50 15 100 35 110 105 C120 35 170 15 215 50 C180 35 130 60 115 125 C130 75 170 65 210 90 C185 80 135 100 120 160 Z"
          />
        </svg>
      </div>

      {/* Vignette so headline reads */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.4) 100%)",
        }}
        aria-hidden
      />

      {/* ── HERO CONTENT ── */}
      <div className="relative mx-auto flex min-h-[92vh] max-w-5xl flex-col items-center justify-center px-6 pt-28 pb-36 text-center">

        {/* Live time pill */}
        <div className="reveal inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 backdrop-blur-sm border border-white/20">
          <span className="h-2 w-2 rounded-full bg-emerald-300 animate-pulse" />
          <span className="text-sm font-medium tracking-wide text-white/90">
            {phase.label} · {timeLabel} · here with you, 24×7
          </span>
        </div>

        {/* Centered illustration */}
        <div className="reveal relative mt-6 flex items-center justify-center">
          {/* soft glow behind illustration */}
          <div
            className="absolute inset-0 rounded-full blur-3xl"
            style={{
              background: `radial-gradient(ellipse at center, ${phase.bodyGlow}55, transparent 70%)`,
              transform: "scale(1.4)",
            }}
          />
          <img
            src={motherBaby}
            alt="Mother cradling her newborn"
            width={480}
            height={480}
            className="relative"
            style={{
              mixBlendMode: "multiply",
              filter: "brightness(0.95) drop-shadow(0 0 24px rgba(255,240,200,0.5))",
              maxWidth: "min(480px, 60vw)",
              animation: "float-slow 8s ease-in-out infinite",
            }}
          />
        </div>

        {/* Catchy headline */}
        <h1 className="reveal mt-6 font-display text-balance text-[2rem] font-medium leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
          She gave everything.
          <br />
          <em className="italic text-amber-200">Now it's her turn.</em>
        </h1>

        {/* Short sub-line */}
        <p className="reveal mt-4 max-w-md text-base text-white/70 sm:text-lg">
          Postpartum care, rooted in Kerala — gentle, vernacular, and always awake.
        </p>

        {/* CTAs */}
        <div className="reveal mt-8 flex flex-col items-center sm:flex-row gap-4">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 rounded-full bg-amber-300 px-8 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-[#2A1B5C] shadow-[0_20px_60px_-12px_rgba(255,200,80,0.6)] transition hover:-translate-y-0.5 hover:bg-amber-200"
          >
            Sign In
          </Link>
          <Link
            to="/create-account"
            className="inline-flex items-center gap-2 rounded-full border border-white/70 px-8 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-white/90 transition hover:-translate-y-0.5 hover:bg-white/10"
          >
            Create Account
          </Link>
        </div>

        {/* Scroll chevron */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/60 animate-bounce">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
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

function Therapists() {
  return (
    <section id="therapists" className="relative bg-background py-24 sm:py-32">
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
                className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm shadow-soft ${
                  i === 0 ? "bg-foreground text-background" : "bg-card text-foreground/75"
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
    <section id="story" className="relative bg-[#F1F3F4] py-28">
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
    <section id="care" className="relative py-28">
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
    <section id="family" className="relative bg-[var(--ivory-deep)] py-28">
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
                      className={`grid place-items-center rounded-full font-display transition-all ${
                        r.big ? "h-24 w-24 text-lg" : "h-16 w-16 text-sm"
                      } ${
                        isActive
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
                  className={`rounded-full border px-3 py-1.5 text-xs transition ${
                    active === r.id
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
    <section id="journey" className="relative py-28">
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
                  className={`flex-1 min-w-[7rem] rounded-full px-3 py-2 text-xs font-medium transition ${
                    i === idx
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
    <section id="talk" className="relative py-28">
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
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
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
                      className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-soft ${
                        m.role === "user"
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
    <section className="relative py-28">
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
    <footer className="border-t border-border bg-[var(--ivory-deep)] py-14">
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
    <main className="overflow-x-hidden">
      <Nav />
      <Hero />
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
