import { Link } from "react-router";

interface StampCardProps {
  slug: string;
  label: string;
}

export function StampCard({ slug, label }: StampCardProps) {
  return (
    <Link
      to={`/projects/${slug}`}
      className="flex aspect-[5/6] flex-col items-center justify-center gap-1 border border-black p-2 text-center text-xs hover:bg-neutral-100"
    >
      <span>{label}</span>
    </Link>
  );
}
