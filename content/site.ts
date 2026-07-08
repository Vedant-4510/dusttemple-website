export type NavItem = { label: string; href: string };
export type SocialLink = { label: string; href: string; icon: "facebook" | "instagram" | "youtube" };

export const site = {
  name: "Dustt Temple",
  tagline: "Find your balance, embrace your peace.",
  calLink: "manishaa-motarwar-zwznrp/30min",
  ctaLabel: "Begin a conversation",
  practitioner: "Manisha Motarwar",
} as const;

export const nav: NavItem[] = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

export const socials: SocialLink[] = [
  { label: "Facebook", href: "#", icon: "facebook" },
  { label: "Instagram", href: "#", icon: "instagram" },
  { label: "YouTube", href: "#", icon: "youtube" },
];
