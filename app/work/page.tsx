import type { Metadata } from "next";
import { WorkIndexBody } from "@/components/work/WorkIndexBody";
import { SITE_URL } from "@/lib/site";

const DESCRIPTION = "Software engineering and research projects.";

// Short title, not "Work — Uijin Cho" — the root layout's title.template
// appends the suffix once, centrally (see app/layout.tsx).
export const metadata: Metadata = {
  title: "Work",
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/work` },
  openGraph: {
    title: "Work",
    description: DESCRIPTION,
    url: `${SITE_URL}/work`,
    type: "website",
  },
};

// Real editorial index, replacing the Stage 2 plain-list proof-of-life.
// Body lives in WorkIndexBody — also embedded directly on the landing
// page (Zone 2), so this route and the homepage stay in sync for free.
export default function WorkIndex() {
  return (
    <main>
      <WorkIndexBody />
    </main>
  );
}
