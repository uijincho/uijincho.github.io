/**
 * PLACEHOLDER contact hrefs — real handles are owed by the site owner, same
 * as bio copy and experience dates elsewhere (see app/about/page.tsx). Kept
 * as named constants (not inline "#") so the mailto: structure the spec
 * asks for is genuinely present, just pointed at an obviously-fake address
 * rather than a real one published into a public repo without being asked
 * to do that.
 *
 * Single source of truth: both /about and the notebook hero's right page
 * (components/hero/NotebookHero.tsx, via components/ContactIcons.tsx) read
 * these same three constants, so the two locations can never drift apart.
 */
export const EMAIL = "uijin_cho@brown.edu";
export const LINKEDIN_URL = "https://www.linkedin.com/in/uijincho";
export const GITHUB_URL = "https://github.com/uijincho";
