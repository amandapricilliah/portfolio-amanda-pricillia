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
  X,
} from "lucide-react";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

// AGRIPLANT CASE STUDY — V11 · EN/ID
export const Route = createFileRoute("/agriplant")({
  component: AgriplantCaseStudy,
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

type PrototypeChapter = {
  id: string;
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  evidence: string;
  images: GalleryImage[];
};

type TestingMode = "mobile" | "desktop";
type HifiPlatform = "mobile" | "desktop";

type Language = "en" | "id";

const INDONESIAN_COPY: Record<string, string> = {
  "Overview": "Gambaran Umum",
  "Research": "Riset",
  "Synthesis": "Sintesis",
  "Solution": "Solusi",
  "Validation": "Validasi",
  "Reflection": "Refleksi",
  "Agriplant product ecosystem": "Ekosistem produk Agriplant",
  "Persona 01": "Persona 01",
  "Persona 02": "Persona 02",
  "Persona 03": "Persona 03",
  "Grouped findings 01": "Temuan terkelompok 01",
  "Grouped findings 02": "Temuan terkelompok 02",
  "Grouped findings 03": "Temuan terkelompok 03",
  "End-user architecture": "Arsitektur pengguna",
  "Admin architecture": "Arsitektur admin",
  "Authentication": "Autentikasi",
  "Local weather": "Cuaca lokal",
  "Guided planting": "Panduan menanam",
  "Planting history": "Riwayat menanam",
  "Plant-care reminder": "Pengingat perawatan",
  "Plant assistant": "Asisten tanaman",
  "Local products": "Produk lokal",
  "Dashboard": "Dasbor",
  "Manage reminders": "Kelola pengingat",
  "Manage planting": "Kelola penanaman",
  "Journey structure": "Struktur perjalanan",
  "Map the task before styling the screen.": "Petakan tugas sebelum menata tampilan.",
  "The core mobile and admin journeys were translated into task flows so every screen had a clear purpose and a predictable next action.": "Perjalanan utama pengguna dan admin diterjemahkan ke dalam task flow agar setiap layar memiliki tujuan yang jelas dan langkah berikutnya yang dapat diprediksi.",
  "Representative end-user and admin task flows": "Contoh task flow pengguna dan admin",
  "Planting task flow": "Task flow penanaman",
  "Admin management task flow": "Task flow pengelolaan admin",
  "Interface structure": "Struktur antarmuka",
  "Reduce the idea to hierarchy and action.": "Sederhanakan ide menjadi hierarki dan tindakan.",
  "Low-fidelity wireframes established navigation, page hierarchy, and essential interactions before visual decisions were introduced.": "Wireframe low-fidelity menetapkan navigasi, hierarki halaman, dan interaksi utama sebelum keputusan visual diterapkan.",
  "One mobile and one desktop wireframe": "Satu wireframe mobile dan satu desktop",
  "Mobile wireframe": "Wireframe mobile",
  "Admin wireframe": "Wireframe admin",
  "Design system": "Sistem desain",
  "One visual language across two platforms.": "Satu bahasa visual untuk dua platform.",
  "The team adapted a design-system kit and expanded it with the color, typography, spacing, icons, and components required by the Agriplant ecosystem.": "Tim mengadaptasi kit sistem desain dan mengembangkannya dengan warna, tipografi, jarak, ikon, serta komponen yang dibutuhkan ekosistem Agriplant.",
  "Mobile and desktop design-system documentation": "Dokumentasi sistem desain mobile dan desktop",
  "Mobile design system": "Sistem desain mobile",
  "Desktop design system": "Sistem desain desktop",
  "High fidelity": "High fidelity",
  "Two connected products, every core feature visible.": "Dua produk yang terhubung, seluruh fitur utama terlihat.",
  "The final interface is presented as two switchable product modes. Mobile covers the complete end-user journey, while desktop shows the operational tools used by the administrator.": "Antarmuka akhir disajikan dalam dua mode produk yang dapat dipilih. Mobile mencakup perjalanan pengguna secara lengkap, sedangkan desktop menampilkan alat operasional yang digunakan admin.",
  "7 mobile features · 4 desktop-admin features": "7 fitur mobile · 4 fitur admin desktop",
  "Connected prototype": "Prototipe terhubung",
  "Test the ecosystem as a continuous experience.": "Uji ekosistem sebagai pengalaman yang berkesinambungan.",
  "The final prototype connects the end-user and administrator experiences so key planting and management tasks can be tested as complete journeys.": "Prototipe akhir menghubungkan pengalaman pengguna dan admin agar tugas utama penanaman serta pengelolaan dapat diuji sebagai perjalanan yang utuh.",
  "Final end-user and admin prototype previews": "Pratinjau prototipe akhir pengguna dan admin",
  "End-user prototype": "Prototipe pengguna",
  "Admin prototype": "Prototipe admin",
  "Interview questions": "Pertanyaan wawancara",
  "User and admin features": "Fitur pengguna dan admin",
  "Feature overview": "Ikhtisar fitur",
  "Feature explanation": "Penjelasan fitur",
  "End-user prioritization 01": "Prioritas pengguna 01",
  "Admin prioritization 01": "Prioritas admin 01",
  "End-user prioritization 02": "Prioritas pengguna 02",
  "Admin prioritization 02": "Prioritas admin 02",
  "Remember the routine": "Ingat rutinitas",
  "Users need clear watering and fertilizing reminders so plant care does not depend on memory alone.": "Pengguna membutuhkan pengingat penyiraman dan pemupukan yang jelas agar perawatan tanaman tidak hanya bergantung pada ingatan.",
  "Understand the timing": "Pahami waktu yang tepat",
  "Local weather information helps users decide when planting and care activities should happen.": "Informasi cuaca lokal membantu pengguna menentukan waktu penanaman dan perawatan.",
  "Follow the process": "Ikuti proses",
  "Step-by-step guidance reduces uncertainty for users who are still learning how to plant.": "Panduan langkah demi langkah mengurangi keraguan bagi pengguna yang masih belajar menanam.",
  "See the progress": "Lihat perkembangan",
  "A planting history makes growth visible and helps users continue an activity they started earlier.": "Riwayat menanam membuat perkembangan terlihat dan membantu pengguna melanjutkan aktivitas sebelumnya.",
  "Memory": "Ingatan",
  "Plant care is easy to forget.": "Perawatan tanaman mudah terlupakan.",
  "Reminders need to be visible, editable, and connected to a specific plant and care activity.": "Pengingat harus terlihat, dapat diedit, dan terhubung dengan tanaman serta aktivitas perawatan tertentu.",
  "Uncertainty": "Ketidakpastian",
  "Users do not always know the next step.": "Pengguna tidak selalu mengetahui langkah berikutnya.",
  "The planting journey needs sequential instructions instead of leaving users to interpret scattered information.": "Perjalanan menanam membutuhkan instruksi berurutan, bukan informasi terpisah yang harus ditafsirkan sendiri oleh pengguna.",
  "Conditions": "Kondisi",
  "Weather changes the planting plan.": "Cuaca mengubah rencana penanaman.",
  "Local forecasts need to sit close to the activities they influence, not behave like an isolated utility.": "Prakiraan cuaca lokal perlu ditempatkan dekat dengan aktivitas yang dipengaruhinya, bukan sebagai utilitas yang terpisah.",
  "Visibility": "Visibilitas",
  "Progress is difficult to recognise over time.": "Perkembangan sulit dikenali dari waktu ke waktu.",
  "Planting history and photos should create a continuous record that users and administrators can understand quickly.": "Riwayat dan foto tanaman harus membentuk catatan berkelanjutan yang mudah dipahami pengguna maupun admin.",
  "Core journey": "Perjalanan utama",
  "Must feel effortless in the first usable version.": "Harus terasa mudah pada versi pertama yang dapat digunakan.",
  "Plant-care reminders": "Pengingat perawatan tanaman",
  "Support layer": "Lapisan pendukung",
  "Extends the journey after the core tasks are clear.": "Memperluas pengalaman setelah tugas utama sudah jelas.",
  "Agricultural products": "Produk pertanian",
  "Customer-service chatbot": "Chatbot layanan pelanggan",
  "Articles": "Artikel",
  "Admin foundation": "Fondasi admin",
  "Keeps mobile content and operations maintainable.": "Menjaga konten mobile dan operasional tetap mudah dikelola.",
  "Plant content management": "Pengelolaan konten tanaman",
  "Reminder management": "Pengelolaan pengingat",
  "Progress monitoring": "Pemantauan perkembangan",
  "Product management": "Pengelolaan produk",
  "Mobile application": "Aplikasi mobile",
  "Plant-care user": "Pengguna perawatan tanaman",
  "13 scored tasks": "13 tugas dinilai",
  "Twelve tasks had no usability issue; one image-upload task revealed a minor limitation.": "Dua belas tugas tidak memiliki masalah usability; satu tugas unggah gambar menunjukkan keterbatasan minor.",
  "SEQ 7 · Very easy": "SEQ 7 · Sangat mudah",
  "Severity 4 · No issue": "Severity 4 · Tidak ada masalah",
  "Severity 3 · Minor issue": "Severity 3 · Masalah minor",
  "Admin website": "Situs admin",
  "Admin participant": "Partisipan admin",
  "14 scored tasks": "14 tugas dinilai",
  "All tasks remained easy to complete, while seven interactions exposed minor clarity or feedback issues.": "Seluruh tugas tetap mudah diselesaikan, sementara tujuh interaksi menunjukkan masalah minor pada kejelasan atau umpan balik.",
  "SEQ 6 · Easy": "SEQ 6 · Mudah",
  "Time input required manual effort and caused hesitation.": "Input waktu membutuhkan upaya manual dan menimbulkan keraguan.",
  "Add a clear current-time option, improve time-entry affordance, and keep the field editable during reminder updates.": "Tambahkan opsi waktu saat ini yang jelas, perbaiki kemudahan input waktu, dan pertahankan kolom agar dapat diedit saat memperbarui pengingat.",
  "Admin reminder tasks": "Tugas pengingat admin",
  "Some dropdown and accordion patterns were not immediately clear.": "Beberapa pola dropdown dan accordion belum langsung dipahami.",
  "Strengthen labels, helper text, selected states, and disclosure cues so controls explain themselves before interaction.": "Perkuat label, teks bantuan, status terpilih, dan petunjuk pembuka agar kontrol dapat dipahami sebelum digunakan.",
  "Plant and product management": "Pengelolaan tanaman dan produk",
  "A destructive image action was easy to trigger accidentally.": "Tindakan penghapusan gambar mudah terpicu secara tidak sengaja.",
  "Separate the delete target from the content card and use a focused confirmation step with a safe cancel path.": "Pisahkan target hapus dari kartu konten dan gunakan langkah konfirmasi yang jelas dengan opsi batal yang aman.",
  "Admin progress-image management": "Pengelolaan gambar perkembangan oleh admin",
  "Users needed clearer feedback after uploads and edits.": "Pengguna membutuhkan umpan balik yang lebih jelas setelah unggah dan edit.",
  "Support replace/remove states for selected images and add visible success feedback after an update is saved.": "Sediakan status ganti/hapus untuk gambar terpilih dan tampilkan umpan balik keberhasilan setelah pembaruan disimpan.",
  "Mobile image upload and admin product editing": "Unggah gambar mobile dan edit produk admin",
  "Process evidence": "Bukti proses",
  "Click outside or press Esc to close": "Klik di luar atau tekan Esc untuk menutup",
  "Back to projects": "Kembali ke proyek",
  "Agriplant · Product Design Story": "Agriplant · Kisah Desain Produk",
  "Open prototype": "Buka prototipe",
  "Mobile app + admin website": "Aplikasi mobile + situs admin",
  "A connected planting ecosystem that turns weather, care reminders, guided planting, and growth tracking into one clear daily rhythm.": "Ekosistem penanaman terhubung yang menyatukan cuaca, pengingat perawatan, panduan menanam, dan pelacakan perkembangan dalam satu ritme harian yang jelas.",
  "Role": "Peran",
  "UI/UX Designer": "Desainer UI/UX",
  "Method": "Metode",
  "Design Thinking": "Design Thinking",
  "Platforms": "Platform",
  "Mobile + Desktop": "Mobile + Desktop",
  "Follow the product journey": "Ikuti perjalanan produk",
  "Growth path": "Alur pengembangan",
  "Weather": "Cuaca",
  "Plan with context": "Rencanakan sesuai kondisi",
  "Planting": "Penanaman",
  "Follow each step": "Ikuti setiap langkah",
  "Reminder": "Pengingat",
  "Care on time": "Rawat tepat waktu",
  "Project overview": "Gambaran proyek",
  "Not another plant-information app. A system for completing the routine.": "Bukan sekadar aplikasi informasi tanaman. Sebuah sistem untuk menyelesaikan rutinitas.",
  "Agriplant combines a mobile experience for planting activities with a desktop workspace that lets administrators maintain the content and operational data behind those activities.": "Agriplant menggabungkan pengalaman mobile untuk aktivitas menanam dengan ruang kerja desktop yang memungkinkan admin mengelola konten dan data operasional di balik aktivitas tersebut.",
  "Challenge": "Tantangan",
  "Make planting easier for users who need guidance, reminders, and visible progress.": "Memudahkan proses menanam bagi pengguna yang membutuhkan panduan, pengingat, dan perkembangan yang terlihat.",
  "Goal": "Tujuan",
  "Upgrade the early concept into a coherent high-fidelity mobile and desktop ecosystem.": "Mengembangkan konsep awal menjadi ekosistem mobile dan desktop high-fidelity yang konsisten.",
  "Responsibility": "Tanggung Jawab",
  "Research, synthesis, user flows, information architecture, interface design, prototyping, and usability evaluation.": "Riset, sintesis, user flow, arsitektur informasi, desain antarmuka, prototyping, dan evaluasi usability.",
  "Design Thinking: Emphatize, Define, Ideate, Prototype, and Test.": "Design Thinking: Empathize, Define, Ideate, Prototype, dan Test.",
  "How might we make plant care feel like a guided rhythm instead of a collection of separate tasks?": "Bagaimana kami dapat membuat perawatan tanaman terasa seperti ritme yang terpandu, bukan kumpulan tugas yang terpisah?",
  "End-user experience": "Pengalaman pengguna",
  "Plan, care, and continue.": "Rencanakan, rawat, dan lanjutkan.",
  "Read local weather information": "Melihat informasi cuaca lokal",
  "Create watering and fertilizing reminders": "Membuat pengingat penyiraman dan pemupukan",
  "Follow step-by-step planting guidance": "Mengikuti panduan menanam langkah demi langkah",
  "Review planting progress and history": "Melihat perkembangan dan riwayat menanam",
  "Access products, articles, and support": "Mengakses produk, artikel, dan bantuan",
  "Admin experience": "Pengalaman admin",
  "Maintain the system behind the journey.": "Kelola sistem di balik perjalanan pengguna.",
  "Manage weather and plant-care information": "Mengelola informasi cuaca dan perawatan tanaman",
  "Create and edit planting guidance": "Membuat dan mengedit panduan menanam",
  "Monitor growth records and user activity": "Memantau catatan perkembangan dan aktivitas pengguna",
  "Manage local agricultural products": "Mengelola produk pertanian lokal",
  "Identify usability and efficiency barriers": "Mengidentifikasi hambatan usability dan efisiensi",
  "Emphatize": "Empathize",
  "Observe the routine before designing the interface.": "Amati rutinitas sebelum merancang antarmuka.",
  "Online observation, interviews, and persona development were used to understand the needs, habits, motivations, pain points, and expectations surrounding everyday plant care.": "Observasi daring, wawancara, dan pengembangan persona digunakan untuk memahami kebutuhan, kebiasaan, motivasi, pain point, serta ekspektasi dalam perawatan tanaman sehari-hari.",
  "Persona spotlight": "Sorotan persona",
  "Research evidence": "Bukti riset",
  "Open interview-question documentation": "Buka dokumentasi pertanyaan wawancara",
  "Define + Ideate": "Define + Ideate",
  "Turn scattered findings into a product spine.": "Ubah temuan yang tersebar menjadi fondasi produk.",
  "The research was grouped into recurring problems and translated into a feature direction for both the end-user application and the admin website.": "Hasil riset dikelompokkan menjadi masalah berulang dan diterjemahkan menjadi arah fitur untuk aplikasi pengguna serta situs admin.",
  "Product question": "Pertanyaan produk",
  "How can one ecosystem guide both plant care and its supporting operations?": "Bagaimana satu ekosistem dapat memandu perawatan tanaman sekaligus operasional pendukungnya?",
  "Active problem root": "Akar masalah aktif",
  "Synthesis evidence": "Bukti sintesis",
  "Feature direction": "Arah fitur",
  "Prioritisation becomes easier to scan when it reads like a sequence, not four screenshots.": "Prioritas lebih mudah dipahami saat disusun sebagai rangkaian, bukan empat screenshot.",
  "The lanes below summarise the documented feature scope. The original prioritisation matrices remain available in the process archive.": "Bagian berikut merangkum ruang lingkup fitur yang terdokumentasi. Matriks prioritas asli tetap tersedia dalam arsip proses.",
  "Information architecture": "Arsitektur informasi",
  "Two interfaces, one connected content model.": "Dua antarmuka, satu model konten yang terhubung.",
  "The mobile architecture focuses on completing plant-care journeys. The desktop architecture focuses on maintaining the information and records those journeys depend on.": "Arsitektur mobile berfokus pada penyelesaian perjalanan perawatan tanaman. Arsitektur desktop berfokus pada pengelolaan informasi dan catatan yang mendukung perjalanan tersebut.",
  "Prototype": "Prototipe",
  "Every final feature is visible without turning the page into a screenshot wall.": "Setiap fitur akhir tetap terlihat tanpa membuat halaman menjadi dinding screenshot.",
  "The complete mobile-user and desktop-admin high-fidelity scope now has its own interface atlas. Supporting process artefacts remain condensed below.": "Seluruh cakupan high-fidelity untuk pengguna mobile dan admin desktop kini memiliki atlas antarmuka tersendiri. Artefak proses pendukung tetap diringkas di bawahnya.",
  "Final interface atlas · 11 documented features": "Atlas antarmuka akhir · 11 fitur terdokumentasi",
  "Explore the final design in a tighter, cleaner layout.": "Jelajahi desain akhir dalam layout yang lebih ringkas dan bersih.",
  "Pick a platform, then move feature by feature. Everything stays visible without wasting space.": "Pilih platform, lalu telusuri fitur satu per satu. Semua tetap terlihat tanpa membuang ruang.",
  "Mobile user": "Pengguna mobile",
  "Desktop admin": "Admin desktop",
  "Mobile user experience": "Pengalaman pengguna mobile",
  "Desktop admin experience": "Pengalaman admin desktop",
  "Previous high-fidelity feature": "Fitur high-fidelity sebelumnya",
  "Next high-fidelity feature": "Fitur high-fidelity berikutnya",
  "Open complete process archive": "Buka seluruh arsip proses",
  "Selected evidence": "Bukti terpilih",
  "Previous chapter image": "Gambar bab sebelumnya",
  "Next chapter image": "Gambar bab berikutnya",
  "Open interactive prototype": "Buka prototipe interaktif",
  "Read original case study": "Baca studi kasus asli",
  "Test": "Pengujian",
  "Validation turns usability findings into specific design actions.": "Validasi mengubah temuan usability menjadi tindakan desain yang spesifik.",
  "Mobile and desktop usability testing showed that the main journeys were easy to complete, while also revealing several minor interaction and feedback issues worth refining.": "Usability testing pada mobile dan desktop menunjukkan bahwa perjalanan utama mudah diselesaikan, sekaligus mengungkap beberapa masalah minor pada interaksi dan umpan balik yang perlu diperbaiki.",
  "Coverage": "Cakupan",
  "Average SEQ": "Rata-rata SEQ",
  "Average severity": "Rata-rata severity",
  "Design response": "Respons desain",
  "Minor friction became a concrete revision list.": "Hambatan minor diubah menjadi daftar revisi yang konkret.",
  "No critical or major usability problem was recorded. The useful work was therefore not a visual redesign, but focused clarification of control, feedback, and error prevention.": "Tidak ditemukan masalah usability kritis atau mayor. Karena itu, perbaikannya bukan redesign visual, melainkan penajaman kontrol, umpan balik, dan pencegahan kesalahan.",
  "Open testing documentation": "Buka dokumentasi pengujian",
  "05 · Reflection": "05 · Refleksi",
  "A case study should show decisions growing—not screenshots accumulating.": "Studi kasus seharusnya menunjukkan perkembangan keputusan—bukan sekadar menumpuk screenshot.",
  "Agriplant taught me how research, structure, interface design, and testing connect across a mobile product and an operational desktop system. The final presentation now follows that same logic: evidence appears only when it supports a decision, while interaction keeps the reader moving through the story.": "Agriplant mengajarkan saya bagaimana riset, struktur, desain antarmuka, dan pengujian saling terhubung dalam produk mobile serta sistem desktop operasional. Presentasi akhirnya mengikuti logika yang sama: bukti ditampilkan saat mendukung keputusan, sementara interaksi menjaga pembaca tetap mengikuti alur cerita.",
  "View prototype": "Lihat prototipe",
  "Back to selected projects": "Kembali ke proyek pilihan",
  "Add the project image here": "Tambahkan gambar proyek di sini",
  "Close image preview": "Tutup pratinjau gambar",
  "Previous image": "Gambar sebelumnya",
  "Next image": "Gambar berikutnya",
  "Previous persona": "Persona sebelumnya",
  "Next persona": "Persona berikutnya",
  "Agriplant process image preview": "Pratinjau gambar proses Agriplant",
  "Usability testing": "Usability testing",
  "The strongest story is not that the prototype looked finished. It is that users could finish the tasks.": "Cerita terkuatnya bukan bahwa prototipe terlihat selesai, melainkan bahwa pengguna dapat menyelesaikan tugasnya.",
  "Mobile and desktop testing used severity ratings and the Single Ease Question (SEQ) to identify usability barriers, task difficulty, and opportunities for refinement.": "Pengujian mobile dan desktop menggunakan penilaian severity serta Single Ease Question (SEQ) untuk mengidentifikasi hambatan usability, tingkat kesulitan tugas, dan peluang perbaikan.",
};

function translateCopy(value: string, language: Language): string {
  return language === "id" ? INDONESIAN_COPY[value] ?? value : value;
}


const MEDIUM_ARTICLE_URL =
  "https://medium.com/@pricilliaamanda916/mini-project-portofolio-agriculture-df75be9c0f66";

const USABILITY_TESTING_URL =
  "https://drive.google.com/drive/folders/1mWOjhBTGo4CRsenphwpLFtZKnyFcugTL?usp=sharing";

const AGRIPLANT_PROTOTYPE_URL =
  "https://www.figma.com/design/ADn6ZFxXxnCGzIkA3c88eS/Prototype-Agriplant?node-id=1-15934&t=1idOMfOZwl9L0WsE-1";

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "research", label: "Research" },
  { id: "synthesis", label: "Synthesis" },
  { id: "solution", label: "Solution" },
  { id: "validation", label: "Validation" },
  { id: "reflection", label: "Reflection" },
] as const;

const HERO_IMAGE: GalleryImage = {
  src: "/images/agriplant/agriplant-mockup.png",
  alt: "Agriplant mobile application and admin website mockup",
  label: "Agriplant product ecosystem",
};

const PERSONA_IMAGES: GalleryImage[] = [
  {
    src: "/images/agriplant/emphatize/user-persona-01.png",
    alt: "First Agriplant user persona",
    label: "Persona 01",
  },
  {
    src: "/images/agriplant/emphatize/user-persona-02.png",
    alt: "Second Agriplant user persona",
    label: "Persona 02",
  },
  {
    src: "/images/agriplant/emphatize/user-persona-03.png",
    alt: "Third Agriplant user persona",
    label: "Persona 03",
  },
];

const DEFINE_IMAGES: GalleryImage[] = [
  {
    src: "/images/agriplant/define/problem-group-01.png",
    alt: "Agriplant grouped user findings one",
    label: "Grouped findings 01",
  },
  {
    src: "/images/agriplant/define/problem-group-02.png",
    alt: "Agriplant grouped user findings two",
    label: "Grouped findings 02",
  },
  {
    src: "/images/agriplant/define/problem-group-03.png",
    alt: "Agriplant grouped user findings three",
    label: "Grouped findings 03",
  },
];

const ARCHITECTURE_IMAGES: GalleryImage[] = [
  {
    src: "/images/agriplant/ideate/information-architecture-end-user.png",
    alt: "Agriplant end-user information architecture",
    label: "End-user architecture",
  },
  {
    src: "/images/agriplant/ideate/information-architecture-admin.png",
    alt: "Agriplant administrator information architecture",
    label: "Admin architecture",
  },
];

const MOBILE_HIFI_IMAGES: GalleryImage[] = [
  {
    src: "/images/agriplant/prototype/hifi-mobile-authentication.png",
    alt: "Agriplant mobile authentication interface",
    label: "Authentication",
  },
  {
    src: "/images/agriplant/prototype/hifi-mobile-weather.png",
    alt: "Agriplant mobile local weather interface",
    label: "Local weather",
  },
  {
    src: "/images/agriplant/prototype/hifi-mobile-planting.png",
    alt: "Agriplant mobile guided planting interface",
    label: "Guided planting",
  },
  {
    src: "/images/agriplant/prototype/hifi-mobile-history.png",
    alt: "Agriplant mobile planting history interface",
    label: "Planting history",
  },
  {
    src: "/images/agriplant/prototype/hifi-mobile-reminder.png",
    alt: "Agriplant mobile watering and fertilizing reminder interface",
    label: "Plant-care reminder",
  },
  {
    src: "/images/agriplant/prototype/hifi-mobile-chatbot.png",
    alt: "Agriplant mobile customer-service chatbot interface",
    label: "Plant assistant",
  },
  {
    src: "/images/agriplant/prototype/hifi-mobile-products.png",
    alt: "Agriplant mobile local agricultural products interface",
    label: "Local products",
  },
];

const ADMIN_HIFI_IMAGES: GalleryImage[] = [
  {
    src: "/images/agriplant/prototype/hifi-admin-dashboard.png",
    alt: "Agriplant administrator dashboard",
    label: "Dashboard",
  },
  {
    src: "/images/agriplant/prototype/hifi-admin-history.png",
    alt: "Agriplant administrator planting history interface",
    label: "Planting history",
  },
  {
    src: "/images/agriplant/prototype/hifi-admin-reminder.png",
    alt: "Agriplant administrator reminder management interface",
    label: "Manage reminders",
  },
  {
    src: "/images/agriplant/prototype/hifi-admin-planting.png",
    alt: "Agriplant administrator planting management interface",
    label: "Manage planting",
  },
];

const PROTOTYPE_CHAPTERS: PrototypeChapter[] = [
  {
    id: "flows",
    number: "01",
    eyebrow: "Journey structure",
    title: "Map the task before styling the screen.",
    description:
      "The core mobile and admin journeys were translated into task flows so every screen had a clear purpose and a predictable next action.",
    evidence: "Representative end-user and admin task flows",
    images: [
      {
        src: "/images/agriplant/prototype/taskflow-end-user-planting.png",
        alt: "Agriplant end-user planting task flow",
        label: "Planting task flow",
      },
      {
        src: "/images/agriplant/prototype/taskflow-admin-planting.png",
        alt: "Agriplant admin planting management task flow",
        label: "Admin management task flow",
      },
    ],
  },
  {
    id: "wireframes",
    number: "02",
    eyebrow: "Interface structure",
    title: "Reduce the idea to hierarchy and action.",
    description:
      "Low-fidelity wireframes established navigation, page hierarchy, and essential interactions before visual decisions were introduced.",
    evidence: "One mobile and one desktop wireframe",
    images: [
      {
        src: "/images/agriplant/prototype/lofi-end-user-dashboard.png",
        alt: "Agriplant low-fidelity mobile dashboard",
        label: "Mobile wireframe",
      },
      {
        src: "/images/agriplant/prototype/lofi-admin-dashboard.png",
        alt: "Agriplant low-fidelity admin dashboard",
        label: "Admin wireframe",
      },
    ],
  },
  {
    id: "system",
    number: "03",
    eyebrow: "Design system",
    title: "One visual language across two platforms.",
    description:
      "The team adapted a design-system kit and expanded it with the color, typography, spacing, icons, and components required by the Agriplant ecosystem.",
    evidence: "Mobile and desktop design-system documentation",
    images: [
      {
        src: "/images/agriplant/prototype/design-system-mobile.png",
        alt: "Agriplant mobile design system",
        label: "Mobile design system",
      },
      {
        src: "/images/agriplant/prototype/design-system-desktop.png",
        alt: "Agriplant desktop design system",
        label: "Desktop design system",
      },
    ],
  },
  {
    id: "interfaces",
    number: "04",
    eyebrow: "High fidelity",
    title: "Two connected products, every core feature visible.",
    description:
      "The final interface is presented as two switchable product modes. Mobile covers the complete end-user journey, while desktop shows the operational tools used by the administrator.",
    evidence: "7 mobile features · 4 desktop-admin features",
    images: [...MOBILE_HIFI_IMAGES, ...ADMIN_HIFI_IMAGES],
  },
  {
    id: "prototype",
    number: "05",
    eyebrow: "Connected prototype",
    title: "Test the ecosystem as a continuous experience.",
    description:
      "The final prototype connects the end-user and administrator experiences so key planting and management tasks can be tested as complete journeys.",
    evidence: "Final end-user and admin prototype previews",
    images: [
      {
        src: "/images/agriplant/prototype/prototype-end-user.png",
        alt: "Agriplant end-user prototype preview",
        label: "End-user prototype",
      },
      {
        src: "/images/agriplant/prototype/prototype-admin.png",
        alt: "Agriplant admin prototype preview",
        label: "Admin prototype",
      },
    ],
  },
];

const PROCESS_ARCHIVE: GalleryImage[] = [
  ...PERSONA_IMAGES,
  {
    src: "/images/agriplant/emphatize/interview-questions.png",
    alt: "Agriplant interview questions",
    label: "Interview questions",
  },
  ...DEFINE_IMAGES,
  {
    src: "/images/agriplant/define/user-admin-features.png",
    alt: "Agriplant end-user and admin feature definition",
    label: "User and admin features",
  },
  {
    src: "/images/agriplant/define/feature-overview.png",
    alt: "Agriplant feature overview",
    label: "Feature overview",
  },
  {
    src: "/images/agriplant/define/feature-explanation.png",
    alt: "Agriplant feature explanation",
    label: "Feature explanation",
  },
  {
    src: "/images/agriplant/ideate/prioritization-end-user-01.png",
    alt: "Agriplant end-user prioritization matrix one",
    label: "End-user prioritization 01",
  },
  {
    src: "/images/agriplant/ideate/prioritization-admin-01.png",
    alt: "Agriplant admin prioritization matrix one",
    label: "Admin prioritization 01",
  },
  {
    src: "/images/agriplant/ideate/prioritization-end-user-02.png",
    alt: "Agriplant end-user prioritization matrix two",
    label: "End-user prioritization 02",
  },
  {
    src: "/images/agriplant/ideate/prioritization-admin-02.png",
    alt: "Agriplant admin prioritization matrix two",
    label: "Admin prioritization 02",
  },
  ...ARCHITECTURE_IMAGES,
  ...PROTOTYPE_CHAPTERS.flatMap((chapter) => chapter.images),
];

const RESEARCH_SIGNALS = [
  {
    number: "01",
    title: "Remember the routine",
    text: "Users need clear watering and fertilizing reminders so plant care does not depend on memory alone.",
  },
  {
    number: "02",
    title: "Understand the timing",
    text: "Local weather information helps users decide when planting and care activities should happen.",
  },
  {
    number: "03",
    title: "Follow the process",
    text: "Step-by-step guidance reduces uncertainty for users who are still learning how to plant.",
  },
  {
    number: "04",
    title: "See the progress",
    text: "A planting history makes growth visible and helps users continue an activity they started earlier.",
  },
];

const PROBLEM_ROOTS = [
  {
    id: "memory",
    label: "Memory",
    title: "Plant care is easy to forget.",
    detail:
      "Reminders need to be visible, editable, and connected to a specific plant and care activity.",
  },
  {
    id: "uncertainty",
    label: "Uncertainty",
    title: "Users do not always know the next step.",
    detail:
      "The planting journey needs sequential instructions instead of leaving users to interpret scattered information.",
  },
  {
    id: "conditions",
    label: "Conditions",
    title: "Weather changes the planting plan.",
    detail:
      "Local forecasts need to sit close to the activities they influence, not behave like an isolated utility.",
  },
  {
    id: "visibility",
    label: "Visibility",
    title: "Progress is difficult to recognise over time.",
    detail:
      "Planting history and photos should create a continuous record that users and administrators can understand quickly.",
  },
];

const PRIORITY_LANES = [
  {
    label: "Core journey",
    description: "Must feel effortless in the first usable version.",
    features: [
      "Local weather",
      "Plant-care reminders",
      "Guided planting",
      "Planting history",
    ],
  },
  {
    label: "Support layer",
    description: "Extends the journey after the core tasks are clear.",
    features: ["Agricultural products", "Customer-service chatbot", "Articles"],
  },
  {
    label: "Admin foundation",
    description: "Keeps mobile content and operations maintainable.",
    features: [
      "Plant content management",
      "Reminder management",
      "Progress monitoring",
      "Product management",
    ],
  },
];

const TESTING_DATA = {
  mobile: {
    label: "Mobile application",
    participant: "Plant-care user",
    tasks: "13 scored tasks",
    seq: "7.00 / 7",
    severity: "3.92 / 4",
    note: "Twelve tasks had no usability issue; one image-upload task revealed a minor limitation.",
    distribution: [
      { label: "SEQ 7 · Very easy", value: 13, total: 13 },
      { label: "Severity 4 · No issue", value: 12, total: 13 },
      { label: "Severity 3 · Minor issue", value: 1, total: 13 },
    ],
  },
  desktop: {
    label: "Admin website",
    participant: "Admin participant",
    tasks: "14 scored tasks",
    seq: "6.86 / 7",
    severity: "3.50 / 4",
    note: "All tasks remained easy to complete, while seven interactions exposed minor clarity or feedback issues.",
    distribution: [
      { label: "SEQ 7 · Very easy", value: 12, total: 14 },
      { label: "SEQ 6 · Easy", value: 2, total: 14 },
      { label: "Severity 4 · No issue", value: 7, total: 14 },
      { label: "Severity 3 · Minor issue", value: 7, total: 14 },
    ],
  },
} as const;

const VALIDATION_ACTIONS = [
  {
    number: "01",
    finding: "Time input required manual effort and caused hesitation.",
    response:
      "Add a clear current-time option, improve time-entry affordance, and keep the field editable during reminder updates.",
    source: "Admin reminder tasks",
  },
  {
    number: "02",
    finding: "Some dropdown and accordion patterns were not immediately clear.",
    response:
      "Strengthen labels, helper text, selected states, and disclosure cues so controls explain themselves before interaction.",
    source: "Plant and product management",
  },
  {
    number: "03",
    finding: "A destructive image action was easy to trigger accidentally.",
    response:
      "Separate the delete target from the content card and use a focused confirmation step with a safe cancel path.",
    source: "Admin progress-image management",
  },
  {
    number: "04",
    finding: "Users needed clearer feedback after uploads and edits.",
    response:
      "Support replace/remove states for selected images and add visible success feedback after an update is saved.",
    source: "Mobile image upload and admin product editing",
  },
];

function AgriplantCaseStudy() {
  const pageRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { isDark } = useTheme();

  const [activeSection, setActiveSection] = useState("overview");
  const [lightbox, setLightbox] = useState<LightboxState>(null);
  const [personaIndex, setPersonaIndex] = useState(0);
  const [defineIndex, setDefineIndex] = useState(0);
  const [architectureIndex, setArchitectureIndex] = useState(0);
  const [activeRoot, setActiveRoot] = useState(PROBLEM_ROOTS[0].id);
  const [activeChapter, setActiveChapter] = useState(PROTOTYPE_CHAPTERS[0].id);
  const [chapterImageIndexes, setChapterImageIndexes] = useState<
    Record<string, number>
  >(() => Object.fromEntries(PROTOTYPE_CHAPTERS.map((item) => [item.id, 0])));
  const [testingMode, setTestingMode] = useState<TestingMode>("mobile");
  const [hifiPlatform, setHifiPlatform] = useState<HifiPlatform>("mobile");
  const [language, setLanguage] = useState<Language>("en");

  const tr = (value: string) => translateCopy(value, language);

  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end end"],
  });

  const progressScale = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.25,
  });

  const heroY = useTransform(scrollYProgress, [0, 0.16], [0, -90]);
  const heroScale = useTransform(scrollYProgress, [0, 0.16], [1, 0.95]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.25]);
  const seedRotation = useTransform(scrollYProgress, [0, 0.2], [0, 22]);

  const selectedRoot =
    PROBLEM_ROOTS.find((item) => item.id === activeRoot) ?? PROBLEM_ROOTS[0];

  const selectedChapter =
    PROTOTYPE_CHAPTERS.find((item) => item.id === activeChapter) ??
    PROTOTYPE_CHAPTERS[0];

  const selectedChapterImages =
    selectedChapter.id === "interfaces"
      ? hifiPlatform === "mobile"
        ? MOBILE_HIFI_IMAGES
        : ADMIN_HIFI_IMAGES
      : selectedChapter.images;

  const selectedChapterImageKey =
    selectedChapter.id === "interfaces"
      ? `${selectedChapter.id}-${hifiPlatform}`
      : selectedChapter.id;

  const selectedChapterIndex = Math.min(
    chapterImageIndexes[selectedChapterImageKey] ?? 0,
    selectedChapterImages.length - 1,
  );

  const activeHifiImages =
    hifiPlatform === "mobile" ? MOBILE_HIFI_IMAGES : ADMIN_HIFI_IMAGES;
  const activeHifiKey = `final-interface-${hifiPlatform}`;
  const activeHifiIndex = Math.min(
    chapterImageIndexes[activeHifiKey] ?? 0,
    activeHifiImages.length - 1,
  );

  const selectedTesting = TESTING_DATA[testingMode];

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

  const movePersona = (direction: "prev" | "next") => {
    const offset = direction === "next" ? 1 : -1;
    setPersonaIndex(
      (current) =>
        (current + offset + PERSONA_IMAGES.length) % PERSONA_IMAGES.length,
    );
  };

  const moveChapterImage = (direction: "prev" | "next") => {
    const images = selectedChapterImages;
    const offset = direction === "next" ? 1 : -1;

    setChapterImageIndexes((current) => ({
      ...current,
      [selectedChapterImageKey]:
        ((current[selectedChapterImageKey] ?? 0) + offset + images.length) %
        images.length,
    }));
  };

  const moveHifiImage = (direction: "prev" | "next") => {
    const offset = direction === "next" ? 1 : -1;

    setChapterImageIndexes((current) => ({
      ...current,
      [activeHifiKey]:
        ((current[activeHifiKey] ?? 0) + offset + activeHifiImages.length) %
        activeHifiImages.length,
    }));
  };

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("agriplant-language");
    if (savedLanguage === "en" || savedLanguage === "id") {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("agriplant-language", language);
    document.documentElement.lang = language === "id" ? "id" : "en";
  }, [language]);

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
        rootMargin: "-28% 0px -58% 0px",
        threshold: [0.05, 0.2, 0.45],
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
                transition={{ duration: 0.22 }}
                onMouseDown={(event) => {
                  if (event.target === event.currentTarget) setLightbox(null);
                }}
              >
                <motion.div
                  role="dialog"
                  aria-modal="true"
                  aria-label={tr("Agriplant process image preview")}
                  initial={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: 26, scale: 0.97 }
                  }
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: 18, scale: 0.98 }
                  }
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  onMouseDown={(event) => event.stopPropagation()}
                  className="relative flex max-h-[92vh] w-full max-w-[1440px] flex-col overflow-hidden rounded-[1.75rem] border border-white/15 bg-[#07100a] shadow-[0_30px_120px_rgba(0,0,0,0.88),0_0_70px_rgba(34,197,94,0.12)]"
                >
                  <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 md:px-7">
                    <div className="min-w-0">
                      <p className="text-[9px] uppercase tracking-[0.3em] text-emerald-200/45">
                        {tr("Process evidence")}
                      </p>
                      <p className="mt-1 truncate text-sm text-white/75 md:text-base">
                        {tr(lightbox.images[lightbox.index].label)}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setLightbox(null)}
                      aria-label={tr("Close image preview")}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/[0.05] text-white/60 transition hover:rotate-90 hover:border-emerald-300/40 hover:text-white"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="relative flex min-h-0 flex-1 items-center justify-center bg-black/45 p-3 md:p-6">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={lightbox.images[lightbox.index].src}
                        initial={{ opacity: 0, x: 18 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -18 }}
                        transition={{ duration: 0.26 }}
                        className="flex h-full w-full items-center justify-center"
                      >
                        <ImageWithFallback
                          image={lightbox.images[lightbox.index]}
                          language={language}
                          className="max-h-[72vh] w-full object-contain"
                        />
                      </motion.div>
                    </AnimatePresence>

                    {lightbox.images.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={() => moveLightbox("prev")}
                          aria-label={tr("Previous image")}
                          className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white/65 backdrop-blur-md transition hover:border-emerald-300/50 hover:bg-emerald-500/20 hover:text-white md:left-7"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => moveLightbox("next")}
                          aria-label={tr("Next image")}
                          className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white/65 backdrop-blur-md transition hover:border-emerald-300/50 hover:bg-emerald-500/20 hover:text-white md:right-7"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </>
                    )}
                  </div>

                  <div className="flex items-center justify-between border-t border-white/10 px-5 py-4 text-xs text-white/35 md:px-7">
                    <span>{tr("Click outside or press Esc to close")}</span>
                    <span>
                      {String(lightbox.index + 1).padStart(2, "0")} /{" "}
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
          : "bg-white text-slate-950 [&_.text-muted]:text-slate-500 [&_.text-text-secondary]:text-slate-700 [&_.text-text-primary]:text-slate-950 [&_.border-stroke]:border-slate-200 [&_.bg-surface]:bg-white [&_.bg-surface-elevated]:bg-slate-50 [&_.bg-surface\/30]:bg-white [&_.bg-surface\/75]:bg-white/95 [&_.text-emerald-500]:text-emerald-800 [&_.text-emerald-600]:text-emerald-900 [&_.text-emerald-500\/85]:text-emerald-800 [&_.text-emerald-500\/75]:text-emerald-800 [&_.text-emerald-500\/70]:text-emerald-800\/80 [&_.text-emerald-500\/65]:text-emerald-800\/75 [&_.text-emerald-500\/45]:text-emerald-800\/55 [&_.text-emerald-400\/75]:text-emerald-800 [&_.bg-emerald-500]:bg-emerald-800 [&_.bg-emerald-500\/15]:bg-emerald-950/[0.08] [&_.bg-emerald-500\/12]:bg-emerald-950/[0.08] [&_.bg-emerald-500\/10]:bg-emerald-950/[0.06] [&_.border-emerald-500]:border-emerald-800 [&_.border-emerald-400\/55]:border-emerald-800\/35 [&_.border-emerald-400\/50]:border-emerald-800\/30 [&_.border-emerald-400\/40]:border-emerald-800\/30 [&_.border-emerald-400\/35]:border-emerald-800\/30 [&_.border-emerald-400\/30]:border-emerald-800\/25 [&_.border-emerald-400\/25]:border-emerald-800\/20"
      }`}
    >
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progressScale }}
        className={`fixed inset-x-0 top-0 z-[100] h-[2px] origin-left bg-gradient-to-r ${
          isDark
            ? "from-lime-400 via-emerald-400 to-cyan-400"
            : "from-emerald-950 via-emerald-800 to-teal-800"
        }`}
      />

      <header className="fixed inset-x-0 top-0 z-[80] px-4 pt-4 md:px-7 md:pt-6">
        <div
          className={`mx-auto flex max-w-[1440px] items-center justify-between rounded-full border border-stroke bg-surface/82 px-3 py-2 backdrop-blur-xl md:px-4 ${
            isDark
              ? "shadow-[0_16px_58px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.07)]"
              : "shadow-[0_16px_50px_rgba(65,40,53,0.13),inset_0_1px_0_rgba(255,255,255,0.92)]"
          }`}
        >
          <a
            href="/#work"
            className="group inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs text-muted transition hover:bg-surface-elevated hover:text-text-primary"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            {tr("Back to projects")}
          </a>

          <span className="hidden text-[9px] uppercase tracking-[0.3em] text-muted sm:block">
            {tr("Agriplant · Product Design Story")}
          </span>

          <div className="flex items-center gap-2">
            <div
              className={`flex items-center rounded-full border p-1 ${
                isDark
                  ? "border-white/10 bg-white/[0.04]"
                  : "border-slate-200 bg-slate-50"
              }`}
              aria-label={language === "id" ? "Pilih bahasa" : "Choose language"}
            >
              {(["en", "id"] as Language[]).map((option) => {
                const isActive = language === option;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setLanguage(option)}
                    aria-pressed={isActive}
                    className={`rounded-full px-2.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.14em] transition ${
                      isActive
                        ? isDark
                          ? "bg-white text-black"
                          : "bg-emerald-950 text-white"
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
              href={AGRIPLANT_PROTOTYPE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-xs transition hover:border-emerald-400/55 hover:bg-emerald-500/18 sm:inline-flex ${
                isDark
                  ? "text-emerald-100/75 hover:text-white"
                  : "border-emerald-900/25 bg-emerald-950/[0.04] text-emerald-900 hover:border-emerald-900/40 hover:bg-emerald-950/[0.08] hover:text-emerald-950"
              }`}
            >
              {tr("Open prototype")}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </header>

      <section className="relative min-h-[100svh] overflow-hidden px-6 pb-20 pt-32 md:px-10 lg:px-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: isDark
              ? "radial-gradient(circle at 72% 38%, rgba(34,197,94,0.18), transparent 31%), radial-gradient(circle at 20% 76%, rgba(163,230,53,0.12), transparent 33%)"
              : "radial-gradient(circle at 72% 38%, rgba(6,78,59,0.08), transparent 31%), radial-gradient(circle at 20% 76%, rgba(20,83,45,0.06), transparent 33%)",
          }}
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: isDark
              ? "linear-gradient(rgba(255,255,255,0.28) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.28) 1px, transparent 1px)"
              : "linear-gradient(rgba(79,52,67,0.13) 1px, transparent 1px), linear-gradient(90deg, rgba(79,52,67,0.13) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(circle at 68% 45%, black, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(circle at 68% 45%, black, transparent 70%)",
          }}
        />

        <motion.div
          style={
            prefersReducedMotion
              ? undefined
              : { y: heroY, scale: heroScale, opacity: heroOpacity }
          }
          className="relative mx-auto grid min-h-[calc(100svh-8rem)] w-full max-w-[1440px] items-center gap-14 lg:grid-cols-[0.86fr_1.14fr]"
        >
          <div className="relative z-10">
            <Reveal>
              <div className="mb-7 flex items-center gap-3">
                <span className="h-px w-10 bg-gradient-to-r from-emerald-400 to-transparent" />
                <span className="text-[10px] uppercase tracking-[0.38em] text-emerald-400/75">
                  {tr("Mobile app + admin website")}
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.07}>
              <h1 className="max-w-4xl text-[clamp(2.7rem,6vw,5rem)] leading-[0.94] tracking-[-0.075em] text-text-primary">
                Agri
                <span
                  className={`font-display italic ${
                    isDark ? "text-emerald-200" : "text-emerald-900"
                  }`}
                >
                  plant.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="mt-6 max-w-lg text-sm leading-7 text-text-secondary md:text-base">
                {tr(
                  "A connected planting ecosystem that turns weather, care reminders, guided planting, and growth tracking into one clear daily rhythm.",
                )}
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5 border-y border-stroke py-6">
                {[
                  ["Role", "UI/UX Designer"],
                  ["Method", "Design Thinking"],
                  ["Platforms", "Mobile + Desktop"],
                ].map(([label, value]) => (
                  <div key={label} className="min-w-[120px]">
                    <p className="text-[9px] uppercase tracking-[0.24em] text-muted">
                      {tr(label)}
                    </p>
                    <p className="mt-2 text-sm text-text-secondary">{tr(value)}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.26}>
              <a
                href="#overview"
                className="group mt-9 inline-flex items-center gap-3 text-sm text-text-secondary transition hover:text-emerald-500"
              >
                {tr("Follow the product journey")}
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-stroke bg-surface-elevated transition group-hover:rotate-45 group-hover:border-emerald-400/45">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="relative">
            <motion.div
              aria-hidden="true"
              style={prefersReducedMotion ? undefined : { rotate: seedRotation }}
              className="absolute -inset-10 rounded-full border border-emerald-400/10"
            />
            <motion.div
              aria-hidden="true"
              animate={
                prefersReducedMotion
                  ? undefined
                  : { scale: [1, 1.045, 1], opacity: [0.22, 0.4, 0.22] }
              }
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-[8%] rounded-full bg-emerald-500/20 blur-[90px]"
            />

            <div className="relative min-h-[520px] md:min-h-[620px]">
              <div className="absolute left-[3%] top-[8%] z-20 hidden md:block">
                <FloatingSignal
                  icon={CloudSun}
                  label="Weather"
                  value="Plan with context"
                  delay={0}
                  language={language}
                />
              </div>
              <div className="absolute bottom-[12%] left-[1%] z-20 hidden md:block">
                <FloatingSignal
                  icon={Sprout}
                  label="Planting"
                  value="Follow each step"
                  delay={0.8}
                  language={language}
                />
              </div>
              <div className="absolute right-[0%] top-[24%] z-20 hidden md:block">
                <FloatingSignal
                  icon={Sparkles}
                  label="Reminder"
                  value="Care on time"
                  delay={1.4}
                  language={language}
                />
              </div>

              <motion.button
                type="button"
                onClick={() => openGallery([HERO_IMAGE])}
                aria-label={language === "id" ? "Buka mockup ekosistem produk Agriplant" : "Open Agriplant product ecosystem mockup"}
                whileHover={prefersReducedMotion ? undefined : { y: -8, rotate: -0.6 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className={`group absolute inset-x-[6%] top-[8%] overflow-hidden rounded-[2.3rem] border p-3 text-left backdrop-blur-xl md:inset-x-[10%] md:top-[6%] md:p-4 ${
                  isDark
                    ? "border-stroke bg-surface/75 shadow-[0_42px_120px_rgba(0,0,0,0.72),0_0_55px_rgba(34,197,94,0.12),inset_0_1px_0_rgba(255,255,255,0.09)]"
                    : "border-white/90 bg-white/[0.84] shadow-[0_34px_90px_rgba(15,23,42,0.12),0_10px_35px_rgba(255,255,255,0.82),inset_0_1px_0_rgba(255,255,255,0.98)]"
                }`}
              >
                <div className="relative overflow-hidden rounded-[1.7rem] bg-black">
                  <ImageWithFallback
                    image={HERO_IMAGE}
                    language={language}
                    priority
                    className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-[1.025]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/48 via-transparent to-transparent" />
                  <span className="absolute bottom-5 right-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white/75 backdrop-blur-md transition group-hover:scale-110">
                    <Maximize2 className="h-4 w-4" />
                  </span>
                </div>
              </motion.button>

              <svg
                aria-hidden="true"
                viewBox="0 0 680 640"
                className="pointer-events-none absolute inset-0 h-full w-full"
              >
                <motion.path
                  d="M335 608 C330 530 360 472 325 405 C285 330 300 250 360 195 C402 157 422 111 405 48"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeDasharray="5 9"
                  className="text-emerald-400/30"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.8, delay: 0.5, ease: "easeOut" }}
                />
              </svg>
            </div>
          </Reveal>
        </motion.div>
      </section>

      <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="hidden border-r border-stroke px-6 lg:block">
          <div className="sticky top-32 py-24">
            <div className="mb-7 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-emerald-400/25 bg-emerald-500/10">
                <Leaf className="h-3.5 w-3.5 text-emerald-500" />
              </span>
              <p className="text-[9px] uppercase tracking-[0.32em] text-muted">
                {tr("Growth path")}
              </p>
            </div>

            <nav className="relative space-y-1" aria-label={language === "id" ? "Bagian studi kasus" : "Case study sections"}>
              <span className="absolute bottom-4 left-[15px] top-4 w-px bg-stroke" />
              {SECTIONS.map((section, index) => {
                const isActive = activeSection === section.id;

                return (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    aria-current={isActive ? "location" : undefined}
                    className={`group relative flex items-center gap-3 rounded-xl px-1 py-2.5 pl-0 text-xs transition ${
                      isActive
                        ? "text-text-primary"
                        : "text-muted hover:text-text-primary"
                    }`}
                  >
                    <motion.span
                      initial={false}
                      animate={{
                        scale: isActive ? 1 : 0.72,
                        backgroundColor: isActive
                          ? "rgb(16 185 129)"
                          : "rgba(120,120,120,0.22)",
                      }}
                      className="relative z-10 flex h-[30px] w-[30px] items-center justify-center rounded-full border border-stroke"
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          isActive ? "bg-white" : "bg-muted"
                        }`}
                      />
                    </motion.span>
                    <span className="font-display italic text-emerald-500/70">
                      {String(index).padStart(2, "0")}
                    </span>
                    <span>{tr(section.label)}</span>
                  </a>
                );
              })}
            </nav>
          </div>
        </aside>

        <main className="min-w-0 px-5 md:px-9 lg:px-12 xl:px-16">
          <section id="overview" className="scroll-mt-32 py-24 md:py-32">
            <Reveal>
              <SectionHeading
                number="00"
                eyebrow="Project overview"
                title="Not another plant-information app. A system for completing the routine."
                description="Agriplant combines a mobile experience for planting activities with a desktop workspace that lets administrators maintain the content and operational data behind those activities."
                language={language}
              />
            </Reveal>

            <div className="mt-16 border-y border-stroke">
              {[
                {
                  label: "Challenge",
                  value:
                    "Make planting easier for users who need guidance, reminders, and visible progress.",
                },
                {
                  label: "Goal",
                  value:
                    "Upgrade the early concept into a coherent high-fidelity mobile and desktop ecosystem.",
                },
                {
                  label: "Responsibility",
                  value:
                    "Research, synthesis, user flows, information architecture, interface design, prototyping, and usability evaluation.",
                },
                {
                  label: "Method",
                  value:
                    "Design Thinking: Emphatize, Define, Ideate, Prototype, and Test.",
                },
              ].map((item, index) => (
                <Reveal key={tr(item.label)} delay={index * 0.045}>
                  <div className="group grid gap-4 border-b border-stroke py-8 last:border-b-0 md:grid-cols-[230px_1fr] md:items-start md:gap-8">
                    <p className="pt-1 text-[13px] font-semibold uppercase tracking-[0.34em] text-emerald-600 md:text-sm">
                      {tr(item.label)}
                    </p>
                    <p className="max-w-4xl text-base leading-7 tracking-[-0.012em] text-text-secondary transition group-hover:translate-x-1 group-hover:text-text-primary md:text-lg md:leading-8">
                      {tr(item.value)}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.08}>
              <blockquote className="relative mt-16 max-w-5xl pl-8 md:pl-12">
                <span className="absolute bottom-0 left-0 top-0 w-px bg-gradient-to-b from-emerald-400 via-lime-400 to-transparent" />
                <Quote className="h-6 w-6 text-emerald-500" />
                <p className="mt-5 font-display text-[clamp(1.2rem,2.4vw,2rem)] italic leading-[1.25] tracking-[-0.03em] text-text-primary">
                  {tr(
                    "How might we make plant care feel like a guided rhythm instead of a collection of separate tasks?",
                  )}
                </p>
              </blockquote>
            </Reveal>

            <div className="mt-20 grid gap-12 xl:grid-cols-2">
              <ObjectiveStream
                icon={CloudSun}
                eyebrow="End-user experience"
                title="Plan, care, and continue."
                language={language}
                items={[
                  "Read local weather information",
                  "Create watering and fertilizing reminders",
                  "Follow step-by-step planting guidance",
                  "Review planting progress and history",
                  "Access products, articles, and support",
                ]}
              />
              <ObjectiveStream
                icon={LayoutDashboard}
                eyebrow="Admin experience"
                title="Maintain the system behind the journey."
                language={language}
                items={[
                  "Manage weather and plant-care information",
                  "Create and edit planting guidance",
                  "Monitor growth records and user activity",
                  "Manage local agricultural products",
                  "Identify usability and efficiency barriers",
                ]}
              />
            </div>
          </section>

          <section
            id="research"
            className="scroll-mt-32 border-t border-stroke py-24 md:py-32"
          >
            <Reveal>
              <SectionHeading
                number="01"
                eyebrow="Emphatize"
                title="Observe the routine before designing the interface."
                description="Online observation, interviews, and persona development were used to understand the needs, habits, motivations, pain points, and expectations surrounding everyday plant care."
                language={language}
              />
            </Reveal>

            <div className="mt-16 grid gap-12 xl:grid-cols-[0.9fr_1.1fr] xl:items-start">
              <div className="xl:sticky xl:top-32">
                <div className="relative overflow-hidden rounded-[2rem] border border-stroke bg-surface p-3 md:p-4">
                  <AnimatePresence mode="wait">
                    <motion.button
                      key={PERSONA_IMAGES[personaIndex].src}
                      type="button"
                      onClick={() => openGallery(PERSONA_IMAGES, personaIndex)}
                      initial={{ opacity: 0, clipPath: "inset(0 0 16% 0 round 1.4rem)" }}
                      animate={{
                        opacity: 1,
                        clipPath: "inset(0 0 0% 0 round 1.4rem)",
                      }}
                      exit={{ opacity: 0, clipPath: "inset(16% 0 0 0 round 1.4rem)" }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="group relative block w-full overflow-hidden rounded-[1.45rem] bg-black/5"
                    >
                      <ImageWithFallback
                        image={PERSONA_IMAGES[personaIndex]}
                        language={language}
                        className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-[1.018]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 md:p-6">
                        <div>
                          <p className="text-[9px] uppercase tracking-[0.25em] text-white/55">
                            {tr("Persona spotlight")}
                          </p>
                          <p className="mt-2 text-lg text-white">
                            {tr(PERSONA_IMAGES[personaIndex].label)}
                          </p>
                        </div>
                        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white/75 backdrop-blur-md">
                          <Maximize2 className="h-4 w-4" />
                        </span>
                      </div>
                    </motion.button>
                  </AnimatePresence>

                  <div className="flex items-center justify-between px-2 pb-1 pt-4">
                    <div className="flex gap-2">
                      {PERSONA_IMAGES.map((image, index) => (
                        <button
                          key={image.src}
                          type="button"
                          onClick={() => setPersonaIndex(index)}
                          aria-label={`${language === "id" ? "Tampilkan" : "Show"} ${tr(image.label)}`}
                          className={`h-1.5 rounded-full transition-all ${
                            personaIndex === index
                              ? "w-8 bg-emerald-500"
                              : "w-4 bg-stroke hover:bg-emerald-400/50"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => movePersona("prev")}
                        aria-label={tr("Previous persona")}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-surface-elevated text-muted transition hover:border-emerald-400/40 hover:text-text-primary"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => movePersona("next")}
                        aria-label={tr("Next persona")}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-surface-elevated text-muted transition hover:border-emerald-400/40 hover:text-text-primary"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    openGallery(
                      [
                        {
                          src: "/images/agriplant/emphatize/interview-questions.png",
                          alt: "Agriplant interview questions",
                          label: "Interview questions",
                        },
                      ],
                      0,
                    )
                  }
                  className="group mt-5 flex w-full items-center justify-between border-b border-stroke py-4 text-left"
                >
                  <span>
                    <span className="block text-[9px] uppercase tracking-[0.25em] text-emerald-500">
                      {tr("Research evidence")}
                    </span>
                    <span className="mt-2 block text-sm text-text-secondary">
                      {tr("Open interview-question documentation")}
                    </span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-emerald-500" />
                </button>
              </div>

              <div className="divide-y divide-stroke border-y border-stroke">
                {RESEARCH_SIGNALS.map((signal, index) => (
                  <Reveal key={signal.number} delay={index * 0.06}>
                    <motion.article
                      whileHover={prefersReducedMotion ? undefined : { x: 8 }}
                      transition={{ duration: 0.28 }}
                      className="grid gap-5 py-8 md:grid-cols-[72px_1fr]"
                    >
                      <span className="font-display text-2xl italic text-emerald-500/65">
                        {signal.number}
                      </span>
                      <div>
                        <h3 className="text-xl tracking-[-0.02em] text-text-primary md:text-2xl">
                          {tr(signal.title)}
                        </h3>
                        <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
                          {tr(signal.text)}
                        </p>
                      </div>
                    </motion.article>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <section
            id="synthesis"
            className="scroll-mt-32 border-t border-stroke py-24 md:py-32"
          >
            <Reveal>
              <SectionHeading
                number="02"
                eyebrow="Define + Ideate"
                title="Turn scattered findings into a product spine."
                description="The research was grouped into recurring problems and translated into a feature direction for both the end-user application and the admin website."
                language={language}
              />
            </Reveal>

            <div className="mt-16 grid gap-14 xl:grid-cols-[1.05fr_0.95fr] xl:items-center">
              <div className="relative min-h-[590px] overflow-hidden rounded-[2rem] border border-stroke bg-surface px-5 py-8 md:px-8">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-[0.055]"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, currentColor 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}
                />

                <div className="relative mx-auto flex min-h-[520px] max-w-[680px] items-center justify-center">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 680 520"
                    className="absolute inset-0 h-full w-full text-emerald-400/24"
                  >
                    {[
                      "M340 260 C250 230 190 150 120 84",
                      "M340 260 C445 205 500 145 570 86",
                      "M340 260 C235 315 180 390 104 448",
                      "M340 260 C450 315 510 388 588 448",
                    ].map((path, index) => (
                      <motion.path
                        key={path}
                        d={path}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeDasharray="5 7"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: index * 0.12 }}
                      />
                    ))}
                  </svg>

                  <motion.div
                    layout
                    className="relative z-10 w-[250px] rounded-full border border-emerald-400/30 bg-emerald-500/10 px-8 py-12 text-center backdrop-blur-xl"
                  >
                    <Sprout className="mx-auto h-6 w-6 text-emerald-500" />
                    <p className="mt-4 text-[9px] uppercase tracking-[0.27em] text-emerald-500">
                      {tr("Product question")}
                    </p>
                    <p className="mt-3 text-lg leading-7 text-text-primary">
                      {tr(
                        "How can one ecosystem guide both plant care and its supporting operations?",
                      )}
                    </p>
                  </motion.div>

                  {PROBLEM_ROOTS.map((root, index) => {
                    const positions = [
                      "left-[2%] top-[5%]",
                      "right-[1%] top-[6%]",
                      "bottom-[3%] left-[0%]",
                      "bottom-[3%] right-[0%]",
                    ];
                    const isActive = activeRoot === root.id;

                    return (
                      <motion.button
                        key={root.id}
                        type="button"
                        onClick={() => setActiveRoot(root.id)}
                        whileHover={prefersReducedMotion ? undefined : { scale: 1.035 }}
                        className={`absolute z-20 w-[185px] rounded-[1.35rem] border p-4 text-left backdrop-blur-md transition md:w-[210px] ${
                          positions[index]
                        } ${
                          isActive
                            ? "border-emerald-400/50 bg-emerald-500/15 shadow-[0_18px_60px_rgba(16,185,129,0.12)]"
                            : "border-stroke bg-surface-elevated/85 hover:border-emerald-400/30"
                        }`}
                      >
                        <span className="text-[9px] uppercase tracking-[0.23em] text-emerald-500">
                          {tr(root.label)}
                        </span>
                        <span className="mt-2 block text-sm leading-6 text-text-secondary">
                          {tr(root.title)}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              <div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedRoot.id}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.32 }}
                  >
                    <p className="text-[9px] uppercase tracking-[0.28em] text-emerald-500">
                      {tr("Active problem root")} · {tr(selectedRoot.label)}
                    </p>
                    <h3 className="mt-5 text-xl leading-snug tracking-[-0.02em] text-text-primary md:text-2xl">
                      {tr(selectedRoot.title)}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-muted">
                      {tr(selectedRoot.detail)}
                    </p>
                  </motion.div>
                </AnimatePresence>

                <div className="mt-10 border-y border-stroke py-6">
                  <p className="text-[9px] uppercase tracking-[0.25em] text-muted">
                    {tr("Synthesis evidence")}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {DEFINE_IMAGES.map((image, index) => (
                      <button
                        key={image.src}
                        type="button"
                        onClick={() => {
                          setDefineIndex(index);
                          openGallery(DEFINE_IMAGES, index);
                        }}
                        className={`rounded-full border px-4 py-2 text-xs transition ${
                          defineIndex === index
                            ? "border-emerald-500 bg-emerald-500 text-white"
                            : "border-stroke bg-surface-elevated text-muted hover:border-emerald-400/40 hover:text-text-primary"
                        }`}
                      >
                        {tr(image.label)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-24">
              <div className="grid gap-10 xl:grid-cols-[0.72fr_1.28fr] xl:items-start">
                <Reveal>
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.3em] text-emerald-500">
                      {tr("Feature direction")}
                    </p>
                    <h3 className="mt-5 text-xl leading-snug tracking-[-0.02em] text-text-primary md:text-2xl">
                      {tr(
                        "Prioritisation becomes easier to scan when it reads like a sequence, not four screenshots.",
                      )}
                    </h3>
                    <p className="mt-5 text-sm leading-7 text-muted md:text-base">
                      {tr(
                        "The lanes below summarise the documented feature scope. The original prioritisation matrices remain available in the process archive.",
                      )}
                    </p>
                  </div>
                </Reveal>

                <div
                  className={`overflow-hidden rounded-[1.75rem] border ${
                    isDark
                      ? "border-stroke bg-surface/[0.48]"
                      : "border-slate-200 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.05)]"
                  }`}
                >
                  {PRIORITY_LANES.map((lane, index) => (
                    <Reveal key={tr(lane.label)} delay={index * 0.07}>
                      <article className="grid gap-4 border-b border-stroke p-5 last:border-b-0 md:grid-cols-[72px_240px_minmax(0,1fr)] md:gap-6 md:p-6">
                        <div className="md:pt-1">
                          <span
                            className={`inline-flex h-12 min-w-[48px] items-center justify-center rounded-full px-3 text-base font-semibold ${
                              isDark
                                ? "border border-emerald-400/25 bg-emerald-500/10 text-emerald-300"
                                : "bg-emerald-950 text-white"
                            }`}
                          >
                            0{index + 1}
                          </span>
                        </div>

                        <div className="md:pt-1">
                          <h4 className="text-lg font-medium tracking-[-0.02em] text-text-primary md:text-xl">
                            {tr(lane.label)}
                          </h4>
                          <p className="mt-2 max-w-[220px] text-sm leading-6 text-muted">
                            {tr(lane.description)}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-2 md:content-start md:pt-0.5">
                          {lane.features.map((feature, featureIndex) => (
                            <motion.span
                              key={tr(feature)}
                              initial={{ opacity: 0, y: 8 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{
                                delay: featureIndex * 0.05,
                                duration: 0.3,
                              }}
                              whileHover={
                                prefersReducedMotion ? undefined : { y: -2 }
                              }
                              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm ${
                                isDark
                                  ? "border-white/10 bg-white/5 text-text-secondary"
                                  : "border-slate-200 bg-slate-50 text-slate-700"
                              }`}
                            >
                              <span
                                className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                                  isDark ? "bg-emerald-400" : "bg-emerald-800"
                                }`}
                              />
                              {tr(feature)}
                            </motion.span>
                          ))}
                        </div>
                      </article>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-20 grid gap-12 xl:grid-cols-[0.85fr_1.15fr] xl:items-center">
              <Reveal>
                <div>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-emerald-500">
                    {tr("Information architecture")}
                  </p>
                  <h3 className="mt-5 text-xl leading-snug tracking-[-0.02em] text-text-primary md:text-2xl">
                    {tr("Two interfaces, one connected content model.")}
                  </h3>
                  <p className="mt-5 text-sm leading-7 text-muted md:text-base">
                    {tr(
                      "The mobile architecture focuses on completing plant-care journeys. The desktop architecture focuses on maintaining the information and records those journeys depend on.",
                    )}
                  </p>
                  <div className="mt-7 flex gap-2">
                    {ARCHITECTURE_IMAGES.map((image, index) => (
                      <button
                        key={image.src}
                        type="button"
                        onClick={() => setArchitectureIndex(index)}
                        className={`rounded-full border px-4 py-2 text-xs transition ${
                          architectureIndex === index
                            ? "border-emerald-500 bg-emerald-500 text-white"
                            : "border-stroke bg-surface-elevated text-muted hover:border-emerald-400/40 hover:text-text-primary"
                        }`}
                      >
                        {tr(image.label)}
                      </button>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <button
                  type="button"
                  onClick={() =>
                    openGallery(ARCHITECTURE_IMAGES, architectureIndex)
                  }
                  className="group relative block w-full overflow-hidden rounded-[2rem] border border-stroke bg-surface p-3 text-left md:p-4"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={ARCHITECTURE_IMAGES[architectureIndex].src}
                      initial={{ opacity: 0, scale: 0.985 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.01 }}
                      transition={{ duration: 0.35 }}
                      className="overflow-hidden rounded-[1.45rem] bg-black/5"
                    >
                      <ImageWithFallback
                        image={ARCHITECTURE_IMAGES[architectureIndex]}
                        language={language}
                        className="aspect-[16/10] w-full object-contain transition duration-700 group-hover:scale-[1.015]"
                      />
                    </motion.div>
                  </AnimatePresence>
                  <span className="absolute bottom-7 right-7 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white/75 backdrop-blur-md">
                    <Maximize2 className="h-4 w-4" />
                  </span>
                </button>
              </Reveal>
            </div>
          </section>

          <section
            id="solution"
            className="scroll-mt-32 border-t border-stroke py-24 md:py-32"
          >
            <Reveal>
              <SectionHeading
                number="03"
                eyebrow="Prototype"
                title="Every final feature is visible without turning the page into a screenshot wall."
                description="The complete mobile-user and desktop-admin high-fidelity scope now has its own interface atlas. Supporting process artefacts remain condensed below."
                language={language}
              />
            </Reveal>

            <Reveal delay={0.06}>
              <div className="mt-12 rounded-[1.5rem] border border-stroke bg-surface/30 p-5 md:p-6 xl:p-7">
                <div className="grid gap-6 xl:grid-cols-[260px_minmax(0,1fr)] xl:items-start">
                  <div className="xl:pr-2">
                    <p className="text-[9px] uppercase tracking-[0.3em] text-emerald-500">
                      {tr("Final interface atlas · 11 documented features")}
                    </p>
                    <h3 className="mt-4 max-w-sm text-xl leading-snug tracking-[-0.02em] text-text-primary md:text-2xl">
                      {tr("Explore the final design in a tighter, cleaner layout.")}
                    </h3>
                    <p className="mt-3 max-w-sm text-sm leading-6 text-muted">
                      {tr(
                        "Pick a platform, then move feature by feature. Everything stays visible without wasting space.",
                      )}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2 xl:mt-6">
                      {(["mobile", "desktop"] as HifiPlatform[]).map((platform) => {
                        const isActive = hifiPlatform === platform;
                        const count =
                          platform === "mobile"
                            ? MOBILE_HIFI_IMAGES.length
                            : ADMIN_HIFI_IMAGES.length;

                        return (
                          <button
                            key={platform}
                            type="button"
                            onClick={() => setHifiPlatform(platform)}
                            className={`rounded-full border px-4 py-2 text-xs transition ${
                              isActive
                                ? "border-emerald-500 bg-emerald-500 text-white"
                                : "border-stroke bg-surface-elevated text-muted hover:border-emerald-400/40 hover:text-text-primary"
                            }`}
                          >
                            {platform === "mobile"
                              ? `${tr("Mobile user")} · ${count}`
                              : `${tr("Desktop admin")} · ${count}`}
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-6 flex gap-2 overflow-x-auto pb-1 xl:mt-7 xl:block xl:space-y-1.5 xl:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                      {activeHifiImages.map((image, index) => {
                        const isActive = activeHifiIndex === index;

                        return (
                          <button
                            key={image.src}
                            type="button"
                            onClick={() =>
                              setChapterImageIndexes((current) => ({
                                ...current,
                                [activeHifiKey]: index,
                              }))
                            }
                            className={`group flex shrink-0 items-center gap-3 rounded-2xl border px-3.5 py-3 text-left transition xl:w-full ${
                              isActive
                                ? "border-emerald-400/50 bg-emerald-500/10 text-text-primary"
                                : "border-transparent text-muted hover:border-stroke hover:bg-surface-elevated hover:text-text-primary"
                            }`}
                          >
                            <span
                              className={`font-display text-base italic ${
                                isActive
                                  ? "text-emerald-500"
                                  : "text-emerald-500/45"
                              }`}
                            >
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <span className="whitespace-nowrap text-xs lg:text-sm xl:whitespace-normal">
                              {tr(image.label)}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div
                    className={`relative overflow-hidden rounded-[2rem] border border-stroke bg-surface p-3 md:p-4 ${
                      isDark
                        ? "shadow-[0_28px_90px_rgba(0,0,0,0.4)]"
                        : "shadow-[0_24px_80px_rgba(65,40,53,0.1)]"
                    }`}
                  >
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-3 px-1">
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.24em] text-emerald-500">
                          {hifiPlatform === "mobile"
                            ? tr("Mobile user experience")
                            : tr("Desktop admin experience")}
                        </p>
                        <p className="mt-2 text-lg tracking-[-0.02em] text-text-primary md:text-xl">
                          {tr(activeHifiImages[activeHifiIndex].label)}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="rounded-full border border-stroke bg-surface-elevated px-3 py-1.5 text-xs text-muted">
                          {String(activeHifiIndex + 1).padStart(2, "0")} / {String(activeHifiImages.length).padStart(2, "0")}
                        </span>
                        <button
                          type="button"
                          onClick={() => moveHifiImage("prev")}
                          aria-label={tr("Previous high-fidelity feature")}
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-surface-elevated text-muted transition hover:border-emerald-400/40 hover:text-text-primary"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveHifiImage("next")}
                          aria-label={tr("Next high-fidelity feature")}
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-surface-elevated text-muted transition hover:border-emerald-400/40 hover:text-text-primary"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => openGallery(activeHifiImages, activeHifiIndex)}
                      className="group relative block w-full overflow-hidden rounded-[1.5rem] bg-black/5 text-left"
                    >
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeHifiImages[activeHifiIndex].src}
                          initial={
                            prefersReducedMotion
                              ? { opacity: 0 }
                              : {
                                  opacity: 0,
                                  scale: 0.985,
                                  clipPath: "inset(0 0 12% 0 round 1.5rem)",
                                }
                          }
                          animate={{
                            opacity: 1,
                            scale: 1,
                            clipPath: "inset(0 0 0% 0 round 1.5rem)",
                          }}
                          exit={
                            prefersReducedMotion
                              ? { opacity: 0 }
                              : {
                                  opacity: 0,
                                  scale: 1.01,
                                  clipPath: "inset(12% 0 0 0 round 1.5rem)",
                                }
                          }
                          transition={{
                            duration: 0.46,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        >
                          <ImageWithFallback
                            image={activeHifiImages[activeHifiIndex]}
                            language={language}
                            className="aspect-[16/10] w-full object-contain transition duration-700 group-hover:scale-[1.01]"
                          />
                        </motion.div>
                      </AnimatePresence>

                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/52 via-transparent to-transparent" />
                      <div className="pointer-events-none absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/75 backdrop-blur-md">
                        <Maximize2 className="h-4 w-4" />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="mt-16 grid gap-12 xl:grid-cols-[0.72fr_1.28fr] xl:items-start">
              <div className="xl:sticky xl:top-28">
                <div className="relative border-l border-stroke pl-5">
                  <motion.span
                    layoutId="chapter-marker"
                    className="absolute -left-[2px] top-0 h-12 w-[3px] rounded-full bg-emerald-500"
                    style={{
                      y:
                        PROTOTYPE_CHAPTERS.findIndex(
                          (item) => item.id === activeChapter,
                        ) * 76,
                    }}
                    transition={{ type: "spring", stiffness: 280, damping: 30 }}
                  />
                  {PROTOTYPE_CHAPTERS.map((chapter) => {
                    const isActive = chapter.id === activeChapter;
                    return (
                      <button
                        key={chapter.id}
                        type="button"
                        onClick={() => setActiveChapter(chapter.id)}
                        className={`flex min-h-[76px] w-full items-center gap-4 text-left transition ${
                          isActive
                            ? "text-text-primary"
                            : "text-muted hover:text-text-primary"
                        }`}
                      >
                        <span
                          className={`font-display text-xl italic ${
                            isActive
                              ? "text-emerald-500"
                              : "text-emerald-500/45"
                          }`}
                        >
                          {chapter.number}
                        </span>
                        <span>
                          <span className="block text-[9px] uppercase tracking-[0.23em] text-muted">
                            {tr(chapter.eyebrow)}
                          </span>
                          <span className="mt-1 block text-sm">
                            {tr(chapter.title)}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => openGallery(PROCESS_ARCHIVE, 0)}
                  className="group mt-8 inline-flex items-center gap-3 text-sm text-text-secondary transition hover:text-emerald-500"
                >
                  {tr("Open complete process archive")}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </button>
              </div>

              <div className="min-w-0">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedChapter.id}
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -18 }}
                    transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-end">
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.28em] text-emerald-500">
                          {tr(selectedChapter.eyebrow)}
                        </p>
                        <h3 className="mt-4 text-xl leading-snug tracking-[-0.02em] text-text-primary md:text-2xl">
                          {tr(selectedChapter.title)}
                        </h3>
                      </div>
                      <div>
                        <p className="text-sm leading-7 text-muted md:text-base">
                          {tr(selectedChapter.description)}
                        </p>
                        <p className="mt-3 text-xs text-emerald-500/85">
                          {tr(selectedChapter.evidence)}
                        </p>
                      </div>
                    </div>

                    {selectedChapter.id === "interfaces" && (
                      <div className="mt-8 flex flex-wrap items-center gap-2">
                        {(["mobile", "desktop"] as HifiPlatform[]).map(
                          (platform) => {
                            const isActive = hifiPlatform === platform;
                            const featureCount =
                              platform === "mobile"
                                ? MOBILE_HIFI_IMAGES.length
                                : ADMIN_HIFI_IMAGES.length;

                            return (
                              <button
                                key={platform}
                                type="button"
                                onClick={() => setHifiPlatform(platform)}
                                className={`rounded-full border px-4 py-2.5 text-xs transition md:text-sm ${
                                  isActive
                                    ? "border-emerald-500 bg-emerald-500 text-white"
                                    : "border-stroke bg-surface-elevated text-muted hover:border-emerald-400/40 hover:text-text-primary"
                                }`}
                              >
                                {platform === "mobile"
                                  ? `${tr("Mobile user")} · ${featureCount} ${language === "id" ? "fitur" : "features"}`
                                  : `${tr("Desktop admin")} · ${featureCount} ${language === "id" ? "fitur" : "features"}`}
                              </button>
                            );
                          },
                        )}
                      </div>
                    )}

                    <div
                      className={`relative mt-9 overflow-hidden rounded-[2.2rem] border border-stroke bg-surface p-3 md:p-4 ${
                        isDark
                          ? "shadow-[0_34px_110px_rgba(0,0,0,0.44)]"
                          : "shadow-[0_30px_90px_rgba(65,40,53,0.11)]"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          openGallery(
                            selectedChapterImages,
                            selectedChapterIndex,
                          )
                        }
                        className="group relative block w-full overflow-hidden rounded-[1.65rem] bg-black/5 text-left"
                      >
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={
                              selectedChapterImages[selectedChapterIndex].src
                            }
                            initial={{
                              opacity: 0,
                              x: 40,
                              clipPath: "inset(0 14% 0 0 round 1.65rem)",
                            }}
                            animate={{
                              opacity: 1,
                              x: 0,
                              clipPath: "inset(0 0% 0 0 round 1.65rem)",
                            }}
                            exit={{
                              opacity: 0,
                              x: -30,
                              clipPath: "inset(0 0 0 14% round 1.65rem)",
                            }}
                            transition={{
                              duration: 0.42,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                          >
                            <ImageWithFallback
                              image={
                                selectedChapterImages[selectedChapterIndex]
                              }
                              language={language}
                              className="aspect-[16/10] w-full object-contain transition duration-700 group-hover:scale-[1.018]"
                            />
                          </motion.div>
                        </AnimatePresence>

                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 md:p-6">
                          <div>
                            <p className="text-[9px] uppercase tracking-[0.24em] text-white/55">
                              {tr("Selected evidence")}
                            </p>
                            <p className="mt-2 text-base text-white">
                              {
                                tr(
                                  selectedChapterImages[selectedChapterIndex]
                                    .label,
                                )
                              }
                            </p>
                          </div>
                          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/75 backdrop-blur-md">
                            <Maximize2 className="h-4 w-4" />
                          </span>
                        </div>
                      </button>

                      <div className="flex items-center justify-between px-2 pb-1 pt-4">
                        <div className="flex min-w-0 flex-1 gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                          {selectedChapterImages.map((image, index) => (
                            <button
                              key={image.src}
                              type="button"
                              onClick={() =>
                                setChapterImageIndexes((current) => ({
                                  ...current,
                                  [selectedChapterImageKey]: index,
                                }))
                              }
                              className={`shrink-0 rounded-full border px-3.5 py-2 text-xs transition ${
                                selectedChapterIndex === index
                                  ? "border-emerald-500 bg-emerald-500 text-white"
                                  : "border-stroke bg-surface-elevated text-muted hover:border-emerald-400/40 hover:text-text-primary"
                              }`}
                            >
                              {tr(image.label)}
                            </button>
                          ))}
                        </div>

                        {selectedChapterImages.length > 1 && (
                          <div className="ml-4 hidden shrink-0 gap-2 sm:flex">
                            <button
                              type="button"
                              onClick={() => moveChapterImage("prev")}
                              aria-label={tr("Previous chapter image")}
                              className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-surface-elevated text-muted transition hover:border-emerald-400/40 hover:text-text-primary"
                            >
                              <ChevronLeft className="h-4 w-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => moveChapterImage("next")}
                              aria-label={tr("Next chapter image")}
                              className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-surface-elevated text-muted transition hover:border-emerald-400/40 hover:text-text-primary"
                            >
                              <ChevronRight className="h-4 w-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={AGRIPLANT_PROTOTYPE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 rounded-full border border-emerald-400/35 bg-emerald-500/12 px-5 py-3 text-sm text-text-primary transition hover:-translate-y-1 hover:border-emerald-400/60 hover:bg-emerald-500/20"
                  >
                    {tr("Open interactive prototype")}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                  <a
                    href={MEDIUM_ARTICLE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 rounded-full border border-stroke bg-surface-elevated px-5 py-3 text-sm text-text-secondary transition hover:-translate-y-1 hover:border-emerald-400/35 hover:text-text-primary"
                  >
                    {tr("Read original case study")}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section
            id="validation"
            className="scroll-mt-32 border-t border-stroke py-24 md:py-32"
          >
            <Reveal>
              <SectionHeading
                number="04"
                eyebrow="Usability testing"
                title="The strongest story is not that the prototype looked finished. It is that users could finish the tasks."
                description="Mobile and desktop testing used severity ratings and the Single Ease Question (SEQ) to identify usability barriers, task difficulty, and opportunities for refinement."
                language={language}
              />
            </Reveal>

            <div className="mt-14 flex flex-wrap gap-2">
              {(["mobile", "desktop"] as TestingMode[]).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setTestingMode(mode)}
                  className={`rounded-full border px-5 py-2.5 text-sm transition ${
                    testingMode === mode
                      ? "border-emerald-500 bg-emerald-500 text-white"
                      : "border-stroke bg-surface-elevated text-muted hover:border-emerald-400/40 hover:text-text-primary"
                  }`}
                >
                  {tr(TESTING_DATA[mode].label)}
                </button>
              ))}
            </div>

            <div className="mt-10 grid gap-12 xl:grid-cols-[0.82fr_1.18fr] xl:items-start">
              <div className="xl:sticky xl:top-32">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={testingMode}
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.34 }}
                  >
                    <p className="text-[9px] uppercase tracking-[0.28em] text-emerald-500">
                      {tr(selectedTesting.participant)}
                    </p>
                    <h3 className="mt-3 text-2xl tracking-[-0.03em] text-text-primary md:text-3xl">
                      {tr(selectedTesting.label)}
                    </h3>
                    <p className="mt-5 max-w-xl text-sm leading-7 text-muted md:text-base">
                      {tr(selectedTesting.note)}
                    </p>

                    <div className="mt-9 grid grid-cols-3 gap-4 border-y border-stroke py-6">
                      <Metric value={tr(selectedTesting.tasks)} label="Coverage" language={language} />
                      <Metric value={selectedTesting.seq} label="Average SEQ" language={language} />
                      <Metric
                        value={selectedTesting.severity}
                        label="Average severity"
                        language={language}
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${testingMode}-bars`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-7 border-y border-stroke py-8"
                >
                  {selectedTesting.distribution.map((item, index) => (
                    <div key={tr(item.label)}>
                      <div className="flex items-end justify-between gap-4">
                        <span className="text-sm text-text-secondary">
                          {tr(item.label)}
                        </span>
                        <span className="font-display text-2xl italic text-emerald-500">
                          {item.value}/{item.total}
                        </span>
                      </div>
                      <div className="mt-3 h-[5px] overflow-hidden rounded-full bg-stroke">
                        <motion.div
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: item.value / item.total }}
                          transition={{
                            duration: 0.75,
                            delay: index * 0.08,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="h-full origin-left rounded-full bg-gradient-to-r from-emerald-500 via-lime-400 to-cyan-400"
                        />
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-24 grid gap-10 xl:grid-cols-[0.7fr_1.3fr] xl:items-start">
              <Reveal>
                <div>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-emerald-500">
                    {tr("Design response")}
                  </p>
                  <h3 className="mt-5 text-xl leading-snug tracking-[-0.02em] text-text-primary md:text-2xl">
                    {tr("Minor friction became a concrete revision list.")}
                  </h3>
                  <p className="mt-5 text-sm leading-7 text-muted md:text-base">
                    {tr(
                      "No critical or major usability problem was recorded. The useful work was therefore not a visual redesign, but focused clarification of control, feedback, and error prevention.",
                    )}
                  </p>
                  <a
                    href={USABILITY_TESTING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-7 inline-flex items-center gap-3 text-sm text-text-secondary transition hover:text-emerald-500"
                  >
                    {tr("Open testing documentation")}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </div>
              </Reveal>

              <div className="divide-y divide-stroke border-y border-stroke">
                {VALIDATION_ACTIONS.map((action, index) => (
                  <Reveal key={action.number} delay={index * 0.06}>
                    <article className="grid gap-5 py-8 md:grid-cols-[64px_1fr]">
                      <span className="font-display text-2xl italic text-emerald-500/65">
                        {action.number}
                      </span>
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.24em] text-muted">
                          {tr(action.source)}
                        </p>
                        <h4 className="mt-3 text-xl leading-8 text-text-primary">
                          {tr(action.finding)}
                        </h4>
                        <div className="mt-4 flex items-start gap-3 text-sm leading-7 text-muted">
                          <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-500" />
                          <span>{tr(action.response)}</span>
                        </div>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <section
            id="reflection"
            className="scroll-mt-32 border-t border-stroke py-24 md:py-32"
          >
            <div className={`relative overflow-hidden rounded-[2.4rem] px-6 py-14 md:px-10 md:py-20 ${
              isDark
                ? "border border-emerald-400/18 bg-emerald-500/[0.06]"
                : "border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.06)]"
            }`}>
              <motion.div
                aria-hidden="true"
                animate={
                  prefersReducedMotion
                    ? undefined
                    : { scale: [1, 1.08, 1], opacity: [0.12, 0.24, 0.12] }
                }
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className={`absolute -right-20 -top-20 h-72 w-72 rounded-full blur-[100px] ${
                  isDark ? "bg-emerald-400/20" : "bg-slate-200/80"
                }`}
              />

              <div className="relative z-10 grid gap-10 xl:grid-cols-[minmax(0,1.1fr)_minmax(340px,0.9fr)] xl:items-center">
                <Reveal>
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.3em] text-emerald-500">
                      {tr("05 · Reflection")}
                    </p>
                    <h2 className="mt-6 text-[clamp(1.9rem,4vw,3.2rem)] leading-[1.05] tracking-[-0.035em] text-text-primary">
                      {tr(
                        "A case study should show decisions growing—not screenshots accumulating.",
                      )}
                    </h2>
                  </div>
                </Reveal>

                <Reveal delay={0.08}>
                  <div>
                    <p className="text-sm leading-7 text-text-secondary md:text-base">
                      {tr(
                        "Agriplant taught me how research, structure, interface design, and testing connect across a mobile product and an operational desktop system. The final presentation now follows that same logic: evidence appears only when it supports a decision, while interaction keeps the reader moving through the story.",
                      )}
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                      <a
                        href={AGRIPLANT_PROTOTYPE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-3 rounded-full border border-emerald-400/35 bg-emerald-500/15 px-6 py-3.5 text-sm text-text-primary transition hover:-translate-y-1 hover:border-emerald-400/60 hover:bg-emerald-500/25"
                      >
                        {tr("View prototype")}
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>
                      <a
                        href="/#work"
                        className="group inline-flex items-center gap-3 rounded-full border border-stroke bg-surface-elevated px-6 py-3.5 text-sm text-text-secondary transition hover:-translate-y-1 hover:border-emerald-400/40 hover:text-text-primary"
                      >
                        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        {tr("Back to selected projects")}
                      </a>
                    </div>
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

function FloatingSignal({
  icon: Icon,
  label,
  value,
  delay,
  language,
}: {
  icon: typeof CloudSun;
  label: string;
  value: string;
  delay: number;
  language: Language;
}) {
  const { isDark } = useTheme();
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      animate={
        prefersReducedMotion
          ? undefined
          : { y: [0, -9, 0], rotate: [0, 0.7, 0] }
      }
      transition={{
        duration: 4.8,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`flex items-center gap-3 rounded-full border py-2 pl-2 pr-4 backdrop-blur-xl ${
        isDark
          ? "border-white/10 bg-black/45 text-white shadow-[0_16px_50px_rgba(0,0,0,0.28)]"
          : "border-white/80 bg-white/[0.78] text-slate-950 shadow-[0_18px_50px_rgba(15,23,42,0.12),inset_0_1px_0_rgba(255,255,255,0.95)]"
      }`}
    >
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-full ${
          isDark ? "bg-emerald-500/20" : "bg-emerald-100"
        }`}
      >
        <Icon className={`h-4 w-4 ${isDark ? "text-emerald-300" : "text-emerald-800"}`} />
      </span>
      <span>
        <span
          className={`block text-[8px] uppercase tracking-[0.22em] ${
            isDark ? "text-white/45" : "text-slate-500"
          }`}
        >
          {translateCopy(label, language)}
        </span>
        <span className={`mt-0.5 block text-xs ${isDark ? "text-white/80" : "text-slate-900"}`}>
          {translateCopy(value, language)}
        </span>
      </span>
    </motion.div>
  );
}

function SectionHeading({
  number,
  eyebrow,
  title,
  description,
  language,
}: {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  language: Language;
}) {
  const { isDark } = useTheme();

  return (
    <div className="max-w-4xl">
      <div className="flex items-center gap-3">
        <span
          className={`font-display text-xl italic ${
            isDark ? "text-emerald-500/70" : "text-slate-400"
          }`}
        >
          {number}
        </span>
        <span
          className={`h-px w-9 ${
            isDark ? "bg-emerald-400/35" : "bg-slate-300"
          }`}
        />
        <span
          className={`text-[9px] uppercase tracking-[0.3em] ${
            isDark ? "text-muted" : "text-slate-500"
          }`}
        >
          {translateCopy(eyebrow, language)}
        </span>
      </div>
      <h2 className="mt-6 text-[clamp(1.9rem,3.8vw,3.1rem)] leading-[1.05] tracking-[-0.035em] text-text-primary">
        {translateCopy(title, language)}
      </h2>
      <p
        className={`mt-4 max-w-2xl text-sm leading-7 ${
          isDark ? "text-muted" : "text-slate-600"
        }`}
      >
        {translateCopy(description, language)}
      </p>
    </div>
  );
}

function ObjectiveStream({
  icon: Icon,
  eyebrow,
  title,
  items,
  language,
}: {
  icon: typeof CloudSun;
  eyebrow: string;
  title: string;
  items: string[];
  language: Language;
}) {
  const { isDark } = useTheme();

  return (
    <Reveal>
      <article>
        <div className="flex items-center gap-4">
          <span
            className={`flex h-12 w-12 items-center justify-center rounded-full ${
              isDark
                ? "border border-emerald-400/25 bg-emerald-500/10"
                : "border border-slate-200 bg-slate-50"
            }`}
          >
            <Icon className={`h-5 w-5 ${isDark ? "text-emerald-500" : "text-emerald-600"}`} />
          </span>
          <div>
            <p className={`text-[9px] uppercase tracking-[0.26em] ${isDark ? "text-emerald-500" : "text-slate-500"}`}>
              {translateCopy(eyebrow, language)}
            </p>
            <h3 className="mt-2 text-xl tracking-[-0.02em] text-text-primary">
              {translateCopy(title, language)}
            </h3>
          </div>
        </div>
        <div className="mt-7 divide-y divide-stroke border-y border-stroke">
          {items.map((item, index) => (
            <div key={translateCopy(item, language)} className="flex items-start gap-4 py-4">
              <span className={`font-display text-lg italic ${isDark ? "text-emerald-500/65" : "text-slate-400"}`}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className={`text-sm leading-6 ${isDark ? "text-text-secondary" : "text-slate-700"}`}>
                {translateCopy(item, language)}
              </span>
            </div>
          ))}
        </div>
      </article>
    </Reveal>
  );
}

function Metric({
  value,
  label,
  language,
}: {
  value: string;
  label: string;
  language: Language;
}) {
  const { isDark } = useTheme();

  return (
    <div>
      <p className="text-xl tracking-[-0.035em] text-text-primary md:text-2xl">
        {value}
      </p>
      <p className={`mt-2 text-[8px] uppercase tracking-[0.2em] ${isDark ? "text-muted" : "text-slate-500"}`}>
        {translateCopy(label, language)}
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
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: prefersReducedMotion ? 0.22 : 0.7,
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
  language,
}: {
  image: GalleryImage;
  className: string;
  priority?: boolean;
  language: Language;
}) {
  const { isDark } = useTheme();
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex min-h-[220px] items-center justify-center ${
          isDark ? "bg-surface-elevated" : "bg-slate-50"
        } ${className}`}
      >
        <div className="max-w-sm px-6 text-center">
          <div
            className={`mx-auto flex h-12 w-12 items-center justify-center rounded-2xl ${
              isDark
                ? "border border-emerald-300/18 bg-emerald-500/10"
                : "border border-slate-200 bg-white"
            }`}
          >
            <ImageIcon className={`h-5 w-5 ${isDark ? "text-emerald-500/75" : "text-slate-500"}`} />
          </div>
          <p className={`mt-4 text-sm ${isDark ? "text-muted" : "text-slate-600"}`}>
            {translateCopy("Add the project image here", language)}
          </p>
          <p className={`mt-2 break-all font-mono text-[10px] leading-5 ${isDark ? "text-muted" : "text-slate-500"}`}>
            {image.src}
          </p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={image.src}
      alt={translateCopy(image.alt, language)}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      draggable={false}
      onError={() => setHasError(true)}
      className={className}
    />
  );
}