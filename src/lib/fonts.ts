import { JetBrains_Mono, Manrope } from "next/font/google";

/**
 * Every font in the site is declared here and nowhere else.
 *
 * The pairing is the brand file's: Manrope for everything that is read, and
 * JetBrains Mono for data inside product UI (document numbers, amounts,
 * status tags). Nothing else in the codebase names a typeface — components
 * reach for the `font-display` / `font-body` / `font-mono` utilities, which
 * resolve through the CSS variables these expose.
 *
 * Both are variable fonts, so each is one file whatever weights the page uses.
 *
 * Google Sans / Product Sans are proprietary and must never appear (§2).
 */

/** Headings, body copy and UI labels. */
export const sansFont = Manrope({
  variable: "--font-algo-sans",
  subsets: ["latin"],
  display: "swap",
});

/** Data inside product UI. Never section labels, never body copy. */
export const monoFont = JetBrains_Mono({
  variable: "--font-algo-mono",
  subsets: ["latin"],
  display: "swap",
});

/** Convenience for the root layout — applies both variables in one place. */
export const fontVariables = `${sansFont.variable} ${monoFont.variable}`;
