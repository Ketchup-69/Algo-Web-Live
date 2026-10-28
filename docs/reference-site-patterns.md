# Reference-site patterns: what the reference site's pages do, and how to build each one here

Notes from walking a finance-software reference site (home and accounts-payable pages) on 2026-09-20, as a
reference for how a finance-software site earns trust in one scroll. This is a
study of structure and technique, not of their words or assets: nothing of
theirs is copied, and none of their copy, colours or imagery belongs on this
site. Internal document; the third party is deliberately left unnamed, and nothing here ships.

The short version: **their pages are almost entirely product UI on flat tiles,
with one sentence per idea, and one interaction pattern repeated.** Everything
below is a variation of that.

---

## 1. What is on the page

Measured on the accounts-payable page at 1280 wide:

| | |
|---|---|
| Length | ~11,800px, 12 blocks |
| Type | one typeface for everything; H1 64px, H2 48px, H3 28px (features) or 18–20px (list items), body 16–18px |
| Imagery | product UI only. No people, no abstract art, no illustrations of "AI" |
| Motion | one canvas in the hero, one video; everything else is a state change on click or a timer |
| Sticky / pinned | none. Nothing takes over the scroll |
| Colour | warm near-white ground, black type, ONE accent used only on the call to action; all other colour lives inside the product UI (green ticks, status tags) |

Block order, which is the part worth borrowing for an `/accounts-payable` page:

1. **Hero.** Small label naming the product category, a 64px headline of about
   seven words, one sentence of support that contains a number, an email
   capture, a quiet second link to a demo. On the right, a tile of live-looking
   product UI: a list of bills gaining green ticks under a status line.
2. **Proof strip.** One line with a customer count, then a row of logos.
3. **Feature swapper** (see §2). Four outcomes on the left, one visual on the
   right that changes with the active one.
4. **An AI block.** Large, one visual, short.
5. **Dark stat band.** Three cards, each "Up to / a big number / one line",
   every number footnoted to a source.
6. **Control bento** (see §3). One wide tile and two half tiles about
   approvals and permissions.
7. **Three-up of payment features.** Small icon-less cards, 18px titles.
8. **A three-step strip** for one specific workflow.
9. **One cross-link tile** to a neighbouring product.
10. **Learn.** A row of how-to cards.
11. **Platform grid.** Every other product, one tile each.
12. **FAQ.** Seven or more plain questions in an accordion. This block is there
    for search and for AI answers, and it is the cheapest block on the page.

The home page is the same kit at a wider scope: a 64px headline, a live
counter above it, an email capture, then one very large composite of product
UI on a dotted tile.

---

## 2. The one interaction they repeat: the feature swapper

Left column: four short outcome statements. One is active: full-strength type,
its one-sentence description showing, a thin progress rule under it filling
over a few seconds. The other three are greyed to about 35% and show only
their title. Right column: one tile holding the visual for the active item.
When the rule fills, the next item takes over; clicking an item jumps to it.

Why it works: four claims share one screen, only one asks for attention at a
time, and the visitor never has to do anything to see all four.

This site already has the scroll-driven version of the same idea
(`PinnedSteps`, used in Governance). The swapper is the lighter alternative for
a section that should not hold the scroll.

**Building it here**

- Content: an array of `{ title, body }` in `src/content/`, visuals matched by
  index in the section component, exactly as `Governance.tsx` does.
- Component: a small client component holding `active` and a timer.
  - Left: `<button aria-pressed>` per item. Active item shows its body; the
    others do not (`hidden`), so height changes on switch. Reserve the height
    of the tallest body with `min-height` so nothing below moves.
  - Progress rule: one `<span>` per item, `transform: scaleX()` from 0 to 1
    with `transform-origin: left`, driven by a CSS animation whose duration is
    the dwell time. Listen for `animationend` to advance, so the timer and the
    rule cannot drift apart. Pause on hover, on focus within, and when the
    section is off screen (the same IntersectionObserver + `visibilitychange`
    pattern as `InvoiceScatter.tsx`).
  - Right: all visuals stacked in one grid cell, the inactive ones `inert` and
    faded, the same `data-state` CSS as `.step-visual`.
- Motion rules (`src/app/product/motion.css`): `--ease-out` for the swap,
  linear for the progress rule (it is constant motion), transform and opacity
  only, no auto-advance at all under `prefers-reduced-motion`.
- Dwell: 5–6 seconds. Shorter and nobody finishes the sentence.

---

## 3. The tile: how their visuals are staged

Every visual sits on a flat, rounded, slightly grey tile a little darker than
the page. The UI inside is a simplified piece of the real interface: a handful
of rows, real-looking data, one highlighted element, often a drawn cursor. It
is never a full screenshot and never a diagram.

This is the same idea as the brand file's "well", which this site already has:

- `src/components/product/Well.tsx` is the tile (a gradient rather than flat,
  per the brand file).
- `src/components/product/Stage.tsx` holds the UI and scales it as one piece.
- `docs/product-visuals/README.md` is the rulebook for the UI inside.

So "make it look like that" is mostly already true. What they do that this
site could do more of:

- **One highlighted element per visual, and a cursor on it.** A drawn cursor
  tells the eye where to look and implies someone is using the thing. The
  brand file has none; if one is added, it should be one consistent glyph from
  `Icon.tsx`'s set or drawn once and reused.
- **A status line above a list** ("Routing to approvals…"). This site's
  equivalent is `AgentPill`. Use it on every visual where the agent is doing
  something, in the present tense.
- **Bento for related controls.** One wide tile over two half tiles, each with
  a 28px title, one sentence, and a small visual, all inside the tile:
  ```
  grid gap-6 lg:grid-cols-2
    tile  lg:col-span-2   text left, visual right
    tile                  text top, visual bottom
    tile                  text top, visual bottom
  ```
  Here that is three `bg-well rounded-card` tiles, each holding a `<Heading
  level={3}>`, a `<Text>`, and a product component at a small `maxScale`.

---

## 4. How they write

- Headlines are two to seven words, end in a full stop, and say the outcome.
  One of theirs, as an example of the register: "A month of AP done in
  minutes."
- The sentence under a headline carries the number or the mechanism, never
  both, never a second sentence.
- Feature titles are outcomes ("catch X instantly"), not feature names.
- Every figure has a footnote.

What carries over: the length discipline and the footnoting. What does not:
this site may not state a performance figure until the owner has one to stand
behind (`CLAUDE.md` §2), so the stat band stays unbuilt, and the hero sentence
describes the mechanism instead of a multiple.

---

## 5. What to take, and what to leave

| Take | Why |
|---|---|
| Product UI as the only imagery | Already the brand file's approach; their site shows it scales to a whole page |
| One sentence per idea | The copy pass on this site moved toward it; hold the line |
| The feature swapper | Four claims, one screen, no scroll held |
| A per-product page with its own hero, blocks and FAQ | Matches the plan for `/accounts-payable`; the FAQ serves search and AI answers, one of this site's two jobs |
| Footnoted numbers in one dark band | The right format for when there are verified numbers |
| Nothing pinned | Worth knowing: they get the "one thing at a time" effect with a timer, not with scroll |

| Leave | Why |
|---|---|
| The accent colour and its use on every CTA | Not this brand |
| Email capture in the hero, sticky promo card, newsletter prompts | This site's only action is a conversation (`CLAUDE.md` §7); no form backend |
| Customer count and logo row | No customer names or logos (§2) |
| Performance multiples | No unverified metrics (§2) |
| Their words, screenshots and UI | Theirs |

---

## 6. If building `/accounts-payable` from this

A block order that uses what already exists in `src/components/product/`:

1. Hero: text left, `InvoiceScatter` right (as the home page).
2. Feature swapper: intake → coding → matching → posting, with `FormatWell`,
   `CodingWell`, `VerificationCards` (stacked), `SystemsWell`.
3. The signature block: `StatementPanel` on the blue wash.
4. Control bento: `ApprovalCard` wide; `ExceptionsPanel` and `AuditTrailCard`
   as the two halves.
5. Integrations grid (exists).
6. FAQ: `<details>` elements, questions in `src/content/`, no JavaScript.
7. The closing band (exists).

Everything in that list except the swapper and the FAQ is already built.
