// Semantic color tokens — dark theme.
// Source of truth: OutOut Flutter app lib/design_system/tokens/semantic.dart
import {
  Amber,
  Blue,
  BrandPrimary,
  Fuchsia,
  Green,
  Lime,
  Neutral,
  Pink,
  Purple,
  Red,
  Rose,
  Slate,
} from "./primitives";

export const Colors = {
  // Background — System
  bgPrimary: Neutral.s1000,
  bgSecondary: Neutral.s900,
  bgTertiary: Neutral.s800,
  bgBlur: "rgba(255,255,255,0.08)",
  bgInverse: Neutral.s50,
  bgOverlay: "rgba(5,5,5,0.8)",

  // Background — Red (Negative)
  bgRedLight: "rgba(222,17,53,0.10)",
  bgRedDefault: Red.s500,
  bgRedDarken: Red.s700,

  // Background — Success
  bgSuccessLight: "rgba(11,176,47,0.10)",
  bgSuccessDefault: Green.s500,
  bgSuccessDarken: Green.s700,

  // Background — Blue
  bgBlueLight: "rgba(0,123,255,0.10)",
  bgBlueDefault: Blue.s500,
  bgBlueDarken: Blue.s700,

  // Background — Cyan
  bgCyanLight: "rgba(6,182,212,0.10)",
  bgCyanDefault: "#06B6D4",
  bgCyanDarken: "#0E7490",

  // Background — Lime
  bgLimeLight: "rgba(132,204,22,0.10)",
  bgLimeDefault: Lime.s500,
  bgLimeDarken: Lime.s700,

  // Background — Amber
  bgAmberLight: "rgba(255,165,0,0.10)",
  bgAmberDefault: Amber.s500,
  bgAmberDarken: Amber.s700,

  // Background — Purple
  bgPurpleLight: "rgba(112,91,250,0.10)",
  bgPurpleDefault: Purple.s500,
  bgPurpleDarken: Purple.s700,

  // Background — Fuchsia
  bgFuchsiaLight: "rgba(217,70,239,0.10)",
  bgFuchsiaDefault: Fuchsia.s500,
  bgFuchsiaDarken: Fuchsia.s700,

  // Background — Pink
  bgPinkLight: "rgba(236,72,153,0.10)",
  bgPinkDefault: Pink.s500,
  bgPinkDarken: Pink.s700,

  // Background — Rose
  bgRoseLight: "rgba(244,63,94,0.10)",
  bgRoseDefault: Rose.s500,
  bgRoseDarken: Rose.s700,

  // Background — Brand
  bgBrandPrimaryLight: "rgba(254,171,76,0.10)",
  bgBrandPrimaryDefault: BrandPrimary.s400,
  bgBrandPrimaryDarken: BrandPrimary.s700,
  bgBrandPrimaryDarken2: BrandPrimary.s800,

  // Background — Nav
  bgNavDefault: Neutral.s1000,
  bgNavElevated: "rgba(10,10,10,0.70)",

  // Foreground — System
  fgPrimary: Slate.s50,
  fgSecondary: "rgba(248,250,252,0.60)",
  fgTertiary: "rgba(248,250,252,0.45)",
  fgDisabled: "rgba(248,250,252,0.35)",
  fgOnColor: Neutral.s50,
  fgOnColorAlt: Slate.s900,
  fgBrandPrimary: BrandPrimary.s400,
  fgRed: Red.s400,
  fgGreen: Green.s400,
  fgBlue: Blue.s300,
  fgLime: Lime.s300,
  fgAmber: Amber.s300,
  fgPurple: Purple.s400,
  fgFuchsia: Fuchsia.s300,
  fgPink: Pink.s400,
  fgRose: Rose.s400,

  // Stroke — System
  strokePrimary: "rgba(248,250,252,0.10)",
  strokeSecondary: "rgba(248,250,252,0.06)",
  strokeDisabled: "rgba(248,250,252,0.10)",
  strokeOnColor: Neutral.s50,
  strokeBrandPrimary: BrandPrimary.s400,
  strokeRed: Red.s400,
  strokeGreen: Green.s400,
  strokeBlue: Blue.s400,
  strokeLime: Lime.s400,
  strokeAmber: Amber.s400,
  strokePurple: Purple.s400,
  strokeFuchsia: Fuchsia.s400,
  strokePink: Pink.s400,
  strokeRose: Rose.s400,

  // Buttons — Foreground
  btnFgOnPrimaryBg: Neutral.s900,
  btnFgOnSecondaryBg: Slate.s50,
  btnFgTertiary: Neutral.s50,
  btnFgDisabled: Neutral.s400,
  btnFgDestructive: Red.s500,

  // Buttons — Background
  btnBgPrimary: Neutral.s50,
  btnBgSecondary: "rgba(255,255,255,0.12)",
  btnBgDisabled: "rgba(255,255,255,0.05)",
  btnBgDestructive: Red.s400,
} as const;
