import type { Metadata } from "next";
import { Archivo, Inter, Newsreader, JetBrains_Mono } from "next/font/google";
import { SiteNav } from "@/components/nav/SiteNav";
import { Footer } from "@/components/Footer";
import { SITE_URL, SITE_NAME } from "@/lib/site";
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

// Long-form article body inside MDX only. `preload: false` avoids
// preloading this font on routes that don't render it.
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  preload: false,
});

// Meta / labels / tags — uppercase, wide tracking, 11-12px via utility classes.
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const DESCRIPTION = "Software engineering + research portfolio.";

// metadataBase resolves relative OG/twitter image and canonical URLs
// against SITE_URL. title.template appends the site suffix to each
// route's short title.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s — ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  openGraph: {
    title: SITE_NAME,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: DESCRIPTION,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${inter.variable} ${newsreader.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      {/* The base page background texture (globals.css `.grain`) lives on body. */}
      <body className="relative min-h-full flex flex-col grain">
        <SiteNav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
