import { ChevronRight } from "lucide-react";

export type Crumb = { label: string; href: string };

// breadcrumb trail for product pages, desktop only. last item is the current
// page so it renders as plain text, the rest are links

// the logic would be to dispaly breadcrumb from url
const Breadcrumb = ({ items }: { items: Crumb[] }) => (
  <nav aria-label="Breadcrumb" className="hidden sm:block">
    <ol className="flex flex-wrap items-center gap-2 text-sm text-black/60">
      {items.map((crumb, i) => {
        const last = i === items.length - 1;
        return (
          <li key={crumb.label} className="flex items-center gap-2">
            {last ? (
              <span className="font-semibold text-primary">{crumb.label}</span>
            ) : (
              // links nerfed for now, routes are not ready yet. later on swap
              // this span back to a next/link pointing at crumb.href
              <span className="transition-colors hover:text-primary">
                {crumb.label}
              </span>
            )}
            {!last && (
              <ChevronRight className="size-4 text-black/30" aria-hidden />
            )}
          </li>
        );
      })}
    </ol>
  </nav>
);

export default Breadcrumb;
