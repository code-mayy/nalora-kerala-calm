import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { InnerNav } from "@/components/InnerNav";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Talk to Us – Nalora" },
      {
        name: "description",
        content:
          "Older adults, family members, caregivers, senior-care organisations and potential partners — we would like to hear from you.",
      },
    ],
  }),
  component: ContactPage,
});

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
      q: "Is Nalora a therapist or a medical service?",
      a: "No. Nalora is psychologically informed rather than medically positioned. It is not an AI therapist, a diagnostic system or a medical treatment platform, and it does not replace psychologists, doctors, caregivers or family relationships.",
    },
    {
      q: "Can family members see what was said on a call?",
      a: "Nalora is designed to include a dashboard for authorised family members, relatives or primary caregivers. With appropriate consent and privacy safeguards, it shows engagement and wellbeing-related signals — such as conversation frequency, general tone and areas that may need attention — without unnecessarily exposing private conversation content.",
    },
    {
      q: "What happens if something on a call needs human attention?",
      a: "Nalora is human-in-the-loop. Trained professionals remain responsible for risk review, escalation protocols, appropriate referrals and human follow-up when required.",
    },
    {
      q: "How often does Nalora call, and for how long?",
      a: "In the planned AI voice pilot, calls may be offered once, twice, three times a week or daily, depending on preference. Conversations may typically last around 5–20 minutes.",
    },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "var(--ivory)", fontFamily: "var(--font-sans)" }}>
      <InnerNav />

      {/* Hero Section */}
      <section
        style={{
          background:
            "linear-gradient(160deg, var(--sage-100) 0%, var(--sage-50) 60%, var(--sage-200) 100%)",
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
              color: "var(--clay)",
              marginBottom: "12px",
            }}
          >
            Talk to Us
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
            Stay connected to the <em className="italic text-rose">Nalora journey</em>
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              color: "oklch(0.45 0.01 150)",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            We are building Nalora carefully — with psychology, technology and human oversight at
            the centre. If you are an older adult, a family member, caregiver, senior-care
            organisation or potential partner, we would like to hear from you.
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
            <p style={{ color: "oklch(0.45 0.01 150)", marginBottom: "40px", lineHeight: 1.7 }}>
              Whether you want to learn more, join early access or explore a partnership, we aim
              to respond to all inquiries within 12-24 hours.
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
                    style={{ fontSize: "0.85rem", color: "oklch(0.55 0.01 150)", margin: "4px 0 0" }}
                  >
                    For general queries, early access and partnerships.
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
                    style={{ fontSize: "0.85rem", color: "oklch(0.55 0.01 150)", margin: "4px 0 0" }}
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
                    background: "oklch(0.96 0.03 145)",
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
                      color: "oklch(0.5 0.01 150)",
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
                <span style={{ fontSize: "3.5rem" }}>🌿</span>
                <h3 style={{ fontSize: "1.6rem", margin: "20px 0 10px", color: "var(--charcoal)" }}>
                  Thank you!
                </h3>
                <p style={{ color: "oklch(0.5 0.01 150)", lineHeight: 1.6, marginBottom: "30px" }}>
                  Your message has been sent successfully. Someone from the Nalora team will get in
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
                    <option value="early-access">Early Access</option>
                    <option value="family">Older Adult / Family Member</option>
                    <option value="partner">Senior-care Organisation / Partnership</option>
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
                    boxShadow: "0 4px 14px oklch(0.55 0.08 158 / 0.2)",
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
      <section style={{ background: "oklch(0.975 0.015 150)", padding: "80px 24px" }}>
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
                      color: "oklch(0.5 0.01 150)",
                      fontSize: "0.95rem",
                      lineHeight: 1.6,
                      borderTop: "1px solid oklch(0.97 0.01 150)",
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

      <SiteFooter />
    </div>
  );
}
