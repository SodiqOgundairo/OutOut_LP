import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import FloatingElements from "../components/landing/FloatingElements";
import heroBg from "../assets/images/backgrounds/hero-bg.webp";

/**
 * Privacy policy. The page itself is locked to viewport height on md+; the
 * card in the centre scrolls internally so the surrounding floating
 * decorations stay anchored. On mobile the page scrolls normally (a fixed
 * inner card on phones tends to fight with the soft keyboard / bottom bar).
 */
export default function Privacy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy. OutOut</title>
        <meta
          name="description"
          content="How OutOut collects, uses, and protects the information you share when you capture moments and plan with your group."
        />
      </Helmet>

      <main className="relative flex w-full flex-col bg-bg-primary text-fg-primary md:h-dvh md:overflow-hidden md:py-unit5">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <img
            src={heroBg}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/85" />
        </div>

        <FloatingElements />

        <Header />

        <section className="content-container relative z-20 flex justify-center py-unit7 md:flex-1 md:items-center md:py-unit7">
          <PolicyCard />
        </section>
      </main>
    </>
  );
}

function PolicyCard() {
  return (
    <article
      className="relative flex w-full max-w-[820px] flex-col overflow-hidden rounded-[28px] md:max-h-full"
      style={{
        background: "rgba(15, 15, 17, 0.72)",
        backdropFilter: "blur(28px) saturate(180%)",
        WebkitBackdropFilter: "blur(28px) saturate(180%)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow:
          "0 40px 120px -20px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(0, 0, 0, 0.4)",
      }}
    >
      <header
        className="shrink-0 px-unit7 pb-unit5 pt-unit7 md:px-unit9 md:pt-unit9"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
      >
        <h1 className="font-sans">
          <span
            className="holo-text font-sans font-bold leading-tight tracking-tight"
            style={{
              fontSize: "clamp(1.75rem, 4.6vw, 4.25rem)",
              letterSpacing: "-0.01em",
            }}
          >
            Privacy Policy
          </span>
        </h1>
      </header>

      {/* Scrollable body */}
      <div
        className="policy-scroll flex-1 overflow-y-auto px-unit7 py-unit7 md:px-unit9"
        style={{ maxHeight: "min(72vh, 720px)" }}
      >
        <PolicyContent />
      </div>
    </article>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-unit9 last:mb-unit3">
      {title && (
        <h2 className="mb-unit4 font-sans text-[1.25rem] font-bold tracking-tight text-fg-primary md:text-[1.4rem]">
          {title}
        </h2>
      )}
      <div className="space-y-unit4 text-p1 leading-relaxed text-fg-secondary">
        {children}
      </div>
    </section>
  );
}

function Bullets({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="space-y-unit3 pl-unit5">
      {items.map((item, i) => (
        <li key={i} className="relative text-p1 leading-relaxed text-fg-secondary">
          <span
            aria-hidden
            className="absolute left-[-1rem] top-[0.55rem] inline-block h-1.5 w-1.5 rounded-full bg-fg-brand"
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <span className="font-semibold text-fg-primary">{children}</span>;
}

function PolicyContent() {
  return (
    <>
      <Section title="">
        <p>
          OutOut ("we," "us," or "our") is committed to protecting your
          privacy. This Privacy Policy explains how we collect, use, store,
          and protect your personal information in accordance with the UK
          General Data Protection Regulation (UK GDPR) and other applicable
          data protection laws.
        </p>
      </Section>

      <Section title="Information We Collect">
        <p>We collect the following types of data when you use the OutOut app:</p>
        <Bullets
          items={[
            <><Label>Personal Data:</Label> Name, email address, phone number, and profile information.</>,
            <><Label>Location Data:</Label> To assist with event planning and location-based features (with your consent).</>,
            <><Label>Expense Data:</Label> Details related to expense tracking and cost-sharing activities (note: we do not process payment transactions).</>,
            <><Label>User Content:</Label> Photos, videos, comments, and other content shared within the app.</>,
            <><Label>Usage Data:</Label> Information about how you interact with the app, including device information, log data, and app usage statistics.</>,
          ]}
        />
      </Section>

      <Section title="How We Use Your Information">
        <p>We use your data to:</p>
        <Bullets
          items={[
            "Provide and improve our services.",
            "Facilitate trip planning, event coordination, and group expense management.",
            "Personalise user experience and recommend relevant content.",
            "Enable tracking and management of shared expenses (without processing payments).",
            "Communicate with you regarding updates, promotions, and customer support.",
            "Ensure security and prevent fraudulent activities.",
          ]}
        />
      </Section>

      <Section title="Legal Basis for Processing Data">
        <p>We process your personal data under the following legal bases:</p>
        <Bullets
          items={[
            <><Label>Consent:</Label> For processing data like location and marketing preferences.</>,
            <><Label>Contractual Necessity:</Label> To deliver our services as agreed.</>,
            <><Label>Legitimate Interest:</Label> For improving services, ensuring security, and preventing fraud.</>,
            <><Label>Legal Obligation:</Label> To comply with legal requirements.</>,
          ]}
        />
      </Section>

      <Section title="Data Sharing and Disclosure">
        <p>
          We may share data with service providers that help operate the app
          (e.g., cloud storage providers).
        </p>
        <p>
          Payment facilitation is managed entirely by third-party payment
          processors; OutOut does not process or store payment transaction
          data.
        </p>
        <p>We may disclose data if required by law or to protect our legal rights.</p>
        <p>We do not sell or rent your personal data to third parties.</p>
      </Section>

      <Section title="Google User Data">
        <p>We request <code className="rounded bg-white/8 px-1.5 py-0.5 font-mono text-[0.9em]">calendar.readonly</code> from Google.</p>
        <p>The three uses listed in Information We Collect.</p>
        <p>The Limited Use statement from How We Use Your Information.</p>
        <p>
          Revoke link:{" "}
          <a
            className="font-semibold text-fg-brand underline-offset-4 hover:underline"
            href="https://myaccount.google.com/permissions"
            target="_blank"
            rel="noreferrer"
          >
            https://myaccount.google.com/permissions
          </a>
          .
        </p>
        <p>Contact email for deletion requests.</p>
      </Section>

      <Section title="Data Retention">
        <p>
          We retain personal data only as long as necessary to fulfil the
          purposes outlined in this policy.
        </p>
      </Section>

      <Section title="Data Security">
        <p>
          We implement appropriate technical and organisational measures to
          protect your data.
        </p>
      </Section>

      <Section title="International Data Transfers">
        <p>
          If we transfer your data outside the UK, we ensure appropriate
          safeguards are in place to protect your information, in compliance
          with UK GDPR.
        </p>
      </Section>

      <Section title="Your Rights">
        <p>Under the UK GDPR, you have the right to:</p>
        <Bullets
          items={[
            "Access your personal data.",
            "Correct inaccurate or incomplete data.",
            "Request deletion of your data.",
            "Restrict or object to data processing.",
            "Data portability.",
            "Withdraw consent at any time (where consent was the basis for processing).",
          ]}
        />
      </Section>

      <Section title="Cookies and Tracking Technologies">
        <p>
          We use cookies and similar technologies to improve app performance
          and user experience.
        </p>
      </Section>

      <Section title="Changes to This Privacy Policy">
        <p>
          We may update this Privacy Policy from time to time. Significant
          changes will be communicated via the app or email.
        </p>
      </Section>

      <Section title="Contact Us">
        <p>
          If you have any questions or concerns about this Privacy Policy or
          how we handle your data, please contact us at:
        </p>
        <div className="space-y-unit2 rounded-2xl bg-white/4 p-unit5">
          <p className="text-fg-primary">
            <Label>OutOut</Label>
          </p>
          <p>
            <Label>Address:</Label> 17 Holywell Hill, St. Albans,
            Hertfordshire, AL1 1DT, United Kingdom.
          </p>
          <p>
            <Label>Email:</Label>{" "}
            <a
              className="font-semibold text-fg-brand underline-offset-4 hover:underline"
              href="mailto:hello@outout.app"
            >
              hello@outout.app
            </a>
          </p>
          <p>
            <Label>Phone:</Label> 07731782190
          </p>
        </div>
      </Section>
    </>
  );
}
