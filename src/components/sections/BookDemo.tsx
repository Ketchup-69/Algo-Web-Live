"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import NextLink from "next/link";
import { cn } from "@/lib/cn";
import { routes, site } from "@/content/site";
import { Button, type ButtonSize, type ButtonVariant } from "@/components/ui/Button";
import { Icon } from "@/components/product/Icon";

const copy = site.bookDemo;
type Phase = "idle" | "ask" | "loading" | "ready" | "failed" | "none";

/** How long to wait for the calendar before showing the address instead. */
const GIVE_UP_MS = 12000;

const embedSrc = (url: string) => `${url}${url.includes("?") ? "&" : "?"}embed=true`;

/**
 * "Book a demo": a button that opens a dialog with the CRM's meetings
 * scheduler, so a visitor picks a slot and books it there and then.
 *
 * Nothing of the scheduler loads with the page. The first time a dialog
 * opens, its embed script is added (fresh, so it scans for the new
 * container); until then the page carries no third-party code for it. With
 * no scheduler address set at build time, or if it does not draw in time, the
 * sales address takes its place. With `askFirst` on, the dialog asks before
 * loading anything.
 *
 * The native <dialog> gives the focus trap, Escape and the inert page behind;
 * focus returns to the button on close.
 */
export function BookDemo({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const host = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<Phase>(copy.url ? (copy.askFirst ? "ask" : "idle") : "none");
  const opened = useRef(false);

  const load = useCallback(() => {
    const container = host.current;
    if (!container) return;
    setPhase("loading");
    container.replaceChildren();
    const frame = document.createElement("div");
    frame.className = "meetings-iframe-container";
    frame.dataset.src = embedSrc(copy.url);
    container.appendChild(frame);

    let settled = false;
    const settle = (next: Phase) => {
      if (settled) return;
      settled = true;
      watch.disconnect();
      window.clearTimeout(timer);
      setPhase(next);
    };
    const watch = new MutationObserver(() => {
      if (container.querySelector("iframe")) settle("ready");
    });
    watch.observe(container, { childList: true, subtree: true });
    const timer = window.setTimeout(() => settle("failed"), GIVE_UP_MS);

    document.querySelectorAll(`script[src="${copy.scriptSrc}"]`).forEach((old) => old.remove());
    const script = document.createElement("script");
    script.src = copy.scriptSrc;
    script.async = true;
    script.onerror = () => settle("failed");
    document.body.appendChild(script);
  }, []);

  // The dialog mounts on the first click, then opens once it is in the DOM.
  useEffect(() => {
    if (!mounted || opened.current) return;
    opened.current = true;
    dialog.current?.showModal();
    if (phase === "idle") load();
  }, [mounted, phase, load]);

  const open = () => {
    if (!mounted) return setMounted(true);
    dialog.current?.showModal();
    if (phase === "failed") load();
  };

  // No page scroll behind an open dialog.
  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    const lock = () => document.documentElement.classList.add("overflow-hidden");
    const unlock = () => document.documentElement.classList.remove("overflow-hidden");
    const observer = new MutationObserver(() => (element.open ? lock() : unlock()));
    observer.observe(element, { attributes: true, attributeFilter: ["open"] });
    if (element.open) lock();
    return () => {
      observer.disconnect();
      unlock();
    };
  }, [mounted]);

  return (
    <>
      <Button variant={variant} size={size} className={className} onClick={open} aria-haspopup="dialog">
        {copy.label}
      </Button>
      {mounted ? (
        <dialog
          ref={dialog}
          aria-labelledby="book-demo-title"
          onClick={(event) => {
            // A click on the backdrop (the dialog box itself, outside the panel) closes it.
            if (event.target === event.currentTarget) event.currentTarget.close();
          }}
          className={cn(
            "book-demo m-auto w-[min(52rem,calc(100vw-2rem))]",
            phase === "loading" || phase === "ready" ? "h-[min(46rem,calc(100dvh-2rem))]" : "h-auto max-h-[calc(100dvh-2rem)]",
            " max-w-none overflow-hidden rounded-card bg-surface p-0 text-fg shadow-(--shadow-overlay) backdrop:bg-[rgb(3_21_34/0.55)] backdrop:backdrop-blur-sm",
          )}
        >
          <div className="flex h-full flex-col">
            <div className="flex items-start justify-between gap-6 border-b border-border px-6 py-5 sm:px-8">
              <div>
                <h2 id="book-demo-title" className="font-display text-2xl font-semibold text-fg">
                  {copy.title}
                </h2>
                <p className="mt-1.5 text-sm text-fg-muted">{copy.intro}</p>
              </div>
              <button
                type="button"
                onClick={() => dialog.current?.close()}
                className="inline-flex size-11 shrink-0 items-center justify-center rounded-control text-fg-muted transition-colors hover:bg-bg-subtle hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <Icon name="close" className="size-5" />
                <span className="sr-only">{copy.close}</span>
              </button>
            </div>

            <div className="relative min-h-0 flex-1 overflow-auto">
              {phase === "loading" ? (
                <p role="status" className="absolute inset-x-0 top-10 text-center text-sm text-fg-muted">
                  {copy.loading}
                </p>
              ) : null}
              {phase === "ask" ? (
                <div className="flex h-full flex-col items-center justify-center gap-5 px-8 py-14 text-center">
                  <p className="max-w-[46ch] text-base text-fg-muted">
                    {copy.consent.body}{" "}
                    <NextLink href={routes.privacy} className="text-fg underline underline-offset-4">
                      {copy.consent.privacyLabel}
                    </NextLink>
                  </p>
                  <Button onClick={load}>{copy.consent.accept}</Button>
                </div>
              ) : null}
              {phase === "none" || phase === "failed" ? (
                <div className="flex h-full items-center justify-center px-8 py-14 text-center">
                  <p className="max-w-[46ch] text-base text-fg-muted">
                    {copy.fallback.lead}{" "}
                    <a href={`mailto:${site.email.sales}`} className="font-semibold text-fg underline underline-offset-4">
                      {site.email.sales}
                    </a>{" "}
                    {copy.fallback.after}
                  </p>
                </div>
              ) : null}
              <div
                ref={host}
                className={cn("book-demo-frame h-full", phase === "ready" || phase === "loading" ? "block" : "hidden")}
              />
            </div>
          </div>
        </dialog>
      ) : null}
    </>
  );
}
