import { MovedPage, movedMetadata } from "@/components/blocks";

/** The live site's /products, folded into another page (approved page map). */
export const metadata = movedMetadata;

export default function Moved() {
  return <MovedPage slug="products" />;
}
