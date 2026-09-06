export interface ExperienceItem {
  role: string;
  org: string;
  /** "FEB 2026" style — matches the existing date display convention (uppercase mono). */
  start: string;
  /** "PRESENT" or an end date in the same style as `start`. */
  end: string;
}

/**
 * PLACEHOLDER entries — obviously so (literal "PLACEHOLDER" role/org strings,
 * generic "MMM YYYY" date tokens rather than fabricated real ones), per this
 * site's existing convention (see app/about/page.tsx's bio paragraph, or the
 * prior stub's "PLACEHOLDER — currently item one/two"). Real dates and
 * employers are owed by the site owner, not invented here. Same entry count
 * (three) as the prior stub's two "Currently" bullets plus its one Education
 * line, now unified into one list.
 */
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
