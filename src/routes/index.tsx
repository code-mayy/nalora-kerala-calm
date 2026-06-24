import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import heroBackwater from "@/assets/hero-backwater.jpg";
import blobRose from "@/assets/blob-rose.png";
import motherBaby from "@/assets/mother-baby.jpg";
import keralaArch from "@/assets/kerala-architecture.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nalora — Emotional Support for Motherhood" },
      { name: "description", content: "Kerala-rooted, AI-supported postpartum care. A calm digital ecosystem for mothers and the family around them." },
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

/* ---------- Nav ---------- */
function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--ivory-deep)]/95 backdrop-blur-md border-b border-border/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5 sm:px-10">
        <a href="#" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--gradient-sunset)] text-white font-display text-lg">n</span>
          <span className="font-display text-2xl tracking-tight">nalora</span>
        </a>
        <nav className="hidden md:flex items-center gap-9 text-[15px] font-medium text-foreground/80">
          <a href="#story" className="hover:text-rose transition">About Us</a>
          <a href="#care" className="hover:text-rose transition">Care</a>
          <a href="#family" className="hover:text-rose transition">Family</a>
          <a href="#journey" className="hover:text-rose transition">Journey</a>
          <a href="#talk" className="hover:text-rose transition">Therapists</a>
        </nav>
        <a href="#talk" className="btn-primary text-sm">Book a Session</a>
      </div>
    </header>
  );
}

/* ---------- Hero (Oppam-style coral wave backdrop) ---------- */
function Hero() {
  const [m, setM] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    const onMove = (e: globalThis.MouseEvent) => {
      setM({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <>
      {/* ===== Hero band: solid warm coral with layered wave hills ===== */}
      <section
        className="relative overflow-hidden pt-32 pb-28 sm:pt-40 sm:pb-36"
        style={{ backgroundColor: "#F8B0A2" }}
      >
        {/* Parallax wave layers */}
        <svg
          className="absolute inset-x-0 bottom-0 w-full"
          viewBox="0 0 1440 420"
          preserveAspectRatio="none"
          aria-hidden
          style={{ transform: `translateY(${scrollY * 0.08}px)` }}
        >
          <path fill="#F49E92" opacity="0.7" d="M0,260 C220,180 380,330 640,280 C900,230 1080,340 1440,260 L1440,420 L0,420 Z" />
          <path fill="#EE8C84" opacity="0.7" d="M0,320 C260,250 460,380 740,330 C1000,285 1200,380 1440,320 L1440,420 L0,420 Z" />
        </svg>
        <svg
          className="absolute inset-x-0 top-10 w-full"
          viewBox="0 0 1440 300"
          preserveAspectRatio="none"
          aria-hidden
          style={{ transform: `translate(${m.x * 14}px, ${scrollY * -0.05}px)` }}
        >
          <path fill="#FBC3B7" opacity="0.55" d="M0,180 C220,80 460,220 760,170 C1040,120 1240,210 1440,140 L1440,0 L0,0 Z" />
        </svg>

        {/* Floating sun blob */}
        <div
          className="pointer-events-none absolute right-[8%] top-24 h-56 w-56 rounded-full opacity-70 blur-2xl"
          style={{
            background: "radial-gradient(circle, #FFD4A8, transparent 70%)",
            transform: `translate(${m.x * 18}px, ${m.y * 18}px)`,
          }}
        />

        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <div className="inline-flex items-center gap-2 text-foreground/85">
            <span className="grid h-6 w-6 place-items-center rounded-full border-2 border-foreground/80">
              <span className="block h-1.5 w-1.5 rounded-full bg-foreground/80" />
            </span>
            <span className="font-display italic text-lg">About Nalora</span>
          </div>

          <h1 className="mt-6 font-display text-balance text-[2.6rem] leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-[5.25rem]">
            Building a mental health <br className="hidden sm:block" />
            platform that just – <em className="italic font-display">gets it</em>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-balance text-lg text-foreground/75 sm:text-xl">
            Nalora is a calm digital ecosystem for mothers and the family around them.
            Born in Kerala. Built for everywhere you need to feel understood.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a href="#talk" className="btn-primary">
              Talk to Nalora
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
            <a href="#care" className="btn-ghost bg-white/70">Explore care</a>
          </div>
        </div>
      </section>

      {/* ===== Trust ribbon on ivory ===== */}
      <section className="relative bg-background py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-5 px-6 sm:grid-cols-4">
          {[
            ["24/7", "Quiet, present support"],
            ["7", "Vernacular languages"],
            ["120+", "Certified therapists"],
            ["1:1", "Family-centred care"],
          ].map(([k, v]) => (
            <div key={k} className="reveal rounded-2xl bg-card p-5 shadow-soft">
              <div className="font-display text-3xl text-rose">{k}</div>
              <div className="mt-1 text-sm text-foreground/70">{v}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}


/* ---------- Story ---------- */
function Story() {
  return (
    <section id="story" className="relative py-28">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 md:grid-cols-2 md:items-center">
        <div className="reveal relative">
          <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-[var(--gradient-dawn)] blur-2xl opacity-70" />
          <TiltCard className="overflow-hidden rounded-[2.5rem] shadow-lift">
            <img src={motherBaby} alt="A mother holding her newborn in soft warm light" width={1024} height={1536} loading="lazy" className="h-[34rem] w-full object-cover" />
          </TiltCard>
        </div>
        <div className="reveal">
          <span className="chip">Our Story</span>
          <h2 className="mt-5 font-display text-4xl leading-tight sm:text-5xl">
            A platform that <em className="italic text-rose">just gets it.</em>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-foreground/75">
            Nalora began in a small town in Kerala — born from the quiet realisation
            that new mothers carry an entire ocean inside them, and rarely a shoreline
            to rest on. We're building that shoreline.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-foreground/75">
            Therapy in your language. Companions for your partner. A safe space for
            grandparents to learn how to help. All in one ecosystem, available
            whenever the night feels long.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <img src={keralaArch} alt="" width={120} height={120} loading="lazy" className="h-20 w-20 rounded-2xl object-cover shadow-soft" />
            <div className="text-sm text-foreground/60">
              Rooted in Kerala. <br /> Designed for every home.
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
            A small, deliberate set of tools — built with mothers, therapists and families.
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
  { id: "mother", label: "Mother", desc: "At the heart of every Nalora circle — supported, never alone.", x: 50, y: 50, big: true },
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
  { week: "Wk 0–2", title: "The fourth trimester", body: "Quiet voice notes through the night. Sleep tracking that doesn't judge missed naps.", color: "var(--rose)" },
  { week: "Wk 3–6", title: "Finding rhythm", body: "Daily 7-minute check-ins, hormone-aware mood support, partner prompts.", color: "var(--sunset)" },
  { week: "Wk 7–12", title: "Rebuilding self", body: "Pelvic floor, identity work, return-to-work coaching — gently paced.", color: "var(--coconut)" },
  { week: "Mo 4–6", title: "Re-entering the world", body: "Weaning support, anxiety toolkits, and live group rooms in your language.", color: "var(--rose)" },
  { week: "Mo 6–12", title: "Long-form healing", body: "Therapist continuity, family workshops, milestone celebrations.", color: "var(--sunset)" },
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
      "Three nights is a long time to carry alone — I hear you.",
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
    endRef.current?.scrollIntoView({ behavior: "smooth" });
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
              trained friend would — without scripts, without judgement.
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
                Demo conversation • Real Nalora is private & end-to-end encrypted
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
                Start with Nalora — free
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
        © {new Date().getFullYear()} Nalora Care. Made with care in Kerala.
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
