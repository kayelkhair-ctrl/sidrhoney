import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope, Amiri } from "next/font/google";
import { SITE } from "@/site";
import "@/styles/tokens.css";
import "@/styles/site.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
});

const arabic = Amiri({
  subsets: ["arabic"],
  weight: ["400"],
  variable: "--font-arabic",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: `${SITE.legalName} — Raw Sidr Honey & Sunnah Foods, Imported at Source`,
  description:
    "For years we have imported raw sidr honey and the foods of the Islamic tradition by the container, supplying the trade. Now available directly from the importer.",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${display.variable} ${body.variable} ${arabic.variable}`}>
      <body>{children}</body>
    </html>
  );
}
