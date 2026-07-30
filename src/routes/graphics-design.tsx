import { createFileRoute } from "@tanstack/react-router";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
  Maximize2,
  Pause,
  Play,
  Sparkles,
  X,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";

import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useTheme } from "@/components/theme/ThemeProvider";

export const Route = createFileRoute("/graphics-design")({
  component: GraphicsDesignPage,
});

type GalleryImage = {
  src: string;
  alt: string;
  label: string;
};

type LightboxState = {
  images: GalleryImage[];
  index: number;
  title: string;
} | null;

const SHARE_STORIES: GalleryImage[] = Array.from(
  { length: 12 },
  (_, index) => ({
    src: `/images/graphics-design/share-story/template-${String(
      index + 1,
    ).padStart(2, "0")}.png`,
    alt: `Share story template ${index + 1}`,
    label: `Template ${String(index + 1).padStart(2, "0")}`,
  }),
);

const SINDONEWS_BANNERS: GalleryImage[] = Array.from(
  { length: 3 },
  (_, index) => ({
    src: `/images/graphics-design/sindonews-banner/banner-${String(
      index + 1,
    ).padStart(2, "0")}.png`,
    alt: `SINDOnews banner ${index + 1}`,
    label: `Banner ${String(index + 1).padStart(2, "0")}`,
  }),
);

const OKEZONE_BANNERS: GalleryImage[] = Array.from(
  { length: 4 },
  (_, index) => ({
    src: `/images/graphics-design/okezone-banner/banner-${String(
      index + 1,
    ).padStart(2, "0")}.png`,
    alt: `Okezone banner ${index + 1}`,
    label: `Banner ${String(index + 1).padStart(2, "0")}`,
  }),
);


const HOLIDAY_BANNERS: GalleryImage[] = [
  {
    src: "/images/graphics-design/holiday-banner/onestrike-idul-fitri.webp",
    alt: "One Strike Mall Idul Fitri greeting banner",
    label: "One Strike Mall · Idul Fitri",
  },
  {
    src: "/images/graphics-design/holiday-banner/onestrike-nyepi.webp",
    alt: "One Strike Mall Nyepi greeting banner",
    label: "One Strike Mall · Nyepi",
  },
  {
    src: "/images/graphics-design/holiday-banner/baba-nyepi.webp",
    alt: "Baba Airsoft Nyepi greeting banner",
    label: "Baba Airsoft · Nyepi",
  },
  {
    src: "/images/graphics-design/holiday-banner/baba-idul-fitri.webp",
    alt: "Baba Airsoft Idul Fitri greeting banner",
    label: "Baba Airsoft · Idul Fitri",
  },
];

const PRICELIST_FEEDS: GalleryImage[] = Array.from(
  { length: 3 },
  (_, index) => ({
    src: `/images/graphics-design/pricelist/feed-${String(
      index + 1,
    ).padStart(2, "0")}.png`,
    alt: `Resolusiweb price list feed ${index + 1}`,
    label: `Feed ${String(index + 1).padStart(2, "0")}`,
  }),
);

const GREETING_FEEDS: GalleryImage[] = Array.from(
  { length: 9 },
  (_, index) => ({
    src: `/images/graphics-design/greeting/feed-${String(
      index + 1,
    ).padStart(2, "0")}.png`,
    alt: `Resolusiweb greeting campaign ${index + 1}`,
    label: `Greeting ${String(index + 1).padStart(2, "0")}`,
  }),
);

const CALENDARS: GalleryImage[] = Array.from(
  { length: 6 },
  (_, index) => ({
    src: `/images/graphics-design/calendar/calendar-${String(
      index + 1,
    ).padStart(2, "0")}.png`,
    alt: `Resolusiweb calendar ${index + 1}`,
    label: `Calendar ${String(index + 1).padStart(2, "0")}`,
  }),
);

const BOBA_POSTERS: GalleryImage[] = Array.from(
  { length: 10 },
  (_, index) => ({
    src: `/images/graphics-design/boba/poster-${String(
      index + 1,
    ).padStart(2, "0")}.png`,
    alt: `Boba poster ${index + 1}`,
    label: `Poster ${String(index + 1).padStart(2, "0")}`,
  }),
);

const IPB_COVERS: GalleryImage[] = Array.from(
  { length: 7 },
  (_, index) => ({
    src: `/images/graphics-design/ipb-guide/cover-${String(
      index + 1,
    ).padStart(2, "0")}.png`,
    alt: `IPB internship guide cover ${index + 1}`,
    label: `Cover ${String(index + 1).padStart(2, "0")}`,
  }),
);

const SHOE_FEEDS: GalleryImage[] = Array.from(
  { length: 3 },
  (_, index) => ({
    src: `/images/graphics-design/shoe/feed-${String(
      index + 1,
    ).padStart(2, "0")}.png`,
    alt: `Shoe feed design ${index + 1}`,
    label: `Feed ${String(index + 1).padStart(2, "0")}`,
  }),
);

function GraphicsDesignPage() {
  const { isDark } = useTheme();
  const prefersReducedMotion = useReducedMotion();
  const [lightbox, setLightbox] = useState<LightboxState>(null);

  const openLightbox = (
    images: GalleryImage[],
    index: number,
    title: string,
  ) => {
    setLightbox({ images, index, title });
  };

  const moveLightbox = useCallback((direction: "prev" | "next") => {
    setLightbox((current) => {
      if (!current) return current;

      const delta = direction === "next" ? 1 : -1;

      return {
        ...current,
        index:
          (current.index + delta + current.images.length) %
          current.images.length,
      };
    });
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
    <div className="min-h-screen overflow-clip bg-bg text-text-primary">
      <header className="fixed inset-x-0 top-0 z-[80] px-4 pt-4 md:px-7 md:pt-6">
        <div
          className={`mx-auto flex max-w-[1440px] items-center justify-between rounded-full border border-stroke bg-surface/85 px-3 py-2 backdrop-blur-xl md:px-4 ${
            isDark
              ? "shadow-[0_16px_58px_rgba(0,0,0,0.56),inset_0_1px_0_rgba(255,255,255,0.07)]"
              : "shadow-[0_16px_50px_rgba(65,40,53,0.14),inset_0_1px_0_rgba(255,255,255,0.9)]"
          }`}
        >
          <a
            href="/#explorations"
            className="group inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs text-muted transition hover:bg-surface-elevated hover:text-text-primary"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to home
          </a>

          <span className="hidden text-[9px] uppercase tracking-[0.3em] text-muted sm:block">
            Graphic Design · Motion Archive
          </span>

          <ThemeToggle />
        </div>
      </header>

      <HeroSection prefersReducedMotion={Boolean(prefersReducedMotion)} />

      <main>
        <WanurejoSection onOpen={openLightbox} />

        <HorizontalStorySection onOpen={openLightbox} />

        <BannerShowcase
          number="03"
          eyebrow="SINDOnews · Website Banner"
          title="Daily quiz banners with three distinct visual directions."
          description="A slider-led presentation keeps the section compact while still making each banner feel like a headline moment."
          images={SINDONEWS_BANNERS}
          accent="cyan"
          onOpen={openLightbox}
        />

        <BannerShowcase
          number="04"
          eyebrow="Okezone · Website Banner"
          title="Four banner variants, presented as one interactive campaign."
          description="Instead of stacking all versions, visitors can move through the campaign one frame at a time."
          images={OKEZONE_BANNERS}
          accent="rose"
          reversed
          onOpen={openLightbox}
        />

        <HolidayBannerSection onOpen={openLightbox} />

        <PricelistSection onOpen={openLightbox} />

        <NgadiharjoSection onOpen={openLightbox} />

        <GreetingMarquee onOpen={openLightbox} />

        <CalendarDeck onOpen={openLightbox} />

        <BobaCarousel onOpen={openLightbox} />

        <CoverFan onOpen={openLightbox} />

        <ShoeTriptych onOpen={openLightbox} />
      </main>

      <Lightbox
        state={lightbox}
        onClose={() => setLightbox(null)}
        onMove={moveLightbox}
      />
    </div>
  );
}

function HeroSection({
  prefersReducedMotion,
}: {
  prefersReducedMotion: boolean;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 55, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 55, damping: 20 });

  const cardX = useTransform(springX, [-0.5, 0.5], [-18, 18]);
  const cardY = useTransform(springY, [-0.5, 0.5], [-12, 12]);

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (prefersReducedMotion) return;

    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section
      onPointerMove={handlePointerMove}
      className="relative flex min-h-[100svh] items-end overflow-hidden border-b border-stroke px-6 pb-16 pt-32 md:px-10 md:pb-20 lg:px-16"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_32%,rgba(236,72,153,0.2),transparent_34%)]" />
      <div className="pointer-events-none absolute -left-36 bottom-0 h-[34rem] w-[34rem] rounded-full bg-violet-500/[0.1] blur-[150px]" />

      <div className="relative mx-auto grid w-full max-w-[1320px] gap-14 xl:grid-cols-[0.78fr_1.22fr] xl:items-end">
        <motion.div
          initial={
            prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }
          }
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[10px] uppercase tracking-[0.34em] text-pink-400">
            Graphic Designer Portfolio
          </p>

          <h1 className="mt-6 text-[clamp(4rem,9vw,8rem)] leading-[0.85] tracking-[-0.075em] text-text-primary">
            Designed to
            <span className="font-display italic text-pink-300">
              {" "}
              move.
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-8 text-muted md:text-lg">
            An interactive archive of brand identities, editorial work,
            campaign systems, social templates, banners, posters, and
            publication design.
          </p>

          <a
            href="#wanurejo"
            className="group mt-9 inline-flex items-center gap-3 rounded-full border border-stroke bg-surface px-5 py-3 text-sm text-text-primary transition hover:-translate-y-1 hover:border-pink-400/40"
          >
            Explore the archive
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </motion.div>

        <motion.div
          style={prefersReducedMotion ? undefined : { x: cardX, y: cardY }}
          className="relative hidden min-h-[540px] xl:block"
        >
          <FloatingCard
            image="/images/graphics-design/wanurejo/mockup.png"
            className="left-[8%] top-[16%] w-[44%] -rotate-6"
            delay={0}
          />
          <FloatingCard
            image="/images/graphics-design/share-story/template-01.png"
            className="right-[7%] top-[4%] w-[26%] rotate-6"
            delay={0.12}
          />
          <FloatingCard
            image="/images/graphics-design/ngadiharjo/book-mockup.png"
            className="bottom-[4%] left-[21%] w-[48%] rotate-3"
            delay={0.24}
          />
          <FloatingCard
            image="/images/graphics-design/boba/poster-01.png"
            className="bottom-[10%] right-[3%] w-[26%] -rotate-4"
            delay={0.36}
          />
        </motion.div>
      </div>
    </section>
  );
}

function FloatingCard({
  image,
  className,
  delay,
}: {
  image: string;
  className: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute overflow-hidden rounded-[1.7rem] border border-stroke bg-surface shadow-[0_28px_85px_rgba(0,0,0,0.28)] ${className}`}
    >
      <img src={image} alt="" className="aspect-[4/3] w-full object-cover" />
    </motion.div>
  );
}

function WanurejoSection({
  onOpen,
}: {
  onOpen: (
    images: GalleryImage[],
    index: number,
    title: string,
  ) => void;
}) {
  const systemImages: GalleryImage[] = [
    {
      src: "/images/graphics-design/wanurejo/color-system.png",
      alt: "Wanurejo color system",
      label: "Color & Meaning",
    },
    {
      src: "/images/graphics-design/wanurejo/symbol-system.png",
      alt: "Wanurejo symbol system",
      label: "Symbol & Meaning",
    },
    {
      src: "/images/graphics-design/wanurejo/typography.png",
      alt: "Wanurejo typography",
      label: "Typography",
    },
    {
      src: "/images/graphics-design/wanurejo/mockup.png",
      alt: "Wanurejo identity mockup",
      label: "Identity Mockup",
    },
  ];

  return (
    <section
      id="wanurejo"
      className="relative overflow-hidden border-b border-stroke px-6 py-24 md:px-10 md:py-32 lg:px-16"
    >
      <div className="mx-auto max-w-[1320px]">
        <ProjectIntro
          number="01"
          eyebrow="Brand Identity"
          title="Wanurejo Village Identity"
          description="A brand system built through meaning, not decoration. The section moves from color and symbols to typography, then ends with a full-screen identity application."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-5">
            {systemImages.slice(0, 3).map((image, index) => (
              <motion.button
                key={image.src}
                type="button"
                onClick={() =>
                  onOpen(systemImages, index, "Wanurejo Village Identity")
                }
                initial={{ opacity: 0, x: -28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group grid gap-5 overflow-hidden rounded-[1.6rem] border border-stroke bg-surface p-4 text-left transition hover:-translate-y-1 md:grid-cols-[150px_1fr]"
              >
                <div className="aspect-square overflow-hidden rounded-[1.2rem] bg-surface-elevated">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                  />
                </div>

                <div className="flex flex-col justify-center">
                  <p className="text-[9px] uppercase tracking-[0.28em] text-pink-400">
                    Step {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 text-2xl tracking-[-0.03em] text-text-primary">
                    {image.label}
                  </h3>
                </div>
              </motion.button>
            ))}
          </div>

          <motion.button
            type="button"
            onClick={() =>
              onOpen(systemImages, 3, "Wanurejo Village Identity")
            }
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="group relative min-h-[580px] overflow-hidden rounded-[2rem] border border-stroke bg-surface"
          >
            <img
              src={systemImages[3].src}
              alt={systemImages[3].alt}
              className="h-full w-full object-cover transition duration-1000 group-hover:scale-[1.025]"
            />

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent px-7 pb-7 pt-24 text-left">
              <p className="text-[9px] uppercase tracking-[0.28em] text-pink-300">
                Final Application
              </p>
              <h3 className="mt-3 text-3xl text-white">
                Identity in the real world.
              </h3>
            </div>
          </motion.button>
        </div>
      </div>
    </section>
  );
}

function HorizontalStorySection({
  onOpen,
}: {
  onOpen: (
    images: GalleryImage[],
    index: number,
    title: string,
  ) => void;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: "left" | "right") => {
    scrollerRef.current?.scrollBy({
      left: direction === "right" ? 360 : -360,
      behavior: "smooth",
    });
  };

  return (
    <section className="border-b border-stroke py-24 md:py-32">
      <div className="mx-auto max-w-[1320px] px-6 md:px-10 lg:px-16">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <ProjectIntro
            number="02"
            eyebrow="Okezone + SINDOnews"
            title="Share Story Templates"
            description="Twelve Instagram Story variants displayed as a horizontal phone gallery rather than a heavy grid."
          />

          <div className="flex gap-2">
            <SliderButton
              label="Previous templates"
              onClick={() => scrollByCard("left")}
            >
              <ArrowLeft className="h-4 w-4" />
            </SliderButton>
            <SliderButton
              label="Next templates"
              onClick={() => scrollByCard("right")}
            >
              <ArrowRight className="h-4 w-4" />
            </SliderButton>
          </div>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-[max(1.5rem,calc((100vw-1320px)/2+4rem))] pb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {SHARE_STORIES.map((image, index) => (
          <motion.button
            key={image.src}
            type="button"
            onClick={() =>
              onOpen(SHARE_STORIES, index, "Share Story Templates")
            }
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.55,
              delay: Math.min(index * 0.04, 0.2),
              ease: [0.22, 1, 0.36, 1],
            }}
            className="group w-[260px] shrink-0 snap-center rounded-[2.8rem] border border-stroke bg-surface p-2.5 shadow-[0_25px_75px_rgba(0,0,0,0.22)] transition hover:-translate-y-2 md:w-[300px]"
          >
            <div className="relative aspect-[9/18] overflow-hidden rounded-[2.25rem] bg-black">
              <div className="absolute left-1/2 top-3 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-black" />
              <img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]"
              />
            </div>

            <p className="px-3 pb-2 pt-4 text-left text-xs text-muted">
              {image.label}
            </p>
          </motion.button>
        ))}
      </div>
    </section>
  );
}

function BannerShowcase({
  number,
  eyebrow,
  title,
  description,
  images,
  accent,
  reversed = false,
  onOpen,
}: {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  images: GalleryImage[];
  accent: "cyan" | "rose";
  reversed?: boolean;
  onOpen: (
    images: GalleryImage[],
    index: number,
    title: string,
  ) => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const accentText = accent === "cyan" ? "text-cyan-400" : "text-rose-400";

  const next = () =>
    setActiveIndex((current) => (current + 1) % images.length);

  const previous = () =>
    setActiveIndex(
      (current) => (current - 1 + images.length) % images.length,
    );

  return (
    <section className="border-b border-stroke px-6 py-24 md:px-10 md:py-32 lg:px-16">
      <div
        className={`mx-auto grid max-w-[1320px] gap-12 xl:grid-cols-2 xl:items-center ${
          reversed ? "xl:[&>*:first-child]:order-2" : ""
        }`}
      >
        <div>
          <p className={`text-[9px] uppercase tracking-[0.3em] ${accentText}`}>
            {number} · {eyebrow}
          </p>

          <h2 className="mt-4 max-w-2xl text-4xl leading-tight tracking-[-0.05em] text-text-primary md:text-6xl">
            {title}
          </h2>

          <p className="mt-6 max-w-xl text-sm leading-7 text-muted md:text-base">
            {description}
          </p>

          <div className="mt-8 flex items-center gap-3">
            <SliderButton label="Previous banner" onClick={previous}>
              <ChevronLeft className="h-4 w-4" />
            </SliderButton>

            <span className="font-display text-xl italic text-muted">
              {String(activeIndex + 1).padStart(2, "0")}
              <span className="mx-2 text-stroke">/</span>
              {String(images.length).padStart(2, "0")}
            </span>

            <SliderButton label="Next banner" onClick={next}>
              <ChevronRight className="h-4 w-4" />
            </SliderButton>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-8 rounded-[2rem] bg-pink-500/10 blur-3xl" />

          <AnimatePresence mode="wait">
            <motion.button
              key={images[activeIndex].src}
              type="button"
              onClick={() => onOpen(images, activeIndex, title)}
              initial={{ opacity: 0, x: reversed ? -36 : 36, rotate: 1 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              exit={{ opacity: 0, x: reversed ? 36 : -36, rotate: -1 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative block w-full overflow-hidden rounded-[2rem] border border-stroke bg-surface p-3 shadow-[0_30px_90px_rgba(0,0,0,0.25)]"
            >
              <img
                src={images[activeIndex].src}
                alt={images[activeIndex].alt}
                className="aspect-[16/7] w-full rounded-[1.4rem] object-cover"
              />
            </motion.button>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function HolidayBannerSection({
  onOpen,
}: {
  onOpen: (
    images: GalleryImage[],
    index: number,
    title: string,
  ) => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setActiveIndex((current) => (current + 1) % HOLIDAY_BANNERS.length);
  }, []);

  const previous = () => {
    setActiveIndex(
      (current) =>
        (current - 1 + HOLIDAY_BANNERS.length) % HOLIDAY_BANNERS.length,
    );
  };

  useEffect(() => {
    if (paused) return;

    const timer = window.setInterval(next, 4200);
    return () => window.clearInterval(timer);
  }, [next, paused]);

  return (
    <section className="relative overflow-hidden border-b border-stroke px-6 py-24 md:px-10 md:py-32 lg:px-16">
      <div className="pointer-events-none absolute right-[-12rem] top-1/2 h-[34rem] w-[34rem] -translate-y-1/2 rounded-full bg-amber-500/[0.08] blur-[145px]" />

      <div className="relative mx-auto max-w-[1320px]">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <ProjectIntro
            number="04B"
            eyebrow="Client Holiday Campaign · 4 Banners"
            title="Holiday Greeting Banner Collection"
            description="Four wide-format greeting banners created for One Strike Mall and Baba Airsoft. The campaign is presented as an auto-playing editorial slider, so every design gets a full-width moment without creating a long image stack."
          />

          <button
            type="button"
            onClick={() => setPaused((current) => !current)}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-stroke bg-surface text-muted transition hover:-translate-y-1 hover:border-amber-400/40 hover:text-text-primary"
            aria-label={paused ? "Play holiday banner slider" : "Pause holiday banner slider"}
          >
            {paused ? (
              <Play className="h-4 w-4" />
            ) : (
              <Pause className="h-4 w-4" />
            )}
          </button>
        </div>

        <div
          className="mt-14 grid gap-5 xl:grid-cols-[0.24fr_0.76fr] xl:items-stretch"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="grid grid-cols-2 gap-3 xl:grid-cols-1">
            {HOLIDAY_BANNERS.map((image, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={image.src}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`group rounded-[1.25rem] border p-3 text-left transition duration-300 ${
                    isActive
                      ? "border-amber-400/40 bg-amber-500/10"
                      : "border-stroke bg-surface hover:border-amber-400/25"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={`font-display text-xl italic ${
                        isActive ? "text-amber-400" : "text-muted"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span
                      className={`h-2 w-2 rounded-full transition ${
                        isActive ? "bg-amber-400" : "bg-stroke"
                      }`}
                    />
                  </div>

                  <p
                    className={`mt-4 text-xs leading-5 ${
                      isActive ? "text-text-primary" : "text-muted"
                    }`}
                  >
                    {image.label}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="relative min-h-[330px] overflow-hidden rounded-[2rem] border border-stroke bg-surface p-3 shadow-[0_30px_90px_rgba(0,0,0,0.24)] md:min-h-[460px]">
            <div className="pointer-events-none absolute inset-8 rounded-[2rem] bg-amber-500/10 blur-3xl" />

            <AnimatePresence mode="wait">
              <motion.button
                key={HOLIDAY_BANNERS[activeIndex].src}
                type="button"
                onClick={() =>
                  onOpen(
                    HOLIDAY_BANNERS,
                    activeIndex,
                    "Holiday Greeting Banner Collection",
                  )
                }
                initial={{ opacity: 0, scale: 0.975, x: 34 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.985, x: -34 }}
                transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
                className="group relative block h-full w-full overflow-hidden rounded-[1.45rem] bg-black"
              >
                <img
                  src={HOLIDAY_BANNERS[activeIndex].src}
                  alt={HOLIDAY_BANNERS[activeIndex].alt}
                  className="h-full min-h-[300px] w-full object-cover transition duration-1000 group-hover:scale-[1.015] md:min-h-[430px]"
                />

                <span className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/75 opacity-0 backdrop-blur-md transition group-hover:opacity-100">
                  <Maximize2 className="h-4 w-4" />
                </span>
              </motion.button>
            </AnimatePresence>

            <div className="absolute inset-x-7 bottom-7 flex items-center justify-between gap-4">
              <div className="rounded-full border border-white/15 bg-black/45 px-4 py-2 text-xs text-white/75 backdrop-blur-md">
                {HOLIDAY_BANNERS[activeIndex].label}
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={previous}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white/75 backdrop-blur-md transition hover:bg-black/70"
                  aria-label="Previous holiday banner"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <button
                  type="button"
                  onClick={next}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white/75 backdrop-blur-md transition hover:bg-black/70"
                  aria-label="Next holiday banner"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PricelistSection({
  onOpen,
}: {
  onOpen: (
    images: GalleryImage[],
    index: number,
    title: string,
  ) => void;
}) {
  return (
    <section className="border-b border-stroke px-6 py-24 md:px-10 md:py-32 lg:px-16">
      <div className="mx-auto max-w-[1320px]">
        <ProjectIntro
          number="05"
          eyebrow="Instagram Feed Design"
          title="Resolusiweb Price List"
          description="Three promotional posts staged as one connected visual system rather than isolated cards."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {PRICELIST_FEEDS.map((image, index) => (
            <motion.button
              key={image.src}
              type="button"
              onClick={() =>
                onOpen(PRICELIST_FEEDS, index, "Resolusiweb Price List")
              }
              initial={{ opacity: 0, y: 30, rotate: index === 1 ? 0 : index === 0 ? -2 : 2 }}
              whileInView={{ opacity: 1, y: index === 1 ? -22 : 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.65,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group overflow-hidden rounded-[1.8rem] border border-stroke bg-surface shadow-[0_24px_70px_rgba(0,0,0,0.2)] transition hover:-translate-y-2"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="aspect-square w-full object-cover transition duration-700 group-hover:scale-[1.04]"
              />
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

function NgadiharjoSection({
  onOpen,
}: {
  onOpen: (
    images: GalleryImage[],
    index: number,
    title: string,
  ) => void;
}) {
  const images: GalleryImage[] = Array.from(
    { length: 42 },
    (_, index) => ({
      src: `/images/graphics-design/ngadiharjo/page-${String(
        index + 1,
      ).padStart(2, "0")}.png`,
      alt: `Ngadiharjo e-book page ${index + 1}`,
      label: `Page ${String(index + 1).padStart(2, "0")}`,
    }),
  );

  return (
    <section className="relative overflow-hidden border-b border-stroke px-6 py-24 md:px-10 md:py-32 lg:px-16">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[32rem] w-[56rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-500/[0.08] blur-[140px]" />

      <div className="relative mx-auto max-w-[1320px]">
        <div className="grid gap-10 xl:grid-cols-[0.72fr_1.28fr] xl:items-end">
          <ProjectIntro
            number="06"
            eyebrow="Editorial Design · 42 Pages"
            title="Ngadiharjo Village E-book"
            description="The complete 42-page publication is displayed as a compact editorial wall, allowing visitors to understand the full visual rhythm without turning the section into a long stack."
          />

          <Reveal>
            <div className="flex flex-wrap items-center gap-3 xl:justify-end">
              <span className="rounded-full border border-stroke bg-surface px-4 py-2 text-xs text-muted">
                42 landscape pages
              </span>
              <span className="rounded-full border border-stroke bg-surface px-4 py-2 text-xs text-muted">
                Village profile
              </span>
              <span className="rounded-full border border-stroke bg-surface px-4 py-2 text-xs text-muted">
                Editorial illustration
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="mt-14 overflow-hidden rounded-[2.2rem] border border-stroke bg-surface p-3 shadow-[0_32px_100px_rgba(0,0,0,0.24)] md:p-5">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {images.map((image, index) => (
                <motion.button
                  key={image.src}
                  type="button"
                  onClick={() =>
                    onOpen(images, index, "Ngadiharjo Village E-book")
                  }
                  initial={{ opacity: 0, y: 18, scale: 0.97 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.42,
                    delay: Math.min((index % 12) * 0.025, 0.2),
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group relative aspect-[16/10] overflow-hidden rounded-[0.85rem] border border-stroke bg-surface-elevated"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.06]"
                  />

                  <span className="absolute inset-0 bg-black/0 transition group-hover:bg-black/20" />

                  <span className="absolute bottom-2 right-2 flex h-7 min-w-7 items-center justify-center rounded-full border border-white/15 bg-black/50 px-2 text-[9px] text-white/70 opacity-0 backdrop-blur-md transition group-hover:opacity-100">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </motion.button>
              ))}
            </div>

            <div className="mt-4 flex flex-col gap-3 rounded-[1.3rem] border border-stroke bg-surface-elevated px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <BookOpen className="h-5 w-5 text-pink-400" />
                <span className="text-sm text-muted">
                  Click any page to inspect the full publication.
                </span>
              </div>

              <span className="font-display text-2xl italic text-text-primary">
                42 pages
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function GreetingMarquee({
  onOpen,
}: {
  onOpen: (
    images: GalleryImage[],
    index: number,
    title: string,
  ) => void;
}) {
  const [paused, setPaused] = useState(false);
  const marqueeItems = [...GREETING_FEEDS, ...GREETING_FEEDS];

  return (
    <section className="border-b border-stroke py-24 md:py-32">
      <div className="mx-auto flex max-w-[1320px] flex-col gap-8 px-6 md:flex-row md:items-end md:justify-between md:px-10 lg:px-16">
        <ProjectIntro
          number="07"
          eyebrow="Social Media Campaign"
          title="Resolusiweb Greeting Campaign"
          description="Nine holiday designs run as a living campaign reel, creating rhythm instead of another static grid."
        />

        <button
          type="button"
          onClick={() => setPaused((current) => !current)}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-stroke bg-surface text-muted transition hover:border-pink-400/40 hover:text-text-primary"
          aria-label={paused ? "Play marquee" : "Pause marquee"}
        >
          {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
        </button>
      </div>

      <div className="mt-14 overflow-hidden">
        <motion.div
          className="flex w-max gap-5 px-5"
          animate={paused ? undefined : { x: ["0%", "-50%"] }}
          transition={{
            duration: 34,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {marqueeItems.map((image, index) => (
            <button
              key={`${image.src}-${index}`}
              type="button"
              onClick={() =>
                onOpen(
                  GREETING_FEEDS,
                  index % GREETING_FEEDS.length,
                  "Resolusiweb Greeting Campaign",
                )
              }
              className="group w-[270px] shrink-0 overflow-hidden rounded-[1.7rem] border border-stroke bg-surface md:w-[320px]"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="aspect-square w-full object-cover transition duration-700 group-hover:scale-[1.04]"
              />
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CalendarDeck({
  onOpen,
}: {
  onOpen: (
    images: GalleryImage[],
    index: number,
    title: string,
  ) => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="border-b border-stroke px-6 py-24 md:px-10 md:py-32 lg:px-16">
      <div className="mx-auto grid max-w-[1320px] gap-12 xl:grid-cols-[0.72fr_1.28fr] xl:items-center">
        <div>
          <ProjectIntro
            number="08"
            eyebrow="Internal Company Design"
            title="Resolusiweb Calendar"
            description="Six concepts displayed as an interactive card deck. Select a tab to bring a calendar direction forward."
          />

          <div className="mt-8 grid grid-cols-3 gap-2">
            {CALENDARS.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`rounded-xl border px-3 py-3 text-xs transition ${
                  activeIndex === index
                    ? "border-cyan-400/40 bg-cyan-500 text-white"
                    : "border-stroke bg-surface text-muted hover:text-text-primary"
                }`}
              >
                {String(index + 1).padStart(2, "0")}
              </button>
            ))}
          </div>
        </div>

        <div className="relative min-h-[520px]">
          {CALENDARS.map((image, index) => {
            const offset =
              (index - activeIndex + CALENDARS.length) % CALENDARS.length;
            const visible = offset < 3;

            return (
              <motion.button
                key={image.src}
                type="button"
                onClick={() => {
                  if (index === activeIndex) {
                    onOpen(CALENDARS, index, "Resolusiweb Calendar");
                  } else {
                    setActiveIndex(index);
                  }
                }}
                animate={{
                  opacity: visible ? 1 : 0,
                  x: visible ? offset * 34 : 100,
                  y: visible ? offset * 26 : 80,
                  scale: visible ? 1 - offset * 0.07 : 0.82,
                  rotate: visible ? offset * 2.5 : 6,
                  zIndex: CALENDARS.length - offset,
                }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 overflow-hidden rounded-[2rem] border border-stroke bg-surface p-3 shadow-[0_30px_90px_rgba(0,0,0,0.25)]"
                style={{ pointerEvents: visible ? "auto" : "none" }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-full w-full rounded-[1.5rem] object-cover"
                />
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function BobaCarousel({
  onOpen,
}: {
  onOpen: (
    images: GalleryImage[],
    index: number,
    title: string,
  ) => void;
}) {
  const constraintsRef = useRef<HTMLDivElement>(null);

  return (
    <section className="border-b border-stroke px-6 py-24 md:px-10 md:py-32 lg:px-16">
      <div className="mx-auto max-w-[1320px]">
        <ProjectIntro
          number="09"
          eyebrow="Poster Design · 10 Concepts"
          title="Boba Poster Collection"
          description="A draggable poster rail lets visitors physically browse the series instead of scrolling through a tall wall of artwork."
        />

        <div
          ref={constraintsRef}
          className="mt-14 overflow-hidden rounded-[2rem] border border-stroke bg-surface-elevated p-5"
        >
          <motion.div
            drag="x"
            dragConstraints={constraintsRef}
            dragElastic={0.08}
            className="flex w-max cursor-grab gap-5 active:cursor-grabbing"
          >
            {BOBA_POSTERS.map((image, index) => (
              <motion.button
                key={image.src}
                type="button"
                onClick={() =>
                  onOpen(BOBA_POSTERS, index, "Boba Poster Collection")
                }
                whileHover={{ y: -8, rotate: index % 2 === 0 ? -1 : 1 }}
                className="w-[250px] shrink-0 overflow-hidden rounded-[1.6rem] border border-stroke bg-surface shadow-[0_22px_65px_rgba(0,0,0,0.2)] md:w-[300px]"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="aspect-[4/5] w-full object-cover"
                />
              </motion.button>
            ))}
          </motion.div>
        </div>

        <p className="mt-4 text-center text-xs text-muted">
          Drag horizontally to explore the poster series.
        </p>
      </div>
    </section>
  );
}

function CoverFan({
  onOpen,
}: {
  onOpen: (
    images: GalleryImage[],
    index: number,
    title: string,
  ) => void;
}) {
  const [activeIndex, setActiveIndex] = useState(3);

  return (
    <section className="relative overflow-hidden border-b border-stroke px-6 py-24 md:px-10 md:py-32 lg:px-16">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[32rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/[0.08] blur-[130px]" />

      <div className="relative mx-auto max-w-[1320px] text-center">
        <ProjectIntro
          number="10"
          eyebrow="Book Cover · 7 Directions"
          title="IPB Internship Guidebook"
          description="Seven cover concepts arranged as a selectable fan, making comparison easier while keeping the page visually light."
          centered
        />

        <div className="relative mx-auto mt-16 h-[520px] max-w-[1000px]">
          {IPB_COVERS.map((image, index) => {
            const distance = index - activeIndex;
            const absDistance = Math.abs(distance);

            return (
              <motion.button
                key={image.src}
                type="button"
                onClick={() => {
                  if (index === activeIndex) {
                    onOpen(IPB_COVERS, index, "IPB Internship Guidebook");
                  } else {
                    setActiveIndex(index);
                  }
                }}
                animate={{
                  x: distance * 110,
                  y: absDistance * 20,
                  rotate: distance * 5,
                  scale: index === activeIndex ? 1 : 0.86 - absDistance * 0.03,
                  opacity: absDistance > 3 ? 0 : 1,
                  zIndex: IPB_COVERS.length - absDistance,
                }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-1/2 top-0 w-[250px] -translate-x-1/2 overflow-hidden rounded-[1.6rem] border border-stroke bg-surface shadow-[0_30px_90px_rgba(0,0,0,0.28)] md:w-[300px]"
                style={{ pointerEvents: absDistance > 3 ? "none" : "auto" }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="aspect-[3/4] w-full object-cover"
                />
              </motion.button>
            );
          })}
        </div>

        <div className="mt-4 flex justify-center gap-2">
          {IPB_COVERS.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === activeIndex
                  ? "w-8 bg-amber-400"
                  : "w-2 bg-stroke hover:bg-muted"
              }`}
              aria-label={`Select cover ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ShoeTriptych({
  onOpen,
}: {
  onOpen: (
    images: GalleryImage[],
    index: number,
    title: string,
  ) => void;
}) {
  return (
    <section className="px-6 py-24 md:px-10 md:py-32 lg:px-16">
      <div className="mx-auto max-w-[1320px]">
        <ProjectIntro
          number="11"
          eyebrow="Social Media Design"
          title="Shoe Feed Collection"
          description="The final project closes the archive with a bold three-panel composition that feels more like a campaign wall than a standard gallery."
        />

        <div className="mt-14 grid min-h-[650px] gap-5 lg:grid-cols-[0.78fr_1.22fr]">
          <motion.button
            type="button"
            onClick={() =>
              onOpen(SHOE_FEEDS, 0, "Shoe Feed Collection")
            }
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="group overflow-hidden rounded-[2rem] border border-stroke bg-surface"
          >
            <img
              src={SHOE_FEEDS[0].src}
              alt={SHOE_FEEDS[0].alt}
              className="h-full w-full object-cover transition duration-1000 group-hover:scale-[1.03]"
            />
          </motion.button>

          <div className="grid gap-5 sm:grid-cols-2">
            {SHOE_FEEDS.slice(1).map((image, index) => (
              <motion.button
                key={image.src}
                type="button"
                onClick={() =>
                  onOpen(
                    SHOE_FEEDS,
                    index + 1,
                    "Shoe Feed Collection",
                  )
                }
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: index === 0 ? 44 : -20 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.65,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group overflow-hidden rounded-[2rem] border border-stroke bg-surface"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-full w-full object-cover transition duration-1000 group-hover:scale-[1.03]"
                />
              </motion.button>
            ))}
          </div>
        </div>

        <div className="mt-20 rounded-[2.5rem] border border-pink-400/20 bg-surface px-6 py-14 text-center md:px-10 md:py-20">
          <Sparkles className="mx-auto h-6 w-6 text-pink-400" />
          <h2 className="mx-auto mt-6 max-w-3xl text-4xl tracking-[-0.05em] text-text-primary md:text-6xl">
            Eleven projects. Eleven different ways to tell a visual story.
          </h2>
          <a
            href="/#work"
            className="group mt-9 inline-flex items-center gap-3 rounded-full border border-stroke bg-surface-elevated px-5 py-3 text-sm text-text-primary transition hover:-translate-y-1 hover:border-pink-400/40"
          >
            Back to selected work
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </div>
      </div>
    </section>
  );
}

function ProjectIntro({
  number,
  eyebrow,
  title,
  description,
  centered = false,
}: {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  centered?: boolean;
}) {
  return (
    <Reveal>
      <div className={centered ? "mx-auto max-w-4xl text-center" : ""}>
        <p className="text-[9px] uppercase tracking-[0.3em] text-pink-400">
          {number} · {eyebrow}
        </p>

        <h2 className="mt-4 max-w-4xl text-4xl leading-tight tracking-[-0.05em] text-text-primary md:text-6xl">
          {title}
        </h2>

        <p
          className={`mt-6 max-w-2xl text-sm leading-7 text-muted md:text-base ${
            centered ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      </div>
    </Reveal>
  );
}

function Reveal({ children }: { children: ReactNode }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={
        prefersReducedMotion
          ? { opacity: 0 }
          : { opacity: 0, y: 28, filter: "blur(8px)" }
      }
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SliderButton({
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
      className="flex h-11 w-11 items-center justify-center rounded-full border border-stroke bg-surface text-muted transition hover:-translate-y-1 hover:border-pink-400/40 hover:text-text-primary"
    >
      {children}
    </button>
  );
}

function Lightbox({
  state,
  onClose,
  onMove,
}: {
  state: LightboxState;
  onClose: () => void;
  onMove: (direction: "prev" | "next") => void;
}) {
  const currentImage = state ? state.images[state.index] : null;

  return (
    <AnimatePresence>
      {state && currentImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/92 p-4 backdrop-blur-xl md:p-8"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${state.title} preview`}
            initial={{ opacity: 0, y: 22, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onMouseDown={(event) => event.stopPropagation()}
            className="relative flex max-h-[94vh] w-full max-w-[1450px] flex-col overflow-hidden rounded-[1.8rem] border border-white/15 bg-[#080808]"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 md:px-7">
              <div>
                <p className="text-[9px] uppercase tracking-[0.28em] text-white/35">
                  {state.title}
                </p>
                <p className="mt-1 text-sm text-white/80">
                  {currentImage.label}
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.05] text-white/70 transition hover:rotate-90"
                aria-label="Close preview"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-auto bg-black/60 p-4 md:p-7">
              <img
                src={currentImage.src}
                alt={currentImage.alt}
                className="max-h-[76vh] max-w-full object-contain"
              />

              {state.images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => onMove("prev")}
                    className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/65 text-white/75 backdrop-blur-md md:left-7"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onMove("next")}
                    className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/65 text-white/75 backdrop-blur-md md:right-7"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-white/10 px-5 py-4 md:px-7">
              <span className="text-xs text-white/35">
                Use arrow keys to navigate
              </span>

              <span className="font-display text-lg italic text-white/70">
                {String(state.index + 1).padStart(2, "0")}
                <span className="mx-1.5 text-white/20">/</span>
                {String(state.images.length).padStart(2, "0")}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}