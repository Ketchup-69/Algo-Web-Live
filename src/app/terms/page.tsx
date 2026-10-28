import { Container, Heading, Lede, Section } from "@/components/ui";
import { legalPages } from "@/content/legal";
import { pageMetadata } from "@/lib/metadata";

const page = legalPages.terms;

// Placeholder pages should not be indexed while they say nothing.
export const metadata = pageMetadata(page.meta, { index: false });

/** PLACEHOLDER: edit src/content/legal.ts → legalPages.terms (draft in Phase 4) */
export default function TermsPage() {
  return (
    <main id="main" className="flex-1">
      <Section spacing="lg" className="pt-14 sm:pt-20 lg:pt-24">
        <Container width="prose">
          <Heading level={1} size="3xl">
            {page.title}
          </Heading>
          <Lede className="mt-6">{page.note}</Lede>
        </Container>
      </Section>
    </main>
  );
}
