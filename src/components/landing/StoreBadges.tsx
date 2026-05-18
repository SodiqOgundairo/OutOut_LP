import googlePlayLogo from "../../assets/images/badges/google-play-logo.svg";
import googlePlayGetItOn from "../../assets/images/badges/google-play-getiton.svg";
import googlePlayBadge from "../../assets/images/badges/google-play-badge.svg";
import appleLogo from "../../assets/images/badges/apple-logo.svg";
import appStoreDownload from "../../assets/images/badges/app-store-download.svg";
import appStoreBadge from "../../assets/images/badges/app-store-badge.svg";

/**
 * Store badges reconstructed from the Figma frame.
 *
 * The Figma assets are individual SVG fragments (just the wordmarks); the
 * "badge" is the dark rounded container plus three children (small "Get it
 * on" / "Download on the" line, the main store name, and the brand logo).
 * Coordinates below match the Figma percentages so the visual matches 1:1.
 */
export default function StoreBadges() {
  return (
    <div className="flex items-center gap-unit3 md:gap-unit5">
      <a
        href="#"
        aria-label="Get it on Google Play"
        className="relative block h-[44px] w-[148px] overflow-hidden rounded-[5px] border border-[#a6a6a6] bg-black transition-opacity hover:opacity-90 md:h-[60px] md:w-[202.5px]"
      >
        {/*
          Figma exported these three Google-Play SVGs already flipped — the
          source frame had them wrapped in `rotate(-180) scaleX(-1)` (i.e. a
          vertical flip). Reapply that flip here so the artwork reads
          right-side up. The App Store SVGs below don't need this.
        */}
        {/* Google Play coloured logo */}
        <img
          src={googlePlayLogo}
          alt=""
          className="absolute"
          style={{
            left: "7.39%",
            top: "17.85%",
            bottom: "17.85%",
            width: "17.04%",
            transform: "scaleY(-1)",
          }}
        />
        {/* "GET IT ON" small line */}
        <img
          src={googlePlayGetItOn}
          alt=""
          className="absolute"
          style={{
            left: "30.56%",
            right: "40.51%",
            top: "16.87%",
            height: "16.22%",
            transform: "scaleY(-1)",
          }}
        />
        {/* "Google Play" wordmark */}
        <img
          src={googlePlayBadge}
          alt=""
          className="absolute"
          style={{
            left: "30.4%",
            right: "6.8%",
            top: "42.62%",
            bottom: "14.81%",
            transform: "scaleY(-1)",
          }}
        />
      </a>

      <a
        href="#"
        aria-label="Download on the App Store"
        className="relative block h-[44px] w-[132px] overflow-hidden rounded-[7px] border border-[#a6a6a6] bg-[#0c0d10] transition-opacity hover:opacity-90 md:h-[60px] md:w-[180px]"
      >
        {/* Apple logo */}
        <img
          src={appleLogo}
          alt=""
          className="absolute"
          style={{
            left: "8.31%",
            right: "76.93%",
            top: "21.8%",
            bottom: "23.76%",
          }}
        />
        {/* "Download on the" small line */}
        <img
          src={appStoreDownload}
          alt=""
          className="absolute"
          style={{
            left: "29.71%",
            right: "12.66%",
            top: "21.04%",
            height: "15.93%",
          }}
        />
        {/* "App Store" wordmark */}
        <img
          src={appStoreBadge}
          alt=""
          className="absolute"
          style={{
            left: "28.71%",
            right: "8.73%",
            top: "44.43%",
            bottom: "16.26%",
          }}
        />
      </a>
    </div>
  );
}
