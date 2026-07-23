import { Outlet } from "react-router";
import type { Route } from "./+types/projects";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Projects" }];
}

/**
 * Content lives in book-layout.tsx (the parent layout route) — the
 * project stamps are pages in the shared flip book, not rendered
 * independently here. This route's only remaining job is to host the
 * nested :slug route's <Outlet/>, which renders the full-screen project
 * detail overlay on top of everything when matched.
 */
export default function Projects() {
  return <Outlet />;
}
