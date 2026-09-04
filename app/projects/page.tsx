import type { Metadata } from "next";
import { WorkIndexBody } from "@/components/work/WorkIndexBody";
import { SITE_URL } from "@/lib/site";

const DESCRIPTION = "Software engineering and research projects.";

// Short title, not "Projects — Uijin Cho" — the root layout's title.template
// appends the suffix once, centrally (see app/layout.tsx).
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

// Real editorial index, replacing the Stage 2 plain-list proof-of-life.
// Body lives in WorkIndexBody — also embedded directly on the landing
// page (Zone 2), so this route and the homepage stay in sync for free.
export default function WorkIndex() {
  return (
    // relative (no grain here) — see .grain's comment in globals.css:
    // this keeps <main> in the same CSS painting category as <body>'s
    // own grain pseudo-element, so that layer sits behind this page's
    // content instead of over it.
    <main className="relative">
      <WorkIndexBody />
    </main>
  );
}
