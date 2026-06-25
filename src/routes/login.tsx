import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, type FormEvent } from "react";
import { useAuth } from "@/context/AuthContext";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login – Nalora" },
      { name: "description", content: "Sign in to your Nalora account to access your care dashboard, AI chat, and appointments." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const [isDoctor, setIsDoctor] = useState(false);
  const [mode, setMode] = useState<"email" | "phone">("email");
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // If already logged in, redirect based on role
  useEffect(() => {
    if (user) {
      if (user.role === "doctor") {
        navigate({ to: "/doctor/dashboard" });
      } else {
        navigate({ to: "/doctors" });
      }
    }
  }, [user, navigate]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (!credential.trim()) {
      setError(isDoctor ? "Please enter your doctor email address." : mode === "email" ? "Please enter your email address." : "Please enter your phone number.");
      return;
    }
    if (isDoctor && !password.trim()) {
      setError("Please enter your password.");
      return;
    }
    setLoading(true);
    const res = await login(credential.trim(), password, isDoctor);
    setLoading(false);
    if (res.ok) {
      if (isDoctor) {
        navigate({ to: "/doctor/dashboard" });
      } else {
        navigate({ to: "/doctors" });
      }
    } else {
      setError(res.error ?? "Login failed. Please try again.");
    }
  }

  const isEmail = mode === "email";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: isDoctor 
          ? "linear-gradient(160deg, oklch(0.95 0.01 240) 0%, oklch(0.92 0.01 240) 50%, oklch(0.94 0.01 240) 100%)"
          : "linear-gradient(160deg, oklch(0.985 0.012 60) 0%, oklch(0.96 0.03 18) 50%, oklch(0.97 0.02 55) 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 16px",
        fontFamily: "var(--font-sans)",
        position: "relative",
        overflow: "hidden",
        transition: "background 0.5s ease",
      }}
    >
      {/* Decorative blobs */}
      <div aria-hidden style={{ position: "absolute", top: "-100px", right: "-100px", width: "500px", height: "500px", borderRadius: "50%", background: isDoctor ? "radial-gradient(circle, oklch(0.6 0.05 240 / 0.08), transparent 65%)" : "radial-gradient(circle, oklch(0.74 0.11 18 / 0.1), transparent 65%)", pointerEvents: "none", transition: "background 0.5s ease" }} />
      <div aria-hidden style={{ position: "absolute", bottom: "-80px", left: "-80px", width: "400px", height: "400px", borderRadius: "50%", background: isDoctor ? "radial-gradient(circle, oklch(0.5 0.04 200 / 0.08), transparent 65%)" : "radial-gradient(circle, oklch(0.78 0.13 55 / 0.1), transparent 65%)", pointerEvents: "none", transition: "background 0.5s ease" }} />

      <div style={{ width: "100%", maxWidth: "440px", position: "relative", zIndex: 1 }}>
        {/* Back to home */}
        <Link
          to="/"
          style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            marginBottom: "24px", textDecoration: "none",
            fontSize: "0.82rem", fontWeight: 500, color: "oklch(0.55 0.01 60)",
            transition: "color 0.2s",
          }}
        >
          ← Back to Nalora
        </Link>

        {/* Card */}
        <div
          style={{
            background: "oklch(1 0 0 / 0.84)",
            backdropFilter: "blur(24px)",
            borderRadius: "28px",
            border: "1px solid oklch(1 0 0 / 0.9)",
            boxShadow: isDoctor 
              ? "0 32px 80px oklch(0.5 0.04 240 / 0.12), 0 4px 16px oklch(0 0 0 / 0.06)"
              : "0 32px 80px oklch(0.74 0.11 18 / 0.13), 0 4px 16px oklch(0 0 0 / 0.06)",
            overflow: "hidden",
            transition: "box-shadow 0.5s ease",
          }}
        >
          {/* Header gradient */}
          <div style={{ background: isDoctor ? "linear-gradient(135deg, oklch(0.4 0.03 240), oklch(0.5 0.04 200))" : "linear-gradient(135deg, var(--rose), var(--sunset))", padding: "30px 36px 28px", transition: "background 0.5s ease" }}>
            <Link to="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none", marginBottom: "20px" }}>
              <span style={{ width: "34px", height: "34px", borderRadius: "50%", background: "oklch(1 0 0 / 0.25)", display: "grid", placeItems: "center", fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "white", fontWeight: 600 }}>n</span>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", color: "white", letterSpacing: "-0.01em" }}>nalora</span>
            </Link>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.85rem", fontWeight: 600, color: "white", margin: 0, lineHeight: 1.2 }}>
              {isDoctor ? "Doctor Portal" : "Welcome back"}
            </h1>
            <p style={{ color: "oklch(1 0 0 / 0.75)", fontSize: "0.86rem", marginTop: "6px" }}>
              {isDoctor ? "Sign in to access your clinical dashboard" : "Sign in to access your care dashboard"}
            </p>
          </div>

          {/* Body */}
          <div style={{ padding: "32px 36px 36px" }}>
            {/* Mode toggle (Patient only) */}
            {!isDoctor && (
              <div
                style={{
                  display: "flex", background: "oklch(0.94 0.015 60)", borderRadius: "12px", padding: "4px", marginBottom: "26px",
                }}
              >
                {(["email", "phone"] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => { setMode(m); setCredential(""); setError(""); }}
                    style={{
                      flex: 1, padding: "9px", borderRadius: "9px", border: "none", cursor: "pointer",
                      background: mode === m ? "white" : "transparent",
                      color: mode === m ? "var(--charcoal)" : "oklch(0.6 0.01 60)",
                      fontWeight: mode === m ? 600 : 400,
                      fontSize: "0.85rem",
                      transition: "all 0.2s",
                      boxShadow: mode === m ? "0 2px 8px oklch(0 0 0 / 0.08)" : "none",
                      fontFamily: "var(--font-sans)",
                    }}
                  >
                    {m === "email" ? "📧 Email" : "📱 Phone"}
                  </button>
                ))}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Credential input */}
              <div>
                <label htmlFor="credential" style={{ display: "block", fontSize: "0.76rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "oklch(0.5 0.01 60)", marginBottom: "7px" }}>
                  {isDoctor ? "Doctor Email" : isEmail ? "Email Address" : "Phone Number"}
                </label>
                <input
                  id="credential"
                  type={isDoctor || isEmail ? "email" : "tel"}
                  value={credential}
                  onChange={(e) => { setCredential(e.target.value); setError(""); }}
                  placeholder={isDoctor ? "doctor@nalora.com" : isEmail ? "you@example.com" : "+91 98765 43210"}
                  autoComplete={isDoctor || isEmail ? "email" : "tel"}
                  style={{
                    width: "100%", padding: "14px 16px", borderRadius: "14px",
                    border: `1.5px solid ${error ? "var(--rose)" : "oklch(0.88 0.02 55)"}`,
                    background: "oklch(0.985 0.008 60)", fontSize: "0.92rem",
                    color: "var(--charcoal)", outline: "none", boxSizing: "border-box",
                    transition: "border-color 0.2s, box-shadow 0.2s",
                    fontFamily: "var(--font-sans)",
                  }}
                  onFocus={(e) => { e.target.style.borderColor = isDoctor ? "oklch(0.5 0.04 200)" : "var(--rose)"; e.target.style.boxShadow = isDoctor ? "0 0 0 3px oklch(0.5 0.04 200 / 0.1)" : "0 0 0 3px oklch(0.74 0.11 18 / 0.1)"; }}
                  onBlur={(e) => { e.target.style.borderColor = error ? "var(--rose)" : "oklch(0.88 0.02 55)"; e.target.style.boxShadow = "none"; }}
                />
              </div>

              {/* Password */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "7px" }}>
                  <label htmlFor="password" style={{ fontSize: "0.76rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "oklch(0.5 0.01 60)" }}>
                    Password
                  </label>
                  <a href="#" style={{ fontSize: "0.76rem", color: isDoctor ? "oklch(0.5 0.04 200)" : "var(--rose)", fontWeight: 500, textDecoration: "none" }}>
                    Forgot password?
                  </a>
                </div>
                <div style={{ position: "relative" }}>
                  <input
                    id="password"
                    type={showPw ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    style={{
                      width: "100%", padding: "14px 48px 14px 16px", borderRadius: "14px",
                      border: "1.5px solid oklch(0.88 0.02 55)",
                      background: "oklch(0.985 0.008 60)", fontSize: "0.92rem",
                      color: "var(--charcoal)", outline: "none", boxSizing: "border-box",
                      transition: "border-color 0.2s, box-shadow 0.2s",
                      fontFamily: "var(--font-sans)",
                    }}
                    onFocus={(e) => { e.target.style.borderColor = isDoctor ? "oklch(0.5 0.04 200)" : "var(--rose)"; e.target.style.boxShadow = isDoctor ? "0 0 0 3px oklch(0.5 0.04 200 / 0.1)" : "0 0 0 3px oklch(0.74 0.11 18 / 0.1)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "oklch(0.88 0.02 55)"; e.target.style.boxShadow = "none"; }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((v) => !v)}
                    style={{
                      position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)",
                      background: "none", border: "none", cursor: "pointer", color: "oklch(0.6 0.01 60)", padding: "2px",
                    }}
                    title={showPw ? "Hide password" : "Show password"}
                  >
                    {showPw ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "11px 14px", borderRadius: "11px", background: "oklch(0.98 0.02 18)", border: "1px solid oklch(0.74 0.11 18 / 0.2)", color: "oklch(0.45 0.1 18)", fontSize: "0.82rem" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                id="login-submit-btn"
                type="submit"
                disabled={loading}
                style={{
                  width: "100%", padding: "15px", borderRadius: "14px", border: "none", marginTop: "4px",
                  background: loading ? "oklch(0.88 0.02 55)" : isDoctor ? "linear-gradient(135deg, oklch(0.4 0.03 240), oklch(0.5 0.04 200))" : "linear-gradient(135deg, var(--rose), var(--sunset))",
                  color: "white", fontWeight: 700, fontSize: "0.95rem",
                  cursor: loading ? "not-allowed" : "pointer",
                  boxShadow: loading ? "none" : isDoctor ? "0 8px 28px oklch(0.5 0.04 240 / 0.25)" : "0 8px 28px oklch(0.74 0.11 18 / 0.32)",
                  transition: "all 0.2s",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                  fontFamily: "var(--font-sans)",
                  letterSpacing: "0.02em",
                }}
              >
                {loading ? (
                  <>
                    <span style={{ width: "18px", height: "18px", borderRadius: "50%", border: "2.5px solid oklch(1 0 0 / 0.3)", borderTopColor: "white", animation: "spin 0.7s linear infinite", display: "block" }} />
                    Signing in…
                  </>
                ) : (
                  "Sign In →"
                )}
              </button>
            </form>

            {/* Switch option */}
            {isDoctor ? (
              <div style={{ textAlign: "center", marginTop: "24px" }}>
                <p style={{ fontSize: "0.84rem", color: "oklch(0.55 0.01 60)", marginBottom: "10px" }}>
                  Are you a patient?
                </p>
                <button
                  type="button"
                  onClick={() => { setIsDoctor(false); setCredential(""); setError(""); }}
                  style={{
                    width: "100%", padding: "13px", borderRadius: "14px",
                    border: "1.5px solid oklch(0.88 0.02 55)",
                    background: "white", color: "var(--charcoal)",
                    fontWeight: 600, fontSize: "0.9rem", cursor: "pointer",
                    transition: "all 0.2s",
                    fontFamily: "var(--font-sans)",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.5 0.04 200)"; (e.currentTarget as HTMLElement).style.color = "oklch(0.5 0.04 200)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.88 0.02 55)"; (e.currentTarget as HTMLElement).style.color = "var(--charcoal)"; }}
                >
                  Login as Patient 🌸
                </button>
              </div>
            ) : (
              <>
                {/* Divider */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "24px 0" }}>
                  <div style={{ flex: 1, height: "1px", background: "oklch(0.9 0.01 60)" }} />
                  <span style={{ fontSize: "0.75rem", color: "oklch(0.7 0.01 60)", fontWeight: 500 }}>or</span>
                  <div style={{ flex: 1, height: "1px", background: "oklch(0.9 0.01 60)" }} />
                </div>

                {/* Create Account CTA */}
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontSize: "0.84rem", color: "oklch(0.55 0.01 60)", marginBottom: "14px" }}>
                    New to Nalora? Join thousands of mothers who found their calm.
                  </p>
                  <Link
                    to="/create-account"
                    style={{
                      display: "block", padding: "13px", borderRadius: "14px",
                      border: "1.5px solid oklch(0.88 0.02 55)",
                      background: "white", color: "var(--charcoal)",
                      fontWeight: 600, fontSize: "0.9rem", textDecoration: "none",
                      transition: "all 0.2s",
                      textAlign: "center",
                      marginBottom: "20px",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--rose)"; (e.currentTarget as HTMLElement).style.color = "var(--rose)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.88 0.02 55)"; (e.currentTarget as HTMLElement).style.color = "var(--charcoal)"; }}
                  >
                    Create a Free Account 🌸
                  </Link>

                  <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "20px 0" }}>
                    <div style={{ flex: 1, height: "1px", background: "oklch(0.92 0.01 60)" }} />
                    <span style={{ fontSize: "0.7rem", color: "oklch(0.7 0.01 60)" }}>practitioners</span>
                    <div style={{ flex: 1, height: "1px", background: "oklch(0.92 0.01 60)" }} />
                  </div>

                  <p style={{ fontSize: "0.84rem", color: "oklch(0.55 0.01 60)", marginBottom: "10px" }}>
                    Are you a doctor or psychologist?
                  </p>
                  <button
                    type="button"
                    onClick={() => { setIsDoctor(true); setCredential(""); setError(""); }}
                    style={{
                      width: "100%", padding: "13px", borderRadius: "14px",
                      border: "1.5px solid oklch(0.88 0.02 55)",
                      background: "white", color: "var(--charcoal)",
                      fontWeight: 600, fontSize: "0.9rem", cursor: "pointer",
                      transition: "all 0.2s",
                      fontFamily: "var(--font-sans)",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.5 0.04 200)"; (e.currentTarget as HTMLElement).style.color = "oklch(0.5 0.04 200)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.88 0.02 55)"; (e.currentTarget as HTMLElement).style.color = "var(--charcoal)"; }}
                  >
                    Login as Doctor 🩺
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
