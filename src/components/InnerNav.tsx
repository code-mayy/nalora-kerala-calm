import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

const PUBLIC_PAGES = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" },
] as const;

const DOCTOR_PAGES = [
  { to: "/doctor/dashboard", label: "Dashboard" },
  { to: "/doctor/meetings", label: "Meetings" },
  { to: "/doctor/google-calendar", label: "Google Calendar" },
  { to: "/doctor/diary-all", label: "Patients Diary" },
] as const;

const PATIENT_PAGES = [
  { to: "/doctors", label: "Our Doctors" },
  { to: "/book-session", label: "Book a Session" },
  { to: "/bookings", label: "Your Bookings" },
  { to: "/feedback", label: "Feedback" },
] as const;

export function InnerNav() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const roleSpecificPages = user
    ? user.role === "doctor"
      ? DOCTOR_PAGES
      : PATIENT_PAGES
    : [];

  const pages = [...PUBLIC_PAGES, ...roleSpecificPages];

  function handleLogout() {
    logout();
    navigate({ to: "/" });
  }

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
        position: "sticky",
        top: 0,
        zIndex: 50,
        padding: "12px 16px",
        pointerEvents: "none",
        fontFamily: "var(--font-sans)",
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
          background: "rgba(255, 255, 255, 0.75)",
          backdropFilter: "blur(48px) saturate(180%)",
          WebkitBackdropFilter: "blur(48px) saturate(180%)",
          border: "1px solid rgba(0, 0, 0, 0.08)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.9), 0 4px 24px rgba(0,0,0,0.1), 0 1px 4px rgba(0,0,0,0.06)",
          pointerEvents: "auto",
          transition: "all 0.4s ease",
        }}
      >
        {/* Logo + separator */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
            <span
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                background: user?.role === "doctor"
                  ? "linear-gradient(135deg, oklch(0.4 0.03 240), oklch(0.5 0.04 200))"
                  : "linear-gradient(135deg, var(--rose), var(--sunset))",
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
                color: "var(--charcoal)",
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
                    color: "oklch(0.5 0.04 200)",
                    border: "1px solid oklch(0.5 0.04 200 / 0.3)",
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
          <span style={{ width: "1px", height: "18px", background: "rgba(0,0,0,0.12)", display: "block", marginLeft: "4px" }} />
        </div>

        {/* Desktop nav links */}
        <nav className="hidden md:flex" style={{ display: "flex", alignItems: "center", gap: "2px" }}>
          {pages.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              style={{
                color: "oklch(0.45 0.01 60)",
                fontSize: "0.875rem",
                fontWeight: 500,
                textDecoration: "none",
                padding: "6px 14px",
                borderRadius: "999px",
                transition: "color 0.2s, background 0.2s",
                whiteSpace: "nowrap",
                display: "block",
              }}
              activeProps={{
                style: {
                  color: user?.role === "doctor" ? "oklch(0.4 0.03 240)" : "var(--rose)",
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  textDecoration: "none",
                  padding: "6px 14px",
                  borderRadius: "999px",
                  background: user?.role === "doctor" ? "oklch(0.4 0.03 240 / 0.08)" : "oklch(0.74 0.11 18 / 0.08)",
                  transition: "color 0.2s, background 0.2s",
                  whiteSpace: "nowrap",
                  display: "block",
                },
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = "var(--charcoal)";
                el.style.background = "rgba(0,0,0,0.05)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                if (!el.getAttribute("aria-current")) {
                  el.style.color = "oklch(0.45 0.01 60)";
                  el.style.background = "transparent";
                }
              }}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right side — auth */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
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
                  border: "1.5px solid oklch(0.88 0.02 55)",
                  background: "white",
                  cursor: "pointer",
                  color: "var(--charcoal)",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = user.role === "doctor" ? "oklch(0.4 0.03 240)" : "var(--rose)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.88 0.02 55)";
                }}
              >
                <span
                  style={{
                    width: "26px",
                    height: "26px",
                    borderRadius: "50%",
                    background: user.role === "doctor"
                      ? "linear-gradient(135deg, oklch(0.4 0.03 240), oklch(0.5 0.04 200))"
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
                <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--charcoal)", maxWidth: "90px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {user.name.split(" ")[0]}
                </span>
                <svg
                  width="12" height="12" viewBox="0 0 24 24"
                  fill="none" stroke="oklch(0.6 0.01 60)" strokeWidth="2.5"
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
                    background: "rgba(20,15,40,0.85)",
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
                      onClick={() => { setProfileOpen(false); handleLogout(); }}
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
              to="/login"
              className="hidden sm:inline-flex"
              style={{
                display: "inline-flex",
                alignItems: "center",
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
              Start Free Trial
            </Link>
          )}

          {/* Mobile hamburger */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen((o) => !o)}
            style={{
              color: "var(--charcoal)",
              cursor: "pointer",
              background: "rgba(0,0,0,0.04)",
              border: "1px solid rgba(0,0,0,0.1)",
              borderRadius: "50%",
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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
      </div>

      {/* Mobile menu — liquid glass dropdown */}
      {menuOpen && (
        <div
          style={{
            maxWidth: "900px",
            margin: "8px auto 0",
            borderRadius: "24px",
            background: "rgba(20,15,40,0.82)",
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
                onClick={() => { setMenuOpen(false); handleLogout(); }}
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
                to="/login"
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "block",
                  padding: "13px",
                  borderRadius: "12px",
                  background: "rgba(240,240,245,0.92)",
                  border: "1px solid rgba(255,255,255,0.6)",
                  color: "#111118",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  textAlign: "center",
                  textDecoration: "none",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.8)",
                }}
              >
                Start Free Trial
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
