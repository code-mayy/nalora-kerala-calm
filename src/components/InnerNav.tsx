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

  const pages = [
    ...PUBLIC_PAGES,
    ...roleSpecificPages,
  ];

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
        background: "oklch(0.985 0.012 60 / 0.96)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid oklch(0.9 0.02 55)",
        fontFamily: "var(--font-sans)",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "13px 32px",
          gap: "16px",
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            textDecoration: "none",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: user?.role === "doctor" 
                ? "linear-gradient(135deg, oklch(0.4 0.03 240), oklch(0.5 0.04 200))"
                : "linear-gradient(135deg, var(--rose), var(--sunset))",
              display: "grid",
              placeItems: "center",
              color: "white",
              fontFamily: "var(--font-display)",
              fontSize: "1.1rem",
              fontWeight: 600,
              boxShadow: user?.role === "doctor"
                ? "0 4px 12px oklch(0.4 0.03 240 / 0.25)"
                : "0 4px 12px oklch(0.74 0.11 18 / 0.28)",
            }}
          >
            n
          </span>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.4rem",
              color: "var(--charcoal)",
              letterSpacing: "-0.02em",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            nalora
            {user?.role === "doctor" && (
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  color: "oklch(0.5 0.04 200)",
                  verticalAlign: "middle",
                  border: "1px solid oklch(0.5 0.04 200 / 0.3)",
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

        {/* Desktop nav links */}
        <nav
          className="hidden md:flex"
          style={{ display: "flex", alignItems: "center", gap: "22px", flexShrink: 0 }}
        >
          {pages.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              style={{
                fontSize: "0.845rem",
                fontWeight: 500,
                color: "oklch(0.5 0.01 60)",
                textDecoration: "none",
                transition: "color 0.2s",
                whiteSpace: "nowrap",
              }}
              activeProps={{
                style: {
                  fontSize: "0.845rem",
                  fontWeight: 700,
                  color: user?.role === "doctor" ? "oklch(0.4 0.03 240)" : "var(--rose)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                  whiteSpace: "nowrap",
                },
              }}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
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
                  border: "1.5px solid oklch(0.88 0.02 55)",
                  background: "white",
                  cursor: "pointer",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                  boxShadow: profileOpen ? "0 0 0 3px oklch(0.74 0.11 18 / 0.12)" : "none",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = user.role === "doctor" ? "oklch(0.4 0.03 240)" : "var(--rose)";
                }}
                onMouseLeave={(e) => {
                  if (!profileOpen)
                    (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.88 0.02 55)";
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
                <span
                  style={{
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    color: "var(--charcoal)",
                    maxWidth: "100px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {user.name.split(" ")[0]}
                </span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="oklch(0.6 0.01 60)"
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
                      onClick={handleLogout}
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
            /* ── Logged-out state ── */
            <Link
              to="/login"
              className="hidden sm:inline-flex"
              style={{
                padding: "10px 20px",
                borderRadius: "99px",
                background: "linear-gradient(135deg, var(--rose), var(--sunset))",
                color: "white",
                fontSize: "0.84rem",
                fontWeight: 600,
                textDecoration: "none",
                boxShadow: "0 4px 14px oklch(0.74 0.11 18 / 0.25)",
                whiteSpace: "nowrap",
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
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "6px",
              color: "var(--charcoal)",
            }}
          >
            <svg
              width="22"
              height="22"
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
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            background: "oklch(0.985 0.012 60)",
            borderTop: "1px solid oklch(0.9 0.02 55)",
            padding: "12px 24px 20px",
          }}
        >
          {user && (
            <div
              style={{
                padding: "12px 0 14px",
                borderBottom: "1px solid oklch(0.92 0.01 60)",
                marginBottom: "8px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <span
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: user.role === "doctor" 
                    ? "linear-gradient(135deg, oklch(0.4 0.03 240), oklch(0.5 0.04 200))"
                    : "linear-gradient(135deg, var(--rose), var(--sunset))",
                  display: "grid",
                  placeItems: "center",
                  color: "white",
                  fontWeight: 700,
                  fontSize: "0.75rem",
                }}
              >
                {initials}
              </span>
              <div>
                <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--charcoal)" }}>
                  {user.name}
                </div>
                <div style={{ fontSize: "0.72rem", color: "oklch(0.6 0.01 60)" }}>
                  {user.email || user.phone}
                </div>
              </div>
            </div>
          )}
          {pages.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                padding: "12px 0",
                fontSize: "0.92rem",
                fontWeight: 500,
                color: "oklch(0.45 0.01 60)",
                textDecoration: "none",
                borderBottom: "1px solid oklch(0.93 0.01 55)",
              }}
              activeProps={{
                style: {
                  display: "block",
                  padding: "12px 0",
                  fontSize: "0.92rem",
                  fontWeight: 700,
                  color: user?.role === "doctor" ? "oklch(0.4 0.03 240)" : "var(--rose)",
                  textDecoration: "none",
                  borderBottom: "1px solid oklch(0.93 0.01 55)",
                },
              }}
            >
              {label}
            </Link>
          ))}
          {user ? (
            <button
              onClick={() => {
                setMenuOpen(false);
                handleLogout();
              }}
              style={{
                marginTop: "14px",
                width: "100%",
                padding: "13px",
                borderRadius: "12px",
                border: "1.5px solid oklch(0.88 0.02 55)",
                background: "white",
                color: "oklch(0.5 0.08 18)",
                fontSize: "0.9rem",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "var(--font-sans)",
              }}
            >
              Sign Out
            </button>
          ) : (
            <div
              style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "block",
                  padding: "13px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, var(--rose), var(--sunset))",
                  color: "white",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  textAlign: "center",
                  textDecoration: "none",
                }}
              >
                Start Free Trial
              </Link>
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </header>
  );
}
