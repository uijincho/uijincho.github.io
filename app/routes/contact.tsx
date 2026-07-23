import type { Route } from "./+types/contact";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Contact" }];
}

// Content lives in book-layout.tsx (the parent layout route) — it's one
// of the flip book's pages there, not rendered independently per route.
export default function Contact() {
  return null;
}
