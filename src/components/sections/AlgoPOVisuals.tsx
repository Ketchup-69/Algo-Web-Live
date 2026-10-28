import { Container, GradientField, Section } from "@/components/ui";
import { Figure } from "@/components/blocks";
import { CodingWell } from "@/components/product/CodingWell";
import { ExceptionsPanel } from "@/components/product/ExceptionsPanel";
import { FormatWell } from "@/components/product/FormatWell";
import { StatementPanel } from "@/components/product/StatementPanel";
import { SystemsWell } from "@/components/product/SystemsWell";
import { VerificationCards } from "@/components/product/VerificationCards";
import { algopoVisuals } from "@/content/products";

const WELLS = [FormatWell, CodingWell, SystemsWell] as const;

/** Three stages of the AlgoPO workflow, each drawn: capture, code, record. */
export function AlgoPOWells() {
  return (
    <div className="grid gap-x-10 gap-y-14 lg:grid-cols-3">
      {algopoVisuals.wells.map((caption, index) => {
        const Visual = WELLS[index];
        return (
          <Figure key={caption.title} title={caption.title} body={caption.body}>
            {Visual ? <Visual className="mx-auto" /> : null}
          </Figure>
        );
      })}
    </div>
  );
}

/**
 * The reconciled supplier statement, centred, with the brand light welling up
 * under it, then the two checks that come out of it side by side.
 */
export function AlgoPOChecks() {
  return (
    <Section spacing="md" className="overflow-x-clip">
      <Container width="wide">
        <div className="relative">
          <GradientField variant="panel" />
          <Figure title={algopoVisuals.statement.title} body={algopoVisuals.statement.body} align="center" className="relative">
            <StatementPanel className="relative mx-auto" />
          </Figure>
        </div>
        <div className="mt-16 grid gap-6 lg:mt-24 lg:grid-cols-2 lg:gap-8">
          {[
            <VerificationCards key="match" stacked maxScale={0.86} className="mx-auto" />,
            <ExceptionsPanel key="held" maxScale={1.3} className="mx-auto" />,
          ].map((visual, index) => (
            <Figure key={visual.key} title={algopoVisuals.checks[index]?.title} body={algopoVisuals.checks[index]?.body} className="h-full">
              <div className="bg-well flex flex-1 items-center overflow-hidden rounded-card px-6 py-10">{visual}</div>
            </Figure>
          ))}
        </div>
      </Container>
    </Section>
  );
}
