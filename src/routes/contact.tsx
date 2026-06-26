import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { InnerNav } from "@/components/InnerNav";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us – Nalora" },
      {
        name: "description",
        content:
          "Get in touch with Nalora support, send feedback, or ask questions about our postpartum care services.",
      },
    ],
  }),
  component: ContactPage,
});

function Footer() {
  return (
    <footer className="border-t border-border bg-[var(--ivory-deep)] py-14">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--gradient-sunset)] text-white font-display">
              n
            </span>
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
            <div className="font-display text-sm uppercase tracking-[0.16em] text-foreground/60">
              {h}
            </div>
            <ul className="mt-4 space-y-2.5 text-sm">
              {(items as string[]).map((i) => (
                <li key={i}>
                  <a href="#" className="text-foreground/75 hover:text-rose transition">
                    {i}
                  </a>
                </li>
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

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("general");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1000);
  }

  // FAQ accordion state
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const FAQS = [
    {
      q: "Is my data and conversations safe on Nalora?",
      a: "Yes, confidentiality is our highest priority. All your notes, chats, and medical records are end-to-end encrypted. We never sell your personal information or share it with third parties without your explicit medical request.",
    },
    {
      q: "How are therapists matched to me?",
      a: "When you start, we evaluate your responses regarding sleep, anxiety, preferred language, and clinical requirements. Then, our coordinator manually matches you with the licensed perinatal psychologist who best fits your clinical profile, typically within 24 hours.",
    },
    {
      q: "Can my husband or partner join my circle?",
      a: "Absolutely. Nalora's unique 'Family Circle' allows you to add up to three family members (e.g. husband, mother, mother-in-law) to your account dashboard for free. They get their own access to help coordinate your recovery, monitor guidelines, and learn postpartum wellness care.",
    },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "var(--ivory)", fontFamily: "var(--font-sans)" }}>
      <InnerNav />

      {/* Hero Section */}
      <section
        style={{
          background:
            "linear-gradient(160deg, oklch(0.97 0.025 55) 0%, oklch(0.96 0.03 18) 60%, oklch(0.96 0.02 145) 100%)",
          padding: "80px 24px 60px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <p
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--rose)",
              marginBottom: "12px",
            }}
          >
            Get In Touch
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
              fontWeight: 500,
              color: "var(--charcoal)",
              margin: "0 0 20px",
              lineHeight: 1.15,
            }}
          >
            We're Here for <em className="italic text-rose">You</em>
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              color: "oklch(0.45 0.01 60)",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Have questions about subscriptions, billing, therapist credentials, or need support?
            Reach out, and our team will get back to you promptly.
          </p>
        </div>
      </section>

      {/* Main Grid: Form and details */}
      <section style={{ padding: "80px 24px", maxWidth: "1100px", margin: "0 auto" }}>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr", gap: "50px" }}
          className="md:grid-cols-2"
        >
          {/* Contact Details Card */}
          <div>
            <h2 style={{ fontSize: "2rem", marginBottom: "24px", color: "var(--charcoal)" }}>
              Direct <em className="italic text-rose">Channels</em>
            </h2>
            <p style={{ color: "oklch(0.45 0.01 60)", marginBottom: "40px", lineHeight: 1.7 }}>
              Our support team and coordinators operate out of Kochi, Kerala. We aim to respond to
              all inquiries within 12-24 hours.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
              <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                <span
                  style={{
                    fontSize: "1.5rem",
                    padding: "12px",
                    background: "var(--rose-soft)",
                    borderRadius: "14px",
                  }}
                >
                  ✉️
                </span>
                <div>
                  <h4
                    style={{
                      fontWeight: 600,
                      color: "var(--charcoal)",
                      fontSize: "1.05rem",
                      margin: "0 0 4px",
                    }}
                  >
                    Support Email
                  </h4>
                  <a
                    href="mailto:support@nalora.care"
                    style={{ color: "var(--rose)", textDecoration: "none", fontWeight: 500 }}
                  >
                    support@nalora.care
                  </a>
                  <p
                    style={{ fontSize: "0.85rem", color: "oklch(0.55 0.01 60)", margin: "4px 0 0" }}
                  >
                    For general queries, billing, or technical concerns.
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                <span
                  style={{
                    fontSize: "1.5rem",
                    padding: "12px",
                    background: "var(--coconut-soft)",
                    borderRadius: "14px",
                  }}
                >
                  📞
                </span>
                <div>
                  <h4
                    style={{
                      fontWeight: 600,
                      color: "var(--charcoal)",
                      fontSize: "1.05rem",
                      margin: "0 0 4px",
                    }}
                  >
                    WhatsApp & Helpline
                  </h4>
                  <a
                    href="tel:+919876543210"
                    style={{ color: "var(--rose)", textDecoration: "none", fontWeight: 500 }}
                  >
                    +91 98765 43210
                  </a>
                  <p
                    style={{ fontSize: "0.85rem", color: "oklch(0.55 0.01 60)", margin: "4px 0 0" }}
                  >
                    Available Mon–Sat, 9:00 AM to 6:00 PM IST.
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                <span
                  style={{
                    fontSize: "1.5rem",
                    padding: "12px",
                    background: "oklch(0.96 0.03 55)",
                    borderRadius: "14px",
                  }}
                >
                  📍
                </span>
                <div>
                  <h4
                    style={{
                      fontWeight: 600,
                      color: "var(--charcoal)",
                      fontSize: "1.05rem",
                      margin: "0 0 4px",
                    }}
                  >
                    Nalora Head Office
                  </h4>
                  <p
                    style={{
                      fontSize: "0.95rem",
                      color: "oklch(0.5 0.01 60)",
                      margin: 0,
                      lineHeight: 1.6,
                    }}
                  >
                    Nalora Care Private Limited,
                    <br />
                    Infopark Campus, Kakkanad,
                    <br />
                    Kochi, Kerala — 682030
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div
            style={{
              background: "white",
              padding: "40px",
              borderRadius: "32px",
              border: "1px solid var(--border)",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            {submitted ? (
              <div style={{ textAlign: "center", padding: "40px 10px" }}>
                <span style={{ fontSize: "3.5rem" }}>🌸</span>
                <h3 style={{ fontSize: "1.6rem", margin: "20px 0 10px", color: "var(--charcoal)" }}>
                  Thank you!
                </h3>
                <p style={{ color: "oklch(0.5 0.01 60)", lineHeight: 1.6, marginBottom: "30px" }}>
                  Your message has been sent successfully. One of our care coordinators will get in
                  touch with you shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setName("");
                    setEmail("");
                    setMessage("");
                  }}
                  style={{
                    padding: "10px 24px",
                    borderRadius: "99px",
                    border: "1.5px solid var(--rose)",
                    background: "none",
                    color: "var(--rose)",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", gap: "20px" }}
              >
                <h3 style={{ fontSize: "1.4rem", margin: "0 0 10px", color: "var(--charcoal)" }}>
                  Send a Message
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label
                    htmlFor="contact-name"
                    style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--charcoal)" }}
                  >
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Anjali Nair"
                    style={{
                      padding: "12px 16px",
                      borderRadius: "12px",
                      border: "1.5px solid var(--border)",
                      fontSize: "0.95rem",
                      color: "var(--charcoal)",
                      outline: "none",
                    }}
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label
                    htmlFor="contact-email"
                    style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--charcoal)" }}
                  >
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. anjali@example.com"
                    style={{
                      padding: "12px 16px",
                      borderRadius: "12px",
                      border: "1.5px solid var(--border)",
                      fontSize: "0.95rem",
                      color: "var(--charcoal)",
                      outline: "none",
                    }}
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label
                    htmlFor="contact-category"
                    style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--charcoal)" }}
                  >
                    What is this about?
                  </label>
                  <select
                    id="contact-category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={{
                      padding: "12px 16px",
                      borderRadius: "12px",
                      border: "1.5px solid var(--border)",
                      fontSize: "0.95rem",
                      color: "var(--charcoal)",
                      outline: "none",
                      background: "white",
                    }}
                  >
                    <option value="general">General Inquiry</option>
                    <option value="billing">Subscription & Billing</option>
                    <option value="clinical">Clinical / Therapist Inquiry</option>
                    <option value="feedback">Feedback & Suggestions</option>
                  </select>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label
                    htmlFor="contact-message"
                    style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--charcoal)" }}
                  >
                    Your Message
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we support you today?"
                    style={{
                      padding: "12px 16px",
                      borderRadius: "12px",
                      border: "1.5px solid var(--border)",
                      fontSize: "0.95rem",
                      color: "var(--charcoal)",
                      outline: "none",
                      resize: "vertical",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    marginTop: "10px",
                    padding: "14px 20px",
                    borderRadius: "99px",
                    background: "linear-gradient(135deg, var(--rose), var(--sunset))",
                    color: "white",
                    fontWeight: 600,
                    border: "none",
                    cursor: submitting ? "not-allowed" : "pointer",
                    boxShadow: "0 4px 14px oklch(0.74 0.11 18 / 0.2)",
                  }}
                >
                  {submitting ? "Sending..." : "Submit Inquiry"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section style={{ background: "oklch(0.975 0.015 55)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2
            style={{
              textAlign: "center",
              fontSize: "2rem",
              marginBottom: "40px",
              color: "var(--charcoal)",
            }}
          >
            Frequently Asked <em className="italic text-rose">Questions</em>
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {FAQS.map((faq, index) => (
              <div
                key={index}
                style={{
                  background: "white",
                  borderRadius: "18px",
                  border: "1px solid var(--border)",
                  overflow: "hidden",
                  boxShadow: "0 2px 8px oklch(0 0 0 / 0.02)",
                }}
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  style={{
                    width: "100%",
                    padding: "20px 24px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <span
                    style={{
                      fontSize: "1.05rem",
                      fontWeight: 600,
                      color: "var(--charcoal)",
                      fontFamily: "var(--font-sans)",
                    }}
                  >
                    {faq.q}
                  </span>
                  <span
                    style={{
                      fontSize: "1.2rem",
                      color: "var(--rose)",
                      transition: "transform 0.25s",
                      transform: activeFaq === index ? "rotate(45deg)" : "rotate(0)",
                    }}
                  >
                    ＋
                  </span>
                </button>
                {activeFaq === index && (
                  <div
                    style={{
                      padding: "0 24px 24px",
                      color: "oklch(0.5 0.01 60)",
                      fontSize: "0.95rem",
                      lineHeight: 1.6,
                      borderTop: "1px solid oklch(0.97 0.01 60)",
                      paddingTop: "16px",
                    }}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
