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
  Boxes,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  Code2,
  Database,
  FileText,
  ImageIcon,
  Leaf,
  MapPin,
  Maximize2,
  PackageCheck,
  Recycle,
  ShoppingBag,
  Sparkles,
  Target,
  Truck,
  Users,
  Workflow,
  X,
  Zap,
} from "lucide-react";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

export const Route = createFileRoute("/kiloin")({
  component: KiloinCaseStudy,
});

type ProjectImage = {
  src: string;
  alt: string;
  label: string;
};

type LightboxState = {
  images: ProjectImage[];
  index: number;
} | null;

const HERO_VIDEO_URL = "/videos/kiloin/kiloin-hero.mp4";
const HERO_POSTER_URL = "/images/kiloin/kiloin-hero-poster.jpg";

const BUSINESS_PLAN_URL =
  "https://drive.google.com/file/d/REPLACE_WITH_YOUR_BUSINESS_PLAN_FILE_ID/view?usp=sharing";

const CLASS_DIAGRAM_IMAGE: ProjectImage = {
  src: "/images/kiloin/class-diagram.png",
  alt: "Kiloin application class diagram",
  label: "Class Diagram",
};

const WIREFRAME_IMAGES: ProjectImage[] = Array.from(
  { length: 28 },
  (_, index) => {
    const number = String(index + 1).padStart(2, "0");

    return {
      src: `/images/kiloin/wireframes/wireframe-${number}.png`,
      alt: `Kiloin wireframe frame ${number}`,
      label: `Wireframe ${number}`,
    };
  },
);

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "features", label: "Core Features" },
  { id: "business", label: "Business Plan" },
  { id: "structure", label: "System Structure" },
  { id: "wireframes", label: "Wireframes" },
  { id: "summary", label: "Summary" },
] as const;

const SWOT_ITEMS = [
  {
    label: "Strength",
    title: "Pickup service with higher waste value",
    text: "Kiloin makes recycling more practical by collecting waste directly from the user’s location and creating additional value from recyclable materials.",
  },
  {
    label: "Weakness",
    title: "Low public awareness",
    text: "The service depends on behavioral change because some people still have limited interest in sorting and recycling their waste.",
  },
  {
    label: "Opportunity",
    title: "Growing environmental awareness",
    text: "Education about the long-term impact of accumulated waste can attract new users and strengthen community participation.",
  },
  {
    label: "Threat",
    title: "Larger technology competitors",
    text: "Established companies may have stronger technology, wider operational coverage, and more mature logistics infrastructure.",
  },
];

const BUSINESS_STAGES = [
  {
    number: "01",
    title: "Plan and prepare",
    text: "Define the target market, feature list, user journeys, data structure, and project timeline.",
  },
  {
    number: "02",
    title: "Design the experience",
    text: "Create the interface concept and interactive prototype using Canva and Figma.",
  },
  {
    number: "03",
    title: "Build the application",
    text: "Develop the Android product and connect the required services and database.",
  },
  {
    number: "04",
    title: "Test and distribute",
    text: "Run Alpha and Beta testing, collect feedback, improve the product, and prepare it for online distribution.",
  },
];

const TEAM_ROLES = [
  {
    icon: Code2,
    title: "Programmer",
    text: "Implements the application logic and connects the mobile experience with the required services.",
  },
  {
    icon: Database,
    title: "Data Analyst",
    text: "Analyzes product requirements, data needs, and the business process across front-end and back-end systems.",
  },
  {
    icon: Sparkles,
    title: "Interface Designer",
    text: "Designs the UI and UX based on the target audience so the application remains understandable and easy to use.",
  },
  {
    icon: CircleDollarSign,
    title: "Accountant",
    text: "Prepares budget planning, transaction records, and detailed financial reporting for the business.",
  },
];

function KiloinCaseStudy() {
  const pageRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { isDark } = useTheme();

  const [activeSection, setActiveSection] = useState("overview");
  const [wireframeIndex, setWireframeIndex] = useState(0);
  const [lightbox, setLightbox] = useState<LightboxState>(null);

  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end end"],
  });

  const progressScale = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.25,
  });

  const openGallery = (images: ProjectImage[], index = 0) => {
    setLightbox({ images, index });
  };

  const moveLightbox = (direction: "prev" | "next") => {
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
  };

  const moveWireframe = (direction: "prev" | "next") => {
    const offset = direction === "next" ? 1 : -1;

    setWireframeIndex(
      (current) =>
        (current + offset + WIREFRAME_IMAGES.length) %
        WIREFRAME_IMAGES.length,
    );
  };

  useEffect(() => {
    const sections = SECTIONS.map(({ id }) =>
      document.getElementById(id),
    ).filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry) setActiveSection(visibleEntry.target.id);
      },
      {
        rootMargin: "-30% 0px -55% 0px",
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

  const lightboxPortal =
    typeof document !== "undefined"
      ? createPortal(
          <AnimatePresence>
            {lightbox && (
              <motion.div
                className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl md:p-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.24 }}
                onMouseDown={(event) => {
                  if (event.target === event.currentTarget) setLightbox(null);
                }}
              >
                <motion.div
                  role="dialog"
                  aria-modal="true"
                  aria-label="Kiloin project image preview"
                  initial={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: 28, scale: 0.96 }
                  }
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: 18, scale: 0.98 }
                  }
                  transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                  onMouseDown={(event) => event.stopPropagation()}
                  className="relative flex max-h-[92vh] w-full max-w-[1380px] flex-col overflow-hidden rounded-[1.8rem] border border-white/15 bg-[#090909] shadow-[0_35px_130px_rgba(0,0,0,0.9),0_0_70px_rgba(250,204,21,0.12)]"
                >
                  <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 md:px-7">
                    <div className="min-w-0">
                      <p className="text-[9px] uppercase tracking-[0.3em] text-yellow-200/50">
                        Project visual
                      </p>
                      <p className="mt-1 truncate text-sm text-white/80 md:text-base">
                        {lightbox.images[lightbox.index].label}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setLightbox(null)}
                      aria-label="Close image preview"
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/[0.05] text-white/65 transition hover:rotate-90 hover:border-yellow-300/45 hover:text-white"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="relative flex min-h-0 flex-1 items-center justify-center bg-black/60 p-3 md:p-6">
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
                        <button
                          type="button"
                          onClick={() => moveLightbox("prev")}
                          aria-label="Previous image"
                          className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/65 text-white/70 backdrop-blur-md transition hover:border-yellow-300/55 hover:bg-yellow-500/20 hover:text-white md:left-7"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => moveLightbox("next")}
                          aria-label="Next image"
                          className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/65 text-white/70 backdrop-blur-md transition hover:border-yellow-300/55 hover:bg-yellow-500/20 hover:text-white md:right-7"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </>
                    )}
                  </div>

                  <div className="flex items-center justify-between border-t border-white/10 px-5 py-4 md:px-7">
                    <span className="text-xs text-white/35">
                      Click outside or press Esc to close
                    </span>

                    <span className="font-display text-lg italic text-yellow-100/70">
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
      className="relative overflow-clip bg-bg text-text-primary"
    >
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progressScale }}
        className="fixed inset-x-0 top-0 z-[90] h-[2px] origin-left bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-500"
      />

      <section className="relative min-h-[100svh] overflow-hidden bg-black">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={HERO_POSTER_URL}
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={HERO_VIDEO_URL} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(250,204,21,0.18),transparent_34%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/75" />

        <div className="relative z-10 flex min-h-[100svh] items-center justify-center px-6 text-center">
          <motion.div
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 30, scale: 0.97 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[10px] uppercase tracking-[0.42em] text-yellow-100/65 md:text-xs">
              Tanaka Nawasena Company
            </p>

            <h1 className="mt-6 text-[clamp(4rem,10vw,8rem)] leading-[0.82] tracking-[-0.065em] text-white">
              Kiloin<span className="text-yellow-300">.</span>
            </h1>

            <p className="mx-auto mt-8 max-w-2xl text-sm leading-7 text-white/65 md:text-lg md:leading-8">
              A digital recycling ecosystem that makes waste collection,
              processing, and reusable products easier to access.
            </p>
          </motion.div>
        </div>

        <a
          href="#overview"
          aria-label="Scroll to project overview"
          className="group absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-3 text-white/60 transition hover:text-yellow-300 md:bottom-10"
        >
          <span className="text-[9px] uppercase tracking-[0.32em]">
            Scroll to explore
          </span>

          <span className="relative flex h-12 w-7 justify-center rounded-full border border-current">
            <motion.span
              className="absolute top-2 h-1.5 w-1.5 rounded-full bg-current"
              animate={
                prefersReducedMotion
                  ? undefined
                  : { y: [0, 18, 0], opacity: [1, 0.25, 1] }
              }
              transition={
                prefersReducedMotion
                  ? undefined
                  : {
                      duration: 1.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
              }
            />
          </span>
        </a>
      </section>

      <header className="sticky top-0 z-[70] border-y border-stroke bg-bg/82 px-4 py-3 backdrop-blur-xl md:px-7">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between">
          <a
            href="/#work"
            className="group inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs text-muted transition hover:bg-surface-elevated hover:text-text-primary"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to projects
          </a>

          <span className="hidden text-[9px] uppercase tracking-[0.28em] text-muted sm:block">
            Kiloin · Product & Business Case Study
          </span>

          <ThemeToggle />
        </div>
      </header>

      <div className="relative mx-auto grid max-w-[1400px] gap-12 px-6 md:px-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:px-16">
        <aside className="hidden lg:block">
          <div className="sticky top-28 py-10">
            <p className="mb-5 text-[9px] uppercase tracking-[0.3em] text-muted">
              Project Journey
            </p>

            <nav className="space-y-1" aria-label="Kiloin sections">
              {SECTIONS.map((section, index) => {
                const isActive = activeSection === section.id;

                return (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs transition ${
                      isActive
                        ? isDark
                          ? "bg-yellow-500/12 text-yellow-100"
                          : "bg-yellow-100 text-yellow-800"
                        : "text-muted hover:bg-surface-elevated hover:text-text-primary"
                    }`}
                  >
                    <span
                      className={`font-display italic ${
                        isActive
                          ? isDark
                            ? "text-yellow-300"
                            : "text-yellow-700"
                          : "text-muted"
                      }`}
                    >
                      {String(index).padStart(2, "0")}
                    </span>

                    <span>{section.label}</span>
                  </a>
                );
              })}
            </nav>
          </div>
        </aside>

        <main className="min-w-0">
          <section
            id="overview"
            className="scroll-mt-28 border-t border-stroke py-24 md:py-32"
          >
            <div className="grid gap-14 xl:grid-cols-[0.78fr_1.22fr] xl:items-start">
              <Reveal>
                <SectionHeading
                  number="00"
                  eyebrow="Project overview"
                  title="Turning recycling into a practical digital service."
                  description="Kiloin is an Android application developed under Tanaka Nawasena Company, a recycling-service business focused on plastic and cigarette waste. The product is designed to give the public a structured and convenient way to distribute recyclable waste while supporting the government’s effort to reduce waste accumulation in Indonesia."
                />
              </Reveal>

              <div className="grid gap-4 md:grid-cols-2">
                {[
                  {
                    icon: Building2,
                    label: "Company",
                    title: "Tanaka Nawasena Company",
                    text: "A service business that collects and processes plastic and cigarette waste into reusable products.",
                  },
                  {
                    icon: Target,
                    label: "Purpose",
                    title: "Reduce waste accumulation",
                    text: "Provide a practical recycling channel and turn collected materials into products with renewed value.",
                  },
                  {
                    icon: MapPin,
                    label: "Initial market",
                    title: "Bogor, Indonesia",
                    text: "The first market focuses on communities in Bogor before expanding to a broader Indonesian audience.",
                  },
                  {
                    icon: Users,
                    label: "Primary users",
                    title: "Android users across age groups",
                    text: "Students, university students, waste collectors, and people interested in recycling are the main target segments.",
                  },
                ].map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <Reveal key={item.label} delay={index * 0.07}>
                      <article className="h-full rounded-[1.65rem] border border-stroke bg-surface p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-yellow-300/25 bg-yellow-500/10">
                            <Icon className="h-5 w-5 text-yellow-500" />
                          </div>

                          <span className="text-[9px] uppercase tracking-[0.24em] text-muted">
                            {item.label}
                          </span>
                        </div>

                        <h3 className="mt-8 text-xl leading-tight text-text-primary">
                          {item.title}
                        </h3>

                        <p className="mt-4 text-sm leading-7 text-muted">
                          {item.text}
                        </p>
                      </article>
                    </Reveal>
                  );
                })}
              </div>
            </div>

            <Reveal delay={0.18}>
              <div className="mt-12 overflow-hidden rounded-[2rem] border border-yellow-300/20 bg-yellow-500/[0.065]">
                <div className="grid gap-8 p-6 md:p-8 xl:grid-cols-[1fr_auto] xl:items-center">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.28em] text-yellow-500">
                      Product vision
                    </p>

                    <h3 className="mt-4 max-w-3xl text-2xl leading-tight tracking-[-0.03em] text-text-primary md:text-4xl">
                      Make recycling more structured, practical, and easy
                      through a connected mobile experience.
                    </h3>
                  </div>

                  <div className="flex h-24 w-24 items-center justify-center rounded-full border border-yellow-300/25 bg-yellow-500/12">
                    <Recycle className="h-10 w-10 text-yellow-500" />
                  </div>
                </div>
              </div>
            </Reveal>
          </section>

          <section id="features" className="scroll-mt-28 py-24 md:py-36">
            <Reveal>
              <SectionHeading
                number="01"
                eyebrow="Core product"
                title="Two services connect waste collection with reusable products."
                description="Kiloin combines a pickup service and a recycled-product marketplace so users can contribute waste and experience the value created from the recycling process."
              />
            </Reveal>

            <div className="mt-12 grid gap-5 xl:grid-cols-2">
              <Reveal>
                <article className="relative h-full overflow-hidden rounded-[2rem] border border-yellow-300/30 bg-yellow-400 p-7 text-black md:p-9">
                  <div className="absolute -right-14 -top-14 h-48 w-48 rounded-full border border-black/10" />
                  <div className="absolute -bottom-20 right-10 h-56 w-56 rounded-full bg-white/20 blur-3xl" />

                  <div className="relative">
                    <div className="flex items-start justify-between gap-5">
                      <div className="flex h-13 w-13 items-center justify-center rounded-2xl border border-black/15 bg-black/10">
                        <Truck className="h-6 w-6" />
                      </div>

                      <span className="font-display text-2xl italic text-black/45">
                        01
                      </span>
                    </div>

                    <p className="mt-10 text-[10px] uppercase tracking-[0.28em] text-black/55">
                      Kiloin Jemput
                    </p>

                    <h3 className="mt-3 text-4xl tracking-[-0.045em] md:text-5xl">
                      Ko-Put
                    </h3>

                    <p className="mt-6 max-w-xl text-sm leading-7 text-black/70 md:text-base">
                      A pickup service that visits the customer’s location to
                      collect recyclable waste, making waste disposal easier and
                      more valuable for the public.
                    </p>
                  </div>
                </article>
              </Reveal>

              <Reveal delay={0.08}>
                <article className="relative h-full overflow-hidden rounded-[2rem] border border-stroke bg-surface p-7 md:p-9">
                  <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-yellow-500/10 blur-[70px]" />

                  <div className="relative">
                    <div className="flex items-start justify-between gap-5">
                      <div className="flex h-13 w-13 items-center justify-center rounded-2xl border border-yellow-300/25 bg-yellow-500/10">
                        <ShoppingBag className="h-6 w-6 text-yellow-500" />
                      </div>

                      <span className="font-display text-2xl italic text-yellow-500/55">
                        02
                      </span>
                    </div>

                    <p className="mt-10 text-[10px] uppercase tracking-[0.28em] text-yellow-500">
                      Kiloin Marketplace
                    </p>

                    <h3 className="mt-3 text-4xl tracking-[-0.045em] text-text-primary md:text-5xl">
                      Ko-Mart
                    </h3>

                    <p className="mt-6 max-w-xl text-sm leading-7 text-muted md:text-base">
                      A marketplace for products created from processed waste,
                      allowing recycled materials to return to the community as
                      useful goods with commercial value.
                    </p>
                  </div>
                </article>
              </Reveal>
            </div>

            <Reveal delay={0.16}>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  "Students",
                  "University students",
                  "Waste collectors",
                  "Recycling communities",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex min-h-[82px] items-center justify-center gap-3 rounded-2xl border border-stroke bg-surface-elevated px-4 py-4 text-center text-sm text-muted"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-yellow-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </section>

          <section id="business" className="scroll-mt-28 py-24 md:py-36">
            <div
              className={`overflow-hidden rounded-[2.5rem] border border-stroke bg-surface p-5 md:p-8 xl:p-10 ${
                isDark
                  ? "shadow-[0_35px_110px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)]"
                  : "shadow-[0_28px_85px_rgba(74,54,24,0.12),inset_0_1px_0_rgba(255,255,255,0.95)]"
              }`}
            >
              <Reveal>
                <SectionHeading
                  number="02"
                  eyebrow="Business plan"
                  title="Connecting product strategy, market entry, and operational readiness."
                  description="The business plan positions Kiloin as a free Android application with two core services, an initial market in Bogor, and a phased launch supported by testing, community education, digital advertising, and continuous system control."
                />
              </Reveal>

              <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {SWOT_ITEMS.map((item, index) => (
                  <Reveal key={item.label} delay={index * 0.07}>
                    <article className="h-full rounded-[1.55rem] border border-stroke bg-surface-elevated p-5">
                      <span className="font-display text-xl italic text-yellow-500">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <p className="mt-6 text-[9px] uppercase tracking-[0.24em] text-yellow-500">
                        {item.label}
                      </p>

                      <h3 className="mt-3 text-lg leading-tight text-text-primary">
                        {item.title}
                      </h3>

                      <p className="mt-4 text-sm leading-7 text-muted">
                        {item.text}
                      </p>
                    </article>
                  </Reveal>
                ))}
              </div>

              <div className="mt-12 grid gap-8 border-t border-stroke pt-10 xl:grid-cols-[0.9fr_1.1fr]">
                <Reveal>
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.28em] text-yellow-500">
                      Go-to-market strategy
                    </p>

                    <h3 className="mt-4 text-3xl leading-tight tracking-[-0.035em] text-text-primary">
                      Test locally, improve continuously, then expand awareness.
                    </h3>

                    <p className="mt-5 text-sm leading-7 text-muted">
                      The launch begins with Alpha and Beta testing. User
                      feedback becomes the basis for improving the strongest
                      features before Kiloin is introduced through community
                      outreach in Bogor, campus promotion, public-service
                      advertising, Google Ads, and YouTube Ads.
                    </p>

                    <div className="mt-7 flex flex-wrap gap-2">
                      {[
                        "Alpha/Beta Testing",
                        "Bogor Socialization",
                        "Campus Campaign",
                        "Google Ads",
                        "YouTube Ads",
                      ].map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-yellow-300/25 bg-yellow-500/10 px-4 py-2 text-[10px] uppercase tracking-[0.14em] text-yellow-600 dark:text-yellow-300"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>

                <div className="grid gap-4 sm:grid-cols-2">
                  {BUSINESS_STAGES.map((item, index) => (
                    <Reveal key={item.number} delay={index * 0.06}>
                      <article className="h-full rounded-[1.5rem] border border-stroke bg-surface-elevated p-5">
                        <span className="font-display text-xl italic text-yellow-500">
                          {item.number}
                        </span>

                        <h3 className="mt-6 text-base font-medium text-text-primary">
                          {item.title}
                        </h3>

                        <p className="mt-3 text-sm leading-6 text-muted">
                          {item.text}
                        </p>
                      </article>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="structure" className="scroll-mt-28 py-24 md:py-36">
            <Reveal>
              <SectionHeading
                number="03"
                eyebrow="System structure"
                title="Documenting how the product and business work together."
                description="The class diagram translates Kiloin’s product logic into a connected system structure, while the business plan explains the market, operational process, required tools, team roles, and long-term development direction."
              />
            </Reveal>

            <div className="mt-12 grid gap-6 xl:grid-cols-2">
              <Reveal className="h-full">
                <DocumentVisual
                  image={CLASS_DIAGRAM_IMAGE}
                  eyebrow="Application architecture"
                  title="Class Diagram"
                  description="A structural view of the entities, relationships, and responsibilities required to support Kiloin’s mobile experience."
                  icon={Workflow}
                  onOpen={() => openGallery([CLASS_DIAGRAM_IMAGE])}
                />
              </Reveal>

              <Reveal delay={0.08} className="h-full">
                <ExternalDocumentCard
                  href={BUSINESS_PLAN_URL}
                  eyebrow="Business documentation"
                  title="Business Plan"
                  description="A strategic PDF document covering the company profile, market analysis, product model, launch strategy, operations, production needs, and human resources."
                />
              </Reveal>
            </div>

            <Reveal delay={0.16}>
              <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {TEAM_ROLES.map((item) => {
                  const Icon = item.icon;

                  return (
                    <article
                      key={item.title}
                      className="h-full rounded-[1.5rem] border border-stroke bg-surface-elevated p-5"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-yellow-300/25 bg-yellow-500/10">
                        <Icon className="h-4.5 w-4.5 text-yellow-500" />
                      </div>

                      <h3 className="mt-6 text-base font-medium text-text-primary">
                        {item.title}
                      </h3>

                      <p className="mt-3 text-sm leading-6 text-muted">
                        {item.text}
                      </p>
                    </article>
                  );
                })}
              </div>
            </Reveal>
          </section>

          <section id="wireframes" className="scroll-mt-28 py-24 md:py-36">
            <Reveal>
              <SectionHeading
                number="04"
                eyebrow="Wireframe exploration"
                title="Twenty-eight frames translated the service into a complete mobile journey."
                description="The wireframes visualize Kiloin’s complete Android experience before final interface styling. Each frame can be reviewed individually through a custom mobile mockup and an interactive frame selector."
              />
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-12">
                <WireframeShowcase
                  images={WIREFRAME_IMAGES}
                  currentIndex={wireframeIndex}
                  onIndexChange={setWireframeIndex}
                  onPrevious={() => moveWireframe("prev")}
                  onNext={() => moveWireframe("next")}
                  onOpen={() => openGallery(WIREFRAME_IMAGES, wireframeIndex)}
                  isDark={isDark}
                />
              </div>
            </Reveal>
          </section>

          <section id="summary" className="scroll-mt-28 py-24 md:py-36">
            <div
              className={`relative overflow-hidden rounded-[2.6rem] border border-stroke bg-surface px-6 py-16 md:px-10 md:py-20 xl:px-14 xl:py-24 ${
                isDark
                  ? "shadow-[0_40px_120px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.06)]"
                  : "shadow-[0_30px_90px_rgba(74,54,24,0.14),inset_0_1px_0_rgba(255,255,255,0.96)]"
              }`}
            >
              <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[650px] -translate-x-1/2 rounded-full bg-yellow-500/12 blur-[120px]" />

              <div className="relative">
                <Reveal>
                  <div className="text-center">
                    <Recycle className="mx-auto h-7 w-7 text-yellow-500" />

                    <p className="mt-7 text-[9px] uppercase tracking-[0.34em] text-muted">
                      05 · Summary
                    </p>

                    <h2 className="mx-auto mt-5 max-w-4xl text-4xl leading-[1.06] tracking-[-0.045em] text-text-primary md:text-6xl">
                      A recycling service designed as one connected product,
                      business, and operational system.
                    </h2>

                    <p className="mx-auto mt-7 max-w-3xl text-sm leading-7 text-muted md:text-base md:leading-8">
                      Kiloin demonstrates how a digital product can connect
                      environmental impact with practical service design.
                      Ko-Put simplifies waste collection, Ko-Mart creates a
                      channel for recycled products, and the supporting business
                      plan establishes how the service can be tested, marketed,
                      operated, and improved over time.
                    </p>
                  </div>
                </Reveal>

                <div className="mt-12 grid gap-4 md:grid-cols-3">
                  {[
                    {
                      icon: Truck,
                      title: "Accessible collection",
                      text: "Pickup services reduce the effort required for people to participate in recycling.",
                    },
                    {
                      icon: PackageCheck,
                      title: "Renewed product value",
                      text: "Processed waste returns to the market as useful products through Ko-Mart.",
                    },
                    {
                      icon: BriefcaseBusiness,
                      title: "Business-ready direction",
                      text: "The project combines product structure, operations, marketing, and team responsibilities.",
                    },
                  ].map((item, index) => {
                    const Icon = item.icon;

                    return (
                      <Reveal key={item.title} delay={index * 0.07}>
                        <article className="flex h-full min-h-[210px] flex-col rounded-[1.5rem] border border-stroke bg-surface-elevated p-6">
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-yellow-300/25 bg-yellow-500/10">
                            <Icon className="h-5 w-5 text-yellow-500" />
                          </div>

                          <h3 className="mt-7 text-lg font-medium text-text-primary">
                            {item.title}
                          </h3>

                          <p className="mt-4 text-sm leading-7 text-muted">
                            {item.text}
                          </p>
                        </article>
                      </Reveal>
                    );
                  })}
                </div>

                <Reveal delay={0.24}>
                  <div className="mt-10 flex justify-center">
                    <a
                      href="/#work"
                      className="group inline-flex items-center gap-3 rounded-full border border-stroke bg-surface-elevated px-6 py-3.5 text-sm text-text-secondary transition hover:-translate-y-1 hover:border-yellow-400/45 hover:bg-yellow-500/10 hover:text-text-primary"
                    >
                      <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                      Back to selected projects
                    </a>
                  </div>
                </Reveal>
              </div>
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
}: {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="font-display text-xl italic text-yellow-500">
          {number}
        </span>

        <span className="h-px w-8 bg-yellow-400/45" />

        <span className="text-[9px] uppercase tracking-[0.28em] text-muted">
          {eyebrow}
        </span>
      </div>

      <h2 className="mt-6 text-4xl leading-[1.03] tracking-[-0.045em] text-text-primary md:text-5xl xl:text-6xl">
        {title}
      </h2>

      <p className="mt-6 max-w-3xl text-sm leading-7 text-muted md:text-base md:leading-8">
        {description}
      </p>
    </div>
  );
}

function DocumentVisual({
  image,
  eyebrow,
  title,
  description,
  icon: Icon,
  onOpen,
}: {
  image: ProjectImage;
  eyebrow: string;
  title: string;
  description: string;
  icon: typeof Workflow;
  onOpen: () => void;
}) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-stroke bg-surface">
      <button
        type="button"
        onClick={onOpen}
        className="group relative block min-h-[320px] flex-1 overflow-hidden bg-black/5 text-left"
        aria-label={`Open ${image.label}`}
      >
        <ImageWithFallback
          image={image}
          className="h-full min-h-[320px] w-full object-contain p-4 transition duration-500 group-hover:scale-[1.015]"
        />

        <span className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white/70 opacity-0 backdrop-blur-md transition group-hover:opacity-100">
          <Maximize2 className="h-4 w-4" />
        </span>
      </button>

      <div className="border-t border-stroke p-6 md:p-7">
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="text-[9px] uppercase tracking-[0.27em] text-yellow-500">
              {eyebrow}
            </p>

            <h3 className="mt-3 text-2xl tracking-[-0.03em] text-text-primary">
              {title}
            </h3>

            <p className="mt-4 text-sm leading-7 text-muted">{description}</p>
          </div>

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-yellow-300/25 bg-yellow-500/10">
            <Icon className="h-5 w-5 text-yellow-500" />
          </div>
        </div>
      </div>
    </article>
  );
}

function ExternalDocumentCard({
  href,
  eyebrow,
  title,
  description,
}: {
  href: string;
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full min-h-[520px] flex-col overflow-hidden rounded-[2rem] border border-stroke bg-surface transition duration-300 hover:-translate-y-1 hover:border-yellow-400/45"
      aria-label={`Open ${title} on Google Drive`}
    >
      <div className="relative flex min-h-[320px] flex-1 items-center justify-center overflow-hidden bg-gradient-to-br from-yellow-500/10 via-surface-elevated to-orange-500/10 p-8">
        <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-yellow-500/12 blur-[70px]" />
        <div className="absolute -bottom-20 -left-12 h-56 w-56 rounded-full bg-orange-500/10 blur-[80px]" />

        <div className="relative text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[1.75rem] border border-yellow-300/30 bg-yellow-500/12 text-yellow-500 transition duration-300 group-hover:scale-105 group-hover:bg-yellow-500/18">
            <FileText className="h-9 w-9" />
          </div>

          <p className="mt-7 text-[9px] uppercase tracking-[0.3em] text-yellow-500">
            PDF on Google Drive
          </p>

          <h3 className="mt-3 text-2xl tracking-[-0.03em] text-text-primary">
            Open Business Plan
          </h3>

          <div className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full border border-yellow-300/25 bg-yellow-500/10 px-4 py-2 text-xs text-yellow-600 transition group-hover:border-yellow-400/50 group-hover:bg-yellow-500/15 dark:text-yellow-300">
            View PDF
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </div>

      <div className="border-t border-stroke p-6 md:p-7">
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="text-[9px] uppercase tracking-[0.27em] text-yellow-500">
              {eyebrow}
            </p>

            <h3 className="mt-3 text-2xl tracking-[-0.03em] text-text-primary">
              {title}
            </h3>

            <p className="mt-4 text-sm leading-7 text-muted">{description}</p>
          </div>

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-yellow-300/25 bg-yellow-500/10">
            <ArrowUpRight className="h-5 w-5 text-yellow-500" />
          </div>
        </div>
      </div>
    </a>
  );
}

function WireframeShowcase({
  images,
  currentIndex,
  onIndexChange,
  onPrevious,
  onNext,
  onOpen,
  isDark,
}: {
  images: ProjectImage[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  onOpen: () => void;
  isDark: boolean;
}) {
  const currentImage = images[currentIndex];

  return (
    <div
      className={`overflow-hidden rounded-[2.5rem] border border-stroke bg-surface ${
        isDark
          ? "shadow-[0_40px_130px_rgba(0,0,0,0.56),0_0_70px_rgba(250,204,21,0.07),inset_0_1px_0_rgba(255,255,255,0.06)]"
          : "shadow-[0_30px_95px_rgba(74,54,24,0.14),inset_0_1px_0_rgba(255,255,255,0.95)]"
      }`}
    >
      <div className="relative grid min-h-[650px] gap-10 overflow-hidden p-6 md:p-10 xl:grid-cols-[0.78fr_1.22fr] xl:items-center xl:p-12">
        <div className="pointer-events-none absolute -right-24 top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full bg-yellow-500/12 blur-[110px]" />
        <div className="pointer-events-none absolute left-[47%] top-1/2 h-[430px] w-[430px] -translate-y-1/2 rounded-full border border-yellow-400/10" />

        <div className="relative">
          <p className="text-[10px] uppercase tracking-[0.3em] text-yellow-500">
            Mobile wireframe system
          </p>

          <h3 className="mt-5 max-w-xl text-4xl leading-[1.02] tracking-[-0.045em] text-text-primary md:text-5xl">
            Explore all 28 frames through one focused mockup.
          </h3>

          <p className="mt-6 max-w-xl text-sm leading-7 text-muted md:text-base">
            Each screen can be reviewed individually without losing the full
            product context. Use the navigation controls or select a frame from
            the index below.
          </p>

          <div className="mt-8 flex items-center gap-3">
            <button
              type="button"
              onClick={onPrevious}
              aria-label="Previous wireframe"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-stroke bg-surface-elevated text-text-primary transition hover:border-yellow-400/50 hover:text-yellow-500"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={onNext}
              aria-label="Next wireframe"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-stroke bg-surface-elevated text-text-primary transition hover:border-yellow-400/50 hover:text-yellow-500"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <span className="ml-2 font-display text-xl italic text-yellow-500">
              {String(currentIndex + 1).padStart(2, "0")}
              <span className="mx-2 text-muted">/</span>
              {String(images.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="absolute h-[500px] w-[360px] rounded-full bg-yellow-400/12 blur-[70px]" />

          <motion.button
            type="button"
            onClick={onOpen}
            whileHover={prefersMotionObject}
            className="group relative w-full max-w-[390px] text-left"
            aria-label={`Open ${currentImage.label}`}
          >
            <div className="rounded-[3.2rem] border border-white/15 bg-black p-3 shadow-[0_45px_110px_rgba(0,0,0,0.55),0_0_50px_rgba(250,204,21,0.12)]">
              <div className="relative overflow-hidden rounded-[2.5rem] bg-[#101010]">
                <div className="absolute left-1/2 top-3 z-20 h-5 w-24 -translate-x-1/2 rounded-full bg-black" />

                <div className="relative h-[610px] overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentImage.src}
                      initial={{ opacity: 0, x: 30, scale: 0.98 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -30, scale: 0.98 }}
                      transition={{
                        duration: 0.34,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="absolute inset-0"
                    >
                      <ImageWithFallback
                        image={currentImage}
                        className="h-full w-full object-contain p-4 pt-10 transition duration-500 group-hover:scale-[1.015]"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="flex items-center justify-between border-t border-white/10 px-5 py-4">
                  <div>
                    <p className="text-[8px] uppercase tracking-[0.25em] text-yellow-200/45">
                      Active screen
                    </p>
                    <p className="mt-1 text-sm text-white/75">
                      {currentImage.label}
                    </p>
                  </div>

                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.05] text-white/65">
                    <Maximize2 className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </div>
          </motion.button>
        </div>
      </div>

      <div className="border-t border-stroke bg-surface-elevated/55 px-5 py-5 md:px-8">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => onIndexChange(index)}
              className={`shrink-0 rounded-full border px-4 py-2 text-xs transition ${
                index === currentIndex
                  ? "border-yellow-400 bg-yellow-400 text-black"
                  : "border-stroke bg-surface text-muted hover:border-yellow-400/45 hover:text-text-primary"
              }`}
            >
              {String(index + 1).padStart(2, "0")}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const prefersMotionObject = {
  y: -4,
  rotate: 0.35,
  transition: { duration: 0.28 },
};

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
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-yellow-500/10 via-surface-elevated to-orange-500/10 p-6 ${className}`}
      >
        <div className="max-w-sm text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-yellow-300/25 bg-yellow-500/10">
            <ImageIcon className="h-6 w-6 text-yellow-500" />
          </div>

          <p className="mt-5 text-sm font-medium text-text-primary">
            Add {image.label}
          </p>

          <p className="mt-2 break-all font-mono text-[10px] leading-5 text-muted">
            {image.src}
          </p>
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
          : { opacity: 0, y: 26, filter: "blur(8px)" }
      }
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}