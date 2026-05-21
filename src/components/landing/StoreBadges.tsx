import googlePlayBadge from "../../assets/images/badges/google-play-badge.png";
import appStoreBadge from "../../assets/images/badges/app-store-badge.png";

/**
 * Store badges. Single-image PNGs sized to match their natural aspect
 * (Google Play 203x60, App Store 180x60) so the artwork is never squashed.
 */
export default function StoreBadges() {
  return (
    <div className="flex items-center gap-unit3 md:gap-unit4">
      <a
        href="#"
        aria-label="Get it on Google Play"
        className="block transition-opacity hover:opacity-90"
      >
        <img
          src={googlePlayBadge}
          alt="Get it on Google Play"
          width={203}
          height={60}
          className="h-[42px] w-auto md:h-[48px]"
        />
      </a>

      <a
        href="https://apps.apple.com/us/app/outout/id6741428356"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Download on the App Store"
        className="block transition-opacity hover:opacity-90"
      >
        <img
          src={appStoreBadge}
          alt="Download on the App Store"
          width={180}
          height={60}
          className="h-[42px] w-auto md:h-[48px]"
        />
      </a>
    </div>
  );
}
