import { Block, ItemGrid } from "@/components/blocks";
import { Container, GradientField, Heading, Link, Section, Text } from "@/components/ui";
import { HubSpotContactForm } from "@/components/sections/HubSpotContactForm";
import { brief, channels, contactMeta, contactPage } from "@/content/contact";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(contactMeta);

/**
 * Contact: the embedded CRM form beside the three ways in, then how to make
 * a good first brief. No closing band: the form is this page's call to action.
 */
export default function ContactPage() {
  return (
    <main id="main" className="flex-1">
      <Section spacing="none" className="relative overflow-hidden pt-14 pb-(--space-section-md) sm:pt-20 lg:pt-24">
        <GradientField />
        <Container width="wide" className="relative">
          {/* Three parts on one grid: on a phone the form comes straight after
              the intro; on a wide screen it spans the right-hand column. */}
          <div className="grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:grid-rows-[auto_1fr] lg:gap-x-20">
            <div>
              <Heading level={1} size="2xl" className="max-w-[18ch] text-balance">
                {contactPage.heading}
              </Heading>
              <Text tone="muted" size="lg" className="mt-8 max-w-[44ch]">
                {contactPage.lede}
              </Text>
            </div>

            <HubSpotContactForm className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-start lg:justify-self-end" />

            <div className="lg:col-start-1 lg:row-start-2">
              <h2 className="font-display text-xl font-semibold text-balance text-fg">{channels.heading}</h2>
              <Text tone="muted" className="mt-3 max-w-[48ch]">
                {channels.intro}
              </Text>
              <ul className="mt-6 flex flex-col">
                {channels.items.map((item) => (
                  <li key={item.title} className="border-t border-border py-4">
                    <h3 className="text-base font-semibold text-fg">{item.title}</h3>
                    <p className="mt-1 text-sm text-fg-muted">{item.body}</p>
                    <Link href={item.link.href} external={item.link.external} className="mt-1 inline-flex min-h-11 items-center">
                      {item.link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <Block copy={brief} tone="subtle">
        <ItemGrid items={brief.items} />
      </Block>
    </main>
  );
}
