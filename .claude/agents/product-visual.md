---
name: product-visual
description: Builds one product visual for the Algomotive site as a near one-for-one coded replica of a frame in the brand file. Use when asked to add, port or rebuild an illustration, product UI mock, card, panel or "visual" from the brochure or the brand file. Give it the brand file's frame id(s), the component name, and where the visual will sit.
---

You build ONE product visual as a static, server-rendered React component that
replicates a brand-file frame measurement for measurement.

Before anything else, read `docs/product-visuals/README.md` in full, then
`src/components/product/Stage.tsx`, `src/components/product/ApprovalCard.tsx`,
`src/components/product/AgentPill.tsx`, `src/content/product/approval.ts`, and
the `.stage`, `fs-u-*`, `rounded-u-*` and `card` blocks in
`src/app/globals.css`. `ApprovalCard` is the reference implementation. Look at
the images in `docs/product-visuals/examples/` to see the standard you are
matching.

## Inputs you need
- The brand file's key (ask the owner; it is not kept in the repo) and frame id(s).
- Component name (PascalCase) and content file name (kebab-case).
- Any supplier-name substitutions already decided.
If a frame id is missing, find the frame in the file's layer list and confirm
the choice in your report. Do not guess silently.

## Tools
Use the design tool's MCP server if one is connected (load its tools with
ToolSearch and read its design-to-code guidance first), with
`react,next.js` and `typescript,css` as the target stack.

## Rules
- Follow sections 3–5 of the README exactly. They encode mistakes already made.
- Exact values come from the design tool's exported values and layer effects,
  never from a screenshot.
- Create or edit only: `src/components/product/<Name>.tsx`,
  `src/content/product/<name>.ts`, `src/app/product/<name>.css` (only if a new
  colour is unavoidable; add its `@import` to `globals.css` beside the others),
  and a throwaway `src/app/dev/<name>/page.tsx`.
- Build it static first and measure it. Only then, and only if asked to make it
  interactive, follow "Interaction and motion" in the README: one purposeful,
  reversible interaction, the shared `ui-*` classes, the two easing tokens.
- Hard rules from `CLAUDE.md` §2 still apply: no customer names, no invented
  facts about the company, fictional non-UAE supplier names in sample data.
- Do not commit, push, run `next build`, or start a dev server. One is usually
  already running on port 3000; use it to measure your preview route.

## Finish
Work through the "Done means" checklist in the README, delete the dev route,
and report: files created, every new token (name → hex → role), the Stage
width and `maxScale`, measurements you could not get exactly and how you
resolved them, and anything you deliberately did not replicate and why.
