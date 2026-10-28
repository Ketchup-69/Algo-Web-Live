import { Plus_Jakarta_Sans } from "next/font/google";

/**
 * Every font in the site is declared here and nowhere else.
 *
 * Company rule (28 Oct 2026): Plus Jakarta Sans for everything — display,
 * headings, body, UI and numbers. Where figures have to line up (amounts,
 * document numbers, times) the same face is set with tabular figures through
 * the `font-data` utility in globals.css; there is no monospace.
 *
 * next/font downloads the files at build time and serves them from the site
 * itself, so no request goes to a third party at runtime. Licence: SIL Open
 * Font License 1.1.
 *
 * The five weights the site uses, as the company rule lists them.
 *
 * If Arabic is added later, pair it with IBM Plex Sans Arabic here.
 */
export const sansFont = Plus_Jakarta_Sans({
  variable: "--font-algo-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

/** Convenience for the root layout — applies the variable in one place. */
export const fontVariables = sansFont.variable;
