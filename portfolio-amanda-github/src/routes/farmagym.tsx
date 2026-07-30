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
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
  Maximize2,
  MousePointer2,
  Quote,
  Search,
  Sparkles,
  Workflow,
  X,
} from "lucide-react";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

export const Route = createFileRoute("/farmagym")({
  component: FarmaGymCaseStudy,
});

type GalleryImage = {
  src: string;
  alt: string;
  label: string;
};

type LightboxState = {
  images: GalleryImage[];
  index: number;
} | null;

type PrototypeGroup = {
  id: string;
  label: string;
  title: string;
  description: string;
  prototypeUrl?: string;
  images: GalleryImage[];
};

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "empathize", label: "Emphatize" },
  { id: "define", label: "Define" },
  { id: "ideate", label: "Ideate" },
  { id: "prototype", label: "Prototype" },
  { id: "summary", label: "Summary" },
] as const;

/**
 * IMAGE LOCATION
 * Save all Empathize, Define, and Ideate images inside:
 * public/images/farmagym/
 *
 * The browser paths below therefore begin with:
 * /images/farmagym/
 */
const PERSONA_IMAGES: GalleryImage[] = [
  {
    src: "/images/farmagym/user-persona-01.jpg",
    alt: "FarmaGym user persona based on the first interview",
    label: "User Persona 01",
  },
  {
    src: "/images/farmagym/user-persona-02.jpg",
    alt: "FarmaGym user persona based on the second interview",
    label: "User Persona 02",
  },
];

const EMPHATIZE_IMAGES: GalleryImage[] = [
  {
    src: "/images/farmagym/interview-questions.jpg",
    alt: "Interview questions used during FarmaGym user research",
    label: "Interview Questions",
  },
];

const DEFINE_IMAGES: GalleryImage[] = [
  {
    src: "/images/farmagym/define.png",
    alt: "Grouped user problems identified during the Define stage",
    label: "Define — Grouped User Problems",
  },
];

const SOLUTION_IDEA_IMAGES: GalleryImage[] = [
  {
    src: "/images/farmagym/ideate-solution-01.png",
    alt: "First solution idea based on FarmaGym user problems",
    label: "Solution Ideas 01",
  },
  {
    src: "/images/farmagym/ideate-solution-02.png",
    alt: "Second solution idea based on FarmaGym user problems",
    label: "Solution Ideas 02",
  },
  {
    src: "/images/farmagym/ideate-solution-03.png",
    alt: "Third solution idea based on FarmaGym user problems",
    label: "Solution Ideas 03",
  },
];

const FEATURE_SOLUTION_IMAGES: GalleryImage[] = [
  {
    src: "/images/farmagym/ideate-feature-solutions.png",
    alt: "FarmaGym feature solutions generated during the Ideate stage",
    label: "Feature Solutions",
  },
];

const PRIORITIZATION_IMAGES: GalleryImage[] = [
  {
    src: "/images/farmagym/ideate-prioritization-matrix.png",
    alt: "FarmaGym idea prioritization matrix",
    label: "Prioritization Matrix",
  },
];

const PROTOTYPE_GROUPS: PrototypeGroup[] = [
  {
    id: "taskflow",
    label: "Userflow & Taskflow",
    title: "Mapping the key credential and scheduling flows.",
    description:
      "At this stage, I created user flows and task flows to map the main user journeys, including signing in, creating an account, using alternative login methods, viewing workout schedules, and adding new workout plans.",
    images: [
      {
        src: "/images/farmagym/prototype/taskflow-signin.png",
        alt: "Task Flow Sign In",
        label: "Task Flow: Sign In",
      },
      {
        src: "/images/farmagym/prototype/taskflow-login-skip.png",
        alt: "Task Flow Login Skip",
        label: "Task Flow: Login Skip",
      },
      {
        src: "/images/farmagym/prototype/taskflow-signup.png",
        alt: "Task Flow Sign Up",
        label: "Task Flow: Sign Up",
      },
      {
        src: "/images/farmagym/prototype/taskflow-facebook.png",
        alt: "Task Flow Login Facebook",
        label: "Task Flow: Login Facebook",
      },
      {
        src: "/images/farmagym/prototype/taskflow-google.png",
        alt: "Task Flow Login Google",
        label: "Task Flow: Login Google",
      },
      {
        src: "/images/farmagym/prototype/taskflow-apple.png",
        alt: "Task Flow Login Apple",
        label: "Task Flow: Login Apple",
      },
      {
        src: "/images/farmagym/prototype/taskflow-show-schedule.png",
        alt: "Task Flow Tampilkan Jadwal Olahraga",
        label: "Task Flow: Tampilkan Jadwal Olahraga",
      },
      {
        src: "/images/farmagym/prototype/taskflow-add-schedule.png",
        alt: "Task Flow Menambahkan Jadwal Olahraga",
        label: "Task Flow: Menambahkan Jadwal Olahraga",
      },
      {
        src: "/images/farmagym/prototype/userflow-credential.png",
        alt: "User Flow Credential",
        label: "User Flow: Credential",
      },
    ],
  },
  {
    id: "information-architecture",
    label: "Information Architecture",
    title: "Structuring the app’s features, screens, and relationships.",
    description:
      "At this stage, I developed the application’s information architecture to organize its features, pages, buttons, and content relationships, creating a clearer structure before moving into visual design.",
    images: [
      {
        src: "/images/farmagym/prototype/information-architecture.png",
        alt: "Information Architecture",
        label: "Information Architecture",
      },
    ],
  },
  {
    id: "low-fidelity",
    label: "Low Fidelity",
    title: "The rough sketch before the interface becomes visual.",
    description:
      "This stage represents the initial rough structure of the application before visual styling is applied. The low-fidelity design helped me define the layout, element placement, and basic user flow.",
    images: [
      {
        src: "/images/farmagym/prototype/low-fidelity.png",
        alt: "Low Fidelity",
        label: "Low Fidelity",
      },
    ],
  },
  {
    id: "design-system",
    label: "Design System",
    title: "Defining the visual foundation of the product.",
    description:
      "At this stage, I defined the colors, spacing, typography, shadows, icons, grid, and UI elements to maintain a consistent visual system throughout the application.",
    images: [
      {
        src: "/images/farmagym/prototype/design-system.png",
        alt: "Design System",
        label: "Design System",
      },
    ],
  },
  {
    id: "high-fidelity",
    label: "High Fidelity",
    title: "Developing the final interface with the design system.",
    description:
      "At this stage, I developed the low-fidelity design into a high-fidelity interface using the design system I created, resulting in a clearer, more polished, and prototype-ready application.",
    images: [
      {
        src: "/images/farmagym/prototype/highfi-login.png",
        alt: "High Fidelity Login",
        label: "Login",
      },
      {
        src: "/images/farmagym/prototype/highfi-signup.png",
        alt: "High Fidelity Sign Up",
        label: "Sign Up",
      },
      {
        src: "/images/farmagym/prototype/highfi-home.png",
        alt: "High Fidelity Home",
        label: "Home",
      },
      {
        src: "/images/farmagym/prototype/highfi-add-plans.png",
        alt: "High Fidelity Add Plans",
        label: "Fitur Add Plan’s",
      },
    ],
  },
  {
    id: "prototype-link",
    label: "Prototype",
    title: "Turning the designed screens into an interactive experience.",
    description:
      "Here is the interactive prototype I created to demonstrate how users navigate and interact with the application.",
    prototypeUrl: "https://www.figma.com/proto/GTmkNDH61vU7Y08jPCzfMm/07_Interface-Structure?node-id=527-4052&viewport=82%2C335%2C0.07&t=Pp9QAM90adyxP30R-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=527%3A4049&page-id=524%3A1840",
    images: [
      {
        src: "/images/farmagym/prototype/prototype-preview.png",
        alt: "Prototype Preview",
        label: "Prototype Preview",
      },
    ],
  },
];

function FarmaGymCaseStudy() {
  const pageRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { isDark } = useTheme();
  const [activeSection, setActiveSection] = useState("overview");
  const [lightbox, setLightbox] = useState<LightboxState>(null);
  const [solutionIdeaIndex, setSolutionIdeaIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end end"],
  });

  const [activePrototypeGroup, setActivePrototypeGroup] =
    useState("taskflow");
  const [prototypeSlides, setPrototypeSlides] = useState<
    Record<string, number>
  >({
    taskflow: 0,
    "information-architecture": 0,
    "low-fidelity": 0,
    "design-system": 0,
    "high-fidelity": 0,
    "prototype-link": 0,
  });

  const activePrototype =
    PROTOTYPE_GROUPS.find((group) => group.id === activePrototypeGroup) ??
    PROTOTYPE_GROUPS[0];

  const goPrototypeSlide = (
    groupId: string,
    direction: "prev" | "next",
  ) => {
    const group = PROTOTYPE_GROUPS.find((item) => item.id === groupId);
    if (!group) return;

    setPrototypeSlides((previous) => {
      const current = previous[groupId] ?? 0;
      const total = group.images.length;
      const nextIndex =
        direction === "next"
          ? (current + 1) % total
          : (current - 1 + total) % total;

      return {
        ...previous,
        [groupId]: nextIndex,
      };
    });
  };

  const progressScale = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.25,
  });

  const heroY = useTransform(scrollYProgress, [0, 0.18], [0, -90]);
  const heroScale = useTransform(scrollYProgress, [0, 0.18], [1, 0.94]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.2]);

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

      if (event.key === "ArrowLeft") {
        setLightbox((current) => {
          if (!current) return current;
          return {
            ...current,
            index:
              (current.index - 1 + current.images.length) %
              current.images.length,
          };
        });
      }

      if (event.key === "ArrowRight") {
        setLightbox((current) => {
          if (!current) return current;
          return {
            ...current,
            index: (current.index + 1) % current.images.length,
          };
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightbox]);

  const openGallery = (images: GalleryImage[], index = 0) => {
    setLightbox({ images, index });
  };

  const showPreviousImage = () => {
    setLightbox((current) => {
      if (!current) return current;
      return {
        ...current,
        index:
          (current.index - 1 + current.images.length) % current.images.length,
      };
    });
  };

  const showNextImage = () => {
    setLightbox((current) => {
      if (!current) return current;
      return {
        ...current,
        index: (current.index + 1) % current.images.length,
      };
    });
  };

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
                  aria-label="FarmaGym project image preview"
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
                  className="relative flex max-h-[92vh] w-full max-w-[1400px] flex-col overflow-hidden rounded-[1.75rem] border border-white/15 bg-[#080808] shadow-[0_30px_120px_rgba(0,0,0,0.9),0_0_60px_rgba(236,72,153,0.14)]"
                >
                  <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 md:px-7">
                    <div className="min-w-0">
                      <p className="text-[9px] uppercase tracking-[0.3em] text-pink-200/50">
                        Process visual
                      </p>
                      <p className="mt-1 truncate text-sm text-white/75 md:text-base">
                        {lightbox.images[lightbox.index].label}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setLightbox(null)}
                      aria-label="Close image preview"
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/[0.05] text-white/60 transition hover:rotate-90 hover:border-pink-300/40 hover:text-white"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="relative flex min-h-0 flex-1 items-center justify-center bg-black/55 p-3 md:p-6">
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
                          onClick={showPreviousImage}
                          aria-label="Previous image"
                          className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white/65 backdrop-blur-md transition hover:border-pink-300/50 hover:bg-pink-500/20 hover:text-white md:left-7"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>

                        <button
                          type="button"
                          onClick={showNextImage}
                          aria-label="Next image"
                          className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white/65 backdrop-blur-md transition hover:border-pink-300/50 hover:bg-pink-500/20 hover:text-white md:right-7"
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

                    <span className="font-display text-lg italic text-pink-100/65">
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
        className="fixed inset-x-0 top-0 z-[80] h-[2px] origin-left bg-gradient-to-r from-fuchsia-500 via-pink-400 to-rose-400"
      />

      <header className="fixed inset-x-0 top-0 z-[70] px-4 pt-4 md:px-7 md:pt-6">
        <div
          className={`mx-auto flex max-w-[1400px] items-center justify-between rounded-full border border-stroke bg-surface/85 px-3 py-2 backdrop-blur-xl md:px-4 ${isDark ? "shadow-[0_15px_50px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)]" : "shadow-[0_15px_50px_rgba(65,40,53,0.14),inset_0_1px_0_rgba(255,255,255,0.95)]"}`}
        >
          <a
            href="/#work"
            className="group inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs text-muted transition hover:bg-surface-elevated hover:text-text-primary"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to projects
          </a>

          <span className="hidden text-[9px] uppercase tracking-[0.28em] text-muted sm:block">
            FarmaGym · UI/UX Case Study
          </span>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            <a
              href="#empathize"
              className={`inline-flex items-center gap-2 rounded-full border border-pink-400/30 bg-pink-500/10 px-4 py-2 text-xs transition hover:border-pink-400/50 hover:bg-pink-500/20 ${isDark ? "text-pink-100/75 hover:text-white" : "text-pink-700 hover:text-pink-800"}`}
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
              "radial-gradient(circle at 72% 40%, rgba(236,72,153,0.18), transparent 32%), radial-gradient(circle at 18% 75%, rgba(168,85,247,0.12), transparent 34%)",
          }}
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.055]"
          style={{
            backgroundImage: isDark
              ? "linear-gradient(rgba(255,255,255,0.34) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.34) 1px, transparent 1px)"
              : "linear-gradient(rgba(79,52,67,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(79,52,67,0.12) 1px, transparent 1px)",
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
          className="relative mx-auto grid w-full max-w-[1400px] items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]"
        >
          <div>
            <Reveal>
              <div className="mb-7 flex items-center gap-3">
                <span className="h-px w-9 bg-gradient-to-r from-pink-400 to-transparent" />
                <span className="text-[10px] uppercase tracking-[0.36em] text-pink-100/55">
                  Mobile App · Full Design Thinking
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="max-w-4xl text-[clamp(4rem,8vw,8.7rem)] leading-[0.82] tracking-[-0.065em] text-text-primary">
                Farma
                <span
                  className={`font-display italic ${isDark ? "text-pink-200" : "text-pink-600"}`}
                >
                  Gym.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-8 max-w-xl text-base leading-8 text-text-secondary md:text-lg">
                A research-led fitness planning experience shaped through user
                interviews, synthesis, structured flows, interface design, and
                interactive prototyping.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-9 flex flex-wrap gap-2.5">
                {[
                  "UI/UX Design",
                  "User Research",
                  "Mobile App",
                  "Prototype",
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

            <Reveal delay={0.3}>
              <div className="mt-12 grid max-w-xl grid-cols-2 gap-x-8 gap-y-6 border-t border-stroke pt-7 sm:grid-cols-4">
                {[
                  ["Role", "UI/UX Designer"],
                  ["Scope", "End-to-end"],
                  ["Platform", "Mobile App"],
                  ["Method", "Design Thinking"],
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
            <div className="absolute -inset-10 rounded-full bg-pink-500/10 blur-[100px]" />
            <div
              className={`relative rotate-[1.5deg] rounded-[2.25rem] border border-stroke bg-surface/80 p-3 backdrop-blur-xl md:p-4 ${isDark ? "shadow-[0_40px_110px_rgba(0,0,0,0.72),0_0_50px_rgba(236,72,153,0.12),inset_0_1px_0_rgba(255,255,255,0.1)]" : "shadow-[0_32px_90px_rgba(65,40,53,0.2),0_0_45px_rgba(236,72,153,0.12),inset_0_1px_0_rgba(255,255,255,0.95)]"}`}
            >
              <button
                type="button"
                onClick={() =>
                  openGallery([
                    {
                      src: "/images/farmagym/farmagym_mockup.png",
                      alt: "FarmaGym project cover",
                      label: "FarmaGym Project Cover",
                    },
                  ])
                }
                className="group relative block w-full overflow-hidden rounded-[1.65rem] bg-black"
                aria-label="Open FarmaGym project cover"
              >
                <ImageWithFallback
                  image={{
                    src: "/images/farmagym/farmagym_mockup.png",
                    alt: "FarmaGym project cover",
                    label: "FarmaGym Project Cover",
                  }}
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
              Research Result
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
                          ? "bg-pink-500/10 text-pink-100"
                          : "bg-pink-100 text-pink-700"
                        : "text-muted hover:bg-surface-elevated hover:text-text-primary"
                    }`}
                  >
                    <span
                      className={`font-display italic transition ${
                        isActive
                          ? isDark
                            ? "text-pink-300"
                            : "text-pink-600"
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
            <div className="grid gap-14 xl:grid-cols-[0.75fr_1.25fr] xl:items-start">
              {/* Overview heading */}
              <Reveal>
                <SectionHeading
                  number="00"
                  eyebrow="Project overview"
                  title="Helping users build workout routines that fit their goals."
                  description="FarmaGym is a mobile fitness-planning application designed to help users organize, schedule, and maintain their workout routines more conveniently."
                />
              </Reveal>

              {/* Overview information */}
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  {
                    icon: Search,
                    label: "Overview",
                    title: "Workout planning made simple",
                    text: "Users can choose exercises, set duration and repetitions, schedule workouts, and receive reminders.",
                  },
                  {
                    icon: Sparkles,
                    label: "Goals",
                    title: "Improve the core experience",
                    text: "Redesign the interface and prioritize the main workout-planning feature.",
                  },
                  {
                    icon: MousePointer2,
                    label: "My Role",
                    title: "UI/UX Designer",
                    text: "Responsible for research, user flows, interface design, and interactive prototyping.",
                  },
                  {
                    icon: Workflow,
                    label: "Methodology",
                    title: "Design Thinking",
                    text: "Empathize, Define, Ideate, Prototype, and Test.",
                  },
                ].map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <Reveal key={item.label} delay={index * 0.08}>
                      <article className="h-full rounded-[1.6rem] border border-stroke bg-surface p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.07)]">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-pink-300/25 bg-pink-500/10">
                            <Icon className="h-5 w-5 text-pink-500" />
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
          </section>

          <section id="empathize" className="scroll-mt-32 py-24 md:py-36">
            <div className="grid gap-12 xl:grid-cols-[0.9fr_1.1fr] xl:items-start">
              {/* Konten Emphatize */}
              <div>
                <Reveal>
                  <SectionHeading
                    number="01"
                    eyebrow="Emphatize"
                    title="Understanding user needs and problems."
                    description="At the Emphatize stage, I conducted online observation to understand what users need and what problems they experience. I also gathered supporting insights from Gym Fitness Indo."
                  />
                </Reveal>

                <Reveal delay={0.12}>
                  <div className="mt-9 rounded-[1.75rem] border border-pink-300/15 bg-pink-500/[0.055] p-6 md:p-7">
                    <Quote className="h-6 w-6 text-pink-400" />

                    <p
                      className={`mt-5 font-display text-xl italic leading-8 ${
                        isDark ? "text-pink-50/80" : "text-pink-800/85"
                      }`}
                    >
                      “This stage focused on understanding what users need, what
                      problems they face, and how FarmaGym can respond to them.”
                    </p>
                  </div>
                </Reveal>
              </div>

              {/* Visual dan hasil Emphatize */}
              <div className="space-y-5">
                {/* Dua user persona sejajar */}
                <div className="grid gap-5 sm:grid-cols-2">
                  {PERSONA_IMAGES.map((image, index) => (
                    <Reveal key={image.src} delay={index * 0.07}>
                      <ProcessImage
                        image={image}
                        images={PERSONA_IMAGES}
                        index={index}
                        onOpen={openGallery}
                        aspectClass="aspect-[4/3]"
                      />
                    </Reveal>
                  ))}
                </div>

                {/* Dokumen interview selebar kolom kanan */}
               {EMPHATIZE_IMAGES.map((image, index) => (
  <Reveal
    key={image.src}
    delay={0.14 + index * 0.07}
  >
    <ProcessImage
      image={image}
      images={EMPHATIZE_IMAGES}
      index={index}
      onOpen={openGallery}
      aspectClass="aspect-[16/7]"
    />
  </Reveal>
))}
                {/* Aktivitas research */}
                <Reveal delay={0.2}>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      "Online user observation",
                      "User needs identification",
                      "User pain points collection",
                      "Reference study from Gym Fitness Indo",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex min-h-[64px] items-center gap-3 rounded-xl border border-stroke bg-surface-elevated px-4 py-3 text-sm leading-6 text-muted"
                      >
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-pink-500" />

                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          <section id="define" className="scroll-mt-32 py-24 md:py-36">
            <div className="grid gap-12 xl:grid-cols-[0.85fr_1.15fr] xl:items-start">
              {/* Penjelasan Define */}
              <div>
                <Reveal>
                  <SectionHeading
                    number="02"
                    eyebrow="Define"
                    title="Defining key user problems."
                    description="Based on the findings from the Empathize stage, I grouped the users’ problems and needs to identify the main areas that should be improved in FarmaGym."
                  />
                </Reveal>

                <Reveal delay={0.12}>
                  <div className="mt-9 rounded-[1.75rem] border border-pink-300/15 bg-pink-500/[0.055] p-6 md:p-7">
                    <p className="text-sm leading-7 text-muted">
                      These grouped findings helped clarify the users’ main
                      difficulties and became the foundation for developing
                      solutions in the next stage.
                    </p>
                  </div>
                </Reveal>
              </div>

              {/* Visual dan hasil Define */}
              <div>
                {/* Gambar Define dibuat pendek */}
                <Reveal delay={0.08}>
                  <button
                    type="button"
                    onClick={() => openGallery(DEFINE_IMAGES, 0)}
                    aria-label="Open grouped user problems"
                    className={`group relative block w-full overflow-hidden rounded-[1.6rem] border border-stroke bg-surface p-2 text-left transition duration-500 hover:-translate-y-1 hover:border-pink-400/35 ${
                      isDark
                        ? "shadow-[0_24px_70px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.07)]"
                        : "shadow-[0_24px_70px_rgba(65,40,53,0.12),inset_0_1px_0_rgba(255,255,255,0.95)]"
                    }`}
                  >
                    <div className="relative flex h-[240px] items-center justify-center overflow-hidden rounded-[1.15rem] bg-white md:h-[270px]">
                      <ImageWithFallback
                        image={DEFINE_IMAGES[0]}
                        className="h-full w-full object-contain transition duration-700 group-hover:scale-[1.015]"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

                      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                        <div>
                          <p className="text-[9px] uppercase tracking-[0.24em] text-white/55">
                            Define visual
                          </p>

                          <p className="mt-1 text-sm text-white">
                            Grouped User Problems
                          </p>
                        </div>

                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white/75 opacity-0 backdrop-blur-md transition group-hover:opacity-100">
                          <Maximize2 className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </button>
                </Reveal>

                {/* Empat hasil Define */}
                <Reveal delay={0.16}>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {[
                      "Group similar user problems and needs.",
                      "Identify recurring user pain points.",
                      "Determine the main problem priorities.",
                      "Set the focus for the Ideate stage.",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex min-h-[72px] items-center gap-3 rounded-xl border border-stroke bg-surface-elevated px-4 py-3 text-sm leading-6 text-muted"
                      >
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-pink-500" />

                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          <section id="ideate" className="scroll-mt-32 py-24 md:py-36">
            <div
              className={`overflow-hidden rounded-[2.5rem] border border-stroke bg-surface p-5 md:p-8 xl:p-10 ${
                isDark
                  ? "shadow-[0_35px_110px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.06)]"
                  : "shadow-[0_30px_90px_rgba(65,40,53,0.14),inset_0_1px_0_rgba(255,255,255,0.95)]"
              }`}
            >
              {/* Bagian atas: penjelasan dan tiga gambar */}
              <div className="grid gap-12 xl:grid-cols-[0.82fr_1.18fr] xl:items-start">
                {/* Penjelasan Ideate */}
                <div>
                  <Reveal>
                    <SectionHeading
                      number="03"
                      eyebrow="Ideate"
                      title="Turning user problems into focused product ideas."
                      description="At the Ideate stage, I translated the problems identified during Define into practical solutions and feature ideas for FarmaGym."
                    />
                  </Reveal>

                  {/* Alur proses */}
                  <Reveal delay={0.08}>
                    <div className="mt-9 rounded-[1.5rem] border border-stroke bg-surface-elevated p-5">
                      <div className="flex flex-wrap items-center gap-2 font-mono text-[9px] uppercase leading-6 tracking-[0.15em] text-muted">
                        <span className="text-pink-500">User problems</span>

                        <span>→</span>

                        <span>Solution ideas</span>

                        <span>→</span>

                        <span>Feature concepts</span>

                        <span>→</span>

                        <span className="text-pink-500">Prioritization</span>
                      </div>
                    </div>
                  </Reveal>

                  {/* Ringkasan Ideate */}
                  <Reveal delay={0.12}>
                    <div className="mt-5 rounded-[1.75rem] border border-pink-300/15 bg-pink-500/[0.055] p-6 md:p-7">
                      <Sparkles className="h-5 w-5 text-pink-500" />

                      <p className="mt-5 text-sm leading-7 text-muted">
                        The ideas focused on helping users build healthier
                        routines, plan workouts, monitor nutrition, receive
                        beginner guidance, and stay motivated.
                      </p>
                    </div>
                  </Reveal>
                </div>

                {/* Tiga gambar Ideate */}
                {/* Visual Ideate */}
<div className="space-y-5">
  {/* Tiga Solution Ideas digabung menjadi slider */}
  <Reveal delay={0.08}>
    <div
      className={`group relative overflow-hidden rounded-[1.6rem] border border-stroke bg-surface p-2 ${
        isDark
          ? "shadow-[0_24px_70px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)]"
          : "shadow-[0_24px_70px_rgba(65,40,53,0.13),inset_0_1px_0_rgba(255,255,255,0.95)]"
      }`}
    >
      <button
        type="button"
        onClick={() =>
          openGallery(
            SOLUTION_IDEA_IMAGES,
            solutionIdeaIndex,
          )
        }
        className="relative block w-full overflow-hidden rounded-[1.15rem] bg-black text-left"
        aria-label={`Open ${SOLUTION_IDEA_IMAGES[solutionIdeaIndex].label}`}
      >
        <div className="relative aspect-[16/9] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={
                SOLUTION_IDEA_IMAGES[solutionIdeaIndex].src
              }
              initial={{
                opacity: 0,
                x: 30,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                x: -30,
              }}
              transition={{
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute inset-0"
            >
              <ImageWithFallback
                image={
                  SOLUTION_IDEA_IMAGES[
                    solutionIdeaIndex
                  ]
                }
                className="h-full w-full object-cover"
              />
            </motion.div>
          </AnimatePresence>

          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
            <div>
              <p className="text-[9px] uppercase tracking-[0.24em] text-white/45">
                Solution Ideas
              </p>

              <p className="mt-1 text-sm text-white/85">
                {
                  SOLUTION_IDEA_IMAGES[
                    solutionIdeaIndex
                  ].label
                }
              </p>
            </div>

            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white/70 backdrop-blur-md">
              <Maximize2 className="h-4 w-4" />
            </span>
          </div>
        </div>
      </button>

      {/* Tombol sebelumnya */}
      <button
        type="button"
        onClick={() =>
          setSolutionIdeaIndex((current) =>
            current === 0
              ? SOLUTION_IDEA_IMAGES.length - 1
              : current - 1,
          )
        }
        aria-label="Previous solution idea"
        className="absolute left-5 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white/70 backdrop-blur-md transition hover:border-pink-300/50 hover:bg-pink-500/30 hover:text-white"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {/* Tombol berikutnya */}
      <button
        type="button"
        onClick={() =>
          setSolutionIdeaIndex(
            (current) =>
              (current + 1) %
              SOLUTION_IDEA_IMAGES.length,
          )
        }
        aria-label="Next solution idea"
        className="absolute right-5 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white/70 backdrop-blur-md transition hover:border-pink-300/50 hover:bg-pink-500/30 hover:text-white"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Titik indikator */}
      <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
        {SOLUTION_IDEA_IMAGES.map(
          (image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() =>
                setSolutionIdeaIndex(index)
              }
              aria-label={`Show solution idea ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === solutionIdeaIndex
                  ? "w-6 bg-pink-400"
                  : "w-2 bg-white/40 hover:bg-white/70"
              }`}
            />
          ),
        )}
      </div>
    </div>
  </Reveal>

  {/* Feature Solutions dan Prioritization */}
  <div className="grid gap-5 md:grid-cols-2">
    <Reveal delay={0.14}>
      <ProcessImage
        image={FEATURE_SOLUTION_IMAGES[0]}
        images={FEATURE_SOLUTION_IMAGES}
        index={0}
        onOpen={openGallery}
        aspectClass="aspect-[4/3]"
      />
    </Reveal>

    <Reveal delay={0.21}>
      <ProcessImage
        image={PRIORITIZATION_IMAGES[0]}
        images={PRIORITIZATION_IMAGES}
        index={0}
        onOpen={openGallery}
        aspectClass="aspect-[4/3]"
      />
    </Reveal>
  </div>

                  {/* Generate, Translate, Prioritize */}
                  <Reveal delay={0.2}>
                    <div className="grid gap-3 sm:grid-cols-3">
                      {[
                        {
                          number: "01",
                          label: "Generate",
                          text: "Create solutions from user problems.",
                        },
                        {
                          number: "02",
                          label: "Translate",
                          text: "Convert solutions into product features.",
                        },
                        {
                          number: "03",
                          label: "Prioritize",
                          text: "Rank ideas by impact and feasibility.",
                        },
                      ].map((item) => (
                        <article
                          key={item.number}
                          className="h-full rounded-[1.25rem] border border-stroke bg-surface-elevated p-4"
                        >
                          <span className="font-display text-xl italic text-pink-500">
                            {item.number}
                          </span>

                          <p className="mt-4 text-sm font-medium text-text-primary">
                            {item.label}
                          </p>

                          <p className="mt-2 text-xs leading-5 text-muted">
                            {item.text}
                          </p>
                        </article>
                      ))}
                    </div>
                  </Reveal>

                  {/* Prioritization legend */}
                  <Reveal delay={0.22}>
                    <div className="rounded-[1.4rem] border border-stroke bg-surface-elevated p-5">
                      <p className="text-[9px] uppercase tracking-[0.24em] text-muted">
                        Prioritization Criteria
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {[
                          "High Priority",
                          "High Feasibility",
                          "Low Priority",
                          "Low Feasibility",
                        ].map((item, index) => (
                          <span
                            key={item}
                            className="inline-flex items-center gap-2 rounded-full border border-stroke bg-surface px-3.5 py-2 text-xs text-muted"
                          >
                            <span className="font-display text-base italic text-pink-500">
                              {String(index + 1).padStart(2, "0")}
                            </span>

                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                </div>
              </div>

              {/* Empat card dibuat satu baris selebar section */}
              <Reveal delay={0.26}>
                <div className="mt-10 border-t border-stroke pt-8">
                  <p className="mb-5 text-[9px] uppercase tracking-[0.24em] text-muted">
                    Main Solution Directions
                  </p>

                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {[
                      {
                        title: "Workout Planning",
                        text: "Weekly schedules, exercise duration, sets, and reminders.",
                      },
                      {
                        title: "Nutrition Support",
                        text: "Meal planning, calorie tracking, and nutrition consultation.",
                      },
                      {
                        title: "Beginner Guidance",
                        text: "Simple instructions and beginner-friendly exercise recommendations.",
                      },
                      {
                        title: "Motivation & Community",
                        text: "Activity notes, motivational notifications, and discussion groups.",
                      },
                    ].map((item) => (
                      <article
                        key={item.title}
                        className="flex h-full min-h-[170px] flex-col rounded-[1.4rem] border border-stroke bg-surface-elevated p-5"
                      >
                        <CheckCircle2 className="h-4 w-4 text-pink-500" />

                        <h3 className="mt-6 text-sm font-medium text-text-primary">
                          {item.title}
                        </h3>

                        <p className="mt-3 text-xs leading-5 text-muted">
                          {item.text}
                        </p>
                      </article>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          <section id="prototype" className="scroll-mt-32 py-24 md:py-36">
            <Reveal>
              <SectionHeading
                number="04"
                eyebrow="Prototype"
                title="Structuring flows and interface decisions into a working product."
                description="This stage brings together user flows, task flows, information architecture, low fidelity, the design system, high-fidelity screens, and the interactive prototype."
              />
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-8 rounded-[1.75rem] border border-pink-300/15 bg-pink-500/[0.055] p-6 md:p-7">
                <p className="text-sm leading-7 text-muted md:text-base">
                  This stage was challenging because several parts of the
                  process were new to me. It helped me understand how research
                  findings are translated into product structure, visual
                  decisions, and a connected user experience.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.14}>
             <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
  {PROTOTYPE_GROUPS.map((group, index) => {
    const isActive = activePrototypeGroup === group.id;

    return (
      <button
        key={group.id}
        type="button"
        onClick={() => setActivePrototypeGroup(group.id)}
        aria-pressed={isActive}
        className={`group relative min-h-[126px] overflow-hidden rounded-2xl border px-4 py-4 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/70 ${
          isActive
            ? "border-pink-400/60 bg-pink-500/15 text-text-primary shadow-[0_12px_35px_rgba(236,72,153,0.16),inset_0_1px_0_rgba(255,255,255,0.08)]"
            : "border-stroke bg-surface-elevated text-muted hover:-translate-y-1 hover:border-pink-400/45 hover:bg-pink-500/[0.08] hover:text-text-primary hover:shadow-[0_12px_30px_rgba(0,0,0,0.14)]"
        }`}
      >
        {/* Garis aktif */}
        <span
          className={`absolute inset-x-4 top-0 h-[2px] rounded-full bg-pink-400 transition-opacity ${
            isActive ? "opacity-100" : "opacity-0 group-hover:opacity-60"
          }`}
        />

        <div className="flex items-start justify-between gap-3">
          <span
            className={`font-display text-xl italic ${
              isActive ? "text-pink-400" : "text-pink-400/65"
            }`}
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          <span
            className={`flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 ${
              isActive
                ? "rotate-90 border-pink-400/50 bg-pink-500/20 text-pink-300"
                : "border-stroke bg-surface text-muted group-hover:translate-x-0.5 group-hover:border-pink-400/40 group-hover:text-pink-400"
            }`}
          >
            <ChevronRight className="h-4 w-4" />
          </span>
        </div>

        <p className="mt-4 text-sm font-medium leading-5 text-current">
          {group.label}
        </p>

        <p
          className={`mt-2 text-[9px] uppercase tracking-[0.2em] ${
            isActive ? "text-pink-400" : "text-muted"
          }`}
        >
          {isActive ? "Selected" : "View section"}
        </p>
      </button>
    );
  })}
</div>
            </Reveal>

            <div className="mt-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePrototype.id}
                  initial={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: 18 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  exit={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: -12 }
                  }
                  transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                >
                  <PrototypeSliderCard
                    group={activePrototype}
                    currentIndex={prototypeSlides[activePrototype.id] ?? 0}
                    onSelect={(index) =>
                      setPrototypeSlides((previous) => ({
                        ...previous,
                        [activePrototype.id]: index,
                      }))
                    }
                    onPrev={() =>
                      goPrototypeSlide(activePrototype.id, "prev")
                    }
                    onNext={() =>
                      goPrototypeSlide(activePrototype.id, "next")
                    }
                    onOpen={openGallery}
                    isDark={isDark}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </section>

          <section id="summary" className="scroll-mt-32 py-24 md:py-36">
  <div
    className={`relative overflow-hidden rounded-[2.5rem] border border-stroke bg-surface px-6 py-16 md:px-10 md:py-20 xl:px-14 xl:py-24 ${
      isDark
        ? "shadow-[0_35px_110px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.06)]"
        : "shadow-[0_30px_90px_rgba(65,40,53,0.14),inset_0_1px_0_rgba(255,255,255,0.95)]"
    }`}
  >
    {/* Background glow */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-0 h-72 w-[600px] -translate-x-1/2 rounded-full bg-pink-500/10 blur-[120px]"
    />

    <div className="relative">
      {/* Heading Summary */}
      <Reveal>
        <div className="text-center">
          <Sparkles className="mx-auto h-6 w-6 text-pink-400" />

          <p className="mt-7 text-[9px] uppercase tracking-[0.34em] text-muted">
            05 · Summary
          </p>

          <h2 className="mx-auto mt-5 max-w-4xl text-4xl leading-[1.08] tracking-[-0.04em] text-text-primary md:text-6xl">
            Turning research into a practical and connected fitness experience.
          </h2>

          <p className="mx-auto mt-7 max-w-3xl text-sm leading-7 text-muted md:text-base md:leading-8">
            Through FarmaGym, I learned how user research can guide every design
            decision—from identifying user problems and organizing information
            to developing interfaces, interactive prototypes, and usability
            testing. This project strengthened my ability to connect user needs
            with a consistent, functional, and testable product experience.
          </p>
        </div>
      </Reveal>

      {/* Hasil dan pembelajaran */}
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {[
          {
            number: "01",
            title: "Research-driven decisions",
            text: "User findings became the foundation for defining problems and developing relevant product solutions.",
          },
          {
            number: "02",
            title: "A challenging process",
            text: "Creating flows, architecture, design systems, and prototypes was challenging because several stages were new to me.",
          },
          {
            number: "03",
            title: "A connected experience",
            text: "The final result connects workout planning, interface consistency, interaction, and usability into one complete experience.",
          },
        ].map((item, index) => (
          <Reveal key={item.number} delay={index * 0.08}>
            <article className="flex h-full min-h-[210px] flex-col rounded-[1.5rem] border border-stroke bg-surface-elevated p-6 transition duration-300 hover:-translate-y-1 hover:border-pink-400/35">
              <span className="font-display text-2xl italic text-pink-500">
                {item.number}
              </span>

              <h3 className="mt-7 text-lg font-medium text-text-primary">
                {item.title}
              </h3>

              <p className="mt-4 text-sm leading-7 text-muted">{item.text}</p>

              <CheckCircle2 className="mt-auto h-4 w-4 pt-6 box-content text-pink-500" />
            </article>
          </Reveal>
        ))}
      </div>

      {/* Dokumentasi project */}
      <Reveal delay={0.2}>
        <div className="mt-12 rounded-[1.75rem] border border-pink-300/15 bg-pink-500/[0.055] p-6 md:p-8">
          <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-[9px] uppercase tracking-[0.26em] text-pink-400">
                Project Documentation
              </p>

              <h3 className="mt-4 text-2xl leading-tight tracking-[-0.03em] text-text-primary md:text-3xl">
                Read the full story and review the usability testing document.
              </h3>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
                The complete FarmaGym design process is also available as a
                Medium article. Supporting usability testing findings can be
                downloaded as a Microsoft Word document.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              {/* Tombol Medium */}
              <a
                href="https://docs.google.com/document/d/1bY3WSvVhcoGwnoeistZHhuDnG3QnYZRIbOx6bFVLRC8/edit?usp=sharing"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center justify-center gap-3 rounded-full border border-pink-400/35 bg-pink-500/15 px-6 py-3.5 text-sm text-text-primary transition hover:-translate-y-1 hover:border-pink-400/60 hover:bg-pink-500/25"
              >
                Usability Testing
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              {/* Tombol DOCX */}
              <a
                href="https://medium.com/@pricilliaamanda916/ui-ux-portofolio-farmagym-case-study-6d4cdded0884"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 rounded-full border border-stroke bg-surface-elevated px-6 py-3.5 text-sm text-text-secondary transition hover:-translate-y-1 hover:border-pink-400/40 hover:text-text-primary"
              >
                Read on Medium
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Back button */}
      <Reveal delay={0.26}>
        <div className="mt-10 flex justify-center">
          <a
            href="/#work"
            className="group inline-flex items-center gap-3 rounded-full border border-stroke bg-surface-elevated px-6 py-3.5 text-sm text-text-secondary transition hover:-translate-y-1 hover:border-pink-400/40 hover:bg-pink-500/10 hover:text-text-primary"
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

function PrototypeSliderCard({
  group,
  currentIndex,
  onSelect,
  onPrev,
  onNext,
  onOpen,
  isDark,
}: {
  group: PrototypeGroup;
  currentIndex: number;
  onSelect: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
  onOpen: (images: GalleryImage[], index?: number) => void;
  isDark: boolean;
}) {
  const currentImage = group.images[currentIndex] ?? group.images[0];

  return (
    <div
      className={`overflow-hidden rounded-[2rem] border border-stroke bg-surface ${
        isDark
          ? "shadow-[0_35px_110px_rgba(0,0,0,0.58),inset_0_1px_0_rgba(255,255,255,0.06)]"
          : "shadow-[0_30px_90px_rgba(65,40,53,0.12),inset_0_1px_0_rgba(255,255,255,0.95)]"
      }`}
    >
      <div className="grid gap-8 p-5 md:p-7 xl:grid-cols-[0.72fr_1.28fr]">
        <div className="flex flex-col">
          <p className="text-[10px] uppercase tracking-[0.24em] text-pink-500">
            {group.label}
          </p>

          <h3 className="mt-4 text-2xl leading-tight tracking-[-0.03em] text-text-primary md:text-4xl">
            {group.title}
          </h3>

          <p className="mt-4 text-sm leading-7 text-muted md:text-base">
            {group.description}
          </p>

          {group.prototypeUrl && (
            <a
              href={group.prototypeUrl}
              target="_blank"
              rel="noreferrer"
              className={`mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-pink-400/30 bg-pink-500/10 px-4 py-2 text-sm transition hover:-translate-y-0.5 hover:border-pink-400/50 hover:bg-pink-500/20 ${
                isDark
                  ? "text-pink-100 hover:text-white"
                  : "text-pink-700 hover:text-pink-800"
              }`}
            >
              Open Prototype
              <ArrowUpRight className="h-4 w-4" />
            </a>
          )}

          {group.images.length > 1 && (
            <div className="mt-6 flex items-center gap-3">
              <button
                type="button"
                onClick={onPrev}
                aria-label="Previous prototype visual"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-surface-elevated text-text-primary transition hover:border-pink-400/40 hover:bg-pink-500/10"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={onNext}
                aria-label="Next prototype visual"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-surface-elevated text-text-primary transition hover:border-pink-400/40 hover:bg-pink-500/10"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              <span className="text-sm text-muted">
                {String(currentIndex + 1).padStart(2, "0")} /{" "}
                {String(group.images.length).padStart(2, "0")}
              </span>
            </div>
          )}
        </div>

        <div
          className={`group relative overflow-hidden rounded-[1.6rem] border border-stroke bg-surface-elevated p-2 ${
            isDark
              ? "shadow-[0_24px_70px_rgba(0,0,0,0.45)]"
              : "shadow-[0_24px_70px_rgba(65,40,53,0.1)]"
          }`}
        >
          <button
            type="button"
            onClick={() => onOpen(group.images, currentIndex)}
            className="block w-full text-left"
            aria-label={`Open ${currentImage.label}`}
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-[1.2rem] bg-black/5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImage.src}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <ImageWithFallback
                    image={currentImage}
                    className="h-full w-full object-contain transition duration-500 group-hover:scale-[1.015]"
                  />
                </motion.div>
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.24em] text-white/55">
                    Process Visual
                  </p>
                  <p className="mt-1 text-sm text-white">
                    {currentImage.label}
                  </p>
                </div>

                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white/80 backdrop-blur-md">
                  <Maximize2 className="h-4 w-4" />
                </span>
              </div>
            </div>
          </button>
        </div>
      </div>

      <div className="border-t border-stroke px-5 py-4 md:px-7">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {group.images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => onSelect(index)}
              className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-xs transition ${
                index === currentIndex
                  ? "border-pink-500 bg-pink-500 text-white"
                  : "border-stroke bg-surface-elevated text-muted hover:border-pink-400/40 hover:text-text-primary"
              }`}
            >
              {image.label}
            </button>
          ))}
        </div>
      </div>
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
        <span className="font-display text-xl italic text-pink-200/55">
          {number}
        </span>
        <span className="h-px w-8 bg-pink-300/35" />
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

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: prefersReducedMotion ? 0.25 : 0.75,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
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
    <button
      type="button"
      onClick={() => onOpen(images, index)}
      className="group relative block w-full overflow-hidden rounded-[1.6rem] border border-stroke bg-surface p-2 text-left shadow-[0_24px_70px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.08)] transition duration-500 hover:-translate-y-1 hover:border-pink-400/35 hover:shadow-[0_30px_85px_rgba(0,0,0,0.24),0_0_30px_rgba(236,72,153,0.08)]"
      aria-label={`Open ${image.label}`}
    >
      <div
        className={`relative overflow-hidden rounded-[1.15rem] bg-black ${aspectClass}`}
      >
        <ImageWithFallback
          image={image}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
          <div>
            <p className="text-[9px] uppercase tracking-[0.24em] text-white/35">
              Process visual
            </p>
            <p className="mt-1 text-sm text-white/75">{image.label}</p>
          </div>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white/60 opacity-0 backdrop-blur-md transition group-hover:opacity-100">
            <Maximize2 className="h-4 w-4" />
          </span>
        </div>
      </div>
    </button>
  );
}

function ImageWithFallback({
  image,
  className,
  priority = false,
}: {
  image: GalleryImage;
  className: string;
  priority?: boolean;
}) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex min-h-[220px] items-center justify-center bg-surface-elevated ${className}`}
      >
        <div className="max-w-sm px-6 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-pink-300/18 bg-pink-500/10">
            <ImageIcon className="h-5 w-5 text-pink-200/70" />
          </div>
          <p className="mt-4 text-sm text-muted">
            Add your Figma screenshot here
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
      draggable={false}
      onError={() => setHasError(true)}
      className={className}
    />
  );
}