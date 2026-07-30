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
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
  LayoutDashboard,
  Maximize2,
  PackageSearch,
  Search,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Tag,
  TimerReset,
  X,
} from "lucide-react";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

export const Route = createFileRoute("/amr-farms")({
  component: AmrFarmsCaseStudy,
});

type ProjectImage = {
  src: string;
  alt: string;
  label: string;
  category?: string;
};

type LightboxState = {
  images: ProjectImage[];
  index: number;
} | null;

const HERO_IMAGE: ProjectImage = {
  src: "/images/amr-farms/amr-farms-hero.png",
  alt: "AMR Farms mobile grocery application mockup",
  label: "AMR Farms Project Cover",
};

const MOBILE_WIREFRAMES: ProjectImage[] = [
  {
    src: "/images/amr-farms/mobile/authentication.png",
    alt: "AMR Farms mobile authentication wireframe",
    label: "Authentication",
    category: "Mobile",
  },
  {
    src: "/images/amr-farms/mobile/login-sign-up.png",
    alt: "AMR Farms mobile login and sign up wireframe",
    label: "Login & Sign Up",
    category: "Mobile",
  },
  {
    src: "/images/amr-farms/mobile/home.png",
    alt: "AMR Farms mobile home wireframe",
    label: "Home",
    category: "Mobile",
  },
  {
    src: "/images/amr-farms/mobile/flash-sale-01.png",
    alt: "AMR Farms first flash sale wireframe",
    label: "Flash Sale 01",
    category: "Mobile",
  },
  {
    src: "/images/amr-farms/mobile/flash-sale-02.png",
    alt: "AMR Farms second flash sale wireframe",
    label: "Flash Sale 02",
    category: "Mobile",
  },
  {
    src: "/images/amr-farms/mobile/flash-sale-03.png",
    alt: "AMR Farms third flash sale wireframe",
    label: "Flash Sale 03",
    category: "Mobile",
  },
];

const DESKTOP_WIREFRAMES: ProjectImage[] = [
  {
    src: "/images/amr-farms/desktop/admin-login.png",
    alt: "AMR Farms admin login wireframe",
    label: "Admin Login",
    category: "Desktop",
  },
  {
    src: "/images/amr-farms/desktop/report-period.png",
    alt: "AMR Farms report period wireframe",
    label: "Report Period",
    category: "Desktop",
  },
  {
    src: "/images/amr-farms/desktop/period-file.png",
    alt: "AMR Farms period file wireframe",
    label: "Period File",
    category: "Desktop",
  },
  {
    src: "/images/amr-farms/desktop/income-input.png",
    alt: "AMR Farms income data input wireframe",
    label: "Income Data Input",
    category: "Desktop",
  },
  {
    src: "/images/amr-farms/desktop/category.png",
    alt: "AMR Farms category management wireframe",
    label: "Category Management",
    category: "Desktop",
  },
  {
    src: "/images/amr-farms/desktop/report-output.png",
    alt: "AMR Farms report output wireframe",
    label: "Report Output",
    category: "Desktop",
  },
];

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "mobile", label: "Mobile Wireframes" },
  { id: "desktop", label: "Desktop Wireframes" },
  { id: "summary", label: "Summary" },
] as const;

function AmrFarmsCaseStudy() {
  const pageRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { isDark } = useTheme();

  const [activeSection, setActiveSection] = useState("overview");
  const [mobileIndex, setMobileIndex] = useState(0);
  const [desktopIndex, setDesktopIndex] = useState(0);
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

  const moveSlider = (
    currentIndex: number,
    setIndex: (value: number) => void,
    total: number,
    direction: "prev" | "next",
  ) => {
    const offset = direction === "next" ? 1 : -1;
    setIndex((currentIndex + offset + total) % total);
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
                  aria-label="AMR Farms project image preview"
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
                  className="relative flex max-h-[92vh] w-full max-w-[1380px] flex-col overflow-hidden rounded-[1.8rem] border border-white/15 bg-[#071007] shadow-[0_35px_130px_rgba(0,0,0,0.9),0_0_70px_rgba(132,204,22,0.12)]"
                >
                  <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 md:px-7">
                    <div className="min-w-0">
                      <p className="text-[9px] uppercase tracking-[0.3em] text-lime-200/50">
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
                        <button
                          type="button"
                          onClick={() => moveLightbox("prev")}
                          aria-label="Previous image"
                          className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/65 text-white/70 backdrop-blur-md transition hover:border-lime-300/55 hover:bg-lime-500/20 hover:text-white md:left-7"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => moveLightbox("next")}
                          aria-label="Next image"
                          className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/65 text-white/70 backdrop-blur-md transition hover:border-lime-300/55 hover:bg-lime-500/20 hover:text-white md:right-7"
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
      className="relative overflow-clip bg-bg text-text-primary"
    >
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progressScale }}
        className="fixed inset-x-0 top-0 z-[90] h-[2px] origin-left bg-gradient-to-r from-lime-300 via-green-500 to-emerald-500"
      />

      <header className="fixed inset-x-0 top-0 z-[70] px-4 pt-4 md:px-7 md:pt-6">
        <div
          className={`mx-auto flex max-w-[1400px] items-center justify-between rounded-full border border-stroke bg-surface/85 px-3 py-2 backdrop-blur-xl md:px-4 ${
            isDark
              ? "shadow-[0_15px_50px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)]"
              : "shadow-[0_15px_50px_rgba(45,70,25,0.14),inset_0_1px_0_rgba(255,255,255,0.95)]"
          }`}
        >
          <a
            href="/#work"
            className="group inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs text-muted transition hover:bg-surface-elevated hover:text-text-primary"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to projects
          </a>

          <span className="hidden text-[9px] uppercase tracking-[0.28em] text-muted sm:block">
            AMR Farms · Mobile & Admin Wireframes
          </span>

          <ThemeToggle />
        </div>
      </header>

      <section className="relative flex min-h-[100svh] items-center overflow-hidden px-6 pb-20 pt-32 md:px-10 lg:px-16">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 78% 38%, rgba(132,204,22,0.22), transparent 34%), radial-gradient(circle at 18% 72%, rgba(34,197,94,0.12), transparent 30%)",
          }}
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: isDark
              ? "linear-gradient(rgba(255,255,255,0.28) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.28) 1px, transparent 1px)"
              : "linear-gradient(rgba(34,80,20,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(34,80,20,0.16) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(circle at center, black, transparent 78%)",
            WebkitMaskImage:
              "radial-gradient(circle at center, black, transparent 78%)",
          }}
        />

        <div className="relative mx-auto grid w-full max-w-[1400px] items-center gap-14 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="h-px w-9 bg-gradient-to-r from-lime-400 to-transparent" />
                <span className="text-[10px] uppercase tracking-[0.36em] text-lime-500">
                  Mobile Grocery App + Admin Dashboard
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="mt-7 max-w-3xl text-[clamp(4.2rem,9vw,8.6rem)] leading-[0.83] tracking-[-0.07em] text-text-primary">
                AMR
                <span
                  className={`block font-display italic ${
                    isDark ? "text-lime-300" : "text-lime-600"
                  }`}
                >
                  Farms.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-8 max-w-xl text-base leading-8 text-text-secondary md:text-lg">
                A grocery-shopping experience that helps users discover food
                products, browse categories, and access limited-time flash-sale
                offers, supported by an administrative reporting system.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-9 flex flex-wrap gap-2.5">
                {[
                  "Mobile Wireframes",
                  "Desktop Wireframes",
                  "Grocery Commerce",
                  "Admin Reporting",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-stroke bg-surface-elevated px-4 py-2 text-[10px] uppercase tracking-[0.16em] text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.18}>
            <button
              type="button"
              onClick={() => openGallery([HERO_IMAGE])}
              aria-label="Open AMR Farms project cover"
              className="group relative block w-full overflow-hidden rounded-[2.2rem] border border-lime-300/25 bg-lime-500/10 p-2 shadow-[0_40px_110px_rgba(0,0,0,0.45),0_0_70px_rgba(132,204,22,0.13)]"
            >
              <div className="overflow-hidden rounded-[1.75rem] bg-black/5">
                <ImageWithFallback
                  image={HERO_IMAGE}
                  priority
                  className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-[1.02]"
                />
              </div>

              <span className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white/75 opacity-0 backdrop-blur-md transition group-hover:opacity-100">
                <Maximize2 className="h-4 w-4" />
              </span>
            </button>
          </Reveal>
        </div>
      </section>

      <div className="relative mx-auto grid max-w-[1400px] gap-12 px-6 md:px-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:px-16">
        <aside className="hidden lg:block">
          <div className="sticky top-32 py-10">
            <p className="mb-5 text-[9px] uppercase tracking-[0.3em] text-muted">
              Project Journey
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
                          : "bg-lime-100 text-lime-800"
                        : "text-muted hover:bg-surface-elevated hover:text-text-primary"
                    }`}
                  >
                    <span
                      className={`font-display italic ${
                        isActive
                          ? isDark
                            ? "text-lime-300"
                            : "text-lime-700"
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
            className="scroll-mt-32 border-t border-stroke py-24 md:py-32"
          >
            <div className="grid gap-14 xl:grid-cols-[0.78fr_1.22fr] xl:items-start">
              <Reveal>
                <SectionHeading
                  number="00"
                  eyebrow="Project overview"
                  title="Connecting a customer-facing grocery app with an administrative reporting system."
                  description="AMR Farms is a digital grocery concept that presents food products through a mobile shopping experience. The mobile wireframes cover authentication, login and registration, the main shopping page, and three flash-sale explorations. The desktop wireframes support administrative login, reporting periods, file management, income input, category management, and report output."
                />
              </Reveal>

              <div className="grid gap-4 md:grid-cols-2">
                {[
                  {
                    icon: Smartphone,
                    label: "Mobile",
                    title: "Customer shopping journey",
                    text: "Users move from authentication into product discovery, categories, and time-sensitive promotional offers.",
                  },
                  {
                    icon: LayoutDashboard,
                    label: "Desktop",
                    title: "Administrative workflow",
                    text: "The desktop system organizes report periods, transaction-related data, categories, files, and report output.",
                  },
                  {
                    icon: TimerReset,
                    label: "Commerce",
                    title: "Flash-sale experience",
                    text: "Limited-time campaigns create urgency while keeping products, categories, pricing, and sale periods visible.",
                  },
                  {
                    icon: PackageSearch,
                    label: "Product",
                    title: "Food discovery",
                    text: "The interface is designed around finding products quickly through search, categories, and highlighted deals.",
                  },
                ].map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <Reveal key={item.label} delay={index * 0.07}>
                      <article className="h-full rounded-[1.65rem] border border-stroke bg-surface p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-lime-300/25 bg-lime-500/10">
                            <Icon className="h-5 w-5 text-lime-500" />
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
              <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  { icon: Search, text: "Search and discover products" },
                  { icon: Tag, text: "Browse promotional offers" },
                  { icon: ShoppingBag, text: "Explore grocery categories" },
                  { icon: LayoutDashboard, text: "Manage business reports" },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.text}
                      className="flex min-h-[82px] items-center justify-center gap-3 rounded-2xl border border-stroke bg-surface-elevated px-4 py-4 text-center text-sm text-muted"
                    >
                      <Icon className="h-4 w-4 shrink-0 text-lime-500" />
                      <span>{item.text}</span>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          </section>

          <section id="mobile" className="scroll-mt-32 py-24 md:py-36">
            <Reveal>
              <SectionHeading
                number="01"
                eyebrow="Mobile wireframes"
                title="Six mobile frames establish the main customer journey."
                description="The mobile exploration covers the entry experience, authentication, login and registration, the main shopping page, and three flash-sale layouts. Together, the frames define how users enter the product, discover groceries, and respond to promotional urgency."
              />
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-12">
                <MobileShowcase
                  images={MOBILE_WIREFRAMES}
                  currentIndex={mobileIndex}
                  onIndexChange={setMobileIndex}
                  onPrevious={() =>
                    moveSlider(
                      mobileIndex,
                      setMobileIndex,
                      MOBILE_WIREFRAMES.length,
                      "prev",
                    )
                  }
                  onNext={() =>
                    moveSlider(
                      mobileIndex,
                      setMobileIndex,
                      MOBILE_WIREFRAMES.length,
                      "next",
                    )
                  }
                  onOpen={() =>
                    openGallery(MOBILE_WIREFRAMES, mobileIndex)
                  }
                  isDark={isDark}
                />
              </div>
            </Reveal>
          </section>

          <section id="desktop" className="scroll-mt-32 py-24 md:py-36">
            <Reveal>
              <SectionHeading
                number="02"
                eyebrow="Desktop wireframes"
                title="Six administrative frames organize business data and reporting."
                description="The desktop wireframes focus on the operational side of AMR Farms. Administrators can access the system, define report periods, review period files, input income data, manage product categories, and generate report output."
              />
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-12">
                <DesktopShowcase
                  images={DESKTOP_WIREFRAMES}
                  currentIndex={desktopIndex}
                  onIndexChange={setDesktopIndex}
                  onPrevious={() =>
                    moveSlider(
                      desktopIndex,
                      setDesktopIndex,
                      DESKTOP_WIREFRAMES.length,
                      "prev",
                    )
                  }
                  onNext={() =>
                    moveSlider(
                      desktopIndex,
                      setDesktopIndex,
                      DESKTOP_WIREFRAMES.length,
                      "next",
                    )
                  }
                  onOpen={() =>
                    openGallery(DESKTOP_WIREFRAMES, desktopIndex)
                  }
                  isDark={isDark}
                />
              </div>
            </Reveal>
          </section>

          <section id="summary" className="scroll-mt-32 py-24 md:py-36">
            <div
              className={`relative overflow-hidden rounded-[2.6rem] border border-stroke bg-surface px-6 py-16 md:px-10 md:py-20 xl:px-14 xl:py-24 ${
                isDark
                  ? "shadow-[0_40px_120px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.06)]"
                  : "shadow-[0_30px_90px_rgba(45,70,25,0.14),inset_0_1px_0_rgba(255,255,255,0.96)]"
              }`}
            >
              <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[650px] -translate-x-1/2 rounded-full bg-lime-500/12 blur-[120px]" />

              <div className="relative">
                <Reveal>
                  <div className="text-center">
                    <Sparkles className="mx-auto h-7 w-7 text-lime-500" />

                    <p className="mt-7 text-[9px] uppercase tracking-[0.34em] text-muted">
                      03 · Summary
                    </p>

                    <h2 className="mx-auto mt-5 max-w-4xl text-4xl leading-[1.06] tracking-[-0.045em] text-text-primary md:text-6xl">
                      One product concept, two interfaces, and a clearer
                      connection between shopping and administration.
                    </h2>

                    <p className="mx-auto mt-7 max-w-3xl text-sm leading-7 text-muted md:text-base md:leading-8">
                      AMR Farms combines a mobile grocery experience with a
                      desktop administrative system. The wireframes define the
                      customer journey from authentication to flash-sale
                      discovery, while the desktop flow structures reporting,
                      income data, category management, and business output.
                    </p>
                  </div>
                </Reveal>

                <div className="mt-12 grid gap-4 md:grid-cols-3">
                  {[
                    {
                      title: "Focused mobile journey",
                      text: "The six mobile frames prioritize essential entry, discovery, and promotional interactions.",
                    },
                    {
                      title: "Operational desktop flow",
                      text: "The six desktop frames translate business reporting and management needs into a structured interface.",
                    },
                    {
                      title: "Consistent product direction",
                      text: "Both platforms support one connected grocery-commerce concept with different user responsibilities.",
                    },
                  ].map((item, index) => (
                    <Reveal key={item.title} delay={index * 0.07}>
                      <article className="flex h-full min-h-[205px] flex-col rounded-[1.5rem] border border-stroke bg-surface-elevated p-6">
                        <span className="font-display text-2xl italic text-lime-500">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <h3 className="mt-7 text-lg font-medium text-text-primary">
                          {item.title}
                        </h3>

                        <p className="mt-4 text-sm leading-7 text-muted">
                          {item.text}
                        </p>

                        <CheckCircle2 className="mt-auto h-4 w-4 box-content pt-6 text-lime-500" />
                      </article>
                    </Reveal>
                  ))}
                </div>

                <Reveal delay={0.24}>
                  <div className="mt-10 flex justify-center">
                    <a
                      href="/#work"
                      className="group inline-flex items-center gap-3 rounded-full border border-stroke bg-surface-elevated px-6 py-3.5 text-sm text-text-secondary transition hover:-translate-y-1 hover:border-lime-400/45 hover:bg-lime-500/10 hover:text-text-primary"
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
        <span className="font-display text-xl italic text-lime-500">
          {number}
        </span>

        <span className="h-px w-8 bg-lime-400/45" />

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

function MobileShowcase({
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
          ? "shadow-[0_40px_130px_rgba(0,0,0,0.56),0_0_70px_rgba(132,204,22,0.07),inset_0_1px_0_rgba(255,255,255,0.06)]"
          : "shadow-[0_30px_95px_rgba(45,70,25,0.14),inset_0_1px_0_rgba(255,255,255,0.95)]"
      }`}
    >
      <div className="relative grid min-h-[630px] gap-10 overflow-hidden p-6 md:p-10 xl:grid-cols-[0.82fr_1.18fr] xl:items-center xl:p-12">
        <div className="pointer-events-none absolute -right-24 top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full bg-lime-500/12 blur-[110px]" />

        <div className="relative">
          <p className="text-[10px] uppercase tracking-[0.3em] text-lime-500">
            Customer mobile experience
          </p>

          <h3 className="mt-5 max-w-xl text-4xl leading-[1.02] tracking-[-0.045em] text-text-primary md:text-5xl">
            Move through six focused mobile wireframes.
          </h3>

          <p className="mt-6 max-w-xl text-sm leading-7 text-muted md:text-base">
            The mobile flow starts with access and authentication before moving
            into the shopping homepage and three flash-sale explorations.
          </p>

          <div className="mt-8 flex items-center gap-3">
            <SliderButton label="Previous mobile wireframe" onClick={onPrevious}>
              <ChevronLeft className="h-5 w-5" />
            </SliderButton>

            <SliderButton label="Next mobile wireframe" onClick={onNext}>
              <ChevronRight className="h-5 w-5" />
            </SliderButton>

            <span className="ml-2 font-display text-xl italic text-lime-500">
              {String(currentIndex + 1).padStart(2, "0")}
              <span className="mx-2 text-muted">/</span>
              {String(images.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="absolute h-[490px] w-[350px] rounded-full bg-lime-400/14 blur-[72px]" />

          <motion.button
            type="button"
            onClick={onOpen}
            whileHover={
              prefersReducedMotionValue
                ? undefined
                : {
                    y: -4,
                    rotate: 0.35,
                    transition: { duration: 0.28 },
                  }
            }
            className="group relative w-full max-w-[380px] text-left"
            aria-label={`Open ${currentImage.label}`}
          >
            <div className="rounded-[3.15rem] border border-white/15 bg-black p-3 shadow-[0_45px_110px_rgba(0,0,0,0.55),0_0_50px_rgba(132,204,22,0.12)]">
              <div className="relative overflow-hidden rounded-[2.45rem] bg-[#0d120d]">
                <div className="absolute left-1/2 top-3 z-20 h-5 w-24 -translate-x-1/2 rounded-full bg-black" />

                <div className="relative h-[585px] overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentImage.src}
                      initial={{ opacity: 0, x: 28, scale: 0.98 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -28, scale: 0.98 }}
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
                    <p className="text-[8px] uppercase tracking-[0.25em] text-lime-200/45">
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

      <SelectorBar
        images={images}
        currentIndex={currentIndex}
        onIndexChange={onIndexChange}
      />
    </div>
  );
}

function DesktopShowcase({
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
          ? "shadow-[0_40px_130px_rgba(0,0,0,0.56),0_0_70px_rgba(132,204,22,0.07),inset_0_1px_0_rgba(255,255,255,0.06)]"
          : "shadow-[0_30px_95px_rgba(45,70,25,0.14),inset_0_1px_0_rgba(255,255,255,0.95)]"
      }`}
    >
      <div className="relative overflow-hidden p-6 md:p-10 xl:p-12">
        <div className="pointer-events-none absolute -left-24 top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full bg-green-500/10 blur-[110px]" />

        <div className="relative grid gap-10 xl:grid-cols-[0.72fr_1.28fr] xl:items-center">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-lime-500">
              Administrative desktop system
            </p>

            <h3 className="mt-5 max-w-xl text-4xl leading-[1.02] tracking-[-0.045em] text-text-primary md:text-5xl">
              Review six operational desktop wireframes.
            </h3>

            <p className="mt-6 max-w-xl text-sm leading-7 text-muted md:text-base">
              The desktop flow covers secure access, report periods, files,
              income input, category management, and report output.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <SliderButton
                label="Previous desktop wireframe"
                onClick={onPrevious}
              >
                <ChevronLeft className="h-5 w-5" />
              </SliderButton>

              <SliderButton label="Next desktop wireframe" onClick={onNext}>
                <ChevronRight className="h-5 w-5" />
              </SliderButton>

              <span className="ml-2 font-display text-xl italic text-lime-500">
                {String(currentIndex + 1).padStart(2, "0")}
                <span className="mx-2 text-muted">/</span>
                {String(images.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpen}
            className="group relative block w-full overflow-hidden rounded-[2rem] border border-stroke bg-surface-elevated p-2 text-left"
            aria-label={`Open ${currentImage.label}`}
          >
            <div className="overflow-hidden rounded-[1.55rem] bg-black/5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImage.src}
                  initial={{ opacity: 0, x: 26 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -26 }}
                  transition={{
                    duration: 0.34,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <ImageWithFallback
                    image={currentImage}
                    className="aspect-[16/10] w-full object-contain p-4 transition duration-500 group-hover:scale-[1.01]"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between px-3 pb-2 pt-4">
              <div>
                <p className="text-[8px] uppercase tracking-[0.25em] text-lime-500">
                  Active desktop screen
                </p>
                <p className="mt-1 text-sm text-text-secondary">
                  {currentImage.label}
                </p>
              </div>

              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-surface text-muted transition group-hover:border-lime-400/45 group-hover:text-lime-500">
                <Maximize2 className="h-4 w-4" />
              </span>
            </div>
          </button>
        </div>
      </div>

      <SelectorBar
        images={images}
        currentIndex={currentIndex}
        onIndexChange={onIndexChange}
      />
    </div>
  );
}

function SelectorBar({
  images,
  currentIndex,
  onIndexChange,
}: {
  images: ProjectImage[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
}) {
  return (
    <div className="border-t border-stroke bg-surface-elevated/55 px-5 py-5 md:px-8">
      <div className="flex gap-2 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => onIndexChange(index)}
            className={`shrink-0 rounded-full border px-4 py-2 text-xs transition ${
              index === currentIndex
                ? "border-lime-400 bg-lime-400 text-black"
                : "border-stroke bg-surface text-muted hover:border-lime-400/45 hover:text-text-primary"
            }`}
          >
            {image.label}
          </button>
        ))}
      </div>
    </div>
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
      className="flex h-11 w-11 items-center justify-center rounded-full border border-stroke bg-surface-elevated text-text-primary transition hover:border-lime-400/50 hover:text-lime-500"
    >
      {children}
    </button>
  );
}

const prefersReducedMotionValue = false;

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
        className={`flex items-center justify-center bg-gradient-to-br from-lime-500/10 via-surface-elevated to-green-500/10 p-6 ${className}`}
      >
        <div className="max-w-sm text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-lime-300/25 bg-lime-500/10">
            <ImageIcon className="h-6 w-6 text-lime-500" />
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