import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import logoUrl from "../../assets/images/logo/logo.webp";

/**
 * Splash intro that mirrors the mobile app's entrance:
 * fade-in + scale-up with blur clearing, a "breathe" pulse, then
 * a scale-out + fade reveal of the landing page underneath.
 *
 * Plays on every page load. Honors prefers-reduced-motion by skipping.
 */
export default function SplashIntro() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState<boolean>(() => !reduced);

  useEffect(() => {
    if (!visible) return;
    // Total budget: ~2.4s. Entrance 900ms + breathe 700ms + exit 600ms.
    const t = window.setTimeout(() => setVisible(false), 2400);
    return () => window.clearTimeout(t);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          // High z so it sits above header, hero, pills, etc.
          // pointer-events-none on the wrapper while exiting so the
          // landing page underneath becomes interactive immediately.
          className="fixed inset-0 z-[100] flex items-center justify-center bg-bg-primary"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } }}
          aria-hidden
        >
          <motion.img
            src={logoUrl}
            alt=""
            draggable={false}
            className="h-10 w-auto md:h-14 lg:h-16"
            initial={{ opacity: 0, scale: 0.78, filter: "blur(14px)" }}
            animate={{
              opacity: [0, 1, 1, 1, 1],
              scale: [0.78, 1.0, 1.05, 1.0, 1.32],
              filter: [
                "blur(14px)",
                "blur(0px)",
                "blur(0px)",
                "blur(0px)",
                "blur(10px)",
              ],
            }}
            transition={{
              duration: 2.3,
              times: [0, 0.38, 0.62, 0.78, 1],
              ease: ["easeOut", "easeInOut", "easeInOut", "easeIn"],
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
