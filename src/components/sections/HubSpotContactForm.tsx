"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { contactEmbed as embed } from "@/content/contact";
import { site } from "@/content/site";

type Status = "loading" | "ready" | "failed";

/** How long to wait for the form before showing the fallback. */
const GIVE_UP_MS = 12000;
/** After a client-side visit, how long to wait for a re-scan before reloading. */
const RESCAN_MS = 4000;
/** Session flag so a reload to recover the form happens at most once. */
const RELOADED_KEY = "algo-contact-form-reloaded";

/**
 * True once the embed script has run in this page session. Module state, so
 * it survives client-side navigation between pages and resets on a full load.
 */
let scriptRanBefore = false;

/** The field outlines drawn while the form loads, at roughly its height. */
const SKELETON = ["h-11", "h-11", "h-11", "h-11", "h-11", "h-11", "h-28"] as const;

/**
 * The contact form, embedded from the CRM. It renders inside the CRM's own
 * iframe, so the form's fonts, colours, validation, reCAPTCHA and thank-you
 * message are all set in the CRM; this component only places it.
 *
 * The embed script is added on mount and removed on unmount, so it loads on
 * this page only, never site-wide. It looks for the `hs-form-frame` element
 * when it runs, so every mount injects it afresh: on a hard refresh that is
 * the first run, and after a client-side link it runs again against the new
 * element. If that second run does not draw the form, the page reloads once,
 * which always does.
 *
 * While the form loads, field outlines hold its place so the page does not
 * jump. If it cannot load at all (the script is blocked or the network
 * fails), the two addresses take its place (§7: the email fallback).
 */
export function HubSpotContactForm({ className }: { className?: string }) {
  const frame = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    const container = frame.current;
    if (!container) return;
    const revisit = scriptRanBefore;
    let settled = false;
    const settle = (next: Status) => {
      if (settled) return;
      settled = true;
      setStatus(next);
    };

    // Ready once the iframe exists and has loaded.
    const watch = new MutationObserver(() => {
      const iframe = container.querySelector("iframe");
      if (!iframe) return;
      watch.disconnect();
      iframe.addEventListener("load", () => settle("ready"), { once: true });
    });
    watch.observe(container, { childList: true, subtree: true });

    // A fresh copy of the script every mount, so it scans the page again.
    document.querySelectorAll(`script[src="${embed.scriptSrc}"]`).forEach((old) => old.remove());
    const script = document.createElement("script");
    script.src = embed.scriptSrc;
    script.defer = true;
    script.addEventListener("load", () => {
      scriptRanBefore = true;
    });
    script.addEventListener("error", () => settle("failed"));
    document.body.appendChild(script);

    // A client-side visit where the re-run did not draw the form: reload once.
    const rescan = revisit
      ? window.setTimeout(() => {
          if (container.querySelector("iframe")) return;
          let reloaded = false;
          try {
            reloaded = window.sessionStorage.getItem(RELOADED_KEY) === "1";
            window.sessionStorage.setItem(RELOADED_KEY, "1");
          } catch {
            // Storage blocked: fall through to the fallback rather than risk a loop.
            reloaded = true;
          }
          if (!reloaded) window.location.reload();
        }, RESCAN_MS)
      : undefined;

    const giveUp = window.setTimeout(() => {
      if (!container.querySelector("iframe")) settle("failed");
    }, GIVE_UP_MS);

    return () => {
      watch.disconnect();
      window.clearTimeout(giveUp);
      if (rescan) window.clearTimeout(rescan);
      script.remove();
      container.replaceChildren();
    };
  }, []);

  // A load that worked clears the one-time reload flag for next time.
  useEffect(() => {
    if (status !== "ready") return;
    try {
      window.sessionStorage.removeItem(RELOADED_KEY);
    } catch {
      // Nothing to clear.
    }
  }, [status]);

  const [before, afterSales] = embed.failed.body.split("{sales}");
  const [between, after] = (afterSales ?? "").split("{helpdesk}");

  return (
    // The CRM draws the form light, so its panel stays light in both themes.
    <div data-theme="light" className={cn("card w-full max-w-[40rem] p-6 sm:p-8", className)}>
      {status === "failed" ? (
        <div role="alert">
          <p className="font-display text-lg font-semibold text-fg">{embed.failed.title}</p>
          <p className="mt-2 text-base text-fg-muted">
            {before}
            <a className="text-fg underline underline-offset-[3px]" href={`mailto:${site.email.sales}`}>
              {site.email.sales}
            </a>
            {between}
            <a className="text-fg underline underline-offset-[3px]" href={`mailto:${site.email.helpdesk}`}>
              {site.email.helpdesk}
            </a>
            {after}
          </p>
        </div>
      ) : null}

      <div className={cn("relative", status === "loading" && "min-h-[52rem]", status === "failed" && "hidden")}>
        {status === "loading" ? (
          <div aria-hidden="true" className="absolute inset-0 flex flex-col gap-5">
            {SKELETON.map((height, index) => (
              <div key={index} className="flex flex-col gap-2">
                <span className="h-3 w-28 rounded-full bg-bg-subtle" />
                <span className={cn("rounded-control border border-border bg-bg-subtle", height)} />
              </div>
            ))}
            <span className="mt-2 h-12 w-32 rounded-control bg-bg-subtle" />
          </div>
        ) : null}
        <p role="status" className="sr-only">
          {status === "loading" ? embed.loading : ""}
        </p>
        <div
          ref={frame}
          className="hs-form-frame relative"
          data-region={embed.region}
          data-form-id={embed.formId}
          data-portal-id={embed.portalId}
        />
      </div>
    </div>
  );
}
