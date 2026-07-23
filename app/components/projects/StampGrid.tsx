import { StampCard } from "./StampCard";
import { projects, type Project } from "~/data/projects";

interface StampGridProps {
  stamps?: Project[];
}

export function StampGrid({ stamps = projects }: StampGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {stamps.map((stamp) => (
        <StampCard key={stamp.slug} {...stamp} />
      ))}
    </div>
  );
}
