import { cn } from "@/lib/utils";
import { site } from "@/content/site";

export function BookingButton({
  className = "",
  label = site.ctaLabel,
  variant = "solid",
}: {
  className?: string;
  label?: string;
  variant?: "solid" | "ghost";
}) {
  return (
    <a
      href={site.bookingUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-6 py-3 text-[15px] transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
        variant === "solid"
          ? "bg-teal-deep text-paper hover:bg-teal"
          : "text-teal-deep hover:text-teal",
        className
      )}
    >
      {label}
      <span aria-hidden="true">→</span>
    </a>
  );
}
