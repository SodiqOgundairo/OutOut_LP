import { motion } from "motion/react";
import avatarImg from "../../assets/images/floating/avatar.webp";
import calendarImg from "../../assets/images/floating/calendar.webp";
import creditCardImg from "../../assets/images/floating/credit-card.webp";
import expenseCardImg from "../../assets/images/floating/expense-card.webp";
import flameImg from "../../assets/images/floating/flame.webp";
import heartImg from "../../assets/images/floating/heart.webp";
import splitImg from "../../assets/images/floating/split.webp";
import tagImg from "../../assets/images/floating/tag.webp";

/**
 * Decorative floating elements for the privacy page background.
 *
 * Each piece is a real image (avatar, fire, heart, polls/airbnb pill, brunch
 * tag, calendar, $60 expense card, credit card) that drifts on a slow,
 * varied loop. `pointer-events-none` so they never block scrolling or clicks
 * on the policy card.
 *
 * Positions are tuned for desktop (md+). On small screens we hide the
 * heavier pieces and shrink the rest so the card stays the focal point.
 */

type FloatingItemProps = {
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  duration?: number;
  yRange?: number;
  rotateRange?: number;
  children: React.ReactNode;
};

function Floating({
  className = "",
  style,
  delay = 0,
  duration = 6,
  yRange = 12,
  rotateRange = 3,
  children,
}: FloatingItemProps) {
  return (
    <motion.div
      className={`pointer-events-none absolute ${className}`}
      style={style}
      initial={{ y: 0, rotate: 0 }}
      animate={{
        y: [0, -yRange, 0, yRange * 0.6, 0],
        rotate: [0, -rotateRange, 0, rotateRange, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}

export default function FloatingElements() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      {/* Top-left: avatar */}
      <Floating
        className="left-[3%] top-[14%] hidden md:block"
        delay={0.2}
        duration={7}
      >
        <img
          src={avatarImg}
          alt=""
          className="h-[72px] w-[72px] object-contain lg:h-[96px] lg:w-[96px]"
          style={{ filter: "drop-shadow(0 18px 36px rgba(0,0,0,0.55))" }}
        />
      </Floating>

      {/* Top-right: hot-pink credit card */}
      <Floating
        className="right-[4%] top-[12%] hidden md:block"
        delay={1.1}
        duration={8}
        rotateRange={5}
      >
        <img
          src={creditCardImg}
          alt=""
          className="h-[80px] w-auto lg:h-[104px]"
          style={{
            transform: "rotate(-14deg)",
            filter: "drop-shadow(0 22px 44px rgba(255, 47, 138, 0.5))",
          }}
        />
      </Floating>

      {/* Upper-mid-left: flame */}
      <Floating
        className="left-[20%] top-[7%] hidden lg:block"
        delay={0.6}
        duration={5.5}
        rotateRange={8}
      >
        <img
          src={flameImg}
          alt=""
          className="h-[56px] w-auto"
          style={{ filter: "drop-shadow(0 12px 26px rgba(254,76,75,0.45))" }}
        />
      </Floating>

      {/* Mid-right: heart */}
      <Floating
        className="right-[8%] top-[40%] hidden md:block"
        delay={2.0}
        duration={7.5}
        rotateRange={6}
      >
        <img
          src={heartImg}
          alt=""
          className="h-[64px] w-auto lg:h-[84px]"
          style={{
            transform: "rotate(12deg)",
            filter: "drop-shadow(0 18px 36px rgba(254, 76, 159, 0.55))",
          }}
        />
      </Floating>

      {/* Lower-left: "Should we split the Airbnb 5 ways?" poll pill */}
      <Floating
        className="left-[4%] bottom-[18%] hidden md:block"
        delay={0.9}
        duration={8.5}
        rotateRange={2}
      >
        <img
          src={splitImg}
          alt=""
          className="h-auto w-[200px] lg:w-[240px]"
          style={{
            transform: "rotate(-4deg)",
            filter: "drop-shadow(0 22px 48px rgba(100, 2, 51, 0.6))",
          }}
        />
      </Floating>

      {/* Lower-center: brunch tag */}
      <Floating
        className="left-[36%] bottom-[8%] hidden lg:block"
        delay={1.6}
        duration={6.5}
        rotateRange={5}
      >
        <img
          src={tagImg}
          alt=""
          className="h-auto w-[120px]"
          style={{
            transform: "rotate(-6deg)",
            filter: "drop-shadow(0 16px 36px rgba(69, 225, 186, 0.5))",
          }}
        />
      </Floating>

      {/* Mid-right-lower: calendar */}
      <Floating
        className="right-[3%] bottom-[20%] hidden md:block"
        delay={2.4}
        duration={7}
        rotateRange={4}
      >
        <img
          src={calendarImg}
          alt=""
          className="h-auto w-[72px] lg:w-[88px]"
          style={{
            transform: "rotate(8deg)",
            filter: "drop-shadow(0 18px 40px rgba(0,0,0,0.55))",
          }}
        />
      </Floating>

      {/* Bottom-left big: $60 holographic expense card */}
      <Floating
        className="left-[6%] bottom-[4%] hidden xl:block"
        delay={0.4}
        duration={9}
        yRange={8}
        rotateRange={1.5}
      >
        <img
          src={expenseCardImg}
          alt=""
          className="h-auto w-[280px] 2xl:w-[340px]"
          style={{
            transform: "rotate(-3deg)",
            filter: "drop-shadow(0 24px 50px rgba(0,0,0,0.45))",
          }}
        />
      </Floating>
    </div>
  );
}
