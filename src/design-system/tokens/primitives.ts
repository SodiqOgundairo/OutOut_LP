// Raw design tokens — leaf values referenced by semantic tokens.
// Source of truth: OutOut Flutter app lib/design_system/tokens/primitives.dart

export const BrandPrimary = {
  s50: "#FFF6ED",
  s100: "#FFEEDB",
  s200: "#FFDDB7",
  s300: "#FECD94",
  s400: "#FEBC70",
  s500: "#FEAB4C",
  s600: "#CB893D",
  s700: "#98672E",
  s800: "#66441E",
  s900: "#33220F",
} as const;

export const Neutral = {
  s50: "#FCFCFC",
  s75: "#FAFAFA",
  s100: "#F5F5F5",
  s200: "#E5E5E5",
  s300: "#D4D4D4",
  s400: "#A3A3A3",
  s500: "#737373",
  s600: "#525252",
  s700: "#404040",
  s800: "#262626",
  s900: "#171717",
  s1000: "#0A0A0A",
} as const;

export const Slate = {
  s50: "#F8FAFC",
  s100: "#F1F5F9",
  s200: "#E2E8F0",
  s300: "#CBD5E1",
  s400: "#94A3B8",
  s500: "#64748B",
  s600: "#475569",
  s700: "#334155",
  s800: "#1E293B",
  s900: "#0F172A",
} as const;

export const Stone = {
  s50: "#FAFAF9",
  s100: "#F5F5F4",
  s200: "#E7E5E4",
  s300: "#D6D3D1",
  s400: "#A8A29E",
  s500: "#78716C",
  s600: "#57534E",
  s700: "#44403C",
  s800: "#292524",
  s900: "#1C1917",
  s950: "#0C0A09",
} as const;

export const Red = {
  s50: "#FCE7EB",
  s100: "#F8CFD7",
  s200: "#F2A0AE",
  s300: "#EB7086",
  s400: "#E5415D",
  s500: "#DE1135",
  s600: "#B20E2A",
  s700: "#850A20",
  s800: "#590715",
  s900: "#2C030B",
} as const;

export const PastelRed = {
  s50: "#FFEEEF",
  s100: "#FFDEE0",
  s200: "#FEBEC1",
  s300: "#FE9DA1",
  s400: "#FD7D82",
  s500: "#FD5C63",
  s600: "#CA4A4F",
  s700: "#98373B",
  s800: "#652528",
  s900: "#331214",
} as const;

export const Green = {
  s50: "#E7F7EA",
  s100: "#CEEFD5",
  s200: "#9DDFAC",
  s300: "#6DD082",
  s400: "#3CC059",
  s500: "#0BB02F",
  s600: "#098D26",
  s700: "#076A1C",
  s800: "#044613",
  s900: "#022309",
} as const;

export const Blue = {
  s50: "#E5F2FF",
  s100: "#CCE5FF",
  s200: "#99CAFF",
  s300: "#66B0FF",
  s400: "#3395FF",
  s500: "#007BFF",
  s600: "#0062CC",
  s700: "#004A99",
  s800: "#003166",
  s900: "#001933",
} as const;

export const Lime = {
  s50: "#F7FEE7",
  s100: "#ECFCCB",
  s200: "#D9F99D",
  s300: "#BEF264",
  s400: "#A3E635",
  s500: "#84CC16",
  s600: "#65A30D",
  s700: "#4D7C0F",
  s800: "#3F6212",
  s900: "#365314",
  s950: "#1A2E05",
} as const;

export const Amber = {
  s50: "#FFF6E5",
  s100: "#FFEDCC",
  s200: "#FFDB99",
  s300: "#FFC966",
  s400: "#FFB733",
  s500: "#FFA500",
  s600: "#CC8400",
  s700: "#996300",
  s800: "#664200",
  s900: "#332100",
} as const;

export const Purple = {
  s50: "#F1EFFF",
  s100: "#E2DEFE",
  s200: "#C6BDFD",
  s300: "#A99DFC",
  s400: "#8D7CFB",
  s500: "#705BFA",
  s600: "#5A49C8",
  s700: "#433796",
  s800: "#2D2464",
  s900: "#161232",
} as const;

export const Fuchsia = {
  s50: "#FDF4FF",
  s100: "#FAE8FF",
  s200: "#F5D0FE",
  s300: "#F0ABFC",
  s400: "#E879F9",
  s500: "#D946EF",
  s600: "#C026D3",
  s700: "#A21CAF",
  s800: "#86198F",
  s900: "#701A75",
  s950: "#4A044E",
} as const;

export const Pink = {
  s50: "#FDF2F8",
  s100: "#FCE7F3",
  s200: "#FBCFE8",
  s300: "#F9A8D4",
  s400: "#F472B6",
  s500: "#EC4899",
  s600: "#DB2777",
  s700: "#BE185D",
  s800: "#9D174D",
  s900: "#831843",
  s950: "#500724",
} as const;

export const Rose = {
  s50: "#FFF1F2",
  s100: "#FFE4E6",
  s200: "#FECDD3",
  s300: "#FDA4AF",
  s400: "#FB7185",
  s500: "#F43F5E",
  s600: "#E11D48",
  s700: "#BE123C",
  s800: "#9F1239",
  s900: "#881337",
  s950: "#4C0519",
} as const;

// Spacing — mirrors AppSpacing (Flutter)
export const Spacing = {
  unit0: 0,
  unit1: 2,
  unit2: 4,
  unit3: 8,
  unit4: 12,
  unit5: 16,
  unit6: 20,
  unit7: 24,
  unit8: 28,
  unit9: 32,
  unit10: 40,
  unit11: 48,
  unit12: 56,
  unit13: 64,
  unit14: 80,
  unit15: 96,
  unit16: 128,
  unit17: 160,
} as const;

// Radius — mirrors AppRadius (Flutter); unit6 is "pill"
export const Radius = {
  unit0: 0,
  unit1: 4,
  unit2: 6,
  unit3: 8,
  unit4: 12,
  unit5: 16,
  unit6: 9999,
} as const;
