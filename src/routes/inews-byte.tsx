import { createFileRoute } from "@tanstack/react-router";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useTheme } from "@/components/theme/ThemeProvider";

import {
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
  Bookmark,
  Check,
  Code2,
  Database,
  FileText,
  Heart,
  MessageCircle,
  MonitorPlay,
  Play,
  Search,
  Server,
  Share2,
  Sparkles,
  Upload,
  UserRound,
  Video,
  Youtube,
} from "lucide-react";
import { useRef } from "react";
import type { ReactNode } from "react";

export const Route = createFileRoute("/inews-byte")({
  component: INewsByteCaseStudy,
});

const NAV_ITEMS = [
  { number: "00", label: "Overview", href: "#overview" },
  { number: "01", label: "Challenge", href: "#challenge" },
  { number: "02", label: "Agile Process", href: "#agile" },
  { number: "03", label: "System Design", href: "#design" },
  { number: "04", label: "Development", href: "#development" },
  { number: "05", label: "Testing", href: "#testing" },
  { number: "06", label: "Summary", href: "#summary" },
];

const TECH_STACK = [
  { label: "HTML", icon: Code2 },
  { label: "CSS", icon: Code2 },
  { label: "JavaScript", icon: Code2 },
  { label: "PHP", icon: Server },
  { label: "CodeIgniter 4", icon: Server },
  { label: "MySQL", icon: Database },
  { label: "YouTube", icon: Youtube },
];

const AGILE_STEPS = [
  {
    number: "01",
    title: "Planning",
    text: "Observed declining page views, studied short-video consumption, interviewed internal product, UI/UX, and IT teams, then translated the findings into functional and non-functional requirements.",
  },
  {
    number: "02",
    title: "Design",
    text: "Created the user interface, content workflow, system structure, and use-case diagram for two main actors: administrator and public user.",
  },
  {
    number: "03",
    title: "Development",
    text: "Implemented the platform through six iterative development cycles, completing high-priority core features before interaction and profile features.",
  },
  {
    number: "04",
    title: "Testing",
    text: "Validated system functions through black-box testing and evaluated user experience with the USE Questionnaire involving 20 respondents.",
  },
];

const USER_FEATURES = [
  "Login and account registration",
  "Browse and search short news videos",
  "Open complete video details",
  "Like, comment, save, and share",
  "View bookmarked-video dashboard",
  "Edit profile and securely log out",
];

const ADMIN_FEATURES = [
  "Secure administrator authentication",
  "View, search, and filter video content",
  "Add videos through YouTube integration",
  "Edit and remove published videos",
  "Review complete video details",
  "Moderate inappropriate comments",
];

const ITERATIONS = [
  {
    number: "01",
    title: "Authentication foundation",
    features: "Admin and public login, registration, logout.",
  },
  {
    number: "02",
    title: "Video management",
    features: "Admin list, add, edit, detail, and delete video.",
  },
  {
    number: "03",
    title: "Public video discovery",
    features: "Video grid, search, filter, and detail page.",
  },
  {
    number: "04",
    title: "Audience interaction",
    features: "Like, share, comments, and comment moderation.",
  },
  {
    number: "05",
    title: "Personal content",
    features: "Save video and bookmarked-video dashboard.",
  },
  {
    number: "06",
    title: "User account refinement",
    features: "Profile editing and final integration review.",
  },
];

const FEATURE_GALLERY = [
  {
    src: "/images/inews-byte/features/login-admin.png",
    alt: "iNews Byte administrator login page",
    label: "Admin Login",
  },
  {
    src: "/images/inews-byte/features/video-admin.png",
    alt: "iNews Byte administrator video list",
    label: "Admin Video List",
  },
  {
    src: "/images/inews-byte/features/add-video.png",
    alt: "iNews Byte add video form",
    label: "Add Video",
  },
  {
    src: "/images/inews-byte/features/home-user.png",
    alt: "iNews Byte public video page",
    label: "Public Video Grid",
  },
  {
    src: "/images/inews-byte/features/detail-video.png",
    alt: "iNews Byte video detail page",
    label: "Video Detail",
  },
  {
    src: "/images/inews-byte/features/comments.png",
    alt: "iNews Byte comments feature",
    label: "Comments",
  },
  {
    src: "/images/inews-byte/features/saved-video.png",
    alt: "iNews Byte bookmarked video dashboard",
    label: "Saved Videos",
  },
  {
    src: "/images/inews-byte/features/edit-profile.png",
    alt: "iNews Byte edit profile page",
    label: "Edit Profile",
  },
];

function INewsByteCaseStudy() {
  const pageRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { isDark } = useTheme();

  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end end"],
  });

  const progressScale = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.25,
  });

  const heroY = useTransform(scrollYProgress, [0, 0.18], [0, -120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.14], [1, 0.2]);

  return (
    <div
      ref={pageRef}
      className="relative overflow-clip bg-bg text-text-primary"
    >
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progressScale }}
        className="fixed inset-x-0 top-0 z-[100] h-[2px] origin-left bg-gradient-to-r from-red-600 via-rose-500 to-orange-400"
      />

      <header className="fixed inset-x-0 top-0 z-[80] px-4 pt-4 md:px-7 md:pt-6">
        <div
          className={`mx-auto flex max-w-[1440px] items-center justify-between rounded-full border border-stroke bg-surface/85 px-3 py-2 backdrop-blur-xl md:px-4 ${
            isDark
              ? "shadow-[0_16px_58px_rgba(0,0,0,0.56),inset_0_1px_0_rgba(255,255,255,0.07)]"
              : "shadow-[0_16px_50px_rgba(65,40,53,0.14),inset_0_1px_0_rgba(255,255,255,0.9)]"
          }`}
        >
          <a
            href="/#work"
            className="group inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs text-muted transition hover:bg-surface-elevated hover:text-text-primary"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to projects
          </a>

          <span className="hidden text-[9px] uppercase tracking-[0.3em] text-muted sm:block">
            iNews Byte · Web Development Case Study
          </span>

          <ThemeToggle />
        </div>
      </header>

      <section className="relative min-h-[100svh] overflow-hidden bg-[#050505]">
        <motion.div
          style={
            prefersReducedMotion
              ? undefined
              : { y: heroY, opacity: heroOpacity }
          }
          className="absolute inset-0"
        >
          <img
            src="/images/inews-byte/hero/inews-byte-hero.png"
            alt="iNews Byte platform interface"
            className="h-full w-full object-cover object-center"
          />
        </motion.div>

        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(220,38,38,0.25),transparent_32%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/90" />

        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1440px] items-end px-6 pb-20 pt-32 md:px-10 md:pb-24 lg:px-16">
          <motion.div
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 34, scale: 0.98 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-6xl"
          >
            <p className="text-[10px] uppercase tracking-[0.38em] text-red-300 md:text-xs">
              Final Project · Web Developer
            </p>

            <h1 className="mt-6 max-w-6xl text-[clamp(4rem,10vw,9rem)] leading-[0.84] tracking-[-0.075em] text-white">
              iNews
              <span className="font-display italic text-red-400"> Byte.</span>
            </h1>

            <p className="mt-7 max-w-4xl text-lg leading-8 text-white/72 md:text-2xl md:leading-10">
              Development of a short-form video news channel for the iNews
              portal using Agile Development.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              {[
                "CodeIgniter 4",
                "PHP",
                "MySQL",
                "Agile",
                "USE Questionnaire",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-xs text-white/65 backdrop-blur-md"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        <a
          href="#overview"
          aria-label="Scroll to iNews Byte overview"
          className="absolute bottom-8 right-8 z-20 hidden items-center gap-3 text-xs uppercase tracking-[0.24em] text-white/50 transition hover:text-red-300 md:flex"
        >
          Explore project
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/30">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </a>
      </section>

      <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="hidden border-r border-stroke px-6 lg:block">
          <div className="sticky top-32 py-24">
            <p className="text-[9px] uppercase tracking-[0.32em] text-muted">
              Project Journey
            </p>

            <nav className="mt-7 space-y-2">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs text-muted transition hover:bg-red-500/10 hover:text-text-primary"
                >
                  <span className="font-display italic text-red-500/75">
                    {item.number}
                  </span>
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        <main className="min-w-0 px-5 md:px-9 lg:px-12 xl:px-16">
          <section
            id="overview"
            className="scroll-mt-32 py-24 md:py-36"
          >
            <div className="grid gap-12 xl:grid-cols-[0.82fr_1.18fr] xl:items-start">
              <Reveal>
                <SectionHeading
                  number="00"
                  eyebrow="Project Overview"
                  title="Turning verified journalism into a short-video experience."
                  description="iNews Byte was created in response to changing news-consumption behavior among Generation Z and Millennials, who increasingly prefer concise video content over long-form portal articles."
                />

                <div className="mt-9 grid gap-4 sm:grid-cols-2">
                  <StatCard value="6" label="Agile iterations" />
                  <StatCard value="20" label="Usability respondents" />
                  <StatCard value="2" label="Primary user roles" />
                  <StatCard value="95%+" label="High usability outcome" />
                </div>
              </Reveal>

              <Reveal delay={0.12}>
                <div className="overflow-hidden rounded-[2rem] border border-stroke bg-surface shadow-[0_28px_85px_rgba(0,0,0,0.24)]">
                  <div className="border-b border-stroke px-5 py-4">
                    <p className="text-[9px] uppercase tracking-[0.28em] text-red-500">
                      Project abstract
                    </p>
                  </div>

                  <div className="p-6 md:p-8">
                    <p className="text-lg leading-8 text-text-secondary md:text-xl md:leading-9">
                      The project developed a short-form news video feature to
                      increase engagement and help iNews adapt to new digital
                      consumption habits. The platform includes video upload,
                      YouTube integration, likes, comments, bookmarks, and
                      sharing.
                    </p>

                    <div className="mt-8 grid gap-3 sm:grid-cols-2">
                      <InfoItem label="Project Type" value="Final Project" />
                      <InfoItem label="Company" value="iNews Media Group" />
                      <InfoItem label="Method" value="Agile Development" />
                      <InfoItem label="Platform" value="Desktop Web" />
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          <section
            id="challenge"
            className="scroll-mt-32 border-t border-stroke py-24 md:py-36"
          >
            <div className="grid gap-12 xl:grid-cols-[0.78fr_1.22fr] xl:items-center">
              <Reveal>
                <SectionHeading
                  number="01"
                  eyebrow="The Challenge"
                  title="News habits changed faster than traditional portal experiences."
                  description="iNews faced the challenge of maintaining audience attention while younger users increasingly consumed concise, visual, and interactive information through short-video platforms."
                />

                <div className="mt-9 rounded-[1.6rem] border border-red-400/20 bg-red-500/[0.06] p-6">
                  <p className="text-sm leading-7 text-text-secondary">
                    The solution needed to remain credible and editorially
                    verified while adopting the speed, visual rhythm, and
                    interaction patterns expected by digital-native audiences.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.12}>
                <div className="grid gap-4 md:grid-cols-3">
                  {[
                    {
                      icon: BarChart3,
                      title: "Declining attention",
                      text: "Portal page views showed a downward tendency across several observed periods.",
                    },
                    {
                      icon: Video,
                      title: "Short-video shift",
                      text: "Gen Z and Millennials increasingly preferred concise video content.",
                    },
                    {
                      icon: Check,
                      title: "Credibility gap",
                      text: "The product needed to offer speed without sacrificing editorial verification.",
                    },
                  ].map((item, index) => {
                    const Icon = item.icon;

                    return (
                      <article
                        key={item.title}
                        className="flex min-h-[260px] flex-col rounded-[1.6rem] border border-stroke bg-surface p-6 transition duration-300 hover:-translate-y-1 hover:border-red-400/35"
                      >
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-red-400/25 bg-red-500/10 text-red-500">
                          <Icon className="h-5 w-5" />
                        </div>

                        <h3 className="mt-8 text-lg font-medium text-text-primary">
                          {item.title}
                        </h3>

                        <p className="mt-4 text-sm leading-7 text-muted">
                          {item.text}
                        </p>

                        <span className="mt-auto box-content pt-8 font-display text-xl italic text-red-500/65">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </article>
                    );
                  })}
                </div>
              </Reveal>
            </div>
          </section>

          <section
            id="agile"
            className="scroll-mt-32 border-t border-stroke py-24 md:py-36"
          >
            <Reveal>
              <div className="grid gap-10 xl:grid-cols-[0.75fr_1.25fr] xl:items-end">
                <SectionHeading
                  number="02"
                  eyebrow="Agile Process"
                  title="Built through short, testable, and continuously reviewed cycles."
                  description="Agile Development allowed the product to respond to changing requirements while keeping each feature small enough to evaluate before moving to the next iteration."
                />

                <div className="overflow-hidden rounded-[2rem] border border-stroke bg-surface p-3">
                  <img
                    src="/images/inews-byte/process/agile-development.png"
                    alt="Agile Development process used in iNews Byte"
                    className="aspect-[16/8] w-full rounded-[1.4rem] object-contain"
                  />
                </div>
              </div>
            </Reveal>

            <div className="mt-12 grid gap-4 md:grid-cols-2">
              {AGILE_STEPS.map((item, index) => (
                <Reveal key={item.number} delay={index * 0.07}>
                  <article className="h-full rounded-[1.7rem] border border-stroke bg-surface p-6 md:p-7">
                    <span className="font-display text-2xl italic text-red-500">
                      {item.number}
                    </span>
                    <h3 className="mt-7 text-2xl tracking-[-0.03em] text-text-primary">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-muted">
                      {item.text}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </section>

          <section
            id="design"
            className="scroll-mt-32 border-t border-stroke py-24 md:py-36"
          >
            <Reveal>
              <SectionHeading
                number="03"
                eyebrow="System Design"
                title="One platform connecting editorial management and public interaction."
                description="The system was designed around two main user roles. Administrators manage verified short-video news, while public users discover and interact with published content."
              />
            </Reveal>

            <div className="mt-12 grid gap-5 xl:grid-cols-2">
              <RoleCard
                title="Administrator"
                description="Manages authentication, video content, search, filters, YouTube embeds, updates, deletion, and comment moderation."
                items={ADMIN_FEATURES}
                icon={Upload}
              />

              <RoleCard
                title="Public User"
                description="Discovers short news videos and interacts through likes, comments, bookmarks, sharing, and profile management."
                items={USER_FEATURES}
                icon={UserRound}
              />
            </div>

            <div className="mt-16 grid gap-5 xl:grid-cols-2">
              <VisualCard
                eyebrow="Interface Design"
                title="Homepage and video-discovery grid"
                description="The homepage combines familiar iNews navigation, advertising placements, an introduction to iNews Byte, and a card-based video grid."
                image="/images/inews-byte/design/homepage-design.png"
              />

              <VisualCard
                eyebrow="Interaction Design"
                title="Complete video-detail experience"
                description="The detail view combines video playback, publishing information, description, likes, comments, bookmarks, and sharing."
                image="/images/inews-byte/design/video-detail-design.png"
              />
            </div>

            <div className="mt-5 grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
              <VisualCard
                eyebrow="Editorial Workflow"
                title="From newsroom planning to public engagement"
                description="The workflow maps the complete process from topic selection and script approval to production, YouTube upload, platform publication, and user interaction."
                image="/images/inews-byte/design/workflow.png"
              />

              <VisualCard
                eyebrow="Use Case Diagram"
                title="Two roles, clearly separated responsibilities"
                description="The use-case diagram documents administrator content management and public-user interaction within one platform."
                image="/images/inews-byte/design/use-case.png"
              />
            </div>
          </section>

          <section
            id="development"
            className="scroll-mt-32 border-t border-stroke py-24 md:py-36"
          >
            <div className="grid gap-12 xl:grid-cols-[0.72fr_1.28fr] xl:items-start">
              <Reveal>
                <SectionHeading
                  number="04"
                  eyebrow="Development"
                  title="Six iterations turned the system from foundation into a complete experience."
                  description="Feature priorities were translated into six development cycles, allowing critical content-management capabilities to be implemented before secondary engagement features."
                />

                <div className="mt-9 flex flex-wrap gap-2">
                  {TECH_STACK.map((item) => {
                    const Icon = item.icon;

                    return (
                      <span
                        key={item.label}
                        className="inline-flex items-center gap-2 rounded-full border border-stroke bg-surface-elevated px-3.5 py-2 text-xs text-muted"
                      >
                        <Icon className="h-3.5 w-3.5 text-red-500" />
                        {item.label}
                      </span>
                    );
                  })}
                </div>
              </Reveal>

              <div className="grid gap-4 sm:grid-cols-2">
                {ITERATIONS.map((item, index) => (
                  <Reveal key={item.number} delay={index * 0.06}>
                    <article className="h-full rounded-[1.5rem] border border-stroke bg-surface p-6">
                      <span className="font-display text-xl italic text-red-500">
                        {item.number}
                      </span>
                      <h3 className="mt-5 text-lg font-medium text-text-primary">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-muted">
                        {item.features}
                      </p>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>

            <Reveal delay={0.12}>
              <div className="mt-16">
                <div className="mb-6 flex items-end justify-between gap-5">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.3em] text-red-500">
                      Implemented screens
                    </p>
                    <h3 className="mt-3 text-3xl tracking-[-0.04em] text-text-primary">
                      Core administrator and public-user features.
                    </h3>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {FEATURE_GALLERY.map((item, index) => (
                    <article
                      key={item.src}
                      className="group overflow-hidden rounded-[1.4rem] border border-stroke bg-surface"
                    >
                      <div className="aspect-[4/3] overflow-hidden bg-black/5">
                        <img
                          src={item.src}
                          alt={item.alt}
                          className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-[1.04]"
                        />
                      </div>
                      <div className="border-t border-stroke px-4 py-3">
                        <p className="text-xs text-text-secondary">
                          {item.label}
                        </p>
                        <span className="mt-1 block font-display text-sm italic text-red-500/65">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </Reveal>
          </section>

          <section
            id="testing"
            className="scroll-mt-32 border-t border-stroke py-24 md:py-36"
          >
            <Reveal>
              <SectionHeading
                number="05"
                eyebrow="Testing & Results"
                title="Functional reliability supported by strong usability results."
                description="Black-box testing verified the platform’s main functions, while the USE Questionnaire measured usefulness, ease of use, and satisfaction across 20 respondents."
              />
            </Reveal>

            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              <UsabilityCard
                value="93.33%"
                label="Usefulness"
                description="Users considered the platform highly beneficial for accessing short, verified news content."
              />
              <UsabilityCard
                value="96.33%"
                label="Ease of Use"
                description="The highest score showed that respondents found the system clear and easy to operate."
              />
              <UsabilityCard
                value="96.00%"
                label="Satisfaction"
                description="Users reported a highly satisfying and comfortable interaction experience."
              />
            </div>

            <div className="mt-5 grid gap-5 xl:grid-cols-[1.18fr_0.82fr]">
              <div className="overflow-hidden rounded-[2rem] border border-stroke bg-surface p-4 md:p-6">
                <img
                  src="/images/inews-byte/testing/usability-chart.png"
                  alt="iNews Byte usability results chart"
                  className="aspect-[16/9] w-full rounded-[1.4rem] object-contain"
                />
              </div>

              <div className="rounded-[2rem] border border-red-400/20 bg-red-500/[0.055] p-7 md:p-8">
                <BarChart3 className="h-6 w-6 text-red-500" />
                <p className="mt-8 text-[9px] uppercase tracking-[0.3em] text-red-500">
                  Evaluation outcome
                </p>
                <h3 className="mt-4 text-3xl leading-tight tracking-[-0.04em] text-text-primary">
                  The system was effective, easy to use, and highly satisfying.
                </h3>
                <p className="mt-5 text-sm leading-7 text-muted">
                  All three parameters reached the very-high category. Ease of
                  Use recorded the strongest result, followed closely by
                  Satisfaction, while Usefulness remained above 93%.
                </p>
              </div>
            </div>
          </section>

          <section
            id="summary"
            className="scroll-mt-32 border-t border-stroke py-24 md:py-36"
          >
            <div className="relative overflow-hidden rounded-[2.6rem] border border-red-400/20 bg-surface px-6 py-16 text-center md:px-10 md:py-24">
              <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[680px] -translate-x-1/2 rounded-full bg-red-500/12 blur-[120px]" />

              <div className="relative">
                <Sparkles className="mx-auto h-7 w-7 text-red-500" />

                <p className="mt-7 text-[9px] uppercase tracking-[0.34em] text-muted">
                  06 · Project Summary
                </p>

                <h2 className="mx-auto mt-5 max-w-5xl text-4xl leading-[1.04] tracking-[-0.05em] text-text-primary md:text-6xl">
                  Bringing verified news into the short-video behavior of a new
                  digital audience.
                </h2>

                <p className="mx-auto mt-7 max-w-3xl text-sm leading-7 text-muted md:text-base md:leading-8">
                  iNews Byte combines newsroom credibility, short-form video,
                  structured content management, and social interaction in one
                  web experience developed through Agile iteration and validated
                  through functional and usability testing.
                </p>

                <div className="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-3">
                  {[
                    {
                      icon: MonitorPlay,
                      title: "Short-video news",
                      text: "A familiar visual format adapted for verified journalism.",
                    },
                    {
                      icon: Youtube,
                      title: "Editorial integration",
                      text: "YouTube video embeds connected with administrator publishing.",
                    },
                    {
                      icon: Heart,
                      title: "Audience engagement",
                      text: "Likes, comments, saves, and sharing support interaction.",
                    },
                  ].map((item) => {
                    const Icon = item.icon;

                    return (
                      <article
                        key={item.title}
                        className="rounded-[1.4rem] border border-stroke bg-surface-elevated p-5 text-left"
                      >
                        <Icon className="h-5 w-5 text-red-500" />
                        <h3 className="mt-6 text-base font-medium text-text-primary">
                          {item.title}
                        </h3>
                        <p className="mt-3 text-xs leading-6 text-muted">
                          {item.text}
                        </p>
                      </article>
                    );
                  })}
                </div>

                <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <a
                    href="https://drive.google.com/file/d/1NnSm8Gjz9gVCm2vM-jVK0bOr7ZrGKTT0/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 rounded-full border border-red-400/30 bg-red-500 px-6 py-3.5 text-sm text-white shadow-[0_0_28px_rgba(239,68,68,0.28)] transition hover:-translate-y-1 hover:bg-red-400"
                  >
                    <FileText className="h-4 w-4" />
                    Open final report
                    <ArrowUpRight className="h-4 w-4" />
                  </a>

                  <a
                    href="/#work"
                    className="group inline-flex items-center gap-3 rounded-full border border-stroke bg-surface-elevated px-6 py-3.5 text-sm text-text-secondary transition hover:-translate-y-1 hover:border-red-400/40 hover:text-text-primary"
                  >
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    Back to projects
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>
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
        <span className="font-display text-xl italic text-red-500">
          {number}
        </span>
        <span className="h-px w-8 bg-red-500/55" />
        <p className="text-[9px] uppercase tracking-[0.3em] text-muted">
          {eyebrow}
        </p>
      </div>

      <h2 className="mt-7 max-w-4xl text-4xl leading-[1.02] tracking-[-0.05em] text-text-primary md:text-6xl">
        {title}
      </h2>

      <p className="mt-6 max-w-2xl text-sm leading-7 text-muted md:text-base md:leading-8">
        {description}
      </p>
    </div>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <article className="rounded-[1.4rem] border border-stroke bg-surface p-5">
      <p className="text-3xl tracking-[-0.04em] text-text-primary">
        {value}
      </p>
      <p className="mt-2 text-xs text-muted">{label}</p>
    </article>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.1rem] border border-stroke bg-surface-elevated p-4">
      <p className="text-[9px] uppercase tracking-[0.23em] text-muted">
        {label}
      </p>
      <p className="mt-2 text-sm text-text-primary">{value}</p>
    </div>
  );
}

function RoleCard({
  title,
  description,
  items,
  icon: Icon,
}: {
  title: string;
  description: string;
  items: string[];
  icon: typeof Upload;
}) {
  return (
    <Reveal>
      <article className="h-full rounded-[2rem] border border-stroke bg-surface p-6 md:p-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-red-400/25 bg-red-500/10 text-red-500">
          <Icon className="h-5 w-5" />
        </div>

        <h3 className="mt-8 text-3xl tracking-[-0.04em] text-text-primary">
          {title}
        </h3>

        <p className="mt-4 text-sm leading-7 text-muted">{description}</p>

        <div className="mt-7 space-y-3">
          {items.map((item) => (
            <div
              key={item}
              className="flex items-start gap-3 rounded-xl border border-stroke bg-surface-elevated px-4 py-3"
            >
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
              <span className="text-sm leading-6 text-text-secondary">
                {item}
              </span>
            </div>
          ))}
        </div>
      </article>
    </Reveal>
  );
}

function VisualCard({
  eyebrow,
  title,
  description,
  image,
}: {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
}) {
  return (
    <Reveal>
      <article className="h-full overflow-hidden rounded-[2rem] border border-stroke bg-surface">
        <div className="aspect-[16/10] overflow-hidden bg-black/5 p-3">
          <img
            src={image}
            alt={title}
            className="h-full w-full rounded-[1.4rem] object-contain"
          />
        </div>

        <div className="border-t border-stroke p-6 md:p-7">
          <p className="text-[9px] uppercase tracking-[0.28em] text-red-500">
            {eyebrow}
          </p>
          <h3 className="mt-4 text-2xl tracking-[-0.03em] text-text-primary">
            {title}
          </h3>
          <p className="mt-4 text-sm leading-7 text-muted">{description}</p>
        </div>
      </article>
    </Reveal>
  );
}

function UsabilityCard({
  value,
  label,
  description,
}: {
  value: string;
  label: string;
  description: string;
}) {
  return (
    <Reveal>
      <article className="h-full rounded-[1.7rem] border border-stroke bg-surface p-6 md:p-7">
        <p className="text-4xl tracking-[-0.05em] text-red-500 md:text-5xl">
          {value}
        </p>
        <h3 className="mt-6 text-xl text-text-primary">{label}</h3>
        <p className="mt-4 text-sm leading-7 text-muted">{description}</p>
      </article>
    </Reveal>
  );
}

function Reveal({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
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
      viewport={{ once: true, amount: 0.16 }}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}