import type { Metadata } from "next";
import { Archivo, Inter, Newsreader, JetBrains_Mono } from "next/font/google";
import { SiteNav } from "@/components/nav/SiteNav";
import { Footer } from "@/components/Footer";
import "./globals.css";

// Display / headings only — weight 700, tight tracking applied via utility classes.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["500", "700"],
});

// UI / labels / summaries / nav / card text — the default body sans.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
});

// Long-form article body INSIDE MDX ONLY — not for interface text.
// Kept as its own token (--font-serif) so it can't drift into UI copy.
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

// Meta / labels / tags — uppercase, wide tracking, 11-12px via utility classes.
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Uijin Cho",
  description: "Software engineering + research portfolio.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${inter.variable} ${newsreader.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SiteNav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
