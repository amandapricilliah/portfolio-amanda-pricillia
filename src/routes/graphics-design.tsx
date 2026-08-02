// GRAPHIC DESIGN ARCHIVE — CATEGORY INDEX + VISUAL COLLECTION PAGES
import { createFileRoute } from "@tanstack/react-router";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Grid2X2,
  ImageIcon,
  Maximize2,
  MonitorUp,
  Palette,
  RectangleHorizontal,
  Smartphone,
  X,
} from "lucide-react";
import { createPortal } from "react-dom";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { PointerEvent as ReactPointerEvent, ReactNode } from "react";

import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useTheme } from "@/components/theme/ThemeProvider";
import {
  LanguageProvider,
  useLanguage,
} from "@/components/portfolio/LanguageProvider";
import type {
  Bilingual,
  Language,
} from "@/components/portfolio/LanguageProvider";

export const Route = createFileRoute("/graphics-design")({
  component: GraphicsDesignRoute,
});

function GraphicsDesignRoute() {
  return (
    <LanguageProvider>
      <GraphicsDesignPage />
    </LanguageProvider>
  );
}

type GalleryImage = {
  src: string;
  alt: string;
  label: Bilingual;
};

type CategoryId =
  | "feeds"
  | "banners"
  | "ebook"
  | "stories"
  | "identity"
  | "print";

type CollectionLayout =
  | "mosaic"
  | "banner"
  | "story"
  | "book"
  | "cover-study"
  | "identity"
  | "poster";

type Collection = {
  id: string;
  number: string;
  title: Bilingual;
  eyebrow: Bilingual;
  description: Bilingual;
  images: GalleryImage[];
  layout: CollectionLayout;
};

type Category = {
  id: CategoryId;
  number: string;
  title: Bilingual;
  shortTitle: Bilingual;
  description: Bilingual;
  note: Bilingual;
  cover: GalleryImage;
  previews: GalleryImage[];
  icon: typeof Grid2X2;
  collections: Collection[];
};

type LightboxState = {
  images: GalleryImage[];
  index: number;
  title: string;
} | null;

const makeImages = (
  count: number,
  src: (index: number) => string,
  label: (index: number) => Bilingual,
  alt: (index: number) => string,
): GalleryImage[] =>
  Array.from({ length: count }, (_, arrayIndex) => {
    const index = arrayIndex + 1;
    return {
      src: src(index),
      alt: alt(index),
      label: label(index),
    };
  });

const SHARE_STORIES = makeImages(
  12,
  (index) =>
    `/images/graphics-design/share-story/template-${String(index).padStart(2, "0")}.png`,
  (index) => ({
    en: `Story template ${String(index).padStart(2, "0")}`,
    id: `Template story ${String(index).padStart(2, "0")}`,
  }),
  (index) => `Instagram Story template ${index}`,
);

const SINDONEWS_BANNERS = makeImages(
  3,
  (index) =>
    `/images/graphics-design/sindonews-banner/banner-${String(index).padStart(2, "0")}.png`,
  (index) => ({
    en: `SINDOnews banner ${String(index).padStart(2, "0")}`,
    id: `Banner SINDOnews ${String(index).padStart(2, "0")}`,
  }),
  (index) => `SINDOnews banner ${index}`,
);

const OKEZONE_BANNERS = makeImages(
  4,
  (index) =>
    `/images/graphics-design/okezone-banner/banner-${String(index).padStart(2, "0")}.png`,
  (index) => ({
    en: `Okezone banner ${String(index).padStart(2, "0")}`,
    id: `Banner Okezone ${String(index).padStart(2, "0")}`,
  }),
  (index) => `Okezone banner ${index}`,
);

const HOLIDAY_BANNERS: GalleryImage[] = [
  {
    src: "/images/graphics-design/holiday-banner/banner_ucapan_hari_raya_idul_fitri_onestrikemall.webp",
    alt: "One Strike Mall Idul Fitri greeting banner",
    label: {
      en: "One Strike Mall · Idul Fitri",
      id: "One Strike Mall · Idulfitri",
    },
  },
  {
    src: "/images/graphics-design/holiday-banner/onestrike-nyepi.webp",
    alt: "One Strike Mall Nyepi greeting banner",
    label: { en: "One Strike Mall · Nyepi", id: "One Strike Mall · Nyepi" },
  },
  {
    src: "/images/graphics-design/holiday-banner/banner_ucapan_hari_raya_nyepi_babaairsoft.webp",
    alt: "Baba Airsoft Nyepi greeting banner",
    label: { en: "Baba Airsoft · Nyepi", id: "Baba Airsoft · Nyepi" },
  },
  {
    src: "/images/graphics-design/holiday-banner/banner_ucapan_hari_raya_idul_fitri_babaairsoft.webp",
    alt: "Baba Airsoft Idul Fitri greeting banner",
    label: { en: "Baba Airsoft · Idul Fitri", id: "Baba Airsoft · Idulfitri" },
  },
];

const PRICELIST_FEEDS = makeImages(
  3,
  (index) =>
    `/images/graphics-design/pricelist/feed-${String(index).padStart(2, "0")}.png`,
  (index) => ({
    en: `Price-list feed ${String(index).padStart(2, "0")}`,
    id: `Feed daftar harga ${String(index).padStart(2, "0")}`,
  }),
  (index) => `Resolusiweb price list feed ${index}`,
);

const GREETING_FEEDS = makeImages(
  9,
  (index) =>
    `/images/graphics-design/greeting/feed-${String(index).padStart(2, "0")}.png`,
  (index) => ({
    en: `Greeting feed ${String(index).padStart(2, "0")}`,
    id: `Feed ucapan ${String(index).padStart(2, "0")}`,
  }),
  (index) => `Resolusiweb greeting campaign ${index}`,
);

const SHOE_FEEDS = makeImages(
  3,
  (index) =>
    `/images/graphics-design/shoe/feed-${String(index).padStart(2, "0")}.png`,
  (index) => ({
    en: `Shoe feed ${String(index).padStart(2, "0")}`,
    id: `Feed sepatu ${String(index).padStart(2, "0")}`,
  }),
  (index) => `Shoe feed design ${index}`,
);

const NGADIHARJO_PAGES = makeImages(
  42,
  (index) =>
    `/images/graphics-design/ngadiharjo/page-${String(index).padStart(2, "0")}.png`,
  (index) => ({
    en: `Page ${String(index).padStart(2, "0")}`,
    id: `Halaman ${String(index).padStart(2, "0")}`,
  }),
  (index) => `Ngadiharjo e-book page ${index}`,
);

const IPB_COVERS = makeImages(
  7,
  (index) =>
    `/images/graphics-design/ipb-guide/cover-${String(index).padStart(2, "0")}.png`,
  (index) => ({
    en: `Cover direction ${String(index).padStart(2, "0")}`,
    id: `Alternatif sampul ${String(index).padStart(2, "0")}`,
  }),
  (index) => `IPB internship guide cover ${index}`,
);

const BOBA_POSTERS = makeImages(
  10,
  (index) =>
    `/images/graphics-design/boba/poster-${String(index).padStart(2, "0")}.png`,
  (index) => ({
    en: `Poster ${String(index).padStart(2, "0")}`,
    id: `Poster ${String(index).padStart(2, "0")}`,
  }),
  (index) => `Boba poster ${index}`,
);

const CALENDARS = makeImages(
  6,
  (index) =>
    `/images/graphics-design/calendar/calendar-${String(index).padStart(2, "0")}.png`,
  (index) => ({
    en: `Calendar ${String(index).padStart(2, "0")}`,
    id: `Kalender ${String(index).padStart(2, "0")}`,
  }),
  (index) => `Resolusiweb calendar ${index}`,
);

const WANUREJO_IDENTITY: GalleryImage[] = [
  {
    src: "/images/graphics-design/wanurejo/color-system.png",
    alt: "Wanurejo color system",
    label: { en: "Color system", id: "Sistem warna" },
  },
  {
    src: "/images/graphics-design/wanurejo/symbol-system.png",
    alt: "Wanurejo symbol system",
    label: { en: "Symbol system", id: "Sistem simbol" },
  },
  {
    src: "/images/graphics-design/wanurejo/typography.png",
    alt: "Wanurejo typography",
    label: { en: "Typography", id: "Tipografi" },
  },
  {
    src: "/images/graphics-design/wanurejo/mockup.png",
    alt: "Wanurejo identity mockup",
    label: { en: "Identity application", id: "Penerapan identitas" },
  },
];

const CATEGORIES: Category[] = [
  {
    id: "feeds",
    number: "01",
    title: { en: "Instagram Feeds", id: "Feed Instagram" },
    shortTitle: { en: "Feeds", id: "Feed" },
    description: {
      en: "Instagram feed work grouped by campaign, product, and visual direction.",
      id: "Karya feed Instagram yang dikelompokkan berdasarkan kampanye, produk, dan arah visual.",
    },
    note: { en: "15 selected visuals", id: "15 visual pilihan" },
    cover: GREETING_FEEDS[0],
    previews: [PRICELIST_FEEDS[1], GREETING_FEEDS[3], SHOE_FEEDS[0]],
    icon: Grid2X2,
    collections: [
      {
        id: "price-list",
        number: "01A",
        title: { en: "Resolusiweb Price List", id: "Daftar Harga Resolusiweb" },
        eyebrow: { en: "Promotional feed system", id: "Sistem feed promosi" },
        description: {
          en: "A three-post price-list series for Resolusiweb.",
          id: "Seri tiga unggahan daftar harga untuk Resolusiweb.",
        },
        images: PRICELIST_FEEDS,
        layout: "mosaic",
      },
      {
        id: "greeting",
        number: "01B",
        title: { en: "Greeting Campaign", id: "Kampanye Ucapan" },
        eyebrow: { en: "Seasonal social content", id: "Konten sosial musiman" },
        description: {
          en: "Nine greeting posts created as one consistent social-media set.",
          id: "Sembilan unggahan ucapan yang dibuat sebagai satu rangkaian media sosial.",
        },
        images: GREETING_FEEDS,
        layout: "mosaic",
      },
      {
        id: "shoe",
        number: "01C",
        title: { en: "Shoe Feed Collection", id: "Koleksi Feed Sepatu" },
        eyebrow: { en: "Product social media", id: "Media sosial produk" },
        description: {
          en: "A compact three-post product series for a shoe brand.",
          id: "Seri tiga unggahan produk untuk merek sepatu.",
        },
        images: SHOE_FEEDS,
        layout: "mosaic",
      },
    ],
  },
  {
    id: "banners",
    number: "02",
    title: { en: "Website Banners", id: "Banner Website" },
    shortTitle: { en: "Banners", id: "Banner" },
    description: {
      en: "Website banners grouped by publisher, campaign, and seasonal use.",
      id: "Banner website yang dikelompokkan berdasarkan penerbit, kampanye, dan kebutuhan musiman.",
    },
    note: { en: "11 banner directions", id: "11 arah banner" },
    cover: SINDONEWS_BANNERS[0],
    previews: [SINDONEWS_BANNERS[1], OKEZONE_BANNERS[2], OKEZONE_BANNERS[0]],
    icon: RectangleHorizontal,
    collections: [
      {
        id: "sindonews",
        number: "02A",
        title: { en: "SINDOnews Daily Quiz", id: "Kuis Harian SINDOnews" },
        eyebrow: { en: "Publisher website banner", id: "Banner website penerbit" },
        description: {
          en: "Three daily-quiz banner directions for SINDOnews.",
          id: "Tiga arah banner kuis harian untuk SINDOnews.",
        },
        images: SINDONEWS_BANNERS,
        layout: "banner",
      },
      {
        id: "okezone",
        number: "02B",
        title: { en: "Okezone Campaign Banners", id: "Banner Kampanye Okezone" },
        eyebrow: { en: "Digital campaign variants", id: "Variasi kampanye digital" },
        description: {
          en: "Four Okezone banner alternatives shown as one campaign set.",
          id: "Empat alternatif banner Okezone dalam satu rangkaian kampanye.",
        },
        images: OKEZONE_BANNERS,
        layout: "banner",
      },
      {
        id: "holiday",
        number: "02C",
        title: { en: "Holiday Greeting Collection", id: "Koleksi Banner Hari Raya" },
        eyebrow: { en: "Client seasonal banners", id: "Banner musiman klien" },
        description: {
          en: "Seasonal greeting banners for One Strike Mall and Baba Airsoft.",
          id: "Banner ucapan musiman untuk One Strike Mall dan Baba Airsoft.",
        },
        images: HOLIDAY_BANNERS,
        layout: "banner",
      },
    ],
  },
  {
    id: "ebook",
    number: "03",
    title: { en: "E-book & Editorial", id: "E-book & Editorial" },
    shortTitle: { en: "E-book", id: "E-book" },
    description: {
      en: "Publication work presented as readable spreads and cover studies.",
      id: "Karya publikasi yang ditampilkan sebagai spread dan studi sampul.",
    },
    note: { en: "42 pages + 7 covers", id: "42 halaman + 7 sampul" },
    cover: NGADIHARJO_PAGES[0],
    previews: [NGADIHARJO_PAGES[1], NGADIHARJO_PAGES[10], IPB_COVERS[3]],
    icon: BookOpen,
    collections: [
      {
        id: "ngadiharjo",
        number: "03A",
        title: { en: "Ngadiharjo Village E-book", id: "E-book Desa Ngadiharjo" },
        eyebrow: { en: "42-page editorial system", id: "Sistem editorial 42 halaman" },
        description: {
          en: "Browse the complete 42-page publication through an interactive editorial reader.",
          id: "Jelajahi publikasi lengkap 42 halaman melalui reader editorial interaktif.",
        },
        images: NGADIHARJO_PAGES,
        layout: "book",
      },
      {
        id: "ipb-guide",
        number: "03B",
        title: { en: "IPB Internship Guidebook", id: "Panduan Magang IPB" },
        eyebrow: { en: "Cover exploration", id: "Eksplorasi sampul" },
        description: {
          en: "Compare seven cover directions through one focused cover-study workspace.",
          id: "Bandingkan tujuh arah sampul melalui satu ruang eksplorasi yang lebih terfokus.",
        },
        images: IPB_COVERS,
        layout: "cover-study",
      },
    ],
  },
  {
    id: "stories",
    number: "04",
    title: { en: "Instagram Stories", id: "Instagram Story" },
    shortTitle: { en: "Stories", id: "Story" },
    description: {
      en: "Vertical story templates for Okezone and SINDOnews.",
      id: "Template story vertikal untuk Okezone dan SINDOnews.",
    },
    note: { en: "12 story templates", id: "12 template story" },
    cover: SHARE_STORIES[0],
    previews: [SHARE_STORIES[1], SHARE_STORIES[5], SHARE_STORIES[9]],
    icon: Smartphone,
    collections: [
      {
        id: "share-story",
        number: "04A",
        title: { en: "Share Story Templates", id: "Template Share Story" },
        eyebrow: { en: "Okezone + SINDOnews", id: "Okezone + SINDOnews" },
        description: {
          en: "Twelve templates for sharing publisher content on Instagram Story.",
          id: "Dua belas template untuk membagikan konten penerbit melalui Instagram Story.",
        },
        images: SHARE_STORIES,
        layout: "story",
      },
    ],
  },
  {
    id: "identity",
    number: "05",
    title: { en: "Logo & Identity", id: "Logo & Identitas" },
    shortTitle: { en: "Identity", id: "Identitas" },
    description: {
      en: "Logo development, color, symbol, typography, and final application.",
      id: "Pengembangan logo, warna, simbol, tipografi, dan penerapan akhir.",
    },
    note: { en: "1 complete identity system", id: "1 sistem identitas lengkap" },
    cover: WANUREJO_IDENTITY[3],
    previews: [WANUREJO_IDENTITY[0], WANUREJO_IDENTITY[1], WANUREJO_IDENTITY[2]],
    icon: Palette,
    collections: [
      {
        id: "wanurejo",
        number: "05A",
        title: { en: "Wanurejo Village Identity", id: "Identitas Desa Wanurejo" },
        eyebrow: { en: "Brand identity system", id: "Sistem identitas merek" },
        description: {
          en: "An identity system rooted in Wanurejo’s cultural heritage, natural landscape, and local character.",
          id: "Sistem identitas yang berangkat dari warisan budaya, lanskap alam, dan karakter lokal Desa Wanurejo.",
        },
        images: WANUREJO_IDENTITY,
        layout: "identity",
      },
    ],
  },
  {
    id: "print",
    number: "06",
    title: { en: "Posters & Print", id: "Poster & Cetak" },
    shortTitle: { en: "Print", id: "Cetak" },
    description: {
      en: "Poster concepts and calendar layouts presented as a visual wall.",
      id: "Konsep poster dan layout kalender yang ditampilkan sebagai dinding visual.",
    },
    note: { en: "16 selected print pieces", id: "16 karya cetak pilihan" },
    cover: BOBA_POSTERS[0],
    previews: [BOBA_POSTERS[3], CALENDARS[1], BOBA_POSTERS[7]],
    icon: MonitorUp,
    collections: [
      {
        id: "boba",
        number: "06A",
        title: { en: "Boba Poster Collection", id: "Koleksi Poster Boba" },
        eyebrow: { en: "Ten visual directions", id: "Sepuluh arah visual" },
        description: {
          en: "Ten poster directions for a boba product campaign.",
          id: "Sepuluh arah poster untuk kampanye produk boba.",
        },
        images: BOBA_POSTERS,
        layout: "poster",
      },
      {
        id: "calendar",
        number: "06B",
        title: { en: "Resolusiweb Calendar", id: "Kalender Resolusiweb" },
        eyebrow: { en: "Print layout series", id: "Seri layout cetak" },
        description: {
          en: "Six calendar layout directions for Resolusiweb.",
          id: "Enam arah layout kalender untuk Resolusiweb.",
        },
        images: CALENDARS,
        layout: "poster",
      },
    ],
  },
];

const CATEGORY_ACCENTS: Record<CategoryId, string> = {
  feeds: "#ff5f45",
  banners: "#4f7cff",
  ebook: "#f0b429",
  stories: "#a65cff",
  identity: "#20a66a",
  print: "#ff4f91",
};

function getCategoryFromLocation(): CategoryId | null {
  if (typeof window === "undefined") return null;
  const value = new URLSearchParams(window.location.search).get("collection");
  return CATEGORIES.some((category) => category.id === value)
    ? (value as CategoryId)
    : null;
}

function GraphicsDesignPage() {
  const { isDark } = useTheme();
  const { language, setLanguage, copy } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const pageRef = useRef<HTMLDivElement>(null);
  const [activeCategoryId, setActiveCategoryId] = useState<CategoryId | null>(
    getCategoryFromLocation,
  );
  const [lightbox, setLightbox] = useState<LightboxState>(null);

  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.25,
  });

  const activeCategory = useMemo(
    () => CATEGORIES.find((category) => category.id === activeCategoryId) ?? null,
    [activeCategoryId],
  );

  const navigateCategory = useCallback((id: CategoryId | null) => {
    const nextUrl = id
      ? `/graphics-design?collection=${id}`
      : "/graphics-design";

    window.history.pushState({ collection: id }, "", nextUrl);
    setActiveCategoryId(id);
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const openLightbox = useCallback(
    (images: GalleryImage[], index: number, title: string) => {
      setLightbox({ images, index, title });
    },
    [],
  );

  const moveLightbox = useCallback((direction: "prev" | "next") => {
    setLightbox((current) => {
      if (!current) return current;
      const offset = direction === "next" ? 1 : -1;
      return {
        ...current,
        index:
          (current.index + offset + current.images.length) %
          current.images.length,
      };
    });
  }, []);

  useEffect(() => {
    const handlePopState = () => setActiveCategoryId(getCategoryFromLocation());
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
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
  }, [lightbox, moveLightbox]);

  return (
    <div
      ref={pageRef}
      className={`relative min-h-screen overflow-clip text-text-primary ${
        isDark ? "bg-[#050505]" : "bg-white"
      }`}
    >
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className={`fixed inset-x-0 top-0 z-[100] h-px origin-left ${
          isDark ? "bg-white" : "bg-black"
        }`}
      />

      <ArchiveHeader
        category={activeCategory}
        language={language}
        setLanguage={setLanguage}
        copy={copy}
        isDark={isDark}
        onBackToArchive={() => navigateCategory(null)}
      />

      <AnimatePresence mode="wait" initial={false}>
        {activeCategory ? (
          <motion.div
            key={activeCategory.id}
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 18 }
            }
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          >
            <CategoryPage
              category={activeCategory}
              language={language}
              copy={copy}
              isDark={isDark}
              onOpen={openLightbox}
              onNavigate={navigateCategory}
            />
          </motion.div>
        ) : (
          <motion.div
            key="archive-index"
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 18 }
            }
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          >
            <ArchiveIndex
              language={language}
              copy={copy}
              isDark={isDark}
              onNavigate={navigateCategory}
              onOpen={openLightbox}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Lightbox
        state={lightbox}
        language={language}
        copy={copy}
        onClose={() => setLightbox(null)}
        onMove={moveLightbox}
      />
    </div>
  );
}

function ArchiveHeader({
  category,
  language,
  setLanguage,
  copy,
  isDark,
  onBackToArchive,
}: {
  category: Category | null;
  language: Language;
  setLanguage: (language: Language) => void;
  copy: (value: Bilingual) => string;
  isDark: boolean;
  onBackToArchive: () => void;
}) {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-[90] px-4 pt-4 md:px-7 md:pt-6">
      <div
        className={`pointer-events-auto mx-auto flex max-w-[1400px] items-center justify-between gap-3 rounded-full border border-stroke bg-surface/85 px-3 py-2 backdrop-blur-xl md:px-4 ${
          isDark
            ? "shadow-[0_16px_58px_rgba(0,0,0,0.56),inset_0_1px_0_rgba(255,255,255,0.07)]"
            : "shadow-[0_14px_42px_rgba(17,17,17,0.08),inset_0_1px_0_rgba(255,255,255,0.95)]"
        }`}
      >
        {category ? (
          <button
            type="button"
            onClick={onBackToArchive}
            className="group inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs text-muted transition hover:bg-surface-elevated hover:text-text-primary"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            {language === "en" ? "All projects" : "Semua proyek"}
          </button>
        ) : (
          <a
            href="/#explorations"
            className="group inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs text-muted transition hover:bg-surface-elevated hover:text-text-primary"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            {language === "en" ? "Back to home" : "Kembali ke beranda"}
          </a>
        )}

        <span className="hidden text-[9px] uppercase tracking-[0.32em] text-muted sm:block">
          {category
            ? `${category.number} / ${copy(category.shortTitle)}`
            : language === "en"
              ? "Amanda Pricillia · Graphic Design"
              : "Amanda Pricillia · Desain Grafis"}
        </span>

        <div className="flex items-center gap-2">
          <div
            className={`flex items-center rounded-full border border-stroke p-1 ${
              isDark ? "bg-black/20" : "bg-black/[0.025]"
            }`}
            aria-label={language === "en" ? "Language selector" : "Pilihan bahasa"}
          >
            {(["en", "id"] as const).map((item) => {
              const isActive = language === item;

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setLanguage(item)}
                  className={`min-w-9 rounded-full px-2.5 py-1.5 text-[9px] uppercase tracking-[0.15em] transition ${
                    isActive
                      ? isDark
                        ? "bg-white text-black"
                        : "bg-black text-white"
                      : "text-muted hover:text-text-primary"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

function ArchiveIndex({
  language,
  copy,
  isDark,
  onNavigate,
  onOpen,
}: {
  language: Language;
  copy: (value: Bilingual) => string;
  isDark: boolean;
  onNavigate: (id: CategoryId) => void;
  onOpen: (images: GalleryImage[], index: number, title: string) => void;
}) {
  return (
    <main>
      <AnimatedArchiveHero
        language={language}
        copy={copy}
        isDark={isDark}
        onNavigate={onNavigate}
        onOpen={onOpen}
      />

      <section
        id="project-index"
        className={`scroll-mt-24 px-5 py-24 md:px-9 md:py-28 lg:px-14 ${
          isDark ? "bg-[#090909]" : "bg-[#f7f7f5]"
        }`}
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col gap-5 border-b border-stroke pb-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted">
                {language === "en" ? "Visual collections" : "Koleksi visual"}
              </p>

              <h2 className="mt-3 text-[clamp(2rem,3.5vw,3.35rem)] leading-[1] tracking-[-0.045em] text-text-primary">
                {language === "en"
                  ? "Pick a stack."
                  : "Pilih koleksi."}
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-muted">
              {language === "en"
                ? "Open a stack to see every work in its original format."
                : "Buka tumpukan untuk melihat seluruh karya sesuai format aslinya."}
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {CATEGORIES.map((category, index) => (
              <CategoryIndexRow
                key={category.id}
                category={category}
                index={index}
                copy={copy}
                isDark={isDark}
                onClick={() => onNavigate(category.id)}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

type HeroTile = {
  image: GalleryImage;
  size: "wide" | "square" | "portrait" | "editorial";
};

const HERO_ROWS: HeroTile[][] = [
  [
    { image: SINDONEWS_BANNERS[0], size: "wide" },
    { image: GREETING_FEEDS[1], size: "square" },
    { image: SHARE_STORIES[0], size: "portrait" },
    { image: NGADIHARJO_PAGES[2], size: "editorial" },
    { image: WANUREJO_IDENTITY[3], size: "wide" },
    { image: BOBA_POSTERS[0], size: "portrait" },
  ],
  [
    { image: PRICELIST_FEEDS[0], size: "square" },
    { image: OKEZONE_BANNERS[1], size: "wide" },
    { image: SHARE_STORIES[4], size: "portrait" },
    { image: IPB_COVERS[1], size: "editorial" },
    { image: GREETING_FEEDS[5], size: "square" },
    { image: HOLIDAY_BANNERS[0], size: "wide" },
  ],
  [
    { image: CALENDARS[1], size: "editorial" },
    { image: SHOE_FEEDS[1], size: "square" },
    { image: SHARE_STORIES[8], size: "portrait" },
    { image: SINDONEWS_BANNERS[2], size: "wide" },
    { image: NGADIHARJO_PAGES[11], size: "editorial" },
    { image: BOBA_POSTERS[5], size: "portrait" },
  ],
];

function AnimatedArchiveHero({
  language,
  copy,
  isDark,
  onNavigate,
  onOpen,
}: {
  language: Language;
  copy: (value: Bilingual) => string;
  isDark: boolean;
  onNavigate: (id: CategoryId) => void;
  onOpen: (images: GalleryImage[], index: number, title: string) => void;
}) {
  const prefersReducedMotion = useReducedMotion();
  const allHeroImages = HERO_ROWS.flat().map((tile) => tile.image);

  return (
    <section className="graphic-archive-motion relative flex h-[100svh] min-h-[720px] items-center overflow-hidden border-b border-stroke">
      <style>{`
        @keyframes graphicArchiveLeft {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-50%, 0, 0); }
        }

        @keyframes graphicArchiveRight {
          from { transform: translate3d(-50%, 0, 0); }
          to { transform: translate3d(0, 0, 0); }
        }

        .graphic-archive-motion:hover .graphic-archive-track {
          animation-play-state: paused;
        }
      `}</style>

      <div
        aria-hidden="true"
        className={`absolute inset-0 ${isDark ? "bg-[#050505]" : "bg-white"}`}
      />

      <div className="absolute inset-x-0 bottom-0 top-[84px] z-[1] flex flex-col justify-evenly gap-2 overflow-hidden py-3 md:top-[96px] md:gap-3 md:py-4">
        {HERO_ROWS.map((row, rowIndex) => {
          /*
           * Satu segmen berisi dua putaran karya agar lebarnya selalu
           * melampaui viewport. Segmen tersebut diduplikasi secara identik,
           * sehingga perpindahan -50% benar-benar menyambung tanpa celah.
           */
          const segment = [...row, ...row];
          const direction =
            rowIndex === 1 ? "graphicArchiveRight" : "graphicArchiveLeft";
          const duration = rowIndex === 0 ? 38 : rowIndex === 1 ? 44 : 41;

          return (
            <div
              key={rowIndex}
              className="flex min-h-0 w-full flex-1 items-center overflow-hidden"
            >
              <div
                className="graphic-archive-track flex w-max items-center will-change-transform"
                style={{
                  animation: prefersReducedMotion
                    ? "none"
                    : `${direction} ${duration}s linear infinite`,
                }}
              >
                {[0, 1].map((segmentIndex) => (
                  <div
                    key={`${rowIndex}-segment-${segmentIndex}`}
                    className="flex shrink-0 items-center gap-3 pr-3 md:gap-4 md:pr-4"
                    aria-hidden={segmentIndex === 1 ? true : undefined}
                  >
                    {segment.map((tile, tileIndex) => (
                      <button
                        key={`${rowIndex}-${segmentIndex}-${tile.image.src}-${tileIndex}`}
                        type="button"
                        onClick={() => {
                          const imageIndex = allHeroImages.findIndex(
                            (image) => image.src === tile.image.src,
                          );
                          onOpen(
                            allHeroImages,
                            Math.max(imageIndex, 0),
                            language === "en"
                              ? "Graphic Design Archive"
                              : "Arsip Desain Grafis",
                          );
                        }}
                        className={`group relative shrink-0 overflow-hidden rounded-[1.15rem] border transition duration-500 hover:z-10 hover:scale-[1.025] md:rounded-[1.4rem] ${
                          isDark
                            ? "border-white/10 bg-[#101010]"
                            : "border-black/10 bg-[#f4f4f2]"
                        } ${heroTileSize(tile.size)}`}
                        tabIndex={
                          segmentIndex === 0 && tileIndex < row.length ? 0 : -1
                        }
                        aria-label={copy(tile.image.label)}
                      >
                        <ImageWithFallback
                          image={tile.image}
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.035]"
                        />
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 z-10 ${
          isDark
            ? "bg-[radial-gradient(circle_at_center,rgba(5,5,5,0.96)_0%,rgba(5,5,5,0.82)_26%,rgba(5,5,5,0.35)_58%,rgba(5,5,5,0.52)_100%)]"
            : "bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.97)_0%,rgba(255,255,255,0.86)_27%,rgba(255,255,255,0.38)_60%,rgba(255,255,255,0.6)_100%)]"
        }`}
      />

      <div className="relative z-20 mx-auto flex h-full w-full max-w-[1080px] flex-col items-center justify-center px-6 pb-10 pt-28 text-center md:px-10 md:pb-12 md:pt-32">
        <Reveal>
          <div className="mx-auto inline-flex items-center gap-3 text-[9px] uppercase tracking-[0.34em] text-muted">
            <span className={`h-px w-8 ${isDark ? "bg-white/30" : "bg-black/25"}`} />
            <span>
              {language === "en"
                ? "Selected visual work · 2022—2026"
                : "Karya visual pilihan · 2022—2026"}
            </span>
            <span className={`h-px w-8 ${isDark ? "bg-white/30" : "bg-black/25"}`} />
          </div>

          <h1 className="mx-auto mt-7 max-w-5xl text-[clamp(3.6rem,8vw,8rem)] leading-[0.86] tracking-[-0.07em] text-text-primary">
            {language === "en" ? (
              <>
                Graphic Design
                <span className="block font-display font-normal italic">
                  Archive.
                </span>
              </>
            ) : (
              <>
                Arsip Desain
                <span className="block font-display font-normal italic">
                  Grafis.
                </span>
              </>
            )}
          </h1>

          <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-muted md:text-base md:leading-8">
            {language === "en"
              ? "Feeds, banners, editorial pages, Stories, identities, posters, and print work—moving together in one visual archive."
              : "Feed, banner, halaman editorial, Story, identitas, poster, dan materi cetak—bergerak dalam satu arsip visual."}
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#project-index"
              className={`group inline-flex items-center gap-3 rounded-full border px-5 py-3 text-sm backdrop-blur-xl transition hover:-translate-y-0.5 ${
                isDark
                  ? "border-white/20 bg-black/45 text-white hover:border-white/40"
                  : "border-black/15 bg-white/70 text-black hover:border-black/30"
              }`}
            >
              {language === "en" ? "Explore the archive" : "Jelajahi arsip"}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 md:mt-12">
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => onNavigate(category.id)}
              className="group inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted transition hover:text-text-primary"
            >
              <span
                className="h-1.5 w-1.5 rounded-full transition group-hover:scale-150"
                style={{ backgroundColor: CATEGORY_ACCENTS[category.id] }}
              />
              {copy(category.shortTitle)}
            </button>
          ))}
        </div>
      </div>

      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 bottom-0 z-20 h-12 bg-gradient-to-t ${
          isDark ? "from-[#050505] to-transparent" : "from-white to-transparent"
        }`}
      />
    </section>
  );
}

function heroTileSize(size: HeroTile["size"]) {
  if (size === "wide") {
    return "h-[clamp(128px,19vh,215px)] w-[clamp(240px,36vh,410px)]";
  }

  if (size === "portrait") {
    return "h-[clamp(168px,25vh,282px)] w-[clamp(103px,15.4vh,174px)]";
  }

  if (size === "editorial") {
    return "h-[clamp(168px,25vh,282px)] w-[clamp(121px,18vh,204px)]";
  }

  return "h-[clamp(145px,21.5vh,242px)] w-[clamp(145px,21.5vh,242px)]";
}

function CategoryIndexRow({
  category,
  index,
  copy,
  isDark,
  onClick,
}: {
  category: Category;
  index: number;
  copy: (value: Bilingual) => string;
  isDark: boolean;
  onClick: () => void;
}) {
  const stackImages = [category.cover, ...category.previews].slice(0, 4);

  const transforms = [
    "translate(-58%, -48%) rotate(-8deg)",
    "translate(-36%, -52%) rotate(5deg)",
    "translate(-50%, -50%) rotate(-1deg)",
    "translate(-25%, -46%) rotate(9deg)",
  ];

  return (
    <Reveal delay={Math.min(index * 0.05, 0.2)}>
      <button
        type="button"
        onClick={onClick}
        className="group block w-full text-left"
      >
        <div
          className={`relative h-[310px] overflow-hidden rounded-[2rem] border backdrop-blur-2xl transition-all duration-500 group-hover:-translate-y-1 ${
            isDark
              ? "border-white/12 bg-white/[0.045] shadow-[0_24px_65px_rgba(0,0,0,0.24),inset_0_1px_0_rgba(255,255,255,0.06)] group-hover:border-white/20 group-hover:bg-white/[0.065]"
              : "border-black/10 bg-white/70 shadow-[0_22px_60px_rgba(17,17,17,0.08),inset_0_1px_0_rgba(255,255,255,0.95)] group-hover:border-black/15 group-hover:bg-white/88"
          }`}
        >
          <span className="absolute left-5 top-5 z-30 font-display text-xl italic text-muted">
            {category.number}
          </span>

          <span className="absolute right-5 top-5 z-30 text-[9px] uppercase tracking-[0.24em] text-muted">
            {copy(category.note)}
          </span>

          <div className="absolute inset-0">
            {stackImages.map((image, imageIndex) => (
              <div
                key={image.src}
                className="absolute left-1/2 top-1/2 flex max-h-[222px] max-w-[70%] items-center justify-center transition-all duration-500 ease-out group-hover:scale-[1.025]"
                style={{
                  transform: transforms[imageIndex],
                  zIndex: imageIndex + 1,
                }}
              >
                <ImageWithFallback
                  image={image}
                  className={`block h-auto max-h-[222px] w-auto max-w-full rounded-[1.45rem] border object-contain shadow-[0_18px_40px_rgba(0,0,0,0.18)] ${
                    isDark
                      ? "border-white/12 bg-white/[0.055]"
                      : "border-black/10 bg-white/90"
                  }`}
                />
              </div>
            ))}
          </div>

          <div
            className={`pointer-events-none absolute inset-x-0 bottom-0 z-20 h-28 bg-gradient-to-t ${
              isDark
                ? "from-[#0b0b0b]/95 via-[#0b0b0b]/72 to-transparent"
                : "from-white/95 via-white/72 to-transparent"
            }`}
          />

          <div className="absolute inset-x-5 bottom-5 z-30 flex items-end justify-between gap-4">
            <h3 className="max-w-[80%] text-xl tracking-[-0.035em] text-text-primary md:text-2xl">
              {copy(category.title)}
            </h3>

            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 ${
                isDark
                  ? "border-white/15 bg-white/[0.06] text-white backdrop-blur-xl group-hover:bg-white/[0.12]"
                  : "border-black/10 bg-white/75 text-black backdrop-blur-xl group-hover:bg-white"
              }`}
            >
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </button>
    </Reveal>
  );
}

function CategoryPage({
  category,
  language,
  copy,
  isDark,
  onOpen,
  onNavigate,
}: {
  category: Category;
  language: Language;
  copy: (value: Bilingual) => string;
  isDark: boolean;
  onOpen: (images: GalleryImage[], index: number, title: string) => void;
  onNavigate: (id: CategoryId) => void;
}) {
  const categoryIndex = CATEGORIES.findIndex((item) => item.id === category.id);
  const nextCategory = CATEGORIES[(categoryIndex + 1) % CATEGORIES.length];

  return (
    <main>
      <CategoryMotionHero
        category={category}
        language={language}
        copy={copy}
        isDark={isDark}
        onOpen={onOpen}
      />

      {category.collections.map((collection, index) => (
        <CollectionSection
          key={collection.id}
          collection={collection}
          index={index}
          language={language}
          copy={copy}
          isDark={isDark}
          onOpen={onOpen}
        />
      ))}

      <section className="px-5 py-20 md:px-9 md:py-24 lg:px-14">
        <div className="mx-auto max-w-[1400px] border-y border-stroke py-10">
          <button
            type="button"
            onClick={() => onNavigate(nextCategory.id)}
            className="group grid w-full gap-5 text-left md:grid-cols-[1fr_auto] md:items-end"
          >
            <div>
              <p className="text-[9px] uppercase tracking-[0.3em] text-muted">
                {language === "en" ? "Next category" : "Kategori berikutnya"}
              </p>

              <h2 className="mt-3 text-4xl tracking-[-0.05em] text-text-primary md:text-6xl">
                {copy(nextCategory.title)}
              </h2>
            </div>

            <ArrowRight className="h-7 w-7 text-muted transition group-hover:translate-x-2 group-hover:text-text-primary" />
          </button>
        </div>
      </section>
    </main>
  );
}

function CategoryMotionHero({
  category,
  language,
  copy,
  isDark,
  onOpen,
}: {
  category: Category;
  language: Language;
  copy: (value: Bilingual) => string;
  isDark: boolean;
  onOpen: (images: GalleryImage[], index: number, title: string) => void;
}) {
  const prefersReducedMotion = useReducedMotion();
  const images = [
    category.cover,
    ...category.previews,
    ...category.collections.flatMap((collection) => collection.images.slice(0, 3)),
  ].filter(
    (image, index, all) =>
      all.findIndex((candidate) => candidate.src === image.src) === index,
  );

  const heroImages = images.slice(0, 10);
  const firstLane = heroImages.filter((_, index) => index % 2 === 0);
  const secondLane = heroImages.filter((_, index) => index % 2 === 1);
  const accent = CATEGORY_ACCENTS[category.id];

  const renderLane = (
    lane: GalleryImage[],
    direction: "left" | "right",
    duration: number,
  ) => {
    const segment = lane.length > 0 ? [...lane, ...lane] : heroImages;
    const animationName =
      direction === "left" ? "categoryHeroLeft" : "categoryHeroRight";

    return (
      <div className="flex min-h-0 flex-1 items-center overflow-hidden">
        <div
          className="category-hero-track flex w-max items-center will-change-transform"
          style={{
            animation: prefersReducedMotion
              ? "none"
              : `${animationName} ${duration}s linear infinite`,
          }}
        >
          {[0, 1].map((segmentIndex) => (
            <div
              key={`${direction}-${segmentIndex}`}
              className="flex shrink-0 items-center gap-4 pr-4 md:gap-5 md:pr-5"
              aria-hidden={segmentIndex === 1 ? true : undefined}
            >
              {segment.map((image, imageIndex) => {
                const sourceIndex = heroImages.findIndex(
                  (candidate) => candidate.src === image.src,
                );

                return (
                  <button
                    key={`${direction}-${segmentIndex}-${image.src}-${imageIndex}`}
                    type="button"
                    onClick={() =>
                      onOpen(
                        heroImages,
                        Math.max(sourceIndex, 0),
                        copy(category.title),
                      )
                    }
                    className={`group relative h-[clamp(170px,24vh,250px)] w-[clamp(170px,24vh,250px)] shrink-0 overflow-hidden rounded-[1.7rem] border p-2 backdrop-blur-xl transition duration-500 hover:z-10 hover:scale-[1.025] md:rounded-[2rem] ${
                      isDark
                        ? "border-white/12 bg-white/[0.045] shadow-[0_22px_50px_rgba(0,0,0,0.22)]"
                        : "border-black/10 bg-white/78 shadow-[0_18px_45px_rgba(17,17,17,0.09)]"
                    }`}
                    tabIndex={segmentIndex === 0 ? 0 : -1}
                    aria-label={copy(image.label)}
                  >
                    <ImageWithFallback
                      image={image}
                      className="h-full w-full rounded-[1.25rem] object-cover transition duration-700 group-hover:scale-[1.035] md:rounded-[1.55rem]"
                    />
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className="category-motion-hero relative flex h-[92svh] min-h-[680px] items-center overflow-hidden border-b border-stroke pt-24">
      <style>{`
        @keyframes categoryHeroLeft {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-50%, 0, 0); }
        }

        @keyframes categoryHeroRight {
          from { transform: translate3d(-50%, 0, 0); }
          to { transform: translate3d(0, 0, 0); }
        }

        .category-motion-hero:hover .category-hero-track {
          animation-play-state: paused;
        }
      `}</style>

      <div
        aria-hidden="true"
        className={`absolute inset-0 ${isDark ? "bg-[#050505]" : "bg-white"}`}
      />

      <div className="absolute inset-x-0 bottom-0 top-[92px] z-[1] flex flex-col justify-center gap-5 overflow-hidden py-6 md:top-[104px] md:gap-6 md:py-8">
        {renderLane(firstLane, "left", 42)}
        {renderLane(secondLane.length > 0 ? secondLane : firstLane, "right", 48)}
      </div>

      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 z-10 ${
          isDark
            ? "bg-[radial-gradient(circle_at_center,rgba(5,5,5,0.96)_0%,rgba(5,5,5,0.86)_30%,rgba(5,5,5,0.48)_62%,rgba(5,5,5,0.7)_100%)]"
            : "bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.97)_0%,rgba(255,255,255,0.88)_30%,rgba(255,255,255,0.54)_64%,rgba(255,255,255,0.72)_100%)]"
        }`}
      />

      <div className="relative z-20 mx-auto flex w-full max-w-[1020px] flex-col items-center px-6 text-center md:px-10">
        <Reveal>
          <div
            className={`mx-auto inline-flex items-center gap-3 rounded-full border px-4 py-2 text-[9px] uppercase tracking-[0.28em] backdrop-blur-xl ${
              isDark
                ? "border-white/15 bg-black/35 text-white/65"
                : "border-black/10 bg-white/72 text-black/55"
            }`}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: accent }}
            />
            <span>{category.number}</span>
            <span className="h-3 w-px bg-current opacity-25" />
            <span>{copy(category.note)}</span>
          </div>

          <h1 className="mt-7 text-[clamp(4rem,9vw,8.4rem)] leading-[0.86] tracking-[-0.075em] text-text-primary">
            {copy(category.title)}
          </h1>

          <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-muted md:text-base md:leading-8">
            {copy(category.description)}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
            {category.collections.map((collection) => (
              <a
                key={collection.id}
                href={`#${collection.id}`}
                className={`rounded-full border px-4 py-2.5 text-xs backdrop-blur-xl transition hover:-translate-y-0.5 ${
                  isDark
                    ? "border-white/15 bg-black/38 text-white/70 hover:border-white/30 hover:text-white"
                    : "border-black/10 bg-white/74 text-black/60 hover:border-black/20 hover:text-black"
                }`}
              >
                {collection.number} · {copy(collection.title)}
              </a>
            ))}
          </div>
        </Reveal>
      </div>

      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 bottom-0 z-20 h-16 bg-gradient-to-t ${
          isDark ? "from-[#050505] to-transparent" : "from-white to-transparent"
        }`}
      />
    </section>
  );
}

function CollectionSection({
  collection,
  index,
  language,
  copy,
  isDark,
  onOpen,
}: {
  collection: Collection;
  index: number;
  language: Language;
  copy: (value: Bilingual) => string;
  isDark: boolean;
  onOpen: (images: GalleryImage[], index: number, title: string) => void;
}) {
  const alternate = index % 2 === 1;

  return (
    <section
      id={collection.id}
      className={`scroll-mt-24 border-b border-stroke px-5 py-20 md:px-9 md:py-28 lg:px-14 ${
        alternate
          ? isDark
            ? "bg-[#0a0a0a]"
            : "bg-[#f5f5f2]"
          : isDark
            ? "bg-[#050505]"
            : "bg-white"
      }`}
    >
      <div className="mx-auto max-w-[1360px]">
        <Reveal>
          <ProjectLabel
            number={collection.number}
            label={copy(collection.eyebrow)}
            language={language}
            isDark={isDark}
          />
        </Reveal>

        <div className="mt-8 grid gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:items-end">
          <Reveal>
            <div>
              <h2 className="max-w-xl text-4xl leading-[1.02] tracking-[-0.05em] text-text-primary md:text-6xl">
                {copy(collection.title)}
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="border-l border-stroke pl-6 md:pl-8">
              <p className="max-w-2xl text-sm leading-7 text-muted md:text-base md:leading-8">
                {copy(collection.description)}
              </p>
              <p className="mt-4 text-[9px] uppercase tracking-[0.25em] text-muted">
                {String(collection.images.length).padStart(2, "0")} {language === "en" ? "visuals" : "visual"}
              </p>
            </div>
          </Reveal>
        </div>

        <div
          className={
            collection.layout === "book"
              ? "mt-7 md:mt-9"
              : "mt-12 md:mt-16"
          }
        >
          {collection.layout === "mosaic" && (
            <FeedGallery collection={collection} copy={copy} onOpen={onOpen} />
          )}
          {collection.layout === "banner" && (
            <BannerGallery collection={collection} copy={copy} isDark={isDark} onOpen={onOpen} />
          )}
          {collection.layout === "story" && (
            <StoryGallery collection={collection} copy={copy} onOpen={onOpen} />
          )}
          {collection.layout === "book" && (
            <BookGallery collection={collection} language={language} copy={copy} isDark={isDark} onOpen={onOpen} />
          )}
          {collection.layout === "cover-study" && (
            <CoverStudyGallery collection={collection} language={language} copy={copy} isDark={isDark} onOpen={onOpen} />
          )}
          {collection.layout === "identity" && (
            <IdentityGallery collection={collection} copy={copy} onOpen={onOpen} />
          )}
          {collection.layout === "poster" && (
            <PosterGallery collection={collection} language={language} copy={copy} onOpen={onOpen} />
          )}
        </div>
      </div>
    </section>
  );
}

function ProjectLabel({
  number,
  label,
  language,
  isDark,
}: {
  number: string;
  label: string;
  language: Language;
  isDark: boolean;
}) {
  return (
    <div
      className={`flex w-full items-center justify-between gap-4 rounded-full border px-5 py-3.5 backdrop-blur-2xl md:px-6 ${
        isDark
          ? "border-white/12 bg-white/[0.045] shadow-[0_16px_44px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.06)]"
          : "border-black/10 bg-white/75 shadow-[0_14px_38px_rgba(17,17,17,0.06),inset_0_1px_0_rgba(255,255,255,0.95)]"
      }`}
    >
      <div className="flex min-w-0 items-center gap-3 md:gap-5">
        <span
          className={`h-2 w-2 shrink-0 rounded-full ${
            isDark ? "bg-white/70" : "bg-black/65"
          }`}
        />

        <span className="shrink-0 text-[9px] uppercase tracking-[0.27em] text-muted">
          {language === "en" ? "Graphic Projects" : "Proyek Grafis"}
        </span>

        <span className="hidden h-4 w-px bg-stroke sm:block" />

        <span className="shrink-0 text-[9px] uppercase tracking-[0.27em] text-muted">
          {number}
        </span>
      </div>

      <div className="flex min-w-0 items-center gap-3">
        <span className="hidden h-4 w-px bg-stroke sm:block" />
        <span className="truncate text-right text-[9px] uppercase tracking-[0.27em] text-muted">
          {label}
        </span>
      </div>
    </div>
  );
}

function FeedGallery({
  collection,
  copy,
  onOpen,
}: {
  collection: Collection;
  copy: (value: Bilingual) => string;
  onOpen: (images: GalleryImage[], index: number, title: string) => void;
}) {
  const many = collection.images.length > 4;

  if (!many) {
    return (
      <div className="grid items-start gap-4 sm:grid-cols-3">
        {collection.images.map((image, index) => (
          <VisualButton
            key={image.src}
            image={image}
            onClick={() => onOpen(collection.images, index, copy(collection.title))}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-hidden border-y border-stroke py-7">
      <div className="grid grid-flow-col grid-rows-2 gap-4 overflow-x-auto pb-5 [grid-auto-columns:minmax(230px,290px)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {collection.images.map((image, index) => (
          <VisualButton
            key={image.src}
            image={image}
            onClick={() => onOpen(collection.images, index, copy(collection.title))}
          />
        ))}
      </div>
    </div>
  );
}

function VisualButton({
  image,
  onClick,
  className = "",
}: {
  image: GalleryImage;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group block w-full text-left ${className}`}
    >
      <ImageWithFallback
        image={image}
        className="block h-auto w-full rounded-[1.35rem] border border-stroke bg-white transition duration-500 group-hover:-translate-y-1"
      />
    </button>
  );
}

function BannerGallery({
  collection,
  copy,
  isDark,
  onOpen,
}: {
  collection: Collection;
  copy: (value: Bilingual) => string;
  isDark: boolean;
  onOpen: (images: GalleryImage[], index: number, title: string) => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  const move = (direction: "prev" | "next") => {
    setActiveIndex((current) => {
      const offset = direction === "next" ? 1 : -1;
      return (current + offset + collection.images.length) % collection.images.length;
    });
  };

  return (
    <div>
      <div className={`border-y border-stroke py-6 ${isDark ? "bg-[#0b0b0b]" : "bg-[#f5f5f2]"}`}>
        <AnimatePresence mode="wait">
          <motion.button
            key={collection.images[activeIndex].src}
            type="button"
            onClick={() => onOpen(collection.images, activeIndex, copy(collection.title))}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="group mx-auto block w-full max-w-[1180px] px-4 md:px-8"
          >
            <ImageWithFallback
              image={collection.images[activeIndex]}
              className="block h-auto w-full rounded-[1.55rem] border border-stroke shadow-[0_20px_45px_rgba(0,0,0,0.14)] transition duration-500 group-hover:-translate-y-1"
            />
          </motion.button>
        </AnimatePresence>
      </div>

      <div className="mt-5 flex items-center justify-between gap-5">
        <p className="text-xs text-muted">{copy(collection.images[activeIndex].label)}</p>
        <div className="flex items-center gap-3">
          <RoundButton label="Previous banner" onClick={() => move("prev")}>
            <ChevronLeft className="h-4 w-4" />
          </RoundButton>
          <span className="font-display text-lg italic text-muted">
            {String(activeIndex + 1).padStart(2, "0")} / {String(collection.images.length).padStart(2, "0")}
          </span>
          <RoundButton label="Next banner" onClick={() => move("next")}>
            <ChevronRight className="h-4 w-4" />
          </RoundButton>
        </div>
      </div>

      <div className="mt-5 flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {collection.images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`shrink-0 border-b-2 pb-2 transition ${
              activeIndex === index ? "border-text-primary" : "border-transparent opacity-55 hover:opacity-100"
            }`}
          >
            <ImageWithFallback image={image} className="block h-auto w-[190px] rounded-[1rem] border border-stroke" />
          </button>
        ))}
      </div>
    </div>
  );
}

function StoryGallery({
  collection,
  copy,
  onOpen,
}: {
  collection: Collection;
  copy: (value: Bilingual) => string;
  onOpen: (images: GalleryImage[], index: number, title: string) => void;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <div className="mb-5 flex justify-end gap-2">
        <RoundButton
          label="Previous stories"
          onClick={() => scrollerRef.current?.scrollBy({ left: -360, behavior: "smooth" })}
        >
          <ArrowLeft className="h-4 w-4" />
        </RoundButton>
        <RoundButton
          label="Next stories"
          onClick={() => scrollerRef.current?.scrollBy({ left: 360, behavior: "smooth" })}
        >
          <ArrowRight className="h-4 w-4" />
        </RoundButton>
      </div>

      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory items-end gap-4 overflow-x-auto border-y border-stroke py-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {collection.images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => onOpen(collection.images, index, copy(collection.title))}
            className={`group w-[210px] shrink-0 snap-center transition duration-500 hover:-translate-y-2 md:w-[245px] ${
              index % 2 === 0 ? "-rotate-1" : "rotate-1"
            }`}
          >
            <ImageWithFallback
              image={image}
              className="block h-auto w-full rounded-[1.45rem] border border-stroke shadow-[0_20px_42px_rgba(0,0,0,0.14)]"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

type PageFlipEvent = {
  data: number | string;
};

type PageFlipInstance = {
  loadFromHTML: (pages: HTMLElement[] | NodeListOf<HTMLElement>) => void;
  on: (event: string, callback: (event: PageFlipEvent) => void) => void;
  flipNext: (corner?: "top" | "bottom") => void;
  flipPrev: (corner?: "top" | "bottom") => void;
  getCurrentPageIndex: () => number;
  destroy: () => void;
};

function BookGallery({
  collection,
  language,
  copy,
  isDark,
  onOpen,
}: {
  collection: Collection;
  language: Language;
  copy: (value: Bilingual) => string;
  isDark: boolean;
  onOpen: (images: GalleryImage[], index: number, title: string) => void;
}) {
  const bookHostRef = useRef<HTMLDivElement>(null);
  const pageFlipRef = useRef<PageFlipInstance | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isBookReady, setIsBookReady] = useState(false);
  const [bookError, setBookError] = useState<string | null>(null);

  const imageSources = useMemo(
    () => collection.images.map((image) => image.src),
    [collection.images],
  );

  useEffect(() => {
    let cancelled = false;
    let instance: PageFlipInstance | null = null;

    const readFirstPageRatio = async () => {
      const fallbackRatio = 0.72;

      return new Promise<number>((resolve) => {
        const image = new Image();

        image.onload = () => {
          if (!image.naturalWidth || !image.naturalHeight) {
            resolve(fallbackRatio);
            return;
          }

          resolve(image.naturalWidth / image.naturalHeight);
        };

        image.onerror = () => resolve(fallbackRatio);
        image.src = imageSources[0];
      });
    };

    const initialiseBook = async () => {
      const host = bookHostRef.current;
      if (!host || imageSources.length === 0) return;

      try {
        setBookError(null);
        setIsBookReady(false);

        const pageRatio = await readFirstPageRatio();
        const pageHeight = 760;
        const pageWidth = Math.max(360, Math.round(pageHeight * pageRatio));
        const minPageWidth = Math.max(230, Math.round(pageWidth * 0.56));
        const minPageHeight = Math.round(minPageWidth / pageRatio);

        const pageFlipModule = await import("page-flip");
        if (cancelled || !bookHostRef.current) return;

        const pages = Array.from(
          bookHostRef.current.querySelectorAll<HTMLElement>(
            ".real-flipbook-page",
          ),
        );

        const pageFlip = new pageFlipModule.PageFlip(bookHostRef.current, {
          width: pageWidth,
          height: pageHeight,
          size: "stretch",
          minWidth: minPageWidth,
          maxWidth: pageWidth,
          minHeight: minPageHeight,
          maxHeight: pageHeight,
          drawShadow: true,
          flippingTime: 1080,
          usePortrait: false,
          startZIndex: 10,
          autoSize: true,
          maxShadowOpacity: 0.42,
          showCover: false,
          mobileScrollSupport: false,
          swipeDistance: 18,
          clickEventForward: false,
          useMouseEvents: true,
          disableFlipByClick: false,
        }) as unknown as PageFlipInstance;

        pageFlip.on("init", (event) => {
          if (cancelled) return;
          setCurrentPage(Number(event.data) || 0);
          setIsBookReady(true);
        });

        pageFlip.on("flip", (event) => {
          if (cancelled) return;
          setCurrentPage(Number(event.data) || 0);
        });

        pageFlip.loadFromHTML(pages);
        pageFlipRef.current = pageFlip;
        instance = pageFlip;
      } catch (error) {
        if (cancelled) return;

        setBookError(
          language === "en"
            ? "The realistic page-turn engine has not been installed yet."
            : "Mesin page-turn realistis belum terpasang.",
        );
        setIsBookReady(false);
        console.error("Failed to initialise realistic flipbook", error);
      }
    };

    initialiseBook();

    return () => {
      cancelled = true;
      pageFlipRef.current = null;

      if (instance) {
        try {
          instance.destroy();
        } catch {
          // The library may already have removed its generated nodes.
        }
      }
    };
  }, [imageSources, language]);

  const currentLabel = copy(
    collection.images[Math.min(currentPage, collection.images.length - 1)]
      .label,
  );

  const flipPrevious = () => {
    pageFlipRef.current?.flipPrev("top");
  };

  const flipNext = () => {
    pageFlipRef.current?.flipNext("top");
  };

  return (
    <div className="relative">
      <div className="mb-3 flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3 overflow-x-auto whitespace-nowrap text-[10px] uppercase tracking-[0.22em] text-muted [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <span className="shrink-0">
            {language === "en" ? "Magazine reader" : "Reader majalah"}
          </span>

          <span className="h-px w-7 shrink-0 bg-stroke" />

          <span className="shrink-0">
            {String(Math.floor(currentPage / 2) + 1).padStart(2, "0")} /{" "}
            {String(Math.ceil(collection.images.length / 2)).padStart(2, "0")}
          </span>

          <span className="h-px w-7 shrink-0 bg-stroke" />

          <span className="shrink-0 normal-case tracking-normal">
            {language === "en"
              ? "Drag an outer corner to flip."
              : "Tarik sudut luar untuk membalik."}
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <RoundButton
            label={language === "en" ? "Previous page" : "Halaman sebelumnya"}
            onClick={flipPrevious}
          >
            <ChevronLeft className="h-4 w-4" />
          </RoundButton>
          <RoundButton
            label={language === "en" ? "Next page" : "Halaman berikutnya"}
            onClick={flipNext}
          >
            <ChevronRight className="h-4 w-4" />
          </RoundButton>
        </div>
      </div>

      <div className="relative overflow-hidden border-y border-stroke py-3 md:py-4">
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute bottom-1 left-1/2 h-12 w-[68%] -translate-x-1/2 rounded-full blur-[36px] ${
            isDark ? "bg-black/65" : "bg-black/14"
          }`}
        />

        <div className="relative mx-auto flex max-w-[1240px] items-start justify-center overflow-visible px-0 py-2 md:py-3">
          <style>{`
            .real-flipbook-host {
              margin: 0 auto;
              touch-action: none;
              user-select: none;
              -webkit-user-select: none;
              filter: drop-shadow(
                0 30px 32px ${
                  isDark ? "rgba(0,0,0,0.42)" : "rgba(17,17,17,0.18)"
                }
              );
            }

            .real-flipbook-host .stf__parent,
            .real-flipbook-host .stf__wrapper {
              overflow: visible !important;
            }

            .real-flipbook-page {
              box-sizing: border-box;
              overflow: hidden;
              border-radius: 12px;
              background: ${isDark ? "#111113" : "#ffffff"};
              box-shadow: inset 0 0 0 1px ${
                isDark ? "rgba(255,255,255,0.08)" : "rgba(17,17,17,0.08)"
              };
            }

            .real-flipbook-page::after {
              content: "";
              position: absolute;
              inset: 0;
              pointer-events: none;
              border-radius: inherit;
              background:
                linear-gradient(
                  90deg,
                  rgba(0,0,0,0.1),
                  transparent 7%,
                  transparent 93%,
                  rgba(0,0,0,0.06)
                ),
                linear-gradient(
                  180deg,
                  rgba(255,255,255,0.04),
                  transparent 18%,
                  transparent 82%,
                  rgba(0,0,0,0.04)
                );
              mix-blend-mode: multiply;
            }

            .real-flipbook-page img {
              display: block;
              width: 100%;
              height: 100%;
              object-fit: contain;
              border-radius: inherit;
              background: #ffffff;
            }
          `}</style>

          {!isBookReady && !bookError && (
            <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <BookOpen className="mx-auto h-6 w-6 animate-pulse text-muted" />
                <p className="mt-3 text-xs text-muted">
                  {language === "en"
                    ? "Preparing the book…"
                    : "Menyiapkan buku…"}
                </p>
              </div>
            </div>
          )}

          {bookError && (
            <div className="absolute inset-0 z-30 flex items-center justify-center p-6">
              <div className="max-w-md text-center">
                <BookOpen className="mx-auto h-6 w-6 text-muted" />
                <p className="mt-4 text-sm text-text-primary">{bookError}</p>
                <code className="mt-4 inline-block border-b border-stroke px-1 py-2 text-xs text-muted">
                  npm install page-flip@2.0.7
                </code>
              </div>
            </div>
          )}

          <div
            aria-hidden="true"
            className={`pointer-events-none absolute left-1/2 top-1/2 z-[1] hidden h-[72%] w-8 -translate-x-1/2 -translate-y-1/2 blur-2xl md:block ${
              isDark ? "bg-black/45" : "bg-black/12"
            }`}
          />

          <div
            ref={bookHostRef}
            className={`real-flipbook-host relative z-[2] transition-opacity duration-500 ${
              isBookReady ? "opacity-100" : "opacity-0"
            }`}
            aria-label={
              language === "en"
                ? "Interactive Ngadiharjo e-book"
                : "E-book Ngadiharjo interaktif"
            }
          >
            {collection.images.map((image, index) => (
              <div
                key={image.src}
                className="real-flipbook-page relative"
                data-density="soft"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading={index < 4 ? "eager" : "lazy"}
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4 md:w-[58%]">
          <div
            className={`h-px flex-1 overflow-hidden ${
              isDark ? "bg-white/10" : "bg-black/10"
            }`}
          >
            <motion.div
              className={isDark ? "h-full bg-white" : "h-full bg-black"}
              animate={{
                width: `${
                  ((Math.floor(currentPage / 2) + 1) /
                    Math.ceil(collection.images.length / 2)) *
                  100
                }%`,
              }}
              transition={{ duration: 0.35 }}
            />
          </div>

          <span className="font-display text-lg italic text-muted">
            {String(Math.ceil(collection.images.length / 2)).padStart(2, "0")}{" "}
            {language === "en" ? "spreads" : "spread"}
          </span>
        </div>

        <button
          type="button"
          onClick={() =>
            onOpen(
              collection.images,
              Math.min(currentPage, collection.images.length - 1),
              copy(collection.title),
            )
          }
          className="text-left text-xs text-muted transition hover:text-text-primary md:text-right"
        >
          {currentLabel} ·{" "}
          {language === "en" ? "Open fullscreen" : "Buka fullscreen"}
        </button>
      </div>
    </div>
  );
}

function CoverStudyGallery({
  collection,
  language,
  copy,
  isDark,
  onOpen,
}: {
  collection: Collection;
  language: Language;
  copy: (value: Bilingual) => string;
  isDark: boolean;
  onOpen: (images: GalleryImage[], index: number, title: string) => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = collection.images.length;

  const move = (direction: "prev" | "next") => {
    setActiveIndex((current) => {
      const offset = direction === "next" ? 1 : -1;
      return (current + offset + total) % total;
    });
  };

  const getCircularOffset = (index: number) => {
    const half = Math.floor(total / 2);
    return ((index - activeIndex + total + half) % total) - half;
  };

  return (
    <div className="relative">
      <div className="mb-6 flex items-center justify-between gap-5">
        <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-muted">
          <span>{language === "en" ? "Cover study" : "Eksplorasi sampul"}</span>
          <span className="h-px w-8 bg-stroke" />
          <span>
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <RoundButton
            label={language === "en" ? "Previous cover" : "Sampul sebelumnya"}
            onClick={() => move("prev")}
          >
            <ChevronLeft className="h-4 w-4" />
          </RoundButton>
          <RoundButton
            label={language === "en" ? "Next cover" : "Sampul berikutnya"}
            onClick={() => move("next")}
          >
            <ChevronRight className="h-4 w-4" />
          </RoundButton>
        </div>
      </div>

      <div className="relative min-h-[590px] overflow-hidden border-y border-stroke py-10">
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[170px] ${
            isDark ? "bg-white/[0.04]" : "bg-black/[0.03]"
          }`}
        />

        <div className="absolute inset-0 flex items-center justify-center">
          {collection.images.map((image, index) => {
            const offset = getCircularOffset(index);
            const distance = Math.abs(offset);
            const isVisible = distance <= 3;
            const x = offset * 155;
            const rotate = offset * 7;
            const scale = offset === 0 ? 1 : 0.84 - distance * 0.04;
            const opacity = offset === 0 ? 1 : 0.46 - distance * 0.08;

            return (
              <motion.button
                key={image.src}
                type="button"
                onClick={() => {
                  if (offset === 0) {
                    onOpen(collection.images, index, copy(collection.title));
                  } else {
                    setActiveIndex(index);
                  }
                }}
                animate={{
                  x,
                  y: distance * 18,
                  rotate: rotate,
                  scale,
                  opacity: isVisible ? Math.max(opacity, 0.16) : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 230,
                  damping: 28,
                }}
                className="absolute w-[230px] overflow-hidden rounded-[1.5rem] shadow-[0_28px_70px_rgba(0,0,0,0.22)] md:w-[290px]"
                style={{
                  zIndex: 20 - distance,
                  pointerEvents: isVisible ? "auto" : "none",
                }}
                aria-label={copy(image.label)}
              >
                <ImageWithFallback
                  image={image}
                  className="block h-auto w-full rounded-[1.5rem]"
                />
              </motion.button>
            );
          })}
        </div>

        <div className="absolute inset-x-0 bottom-7 flex flex-col items-center gap-4">
          <p className="text-sm text-text-primary">
            {copy(collection.images[activeIndex].label)}
          </p>

          <div className="flex items-center gap-2">
            {collection.images.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`${language === "en" ? "Open cover" : "Buka sampul"} ${index + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? isDark
                      ? "w-8 bg-white"
                      : "w-8 bg-black"
                    : isDark
                      ? "w-1.5 bg-white/25 hover:bg-white/50"
                      : "w-1.5 bg-black/20 hover:bg-black/45"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <p className="mt-5 text-center text-xs text-muted">
        {language === "en"
          ? "Select another cover, or open the centered design."
          : "Pilih sampul lain, atau buka desain yang berada di tengah."}
      </p>
    </div>
  );
}

function IdentityGallery({
  collection,
  copy,
  onOpen,
}: {
  collection: Collection;
  copy: (value: Bilingual) => string;
  onOpen: (images: GalleryImage[], index: number, title: string) => void;
}) {
  const [activeSymbol, setActiveSymbol] = useState(0);
  const [activeGuide, setActiveGuide] = useState(0);

  const facts: Bilingual[] = [
    { en: "UNESCO × SV IPB", id: "UNESCO × SV IPB" },
    { en: "Jan—Jun 2022", id: "Jan—Jun 2022" },
    { en: "600 m from Borobudur", id: "600 m dari Borobudur" },
    { en: "9 hamlets", id: "9 dusun" },
    { en: "Gen Z · 16—25", id: "Gen Z · 16—25" },
    { en: "Culture + craft village", id: "Desa budaya + kriya" },
    { en: "A5 editorial e-book", id: "E-book editorial A5" },
  ];

  const researchStats: Array<{
    value: string;
    label: Bilingual;
  }> = [
    {
      value: "4,067",
      label: { en: "residents", id: "penduduk" },
    },
    {
      value: "1,292",
      label: { en: "households", id: "kepala keluarga" },
    },
    {
      value: "9",
      label: { en: "hamlets", id: "dusun" },
    },
    {
      value: "48K",
      label: { en: "domestic visitors · 2018", id: "wisatawan nusantara · 2018" },
    },
    {
      value: "9K",
      label: { en: "international visitors · 2018", id: "wisatawan mancanegara · 2018" },
    },
  ];

  const researchStreams: Array<{
    label: Bilingual;
    items: Bilingual[];
  }> = [
    {
      label: { en: "Tourism", id: "Wisata" },
      items: [
        { en: "Candi Pawon", id: "Candi Pawon" },
        { en: "Progo River", id: "Sungai Progo" },
        { en: "Balkondes", id: "Balkondes" },
        { en: "Barepan Park", id: "Taman Barepan" },
        { en: "Umbul Tirta", id: "Umbul Tirta" },
        { en: "Nitihardja Pavilion", id: "Pendopo Nitihardja" },
      ],
    },
    {
      label: { en: "Craft", id: "Kriya" },
      items: [
        { en: "Batik", id: "Batik" },
        { en: "Bamboo", id: "Bambu" },
        { en: "Sculpture", id: "Patung" },
        { en: "Ornaments", id: "Ornamen" },
        { en: "Wood craft", id: "Kerajinan kayu" },
        { en: "Household industries", id: "Industri rumah tangga" },
      ],
    },
    {
      label: { en: "Culture", id: "Budaya" },
      items: [
        { en: "Jatilan", id: "Jatilan" },
        { en: "Topeng Ireng", id: "Topeng Ireng" },
        { en: "Kobro Siswo", id: "Kobro Siswo" },
        { en: "Angklung", id: "Angklung" },
        { en: "Traditional dance", id: "Tari tradisional" },
        { en: "Community performance", id: "Pertunjukan rakyat" },
      ],
    },
  ];

  const strategyBeats: Array<{
    number: string;
    label: Bilingual;
    headline: Bilingual;
    detail: Bilingual;
  }> = [
    {
      number: "01",
      label: { en: "Problem", id: "Masalah" },
      headline: {
        en: "Borobudur was known. Wanurejo was not.",
        id: "Borobudur dikenal. Wanurejo belum.",
      },
      detail: {
        en: "Young visitors recognised the temple, but not the surrounding village experience.",
        id: "Pengunjung muda mengenal candinya, tetapi belum mengenal pengalaman desa di sekitarnya.",
      },
    },
    {
      number: "02",
      label: { en: "Goal", id: "Tujuan" },
      headline: {
        en: "Inform first. Persuade next.",
        id: "Informasikan dulu. Ajak kemudian.",
      },
      detail: {
        en: "Show tourism, nature, culture, and craft—then motivate visits and cultural preservation.",
        id: "Tampilkan wisata, alam, budaya, dan kriya—lalu dorong kunjungan serta pelestarian budaya.",
      },
    },
    {
      number: "03",
      label: { en: "Message", id: "Pesan" },
      headline: {
        en: "Borobudur is more than the temple.",
        id: "Borobudur lebih luas dari sekadar candi.",
      },
      detail: {
        en: "Wanurejo offers nature, learning, craft, community, and local stories within the same journey.",
        id: "Wanurejo menawarkan alam, pembelajaran, kriya, masyarakat, dan cerita lokal dalam satu perjalanan.",
      },
    },
    {
      number: "04",
      label: { en: "Tone", id: "Gaya" },
      headline: {
        en: "Photo-led. Story-like. Never monotonous.",
        id: "Berbasis foto. Bercerita. Tidak monoton.",
      },
      detail: {
        en: "Tourism photography meets a light novel/comic rhythm for a younger audience.",
        id: "Fotografi wisata dipadukan dengan ritme ringan seperti novel atau komik untuk audiens muda.",
      },
    },
    {
      number: "05",
      label: { en: "Output", id: "Luaran" },
      headline: {
        en: "One identity across print and digital.",
        id: "Satu identitas untuk cetak dan digital.",
      },
      detail: {
        en: "A5 e-book, logo system, social media, website, banners, signage, and business cards.",
        id: "E-book A5, sistem logo, media sosial, website, banner, signage, dan kartu nama.",
      },
    },
  ];

  const symbols: Array<{
    number: string;
    title: Bilingual;
    cue: Bilingual;
    meaning: Bilingual;
  }> = [
    {
      number: "01",
      title: { en: "Candi Pawon", id: "Candi Pawon" },
      cue: { en: "Cultural anchor", id: "Jangkar budaya" },
      meaning: {
        en: "The village landmark and strongest geographic identifier inside the logogram.",
        id: "Landmark desa sekaligus penanda geografis terkuat di dalam logogram.",
      },
    },
    {
      number: "02",
      title: { en: "Sun + sunset", id: "Matahari + senja" },
      cue: { en: "Warmth, peace, hope", id: "Hangat, damai, harapan" },
      meaning: {
        en: "The sun signals radiance and warmth; sunset adds beauty and calm.",
        id: "Matahari membawa kesan bersinar dan hangat; senja menambahkan keindahan serta kedamaian.",
      },
    },
    {
      number: "03",
      title: { en: "Three birds", id: "Tiga burung" },
      cue: { en: "Two rivers + Menoreh", id: "Dua sungai + Menoreh" },
      meaning: {
        en: "Two birds refer to the Progo and Sileng rivers; one refers to the Menoreh mountain range.",
        id: "Dua burung merujuk Sungai Progo dan Sileng; satu burung merujuk Pegunungan Menoreh.",
      },
    },
    {
      number: "04",
      title: { en: "Nine lines", id: "Sembilan garis" },
      cue: { en: "Nine hamlets", id: "Sembilan dusun" },
      meaning: {
        en: "A rhythmic field representing the nine hamlets that form Wanurejo.",
        id: "Bidang ritmis yang mewakili sembilan dusun pembentuk Wanurejo.",
      },
    },
  ];

  const palette: Array<{
    name: Bilingual;
    hex: string;
    rgb: string;
    cmyk: string;
    meaning: Bilingual;
  }> = [
    {
      name: { en: "Brown", id: "Cokelat" },
      hex: "#B96D00",
      rgb: "185 · 109 · 0",
      cmyk: "23 · 61 · 100 · 9",
      meaning: { en: "Retro · warm · secure", id: "Retro · hangat · aman" },
    },
    {
      name: { en: "Orange", id: "Jingga" },
      hex: "#D06900",
      rgb: "208 · 105 · 0",
      cmyk: "14 · 69 · 100 · 3",
      meaning: { en: "Creative · optimistic", id: "Kreatif · optimistis" },
    },
    {
      name: { en: "Yellow", id: "Kuning" },
      hex: "#E6A500",
      rgb: "230 · 165 · 0",
      cmyk: "10 · 37 · 100 · 0",
      meaning: { en: "Joy · prosperity", id: "Ceria · kejayaan" },
    },
    {
      name: { en: "Black", id: "Hitam" },
      hex: "#000000",
      rgb: "0 · 0 · 0",
      cmyk: "75 · 68 · 67 · 90",
      meaning: { en: "Elegant · exclusive", id: "Elegan · eksklusif" },
    },
    {
      name: { en: "White", id: "Putih" },
      hex: "#FFFFFF",
      rgb: "255 · 255 · 255",
      cmyk: "0 · 0 · 0 · 0",
      meaning: { en: "Pure · minimal", id: "Murni · minimalis" },
    },
  ];

  const guides: Array<{
    title: Bilingual;
    kicker: Bilingual;
    metrics: string[];
    lines: Bilingual[];
  }> = [
    {
      title: { en: "Anatomy", id: "Anatomi" },
      kicker: { en: "What makes the mark", id: "Pembentuk identitas" },
      metrics: ["Logogram", "Logotype", "Optional tagline"],
      lines: [
        {
          en: "Primary vertical lockup: symbol above, village name below.",
          id: "Lockup vertikal utama: simbol di atas, nama desa di bawah.",
        },
        {
          en: "Serif display lettering creates a luxurious, exclusive tone.",
          id: "Huruf serif display menghadirkan kesan mewah dan eksklusif.",
        },
      ],
    },
    {
      title: { en: "Construction", id: "Konstruksi" },
      kicker: { en: "Built to stay consistent", id: "Dibangun agar konsisten" },
      metrics: ["8 cm wide", "7 cm high", "Protected clear space"],
      lines: [
        {
          en: "Reproduce from the master grid; preserve every proportion.",
          id: "Reproduksi mengikuti grid utama; seluruh proporsi wajib dipertahankan.",
        },
        {
          en: "Keep surrounding objects outside the protected area.",
          id: "Jauhkan objek lain dari area perlindungan logo.",
        },
      ],
    },
    {
      title: { en: "Minimum size", id: "Ukuran minimum" },
      kicker: { en: "Small, but still readable", id: "Kecil, tetapi tetap terbaca" },
      metrics: ["4 cm · Print", "60 px · Screen"],
      lines: [
        {
          en: "Never reduce the complete vertical mark below the documented limit.",
          id: "Jangan mengecilkan tanda vertikal lengkap melewati batas panduan.",
        },
        {
          en: "Avoid stretching in Word, PowerPoint, or similar software.",
          id: "Hindari stretching di Word, PowerPoint, atau perangkat lunak sejenis.",
        },
      ],
    },
    {
      title: { en: "Versions", id: "Versi" },
      kicker: { en: "Adapt without losing identity", id: "Adaptif tanpa kehilangan identitas" },
      metrics: ["Vertical", "Horizontal", "Icon-only", "Colour", "Mono", "Grayscale"],
      lines: [
        {
          en: "Use the vertical full-colour logo as the default.",
          id: "Gunakan logo vertikal berwarna sebagai pilihan utama.",
        },
        {
          en: "Use alternate versions only for space or production constraints.",
          id: "Gunakan versi alternatif hanya karena keterbatasan ruang atau produksi.",
        },
      ],
    },
    {
      title: { en: "Do / Don't", id: "Boleh / Jangan" },
      kicker: { en: "Protect recognition", id: "Jaga daya kenal" },
      metrics: ["Keep ratio", "Keep colour", "Keep clear space"],
      lines: [
        {
          en: "Do: use legible solid backgrounds and approved variations.",
          id: "Boleh: gunakan latar solid yang terbaca dan variasi yang disetujui.",
        },
        {
          en: "Don't: distort, rotate, recolour, edit the name, add effects, or use busy backgrounds.",
          id: "Jangan: mendistorsi, memutar, mengganti warna, mengubah nama, menambah efek, atau memakai latar ramai.",
        },
      ],
    },
  ];

  const applications: Bilingual[] = [
    { en: "A5 e-book", id: "E-book A5" },
    { en: "Social media", id: "Media sosial" },
    { en: "Website", id: "Website" },
    { en: "Street banner", id: "Banner jalan" },
    { en: "Roll-up display", id: "Roll-up banner" },
    { en: "Business card", id: "Kartu nama" },
    { en: "Tourism signage", id: "Signage wisata" },
  ];

  const sheetLinks = [
    { index: 1, label: { en: "Symbol sheet", id: "Lembar simbol" } },
    { index: 0, label: { en: "Colour sheet", id: "Lembar warna" } },
    { index: 2, label: { en: "Type sheet", id: "Lembar tipografi" } },
    { index: 3, label: { en: "Application sheet", id: "Lembar penerapan" } },
  ];

  return (
    <div className="wanurejo-kinetic relative mx-auto max-w-[1160px] border-y border-stroke">
      <style>{`
        @keyframes wanurejoMarquee {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-50%, 0, 0); }
        }

        @keyframes wanurejoMarqueeReverse {
          from { transform: translate3d(-50%, 0, 0); }
          to { transform: translate3d(0, 0, 0); }
        }

        .wanurejo-kinetic:hover .wanurejo-marquee {
          animation-play-state: paused;
        }
      `}</style>

      <section className="py-10 md:py-14">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[2rem] border border-stroke bg-surface/75 p-6 backdrop-blur-xl md:p-9"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#D06900]/10 blur-[110px]"
          />

          <div className="relative grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-center">
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-[0.27em] text-muted">
                {copy({
                  en: "Wanurejo identity · quick overview",
                  id: "Identitas Wanurejo · ringkasan cepat",
                })}
              </p>

              <h3 className="mt-4 max-w-4xl text-[clamp(2.4rem,5vw,4.6rem)] leading-[0.96] tracking-[-0.055em] text-text-primary">
                <span className="block">
                  {copy({
                    en: "600 m from Borobudur.",
                    id: "600 m dari Borobudur.",
                  })}
                </span>
                <span className="block font-display font-normal italic text-muted">
                  {copy({
                    en: "9 hamlets. One identity.",
                    id: "9 dusun. Satu identitas.",
                  })}
                </span>
              </h3>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-muted md:text-[15px]">
                {copy({
                  en: "A tourism identity that turns culture, craft, landscape, and community into one recognisable village mark.",
                  id: "Identitas wisata yang mengubah budaya, kriya, lanskap, dan masyarakat menjadi satu tanda desa yang mudah dikenali.",
                })}
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                onOpen(collection.images, 3, copy(collection.title))
              }
              className="group mx-auto block w-full max-w-[210px]"
              aria-label={copy({
                en: "Open Wanurejo application",
                id: "Buka penerapan Wanurejo",
              })}
            >
              <ImageWithFallback
                image={collection.images[3]}
                className="block h-auto w-full rounded-[1.5rem] shadow-[0_24px_58px_rgba(0,0,0,0.17)] transition duration-500 group-hover:-translate-y-1 group-hover:scale-[1.02]"
              />
            </button>
          </div>
        </motion.div>
      </section>

      <div className="overflow-hidden border-y border-stroke py-4">
        <div
          className="wanurejo-marquee flex w-max"
          style={{ animation: "wanurejoMarquee 30s linear infinite" }}
        >
          {[0, 1].map((loop) => (
            <div
              key={loop}
              className="flex shrink-0 items-center"
              aria-hidden={loop === 1 ? true : undefined}
            >
              {facts.map((fact, index) => (
                <div
                  key={`${loop}-${index}`}
                  className="flex shrink-0 items-center gap-4 px-5 text-[10px] uppercase tracking-[0.2em] text-muted md:px-7"
                >
                  <span>{copy(fact)}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D06900]" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section className="border-b border-stroke py-11 md:py-14">
        <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(260px,0.7fr)] md:items-end">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-[0.25em] text-muted">
              01 · {copy({ en: "Research", id: "Riset" })}
            </p>
            <h3 className="mt-3 text-[clamp(2rem,4vw,3.35rem)] leading-[1] tracking-[-0.045em] text-text-primary">
              {copy({
                en: "The place behind the mark.",
                id: "Tempat di balik logo.",
              })}
            </h3>
          </div>

          <p className="min-w-0 text-sm leading-7 text-muted md:text-[15px]">
            {copy({
              en: "A fertile cultural-and-craft village shaped by Menoreh, two rivers, and the Borobudur tourism ecosystem.",
              id: "Desa budaya dan kriya yang subur, dibentuk oleh Menoreh, dua sungai, dan ekosistem wisata Borobudur.",
            })}
          </p>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {researchStats.map((stat, index) => (
            <motion.div
              key={copy(stat.label)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className="min-w-0 rounded-[1.4rem] border border-stroke bg-surface/70 p-5"
            >
              <span className="font-display text-3xl italic text-text-primary md:text-4xl">
                {stat.value}
              </span>
              <p className="mt-2 break-words text-[10px] uppercase leading-5 tracking-[0.16em] text-muted">
                {copy(stat.label)}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {researchStreams.map((stream, streamIndex) => (
            <motion.div
              key={copy(stream.label)}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: streamIndex * 0.07 }}
              className="min-w-0 rounded-[1.5rem] border border-stroke bg-surface/45 p-5"
            >
              <p className="text-[10px] uppercase tracking-[0.22em] text-muted">
                {copy(stream.label)}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {stream.items.map((item) => (
                  <span
                    key={copy(item)}
                    className="max-w-full rounded-full border border-stroke px-3 py-1.5 text-xs leading-5 text-text-primary"
                  >
                    {copy(item)}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="border-b border-stroke py-11 md:py-14">
        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(260px,0.62fr)] md:items-end">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-[0.25em] text-muted">
              02 · {copy({ en: "Brand strategy", id: "Strategi merek" })}
            </p>

            <h3 className="mt-3 text-[clamp(2rem,4vw,3.35rem)] leading-[1] tracking-[-0.045em] text-text-primary">
              {copy({
                en: "Five decisions. One clear direction.",
                id: "Lima keputusan. Satu arah yang jelas.",
              })}
            </h3>
          </div>

          <p className="max-w-md text-sm leading-7 text-muted md:justify-self-end md:text-[15px]">
            {copy({
              en: "A quick strategy map—from the awareness problem to one consistent identity system.",
              id: "Peta strategi singkat—dari masalah awareness menuju satu sistem identitas yang konsisten.",
            })}
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-12">
          {strategyBeats.map((beat, index) => {
            const span =
              index === 0 || index === 1
                ? "lg:col-span-6"
                : index === 2
                  ? "lg:col-span-5"
                  : index === 3
                    ? "lg:col-span-4"
                    : "lg:col-span-3";

            return (
              <motion.article
                key={beat.number}
                initial={{ opacity: 0, y: 18, scale: 0.985 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.46,
                  delay: index * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -4 }}
                className={`group relative min-h-[230px] min-w-0 overflow-hidden rounded-[1.6rem] border border-stroke bg-surface/65 p-5 md:p-6 ${span}`}
              >
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-12 -top-14 h-36 w-36 rounded-full bg-[#D06900]/10 blur-2xl"
                  animate={{
                    scale: [1, 1.12, 1],
                    opacity: [0.4, 0.8, 0.4],
                  }}
                  transition={{
                    duration: 4.5 + index * 0.25,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                <div className="relative flex h-full min-w-0 flex-col">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-display text-xl italic text-muted">
                      {beat.number}
                    </span>

                    <span className="rounded-full border border-stroke px-3 py-1 text-[9px] uppercase tracking-[0.17em] text-muted">
                      {copy(beat.label)}
                    </span>
                  </div>

                  <h4 className="mt-8 max-w-[25rem] break-words text-xl leading-[1.16] tracking-[-0.03em] text-text-primary md:text-2xl">
                    {copy(beat.headline)}
                  </h4>

                  <p className="mt-4 max-w-[29rem] break-words text-sm leading-7 text-muted">
                    {copy(beat.detail)}
                  </p>

                  <motion.div
                    className="mt-auto flex items-center gap-3 pt-7"
                    initial="rest"
                    whileHover="hover"
                  >
                    <motion.span
                      variants={{
                        rest: { width: 24 },
                        hover: { width: 64 },
                      }}
                      className="h-px bg-[#D06900]"
                    />
                    <ArrowUpRight className="h-4 w-4 text-[#D06900] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </motion.div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="border-b border-stroke py-11 md:py-14">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-[0.25em] text-muted">
              03 · {copy({ en: "Logo meaning", id: "Makna logo" })}
            </p>
            <h3 className="mt-3 text-[clamp(2rem,4vw,3.35rem)] leading-[1] tracking-[-0.045em] text-text-primary">
              {copy({
                en: "Four symbols. One place story.",
                id: "Empat simbol. Satu cerita tempat.",
              })}
            </h3>
          </div>

          <button
            type="button"
            onClick={() =>
              onOpen(collection.images, 1, copy(collection.title))
            }
            className="group inline-flex shrink-0 items-center gap-2 text-xs text-text-primary"
          >
            {copy({ en: "Original symbol sheet", id: "Lembar simbol asli" })}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>
        </div>

        <div className="mt-8 overflow-hidden rounded-[1.8rem] border border-stroke bg-surface/60">
          <div className="grid min-w-0 lg:grid-cols-[0.82fr_1.18fr]">
            <div className="border-b border-stroke p-3 lg:border-b-0 lg:border-r">
              {symbols.map((symbol, index) => {
                const isActive = activeSymbol === index;

                return (
                  <button
                    key={symbol.number}
                    type="button"
                    onClick={() => setActiveSymbol(index)}
                    className={`grid w-full min-w-0 grid-cols-[42px_minmax(0,1fr)_24px] items-center gap-3 rounded-[1rem] px-3 py-4 text-left transition ${
                      isActive
                        ? "bg-surface text-text-primary"
                        : "text-muted hover:bg-surface/60 hover:text-text-primary"
                    }`}
                  >
                    <span className="font-display text-lg italic">
                      {symbol.number}
                    </span>
                    <span className="min-w-0 break-words text-base tracking-[-0.02em] md:text-lg">
                      {copy(symbol.title)}
                    </span>
                    <motion.span
                      animate={{ scale: isActive ? 1 : 0.55 }}
                      className={`h-2.5 w-2.5 rounded-full ${
                        isActive ? "bg-[#D06900]" : "bg-stroke"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <div className="relative min-h-[330px] min-w-0 overflow-hidden p-6 md:p-9">
              <motion.div
                key={activeSymbol}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 max-w-xl"
              >
                <p className="text-[10px] uppercase tracking-[0.22em] text-muted">
                  {copy(symbols[activeSymbol].cue)}
                </p>

                <h4 className="mt-4 break-words text-3xl leading-[1] tracking-[-0.045em] text-text-primary md:text-4xl">
                  {copy(symbols[activeSymbol].title)}
                </h4>

                <p className="mt-5 break-words text-sm leading-7 text-muted md:text-base md:leading-8">
                  {copy(symbols[activeSymbol].meaning)}
                </p>
              </motion.div>

              <motion.span
                aria-hidden="true"
                animate={{ x: [0, 10, 0], y: [0, -8, 0] }}
                transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
                className="pointer-events-none absolute bottom-5 right-7 font-display text-[7rem] italic leading-none text-[#D06900]/10 md:text-[10rem]"
              >
                {symbols[activeSymbol].number}
              </motion.span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-stroke py-11 md:py-14">
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-muted">
            04 · {copy({ en: "Colour system", id: "Sistem warna" })}
          </p>
          <h3 className="mt-3 text-[clamp(2rem,4vw,3.35rem)] leading-[1] tracking-[-0.045em] text-text-primary">
            {copy({
              en: "Warm, cultural, optimistic.",
              id: "Hangat, kultural, optimistis.",
            })}
          </h3>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {palette.map((color, index) => (
            <motion.button
              key={color.hex}
              type="button"
              onClick={() =>
                onOpen(collection.images, 0, copy(collection.title))
              }
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.055 }}
              className="group min-w-0 overflow-hidden rounded-[1.4rem] border border-stroke bg-surface text-left"
            >
              <motion.div
                className="h-24 w-full"
                style={{ backgroundColor: color.hex }}
                whileHover={{ height: 118 }}
                transition={{ duration: 0.28 }}
              />

              <div className="min-w-0 p-4">
                <div className="flex min-w-0 items-center justify-between gap-3">
                  <p className="truncate text-sm text-text-primary">
                    {copy(color.name)}
                  </p>
                  <span className="shrink-0 font-mono text-[10px] text-muted">
                    {color.hex}
                  </span>
                </div>

                <p className="mt-3 break-words text-xs leading-5 text-muted">
                  {copy(color.meaning)}
                </p>

                <div className="mt-4 border-t border-stroke pt-3 font-mono text-[9px] leading-5 text-muted">
                  <span className="block">RGB {color.rgb}</span>
                  <span className="block">CMYK {color.cmyk}</span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      <section className="border-b border-stroke py-11 md:py-14">
        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(260px,0.65fr)] md:items-end">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-[0.25em] text-muted">
              05 · {copy({ en: "Identity system", id: "Sistem identitas" })}
            </p>

            <h3 className="mt-3 text-[clamp(2rem,4vw,3.35rem)] leading-[1] tracking-[-0.045em] text-text-primary">
              {copy({
                en: "Rules that protect recognition.",
                id: "Aturan yang menjaga daya kenal.",
              })}
            </h3>
          </div>

          <p className="text-sm leading-7 text-muted md:text-[15px]">
            {copy({
              en: "Select one guideline. Only its most important measurements and rules appear below.",
              id: "Pilih satu panduan. Hanya ukuran dan aturan terpenting yang ditampilkan di bawah.",
            })}
          </p>
        </div>

        <div className="mt-8 border-y border-stroke">
          <div className="flex gap-1 overflow-x-auto border-b border-stroke py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {guides.map((guide, index) => (
              <button
                key={copy(guide.title)}
                type="button"
                onClick={() => setActiveGuide(index)}
                className={`relative shrink-0 px-4 py-3 text-xs transition ${
                  activeGuide === index
                    ? "text-text-primary"
                    : "text-muted hover:text-text-primary"
                }`}
              >
                <span className="mr-2 font-display italic text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {copy(guide.title)}

                {activeGuide === index && (
                  <motion.span
                    layoutId="wanurejo-guide-indicator"
                    className="absolute inset-x-4 bottom-0 h-px bg-[#D06900]"
                  />
                )}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeGuide}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.32 }}
              className="grid min-w-0 gap-8 py-9 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12"
            >
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-[0.22em] text-muted">
                  {copy(guides[activeGuide].kicker)}
                </p>

                <h4 className="mt-3 break-words text-3xl leading-[1] tracking-[-0.045em] text-text-primary md:text-4xl">
                  {copy(guides[activeGuide].title)}
                </h4>

                <div className="mt-7 space-y-3">
                  {guides[activeGuide].metrics.map((metric, index) => (
                    <motion.div
                      key={metric}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.055 }}
                      className="grid min-w-0 grid-cols-[34px_minmax(0,1fr)] items-start gap-3 border-t border-stroke py-3"
                    >
                      <span className="font-display text-sm italic text-muted">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="break-words text-sm leading-6 text-text-primary">
                        {metric}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="min-w-0 lg:border-l lg:border-stroke lg:pl-10">
                {guides[activeGuide].lines.map((line, index) => (
                  <motion.div
                    key={copy(line)}
                    initial={{ opacity: 0, x: 14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + index * 0.07 }}
                    className={`grid min-w-0 grid-cols-[34px_minmax(0,1fr)] gap-3 py-5 ${
                      index < guides[activeGuide].lines.length - 1
                        ? "border-b border-stroke"
                        : ""
                    }`}
                  >
                    <span className="mt-2 h-2 w-2 rounded-full bg-[#D06900]" />
                    <p className="break-words text-sm leading-7 text-muted md:text-[15px] md:leading-8">
                      {copy(line)}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <section className="py-11 md:py-14">
        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(260px,0.65fr)] md:items-end">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-[0.25em] text-muted">
              06 · {copy({ en: "Applications", id: "Penerapan" })}
            </p>

            <h3 className="mt-3 text-[clamp(2rem,4vw,3.35rem)] leading-[1] tracking-[-0.045em] text-text-primary">
              {copy({
                en: "One mark. Many touchpoints.",
                id: "Satu tanda. Banyak media.",
              })}
            </h3>
          </div>

          <p className="text-sm leading-7 text-muted md:text-[15px]">
            {copy({
              en: "Editorial, digital, environmental, and promotional use—without changing the core identity.",
              id: "Penggunaan editorial, digital, lingkungan, dan promosi—tanpa mengubah identitas utama.",
            })}
          </p>
        </div>

        <div className="mt-8 border-y border-stroke">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3">
            {applications.map((application, index) => (
              <motion.div
                key={copy(application)}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.045 }}
                className={`group grid min-h-[118px] min-w-0 grid-cols-[42px_minmax(0,1fr)_24px] items-center gap-3 border-b border-stroke py-5 ${
                  index % 2 === 1 ? "sm:border-l sm:pl-5" : "sm:pr-5"
                } ${
                  index % 3 !== 0 ? "lg:border-l lg:pl-5" : "lg:border-l-0 lg:pl-0"
                } lg:pr-5`}
              >
                <span className="font-display text-lg italic text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="min-w-0 break-words text-lg leading-[1.2] tracking-[-0.02em] text-text-primary md:text-xl">
                  {copy(application)}
                </span>

                <ArrowUpRight className="h-4 w-4 text-[#D06900] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-7 flex flex-col gap-5 border-t border-stroke pt-6 md:flex-row md:items-center md:justify-between">
          <p className="max-w-lg text-xs leading-6 text-muted">
            {copy({
              en: "Open the original project sheets when you need the complete visual documentation.",
              id: "Buka lembar proyek asli ketika membutuhkan dokumentasi visual lengkap.",
            })}
          </p>

          <div className="flex flex-wrap gap-x-5 gap-y-3">
            {sheetLinks.map((sheet, index) => (
              <button
                key={copy(sheet.label)}
                type="button"
                onClick={() =>
                  onOpen(
                    collection.images,
                    sheet.index,
                    copy(collection.title),
                  )
                }
                className="group inline-flex min-w-0 items-center gap-2 text-xs text-text-primary"
              >
                <span className="font-display italic text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="break-words">{copy(sheet.label)}</span>
                <ArrowUpRight className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function PosterGallery({
  collection,
  language,
  copy,
  onOpen,
}: {
  collection: Collection;
  language: Language;
  copy: (value: Bilingual) => string;
  onOpen: (images: GalleryImage[], index: number, title: string) => void;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <div className="mb-5 flex items-center justify-between gap-5">
        <p className="text-xs text-muted">
          {language === "en" ? "Scroll to compare the complete set." : "Geser untuk membandingkan seluruh karya."}
        </p>
        <div className="flex gap-2">
          <RoundButton
            label="Previous works"
            onClick={() => scrollerRef.current?.scrollBy({ left: -420, behavior: "smooth" })}
          >
            <ArrowLeft className="h-4 w-4" />
          </RoundButton>
          <RoundButton
            label="Next works"
            onClick={() => scrollerRef.current?.scrollBy({ left: 420, behavior: "smooth" })}
          >
            <ArrowRight className="h-4 w-4" />
          </RoundButton>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory items-start gap-4 overflow-x-auto border-y border-stroke py-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {collection.images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => onOpen(collection.images, index, copy(collection.title))}
            className="group w-[280px] shrink-0 snap-center md:w-[340px]"
          >
            <ImageWithFallback
              image={image}
              className="block h-auto w-full rounded-[1.55rem] border border-stroke bg-white shadow-[0_18px_38px_rgba(0,0,0,0.13)] transition duration-500 group-hover:-translate-y-2"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

function RoundButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-transparent text-muted transition hover:border-text-primary hover:text-text-primary"
    >
      {children}
    </button>
  );
}

function Lightbox({
  state,
  language,
  copy,
  onClose,
  onMove,
}: {
  state: LightboxState;
  language: Language;
  copy: (value: Bilingual) => string;
  onClose: () => void;
  onMove: (direction: "prev" | "next") => void;
}) {
  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {state && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/94 p-4 backdrop-blur-xl md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={state.title}
            initial={{ opacity: 0, y: 20, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.99 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onMouseDown={(event) => event.stopPropagation()}
            className="relative flex max-h-[94vh] w-full max-w-[1480px] flex-col overflow-hidden border border-white/15 bg-[#080808]"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 md:px-7">
              <div className="min-w-0">
                <p className="text-[9px] uppercase tracking-[0.28em] text-white/35">
                  {state.title}
                </p>
                <p className="mt-1 truncate text-sm text-white/80">
                  {copy(state.images[state.index].label)}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label={language === "en" ? "Close preview" : "Tutup pratinjau"}
                className="flex h-10 w-10 items-center justify-center border border-white/15 text-white/65 transition hover:border-white/40 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-auto bg-black p-3 md:p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={state.images[state.index].src}
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -18 }}
                  transition={{ duration: 0.26 }}
                  className="flex h-full w-full items-center justify-center"
                >
                  <ImageWithFallback
                    image={state.images[state.index]}
                    className="block max-h-[78vh] max-w-full object-contain"
                  />
                </motion.div>
              </AnimatePresence>

              {state.images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => onMove("prev")}
                    aria-label="Previous image"
                    className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/15 bg-black/60 text-white/75 backdrop-blur-md transition hover:border-white/40 hover:text-white md:left-6"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onMove("next")}
                    aria-label="Next image"
                    className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/15 bg-black/60 text-white/75 backdrop-blur-md transition hover:border-white/40 hover:text-white md:right-6"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-white/10 px-5 py-4 md:px-7">
              <span className="text-xs text-white/35">
                {language === "en" ? "Press Esc to close" : "Tekan Esc untuk menutup"}
              </span>
              <span className="font-display text-lg italic text-white/65">
                {String(state.index + 1).padStart(2, "0")}
                <span className="mx-2 text-white/25">/</span>
                {String(state.images.length).padStart(2, "0")}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

function ImageWithFallback({
  image,
  className,
}: {
  image: GalleryImage;
  className: string;
}) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [image.src]);

  if (hasError) {
    return (
      <div
        className={`flex min-h-48 items-center justify-center rounded-[1.45rem] border border-stroke bg-surface/70 p-6 backdrop-blur-xl ${className}`}
      >
        <div className="max-w-sm text-center">
          <ImageIcon className="mx-auto h-5 w-5 text-muted" />
          <p className="mt-3 text-xs text-muted">Preview unavailable</p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={image.src}
      alt={image.alt}
      loading="lazy"
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
          : { opacity: 0, y: 22 }
      }
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}