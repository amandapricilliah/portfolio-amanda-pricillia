import { motion } from "framer-motion";
import { ArrowUpRight, FileText } from "lucide-react";

import { useTheme } from "@/components/theme/ThemeProvider";
import { useLanguage } from "./LanguageProvider";
import type { Bilingual } from "./LanguageProvider";

const DOCUMENTS_DRIVE_URL =
  "https://drive.google.com/drive/folders/PASTE_FOLDER_ID_HERE";

type DocumentItem = {
  number: string;
  category: Bilingual;
  title: string;
  description: Bilingual;
  type: Bilingual;
  year: string;
  href: string;
};

const DOCUMENTS: DocumentItem[] = [
  {
    number: "01",
    category: { en: "Academic Publication", id: "Publikasi Akademik" },
    title: "The Influence of Anime on Gen Z's Behavior and Social Interactions",
    description: {
      en: "A quantitative study examining how anime consumption, fandom communities, imitation, and digital literacy influence the behavior and social interactions of Generation Z in Indonesia.",
      id: "Studi kuantitatif mengenai pengaruh konsumsi anime, komunitas fandom, imitasi, dan literasi digital terhadap perilaku serta interaksi sosial Generasi Z di Indonesia.",
    },
    type: { en: "Journal Article", id: "Artikel Jurnal" },
    year: "2024",
    href: "https://journal.formosapublisher.org/index.php/jsih/article/view/9600",
  },
  {
    number: "02",
    category: { en: "Academic Publication", id: "Publikasi Akademik" },
    title:
      "Dampak Pemrosesan Citra pada Fitur Pencarian Font Berbasis Gambar di MyFonts dalam UI/UX",
    description: {
      en: "A quantitative study examining the effectiveness of image processing in MyFonts' image-based font search feature, including its impact on search efficiency, accuracy, designer creativity, and user experience.",
      id: "Studi kuantitatif yang menguji efektivitas pengolahan citra pada fitur pencarian font berbasis gambar di MyFonts serta dampaknya terhadap efisiensi, akurasi, kreativitas desainer, dan pengalaman pengguna.",
    },
    type: { en: "Journal Article", id: "Artikel Jurnal" },
    year: "2024",
    href: "https://jurnal.kolibi.org/index.php/scientica/article/view/2383",
  },
  {
    number: "03",
    category: { en: "UI/UX Case Study", id: "Studi Kasus UI/UX" },
    title: "UI/UX Portfolio: FarmaGym Case Study",
    description: {
      en: "A UI/UX case study documenting the design of FarmaGym through the Design Thinking process, from workout planning and reminders to duration and repetition settings.",
      id: "Studi kasus UI/UX yang mendokumentasikan perancangan FarmaGym melalui proses Design Thinking, mulai dari perencanaan latihan dan pengingat hingga pengaturan durasi serta repetisi.",
    },
    type: { en: "Medium Article", id: "Artikel Medium" },
    year: "2023",
    href:
      "https://medium.com/@pricilliaamanda916/ui-ux-portofolio-farmagym-case-study-6d4cdded0884",
  },
  {
    number: "04",
    category: { en: "UI/UX Case Study", id: "Studi Kasus UI/UX" },
    title: "Mini Project Portfolio: Agriculture",
    description: {
      en: "A UI/UX case study for a mobile agriculture application covering local weather, plant-care reminders, planting guidance, and progress monitoring.",
      id: "Studi kasus UI/UX aplikasi pertanian mobile yang mencakup cuaca lokal, pengingat perawatan, panduan menanam, dan pemantauan progres.",
    },
    type: { en: "Medium Article", id: "Artikel Medium" },
    year: "2023",
    href:
      "https://medium.com/@pricilliaamanda916/mini-project-portofolio-agriculture-df75be9c0f66",
  },
  {
    number: "05",
    category: { en: "Usability Testing", id: "Pengujian Usability" },
    title: "QA Testing Agriplant",
    description: {
      en: "QA testing documentation for Agriplant mobile and desktop platforms across end-user and admin workflows.",
      id: "Dokumentasi QA testing Agriplant untuk platform mobile dan desktop pada alur pengguna serta admin.",
    },
    type: { en: "Google Drive Folder", id: "Folder Google Drive" },
    year: "2024",
    href:
      "https://drive.google.com/drive/folders/1mWOjhBTGo4CRsenphwpLFtZKnyFcugTL",
  },
  {
    number: "06",
    category: { en: "Usability Testing", id: "Pengujian Usability" },
    title: "QA Testing FarmaGym",
    description: {
      en: "Testing documentation for a fitness application that supports workout planning, reminders, and exercise activity tracking.",
      id: "Dokumentasi pengujian aplikasi kebugaran yang mendukung perencanaan latihan, pengingat, dan pelacakan aktivitas olahraga.",
    },
    type: { en: "Google Docs", id: "Google Docs" },
    year: "2023",
    href:
      "https://docs.google.com/document/d/1bY3WSvVhcoGwnoeistZHhuDnG3QnYZRIbOx6bFVLRC8/edit?usp=sharing",
  },
];

export function Journal() {
  const { isDark } = useTheme();
  const { copy } = useLanguage();

  return (
    <section
      id="journal"
      className="relative overflow-clip bg-bg pb-24 pt-4 md:pb-32 md:pt-8"
    >
      <div
        aria-hidden="true"
        className="homepage-ambient pointer-events-none absolute -left-52 top-[15%] h-[34rem] w-[34rem] rounded-full bg-fuchsia-500/[0.07] blur-[150px]"
      />
      <div
        aria-hidden="true"
        className="homepage-ambient pointer-events-none absolute -right-52 bottom-[5%] h-[36rem] w-[36rem] rounded-full bg-pink-500/[0.08] blur-[160px]"
      />

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-10 md:mb-12"
        >
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-stroke" />
            <span className="text-xs uppercase tracking-[0.3em] text-muted">
              {copy({
                en: "Documentation & Insights",
                id: "Dokumentasi & Insight",
              })}
            </span>
            <span className="h-px flex-1 bg-gradient-to-r from-pink-400/70 to-transparent" />
          </div>

          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <h2 className="text-5xl leading-[0.95] tracking-[-0.045em] text-text-primary sm:text-6xl md:text-7xl">
                {copy({ en: "Thinking made", id: "Proses berpikir yang" })}
                <br />
                <span
                  className={`font-display italic ${
                    isDark ? "text-pink-200" : "text-pink-600"
                  }`}
                >
                  {copy({ en: "visible.", id: "terlihat." })}
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-sm leading-7 text-text-secondary md:text-base">
                {copy({
                  en: "A curated archive of research, testing reports, project documentation, and written work that reveals the process behind each solution.",
                  id: "Arsip terkurasi berisi riset, laporan pengujian, dokumentasi proyek, dan tulisan yang memperlihatkan proses di balik setiap solusi.",
                })}
              </p>
            </div>

            <div className="md:col-span-4 md:flex md:justify-end">
              <a
                href={DOCUMENTS_DRIVE_URL}
                target="_blank"
                rel="noreferrer"
                className="group relative inline-flex rounded-full px-5 py-3 text-sm transition duration-300 hover:-translate-y-1"
              >
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-500 shadow-[0_0_18px_rgba(236,72,153,0.5),0_0_40px_rgba(236,72,153,0.22)] transition-all duration-300 group-hover:shadow-[0_0_25px_rgba(236,72,153,0.9),0_0_55px_rgba(236,72,153,0.45)]" />
                <span className="absolute inset-[1px] rounded-full bg-gradient-to-br from-pink-500 via-fuchsia-600 to-rose-600" />
                <span className="relative z-10 flex items-center gap-2 font-medium text-white">
                  {copy({ en: "View all", id: "Lihat semua" })}
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </a>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-3 md:grid-cols-2 md:gap-4">
          {DOCUMENTS.map((document, index) => (
            <motion.a
              key={document.number}
              href={document.href}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              transition={{
                duration: 0.62,
                delay: index * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true, amount: 0.18 }}
              className={`group relative min-h-[238px] overflow-hidden rounded-[1.45rem] border border-stroke bg-surface p-5 transition-all duration-500 hover:border-pink-400/35 ${
                isDark
                  ? "shadow-[0_16px_45px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)] hover:shadow-[0_20px_58px_rgba(0,0,0,0.62),0_0_28px_rgba(236,72,153,0.09),inset_0_1px_0_rgba(255,255,255,0.11)]"
                  : "shadow-[0_14px_38px_rgba(15,23,42,0.07),inset_0_1px_0_rgba(255,255,255,0.95)] hover:shadow-[0_18px_48px_rgba(15,23,42,0.1)]"
              }`}
            >
              <div
                aria-hidden="true"
                className={`pointer-events-none absolute inset-0 ${
                  isDark
                    ? "bg-gradient-to-br from-white/[0.07] via-transparent to-black/70"
                    : "bg-gradient-to-br from-white via-transparent to-black/[0.025]"
                }`}
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-pink-500/0 blur-[60px] transition duration-500 group-hover:bg-pink-500/[0.12]"
              />

              <div className="relative z-10 flex h-full flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-xl border border-stroke bg-surface-elevated ${
                        isDark
                          ? "shadow-[0_10px_24px_rgba(0,0,0,0.4)]"
                          : "shadow-[0_8px_18px_rgba(15,23,42,0.06)]"
                      }`}
                    >
                      <FileText
                        className={`h-4 w-4 ${
                          isDark ? "text-pink-300" : "text-pink-600"
                        }`}
                      />
                    </span>

                    <div>
                      <span
                        className={`font-display text-base italic ${
                          isDark ? "text-pink-200/70" : "text-pink-700/75"
                        }`}
                      >
                        {document.number}
                      </span>
                      <p className="mt-0.5 text-[9px] uppercase tracking-[0.16em] text-muted">
                        {copy(document.category)}
                      </p>
                    </div>
                  </div>

                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-stroke bg-surface-elevated text-muted transition group-hover:border-pink-300/50 group-hover:bg-pink-500 group-hover:text-white">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>

                <h3 className="mt-4 line-clamp-2 text-lg font-medium leading-snug tracking-tight text-text-primary md:text-xl">
                  {document.title}
                </h3>

                <p className="mt-3 line-clamp-3 text-xs leading-5 text-muted transition-colors duration-300 group-hover:text-text-secondary">
                  {copy(document.description)}
                </p>

                <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-stroke pt-4">
                  <span className="rounded-full border border-stroke bg-surface-elevated px-2.5 py-1 text-[9px] text-muted">
                    {copy(document.type)}
                  </span>
                  <span className="rounded-full border border-stroke bg-surface-elevated px-2.5 py-1 text-[9px] text-muted">
                    {document.year}
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
