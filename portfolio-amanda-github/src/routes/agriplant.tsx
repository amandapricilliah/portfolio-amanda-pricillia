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
  CloudSun,
  ImageIcon,
  LayoutDashboard,
  Leaf,
  Maximize2,
  Quote,
  Sparkles,
  Sprout,
  Workflow,
  X,
} from "lucide-react";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

export const Route = createFileRoute("/agriplant")({
  component: AgriplantCaseStudy,
});

type GalleryImage = {
  src: string;
  alt: string;
  label: string;
};

type GalleryGroup = {
  id: string;
  label: string;
  title: string;
  description?: string;
  images: GalleryImage[];
  externalUrl?: string;
  externalLabel?: string;
};

type LightboxState = {
  images: GalleryImage[];
  index: number;
} | null;

const MEDIUM_ARTICLE_URL =
  "https://medium.com/@pricilliaamanda916/mini-project-portofolio-agriculture-df75be9c0f66";

const USABILITY_TESTING_URL =
  "https://drive.google.com/drive/folders/1mWOjhBTGo4CRsenphwpLFtZKnyFcugTL?usp=sharing";

const AGRIPLANT_PROTOTYPE_URL =
  "https://www.figma.com/design/ADn6ZFxXxnCGzIkA3c88eS/Prototype-Agriplant?node-id=1-15934&t=1idOMfOZwl9L0WsE-1";

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "emphatize", label: "Emphatize" },
  { id: "define", label: "Define" },
  { id: "ideate", label: "Ideate" },
  { id: "prototype", label: "Prototype" },
  { id: "summary", label: "Summary" },
] as const;

const HERO_IMAGE: GalleryImage = {
  src: "/images/agriplant/agriplant-mockup.png",
  alt: "Agriplant mobile application and admin website mockup",
  label: "Agriplant Project Cover",
};

const PERSONA_IMAGES: GalleryImage[] = [
  {
    src: "/images/agriplant/emphatize/user-persona-01.png",
    alt: "First Agriplant user persona",
    label: "User Persona 01",
  },
  {
    src: "/images/agriplant/emphatize/user-persona-02.png",
    alt: "Second Agriplant user persona",
    label: "User Persona 02",
  },
  {
    src: "/images/agriplant/emphatize/user-persona-03.png",
    alt: "Third Agriplant user persona",
    label: "User Persona 03",
  },
];

const INTERVIEW_IMAGES: GalleryImage[] = [
  {
    src: "/images/agriplant/emphatize/interview-questions.png",
    alt: "Agriplant interview questions",
    label: "Interview Questions",
  },
];

const DEFINE_PROBLEM_IMAGES: GalleryImage[] = [
  {
    src: "/images/agriplant/define/problem-group-01.png",
    alt: "Agriplant user problem 1",
    label: "User Problem 1",
  },
  {
    src: "/images/agriplant/define/problem-group-02.png",
    alt: "Agriplant User Problem 1",
    label: "User Problem 2",
  },
  {
    src: "/images/agriplant/define/problem-group-03.png",
    alt: "Agriplant User Problem 2",
    label: "User Problem 3",
  },
];

const DEFINE_SUPPORT_IMAGES: GalleryImage[] = [
  {
    src: "/images/agriplant/define/user-admin-features.png",
    alt: "Agriplant end-user and admin features",
    label: "End User & Admin Features",
  },
  {
    src: "/images/agriplant/define/feature-overview.png",
    alt: "Agriplant feature overview",
    label: "Feature Overview",
  },
  {
    src: "/images/agriplant/define/feature-explanation.png",
    alt: "Agriplant feature explanation",
    label: "Feature Explanation",
  },
];

const PRIORITIZATION_IMAGES: GalleryImage[] = [
  {
    src: "/images/agriplant/ideate/prioritization-end-user-01.png",
    alt: "First Agriplant end-user prioritization matrix",
    label: "Prioritization Matrix · End User 01",
  },
  {
    src: "/images/agriplant/ideate/prioritization-admin-01.png",
    alt: "First Agriplant admin prioritization matrix",
    label: "Prioritization Matrix · Admin 01",
  },
  {
    src: "/images/agriplant/ideate/prioritization-end-user-02.png",
    alt: "Second Agriplant end-user prioritization matrix",
    label: "Prioritization Matrix · End User 02",
  },
  {
    src: "/images/agriplant/ideate/prioritization-admin-02.png",
    alt: "Second Agriplant admin prioritization matrix",
    label: "Prioritization Matrix · Admin 02",
  },
];

const INFORMATION_ARCHITECTURE_IMAGES: GalleryImage[] = [
  {
    src: "/images/agriplant/ideate/information-architecture-end-user.png",
    alt: "Agriplant end-user information architecture",
    label: "Information Architecture · End User",
  },
  {
    src: "/images/agriplant/ideate/information-architecture-admin.png",
    alt: "Agriplant admin information architecture",
    label: "Information Architecture · Admin",
  },
];

const PROTOTYPE_GROUPS: GalleryGroup[] = [
  {
    id: "end-user-taskflow",
    label: "End User Taskflows",
    title: "Mapping the core planting and care journeys.",
    description:
      "I created task flows to map how end users set plant-care reminders, start a planting activity, review planting history, purchase agricultural products, use the customer-service chatbot, read articles, check accurate weather information, and complete authentication.",
    images: [
      {
        src: "/images/agriplant/prototype/taskflow-end-user-plant-care-reminder.png",
        alt: "Task flow for plant-care reminders",
        label: "Plant-Care Reminder",
      },
      {
        src: "/images/agriplant/prototype/taskflow-end-user-planting.png",
        alt: "Task flow for planting",
        label: "Planting",
      },
      {
        src: "/images/agriplant/prototype/taskflow-end-user-history.png",
        alt: "Task flow for planting history",
        label: "Planting History",
      },
      {
        src: "/images/agriplant/prototype/taskflow-end-user-local-products.png",
        alt: "Task flow for purchasing agricultural products",
        label: "Agricultural Products",
      },
      {
        src: "/images/agriplant/prototype/taskflow-end-user-chatbot.png",
        alt: "Task flow for the customer-service chatbot",
        label: "Customer-Service Chatbot",
      },
      {
        src: "/images/agriplant/prototype/taskflow-end-user-articles.png",
        alt: "Task flow for reading articles",
        label: "Read Articles",
      },
      {
        src: "/images/agriplant/prototype/taskflow-end-user-weather.png",
        alt: "Task flow for accurate weather information",
        label: "Accurate Weather Information",
      },
      {
        src: "/images/agriplant/prototype/taskflow-end-user-authentication.png",
        alt: "Task flow for sign in and sign up",
        label: "Sign In & Sign Up",
      },
    ],
  },
  {
    id: "admin-taskflow",
    label: "Admin Taskflows",
    title: "Structuring the main administrative workflows.",
    description:
      "The admin task flows describe how administrators manage plant reminders, planting instructions, planting-history records, and local agricultural products through the desktop dashboard.",
    images: [
      {
        src: "/images/agriplant/prototype/taskflow-admin-reminder.png",
        alt: "Admin task flow for plant reminders",
        label: "Plant Reminder",
      },
      {
        src: "/images/agriplant/prototype/taskflow-admin-planting.png",
        alt: "Admin task flow for planting management",
        label: "Planting Management",
      },
      {
        src: "/images/agriplant/prototype/taskflow-admin-history.png",
        alt: "Admin task flow for planting history management",
        label: "Manage Planting History",
      },
      {
        src: "/images/agriplant/prototype/taskflow-admin-local-products.png",
        alt: "Admin task flow for local product management",
        label: "Local Products",
      },
    ],
  },
  {
    id: "lofi-end-user",
    label: "Low Fidelity · End User",
    title: "Exploring the mobile structure before visual styling.",
    description:
      "These low-fidelity screens helped establish page hierarchy, content placement, and essential interactions for the end-user experience before applying the final visual system.",
    images: [
      {
        src: "/images/agriplant/prototype/lofi-end-user-planting.png",
        alt: "Low-fidelity planting flow for end users",
        label: "Planting",
      },
      {
        src: "/images/agriplant/prototype/lofi-end-user-chatbot.png",
        alt: "Low-fidelity customer-service chatbot for end users",
        label: "Customer-Service Chatbot",
      },
      {
        src: "/images/agriplant/prototype/lofi-end-user-articles.png",
        alt: "Low-fidelity article feature for end users",
        label: "Read Articles",
      },
      {
        src: "/images/agriplant/prototype/lofi-end-user-reminder.png",
        alt: "Low-fidelity reminder feature for end users",
        label: "Reminder",
      },
      {
        src: "/images/agriplant/prototype/lofi-end-user-history.png",
        alt: "Low-fidelity planting history for end users",
        label: "Planting History",
      },
      {
        src: "/images/agriplant/prototype/lofi-end-user-dashboard.png",
        alt: "Low-fidelity end-user dashboard",
        label: "Dashboard",
      },
      {
        src: "/images/agriplant/prototype/lofi-end-user-products.png",
        alt: "Low-fidelity agricultural product purchasing feature",
        label: "Agricultural Products",
      },
    ],
  },
  {
    id: "lofi-admin",
    label: "Low Fidelity · Admin",
    title: "Defining the desktop administration structure.",
    description:
      "The admin wireframes focus on efficient monitoring and management, covering plant-care reminders, planting content, history records, local products, and the main dashboard.",
    images: [
      {
        src: "/images/agriplant/prototype/lofi-admin-reminder.png",
        alt: "Admin wireframe for plant-care reminders",
        label: "Plant-Care Reminder",
      },
      {
        src: "/images/agriplant/prototype/lofi-admin-planting.png",
        alt: "Admin wireframe for planting management",
        label: "Planting Management",
      },
      {
        src: "/images/agriplant/prototype/lofi-admin-history.png",
        alt: "Admin wireframe for planting history",
        label: "Planting History",
      },
      {
        src: "/images/agriplant/prototype/lofi-admin-products.png",
        alt: "Admin wireframe for local products",
        label: "Local Products",
      },
      {
        src: "/images/agriplant/prototype/lofi-admin-dashboard.png",
        alt: "Admin dashboard wireframe",
        label: "Dashboard",
      },
    ],
  },
  {
    id: "design-system",
    label: "Design System",
    title: "Building a consistent system across mobile and desktop.",
    description:
      "We adapted an existing design-system kit and expanded it with colors, typography, spacing, icons, components, and feature-specific elements for both the mobile application and the admin website.",
    images: [
      {
        src: "/images/agriplant/prototype/design-system-mobile.png",
        alt: "Agriplant mobile design system",
        label: "Mobile Design System",
      },
      {
        src: "/images/agriplant/prototype/design-system-desktop.png",
        alt: "Agriplant desktop design system",
        label: "Desktop Design System",
      },
    ],
  },
  {
    id: "hifi-mobile",
    label: "High Fidelity · Mobile",
    title: "Transforming the mobile wireframes into polished interfaces.",
    description:
      "The mobile high-fidelity screens apply the final design system to authentication, local weather, planting guidance, planting history, reminders, customer support, and local agricultural products.",
    images: [
      {
        src: "/images/agriplant/prototype/hifi-mobile-authentication.png",
        alt: "Agriplant mobile authentication interface",
        label: "Authentication",
      },
      {
        src: "/images/agriplant/prototype/hifi-mobile-weather.png",
        alt: "Agriplant local weather interface",
        label: "Local Weather Information",
      },
      {
        src: "/images/agriplant/prototype/hifi-mobile-planting.png",
        alt: "Agriplant planting interface",
        label: "Planting",
      },
      {
        src: "/images/agriplant/prototype/hifi-mobile-history.png",
        alt: "Agriplant planting history interface",
        label: "Planting History",
      },
      {
        src: "/images/agriplant/prototype/hifi-mobile-reminder.png",
        alt: "Agriplant watering and fertilizing reminder interface",
        label: "Watering & Fertilizing Reminder",
      },
      {
        src: "/images/agriplant/prototype/hifi-mobile-chatbot.png",
        alt: "Agriplant customer-service chatbot interface",
        label: "Customer-Service Chatbot",
      },
      {
        src: "/images/agriplant/prototype/hifi-mobile-products.png",
        alt: "Agriplant local product interface",
        label: "Local Agricultural Products",
      },
    ],
  },
  {
    id: "hifi-admin",
    label: "High Fidelity · Admin",
    title: "Creating a clear desktop experience for operational control.",
    description:
      "The admin high-fidelity interface supports daily monitoring and management through the dashboard, planting history, plant reminders, and planting-instruction modules.",
    images: [
      {
        src: "/images/agriplant/prototype/hifi-admin-dashboard.png",
        alt: "Agriplant admin dashboard",
        label: "Dashboard",
      },
      {
        src: "/images/agriplant/prototype/hifi-admin-history.png",
        alt: "Agriplant admin planting history interface",
        label: "Planting History",
      },
      {
        src: "/images/agriplant/prototype/hifi-admin-reminder.png",
        alt: "Agriplant admin reminder management interface",
        label: "Manage Plant Reminders",
      },
      {
        src: "/images/agriplant/prototype/hifi-admin-planting.png",
        alt: "Agriplant admin planting management interface",
        label: "Planting Management",
      },
    ],
  },
  {
    id: "interactive-prototype",
    label: "Interactive Prototype",
    title: "Connecting mobile and admin screens into testable experiences.",
    description:
      "The final prototype demonstrates how end users and administrators navigate the main Agriplant journeys, complete key tasks, and interact with the connected product ecosystem.",
    images: [
      {
        src: "/images/agriplant/prototype/prototype-end-user.png",
        alt: "Agriplant end-user prototype preview",
        label: "End User Prototype",
      },
      {
        src: "/images/agriplant/prototype/prototype-admin.png",
        alt: "Agriplant admin prototype preview",
        label: "Admin Prototype",
      },
    ],
    externalUrl: AGRIPLANT_PROTOTYPE_URL,
    externalLabel: "Open Agriplant Prototype",
  },
];

const ADMIN_OBJECTIVES = [
  "Access and manage the landing page.",
  "Manage and update local weather information.",
  "Create and manage watering reminders.",
  "Manage plant pest-control recommendations.",
  "Manage step-by-step planting instructions.",
  "Monitor plant-growth progress.",
  "Manage local agricultural products for sale.",
  "Identify usability barriers and efficiency issues.",
  "Evaluate user satisfaction.",
];

const MOBILE_OBJECTIVES = [
  "Identify problems users experience while interacting with Agriplant.",
  "Ensure the application’s features are accessible and easy to use.",
  "Identify user errors, difficulties, and unclear interactions.",
  "Evaluate user satisfaction.",
  "Review the efficiency of key user journeys.",
];

function AgriplantCaseStudy() {
  const pageRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { isDark } = useTheme();

  const [activeSection, setActiveSection] = useState("overview");
  const [lightbox, setLightbox] = useState<LightboxState>(null);
  const [personaIndex, setPersonaIndex] = useState(0);
  const [defineIndex, setDefineIndex] = useState(0);
  const [prioritizationIndex, setPrioritizationIndex] = useState(0);
  const [architectureIndex, setArchitectureIndex] = useState(0);
  const [activePrototypeGroup, setActivePrototypeGroup] = useState(
    PROTOTYPE_GROUPS[0].id,
  );
  const [prototypeSlides, setPrototypeSlides] = useState<
    Record<string, number>
  >(
    () =>
      Object.fromEntries(
        PROTOTYPE_GROUPS.map((group) => [group.id, 0]),
      ) as Record<string, number>,
  );

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
  const heroScale = useTransform(scrollYProgress, [0, 0.18], [1, 0.94]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.2]);

  const activePrototype =
    PROTOTYPE_GROUPS.find((group) => group.id === activePrototypeGroup) ??
    PROTOTYPE_GROUPS[0];

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

  const movePrototypeSlide = (groupId: string, direction: "prev" | "next") => {
    const group = PROTOTYPE_GROUPS.find((item) => item.id === groupId);
    if (!group) return;

    setPrototypeSlides((current) => {
      const activeIndex = current[groupId] ?? 0;
      const offset = direction === "next" ? 1 : -1;

      return {
        ...current,
        [groupId]:
          (activeIndex + offset + group.images.length) % group.images.length,
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
                  aria-label="Agriplant project image preview"
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
                  className="relative flex max-h-[92vh] w-full max-w-[1400px] flex-col overflow-hidden rounded-[1.75rem] border border-white/15 bg-[#080808] shadow-[0_30px_120px_rgba(0,0,0,0.9),0_0_60px_rgba(34,197,94,0.12)]"
                >
                  <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 md:px-7">
                    <div className="min-w-0">
                      <p className="text-[9px] uppercase tracking-[0.3em] text-emerald-200/50">
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
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/[0.05] text-white/60 transition hover:rotate-90 hover:border-emerald-300/40 hover:text-white"
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
                          onClick={() => moveLightbox("prev")}
                          aria-label="Previous image"
                          className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white/65 backdrop-blur-md transition hover:border-emerald-300/50 hover:bg-emerald-500/20 hover:text-white md:left-7"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => moveLightbox("next")}
                          aria-label="Next image"
                          className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white/65 backdrop-blur-md transition hover:border-emerald-300/50 hover:bg-emerald-500/20 hover:text-white md:right-7"
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
                    <span className="font-display text-lg italic text-emerald-100/65">
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
        className="fixed inset-x-0 top-0 z-[80] h-[2px] origin-left bg-gradient-to-r from-lime-400 via-emerald-400 to-cyan-400"
      />

      <header className="fixed inset-x-0 top-0 z-[70] px-4 pt-4 md:px-7 md:pt-6">
        <div
          className={`mx-auto flex max-w-[1400px] items-center justify-between rounded-full border border-stroke bg-surface/85 px-3 py-2 backdrop-blur-xl md:px-4 ${
            isDark
              ? "shadow-[0_15px_50px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)]"
              : "shadow-[0_15px_50px_rgba(65,40,53,0.14),inset_0_1px_0_rgba(255,255,255,0.95)]"
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
            Agriplant · UI/UX Case Study
          </span>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href="#emphatize"
              className={`inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-xs transition hover:border-emerald-400/50 hover:bg-emerald-500/20 ${
                isDark
                  ? "text-emerald-100/75 hover:text-white"
                  : "text-emerald-700 hover:text-emerald-800"
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
              "radial-gradient(circle at 72% 40%, rgba(34,197,94,0.17), transparent 32%), radial-gradient(circle at 18% 75%, rgba(132,204,22,0.11), transparent 34%)",
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
                <span className="h-px w-9 bg-gradient-to-r from-emerald-400 to-transparent" />
                <span className="text-[10px] uppercase tracking-[0.36em] text-emerald-300/65">
                  Mobile App + Admin Website
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="max-w-4xl text-[clamp(4rem,8vw,8.7rem)] leading-[0.82] tracking-[-0.065em] text-text-primary">
                Agri
                <span
                  className={`font-display italic ${
                    isDark ? "text-emerald-200" : "text-emerald-600"
                  }`}
                >
                  plant.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-8 max-w-xl text-base leading-8 text-text-secondary md:text-lg">
                A connected planting ecosystem that helps users plan, monitor,
                and care for plants while giving administrators clear control
                over content, reminders, weather information, and local
                products.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-9 flex flex-wrap gap-2.5">
                {[
                  "UI/UX Design",
                  "Mobile App",
                  "Admin Dashboard",
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
                  ["Platforms", "Mobile + Desktop"],
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
            <div className="absolute -inset-10 rounded-full bg-emerald-500/10 blur-[100px]" />
            <div
              className={`relative rotate-[1.5deg] rounded-[2.25rem] border border-stroke bg-surface/80 p-3 backdrop-blur-xl md:p-4 ${
                isDark
                  ? "shadow-[0_40px_110px_rgba(0,0,0,0.72),0_0_50px_rgba(34,197,94,0.11),inset_0_1px_0_rgba(255,255,255,0.1)]"
                  : "shadow-[0_32px_90px_rgba(65,40,53,0.2),0_0_45px_rgba(34,197,94,0.1),inset_0_1px_0_rgba(255,255,255,0.95)]"
              }`}
            >
              <button
                type="button"
                onClick={() => openGallery([HERO_IMAGE])}
                className="group relative block w-full overflow-hidden rounded-[1.65rem] bg-black"
                aria-label="Open Agriplant project cover"
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
                          ? "bg-emerald-500/10 text-emerald-100"
                          : "bg-emerald-100 text-emerald-700"
                        : "text-muted hover:bg-surface-elevated hover:text-text-primary"
                    }`}
                  >
                    <span
                      className={`font-display italic transition ${
                        isActive
                          ? isDark
                            ? "text-emerald-300"
                            : "text-emerald-600"
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
              <Reveal>
                <SectionHeading
                  number="00"
                  eyebrow="Project overview"
                  title="Helping users plan, monitor, and maintain healthier plants."
                  description="Agriplant is a mobile application and admin website designed to simplify planting activities. Users can view local weather information, receive watering and fertilizing reminders, follow step-by-step planting instructions, monitor progress, and explore local agricultural products."
                  accent="emerald"
                />
              </Reveal>

              <div className="grid gap-4 md:grid-cols-2">
                {[
                  {
                    icon: Sprout,
                    label: "Overview",
                    title: "A connected planting assistant",
                    text: "Agriplant helps users choose planting activities, schedule plant care, and follow their progress through a mobile experience.",
                  },
                  {
                    icon: Sparkles,
                    label: "Goal",
                    title: "Upgrade the experience",
                    text: "Transform the application from an early concept into a polished high-fidelity mobile and desktop product.",
                  },
                  {
                    icon: Leaf,
                    label: "My Role",
                    title: "UI/UX Designer",
                    text: "Responsible for research, user flows, information architecture, interface design, prototyping, and usability evaluation.",
                  },
                  {
                    icon: Workflow,
                    label: "Methodology",
                    title: "Design Thinking",
                    text: "Emphatize, Define, Ideate, Prototype, and Test were used to guide the end-to-end design process.",
                  },
                ].map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <Reveal key={item.label} delay={index * 0.08}>
                      <article className="h-full rounded-[1.6rem] border border-stroke bg-surface p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.07)]">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-300/25 bg-emerald-500/10">
                            <Icon className="h-5 w-5 text-emerald-500" />
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

            <div className="mt-12 grid gap-5 xl:grid-cols-2">
              <Reveal>
                <ObjectiveCard
                  icon={LayoutDashboard}
                  eyebrow="Desktop admin objectives"
                  title="Supporting daily operational control."
                  items={ADMIN_OBJECTIVES}
                />
              </Reveal>

              <Reveal delay={0.08}>
                <ObjectiveCard
                  icon={CloudSun}
                  eyebrow="Mobile user objectives"
                  title="Making planting activities easier to complete."
                  items={MOBILE_OBJECTIVES}
                />
              </Reveal>
            </div>
          </section>

          <section id="emphatize" className="scroll-mt-32 py-24 md:py-36">
            <div className="grid gap-12 xl:grid-cols-[0.84fr_1.16fr] xl:items-start">
              <div>
                <Reveal>
                  <SectionHeading
                    number="01"
                    eyebrow="Emphatize"
                    title="Understanding what users need from a planting assistant."
                    description="During the Emphatize stage, I conducted online observations and interviews to understand user needs, recurring problems, habits, motivations, and the difficulties they experience while caring for plants."
                    accent="emerald"
                  />
                </Reveal>

                <Reveal delay={0.12}>
                  <div className="mt-9 rounded-[1.75rem] border border-emerald-300/15 bg-emerald-500/[0.055] p-6 md:p-7">
                    <Quote className="h-6 w-6 text-emerald-400" />
                    <p
                      className={`mt-5 font-display text-xl italic leading-8 ${
                        isDark ? "text-emerald-50/80" : "text-emerald-800/85"
                      }`}
                    >
                      “The research focused on the real routines, frustrations,
                      and expectations behind everyday plant care.”
                    </p>
                  </div>
                </Reveal>
              </div>

              <div className="space-y-5">
                <GallerySlider
                  eyebrow="User personas"
                  title="Three user perspectives shaped the research direction."
                  images={PERSONA_IMAGES}
                  currentIndex={personaIndex}
                  onIndexChange={setPersonaIndex}
                  onOpen={openGallery}
                  isDark={isDark}
                  accent="emerald"
                />

                <ProcessImage
                  image={INTERVIEW_IMAGES[0]}
                  images={INTERVIEW_IMAGES}
                  index={0}
                  onOpen={openGallery}
                  aspectClass="aspect-[16/7]"
                  accent="emerald"
                />
              </div>
            </div>

            <Reveal delay={0.18}>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  "Online observation",
                  "User interviews",
                  "Persona development",
                  "Pain-point identification",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex min-h-[72px] items-center justify-center gap-3 rounded-xl border border-stroke bg-surface-elevated px-4 py-3 text-center text-sm leading-6 text-muted"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </section>

          <section id="define" className="scroll-mt-32 py-24 md:py-36">
            <div className="grid gap-12 xl:grid-cols-[0.82fr_1.18fr] xl:items-start">
              <div>
                <Reveal>
                  <SectionHeading
                    number="02"
                    eyebrow="Define"
                    title="Turning research findings into clear product requirements."
                    description="During the Define stage, I collaborated with Mahmudah to organize the problems and needs discovered during Emphatize. The findings were grouped into interests, influences, goals, expectations, motivations, pain points, and frustrations."
                    accent="emerald"
                  />
                </Reveal>

              </div>

              <div className="space-y-5">
                <GallerySlider
                  eyebrow="Grouped user findings"
                  title="Defining the patterns behind user behavior and frustration."
                  description="The research findings were grouped to reveal recurring user needs and determine which problems should guide the product direction."
                  images={DEFINE_PROBLEM_IMAGES}
                  currentIndex={defineIndex}
                  onIndexChange={setDefineIndex}
                  onOpen={openGallery}
                  isDark={isDark}
                  accent="emerald"
                />

                <div className="grid gap-5 md:grid-cols-3">
                  {DEFINE_SUPPORT_IMAGES.map((image, index) => (
                    <Reveal key={image.src} delay={index * 0.07}>
                      <ProcessImage
                        image={image}
                        images={DEFINE_SUPPORT_IMAGES}
                        index={index}
                        onOpen={openGallery}
                        aspectClass="aspect-[4/3]"
                        accent="emerald"
                      />
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>

            <Reveal delay={0.14}>
              <article className="mt-6 w-full rounded-[1.5rem] border border-stroke bg-surface-elevated p-5 md:p-6 xl:w-[calc(100%+5rem)]">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.24em] text-emerald-500">
                      Mobile Application
                    </p>
                    <h3 className="mt-2 text-lg font-medium text-text-primary">
                      End User Requirements
                    </h3>
                  </div>

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-emerald-300/25 bg-emerald-500/10">
                    <Sprout className="h-5 w-5 text-emerald-500" />
                  </div>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  {[
                    "View local weather information.",
                    "Receive plant-watering reminders.",
                    "Receive care reminders at the right time.",
                    "Follow step-by-step planting instructions.",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex min-h-[96px] items-start gap-3 rounded-xl border border-stroke bg-surface px-4 py-4 text-sm leading-6 text-muted"
                    >
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </article>
            </Reveal>

            <Reveal delay={0.2}>
              <article className="mt-5 w-full rounded-[1.5rem] border border-stroke bg-surface-elevated p-5 md:p-6 xl:w-[calc(100%+5rem)]">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.24em] text-emerald-500">
                      Administrative Platform
                    </p>
                    <h3 className="mt-2 text-lg font-medium text-text-primary">
                      Admin Requirements
                    </h3>
                  </div>

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-emerald-300/25 bg-emerald-500/10">
                    <LayoutDashboard className="h-5 w-5 text-emerald-500" />
                  </div>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  {[
                    "Manage the landing page and weather information.",
                    "Create and manage watering reminders.",
                    "Manage fertilizer recommendations for specific plants.",
                    "Manage step-by-step planting instructions.",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex min-h-[96px] items-start gap-3 rounded-xl border border-stroke bg-surface px-4 py-4 text-sm leading-6 text-muted"
                    >
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </article>
            </Reveal>
          </section>

          <section id="ideate" className="scroll-mt-32 py-24 md:py-36">
            <div
              className={`overflow-hidden rounded-[2.5rem] border border-stroke bg-surface p-5 md:p-8 xl:p-10 ${
                isDark
                  ? "shadow-[0_35px_110px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.06)]"
                  : "shadow-[0_30px_90px_rgba(65,40,53,0.14),inset_0_1px_0_rgba(255,255,255,0.95)]"
              }`}
            >
              <div className="grid gap-12 xl:grid-cols-[0.8fr_1.2fr] xl:items-start">
                <div>
                  <Reveal>
                    <SectionHeading
                      number="03"
                      eyebrow="Ideate"
                      title="Developing and prioritizing solutions for two connected platforms."
                      description="During the Ideate stage, I analyzed the needs discovered during Define and translated them into feature ideas for the end-user mobile application and the admin website."
                      accent="emerald"
                    />
                  </Reveal>

                  <Reveal delay={0.1}>
                    <div className="mt-9 rounded-[1.5rem] border border-stroke bg-surface-elevated p-5">
                      <div className="flex flex-wrap items-center gap-2 font-mono text-[9px] uppercase leading-6 tracking-[0.15em] text-muted">
                        <span className="text-emerald-500">User needs</span>
                        <span>→</span>
                        <span>Feature ideas</span>
                        <span>→</span>
                        <span>Impact & feasibility</span>
                        <span>→</span>
                        <span className="text-emerald-500">
                          Product structure
                        </span>
                      </div>
                    </div>
                  </Reveal>

                  <Reveal delay={0.16}>
                    <div className="mt-5 rounded-[1.75rem] border border-emerald-300/15 bg-emerald-500/[0.055] p-6 md:p-7">
                      <Sparkles className="h-5 w-5 text-emerald-500" />
                      <p className="mt-5 text-sm leading-7 text-muted">
                        The prioritization process helped separate essential
                        journeys from supporting ideas, while the information
                        architecture clarified how content and features should
                        be organized across mobile and desktop.
                      </p>
                    </div>
                  </Reveal>
                </div>

                <div className="min-w-0 space-y-5">
                  <GallerySlider
                    eyebrow="Prioritization matrix"
                    title="Balancing user impact with implementation feasibility."
                    description="Four matrices were used to compare end-user and admin ideas and determine which features should receive the highest priority."
                    images={PRIORITIZATION_IMAGES}
                    currentIndex={prioritizationIndex}
                    onIndexChange={setPrioritizationIndex}
                    onOpen={openGallery}
                    isDark={isDark}
                    accent="emerald"
                  />

                  <GallerySlider
                    eyebrow="Information architecture"
                    title="Organizing the mobile and desktop ecosystems."
                    description="The information architecture maps the relationship between pages, features, actions, and supporting content for both user types."
                    images={INFORMATION_ARCHITECTURE_IMAGES}
                    currentIndex={architectureIndex}
                    onIndexChange={setArchitectureIndex}
                    onOpen={openGallery}
                    isDark={isDark}
                    accent="emerald"
                  />
                </div>
              </div>

              <Reveal delay={0.24}>
                <div className="mt-10 grid gap-4 border-t border-stroke pt-8 sm:grid-cols-2 xl:grid-cols-4">
                  {[
                    {
                      number: "01",
                      title: "Weather Awareness",
                      text: "Local weather data supports better planting and care decisions.",
                    },
                    {
                      number: "02",
                      title: "Plant-Care Reminders",
                      text: "Scheduled reminders reduce forgotten watering and fertilizing activities.",
                    },
                    {
                      number: "03",
                      title: "Guided Planting",
                      text: "Step-by-step instructions make planting easier for less experienced users.",
                    },
                    {
                      number: "04",
                      title: "Admin Control",
                      text: "A desktop dashboard centralizes content, monitoring, and product management.",
                    },
                  ].map((item) => (
                    <article
                      key={item.number}
                      className="flex h-full min-h-[170px] flex-col rounded-[1.4rem] border border-stroke bg-surface-elevated p-5"
                    >
                      <span className="font-display text-xl italic text-emerald-500">
                        {item.number}
                      </span>
                      <h3 className="mt-6 text-sm font-medium text-text-primary">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-xs leading-5 text-muted">
                        {item.text}
                      </p>
                    </article>
                  ))}
                </div>
              </Reveal>
            </div>
          </section>

          <section id="prototype" className="scroll-mt-32 py-24 md:py-36">
            <Reveal>
              <SectionHeading
                number="04"
                eyebrow="Prototype"
                title="Connecting flows, structure, visual systems, and final interfaces."
                description="At this stage, I created task flows and interface structures for the mobile application and admin website, then developed low-fidelity wireframes, design systems, high-fidelity screens, and interactive prototypes."
                accent="emerald"
              />
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-9 rounded-[1.75rem] border border-emerald-300/15 bg-emerald-500/[0.055] p-6 md:p-7">
                <p className="text-sm leading-7 text-muted md:text-base">
                  This stage brought the complete Agriplant ecosystem together.
                  The mobile experience focuses on simple planting assistance,
                  while the admin website supports efficient monitoring and
                  content management.
                </p>
              </div>
            </Reveal>

            <div className="mt-10 flex gap-3 overflow-x-auto pb-3">
              {PROTOTYPE_GROUPS.map((group, index) => {
                const isActive = activePrototypeGroup === group.id;

                return (
                  <button
                    key={group.id}
                    type="button"
                    onClick={() => setActivePrototypeGroup(group.id)}
                    aria-pressed={isActive}
                    className={`group relative min-h-[132px] min-w-[190px] flex-1 overflow-hidden rounded-2xl border px-4 py-4 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70 ${
                      isActive
                        ? "border-emerald-400/60 bg-emerald-500/15 text-text-primary shadow-[0_12px_35px_rgba(34,197,94,0.14),inset_0_1px_0_rgba(255,255,255,0.08)]"
                        : "border-stroke bg-surface-elevated text-muted hover:-translate-y-1 hover:border-emerald-400/45 hover:bg-emerald-500/[0.08] hover:text-text-primary"
                    }`}
                  >
                    <span
                      className={`absolute inset-x-4 top-0 h-[2px] rounded-full bg-emerald-400 transition-opacity ${
                        isActive
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-60"
                      }`}
                    />

                    <div className="flex items-start justify-between gap-3">
                      <span
                        className={`font-display text-xl italic ${
                          isActive ? "text-emerald-400" : "text-emerald-400/65"
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 ${
                          isActive
                            ? "rotate-90 border-emerald-400/50 bg-emerald-500/20 text-emerald-300"
                            : "border-stroke bg-surface text-muted group-hover:translate-x-0.5 group-hover:border-emerald-400/40 group-hover:text-emerald-400"
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
                        isActive ? "text-emerald-400" : "text-muted"
                      }`}
                    >
                      {isActive ? "Selected" : "View section"}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="mt-5">
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
                  <GallerySlider
                    eyebrow={activePrototype.label}
                    title={activePrototype.title}
                    description={activePrototype.description}
                    images={activePrototype.images}
                    currentIndex={prototypeSlides[activePrototype.id] ?? 0}
                    onIndexChange={(index) =>
                      setPrototypeSlides((current) => ({
                        ...current,
                        [activePrototype.id]: index,
                      }))
                    }
                    onPrevious={() =>
                      movePrototypeSlide(activePrototype.id, "prev")
                    }
                    onNext={() =>
                      movePrototypeSlide(activePrototype.id, "next")
                    }
                    onOpen={openGallery}
                    isDark={isDark}
                    accent="emerald"
                    externalUrl={activePrototype.externalUrl}
                    externalLabel={activePrototype.externalLabel}
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
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-0 h-72 w-[600px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[120px]"
              />

              <div className="relative">
                <Reveal>
                  <div className="text-center">
                    <Sparkles className="mx-auto h-6 w-6 text-emerald-400" />
                    <p className="mt-7 text-[9px] uppercase tracking-[0.34em] text-muted">
                      05 · Summary
                    </p>
                    <h2 className="mx-auto mt-5 max-w-4xl text-4xl leading-[1.08] tracking-[-0.04em] text-text-primary md:text-6xl">
                      Designing one connected ecosystem for plant care and
                      administration.
                    </h2>
                    <p className="mx-auto mt-7 max-w-3xl text-sm leading-7 text-muted md:text-base md:leading-8">
                      Agriplant demonstrates how user research, clear product
                      structure, and consistent interface decisions can connect
                      a mobile planting assistant with an administrative
                      website. The final experience helps users manage daily
                      plant-care activities while enabling administrators to
                      maintain information, reminders, guidance, history, and
                      local agricultural products more efficiently.
                    </p>
                  </div>
                </Reveal>

                <div className="mt-12 grid gap-4 md:grid-cols-3">
                  {[
                    {
                      number: "01",
                      title: "Research-led direction",
                      text: "User observations and interviews became the foundation for defining relevant planting and administration features.",
                    },
                    {
                      number: "02",
                      title: "Two connected platforms",
                      text: "The mobile application and admin website were designed as one ecosystem with different responsibilities and goals.",
                    },
                    {
                      number: "03",
                      title: "Validated product experience",
                      text: "Task flows, prototypes, and usability testing helped reveal interaction barriers and opportunities for improvement.",
                    },
                  ].map((item, index) => (
                    <Reveal key={item.number} delay={index * 0.08}>
                      <article className="flex h-full min-h-[210px] flex-col rounded-[1.5rem] border border-stroke bg-surface-elevated p-6 transition duration-300 hover:-translate-y-1 hover:border-emerald-400/35">
                        <span className="font-display text-2xl italic text-emerald-500">
                          {item.number}
                        </span>
                        <h3 className="mt-7 text-lg font-medium text-text-primary">
                          {item.title}
                        </h3>
                        <p className="mt-4 text-sm leading-7 text-muted">
                          {item.text}
                        </p>
                        <CheckCircle2 className="mt-auto h-4 w-4 box-content pt-6 text-emerald-500" />
                      </article>
                    </Reveal>
                  ))}
                </div>

                <Reveal delay={0.2}>
                  <div className="mt-12 rounded-[1.75rem] border border-emerald-300/15 bg-emerald-500/[0.055] p-6 md:p-8">
                    <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.26em] text-emerald-400">
                          Project Documentation
                        </p>
                        <h3 className="mt-4 text-2xl leading-tight tracking-[-0.03em] text-text-primary md:text-3xl">
                          Read the complete case study and review the usability
                          testing findings.
                        </h3>
                        <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
                          The full Agriplant design process is available on
                          Medium, while the usability-testing document presents
                          the observed user behavior, difficulties, and
                          evaluation results.
                        </p>
                      </div>

                      <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                        <a
                          href={USABILITY_TESTING_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center justify-center gap-3 rounded-full border border-emerald-400/35 bg-emerald-500/15 px-6 py-3.5 text-sm text-text-primary transition hover:-translate-y-1 hover:border-emerald-400/60 hover:bg-emerald-500/25"
                        >
                          Usability Testing
                          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>

                        <a
                          href={MEDIUM_ARTICLE_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center justify-center gap-3 rounded-full border border-stroke bg-surface-elevated px-6 py-3.5 text-sm text-text-secondary transition hover:-translate-y-1 hover:border-emerald-400/40 hover:text-text-primary"
                        >
                          Read on Medium
                          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={0.26}>
                  <div className="mt-10 flex justify-center">
                    <a
                      href="/#work"
                      className="group inline-flex items-center gap-3 rounded-full border border-stroke bg-surface-elevated px-6 py-3.5 text-sm text-text-secondary transition hover:-translate-y-1 hover:border-emerald-400/40 hover:bg-emerald-500/10 hover:text-text-primary"
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
  accent,
}: {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  accent: "emerald";
}) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="font-display text-xl italic text-emerald-300/65">
          {number}
        </span>
        <span className="h-px w-8 bg-emerald-300/35" />
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
      <span className="sr-only">{accent}</span>
    </div>
  );
}

function ObjectiveCard({
  icon: Icon,
  eyebrow,
  title,
  items,
}: {
  icon: typeof LayoutDashboard;
  eyebrow: string;
  title: string;
  items: string[];
}) {
  return (
    <article className="h-full rounded-[1.8rem] border border-stroke bg-surface p-6 md:p-8">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-300/25 bg-emerald-500/10">
        <Icon className="h-5 w-5 text-emerald-500" />
      </div>
      <p className="mt-6 text-[9px] uppercase tracking-[0.24em] text-emerald-500">
        {eyebrow}
      </p>
      <h3 className="mt-3 text-2xl leading-tight text-text-primary">{title}</h3>
      <div className="mt-6 grid gap-3">
        {items.map((item) => (
          <div
            key={item}
            className="flex items-start gap-3 text-sm leading-6 text-muted"
          >
            <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-500" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </article>
  );
}


function GallerySlider({
  eyebrow,
  title,
  description,
  images,
  currentIndex,
  onIndexChange,
  onPrevious,
  onNext,
  onOpen,
  isDark,
  externalUrl,
  externalLabel,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  images: GalleryImage[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  onPrevious?: () => void;
  onNext?: () => void;
  onOpen: (images: GalleryImage[], index?: number) => void;
  isDark: boolean;
  accent: "emerald";
  externalUrl?: string;
  externalLabel?: string;
}) {
  const safeIndex = Math.min(currentIndex, images.length - 1);
  const currentImage = images[safeIndex];

  const showPrevious = () => {
    if (onPrevious) {
      onPrevious();
      return;
    }

    onIndexChange(
      safeIndex === 0 ? images.length - 1 : safeIndex - 1,
    );
  };

  const showNext = () => {
    if (onNext) {
      onNext();
      return;
    }

    onIndexChange((safeIndex + 1) % images.length);
  };

  return (
    <div
      className={`w-full min-w-0 overflow-hidden rounded-[2rem] border border-stroke bg-surface ${
        isDark
          ? "shadow-[0_35px_110px_rgba(0,0,0,0.48),inset_0_1px_0_rgba(255,255,255,0.06)]"
          : "shadow-[0_30px_90px_rgba(65,40,53,0.11),inset_0_1px_0_rgba(255,255,255,0.95)]"
      }`}
    >
      {/* Teks kiri dan gambar kanan */}
      <div className="grid min-w-0 gap-8 p-5 md:p-7 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] xl:items-center">
        <div className="min-w-0 flex flex-col justify-center">
          <p className="text-[10px] uppercase tracking-[0.24em] text-emerald-400/80">
            {eyebrow}
          </p>

          <h3 className="mt-4 max-w-[460px] text-2xl leading-tight tracking-[-0.03em] text-text-primary md:text-3xl">
            {title}
          </h3>

          {description && (
            <p className="mt-4 max-w-[460px] text-sm leading-6 text-muted md:text-base">
              {description}
            </p>
          )}
          {externalUrl && externalLabel && (
            <a
              href={externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300 transition hover:border-emerald-300/45 hover:bg-emerald-500/15"
            >
              {externalLabel}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          )}

          {/* Tombol dibuat di bawah kiri */}
          {images.length > 1 && (
            <div className="mt-7 flex items-center gap-3">
              <button
                type="button"
                onClick={showPrevious}
                aria-label="Previous image"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-surface-elevated text-text-primary transition hover:border-emerald-300/45 hover:text-emerald-400"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={showNext}
                aria-label="Next image"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-surface-elevated text-text-primary transition hover:border-emerald-300/45 hover:text-emerald-400"
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

        {/* Bagian gambar kanan */}
        <div className="min-w-0">
          <div
            className={`group relative w-full min-w-0 overflow-hidden rounded-[1.6rem] border border-stroke bg-surface-elevated p-2 ${
      isDark
        ? "shadow-[0_24px_70px_rgba(0,0,0,0.42)]"
        : "shadow-[0_24px_70px_rgba(65,40,53,0.1)]"
    }`}
  >
    <button
      type="button"
      onClick={() => onOpen(images, safeIndex)}
      className="block min-w-0 w-full text-left"
      aria-label={`Open ${currentImage.label}`}
    >
      <div className="relative h-[260px] overflow-hidden rounded-[1.2rem] bg-black/5 md:h-[290px] xl:h-[310px]">
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
              className="h-full w-full object-contain transition duration-500 group-hover:scale-[1.02]"
            />
          </motion.div>
        </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.24em] text-white/60">
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
      </div>

      {/* Pilihan gambar di bawah */}
      <div className="border-t border-stroke px-5 py-4 md:px-7">
        <div className="flex min-w-0 max-w-full gap-2 overflow-x-auto pb-1">
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => onIndexChange(index)}
              className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-xs transition ${
                index === safeIndex
                  ? "border-emerald-500 bg-emerald-500 text-white"
                  : "border-stroke bg-surface-elevated text-muted hover:border-emerald-400/40 hover:text-text-primary"
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
  accent: "emerald";
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(images, index)}
      className="group relative block w-full overflow-hidden rounded-[1.6rem] border border-stroke bg-surface p-2 text-left shadow-[0_24px_70px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.08)] transition duration-500 hover:-translate-y-1 hover:border-emerald-400/35 hover:shadow-[0_30px_85px_rgba(0,0,0,0.24),0_0_30px_rgba(34,197,94,0.08)]"
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
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-300/18 bg-emerald-500/10">
            <ImageIcon className="h-5 w-5 text-emerald-200/70" />
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