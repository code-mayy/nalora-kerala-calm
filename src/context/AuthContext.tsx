import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";

export type AuthUser = {
  name: string;
  email: string;
  phone: string;
  role: "patient" | "doctor";
  specialization?: string;
};

type AuthContextType = {
  user: AuthUser | null;
  isLoading: boolean;
  login: (emailOrPhone: string, password: string, isDoctor?: boolean) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

const STORAGE_KEY = "nalora_auth_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Rehydrate from localStorage (client-side only)
    if (typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) setUser(JSON.parse(raw));
      } catch {
        // ignore
      }
    }
    setIsLoading(false);
  }, []);

  async function login(emailOrPhone: string, password: string, isDoctor?: boolean): Promise<{ ok: boolean; error?: string }> {
    // Simulate API call
    await new Promise((r) => setTimeout(r, 900));

    if (isDoctor) {
      if (!emailOrPhone.trim()) {
        return { ok: false, error: "Please enter your email address." };
      }
      if (!password.trim()) {
        return { ok: false, error: "Please enter your password." };
      }
      if (!emailOrPhone.includes("@")) {
        return { ok: false, error: "Please enter a valid email address." };
      }
      const mockDoctor: AuthUser = {
        name: "Dr. Aisha Menon",
        email: emailOrPhone,
        phone: "+91 94470 12345",
        role: "doctor",
        specialization: "Consultant Psychologist",
      };
      setUser(mockDoctor);
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mockDoctor));
      }
      return { ok: true };
    } else {
      if (!emailOrPhone.trim()) {
        return { ok: false, error: "Please enter your email or phone number." };
      }
      const isEmail = emailOrPhone.includes("@");
      const mockUser: AuthUser = {
        name: "Anjali Menon",
        email: isEmail ? emailOrPhone : "",
        phone: isEmail ? "" : emailOrPhone,
        role: "patient",
      };
      setUser(mockUser);
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mockUser));
      }
      return { ok: true };
    }
  }

  function logout() {
    setUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}

/** Wrap any page that requires authentication. Redirects to /login if not logged in. */
export function ProtectedPage({ children, allowedRole }: { children: ReactNode; allowedRole?: "patient" | "doctor" }) {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        navigate({ to: "/login" });
      } else if (allowedRole && user.role !== allowedRole) {
        // Role mismatch: redirect to their respective landing dashboards
        if (user.role === "doctor") {
          navigate({ to: "/doctor/dashboard" });
        } else {
          navigate({ to: "/doctors" });
        }
      }
    }
  }, [user, isLoading, navigate, allowedRole]);

  if (isLoading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--ivory)",
          fontFamily: "var(--font-sans)",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              border: "3px solid oklch(0.9 0.02 55)",
              borderTopColor: "var(--rose)",
              animation: "spin 0.8s linear infinite",
              margin: "0 auto 16px",
            }}
          />
          <p style={{ color: "oklch(0.6 0.01 60)", fontSize: "0.9rem" }}>Loading…</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!user || (allowedRole && user.role !== allowedRole)) return null;

  return <>{children}</>;
}
