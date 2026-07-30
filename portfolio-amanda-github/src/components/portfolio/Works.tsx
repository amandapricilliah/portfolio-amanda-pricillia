import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Code2,
  LayoutGrid,
  Sparkles,
} from "lucide-react";
import { useMemo, useState } from "react";

import { useTheme } from "@/components/theme/ThemeProvider";

type ProjectCategory = "UI/UX Designer" | "Web Developer" | "Graphics Designer";

type Project = {
  id: string;
  title: string;
  category: ProjectCategory;
  type: string;
  description: string;
  thumbnail: string;
  tags: string[];
  href?: string;
};

const FILTERS: {
  label: ProjectCategory;
  icon: typeof LayoutGrid;
}[] = [
  {
    label: "UI/UX Designer",
    icon: LayoutGrid,
  },
  {
    label: "Web Developer",
    icon: Code2,
  },
];

const PROJECTS: Project[] = [
  // UI/UX DESIGNER
  {
  id: "client-website-mockups",
  title: "30+ Client Website Mockups",
  category: "UI/UX Designer",
  type: "Website Mockups + Style Guides",
  href: "/client-websites",
  description:
    "A collection of 30+ website concepts created for clients across different industries, presented through dynamic mockups and visual website showcases.",
  thumbnail: "/images/client-websites/client-mockups.png",
  tags: ["Web Design", "Style Guide", "Mockup", "Client Work"],
},
  {
    id: "farmagym",
    title: "FarmaGym",
    category: "UI/UX Designer",
    type: "Mobile App · Full Design Thinking",
    description:
      "A fitness planning application developed through an end-to-end design thinking process, from user research and problem definition to prototyping and usability validation.",
    thumbnail: "/images/farmagym/farmagym_mockup.png",
    tags: ["Design Thinking", "Mobile App", "Research", "Prototype"],
    href: "/farmagym",
  },
  {
    id: "agriplant",
    title: "Agriplant",
    category: "UI/UX Designer",
    type: "Mobile App + Admin Website",
    href: "/agriplant",
    description:
      "A smart farming ecosystem consisting of a mobile application for users and a web-based administrative dashboard, designed through a complete design thinking process.",
    thumbnail: "/images/agriplant/agriplant-mockup.png",
    tags: ["Smart Farming", "Mobile App", "Dashboard", "Design System"],
  },
  {
  id: "user-complaints",
  title: "User Complaints",
  category: "UI/UX Designer",
  type: "Web Platform · Full Design Thinking",
  href: "/user-complaints",
  description:
    "A complaint feature for the iNews digital platform, developed through user research, user flows, wireframes, interface exploration, and interactive prototyping.",
  thumbnail: "/images/user-complaints/user-complaints-cover.png",
  tags: [
    "Web Design",
    "User Research",
    "User Flow",
    "Prototype",
  ],
},
  {
  id: "kiloin",
  title: "Kiloin",
  category: "UI/UX Designer",
  type: "Mobile App · Product & Business Documentation",
  href: "/kiloin",
  description:
    "A recycling service application that connects waste pickup through Ko-Put with recycled-product shopping through Ko-Mart, supported by wireframes, a class diagram, and a complete business plan.",
  thumbnail: "/images/kiloin/Thumbnail.png",
  tags: [
    "Mobile App",
    "Recycling",
    "Class Diagram",
    "Business Plan",
  ],
},
  {
  id: "amr-farms",
  title: "AMR Farms",
  category: "UI/UX Designer",
  type: "Mobile Grocery App + Admin Dashboard",
  href: "/amr-farms",
  description:
    "A grocery-commerce concept featuring mobile shopping wireframes and an administrative dashboard for product categories, income data, and business reporting.",
  thumbnail: "/images/amr-farms/amr-farms-hero.png",
  tags: [
    "Mobile App",
    "Admin Dashboard",
    "Grocery Commerce",
    "Wireframe",
  ],
},
  {
  id: "inews-byte",
  title: "iNews Byte",
  category: "Web Developer",
  type: "News Portal · Short-Video Platform",
  href: "/inews-byte",
  description:
    "A short-form video news channel developed for the iNews portal using Agile Development, with YouTube integration, content management, and interactive features.",
  thumbnail: "/images/inews-byte/inews-byte-cover.png",
  tags: ["CodeIgniter 4", "PHP", "MySQL", "Agile"],
},
  {
    id: "frontend-project",
    title: "Front-End Website Project",
    category: "Web Developer",
    type: "Responsive Front-End Development",
    description:
      "A responsive website implementation developed from an approved interface design with attention to layout consistency, usability, and device compatibility.",
    thumbnail: "/images/projects/frontend-project.webp",
    tags: ["Front-End", "Responsive", "Web Interface", "Implementation"],
  },
  {
    id: "wanuarejo-branding",
    title: "Wanuarejo Village Identity",
    category: "Graphics Designer",
    type: "Logo Design + Brand Identity",
    description:
      "A complete village identity project covering logo philosophy, typography, colors, symbols, visual meaning, and realistic applications across merchandise and environmental mockups.",
    thumbnail: "/images/projects/wanuarejo.webp",
    tags: ["Logo Design", "Brand Identity", "Typography", "Mockup"],
  },
  {
    id: "share-story-template",
    title: "News Share Story Templates",
    category: "Graphics Designer",
    type: "Okezone + SINDOnews",
    description:
      "Instagram Story templates that allow users to share Okezone and SINDOnews articles through visually branded and mobile-friendly layouts.",
    thumbnail: "/images/projects/share-story.webp",
    tags: ["Social Media", "News Media", "Template", "Mobile Mockup"],
  },
  {
    id: "sindonews-banner",
    title: "SINDOnews Quiz Banner",
    category: "Graphics Designer",
    type: "Website Banner",
    description:
      "A promotional header banner designed for the daily quiz feature on the SINDOnews website.",
    thumbnail: "/images/projects/sindonews-banner.webp",
    tags: ["Web Banner", "Campaign", "News Media", "Visual Design"],
  },
  {
    id: "okezone-banner",
    title: "Okezone Quiz Banner",
    category: "Graphics Designer",
    type: "Website Banner",
    description:
      "A branded website banner created for the daily quiz experience on the Okezone digital news platform.",
    thumbnail: "/images/projects/okezone-banner.webp",
    tags: ["Web Banner", "Campaign", "Okezone", "Digital Media"],
  },
  {
    id: "resolusiweb-pricelist",
    title: "Resolusiweb Price List",
    category: "Graphics Designer",
    type: "Instagram Feed Design",
    description:
      "A social media price-list design created to present Resolusiweb services in a clear, structured, and visually engaging format.",
    thumbnail: "/images/projects/resolusiweb-pricelist.webp",
    tags: ["Social Media", "Price List", "Instagram", "Branding"],
  },
  {
    id: "ngadiharjo-ebook",
    title: "Ngadiharjo Village E-book",
    category: "Graphics Designer",
    type: "Editorial Design · 50+ Pages",
    description:
      "A village profile e-book containing more than 50 pages, designed to introduce Ngadiharjo through structured information, visual storytelling, and book mockups.",
    thumbnail: "/images/projects/ngadiharjo-ebook.webp",
    tags: ["Editorial", "E-book", "Layout Design", "Book Mockup"],
  },
  {
    id: "greeting-campaign",
    title: "Resolusiweb Greeting Campaign",
    category: "Graphics Designer",
    type: "Social Media Campaign",
    description:
      "A collection of branded greeting designs for national holidays and important celebrations, created for Resolusiweb’s Instagram content.",
    thumbnail: "/images/projects/greeting-campaign.webp",
    tags: ["Campaign", "Instagram", "Greeting Design", "Branding"],
  },
  {
    id: "resolusiweb-calendar",
    title: "Resolusiweb Calendar",
    category: "Graphics Designer",
    type: "Internal Design · 6 Concepts",
    description:
      "Six calendar design variations developed for internal company needs while maintaining consistent branding and practical readability.",
    thumbnail: "/images/projects/resolusiweb-calendar.webp",
    tags: ["Calendar", "Print Design", "Internal Branding", "Layout"],
  },
  {
    id: "boba-posters",
    title: "Boba Poster Collection",
    category: "Graphics Designer",
    type: "Poster Design · 10 Designs",
    description:
      "A collection of ten experimental promotional posters exploring typography, composition, colors, and product-oriented visual communication.",
    thumbnail: "/images/projects/boba-posters.webp",
    tags: ["Poster", "Food & Beverage", "Typography", "Campaign"],
  },
  {
    id: "ipb-internship-guide",
    title: "IPB Internship Guidebook",
    category: "Graphics Designer",
    type: "Editorial Cover · 7 Designs",
    description:
      "Seven cover design alternatives developed for an IPB internship guidebook, balancing academic credibility with a modern visual identity.",
    thumbnail: "/images/projects/ipb-guidebook.webp",
    tags: ["Book Cover", "Editorial", "Campus", "Print Design"],
  },
  {
    id: "shoe-feed-design",
    title: "Shoe Feed Collection",
    category: "Graphics Designer",
    type: "Social Media Design · 3 Designs",
    description:
      "Three experimental Instagram feed designs created to explore product presentation, promotional hierarchy, and visual branding.",
    thumbnail: "/images/projects/shoe-feeds.webp",
    tags: ["Instagram", "Product Design", "Social Media", "Promotion"],
  }

];

export function Works() {
  const [activeFilter, setActiveFilter] =
    useState<ProjectCategory>("UI/UX Designer");

  const { isDark } = useTheme();

  const filteredProjects = useMemo(
    () => PROJECTS.filter((project) => project.category === activeFilter),
    [activeFilter],
  );

  return (
    <section
      id="work"
      className="relative overflow-clip bg-bg pb-24 pt-4 md:pb-32 md:pt-8"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-52 top-[15%] h-[34rem] w-[34rem] rounded-full bg-fuchsia-500/[0.07] blur-[150px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-52 bottom-[10%] h-[36rem] w-[36rem] rounded-full bg-pink-500/[0.07] blur-[160px]"
      />

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        {/* Heading */}
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
        >
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-stroke" />

            <span className="text-xs uppercase tracking-[0.3em] text-muted">
              Selected Projects
            </span>

            <span className="h-px flex-1 bg-gradient-to-r from-pink-400/70 to-transparent" />
          </div>

          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <h2 className="text-5xl leading-[0.95] tracking-[-0.045em] text-text-primary sm:text-6xl md:text-7xl">
                Ideas shaped into
                <br />
                <span
                  className={`font-display italic ${
                    isDark ? "text-pink-200" : "text-pink-600"
                  }`}
                >
                  meaningful work.
                </span>
              </h2>
            </div>

            <div className="md:col-span-4">
              <p className="max-w-md text-sm leading-7 text-text-secondary md:text-base">
                A multidisciplinary collection of interface design, web
                development, branding, editorial, and visual communication
                projects.
              </p>

              <div className="mt-5 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted">
                <Sparkles
                  className={`h-4 w-4 ${
                    isDark ? "text-pink-300" : "text-pink-600"
                  }`}
                />
                {filteredProjects.length} projects displayed
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filter */}
        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{
            once: true,
          }}
          className="mt-12 overflow-x-auto pb-2 md:mt-16"
        >
          <div
            className={`inline-flex min-w-max items-center gap-2 rounded-full border border-stroke bg-surface p-2 ${
              isDark
                ? "shadow-[0_18px_50px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.09)]"
                : "shadow-[0_18px_50px_rgba(64,39,52,0.13),inset_0_1px_0_rgba(255,255,255,0.85)]"
            }`}
          >
            {FILTERS.map((filter) => {
              const Icon = filter.icon;
              const isActive = activeFilter === filter.label;

              return (
                <button
                  key={filter.label}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveFilter(filter.label)}
                  className={`relative inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-xs transition-all duration-300 sm:px-5 sm:text-sm ${
                    isActive
                      ? "text-white"
                      : "text-muted hover:bg-surface-elevated hover:text-text-primary"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-project-filter"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-fuchsia-600 via-pink-500 to-rose-500 shadow-[0_0_18px_rgba(236,72,153,0.45)]"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                    />
                  )}

                  <Icon className="relative z-10 h-4 w-4" />

                  <span className="relative z-10">{filter.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Project cards */}
        <motion.div
          layout
          className="mt-8 grid grid-cols-1 gap-5 md:mt-10 md:grid-cols-2 md:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                isDark={isDark}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  isDark,
}: {
  project: Project;
  index: number;
  isDark: boolean;
}) {
  const isExternalLink = project.href?.startsWith("http") ?? false;

  const sharedMotionProps = {
    layout: true,
    initial: {
      opacity: 0,
      y: 35,
      scale: 0.98,
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
    exit: {
      opacity: 0,
      y: 18,
      scale: 0.98,
    },
    transition: {
      duration: 0.55,
      delay: index * 0.045,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  };

  const cardClassName = `group relative block overflow-hidden rounded-[2rem] border border-stroke bg-surface transition-all duration-500 hover:-translate-y-1.5 hover:border-pink-400/35 ${
    project.href ? "cursor-pointer" : "cursor-default"
  } ${
    isDark
      ? "shadow-[0_22px_65px_rgba(0,0,0,0.58),inset_0_1px_0_rgba(255,255,255,0.09)] hover:shadow-[0_28px_80px_rgba(0,0,0,0.68),0_0_36px_rgba(236,72,153,0.12),inset_0_1px_0_rgba(255,255,255,0.12)]"
      : "shadow-[0_22px_65px_rgba(65,40,53,0.12),inset_0_1px_0_rgba(255,255,255,0.9)] hover:shadow-[0_28px_80px_rgba(65,40,53,0.18),0_0_36px_rgba(236,72,153,0.13),inset_0_1px_0_rgba(255,255,255,0.95)]"
  }`;

  const content = (
    <>
      {/* Thumbnail */}
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-[#181018] via-[#080808] to-[#140614]">
        <img
          src={project.thumbnail}
          alt={`${project.title} project thumbnail`}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/5 to-black/10" />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.7) 0.7px, transparent 0.7px)",
            backgroundSize: "5px 5px",
          }}
        />

        <div className="absolute left-5 top-5 rounded-full border border-white/[0.16] bg-black/45 px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-white/75 backdrop-blur-md">
          {project.category}
        </div>

        <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
          <p className="text-xs text-white/70">{project.type}</p>

          <span
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/[0.15] bg-black/50 backdrop-blur-md transition-all duration-300 ${
              project.href
                ? "text-white group-hover:border-pink-300/40 group-hover:bg-pink-500 group-hover:shadow-[0_0_20px_rgba(236,72,153,0.6)]"
                : "text-white/40"
            }`}
          >
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>

      {/* Card content */}
      <div className="relative p-6 md:p-7">
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 ${
            isDark
              ? "bg-gradient-to-br from-white/[0.055] via-transparent to-black/40"
              : "bg-gradient-to-br from-white/70 via-transparent to-pink-100/20"
          }`}
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-pink-500/0 blur-[60px] transition duration-500 group-hover:bg-pink-500/[0.12]"
        />

        <div className="relative z-10">
          <div className="flex items-start justify-between gap-5">
            <h3 className="text-2xl font-medium tracking-tight text-text-primary md:text-[1.7rem]">
              {project.title}
            </h3>

            <span
              className={`font-display text-lg italic ${
                isDark ? "text-pink-200/60" : "text-pink-700/70"
              }`}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <p className="mt-4 min-h-[72px] text-sm leading-6 text-muted transition-colors duration-300 group-hover:text-text-secondary">
            {project.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2 border-t border-stroke pt-5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-stroke bg-surface-elevated px-3 py-1.5 text-[10px] text-muted shadow-[0_7px_18px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-300 group-hover:border-pink-400/30 group-hover:text-text-secondary"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );

  if (project.href) {
    return (
      <motion.a
        {...sharedMotionProps}
        href={project.href}
        target={isExternalLink ? "_blank" : undefined}
        rel={isExternalLink ? "noopener noreferrer" : undefined}
        aria-label={`Open ${project.title} case study`}
        className={cardClassName}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.article {...sharedMotionProps} className={cardClassName}>
      {content}
    </motion.article>
  );
}