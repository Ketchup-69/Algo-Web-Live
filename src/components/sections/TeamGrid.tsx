import type { TeamMember } from "@/content/about";

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * The people behind Algomotive: a card each, the photo square on top. The
 * list is `team.people` in src/content/about.ts, so a new person is one entry.
 */
export function TeamGrid({ people }: { people: TeamMember[] }) {
  return (
    <ul data-reveal="cards" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {people.map((person) => (
        <li key={person.name} className="site-card lift p-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element -- static export, images unoptimised by design */}
          <img
            src={`${base}${person.photo}`}
            alt={person.alt}
            width={640}
            height={640}
            loading="lazy"
            decoding="async"
            className="aspect-square w-full rounded-[calc(var(--radius-card)-0.375rem)] bg-bg-subtle object-cover"
          />
          <div className="px-3.5 pt-5 pb-4">
            <h3 className="font-display text-xl font-semibold text-fg">{person.name}</h3>
            <p className="mt-1 text-base text-fg-muted">{person.role}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
