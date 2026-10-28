/**
 * The shapes every page's copy is written in. Pages are built from a small set
 * of blocks (src/components/blocks), and each block takes one of these, so a
 * page is a list of typed objects and the components hold no strings (§6).
 */

/** A link that looks like a button, or a plain text link. */
export type Cta = { label: string; href: string };

/** Title and description for <head>. `title` goes through the layout's template. */
export type PageMeta = { title: string; description: string };

/** A heading with an optional paragraph under it. */
export type SectionCopy = {
  /** Anchor for in-page and cross-page links ("/#products"). */
  id?: string;
  heading: string;
  intro?: string;
};

/** One entry in a list of features, steps or principles. */
export type Item = {
  /**
   * In a real sequence only: the step's own name for its place ("Week 1",
   * "Layer 2"). Without one, a sequence numbers its steps.
   */
  marker?: string;
  title: string;
  body?: string;
  /** Short supporting phrases, set as a quiet list under the body. */
  points?: string[];
};

/** A pointer to another part of the site, with a sentence on why to go. */
export type Related = { title: string; body: string; link: Cta };

/** The opening of a page: its one h1. */
export type HeroCopy = {
  heading: string;
  lede: string;
  primary: Cta;
  secondary?: Cta;
  /** One quiet line under the buttons. */
  note?: string;
};

/** The navy band that closes every page. */
export type ClosingCopy = { heading: string; primary: Cta; secondary?: Cta };

/**
 * One block of a legal page. A string is a paragraph. Inside any text,
 * `[label](href)` becomes a link; square brackets without an address stay as
 * they are, which is how a draft marks a gap ("[retention period]").
 */
export type LegalBlock =
  | string
  | { list: string[] }
  | { table: { caption: string; head: string[]; rows: string[][] } };

export type LegalSection = {
  id: string;
  heading: string;
  blocks: LegalBlock[];
  /**
   * While the page is a draft: what has to be confirmed before this section
   * can be approved. Shown on the page, marked, so the reviewer sees it.
   */
  toConfirm?: string;
};

/** A privacy notice or terms page: a draft until it is approved. */
export type LegalDoc = {
  meta: PageMeta;
  title: string;
  /** The draft notice at the top. Remove it once the page is approved. */
  draft?: { label: string; body: string };
  /** ISO date, `YYYY-MM-DD`, with the words shown before it. */
  updated: { label: string; date: string };
  intro: string[];
  sections: LegalSection[];
};
