import type { Metadata } from "next";
import { WorkIndexBody } from "@/components/work/WorkIndexBody";
import { SITE_URL } from "@/lib/site";

const DESCRIPTION = "Software engineering and research projects.";

// Short title; the root layout's title.template appends the site suffix.
export const metadata: Metadata = {
  title: "Projects",
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/projects` },
  openGraph: {
    title: "Projects",
    description: DESCRIPTION,
    url: `${SITE_URL}/projects`,
    type: "website",
  },
};

// Project index. Body lives in WorkIndexBody, also embedded on the landing page.
export default function WorkIndex() {
  return (
    // `relative` lets body's grain texture (globals.css) show through behind this page.
    <main className="relative">
      <WorkIndexBody />
    </main>
  );
}
