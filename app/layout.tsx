import type { Metadata } from "next";
import { fraunces, hanken, plexMono } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://dusttemple.com"),
  title: "Dustt Temple — Find your balance, embrace your peace",
  description:
    "Personal spiritual guidance with Manisha Motarwar — numerology, astrology, mediumship, akashic readings, and more. Online and in person.",
  openGraph: {
    title: "Dustt Temple",
    description: "Find your balance, embrace your peace.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${hanken.variable} ${plexMono.variable}`}
    >
      <body className="bg-paper text-ink font-body antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
