import { createFileRoute } from "@tanstack/react-router";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

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
  BarChart3,
  CalendarDays,
  Check,
  Code2,
  Database,
  FileCheck2,
  FileText,
  ImageIcon,
  KeyRound,
  LayoutDashboard,
  Link2,
  LockKeyhole,
  Maximize2,
  PanelsTopLeft,
  Search,
  ShieldCheck,
  Sparkles,
  TestTube2,
  UploadCloud,
  UserRound,
  Workflow,
  X,
} from "lucide-react";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export const Route = createFileRoute("/lamarin")({
  component: LamarinCaseStudy,
});

const HERO_VIDEO_URL = "/videos/lamarin/lamarin-hero.mp4";
const HERO_POSTER_URL = "/images/lamarin/lamarin-hero-poster.jpg";
const LIVE_PRODUCT_URL = "https://lamarinidn.vercel.app";
const DEMO_URL = "https://lamarinidn.vercel.app/demo";

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "challenge", label: "Challenge" },
  { id: "strategy", label: "Strategy" },
  { id: "features", label: "Features" },
  { id: "engineering", label: "Engineering" },
  { id: "quality", label: "QA & Release" },
  { id: "reflection", label: "Reflection" },
] as const;

type ProductScreen = {
  src: string;
  alt: string;
  label: string;
  url: string;
};

type ProductFeature = {
  number: string;
  category: string;
  title: string;
  question: string;
  description: string;
  points: string[];
  screen: ProductScreen;
  icon: LucideIcon;
};

const PRODUCT_SCREENS = {
  dashboard: {
    src: "/images/lamarin/screens/dashboard.png",
    alt: "LAMARIN dashboard overview inside a desktop browser",
    label: "Dashboard overview",
    url: "lamarinidn.vercel.app/dashboard",
  },
  capture: {
    src: "/images/lamarin/screens/application-capture.png",
    alt: "LAMARIN add application and job-link import flow inside a desktop browser",
    label: "Application capture",
    url: "lamarinidn.vercel.app/applications/new",
  },
  detail: {
    src: "/images/lamarin/screens/application-detail.png",
    alt: "LAMARIN application detail drawer inside a desktop browser",
    label: "Application detail",
    url: "lamarinidn.vercel.app/applications/detail",
  },
  board: {
    src: "/images/lamarin/screens/board.png",
    alt: "LAMARIN Kanban application board inside a desktop browser",
    label: "Kanban application board",
    url: "lamarinidn.vercel.app/board",
  },
  calendar: {
    src: "/images/lamarin/screens/calendar.png",
    alt: "LAMARIN recruitment calendar inside a desktop browser",
    label: "Recruitment calendar",
    url: "lamarinidn.vercel.app/calendar",
  },
  reminder: {
    src: "/images/lamarin/screens/reminder.png",
    alt: "LAMARIN create reminder workflow inside a desktop browser",
    label: "Create reminder",
    url: "lamarinidn.vercel.app/calendar/reminder",
  },
  insights: {
    src: "/images/lamarin/screens/insights.png",
    alt: "LAMARIN personal job-search insights inside a desktop browser",
    label: "Personal insights",
    url: "lamarinidn.vercel.app/insights",
  },
  documents: {
    src: "/images/lamarin/screens/documents.png",
    alt: "LAMARIN CV and cover-letter management inside a desktop browser",
    label: "Private document management",
    url: "lamarinidn.vercel.app/applications/documents",
  },
  authentication: {
    src: "/images/lamarin/screens/login.png",
    alt: "LAMARIN authentication page inside a desktop browser",
    label: "Account access",
    url: "lamarinidn.vercel.app/login",
  },
  demo: {
    src: "/images/lamarin/screens/demo-mode.png",
    alt: "LAMARIN temporary demo workspace inside a desktop browser",
    label: "Temporary demo workspace",
    url: "lamarinidn.vercel.app/demo",
  },
  light: {
    src: "/images/lamarin/screens/theme-light.png",
    alt: "LAMARIN light theme inside a desktop browser",
    label: "Light appearance",
    url: "lamarinidn.vercel.app/dashboard?theme=light",
  },
  dark: {
    src: "/images/lamarin/screens/theme-dark.png",
    alt: "LAMARIN dark theme inside a desktop browser",
    label: "Dark appearance",
    url: "lamarinidn.vercel.app/dashboard?theme=dark",
  },
  responsive: {
    src: "/images/lamarin/screens/responsive.png",
    alt: "LAMARIN responsive web layout inside a narrow desktop browser",
    label: "Responsive website",
    url: "lamarinidn.vercel.app/dashboard",
  },
} satisfies Record<string, ProductScreen>;

const PRODUCT_FEATURES: ProductFeature[] = [
  {
    number: "01",
    category: "Overview and priority",
    title: "Dashboard",
    question: "What needs attention today?",
    description:
      "The dashboard is the user’s starting point. It summarizes the current application pipeline, recruitment performance, recent activity, and upcoming actions so the user can decide what to do next without reopening every record.",
    points: [
      "Total applications and current pipeline distribution",
      "Interview and offer progression",
      "Application activity and recent movement",
      "Upcoming interviews, follow-ups, and priorities",
    ],
    screen: PRODUCT_SCREENS.dashboard,
    icon: LayoutDashboard,
  },
  {
    number: "02",
    category: "Fast data capture",
    title: "Import or add an application",
    question: "How can a vacancy become a structured record quickly?",
    description:
      "Users can begin with the original vacancy link or enter an application manually. Available information can be captured first, while incomplete fields remain editable instead of blocking the workflow.",
    points: [
      "Job-link import for available vacancy information",
      "Manual entry when no link is available",
      "Position, company, location, source, salary, and notes",
      "Status, next action, reminder, CV, and cover letter",
    ],
    screen: PRODUCT_SCREENS.capture,
    icon: Link2,
  },
  {
    number: "03",
    category: "Single source of truth",
    title: "Application detail and editing",
    question: "Where does the complete recruitment context live?",
    description:
      "Each application keeps the vacancy data, original source, personal notes, salary range, recruitment status, reminders, and supporting documents in one detailed view. Editing updates the same record used across Dashboard, Board, Calendar, and Insights.",
    points: [
      "Complete position and company information",
      "Original vacancy link and source",
      "Personal notes and recruitment context",
      "Next action, reminder, and supporting files",
    ],
    screen: PRODUCT_SCREENS.detail,
    icon: FileCheck2,
  },
  {
    number: "04",
    category: "Visual pipeline management",
    title: "Kanban Board",
    question: "Where is every application in the recruitment process?",
    description:
      "The Board turns application status into a visual workflow. Users can scan the entire pipeline, search within the board, open details in context, and move cards between stages while preserving the underlying record.",
    points: [
      "Saved, Applied, Interview, Offer, and Closed stages",
      "Drag-and-drop status updates",
      "Search within the board context",
      "Application detail without leaving the workspace",
    ],
    screen: PRODUCT_SCREENS.board,
    icon: PanelsTopLeft,
  },
  {
    number: "05",
    category: "Time-based planning",
    title: "Calendar",
    question: "What happens next, and when?",
    description:
      "The Calendar translates next actions into a readable schedule. Interviews, tests, deadlines, and recruiter follow-ups remain connected to the related application instead of becoming isolated calendar entries.",
    points: [
      "Daily, weekly, and monthly views",
      "Application-linked recruitment events",
      "Readable company, title, date, and time context",
      "Stable visual identity for each application",
    ],
    screen: PRODUCT_SCREENS.calendar,
    icon: CalendarDays,
  },
  {
    number: "06",
    category: "Action management",
    title: "Reminder creation",
    question: "How does a record become a concrete next step?",
    description:
      "A reminder can be created from the calendar or application context by selecting the related application, naming the action, and defining its date and time. The result is reflected throughout the workspace.",
    points: [
      "Reminder linked to an existing application",
      "Action title with date and time",
      "Upcoming-action visibility on Dashboard and Insights",
      "Overdue and missing-action attention states",
    ],
    screen: PRODUCT_SCREENS.reminder,
    icon: CalendarDays,
  },
  {
    number: "07",
    category: "Personal decision support",
    title: "Insights and analytics",
    question: "What is working, and what should change?",
    description:
      "Insights transforms application data into practical reflection. Users can review performance by period, understand pipeline health, compare opportunity sources, monitor weekly goals, and identify applications that need attention.",
    points: [
      "This week, This month, and All time filters",
      "Total, interview, offer, and response rates",
      "Recently added applications and weekly goal",
      "Pipeline, activity, source performance, upcoming actions, and needs attention",
    ],
    screen: PRODUCT_SCREENS.insights,
    icon: BarChart3,
  },
  {
    number: "08",
    category: "Private supporting files",
    title: "Document management",
    question: "How are CVs and cover letters kept with the right application?",
    description:
      "Users can upload, download, and replace the CV or cover letter associated with an application. Replacement is handled safely: the new file succeeds first, then the previous object is removed automatically.",
    points: [
      "CV and cover-letter upload",
      "Authorized download from private storage",
      "PDF, DOC, and DOCX support up to 5 MB",
      "Automatic old-file cleanup after successful replacement",
    ],
    screen: PRODUCT_SCREENS.documents,
    icon: UploadCloud,
  },
  {
    number: "09",
    category: "Personal workspace access",
    title: "Authentication and account protection",
    question: "How does each user reach only their own workspace?",
    description:
      "LAMARIN supports email credentials and Google OAuth, with protected application routes and password recovery. Authentication establishes the account identity used to scope records, storage folders, and document access.",
    points: [
      "Email registration and login",
      "Google OAuth authentication",
      "Forgot-password and reset-password flow",
      "Logout and protected personal routes",
    ],
    screen: PRODUCT_SCREENS.authentication,
    icon: KeyRound,
  },
  {
    number: "10",
    category: "Low-friction product exploration",
    title: "Demo mode",
    question: "How can visitors understand the product before creating an account?",
    description:
      "Demo mode exposes the core product experience with temporary sample data. It allows visitors and recruiters to explore the workflow without mixing demonstration records with a real user account.",
    points: [
      "Temporary demo data",
      "Immediate access to the product workflow",
      "Clear separation from persistent personal accounts",
      "Useful for product evaluation and portfolio review",
    ],
    screen: PRODUCT_SCREENS.demo,
    icon: UserRound,
  },
];

const ROLE_ROWS = [
  {
    role: "Product & Business Analysis",
    responsibility:
      "Defined the problem, user, MVP boundary, feature requirements, business rules, priorities, and acceptance conditions.",
  },
  {
    role: "UX & UI Design",
    responsibility:
      "Designed the information architecture, application flows, responsive interface, data hierarchy, states, and visual system.",
  },
  {
    role: "Frontend Engineering",
    responsibility:
      "Implemented the website interface, routing, forms, dashboard views, interactions, responsive behavior, and feedback states.",
  },
  {
    role: "Backend & Data",
    responsibility:
      "Implemented authentication, application logic, PostgreSQL data access, private storage, document handling, and ownership controls.",
  },
  {
    role: "QA & Release",
    responsibility:
      "Validated end-to-end workflows, production authentication, storage policies, persistence, responsive behavior, and deployment.",
  },
];

const PROCESS_STEPS = [
  {
    number: "01",
    label: "Discover",
    title: "Map the fragmented job-search workflow",
    text: "Reviewed how job seekers move between vacancy platforms, spreadsheets, email, calendars, notes, and document folders during one recruitment process.",
  },
  {
    number: "02",
    label: "Define",
    title: "Convert the problem into a focused product scope",
    text: "Prioritized application capture, pipeline tracking, planning, analytics, private documents, and account access while excluding recruiter tooling, automatic applications, and broad marketplace features.",
  },
  {
    number: "03",
    label: "Design",
    title: "Create one mental model across every view",
    text: "Designed Dashboard, Board, Calendar, and Insights as different perspectives of the same application record, supported by detail, reminder, document, and authentication flows.",
  },
  {
    number: "04",
    label: "Develop",
    title: "Connect interface, data, security, and file workflows",
    text: "Built the responsive product with Next.js, React, TypeScript, Supabase Auth, PostgreSQL, private Storage, protected routes, and Vercel deployment.",
  },
  {
    number: "05",
    label: "Validate",
    title: "Test the complete production journey",
    text: "Verified account access, application management, status persistence, reminders, document upload and replacement, ownership policies, and production behavior.",
  },
];

const ARCHITECTURE_LAYERS = [
  {
    icon: Code2,
    layer: "Presentation",
    title: "Next.js, React, and TypeScript",
    text: "Responsive website pages, server and client components, routes, forms, interface states, and interaction logic.",
  },
  {
    icon: Workflow,
    layer: "Application",
    title: "Business logic and route handling",
    text: "Application CRUD, status movement, reminder handling, authentication callbacks, validation, and document replacement workflow.",
  },
  {
    icon: Database,
    layer: "Data",
    title: "Supabase PostgreSQL",
    text: "Application records, ownership, constraints, queries, persistence, and Row Level Security policies.",
  },
  {
    icon: LockKeyhole,
    layer: "Files",
    title: "Private Supabase Storage",
    text: "User-scoped folders, owner-only policies, allowed file types, file-size restriction, and protected downloads.",
  },
  {
    icon: ShieldCheck,
    layer: "Delivery",
    title: "Protected production deployment",
    text: "Environment separation, OAuth callback configuration, protected routes, Vercel deployment, and production smoke testing.",
  },
];

const QA_ROWS = [
  {
    area: "Authentication",
    scope: "Email access, Google OAuth, protected routes, forgot password, and reset password",
    result: "Passed",
  },
  {
    area: "Application capture",
    scope: "Job-link import, manual entry, validation, document selection, and new record creation",
    result: "Passed",
  },
  {
    area: "Application management",
    scope: "Detail, editing, status updates, persistence, search, and cross-view consistency",
    result: "Passed",
  },
  {
    area: "Planning and analytics",
    scope: "Reminder creation, calendar display, upcoming actions, metrics, filters, and attention states",
    result: "Passed",
  },
  {
    area: "Document workflow",
    scope: "Upload, download, replacement, file validation, and automatic old-file deletion",
    result: "Passed",
  },
  {
    area: "Data privacy",
    scope: "Row Level Security, private bucket, authenticated policies, and account-scoped folders",
    result: "Passed",
  },
  {
    area: "Production release",
    scope: "Live deployment, authentication callback, responsive review, theme behavior, and smoke test",
    result: "Passed",
  },
];

function LamarinCaseStudy() {
  const prefersReducedMotion = useReducedMotion();
  const [activeSection, setActiveSection] = useState("overview");

  const { scrollYProgress } = useScroll();
  const progressScale = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.25,
  });

  useEffect(() => {
    const elements = SECTIONS.map(({ id }) => document.getElementById(id)).filter(
      (element): element is HTMLElement => Boolean(element),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const activeEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];

        if (activeEntry) setActiveSection(activeEntry.target.id);
      },
      {
        rootMargin: "-28% 0px -60% 0px",
        threshold: [0.05, 0.2, 0.5],
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative overflow-clip bg-bg text-text-primary">
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progressScale }}
        className="fixed inset-x-0 top-0 z-[100] h-[2px] origin-left bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400"
      />

      <Hero prefersReducedMotion={Boolean(prefersReducedMotion)} />

      <header className="sticky top-0 z-[80] border-b border-stroke bg-bg/84 px-4 py-3 backdrop-blur-xl md:px-7">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4">
          <a
            href="/#work"
            className="group inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs text-muted transition hover:bg-surface-elevated hover:text-text-primary"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to projects
          </a>

          <nav
            className="hidden items-center gap-1 xl:flex"
            aria-label="LAMARIN case-study sections"
          >
            {SECTIONS.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={`rounded-full px-3 py-2 text-[11px] transition ${
                  activeSection === section.id
                    ? "bg-indigo-500/10 text-indigo-500"
                    : "text-muted hover:bg-surface-elevated hover:text-text-primary"
                }`}
              >
                {section.label}
              </a>
            ))}
          </nav>

          <ThemeToggle />
        </div>
      </header>

      <main>
        <section
          id="overview"
          className="scroll-mt-28 px-6 py-24 md:px-10 md:py-32"
        >
          <div className="mx-auto max-w-[1180px]">
            <Reveal>
              <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
                <div>
                  <SectionMarker number="00" label="Project overview" />
                  <h2 className="mt-7 text-4xl leading-[1.03] tracking-[-0.05em] text-text-primary md:text-6xl">
                    What exactly is LAMARIN?
                  </h2>
                </div>

                <div>
                  <p className="text-xl leading-9 text-text-secondary md:text-3xl md:leading-[1.35]">
                    LAMARIN is a private job-application management website for
                    people handling multiple recruitment processes at the same
                    time.
                  </p>

                  <p className="mt-7 max-w-3xl text-sm leading-7 text-muted md:text-base md:leading-8">
                    It connects vacancy capture, application records, Kanban
                    tracking, recruitment planning, personal analytics, CVs,
                    and cover letters in one account-based workspace. It is not
                    a job marketplace and it is not an applicant-tracking
                    system for recruiters. The product is built for the job
                    seeker.
                  </p>

                  <dl className="mt-10 grid gap-x-8 gap-y-7 border-t border-stroke pt-8 sm:grid-cols-2">
                    <MetaItem term="Product type" detail="Responsive full-stack web application" />
                    <MetaItem term="Primary user" detail="Active job seekers" />
                    <MetaItem term="My contribution" detail="Product, BA, UX/UI, engineering, and QA" />
                    <MetaItem term="Release status" detail="Implemented and deployed to production" />
                  </dl>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-20">
                <BrowserMockup
                  screen={PRODUCT_SCREENS.dashboard}
                  priority
                  fallbackSrc={HERO_POSTER_URL}
                  size="large"
                />
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="mt-24 grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
                <div>
                  <SectionMarker number="ROLE" label="End-to-end ownership" />
                  <h3 className="mt-6 text-3xl leading-tight tracking-[-0.04em] text-text-primary md:text-5xl">
                    One project viewed through every delivery discipline.
                  </h3>
                </div>

                <div className="border-y border-stroke">
                  {ROLE_ROWS.map((item) => (
                    <div
                      key={item.role}
                      className="grid gap-3 border-b border-stroke py-6 last:border-b-0 sm:grid-cols-[190px_minmax(0,1fr)]"
                    >
                      <h4 className="text-sm font-medium text-text-primary">
                        {item.role}
                      </h4>
                      <p className="text-sm leading-7 text-muted">
                        {item.responsibility}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section
          id="challenge"
          className="scroll-mt-28 border-t border-stroke px-6 py-24 md:px-10 md:py-36"
        >
          <div className="mx-auto max-w-[1180px]">
            <Reveal>
              <SectionMarker number="01" label="Product challenge" />
              <div className="mt-8 grid gap-12 lg:grid-cols-[0.78fr_1.22fr]">
                <h2 className="max-w-xl text-4xl leading-[1.04] tracking-[-0.05em] text-text-primary md:text-6xl">
                  The job search already feels like work. The tools make it
                  harder.
                </h2>

                <div>
                  <p className="text-lg leading-8 text-text-secondary md:text-xl md:leading-9">
                    One application can involve a job portal, spreadsheet,
                    inbox, calendar, notes app, and several document folders.
                    As the pipeline grows, users lose a reliable view of where
                    each opportunity stands and what should happen next.
                  </p>

                  <div className="mt-10 divide-y divide-stroke border-y border-stroke">
                    <ProblemRow
                      number="01"
                      title="Information becomes fragmented"
                      text="Company details, vacancy links, notes, schedules, and documents live in different tools."
                    />
                    <ProblemRow
                      number="02"
                      title="Progress becomes difficult to scan"
                      text="Users repeatedly reopen individual records just to understand the state of the recruitment pipeline."
                    />
                    <ProblemRow
                      number="03"
                      title="Important actions are easy to miss"
                      text="Interview preparation, assessments, recruiter follow-ups, and deadlines compete with unrelated activity."
                    />
                    <ProblemRow
                      number="04"
                      title="Performance remains invisible"
                      text="Users cannot easily see which sources perform well, where applications stop progressing, or which records need attention."
                    />
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <blockquote className="mt-20 border-l-2 border-indigo-500 pl-6 md:pl-9">
                <p className="max-w-5xl text-2xl leading-[1.35] tracking-[-0.025em] text-text-primary md:text-4xl">
                  “Active job seekers need one reliable workspace to understand
                  where every application stands, what must happen next, and
                  what their own job-search data is telling them.”
                </p>
                <footer className="mt-6 text-xs uppercase tracking-[0.22em] text-muted">
                  Product problem statement
                </footer>
              </blockquote>
            </Reveal>
          </div>
        </section>

        <section
          id="strategy"
          className="scroll-mt-28 border-t border-stroke px-6 py-24 md:px-10 md:py-36"
        >
          <div className="mx-auto max-w-[1180px]">
            <Reveal>
              <SectionMarker number="02" label="Product strategy" />
              <div className="mt-8 grid gap-12 lg:grid-cols-[0.78fr_1.22fr]">
                <h2 className="max-w-xl text-4xl leading-[1.03] tracking-[-0.05em] text-text-primary md:text-6xl">
                  One workflow: capture, track, plan, and learn.
                </h2>

                <div>
                  <p className="text-lg leading-8 text-text-secondary md:text-xl md:leading-9">
                    The product strategy was to reduce tool switching without
                    turning LAMARIN into an oversized recruitment platform.
                    Every core feature supports one of four decisions in the
                    job seeker’s workflow.
                  </p>

                  <div className="mt-10 grid gap-y-6 border-y border-stroke py-7 sm:grid-cols-4 sm:gap-x-6">
                    {[
                      ["01", "Capture", "Create a reliable application record."],
                      ["02", "Track", "Understand progress across the pipeline."],
                      ["03", "Plan", "Turn applications into scheduled actions."],
                      ["04", "Learn", "Use personal data to improve decisions."],
                    ].map(([number, title, text]) => (
                      <div key={title}>
                        <span className="font-display text-lg italic text-indigo-500">
                          {number}
                        </span>
                        <h3 className="mt-3 text-base text-text-primary">{title}</h3>
                        <p className="mt-2 text-xs leading-6 text-muted">{text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-24 grid gap-12 lg:grid-cols-2">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.26em] text-indigo-500">
                    Included in the production scope
                  </p>
                  <ul className="mt-6 divide-y divide-stroke border-y border-stroke">
                    {[
                      "Application capture and structured records",
                      "Dashboard, Board, Calendar, and Insights",
                      "Next actions, reminders, and attention states",
                      "Private CV and cover-letter management",
                      "Email and Google authentication",
                      "Demo mode, responsive design, and light/dark theme",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3 py-4 text-sm leading-7 text-text-secondary">
                        <Check className="mt-1 h-4 w-4 shrink-0 text-indigo-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-[9px] uppercase tracking-[0.26em] text-muted">
                    Deliberately outside the MVP
                  </p>
                  <ul className="mt-6 divide-y divide-stroke border-y border-stroke">
                    {[
                      "Job marketplace and employer vacancy publishing",
                      "Recruiter or company applicant-tracking dashboard",
                      "Automatic job submission",
                      "AI matching and resume generation",
                      "Team collaboration and public profiles",
                      "Native mobile application and paid subscription",
                    ].map((item) => (
                      <li key={item} className="py-4 text-sm leading-7 text-muted">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section
          id="features"
          className="scroll-mt-28 border-t border-stroke px-6 py-24 md:px-10 md:py-36"
        >
          <div className="mx-auto max-w-[1180px]">
            <Reveal>
              <SectionMarker number="03" label="Complete feature walkthrough" />
              <div className="mt-8 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
                <h2 className="max-w-2xl text-4xl leading-[1.03] tracking-[-0.05em] text-text-primary md:text-6xl">
                  Every feature shown in its real website context.
                </h2>

                <p className="max-w-2xl text-base leading-8 text-muted md:text-lg">
                  The mockups below use desktop browser frames because LAMARIN
                  is a responsive web application. Each section explains the
                  user decision supported by the feature—not only what appears
                  on the screen.
                </p>
              </div>
            </Reveal>

            <div className="mt-24 space-y-28 md:space-y-40">
              {PRODUCT_FEATURES.map((feature, index) => (
                <FeatureWalkthrough
                  key={feature.number}
                  feature={feature}
                  reverse={index % 2 === 1}
                />
              ))}
            </div>

            <Reveal>
              <div className="mt-36 border-t border-stroke pt-20">
                <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
                  <div>
                    <SectionMarker number="11" label="Responsive experience" />
                    <h3 className="mt-6 text-3xl leading-tight tracking-[-0.04em] text-text-primary md:text-5xl">
                      One website across viewport, theme, and account state.
                    </h3>
                    <p className="mt-6 text-sm leading-7 text-muted md:text-base md:leading-8">
                      The interface adapts its navigation, content density, and
                      interaction layout across desktop, tablet, and mobile
                      widths. Light and dark themes preserve the same hierarchy,
                      while Demo mode clearly identifies temporary data.
                    </p>
                  </div>

                  <div className="space-y-8">
                    <BrowserPair
                      first={PRODUCT_SCREENS.light}
                      second={PRODUCT_SCREENS.dark}
                    />
                    <BrowserMockup screen={PRODUCT_SCREENS.responsive} size="medium" />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section
          id="engineering"
          className="scroll-mt-28 border-t border-stroke px-6 py-24 md:px-10 md:py-36"
        >
          <div className="mx-auto max-w-[1180px]">
            <Reveal>
              <SectionMarker number="04" label="Engineering and security" />
              <div className="mt-8 grid gap-12 lg:grid-cols-[0.76fr_1.24fr]">
                <div>
                  <h2 className="max-w-xl text-4xl leading-[1.03] tracking-[-0.05em] text-text-primary md:text-6xl">
                    Privacy enforced below the interface.
                  </h2>

                  <div className="mt-9 flex flex-wrap gap-2">
                    {[
                      "Next.js",
                      "React",
                      "TypeScript",
                      "Supabase Auth",
                      "PostgreSQL",
                      "Supabase Storage",
                      "Google OAuth",
                      "Vercel",
                    ].map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-stroke px-3.5 py-2 text-xs text-muted"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-lg leading-8 text-text-secondary md:text-xl md:leading-9">
                    LAMARIN stores private recruitment information and personal
                    documents. Security therefore cannot depend on whether a
                    button or route is hidden in the interface.
                  </p>

                  <p className="mt-6 text-sm leading-7 text-muted md:text-base md:leading-8">
                    Account identity is checked through authentication,
                    application records are protected with Row Level Security,
                    and documents are stored in a private bucket under folders
                    scoped to the user ID.
                  </p>
                </div>
              </div>
            </Reveal>

            <div className="mt-16 border-y border-stroke">
              {ARCHITECTURE_LAYERS.map((layer, index) => (
                <Reveal key={layer.title} delay={index * 0.03}>
                  <ArchitectureRow layer={layer} index={index} />
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.08}>
              <div className="mt-24 grid gap-12 lg:grid-cols-[0.78fr_1.22fr]">
                <div>
                  <SectionMarker number="FILE" label="Safe replacement workflow" />
                  <h3 className="mt-6 text-3xl leading-tight tracking-[-0.04em] text-text-primary md:text-5xl">
                    Replace safely. Clean up automatically.
                  </h3>
                  <p className="mt-6 text-sm leading-7 text-muted md:text-base md:leading-8">
                    When a CV or cover letter is replaced, the new file is
                    validated and uploaded first. Metadata is updated only after
                    success, and the previous object is then removed so a failed
                    replacement does not erase the user’s existing document.
                  </p>
                </div>

                <ol className="divide-y divide-stroke border-y border-stroke">
                  {[
                    "Validate the account, file type, and 5 MB limit.",
                    "Upload the new document to the authenticated user folder.",
                    "Update the application record with the new storage metadata.",
                    "Remove the previous file only after the replacement succeeds.",
                    "Return authorized download access for the current document.",
                  ].map((item, index) => (
                    <li
                      key={item}
                      className="grid grid-cols-[42px_minmax(0,1fr)] gap-4 py-5"
                    >
                      <span className="font-display italic text-indigo-500">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm leading-7 text-text-secondary">
                        {item}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>
        </section>

        <section
          id="quality"
          className="scroll-mt-28 border-t border-stroke px-6 py-24 md:px-10 md:py-36"
        >
          <div className="mx-auto max-w-[1180px]">
            <Reveal>
              <SectionMarker number="05" label="QA and release" />
              <div className="mt-8 grid gap-12 lg:grid-cols-[0.78fr_1.22fr]">
                <h2 className="max-w-xl text-4xl leading-[1.03] tracking-[-0.05em] text-text-primary md:text-6xl">
                  Tested as one complete user journey.
                </h2>

                <p className="max-w-2xl text-base leading-8 text-muted md:text-lg">
                  Validation covered the product from account access to
                  production deployment. The objective was not merely to prove
                  that individual controls respond, but that records, reminders,
                  metrics, documents, and ownership remain correct across the
                  complete workflow.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-16 overflow-hidden border-y border-stroke">
                <div className="hidden grid-cols-[0.75fr_1.8fr_0.35fr] gap-6 border-b border-stroke py-4 text-[9px] uppercase tracking-[0.24em] text-muted md:grid">
                  <span>Area</span>
                  <span>Validated scope</span>
                  <span>Result</span>
                </div>

                {QA_ROWS.map((row) => (
                  <div
                    key={row.area}
                    className="grid gap-3 border-b border-stroke py-6 last:border-b-0 md:grid-cols-[0.75fr_1.8fr_0.35fr] md:items-center md:gap-6"
                  >
                    <div className="flex items-center gap-3">
                      <TestTube2 className="h-4 w-4 text-indigo-500" />
                      <span className="text-sm font-medium text-text-primary">
                        {row.area}
                      </span>
                    </div>
                    <p className="text-sm leading-7 text-muted">{row.scope}</p>
                    <span className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs text-emerald-500">
                      <Check className="h-3.5 w-3.5" />
                      {row.result}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="mt-20 grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
                <div>
                  <SectionMarker number="FLOW" label="Delivery process" />
                  <h3 className="mt-6 text-3xl leading-tight tracking-[-0.04em] text-text-primary md:text-5xl">
                    From problem discovery to live release.
                  </h3>
                </div>

                <div className="border-t border-stroke">
                  {PROCESS_STEPS.map((step) => (
                    <article
                      key={step.number}
                      className="grid gap-4 border-b border-stroke py-7 sm:grid-cols-[54px_110px_minmax(0,1fr)]"
                    >
                      <span className="font-display text-xl italic text-indigo-500">
                        {step.number}
                      </span>
                      <p className="text-[9px] uppercase tracking-[0.2em] text-muted">
                        {step.label}
                      </p>
                      <div>
                        <h4 className="text-lg tracking-[-0.02em] text-text-primary">
                          {step.title}
                        </h4>
                        <p className="mt-3 text-sm leading-7 text-muted">
                          {step.text}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section
          id="reflection"
          className="scroll-mt-28 border-t border-stroke px-6 py-24 md:px-10 md:py-36"
        >
          <div className="mx-auto max-w-[1180px]">
            <Reveal>
              <SectionMarker number="06" label="Outcome and reflection" />
              <div className="mt-8 grid gap-12 lg:grid-cols-[0.78fr_1.22fr]">
                <h2 className="max-w-xl text-4xl leading-[1.03] tracking-[-0.05em] text-text-primary md:text-6xl">
                  A functioning product, not a static portfolio concept.
                </h2>

                <div>
                  <p className="text-lg leading-8 text-text-secondary md:text-xl md:leading-9">
                    LAMARIN was implemented, secured, tested, and deployed as a
                    working website. Its strongest design decision is not a
                    single screen—it is the consistency of one application
                    record across capture, tracking, planning, analytics, and
                    document workflows.
                  </p>

                  <div className="mt-10 divide-y divide-stroke border-y border-stroke">
                    <ReflectionRow
                      title="What worked"
                      text="Dashboard, Board, Calendar, and Insights answer different questions while remaining synchronized through one data model."
                    />
                    <ReflectionRow
                      title="What required care"
                      text="OAuth callbacks, password recovery, document replacement, and owner-only policies required validation beyond the visible interface."
                    />
                    <ReflectionRow
                      title="What comes next"
                      text="Future iterations should use real behavioral data and user research to improve the workflow before expanding into broader features."
                    />
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="relative mt-24 overflow-hidden border-y border-stroke py-16 text-center md:py-24">
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[120px]" />
                <div className="relative">
                  <Sparkles className="mx-auto h-6 w-6 text-indigo-500" />
                  <h3 className="mx-auto mt-7 max-w-4xl text-4xl leading-[1.04] tracking-[-0.05em] text-text-primary md:text-6xl">
                    Explore the real product in its website environment.
                  </h3>
                  <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-muted md:text-base md:leading-8">
                    Open the live deployment or enter Demo mode to review the
                    complete responsive workflow without relying only on this
                    case study.
                  </p>

                  <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <a
                      href={LIVE_PRODUCT_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-3 rounded-full bg-indigo-500 px-6 py-3.5 text-sm font-medium text-white transition hover:-translate-y-1 hover:bg-indigo-400"
                    >
                      Open live LAMARIN
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                    <a
                      href={DEMO_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-3 rounded-full border border-stroke px-6 py-3.5 text-sm text-text-secondary transition hover:-translate-y-1 hover:border-indigo-400/45 hover:text-text-primary"
                    >
                      Open demo mode
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </div>
  );
}

function Hero({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-black">
      <video
        autoPlay={!prefersReducedMotion}
        muted
        loop={!prefersReducedMotion}
        playsInline
        preload="metadata"
        poster={HERO_POSTER_URL}
        className="absolute inset-0 h-full w-full object-cover object-center"
      >
        <source src={HERO_VIDEO_URL} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.24),transparent_36%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/28 via-black/8 to-black/84" />

      <div className="relative z-10 flex min-h-[100svh] items-center justify-center px-6 py-28 text-center">
        <motion.div
          initial={
            prefersReducedMotion
              ? { opacity: 0 }
              : { opacity: 0, y: 28, scale: 0.98 }
          }
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <p className="text-[10px] uppercase tracking-[0.38em] text-indigo-100/70 md:text-xs">
            Full-stack product · Responsive web application
          </p>

          <h1 className="mt-6 text-[clamp(3.25rem,7vw,6.5rem)] leading-[0.88] tracking-[-0.065em] text-white">
            LAMARIN<span className="text-indigo-300">.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-6 text-white/72 md:text-base md:leading-7">
            A private job-application management website that helps job seekers
            capture opportunities, track recruitment progress, plan next
            actions, evaluate performance, and manage supporting documents in
            one focused workspace.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={LIVE_PRODUCT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-[#0b0b18] transition hover:-translate-y-1 hover:bg-indigo-100"
            >
              Open live product
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <a
              href="#overview"
              className="group inline-flex items-center justify-center gap-3 rounded-full border border-white/16 bg-black/20 px-6 py-3.5 text-sm text-white/78 backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/10 hover:text-white"
            >
              Read case study
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </motion.div>
      </div>

      <a
        href="#overview"
        aria-label="Scroll to LAMARIN project overview"
        className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-3 text-white/55 transition hover:text-indigo-200"
      >
        <span className="text-[9px] uppercase tracking-[0.3em]">
          Scroll to explore
        </span>
        <motion.span
          animate={prefersReducedMotion ? undefined : { y: [0, 5, 0] }}
          transition={
            prefersReducedMotion
              ? undefined
              : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <ArrowRight className="h-4 w-4 rotate-90" />
        </motion.span>
      </a>
    </section>
  );
}

function FeatureWalkthrough({
  feature,
  reverse,
}: {
  feature: ProductFeature;
  reverse: boolean;
}) {
  const Icon = feature.icon;

  return (
    <Reveal>
      <article
        className={`grid gap-10 lg:grid-cols-[1.16fr_0.84fr] lg:items-center ${
          reverse ? "lg:grid-cols-[0.84fr_1.16fr]" : ""
        }`}
      >
        <div className={reverse ? "lg:order-2" : undefined}>
          <BrowserMockup screen={feature.screen} size="large" />
        </div>

        <div className={reverse ? "lg:order-1 lg:pr-8" : "lg:pl-8"}>
          <div className="flex items-center gap-3">
            <span className="font-display text-xl italic text-indigo-500">
              {feature.number}
            </span>
            <span className="h-px w-8 bg-indigo-500/50" />
            <span className="text-[9px] uppercase tracking-[0.25em] text-muted">
              {feature.category}
            </span>
          </div>

          <div className="mt-7 flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-500">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="text-3xl tracking-[-0.04em] text-text-primary md:text-5xl">
              {feature.title}
            </h3>
          </div>

          <p className="mt-5 text-sm font-medium text-indigo-500">
            {feature.question}
          </p>

          <p className="mt-5 text-sm leading-7 text-muted md:text-base md:leading-8">
            {feature.description}
          </p>

          <ul className="mt-7 space-y-3">
            {feature.points.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <Check className="mt-1 h-4 w-4 shrink-0 text-indigo-500" />
                <span className="text-sm leading-6 text-text-secondary">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </Reveal>
  );
}

function BrowserMockup({
  screen,
  priority = false,
  fallbackSrc,
  size = "medium",
}: {
  screen: ProductScreen;
  priority?: boolean;
  fallbackSrc?: string;
  size?: "medium" | "large";
}) {
  const [imageSrc, setImageSrc] = useState(screen.src);
  const [failed, setFailed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setImageSrc(screen.src);
    setFailed(false);
    setIsOpen(false);
  }, [screen.src]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleError = () => {
    if (fallbackSrc && imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
      return;
    }

    setFailed(true);
  };

  const fullscreenPortal =
    typeof document !== "undefined"
      ? createPortal(
          <AnimatePresence>
            {isOpen && !failed && (
              <motion.div
                className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/92 p-3 backdrop-blur-xl md:p-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22 }}
                onMouseDown={(event) => {
                  if (event.target === event.currentTarget) setIsOpen(false);
                }}
              >
                <motion.div
                  role="dialog"
                  aria-modal="true"
                  aria-label={`${screen.label} fullscreen preview`}
                  initial={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: 24, scale: 0.97 }
                  }
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: 14, scale: 0.985 }
                  }
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  onMouseDown={(event) => event.stopPropagation()}
                  className="relative flex max-h-[94vh] w-full max-w-[1500px] flex-col overflow-hidden rounded-[1.5rem] border border-white/15 bg-[#09090d] shadow-[0_40px_150px_rgba(0,0,0,0.92)]"
                >
                  <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3 md:px-6">
                    <div className="flex gap-1.5" aria-hidden="true">
                      <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    </div>

                    <div className="flex min-w-0 flex-1 items-center justify-center">
                      <div className="flex w-full max-w-[620px] items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2">
                        <LockKeyhole className="h-3 w-3 shrink-0 text-white/40" />
                        <span className="truncate text-[10px] text-white/45">
                          {screen.url}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      aria-label="Close fullscreen preview"
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/[0.05] text-white/65 transition hover:rotate-90 hover:bg-white/10 hover:text-white"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="flex min-h-0 flex-1 items-center justify-center overflow-auto bg-black/45 p-2 md:p-5">
                    <img
                      src={imageSrc}
                      alt={screen.alt}
                      className="max-h-[82vh] max-w-full object-contain"
                    />
                  </div>

                  <div className="flex items-center justify-between border-t border-white/10 px-4 py-3 text-xs text-white/40 md:px-6">
                    <span>{screen.label}</span>
                    <span>Click outside or press Esc to close</span>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )
      : null;

  return (
    <>
      <figure>
        <div
          className={`group overflow-hidden rounded-[1.35rem] border border-stroke bg-surface shadow-[0_24px_70px_rgba(0,0,0,0.16)] ${
            size === "large" ? "max-w-none" : ""
          }`}
        >
          <div className="flex items-center gap-3 border-b border-stroke bg-surface-elevated px-4 py-3">
            <div className="flex gap-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
            </div>

            <div className="flex min-w-0 flex-1 items-center justify-center">
              <div className="flex w-full max-w-[460px] items-center gap-2 rounded-lg border border-stroke bg-bg/60 px-3 py-1.5">
                <LockKeyhole className="h-3 w-3 shrink-0 text-muted" />
                <span className="truncate text-[10px] text-muted">
                  {screen.url}
                </span>
              </div>
            </div>
          </div>

          <div className="relative aspect-[16/10] overflow-hidden bg-surface-elevated">
            {failed ? (
              <div className="flex h-full items-center justify-center p-8">
                <div className="max-w-md text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-500">
                    <ImageIcon className="h-6 w-6" />
                  </div>
                  <p className="mt-5 text-sm font-medium text-text-primary">
                    Add the {screen.label} screenshot
                  </p>
                  <p className="mt-2 break-all font-mono text-[10px] leading-5 text-muted">
                    {screen.src}
                  </p>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                aria-label={`Open ${screen.label} fullscreen`}
                className="relative block h-full w-full cursor-zoom-in text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500"
              >
                <img
                  src={imageSrc}
                  alt={screen.alt}
                  loading={priority ? "eager" : "lazy"}
                  decoding="async"
                  onError={handleError}
                  className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.012]"
                />

                <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white/75 opacity-0 shadow-lg backdrop-blur-md transition group-hover:opacity-100 group-focus-within:opacity-100">
                  <Maximize2 className="h-4 w-4" />
                </span>

                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent px-4 pb-4 pt-12 text-right text-[9px] uppercase tracking-[0.22em] text-white/70 opacity-0 transition group-hover:opacity-100 group-focus-within:opacity-100">
                  Click to fullscreen
                </span>
              </button>
            )}
          </div>
        </div>

        <figcaption className="mt-3 flex items-center justify-between gap-4 px-1">
          <span className="text-xs text-muted">{screen.label}</span>
          <span className="text-[9px] uppercase tracking-[0.2em] text-muted">
            Desktop web · Click to expand
          </span>
        </figcaption>
      </figure>

      {fullscreenPortal}
    </>
  );
}

function BrowserPair({
  first,
  second,
}: {
  first: ProductScreen;
  second: ProductScreen;
}) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <BrowserMockup screen={first} />
      <BrowserMockup screen={second} />
    </div>
  );
}

function SectionMarker({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-display text-xl italic text-indigo-500">{number}</span>
      <span className="h-px w-8 bg-indigo-500/50" />
      <span className="text-[9px] uppercase tracking-[0.27em] text-muted">
        {label}
      </span>
    </div>
  );
}

function MetaItem({ term, detail }: { term: string; detail: string }) {
  return (
    <div>
      <dt className="text-[9px] uppercase tracking-[0.22em] text-muted">
        {term}
      </dt>
      <dd className="mt-2 text-sm leading-6 text-text-primary">{detail}</dd>
    </div>
  );
}

function ProblemRow({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="grid gap-4 py-6 sm:grid-cols-[56px_minmax(0,1fr)]">
      <span className="font-display text-xl italic text-indigo-500">{number}</span>
      <div>
        <h3 className="text-lg tracking-[-0.02em] text-text-primary">{title}</h3>
        <p className="mt-2 text-sm leading-7 text-muted">{text}</p>
      </div>
    </div>
  );
}

function ArchitectureRow({
  layer,
  index,
}: {
  layer: (typeof ARCHITECTURE_LAYERS)[number];
  index: number;
}) {
  const Icon = layer.icon;

  return (
    <article className="grid gap-5 border-b border-stroke py-7 last:border-b-0 md:grid-cols-[64px_140px_250px_minmax(0,1fr)] md:items-center">
      <span className="font-display text-xl italic text-indigo-500">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="flex items-center gap-3">
        <Icon className="h-4 w-4 text-indigo-500" />
        <span className="text-[9px] uppercase tracking-[0.2em] text-muted">
          {layer.layer}
        </span>
      </div>
      <h3 className="text-lg text-text-primary">{layer.title}</h3>
      <p className="text-sm leading-7 text-muted">{layer.text}</p>
    </article>
  );
}

function ReflectionRow({ title, text }: { title: string; text: string }) {
  return (
    <div className="grid gap-3 py-6 sm:grid-cols-[170px_minmax(0,1fr)]">
      <h3 className="text-sm font-medium text-text-primary">{title}</h3>
      <p className="text-sm leading-7 text-muted">{text}</p>
    </div>
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
          : { opacity: 0, y: 24, filter: "blur(8px)" }
      }
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.12 }}
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