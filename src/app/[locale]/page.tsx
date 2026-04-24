import { setRequestLocale, getTranslations } from "next-intl/server";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { ContactForm } from "@/components/ContactForm";

type Work = {
  id: string;
  category: string;
  year: string;
  title: string;
  subtitle: string;
  problem: string;
  solution: string;
  stack: string[];
  href?: string;
};

type Capability = { id: string; name: string; description: string };
type Experience = {
  when: string;
  role: string;
  company: string;
  description: string;
  location: string;
};
type EducationItem = { institution: string; title: string; years: string };
type Certification = { title: string; issuer: string; year: string };
type StackCategory = { name: string; items: string[] };
type DirectoryItem = {
  key: string;
  channel: string;
  address: string;
  response: string;
  href: string | null;
};

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const works = t.raw("works.items") as Work[];
  const capabilities = t.raw("capabilities.items") as Capability[];
  const experience = t.raw("experience.items") as Experience[];
  const educationItems = t.raw("education.educationItems") as EducationItem[];
  const certifications = t.raw("education.certifications") as Certification[];
  const stack = t.raw("stack.categories") as StackCategory[];
  const directory = t.raw("contact.directory") as DirectoryItem[];

  return (
    <div className="relative min-h-screen">
      <Folio />

      <main className="max-w-[1320px] mx-auto px-6 md:px-10">
        {/* ───────────────────────── HERO ───────────────────────── */}
        <section id="top" className="pt-14 md:pt-20 pb-24 relative">
          <div className="absolute inset-0 dot-grid-bg opacity-50 pointer-events-none -z-10" />

          {/* Meta strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-8 rule-line border-t-0 border-b">
            <MetaCell label={t("hero.labelEditor")} value={t("hero.metaEditor")} />
            <MetaCell label={t("hero.labelOrigin")} value={t("hero.metaOrigin")} />
            <MetaCell label={t("hero.labelLanguage")} value={t("hero.metaLanguage")} />
          </div>

          <div className="mt-12 flex flex-col gap-6">
            <h1 className="font-display font-semibold leading-[0.95] tracking-[-0.02em] text-[clamp(52px,9vw,120px)] text-[color:var(--ink)] max-w-[14ch]">
              {t("hero.name")}
            </h1>
            <p className="font-display italic text-[color:var(--ink-soft)] text-[clamp(20px,2.4vw,32px)] leading-snug max-w-[32ch]">
              {t("hero.subtitle")}
            </p>
          </div>

          <p className="mt-14 max-w-[65ch] text-[19px] md:text-[20px] leading-[1.55] text-[color:var(--ink-soft)]">
            {t("hero.lead")}
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#works" className="btn-primary">
              {t("hero.ctaPrimary")}
              <span aria-hidden>→</span>
            </a>
            <a href="#contact" className="btn-ghost">
              {t("hero.ctaSecondary")}
            </a>
          </div>
        </section>

        {/* ───────────────────────── WORKS ───────────────────────── */}
        <section id="works" className="py-20 md:py-28">
          <SectionHead numeral={t("works.numeral")} heading={t("works.heading")} />
          <div className="flex flex-col rule-line border-b-0">
            {works.map((w) => (
              <WorkRow
                key={w.id}
                work={w}
                labels={{
                  problem: t("works.labelProblem"),
                  solution: t("works.labelSolution"),
                  stack: t("works.labelStack"),
                }}
              />
            ))}
          </div>
        </section>

        {/* ───────────────────── CAPABILITIES ───────────────────── */}
        <section id="capabilities" className="py-20 md:py-28 relative">
          <div className="absolute inset-0 dot-grid-fine opacity-40 pointer-events-none -z-10" />
          <SectionHead numeral={t("capabilities.numeral")} heading={t("capabilities.heading")} />
          <div className="border border-[color:var(--rule)] rounded-[4px] overflow-hidden">
            <div className="grid grid-cols-[80px_1.4fr_3fr] gap-4 px-5 py-3 bg-[color:var(--paper-dark)] mono-label">
              <span>{t("capabilities.colId")}</span>
              <span>{t("capabilities.colCapability")}</span>
              <span className="hidden md:block">{t("capabilities.colDescription")}</span>
            </div>
            {capabilities.map((c, i) => (
              <div
                key={c.id}
                className={`grid grid-cols-[80px_1.4fr_3fr] gap-4 px-5 py-4 items-baseline ${
                  i < capabilities.length - 1 ? "rule-line border-t-0 border-b" : ""
                }`}
              >
                <span className="font-mono text-[12px] text-[color:var(--accent)]">{c.id}</span>
                <span className="font-display font-semibold text-[16px] md:text-[17px]">
                  {c.name}
                </span>
                <span className="hidden md:block text-[15px] text-[color:var(--ink-soft)] leading-[1.5]">
                  {c.description}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ───────────────────── EXPERIENCE ───────────────────── */}
        <section id="experience" className="py-20 md:py-28">
          <SectionHead numeral={t("experience.numeral")} heading={t("experience.heading")} />
          <div className="rule-line border-b-0">
            {experience.map((e, i) => (
              <div
                key={`${e.company}-${i}`}
                className="grid grid-cols-1 md:grid-cols-[180px_1.5fr_2fr_auto] gap-4 md:gap-6 py-5 rule-line border-t-0 border-b items-baseline"
              >
                <span className="mono-label">{e.when}</span>
                <span className="font-display font-semibold text-[19px] md:text-[20px] leading-tight">
                  {e.role},{" "}
                  <em className="not-italic text-[color:var(--accent)] font-normal italic">
                    {e.company}
                  </em>
                </span>
                <span className="text-[15px] text-[color:var(--ink-soft)] leading-[1.5]">
                  {e.description}
                </span>
                <span className="font-display italic text-[14px] text-[color:var(--muted)] md:text-right">
                  {e.location}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ───────────────────── EDUCATION ───────────────────── */}
        <section id="education" className="py-20 md:py-28">
          <SectionHead numeral={t("education.numeral")} heading={t("education.heading")} />
          <div className="grid md:grid-cols-2 gap-10">
            <div className="flex flex-col">
              <h3 className="mono-label mb-3">{t("education.educationTitle")}</h3>
              <div className="rule-line border-b-0">
                {educationItems.map((ed, i) => (
                  <div key={i} className="py-4 rule-line border-t-0 border-b">
                    <p className="font-display font-semibold text-[18px]">{ed.title}</p>
                    <p className="text-[15px] text-[color:var(--ink-soft)]">{ed.institution}</p>
                    <p className="mono-label mt-1">{ed.years}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col">
              <h3 className="mono-label mb-3">{t("education.certificationsTitle")}</h3>
              <div className="rule-line border-b-0">
                {certifications.map((c, i) => (
                  <div key={i} className="py-4 rule-line border-t-0 border-b">
                    <p className="font-display font-semibold text-[18px]">{c.title}</p>
                    <p className="text-[15px] text-[color:var(--ink-soft)]">
                      {c.issuer} · {c.year}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ───────────────────────── STACK ───────────────────────── */}
        <section id="stack" className="py-20 md:py-28">
          <SectionHead numeral={t("stack.numeral")} heading={t("stack.heading")} />
          <div className="rule-line border-b-0">
            {stack.map((cat) => (
              <div
                key={cat.name}
                className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-3 md:gap-8 py-4 rule-line border-t-0 border-b items-baseline"
              >
                <span className="mono-label">{cat.name}</span>
                <span className="text-[16px] text-[color:var(--ink)] leading-[1.6]">
                  {cat.items.map((it, i) => (
                    <span key={it}>
                      {it}
                      {i < cat.items.length - 1 && (
                        <span className="text-[color:var(--accent)] mx-2" aria-hidden>
                          ·
                        </span>
                      )}
                    </span>
                  ))}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ───────────────────────── CONTACT ───────────────────────── */}
        <section id="contact" className="py-20 md:py-28">
          <SectionHead numeral={t("contact.numeral")} heading={t("contact.heading")} />
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="flex flex-col gap-5">
              <h3 className="mono-label">{t("contact.directoryTitle")}</h3>
              <div className="border border-[color:var(--rule)] rounded-[4px] overflow-hidden">
                <div className="hidden md:grid grid-cols-[120px_1fr_auto] gap-3 px-4 py-2 bg-[color:var(--paper-dark)] mono-label">
                  <span>{t("contact.colChannel")}</span>
                  <span>{t("contact.colAddress")}</span>
                  <span className="text-right">{t("contact.colResponse")}</span>
                </div>
                {directory.map((d, i) => {
                  const Row = (
                    <div
                      className={`grid grid-cols-1 md:grid-cols-[120px_1fr_auto] gap-1 md:gap-3 px-4 py-3 items-baseline ${
                        i < directory.length - 1 ? "rule-line border-t-0 border-b" : ""
                      } transition-colors ${d.href ? "hover:bg-[color:var(--accent-soft)]" : ""}`}
                    >
                      <span className="mono-label">{d.channel}</span>
                      <span className="font-body text-[16px] break-words">{d.address}</span>
                      <span className="mono-label md:text-right">{d.response}</span>
                    </div>
                  );
                  return d.href ? (
                    <a
                      key={d.key}
                      href={d.href}
                      target={d.href.startsWith("http") ? "_blank" : undefined}
                      rel={d.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="block"
                    >
                      {Row}
                    </a>
                  ) : (
                    <div key={d.key}>{Row}</div>
                  );
                })}
              </div>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      {/* ───────────────────────── FOOTER ───────────────────────── */}
      <footer className="max-w-[1320px] mx-auto px-6 md:px-10 mt-10">
        <div className="rule-double mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 pb-10 items-center">
          <span className="mono-label">{t("footer.left")}</span>
          <span
            aria-hidden
            className="font-display italic text-[color:var(--accent)] text-[22px] text-center"
          >
            AF
          </span>
          <span className="mono-label md:text-right">{t("footer.right")}</span>
        </div>
      </footer>
    </div>
  );
}

/* ───────────────── inline sub-components ───────────────── */

function Folio() {
  return <FolioBar />;
}

async function FolioBar() {
  const t = await getTranslations("folio");
  const navItems: Array<[string, string]> = [
    [t("navWorks"), "#works"],
    [t("navCapabilities"), "#capabilities"],
    [t("navExperience"), "#experience"],
    [t("navEducation"), "#education"],
    [t("navStack"), "#stack"],
    [t("navContact"), "#contact"],
  ];

  return (
    <header className="sticky top-0 z-40 bg-[color:var(--paper)]/85 backdrop-blur-[2px] border-b border-[color:var(--rule)]">
      <div className="max-w-[1320px] mx-auto px-6 md:px-10 py-3 grid grid-cols-[auto_1fr_auto] gap-4 items-center">
        <a
          href="#top"
          aria-label="Alan Faerverguer"
          className="font-display italic font-semibold text-[color:var(--accent)] text-[22px] leading-none"
        >
          AF
        </a>
        <div className="font-display font-semibold text-[15px] md:text-[17px] text-center whitespace-nowrap hidden md:block">
          {t("title")}
        </div>
        <div className="flex items-center gap-4 md:gap-6 justify-end">
          <nav className="hidden lg:flex gap-4 mono-label">
            {navItems.map(([label, href]) => (
              <a key={href} href={href} className="hover:text-[color:var(--ink)] transition-colors">
                {label}
              </a>
            ))}
          </nav>
          <LocaleSwitcher />
        </div>
      </div>
    </header>
  );
}

function MetaCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 pt-6">
      <span className="mono-label">{label}</span>
      <span className="font-mono text-[13px] text-[color:var(--ink)]">{value}</span>
    </div>
  );
}

function SectionHead({ numeral, heading }: { numeral: string; heading: string }) {
  return (
    <header className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4 md:gap-8 items-baseline pb-8 border-b border-[color:var(--rule)] mb-12">
      <span className="numeral text-[48px] md:text-[72px]">{numeral}</span>
      <h2 className="font-display font-semibold text-[40px] md:text-[56px] leading-[0.95] tracking-[-0.015em]">
        {heading}
      </h2>
    </header>
  );
}

function WorkRow({
  work,
  labels,
}: {
  work: Work;
  labels: { problem: string; solution: string; stack: string };
}) {
  return (
    <article className="work-row grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-8 py-8 rule-line border-t-0 border-b px-1 md:px-0">
      <div className="md:col-span-3 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[12px] text-[color:var(--accent)]">{work.id}</span>
          <span className="chip">{work.category}</span>
        </div>
        <span className="font-display italic text-[color:var(--ink-soft)] text-[22px] md:text-[26px]">
          {work.year}
        </span>
      </div>

      <div className="md:col-span-9 flex flex-col gap-4">
        <header className="flex flex-col gap-1">
          <h3 className="font-display font-semibold text-[24px] md:text-[28px] leading-[1.15] tracking-[-0.005em]">
            {work.href ? (
              <a
                href={work.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-baseline gap-2 hover:text-[color:var(--accent)] transition-colors"
              >
                {work.title}
                <span className="font-mono text-[14px] text-[color:var(--accent)]" aria-hidden>
                  ↗
                </span>
              </a>
            ) : (
              work.title
            )}
          </h3>
          <p className="mono-label">{work.subtitle}</p>
        </header>

        <dl className="grid md:grid-cols-[100px_1fr] gap-1 md:gap-4 mt-2">
          <dt className="mono-label pt-1">{labels.problem}</dt>
          <dd className="text-[16px] leading-[1.5] text-[color:var(--ink)]">{work.problem}</dd>
        </dl>
        <dl className="grid md:grid-cols-[100px_1fr] gap-1 md:gap-4 rule-line pt-3">
          <dt className="mono-label pt-1">{labels.solution}</dt>
          <dd className="text-[15px] leading-[1.55] text-[color:var(--ink-soft)]">
            {work.solution}
          </dd>
        </dl>
        <dl className="grid md:grid-cols-[100px_1fr] gap-1 md:gap-4 rule-line pt-3">
          <dt className="mono-label pt-1">{labels.stack}</dt>
          <dd className="flex flex-wrap gap-x-2 gap-y-1.5">
            {work.stack.map((s) => (
              <span key={s} className="font-mono text-[11px] text-[color:var(--ink-soft)]">
                {s}
                <span className="text-[color:var(--accent)] ml-2" aria-hidden>
                  ·
                </span>
              </span>
            ))}
          </dd>
        </dl>
      </div>
    </article>
  );
}
