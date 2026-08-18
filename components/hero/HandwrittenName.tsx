import { JetBrains_Mono } from "next/font/google";

const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400"] });

/**
 * The page's h1 — this name is the landing page's primary heading.
 */
export function HandwrittenName() {
  return <h1 className={`${mono.className} text-[36px] leading-none text-accent tracking-tight`}>~uijincho</h1>;
}