import { iconFor } from "@/lib/icon-for";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import type { Item } from "@/content/types";
import { PipelineClient } from "./PipelineClient";

/**
 * A workflow drawn as a live track (PipelineClient). The icons are rendered
 * here, on the server, and handed over as elements, so the icon paths never
 * ship in client code.
 */
export function Pipeline({ items, label, className }: { items: Item[]; label?: string; className?: string }) {
  return (
    <div className={className}>
      <PipelineClient
        label={label}
        steps={items.map((item, index) => ({
          title: item.title,
          body: item.body,
          marker: item.marker ?? String(index + 1).padStart(2, "0"),
          icon: <FeatureIcon name={item.icon ?? iconFor(item.title, item.body)} bare className="size-5" />,
        }))}
      />
    </div>
  );
}
