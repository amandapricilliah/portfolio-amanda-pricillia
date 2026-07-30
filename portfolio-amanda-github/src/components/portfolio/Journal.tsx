import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BookOpenText,
  ClipboardCheck,
  FileText,
  GraduationCap,
  Network,
  PenLine,
} from "lucide-react";

import { useTheme } from "@/components/theme/ThemeProvider";

import type { LucideIcon } from "lucide-react";

const DOCUMENTS_DRIVE_URL =
  "https://drive.google.com/drive/folders/PASTE_FOLDER_ID_HERE";

type DocumentItem = {
  number: string;
  category: string;
  title: string;
  description: string;
  type: string;
  year: string;
  href: string;
  icon: LucideIcon;
};

const DOCUMENTS: DocumentItem[] = [
  {
  number: "01",
  category: "Academic Publication",
  title: "The Influence of Anime on Gen Z's Behavior and Social Interactions",
  description:
    "A quantitative study examining how anime consumption, fandom communities, imitation, and digital literacy influence the behavior and social interactions of Generation Z in Indonesia.",
  type: "Journal Article",
  year: "2024",
  href:
    "https://journal.formosapublisher.org/index.php/jsih/article/view/9600",
  icon: FileText,
},

  {
  number: "02",
  category: "Academic Publication",
  title:
    "Dampak Pemrosesan Citra pada Fitur Pencarian Font Berbasis Gambar di MyFonts dalam UI/UX",
  description:
    "A quantitative study examining the effectiveness of image processing in MyFonts' image-based font search feature, including its impact on search efficiency, accuracy, designer creativity, and user experience.",
  type: "Journal Article",
  year: "2024",
  href: "https://jurnal.kolibi.org/index.php/scientica/article/view/2383",
  icon: FileText,
},

  {
  number: "03",
  category: "UI/UX Case Study",
  title: "UI/UX Portfolio: FarmaGym Case Study",
  description:
    "A UI/UX case study documenting the design of FarmaGym, a mobile application that helps users plan exercise schedules, select workout types, set duration and repetitions, and receive workout reminders through the Design Thinking process.",
  type: "Medium Article",
  year: "2023",
  href:
    "https://medium.com/@pricilliaamanda916/ui-ux-portofolio-farmagym-case-study-6d4cdded0884",
  icon: FileText,
},

  {
  number: "04",
  category: "UI/UX Case Study",
  title: "Mini Project Portfolio: Agriculture",
  description:
    "A UI/UX case study documenting the design of a mobile agriculture application that helps users access local weather information, receive plant-care reminders, follow step-by-step planting guidance, and monitor their planting progress.",
  type: "Medium Article",
  year: "2023",
  href:
    "https://medium.com/@pricilliaamanda916/mini-project-portofolio-agriculture-df75be9c0f66",
  icon: FileText,
},

  {
  number: "05",
  category: "Usability Testing",
  title: "QA Testing Agriplant",
  description:
    "QA testing for Agriplant mobile and desktop platforms across end-user and admin workflows.",
  type: "Google Drive Folder",
  year: "2024",
  href:
    "https://drive.google.com/drive/folders/1mWOjhBTGo4CRsenphwpLFtZKnyFcugTL",
  icon: FileText,
},
  {
  number: "06",
  category: "Usability testing",
  title: "QA Testing FarmaGym",
  description:
    "A fitness app that helps users plan workouts, set reminders, and track exercise activities.",
  type: "Google Docs",
  year: "2023",
  href:
    "https://docs.google.com/document/d/1bY3WSvVhcoGwnoeistZHhuDnG3QnYZRIbOx6bFVLRC8/edit?usp=sharing",
  icon: FileText,
},
];

export function Journal() {
  const { isDark } = useTheme();

  return (
    <section
      id="journal"
      className="relative overflow-clip bg-bg pb-24 pt-4 md:pb-32 md:pt-8"
    >
      {/* Ambient glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-52 top-[15%] h-[34rem] w-[34rem] rounded-full bg-fuchsia-500/[0.07] blur-[150px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-52 bottom-[5%] h-[36rem] w-[36rem] rounded-full bg-pink-500/[0.08] blur-[160px]"
      />

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        {/* Section header */}
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
          className="mb-12 md:mb-16"
        >
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-stroke" />

            <span className="text-xs uppercase tracking-[0.3em] text-muted">
              Documentation & Insights
            </span>

            <span className="h-px flex-1 bg-gradient-to-r from-pink-400/70 to-transparent" />
          </div>

          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <h2 className="text-5xl leading-[0.95] tracking-[-0.045em] text-text-primary sm:text-6xl md:text-7xl">
                Thinking made
                <br />

                <span
                  className={`font-display italic ${
                    isDark
                      ? "text-pink-200"
                      : "text-pink-600"
                  }`}
                >
                  visible.
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-sm leading-7 text-text-secondary md:text-base">
                A curated collection of research, testing
                reports, project documentation, and written
                work that reveals the process behind each
                solution.
              </p>
            </div>

            {/* View all button */}
            <div className="md:col-span-4 md:flex md:justify-end">
              <a
                href={DOCUMENTS_DRIVE_URL}
                target="_blank"
                rel="noreferrer"
                className="group relative inline-flex rounded-full px-6 py-3.5 text-sm transition duration-300 hover:-translate-y-1"
              >
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-500 shadow-[0_0_18px_rgba(236,72,153,0.5),0_0_40px_rgba(236,72,153,0.22)] transition-all duration-300 group-hover:shadow-[0_0_25px_rgba(236,72,153,0.9),0_0_55px_rgba(236,72,153,0.45)]" />

                <span className="absolute inset-[1px] rounded-full bg-gradient-to-br from-pink-500 via-fuchsia-600 to-rose-600" />

                <span className="relative z-10 flex items-center gap-2 font-medium text-white">
                  View All Documents
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Document archive */}
        <div className="flex flex-col gap-4">
          {DOCUMENTS.map((document, index) => {
            const Icon = document.icon;

            return (
              <motion.a
                key={document.number}
                href={document.href}
                target={
                  document.href === "#"
                    ? undefined
                    : "_blank"
                }
                rel={
                  document.href === "#"
                    ? undefined
                    : "noreferrer"
                }
                initial={{
                  opacity: 0,
                  y: 35,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                whileHover={{
                  x: 6,
                }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                className={`group relative overflow-hidden rounded-[1.75rem] border border-stroke bg-surface p-5 transition-all duration-500 hover:border-pink-400/35 md:p-6 ${
                  isDark
                    ? "shadow-[0_18px_55px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.09)] hover:shadow-[0_22px_70px_rgba(0,0,0,0.65),0_0_35px_rgba(236,72,153,0.1),inset_0_1px_0_rgba(255,255,255,0.12)]"
                    : "shadow-[0_18px_55px_rgba(65,40,53,0.11),inset_0_1px_0_rgba(255,255,255,0.95)] hover:shadow-[0_22px_70px_rgba(65,40,53,0.17),0_0_35px_rgba(236,72,153,0.12),inset_0_1px_0_rgba(255,255,255,1)]"
                }`}
              >
                {/* Glossy surface */}
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-0 ${
                    isDark
                      ? "bg-gradient-to-br from-white/[0.07] via-transparent to-black/70"
                      : "bg-gradient-to-br from-white/85 via-transparent to-pink-100/25"
                  }`}
                />

                {/* Animated reflection */}
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute -left-[25%] -top-[150%] h-[300%] w-[40%] rotate-[25deg] bg-gradient-to-r from-transparent to-transparent blur-2xl transition-transform duration-1000 group-hover:translate-x-40 ${
                    isDark
                      ? "via-white/[0.055]"
                      : "via-white/60"
                  }`}
                />

                {/* Pink hover glow */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-pink-500/0 blur-[75px] transition duration-700 group-hover:bg-pink-500/[0.13]"
                />

                {/* Top highlight */}
                <div
                  aria-hidden="true"
                  className={`absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent to-transparent ${
                    isDark
                      ? "via-white/30"
                      : "via-white"
                  }`}
                />

                <div className="relative z-10 grid gap-5 md:grid-cols-[72px_minmax(0,1fr)_auto] md:items-center md:gap-7">
                  {/* Icon */}
                  <div
                    className={`flex h-[68px] w-[68px] items-center justify-center rounded-2xl border border-stroke bg-surface-elevated ${
                      isDark
                        ? "shadow-[0_14px_35px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)]"
                        : "shadow-[0_14px_35px_rgba(65,40,53,0.1),inset_0_1px_0_rgba(255,255,255,0.95)]"
                    }`}
                  >
                    <Icon
                      className={`h-6 w-6 ${
                        isDark
                          ? "text-pink-300"
                          : "text-pink-600"
                      }`}
                    />
                  </div>

                  {/* Main information */}
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <span
                        className={`font-display text-lg italic ${
                          isDark
                            ? "text-pink-200/70"
                            : "text-pink-700/75"
                        }`}
                      >
                        {document.number}
                      </span>

                      <span className="h-px w-7 bg-stroke" />

                      <span
                        className={`text-[10px] uppercase tracking-[0.18em] ${
                          isDark
                            ? "text-pink-200/60"
                            : "text-pink-700/70"
                        }`}
                      >
                        {document.category}
                      </span>
                    </div>

                    <h3 className="mt-3 text-xl font-medium tracking-tight text-text-primary md:text-2xl">
                      {document.title}
                    </h3>

                    <p className="mt-3 max-w-2xl text-sm leading-6 text-muted transition-colors duration-300 group-hover:text-text-secondary">
                      {document.description}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full border border-stroke bg-surface-elevated px-3 py-1.5 text-[10px] text-muted ${
                          isDark
                            ? "shadow-[inset_0_1px_0_rgba(255,255,255,0.07)]"
                            : "shadow-[0_5px_14px_rgba(65,40,53,0.06),inset_0_1px_0_rgba(255,255,255,0.9)]"
                        }`}
                      >
                        {document.type}
                      </span>

                      <span
                        className={`rounded-full border border-stroke bg-surface-elevated px-3 py-1.5 text-[10px] text-muted ${
                          isDark
                            ? "shadow-[inset_0_1px_0_rgba(255,255,255,0.07)]"
                            : "shadow-[0_5px_14px_rgba(65,40,53,0.06),inset_0_1px_0_rgba(255,255,255,0.9)]"
                        }`}
                      >
                        {document.year}
                      </span>
                    </div>
                  </div>

                  {/* View action */}
                  <div className="flex items-center justify-between gap-4 border-t border-stroke pt-4 md:block md:border-0 md:pt-0">
                    <span className="text-xs uppercase tracking-[0.16em] text-muted md:hidden">
                      Open document
                    </span>

                    <span
                      className={`flex h-12 w-12 items-center justify-center rounded-full border border-stroke bg-surface-elevated text-muted transition-all duration-300 group-hover:border-pink-300/50 group-hover:bg-pink-500 group-hover:text-white group-hover:shadow-[0_0_22px_rgba(236,72,153,0.6)] ${
                        isDark
                          ? "shadow-[0_10px_26px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.09)]"
                          : "shadow-[0_10px_26px_rgba(65,40,53,0.1),inset_0_1px_0_rgba(255,255,255,0.95)]"
                      }`}
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}