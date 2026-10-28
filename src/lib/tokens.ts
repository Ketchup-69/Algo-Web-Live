/**
 * The token system as data.
 *
 * `globals.css` is the runtime source of truth — this file mirrors it so the
 * build-time contrast gate (`scripts/check-contrast.mts`), which cannot read
 * CSS, can still reason about the palette and fail the build on a regression.
 *
 * If you change a mix percentage in globals.css, change it here too. The gate
 * is what catches you if you forget — it fails the build, not the deploy.
 */

/* ------------------------------------------------------------------ maths -- */

const srgbToLinear = (c: number) =>
  c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;

const linearToSrgb = (c: number) => {
  const v = Math.min(1, Math.max(0, c));
  return v <= 0.0031308 ? v * 12.92 : 1.055 * v ** (1 / 2.4) - 0.055;
};

const hexToLinear = (hex: string): number[] => {
  const h = hex.replace("#", "");
  return [0, 2, 4].map((i) =>
    srgbToLinear(parseInt(h.slice(i, i + 2), 16) / 255),
  );
};

const linearToHex = (rgb: number[]) =>
  "#" +
  rgb
    .map((c) =>
      Math.round(linearToSrgb(c) * 255)
        .toString(16)
        .padStart(2, "0"),
    )
    .join("");

const linearToOklab = ([r, g, b]: number[]) => {
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ];
};

const oklabToLinear = ([L, A, B]: number[]) => {
  const l = (L + 0.3963377774 * A + 0.2158037573 * B) ** 3;
  const m = (L - 0.1055613458 * A - 0.0638541728 * B) ** 3;
  const s = (L - 0.0894841775 * A - 1.291485548 * B) ** 3;
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
};

/** Node-side equivalent of CSS `color-mix(in oklab, a p%, b)`. */
export const mix = (a: string, b: string, p: number) => {
  const la = linearToOklab(hexToLinear(a));
  const lb = linearToOklab(hexToLinear(b));
  const t = p / 100;
  return linearToHex(oklabToLinear(la.map((v, i) => v * t + lb[i] * (1 - t))));
};

export const luminance = (hex: string) => {
  const [r, g, b] = hexToLinear(hex);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

export const contrast = (a: string, b: string) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

export const round2 = (n: number) => Math.round(n * 100) / 100;

/** Worst ratio anywhere along a two-stop gradient, sampled at 5% steps. */
export const gradientWorst = (text: string, from: string, to: string) => {
  let worst = Infinity;
  for (let i = 0; i <= 20; i++) {
    worst = Math.min(worst, contrast(text, mix(to, from, i * 5)));
  }
  return worst;
};

/**
 * A colour at `alpha` laid over a ground, as the browser composites it (in
 * gamma-encoded sRGB). Mirrors `color-mix(in srgb, x a%, transparent)` once it
 * is painted on something.
 */
export const over = (fg: string, alpha: number, ground: string) => {
  const ch = (h: string, i: number) => parseInt(h.replace("#", "").slice(i, i + 2), 16);
  return (
    "#" +
    [0, 2, 4]
      .map((i) => Math.round(ch(fg, i) * alpha + ch(ground, i) * (1 - alpha)))
      .map((v) => v.toString(16).padStart(2, "0"))
      .join("")
  );
};

/* ------------------------------------------------------- tier 1: palette -- */

/** CLAUDE.md §4, from the official logo pack. Never referenced by a component. */
export const palette = {
  navy: "#031522",
  green: "#22b573",
  cyan: "#38bdf8",
  violet: "#8b7cff",
  mint: "#7de3c3",
  white: "#ffffff",
} as const;

export type PaletteName = keyof typeof palette;

const p = palette;

/** The neutrals and deep hues of tier 1, mixed exactly as globals.css mixes them. */
export const derived = {
  "n-page": mix(p.navy, p.white, 3),
  "n-line": mix(p.navy, p.white, 11),
  "n-strong": mix(p.navy, p.white, 46),
  "n-label": mix(p.navy, p.white, 58),
  "n-support": mix(p.navy, p.white, 71),
  "cyan-deep": mix(p.cyan, p.navy, 58),
  "green-deep": mix(p.green, p.navy, 67),
  "violet-deep": mix(p.violet, p.navy, 75),
} as const;

const d = derived;

/* ------------------------------------------------- tier 2: alias mapping -- */

/**
 * `border` is alpha in the stylesheet (navy or white let down to a hairline)
 * so it sits on any ground. It is decorative and never checked; the value
 * here is what it resolves to on the page ground.
 */
export const lightAliases = {
  bg: p.white,
  "bg-subtle": d["n-page"],
  surface: p.white,
  "surface-raised": p.white,
  fg: p.navy,
  "fg-muted": d["n-support"],
  border: over(p.navy, 0.11, p.white),
  "border-strong": d["n-strong"],
  accent: d["cyan-deep"],
  "accent-soft": mix(p.cyan, p.white, 10),
  "accent-contrast": p.navy,
  success: p.green,
  "on-success": p.navy,
  attention: p.navy,
  "on-attention": p.white,
  ai: p.violet,
  "on-ai": p.navy,
} as const;

const darkSurface = mix(p.white, p.navy, 6);

export const darkAliases = {
  bg: p.navy,
  "bg-subtle": mix(p.navy, "#000000", 78),
  surface: darkSurface,
  "surface-raised": mix(p.white, p.navy, 12),
  fg: p.white,
  "fg-muted": mix(p.white, p.navy, 72),
  border: over(p.white, 0.11, p.navy),
  "border-strong": mix(p.white, p.navy, 46),
  accent: p.cyan,
  "accent-soft": mix(p.cyan, p.navy, 14),
  "accent-contrast": p.navy,
  success: p.green,
  "on-success": p.navy,
  attention: p.white,
  "on-attention": p.navy,
  ai: p.violet,
  "on-ai": p.navy,
} as const;

/** The navy closing band. Identical in the light and dark page themes. */
export const bandAliases = {
  ...darkAliases,
  border: over(p.white, 0.14, p.navy),
  "border-strong": mix(p.white, p.navy, 52),
} as const;

export type AliasName = keyof typeof lightAliases;

export const themes = { light: lightAliases, dark: darkAliases, band: bandAliases } as const;
export type ThemeName = keyof typeof themes;

export const aliasNames = Object.keys(lightAliases) as AliasName[];

/** Short note on what each alias is for, printed by the gate on failure. */
export const aliasNotes: Record<AliasName, string> = {
  bg: "Page ground",
  "bg-subtle": "Recessed band — light tints, dark recedes",
  surface: "Cards, panels, sheets",
  "surface-raised": "Light lifts with shadow; dark lifts with tint",
  fg: "Primary text",
  "fg-muted": "Secondary text",
  border: "Decorative rule only — never a UI boundary",
  "border-strong": "Real boundaries: inputs, outlined buttons",
  accent: "Links, focus rings, emphasis",
  "accent-soft": "Tinted panel ground",
  "accent-contrast": "Label sitting on the primary fill",
  success: "Status fill — carries its own label, never coloured text",
  "on-success": "Label on the success fill",
  attention: "Status fill — the needs-attention badge",
  "on-attention": "Label on the attention fill",
  ai: "Status fill — something the agent did",
  "on-ai": "Label on the AI fill",
};

/* ------------------------------------------------------ tier 3: gradients -- */

export type GradientSpec = {
  name: string;
  /** The two stops used for contrast sampling. */
  stops: Record<ThemeName, [string, string]>;
  /** Which alias sits on top, if any text does. */
  textAlias: AliasName | null;
  note: string;
};

const ctaStops: [string, string] = [mix(p.cyan, p.white, 80), p.cyan];

export const gradients: GradientSpec[] = [
  {
    name: "grad-primary",
    stops: { light: ctaStops, dark: ctaStops, band: ctaStops },
    textAlias: "accent-contrast",
    note: "Primary CTA fill",
  },
  {
    name: "grad-surface",
    stops: {
      light: [p.white, lightAliases["bg-subtle"]],
      dark: [darkAliases.surface, darkAliases["surface-raised"]],
      band: [bandAliases.surface, bandAliases["surface-raised"]],
    },
    textAlias: "fg-muted",
    note: "Subtle card lift",
  },
  {
    name: "grad-accent-soft",
    stops: {
      light: [lightAliases["accent-soft"], p.white],
      dark: [darkAliases["accent-soft"], p.navy],
      band: [bandAliases["accent-soft"], p.navy],
    },
    textAlias: "fg-muted",
    note: "Tinted panel",
  },
  {
    name: "grad-hairline",
    stops: {
      light: [p.green, p.violet],
      dark: [p.green, p.violet],
      band: [p.green, p.violet],
    },
    textAlias: null,
    note: "Decorative 1px rule — never a focus ring or input border",
  },
];

/**
 * The headline gradient is the text, not the ground, so it is checked the
 * other way round from the rest of this tier: every stop against every ground,
 * at the large-text floor. It is only ever set at display sizes. On light
 * grounds it is flat navy: the logo's gradient fails there at its cyan stop.
 */
export const textGradient: Record<ThemeName, string[]> = {
  light: [p.navy, p.navy],
  dark: [p.green, p.cyan, p.violet],
  band: [p.green, p.cyan, p.violet],
};

/* -------------------------------------------------------- product visuals -- */

/**
 * The text and icon pairings inside the product visuals, mirrored from
 * src/app/product/*.css and the `--ui-*` aliases in globals.css. Each is a
 * colour, the ground it actually sits on in a drawing, and the floor it has
 * to clear: 4.5 for text, 3 for an icon or a thin line.
 */
type ProductPair = { label: string; fg: string; ground: string; floor: number };

const lightCard = p.white;
const darkCard = mix(p.white, p.navy, 7);
const darkRaised = mix(p.white, p.navy, 14);

export const productPairs: Record<"light" | "dark", ProductPair[]> = {
  light: [
    { label: "ui-value on card", fg: p.navy, ground: lightCard, floor: 4.5 },
    { label: "ui-label on card", fg: over(p.navy, 0.64, lightCard), ground: lightCard, floor: 4.5 },
    { label: "ui-quiet / meta / faint on card", fg: d["n-label"], ground: lightCard, floor: 4.5 },
    { label: "ui-rule icon on card", fg: d["n-strong"], ground: lightCard, floor: 3 },
    { label: "matched text on card", fg: d["green-deep"], ground: lightCard, floor: 4.5 },
    { label: "matched text on match-soft", fg: d["green-deep"], ground: mix(p.green, p.white, 12), floor: 4.5 },
    { label: "coded text on card", fg: d["violet-deep"], ground: lightCard, floor: 4.5 },
    { label: "coded text on code-soft", fg: d["violet-deep"], ground: mix(p.violet, p.white, 9), floor: 4.5 },
    { label: "white on lit citation", fg: p.white, ground: d["violet-deep"], floor: 4.5 },
    { label: "selected text on selection", fg: d["cyan-deep"], ground: over(d["cyan-deep"], 0.08, lightCard), floor: 4.5 },
    { label: "agent pill text, cyan end", fg: d["cyan-deep"], ground: lightCard, floor: 4.5 },
    { label: "agent pill text, violet end", fg: d["violet-deep"], ground: lightCard, floor: 4.5 },
    { label: "variance text on variance-soft", fg: p.navy, ground: mix(p.navy, p.white, 6), floor: 4.5 },
    { label: "white on attention badge", fg: p.white, ground: p.navy, floor: 4.5 },
    { label: "navy on approved fill", fg: p.navy, ground: p.green, floor: 4.5 },
    { label: "navy on action button", fg: p.navy, ground: p.cyan, floor: 4.5 },
  ],
  dark: [
    { label: "ui-value on card", fg: p.white, ground: darkCard, floor: 4.5 },
    { label: "ui-value on raised", fg: p.white, ground: darkRaised, floor: 4.5 },
    { label: "ui-label on raised", fg: over(p.white, 0.62, darkRaised), ground: darkRaised, floor: 4.5 },
    { label: "ui-quiet / meta / faint on raised", fg: mix(p.white, p.navy, 62), ground: darkRaised, floor: 4.5 },
    { label: "ui-rule icon on card", fg: mix(p.white, p.navy, 46), ground: darkCard, floor: 3 },
    { label: "matched text on raised", fg: p.green, ground: darkRaised, floor: 4.5 },
    { label: "matched text on match-soft", fg: p.green, ground: over(p.green, 0.16, darkCard), floor: 4.5 },
    { label: "coded text on raised", fg: mix(p.violet, p.white, 82), ground: darkRaised, floor: 4.5 },
    { label: "coded text on code-soft", fg: mix(p.violet, p.white, 82), ground: over(p.violet, 0.18, darkCard), floor: 4.5 },
    { label: "card colour on lit citation", fg: darkCard, ground: mix(p.violet, p.white, 82), floor: 4.5 },
    { label: "selected text on raised", fg: p.cyan, ground: darkRaised, floor: 4.5 },
    { label: "agent pill text, cyan end", fg: p.cyan, ground: darkRaised, floor: 4.5 },
    { label: "agent pill text, violet end", fg: mix(p.violet, p.white, 82), ground: darkRaised, floor: 4.5 },
    { label: "navy on attention badge", fg: p.navy, ground: p.white, floor: 4.5 },
    { label: "navy on approved fill", fg: p.navy, ground: p.green, floor: 4.5 },
    { label: "navy on action button", fg: p.navy, ground: p.cyan, floor: 4.5 },
  ],
};

/* ------------------------------------------------------------ type scale -- */

export const typeScale = [
  { name: "xs", size: "0.75rem", px: "12px", lh: "1.6", ls: "0em" },
  { name: "sm", size: "0.875rem", px: "14px", lh: "1.6", ls: "0em" },
  { name: "base", size: "1rem", px: "16px", lh: "1.6", ls: "0em" },
  { name: "lg", size: "1.25rem", px: "20px", lh: "1.5", ls: "-0.015em" },
  { name: "xl", size: "1.5625rem", px: "25px", lh: "1.35", ls: "-0.02em" },
  { name: "2xl", size: "1.9531rem", px: "31px", lh: "1.2", ls: "-0.03em" },
  { name: "3xl", size: "clamp(2rem … 2.4414rem)", px: "32→39px", lh: "1.15", ls: "-0.035em" },
  { name: "4xl", size: "clamp(2.25rem … 3.0518rem)", px: "36→49px", lh: "1.08", ls: "-0.04em" },
  { name: "5xl", size: "clamp(2.5rem … 3.8147rem)", px: "40→61px", lh: "1.05", ls: "-0.045em" },
  { name: "6xl", size: "clamp(2.75rem … 4.7684rem)", px: "44→76px", lh: "1.02", ls: "-0.05em" },
  { name: "7xl", size: "clamp(2.75rem … 5.9605rem)", px: "44→95px", lh: "1", ls: "-0.05em" },
] as const;

/* --------------------------------------------------------- contrast gate -- */

export const FLOOR_TEXT = 4.5; // WCAG 1.4.3, normal-size text
export const FLOOR_NON_TEXT = 3.0; // WCAG 1.4.11, UI component boundaries
export const FLOOR_LARGE_TEXT = 3.0; // WCAG 1.4.3, 24px+ or 19px+ bold

export type Check = {
  theme: ThemeName;
  label: string;
  value: string;
  floor: number;
  actual: number;
  pass: boolean;
  detail: string;
};

/** Every ground a foreground token can legitimately land on. */
const groundsFor = (t: (typeof themes)[ThemeName]) =>
  [
    ["bg", t.bg],
    ["surface", t.surface],
    ["surface-raised", t["surface-raised"]],
    ["bg-subtle", t["bg-subtle"]],
    ["accent-soft", t["accent-soft"]],
  ] as const;

export function runChecks(): Check[] {
  const checks: Check[] = [];

  for (const themeName of ["light", "dark", "band"] as ThemeName[]) {
    const t = themes[themeName];
    const grounds = groundsFor(t);

    // Status colours are deliberately absent here. They are fills, and are
    // checked below as "label on fill" instead — asserting them as text would
    // assert the exact property this system gives up on purpose.
    for (const token of ["fg", "fg-muted", "accent"] as AliasName[]) {
      let worst = Infinity;
      let worstGround = "";
      for (const [groundName, ground] of grounds) {
        const r = contrast(t[token], ground);
        if (r < worst) {
          worst = r;
          worstGround = groundName;
        }
      }
      checks.push({
        theme: themeName,
        label: `text: ${token}`,
        value: t[token],
        floor: FLOOR_TEXT,
        actual: worst,
        pass: worst >= FLOOR_TEXT,
        detail: `${round2(worst)} on ${worstGround}`,
      });
    }

    // Status colours are fills. What has to be readable is the label sitting
    // on them, not the colour against the page — as text on white the brand
    // green and violet are 2.65 and 3.27 and there is no intention of using
    // them that way.
    for (const [fill, label] of [
      ["success", "on-success"],
      ["attention", "on-attention"],
      ["ai", "on-ai"],
    ] as [AliasName, AliasName][]) {
      const r = contrast(t[label], t[fill]);
      checks.push({
        theme: themeName,
        label: `fill: ${fill} + label`,
        value: t[fill],
        floor: FLOOR_TEXT,
        actual: r,
        pass: r >= FLOOR_TEXT,
        detail: `${round2(r)} label on fill`,
      });
    }

    // UI boundaries need 3:1, not 4.5. `--border` is exempt by design: it is
    // decorative, and anything load-bearing is required to use border-strong.
    for (const [label, token] of [
      ["boundary: border-strong", "border-strong"],
      ["boundary: focus ring", "accent"],
    ] as const) {
      let worst = Infinity;
      for (const [, ground] of grounds) {
        worst = Math.min(worst, contrast(t[token as AliasName], ground));
      }
      checks.push({
        theme: themeName,
        label,
        value: t[token as AliasName],
        floor: FLOOR_NON_TEXT,
        actual: worst,
        pass: worst >= FLOOR_NON_TEXT,
        detail: `${round2(worst)}`,
      });
    }

    // Elevation has to be visible or dark mode is one flat plane. Light is
    // exempt: it lifts with shadow, because paper→white is the only tint the
    // palette allows and a fourth near-white would be an invented shade.
    const liftFromBg = contrast(t.bg, t.surface);
    const lift = contrast(t.surface, t["surface-raised"]);
    checks.push({
      theme: themeName,
      label: "elevation: bg → surface → raised",
      value: `${t.surface} / ${t["surface-raised"]}`,
      floor: 1.1,
      actual: themeName === "light" ? 1.1 : Math.min(liftFromBg, lift),
      pass: themeName === "light" ? true : liftFromBg >= 1.1 && lift >= 1.1,
      detail:
        themeName === "light"
          ? "n/a — lifts with shadow"
          : `${round2(liftFromBg)} then ${round2(lift)}`,
    });

    // The headline gradient: each segment sampled against every ground.
    {
      const stops = textGradient[themeName];
      let worst = Infinity;
      for (const [, ground] of grounds) {
        for (let i = 0; i < stops.length - 1; i++) {
          worst = Math.min(worst, gradientWorst(ground, stops[i], stops[i + 1]));
        }
      }
      checks.push({
        theme: themeName,
        label: "gradient text: grad-text (display only)",
        value: stops.join(" → "),
        floor: FLOOR_LARGE_TEXT,
        actual: worst,
        pass: worst >= FLOOR_LARGE_TEXT,
        detail: `${round2(worst)} at worst stop`,
      });
    }

    // Gradients carry text, so they are sampled along their whole length. An
    // average would quietly hide a failing end.
    for (const g of gradients) {
      if (!g.textAlias) continue;
      const [from, to] = g.stops[themeName];
      const text = t[g.textAlias];
      const worst = gradientWorst(text, from, to);
      checks.push({
        theme: themeName,
        label: `gradient: ${g.name} → ${g.textAlias}`,
        value: text,
        floor: FLOOR_TEXT,
        actual: worst,
        pass: worst >= FLOOR_TEXT,
        detail: `${round2(worst)} at worst stop`,
      });
    }
  }

  // Product visuals are drawn in the light theme and redrawn for the dark one;
  // the closing band never holds one.
  for (const themeName of ["light", "dark"] as const) {
    for (const pair of productPairs[themeName]) {
      const r = contrast(pair.fg, pair.ground);
      checks.push({
        theme: themeName,
        label: `product: ${pair.label}`,
        value: pair.fg,
        floor: pair.floor,
        actual: r,
        pass: r >= pair.floor,
        detail: `${round2(r)}`,
      });
    }
  }

  return checks;
}
