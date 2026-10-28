import NextLink from "next/link";
import { Container, Link, Text } from "@/components/ui";
import { site } from "@/content/site";
import { Logo } from "./Logo";

const footerLink =
  "inline-flex min-h-11 items-center text-sm text-fg-muted transition-colors hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

/**
 * Quiet on purpose: the closing band above it already carries the one call
 * to action. The lockup, every page, the two addresses and the portal, and
 * the legal line at the bottom.
 */
export function Footer() {
  // Same rule as the JSON-LD in the layout: a profile exists once it has a URL.
  const social = site.social.filter((item) => item.href.startsWith("http"));

  return (
    <footer className="bg-bg-subtle">
      <div aria-hidden="true" className="footer-rise" />
      <Container width="wide" className="pt-16 pb-(--space-section-sm)">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))] lg:gap-12">
          <div className="max-w-xs">
            <Logo withSubline gradientId="logo-gradient-footer" />
            <Text tone="muted" size="sm" className="mt-5">
              {site.description}
            </Text>
          </div>

          {site.footer.map((column) => (
            <div key={column.heading}>
              <h2 className="text-sm font-semibold text-fg">{column.heading}</h2>
              <ul className="mt-2 flex flex-col">
                {column.links.map((item) => (
                  <li key={item.href}>
                    <NextLink href={item.href} className={footerLink}>
                      {item.label}
                    </NextLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h2 className="text-sm font-semibold text-fg">{site.ui.footerContact}</h2>
            <ul className="mt-4 flex flex-col gap-4 text-sm">
              <li>
                <span className="block text-fg-muted">{site.ui.salesLabel}</span>
                <Link href={`mailto:${site.email.sales}`} external className="inline-flex min-h-11 items-center">
                  {site.email.sales}
                </Link>
              </li>
              <li>
                <span className="block text-fg-muted">{site.ui.helpdeskLabel}</span>
                <Link href={`mailto:${site.email.helpdesk}`} external className="inline-flex min-h-11 items-center">
                  {site.email.helpdesk}
                </Link>
              </li>
              <li>
                <Link href={site.portal.href} external className="inline-flex min-h-11 items-center">
                  {site.portal.label}
                </Link>
              </li>
            </ul>

            {/* PLACEHOLDER: only profiles with a real URL render; the block is
                absent until then. Edit src/content/site.ts → site.social */}
            {social.length > 0 ? (
              <>
                <h2 className="mt-8 text-sm font-semibold text-fg">{site.ui.footerElsewhere}</h2>
                <ul className="mt-4 flex gap-5">
                  {social.map((item) => (
                    <li key={item.label}>
                      <Link href={item.href} external className="text-sm">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <Text tone="muted" size="sm" measure={false}>
            {site.legalLine}
          </Text>
          <ul className="flex flex-wrap gap-x-6">
            {site.legalNav.map((item) => (
              <li key={item.href}>
                <NextLink href={item.href} className={footerLink}>
                  {item.label}
                </NextLink>
              </li>
            ))}
            <li>
              <a href="#top" className={footerLink}>
                {site.ui.backToTop}
              </a>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
