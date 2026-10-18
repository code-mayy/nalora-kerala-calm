import { Link } from "@tanstack/react-router";

const COLUMNS = [
  {
    heading: "Nalora",
    links: [
      { label: "What is Nalora", href: "/#what-is-nalora" },
      { label: "How it works", href: "/#experience" },
      { label: "Human oversight", href: "/#oversight" },
      { label: "For families", href: "/#families" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Our pilot", href: "/#pilot" },
      { label: "Vision", href: "/#vision" },
      { label: "Partner with us", href: "/contact" },
    ],
  },
  {
    heading: "Connect",
    links: [
      { label: "Talk to us", href: "/contact" },
      { label: "Explore early access", href: "/create-account" },
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
];

export function SiteFooter({ animated = false }: { animated?: boolean }) {
  const reveal = animated ? "reveal reveal-up" : "";
  return (
    <footer
      id="footer"
      className="relative z-10 border-t border-border bg-[var(--sage-100)] py-14"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-4">
        <div className={reveal}>
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--forest)] text-white font-display">
              n
            </span>
            <span className="font-display text-xl text-[var(--forest-deep)]">nalora</span>
          </Link>
          <p className="mt-4 text-sm text-foreground/65 max-w-xs">
            The relationship layer for ageing. Human-centred AI for ageing well.
          </p>
        </div>
        {COLUMNS.map(({ heading, links }, idx) => (
          <div
            key={heading}
            className={reveal}
            style={animated ? { transitionDelay: `${100 + idx * 100}ms` } : undefined}
          >
            <div className="font-display text-sm uppercase tracking-[0.16em] text-[var(--forest)]/80">
              {heading}
            </div>
            <ul className="mt-4 space-y-2.5 text-sm">
              {links.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="text-foreground/75 hover:text-[var(--forest)] transition">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div
        className={`${reveal} mx-auto mt-12 flex max-w-6xl flex-col gap-1 px-6 text-xs text-foreground/55 sm:flex-row sm:justify-between`}
        style={animated ? { transitionDelay: "450ms" } : undefined}
      >
        <span>© {new Date().getFullYear()} Nalora Technologies.</span>
        <span className="italic">Helping people age with connection, meaning and dignity.</span>
      </div>
    </footer>
  );
}
