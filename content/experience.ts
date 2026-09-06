export interface ExperienceItem {
  role: string;
  org: string;
  /** "FEB 2026" style — matches the existing date display convention (uppercase mono). */
  start: string;
  /** "PRESENT" or an end date in the same style as `start`. */
  end: string;
}

/** Experience entries shown on the About page, most recent first. */
export const EXPERIENCE: ExperienceItem[] = [
  {
    role: "Undergrad Researcher",
    org: "Brown University — Freilich Lab",
    start: "Jun 2026",
    end: "PRESENT",
  },
  {
    role: "Software Engineer Intern",
    org: "GoDaddy",
    start: "Jun 2026",
    end: "Jul 2026",
  },
  {
    role: "Hackathon Director",
    org: "Hack@Brown",
    start: "Mar 2026",
    end: "PRESENT",
  },
  {
    role: "Data Analyst",
    org: "Brown Daily Herald",
    start: "Jan 2026",
    end: "May 2026",
  },
];
