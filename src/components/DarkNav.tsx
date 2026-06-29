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
] as const;

export function DarkNav() {
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

  const initials = user?.name
    ? user.name
        .replace("Dr. ", "")
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "N";

  function handleLogout() {
    logout();
    navigate({ to: "/" });
  }

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
          background: "rgba(18, 20, 28, 0.18)",
          backdropFilter: "blur(48px) saturate(180%)",
          WebkitBackdropFilter: "blur(48px) saturate(180%)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.07), 0 8px 32px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3)",
          pointerEvents: "auto",
          transition: "all 0.4s ease",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
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
        <nav className="hidden md:flex" style={{ display: "flex", alignItems: "center", gap: "1px" }}>
          {pages.map(({ to, label }) => (
            <Link
              key={to}
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
          ))}
        </nav>

        {/* Right side — auth */}
        <div className="hidden sm:flex" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
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
                    background: "rgba(20,15,40,0.75)",
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

                  {[
                    { to: "/doctors", label: "Our Doctors" },
                    { to: "/bookings", label: "My Bookings" },
                  ].map(({ to, label }) => (
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
              Start Free Trial
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
            background: "rgba(20,15,40,0.75)",
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
