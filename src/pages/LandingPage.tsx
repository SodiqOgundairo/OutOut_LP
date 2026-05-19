import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import FeatureShowcase from "../components/landing/FeatureShowcase";
import SplashIntro from "../components/landing/SplashIntro";
import StoreBadges from "../components/landing/StoreBadges";
import heroBg from "../assets/images/backgrounds/hero-bg.webp";
import palmUrl from "../assets/images/logo/palm.svg";

// matter-js (~85KB) only lives in ScatteredPills, so we defer it to a
// separate chunk that loads after the hero is interactive.
const ScatteredPills = lazy(() => import("../components/landing/ScatteredPills"));

export default function LandingPage() {
  return (
    <>
      <Helmet>
        <title>OutOut. Capture, share, and relive every moment together.</title>
        <meta
          name="description"
          content="OutOut is the shared-memory app for groups, families, and friends. Photos, events, plans, and split bills, all in one place."
        />
      </Helmet>

      {/*
        Outer shell — locked to viewport height so the whole landing
        page (header + hero + pills) fits without scrolling.
        Background is full-bleed; only inner sections are capped at 1440px.
      */}
      <SplashIntro />
      <main className="relative flex w-full flex-col bg-bg-primary text-fg-primary md:h-dvh md:overflow-hidden md:py-unit5">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <img
            src={heroBg}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/85" />
        </div>

        <Header />
        <Hero />
        {/* Pills band breaks the 1440px cap to fill the screen and claims the
            remaining vertical space (flex-1) so it's always in view. */}
        <Suspense fallback={null}>
          <ScatteredPills />
        </Suspense>
      </main>
    </>
  );
}

function Hero() {
  return (
    <section className="content-container relative z-10 flex items-center justify-center py-unit10 md:flex-1 md:py-unit7">
      <div className="hero-grid">
        {/*
          Left column on desktop, top stack on mobile. DOM order on mobile
          becomes: title → body → badges → carousel (carousel is the
          second grid cell below).
        */}
        <div className="flex flex-col items-center gap-unit5 text-center md:items-start md:text-left">
          <h1 className="flex flex-col items-center gap-unit2 md:items-start">
            {/*
              fontSize on this wrapper exists so `gap: 0.6em` resolves
              against the title's actual size (em is inherited from the
              wrapper, not from the Title children). 0.6em consistently
              clears the rightward scaleX(1.18) overflow of "Every" at
              every breakpoint so "Every" never crashes into the palm.
            */}
            <span
              className="flex items-center"
              style={{
                fontSize: "clamp(1.75rem, 4.6vw, 4.25rem)",
                gap: "0.6em",
              }}
            >
              <Title>Every</Title>
              <img
                src={palmUrl}
                alt=""
                width={86}
                height={79}
                className="h-[2.5rem] w-auto md:h-[3.25rem] lg:h-[3.75rem] xl:h-[4.5rem]"
              />
              <Title>Moment</Title>
            </span>
            <Title>Worth keeping.</Title>
          </h1>

          <p className="max-w-[520px] text-p2 leading-relaxed text-fg-primary md:text-p1">
            Photos, plans, splits, polls, memories. OutOut keeps everything
            your group makes happen in one place that doesn't get lost in the
            chat.
          </p>

          <div className="flex justify-center md:justify-start">
            <StoreBadges />
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <FeatureShowcase />
        </div>
      </div>
    </section>
  );
}

function Title({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="holo-text font-sans font-black leading-tight tracking-tight"
      style={{
        fontSize: "clamp(1.75rem, 4.6vw, 4.25rem)",
        letterSpacing: "-0.01em",
      }}
    >
      {children}
    </span>
  );
}
