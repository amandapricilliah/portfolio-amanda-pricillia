import { motion } from "framer-motion";
import {
  BookOpen,
  CalendarDays,
  GraduationCap,
  MapPin,
} from "lucide-react";

import { useTheme } from "@/components/theme/ThemeProvider";
import { useLanguage } from "./LanguageProvider";
import type { Bilingual } from "./LanguageProvider";

const COURSES: Bilingual[] = [
  { en: "Web Design", id: "Desain Web" },
  { en: "Mobile Programming", id: "Pemrograman Mobile" },
  { en: "Database", id: "Basis Data" },
  { en: "Data Analysis and Visualization", id: "Analisis dan Visualisasi Data" },
  { en: "Information System Analysis", id: "Analisis Sistem Informasi" },
  { en: "Interactive Multimedia", id: "Multimedia Interaktif" },
  { en: "Image Processing", id: "Pengolahan Citra" },
  { en: "Object-Oriented Programming", id: "Pemrograman Berorientasi Objek" },
];

type AcademicProject = {
  title: string;
  role: Bilingual;
  period: string;
  description: Bilingual;
  shortName: string;
  logo: string;
};

const ACADEMIC_PROJECTS: AcademicProject[] = [
  {
    title: "UNESCO",
    role: { en: "Creative Designer", id: "Desainer Kreatif" },
    period: "Jan 2022 — Jun 2022",
    description: {
      en: "Created the visual identity and branding assets for Wanuarejo Village to support tourism and local cultural promotion.",
      id: "Membuat identitas visual dan materi branding Desa Wanuarejo untuk mendukung promosi pariwisata dan budaya lokal.",
    },
    shortName: "UNESCO",
    logo: "/images/unesco.png",
  },
  {
    title: "LB LIA English Course",
    role: { en: "Motion Graphic & Visual Designer", id: "Motion Graphic & Desainer Visual" },
    period: "Jan 2023 — Jul 2023",
    description: {
      en: "Produced promotional videos, storyboards, and motion graphics for engaging digital education content.",
      id: "Memproduksi video promosi, storyboard, dan motion graphic untuk konten pendidikan digital yang menarik.",
    },
    shortName: "LIA",
    logo: "/images/lia.png",
  },
  {
    title: "Medical Team IPB",
    role: { en: "Visual Designer", id: "Desainer Visual" },
    period: "Aug 2021 — May 2022",
    description: {
      en: "Designed social media content, event banners, and visual assets to maintain consistent organizational branding.",
      id: "Merancang konten media sosial, banner acara, dan aset visual untuk menjaga konsistensi identitas organisasi.",
    },
    shortName: "MT IPB",
    logo: "/images/medical-team-ipb.png",
  },
  {
    title: "Alterra Academy",
    role: { en: "Professional UI/UX Designer", id: "UI/UX Designer Profesional" },
    period: "Aug 2023 — Dec 2023",
    description: {
      en: "Learned end-to-end UI/UX design through research, wireframing, prototyping, usability testing, and capstone projects.",
      id: "Mempelajari proses UI/UX secara menyeluruh melalui riset, wireframing, prototyping, usability testing, dan proyek capstone.",
    },
    shortName: "ALTERRA",
    logo: "/images/alterra.png",
  },
];

export function Education() {
  const { isDark } = useTheme();
  const { copy } = useLanguage();

  return (
    <section
      id="education"
      className="relative overflow-hidden bg-bg pb-24 pt-2 md:pb-32 md:pt-4"
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="homepage-ambient pointer-events-none absolute -left-40 top-32 h-[30rem] w-[30rem] rounded-full bg-fuchsia-500/[0.08] blur-[140px]"
      />

      <div
        aria-hidden="true"
        className="homepage-ambient pointer-events-none absolute -right-48 bottom-10 h-[32rem] w-[32rem] rounded-full bg-pink-500/[0.07] blur-[150px]"
      />

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        {/* Section heading */}
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
          className="mb-10 md:mb-12"
        >
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-stroke" />

            <span className="text-xs uppercase tracking-[0.3em] text-muted">
              {copy({ en: "Education", id: "Pendidikan" })}
            </span>

            <span className="h-px flex-1 bg-gradient-to-r from-pink-400/70 to-transparent" />
          </div>

          <div className="grid gap-6 md:grid-cols-12 md:items-end">
            <h2 className="text-5xl leading-[0.95] tracking-[-0.04em] text-text-primary sm:text-6xl md:col-span-8 md:text-7xl">
              {copy({ en: "Learning that shaped", id: "Pembelajaran yang membentuk" })}
              <br />
              {copy({ en: "my", id: "cara saya" })}{" "}
              <span
                className={`font-display italic ${
                  isDark
                    ? "text-pink-200"
                    : "text-pink-600"
                }`}
              >
                {copy({ en: "practice.", id: "berkarya." })}
              </span>
            </h2>

            <p className="max-w-md text-sm leading-7 text-text-secondary md:col-span-4 md:text-base">
              {copy({
                en: "A foundation in software engineering combined with hands-on experience in design, development, visual communication, and collaborative projects.",
                id: "Fondasi rekayasa perangkat lunak yang dipadukan dengan pengalaman langsung dalam desain, pengembangan, komunikasi visual, dan proyek kolaboratif.",
              })}
            </p>
          </div>
        </motion.div>

        {/* Main education card */}
        <motion.article
          initial={{
            opacity: 0,
            y: 45,
            scale: 0.985,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.85,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          className={`group relative overflow-hidden rounded-[1.75rem] border border-stroke bg-surface p-5 transition-all duration-500 md:p-6 ${
            isDark
              ? "shadow-[0_22px_70px_rgba(0,0,0,0.58),inset_0_1px_0_rgba(255,255,255,0.1)]"
              : "shadow-[0_22px_70px_rgba(65,40,53,0.13),inset_0_1px_0_rgba(255,255,255,0.95)]"
          }`}
        >
          {/* Glossy surface */}
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 ${
              isDark
                ? "bg-gradient-to-br from-white/[0.075] via-transparent to-black/75"
                : "bg-gradient-to-br from-white/85 via-transparent to-pink-100/25"
            }`}
          />

          {/* Moving reflection */}
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute -left-[15%] -top-[100%] h-[180%] w-[50%] rotate-[22deg] bg-gradient-to-r from-transparent to-transparent blur-2xl transition-transform duration-1000 group-hover:translate-x-20 ${
              isDark
                ? "via-white/[0.055]"
                : "via-white/55"
            }`}
          />

          {/* Pink glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-28 -top-28 h-64 w-64 rounded-full bg-pink-500/[0.08] blur-[75px] transition duration-700 group-hover:bg-pink-500/[0.13]"
          />

          <div className="relative grid gap-5 lg:grid-cols-[112px_minmax(0,1fr)_auto] lg:items-start lg:gap-6">
            {/* University logo */}
            <div
              className={`flex h-[104px] w-[104px] items-center justify-center overflow-hidden rounded-[1.4rem] border border-stroke bg-white p-3 ${
                isDark
                  ? "shadow-[0_16px_35px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)]"
                  : "shadow-[0_16px_35px_rgba(65,40,53,0.14),inset_0_1px_0_rgba(255,255,255,0.95)]"
              }`}
            >
              <img
                src="/images/ipb.png"
                alt="IPB University logo"
                className="h-full w-full object-contain"
              />
            </div>

            {/* Education information */}
            <div>
              <span
                className={`inline-flex rounded-full border border-pink-400/25 bg-pink-500/10 px-3 py-1 text-[9px] uppercase tracking-[0.18em] ${
                  isDark
                    ? "text-pink-100"
                    : "text-pink-700"
                }`}
              >
                {copy({ en: "Formal Education", id: "Pendidikan Formal" })}
              </span>

              <h3 className="mt-3 text-2xl font-medium tracking-tight text-text-primary md:text-3xl">
                Institut Pertanian Bogor
              </h3>

              <div className="mt-3 space-y-2">
                <div className="flex items-start gap-2.5 text-text-secondary">
                  <GraduationCap
                    className={`mt-0.5 h-4 w-4 shrink-0 ${
                      isDark
                        ? "text-pink-300"
                        : "text-pink-600"
                    }`}
                  />

                  <p className="text-sm md:text-base">
                    {copy({
                      en: "Diploma 4 — Software Engineering Technology",
                      id: "Diploma 4 — Teknologi Rekayasa Perangkat Lunak",
                    })}
                  </p>
                </div>

                <div className="flex items-center gap-2.5 text-sm text-muted">
                  <MapPin
                    className={`h-4 w-4 shrink-0 ${
                      isDark
                        ? "text-pink-300"
                        : "text-pink-600"
                    }`}
                  />

                  <p>Bogor, Indonesia</p>
                </div>
              </div>

              {/* Course chips */}
              <div className="mt-5">
                <div className="mb-3 flex items-center gap-2">
                  <BookOpen
                    className={`h-3.5 w-3.5 ${
                      isDark
                        ? "text-pink-300"
                        : "text-pink-600"
                    }`}
                  />

                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted">
                    {copy({ en: "Relevant Coursework", id: "Mata Kuliah Relevan" })}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {COURSES.map((course) => (
                    <span
                      key={course.en}
                      className={`rounded-full border border-stroke bg-surface-elevated px-3 py-1.5 text-[10px] text-muted transition-all duration-300 hover:border-pink-400/40 ${
                        isDark
                          ? "shadow-[0_7px_18px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.07)] hover:text-pink-100 hover:shadow-[0_8px_22px_rgba(0,0,0,0.5),0_0_16px_rgba(236,72,153,0.1),inset_0_1px_0_rgba(255,255,255,0.1)]"
                          : "shadow-[0_7px_18px_rgba(65,40,53,0.08),inset_0_1px_0_rgba(255,255,255,0.9)] hover:text-pink-700 hover:shadow-[0_8px_22px_rgba(65,40,53,0.12),0_0_16px_rgba(236,72,153,0.1),inset_0_1px_0_rgba(255,255,255,0.95)]"
                      }`}
                    >
                      {copy(course)}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Date */}
            <div
              className={`inline-flex w-fit items-center gap-2.5 rounded-full border border-stroke bg-surface-elevated px-4 py-2.5 text-xs text-muted ${
                isDark
                  ? "shadow-[0_9px_26px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.09)]"
                  : "shadow-[0_9px_26px_rgba(65,40,53,0.09),inset_0_1px_0_rgba(255,255,255,0.95)]"
              }`}
            >
              <CalendarDays
                className={`h-3.5 w-3.5 ${
                  isDark
                    ? "text-pink-300"
                    : "text-pink-600"
                }`}
              />

              <span>Jul 2021 — Jul 2025</span>
            </div>
          </div>
        </motion.article>

        {/* Academic projects heading */}
        <motion.div
          initial={{
            opacity: 0,
            y: 35,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{
            once: true,
            margin: "-80px",
          }}
          className="mb-7 mt-14 flex items-center gap-4"
        >
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-2xl border border-stroke bg-surface-elevated ${
              isDark
                ? "shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
                : "shadow-[0_8px_22px_rgba(65,40,53,0.08),inset_0_1px_0_rgba(255,255,255,0.95)]"
            }`}
          >
            <BookOpen
              className={`h-5 w-5 ${
                isDark
                  ? "text-pink-300"
                  : "text-pink-600"
              }`}
            />
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.23em] text-muted">
              {copy({ en: "Selected learning experiences", id: "Pengalaman belajar terpilih" })}
            </p>

            <h3 className="mt-1 text-2xl font-medium text-text-primary md:text-3xl">
              {copy({ en: "Academic Projects", id: "Proyek Akademik" })}
            </h3>
          </div>
        </motion.div>

        {/* Academic project cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {ACADEMIC_PROJECTS.map(
            (project, index) => (
              <motion.article
                key={project.title}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                whileHover={{
                  y: -5,
                }}
                transition={{
                  duration: 0.72,
                  delay: index * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                className={`group relative overflow-hidden rounded-[1.65rem] border border-stroke bg-surface p-5 transition-all duration-500 hover:border-pink-400/35 md:p-6 ${
                  isDark
                    ? "shadow-[0_18px_50px_rgba(0,0,0,0.52),inset_0_1px_0_rgba(255,255,255,0.08)]"
                    : "shadow-[0_18px_50px_rgba(65,40,53,0.11),inset_0_1px_0_rgba(255,255,255,0.95)]"
                }`}
              >
                {/* Glossy surface */}
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-0 ${
                    isDark
                      ? "bg-gradient-to-br from-white/[0.065] via-transparent to-black/70"
                      : "bg-gradient-to-br from-white/80 via-transparent to-pink-100/25"
                  }`}
                />

                {/* Hover glow */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-pink-500/0 blur-[60px] transition duration-500 group-hover:bg-pink-500/[0.13]"
                />

                {/* Top highlight */}
                <div
                  aria-hidden="true"
                  className={`absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent to-transparent ${
                    isDark
                      ? "via-white/30"
                      : "via-white"
                  }`}
                />

                <div className="relative z-10 grid gap-5 sm:grid-cols-[88px_1fr]">
                  {/* Project logo */}
                  <div
                    className={`flex h-[88px] w-[88px] items-center justify-center rounded-[1.3rem] border border-stroke bg-white p-3 ${
                      isDark
                        ? "shadow-[0_12px_30px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.08)]"
                        : "shadow-[0_12px_30px_rgba(65,40,53,0.12),inset_0_1px_0_rgba(255,255,255,0.95)]"
                    }`}
                  >
                    <img
                      src={project.logo}
                      alt={`${project.title} logo`}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  {/* Project content */}
                  <div>
                    <h4 className="text-lg font-medium tracking-tight text-text-primary md:text-xl">
                      {project.title}
                    </h4>

                    <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-2 text-[11px] text-muted">
                      <span
                        className={
                          isDark
                            ? "text-pink-200/75"
                            : "text-pink-700/80"
                        }
                      >
                        {copy(project.role)}
                      </span>

                      <span className="inline-flex items-center gap-1.5">
                        <CalendarDays className="h-3.5 w-3.5" />
                        {project.period}
                      </span>
                    </div>

                    <p className="mt-4 text-sm leading-6 text-muted transition-colors duration-300 group-hover:text-text-secondary">
                      {copy(project.description)}
                    </p>
                  </div>
                </div>
              </motion.article>
            ),
          )}
        </div>
      </div>
    </section>
  );
}