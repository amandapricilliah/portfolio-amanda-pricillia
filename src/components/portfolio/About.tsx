import {
  motion,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useRef } from "react";

import { useTheme } from "@/components/theme/ThemeProvider";

const EXPERTISE = [
  {
    number: "01",
    title: "UI/UX Design",
    description:
      "Researching user needs and translating insights into intuitive digital experiences.",
  },
  {
    number: "02",
    title: "Graphic Design",
    description:
      "Creating visual identities and communication assets with clear visual hierarchy.",
  },
  {
    number: "03",
    title: "Web Development",
    description:
      "Building responsive, functional, and accessible web experiences.",
  },
  {
    number: "04",
    title: "Product Management",
    description:
      "Defining product direction, priorities, roadmap, and success criteria.",
  },
  {
    number: "05",
    title: "Business Analysis",
    description:
      "Transforming business needs into clear requirements and actionable documentation.",
  },
  {
    number: "06",
    title: "QA Testing",
    description:
      "Validating functionality through structured testing and release checks.",
  },
];

const SKILLS = [
  "UI/UX Design",
  "Web Development",
  "Graphic Design",
  "Product Management",
  "Business Analysis",
  "QA Testing",
];

export function About() {
  const reduceMotion = useReducedMotion();
  const { isDark } = useTheme();

  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef =
    useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    void (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } =
        await import("gsap/ScrollTrigger");

      gsap.registerPlugin(ScrollTrigger);

      if (!sectionRef.current) return;

      const prefersReducedMotion =
        window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;

      const ctx = gsap.context(() => {
        if (prefersReducedMotion) return;

        const cards = cardsRef.current
          ? Array.from(cardsRef.current.children)
          : [];

        gsap.set(headlineRef.current, {
          opacity: 0,
          y: 80,
        });

        gsap.set(copyRef.current, {
          opacity: 0,
          y: 60,
        });

        gsap.set(cards, {
          opacity: 0,
          y: 70,
        });

        gsap.set(lineRef.current, {
          scaleX: 0,
          transformOrigin: "left center",
        });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "top 10%",
            scrub: 1,
          },
        });

        timeline
          .to(
            lineRef.current,
            {
              scaleX: 1,
              ease: "none",
            },
            0,
          )
          .to(
            headlineRef.current,
            {
              opacity: 1,
              y: 0,
              ease: "power3.out",
            },
            0,
          )
          .to(
            copyRef.current,
            {
              opacity: 1,
              y: 0,
              ease: "power3.out",
            },
            0.12,
          )
          .to(
            cards,
            {
              opacity: 1,
              y: 0,
              stagger: 0.12,
              ease: "power3.out",
            },
            0.25,
          );

        gsap.to(glowRef.current, {
          xPercent: 15,
          yPercent: 25,
          rotation: 10,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }, sectionRef);

      cleanup = () => ctx.revert();
    })();

    return () => cleanup?.();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden bg-bg pb-8 pt-20 md:pb-12 md:pt-28"
    >
      {/* Pink ambient glow */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute right-[-12rem] top-[18%] h-[32rem] w-[32rem] rounded-full bg-fuchsia-500/15 blur-[130px]"
      />

      <div className="relative z-10 mx-auto flex max-w-[1200px] items-center px-6 md:px-10 lg:px-16">
        <div className="w-full py-16 md:py-24">
          {/* Eyebrow */}
          <div className="mb-10 flex items-center gap-3">
            <span className="h-px w-8 bg-stroke" />

            <span className="whitespace-nowrap text-xs uppercase tracking-[0.3em] text-muted">
              About Me
            </span>

            <div className="h-px flex-1 overflow-hidden bg-stroke">
              <div
                ref={lineRef}
                className="h-full w-full bg-gradient-to-r from-fuchsia-500 via-pink-400 to-transparent"
              />
            </div>
          </div>

          {/* Main content */}
          <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            {/* Headline */}
            <div>
              <h2
                ref={headlineRef}
                className="text-5xl leading-[0.95] tracking-[-0.04em] text-text-primary sm:text-6xl md:text-7xl lg:text-[5.2rem]"
              >
                Designing with{" "}
                <span
                  className={`font-display italic ${
                    isDark
                      ? "text-pink-200"
                      : "text-pink-600"
                  }`}
                >
                  empathy,
                </span>
                <br />
                building with{" "}
                <span
                  className={`font-display italic ${
                    isDark
                      ? "text-pink-200"
                      : "text-pink-600"
                  }`}
                >
                  purpose.
                </span>
              </h2>
            </div>

            {/* Lanyard and description */}
            <div
              ref={copyRef}
              className="grid items-center gap-10 sm:grid-cols-[260px_1fr] lg:gap-12"
            >
              {/* Animated lanyard */}
              <div className="relative flex min-h-[480px] items-start justify-center pt-28">
                {/* Lanyard straps */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-0 h-36 w-36 -translate-x-1/2"
                >
                  <span className="absolute left-[34px] top-0 h-36 w-[3px] origin-top -rotate-[11deg] rounded-full bg-gradient-to-b from-pink-200 via-pink-500 to-fuchsia-600 shadow-[0_0_14px_rgba(236,72,153,0.75)]" />

                  <span className="absolute right-[34px] top-0 h-36 w-[3px] origin-top rotate-[11deg] rounded-full bg-gradient-to-b from-pink-200 via-pink-500 to-fuchsia-600 shadow-[0_0_14px_rgba(236,72,153,0.75)]" />
                </div>

                <motion.div
                  className="relative origin-top"
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          rotate: [
                            -1.7,
                            1.7,
                            -1.7,
                          ],
                          y: [0, 4, 0],
                        }
                  }
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          rotate: 0,
                          y: -8,
                          scale: 1.025,
                        }
                  }
                >
                  {/* Lanyard clip */}
                  <div
                    className={`relative z-10 mx-auto -mb-1 flex h-9 w-14 items-center justify-center rounded-t-xl border border-pink-300/30 bg-surface-elevated ${
                      isDark
                        ? "shadow-[0_0_18px_rgba(236,72,153,0.35)]"
                        : "shadow-[0_8px_20px_rgba(219,39,119,0.18)]"
                    }`}
                  >
                    <span className="h-2 w-6 rounded-full bg-pink-400/50" />
                  </div>

                  {/* ID card */}
                  <div
                    className={`relative w-[250px] overflow-hidden rounded-[2rem] bg-gradient-to-br from-pink-300 via-fuchsia-500 to-purple-700 p-[1px] ${
                      isDark
                        ? "shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_35px_rgba(236,72,153,0.3)]"
                        : "shadow-[0_20px_60px_rgba(65,40,53,0.2),0_0_35px_rgba(236,72,153,0.2)]"
                    }`}
                  >
                    <div
  className={`overflow-hidden rounded-[calc(2rem-1px)] ${
    isDark ? "bg-[#101010]/95" : "bg-white"
  }`}
>
                      {/* Photo */}
                      <div className="relative aspect-[4/5] overflow-hidden">
                        <img
                          src="/images/amanda-profile.jpg"
                          alt="Amanda Pricillia"
                          className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-pink-500/10" />

                        <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/30 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/80 backdrop-blur-md">
                          Portfolio ’26
                        </span>
                      </div>

                      {/* Identity */}
                      <div className="relative p-5">
                        <div
                          aria-hidden="true"
                          className="absolute right-[-2rem] top-[-2rem] h-24 w-24 rounded-full bg-pink-500/20 blur-2xl"
                        />

                        <div className="relative">
                          <p className="font-display text-2xl italic text-text-primary">
                            Amanda Pricillia
                          </p>

                          <p
                            className={`mt-1 text-xs uppercase tracking-[0.15em] ${
                              isDark
                                ? "text-pink-200/70"
                                : "text-pink-700/75"
                            }`}
                          >
                            UI/UX Designer · Web
                            Developer
                          </p>

                          <div className="mt-5 flex items-center justify-between border-t border-stroke pt-4">
                            <span className="text-[10px] uppercase tracking-[0.2em] text-muted">
                              Designer × Developer
                            </span>

                            <span className="h-2 w-2 rounded-full bg-pink-400 shadow-[0_0_12px_rgba(244,114,182,1)]" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Personal description */}
              <div className="max-w-md">
                <span
                  className={`inline-flex rounded-full border border-pink-400/25 bg-pink-500/10 px-3 py-1.5 text-xs uppercase tracking-[0.18em] ${
                    isDark
                      ? "text-pink-100"
                      : "text-pink-700"
                  }`}
                >
                  A little about me
                </span>

                <p className="mt-6 text-xl leading-relaxed text-text-primary md:text-2xl">
                  I’m Amanda, a Software Engineering
                  Technology graduate working across UI/UX,
                  web development, and visual
                  communication.
                </p>

                <p className="mt-5 text-sm leading-7 text-text-secondary md:text-base">
                  I translate user needs and business
                  requirements into clear user flows,
                  responsive interfaces, and functional
                  digital products from research and
                  prototyping to front-end implementation
                  and website development.
                </p>

                {/* Skill chips */}
                <div className="mt-7 flex flex-wrap gap-2">
                  {SKILLS.map((skill) => (
                    <span
                      key={skill}
                      className={`rounded-full border border-stroke bg-surface-elevated px-3.5 py-2 text-xs text-muted transition-all duration-300 hover:border-pink-400/40 ${
                        isDark
                          ? "shadow-[0_8px_20px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)] hover:text-pink-100 hover:shadow-[0_10px_24px_rgba(0,0,0,0.55),0_0_18px_rgba(236,72,153,0.12),inset_0_1px_0_rgba(255,255,255,0.12)]"
                          : "shadow-[0_8px_20px_rgba(65,40,53,0.09),inset_0_1px_0_rgba(255,255,255,0.9)] hover:bg-pink-50 hover:text-pink-700 hover:shadow-[0_10px_24px_rgba(65,40,53,0.13),0_0_18px_rgba(236,72,153,0.1)]"
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        {/* Compact expertise cards */}
<div
  ref={cardsRef}
  className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 md:mt-14 xl:grid-cols-3"
>
  {EXPERTISE.map((item) => (
    <article
      key={item.number}
      className={`group relative overflow-hidden rounded-[1.35rem] border px-5 py-5 transition-all duration-500 hover:-translate-y-1 ${
        isDark
          ? "border-white/[0.12] bg-[#050505] shadow-[0_16px_40px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.07)] hover:border-pink-400/35 hover:shadow-[0_22px_55px_rgba(0,0,0,0.8),0_0_28px_rgba(236,72,153,0.13),inset_0_1px_0_rgba(255,255,255,0.1)]"
          : "border-black/[0.12] bg-white shadow-[0_16px_38px_rgba(0,0,0,0.1)] hover:border-pink-400/35 hover:shadow-[0_20px_48px_rgba(65,40,53,0.14),0_0_24px_rgba(236,72,153,0.1)]"
      }`}
    >
      {/* Neutral surface */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 ${
          isDark
            ? "bg-gradient-to-br from-white/[0.075] via-transparent to-black/75"
            : "bg-gradient-to-br from-white via-transparent to-black/[0.035]"
        }`}
      />

      {/* Pink hover glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-14 -top-14 h-36 w-36 rounded-full bg-pink-500/0 blur-[55px] transition-all duration-500 group-hover:bg-pink-500/15"
      />

      {/* Gloss reflection */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -left-[20%] -top-[80%] h-[150%] w-[70%] rotate-[22deg] bg-gradient-to-r from-transparent to-transparent blur-xl transition-transform duration-700 group-hover:translate-x-10 ${
          isDark ? "via-white/[0.045]" : "via-white/70"
        }`}
      />

      <div className="relative z-10 flex items-start gap-4">
        <span
          className={`shrink-0 font-display text-lg italic transition-colors duration-300 ${
            isDark
              ? "text-white/45 group-hover:text-pink-200"
              : "text-black/45 group-hover:text-pink-700"
          }`}
        >
          {item.number}
        </span>

        <div className="min-w-0">
          <h3 className="text-base font-medium tracking-tight text-text-primary">
            {item.title}
          </h3>

          <p className="mt-2 text-xs leading-5 text-muted transition-colors duration-300 group-hover:text-text-secondary">
            {item.description}
          </p>
        </div>
      </div>

      {/* Dot hanya pink saat hover */}
      <span className="absolute right-4 top-4 h-1.5 w-1.5 rounded-full bg-white/20 transition-all duration-300 group-hover:scale-125 group-hover:bg-pink-400 group-hover:shadow-[0_0_12px_rgba(244,114,182,0.9)]" />
    </article>
  ))}
</div>
        </div>
      </div>
    </section>
  );
}