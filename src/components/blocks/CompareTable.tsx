import { cn } from "@/lib/cn";
import { iconFor } from "@/lib/icon-for";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { AiMark } from "@/components/product/AgentPill";

const tick = "M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z";
const dash = "M200-440v-80h560v80H200Z";

function Glyph({ d, strong }: { d: string; strong: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "mt-[0.2em] flex size-5 shrink-0 items-center justify-center rounded-full",
        strong ? "bg-tile-green text-fg" : "bg-bg-subtle text-fg-muted",
      )}
    >
      <svg viewBox="0 -960 960 960" fill="currentColor" className="size-3.5">
        <path d={d} />
      </svg>
    </span>
  );
}

/**
 * A comparison as a real table, drawn as two columns side by side: the
 * conventional approach quiet on the left, Algomotive's highlighted on the
 * right as one continuous tinted column under the agent mark. Row labels
 * carry an icon. On a phone each row stacks into a small card and every cell
 * repeats its column's name.
 */
export function CompareTable({
  caption,
  columns,
  rows,
}: {
  caption: string;
  /** Column headings. The first heads the row labels; it may be empty. */
  columns: string[];
  rows: { label: string; cells: string[] }[];
}) {
  const last = columns.length - 2;
  return (
    <table className="compare w-full border-separate border-spacing-0 text-left">
      <caption className="sr-only">{caption}</caption>
      <thead className="hidden md:table-header-group">
        <tr>
          {columns.map((column, index) => (
            <th
              key={`${column}-${index}`}
              scope="col"
              className={cn(
                "px-6 pt-6 pb-5 align-bottom font-display text-base font-semibold",
                index === 0 && "pl-0 text-fg-muted",
                index > 0 && index - 1 < last && "text-fg-muted",
                index - 1 === last && "compare-hl rounded-t-card text-fg",
              )}
            >
              {index - 1 === last ? (
                <span className="flex items-center gap-3">
                  <AiMark size={30} />
                  {column}
                </span>
              ) : (
                column
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody data-reveal="cards">
        {rows.map((row, rowIndex) => (
          <tr
            key={row.label}
            className="site-card mb-3 block p-5 md:table-row md:rounded-none md:border-0 md:bg-transparent md:p-0 md:shadow-none"
          >
            <th scope="row" className="block align-top md:table-cell md:w-[22%] md:border-t md:border-border md:py-6 md:pr-6">
              <span className="flex items-center gap-3 font-display text-lg font-semibold text-fg">
                <FeatureIcon name={iconFor(row.label)} tone="navy" size="sm" />
                {row.label}
              </span>
            </th>
            {row.cells.map((cell, index) => {
              const strong = index === last;
              return (
                <td
                  key={index}
                  className={cn(
                    "mt-4 block align-top text-base md:mt-0 md:table-cell md:border-t md:border-border md:px-6 md:py-6",
                    strong ? "compare-hl text-fg" : "text-fg-muted",
                    strong && rowIndex === rows.length - 1 && "md:rounded-b-card",
                  )}
                >
                  <span className="mb-1.5 block text-sm font-semibold text-fg-muted md:hidden">{columns[index + 1]}</span>
                  <span className="flex gap-3">
                    <Glyph d={strong ? tick : dash} strong={strong} />
                    <span>{cell}</span>
                  </span>
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
