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

// Long-form article body INSIDE MDX ONLY — not for interface text.
// Kept as its own token (--font-serif) so it can't drift into UI copy.
// `preload: false`: next/font preloads based on where the loader is
// CALLED, not on whether a given route actually renders font-serif text —
// since this call lives in the root layout (every route goes through it),
// the default would inject a <link rel=preload> for Newsreader on `/` and
// `/work` too, neither of which ever renders it. Lighthouse's LCP "Render
// Delay" phase on `/` (mobile) confirmed this: an unused normal+italic
// font family was competing for early network priority against resources
// the page actually needed. `/about` and `/work/[slug]` (the only routes
// that use font-serif) still get it via the normal @font-face
// fetch-on-use path — just not preloaded ahead of render everywhere else.
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

// metadataBase resolves every relative OG/twitter image URL (and the
// canonical URLs below) against SITE_URL — without it Next.js falls back
// to a localhost origin, which was the pre-existing `next build` warning
// this fixes. title.template means child routes only need to set their
// own short title (e.g. "Work") — this suffixes " — Uijin Cho" once,
// centrally, instead of every route hardcoding the full string itself.
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
      <body className="min-h-full flex flex-col">
        <SiteNav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
