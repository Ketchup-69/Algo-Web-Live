import type { Metadata } from "next";
import { Container, Heading, Link, Section } from "@/components/ui";
import { moved, movedPages } from "@/content/legal";

type Slug = (typeof movedPages)[number]["slug"];

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const entry = (slug: Slug) => movedPages.find((page) => page.slug === slug)!;

/** Kept out of search: the page it points to is the one to index. */
export const movedMetadata: Metadata = {
  title: moved.title,
  robots: { index: false, follow: true },
};

/**
 * A page the live site has and this one does not (approved page map). It
 * sends the visitor straight on: a meta refresh for any browser, with a plain
 * link for anyone it does not move. Static hosting has no server redirects,
 * so this is the portable way to keep old links and search results working.
 * On a host that supports them, a permanent (301) redirect is better: see the
 * handover note.
 */
export function MovedPage({ slug }: { slug: Slug }) {
  const page = entry(slug);
  const target = `${base}${page.to}`;
  return (
    <main id="main" className="flex-1">
      {/* React hoists this into <head>. */}
      <meta httpEquiv="refresh" content={`0; url=${target}`} />
      <Section spacing="lg">
        <Container width="wide">
          <Heading level={1} size="2xl">
            {moved.title}
          </Heading>
          <Link href={page.to} className="mt-6 inline-block text-lg">
            {moved.link.replace("{name}", page.name)}
          </Link>
        </Container>
      </Section>
    </main>
  );
}
