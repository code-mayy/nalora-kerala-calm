import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

const PAGES = [
  { to: "/doctor/dashboard", label: "Dashboard" },
  { to: "/doctor/meetings", label: "Meetings" },
  { to: "/doctor/google-calendar", label: "Google Calendar" },
  { to: "/doctor/diary-all", label: "Patients Diary" },
] as const;

export function DoctorNav() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  function handleLogout() {
    logout();
    navigate({ to: "/" });
  }

  const initials = user?.name
    ? user.name.replace("Dr. ", "").split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
    : "DR";

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "oklch(0.985 0.008 240 / 0.96)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid oklch(0.9 0.01 240)",
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
          to="/doctor/dashboard"
          style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none", flexShrink: 0 }}
        >
          <span
            style={{
              width: "36px", height: "36px", borderRadius: "50%",
              background: "linear-gradient(135deg, oklch(0.4 0.03 240), oklch(0.5 0.04 200))",
              display: "grid", placeItems: "center", color: "white",
              fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 600,
              boxShadow: "0 4px 12px oklch(0.4 0.03 240 / 0.25)",
            }}
          >
            n
          </span>
          <span style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", color: "var(--charcoal)", letterSpacing: "-0.02em" }}>
            nalora <span style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "oklch(0.5 0.04 200)", verticalAlign: "middle", border: "1px solid oklch(0.5 0.04 200 / 0.3)", padding: "1px 6px", borderRadius: "6px", marginLeft: "4px" }}>Doctor</span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <nav style={{ display: "flex", alignItems: "center", gap: "22px", flexShrink: 0 }} className="desktop-doctor-nav">
          {PAGES.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              style={{ fontSize: "0.845rem", fontWeight: 500, color: "oklch(0.5 0.01 240)", textDecoration: "none", transition: "color 0.2s", whiteSpace: "nowrap" }}
              activeProps={{ style: { fontSize: "0.845rem", fontWeight: 700, color: "oklch(0.4 0.03 240)", textDecoration: "none", transition: "color 0.2s", whiteSpace: "nowrap" } }}
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
                  display: "flex", alignItems: "center", gap: "10px",
                  padding: "7px 12px 7px 7px", borderRadius: "99px",
                  border: "1.5px solid oklch(0.88 0.02 240)",
                  background: "white", cursor: "pointer",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                  boxShadow: profileOpen ? "0 0 0 3px oklch(0.4 0.03 240 / 0.12)" : "none",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.4 0.03 240)"; }}
                onMouseLeave={(e) => { if (!profileOpen) (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.88 0.02 240)"; }}
              >
                {/* Avatar */}
                <span
                  style={{
                    width: "30px", height: "30px", borderRadius: "50%",
                    background: "linear-gradient(135deg, oklch(0.4 0.03 240), oklch(0.5 0.04 200))",
                    display: "grid", placeItems: "center",
                    color: "white", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.04em",
                  }}
                >
                  {initials}
                </span>
                <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--charcoal)", maxWidth: "120px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {user.name}
                </span>
                <svg
                  width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="oklch(0.6 0.01 240)" strokeWidth="2.5"
                  style={{ transition: "transform 0.2s", transform: profileOpen ? "rotate(180deg)" : "rotate(0)" }}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              {/* Dropdown */}
              {profileOpen && (
                <div
                  style={{
                    position: "absolute", top: "calc(100% + 10px)", right: 0,
                    background: "white", borderRadius: "16px",
                    border: "1px solid oklch(0.9 0.02 240)",
                    boxShadow: "0 16px 48px oklch(0 0 0 / 0.12)",
                    minWidth: "220px", overflow: "hidden",
                    animation: "dropIn 0.18s ease",
                  }}
                  onMouseLeave={() => setProfileOpen(false)}
                >
                  {/* User info */}
                  <div style={{ padding: "16px 18px", borderBottom: "1px solid oklch(0.93 0.01 240)", background: "oklch(0.975 0.005 240)" }}>
                    <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--charcoal)" }}>{user.name}</div>
                    <div style={{ fontSize: "0.72rem", color: "oklch(0.5 0.04 200)", fontWeight: 600, marginTop: "2px" }}>
                      {user.specialization || "Psychologist"}
                    </div>
                    <div style={{ fontSize: "0.7rem", color: "oklch(0.6 0.01 240)", marginTop: "2px" }}>
                      {user.email}
                    </div>
                  </div>

                  <div style={{ borderTop: "1px solid oklch(0.93 0.01 240)", padding: "6px" }}>
                    <button
                      onClick={handleLogout}
                      style={{
                        width: "100%", padding: "10px 12px", borderRadius: "10px",
                        border: "none", background: "none", cursor: "pointer",
                        fontSize: "0.84rem", fontWeight: 600, color: "oklch(0.5 0.1 18)",
                        display: "flex", alignItems: "center", gap: "8px",
                        transition: "background 0.15s",
                        fontFamily: "var(--font-sans)",
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "oklch(0.97 0.02 18)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "none"; }}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
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
              style={{
                padding: "9px 18px", borderRadius: "99px",
                border: "1.5px solid oklch(0.5 0.04 200)",
                color: "oklch(0.5 0.04 200)", fontSize: "0.84rem", fontWeight: 600,
                textDecoration: "none", transition: "all 0.2s",
              }}
            >
              Sign In
            </Link>
          )}

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            style={{
              padding: "8px", borderRadius: "10px", border: "1.5px solid oklch(0.88 0.02 240)",
              background: "white", cursor: "pointer", display: "none",
            }}
            className="mobile-doctor-menu-btn"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--charcoal)" strokeWidth="2.5">
              {menuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile nav links */}
      {menuOpen && (
        <nav
          style={{
            padding: "12px 24px 20px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            background: "white",
            borderBottom: "1px solid oklch(0.9 0.02 240)",
            animation: "slideDown 0.2s ease-out",
          }}
          className="mobile-doctor-nav"
        >
          {PAGES.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              style={{ fontSize: "0.9rem", fontWeight: 500, color: "oklch(0.5 0.01 240)", textDecoration: "none", padding: "8px 0" }}
              activeProps={{ style: { fontSize: "0.9rem", fontWeight: 700, color: "oklch(0.4 0.03 240)", textDecoration: "none", padding: "8px 0" } }}
            >
              {label}
            </Link>
          ))}
        </nav>
      )}

      {/* Inject responsive CSS style directly */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-doctor-nav {
            display: none !important;
          }
          .mobile-doctor-menu-btn {
            display: block !important;
          }
        }
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </header>
  );
}
