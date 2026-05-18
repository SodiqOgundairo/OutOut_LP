import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import memoryImg from "../../assets/images/features/memory.png";
import reactionsImg from "../../assets/images/features/reactions.png";
import eventImg from "../../assets/images/features/event.png";
import expensesImg from "../../assets/images/features/expenses.png";

/**
 * Feature carousel for the hero.
 *
 * Renders all three product cards at once: one is "front" (full size, focal),
 * the other two are scattered behind at smaller scale, rotated, and dimmed.
 * Every ~4s the front rotates to the next card. The two background slot
 * positions also reshuffle between a small set of hand-tuned "scenes" so each
 * transition feels fresh rather than a fixed rotation. Hovering (or tapping)
 * any background card promotes it to the front immediately.
 *
 * All three cards remain mounted and animate between slots — Motion handles
 * the springy position swaps and the scale/rotate/opacity transitions.
 */

type Card = {
  id: string;
  label: string;
  src: string;
  /** Natural card width at scale=1, used to size the rendered <img>. */
  width: number;
  height: number;
};

/**
 * Card dimensions are the "design max" — the size cards render at on xl+
 * viewports. Smaller breakpoints scale them down via sizeScale below so
 * the carousel grows naturally from mobile up to xl, instead of card sizes
 * being frozen.
 */
const CARDS: Card[] = [
  { id: "memory",    label: "Memory albums",   src: memoryImg,    width: 320, height: 400 },
  { id: "reactions", label: "Photo reactions", src: reactionsImg, width: 224, height: 420 },
  { id: "event",     label: "Event invites",   src: eventImg,     width: 248, height: 412 },
  { id: "expenses",  label: "Split expenses",  src: expensesImg,  width: 360, height: 268 },
];

type Slot = {
  x: number;
  y: number;
  scale: number;
  rotate: number;
  opacity: number;
  blur: number;
  z: number;
};

/**
 * Three "scenes" of [front, back-a, back-b] positions. Cycling through them
 * (in lock-step with the front rotation) means the same card never returns
 * to the exact same back position, which reads as a richer, more alive
 * shuffle than a 2-position toggle.
 *
 * Coordinates are in pixels relative to the container's centre; positions
 * are scaled down on smaller viewports via SCALE below.
 */
/**
 * Four-slot scenes for four cards: index 0 is the focal "front" slot, 1–3
 * are scattered around it at smaller scale + lower opacity + a bit of blur.
 * Four scenes total, so a full active-rotation cycles each card through
 * every position before repeating.
 */
/**
 * Front slot is scaled markedly larger than the back cards so the focal
 * card reads as ~2× the visual size of its neighbours — a clear hero,
 * not a peer among equals.
 */
const SCENES: [Slot, Slot, Slot, Slot][] = [
  [
    { x: 0,    y: 10,   scale: 1.3,  rotate: -2,  opacity: 1.0,  blur: 0,    z: 40 },
    { x: -280, y: -50,  scale: 0.52, rotate: -13, opacity: 0.55, blur: 1.4,  z: 18 },
    { x: 280,  y: 40,   scale: 0.56, rotate: 10,  opacity: 0.55, blur: 1.2,  z: 16 },
    { x: -130, y: 200,  scale: 0.45, rotate: 8,   opacity: 0.4,  blur: 2.0,  z: 12 },
  ],
  [
    { x: 10,   y: -10,  scale: 1.3,  rotate: 3,   opacity: 1.0,  blur: 0,    z: 40 },
    { x: 280,  y: -50,  scale: 0.54, rotate: 13,  opacity: 0.55, blur: 1.4,  z: 18 },
    { x: -290, y: 30,   scale: 0.5,  rotate: -10, opacity: 0.5,  blur: 1.4,  z: 16 },
    { x: 150,  y: 200,  scale: 0.45, rotate: -8,  opacity: 0.4,  blur: 2.0,  z: 12 },
  ],
  [
    { x: -10,  y: 20,   scale: 1.3,  rotate: -3,  opacity: 1.0,  blur: 0,    z: 40 },
    { x: -270, y: 170,  scale: 0.5,  rotate: 8,   opacity: 0.5,  blur: 1.5,  z: 18 },
    { x: 270,  y: -50,  scale: 0.56, rotate: -12, opacity: 0.55, blur: 1.2,  z: 16 },
    { x: 30,   y: -200, scale: 0.42, rotate: 5,   opacity: 0.4,  blur: 2.2,  z: 12 },
  ],
  [
    { x: 0,    y: 20,   scale: 1.3,  rotate: 2,   opacity: 1.0,  blur: 0,    z: 40 },
    { x: -60,  y: -200, scale: 0.42, rotate: -8,  opacity: 0.4,  blur: 2.2,  z: 12 },
    { x: 240,  y: 170,  scale: 0.5,  rotate: 10,  opacity: 0.5,  blur: 1.5,  z: 18 },
    { x: -290, y: 0,    scale: 0.54, rotate: -10, opacity: 0.55, blur: 1.2,  z: 16 },
  ],
];

const AUTO_INTERVAL_MS = 4200;

export default function FeatureShowcase() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  /**
   * Two breakpoint-free scale factors derived from the container width.
   *
   * - `posScale` scales the slot x/y offsets (positions tighten on smaller
   *   viewports so cards don't fly off the carousel area).
   * - `sizeScale` scales the visual size of each card (so the carousel
   *   actually grows from mobile up to xl rather than card sizes being
   *   frozen at the design max). Clamped higher than posScale on mobile so
   *   the active card stays readable on phones.
   *
   * Design baseline = 760 px container (xl).
   */
  const [posScale, setPosScale] = useState(1);
  const [sizeScale, setSizeScale] = useState(1);

  useEffect(() => {
    if (!wrapperRef.current) return;
    const measure = () => {
      if (!wrapperRef.current) return;
      const w = wrapperRef.current.clientWidth;
      // Design baseline = 820 px (the xl container max-width).
      setPosScale(Math.min(1, Math.max(0.45, w / 820)));
      setSizeScale(Math.min(1, Math.max(0.6, w / 820)));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(wrapperRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % CARDS.length);
      setSceneIndex((s) => (s + 1) % SCENES.length);
    }, AUTO_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [paused]);

  const promote = (i: number) => {
    if (i === activeIndex) return;
    setActiveIndex(i);
    setSceneIndex((s) => (s + 1) % SCENES.length);
  };

  return (
    <div
      ref={wrapperRef}
      // h is clamped against the actual hero-available space, computed as
      // 100vh - header - 40vh pills - main py - hero py ≈ 60vh - 140px.
      // This stops the carousel from overflowing into (and hiding) the pills
      // band on shorter desktops while still letting it scale up on tall xl.
      className="relative h-[320px] w-full max-w-[640px] sm:h-[380px] sm:max-w-[700px] md:h-[min(500px,calc(60vh-140px))] lg:h-[min(560px,calc(60vh-140px))] lg:max-w-[760px] xl:h-[min(620px,calc(60vh-140px))] xl:max-w-[860px]"
      onMouseLeave={() => setPaused(false)}
    >
      {CARDS.map((card, i) => {
        // Slot depth: 0 = front, 1 = back-a, 2 = back-b. Rotates with active.
        const depth = (i - activeIndex + CARDS.length) % CARDS.length;
        const slot = SCENES[sceneIndex][depth];
        const isFront = depth === 0;
        return (
          // Anchor: zero-sized point at the container's centre. The motion
          // div lives at this anchor and offsets itself from there. This
          // avoids fighting CSS centre-translate with Motion's transform.
          <div
            key={card.id}
            className="absolute left-1/2 top-1/2"
            style={{ width: 0, height: 0, zIndex: slot.z }}
          >
            <motion.button
              type="button"
              aria-label={`Show ${card.label}`}
              onMouseEnter={() => {
                setPaused(true);
                promote(i);
              }}
              onFocus={() => {
                setPaused(true);
                promote(i);
              }}
              onClick={() => promote(i)}
              className="absolute block cursor-pointer rounded-[24px] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary-400"
              style={{
                width: card.width,
                height: card.height,
                marginLeft: -card.width / 2,
                marginTop: -card.height / 2,
                transformOrigin: "center center",
              }}
              initial={false}
              animate={{
                x: slot.x * posScale,
                y: slot.y * posScale,
                scale: slot.scale * sizeScale,
                rotate: slot.rotate,
                opacity: slot.opacity,
                filter: `blur(${slot.blur}px)`,
              }}
              transition={{
                type: "spring",
                stiffness: 70,
                damping: 18,
                mass: 0.9,
              }}
            >
              <img
                src={card.src}
                alt={card.label}
                width={card.width}
                height={card.height}
                draggable={false}
                className="block h-full w-full select-none rounded-[24px] object-contain"
                style={{
                  filter: isFront
                    ? "drop-shadow(0 28px 60px rgba(0,0,0,0.45))"
                    : "drop-shadow(0 14px 36px rgba(0,0,0,0.35))",
                }}
              />
            </motion.button>
          </div>
        );
      })}
    </div>
  );
}
