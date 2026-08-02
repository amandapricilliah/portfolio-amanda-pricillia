// FARMAGYM CASE STUDY — REVISED · EN/ID · CLEAN LIGHT MODE
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
  Activity,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  Clock3,
  Dumbbell,
  FileText,
  ImageIcon,
  LayoutTemplate,
  Maximize2,
  Menu,
  MousePointer2,
  Search,
  Sparkles,
  Target,
  TimerReset,
  Utensils,
  Workflow,
  X,
} from "lucide-react";
import { createPortal } from "react-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export const Route = createFileRoute("/farmagym")({
  component: FarmaGymCaseStudy,
});

type Language = "en" | "id";
type LocalizedText = { en: string; id: string };

type GalleryImage = {
  src: string;
  alt: string;
  label: LocalizedText;
};

type LightboxState = {
  images: GalleryImage[];
  index: number;
} | null;

type PrototypeStage = {
  id: string;
  number: string;
  label: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  images: GalleryImage[];
  prototypeUrl?: string;
};

type ProblemItem = {
  number: string;
  title: LocalizedText;
  problem: LocalizedText;
  need: LocalizedText;
  response: LocalizedText;
  icon: LucideIcon;
};

const MEDIUM_URL =
  "https://medium.com/@pricilliaamanda916/ui-ux-portofolio-farmagym-case-study-6d4cdded0884";

const PROTOTYPE_URL =
  "https://www.figma.com/proto/GTmkNDH61vU7Y08jPCzfMm/07_Interface-Structure?node-id=527-4052&viewport=82%2C335%2C0.07&t=Pp9QAM90adyxP30R-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=527%3A4049&page-id=524%3A1840";

const HERO_IMAGE: GalleryImage = {
  src: "/images/farmagym/farmagym_mockup.png",
  alt: "FarmaGym mobile fitness planning application mockup",
  label: { en: "FarmaGym product mockup", id: "Mockup produk FarmaGym" },
};

const PERSONA_IMAGES: GalleryImage[] = [
  {
    src: "/images/farmagym/user-persona-01.jpg",
    alt: "First FarmaGym research persona document",
    label: { en: "Research persona 01", id: "Persona riset 01" },
  },
  {
    src: "/images/farmagym/user-persona-02.jpg",
    alt: "Second FarmaGym research persona document",
    label: { en: "Research persona 02", id: "Persona riset 02" },
  },
];

const DISCOVERY_ARCHIVE: GalleryImage[] = [
  ...PERSONA_IMAGES,
  {
    src: "/images/farmagym/interview-questions.jpg",
    alt: "Interview questions used during FarmaGym discovery",
    label: { en: "Interview questions", id: "Pertanyaan wawancara" },
  },
  {
    src: "/images/farmagym/define.png",
    alt: "Grouped user problems from the Define stage",
    label: { en: "Grouped user problems", id: "Pengelompokan masalah pengguna" },
  },
  {
    src: "/images/farmagym/ideate-solution-01.png",
    alt: "First group of solution ideas",
    label: { en: "Solution ideas 01", id: "Ide solusi 01" },
  },
  {
    src: "/images/farmagym/ideate-solution-02.png",
    alt: "Second group of solution ideas",
    label: { en: "Solution ideas 02", id: "Ide solusi 02" },
  },
  {
    src: "/images/farmagym/ideate-solution-03.png",
    alt: "Third group of solution ideas",
    label: { en: "Solution ideas 03", id: "Ide solusi 03" },
  },
  {
    src: "/images/farmagym/ideate-feature-solutions.png",
    alt: "Feature solutions generated in the Ideate stage",
    label: { en: "Feature solution map", id: "Peta solusi fitur" },
  },
  {
    src: "/images/farmagym/ideate-prioritization-matrix.png",
    alt: "FarmaGym feature prioritization matrix",
    label: { en: "Prioritization matrix", id: "Matriks prioritas" },
  },
];

const PROTOTYPE_STAGES: PrototypeStage[] = [
  {
    id: "flows",
    number: "01",
    label: { en: "Flows", id: "Alur" },
    title: {
      en: "Map the routes before styling the interface.",
      id: "Petakan rute sebelum menata tampilan.",
    },
    description: {
      en: "Credential, schedule-viewing, and workout-plan creation flows were documented so each major task had a clear entry, decision, and completion point.",
      id: "Alur kredensial, melihat jadwal, dan membuat rencana olahraga didokumentasikan agar setiap tugas utama memiliki titik masuk, keputusan, dan penyelesaian yang jelas.",
    },
    images: [
      {
        src: "/images/farmagym/prototype/taskflow-signin.png",
        alt: "Sign-in task flow",
        label: { en: "Sign-in task flow", id: "Task flow masuk akun" },
      },
      {
        src: "/images/farmagym/prototype/taskflow-login-skip.png",
        alt: "Skip-login task flow",
        label: { en: "Skip-login task flow", id: "Task flow lewati login" },
      },
      {
        src: "/images/farmagym/prototype/taskflow-signup.png",
        alt: "Sign-up task flow",
        label: { en: "Sign-up task flow", id: "Task flow daftar akun" },
      },
      {
        src: "/images/farmagym/prototype/taskflow-facebook.png",
        alt: "Facebook login task flow",
        label: { en: "Facebook login", id: "Login Facebook" },
      },
      {
        src: "/images/farmagym/prototype/taskflow-google.png",
        alt: "Google login task flow",
        label: { en: "Google login", id: "Login Google" },
      },
      {
        src: "/images/farmagym/prototype/taskflow-apple.png",
        alt: "Apple login task flow",
        label: { en: "Apple login", id: "Login Apple" },
      },
      {
        src: "/images/farmagym/prototype/taskflow-show-schedule.png",
        alt: "Show workout schedule task flow",
        label: { en: "View workout schedule", id: "Melihat jadwal olahraga" },
      },
      {
        src: "/images/farmagym/prototype/taskflow-add-schedule.png",
        alt: "Add workout schedule task flow",
        label: { en: "Add workout schedule", id: "Menambahkan jadwal olahraga" },
      },
      {
        src: "/images/farmagym/prototype/userflow-credential.png",
        alt: "Credential user flow",
        label: { en: "Credential user flow", id: "User flow kredensial" },
      },
    ],
  },
  {
    id: "architecture",
    number: "02",
    label: { en: "Architecture", id: "Arsitektur" },
    title: {
      en: "Organise features into a navigable product structure.",
      id: "Susun fitur menjadi struktur produk yang mudah dinavigasi.",
    },
    description: {
      en: "The information architecture connects onboarding, discovery, programs, health content, plan creation, reminders, and personal activity into one mobile hierarchy.",
      id: "Information architecture menghubungkan onboarding, eksplorasi, program, konten kesehatan, pembuatan rencana, pengingat, dan aktivitas personal dalam satu hierarki mobile.",
    },
    images: [
      {
        src: "/images/farmagym/prototype/information-architecture.png",
        alt: "FarmaGym information architecture",
        label: { en: "Information architecture", id: "Information architecture" },
      },
    ],
  },
  {
    id: "low-fidelity",
    number: "03",
    label: { en: "Low fidelity", id: "Low fidelity" },
    title: {
      en: "Test layout and sequence before visual polish.",
      id: "Uji tata letak dan urutan sebelum visual dipoles.",
    },
    description: {
      en: "The early wireframe focused on page hierarchy, placement, and the relationship between browsing, scheduling, and workout execution.",
      id: "Wireframe awal berfokus pada hierarki halaman, penempatan elemen, serta hubungan antara eksplorasi, penjadwalan, dan pelaksanaan olahraga.",
    },
    images: [
      {
        src: "/images/farmagym/prototype/low-fidelity.png",
        alt: "FarmaGym low-fidelity screens",
        label: { en: "Low-fidelity system", id: "Sistem low fidelity" },
      },
    ],
  },
  {
    id: "design-system",
    number: "04",
    label: { en: "Design system", id: "Design system" },
    title: {
      en: "Create consistency before scaling the screens.",
      id: "Bangun konsistensi sebelum memperbanyak layar.",
    },
    description: {
      en: "Colour, typography, spacing, shadows, icons, grid, components, auto layout, and variants became the shared visual rules for the product.",
      id: "Warna, tipografi, spacing, shadow, ikon, grid, komponen, auto layout, dan variant menjadi aturan visual bersama untuk produk.",
    },
    images: [
      {
        src: "/images/farmagym/prototype/design-system.png",
        alt: "FarmaGym design system",
        label: { en: "Design system", id: "Design system" },
      },
    ],
  },
  {
    id: "high-fidelity",
    number: "05",
    label: { en: "Final interface", id: "Antarmuka akhir" },
    title: {
      en: "Turn the planned structure into a prototype-ready product.",
      id: "Ubah struktur yang direncanakan menjadi produk siap prototipe.",
    },
    description: {
      en: "The final screens cover authentication, the main discovery experience, and the core Add Plan flow that lets users define exercises, sets, timing, and weekly schedules.",
      id: "Layar akhir mencakup autentikasi, pengalaman eksplorasi utama, dan alur inti Add Plan yang memungkinkan pengguna menentukan latihan, set, waktu, dan jadwal mingguan.",
    },
    images: [
      {
        src: "/images/farmagym/prototype/highfi-login.png",
        alt: "FarmaGym high-fidelity login screens",
        label: { en: "Login", id: "Login" },
      },
      {
        src: "/images/farmagym/prototype/highfi-signup.png",
        alt: "FarmaGym high-fidelity sign-up screens",
        label: { en: "Sign up", id: "Daftar akun" },
      },
      {
        src: "/images/farmagym/prototype/highfi-home.png",
        alt: "FarmaGym high-fidelity home screens",
        label: { en: "Home and discovery", id: "Beranda dan eksplorasi" },
      },
      {
        src: "/images/farmagym/prototype/highfi-add-plans.png",
        alt: "FarmaGym Add Plans high-fidelity screens",
        label: { en: "Add workout plan", id: "Tambah rencana olahraga" },
      },
    ],
  },
  {
    id: "prototype",
    number: "06",
    label: { en: "Prototype", id: "Prototipe" },
    title: {
      en: "Connect the screens into a testable experience.",
      id: "Hubungkan layar menjadi pengalaman yang dapat diuji.",
    },
    description: {
      en: "The interactive Figma prototype was used to test realistic tasks, especially weekly plan creation and workout execution.",
      id: "Prototipe interaktif Figma digunakan untuk menguji tugas realistis, terutama membuat rencana mingguan dan menjalankan olahraga.",
    },
    prototypeUrl: PROTOTYPE_URL,
    images: [
      {
        src: "/images/farmagym/prototype/prototype-preview.png",
        alt: "FarmaGym interactive prototype preview",
        label: { en: "Interactive prototype", id: "Prototipe interaktif" },
      },
    ],
  },
];

const PROBLEMS: ProblemItem[] = [
  {
    number: "01",
    title: { en: "Health loses to deadlines", id: "Kesehatan kalah oleh deadline" },
    problem: {
      en: "Busy study or client work makes users postpone exercise, meals, and recovery.",
      id: "Kesibukan kuliah atau pekerjaan klien membuat pengguna menunda olahraga, makan, dan pemulihan.",
    },
    need: {
      en: "A routine that can fit around real availability rather than demand a fixed gym schedule.",
      id: "Rutinitas yang mengikuti waktu nyata pengguna, bukan memaksa jadwal gym yang kaku.",
    },
    response: {
      en: "Flexible weekly planning with day, time, exercise, set, and duration controls.",
      id: "Perencanaan mingguan fleksibel dengan pengaturan hari, waktu, latihan, set, dan durasi.",
    },
    icon: Clock3,
  },
  {
    number: "02",
    title: { en: "Nutrition is difficult to control", id: "Asupan gizi sulit dikontrol" },
    problem: {
      en: "Users struggle to regulate meals, calories, and weekly nutrition while managing other responsibilities.",
      id: "Pengguna kesulitan mengatur makanan, kalori, dan nutrisi mingguan di tengah tanggung jawab lain.",
    },
    need: {
      en: "Clear, lightweight guidance that connects exercise goals with daily food decisions.",
      id: "Panduan ringan dan jelas yang menghubungkan tujuan olahraga dengan keputusan makan harian.",
    },
    response: {
      en: "Meal planning, calorie monitoring, and future access to nutrition guidance.",
      id: "Perencanaan menu, pemantauan kalori, dan akses konsultasi gizi pada pengembangan berikutnya.",
    },
    icon: Utensils,
  },
  {
    number: "03",
    title: { en: "Healthy habits feel unfamiliar", id: "Kebiasaan sehat terasa asing" },
    problem: {
      en: "Late meals, staying up, and limited exercise experience make a healthier routine difficult to start.",
      id: "Makan terlambat, begadang, dan pengalaman olahraga yang terbatas membuat rutinitas sehat sulit dimulai.",
    },
    need: {
      en: "Small, understandable steps instead of an overwhelming training programme.",
      id: "Langkah kecil yang mudah dipahami, bukan program latihan yang terasa berat.",
    },
    response: {
      en: "Beginner guidance, simple recommendations, and reminders that build consistency gradually.",
      id: "Panduan pemula, rekomendasi sederhana, dan pengingat yang membangun konsistensi secara bertahap.",
    },
    icon: Activity,
  },
  {
    number: "04",
    title: { en: "Goals lack a clear path", id: "Tujuan belum memiliki jalur jelas" },
    problem: {
      en: "Some users want an ideal weight but do not know which exercises, intensity, or frequency to choose.",
      id: "Sebagian pengguna ingin mencapai berat ideal, tetapi tidak mengetahui latihan, intensitas, atau frekuensi yang tepat.",
    },
    need: {
      en: "Goal-based recommendations and visible progress that make the next action obvious.",
      id: "Rekomendasi berbasis tujuan dan progres yang membuat langkah selanjutnya terlihat jelas.",
    },
    response: {
      en: "Target-based programmes, daily activity notes, and structured plan execution.",
      id: "Program berbasis target, catatan aktivitas harian, dan pelaksanaan rencana yang terstruktur.",
    },
    icon: Target,
  },
];

const TEST_TASKS = [
  {
    task: { en: "Create an account", id: "Membuat akun" },
    severity: 4,
    seq: 6,
    finding: {
      en: "Completed without an obstacle.",
      id: "Diselesaikan tanpa hambatan.",
    },
  },
  {
    task: { en: "Log in", id: "Masuk akun" },
    severity: 4,
    seq: 6,
    finding: {
      en: "The familiar credential flow was understood immediately.",
      id: "Alur kredensial yang familier langsung dipahami.",
    },
  },
  {
    task: { en: "Explore the menu", id: "Menjelajahi menu" },
    severity: 4,
    seq: 6,
    finding: {
      en: "Banner, programmes, categories, and articles were easy to scan.",
      id: "Banner, program, kategori, dan artikel mudah dipindai.",
    },
  },
  {
    task: { en: "Use search", id: "Menggunakan pencarian" },
    severity: 2,
    seq: 6,
    finding: {
      en: "The control was easy to find, but the search interaction was not active.",
      id: "Kontrol mudah ditemukan, tetapi interaksi pencarian belum aktif.",
    },
  },
  {
    task: { en: "Create a workout plan", id: "Membuat rencana olahraga" },
    severity: 2,
    seq: 4,
    finding: {
      en: "The route felt confusing and several controls were inactive.",
      id: "Alurnya terasa membingungkan dan beberapa kontrol belum aktif.",
    },
  },
  {
    task: { en: "Start the workout plan", id: "Menjalankan rencana olahraga" },
    severity: 2,
    seq: 4,
    finding: {
      en: "Exercise controls and the start-page sequence needed clearer behaviour.",
      id: "Kontrol latihan dan urutan pada halaman mulai membutuhkan perilaku yang lebih jelas.",
    },
  },
];

const COPY = {
  en: {
    back: "Back to projects",
    caseStudy: "FarmaGym · Product design story",
    openPrototype: "Open prototype",
    language: "Choose language",
    heroEyebrow: "Mobile fitness planner · Design Thinking",
    heroTitleA: "Build a routine",
    heroTitleB: "that fits real life.",
    heroDescription:
      "FarmaGym helps users plan weekly workouts, choose exercises, define sets and duration, and receive reminders without depending on a fixed gym schedule.",
    journey: "Follow the product journey",
    role: "Role",
    roleValue: "UI/UX Designer",
    scope: "Scope",
    scopeValue: "Research to usability testing",
    platform: "Platform",
    platformValue: "Mobile application",
    method: "Method",
    methodValue: "Design Thinking",
    navTitle: "Design journey",
    nav: ["Overview", "Research", "Define", "Ideate", "Prototype", "Validation", "Reflection"],
    overviewEyebrow: "Project overview",
    overviewTitle: "A fitness planner centred on the weekly routine.",
    overviewDescription:
      "The redesign prioritised the feature users needed most: creating and maintaining a workout schedule that could adapt to their goals and available time.",
    overviewRows: [
      {
        label: "Challenge",
        value:
          "Limited time and exercise knowledge made it difficult to build a consistent routine.",
      },
      {
        label: "Product goal",
        value:
          "Improve the existing interface and make weekly workout planning the clearest core experience.",
      },
      {
        label: "My responsibility",
        value:
          "End-to-end research, synthesis, flows, information architecture, interface design, prototyping, and evaluation.",
      },
      {
        label: "Approach",
        value:
          "Empathize, Define, Ideate, Prototype, and Test through a user-centred Design Thinking process.",
      },
    ],
    projectContextTitle: "Why a mobile planner?",
    projectContextText:
      "The concept responds to two practical barriers: people may not have enough time for a fixed gym routine, and they may not know how to choose an effective programme. A phone-based planner makes exercise easier to arrange around daily life.",
    researchEyebrow: "01 · Empathize",
    researchTitle: "Understand the life around the workout—not only the workout itself.",
    researchDescription:
      "Online observation, interview prompts, two personas, and supporting references were used to understand schedules, nutrition habits, exercise confidence, and personal goals.",
    researchMethods: [
      {
        number: "01",
        title: "Online observation",
        text: "Reviewed recurring health and fitness problems experienced by potential users.",
      },
      {
        number: "02",
        title: "Interview framing",
        text: "Prepared questions about routines, food, exercise experience, goals, and obstacles.",
      },
      {
        number: "03",
        title: "Persona synthesis",
        text: "Converted the findings into two representative routine patterns rather than designing for an abstract user.",
      },
    ],
    personaTitle: "Two routine patterns shaped the direction.",
    personas: [
      {
        label: "Busy student",
        title: "Wants healthier habits but struggles with schedule and consistency.",
        text: "Needs beginner guidance, a flexible workout plan, healthier meal ideas, and gradual motivation.",
      },
      {
        label: "Student and part-time worker",
        title: "Deadlines, late meals, and limited exercise knowledge interrupt the routine.",
        text: "Needs time-aware planning, goal-based exercise, nutrition structure, and a simpler path to progress.",
      },
    ],
    openResearchEvidence: "Open original research evidence",
    openPersona: "Open persona",
    viewInsight: "View insight",
    selectEvidence: "Select evidence",
    defineEyebrow: "02 · Define",
    defineTitle: "Six observations became four actionable product problems.",
    defineDescription:
      "The raw findings were grouped into themes that could directly influence structure, features, and the weekly planning experience.",
    selectProblem: "Select a problem",
    userProblem: "User problem",
    userNeed: "User need",
    designResponse: "Design response",
    ideateEyebrow: "03 · Ideate",
    ideateTitle: "Turn lifestyle friction into a focused product direction.",
    ideateDescription:
      "Ideas ranged from scheduling and nutrition to beginner education, reminders, consultation, and community. Prioritisation prevented the concept from becoming an unfocused health super-app.",
    directionTitle: "Four solution directions",
    directions: [
      {
        number: "01",
        title: "Workout planning",
        text: "Weekly schedules, exercise selection, duration, sets, and reminders.",
      },
      {
        number: "02",
        title: "Nutrition support",
        text: "Meal planning, calorie monitoring, and future consultation access.",
      },
      {
        number: "03",
        title: "Beginner guidance",
        text: "Simple movement instructions and recommendations based on goals.",
      },
      {
        number: "04",
        title: "Motivation and community",
        text: "Activity notes, encouragement, and shared learning with other users.",
      },
    ],
    priorityEyebrow: "Priority decision",
    priorityTitle: "Scheduling became the product spine.",
    priorityText:
      "The matrix placed weekly workout scheduling and meal/calorie tracking closest to the combination of high priority and high feasibility. More operationally demanding ideas—such as expert consultation and community support—remain valuable extensions rather than the first release.",
    priorityPrimary: "Build first",
    priorityPrimaryItems: ["Weekly workout schedule", "Meal and calorie tracking"],
    prioritySecondary: "Extend later",
    prioritySecondaryItems: ["Reminders", "Beginner guidance", "Community", "Nutrition consultation"],
    openIdeationEvidence: "Open ideation archive",
    prototypeEyebrow: "04 · Prototype",
    prototypeTitle: "One stage for the complete design process.",
    prototypeDescription:
      "Instead of stacking every screenshot, the process is organised into six selectable stages. Only the active evidence is displayed while all flows and final screens remain accessible.",
    selected: "Selected",
    viewStage: "View stage",
    openFull: "Open full image",
    previous: "Previous image",
    next: "Next image",
    validationEyebrow: "05 · Usability testing",
    validationTitle: "The easy tasks passed. The core planning flow revealed the real work.",
    validationDescription:
      "One participant aged 21, with mobile fitness-app experience, completed six realistic tasks. SEQ measured perceived ease from 1 to 6, while severity identified the priority of observed usability problems.",
    tasks: "Testing results",
    task: "Task",
    severity: "Severity",
    seq: "SEQ",
    finding: "Finding",
    average: "Average SEQ",
    averageValue: "5.33 / 6",
    easyTasks: "Tasks rated very easy",
    easyTasksValue: "4 / 6",
    rating: "Overall participant rating",
    ratingValue: "8 / 10",
    interpretationTitle: "What the scores actually mean",
    interpretationText:
      "Search received SEQ 6 because it was easy to recognise, but severity 2 because it could not be activated. The two core planning tasks received SEQ 4 and severity 2, showing that the central value proposition still needed interaction refinement.",
    iterationEyebrow: "Iteration plan",
    iterationTitle: "Convert every observed obstacle into a concrete interface action.",
    iterations: [
      "Add a working search-results state.",
      "Make the three-dot menu smaller and connect it to edit and delete actions.",
      "Activate exercise-detail controls and expand the exercise list.",
      "Clarify the Create Plan sequence and strengthen button hierarchy.",
      "Increase text and colour contrast for more comfortable reading.",
      "Fix the set-checkbox overlap on the Start page.",
      "Activate duration behaviour using an after-delay transition.",
    ],
    quote:
      "The interface felt current and comfortable, but several buttons and the three-dot menu still needed to behave like real controls.",
    reflectionEyebrow: "06 · Reflection",
    reflectionTitle: "The project moved from visual redesign to evidence-based product decisions.",
    reflectionText:
      "FarmaGym taught me how user research connects to flows, information architecture, a design system, and a testable prototype. The most difficult parts—auto layout, variants, and system consistency—also became the strongest learning outcomes.",
    outcomes: [
      "Weekly planning became the clearest product focus.",
      "Research findings were translated into structure rather than decorative screens.",
      "Testing exposed functional gaps that static design review did not reveal.",
      "The next iteration has a specific, prioritised improvement list.",
    ],
    readOriginal: "Read original case study",
    viewPrototype: "View interactive prototype",
    archive: "Process evidence archive",
    archiveDescription:
      "Personas, interview prompts, Define notes, solution maps, and the original priority matrix remain available without interrupting the main reading flow.",
    openArchive: "Open evidence archive",
    lightboxEyebrow: "Project evidence",
    close: "Close image preview",
    lightboxHint: "Click outside or press Esc to close",
  },
  id: {
    back: "Kembali ke proyek",
    caseStudy: "FarmaGym · Cerita desain produk",
    openPrototype: "Buka prototipe",
    language: "Pilih bahasa",
    heroEyebrow: "Perencana kebugaran mobile · Design Thinking",
    heroTitleA: "Bangun rutinitas",
    heroTitleB: "yang sesuai kehidupan nyata.",
    heroDescription:
      "FarmaGym membantu pengguna merencanakan olahraga mingguan, memilih latihan, menentukan set dan durasi, serta menerima pengingat tanpa bergantung pada jadwal gym yang kaku.",
    journey: "Ikuti perjalanan produk",
    role: "Peran",
    roleValue: "UI/UX Designer",
    scope: "Cakupan",
    scopeValue: "Riset hingga usability testing",
    platform: "Platform",
    platformValue: "Aplikasi mobile",
    method: "Metode",
    methodValue: "Design Thinking",
    navTitle: "Perjalanan desain",
    nav: ["Ringkasan", "Riset", "Define", "Ideate", "Prototipe", "Validasi", "Refleksi"],
    overviewEyebrow: "Ringkasan proyek",
    overviewTitle: "Perencana kebugaran yang berpusat pada rutinitas mingguan.",
    overviewDescription:
      "Redesign memprioritaskan fitur yang paling dibutuhkan pengguna: membuat dan mempertahankan jadwal olahraga yang dapat menyesuaikan tujuan serta waktu mereka.",
    overviewRows: [
      {
        label: "Tantangan",
        value:
          "Keterbatasan waktu dan pengetahuan olahraga membuat rutinitas konsisten sulit dibangun.",
      },
      {
        label: "Tujuan produk",
        value:
          "Memperbaiki antarmuka lama dan menjadikan perencanaan olahraga mingguan sebagai pengalaman inti yang paling jelas.",
      },
      {
        label: "Tanggung jawab saya",
        value:
          "Riset menyeluruh, sintesis, flow, information architecture, desain antarmuka, prototyping, dan evaluasi.",
      },
      {
        label: "Pendekatan",
        value:
          "Empathize, Define, Ideate, Prototype, dan Test melalui proses Design Thinking yang berpusat pada pengguna.",
      },
    ],
    projectContextTitle: "Mengapa perencana mobile?",
    projectContextText:
      "Konsep ini menjawab dua hambatan praktis: sebagian orang tidak memiliki waktu untuk rutinitas gym yang tetap, dan sebagian lainnya belum mengetahui cara memilih program yang efektif. Perencana melalui ponsel membuat olahraga lebih mudah disesuaikan dengan kehidupan sehari-hari.",
    researchEyebrow: "01 · Empathize",
    researchTitle: "Pahami kehidupan di sekitar olahraga—bukan hanya aktivitas olahraganya.",
    researchDescription:
      "Observasi daring, pertanyaan wawancara, dua persona, dan referensi pendukung digunakan untuk memahami jadwal, kebiasaan makan, kepercayaan diri saat berolahraga, serta tujuan personal.",
    researchMethods: [
      {
        number: "01",
        title: "Observasi daring",
        text: "Meninjau masalah kesehatan dan kebugaran yang berulang pada calon pengguna.",
      },
      {
        number: "02",
        title: "Kerangka wawancara",
        text: "Menyiapkan pertanyaan mengenai rutinitas, makanan, pengalaman olahraga, tujuan, dan hambatan.",
      },
      {
        number: "03",
        title: "Sintesis persona",
        text: "Mengubah temuan menjadi dua pola rutinitas representatif, bukan mendesain untuk pengguna abstrak.",
      },
    ],
    personaTitle: "Dua pola rutinitas membentuk arah desain.",
    personas: [
      {
        label: "Mahasiswa dengan jadwal padat",
        title: "Ingin hidup lebih sehat, tetapi kesulitan menjaga jadwal dan konsistensi.",
        text: "Membutuhkan panduan pemula, rencana olahraga fleksibel, ide makanan sehat, dan motivasi bertahap.",
      },
      {
        label: "Mahasiswa sekaligus pekerja paruh waktu",
        title: "Deadline, makan terlambat, dan minim pengetahuan olahraga mengganggu rutinitas.",
        text: "Membutuhkan perencanaan sesuai waktu, latihan berbasis tujuan, struktur nutrisi, dan jalur progres yang sederhana.",
      },
    ],
    openResearchEvidence: "Buka bukti riset asli",
    openPersona: "Buka persona",
    viewInsight: "Lihat insight",
    selectEvidence: "Pilih bukti",
    defineEyebrow: "02 · Define",
    defineTitle: "Enam observasi diubah menjadi empat masalah produk yang dapat ditindaklanjuti.",
    defineDescription:
      "Temuan mentah dikelompokkan menjadi tema yang dapat langsung memengaruhi struktur, fitur, dan pengalaman perencanaan mingguan.",
    selectProblem: "Pilih masalah",
    userProblem: "Masalah pengguna",
    userNeed: "Kebutuhan pengguna",
    designResponse: "Respons desain",
    ideateEyebrow: "03 · Ideate",
    ideateTitle: "Ubah hambatan gaya hidup menjadi arah produk yang fokus.",
    ideateDescription:
      "Ide mencakup penjadwalan, nutrisi, edukasi pemula, pengingat, konsultasi, dan komunitas. Prioritisasi mencegah konsep berkembang menjadi aplikasi kesehatan super yang tidak fokus.",
    directionTitle: "Empat arah solusi",
    directions: [
      {
        number: "01",
        title: "Perencanaan olahraga",
        text: "Jadwal mingguan, pilihan latihan, durasi, set, dan pengingat.",
      },
      {
        number: "02",
        title: "Dukungan nutrisi",
        text: "Perencanaan menu, pemantauan kalori, dan akses konsultasi pada pengembangan berikutnya.",
      },
      {
        number: "03",
        title: "Panduan pemula",
        text: "Instruksi gerakan sederhana dan rekomendasi berdasarkan tujuan.",
      },
      {
        number: "04",
        title: "Motivasi dan komunitas",
        text: "Catatan aktivitas, dorongan rutin, dan pembelajaran bersama pengguna lain.",
      },
    ],
    priorityEyebrow: "Keputusan prioritas",
    priorityTitle: "Penjadwalan menjadi tulang punggung produk.",
    priorityText:
      "Matriks menempatkan jadwal olahraga mingguan serta pemantauan makanan dan kalori paling dekat dengan kombinasi prioritas tinggi dan kelayakan tinggi. Ide yang lebih berat secara operasional—seperti konsultasi ahli dan komunitas—tetap bernilai sebagai pengembangan lanjutan, bukan rilis pertama.",
    priorityPrimary: "Bangun lebih dahulu",
    priorityPrimaryItems: ["Jadwal olahraga mingguan", "Pemantauan makanan dan kalori"],
    prioritySecondary: "Kembangkan kemudian",
    prioritySecondaryItems: ["Pengingat", "Panduan pemula", "Komunitas", "Konsultasi gizi"],
    openIdeationEvidence: "Buka arsip ideasi",
    prototypeEyebrow: "04 · Prototype",
    prototypeTitle: "Satu panggung untuk seluruh proses desain.",
    prototypeDescription:
      "Alih-alih menumpuk semua screenshot, proses diatur dalam enam tahap yang dapat dipilih. Hanya bukti aktif yang ditampilkan, sedangkan seluruh flow dan layar akhir tetap dapat diakses.",
    selected: "Terpilih",
    viewStage: "Lihat tahap",
    openFull: "Buka gambar penuh",
    previous: "Gambar sebelumnya",
    next: "Gambar berikutnya",
    validationEyebrow: "05 · Usability testing",
    validationTitle: "Tugas mudah berhasil. Alur perencanaan inti menunjukkan pekerjaan sebenarnya.",
    validationDescription:
      "Satu partisipan berusia 21 tahun yang berpengalaman menggunakan aplikasi kebugaran mobile menyelesaikan enam tugas realistis. SEQ mengukur persepsi kemudahan dari 1 hingga 6, sedangkan severity menentukan prioritas masalah usability yang diamati.",
    tasks: "Hasil pengujian",
    task: "Tugas",
    severity: "Severity",
    seq: "SEQ",
    finding: "Temuan",
    average: "Rata-rata SEQ",
    averageValue: "5,33 / 6",
    easyTasks: "Tugas dinilai sangat mudah",
    easyTasksValue: "4 / 6",
    rating: "Penilaian partisipan",
    ratingValue: "8 / 10",
    interpretationTitle: "Makna sebenarnya dari skor",
    interpretationText:
      "Search mendapat SEQ 6 karena mudah dikenali, tetapi severity 2 karena belum dapat diaktifkan. Dua tugas inti perencanaan mendapat SEQ 4 dan severity 2, yang menunjukkan bahwa proposisi nilai utama masih membutuhkan penyempurnaan interaksi.",
    iterationEyebrow: "Rencana iterasi",
    iterationTitle: "Ubah setiap hambatan yang diamati menjadi tindakan antarmuka yang konkret.",
    iterations: [
      "Tambahkan kondisi hasil pencarian yang berfungsi.",
      "Perkecil menu titik tiga dan hubungkan dengan aksi edit serta hapus.",
      "Aktifkan kontrol detail latihan dan tambah kelengkapan daftar exercise.",
      "Perjelas urutan Create Plan serta perkuat hierarki tombol.",
      "Tingkatkan kontras teks dan warna agar lebih nyaman dibaca.",
      "Perbaiki tumpang tindih checkbox set pada halaman Start.",
      "Aktifkan perilaku durasi menggunakan transisi after delay.",
    ],
    quote:
      "Antarmuka terasa modern dan nyaman, tetapi beberapa tombol serta menu titik tiga masih perlu berfungsi seperti kontrol nyata.",
    reflectionEyebrow: "06 · Refleksi",
    reflectionTitle: "Proyek berkembang dari redesign visual menjadi keputusan produk berbasis bukti.",
    reflectionText:
      "FarmaGym mengajarkan bagaimana riset pengguna terhubung dengan flow, information architecture, design system, dan prototipe yang dapat diuji. Bagian tersulit—auto layout, variant, dan konsistensi sistem—juga menjadi hasil pembelajaran terkuat.",
    outcomes: [
      "Perencanaan mingguan menjadi fokus produk yang paling jelas.",
      "Temuan riset diterjemahkan menjadi struktur, bukan sekadar layar dekoratif.",
      "Pengujian mengungkap celah fungsi yang tidak terlihat melalui review desain statis.",
      "Iterasi berikutnya memiliki daftar perbaikan yang spesifik dan terprioritaskan.",
    ],
    readOriginal: "Baca case study asli",
    viewPrototype: "Lihat prototipe interaktif",
    archive: "Arsip bukti proses",
    archiveDescription:
      "Persona, pertanyaan wawancara, catatan Define, peta solusi, dan matriks prioritas asli tetap tersedia tanpa mengganggu alur baca utama.",
    openArchive: "Buka arsip bukti",
    lightboxEyebrow: "Bukti proyek",
    close: "Tutup pratinjau gambar",
    lightboxHint: "Klik area luar atau tekan Esc untuk menutup",
  },
} as const;

const SECTION_IDS = [
  "overview",
  "research",
  "define",
  "ideate",
  "prototype",
  "validation",
  "reflection",
] as const;

function localize(text: LocalizedText, language: Language): string {
  return text[language];
}

function FarmaGymCaseStudy() {
  const pageRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { isDark } = useTheme();

  const [language, setLanguage] = useState<Language>("en");
  const [activeSection, setActiveSection] = useState("overview");
  const [activeProblem, setActiveProblem] = useState(0);
  const [activePrototypeStage, setActivePrototypeStage] = useState("flows");
  const [prototypeIndexes, setPrototypeIndexes] = useState<Record<string, number>>({
    flows: 0,
    architecture: 0,
    "low-fidelity": 0,
    "design-system": 0,
    "high-fidelity": 0,
    prototype: 0,
  });
  const [lightbox, setLightbox] = useState<LightboxState>(null);

  const copy = COPY[language];

  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end end"],
  });

  const progressScale = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.25,
  });

  const heroY = useTransform(scrollYProgress, [0, 0.16], [0, -70]);
  const heroScale = useTransform(scrollYProgress, [0, 0.16], [1, 0.97]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0.28]);

  const activeStage =
    PROTOTYPE_STAGES.find((stage) => stage.id === activePrototypeStage) ??
    PROTOTYPE_STAGES[0];
  const activeStageIndex = prototypeIndexes[activeStage.id] ?? 0;

  const scoreAverage = useMemo(
    () => TEST_TASKS.reduce((total, item) => total + item.seq, 0) / TEST_TASKS.length,
    [],
  );

  useEffect(() => {
    const stored = window.localStorage.getItem("farmagym-language");
    if (stored === "en" || stored === "id") setLanguage(stored);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("farmagym-language", language);
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (section): section is HTMLElement => Boolean(section),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-26% 0px -58% 0px", threshold: [0.06, 0.2, 0.45] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!lightbox) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightbox(null);
      if (event.key === "ArrowLeft") moveLightbox("prev");
      if (event.key === "ArrowRight") moveLightbox("next");
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [lightbox]);

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
          (current.index + offset + current.images.length) % current.images.length,
      };
    });
  };

  const moveStageImage = (direction: "prev" | "next") => {
    const total = activeStage.images.length;
    if (total <= 1) return;
    setPrototypeIndexes((current) => {
      const index = current[activeStage.id] ?? 0;
      const next =
        direction === "next" ? (index + 1) % total : (index - 1 + total) % total;
      return { ...current, [activeStage.id]: next };
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
                onMouseDown={(event) => {
                  if (event.target === event.currentTarget) setLightbox(null);
                }}
              >
                <motion.div
                  role="dialog"
                  aria-modal="true"
                  aria-label={copy.lightboxEyebrow}
                  initial={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: 24, scale: 0.97 }
                  }
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 16, scale: 0.985 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  onMouseDown={(event) => event.stopPropagation()}
                  className="relative flex max-h-[92vh] w-full max-w-[1400px] flex-col overflow-hidden rounded-[1.75rem] border border-white/15 bg-[#080808] shadow-[0_30px_120px_rgba(0,0,0,0.9)]"
                >
                  <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 md:px-7">
                    <div className="min-w-0">
                      <p className="text-[9px] uppercase tracking-[0.3em] text-violet-200/55">
                        {copy.lightboxEyebrow}
                      </p>
                      <p className="mt-1 truncate text-sm text-white/80 md:text-base">
                        {localize(lightbox.images[lightbox.index].label, language)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setLightbox(null)}
                      aria-label={copy.close}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.05] text-white/65 transition hover:rotate-90 hover:border-violet-300/45 hover:text-white"
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
                          aria-label={copy.previous}
                          className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white/70 backdrop-blur-md transition hover:border-violet-300/50 hover:text-white md:left-7"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveLightbox("next")}
                          aria-label={copy.next}
                          className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white/70 backdrop-blur-md transition hover:border-violet-300/50 hover:text-white md:right-7"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </>
                    )}
                  </div>

                  <div className="flex items-center justify-between border-t border-white/10 px-5 py-4 md:px-7">
                    <span className="text-xs text-white/38">{copy.lightboxHint}</span>
                    <span className="font-display text-lg italic text-violet-100/70">
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
      className={`relative overflow-clip bg-bg text-text-primary ${
        isDark
          ? ""
          : "bg-white text-slate-950 [&_.text-muted]:text-slate-600 [&_.text-text-secondary]:text-slate-700 [&_.text-text-primary]:text-slate-950 [&_.border-stroke]:border-slate-200 [&_.bg-bg]:bg-white [&_.bg-surface]:bg-white [&_.bg-surface-elevated]:bg-slate-50"
      }`}
    >
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progressScale }}
        className={`fixed inset-x-0 top-0 z-[100] h-[2px] origin-left ${
          isDark
            ? "bg-gradient-to-r from-fuchsia-500 via-violet-400 to-pink-400"
            : "bg-violet-950"
        }`}
      />

      <header className="fixed inset-x-0 top-0 z-[80] px-4 pt-4 md:px-7 md:pt-6">
        <div
          className={`mx-auto flex max-w-[1440px] items-center justify-between rounded-full border px-3 py-2 backdrop-blur-2xl md:px-4 ${
            isDark
              ? "border-white/10 bg-black/55 shadow-[0_16px_58px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.08)]"
              : "border-slate-200/80 bg-white/[0.72] shadow-[0_14px_40px_rgba(15,23,42,0.08),inset_0_1px_0_rgba(255,255,255,0.96)]"
          }`}
        >
          <a
            href="/#work"
            className="group inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs text-muted transition hover:bg-surface-elevated hover:text-text-primary"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            {copy.back}
          </a>

          <span className="hidden text-[9px] uppercase tracking-[0.3em] text-muted sm:block">
            {copy.caseStudy}
          </span>

          <div className="flex items-center gap-2">
            <div
              aria-label={copy.language}
              className={`flex items-center rounded-full border p-1 ${
                isDark
                  ? "border-white/10 bg-white/[0.05]"
                  : "border-slate-200 bg-white/[0.76]"
              }`}
            >
              {(["en", "id"] as Language[]).map((option) => {
                const active = language === option;
                return (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setLanguage(option)}
                    className={`rounded-full px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.13em] transition ${
                      active
                        ? isDark
                          ? "bg-white text-black"
                          : "bg-violet-950 text-white"
                        : isDark
                          ? "text-white/45 hover:text-white"
                          : "text-slate-500 hover:text-slate-950"
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            <ThemeToggle />
            <a
              href={PROTOTYPE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden items-center gap-2 rounded-full border px-4 py-2 text-xs transition sm:inline-flex ${
                isDark
                  ? "border-fuchsia-400/30 bg-fuchsia-500/10 text-fuchsia-100/80 hover:border-fuchsia-300/55 hover:text-white"
                  : "border-violet-950 bg-violet-950 text-white hover:bg-violet-900"
              }`}
            >
              {copy.openPrototype}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </header>

      <section className="relative flex min-h-[100svh] items-center overflow-hidden px-6 pb-20 pt-32 md:px-10 lg:px-16">
        {isDark && (
          <>
            <motion.div
              aria-hidden="true"
              animate={
                prefersReducedMotion
                  ? undefined
                  : { x: [0, 30, 0], y: [0, -22, 0], opacity: [0.16, 0.28, 0.16] }
              }
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
              className="pointer-events-none absolute right-[12%] top-[20%] h-64 w-64 rounded-full bg-fuchsia-500/20 blur-[120px]"
            />
            <motion.div
              aria-hidden="true"
              animate={
                prefersReducedMotion
                  ? undefined
                  : { x: [0, -28, 0], y: [0, 20, 0], opacity: [0.1, 0.22, 0.1] }
              }
              transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
              className="pointer-events-none absolute bottom-[12%] left-[16%] h-52 w-52 rounded-full bg-violet-500/18 blur-[110px]"
            />
          </>
        )}

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
              <div className="mb-6 flex items-center gap-3">
                <span className={`h-px w-9 ${isDark ? "bg-fuchsia-400" : "bg-violet-950"}`} />
                <span
                  className={`text-[9px] uppercase tracking-[0.34em] ${
                    isDark ? "text-fuchsia-200/70" : "text-violet-950"
                  }`}
                >
                  {copy.heroEyebrow}
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.07}>
              <h1 className="max-w-4xl text-[clamp(3rem,6vw,5.8rem)] leading-[0.94] tracking-[-0.055em] text-text-primary">
                {copy.heroTitleA}
                <span
                  className={`block font-display italic ${
                    isDark ? "text-fuchsia-200" : "text-violet-950"
                  }`}
                >
                  {copy.heroTitleB}
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="mt-6 max-w-xl text-[15px] leading-7 text-text-secondary md:text-base md:leading-8">
                {copy.heroDescription}
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <dl className="mt-9 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-6 border-y border-stroke py-7 sm:grid-cols-4">
                {[
                  [copy.role, copy.roleValue],
                  [copy.scope, copy.scopeValue],
                  [copy.platform, copy.platformValue],
                  [copy.method, copy.methodValue],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-[8px] uppercase tracking-[0.22em] text-muted">
                      {label}
                    </dt>
                    <dd className="mt-2 text-sm leading-6 text-text-primary">{value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.26}>
              <a
                href="#overview"
                className="group mt-8 inline-flex items-center gap-3 text-sm text-text-secondary transition hover:text-text-primary"
              >
                {copy.journey}
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full border transition group-hover:translate-x-1 ${
                    isDark
                      ? "border-white/12 bg-white/[0.04]"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <ArrowRight className="h-4 w-4" />
                </span>
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.14} className="relative">
            <div
              className={`relative overflow-hidden rounded-[2.1rem] border p-3 md:p-4 ${
                isDark
                  ? "border-white/10 bg-black/45 shadow-[0_40px_110px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.08)]"
                  : "border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.09)]"
              }`}
            >
              <button
                type="button"
                onClick={() => openGallery([HERO_IMAGE])}
                aria-label={copy.openFull}
                className="group relative block w-full overflow-hidden rounded-[1.55rem] bg-black text-left"
              >
                <ImageWithFallback
                  image={HERO_IMAGE}
                  priority
                  className="aspect-[16/10] w-full object-cover transition duration-700 group-hover:scale-[1.02]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                <span className="absolute bottom-5 right-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white/75 backdrop-blur-md transition group-hover:scale-110">
                  <Maximize2 className="h-4 w-4" />
                </span>
              </button>
            </div>
          </Reveal>
        </motion.div>
      </section>

      <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="hidden border-r border-stroke px-5 lg:block">
          <div className="sticky top-32 py-20">
            <p className="text-[9px] uppercase tracking-[0.3em] text-muted">
              {copy.navTitle}
            </p>
            <nav className="relative mt-7" aria-label={copy.navTitle}>
              <span className="absolute bottom-3 left-[15px] top-3 w-px bg-stroke" />
              <div className="space-y-1.5">
                {SECTION_IDS.map((id, index) => {
                  const active = activeSection === id;
                  return (
                    <a
                      key={id}
                      href={`#${id}`}
                      aria-current={active ? "location" : undefined}
                      className={`group relative flex items-center gap-3 rounded-xl px-2 py-2.5 text-xs transition ${
                        active ? "text-text-primary" : "text-muted hover:text-text-primary"
                      }`}
                    >
                      <span
                        className={`relative z-10 flex h-7 w-7 items-center justify-center rounded-full border transition ${
                          active
                            ? isDark
                              ? "border-fuchsia-400 bg-fuchsia-500 text-white"
                              : "border-violet-950 bg-violet-950 text-white"
                            : "border-stroke bg-bg"
                        }`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      </span>
                      <span className="font-display italic text-[13px] opacity-55">
                        {String(index).padStart(2, "0")}
                      </span>
                      <span>{copy.nav[index]}</span>
                    </a>
                  );
                })}
              </div>
            </nav>
          </div>
        </aside>

        <main className="min-w-0 px-5 md:px-9 lg:px-12 xl:px-16">
          <section id="overview" className="scroll-mt-32 py-24 md:py-28">
            <Reveal>
              <SectionHeading
                number="00"
                eyebrow={copy.overviewEyebrow}
                title={copy.overviewTitle}
                description={copy.overviewDescription}
                isDark={isDark}
              />
            </Reveal>

            <Reveal delay={0.06}>
              <div
                className={`mt-12 overflow-hidden rounded-[1.75rem] border ${
                  isDark
                    ? "border-white/10 bg-white/[0.025]"
                    : "border-slate-200 bg-white"
                }`}
              >
                <div className="grid md:grid-cols-2">
                  {copy.overviewRows.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05, duration: 0.42 }}
                      className={`p-5 md:p-6 ${
                        index < 2 ? "border-b border-stroke" : ""
                      } ${index % 2 === 0 ? "md:border-r md:border-stroke" : ""}`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex h-7 min-w-7 items-center justify-center rounded-full text-[10px] font-semibold ${
                            isDark
                              ? "bg-fuchsia-500/15 text-fuchsia-200"
                              : "bg-violet-950 text-white"
                          }`}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <p
                          className={`text-[10px] font-semibold uppercase tracking-[0.24em] ${
                            isDark ? "text-fuchsia-300" : "text-violet-950"
                          }`}
                        >
                          {item.label}
                        </p>
                      </div>
                      <p className="mt-4 max-w-xl text-sm leading-7 text-text-secondary md:text-[15px]">
                        {item.value}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <div
                  className={`grid gap-4 border-t border-stroke px-5 py-5 md:grid-cols-[220px_1fr] md:px-6 ${
                    isDark ? "bg-black/15" : "bg-slate-50"
                  }`}
                >
                  <p
                    className={`text-[10px] font-semibold uppercase tracking-[0.26em] ${
                      isDark ? "text-fuchsia-300" : "text-violet-950"
                    }`}
                  >
                    {copy.projectContextTitle}
                  </p>
                  <p className="max-w-3xl text-sm leading-7 text-muted">
                    {copy.projectContextText}
                  </p>
                </div>
              </div>
            </Reveal>
          </section>

          <section id="research" className="scroll-mt-32 border-t border-stroke py-24 md:py-28">
            <Reveal>
              <SectionHeading
                number="01"
                eyebrow={copy.researchEyebrow}
                title={copy.researchTitle}
                description={copy.researchDescription}
                isDark={isDark}
              />
            </Reveal>

            <div className="mt-12 grid gap-8 xl:grid-cols-[0.8fr_1.2fr] xl:items-start">
              <Reveal>
                <div
                  className={`rounded-[1.5rem] border p-5 md:p-6 ${
                    isDark
                      ? "border-white/10 bg-white/[0.025]"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <p className="text-[9px] uppercase tracking-[0.28em] text-muted">
                    Research steps
                  </p>
                  <div className="relative mt-5 space-y-1">
                    <span className="absolute bottom-5 left-[17px] top-5 w-px bg-stroke" />
                    {copy.researchMethods.map((method, index) => (
                      <motion.div
                        key={method.number}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05, duration: 0.4 }}
                        className="relative grid grid-cols-[36px_1fr] gap-4 py-4"
                      >
                        <span
                          className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-full border text-xs font-semibold ${
                            isDark
                              ? "border-fuchsia-400/30 bg-[#080808] text-fuchsia-200"
                              : "border-violet-950 bg-white text-violet-950"
                          }`}
                        >
                          {method.number}
                        </span>
                        <div>
                          <h3 className="text-base font-medium tracking-[-0.015em] text-text-primary md:text-lg">
                            {method.title}
                          </h3>
                          <p className="mt-2 text-sm leading-6 text-muted">{method.text}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <div>
                  <p
                    className={`text-[9px] uppercase tracking-[0.3em] ${
                      isDark ? "text-fuchsia-300" : "text-violet-950"
                    }`}
                  >
                    {copy.personaTitle}
                  </p>
                  <div className="mt-5 grid gap-3">
                    {copy.personas.map((persona, index) => (
                      <button
                        key={persona.label}
                        type="button"
                        onClick={() => openGallery(PERSONA_IMAGES, index)}
                        className={`group grid w-full gap-4 rounded-[1.35rem] border p-5 text-left transition duration-300 sm:grid-cols-[150px_1fr_auto] sm:items-center ${
                          isDark
                            ? "border-white/10 bg-white/[0.025] hover:border-fuchsia-400/40 hover:bg-fuchsia-500/[0.06]"
                            : "border-slate-200 bg-white hover:border-violet-950 hover:bg-slate-50"
                        }`}
                      >
                        <span
                          className={`text-[10px] font-semibold uppercase tracking-[0.18em] ${
                            isDark ? "text-fuchsia-300" : "text-violet-950"
                          }`}
                        >
                          {persona.label}
                        </span>
                        <span>
                          <span className="block text-base font-medium leading-6 text-text-primary md:text-lg">
                            {persona.title}
                          </span>
                          <span className="mt-2 block text-sm leading-6 text-muted">
                            {persona.text}
                          </span>
                        </span>
                        <span className="flex items-center gap-2 text-xs font-medium text-text-primary">
                          {copy.openPersona}
                          <span
                            className={`flex h-9 w-9 items-center justify-center rounded-full border transition group-hover:translate-x-1 ${
                              isDark
                                ? "border-fuchsia-400/30 bg-fuchsia-500/10 text-fuchsia-200"
                                : "border-violet-950 bg-violet-950 text-white"
                            }`}
                          >
                            <ArrowUpRight className="h-4 w-4" />
                          </span>
                        </span>
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => openGallery(DISCOVERY_ARCHIVE)}
                    className={`mt-5 inline-flex items-center gap-3 rounded-full border px-5 py-3 text-sm font-medium transition hover:-translate-y-0.5 ${
                      isDark
                        ? "border-fuchsia-400 bg-fuchsia-500 text-white hover:bg-fuchsia-400"
                        : "border-violet-950 bg-violet-950 text-white hover:bg-violet-900"
                    }`}
                  >
                    <FileText className="h-4 w-4" />
                    {copy.openResearchEvidence}
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </Reveal>
            </div>
          </section>

          <section id="define" className="scroll-mt-32 border-t border-stroke py-24 md:py-28">
            <Reveal>
              <SectionHeading
                number="02"
                eyebrow={copy.defineEyebrow}
                title={copy.defineTitle}
                description={copy.defineDescription}
                isDark={isDark}
              />
            </Reveal>

            <div className="mt-14 grid gap-10 xl:grid-cols-[0.78fr_1.22fr]">
              <Reveal>
                <div>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-muted">
                    {copy.selectProblem}
                  </p>
                  <div className="mt-5 grid gap-2.5">
                    {PROBLEMS.map((item, index) => {
                      const active = activeProblem === index;
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.number}
                          type="button"
                          onClick={() => setActiveProblem(index)}
                          aria-pressed={active}
                          className={`group grid w-full grid-cols-[42px_1fr_auto] items-center gap-3 rounded-[1.2rem] border px-4 py-4 text-left transition duration-300 ${
                            active
                              ? isDark
                                ? "border-fuchsia-400/55 bg-fuchsia-500/12"
                                : "border-violet-950 bg-violet-50"
                              : isDark
                                ? "border-white/10 bg-white/[0.025] hover:border-fuchsia-400/35 hover:bg-fuchsia-500/[0.05]"
                                : "border-slate-200 bg-white hover:border-violet-950 hover:bg-slate-50"
                          }`}
                        >
                          <span
                            className={`font-display text-lg italic ${
                              active
                                ? isDark
                                  ? "text-fuchsia-300"
                                  : "text-violet-950"
                                : "text-muted"
                            }`}
                          >
                            {item.number}
                          </span>
                          <span>
                            <span
                              className={`block text-sm font-medium transition md:text-base ${
                                active ? "text-text-primary" : "text-text-secondary group-hover:text-text-primary"
                              }`}
                            >
                              {localize(item.title, language)}
                            </span>
                            <span
                              className={`mt-1 block text-[10px] font-semibold uppercase tracking-[0.18em] ${
                                active
                                  ? isDark
                                    ? "text-fuchsia-300"
                                    : "text-violet-950"
                                  : "text-muted"
                              }`}
                            >
                              {copy.viewInsight}
                            </span>
                          </span>
                          <span
                            className={`flex h-10 w-10 items-center justify-center rounded-full border transition group-hover:translate-x-0.5 ${
                              active
                                ? isDark
                                  ? "border-fuchsia-400 bg-fuchsia-500 text-white"
                                  : "border-violet-950 bg-violet-950 text-white"
                                : "border-stroke text-muted group-hover:text-text-primary"
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={PROBLEMS[activeProblem].number}
                    initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
                    transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                    className={`rounded-[1.75rem] border p-6 md:p-8 ${
                      isDark
                        ? "border-white/10 bg-white/[0.035]"
                        : "border-slate-200 bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-5">
                      <span
                        className={`font-display text-4xl italic ${
                          isDark ? "text-fuchsia-300" : "text-violet-950"
                        }`}
                      >
                        {PROBLEMS[activeProblem].number}
                      </span>
                      <span className="text-[9px] uppercase tracking-[0.24em] text-muted">
                        {localize(PROBLEMS[activeProblem].title, language)}
                      </span>
                    </div>

                    <div className="mt-8 divide-y divide-stroke border-y border-stroke">
                      {[
                        [copy.userProblem, localize(PROBLEMS[activeProblem].problem, language)],
                        [copy.userNeed, localize(PROBLEMS[activeProblem].need, language)],
                        [copy.designResponse, localize(PROBLEMS[activeProblem].response, language)],
                      ].map(([label, value]) => (
                        <div key={label} className="grid gap-3 py-6 md:grid-cols-[150px_1fr]">
                          <span
                            className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${
                              isDark ? "text-fuchsia-300" : "text-violet-950"
                            }`}
                          >
                            {label}
                          </span>
                          <span className="text-base leading-7 text-text-secondary md:text-lg md:leading-8">
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </Reveal>
            </div>
          </section>

          <section id="ideate" className="scroll-mt-32 border-t border-stroke py-24 md:py-28">
            <Reveal>
              <SectionHeading
                number="03"
                eyebrow={copy.ideateEyebrow}
                title={copy.ideateTitle}
                description={copy.ideateDescription}
                isDark={isDark}
              />
            </Reveal>

            <div className="mt-14 grid gap-14 xl:grid-cols-[0.82fr_1.18fr]">
              <Reveal>
                <div>
                  <p
                    className={`text-[9px] uppercase tracking-[0.3em] ${
                      isDark ? "text-fuchsia-300" : "text-violet-950"
                    }`}
                  >
                    {copy.directionTitle}
                  </p>
                  <div className="mt-6 border-y border-stroke">
                    {copy.directions.map((direction) => (
                      <div
                        key={direction.number}
                        className="grid gap-3 border-b border-stroke py-6 last:border-b-0 sm:grid-cols-[54px_180px_1fr] sm:items-start"
                      >
                        <span
                          className={`font-display text-2xl italic ${
                            isDark ? "text-fuchsia-300" : "text-violet-950"
                          }`}
                        >
                          {direction.number}
                        </span>
                        <h3 className="text-lg leading-7 text-text-primary">{direction.title}</h3>
                        <p className="text-sm leading-7 text-muted">{direction.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <div className="border-l border-stroke pl-6 md:pl-9">
                  <p
                    className={`text-[9px] uppercase tracking-[0.3em] ${
                      isDark ? "text-fuchsia-300" : "text-violet-950"
                    }`}
                  >
                    {copy.priorityEyebrow}
                  </p>
                  <h3 className="mt-5 text-3xl leading-tight tracking-[-0.04em] text-text-primary md:text-4xl">
                    {copy.priorityTitle}
                  </h3>
                  <p className="mt-5 max-w-2xl text-sm leading-7 text-muted md:text-base md:leading-8">
                    {copy.priorityText}
                  </p>

                  <div className="mt-8 grid gap-6 sm:grid-cols-2">
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.25em] text-muted">
                        {copy.priorityPrimary}
                      </p>
                      <div className="mt-4 space-y-3">
                        {copy.priorityPrimaryItems.map((item) => (
                          <div key={item} className="flex items-start gap-3">
                            <span
                              className={`mt-1 flex h-5 w-5 items-center justify-center rounded-full ${
                                isDark ? "bg-fuchsia-500 text-white" : "bg-violet-950 text-white"
                              }`}
                            >
                              <Check className="h-3 w-3" />
                            </span>
                            <span className="text-sm leading-6 text-text-secondary">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.25em] text-muted">
                        {copy.prioritySecondary}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {copy.prioritySecondaryItems.map((item) => (
                          <span
                            key={item}
                            className={`rounded-full border px-3.5 py-2 text-xs ${
                              isDark
                                ? "border-white/10 bg-white/[0.04] text-white/65"
                                : "border-slate-200 bg-slate-50 text-slate-700"
                            }`}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => openGallery(DISCOVERY_ARCHIVE, 4)}
                    className={`mt-8 inline-flex items-center gap-3 rounded-full border px-5 py-3 text-sm transition ${
                      isDark
                        ? "border-fuchsia-400/25 bg-fuchsia-500/10 text-fuchsia-100/80 hover:border-fuchsia-300/50"
                        : "border-violet-950 bg-violet-950 text-white hover:bg-violet-900"
                    }`}
                  >
                    <Sparkles className="h-4 w-4" />
                    {copy.openIdeationEvidence}
                  </button>
                </div>
              </Reveal>
            </div>
          </section>

          <section id="prototype" className="scroll-mt-32 border-t border-stroke py-24 md:py-28">
            <Reveal>
              <SectionHeading
                number="04"
                eyebrow={copy.prototypeEyebrow}
                title={copy.prototypeTitle}
                description={copy.prototypeDescription}
                isDark={isDark}
              />
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-12 border-y border-stroke py-4">
                <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {PROTOTYPE_STAGES.map((stage) => {
                    const active = stage.id === activePrototypeStage;
                    return (
                      <button
                        key={stage.id}
                        type="button"
                        onClick={() => setActivePrototypeStage(stage.id)}
                        aria-pressed={active}
                        className={`group flex shrink-0 items-center gap-3 rounded-full border px-4 py-2.5 text-sm transition ${
                          active
                            ? isDark
                              ? "border-fuchsia-400/45 bg-fuchsia-500/15 text-white"
                              : "border-violet-950 bg-violet-950 text-white"
                            : "border-stroke text-muted hover:text-text-primary"
                        }`}
                      >
                        <span className="font-display italic opacity-65">{stage.number}</span>
                        {localize(stage.label, language)}
                      </button>
                    );
                  })}
                </div>
              </div>
            </Reveal>

            <div className="mt-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStage.id}
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
                  transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                  className="grid gap-8 xl:grid-cols-[330px_minmax(0,1fr)] xl:items-start"
                >
                  <div className="xl:pt-4">
                    <p
                      className={`text-[9px] uppercase tracking-[0.28em] ${
                        isDark ? "text-fuchsia-300" : "text-violet-950"
                      }`}
                    >
                      {activeStage.number} · {localize(activeStage.label, language)}
                    </p>
                    <h3 className="mt-4 text-xl leading-snug tracking-[-0.025em] text-text-primary md:text-2xl">
                      {localize(activeStage.title, language)}
                    </h3>
                    <p className="mt-5 text-sm leading-7 text-muted">
                      {localize(activeStage.description, language)}
                    </p>

                    {activeStage.images.length > 1 && (
                      <div className="mt-7">
                        <p className="mb-3 text-[9px] uppercase tracking-[0.25em] text-muted">
                          {copy.selectEvidence}
                        </p>
                        <div className="grid gap-2">
                          {activeStage.images.map((image, index) => {
                            const active = activeStageIndex === index;
                            return (
                              <button
                                key={image.src}
                                type="button"
                                onClick={() =>
                                  setPrototypeIndexes((current) => ({
                                    ...current,
                                    [activeStage.id]: index,
                                  }))
                                }
                                aria-pressed={active}
                                className={`group flex w-full items-center justify-between gap-4 rounded-xl border px-3.5 py-3 text-left text-sm transition duration-300 ${
                                  active
                                    ? isDark
                                      ? "border-fuchsia-400/55 bg-fuchsia-500/12 text-white"
                                      : "border-violet-950 bg-violet-50 text-violet-950"
                                    : isDark
                                      ? "border-white/10 bg-white/[0.025] text-muted hover:border-fuchsia-400/35 hover:text-text-primary"
                                      : "border-slate-200 bg-white text-slate-600 hover:border-violet-950 hover:text-violet-950"
                                }`}
                              >
                                <span className="flex items-center gap-3">
                                  <span
                                    className={`flex h-7 min-w-7 items-center justify-center rounded-full text-[10px] font-semibold ${
                                      active
                                        ? isDark
                                          ? "bg-fuchsia-500 text-white"
                                          : "bg-violet-950 text-white"
                                        : "bg-surface-elevated text-muted"
                                    }`}
                                  >
                                    {String(index + 1).padStart(2, "0")}
                                  </span>
                                  <span>{localize(image.label, language)}</span>
                                </span>
                                <ChevronRight
                                  className={`h-4 w-4 transition ${
                                    active ? "translate-x-0.5" : "group-hover:translate-x-0.5"
                                  }`}
                                />
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {activeStage.prototypeUrl && (
                      <a
                        href={activeStage.prototypeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`mt-7 inline-flex items-center gap-3 rounded-full border px-5 py-3 text-sm transition ${
                          isDark
                            ? "border-fuchsia-400/30 bg-fuchsia-500/10 text-fuchsia-100/80 hover:border-fuchsia-300/55"
                            : "border-violet-950 bg-violet-950 text-white hover:bg-violet-900"
                        }`}
                      >
                        {copy.viewPrototype}
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    )}
                  </div>

                  <div
                    className={`overflow-hidden rounded-[1.8rem] border p-3 md:p-4 ${
                      isDark
                        ? "border-white/10 bg-black/30 shadow-[0_28px_90px_rgba(0,0,0,0.46)]"
                        : "border-slate-200 bg-white"
                    }`}
                  >
                    <div className="mb-4 flex items-center justify-between gap-4 px-1">
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.25em] text-muted">
                          {localize(activeStage.images[activeStageIndex].label, language)}
                        </p>
                        <p className="mt-2 text-sm text-text-primary">
                          {String(activeStageIndex + 1).padStart(2, "0")} / {String(activeStage.images.length).padStart(2, "0")}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => moveStageImage("prev")}
                          disabled={activeStage.images.length <= 1}
                          aria-label={copy.previous}
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke text-muted transition enabled:hover:text-text-primary disabled:opacity-30"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveStageImage("next")}
                          disabled={activeStage.images.length <= 1}
                          aria-label={copy.next}
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke text-muted transition enabled:hover:text-text-primary disabled:opacity-30"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => openGallery(activeStage.images, activeStageIndex)}
                      className={`group relative block w-full overflow-hidden rounded-[1.4rem] text-left ${
                        isDark ? "bg-black" : "bg-slate-50"
                      }`}
                      aria-label={copy.openFull}
                    >
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeStage.images[activeStageIndex].src}
                          initial={
                            prefersReducedMotion
                              ? { opacity: 0 }
                              : { opacity: 0, scale: 0.985, x: 18 }
                          }
                          animate={{ opacity: 1, scale: 1, x: 0 }}
                          exit={
                            prefersReducedMotion
                              ? { opacity: 0 }
                              : { opacity: 0, scale: 1.01, x: -18 }
                          }
                          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <ImageWithFallback
                            image={activeStage.images[activeStageIndex]}
                            className="aspect-[16/10] w-full object-contain transition duration-700 group-hover:scale-[1.01]"
                          />
                        </motion.div>
                      </AnimatePresence>
                      <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white/75 backdrop-blur-md">
                        <Maximize2 className="h-4 w-4" />
                      </span>
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </section>

          <section id="validation" className="scroll-mt-32 border-t border-stroke py-24 md:py-28">
            <Reveal>
              <SectionHeading
                number="05"
                eyebrow={copy.validationEyebrow}
                title={copy.validationTitle}
                description={copy.validationDescription}
                isDark={isDark}
              />
            </Reveal>

            <Reveal delay={0.06}>
              <div className="mt-12 grid gap-7 border-y border-stroke py-7 sm:grid-cols-3">
                {[
                  [copy.average, language === "id" ? "5,33 / 6" : `${scoreAverage.toFixed(2)} / 6`],
                  [copy.easyTasks, copy.easyTasksValue],
                  [copy.rating, copy.ratingValue],
                ].map(([label, value]) => (
                  <div key={label} className="border-l border-stroke pl-5">
                    <p className="text-2xl tracking-[-0.04em] text-text-primary md:text-3xl">
                      {value}
                    </p>
                    <p className="mt-2 text-[9px] uppercase tracking-[0.22em] text-muted">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-12 overflow-x-auto">
                <table className="w-full min-w-[820px] border-collapse text-left">
                  <caption className="mb-5 text-left text-[9px] uppercase tracking-[0.3em] text-muted">
                    {copy.tasks}
                  </caption>
                  <thead>
                    <tr className="border-y border-stroke text-[9px] uppercase tracking-[0.22em] text-muted">
                      <th className="py-4 pr-5 font-medium">{copy.task}</th>
                      <th className="px-5 py-4 font-medium">{copy.severity}</th>
                      <th className="px-5 py-4 font-medium">{copy.seq}</th>
                      <th className="py-4 pl-5 font-medium">{copy.finding}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TEST_TASKS.map((item, index) => (
                      <tr key={item.task.en} className="border-b border-stroke align-top">
                        <td className="py-5 pr-5">
                          <span className="mr-4 font-display italic text-muted">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="text-sm text-text-primary">
                            {localize(item.task, language)}
                          </span>
                        </td>
                        <td className="px-5 py-5">
                          <span
                            className={`inline-flex h-8 min-w-8 items-center justify-center rounded-full px-2 text-xs font-semibold ${
                              item.severity === 2
                                ? isDark
                                  ? "bg-amber-400/15 text-amber-200"
                                  : "bg-amber-100 text-amber-900"
                                : isDark
                                  ? "bg-white/[0.06] text-white/70"
                                  : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {item.severity}
                          </span>
                        </td>
                        <td className="px-5 py-5">
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-text-primary">{item.seq}</span>
                            <div className="h-1.5 w-20 overflow-hidden rounded-full bg-stroke">
                              <motion.div
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: item.seq / 6 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: index * 0.05 }}
                                className={`h-full origin-left ${
                                  isDark ? "bg-fuchsia-400" : "bg-violet-950"
                                }`}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="py-5 pl-5 text-sm leading-6 text-muted">
                          {localize(item.finding, language)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>

            <div className="mt-14 grid gap-12 xl:grid-cols-[0.86fr_1.14fr]">
              <Reveal>
                <div className="border-l border-stroke pl-6 md:pl-8">
                  <CircleAlert
                    className={`h-5 w-5 ${isDark ? "text-fuchsia-300" : "text-violet-950"}`}
                  />
                  <h3 className="mt-5 text-2xl tracking-[-0.03em] text-text-primary md:text-3xl">
                    {copy.interpretationTitle}
                  </h3>
                  <p className="mt-5 text-sm leading-7 text-muted md:text-base md:leading-8">
                    {copy.interpretationText}
                  </p>
                  <blockquote className="mt-8 font-display text-xl italic leading-8 text-text-primary md:text-2xl">
                    “{copy.quote}”
                  </blockquote>
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <div>
                  <p
                    className={`text-[9px] uppercase tracking-[0.3em] ${
                      isDark ? "text-fuchsia-300" : "text-violet-950"
                    }`}
                  >
                    {copy.iterationEyebrow}
                  </p>
                  <h3 className="mt-5 text-3xl leading-tight tracking-[-0.04em] text-text-primary">
                    {copy.iterationTitle}
                  </h3>
                  <div className="mt-7 divide-y divide-stroke border-y border-stroke">
                    {copy.iterations.map((item, index) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, x: 14 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.04, duration: 0.35 }}
                        className="grid grid-cols-[42px_1fr] gap-3 py-4"
                      >
                        <span
                          className={`font-display italic ${
                            isDark ? "text-fuchsia-300" : "text-violet-950"
                          }`}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="text-sm leading-6 text-text-secondary">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          <section id="reflection" className="scroll-mt-32 border-t border-stroke py-24 md:py-28">
            <Reveal>
              <div
                className={`relative overflow-hidden rounded-[2rem] border px-6 py-12 md:px-10 md:py-16 ${
                  isDark
                    ? "border-fuchsia-400/18 bg-fuchsia-500/[0.055]"
                    : "border-slate-200 bg-white"
                }`}
              >
                {isDark && (
                  <motion.div
                    aria-hidden="true"
                    animate={
                      prefersReducedMotion
                        ? undefined
                        : { scale: [1, 1.08, 1], opacity: [0.1, 0.2, 0.1] }
                    }
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-fuchsia-400/20 blur-[110px]"
                  />
                )}

                <div className="relative grid gap-12 xl:grid-cols-[1.05fr_0.95fr] xl:items-end">
                  <div>
                    <p
                      className={`text-[9px] uppercase tracking-[0.3em] ${
                        isDark ? "text-fuchsia-300" : "text-violet-950"
                      }`}
                    >
                      {copy.reflectionEyebrow}
                    </p>
                    <h2 className="mt-6 max-w-3xl text-[clamp(2rem,4vw,3.7rem)] leading-[1.02] tracking-[-0.045em] text-text-primary">
                      {copy.reflectionTitle}
                    </h2>
                    <p className="mt-6 max-w-2xl text-sm leading-7 text-muted md:text-base md:leading-8">
                      {copy.reflectionText}
                    </p>
                  </div>

                  <div className="divide-y divide-stroke border-y border-stroke">
                    {copy.outcomes.map((item, index) => (
                      <div key={item} className="grid grid-cols-[42px_1fr] gap-3 py-4">
                        <span
                          className={`font-display italic ${
                            isDark ? "text-fuchsia-300" : "text-violet-950"
                          }`}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="text-sm leading-6 text-text-secondary">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative mt-10 flex flex-wrap gap-3">
                  <a
                    href={PROTOTYPE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-3 rounded-full border px-5 py-3 text-sm transition ${
                      isDark
                        ? "border-fuchsia-400/30 bg-fuchsia-500/15 text-fuchsia-50 hover:border-fuchsia-300/55"
                        : "border-violet-950 bg-violet-950 text-white hover:bg-violet-900"
                    }`}
                  >
                    {copy.viewPrototype}
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                  <a
                    href={MEDIUM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 rounded-full border border-stroke bg-surface-elevated px-5 py-3 text-sm text-text-secondary transition hover:text-text-primary"
                  >
                    {copy.readOriginal}
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-10 grid gap-6 border-y border-stroke py-8 md:grid-cols-[0.75fr_1.25fr_auto] md:items-center">
                <div>
                  <p
                    className={`text-[9px] uppercase tracking-[0.3em] ${
                      isDark ? "text-fuchsia-300" : "text-violet-950"
                    }`}
                  >
                    {copy.archive}
                  </p>
                </div>
                <p className="text-sm leading-7 text-muted">{copy.archiveDescription}</p>
                <button
                  type="button"
                  onClick={() => openGallery(DISCOVERY_ARCHIVE)}
                  className="inline-flex items-center justify-center gap-3 rounded-full border border-stroke px-5 py-3 text-sm text-text-secondary transition hover:text-text-primary"
                >
                  {copy.openArchive}
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </Reveal>
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
  isDark,
}: {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  isDark: boolean;
}) {
  return (
    <div className="max-w-5xl">
      <div className="flex items-center gap-3">
        <span
          className={`font-display text-xl italic ${
            isDark ? "text-fuchsia-300" : "text-violet-950"
          }`}
        >
          {number}
        </span>
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className={`h-px w-9 origin-left ${isDark ? "bg-fuchsia-400/55" : "bg-violet-950"}`}
        />
        <span className="text-[9px] uppercase tracking-[0.3em] text-muted">
          {eyebrow}
        </span>
      </div>
      <h2 className="mt-5 max-w-4xl text-[clamp(1.85rem,3.5vw,3rem)] leading-[1.06] tracking-[-0.035em] text-text-primary">
        {title}
      </h2>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-muted md:text-[15px] md:leading-7">
        {description}
      </p>
    </div>
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
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.62, delay, ease: [0.22, 1, 0.36, 1] }}
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
  const { isDark } = useTheme();
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex min-h-[220px] items-center justify-center ${
          isDark ? "bg-white/[0.04]" : "bg-slate-50"
        } ${className}`}
      >
        <div className="max-w-sm px-6 text-center">
          <div
            className={`mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border ${
              isDark ? "border-white/10 bg-white/[0.05]" : "border-slate-200 bg-white"
            }`}
          >
            <ImageIcon className="h-5 w-5 text-muted" />
          </div>
          <p className="mt-4 text-sm text-muted">Add the project image here</p>
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
      onError={() => setHasError(true)}
      className={className}
    />
  );
}