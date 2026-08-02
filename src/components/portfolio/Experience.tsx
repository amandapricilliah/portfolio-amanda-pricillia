import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Briefcase,
  CalendarDays,
  MapPin,
  Sparkles,
} from "lucide-react";
import { useRef } from "react";

import { useTheme } from "@/components/theme/ThemeProvider";
import { useLanguage } from "./LanguageProvider";
import type { Bilingual } from "./LanguageProvider";

type ExperienceItem = {
  number: string;
  company: string;
  role: Bilingual;
  location: string;
  period: string;
  logo: string;
  logoBg?: string;
  summary: Bilingual;
  highlights: Bilingual[];
  tools: string[];
};

const EXPERIENCES: ExperienceItem[] = [
  {
    number: "01",
    company: "PT Resolusiweb Digital Media",
    role: { en: "UI/UX Designer & Web Developer", id: "UI/UX Designer & Web Developer" },
    location: "Tangerang, Indonesia",
    period: "Nov 2025 — Jun 2026",
    logo: "/images/resolusiweb.png",
    summary: {
      en: "Designed responsive websites and landing pages while developing and maintaining Laravel and WordPress-based digital products.",
      id: "Merancang website dan landing page responsif sekaligus mengembangkan serta memelihara produk digital berbasis Laravel dan WordPress.",
    },
    highlights: [
      { en: "Created wireframes, prototypes, and responsive website designs.", id: "Membuat wireframe, prototipe, dan desain website responsif." },
      { en: "Developed new Laravel features and resolved website issues.", id: "Mengembangkan fitur Laravel baru dan menyelesaikan kendala website." },
      { en: "Produced branding assets, promotional content, and documentation.", id: "Menghasilkan aset branding, konten promosi, dan dokumentasi." },
    ],
    tools: [
      "Figma",
      "Laravel",
      "WordPress",
      "Web Design",
    ],
  },
  {
    number: "02",
    company: "iNews Media Group",
    role: { en: "UI/UX Designer", id: "UI/UX Designer" },
    location: "Jakarta, Indonesia",
    period: "May 2024 — Dec 2024",
    logo: "/images/MNC_Media_2015.png",
    summary: {
      en: "Designed user-focused features for the iNews digital platform and contributed to front-end implementation for a short-form news experience.",
      id: "Merancang fitur yang berfokus pada pengguna untuk platform digital iNews serta berkontribusi pada implementasi front-end pengalaman berita video singkat.",
    },
    highlights: [
      { en: "Designed the User Complaint feature through user research.", id: "Merancang fitur User Complaint melalui riset pengguna." },
      { en: "Created user flows, wireframes, and prototypes for key features.", id: "Membuat user flow, wireframe, dan prototipe untuk fitur utama." },
      { en: "Developed the iNews Byte interface using CodeIgniter 3.", id: "Mengembangkan antarmuka iNews Byte menggunakan CodeIgniter 3." },
    ],
    tools: [
      "UI/UX Design",
      "User Research",
      "Figma",
      "CodeIgniter",
    ],
  },
  {
    number: "03",
    company: "PT Max Samasta Group",
    role: { en: "UI/UX Designer & Front-End Developer", id: "UI/UX Designer & Front-End Developer" },
    location: "Bogor, Indonesia",
    period: "Mar 2024 — May 2024",
    logo: "/images/Logo-baru-maxsamasta-putih.png",
    logoBg: "bg-[#090909]",
    summary: {
      en: "Designed and implemented a location and photo-based employee attendance platform with clear user and administrative flows.",
      id: "Merancang dan mengimplementasikan platform absensi karyawan berbasis lokasi dan foto dengan alur pengguna serta administrasi yang jelas.",
    },
    highlights: [
      { en: "Designed employee attendance interfaces and dashboard flows.", id: "Merancang antarmuka absensi karyawan dan alur dashboard." },
      { en: "Improved internal attendance data management and usability.", id: "Meningkatkan pengelolaan data absensi internal dan kemudahan penggunaan." },
      { en: "Implemented the front-end interface using CodeIgniter 3.", id: "Mengimplementasikan antarmuka front-end menggunakan CodeIgniter 3." },
    ],
    tools: [
      "UI Design",
      "Dashboard",
      "Front-End",
      "CodeIgniter",
    ],
  },
  {
    number: "04",
    company: "Crewnesia Foundation",
    role: { en: "Social Media Specialist", id: "Spesialis Media Sosial" },
    location: "Bogor, Indonesia",
    period: "Aug 2022 — Dec 2022",
    logo: "/images/crewnesia.png",
    summary: {
      en: "Developed social media content and visual strategies to strengthen digital communication and maintain brand consistency.",
      id: "Mengembangkan konten media sosial dan strategi visual untuk memperkuat komunikasi digital serta menjaga konsistensi merek.",
    },
    highlights: [
      { en: "Planned social media content based on digital trends.", id: "Merencanakan konten media sosial berdasarkan tren digital." },
      { en: "Created visual assets to improve audience interaction.", id: "Membuat aset visual untuk meningkatkan interaksi audiens." },
      { en: "Collaborated on digital campaigns and promotional materials.", id: "Berkolaborasi dalam kampanye digital dan materi promosi." },
    ],
    tools: [
      "Content Strategy",
      "Visual Design",
      "Branding",
      "Social Media",
    ],
  },
];

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const { isDark } = useTheme();
  const { copy } = useLanguage();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 75%", "end 75%"],
  });

  const timelineScale = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 1],
  );

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative overflow-clip bg-bg pb-24 pt-2 md:pb-32 md:pt-4"
    >
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="homepage-ambient pointer-events-none absolute -left-52 top-[20%] h-[34rem] w-[34rem] rounded-full bg-fuchsia-500/[0.07] blur-[150px]"
      />

      <div
        aria-hidden="true"
        className="homepage-ambient pointer-events-none absolute -right-52 bottom-[10%] h-[36rem] w-[36rem] rounded-full bg-pink-500/[0.08] blur-[160px]"
      />

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        {/* Section introduction */}
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{
            once: true,
            margin: "-100px",
          }}
          className="mb-14 md:mb-20"
        >
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-stroke" />

            <span className="text-xs uppercase tracking-[0.3em] text-muted">
              {copy({ en: "Professional Experience", id: "Pengalaman Profesional" })}
            </span>

            <span className="h-px flex-1 bg-gradient-to-r from-pink-400/70 to-transparent" />
          </div>

          <div className="grid gap-7 md:grid-cols-12 md:items-end">
            <h2 className="text-5xl leading-[0.95] tracking-[-0.045em] text-text-primary sm:text-6xl md:col-span-8 md:text-7xl">
              {copy({ en: "Where ideas became", id: "Ketika ide menjadi" })}
              <br />

              <span
                className={`font-display italic ${
                  isDark
                    ? "text-pink-200"
                    : "text-pink-600"
                }`}
              >
                {copy({ en: "real experiences.", id: "pengalaman nyata." })}
              </span>
            </h2>

            <p className="max-w-md text-sm leading-7 text-text-secondary md:col-span-4 md:text-base">
              {copy({
                en: "A collection of roles where I combined design, development, visual communication, and collaboration to solve practical digital challenges.",
                id: "Rangkaian pengalaman yang memadukan desain, pengembangan, komunikasi visual, dan kolaborasi untuk menyelesaikan tantangan digital yang nyata.",
              })}
            </p>
          </div>
        </motion.div>

        <div className="grid gap-14 lg:grid-cols-[0.38fr_0.62fr] lg:gap-20">
          {/* Sticky summary */}
          <div className="h-fit lg:sticky lg:top-28 lg:self-start">
            <motion.div
              initial={{
                opacity: 0,
                x: -35,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{
                once: true,
              }}
            >
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl border border-stroke bg-surface-elevated ${
                  isDark
                    ? "shadow-[0_18px_45px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.1)]"
                    : "shadow-[0_18px_45px_rgba(65,40,53,0.12),inset_0_1px_0_rgba(255,255,255,0.95)]"
                }`}
              >
                <Briefcase
                  className={`h-6 w-6 ${
                    isDark
                      ? "text-pink-300"
                      : "text-pink-600"
                  }`}
                />
              </div>

              <p
                className={`mt-8 text-xs uppercase tracking-[0.25em] ${
                  isDark
                    ? "text-pink-200/65"
                    : "text-pink-700/75"
                }`}
              >
                {copy({ en: "My journey", id: "Perjalanan saya" })}
              </p>

              <h3 className="mt-4 max-w-sm text-3xl font-medium leading-tight text-text-primary md:text-4xl">
                {copy({
                  en: "Designing, building, and learning through every role.",
                  id: "Merancang, membangun, dan belajar melalui setiap peran.",
                })}
              </h3>

              <p className="mt-6 max-w-sm text-sm leading-7 text-muted">
                {copy({
                  en: "Each experience shaped how I approach users, systems, visual details, and the process of turning requirements into functional outcomes.",
                  id: "Setiap pengalaman membentuk cara saya memahami pengguna, sistem, detail visual, dan proses menerjemahkan kebutuhan menjadi hasil yang fungsional.",
                })}
              </p>

              <div className="mt-8 flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-pink-400 shadow-[0_0_14px_rgba(244,114,182,1)]" />

                <span className="text-xs uppercase tracking-[0.2em] text-muted">
                  2022 — 2026
                </span>
              </div>
            </motion.div>
          </div>

          {/* Experience timeline */}
          <div className="relative">
            {/* Timeline base */}
            <div
              aria-hidden="true"
              className="absolute bottom-0 left-[15px] top-0 w-px bg-stroke md:left-[19px]"
            />

            {/* Animated timeline */}
            <motion.div
              aria-hidden="true"
              style={{
                scaleY: timelineScale,
                transformOrigin: "top",
              }}
              className="absolute bottom-0 left-[15px] top-0 w-px bg-gradient-to-b from-pink-300 via-fuchsia-500 to-pink-500/10 shadow-[0_0_14px_rgba(236,72,153,0.65)] md:left-[19px]"
            />

            <div className="space-y-8 md:space-y-10">
              {EXPERIENCES.map(
                (experience, index) => (
                  <motion.article
                    key={experience.company}
                    initial={{
                      opacity: 0,
                      y: 55,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    whileHover={{
                      y: -5,
                    }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    viewport={{
                      once: true,
                      amount: 0.15,
                    }}
                    className="group relative pl-12 md:pl-16"
                  >
                    {/* Timeline node */}
                    <div
                      className="absolute left-0 top-8 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-pink-400/45 bg-bg md:h-10 md:w-10"
                      style={{
                        boxShadow: isDark
                          ? "0 0 0 6px #050505, 0 0 18px rgba(236,72,153,0.28)"
                          : "0 0 0 6px #ffffff, 0 0 18px rgba(15,23,42,0.12)",
                      }}
                    >
                      <span className="h-2 w-2 rounded-full bg-pink-400 shadow-[0_0_12px_rgba(244,114,182,1)] transition-transform duration-300 group-hover:scale-150" />
                    </div>

                    {/* Glossy card */}
                    <div
                      className={`relative overflow-hidden rounded-[2rem] border border-stroke bg-surface p-6 transition-all duration-500 group-hover:border-pink-400/35 md:p-8 ${
                        isDark
                          ? "shadow-[0_22px_65px_rgba(0,0,0,0.58),inset_0_1px_0_rgba(255,255,255,0.09)] group-hover:shadow-[0_26px_75px_rgba(0,0,0,0.65),0_0_35px_rgba(236,72,153,0.1),inset_0_1px_0_rgba(255,255,255,0.12)]"
                          : "shadow-[0_22px_65px_rgba(65,40,53,0.12),inset_0_1px_0_rgba(255,255,255,0.95)] group-hover:shadow-[0_26px_75px_rgba(65,40,53,0.18),0_0_35px_rgba(236,72,153,0.12),inset_0_1px_0_rgba(255,255,255,1)]"
                      }`}
                    >
                      {/* Gloss overlay */}
                      <div
                        aria-hidden="true"
                        className={`pointer-events-none absolute inset-0 ${
                          isDark
                            ? "bg-gradient-to-br from-white/[0.075] via-transparent to-black/75"
                            : "bg-gradient-to-br from-white/80 via-transparent to-pink-100/25"
                        }`}
                      />

                      {/* Moving reflection */}
                      <div
                        aria-hidden="true"
                        className={`pointer-events-none absolute -left-[30%] -top-[75%] h-[160%] w-[65%] rotate-[24deg] bg-gradient-to-r from-transparent to-transparent blur-2xl transition-transform duration-1000 group-hover:translate-x-24 ${
                          isDark
                            ? "via-white/[0.055]"
                            : "via-white/55"
                        }`}
                      />

                      {/* Hover glow */}
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-pink-500/0 blur-[75px] transition duration-700 group-hover:bg-pink-500/[0.13]"
                      />

                      <div className="relative z-10">
                        {/* Card top */}
                        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                          {/* Logo dan informasi */}
                          <div className="flex items-start gap-5">
                            <div
                              className={`flex h-[76px] w-[76px] shrink-0 items-center justify-center overflow-hidden rounded-[1.35rem] border border-stroke p-2.5 ${
                                experience.logoBg ??
                                "bg-white"
                              } ${
                                isDark
                                  ? "shadow-[0_14px_35px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.18)]"
                                  : "shadow-[0_14px_35px_rgba(65,40,53,0.14),inset_0_1px_0_rgba(255,255,255,0.95)]"
                              }`}
                            >
                              <img
                                src={experience.logo}
                                alt={`${experience.company} logo`}
                                className="h-full w-full object-contain"
                              />
                            </div>

                            <div>
                              <div className="mb-2 flex items-center gap-3">
                                <span
                                  className={`font-display text-lg italic ${
                                    isDark
                                      ? "text-pink-200/75"
                                      : "text-pink-700/75"
                                  }`}
                                >
                                  {experience.number}
                                </span>

                                <span className="h-px w-8 bg-stroke" />
                              </div>

                              <h3 className="text-xl font-medium tracking-tight text-text-primary md:text-2xl">
                                {experience.company}
                              </h3>

                              <p
                                className={`mt-2 text-sm ${
                                  isDark
                                    ? "text-pink-200/75"
                                    : "text-pink-700/80"
                                }`}
                              >
                                {copy(experience.role)}
                              </p>
                            </div>
                          </div>

                          {/* Durasi dan lokasi */}
                          <div className="flex shrink-0 flex-col items-start gap-2 sm:items-end">
                            <div
                              className={`inline-flex w-max items-center gap-2 whitespace-nowrap rounded-full border border-stroke bg-surface-elevated px-4 py-2.5 text-xs text-muted ${
                                isDark
                                  ? "shadow-[0_8px_22px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.08)]"
                                  : "shadow-[0_8px_22px_rgba(65,40,53,0.09),inset_0_1px_0_rgba(255,255,255,0.9)]"
                              }`}
                            >
                              <CalendarDays
                                className={`h-3.5 w-3.5 shrink-0 ${
                                  isDark
                                    ? "text-pink-300"
                                    : "text-pink-600"
                                }`}
                              />

                              <span className="whitespace-nowrap">
                                {experience.period}
                              </span>
                            </div>

                            <div
                              className={`inline-flex w-max items-center gap-2 whitespace-nowrap rounded-full border border-stroke bg-surface-elevated px-4 py-2.5 text-xs text-muted ${
                                isDark
                                  ? "shadow-[0_8px_22px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.08)]"
                                  : "shadow-[0_8px_22px_rgba(65,40,53,0.09),inset_0_1px_0_rgba(255,255,255,0.9)]"
                              }`}
                            >
                              <MapPin
                                className={`h-3.5 w-3.5 shrink-0 ${
                                  isDark
                                    ? "text-pink-300"
                                    : "text-pink-600"
                                }`}
                              />

                              <span className="whitespace-nowrap">
                                {experience.location}
                              </span>
                            </div>
                          </div>
                        </div>

                        <p className="mt-6 text-base leading-7 text-text-secondary">
                          {copy(experience.summary)}
                        </p>

                        {/* Highlights */}
                        <div className="mt-7 space-y-3 border-t border-stroke pt-6">
                          {experience.highlights.map(
                            (highlight) => (
                              <div
                                key={highlight.en}
                                className="flex items-start gap-3 text-sm leading-6 text-muted transition-colors duration-300 group-hover:text-text-secondary"
                              >
                                <Sparkles
                                  className={`mt-1 h-3.5 w-3.5 shrink-0 ${
                                    isDark
                                      ? "text-pink-300/70"
                                      : "text-pink-600/75"
                                  }`}
                                />

                                <p>{copy(highlight)}</p>
                              </div>
                            ),
                          )}
                        </div>

                        {/* Tools */}
                        <div className="mt-7 flex flex-wrap gap-2">
                          {experience.tools.map(
                            (tool) => (
                              <span
                                key={tool}
                                className={`rounded-full border border-stroke bg-surface-elevated px-3.5 py-2 text-[11px] text-muted transition-all duration-300 hover:border-pink-400/40 ${
                                  isDark
                                    ? "shadow-[0_7px_18px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.07)] hover:text-pink-100"
                                    : "shadow-[0_7px_18px_rgba(65,40,53,0.08),inset_0_1px_0_rgba(255,255,255,0.9)] hover:text-pink-700"
                                }`}
                              >
                                {tool}
                              </span>
                            ),
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}