import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "devign";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import logoUrl from "../assets/images/logo/logo.webp";

/**
 * Shared site header. Used by both the landing page and the privacy page.
 * The "Privacy Policy" button reflects the active route so the user can
 * orient themselves at a glance.
 */
export default function Header() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const onPrivacy = location.pathname === "/privacy";

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("touchstart", onPointer, { passive: true });
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("touchstart", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="content-container relative z-40 flex shrink-0 items-center justify-between">
      <Link to="/" aria-label="OutOut home" className="shrink-0">
        <img
          src={logoUrl}
          alt="OutOut"
          width={174}
          height={28}
          className="h-7 w-auto"
        />
      </Link>

      <nav className="hidden items-center gap-unit3 md:flex">
        <a href="mailto:get@outout.app">
          <Button
            variant="ghost"
            size="xl"
            className="!rounded-pill !h-14 !px-unit7 !text-l0 !font-semibold !text-fg-primary hover:!bg-bg-tertiary"
          >
            Request Support
          </Button>
        </a>
        <Link to="/privacy">
          <Button
            variant="secondary"
            size="xl"
            className={`!rounded-pill !h-14 !px-unit7 !text-l0 !font-semibold ${
              onPrivacy
                ? "!bg-neutral-50 !text-neutral-900 hover:!bg-neutral-200"
                : "!text-fg-primary !bg-bg-tertiary hover:!bg-neutral-700"
            }`}
          >
            Privacy Policy
          </Button>
        </Link>
      </nav>

      <div className="relative md:hidden" ref={menuRef}>
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-haspopup="menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center rounded-full text-fg-primary transition-colors hover:bg-bg-tertiary active:bg-bg-tertiary"
        >
          {open ? <X size={22} strokeWidth={2.25} /> : <Menu size={22} strokeWidth={2.25} />}
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              role="menu"
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
              className="absolute right-0 top-full mt-2 min-w-[220px] origin-top-right overflow-hidden rounded-2xl"
              style={{
                background: "rgba(23, 23, 23, 0.55)",
                backdropFilter: "blur(22px) saturate(180%)",
                WebkitBackdropFilter: "blur(22px) saturate(180%)",
                border: "1px solid rgba(255, 255, 255, 0.10)",
                boxShadow: "0 24px 60px -12px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(0,0,0,0.2)",
              }}
            >
              <a
                href="mailto:get@outout.app"
                role="menuitem"
                onClick={() => setOpen(false)}
                className="block px-unit5 py-unit4 text-l1 font-semibold text-fg-primary transition-colors hover:bg-white/10"
              >
                Request Support
              </a>
              <div className="h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
              <Link
                to="/privacy"
                role="menuitem"
                onClick={() => setOpen(false)}
                className={`block px-unit5 py-unit4 text-l1 font-semibold text-fg-primary transition-colors hover:bg-white/10 ${
                  onPrivacy ? "bg-white/10" : ""
                }`}
              >
                Privacy Policy
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
