import { Container, Heading, Section, Status, Text } from "@/components/ui";
import { legalUi } from "@/content/legal";
import type { LegalBlock, LegalDoc } from "@/content/types";
import { formatDate } from "@/lib/dates";
import { RichText } from "./RichText";

/**
 * A privacy notice or terms page: the title and date, the draft notice while
 * there is one, then the sections in order. Plain reading type, no motion.
 *
 * While a section has something open, a marked note sits under its heading,
 * so the reviewer sees the gap beside the words it affects.
 */
export function LegalDocument({ doc }: { doc: LegalDoc }) {
  return (
    <main id="main" className="flex-1">
      <Section spacing="lg" className="pt-14 sm:pt-20 lg:pt-24">
        <Container width="prose">
          <Heading level={1} size="3xl">
            {doc.title}
          </Heading>
          <Text tone="muted" size="sm" className="mt-4">
            {doc.updated.label} <time dateTime={doc.updated.date}>{formatDate(doc.updated.date)}</time>
          </Text>

          {doc.draft ? (
            <div role="note" className="mt-8 rounded-control border border-border-strong bg-bg-subtle p-5">
              <Status tone="attention">{doc.draft.label}</Status>
              <Text className="mt-3">{doc.draft.body}</Text>
            </div>
          ) : null}

          <div className="mt-10 flex flex-col gap-5">
            {doc.intro.map((line) => (
              <Text key={line} size="lg" tone="muted">
                <RichText text={line} />
              </Text>
            ))}
          </div>

          {doc.sections.map((section) => (
            <section key={section.id} aria-labelledby={section.id} className="mt-14 scroll-mt-20">
              <Heading level={2} size="md" id={section.id}>
                {section.heading}
              </Heading>
              {section.toConfirm ? (
                <div className="mt-4 border-l-2 border-border-strong pl-4">
                  <Status>{legalUi.toConfirm}</Status>
                  <Text tone="muted" size="sm" className="mt-2">
                    {section.toConfirm}
                  </Text>
                </div>
              ) : null}
              <div className="mt-5 flex flex-col gap-5">
                {section.blocks.map((block, index) => (
                  <LegalBlockView key={index} block={block} id={`${section.id}-${index}`} />
                ))}
              </div>
            </section>
          ))}
        </Container>
      </Section>
    </main>
  );
}

/** `id` names a table for assistive tech; unique on the page. */
function LegalBlockView({ block, id }: { block: LegalBlock; id: string }) {
  if (typeof block === "string") {
    return (
      <Text tone="muted">
        <RichText text={block} />
      </Text>
    );
  }

  if ("list" in block) {
    return (
      <ul className="measure ml-5 flex list-disc flex-col gap-2 text-base text-fg-muted">
        {block.list.map((item) => (
          <li key={item}>
            <RichText text={item} />
          </li>
        ))}
      </ul>
    );
  }

  const { caption, head, rows } = block.table;
  return (
    <div>
      <p id={id} className="text-sm font-semibold text-fg">
        {caption}
      </p>
      {/* On a phone, one entry per row with each field named: four columns
          do not fit in 360px. The table takes over from 640px. */}
      <dl className="mt-3 sm:hidden">
        {rows.map(([name, ...cells]) => (
          <div key={name} className="border-t border-border py-3 last:border-b">
            <dt className="font-medium break-all text-fg">{name}</dt>
            {cells.map((cell, index) => (
              <dd key={index} className="mt-1 text-sm text-fg-muted">
                <span className="text-fg">{head[index + 1]}: </span>
                {cell}
              </dd>
            ))}
          </div>
        ))}
      </dl>
      <table aria-labelledby={id} className="mt-3 hidden w-full border-collapse text-left text-sm sm:table">
        <thead>
          <tr>
            {head.map((cell) => (
              <th key={cell} scope="col" className="border-b border-border-strong py-2.5 pr-4 font-semibold text-fg">
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]}>
              {row.map((cell, index) =>
                index === 0 ? (
                  <th key={index} scope="row" className="border-b border-border py-2.5 pr-4 align-top font-medium break-all text-fg">
                    {cell}
                  </th>
                ) : (
                  <td key={index} className="border-b border-border py-2.5 pr-4 align-top text-fg-muted">
                    {cell}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
