import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  LayoutGrid,
  Sparkles,
} from "lucide-react";
import { useMemo, useState } from "react";

import { useTheme } from "@/components/theme/ThemeProvider";
import { useLanguage } from "./LanguageProvider";
import type { Bilingual } from "./LanguageProvider";

type ProjectCategory = "Digital Product" | "Graphics Designer";

type Project = {
  id: string;
  title: string;
  category: ProjectCategory;
  type: Bilingual;
  description: Bilingual;
  thumbnail: string;
  tags: string[];
  href?: string;
};

const FILTERS: {
  value: ProjectCategory;
  label: Bilingual;
  icon: typeof LayoutGrid;
}[] = [
  {
    value: "Digital Product",
    label: { en: "Digital Product", id: "Produk Digital" },
    icon: LayoutGrid,
  },
];

const PROJECTS: Project[] = [
  // DIGITAL PRODUCT
  {
    id: "inews-byte",
    title: "iNews Byte",
    category: "Digital Product",
    type: { en: "News Portal · Short-Video Platform", id: "Portal Berita · Platform Video Singkat" },
    href: "/inews-byte",
    description: {
      en: "A short-form video news channel developed for the iNews portal using Agile Development, with YouTube integration, content management, and interactive features.",
      id: "Kanal berita video singkat untuk portal iNews yang dikembangkan dengan Agile Development, integrasi YouTube, pengelolaan konten, dan fitur interaktif.",
    },
    thumbnail: "/images/inews-byte/inews-byte-cover.png",
    tags: ["CodeIgniter 4", "PHP", "MySQL", "Agile"],
  },
  {
    id: "agriplant",
    title: "Agriplant",
    category: "Digital Product",
    type: { en: "Mobile App + Admin Website", id: "Aplikasi Mobile + Website Admin" },
    href: "/agriplant",
    description: {
      en: "A smart farming ecosystem consisting of a mobile application for users and a web-based administrative dashboard, designed through a complete design thinking process.",
      id: "Ekosistem smart farming yang terdiri dari aplikasi mobile untuk pengguna dan dashboard administrasi berbasis web, dirancang melalui proses design thinking yang lengkap.",
    },
    thumbnail: "/images/agriplant/agriplant-mockup.png",
    tags: ["Smart Farming", "Mobile App", "Dashboard", "Design System"],
  },
  {
    id: "user-complaints",
    title: "User Complaints",
    category: "Digital Product",
    type: { en: "Web Platform · Full Design Thinking", id: "Platform Web · Design Thinking Menyeluruh" },
    href: "/user-complaints",
    description: {
      en: "A complaint feature for the iNews digital platform, developed through user research, user flows, wireframes, interface exploration, and interactive prototyping.",
      id: "Fitur pengaduan untuk platform digital iNews yang dikembangkan melalui riset pengguna, user flow, wireframe, eksplorasi antarmuka, dan prototipe interaktif.",
    },
    thumbnail: "/images/user-complaints/user-complaints-cover.png",
    tags: ["Web Design", "User Research", "User Flow", "Prototype"],
  },
  {
    id: "farmagym",
    title: "FarmaGym",
    category: "Digital Product",
    type: { en: "Mobile App · Full Design Thinking", id: "Aplikasi Mobile · Design Thinking Menyeluruh" },
    href: "/farmagym",
    description: {
      en: "A fitness planning application developed through an end-to-end design thinking process, from user research and problem definition to prototyping and usability validation.",
      id: "Aplikasi perencanaan kebugaran yang dikembangkan melalui proses design thinking menyeluruh, mulai dari riset pengguna dan perumusan masalah hingga prototipe dan validasi usability.",
    },
    thumbnail: "/images/farmagym/farmagym_mockup.png",
    tags: ["Design Thinking", "Mobile App", "Research", "Prototype"],
  },
  {
    id: "lamarin",
    title: "LAMARIN",
    category: "Digital Product",
    type: { en: "Full-Stack SaaS · Product Strategy · UX · Engineering", id: "SaaS Full-Stack · Strategi Produk · UX · Engineering" },
    href: "/lamarin",
    description: {
      en: "An end-to-end job application management workspace combining Kanban tracking, calendar planning, personal analytics, secure document management, and account-based data privacy.",
      id: "Workspace pengelolaan lamaran kerja yang menggabungkan pelacakan Kanban, perencanaan kalender, analitik pribadi, manajemen dokumen aman, dan privasi data berbasis akun.",
    },
    thumbnail: "/images/lamarin/lamarin.png",
    tags: ["Next.js", "TypeScript", "Supabase", "Product Design"],
  },
  {
    id: "client-website-mockups",
    title: "30+ Client Websites",
    category: "Digital Product",
    type: { en: "Website Mockups + Style Guides", id: "Mockup Website + Style Guide" },
    href: "/client-websites",
    description: {
      en: "A collection of 30 website concepts created for clients across different industries, presented through dynamic mockups and visual website showcases.",
      id: "Kumpulan lebih dari 30 konsep website untuk klien dari berbagai industri yang disajikan melalui mockup dinamis dan showcase visual.",
    },
    thumbnail: "/images/client-websites/client-mockups.png",
    tags: ["Web Design", "Style Guide", "Mockup", "Client Work"],
  },
  {
    id: "kiloin",
    title: "Kiloin",
    category: "Digital Product",
    type: { en: "Mobile App · Product & Business Documentation", id: "Aplikasi Mobile · Dokumentasi Produk & Bisnis" },
    href: "/kiloin",
    description: {
      en: "A recycling service application that connects waste pickup through Ko-Put with recycled-product shopping through Ko-Mart, supported by wireframes, a class diagram, and a complete business plan.",
      id: "Aplikasi layanan daur ulang yang menghubungkan penjemputan sampah melalui Ko-Put dengan pembelian produk daur ulang melalui Ko-Mart, didukung wireframe, class diagram, dan business plan.",
    },
    thumbnail: "/images/kiloin/Thumbnail.png",
    tags: ["Mobile App", "Recycling", "Class Diagram", "Business Plan"],
  },
  {
    id: "amr-farms",
    title: "AMR Farms",
    category: "Digital Product",
    type: { en: "Mobile Grocery App + Admin Dashboard", id: "Aplikasi Grocery Mobile + Dashboard Admin" },
    href: "/amr-farms",
    description: {
      en: "A grocery-commerce concept featuring mobile shopping wireframes and an administrative dashboard for product categories, income data, and business reporting.",
      id: "Konsep grocery commerce yang mencakup wireframe belanja mobile dan dashboard administrasi untuk kategori produk, data pendapatan, serta laporan bisnis.",
    },
    thumbnail: "/images/amr-farms/amr-farms-hero.png",
    tags: [
      "Mobile App",
      "Admin Dashboard",
      "Grocery Commerce",
      "Wireframe",
    ],
  },
  ];

  // project Graphics Designer tetap lanjut di bawah sini

export function Works() {
  const [activeFilter, setActiveFilter] =
    useState<ProjectCategory>("Digital Product");

  const { isDark } = useTheme();
  const { copy } = useLanguage();

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
        className="homepage-ambient pointer-events-none absolute -left-52 top-[15%] h-[34rem] w-[34rem] rounded-full bg-fuchsia-500/[0.07] blur-[150px]"
      />

      <div
        aria-hidden="true"
        className="homepage-ambient pointer-events-none absolute -right-52 bottom-[10%] h-[36rem] w-[36rem] rounded-full bg-pink-500/[0.07] blur-[160px]"
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
              {copy({ en: "Selected Projects", id: "Proyek Pilihan" })}
            </span>

            <span className="h-px flex-1 bg-gradient-to-r from-pink-400/70 to-transparent" />
          </div>

          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <h2 className="text-5xl leading-[0.95] tracking-[-0.045em] text-text-primary sm:text-6xl md:text-7xl">
                {copy({ en: "Ideas shaped into", id: "Ide yang diwujudkan menjadi" })}
                <br />
                <span
                  className={`font-display italic ${
                    isDark ? "text-pink-200" : "text-pink-600"
                  }`}
                >
                  {copy({ en: "meaningful work.", id: "karya bermakna." })}
                </span>
              </h2>
            </div>

            <div className="md:col-span-4">
              <p className="max-w-md text-sm leading-7 text-text-secondary md:text-base">
                {copy({
                  en: "A multidisciplinary collection of interface design, web development, branding, editorial, and visual communication projects.",
                  id: "Kumpulan proyek multidisiplin yang mencakup desain antarmuka, pengembangan web, branding, editorial, dan komunikasi visual.",
                })}
              </p>

              <div className="mt-5 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted">
                <Sparkles
                  className={`h-4 w-4 ${
                    isDark ? "text-pink-300" : "text-pink-600"
                  }`}
                />
                {filteredProjects.length} {copy({ en: "projects displayed", id: "proyek ditampilkan" })}
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
              const isActive = activeFilter === filter.value;

              return (
                <button
                  key={filter.value}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveFilter(filter.value)}
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

                  <span className="relative z-10">{copy(filter.label)}</span>
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
  const { copy } = useLanguage();

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
          {copy({ en: project.category, id: "Produk Digital" })}
        </div>

        <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
          <p className="text-xs text-white/70">{copy(project.type)}</p>

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
            {copy(project.description)}
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
        aria-label={copy({ en: `Open ${project.title} case study`, id: `Buka studi kasus ${project.title}` })}
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