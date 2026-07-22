import { createFileRoute } from "@tanstack/react-router";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useTheme } from "@/components/theme/ThemeProvider";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  FileSearch,
  ImageIcon,
  LayoutDashboard,
  Lightbulb,
  Maximize2,
  MessageSquareWarning,
  Network,
  Newspaper,
  PencilRuler,
  Quote,
  Search,
  Sparkles,
  Target,
  UserRoundSearch,
  Workflow,
  X,
} from "lucide-react";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

export const Route = createFileRoute("/user-complaints")({
  component: UserComplaintsCaseStudy,
});

const PROJECT_REPORT_URL =
  "https://drive.google.com/drive/folders/1-2pnlPcaP8G9x5XzvXR-T6QLabpgS34Q?usp=drive_link";

type GalleryImage = {
  src: string;
  alt: string;
  label: string;
};

type LightboxState = {
  images: GalleryImage[];
  index: number;
} | null;

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "research", label: "Research" },
  { id: "define", label: "Define" },
  { id: "structure", label: "Structure" },
  { id: "wireframe", label: "Wireframe" },
  { id: "summary", label: "Summary" },
] as const;

const HERO_IMAGE: GalleryImage = {
  src: "/images/user-complaints/user-complaints-cover.png",
  alt: "User Complaints feature case study cover",
  label: "User Complaints Project Cover",
};

const RESEARCH_IMAGES: GalleryImage[] = [
  {
    src: "/images/user-complaints/research/survey-form.png",
    alt: "Google Form used for the User Complaints survey",
    label: "Survey Form",
  },
  {
    src: "/images/user-complaints/research/survey-result-summary.png",
    alt: "Summary and percentage analysis of survey responses",
    label: "Survey Result Summary",
  },
  {
    src: "/images/user-complaints/research/strong-points.png",
    alt: "Strong points derived from the survey result summary",
    label: "Strong Points",
  },
  {
    src: "/images/user-complaints/research/user-personas.png",
    alt: "Two User Complaints user personas selected from survey respondents",
    label: "User Personas",
  },
  {
    src: "/images/user-complaints/research/user-insights.png",
    alt: "User insights covering needs, expectations, solution ideas, and pain points",
    label: "User Insights",
  },
];

const PRIORITIZATION_IMAGES: GalleryImage[] = [
  {
    src: "/images/user-complaints/define/prioritization-matrix.png",
    alt: "Four-level prioritization matrix for User Complaints features",
    label: "Prioritization Matrix",
  },
  {
    src: "/images/user-complaints/define/not-implemented-features.png",
    alt: "User Complaints features that were not implemented",
    label: "Not Implemented",
  },
];

const TASK_FLOW_IMAGES: GalleryImage[] = [
  {
    src: "/images/user-complaints/task-flow/sign-in.png",
    alt: "Task flow for signing in",
    label: "01 · Sign In",
  },
  {
    src: "/images/user-complaints/task-flow/dashboard.png",
    alt: "Task flow for accessing the dashboard",
    label: "02 · Dashboard",
  },
  {
    src: "/images/user-complaints/task-flow/add-profile.png",
    alt: "Task flow for adding profile information",
    label: "03 · Add Profile",
  },
  {
    src: "/images/user-complaints/task-flow/topic-filter.png",
    alt: "Task flow for filtering complaints by topic",
    label: "04 · Topic Filter",
  },
  {
    src: "/images/user-complaints/task-flow/search-index-filter.png",
    alt: "Task flow for using the search index filter",
    label: "05 · Search Index",
  },
  {
    src: "/images/user-complaints/task-flow/post-detail.png",
    alt: "Task flow for opening a complaint post detail page",
    label: "06 · Post Detail",
  },
  {
    src: "/images/user-complaints/task-flow/comment-detail.png",
    alt: "Task flow for opening comment details",
    label: "07 · Comment Detail",
  },
  {
    src: "/images/user-complaints/task-flow/write-complaint.png",
    alt: "Task flow for writing and publishing a complaint",
    label: "08 · Write Complaint",
  },
  {
    src: "/images/user-complaints/task-flow/bookmark.png",
    alt: "Task flow for opening bookmarked complaint posts",
    label: "09 · Bookmark",
  },
  {
    src: "/images/user-complaints/task-flow/notification-popup.png",
    alt: "Task flow for opening the notification pop-up",
    label: "10 · Notification",
  },
  {
    src: "/images/user-complaints/task-flow/profile-page.png",
    alt: "Task flow for opening the profile page",
    label: "11 · Profile",
  },
];

const INFORMATION_ARCHITECTURE_IMAGES: GalleryImage[] = [
  {
    src: "/images/user-complaints/structure/information-architecture.png",
    alt: "Information architecture for the User Complaints feature",
    label: "Information Architecture",
  },
];

const EXPLORATION_IMAGES: GalleryImage[] = [
  {
    src: "/images/user-complaints/exploration/references.png",
    alt: "Visual and interaction references collected for User Complaints",
    label: "Design References",
  },
  {
    src: "/images/user-complaints/exploration/ux-sketches.png",
    alt: "Early UX sketches for the User Complaints feature",
    label: "UX Sketches",
  },
];

const WIREFRAME_IMAGES: GalleryImage[] = [
  {
    src: "/images/user-complaints/wireframe/home.png",
    alt: "User Complaints home page wireframe",
    label: "01 · Home",
  },
  {
    src: "/images/user-complaints/wireframe/complaint-detail.png",
    alt: "Complaint detail page wireframe",
    label: "02 · Complaint Detail",
  },
  {
    src: "/images/user-complaints/wireframe/more-options.png",
    alt: "Three-dot option menu wireframe",
    label: "03 · More Options",
  },
  {
    src: "/images/user-complaints/wireframe/comments.png",
    alt: "Complaint comments wireframe",
    label: "04 · Comments",
  },
  {
    src: "/images/user-complaints/wireframe/write-complaint.png",
    alt: "Write complaint page wireframe",
    label: "05 · Write Complaint",
  },
];

function UserComplaintsCaseStudy() {
  const pageRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { isDark } = useTheme();

  const [activeSection, setActiveSection] = useState("overview");
  const [lightbox, setLightbox] = useState<LightboxState>(null);
  const [researchIndex, setResearchIndex] = useState(0);
  const [prioritizationIndex, setPrioritizationIndex] = useState(0);
  const [taskFlowIndex, setTaskFlowIndex] = useState(0);
  const [explorationIndex, setExplorationIndex] = useState(0);
  const [wireframeIndex, setWireframeIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end end"],
  });

  const progressScale = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.25,
  });

  const heroY = useTransform(scrollYProgress, [0, 0.18], [0, -90]);
  const heroScale = useTransform(scrollYProgress, [0, 0.18], [1, 0.95]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.24]);

  const openGallery = (images: GalleryImage[], index = 0) => {
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
                className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/88 p-4 backdrop-blur-xl md:p-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onMouseDown={(event) => {
                  if (event.target === event.currentTarget) setLightbox(null);
                }}
              >
                <motion.div
                  role="dialog"
                  aria-modal="true"
                  aria-label="User Complaints project image preview"
                  initial={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: 30, scale: 0.96 }
                  }
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: 20, scale: 0.98 }
                  }
                  transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                  onMouseDown={(event) => event.stopPropagation()}
                  className="relative flex max-h-[92vh] w-full max-w-[1400px] flex-col overflow-hidden rounded-[1.75rem] border border-white/15 bg-[#070a10] shadow-[0_30px_120px_rgba(0,0,0,0.9),0_0_70px_rgba(59,130,246,0.16)]"
                >
                  <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 md:px-7">
                    <div className="min-w-0">
                      <p className="text-[9px] uppercase tracking-[0.3em] text-blue-200/50">
                        Project visual
                      </p>
                      <p className="mt-1 truncate text-sm text-white/75 md:text-base">
                        {lightbox.images[lightbox.index].label}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setLightbox(null)}
                      aria-label="Close image preview"
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/[0.05] text-white/60 transition hover:rotate-90 hover:border-blue-300/40 hover:text-white"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="relative flex min-h-0 flex-1 items-center justify-center bg-black/45 p-3 md:p-6">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={lightbox.images[lightbox.index].src}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -16 }}
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
                          className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white/65 backdrop-blur-md transition hover:border-blue-300/50 hover:bg-blue-500/20 hover:text-white md:left-7"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => moveLightbox("next")}
                          aria-label="Next image"
                          className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white/65 backdrop-blur-md transition hover:border-blue-300/50 hover:bg-blue-500/20 hover:text-white md:right-7"
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
                    <span className="font-display text-lg italic text-blue-100/65">
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
        className="fixed inset-x-0 top-0 z-[80] h-[2px] origin-left bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500"
      />

      <header className="fixed inset-x-0 top-0 z-[70] px-4 pt-4 md:px-7 md:pt-6">
        <div
          className={`mx-auto flex max-w-[1400px] items-center justify-between rounded-full border border-stroke bg-surface/85 px-3 py-2 backdrop-blur-xl md:px-4 ${
            isDark
              ? "shadow-[0_15px_50px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)]"
              : "shadow-[0_15px_50px_rgba(46,67,105,0.14),inset_0_1px_0_rgba(255,255,255,0.95)]"
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
            User Complaints · UI/UX Case Study
          </span>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href="#research"
              className={`inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-xs transition hover:border-blue-400/50 hover:bg-blue-500/20 ${
                isDark
                  ? "text-blue-100/75 hover:text-white"
                  : "text-blue-700 hover:text-blue-800"
              }`}
            >
              Explore process
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </header>

      <section className="relative flex min-h-screen items-center overflow-hidden px-6 pb-20 pt-32 md:px-10 lg:px-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 75% 38%, rgba(59,130,246,0.2), transparent 33%), radial-gradient(circle at 17% 78%, rgba(6,182,212,0.1), transparent 34%)",
          }}
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.055]"
          style={{
            backgroundImage: isDark
              ? "linear-gradient(rgba(255,255,255,0.34) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.34) 1px, transparent 1px)"
              : "linear-gradient(rgba(48,72,115,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(48,72,115,0.14) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
            maskImage:
              "radial-gradient(circle at center, black, transparent 76%)",
            WebkitMaskImage:
              "radial-gradient(circle at center, black, transparent 76%)",
          }}
        />

        <motion.div
          style={
            prefersReducedMotion
              ? undefined
              : { y: heroY, scale: heroScale, opacity: heroOpacity }
          }
          className="relative mx-auto grid w-full max-w-[1400px] items-center gap-14 lg:grid-cols-[0.92fr_1.08fr]"
        >
          <div>
            <Reveal>
              <div className="mb-7 flex items-center gap-3">
                <span className="h-px w-9 bg-gradient-to-r from-blue-400 to-transparent" />
                <span className="text-[10px] uppercase tracking-[0.36em] text-blue-300/70">
                  Media Complaint Publishing Feature
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="max-w-4xl text-[clamp(3.7rem,7.4vw,8rem)] leading-[0.84] tracking-[-0.065em] text-text-primary">
                User
                <span
                  className={`block font-display italic ${
                    isDark ? "text-blue-200" : "text-blue-600"
                  }`}
                >
                  Complaints.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-8 max-w-xl text-base leading-8 text-text-secondary md:text-lg">
                A complaint-publishing feature designed for the iNews website,
                allowing users to publicly share problems involving company
                products, services, applications, and digital platforms so the
                reported issue has a stronger opportunity to receive follow-up.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-9 flex flex-wrap gap-2.5">
                {["UX Research", "Media Platform", "Task Flow", "Wireframe"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-stroke bg-surface-elevated px-4 py-2 text-[10px] uppercase tracking-[0.16em] text-muted"
                    >
                      {tag}
                    </span>
                  ),
                )}
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-12 grid max-w-xl grid-cols-2 gap-x-8 gap-y-6 border-t border-stroke pt-7 sm:grid-cols-4">
                {[
                  ["Context", "iNews TV"],
                  ["Role", "UI/UX Designer"],
                  ["Scope", "Research to Wireframe"],
                  ["Platform", "News Website"],
                ].map(([label, value]) => (
                  <div key={label}>
                    <p className="text-[9px] uppercase tracking-[0.24em] text-muted">
                      {label}
                    </p>
                    <p className="mt-2 text-sm text-text-secondary">{value}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.18} className="relative">
            <div className="absolute -inset-10 rounded-full bg-blue-500/10 blur-[100px]" />
            <div
              className={`relative rotate-[1.25deg] rounded-[2.25rem] border border-stroke bg-surface/80 p-3 backdrop-blur-xl md:p-4 ${
                isDark
                  ? "shadow-[0_40px_110px_rgba(0,0,0,0.72),0_0_55px_rgba(59,130,246,0.14),inset_0_1px_0_rgba(255,255,255,0.1)]"
                  : "shadow-[0_32px_90px_rgba(46,67,105,0.2),0_0_45px_rgba(59,130,246,0.11),inset_0_1px_0_rgba(255,255,255,0.95)]"
              }`}
            >
              <button
                type="button"
                onClick={() => openGallery([HERO_IMAGE])}
                className="group relative block w-full overflow-hidden rounded-[1.65rem] bg-black/5"
                aria-label="Open User Complaints project cover"
              >
                <ImageWithFallback
                  image={HERO_IMAGE}
                  priority
                  className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-[1.025]"
                />
                <span className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white/70 opacity-0 backdrop-blur-md transition group-hover:opacity-100">
                  <Maximize2 className="h-4 w-4" />
                </span>
              </button>
            </div>
          </Reveal>
        </motion.div>
      </section>

      <div className="relative mx-auto grid max-w-[1400px] gap-12 px-6 md:px-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:px-16">
        <aside className="hidden lg:block">
          <div className="sticky top-32 py-8">
            <p className="mb-5 text-[9px] uppercase tracking-[0.3em] text-muted">
              Case Study
            </p>
            <nav className="space-y-1" aria-label="Case study sections">
              {SECTIONS.map((section, index) => {
                const isActive = activeSection === section.id;

                return (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs transition ${
                      isActive
                        ? isDark
                          ? "bg-blue-500/10 text-blue-100"
                          : "bg-blue-100 text-blue-700"
                        : "text-muted hover:bg-surface-elevated hover:text-text-primary"
                    }`}
                  >
                    <span
                      className={`font-display italic transition ${
                        isActive
                          ? isDark
                            ? "text-blue-300"
                            : "text-blue-600"
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
                  title="Giving public complaints a clearer path toward company response."
                  description="This project was assigned by my mentor during my time at iNews TV. The feature gives users a space on the iNews website to publish complaints concerning products, services, applications, websites, or other company-owned offerings. Public visibility through a media platform was expected to encourage faster and more accountable follow-up."
                />
              </Reveal>

              <div className="grid gap-4 md:grid-cols-2">
                {[
                  {
                    icon: Newspaper,
                    label: "Context",
                    title: "A complaint channel inside a media platform",
                    text: "The concept connects user-generated complaint stories with the visibility and credibility of an established news website.",
                  },
                  {
                    icon: MessageSquareWarning,
                    label: "Problem",
                    title: "Complaints are often ignored or difficult to escalate",
                    text: "Users need a structured way to document a problem publicly when normal customer-service channels do not lead to sufficient action.",
                  },
                  {
                    icon: Target,
                    label: "Goal",
                    title: "Increase the chance of meaningful follow-up",
                    text: "The feature should make complaint publishing understandable, traceable, and easy to explore for both writers and readers.",
                  },
                  {
                    icon: Workflow,
                    label: "Scope",
                    title: "Research through wireframe",
                    text: "The work covered survey research, user personas, insight synthesis, prioritization, task flows, information architecture, references, sketches, and wireframes.",
                  },
                ].map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <Reveal key={item.label} delay={index * 0.08}>
                      <article className="h-full rounded-[1.6rem] border border-stroke bg-surface p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.07)]">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-300/25 bg-blue-500/10">
                            <Icon className="h-5 w-5 text-blue-500" />
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

            <Reveal delay={0.24}>
              <div className="mt-12 rounded-[1.75rem] border border-blue-300/15 bg-blue-500/[0.055] p-6 md:p-8">
                <div className="grid gap-7 lg:grid-cols-[auto_1fr] lg:items-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-300/25 bg-blue-500/10">
                    <Quote className="h-6 w-6 text-blue-500" />
                  </div>
                  <p
                    className={`font-display text-xl italic leading-8 md:text-2xl ${
                      isDark ? "text-blue-50/82" : "text-blue-900/85"
                    }`}
                  >
                    “The product idea uses media visibility as leverage so a
                    complaint is not only submitted, but also seen, discussed,
                    and more difficult to ignore.”
                  </p>
                </div>
              </div>
            </Reveal>
          </section>

          <section id="research" className="scroll-mt-32 py-24 md:py-36">
            <div className="grid gap-12 xl:grid-cols-[0.72fr_1.28fr] xl:items-start">
              <div>
                <Reveal>
                  <SectionHeading
                    number="01"
                    eyebrow="Research"
                    title="Understanding how users experience and communicate complaints."
                    description="The research began with a Google Form containing questions about complaint experiences and expectations. I summarized the responses into percentages, extracted the strongest findings, selected two respondents with distinct answers for interviews, and translated their stories into personas and user insights."
                  />
                </Reveal>
              </div>

              <div className="min-w-0">
                <GallerySlider
                  eyebrow="Research evidence"
                  title="From broad survey responses to focused user insights."
                  description="The five research outputs show how raw responses were progressively translated into strong points, personas, needs, expectations, solution ideas, and pain points."
                  images={RESEARCH_IMAGES}
                  currentIndex={researchIndex}
                  onIndexChange={setResearchIndex}
                  onOpen={openGallery}
                  isDark={isDark}
                />
              </div>
            </div>

            <Reveal delay={0.12}>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {[
                  {
                    icon: ClipboardList,
                    title: "Survey",
                    text: "Questions gathered user experiences, habits, and expectations related to company complaints.",
                  },
                  {
                    icon: BarChart3,
                    title: "Result analysis",
                    text: "Responses were summarized and converted into percentages to reveal recurring patterns.",
                  },
                  {
                    icon: UserRoundSearch,
                    title: "Focused interviews",
                    text: "Two respondents with distinctive answers were selected for deeper interviews and persona development.",
                  },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <article
                      key={item.title}
                      className="h-full rounded-[1.35rem] border border-stroke bg-surface-elevated p-5"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-300/20 bg-blue-500/10">
                          <Icon className="h-4.5 w-4.5 text-blue-500" />
                        </div>

                        <div>
                          <h3 className="text-sm font-medium text-text-primary">
                            {item.title}
                          </h3>
                          <p className="mt-2 text-xs leading-6 text-muted">
                            {item.text}
                          </p>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </Reveal>
          </section>

          <section id="define" className="scroll-mt-32 py-24 md:py-36">
            <div
              className={`overflow-hidden rounded-[2.5rem] border border-stroke bg-surface p-5 md:p-8 xl:p-10 ${
                isDark
                  ? "shadow-[0_35px_110px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.06)]"
                  : "shadow-[0_30px_90px_rgba(46,67,105,0.14),inset_0_1px_0_rgba(255,255,255,0.95)]"
              }`}
            >
              <div className="grid gap-12 xl:grid-cols-[0.75fr_1.25fr] xl:items-start">
                <div>
                  <Reveal>
                    <SectionHeading
                      number="02"
                      eyebrow="Define"
                      title="Prioritizing the most valuable and realistic complaint features."
                      description="Insights from the research were organized into a four-level prioritization matrix. This helped distinguish the features that should be implemented from ideas that were valuable but not selected for the current scope."
                    />
                  </Reveal>

                </div>

                <div className="min-w-0">
                  <GallerySlider
                    eyebrow="Feature prioritization"
                    title="Separating immediate product needs from deferred ideas."
                    description="The two visuals document the prioritization matrix and the features that were not implemented in the selected solution."
                    images={PRIORITIZATION_IMAGES}
                    currentIndex={prioritizationIndex}
                    onIndexChange={setPrioritizationIndex}
                    onOpen={openGallery}
                    isDark={isDark}
                  />
                </div>
              </div>

              <Reveal delay={0.12}>
                <div className="mt-8 w-full rounded-[1.75rem] border border-blue-300/15 bg-blue-500/[0.055] p-6 md:p-7">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-blue-300/20 bg-blue-500/10">
                      <Lightbulb className="h-5 w-5 text-blue-500" />
                    </div>

                    <p className="max-w-4xl text-sm leading-7 text-muted md:text-base md:leading-8">
                      Prioritization protected the project from becoming too
                      broad. The final scope focused on the journeys required
                      to discover complaints, read discussion, publish a new
                      complaint, and manage a user profile.
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="mt-8 grid gap-4 border-t border-stroke pt-8 md:grid-cols-2">
                  <article className="rounded-[1.5rem] border border-blue-300/20 bg-blue-500/[0.07] p-6">
                    <p className="text-[9px] uppercase tracking-[0.24em] text-blue-500">
                      Selected direction
                    </p>
                    <h3 className="mt-3 text-xl text-text-primary">
                      Core complaint journeys
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-muted">
                      The selected scope supports authentication, complaint
                      discovery, filtering, search, post details, comments,
                      complaint writing, bookmarks, notifications, and profile
                      management.
                    </p>
                  </article>

                  <article className="rounded-[1.5rem] border border-stroke bg-surface-elevated p-6">
                    <p className="text-[9px] uppercase tracking-[0.24em] text-muted">
                      Deferred direction
                    </p>
                    <h3 className="mt-3 text-xl text-text-primary">
                      Valuable ideas outside the current scope
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-muted">
                      Features that were not implemented remain documented as
                      possible future improvements rather than being silently
                      removed from the design rationale.
                    </p>
                  </article>
                </div>
              </Reveal>
            </div>
          </section>

          <section id="structure" className="scroll-mt-32 py-24 md:py-36">
            <Reveal>
              <SectionHeading
                number="03"
                eyebrow="Structure"
                title="Mapping eleven task flows into one understandable information system."
                description="I mapped the main actions users need to complete, then organized their relationships through an information architecture. References and early UX sketches were used to explore possible interaction patterns before wireframing."
              />
            </Reveal>

            <div className="mt-10 min-w-0">
              <GallerySlider
                eyebrow="Eleven task flows"
                title="Documenting each important user journey before designing screens."
                description="The task flows cover sign in, dashboard access, profile completion, topic filtering, search indexing, complaint details, comment details, complaint writing, bookmarks, notification pop-ups, and the profile page."
                images={TASK_FLOW_IMAGES}
                currentIndex={taskFlowIndex}
                onIndexChange={setTaskFlowIndex}
                onOpen={openGallery}
                isDark={isDark}
                wide
              />
            </div>

            <div className="mt-6 grid gap-6 xl:grid-cols-2 xl:items-start">
              <Reveal>
                <ProcessImage
                  image={INFORMATION_ARCHITECTURE_IMAGES[0]}
                  images={INFORMATION_ARCHITECTURE_IMAGES}
                  index={0}
                  onOpen={openGallery}
                  aspectClass="h-[300px] md:h-[330px] xl:h-[355px]"
                />
              </Reveal>

              <Reveal delay={0.08}>
                <GallerySlider
                  eyebrow="Early exploration"
                  title="References and rough UX thinking before wireframing."
                  description="Visual references supported pattern exploration, while rough sketches helped test page relationships and content placement quickly."
                  images={EXPLORATION_IMAGES}
                  currentIndex={explorationIndex}
                  onIndexChange={setExplorationIndex}
                  onOpen={openGallery}
                  isDark={isDark}
                  compact
                />
              </Reveal>
            </div>

            <Reveal delay={0.16}>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { icon: Search, text: "Complaint discovery" },
                  { icon: FileSearch, text: "Post and comment details" },
                  { icon: PencilRuler, text: "Complaint publishing" },
                  { icon: Network, text: "Connected page structure" },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.text}
                      className="flex min-h-[76px] items-center justify-center gap-3 rounded-xl border border-stroke bg-surface-elevated px-4 py-3 text-center text-sm leading-6 text-muted"
                    >
                      <Icon className="h-4 w-4 shrink-0 text-blue-500" />
                      <span>{item.text}</span>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          </section>

          <section id="wireframe" className="scroll-mt-32 py-24 md:py-36">
            <div className="grid gap-12 xl:grid-cols-[0.7fr_1.3fr] xl:items-start">
              <div>
                <Reveal>
                  <SectionHeading
                    number="04"
                    eyebrow="Wireframe"
                    title="Translating the selected journeys into five core page structures."
                    description="The wireframes define the layout and interaction hierarchy for the homepage, complaint details, the three-dot option menu, comments, and the complaint-writing page."
                  />
                </Reveal>

                <Reveal delay={0.12}>
                  <div className="mt-9 rounded-[1.5rem] border border-stroke bg-surface-elevated p-5">
                    <div className="flex flex-wrap items-center gap-2 font-mono text-[9px] uppercase leading-6 tracking-[0.15em] text-muted">
                      <span className="text-blue-500">Research insight</span>
                      <span>→</span>
                      <span>Task flow</span>
                      <span>→</span>
                      <span>Information architecture</span>
                      <span>→</span>
                      <span className="text-blue-500">Wireframe</span>
                    </div>
                  </div>
                </Reveal>
              </div>

              <div className="min-w-0">
                <GallerySlider
                  eyebrow="Core wireframes"
                  title="Building a clear foundation for complaint discovery and publishing."
                  description="Each screen focuses on content hierarchy and essential actions before visual styling is introduced."
                  images={WIREFRAME_IMAGES}
                  currentIndex={wireframeIndex}
                  onIndexChange={setWireframeIndex}
                  onOpen={openGallery}
                  isDark={isDark}
                />
              </div>
            </div>
          </section>

          <section id="summary" className="scroll-mt-32 py-24 md:py-36">
            <div
              className={`relative overflow-hidden rounded-[2.5rem] border border-stroke bg-surface px-6 py-16 md:px-10 md:py-20 xl:px-14 xl:py-24 ${
                isDark
                  ? "shadow-[0_35px_110px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.06)]"
                  : "shadow-[0_30px_90px_rgba(46,67,105,0.14),inset_0_1px_0_rgba(255,255,255,0.95)]"
              }`}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-0 h-72 w-[620px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px]"
              />

              <div className="relative">
                <Reveal>
                  <div className="text-center">
                    <Sparkles className="mx-auto h-6 w-6 text-blue-500" />
                    <p className="mt-7 text-[9px] uppercase tracking-[0.34em] text-muted">
                      05 · Summary
                    </p>
                    <h2 className="mx-auto mt-5 max-w-4xl text-4xl leading-[1.08] tracking-[-0.04em] text-text-primary md:text-6xl">
                      Designing a public complaint journey that is structured,
                      visible, and easier to act on.
                    </h2>
                    <p className="mx-auto mt-7 max-w-3xl text-sm leading-7 text-muted md:text-base md:leading-8">
                      User Complaints demonstrates how survey data, focused
                      interviews, personas, prioritization, task flows,
                      information architecture, references, and wireframes can
                      turn a broad complaint-platform idea into a defined news
                      website feature. The project ends at wireframe level and
                      provides a clear foundation for later interface design and
                      prototyping.
                    </p>
                  </div>
                </Reveal>

                <div className="mt-12 grid gap-4 md:grid-cols-3">
                  {[
                    {
                      number: "01",
                      title: "Evidence-led decisions",
                      text: "Survey responses and interviews established the needs and frustrations behind public complaint behavior.",
                    },
                    {
                      number: "02",
                      title: "Controlled feature scope",
                      text: "Prioritization made the implemented direction explicit while preserving deferred ideas for future development.",
                    },
                    {
                      number: "03",
                      title: "Structured user journeys",
                      text: "Eleven task flows and one information architecture connected the product before screen-level design began.",
                    },
                  ].map((item, index) => (
                    <Reveal key={item.number} delay={index * 0.08}>
                      <article className="flex h-full min-h-[210px] flex-col rounded-[1.5rem] border border-stroke bg-surface-elevated p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-400/35">
                        <span className="font-display text-2xl italic text-blue-500">
                          {item.number}
                        </span>
                        <h3 className="mt-7 text-lg font-medium text-text-primary">
                          {item.title}
                        </h3>
                        <p className="mt-4 text-sm leading-7 text-muted">
                          {item.text}
                        </p>
                        <CheckCircle2 className="mt-auto h-4 w-4 box-content pt-6 text-blue-500" />
                      </article>
                    </Reveal>
                  ))}
                </div>

                <Reveal delay={0.22}>
                  <div className="mt-12 rounded-[1.75rem] border border-blue-300/20 bg-blue-500/[0.07] p-6 md:p-8">
                    <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.28em] text-blue-500">
                          Project Documentation
                        </p>

                        <h3 className="mt-4 text-2xl leading-tight tracking-[-0.03em] text-text-primary md:text-3xl">
                          Review the complete User Complaints project report.
                        </h3>

                        <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
                          The document contains the research process, survey
                          findings, user personas, prioritization, task flows,
                          information architecture, references, and wireframes.
                        </p>
                      </div>

                      <a
                        href={PROJECT_REPORT_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center justify-center gap-3 rounded-full border border-blue-400/35 bg-blue-500/15 px-6 py-3.5 text-sm text-text-primary transition hover:-translate-y-1 hover:border-blue-400/60 hover:bg-blue-500/25"
                      >
                        View Project Report
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={0.28}>
                  <div className="mt-10 flex justify-center">
                    <a
                      href="/#work"
                      className="group inline-flex items-center gap-3 rounded-full border border-stroke bg-surface-elevated px-6 py-3.5 text-sm text-text-secondary transition hover:-translate-y-1 hover:border-blue-400/40 hover:bg-blue-500/10 hover:text-text-primary"
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
        <span className="font-display text-xl italic text-blue-400/70">
          {number}
        </span>
        <span className="h-px w-8 bg-blue-400/35" />
        <span className="text-[9px] uppercase tracking-[0.28em] text-muted">
          {eyebrow}
        </span>
      </div>

      <h2 className="mt-6 text-4xl leading-[1.03] tracking-[-0.04em] text-text-primary md:text-5xl xl:text-6xl">
        {title}
      </h2>

      <p className="mt-6 max-w-2xl text-sm leading-7 text-muted md:text-base">
        {description}
      </p>
    </div>
  );
}

function GallerySlider({
  eyebrow,
  title,
  description,
  images,
  currentIndex,
  onIndexChange,
  onOpen,
  isDark,
  compact = false,
  wide = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  images: GalleryImage[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  onOpen: (images: GalleryImage[], index?: number) => void;
  isDark: boolean;
  compact?: boolean;
  wide?: boolean;
}) {
  const safeIndex = Math.min(currentIndex, images.length - 1);
  const currentImage = images[safeIndex];

  const showPrevious = () => {
    onIndexChange(safeIndex === 0 ? images.length - 1 : safeIndex - 1);
  };

  const showNext = () => {
    onIndexChange((safeIndex + 1) % images.length);
  };

  const gridClass = compact
    ? "grid min-w-0 gap-6 p-5 md:p-6 xl:grid-cols-[0.9fr_1.1fr] xl:items-center"
    : wide
      ? "grid min-w-0 gap-8 p-5 md:p-7 xl:grid-cols-[0.7fr_1.3fr] xl:items-center"
      : "grid min-w-0 gap-8 p-5 md:p-7 xl:grid-cols-2 xl:items-center";

  const imageHeightClass = compact
    ? "h-[250px] md:h-[290px] xl:h-[300px]"
    : wide
      ? "h-[300px] md:h-[380px] xl:h-[430px]"
      : "h-[280px] md:h-[330px] xl:h-[360px]";

  return (
    <div
      className={`h-full w-full min-w-0 overflow-hidden rounded-[2rem] border border-stroke bg-surface ${
        isDark
          ? "shadow-[0_35px_110px_rgba(0,0,0,0.48),inset_0_1px_0_rgba(255,255,255,0.06)]"
          : "shadow-[0_30px_90px_rgba(46,67,105,0.11),inset_0_1px_0_rgba(255,255,255,0.95)]"
      }`}
    >
      <div className={gridClass}>
        <div className="flex min-w-0 flex-col justify-center">
          <p className="text-[10px] uppercase tracking-[0.24em] text-blue-500/85">
            {eyebrow}
          </p>

          <h3
            className={`mt-4 max-w-[500px] leading-tight tracking-[-0.03em] text-text-primary ${
              compact ? "text-2xl md:text-[1.7rem]" : "text-2xl md:text-3xl"
            }`}
          >
            {title}
          </h3>

          {description && (
            <p
              className={`mt-4 max-w-[520px] text-muted ${
                compact
                  ? "text-xs leading-6 md:text-sm"
                  : "text-sm leading-7 md:text-base"
              }`}
            >
              {description}
            </p>
          )}

          {images.length > 1 && (
            <div className="mt-7 flex items-center gap-3">
              <button
                type="button"
                onClick={showPrevious}
                aria-label="Previous image"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-surface-elevated text-text-primary transition hover:border-blue-300/45 hover:text-blue-500"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={showNext}
                aria-label="Next image"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-surface-elevated text-text-primary transition hover:border-blue-300/45 hover:text-blue-500"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              <span className="text-sm text-muted">
                {String(safeIndex + 1).padStart(2, "0")} /{" "}
                {String(images.length).padStart(2, "0")}
              </span>
            </div>
          )}
        </div>

        <div className="min-w-0">
          <div
            className={`group relative overflow-hidden rounded-[1.6rem] border border-stroke bg-surface-elevated p-2 ${
              isDark
                ? "shadow-[0_24px_70px_rgba(0,0,0,0.42)]"
                : "shadow-[0_24px_70px_rgba(46,67,105,0.1)]"
            }`}
          >
            <button
              type="button"
              onClick={() => onOpen(images, safeIndex)}
              className="flex h-full w-full flex-col text-left"
              aria-label={`Open ${currentImage.label}`}
            >
              <div
                className={`relative overflow-hidden rounded-[1.2rem] bg-black/5 ${imageHeightClass}`}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImage.src}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{
                      duration: 0.32,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="absolute inset-0"
                  >
                    <ImageWithFallback
                      image={currentImage}
                      className="h-full w-full object-contain transition duration-500 group-hover:scale-[1.018]"
                    />
                  </motion.div>
                </AnimatePresence>

                <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white/70 opacity-0 backdrop-blur-md transition group-hover:opacity-100">
                  <Maximize2 className="h-4 w-4" />
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {images.length > 1 && (
        <div className="border-t border-stroke px-5 py-4 md:px-7">
          <div className="flex min-w-0 gap-2 overflow-x-auto pb-1">
            {images.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={() => onIndexChange(index)}
                className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-xs transition ${
                  index === safeIndex
                    ? "border-blue-500 bg-blue-500 text-white"
                    : "border-stroke bg-surface-elevated text-muted hover:border-blue-400/40 hover:text-text-primary"
                }`}
              >
                {image.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ProcessImage({
  image,
  images,
  index,
  onOpen,
  aspectClass,
}: {
  image: GalleryImage;
  images: GalleryImage[];
  index: number;
  onOpen: (images: GalleryImage[], index?: number) => void;
  aspectClass: string;
}) {
  return (
    <article className="group h-full overflow-hidden rounded-[1.7rem] border border-stroke bg-surface">
      <button
        type="button"
        onClick={() => onOpen(images, index)}
        className="block w-full text-left"
        aria-label={`Open ${image.label}`}
      >
        <div className={`relative flex-1 overflow-hidden bg-black/5 ${aspectClass}`}>
          <ImageWithFallback
            image={image}
            className="h-full w-full object-contain transition duration-500 group-hover:scale-[1.018]"
          />
          <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white/70 opacity-0 backdrop-blur-md transition group-hover:opacity-100">
            <Maximize2 className="h-4 w-4" />
          </span>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-stroke px-5 py-4">
          <span className="text-sm text-text-secondary">{image.label}</span>
          <ArrowUpRight className="h-4 w-4 text-blue-500" />
        </div>
      </button>
    </article>
  );
}

function ImageWithFallback({
  image,
  className,
  priority = false,
}: {
  image: GalleryImage;
  className?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex h-full w-full flex-col items-center justify-center gap-4 bg-surface-elevated px-6 text-center ${className ?? ""}`}
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-300/20 bg-blue-500/10">
          <ImageIcon className="h-6 w-6 text-blue-500" />
        </div>
        <div>
          <p className="text-sm font-medium text-text-primary">{image.label}</p>
          <p className="mt-2 max-w-sm text-xs leading-5 text-muted">
            Add the image file at:
            <span className="mt-1 block break-all font-mono text-blue-500">
              {image.src}
            </span>
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
      fetchPriority={priority ? "high" : "auto"}
      onError={() => setFailed(true)}
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
      className={className}
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}