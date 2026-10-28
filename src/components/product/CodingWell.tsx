import { codingWell as data } from "@/content/product/wells";
import { Icon } from "./Icon";
import { Well } from "./Well";

/**
 * The second well: an invoice the agent has coded, one pill per line with the
 * GL code it chose (node 1:16403; web-scale copy 1:17411).
 */
export function CodingWell({ maxScale, className }: { maxScale?: number; className?: string }) {
  return (
    <Well label={data.alt} maxScale={maxScale} className={className}>
      {/* 24px of padding measured from the card's outer edge, hairline included. */}
      <div className="absolute top-87 left-55 flex w-450 flex-col gap-20 rounded-u-14 border-[length:var(--u)] border-ui-card-line/50 bg-bg p-23 shadow-[0_var(--u)_calc(var(--u)*3)_0_rgb(0_0_0/0.03),0_calc(var(--u)*2)_calc(var(--u)*12)_0_rgb(0_0_0/0.06)]">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2 whitespace-nowrap">
            <span className="fs-u-22 font-bold tracking-[-0.025em] text-ui-slate">{data.supplier}</span>
            <span className="fs-u-13 font-medium text-ui-meta">{data.status}</span>
          </div>
          <span className="rounded-u-4 bg-ui-amount-soft p-4 font-data fs-u-16 font-semibold whitespace-nowrap text-ui-slate">
            {data.amount}
          </span>
        </div>

        <div className="flex flex-col gap-8">
          {data.lines.map((line) => (
            <div key={line.code} className="flex items-center gap-10 rounded-u-10 bg-ui-code-soft px-16 py-14">
              <Icon name="check_circle" className="size-20 text-ui-ai" />
              <span className="min-w-0 flex-1 fs-u-16 font-semibold tracking-[-0.025em] text-ui-code">
                {line.category}
              </span>
              <Icon name="arrow_forward" className="size-16 text-ui-ai" />
              <span className="font-data fs-u-13 font-medium whitespace-nowrap text-ui-code">{line.code}</span>
            </div>
          ))}
        </div>
      </div>
    </Well>
  );
}
