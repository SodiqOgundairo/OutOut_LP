import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "devign";
import Header from "../components/Header";
import FloatingElements from "../components/landing/FloatingElements";
import heroBg from "../assets/images/backgrounds/hero-bg.webp";

/**
 * 404 page. Reuses the privacy-page chrome (hero background, floating debris,
 * shared header) but swaps the centre piece for a broken "404": three digits
 * each rotated/skewed at different angles, with a chromatic split and a
 * non-synchronised electrical buzz so the page reads as visibly broken.
 *
 * Floating elements are pushed to the corners (variant="notfound") to keep
 * the middle clear for the giant numerals.
 */
export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Lost in transit. OutOut</title>
        <meta
          name="description"
          content="This page slipped out of the group chat. Head back home or tell us what you were looking for."
        />
      </Helmet>

      <main className="relative flex min-h-dvh w-full flex-col overflow-hidden bg-bg-primary text-fg-primary">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <img
            src={heroBg}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/85" />
        </div>

        <FloatingElements variant="notfound" />

        <div
          aria-hidden
          className="notfound-scanlines pointer-events-none absolute inset-0 z-[15] opacity-25 mix-blend-overlay"
        />

        <Header />

        <section className="content-container relative z-20 flex flex-1 flex-col items-center justify-center py-unit7 text-center">
          <BrokenNumbers />

          <p className="mx-auto mt-unit7 max-w-[44ch] text-p1 text-fg-secondary md:text-l2">
            Looks like this page slipped out of the group chat. The signal's a
            bit fuzzy here, let's get you back somewhere familiar.
          </p>

          <div className="mt-unit7 flex flex-wrap items-center justify-center gap-unit3">
            <Link to="/">
              <Button
                variant="primary"
                size="xl"
                className="!rounded-pill !h-12 !px-unit7 !text-l1 !font-semibold"
              >
                Back to home
              </Button>
            </Link>
            <a href="mailto:get@outout.app">
              <Button
                variant="ghost"
                size="xl"
                className="!rounded-pill !h-12 !px-unit6 !text-l1 !font-semibold !text-fg-primary hover:!bg-bg-tertiary"
              >
                Tell us what's missing
              </Button>
            </a>
          </div>
        </section>
      </main>
    </>
  );
}

function BrokenNumbers() {
  return (
    <div
      className="broken-404 font-sans"
      role="img"
      aria-label="Error 404, page not found"
    >
      <span
        className="broken-digit broken-digit-1 holo-text"
        style={{ ["--glitch-delay" as string]: "0s" }}
      >
        4
      </span>
      <span
        className="broken-digit broken-digit-2 holo-text"
        style={{ ["--glitch-delay" as string]: "0.6s" }}
      >
        0
      </span>
      <span
        className="broken-digit broken-digit-3 holo-text"
        style={{ ["--glitch-delay" as string]: "1.1s" }}
      >
        4
      </span>
    </div>
  );
}
