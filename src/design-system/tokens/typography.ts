// Typography tokens — mirrors AppTextStyles (Flutter).
// Source: OutOut Flutter app lib/design_system/tokens/typography.dart

export const FontFamily = {
  sans: '"SF Pro", "Inter", system-ui, -apple-system, sans-serif',
} as const;

type TextStyle = {
  fontSize: string;
  lineHeight: string;
  letterSpacing: string;
  fontWeight: number;
};

export const Typography: Record<string, TextStyle> = {
  display: { fontSize: "6rem", lineHeight: "1.5", letterSpacing: "-0.02em", fontWeight: 700 },
  h1: { fontSize: "3.75rem", lineHeight: "1.5", letterSpacing: "-0.02em", fontWeight: 700 },
  h2: { fontSize: "3rem", lineHeight: "1.5", letterSpacing: "-0.02em", fontWeight: 700 },
  h3: { fontSize: "2.125rem", lineHeight: "1.5", letterSpacing: "-0.02em", fontWeight: 700 },
  h4: { fontSize: "1.75rem", lineHeight: "1.5", letterSpacing: "-0.02em", fontWeight: 700 },
  h5: { fontSize: "1.5rem", lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: 700 },
  h6: { fontSize: "1.25rem", lineHeight: "1.5", letterSpacing: "-0.02em", fontWeight: 700 },
  h7: { fontSize: "1.125rem", lineHeight: "1.5", letterSpacing: "-0.02em", fontWeight: 700 },
  l0: { fontSize: "1.125rem", lineHeight: "1.4", letterSpacing: "-0.02em", fontWeight: 600 },
  l1: { fontSize: "1rem", lineHeight: "1.4", letterSpacing: "-0.006em", fontWeight: 600 },
  l2: { fontSize: "0.875rem", lineHeight: "1.4", letterSpacing: "-0.02em", fontWeight: 500 },
  p1: { fontSize: "1rem", lineHeight: "1.5", letterSpacing: "-0.006em", fontWeight: 400 },
  p2: { fontSize: "0.875rem", lineHeight: "1.5", letterSpacing: "-0.006em", fontWeight: 400 },
  btnXl: { fontSize: "1.125rem", lineHeight: "1.4", letterSpacing: "-0.006em", fontWeight: 600 },
  btnLg: { fontSize: "1rem", lineHeight: "1.4", letterSpacing: "-0.006em", fontWeight: 600 },
  btnMd: { fontSize: "0.875rem", lineHeight: "1.4", letterSpacing: "-0.006em", fontWeight: 600 },
};
