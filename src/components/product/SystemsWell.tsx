import { cn } from "@/lib/cn";
import { systemsWell as data, vendorLogos } from "@/content/product/wells";
import { Icon } from "./Icon";
import { Well } from "./Well";

type LogoName = (typeof vendorLogos)[number]["name"];

/** One mark at the size the drawing gives it, in design px. Decoration here: the well's label names the picture. */
function Logo({ name, w, h, className }: { name: LogoName; w: number; h: number; className?: string }) {
  const logo = vendorLogos.find((entry) => entry.name === name);
  if (!logo || !logo.src) return null; // PLACEHOLDER: logo files removed, see wells.ts
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static export, no image optimiser
    <img
      src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${logo.src}`}
      alt=""
      className={cn("relative block shrink-0", className)}
      style={{ width: `calc(var(--u) * ${w})`, height: `calc(var(--u) * ${h})` }}
    />
  );
}

/**
 * The third well: the systems the agent posts into, three rows that thin out
 * and blur as they recede, and the confirmation that the entry landed
 * (node 1:16435; web-scale copy 1:17439).
 */
export function SystemsWell({ maxScale, className }: { maxScale?: number; className?: string }) {
  return (
    <Well label={data.alt} maxScale={maxScale} className={className}>
      <div className="absolute top-[calc(var(--u)*217.21)] left-[calc(var(--u)*116.3)] flex items-center gap-12 opacity-70 blur-[calc(var(--u)*1.212)]">
        <Logo name="Accounting A" w={101.439} h={21.963} />
        <Logo name="ERP B" w={65.551} h={21.936} className="opacity-40" />
        <Logo name="ERP C" w={69.579} h={21.961} className="opacity-40" />
        <Logo name="ERP D" w={54.931} h={21.92} className="opacity-40" />
      </div>

      <div className="absolute top-[calc(var(--u)*170.53)] left-[calc(var(--u)*107.55)] flex items-center gap-16 opacity-42">
        <Logo name="ERP E" w={87.889} h={30.676} />
        <Logo name="Accounting B" w={87.889} h={22.49} />
        <Logo name="Accounting C" w={52.734} h={29.362} />
        <Logo name="Accounting D" w={68.114} h={29.272} />
      </div>

      {/* The veil is drawn inside the first row, above its first two marks and
          the rows behind, and beneath its last two. Source order keeps that. */}
      <div className="absolute top-96 left-[calc(var(--u)*38.975)] flex items-center gap-24 opacity-70">
        <Logo name="PMS A" w={108.397} h={58.534} />
        <Logo name="PMS B" w={125.609} h={18.318} />
        <span className="bg-well-wash absolute top-[calc(var(--u)*-27.418)] left-[calc(var(--u)*-5.881)] h-[calc(var(--u)*186.894)] w-[calc(var(--u)*505.713)]" />
        <Logo name="ERP A" w={87.889} h={43.462} />
        <Logo name="ERP F" w={87.889} h={29.627} />
      </div>

      <div className="absolute top-[calc(var(--u)*275.02)] left-[calc(var(--u)*185.81)] flex h-[calc(var(--u)*29.317)] w-[calc(var(--u)*188.115)] items-center justify-center gap-[calc(var(--u)*12.215)] rounded-[calc(var(--u)*4.886)] border-[length:calc(var(--u)*0.611)] border-ui-pill-line bg-bg whitespace-nowrap">
        <Icon name="check" className="size-[calc(var(--u)*19)] text-ui-match" />
        <span className="text-[length:calc(var(--u)*14.658)] font-bold text-ui-slate">{data.posted}</span>
      </div>
    </Well>
  );
}
