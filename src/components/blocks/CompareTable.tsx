/**
 * A comparison as a real table: rows of aspects, columns of approaches. On a
 * phone each row stacks, and every cell repeats its column's name so it still
 * reads without the header row.
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
  return (
    <table className="w-full border-collapse text-left">
      <caption className="sr-only">{caption}</caption>
      <thead className="hidden md:table-header-group">
        <tr className="border-b border-border-strong">
          {columns.map((column, index) => (
            <th
              key={`${column}-${index}`}
              scope="col"
              className="pb-4 pr-8 align-bottom font-display text-sm font-semibold text-fg-muted last:pr-0"
            >
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.label} className="block border-t border-border py-6 md:table-row md:py-0">
            <th
              scope="row"
              className="block pr-8 align-top font-display text-lg font-semibold text-fg md:table-cell md:w-[22%] md:py-6"
            >
              {row.label}
            </th>
            {row.cells.map((cell, index) => (
              <td
                key={index}
                className={
                  "mt-3 block pr-8 align-top text-base last:pr-0 md:mt-0 md:table-cell md:py-6 " +
                  (index === row.cells.length - 1 ? "text-fg" : "text-fg-muted")
                }
              >
                <span className="mb-1 block text-sm font-semibold text-fg-muted md:hidden">{columns[index + 1]}</span>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
