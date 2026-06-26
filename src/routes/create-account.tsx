import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";

export const Route = createFileRoute("/create-account")({
  head: () => ({
    meta: [
      { title: "Create Account – Nalora" },
      {
        name: "description",
        content:
          "Join Nalora and begin your postpartum care journey. Create your personal account in minutes.",
      },
    ],
  }),
  component: CreateAccount,
});

type FormData = {
  name: string;
  email: string;
  phone: string;
  gender: string;
  bystanderName: string;
  bystanderPhone: string;
  address: string;
  age: string;
};

const INITIAL: FormData = {
  name: "",
  email: "",
  phone: "",
  gender: "",
  bystanderName: "",
  bystanderPhone: "",
  address: "",
  age: "",
};

function StepDots({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2 justify-center mb-8">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className="transition-all duration-300"
          style={{
            display: "block",
            width: i === current ? "28px" : "8px",
            height: "8px",
            borderRadius: "99px",
            background:
              i === current
                ? "var(--rose)"
                : i < current
                  ? "var(--coconut)"
                  : "oklch(0.85 0.01 60)",
          }}
        />
      ))}
    </div>
  );
}

function InputField({
  label,
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
}: {
  label: string;
  id: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        style={{
          fontSize: "0.8rem",
          fontWeight: 600,
          letterSpacing: "0.05em",
          color: "oklch(0.45 0.01 60)",
          textTransform: "uppercase",
        }}
      >
        {label}
        {required && <span style={{ color: "var(--rose)", marginLeft: "4px" }}>*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        style={{
          width: "100%",
          padding: "14px 18px",
          borderRadius: "14px",
          border: "1.5px solid oklch(0.88 0.02 55)",
          background: "oklch(1 0 0 / 0.7)",
          backdropFilter: "blur(4px)",
          fontSize: "0.95rem",
          color: "var(--charcoal)",
          outline: "none",
          transition: "border-color 0.2s, box-shadow 0.2s",
          boxSizing: "border-box",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = "var(--rose)";
          e.target.style.boxShadow = "0 0 0 3px oklch(0.74 0.11 18 / 0.12)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "oklch(0.88 0.02 55)";
          e.target.style.boxShadow = "none";
        }}
      />
    </div>
  );
}

function Step1({
  data,
  update,
}: {
  data: FormData;
  update: (k: keyof FormData, v: string) => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div style={{ marginBottom: "4px" }}>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.7rem",
            fontWeight: 600,
            color: "var(--charcoal)",
            marginBottom: "6px",
          }}
        >
          About You
        </h2>
        <p style={{ color: "oklch(0.55 0.01 60)", fontSize: "0.9rem" }}>
          Let's start with your basic details.
        </p>
      </div>
      <InputField
        label="Full Name"
        id="name"
        value={data.name}
        onChange={(v) => update("name", v)}
        placeholder="e.g. Anjali Menon"
        required
      />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <InputField
          label="Email Address"
          id="email"
          type="email"
          value={data.email}
          onChange={(v) => update("email", v)}
          placeholder="you@email.com"
          required
        />
        <InputField
          label="Phone Number"
          id="phone"
          type="tel"
          value={data.phone}
          onChange={(v) => update("phone", v)}
          placeholder="+91 98765 43210"
          required
        />
      </div>
    </div>
  );
}

function Step2({
  data,
  update,
}: {
  data: FormData;
  update: (k: keyof FormData, v: string) => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div style={{ marginBottom: "4px" }}>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.7rem",
            fontWeight: 600,
            color: "var(--charcoal)",
            marginBottom: "6px",
          }}
        >
          Personal Details
        </h2>
        <p style={{ color: "oklch(0.55 0.01 60)", fontSize: "0.9rem" }}>
          Help us personalise your care experience.
        </p>
      </div>

      {/* Gender */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <label
          style={{
            fontSize: "0.8rem",
            fontWeight: 600,
            letterSpacing: "0.05em",
            color: "oklch(0.45 0.01 60)",
            textTransform: "uppercase",
          }}
        >
          Gender <span style={{ color: "var(--rose)" }}>*</span>
        </label>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          {["Female", "Male", "Non-binary", "Prefer not to say"].map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => update("gender", g)}
              style={{
                padding: "10px 20px",
                borderRadius: "99px",
                border: "1.5px solid",
                borderColor: data.gender === g ? "var(--rose)" : "oklch(0.88 0.02 55)",
                background: data.gender === g ? "oklch(0.74 0.11 18 / 0.1)" : "oklch(1 0 0 / 0.7)",
                color: data.gender === g ? "var(--rose)" : "oklch(0.45 0.01 60)",
                fontWeight: 500,
                fontSize: "0.88rem",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <InputField
        label="Age"
        id="age"
        type="number"
        value={data.age}
        onChange={(v) => update("age", v)}
        placeholder="e.g. 28"
        required
      />
      <InputField
        label="Home Address"
        id="address"
        value={data.address}
        onChange={(v) => update("address", v)}
        placeholder="Street, City, Kerala"
        required
      />
    </div>
  );
}

function Step3({
  data,
  update,
}: {
  data: FormData;
  update: (k: keyof FormData, v: string) => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div style={{ marginBottom: "4px" }}>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.7rem",
            fontWeight: 600,
            color: "var(--charcoal)",
            marginBottom: "6px",
          }}
        >
          Emergency Contact
        </h2>
        <p style={{ color: "oklch(0.55 0.01 60)", fontSize: "0.9rem" }}>
          A trusted person we can reach when you need extra support.
        </p>
      </div>
      <div
        style={{
          padding: "16px 20px",
          borderRadius: "16px",
          background: "oklch(0.74 0.11 18 / 0.07)",
          border: "1px solid oklch(0.74 0.11 18 / 0.18)",
          fontSize: "0.85rem",
          color: "oklch(0.45 0.08 18)",
          lineHeight: 1.6,
        }}
      >
        💛 A bystander can be your partner, parent, or close friend — someone who will journey
        alongside you.
      </div>
      <InputField
        label="Bystander's Full Name"
        id="bystanderName"
        value={data.bystanderName}
        onChange={(v) => update("bystanderName", v)}
        placeholder="e.g. Rahul Menon"
        required
      />
      <InputField
        label="Bystander's Phone Number"
        id="bystanderPhone"
        type="tel"
        value={data.bystanderPhone}
        onChange={(v) => update("bystanderPhone", v)}
        placeholder="+91 98765 43210"
        required
      />
    </div>
  );
}

function SuccessScreen() {
  return (
    <div style={{ textAlign: "center", padding: "40px 20px" }}>
      {/* Animated checkmark */}
      <div
        style={{
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, var(--rose), var(--sunset))",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 24px",
          boxShadow: "0 20px 60px oklch(0.74 0.11 18 / 0.35)",
          animation: "pop 0.4s ease",
        }}
      >
        <svg
          width="38"
          height="38"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "2rem",
          fontWeight: 600,
          color: "var(--charcoal)",
          marginBottom: "12px",
        }}
      >
        Welcome to Nalora 🌸
      </h2>
      <p
        style={{
          color: "oklch(0.55 0.01 60)",
          fontSize: "0.95rem",
          maxWidth: "340px",
          margin: "0 auto 32px",
          lineHeight: 1.7,
        }}
      >
        Your account has been created. You're now part of a caring community built just for you.
      </p>
      <Link
        to="/"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          padding: "14px 32px",
          borderRadius: "99px",
          background: "linear-gradient(135deg, var(--rose), var(--sunset))",
          color: "white",
          fontWeight: 600,
          fontSize: "0.95rem",
          textDecoration: "none",
          boxShadow: "0 12px 40px oklch(0.74 0.11 18 / 0.3)",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        }}
      >
        Go to Home
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
}

function CreateAccount() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(INITIAL);
  const [done, setDone] = useState(false);

  const TOTAL_STEPS = 3;

  function update(key: keyof FormData, value: string) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  function next(e: FormEvent) {
    e.preventDefault();
    if (step < TOTAL_STEPS - 1) {
      setStep((s) => s + 1);
    } else {
      setDone(true);
    }
  }

  function back() {
    setStep((s) => Math.max(0, s - 1));
  }

  const STEP_LABELS = ["Basic Info", "Personal Details", "Emergency Contact"];

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, oklch(0.985 0.012 60) 0%, oklch(0.96 0.03 18) 50%, oklch(0.97 0.02 55) 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 16px",
        fontFamily: "var(--font-sans)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative blobs */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "-80px",
          right: "-80px",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, oklch(0.74 0.11 18 / 0.12), transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "-60px",
          left: "-60px",
          width: "320px",
          height: "320px",
          borderRadius: "50%",
          background: "radial-gradient(circle, oklch(0.78 0.13 55 / 0.14), transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          width: "100%",
          maxWidth: "520px",
          background: "oklch(1 0 0 / 0.82)",
          backdropFilter: "blur(24px)",
          borderRadius: "28px",
          boxShadow: "0 32px 80px oklch(0.74 0.11 18 / 0.14), 0 4px 16px oklch(0 0 0 / 0.06)",
          border: "1px solid oklch(1 0 0 / 0.9)",
          overflow: "hidden",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header strip */}
        <div
          style={{
            background: "linear-gradient(135deg, var(--rose), var(--sunset))",
            padding: "28px 36px 24px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Link
              to="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                textDecoration: "none",
                color: "white",
                opacity: 0.9,
                fontSize: "0.85rem",
                fontWeight: 500,
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to Nalora
            </Link>
            <span
              style={{
                background: "oklch(1 0 0 / 0.2)",
                color: "white",
                borderRadius: "99px",
                padding: "4px 12px",
                fontSize: "0.78rem",
                fontWeight: 600,
                letterSpacing: "0.04em",
              }}
            >
              Step {step + 1} of {TOTAL_STEPS}
            </span>
          </div>
          <div style={{ marginTop: "20px" }}>
            <p
              style={{
                color: "oklch(1 0 0 / 0.75)",
                fontSize: "0.78rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "4px",
              }}
            >
              Create Account
            </p>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.9rem",
                fontWeight: 600,
                color: "white",
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              nalora
            </h1>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ height: "4px", background: "oklch(0.92 0.02 55)" }}>
          <div
            style={{
              height: "100%",
              width: `${((step + 1) / TOTAL_STEPS) * 100}%`,
              background: "linear-gradient(90deg, var(--rose), var(--sunset))",
              transition: "width 0.4s ease",
              borderRadius: "0 2px 2px 0",
            }}
          />
        </div>

        {/* Body */}
        <div style={{ padding: "36px 36px 28px" }}>
          {done ? (
            <SuccessScreen />
          ) : (
            <form onSubmit={next} noValidate>
              <StepDots current={step} total={TOTAL_STEPS} />

              {/* Step labels */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "20px",
                  marginBottom: "28px",
                }}
              >
                {STEP_LABELS.map((label, i) => (
                  <span
                    key={label}
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      color:
                        i === step
                          ? "var(--rose)"
                          : i < step
                            ? "var(--coconut)"
                            : "oklch(0.75 0.01 60)",
                      letterSpacing: "0.03em",
                      transition: "color 0.2s",
                    }}
                  >
                    {label}
                  </span>
                ))}
              </div>

              {/* Step content */}
              <div key={step} style={{ animation: "fadeSlideIn 0.3s ease" }}>
                {step === 0 && <Step1 data={data} update={update} />}
                {step === 1 && <Step2 data={data} update={update} />}
                {step === 2 && <Step3 data={data} update={update} />}
              </div>

              {/* Navigation */}
              <div style={{ display: "flex", gap: "12px", marginTop: "32px" }}>
                {step > 0 && (
                  <button
                    type="button"
                    onClick={back}
                    style={{
                      flex: "0 0 auto",
                      padding: "14px 24px",
                      borderRadius: "14px",
                      border: "1.5px solid oklch(0.88 0.02 55)",
                      background: "white",
                      color: "oklch(0.45 0.01 60)",
                      fontWeight: 600,
                      fontSize: "0.9rem",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--rose)";
                      (e.currentTarget as HTMLElement).style.color = "var(--rose)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.88 0.02 55)";
                      (e.currentTarget as HTMLElement).style.color = "oklch(0.45 0.01 60)";
                    }}
                  >
                    Back
                  </button>
                )}
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: "14px 24px",
                    borderRadius: "14px",
                    border: "none",
                    background: "linear-gradient(135deg, var(--rose), var(--sunset))",
                    color: "white",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    cursor: "pointer",
                    boxShadow: "0 8px 24px oklch(0.74 0.11 18 / 0.28)",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    letterSpacing: "0.02em",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 12px 32px oklch(0.74 0.11 18 / 0.38)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 8px 24px oklch(0.74 0.11 18 / 0.28)";
                  }}
                >
                  {step < TOTAL_STEPS - 1 ? "Continue →" : "Create My Account"}
                </button>
              </div>

              {step === 0 && (
                <p
                  style={{
                    textAlign: "center",
                    marginTop: "18px",
                    fontSize: "0.8rem",
                    color: "oklch(0.65 0.01 60)",
                  }}
                >
                  Already have an account?{" "}
                  <a
                    href="#"
                    style={{ color: "var(--rose)", fontWeight: 600, textDecoration: "none" }}
                  >
                    Sign in
                  </a>
                </p>
              )}
            </form>
          )}
        </div>
      </div>

      {/* Keyframes injected via style tag */}
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateX(18px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes pop {
          0% { transform: scale(0.5); opacity: 0; }
          70% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; }
      `}</style>
    </div>
  );
}
