import Image from "next/image";
import { site } from "@/content/site";

export function Logo({ className = "", priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src="/brand/dustt-temple-logo.png"
      alt={`${site.name} logo`}
      width={636}
      height={377}
      priority={priority}
      sizes="160px"
      className={className}
    />
  );
}
