import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { InnerNav } from "@/components/InnerNav";
import { ProtectedPage } from "@/context/AuthContext";
import therapist1 from "@/assets/therapist-1.jpg";
import therapist2 from "@/assets/therapist-2.jpg";
import therapist3 from "@/assets/therapist-3.jpg";

export const Route = createFileRoute("/doctors")({
  head: () => ({
    meta: [
      { title: "Doctors & Therapists – Nalora" },
      {
        name: "description",
        content:
          "Browse Nalora's verified postpartum and perinatal care professionals. Filter by specialisation and find your perfect match.",
      },
    ],
  }),
  component: DoctorsPage,
});

const SPECIALIZATIONS = [
  "All",
  "Postpartum Anxiety",
  "Birth Trauma",
  "PPD",
  "Mood Concerns",
  "Relationship Concerns",
  "Hormonal Mood Shifts",
  "Sleep & Identity",
  "Life Transitions",
  "Medication Reviews",
];

const DOCTORS = [
  {
    id: 1,
    name: "Aisha Menon",
    role: "Consultant Psychologist",
    tags: ["Postpartum Anxiety", "Mood Concerns", "Sleep & Identity"],
    languages: ["Malayalam", "English"],
    price: "₹1,000",
    rating: 4.9,
    reviews: 124,
    nextAvailable: "Today, 4:00 PM",
    experience: "8 yrs",
    img: therapist1,
    accent: "#FFF1C2",
  },
  {
    id: 2,
    name: "Lakshmi Pillai",
    role: "Clinical Psychologist",
    tags: ["Birth Trauma", "Relationship Concerns", "Life Transitions"],
    languages: ["Malayalam", "Tamil"],
    price: "₹1,200",
    rating: 4.8,
    reviews: 89,
    nextAvailable: "Tomorrow, 10:00 AM",
    experience: "12 yrs",
    img: therapist2,
    accent: "#FCD7D1",
  },
  {
    id: 3,
    name: "Dr. Rohan Iyer",
    role: "Perinatal Psychiatrist",
    tags: ["Hormonal Mood Shifts", "Medication Reviews", "PPD"],
    languages: ["English", "Hindi"],
    price: "₹1,500",
    rating: 4.9,
    reviews: 203,
    nextAvailable: "Today, 6:00 PM",
    experience: "15 yrs",
    img: therapist3,
    accent: "#D6EFD9",
  },
  {
    id: 4,
    name: "Dr. Meera Krishnan",
    role: "Perinatal Counselor",
    tags: ["Mood Concerns", "Birth Trauma", "Postpartum Anxiety"],
    languages: ["Malayalam", "English", "Tamil"],
    price: "₹900",
    rating: 4.7,
    reviews: 67,
    nextAvailable: "Today, 2:00 PM",
    experience: "6 yrs",
    img: null,
    accent: "#C8D8F0",
  },
  {
    id: 5,
    name: "Dr. Priya Nair",
    role: "Family Therapist",
    tags: ["Relationship Concerns", "Life Transitions", "Mood Concerns"],
    languages: ["Malayalam", "Hindi"],
    price: "₹1,100",
    rating: 4.6,
    reviews: 91,
    nextAvailable: "Fri, 11:00 AM",
    experience: "10 yrs",
    img: null,
    accent: "#E8D8F0",
  },
  {
    id: 6,
    name: "Dr. Sanjana Thomas",
    role: "Child & Perinatal Psychologist",
    tags: ["Sleep & Identity", "Postpartum Anxiety", "Birth Trauma"],
    languages: ["English", "Malayalam"],
    price: "₹1,300",
    rating: 4.8,
    reviews: 55,
    nextAvailable: "Tomorrow, 3:00 PM",
    experience: "9 yrs",
    img: null,
    accent: "#D8F0E8",
  },
];

function Stars({ rating }: { rating: number }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "2px" }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill={s <= Math.round(rating) ? "#F5A25D" : "none"}
          stroke={s <= Math.round(rating) ? "#F5A25D" : "#ccc"}
          strokeWidth="2"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </span>
  );
}

type Doctor = (typeof DOCTORS)[number];

function DoctorCard({ doc }: { doc: Doctor }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "white",
        borderRadius: "22px",
        border: "1px solid oklch(0.92 0.02 55)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.25s, box-shadow 0.25s",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 24px 60px oklch(0.74 0.11 18 / 0.13)"
          : "0 2px 12px oklch(0 0 0 / 0.04)",
      }}
    >
      {/* Colored header */}
      <div
        style={{
          background: doc.accent,
          padding: "22px 22px 0",
          display: "flex",
          gap: "14px",
          alignItems: "flex-end",
        }}
      >
        {doc.img ? (
          <img
            src={doc.img}
            alt={doc.name}
            style={{
              width: "76px",
              height: "76px",
              borderRadius: "14px",
              objectFit: "cover",
              border: "3px solid white",
              boxShadow: "0 4px 16px rgba(0,0,0,0.14)",
              flexShrink: 0,
            }}
          />
        ) : (
          <div
            style={{
              width: "76px",
              height: "76px",
              borderRadius: "14px",
              background: "white",
              display: "grid",
              placeItems: "center",
              border: "3px solid white",
              boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
              flexShrink: 0,
              fontFamily: "var(--font-display)",
              fontSize: "2rem",
              color: "var(--rose)",
              fontWeight: 600,
            }}
          >
            {doc.name.charAt(0)}
          </div>
        )}
        <div style={{ paddingBottom: "16px" }}>
          <div
            style={{
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "oklch(0.45 0.06 18)",
              marginBottom: "5px",
            }}
          >
            {doc.experience} exp.
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <Stars rating={doc.rating} />
            <span style={{ fontSize: "0.78rem", color: "oklch(0.5 0.01 60)", fontWeight: 600 }}>
              {doc.rating}
            </span>
            <span style={{ fontSize: "0.72rem", color: "oklch(0.65 0.01 60)" }}>
              ({doc.reviews})
            </span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div
        style={{
          padding: "18px 22px 22px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <div>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.1rem",
              fontWeight: 600,
              color: "var(--charcoal)",
              margin: 0,
            }}
          >
            {doc.name}
          </h3>
          <p
            style={{
              fontSize: "0.8rem",
              color: "var(--rose)",
              fontWeight: 600,
              margin: "3px 0 0",
              letterSpacing: "0.02em",
            }}
          >
            {doc.role}
          </p>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {doc.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: "0.7rem",
                padding: "4px 10px",
                borderRadius: "99px",
                background: "oklch(0.96 0.02 18)",
                color: "oklch(0.42 0.08 18)",
                fontWeight: 500,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "10px",
            borderTop: "1px solid oklch(0.94 0.01 60)",
          }}
        >
          <span style={{ fontSize: "0.76rem", color: "oklch(0.58 0.01 60)" }}>
            🌐 {doc.languages.join(", ")}
          </span>
          <span style={{ fontSize: "1rem", fontWeight: 700, color: "var(--charcoal)" }}>
            {doc.price}/hr
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "auto",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "0.68rem",
                color: "oklch(0.65 0.01 60)",
                textTransform: "uppercase",
                letterSpacing: "0.07em",
                marginBottom: "2px",
              }}
            >
              Next available
            </div>
            <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--coconut)" }}>
              ✓ {doc.nextAvailable}
            </div>
          </div>
          <Link
            to="/book-session"
            style={{
              padding: "10px 18px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, var(--rose), var(--sunset))",
              color: "white",
              fontSize: "0.82rem",
              fontWeight: 700,
              textDecoration: "none",
              transition: "opacity 0.2s",
              whiteSpace: "nowrap",
              boxShadow: "0 4px 16px oklch(0.74 0.11 18 / 0.28)",
            }}
          >
            Book →
          </Link>
        </div>
      </div>
    </div>
  );
}

function DoctorsPage() {
  const [search, setSearch] = useState("");
  const [activeSpec, setActiveSpec] = useState("All");

  const filtered = DOCTORS.filter((d) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      d.name.toLowerCase().includes(q) ||
      d.role.toLowerCase().includes(q) ||
      d.tags.some((t) => t.toLowerCase().includes(q));
    const matchSpec = activeSpec === "All" || d.tags.includes(activeSpec);
    return matchSearch && matchSpec;
  });

  return (
    <ProtectedPage allowedRole="patient">
      <div
        style={{ minHeight: "100vh", background: "var(--ivory)", fontFamily: "var(--font-sans)" }}
      >
        <InnerNav />

        {/* Hero */}
        <div
          style={{
            background:
              "linear-gradient(160deg, oklch(0.96 0.03 18) 0%, oklch(0.97 0.025 55) 60%, oklch(0.96 0.02 145) 100%)",
            padding: "56px 24px 40px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--rose)",
              marginBottom: "10px",
            }}
          >
            Find Your Care
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 4vw, 2.8rem)",
              fontWeight: 600,
              color: "var(--charcoal)",
              margin: "0 0 14px",
              lineHeight: 1.15,
            }}
          >
            Doctors & Therapists
          </h1>
          <p
            style={{
              fontSize: "0.95rem",
              color: "oklch(0.55 0.01 60)",
              maxWidth: "480px",
              margin: "0 auto 36px",
              lineHeight: 1.75,
            }}
          >
            Browse verified professionals specialising in postpartum and perinatal care. Filter by
            specialisation to find your perfect match.
          </p>

          {/* Search */}
          <div style={{ maxWidth: "540px", margin: "0 auto", position: "relative" }}>
            <svg
              style={{
                position: "absolute",
                left: "18px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "oklch(0.65 0.01 60)",
                pointerEvents: "none",
              }}
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              id="doctor-search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, specialisation, role…"
              style={{
                width: "100%",
                padding: "16px 20px 16px 50px",
                borderRadius: "16px",
                border: "1.5px solid oklch(0.88 0.02 55)",
                background: "white",
                fontSize: "0.95rem",
                color: "var(--charcoal)",
                outline: "none",
                boxSizing: "border-box",
                boxShadow: "0 4px 24px oklch(0.74 0.11 18 / 0.07)",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "var(--rose)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "oklch(0.88 0.02 55)";
              }}
            />
          </div>
        </div>

        {/* Filters */}
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "24px 24px 0" }}>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "oklch(0.55 0.01 60)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginRight: "4px",
              }}
            >
              Filter:
            </span>
            {SPECIALIZATIONS.map((spec) => (
              <button
                key={spec}
                onClick={() => setActiveSpec(spec)}
                style={{
                  padding: "7px 15px",
                  borderRadius: "99px",
                  border: "1.5px solid",
                  borderColor: activeSpec === spec ? "var(--rose)" : "oklch(0.88 0.02 55)",
                  background: activeSpec === spec ? "oklch(0.74 0.11 18 / 0.09)" : "white",
                  color: activeSpec === spec ? "var(--rose)" : "oklch(0.5 0.01 60)",
                  fontSize: "0.78rem",
                  fontWeight: activeSpec === spec ? 700 : 400,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {spec}
              </button>
            ))}
          </div>

          <div style={{ marginTop: "12px", fontSize: "0.8rem", color: "oklch(0.6 0.01 60)" }}>
            Showing {filtered.length} professional{filtered.length !== 1 ? "s" : ""}
            {activeSpec !== "All" ? ` for "${activeSpec}"` : ""}
            {search ? ` matching "${search}"` : ""}
          </div>
        </div>

        {/* Grid */}
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "24px 24px 80px" }}>
          {filtered.length === 0 ? (
            <div
              style={{ textAlign: "center", padding: "80px 20px", color: "oklch(0.55 0.01 60)" }}
            >
              <div style={{ fontSize: "3rem", marginBottom: "14px" }}>🔍</div>
              <p style={{ fontSize: "1rem" }}>
                No professionals found. Try adjusting your search or filters.
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setActiveSpec("All");
                }}
                style={{
                  marginTop: "16px",
                  padding: "10px 24px",
                  borderRadius: "99px",
                  border: "1.5px solid var(--rose)",
                  background: "none",
                  color: "var(--rose)",
                  fontWeight: 600,
                  cursor: "pointer",
                  fontSize: "0.88rem",
                }}
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "22px",
              }}
            >
              {filtered.map((doc) => (
                <DoctorCard key={doc.id} doc={doc} />
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedPage>
  );
}
