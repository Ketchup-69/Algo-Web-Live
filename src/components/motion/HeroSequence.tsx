"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { SplitText } from "gsap/SplitText";
import { ease, travel } from "@/lib/motion";
import { useGsapContext } from "./useGsapContext";
import { revealWords, wordsFrom } from "./lines";

gsap.registerPlugin(ScrollTrigger);

/**
 * The one orchestrated hero moment (CLAUDE.md §5). About 1.5s, plays once on
 * load.
 *
 * The text and the product visual run CONCURRENTLY: the headline is still
 * rising out of its masks when the invoice scatter comes up beside it, so the
 * sentence and the thing it describes arrive as one gesture rather than as a
 * list of elements announcing themselves.
 *
 * Everything is transform and opacity.
 *
 * The paragraph under the headline is not part of it: it is a page's largest
 * text, so it stands still from the first frame. Holding it back until the
 * sequence ran made phones count the page as loaded about a second late (LCP).
 */
export function HeroSequence({ children }: { children: React.ReactNode }) {
  const scope = useGsapContext<HTMLDivElement>((_self, element) => {
    const mm = gsap.matchMedia();
    const splits: SplitText[] = [];

    // Reduced motion: clear the CSS guard and stop. The final state is what
    // the static HTML already contains — the header pill already reads
    // "approved", which is where the story ends — so there is nothing to build.
    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set("[data-hero-seq]", { clearProps: "opacity" });
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Take ownership of opacity from the CSS guard before anything runs. If
      // this component never mounted, the guard would have left the hero
      // invisible — so this is the first act, not a side effect of a tween.
      gsap.set("[data-hero-seq]", { opacity: 0 });

      /* ---- the headline: words rising out of masked lines, one gesture ---- */
      const headline = element.querySelector<HTMLElement>("[data-hero-seq='headline']");
      if (headline) {
        // The words start below their line masks, so the heading itself can be
        // fully opaque from the first frame. autoSplit rebuilds this tween
        // (at the same progress) if the font swaps in late.
        gsap.set(headline, { opacity: 1 });
        splits.push(revealWords(headline, (words) => wordsFrom(words)));
      }

      const tl = gsap.timeline({
        defaults: { ease: ease.out },
        onComplete: () => {
          // Drop the transforms so the compositor stops holding layers for the
          // rest of the visit — but PIN opacity inline at 1.
          //
          // `clearProps: "all"` here is a trap, and it cost a debugging round:
          // clearing opacity hands control back to the `html.js [data-hero-seq]`
          // rule in globals.css, which sets opacity 0. The hero animated in and
          // then disappeared. The inline 1 has to outlive the timeline.
          gsap.set("[data-hero-seq]:not([data-hero-seq='headline'])", {
            clearProps: "transform",
            opacity: 1,
          });
        },
      });

      /* ---- the rest of the sentence ----
         Each part is optional (an inner page's hero has no visual and may
         have no supporting line), so a tween is only added for what is
         there: GSAP warns about every empty target. */
      const has = (selector: string) => element.querySelector(selector) !== null;
      if (has("[data-hero-seq='cta']")) {
        tl.to(
          "[data-hero-seq='cta']",
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, startAt: { y: travel.sm } },
          0.32,
        );
      }
      if (has("[data-hero-seq='supporting']")) {
        tl.to("[data-hero-seq='supporting']", { opacity: 1, duration: 0.4 }, 0.5);
      }

      /* ---- the product visual, arriving against the same clock ---- */
      if (has("[data-hero-seq='visual']")) {
        tl.to(
          "[data-hero-seq='visual']",
          { opacity: 1, y: 0, duration: 0.9, startAt: { y: travel.lg } },
          0.2,
        );
        if (has("[data-hero-seq='visual'] [data-ghost]")) {
          tl.from(
            "[data-hero-seq='visual'] [data-ghost]",
            { opacity: 0, scale: 0.94, duration: 0.9, stagger: 0.05, ease: ease.out },
            0.3,
          );
        }
      }

      return () => {
        tl.kill();
      };
    });

    return () => {
      splits.forEach((s) => s.revert());
      mm.revert();
    };
  });

  return <div ref={scope}>{children}</div>;
}
