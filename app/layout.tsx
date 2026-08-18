import type { Metadata } from "next";
import { Archivo, Newsreader, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Display / headings — weight 700, tight tracking applied via utility classes.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["500", "700"],
});

// Body / long-form prose — carries research writeups.
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
      className={`${archivo.variable} ${newsreader.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
