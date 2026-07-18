export type NavItem = { label: string; href: string };
export type SocialLink = { label: string; href: string; icon: "facebook" | "instagram" | "youtube" };

export const site = {
  name: "Dustt Temple",
  tagline: "Find your balance, embrace your peace.",
  bookingUrl: "https://calendly.com/vedant-scoutflo/new-meeting",
  ctaLabel: "Begin a conversation",
  practitioner: "Mmanisha Sandip M",
} as const;

export const nav: NavItem[] = [
  { label: "Practices", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Kind words", href: "#testimonials" },
  { label: "Questions", href: "#faq" },
];

export const socials: SocialLink[] = [
  { label: "Facebook", href: "#", icon: "facebook" },
  { label: "Instagram", href: "https://www.instagram.com/dustttemple?igsh=MW12Zm14Y3duZHA5eg==", icon: "instagram" },
  { label: "YouTube", href: "#", icon: "youtube" },
];
