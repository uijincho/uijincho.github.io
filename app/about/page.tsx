import type { Metadata } from "next";
import Link from "next/link";
import { TYPE } from "@/lib/design/type-scale";
import { PhotoFrame } from "@/components/frames/PhotoFrame";
import { ContactIcons } from "@/components/ContactIcons";
import { ExperienceEntry } from "@/components/about/ExperienceEntry";
import { EXPERIENCE } from "@/content/experience";
import { SITE_URL } from "@/lib/site";

const DESCRIPTION = "Software engineer and researcher — bio, education, and contact.";

// Matches inline link/bold treatment used in MDX project prose (mdx-components.tsx).
const BIO_LINK_CLASSES = "text-accent underline underline-offset-2 hover:no-underline";
const BIO_STRONG_CLASSES = "font-semibold text-ink";

export const metadata: Metadata = {
  title: "About",
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: "About",
    description: DESCRIPTION,
    url: `${SITE_URL}/about`,
    type: "profile",
  },
};

/**
 * Two-column /about page: photo+Experience in one column, bio+degree/
 * icons in the other. Each column is `contents` below md (so `order-*`
 * can interleave items into the mobile order) and `flex flex-col` at
 * md+ (so each column sizes independently of the other's height).
 *
 * Contact links reuse the shared ContactIcons component, also used on
 * the notebook hero.
 */
export default function About() {
  return (
    <main className="relative mx-auto max-w-5xl px-6 py-24">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-start">
        {/* Column 1: photo, then Experience. */}
        <div className="contents md:col-start-1 md:flex md:flex-col md:gap-8">
          <div className="order-1 text-center md:order-none">
            <PhotoFrame
              src="/images/people/about-portrait.jpg"
              alt="Portrait of Uijin Cho"
              width={280}
              height={280}
              rotationIndex={0}
              rotate={false}
            />
          </div>

          <div className="order-4 md:order-none">
            <h2 className={TYPE.meta}>Experience</h2>
            <ul className="mt-4 flex flex-col gap-3">
              {EXPERIENCE.map((item, i) => (
                <ExperienceEntry key={i} {...item} />
              ))}
            </ul>
          </div>
        </div>

        {/* Column 2: bio, then the degree/contact block. */}
        <div className="contents md:col-start-2 md:flex md:flex-col md:gap-12">
          <div className="order-2 md:order-none">
            <div className={`${TYPE.bodySerif} mt-6 flex max-w-[68ch] flex-col gap-4 text-ink`}>
              <p>
                Hi, I’m{" "}
                <a href="https://hearmyname.net/say/ko-kr/%EC%9D%98%EC%A7%84" className={BIO_LINK_CLASSES}>
                  Uijin / Jin / 의진
                </a>
                !
              </p>
              <p>
                I’ve conducted{" "}
                <Link href="/projects/salton-sea-cnn" className={BIO_LINK_CLASSES}>
                  machine learning research
                </Link>{" "}
                with satellite data, published data journalism with{" "}
                <Link href="/projects/bdhcab" className={BIO_LINK_CLASSES}>
                  the Brown Daily Herald
                </Link>
                , and (will have) directed{" "}
                <a href="https://hackatbrown.org" className={BIO_LINK_CLASSES}>
                  hackathons
                </a>{" "}
                on both coasts.
              </p>
              <p>
                Since high school, I’ve worked to <strong className={BIO_STRONG_CLASSES}>expand STEM access</strong> through
                robotics and hackathons — and next up, I’m hoping to start the first collegiate-run{" "}
                <strong className={BIO_STRONG_CLASSES}>high school hackathon in Rhode Island</strong>.
              </p>
              <p>
                Long-term, I’m drawn to roles applying <strong className={BIO_STRONG_CLASSES}>AI/ML</strong> to{" "}
                <strong className={BIO_STRONG_CLASSES}>climate and environmental forecasting</strong>.
              </p>
              <p>
                I also compete with Brown University Badminton, enjoy{" "}
                <a href="https://goodreads.com/uijincho" className={BIO_LINK_CLASSES}>
                  reading
                </a>{" "}
                in my free time, and play oboe & english horn with Providence Medical Orchestra and in musical
                productions.
              </p>
            </div>
          </div>

          <div className="order-3 md:order-none">
            <div className="border-t border-rule pt-8 text-center">
              <p className="font-mono text-sm uppercase tracking-wide text-accent">
                Sc.B. Applied Mathematics-Computer Science
              </p>
              <p className="mt-1 font-mono text-xs uppercase tracking-wide text-ink-muted">
                Brown University, 2025–2029
              </p>

              <ContactIcons className="mt-6" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
