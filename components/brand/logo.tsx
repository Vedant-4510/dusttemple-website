import Image from "next/image";
import { site } from "@/content/site";

export function Logo({
  className = "h-9 w-auto",
  textClassName = "text-lg",
  priority = false,
  showText = true,
}: {
  className?: string;
  textClassName?: string;
  priority?: boolean;
  showText?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <Image
        src="/brand/dustt-temple-mark.png"
        alt={`${site.name} mark`}
        width={284}
        height={242}
        priority={priority}
        sizes="80px"
        className={className}
      />
      {showText ? (
        <span className={`font-display uppercase leading-none tracking-[0.14em] text-teal-deep ${textClassName}`}>
          {site.name}
        </span>
      ) : null}
    </span>
  );
}
