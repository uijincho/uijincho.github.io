import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("routes/book-layout.tsx", [
    index("routes/home.tsx"),
    route("about", "routes/about.tsx"),
    route("projects", "routes/projects.tsx", [
      route(":slug", "routes/project-detail.tsx"),
    ]),
    route("contact", "routes/contact.tsx"),
  ]),
] satisfies RouteConfig;
