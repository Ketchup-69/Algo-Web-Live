"use client";

import { useEffect, useId, useRef, useState } from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { isGroup, site, type NavGroup } from "@/content/site";
import { Button, Container, ThemeToggle } from "@/components/ui";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";

const trim = (path: string) => path.replace(/\/$/, "") || "/";

/** True when `href` is the page open now, or a page inside it. */
const isCurrentPath = (pathname: string, href: string) => {
  const [path, hash] = href.split("#");
  if (hash) return false;
  const target = trim(path || "/");
  return target === "/" ? trim(pathname) === "/" : trim(pathname).startsWith(target);
};

const linkClass = (current: boolean) =>
  cn(
    "relative py-1 text-sm transition-colors duration-200",
    "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-fg after:transition-transform after:duration-300 after:ease-out motion-reduce:after:transition-none",
    "hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring",
    current ? "text-fg after:scale-x-100" : "text-fg-muted",
  );

/**
 * The products menu: a disclosure button and a list of links, not an ARIA
 * menu, because its items are ordinary links. Opens on click or Enter/Space,
 * closes on Escape (focus back to the button), on a click outside, on leaving
 * it with Tab, and on navigating.
 */
function NavMenu({ group, pathname }: { group: NavGroup; pathname: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const current = group.items.some((item) => isCurrentPath(pathname, item.href));

  // A route change closes the menu. Reacting to navigation is a sync with
  // the router, not derived state.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      button.current?.focus();
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={root}
      className="relative"
      onBlur={(event) => {
        if (!root.current?.contains(event.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((value) => !value)}
        className={cn(linkClass(current), "inline-flex items-center gap-1.5")}
      >
        {group.label}
        <svg
          aria-hidden="true"
          viewBox="0 0 12 12"
          className={cn("size-3 transition-transform duration-200 motion-reduce:transition-none", open && "rotate-180")}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 4.5 6 7.5 9 4.5" />
        </svg>
      </button>
      <ul
        id={id}
        hidden={!open}
        className="motion-safe:animate-panel-in absolute top-full left-1/2 mt-4 w-60 -translate-x-1/2 rounded-card border border-border bg-surface p-2 shadow-(--shadow-overlay)"
      >
        {group.items.map((item) => (
          <li key={item.href}>
            <NextLink
              href={item.href}
              onClick={() => setOpen(false)}
              aria-current={isCurrentPath(pathname, item.href) ? "page" : undefined}
              className="flex min-h-11 items-center rounded-control px-3 text-sm text-fg-muted transition-colors hover:bg-bg-subtle hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-ring aria-[current=page]:text-fg"
            >
              {item.label}
            </NextLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Sticky header. Transparent over the hero; once the page moves it takes a
 * translucent ground and a hairline. The bar's height never changes: a
 * height transition here would reflow the whole document on every frame and
 * move everything below it, which §5 rules out.
 *
 * The current page is marked with `aria-current` and a hairline under its
 * link that grows in from the left.
 */
export function Nav() {
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-[background-color,border-color] duration-300",
        solid
          ? "border-b border-border bg-bg/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <Container width="wide">
        <div className="flex h-16 items-center justify-between gap-4">
          <NextLink
            href="/"
            onClick={(event) => {
              // Already home: a link to the same page does nothing, so take the
              // reader back to the top instead (instantly under reduced motion).
              if (trim(pathname) !== "/") return;
              event.preventDefault();
              const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
              window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
              if (window.location.hash) history.replaceState(null, "", window.location.pathname);
            }}
            className="inline-flex min-h-11 items-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          >
            <Logo />
          </NextLink>

          <nav aria-label={site.ui.primaryNavLabel} className="hidden items-center gap-8 lg:flex">
            {site.nav.map((entry) =>
              isGroup(entry) ? (
                <NavMenu key={entry.label} group={entry} pathname={pathname} />
              ) : (
                <NextLink
                  key={entry.href}
                  href={entry.href}
                  aria-current={isCurrentPath(pathname, entry.href) ? "page" : undefined}
                  className={linkClass(isCurrentPath(pathname, entry.href))}
                >
                  {entry.label}
                </NextLink>
              ),
            )}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button href={site.cta.href} size="sm" className="hidden lg:inline-flex">
              {site.cta.label}
            </Button>
            <MobileNav />
          </div>
        </div>
      </Container>
    </header>
  );
}
