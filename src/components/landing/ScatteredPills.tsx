import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

// Eager-import every avatar in src/assets/images/avatars so Vite hashes and
// bundles them. PILL data references them by number via avatar(n).
const AVATAR_MODULES = import.meta.glob<string>(
  "../../assets/images/avatars/avatar-*.webp",
  { eager: true, import: "default", query: "?url" },
);
const AVATARS: Record<string, string> = {};
for (const [path, url] of Object.entries(AVATAR_MODULES)) {
  const m = path.match(/avatar-(\d+)\.webp$/);
  if (m) AVATARS[m[1]] = url;
}
const avatar = (n: number): string => AVATARS[String(n)];

/**
 * Pills band — physics-driven.
 *
 * Each pill is a Matter.js body shaped like its DOM (rounded chamfered rect).
 * Pills drop from the top of the band on a stagger, pile up on the floor,
 * lean on each other, and can be grabbed/thrown with the mouse.
 *
 * - MouseConstraint grabs whichever pill is under the cursor on mousedown
 *   and drags it with a soft (rubbery) constraint. Throwing imparts velocity.
 * - When mousedown lands on empty space, an invisible "hand" body follows the
 *   cursor and shoves pills aside — like running your hand through a pile.
 * - collisionStart events spawn dust particles at the contact point, scaled
 *   by impact speed.
 * - Each pill's drop-shadow grows with vertical speed so airborne pills feel
 *   higher than the ones at rest.
 */

type PillData = {
  label: string;
  avatar: string;
  bg: string;
  fg: "dark" | "light";
};

const PILLS: PillData[] = [
  { label: "split bills", avatar: avatar(1), bg: "var(--color-pill-acid)", fg: "dark" },
  { label: "memories", avatar: avatar(9), bg: "var(--color-pill-cyan)", fg: "dark" },
  { label: "hangouts", avatar: avatar(3), bg: "var(--color-pill-coral)", fg: "light" },
  { label: "trips", avatar: avatar(4), bg: "var(--color-purple-500)", fg: "light" },
  { label: "photos", avatar: avatar(10), bg: "var(--color-pill-mint)", fg: "dark" },
  { label: "albums", avatar: avatar(2), bg: "var(--color-pill-lilac)", fg: "dark" },
  { label: "rsvp", avatar: avatar(5), bg: "var(--color-pill-magenta)", fg: "light" },
  { label: "polls", avatar: avatar(7), bg: "var(--color-pill-mint)", fg: "dark" },
  { label: "group trips", avatar: avatar(2), bg: "var(--color-pill-lilac)", fg: "dark" },
  { label: "events", avatar: avatar(12), bg: "var(--color-pill-plum)", fg: "light" },
  { label: "partyyy", avatar: avatar(8), bg: "var(--color-amber-500)", fg: "dark" },
  { label: "calendar", avatar: avatar(5), bg: "var(--color-pill-plum)", fg: "light" },
  { label: "planning", avatar: avatar(6), bg: "var(--color-red-500)", fg: "light" },
  { label: "expenses", avatar: avatar(11), bg: "var(--color-pill-acid)", fg: "dark" },
  { label: "stories", avatar: avatar(3), bg: "var(--color-pink-500)", fg: "light" },
  { label: "rides", avatar: avatar(4), bg: "var(--color-blue-500)", fg: "light" },
  { label: "chats", avatar: avatar(6), bg: "var(--color-pill-coral)", fg: "light" },
  { label: "wishlist", avatar: avatar(1), bg: "var(--color-pill-mint)", fg: "dark" },
  { label: "vibes", avatar: avatar(11), bg: "var(--color-pill-magenta)", fg: "light" },
  // ── Second batch ─────────────────────────────────────────────────────
  { label: "brunch", avatar: avatar(8), bg: "var(--color-amber-500)", fg: "dark" },
  { label: "dinner", avatar: avatar(12), bg: "var(--color-pill-coral)", fg: "light" },
  { label: "game night", avatar: avatar(2), bg: "var(--color-purple-500)", fg: "light" },
  { label: "movie night", avatar: avatar(9), bg: "var(--color-blue-500)", fg: "light" },
  { label: "festival", avatar: avatar(7), bg: "var(--color-pill-magenta)", fg: "light" },
  { label: "concert", avatar: avatar(3), bg: "var(--color-pill-plum)", fg: "light" },
  { label: "road trip", avatar: avatar(1), bg: "var(--color-pill-acid)", fg: "dark" },
  { label: "weekend", avatar: avatar(5), bg: "var(--color-pill-mint)", fg: "dark" },
  { label: "beach day", avatar: avatar(4), bg: "var(--color-pill-cyan)", fg: "dark" },
  { label: "playlist", avatar: avatar(10), bg: "var(--color-pink-500)", fg: "light" },
  { label: "checklist", avatar: avatar(6), bg: "var(--color-pill-lilac)", fg: "dark" },
  { label: "budget", avatar: avatar(11), bg: "var(--color-pill-acid)", fg: "dark" },
  { label: "snacks", avatar: avatar(8), bg: "var(--color-pill-mint)", fg: "dark" },
  { label: "carpool", avatar: avatar(2), bg: "var(--color-red-500)", fg: "light" },
  { label: "meetup", avatar: avatar(12), bg: "var(--color-pill-cyan)", fg: "dark" },
  { label: "squad", avatar: avatar(7), bg: "var(--color-pill-coral)", fg: "light" },
  { label: "moments", avatar: avatar(9), bg: "var(--color-pill-lilac)", fg: "dark" },
  { label: "highlights", avatar: avatar(3), bg: "var(--color-amber-500)", fg: "dark" },
  { label: "host", avatar: avatar(4), bg: "var(--color-pill-plum)", fg: "light" },
];

const SPAWN_INTERVAL_MS = 170;
/** Pills added to the world per drop tick. Higher = the pile assembles faster. */
const SPAWN_BATCH_SIZE = 3;

/**
 * Pill count per viewport tier. Density needs to taper off on smaller
 * desktops or the pile spills over the walls / out of the band. Mobile
 * uses its own short count too, set in pickPillCount below.
 */
const MD_BREAKPOINT = 768;
const LG_BREAKPOINT = 1024;
const XL_BREAKPOINT = 1280;

function pickPillCount(viewportW: number): number {
  if (viewportW < MD_BREAKPOINT) return 14; // mobile
  if (viewportW < LG_BREAKPOINT) return 20; // md
  if (viewportW < XL_BREAKPOINT) return 26; // lg
  return PILLS.length;                      // xl+ uses the full pool
}

/** Fisher–Yates shuffle — returns a fresh shuffled array. */
function shuffle<T>(arr: readonly T[]): T[] {
  const copy = arr.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function ScatteredPills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dustLayerRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Pick a fresh random subset on every mount, sized to the viewport. Tiers
  // peak at xl and taper down through lg / md / mobile so the band stays
  // readable and pills never spill outside the walls at high density.
  const [pills] = useState<PillData[]>(() => {
    if (typeof window === "undefined") return PILLS.slice(0, 14);
    return shuffle(PILLS).slice(0, pickPillCount(window.innerWidth));
  });

  useEffect(() => {
    const container = containerRef.current;
    const dustLayer = dustLayerRef.current;
    if (!container || !dustLayer) return;

    const W = container.clientWidth;
    const H = container.clientHeight;

    // The pills' world extends from the band container *up to the top of the
    // viewport* so a thrown pill can fly above the band, across the hero, and
    // bounce off the top edge of the screen — instead of being clipped to the
    // bottom strip. We translate viewport-relative coords into the container's
    // local matter coords (container top = 0; viewport top = -container.top).
    const containerRect = container.getBoundingClientRect();
    const viewportH = window.innerHeight;
    // Clamp ceiling at or above the container's top so a scrolled-up
    // band can't have its ceiling slide INTO the container and pinch pills.
    const ceilingY = Math.min(0, -containerRect.top);
    const wallCenterY = viewportH / 2 - containerRect.top;
    const wallSpan = viewportH * 2;

    // ── Engine + walls ──────────────────────────────────────────────
    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 1.1, scale: 0.001 },
    });
    const world = engine.world;

    const wallThickness = 200;
    const floor = Matter.Bodies.rectangle(W / 2, H + wallThickness / 2, W * 2, wallThickness, { isStatic: true, friction: 0.6 });
    const ceiling = Matter.Bodies.rectangle(W / 2, ceilingY - wallThickness / 2, W * 2, wallThickness, { isStatic: true, restitution: 0.6 });
    const left = Matter.Bodies.rectangle(-wallThickness / 2, wallCenterY, wallThickness, wallSpan, { isStatic: true });
    const right = Matter.Bodies.rectangle(W + wallThickness / 2, wallCenterY, wallThickness, wallSpan, { isStatic: true });
    Matter.World.add(world, [floor, ceiling, left, right]);

    // ── Build bodies for each pill, sized to its DOM ────────────────
    type PillEntry = {
      body: Matter.Body;
      el: HTMLDivElement;
      w: number;
      h: number;
      /** Wall-clock ms when the body entered the world; 0 before drop. */
      spawnedAt: number;
    };
    const pills: PillEntry[] = [];

    pillRefs.current.forEach((el) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      // Distribute spawn points across the band — band-edges padded by the
      // pill half-width so pills don't immediately collide with the side walls.
      // Tiered y offsets stagger their entry vertically as well so they don't
      // all arrive at the same altitude.
      const xPad = w / 2 + 16;
      const spawnX = xPad + Math.random() * Math.max(1, W - xPad * 2);
      const spawnY = -h - 40 - Math.random() * 600;
      // Matter's chamfer is a polygon inscribed in the visual arc, so two
      // pills' physical bodies finish touching while their (true-arc) visual
      // rounded ends still have a small gap. Shrinking the collision shape
      // by a couple of pixels per side lets the visuals overlap by that
      // amount when bodies meet → no visible gap. Also crank chamfer quality
      // so the polygon approximation is much closer to the true arc.
      const SHRINK = 3;
      const bodyW = Math.max(2, w - SHRINK);
      const bodyH = Math.max(2, h - SHRINK);
      const body = Matter.Bodies.rectangle(spawnX, spawnY, bodyW, bodyH, {
        chamfer: { radius: bodyH / 2, qualityMin: 16, qualityMax: 30 },
        restitution: 0.32,
        friction: 0.55,
        frictionAir: 0.012,
        density: 0.0018,
        angle: (Math.random() - 0.5) * 0.6,
        slop: 0.005,
      });
      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.08);
      pills.push({ body, el, w, h, spawnedAt: 0 });
    });

    // ── Stagger drop ────────────────────────────────────────────────
    // Pills enter in batches so the pile assembles quickly (the previous
    // single-pill-per-tick cadence felt distractingly slow). Each pill in a
    // batch gets a tiny intra-batch stagger so they don't look like a
    // perfect simultaneous wave.
    let dropIndex = 0;
    const dropTimer = window.setInterval(() => {
      const base = performance.now();
      for (let n = 0; n < SPAWN_BATCH_SIZE; n++) {
        if (dropIndex >= pills.length) {
          window.clearInterval(dropTimer);
          return;
        }
        const p = pills[dropIndex++];
        p.spawnedAt = base + n * 25;
        Matter.World.add(world, p.body);
        p.el.style.opacity = "1";
      }
    }, SPAWN_INTERVAL_MS);

    // Container rect cached and refreshed only on scroll/resize. Reading
    // getBoundingClientRect on every pointer event forces layout and is one
    // of the bigger sources of drag stutter on mobile.
    let cachedRect = container.getBoundingClientRect();
    const refreshRect = () => { cachedRect = container.getBoundingClientRect(); };

    // ── Mouse: native grab + invisible hand for empty-space pushing ─
    const mouse = Matter.Mouse.create(container);
    // Default Matter mouse listens for wheel which blocks page scroll — disable.
    // @ts-expect-error — Matter's typings hide the wheel handler.
    if (mouse.element && mouse.mousewheel) mouse.element.removeEventListener("wheel", mouse.mousewheel);

    // Moderate stiffness + a bit of damping — picks feel responsive without
    // the high-stiffness oscillation that was making drags read as "glitchy".
    // A soft constraint means the body lags the cursor, so on release its
    // residual velocity is tiny. We compensate below by sampling the recent
    // cursor velocity and applying it directly to the body on enddrag.
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.25, damping: 0.1, render: { visible: false } },
    });
    Matter.World.add(world, mouseConstraint);

    // ── Throw-velocity transfer ─────────────────────────────────────
    // Cursor history is sampled every frame. CRITICAL: we must snapshot
    // velocity at the moment the user releases — if we wait until matter's
    // next-tick `enddrag` to read history, the buffer will already be
    // polluted with post-release stationary samples and the computed
    // velocity collapses to ~0 (this was the "throw hangs in midair" bug).
    const cursorHistory: Array<{ x: number; y: number; t: number }> = [];
    const CURSOR_HISTORY_MS = 220;
    const FLICK_SAMPLE_MS = 110;
    const MAX_THROW = 42;

    let pendingThrowVelocity: { x: number; y: number } | null = null;
    const captureThrowVelocity = () => {
      const tNow = performance.now();
      const recent = cursorHistory.filter((p) => p.t > tNow - FLICK_SAMPLE_MS);
      if (recent.length < 2) return;
      const first = recent[0];
      const last = recent[recent.length - 1];
      const dt = (last.t - first.t) / 1000;
      if (dt <= 0) return;
      let vx = (last.x - first.x) / dt / 60;
      let vy = (last.y - first.y) / dt / 60;
      const speed = Math.hypot(vx, vy);
      if (speed > MAX_THROW) {
        vx = (vx / speed) * MAX_THROW;
        vy = (vy / speed) * MAX_THROW;
      }
      pendingThrowVelocity = { x: vx, y: vy };
    };

    Matter.Events.on(mouseConstraint, "enddrag", (rawEvent) => {
      const body = (rawEvent as { body?: Matter.Body }).body;
      if (!body || !pendingThrowVelocity) return;
      Matter.Body.setVelocity(body, pendingThrowVelocity);
      pendingThrowVelocity = null;
    });

    // ── Window-level cursor + release tracking ──────────────────────
    // Matter's Mouse listens only on the container element. As soon as the
    // user drags a pill above the band (into the hero/header area) or
    // releases the click outside the container, Matter stops getting mouse
    // events and the constraint stays bound — the pill freezes in mid-air.
    // We mirror cursor position + release globally so dragging works
    // anywhere on the page.
    let handBody: Matter.Body | null = null;
    const updateMouseFromPoint = (clientX: number, clientY: number) => {
      mouse.position.x = clientX - cachedRect.left;
      mouse.position.y = clientY - cachedRect.top;
      if (handBody) {
        Matter.Body.setPosition(handBody, { x: mouse.position.x, y: mouse.position.y });
      }
    };
    const onDocMouseMove = (e: MouseEvent) => {
      if (mouseConstraint.body || handBody) updateMouseFromPoint(e.clientX, e.clientY);
    };
    const onDocTouchMove = (e: TouchEvent) => {
      if (!mouseConstraint.body && !handBody) return;
      if (e.touches.length > 0) updateMouseFromPoint(e.touches[0].clientX, e.touches[0].clientY);
    };
    const releaseDrag = () => {
      // Snapshot the throw velocity NOW (before any post-release stationary
      // cursor samples land in the history) so enddrag can apply it.
      if (mouseConstraint.body) captureThrowVelocity();
      // Setting button = -1 makes MouseConstraint release the bound body on
      // its next update tick (which fires our enddrag → setVelocity handler).
      mouse.button = -1;
      if (handBody) {
        Matter.World.remove(world, handBody);
        handBody = null;
      }
    };
    document.addEventListener("mousemove", onDocMouseMove);
    document.addEventListener("touchmove", onDocTouchMove, { passive: true });
    window.addEventListener("mouseup", releaseDrag);
    window.addEventListener("touchend", releaseDrag);
    window.addEventListener("touchcancel", releaseDrag);
    window.addEventListener("blur", releaseDrag);
    window.addEventListener("scroll", refreshRect, { passive: true });

    const onMouseDown = () => {
      // Wait a tick for MouseConstraint to bind a body, then create a hand if not.
      requestAnimationFrame(() => {
        if (mouseConstraint.body || handBody) return;
        const { x, y } = mouse.position;
        handBody = Matter.Bodies.circle(x, y, 32, {
          isStatic: true,
          friction: 0.2,
          restitution: 0.4,
          label: "hand",
        });
        Matter.World.add(world, handBody);
      });
    };
    container.addEventListener("mousedown", onMouseDown);

    // ── Dust particles on impact ────────────────────────────────────
    const dustPool: HTMLDivElement[] = [];
    const DUST_POOL_SIZE = 160;
    for (let i = 0; i < DUST_POOL_SIZE; i++) {
      const d = document.createElement("div");
      d.className = "pill-dust";
      d.style.opacity = "0";
      dustLayer.appendChild(d);
      dustPool.push(d);
    }
    let dustCursor = 0;
    const spawnDust = (x: number, y: number, intensity: number) => {
      // Scale count with impact speed but keep a healthy minimum so even
      // gentle landings produce a visible puff.
      const count = Math.min(14, Math.max(5, Math.round(intensity * 1.8)));
      const batch: HTMLDivElement[] = [];
      for (let i = 0; i < count; i++) {
        const d = dustPool[dustCursor];
        dustCursor = (dustCursor + 1) % DUST_POOL_SIZE;
        const angle = (Math.random() - 0.5) * Math.PI * 0.9 - Math.PI / 2;
        const dist = 18 + Math.random() * 36 + intensity * 2.5;
        const dx = Math.cos(angle) * dist;
        const dy = Math.sin(angle) * dist;
        const size = 6 + Math.random() * 10;
        const alpha = 0.55 + Math.random() * 0.35;
        d.style.cssText = `
          position: absolute;
          left: ${x - size / 2}px;
          top: ${y - size / 2}px;
          width: ${size}px;
          height: ${size}px;
          border-radius: 9999px;
          background: radial-gradient(circle at 35% 35%, rgba(255,255,255,${alpha.toFixed(3)}), rgba(220,220,220,${(alpha * 0.6).toFixed(3)}) 60%, rgba(180,180,180,0) 100%);
          pointer-events: none;
          filter: blur(1.5px);
          --dx: ${dx.toFixed(1)}px;
          --dy: ${dy.toFixed(1)}px;
        `;
        d.classList.remove("pill-dust-anim");
        batch.push(d);
      }
      // Force a single reflow for the whole batch (was once per particle —
      // each one stalled layout, which compounded into a visible hitch on
      // every pile collision).
      void dustLayer.offsetWidth;
      for (const d of batch) d.classList.add("pill-dust-anim");
    };

    Matter.Events.on(engine, "collisionStart", (event) => {
      for (const pair of event.pairs) {
        if (pair.bodyA.isStatic && pair.bodyB.isStatic) continue;
        // Speed of the non-static body in the pair
        const moving = pair.bodyA.isStatic ? pair.bodyB : pair.bodyA;
        const speed = Math.hypot(moving.velocity.x, moving.velocity.y);
        if (speed < 0.8) continue;
        const supports = pair.collision.supports;
        if (supports.length === 0) continue;
        const point = supports[0];
        spawnDust(point.x, point.y, speed);
      }
    });

    // ── Runner + render sync ────────────────────────────────────────
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

    // Zoom-in: each pill scales 0.55 → 1.0 over ENTRANCE_MS once it spawns.
    // Visual-only; the physics body's collision dimensions never change.
    const ENTRANCE_MS = 650;
    const MAX_DRAG_ANGULAR_VEL = 0.18;

    let raf = 0;
    const frame = () => {
      const now = performance.now();

      // Sample the cursor for the throw-velocity buffer.
      cursorHistory.push({ x: mouse.position.x, y: mouse.position.y, t: now });
      while (cursorHistory.length > 0 && cursorHistory[0].t < now - CURSOR_HISTORY_MS) {
        cursorHistory.shift();
      }

      // Keep the currently-dragged body from spinning out of control. With the
      // MouseConstraint anchored at the click point (Matter's default), a
      // tile grabbed near its end can rack up wild angular velocity in a
      // single fast swipe. Clamp it so the drag stays readable; throws after
      // release still keep whatever spin they carried.
      const dragged = mouseConstraint.body;
      if (dragged && Math.abs(dragged.angularVelocity) > MAX_DRAG_ANGULAR_VEL) {
        Matter.Body.setAngularVelocity(dragged, Math.sign(dragged.angularVelocity) * MAX_DRAG_ANGULAR_VEL);
      }
      for (const p of pills) {
        const { x, y } = p.body.position;
        let scale = 1;
        if (p.spawnedAt > 0) {
          const t = Math.min(1, (now - p.spawnedAt) / ENTRANCE_MS);
          // Ease-out cubic for a satisfying pop.
          const eased = 1 - Math.pow(1 - t, 3);
          scale = 0.55 + eased * 0.45;
        } else {
          scale = 0.55;
        }
        p.el.style.transform = `translate(${x - p.w / 2}px, ${y - p.h / 2}px) rotate(${p.body.angle}rad) scale(${scale.toFixed(3)})`;
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    // ── Resize: move walls to match new dimensions ──────────────────
    // Also re-clamp any pill that ended up outside the new walls. Without
    // this, shrinking the viewport leaves pills wedged inside the right/
    // bottom wall bodies, where the solver shoves them out at high speed
    // (or fails altogether and they fall through). Result: pills vanish.
    const onResize = () => {
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      const newRect = container.getBoundingClientRect();
      cachedRect = newRect;
      const newViewportH = window.innerHeight;
      // Clamp ceiling so it never moves INTO the container (which would
      // pinch pills against the floor). When the band is scrolled past the
      // top of the viewport, -rect.top is positive; cap it at 0.
      const newCeilingY = Math.min(0, -newRect.top);
      const newWallCenterY = newViewportH / 2 - newRect.top;
      Matter.Body.setPosition(floor, { x: newW / 2, y: newH + wallThickness / 2 });
      Matter.Body.setPosition(ceiling, { x: newW / 2, y: newCeilingY - wallThickness / 2 });
      Matter.Body.setPosition(right, { x: newW + wallThickness / 2, y: newWallCenterY });
      Matter.Body.setPosition(left, { x: -wallThickness / 2, y: newWallCenterY });

      for (const p of pills) {
        if (p.spawnedAt === 0) continue;
        const halfW = p.w / 2;
        const halfH = p.h / 2;
        let { x, y } = p.body.position;
        let moved = false;
        if (x < halfW + 2)        { x = halfW + 4; moved = true; }
        if (x > newW - halfW - 2) { x = newW - halfW - 4; moved = true; }
        if (y > newH - halfH - 2) { y = newH - halfH - 4; moved = true; }
        if (y < newCeilingY + halfH + 2) { y = newCeilingY + halfH + 4; moved = true; }
        if (moved) {
          Matter.Body.setPosition(p.body, { x, y });
          Matter.Body.setVelocity(p.body, { x: 0, y: 0 });
          Matter.Body.setAngularVelocity(p.body, 0);
        }
      }
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.clearInterval(dropTimer);
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mouseup", releaseDrag);
      window.removeEventListener("touchend", releaseDrag);
      window.removeEventListener("touchcancel", releaseDrag);
      window.removeEventListener("blur", releaseDrag);
      window.removeEventListener("scroll", refreshRect);
      document.removeEventListener("mousemove", onDocMouseMove);
      document.removeEventListener("touchmove", onDocTouchMove);
      container.removeEventListener("mousedown", onMouseDown);
      Matter.Runner.stop(runner);
      Matter.World.clear(world, false);
      Matter.Engine.clear(engine);
      // Clean dust pool DOM
      for (const d of dustPool) d.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      // overflow-visible + high z-index: a thrown pill is rendered above the
      // hero and header all the way up to the top of the viewport, where the
      // physics ceiling bounces it back down.
      className="relative z-30 h-[40vh] min-h-[260px] w-full shrink-0 select-none md:h-[42vh] md:min-h-[320px]"
      // Cursor switches to "grab" so the interactivity is discoverable.
      // touch-action: none stops mobile browsers from intercepting drags as
      // page scrolls — keeps the swipe inside the simulation.
      style={{ cursor: "grab", touchAction: "none" }}
      aria-hidden
    >
      {pills.map((p, i) => (
        <div
          key={i}
          ref={(el) => {
            pillRefs.current[i] = el;
          }}
          className="absolute left-0 top-0 flex origin-center items-center gap-1 rounded-pill py-[2px] pl-[2px] pr-[12px] md:gap-1.5 md:py-[3px] md:pl-[3px] md:pr-[16px] lg:gap-1.5 lg:py-[4px] lg:pl-[4px] lg:pr-[18px] xl:gap-2 xl:py-[5px] xl:pl-[5px] xl:pr-[22px]"
          style={{
            backgroundColor: p.bg,
            opacity: 0,
            willChange: "transform",
            // Static shadow. drop-shadow used to be set per-frame from the
            // body's vertical velocity, but re-rasterizing every pill every
            // frame was the main source of pile-up jank on mobile. A constant
            // box-shadow on the rounded chip looks ~identical with no cost.
            boxShadow: "0 6px 14px rgba(0,0,0,0.22)",
            transition: "opacity 750ms cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <img
            src={p.avatar}
            alt=""
            draggable={false}
            className="pointer-events-none size-[32px] rounded-full object-cover md:size-[38px] lg:size-[40px] xl:size-[47px]"
          />
          <span
            className="pill-label-wide whitespace-nowrap font-sans text-[18px] leading-none md:text-[20px] lg:text-[22px] xl:text-[28px]"
            style={{
              fontWeight: 600,
              letterSpacing: "-0.01em",
              color: p.fg === "dark" ? "var(--color-neutral-900)" : "var(--color-fg-primary)",
            }}
          >
            {p.label}
          </span>
        </div>
      ))}
      <div
        ref={dustLayerRef}
        aria-hidden
        className="pointer-events-none absolute inset-0"
      />
    </div>
  );
}
