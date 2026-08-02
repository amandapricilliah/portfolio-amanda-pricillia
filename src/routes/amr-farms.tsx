// AMR FARMS CASE STUDY — REVISED · EN/ID + EDITORIAL SYSTEM STORY
import { createFileRoute } from "@tanstack/react-router";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useTheme } from "@/components/theme/ThemeProvider";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  CircleDot,
  FileCheck2,
  ImageIcon,
  Layers3,
  LayoutDashboard,
  Maximize2,
  Search,
  Smartphone,
  TimerReset,
  Workflow,
  X,
} from "lucide-react";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";

export const Route = createFileRoute("/amr-farms")({
  component: AmrFarmsCaseStudy,
});

type Language = "en" | "id";
type Bilingual = { en: string; id: string };

type ProjectImage = {
  src: string;
  alt: string;
  label: Bilingual;
  category: "mobile" | "desktop" | "cover";
};

type ScreenStory = {
  image: ProjectImage;
  stage: Bilingual;
  intent: Bilingual;
  focus: Bilingual;
  transition: Bilingual;
};

type LightboxState = {
  images: ProjectImage[];
  index: number;
} | null;

const HERO_IMAGE: ProjectImage = {
  src: "/images/amr-farms/amr-farms-hero.png",
  alt: "AMR Farms mobile grocery application mockup",
  label: { en: "AMR Farms project cover", id: "Sampul proyek AMR Farms" },
  category: "cover",
};

const MOBILE_WIREFRAMES: ProjectImage[] = [
  {
    src: "/images/amr-farms/mobile/authentication.png",
    alt: "AMR Farms mobile authentication wireframe",
    label: { en: "Authentication", id: "Autentikasi" },
    category: "mobile",
  },
  {
    src: "/images/amr-farms/mobile/login-sign-up.png",
    alt: "AMR Farms mobile login and sign up wireframe",
    label: { en: "Login & Sign Up", id: "Masuk & Daftar" },
    category: "mobile",
  },
  {
    src: "/images/amr-farms/mobile/home.png",
    alt: "AMR Farms mobile home wireframe",
    label: { en: "Home", id: "Beranda" },
    category: "mobile",
  },
  {
    src: "/images/amr-farms/mobile/flash-sale-01.png",
    alt: "AMR Farms first flash sale wireframe",
    label: { en: "Flash Sale 01", id: "Flash Sale 01" },
    category: "mobile",
  },
  {
    src: "/images/amr-farms/mobile/flash-sale-02.png",
    alt: "AMR Farms second flash sale wireframe",
    label: { en: "Flash Sale 02", id: "Flash Sale 02" },
    category: "mobile",
  },
  {
    src: "/images/amr-farms/mobile/flash-sale-03.png",
    alt: "AMR Farms third flash sale wireframe",
    label: { en: "Flash Sale 03", id: "Flash Sale 03" },
    category: "mobile",
  },
];

const DESKTOP_WIREFRAMES: ProjectImage[] = [
  {
    src: "/images/amr-farms/desktop/admin-login.png",
    alt: "AMR Farms admin login wireframe",
    label: { en: "Admin Login", id: "Login Admin" },
    category: "desktop",
  },
  {
    src: "/images/amr-farms/desktop/report-period.png",
    alt: "AMR Farms report period wireframe",
    label: { en: "Report Period", id: "Periode Laporan" },
    category: "desktop",
  },
  {
    src: "/images/amr-farms/desktop/period-file.png",
    alt: "AMR Farms period file wireframe",
    label: { en: "Period File", id: "Berkas Periode" },
    category: "desktop",
  },
  {
    src: "/images/amr-farms/desktop/income-input.png",
    alt: "AMR Farms income data input wireframe",
    label: { en: "Income Data Input", id: "Input Data Pendapatan" },
    category: "desktop",
  },
  {
    src: "/images/amr-farms/desktop/category.png",
    alt: "AMR Farms category management wireframe",
    label: { en: "Category Management", id: "Manajemen Kategori" },
    category: "desktop",
  },
  {
    src: "/images/amr-farms/desktop/report-output.png",
    alt: "AMR Farms report output wireframe",
    label: { en: "Report Output", id: "Hasil Laporan" },
    category: "desktop",
  },
];

const MOBILE_STORIES: ScreenStory[] = [
  {
    image: MOBILE_WIREFRAMES[0],
    stage: { en: "Orient", id: "Orientasi" },
    intent: {
      en: "Introduce the product before asking for account action.",
      id: "Memperkenalkan produk sebelum meminta tindakan terkait akun.",
    },
    focus: {
      en: "Brand recognition, first-use confidence, and a clear route into authentication.",
      id: "Pengenalan merek, keyakinan saat pertama menggunakan, dan jalur yang jelas menuju autentikasi.",
    },
    transition: { en: "Continue to account access", id: "Lanjut ke akses akun" },
  },
  {
    image: MOBILE_WIREFRAMES[1],
    stage: { en: "Access", id: "Akses" },
    intent: {
      en: "Separate returning-user login from new-user registration.",
      id: "Memisahkan login pengguna lama dari pendaftaran pengguna baru.",
    },
    focus: {
      en: "Explicit account choices and a short path to the first usable screen.",
      id: "Pilihan akun yang tegas dan jalur singkat menuju layar utama.",
    },
    transition: { en: "Enter the shopping surface", id: "Masuk ke area belanja" },
  },
  {
    image: MOBILE_WIREFRAMES[2],
    stage: { en: "Discover", id: "Menemukan" },
    intent: {
      en: "Expose search, product categories, and promotional entry points from home.",
      id: "Menampilkan pencarian, kategori produk, dan akses promosi dari beranda.",
    },
    focus: {
      en: "Fast product scanning and a hierarchy that supports both browsing and deal discovery.",
      id: "Pemindaian produk yang cepat dan hierarki yang mendukung pencarian maupun penemuan promo.",
    },
    transition: { en: "Open a promotional collection", id: "Buka koleksi promosi" },
  },
  {
    image: MOBILE_WIREFRAMES[3],
    stage: { en: "Promote", id: "Promosi" },
    intent: {
      en: "Test the first hierarchy for a time-sensitive flash-sale experience.",
      id: "Menguji hierarki pertama untuk pengalaman flash sale yang dibatasi waktu.",
    },
    focus: {
      en: "Urgency, product visibility, and an understandable promotional structure.",
      id: "Urgensi, visibilitas produk, dan struktur promosi yang mudah dipahami.",
    },
    transition: { en: "Compare sale hierarchy", id: "Bandingkan hierarki promo" },
  },
  {
    image: MOBILE_WIREFRAMES[4],
    stage: { en: "Compare", id: "Membandingkan" },
    intent: {
      en: "Explore an alternative balance between campaign messaging and product density.",
      id: "Mengeksplorasi keseimbangan lain antara pesan kampanye dan kepadatan produk.",
    },
    focus: {
      en: "Scanning efficiency without losing the limited-time character of the campaign.",
      id: "Efisiensi pemindaian tanpa menghilangkan karakter promo berbatas waktu.",
    },
    transition: { en: "Refine the sale layout", id: "Sempurnakan tata letak promo" },
  },
  {
    image: MOBILE_WIREFRAMES[5],
    stage: { en: "Refine", id: "Penyempurnaan" },
    intent: {
      en: "Complete the three-screen exploration of promotional hierarchy.",
      id: "Menyelesaikan eksplorasi tiga layar untuk hierarki promosi.",
    },
    focus: {
      en: "A clearer relationship between sale context, product information, and the next action.",
      id: "Hubungan yang lebih jelas antara konteks promo, informasi produk, dan tindakan berikutnya.",
    },
    transition: { en: "Return to product discovery", id: "Kembali ke penemuan produk" },
  },
];

const DESKTOP_STORIES: ScreenStory[] = [
  {
    image: DESKTOP_WIREFRAMES[0],
    stage: { en: "Secure", id: "Mengamankan" },
    intent: {
      en: "Create a dedicated entry point for administrative work.",
      id: "Membuat jalur masuk khusus untuk pekerjaan administratif.",
    },
    focus: {
      en: "Clear system identity and separation from the customer-facing experience.",
      id: "Identitas sistem yang jelas dan terpisah dari pengalaman pelanggan.",
    },
    transition: { en: "Open reporting workspace", id: "Buka ruang kerja laporan" },
  },
  {
    image: DESKTOP_WIREFRAMES[1],
    stage: { en: "Scope", id: "Menentukan cakupan" },
    intent: {
      en: "Let administrators define the period used for reporting work.",
      id: "Memungkinkan admin menentukan periode untuk pekerjaan pelaporan.",
    },
    focus: {
      en: "Time-based organization before files and financial data are handled.",
      id: "Pengorganisasian berbasis waktu sebelum berkas dan data keuangan dikelola.",
    },
    transition: { en: "Review period files", id: "Tinjau berkas periode" },
  },
  {
    image: DESKTOP_WIREFRAMES[2],
    stage: { en: "Organise", id: "Mengorganisasi" },
    intent: {
      en: "Keep supporting files connected to the selected reporting period.",
      id: "Menjaga berkas pendukung tetap terhubung dengan periode laporan terpilih.",
    },
    focus: {
      en: "Traceability and a predictable place for period-specific records.",
      id: "Ketertelusuran dan tempat yang konsisten untuk catatan berdasarkan periode.",
    },
    transition: { en: "Capture income data", id: "Catat data pendapatan" },
  },
  {
    image: DESKTOP_WIREFRAMES[3],
    stage: { en: "Record", id: "Mencatat" },
    intent: {
      en: "Provide a structured surface for entering income-related data.",
      id: "Menyediakan area terstruktur untuk memasukkan data pendapatan.",
    },
    focus: {
      en: "Input clarity, field grouping, and reducing ambiguity in financial records.",
      id: "Kejelasan input, pengelompokan kolom, dan pengurangan ambiguitas dalam catatan keuangan.",
    },
    transition: { en: "Maintain category structure", id: "Kelola struktur kategori" },
  },
  {
    image: DESKTOP_WIREFRAMES[4],
    stage: { en: "Classify", id: "Mengklasifikasi" },
    intent: {
      en: "Maintain the category structure used by the system.",
      id: "Memelihara struktur kategori yang digunakan sistem.",
    },
    focus: {
      en: "Consistent naming and manageable information architecture.",
      id: "Penamaan yang konsisten dan arsitektur informasi yang mudah dikelola.",
    },
    transition: { en: "Generate reporting output", id: "Hasilkan keluaran laporan" },
  },
  {
    image: DESKTOP_WIREFRAMES[5],
    stage: { en: "Output", id: "Keluaran" },
    intent: {
      en: "Turn the recorded period data into a readable report result.",
      id: "Mengubah data periode yang dicatat menjadi hasil laporan yang dapat dibaca.",
    },
    focus: {
      en: "A clear end state for the administrative workflow.",
      id: "Tahap akhir yang jelas untuk alur kerja administratif.",
    },
    transition: { en: "Review and iterate", id: "Tinjau dan iterasi" },
  },
];

const SECTIONS: { id: string; label: Bilingual }[] = [
  { id: "overview", label: { en: "System Thesis", id: "Tesis Sistem" } },
  { id: "mobile", label: { en: "Mobile Story", id: "Alur Mobile" } },
  { id: "desktop", label: { en: "Admin Story", id: "Alur Admin" } },
  { id: "validation", label: { en: "Next Validation", id: "Validasi Berikutnya" } },
  { id: "reflection", label: { en: "Reflection", id: "Refleksi" } },
];

function AmrFarmsCaseStudy() {
  const pageRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { isDark } = useTheme();

  const [language, setLanguage] = useState<Language>("en");
  const [activeSection, setActiveSection] = useState("overview");
  const [mobileIndex, setMobileIndex] = useState(0);
  const [desktopIndex, setDesktopIndex] = useState(0);
  const [lightbox, setLightbox] = useState<LightboxState>(null);

  const copy = (value: Bilingual) => value[language];

  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end end"],
  });

  const progressScale = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.25,
  });

  const activeMobile = MOBILE_STORIES[mobileIndex];
  const activeDesktop = DESKTOP_STORIES[desktopIndex];

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedLanguage = window.localStorage.getItem("amr-farms-language");
    if (storedLanguage === "en" || storedLanguage === "id") {
      setLanguage(storedLanguage);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("amr-farms-language", language);
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    const sections = SECTIONS.map(({ id }) => document.getElementById(id)).filter(
      (section): section is HTMLElement => Boolean(section),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry) setActiveSection(visibleEntry.target.id);
      },
      {
        rootMargin: "-28% 0px -58% 0px",
        threshold: [0.05, 0.2, 0.5],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!lightbox) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightbox(null);
      if (event.key === "ArrowLeft") moveLightbox("prev");
      if (event.key === "ArrowRight") moveLightbox("next");
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightbox]);

  const openGallery = (images: ProjectImage[], index = 0) => {
    setLightbox({ images, index });
  };

  const moveLightbox = (direction: "prev" | "next") => {
    setLightbox((current) => {
      if (!current) return current;
      const offset = direction === "next" ? 1 : -1;
      return {
        ...current,
        index: (current.index + offset + current.images.length) % current.images.length,
      };
    });
  };

  const moveIndex = (
    setter: Dispatch<SetStateAction<number>>,
    total: number,
    direction: "prev" | "next",
  ) => {
    const offset = direction === "next" ? 1 : -1;
    setter((current) => (current + offset + total) % total);
  };

  const lightboxPortal =
    typeof document !== "undefined"
      ? createPortal(
          <AnimatePresence>
            {lightbox && (
              <motion.div
                className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/92 p-4 backdrop-blur-xl md:p-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onMouseDown={(event) => {
                  if (event.target === event.currentTarget) setLightbox(null);
                }}
              >
                <motion.div
                  role="dialog"
                  aria-modal="true"
                  aria-label="AMR Farms project image preview"
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.98 }}
                  transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                  onMouseDown={(event) => event.stopPropagation()}
                  className="relative flex max-h-[92vh] w-full max-w-[1380px] flex-col overflow-hidden rounded-[1.8rem] border border-white/15 bg-[#071007] shadow-[0_35px_130px_rgba(0,0,0,0.9)]"
                >
                  <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 md:px-7">
                    <div className="min-w-0">
                      <p className="text-[9px] uppercase tracking-[0.3em] text-lime-200/50">
                        {language === "en" ? "Project visual" : "Visual proyek"}
                      </p>
                      <p className="mt-1 truncate text-sm text-white/80 md:text-base">
                        {copy(lightbox.images[lightbox.index].label)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setLightbox(null)}
                      aria-label="Close image preview"
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/[0.05] text-white/65 transition hover:rotate-90 hover:border-lime-300/45 hover:text-white"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="relative flex min-h-0 flex-1 items-center justify-center bg-black/55 p-3 md:p-6">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={lightbox.images[lightbox.index].src}
                        initial={{ opacity: 0, x: 18 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -18 }}
                        transition={{ duration: 0.28 }}
                        className="flex h-full w-full items-center justify-center"
                      >
                        <ImageWithFallback
                          image={lightbox.images[lightbox.index]}
                          className="max-h-[72vh] w-full object-contain"
                        />
                      </motion.div>
                    </AnimatePresence>

                    {lightbox.images.length > 1 && (
                      <>
                        <GalleryButton
                          label="Previous image"
                          position="left"
                          onClick={() => moveLightbox("prev")}
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </GalleryButton>
                        <GalleryButton
                          label="Next image"
                          position="right"
                          onClick={() => moveLightbox("next")}
                        >
                          <ChevronRight className="h-5 w-5" />
                        </GalleryButton>
                      </>
                    )}
                  </div>

                  <div className="flex items-center justify-between border-t border-white/10 px-5 py-4 md:px-7">
                    <span className="text-xs text-white/35">
                      {language === "en" ? "Press Esc to close" : "Tekan Esc untuk menutup"}
                    </span>
                    <span className="font-display text-lg italic text-lime-100/70">
                      {String(lightbox.index + 1).padStart(2, "0")}
                      <span className="mx-1.5 text-white/20">/</span>
                      {String(lightbox.images.length).padStart(2, "0")}
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )
      : null;

  return (
    <div
      ref={pageRef}
      className={`relative overflow-clip bg-bg text-text-primary ${
        isDark
          ? ""
          : "bg-white text-slate-950 [&_.text-muted]:text-slate-600 [&_.text-text-secondary]:text-slate-700 [&_.text-text-primary]:text-slate-950 [&_.border-stroke]:border-slate-200 [&_.bg-surface]:bg-white [&_.bg-surface-elevated]:bg-slate-50"
      }`}
    >
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progressScale }}
        className={`fixed inset-x-0 top-0 z-[90] h-[2px] origin-left ${
          isDark ? "bg-gradient-to-r from-lime-300 via-green-500 to-emerald-500" : "bg-emerald-950"
        }`}
      />

      <header className="fixed inset-x-0 top-0 z-[70] px-4 pt-4 md:px-7 md:pt-6">
        <div
          className={`mx-auto flex max-w-[1400px] items-center justify-between rounded-full border px-3 py-2 backdrop-blur-2xl md:px-4 ${
            isDark
              ? "border-white/10 bg-black/55 shadow-[0_16px_50px_rgba(0,0,0,0.42)]"
              : "border-white/75 bg-white/[0.68] shadow-[0_16px_45px_rgba(15,23,42,0.07)]"
          }`}
        >
          <a
            href="/#work"
            className="group inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs text-muted transition hover:bg-surface-elevated hover:text-text-primary"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            {language === "en" ? "Back to projects" : "Kembali ke proyek"}
          </a>

          <span className="hidden text-[9px] uppercase tracking-[0.28em] text-muted lg:block">
            AMR Farms · {language === "en" ? "Interface architecture" : "Arsitektur antarmuka"}
          </span>

          <div className="flex items-center gap-2">
            <div className={`flex items-center rounded-full border p-1 ${isDark ? "border-white/10 bg-white/[0.04]" : "border-slate-200 bg-white/70"}`}>
              {(["en", "id"] as Language[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setLanguage(item)}
                  className={`rounded-full px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.14em] transition ${
                    language === item
                      ? isDark
                        ? "bg-lime-300 text-black"
                        : "bg-emerald-950 text-white"
                      : "text-muted hover:text-text-primary"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <section className="relative flex min-h-[100svh] items-center overflow-hidden px-6 pb-20 pt-32 md:px-10 lg:px-16">
        <div
          className={`pointer-events-none absolute inset-0 ${isDark ? "opacity-100" : "opacity-0"}`}
          style={{
            background:
              "radial-gradient(circle at 78% 38%, rgba(132,204,22,0.22), transparent 34%), radial-gradient(circle at 18% 72%, rgba(34,197,94,0.12), transparent 30%)",
          }}
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage: isDark
              ? "linear-gradient(rgba(255,255,255,0.24) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.24) 1px, transparent 1px)"
              : "linear-gradient(rgba(15,23,42,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.12) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(circle at center, black, transparent 78%)",
            WebkitMaskImage: "radial-gradient(circle at center, black, transparent 78%)",
          }}
        />

        <div className="relative mx-auto grid w-full max-w-[1400px] items-center gap-14 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <Reveal>
              <div className="flex items-center gap-3">
                <span className={`h-px w-9 ${isDark ? "bg-lime-400" : "bg-emerald-950"}`} />
                <span className={`text-[10px] uppercase tracking-[0.34em] ${isDark ? "text-lime-400" : "text-emerald-950"}`}>
                  {language === "en" ? "Mobile commerce + admin reporting" : "Mobile commerce + pelaporan admin"}
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="mt-7 max-w-3xl text-[clamp(3.8rem,8vw,7rem)] leading-[0.86] tracking-[-0.065em] text-text-primary">
                AMR
                <span className={`block font-display italic ${isDark ? "text-lime-300" : "text-emerald-950"}`}>
                  Farms.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-7 max-w-xl text-base leading-8 text-text-secondary md:text-lg">
                {language === "en"
                  ? "A wireframe-led product concept connecting grocery discovery on mobile with period-based reporting on desktop."
                  : "Konsep produk berbasis wireframe yang menghubungkan penemuan produk grocery di mobile dengan pelaporan berbasis periode di desktop."}
              </p>
            </Reveal>

            <Reveal delay={0.22}>
              <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3 border-y border-stroke py-5 text-[10px] uppercase tracking-[0.17em] text-muted">
                <span>12 {language === "en" ? "wireframes" : "wireframe"}</span>
                <span className="h-1 w-1 rounded-full bg-current" />
                <span>2 {language === "en" ? "product surfaces" : "permukaan produk"}</span>
                <span className="h-1 w-1 rounded-full bg-current" />
                <span>{language === "en" ? "Architecture study" : "Studi arsitektur"}</span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.18}>
            <button
              type="button"
              onClick={() => openGallery([HERO_IMAGE])}
              aria-label="Open AMR Farms project cover"
              className={`group relative block w-full overflow-hidden rounded-[2.1rem] border p-2 ${
                isDark
                  ? "border-lime-300/25 bg-lime-500/10 shadow-[0_38px_100px_rgba(0,0,0,0.42)]"
                  : "border-slate-200 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.1)]"
              }`}
            >
              <div className="overflow-hidden rounded-[1.65rem] bg-black/5">
                <ImageWithFallback
                  image={HERO_IMAGE}
                  priority
                  className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-[1.015]"
                />
              </div>
              <span className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white/75 opacity-0 backdrop-blur-md transition group-hover:opacity-100">
                <Maximize2 className="h-4 w-4" />
              </span>
            </button>
          </Reveal>
        </div>
      </section>

      <div className="relative mx-auto grid max-w-[1400px] gap-12 px-6 md:px-10 lg:grid-cols-[210px_minmax(0,1fr)] lg:px-16">
        <aside className="hidden lg:block">
          <div className="sticky top-32 py-10">
            <p className="mb-5 text-[9px] uppercase tracking-[0.3em] text-muted">
              {language === "en" ? "Reading path" : "Alur baca"}
            </p>
            <nav className="space-y-1" aria-label="AMR Farms sections">
              {SECTIONS.map((section, index) => {
                const isActive = activeSection === section.id;
                return (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs transition ${
                      isActive
                        ? isDark
                          ? "bg-lime-500/12 text-lime-100"
                          : "bg-emerald-950 text-white"
                        : "text-muted hover:bg-surface-elevated hover:text-text-primary"
                    }`}
                  >
                    <span className={`font-display italic ${isActive ? (isDark ? "text-lime-300" : "text-white") : "text-muted"}`}>
                      {String(index).padStart(2, "0")}
                    </span>
                    <span>{copy(section.label)}</span>
                  </a>
                );
              })}
            </nav>
          </div>
        </aside>

        <main className="min-w-0">
          <section id="overview" className="scroll-mt-32 border-t border-stroke py-24 md:py-32">
            <Reveal>
              <SectionHeading
                number="00"
                eyebrow={{ en: "System thesis", id: "Tesis sistem" }}
                title={{
                  en: "The strongest idea is not a grocery screen—it is the relationship between customer discovery and operational reporting.",
                  id: "Gagasan terkuatnya bukan sekadar layar grocery, tetapi hubungan antara penemuan produk oleh pelanggan dan pelaporan operasional.",
                }}
                description={{
                  en: "No research or usability document was attached, so this reconstruction stays within the evidence available in the code: one cover and twelve wireframes. The page therefore focuses on interface architecture, screen intent, and the validation that should happen next.",
                  id: "Tidak ada dokumen riset atau usability yang dilampirkan, sehingga rekonstruksi ini tetap berada dalam bukti yang tersedia di kode: satu cover dan dua belas wireframe. Karena itu, halaman berfokus pada arsitektur antarmuka, tujuan layar, dan validasi yang perlu dilakukan berikutnya.",
                }}
                language={language}
                isDark={isDark}
              />
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-14 overflow-hidden border-y border-stroke">
                <div className="grid lg:grid-cols-[1fr_190px_1fr]">
                  <SystemColumn
                    icon={Smartphone}
                    eyebrow={{ en: "Customer surface", id: "Permukaan pelanggan" }}
                    title={{ en: "Discover and evaluate groceries", id: "Menemukan dan mengevaluasi produk" }}
                    items={[
                      { en: "Authentication and account entry", id: "Autentikasi dan akses akun" },
                      { en: "Home-based product discovery", id: "Penemuan produk dari beranda" },
                      { en: "Three flash-sale hierarchy explorations", id: "Tiga eksplorasi hierarki flash sale" },
                    ]}
                    language={language}
                    isDark={isDark}
                  />

                  <div className="relative flex min-h-[250px] items-center justify-center border-y border-stroke px-6 py-10 lg:border-x lg:border-y-0">
                    <motion.div
                      aria-hidden="true"
                      animate={prefersReducedMotion ? undefined : { rotate: [0, 360] }}
                      transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
                      className={`absolute h-24 w-24 rounded-full border border-dashed ${isDark ? "border-lime-300/30" : "border-emerald-950/25"}`}
                    />
                    <div className={`relative flex h-16 w-16 items-center justify-center rounded-full ${isDark ? "bg-lime-300 text-black" : "bg-emerald-950 text-white"}`}>
                      <Workflow className="h-6 w-6" />
                    </div>
                    <p className="absolute bottom-7 text-center text-[9px] uppercase tracking-[0.22em] text-muted">
                      {language === "en" ? "Conceptual system link" : "Hubungan sistem konseptual"}
                    </p>
                  </div>

                  <SystemColumn
                    icon={LayoutDashboard}
                    eyebrow={{ en: "Administrative surface", id: "Permukaan administratif" }}
                    title={{ en: "Structure and output business records", id: "Menata dan menghasilkan catatan bisnis" }}
                    items={[
                      { en: "Period-based reporting scope", id: "Cakupan laporan berbasis periode" },
                      { en: "Files, income data, and categories", id: "Berkas, data pendapatan, dan kategori" },
                      { en: "Readable report output", id: "Hasil laporan yang dapat dibaca" },
                    ]}
                    language={language}
                    isDark={isDark}
                  />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="mt-12 grid gap-8 border-b border-stroke pb-10 md:grid-cols-[190px_minmax(0,1fr)]">
                <p className={`text-[10px] uppercase tracking-[0.28em] ${isDark ? "text-lime-400" : "text-emerald-950"}`}>
                  {language === "en" ? "Design interpretation" : "Interpretasi desain"}
                </p>
                <p className="max-w-4xl text-lg leading-8 text-text-secondary md:text-xl md:leading-9">
                  {language === "en"
                    ? "The wireframes suggest a two-sided product: mobile creates the customer-facing commerce experience, while desktop gives the business a structured reporting workspace. The next design step is to prove how data moves between those surfaces."
                    : "Wireframe menunjukkan produk dua sisi: mobile membentuk pengalaman commerce untuk pelanggan, sedangkan desktop memberi bisnis ruang kerja pelaporan yang terstruktur. Langkah desain berikutnya adalah membuktikan bagaimana data bergerak di antara kedua permukaan tersebut."}
                </p>
              </div>
            </Reveal>
          </section>

          <section id="mobile" className="scroll-mt-32 border-t border-stroke py-24 md:py-32">
            <Reveal>
              <SectionHeading
                number="01"
                eyebrow={{ en: "Mobile story", id: "Alur mobile" }}
                title={{
                  en: "Six screens tell one compact story: orient, access, discover, and promote.",
                  id: "Enam layar membentuk satu cerita ringkas: orientasi, akses, penemuan, dan promosi.",
                }}
                description={{
                  en: "Instead of presenting every wireframe as a separate card, the experience is reconstructed as a selectable narrative. Each state explains what the screen is trying to accomplish and what should be tested next.",
                  id: "Alih-alih menampilkan setiap wireframe sebagai card terpisah, pengalaman disusun menjadi narasi yang dapat dipilih. Setiap state menjelaskan tujuan layar dan hal yang perlu diuji berikutnya.",
                }}
                language={language}
                isDark={isDark}
              />
            </Reveal>

            <div className="mt-12 grid gap-10 xl:grid-cols-[220px_minmax(280px,0.72fr)_minmax(0,1fr)] xl:items-start">
              <StorySelector
                stories={MOBILE_STORIES}
                activeIndex={mobileIndex}
                setActiveIndex={setMobileIndex}
                language={language}
                isDark={isDark}
              />

              <PhoneStage
                story={activeMobile}
                onOpen={() => openGallery(MOBILE_WIREFRAMES, mobileIndex)}
                onPrevious={() => moveIndex(setMobileIndex, MOBILE_STORIES.length, "prev")}
                onNext={() => moveIndex(setMobileIndex, MOBILE_STORIES.length, "next")}
                index={mobileIndex}
                total={MOBILE_STORIES.length}
                language={language}
                isDark={isDark}
              />

              <StoryDetail
                story={activeMobile}
                index={mobileIndex}
                total={MOBILE_STORIES.length}
                language={language}
                isDark={isDark}
                type="mobile"
              />
            </div>
          </section>

          <section id="desktop" className="scroll-mt-32 border-t border-stroke py-24 md:py-32">
            <Reveal>
              <SectionHeading
                number="02"
                eyebrow={{ en: "Administrative story", id: "Alur administratif" }}
                title={{
                  en: "The desktop flow becomes an operational spine, not a gallery of unrelated screens.",
                  id: "Alur desktop menjadi tulang punggung operasional, bukan galeri layar yang terpisah-pisah.",
                }}
                description={{
                  en: "The six frames form a sequence: secure access, define a reporting period, organise files, record income, maintain categories, and produce an output.",
                  id: "Enam frame membentuk urutan: akses aman, menentukan periode laporan, mengelola berkas, mencatat pendapatan, memelihara kategori, dan menghasilkan laporan.",
                }}
                language={language}
                isDark={isDark}
              />
            </Reveal>

            <div className="mt-12">
              <div className="relative overflow-x-auto border-y border-stroke py-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <div className="absolute left-8 right-8 top-10 hidden h-px bg-stroke md:block" />
                <div className="relative flex min-w-[760px] justify-between gap-3 md:min-w-0">
                  {DESKTOP_STORIES.map((story, index) => {
                    const isActive = desktopIndex === index;
                    return (
                      <button
                        key={story.image.src}
                        type="button"
                        onClick={() => setDesktopIndex(index)}
                        className="group flex min-w-[112px] flex-1 flex-col items-center text-center"
                      >
                        <span className={`relative z-10 flex h-11 w-11 items-center justify-center rounded-full border text-sm font-medium transition ${
                          isActive
                            ? isDark
                              ? "border-lime-300 bg-lime-300 text-black"
                              : "border-emerald-950 bg-emerald-950 text-white"
                            : "border-stroke bg-bg text-muted group-hover:border-current group-hover:text-text-primary"
                        }`}>
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className={`mt-4 text-xs ${isActive ? "text-text-primary" : "text-muted group-hover:text-text-primary"}`}>
                          {copy(story.stage)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-10 grid gap-10 xl:grid-cols-[minmax(0,1.35fr)_minmax(300px,0.65fr)] xl:items-start">
                <BrowserStage
                  story={activeDesktop}
                  onOpen={() => openGallery(DESKTOP_WIREFRAMES, desktopIndex)}
                  language={language}
                  isDark={isDark}
                />

                <StoryDetail
                  story={activeDesktop}
                  index={desktopIndex}
                  total={DESKTOP_STORIES.length}
                  language={language}
                  isDark={isDark}
                  type="desktop"
                />
              </div>
            </div>
          </section>

          <section id="validation" className="scroll-mt-32 border-t border-stroke py-24 md:py-32">
            <Reveal>
              <SectionHeading
                number="03"
                eyebrow={{ en: "Expert review", id: "Tinjauan lanjutan" }}
                title={{
                  en: "A credible case study should separate what is visible from what still needs evidence.",
                  id: "Case study yang kredibel perlu memisahkan hal yang terlihat dari hal yang masih membutuhkan bukti.",
                }}
                description={{
                  en: "The screens are enough to discuss structure and intent, but not enough to claim usability, market fit, or technical integration. These are the highest-value questions to validate next.",
                  id: "Layar yang tersedia cukup untuk membahas struktur dan tujuan, tetapi belum cukup untuk mengklaim usability, market fit, atau integrasi teknis. Berikut pertanyaan dengan nilai tertinggi untuk divalidasi selanjutnya.",
                }}
                language={language}
                isDark={isDark}
              />
            </Reveal>

            <div className="mt-12 border-y border-stroke">
              {[
                {
                  icon: Search,
                  number: "01",
                  question: {
                    en: "Can shoppers find the right grocery product without knowing the category name?",
                    id: "Apakah pengguna dapat menemukan produk grocery yang tepat tanpa mengetahui nama kategorinya?",
                  },
                  method: {
                    en: "Test search, category scanning, and home-page discovery with realistic shopping tasks.",
                    id: "Uji pencarian, pemindaian kategori, dan penemuan dari beranda menggunakan tugas belanja yang realistis.",
                  },
                },
                {
                  icon: TimerReset,
                  number: "02",
                  question: {
                    en: "Does the flash-sale hierarchy communicate time, value, and the next action clearly?",
                    id: "Apakah hierarki flash sale menjelaskan waktu, nilai promo, dan tindakan berikutnya secara jelas?",
                  },
                  method: {
                    en: "Compare the three promotional variants through comprehension and preference testing.",
                    id: "Bandingkan tiga variasi promosi melalui pengujian pemahaman dan preferensi.",
                  },
                },
                {
                  icon: FileCheck2,
                  number: "03",
                  question: {
                    en: "Do administrators understand the reporting terms and sequence without additional explanation?",
                    id: "Apakah admin memahami istilah dan urutan pelaporan tanpa penjelasan tambahan?",
                  },
                  method: {
                    en: "Run task-based validation from period creation to final report output.",
                    id: "Lakukan validasi berbasis tugas dari pembuatan periode sampai hasil laporan akhir.",
                  },
                },
                {
                  icon: Layers3,
                  number: "04",
                  question: {
                    en: "What information actually needs to move between mobile commerce and desktop reporting?",
                    id: "Informasi apa yang benar-benar perlu bergerak antara mobile commerce dan pelaporan desktop?",
                  },
                  method: {
                    en: "Define the shared data model before expanding the interface beyond wireframes.",
                    id: "Definisikan model data bersama sebelum mengembangkan antarmuka melampaui wireframe.",
                  },
                },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <Reveal key={item.number} delay={index * 0.06}>
                    <article className="grid gap-5 border-b border-stroke py-7 last:border-b-0 md:grid-cols-[70px_minmax(0,1.15fr)_minmax(260px,0.85fr)] md:gap-8">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-full border ${
                        isDark ? "border-lime-300/20 bg-lime-300/5 text-lime-300" : "border-emerald-950/15 bg-slate-50 text-emerald-950"
                      }`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className={`text-[10px] uppercase tracking-[0.24em] ${isDark ? "text-lime-400" : "text-emerald-950"}`}>
                          {language === "en" ? `Validation question ${item.number}` : `Pertanyaan validasi ${item.number}`}
                        </p>
                        <h3 className="mt-3 text-lg leading-7 text-text-primary md:text-xl">
                          {copy(item.question)}
                        </h3>
                      </div>
                      <div className="border-l border-stroke pl-5">
                        <p className="text-[9px] uppercase tracking-[0.23em] text-muted">
                          {language === "en" ? "Recommended method" : "Metode yang disarankan"}
                        </p>
                        <p className="mt-3 text-sm leading-7 text-muted">{copy(item.method)}</p>
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </section>

          <section id="reflection" className="scroll-mt-32 border-y border-stroke py-24 md:py-32">
            <div className={`overflow-hidden rounded-[2rem] border ${
              isDark ? "border-white/10 bg-[#0b100c]" : "border-slate-200 bg-white"
            }`}>
              <div className="grid gap-8 px-6 py-8 md:px-9 md:py-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-start lg:gap-14">
                <Reveal>
                  <div>
                    <p className={`text-[10px] uppercase tracking-[0.3em] ${isDark ? "text-lime-400" : "text-emerald-950"}`}>
                      04 · {language === "en" ? "Reflection" : "Refleksi"}
                    </p>
                    <h2 className="mt-5 max-w-2xl text-[clamp(2rem,3.8vw,3.25rem)] leading-[1.04] tracking-[-0.04em] text-text-primary">
                      {language === "en"
                        ? "Two interfaces only work when the system behind them is shared."
                        : "Dua antarmuka hanya bekerja ketika sistem di belakangnya saling terhubung."}
                    </h2>
                  </div>
                </Reveal>

                <Reveal delay={0.08}>
                  <div className="lg:border-l lg:border-stroke lg:pl-8">
                    <p className="text-sm leading-7 text-muted md:text-[15px]">
                      {language === "en"
                        ? "AMR Farms already establishes a customer surface and an operational surface. The stronger next step is to define the shared catalog, promotion rules, transaction data, and reporting logic before expanding visual detail."
                        : "AMR Farms sudah membentuk sisi pelanggan dan sisi operasional. Langkah berikutnya yang lebih kuat adalah mendefinisikan katalog bersama, aturan promosi, data transaksi, dan logika pelaporan sebelum memperluas detail visual."}
                    </p>
                  </div>
                </Reveal>
              </div>

              <div className="grid border-t border-stroke md:grid-cols-3">
                {[
                  {
                    icon: Smartphone,
                    number: "01",
                    title: {
                      en: "Keep the customer journey focused",
                      id: "Pertahankan perjalanan pelanggan tetap fokus",
                    },
                    text: {
                      en: "Product discovery, promotion, and checkout should feel like one continuous shopping flow.",
                      id: "Penemuan produk, promosi, dan checkout perlu terasa sebagai satu alur belanja yang berkelanjutan.",
                    },
                  },
                  {
                    icon: Layers3,
                    number: "02",
                    title: {
                      en: "Connect both surfaces through data",
                      id: "Hubungkan kedua sisi melalui data",
                    },
                    text: {
                      en: "Categories, prices, sale periods, income records, and reports need one consistent source of truth.",
                      id: "Kategori, harga, periode promo, catatan pendapatan, dan laporan memerlukan satu sumber data yang konsisten.",
                    },
                  },
                  {
                    icon: FileCheck2,
                    number: "03",
                    title: {
                      en: "Validate before adding detail",
                      id: "Validasi sebelum menambah detail",
                    },
                    text: {
                      en: "The next iteration should test findability, promotion clarity, and the reporting sequence with realistic tasks.",
                      id: "Iterasi berikutnya perlu menguji kemudahan menemukan fitur, kejelasan promosi, dan urutan pelaporan melalui tugas yang realistis.",
                    },
                  },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Reveal key={item.number} delay={index * 0.06}>
                      <div className="h-full border-b border-stroke px-6 py-7 last:border-b-0 md:border-b-0 md:border-r md:px-8 md:last:border-r-0">
                        <div className="flex items-center justify-between gap-4">
                          <span className={`flex h-10 w-10 items-center justify-center rounded-full border ${
                            isDark
                              ? "border-lime-300/20 bg-lime-300/5 text-lime-300"
                              : "border-emerald-950/15 bg-slate-50 text-emerald-950"
                          }`}>
                            <Icon className="h-4 w-4" />
                          </span>
                          <span className={`font-display text-lg italic ${isDark ? "text-lime-400" : "text-emerald-950"}`}>
                            {item.number}
                          </span>
                        </div>
                        <h3 className="mt-6 text-lg leading-7 text-text-primary">
                          {copy(item.title)}
                        </h3>
                        <p className="mt-3 text-sm leading-7 text-muted">
                          {copy(item.text)}
                        </p>
                      </div>
                    </Reveal>
                  );
                })}
              </div>

              <Reveal delay={0.18}>
                <div className="flex flex-col items-start justify-between gap-5 border-t border-stroke px-6 py-6 sm:flex-row sm:items-center md:px-9">
                  <p className="max-w-xl text-xs leading-6 text-muted md:text-sm">
                    {language === "en"
                      ? "The project becomes stronger when product decisions can be traced across customer and administrative workflows."
                      : "Proyek menjadi lebih kuat ketika keputusan produk dapat ditelusuri pada alur pelanggan dan administrasi."}
                  </p>
                  <a
                    href="/#work"
                    className={`group inline-flex items-center gap-3 rounded-full border px-5 py-3 text-sm transition ${
                      isDark
                        ? "border-lime-300/25 bg-lime-300/10 text-lime-300 hover:border-lime-300 hover:bg-lime-300 hover:text-black"
                        : "border-emerald-950 bg-emerald-950 text-white hover:bg-emerald-900"
                    }`}
                  >
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    {language === "en" ? "Back to selected projects" : "Kembali ke proyek pilihan"}
                  </a>
                </div>
              </Reveal>
            </div>
          </section>
        </main>
      </div>

      {lightboxPortal}
    </div>
  );
}

function SectionHeading({
  number,
  eyebrow,
  title,
  description,
  language,
  isDark,
}: {
  number: string;
  eyebrow: Bilingual;
  title: Bilingual;
  description: Bilingual;
  language: Language;
  isDark: boolean;
}) {
  return (
    <div className="max-w-5xl">
      <div className="flex items-center gap-3">
        <span className={`font-display text-xl italic ${isDark ? "text-lime-400" : "text-emerald-950"}`}>{number}</span>
        <span className={`h-px w-8 ${isDark ? "bg-lime-400/45" : "bg-emerald-950/35"}`} />
        <span className="text-[9px] uppercase tracking-[0.28em] text-muted">{eyebrow[language]}</span>
      </div>
      <h2 className="mt-6 text-[clamp(2rem,4vw,3.35rem)] leading-[1.04] tracking-[-0.043em] text-text-primary">
        {title[language]}
      </h2>
      <p className="mt-5 max-w-3xl text-sm leading-7 text-muted md:text-[15px]">
        {description[language]}
      </p>
    </div>
  );
}

function SystemColumn({
  icon: Icon,
  eyebrow,
  title,
  items,
  language,
  isDark,
}: {
  icon: typeof Smartphone;
  eyebrow: Bilingual;
  title: Bilingual;
  items: Bilingual[];
  language: Language;
  isDark: boolean;
}) {
  return (
    <div className="px-2 py-10 md:px-8 lg:px-9">
      <div className="flex items-center gap-4">
        <div className={`flex h-11 w-11 items-center justify-center rounded-full border ${
          isDark ? "border-lime-300/20 bg-lime-300/5 text-lime-300" : "border-emerald-950/15 bg-slate-50 text-emerald-950"
        }`}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className={`text-[9px] uppercase tracking-[0.26em] ${isDark ? "text-lime-400" : "text-emerald-950"}`}>
            {eyebrow[language]}
          </p>
          <h3 className="mt-2 text-xl tracking-[-0.025em] text-text-primary">{title[language]}</h3>
        </div>
      </div>
      <div className="mt-8 divide-y divide-stroke border-y border-stroke">
        {items.map((item, index) => (
          <div key={item.en} className="grid grid-cols-[30px_minmax(0,1fr)] gap-3 py-4">
            <span className={`font-display italic ${isDark ? "text-lime-400" : "text-emerald-950"}`}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="text-sm leading-6 text-muted">{item[language]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function StorySelector({
  stories,
  activeIndex,
  setActiveIndex,
  language,
  isDark,
}: {
  stories: ScreenStory[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  language: Language;
  isDark: boolean;
}) {
  return (
    <div className="space-y-2">
      {stories.map((story, index) => {
        const isActive = activeIndex === index;
        return (
          <button
            key={story.image.src}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`group grid w-full grid-cols-[38px_minmax(0,1fr)_auto] items-center gap-3 rounded-[1.35rem] border px-3 py-3.5 text-left transition ${
              isActive
                ? isDark
                  ? "border-lime-300/30 bg-lime-300/8 text-text-primary"
                  : "border-emerald-950/20 bg-slate-50 text-text-primary"
                : "border-transparent text-muted hover:border-stroke hover:bg-surface-elevated hover:text-text-primary"
            }`}
          >
            <span className={`flex h-9 w-9 items-center justify-center rounded-full border text-xs font-medium ${
              isActive
                ? isDark
                  ? "border-lime-300 bg-lime-300 text-black"
                  : "border-emerald-950 bg-emerald-950 text-white"
                : "border-stroke text-muted"
            }`}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-sm">{story.stage[language]}</span>
            <ArrowUpRight className={`h-4 w-4 transition ${isActive ? "opacity-100" : "opacity-25 group-hover:opacity-70"}`} />
          </button>
        );
      })}
    </div>
  );
}

function PhoneStage({
  story,
  onOpen,
  onPrevious,
  onNext,
  index,
  total,
  language,
  isDark,
}: {
  story: ScreenStory;
  onOpen: () => void;
  onPrevious: () => void;
  onNext: () => void;
  index: number;
  total: number;
  language: Language;
  isDark: boolean;
}) {
  return (
    <div className="relative mx-auto w-full max-w-[340px]">
      <div className={`absolute inset-x-8 top-12 h-[65%] rounded-full blur-[70px] ${isDark ? "bg-lime-400/12" : "bg-transparent"}`} />
      <button
        type="button"
        onClick={onOpen}
        className={`group relative block w-full overflow-hidden rounded-[2.6rem] border-[7px] p-2 text-left ${
          isDark ? "border-[#202522] bg-black" : "border-slate-900 bg-slate-950"
        }`}
      >
        <div className="mx-auto mb-2 h-5 w-24 rounded-full bg-black" />
        <div className="overflow-hidden rounded-[1.9rem] bg-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={story.image.src}
              initial={{ opacity: 0, x: 22 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -22 }}
              transition={{ duration: 0.3 }}
            >
              <ImageWithFallback image={story.image} className="aspect-[9/19] w-full object-contain" />
            </motion.div>
          </AnimatePresence>
        </div>
        <span className="absolute right-4 top-12 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white opacity-0 backdrop-blur-md transition group-hover:opacity-100">
          <Maximize2 className="h-4 w-4" />
        </span>
      </button>

      <div className="mt-5 flex items-center justify-center gap-3">
        <ControlButton label="Previous mobile screen" onClick={onPrevious} isDark={isDark}>
          <ChevronLeft className="h-4 w-4" />
        </ControlButton>
        <span className={`font-display text-lg italic ${isDark ? "text-lime-400" : "text-emerald-950"}`}>
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <ControlButton label="Next mobile screen" onClick={onNext} isDark={isDark}>
          <ChevronRight className="h-4 w-4" />
        </ControlButton>
      </div>
      <p className="mt-3 text-center text-[10px] uppercase tracking-[0.18em] text-muted">
        {language === "en" ? "Click the phone to enlarge" : "Klik ponsel untuk memperbesar"}
      </p>
    </div>
  );
}

function BrowserStage({
  story,
  onOpen,
  language,
  isDark,
}: {
  story: ScreenStory;
  onOpen: () => void;
  language: Language;
  isDark: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={`group block w-full overflow-hidden rounded-[1.8rem] border text-left ${
        isDark ? "border-white/10 bg-[#0d110e] shadow-[0_28px_80px_rgba(0,0,0,0.38)]" : "border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)]"
      }`}
    >
      <div className={`flex items-center gap-3 border-b px-4 py-3 ${isDark ? "border-white/10 bg-[#151917]" : "border-slate-200 bg-slate-50"}`}>
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className={`flex-1 rounded-full border px-4 py-2 text-[10px] ${isDark ? "border-white/10 bg-white/[0.04] text-white/45" : "border-slate-200 bg-white text-slate-500"}`}>
          amr-farms.local/admin/{story.stage.en.toLowerCase()}
        </div>
      </div>
      <div className="relative overflow-hidden bg-black/5">
        <AnimatePresence mode="wait">
          <motion.div
            key={story.image.src}
            initial={{ opacity: 0, x: 26 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -26 }}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
          >
            <ImageWithFallback image={story.image} className="aspect-[16/10] w-full object-contain p-4" />
          </motion.div>
        </AnimatePresence>
        <span className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white/75 opacity-0 backdrop-blur-md transition group-hover:opacity-100">
          <Maximize2 className="h-4 w-4" />
        </span>
      </div>
      <div className="flex items-center justify-between border-t border-stroke px-5 py-4">
        <div>
          <p className={`text-[9px] uppercase tracking-[0.24em] ${isDark ? "text-lime-400" : "text-emerald-950"}`}>
            {language === "en" ? "Active operational screen" : "Layar operasional aktif"}
          </p>
          <p className="mt-1 text-sm text-text-primary">{story.image.label[language]}</p>
        </div>
        <Maximize2 className="h-4 w-4 text-muted" />
      </div>
    </button>
  );
}

function StoryDetail({
  story,
  index,
  total,
  language,
  isDark,
  type,
}: {
  story: ScreenStory;
  index: number;
  total: number;
  language: Language;
  isDark: boolean;
  type: "mobile" | "desktop";
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={story.image.src}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.3 }}
        className="border-y border-stroke"
      >
        <div className="py-6">
          <div className="flex items-center justify-between gap-5">
            <p className={`text-[10px] uppercase tracking-[0.27em] ${isDark ? "text-lime-400" : "text-emerald-950"}`}>
              {type === "mobile"
                ? language === "en"
                  ? "Customer journey state"
                  : "State perjalanan pelanggan"
                : language === "en"
                  ? "Operational state"
                  : "State operasional"}
            </p>
            <span className="font-display text-base italic text-muted">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>
          <h3 className="mt-4 text-2xl tracking-[-0.035em] text-text-primary md:text-3xl">
            {story.stage[language]}
          </h3>
          <p className="mt-4 text-sm leading-7 text-muted">{story.intent[language]}</p>
        </div>

        <div className="border-t border-stroke py-6">
          <p className="text-[9px] uppercase tracking-[0.24em] text-muted">
            {language === "en" ? "Design focus" : "Fokus desain"}
          </p>
          <p className="mt-3 text-base leading-7 text-text-secondary">{story.focus[language]}</p>
        </div>

        <div className="border-t border-stroke py-6">
          <p className="text-[9px] uppercase tracking-[0.24em] text-muted">
            {language === "en" ? "Expected transition" : "Transisi yang diharapkan"}
          </p>
          <div className="mt-3 flex items-center gap-3 text-sm text-text-primary">
            <CircleDot className={`h-4 w-4 ${isDark ? "text-lime-400" : "text-emerald-950"}`} />
            {story.transition[language]}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function ControlButton({
  label,
  onClick,
  isDark,
  children,
}: {
  label: string;
  onClick: () => void;
  isDark: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`flex h-10 w-10 items-center justify-center rounded-full border transition ${
        isDark
          ? "border-white/12 bg-white/[0.04] text-white/70 hover:border-lime-300 hover:text-lime-300"
          : "border-slate-200 bg-white text-slate-600 hover:border-emerald-950 hover:text-emerald-950"
      }`}
    >
      {children}
    </button>
  );
}

function GalleryButton({
  label,
  position,
  onClick,
  children,
}: {
  label: string;
  position: "left" | "right";
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`absolute top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/65 text-white/70 backdrop-blur-md transition hover:border-lime-300/55 hover:bg-lime-500/20 hover:text-white ${
        position === "left" ? "left-4 md:left-7" : "right-4 md:right-7"
      }`}
    >
      {children}
    </button>
  );
}

function ImageWithFallback({
  image,
  className,
  priority = false,
}: {
  image: ProjectImage;
  className: string;
  priority?: boolean;
}) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [image.src]);

  if (hasError) {
    return (
      <div className={`flex items-center justify-center bg-surface-elevated p-6 ${className}`}>
        <div className="max-w-sm text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-stroke bg-surface">
            <ImageIcon className="h-6 w-6 text-emerald-700" />
          </div>
          <p className="mt-5 text-sm font-medium text-text-primary">Add project image</p>
          <p className="mt-2 break-all font-mono text-[10px] leading-5 text-muted">{image.src}</p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={image.src}
      alt={image.alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={
        prefersReducedMotion
          ? { opacity: 0 }
          : { opacity: 0, y: 24, filter: "blur(8px)" }
      }
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.64, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}