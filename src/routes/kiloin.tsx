// KILOIN CASE STUDY — REVISED · EN/ID + CLEAN LIGHT MODE + BUSINESS PLAN DEEP DIVE
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
  ArrowUpRight,
  BarChart3,
  Building2,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  ClipboardCheck,
  Code2,
  Database,
  Gauge,
  Globe2,
  ImageIcon,
  Layers3,
  MapPin,
  Maximize2,
  PackageOpen,
  Recycle,
  Route as RouteIcon,
  ShoppingBag,
  Sparkles,
  Target,
  Truck,
  Users,
  Workflow,
  X,
} from "lucide-react";
import { createPortal } from "react-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";

export const Route = createFileRoute("/kiloin")({
  component: KiloinCaseStudy,
});

type Language = "en" | "id";
type Bilingual = { en: string; id: string };
type BusinessView = "market" | "operations" | "finance" | "canvas";

type ProjectImage = {
  src: string;
  alt: string;
  label: Bilingual;
};

type LightboxState = {
  images: ProjectImage[];
  index: number;
} | null;

const HERO_VIDEO_URL = "/videos/kiloin/kiloin-hero.mp4";
const HERO_POSTER_URL = "/images/kiloin/kiloin-hero-poster.jpg";

const CLASS_DIAGRAM_IMAGE: ProjectImage = {
  src: "/images/kiloin/class-diagram.png",
  alt: "Kiloin application class diagram",
  label: { en: "Kiloin class diagram", id: "Class diagram Kiloin" },
};

const WIREFRAME_LABELS: Bilingual[] = [
  { en: "Splash screen", id: "Layar pembuka" },
  { en: "Welcome onboarding", id: "Onboarding selamat datang" },
  { en: "Waste categories", id: "Kategori sampah" },
  { en: "Create a pickup request", id: "Membuat permintaan jemput" },
  { en: "Prepare waste for pickup", id: "Menyiapkan sampah" },
  { en: "Kiloin coin explanation", id: "Penjelasan koin Kiloin" },
  { en: "Sign in", id: "Masuk" },
  { en: "Pickup status map", id: "Peta status penjemputan" },
  { en: "Alternative sign-in", id: "Alternatif halaman masuk" },
  { en: "Create account", id: "Membuat akun" },
  { en: "Registration validation", id: "Validasi pendaftaran" },
  { en: "Main dashboard", id: "Dashboard utama" },
  { en: "Wallet balance", id: "Saldo dompet" },
  { en: "Transfer balance", id: "Transfer saldo" },
  { en: "Successful transaction", id: "Transaksi berhasil" },
  { en: "Failed transaction", id: "Transaksi gagal" },
  { en: "Income history", id: "Riwayat pemasukan" },
  { en: "Ko-Put category selection", id: "Pemilihan kategori Ko-Put" },
  { en: "Plastic pickup form", id: "Form penjemputan plastik" },
  { en: "Cigarette-waste pickup form", id: "Form penjemputan sampah rokok" },
  { en: "Pickup earnings detail", id: "Detail pendapatan penjemputan" },
  { en: "Ko-Mart catalogue", id: "Katalog Ko-Mart" },
  { en: "Order confirmation", id: "Konfirmasi pesanan" },
  { en: "Ko-Put home state", id: "Beranda Ko-Put" },
  { en: "Ko-Mart home state", id: "Beranda Ko-Mart" },
  { en: "Invoice", id: "Faktur" },
  { en: "Application settings", id: "Pengaturan aplikasi" },
  { en: "Edit profile", id: "Ubah profil" },
];

const WIREFRAME_IMAGES: ProjectImage[] = WIREFRAME_LABELS.map(
  (label, index) => {
    const number = String(index + 1).padStart(2, "0");
    const extension = index === 25 ? "jpg" : "png";

    return {
      src: `/images/kiloin/wireframes/wireframe-${number}.${extension}`,
      alt: `Kiloin wireframe ${number}`,
      label,
    };
  },
);

const SCREEN_GROUPS: Array<{
  id: string;
  title: Bilingual;
  text: Bilingual;
  indexes: number[];
}> = [
  {
    id: "onboarding",
    title: { en: "Entry and education", id: "Masuk dan edukasi awal" },
    text: {
      en: "Introduce Kiloin, explain accepted waste, and communicate how pickup and Kiloin Coin work before users create an account.",
      id: "Memperkenalkan Kiloin, menjelaskan sampah yang diterima, serta menerangkan proses penjemputan dan Kiloin Coin sebelum pengguna membuat akun.",
    },
    indexes: [0, 1, 2, 3, 4, 5],
  },
  {
    id: "identity",
    title: { en: "Identity and access", id: "Identitas dan akses" },
    text: {
      en: "Support sign-in, account creation, validation, and entry into the main dashboard.",
      id: "Mendukung proses masuk, pembuatan akun, validasi, dan akses menuju dashboard utama.",
    },
    indexes: [6, 8, 9, 10, 11],
  },
  {
    id: "wallet",
    title: { en: "Wallet and transactions", id: "Dompet dan transaksi" },
    text: {
      en: "Show balances, transfers, success or failure states, and income history as part of the recycling reward system.",
      id: "Menampilkan saldo, transfer, status berhasil atau gagal, dan riwayat pemasukan sebagai bagian dari sistem imbalan daur ulang.",
    },
    indexes: [12, 13, 14, 15, 16],
  },
  {
    id: "pickup",
    title: { en: "Ko-Put pickup", id: "Penjemputan Ko-Put" },
    text: {
      en: "Let users select a waste type, enter pickup information, monitor the driver, and review earnings from collected waste.",
      id: "Memungkinkan pengguna memilih jenis sampah, mengisi data penjemputan, memantau petugas, dan melihat pendapatan dari sampah yang dikumpulkan.",
    },
    indexes: [7, 17, 18, 19, 20, 23],
  },
  {
    id: "marketplace",
    title: { en: "Ko-Mart and account", id: "Ko-Mart dan akun" },
    text: {
      en: "Complete the value loop through a recycled-product catalogue, order confirmation, invoice, settings, and profile management.",
      id: "Menyelesaikan siklus nilai melalui katalog produk daur ulang, konfirmasi pesanan, faktur, pengaturan, dan pengelolaan profil.",
    },
    indexes: [21, 22, 24, 25, 26, 27],
  },
];

const SECTIONS = [
  { id: "overview", label: { en: "Overview", id: "Ringkasan" } },
  { id: "service", label: { en: "Service Loop", id: "Siklus Layanan" } },
  { id: "business", label: { en: "Business Plan", id: "Rencana Bisnis" } },
  { id: "structure", label: { en: "System", id: "Sistem" } },
  { id: "prototype", label: { en: "Prototype", id: "Prototipe" } },
  { id: "reflection", label: { en: "Reflection", id: "Refleksi" } },
] as const;

const OVERVIEW_ROWS = [
  {
    label: { en: "Company", id: "Perusahaan" },
    title: { en: "Tanaka Nawasena Company", id: "Tanaka Nawasena Company" },
    text: {
      en: "A service business for collecting and recycling plastic and cigarette waste.",
      id: "Usaha jasa pengumpulan dan daur ulang sampah plastik serta sampah rokok.",
    },
  },
  {
    label: { en: "Vision", id: "Visi" },
    title: { en: "Reduce waste accumulation", id: "Mengurangi penumpukan sampah" },
    text: {
      en: "Create a structured channel for waste disposal and transform collected materials into products that can be sold again.",
      id: "Menyediakan saluran pembuangan sampah yang terstruktur dan mengolah material terkumpul menjadi produk yang dapat dijual kembali.",
    },
  },
  {
    label: { en: "Problem", id: "Masalah" },
    title: {
      en: "Recycling is not yet practical or connected",
      id: "Daur ulang belum praktis dan terhubung",
    },
    text: {
      en: "The project asks how digital technology can make recycling more structured, practical, and accessible.",
      id: "Proyek ini menjawab bagaimana teknologi digital dapat membuat kegiatan daur ulang lebih terstruktur, praktis, dan mudah diakses.",
    },
  },
  {
    label: { en: "My contribution", id: "Kontribusi saya" },
    title: { en: "UI/UX Designer", id: "UI/UX Designer" },
    text: {
      en: "Focused on shaping the interface, user journeys, interaction structure, and prototype experience for Kiloin.",
      id: "Berfokus pada perancangan antarmuka, perjalanan pengguna, struktur interaksi, dan pengalaman prototipe Kiloin.",
    },
  },
];

const SERVICE_STEPS = [
  {
    icon: Truck,
    number: "01",
    title: { en: "Ko-Put", id: "Ko-Put" },
    kicker: { en: "Kiloin Pickup", id: "Kiloin Jemput" },
    text: {
      en: "Users classify plastic or cigarette waste, enter the pickup location and details, then monitor collection status until completion.",
      id: "Pengguna mengelompokkan sampah plastik atau rokok, memasukkan lokasi dan detail penjemputan, lalu memantau status hingga selesai.",
    },
    outcome: {
      en: "Lower participation effort",
      id: "Mengurangi hambatan untuk berpartisipasi",
    },
  },
  {
    icon: Recycle,
    number: "02",
    title: { en: "Processing", id: "Pengolahan" },
    kicker: { en: "Waste to value", id: "Sampah menjadi nilai" },
    text: {
      en: "Collected materials move through categorisation, stock, residue, mutation, and recycling records inside the operational system.",
      id: "Material yang terkumpul bergerak melalui pencatatan kategori, stok, residu, mutasi, dan proses daur ulang dalam sistem operasional.",
    },
    outcome: {
      en: "Traceable waste operations",
      id: "Operasional sampah yang dapat dilacak",
    },
  },
  {
    icon: ShoppingBag,
    number: "03",
    title: { en: "Ko-Mart", id: "Ko-Mart" },
    kicker: { en: "Recycled marketplace", id: "Marketplace produk daur ulang" },
    text: {
      en: "Processed materials return to users as useful products with prices, stock, categories, orders, payment methods, and delivery information.",
      id: "Material olahan kembali kepada pengguna sebagai produk berguna yang memiliki harga, stok, kategori, pesanan, metode pembayaran, dan informasi pengiriman.",
    },
    outcome: {
      en: "A visible circular-economy loop",
      id: "Siklus ekonomi sirkular yang terlihat",
    },
  },
] as const;

const SWOT_ITEMS = [
  {
    code: "S",
    label: { en: "Strength", id: "Kekuatan" },
    title: {
      en: "Pickup service and higher waste value",
      id: "Layanan jemput dan peningkatan nilai sampah",
    },
    text: {
      en: "Kiloin collects waste directly from users and connects it with products that have renewed commercial value.",
      id: "Kiloin menjemput sampah langsung dari pengguna dan menghubungkannya dengan produk yang memiliki nilai komersial baru.",
    },
  },
  {
    code: "W",
    label: { en: "Weakness", id: "Kelemahan" },
    title: { en: "Low public interest", id: "Minat masyarakat masih rendah" },
    text: {
      en: "The service depends on users caring enough to sort and distribute recyclable waste.",
      id: "Layanan bergantung pada kepedulian pengguna untuk memilah dan menyalurkan sampah yang dapat didaur ulang.",
    },
  },
  {
    code: "O",
    label: { en: "Opportunity", id: "Peluang" },
    title: {
      en: "Education can grow participation",
      id: "Edukasi dapat meningkatkan partisipasi",
    },
    text: {
      en: "Explaining the long-term impact of accumulated waste can attract communities and early adopters.",
      id: "Penjelasan mengenai dampak jangka panjang penumpukan sampah dapat menarik komunitas dan pengguna awal.",
    },
  },
  {
    code: "T",
    label: { en: "Threat", id: "Ancaman" },
    title: {
      en: "Larger competitors with stronger technology",
      id: "Pesaing besar dengan teknologi lebih kuat",
    },
    text: {
      en: "Established organisations may have wider logistics coverage, more advanced systems, and greater capital.",
      id: "Organisasi yang lebih mapan dapat memiliki jangkauan logistik, sistem, dan modal yang lebih kuat.",
    },
  },
] as const;

const MARKET_STEPS = [
  {
    number: "01",
    title: { en: "Alpha and beta testing", id: "Alpha dan beta testing" },
    text: {
      en: "Collect criticism and suggestions, then use them as the basis for improving the main features.",
      id: "Mengumpulkan kritik dan saran, kemudian menjadikannya dasar perbaikan fitur utama.",
    },
  },
  {
    number: "02",
    title: { en: "Bogor socialisation", id: "Sosialisasi di Bogor" },
    text: {
      en: "Introduce the improved application locally and use early users as the first distribution channel for awareness.",
      id: "Memperkenalkan aplikasi yang telah diperbaiki di tingkat lokal dan memanfaatkan pengguna awal sebagai penyalur informasi.",
    },
  },
  {
    number: "03",
    title: { en: "Layered digital marketing", id: "Pemasaran digital bertahap" },
    text: {
      en: "Combine campus advertising, public-service advertising in Bogor, Google Ads, and YouTube Ads.",
      id: "Menggabungkan promosi di kampus, iklan layanan masyarakat di Bogor, Google Ads, dan YouTube Ads.",
    },
  },
] as const;

const PRODUCTION_STEPS = [
  {
    title: { en: "Plan and prepare", id: "Perencanaan dan persiapan" },
    text: {
      en: "Define data, features, target market, data flows, user activities, and the implementation schedule.",
      id: "Menentukan data, fitur, target pasar, aliran data, aktivitas pengguna, dan jadwal pengerjaan.",
    },
  },
  {
    title: { en: "Design UI and UX", id: "Perancangan UI dan UX" },
    text: {
      en: "Use Canva for early concepts and Figma for interactive prototyping.",
      id: "Menggunakan Canva untuk rancangan awal dan Figma untuk prototipe interaktif.",
    },
  },
  {
    title: { en: "Build the Android application", id: "Pembuatan aplikasi Android" },
    text: {
      en: "Develop the application in Android Studio and use Google Firebase for database storage.",
      id: "Mengembangkan aplikasi melalui Android Studio dan menggunakan Google Firebase sebagai penyimpanan database.",
    },
  },
  {
    title: { en: "Test with target users", id: "Pengujian bersama target pengguna" },
    text: {
      en: "Share the prototype, collect feedback, and improve weaknesses before distribution.",
      id: "Membagikan prototipe, mengumpulkan tanggapan, dan memperbaiki kekurangan sebelum distribusi.",
    },
  },
  {
    title: { en: "Distribute the product", id: "Distribusi produk" },
    text: {
      en: "Prepare an online release through the Kiloin application page and Play Store.",
      id: "Menyiapkan peluncuran daring melalui halaman aplikasi Kiloin dan Play Store.",
    },
  },
  {
    title: { en: "Control the system", id: "Pengontrolan sistem" },
    text: {
      en: "Monitor the system periodically so the application and operational process remain optimal.",
      id: "Memantau sistem secara berkala agar aplikasi dan proses operasional tetap optimal.",
    },
  },
] as const;

const TEAM_ROLES = [
  {
    icon: Building2,
    title: { en: "Business direction", id: "Arah bisnis" },
    text: {
      en: "Defines the company vision, service model, market direction, and business-plan priorities.",
      id: "Menetapkan visi perusahaan, model layanan, arah pasar, dan prioritas rencana bisnis.",
    },
  },
  {
    icon: Database,
    title: { en: "System analysis", id: "Analisis sistem" },
    text: {
      en: "Translates business needs into system, data, front-end, and back-end requirements.",
      id: "Menerjemahkan kebutuhan bisnis menjadi kebutuhan sistem, data, front-end, dan back-end.",
    },
  },
  {
    icon: Sparkles,
    title: { en: "UI/UX design", id: "Desain UI/UX" },
    text: {
      en: "Shapes the interface, user journeys, interaction structure, and prototype for the intended audience.",
      id: "Membentuk antarmuka, perjalanan pengguna, struktur interaksi, dan prototipe sesuai target audiens.",
    },
  },
  {
    icon: Code2,
    title: { en: "Technical and financial planning", id: "Perencanaan teknis dan keuangan" },
    text: {
      en: "Covers application implementation, data handling, operational planning, budgeting, and financial reporting.",
      id: "Mencakup implementasi aplikasi, pengelolaan data, perencanaan operasional, penyusunan anggaran, dan pelaporan keuangan.",
    },
  },
] as const;

const CAPITAL_ROWS = [
  { item: { en: "Application staff salaries", id: "Gaji pegawai pembuat aplikasi" }, amount: "Rp8.000.000" },
  { item: { en: "Waste-management staff salaries", id: "Gaji pegawai pengelola limbah" }, amount: "Rp4.000.000" },
  { item: { en: "500 kg plastic and cigarette waste", id: "500 kg sampah plastik dan rokok" }, amount: "Rp5.000.000" },
  { item: { en: "Equipment", id: "Peralatan" }, amount: "Rp1.000.000" },
  { item: { en: "Recycling operations", id: "Operasi daur ulang" }, amount: "Rp500.000" },
] as const;

const SALES_ROWS = [
  {
    item: { en: "Recycled product 1", id: "Produk daur ulang 1" },
    volume: "300",
    unit: "Rp50.000",
    total: "Rp15.000.000",
  },
  {
    item: { en: "Recycled product 2", id: "Produk daur ulang 2" },
    volume: "350",
    unit: "Rp35.000",
    total: "Rp12.250.000",
  },
] as const;

const SALES_PROJECTIONS = [
  { year: "1", value: 327 },
  { year: "2", value: 392.4 },
  { year: "3", value: 470.88 },
  { year: "4", value: 565.056 },
  { year: "5", value: 678.0672 },
] as const;

const CASHFLOW_PROJECTIONS = [
  { year: "1", opening: 18.5, difference: 100.8, closing: 119.3 },
  { year: "2", opening: 119.3, difference: 171.9, closing: 291.2 },
  { year: "3", opening: 291.2, difference: 239.355, closing: 530.555 },
  { year: "4", opening: 530.555, difference: 321.95475, closing: 852.50975 },
  { year: "5", opening: 852.50975, difference: 422.8108875, closing: 1275.3206375 },
] as const;

const BMC_ROWS = [
  {
    label: { en: "Key partners", id: "Mitra utama" },
    text: {
      en: "Neighbourhood, village, subdistrict, regional authorities, and local communities.",
      id: "Perangkat dusun, perangkat desa, lurah, perangkat daerah, dan masyarakat.",
    },
  },
  {
    label: { en: "Key activities", id: "Aktivitas utama" },
    text: {
      en: "Collect and recycle community waste.",
      id: "Mengumpulkan dan mendaur ulang sampah masyarakat.",
    },
  },
  {
    label: { en: "Key resources", id: "Sumber daya utama" },
    text: {
      en: "Customer locations and recycling equipment.",
      id: "Rumah pelanggan dan alat pendaur ulang sampah.",
    },
  },
  {
    label: { en: "Value proposition", id: "Proposisi nilai" },
    text: {
      en: "A public waste-collection channel that converts discarded materials into saleable products.",
      id: "Layanan penampung sampah masyarakat yang mengolah material menjadi barang bernilai jual.",
    },
  },
  {
    label: { en: "Customer relationship", id: "Hubungan pelanggan" },
    text: {
      en: "Managed through the Kiloin application.",
      id: "Dikelola melalui aplikasi Kiloin.",
    },
  },
  {
    label: { en: "Channels", id: "Saluran" },
    text: {
      en: "Play Store and App Store, as written in the 2022 canvas.",
      id: "Play Store dan App Store, sebagaimana dituliskan dalam canvas 2022.",
    },
  },
  {
    label: { en: "Customer segments", id: "Segmen pelanggan" },
    text: {
      en: "People across age groups in the Bogor area.",
      id: "Masyarakat dari berbagai kalangan di wilayah Bogor.",
    },
  },
  {
    label: { en: "Cost structure", id: "Struktur biaya" },
    text: {
      en: "Employee salaries, waste purchasing, equipment, and recycling operating costs.",
      id: "Gaji pegawai, pembelian sampah, pembelian alat, dan biaya operasi daur ulang.",
    },
  },
  {
    label: { en: "Revenue streams", id: "Arus pendapatan" },
    text: {
      en: "Sales of recycled products and service visits to customer locations.",
      id: "Penjualan barang daur ulang dan layanan kunjungan ke lokasi pelanggan.",
    },
  },
] as const;

const DATA_MODULES = [
  {
    title: { en: "Identity and access", id: "Identitas dan akses" },
    text: {
      en: "Separate user, customer, employee, address, and status records so authentication and operational roles remain traceable.",
      id: "Memisahkan data user, nasabah, pegawai, alamat, dan status agar autentikasi serta peran operasional dapat dilacak.",
    },
    entities: ["user", "nasabah", "pegawai", "alamat", "status"],
  },
  {
    title: { en: "Collection operations", id: "Operasional pengumpulan" },
    text: {
      en: "Connect deposits, pickup schedules, drivers, payments, and detailed waste records from request through completion.",
      id: "Menghubungkan setoran, jadwal penjemputan, petugas, pembayaran, dan detail sampah dari permintaan sampai selesai.",
    },
    entities: ["setoran", "setoran_detail", "setoran_payment", "jadwal", "jemput"],
  },
  {
    title: { en: "Waste and inventory", id: "Sampah dan persediaan" },
    text: {
      en: "Track waste categories, waste banks, stock, mutations, residue, and recycled outputs as materials change state.",
      id: "Melacak kategori sampah, bank sampah, stok, mutasi, residu, dan hasil daur ulang ketika material berubah status.",
    },
    entities: [
      "jenis_sampah",
      "kategori_sampah",
      "bank_sampah",
      "stok_sampah",
      "mutasi_sampah",
      "residu_sampah",
      "daur_ulang",
    ],
  },
  {
    title: { en: "Commerce and fulfilment", id: "Perdagangan dan pemenuhan" },
    text: {
      en: "Translate recycled output into products, categories, orders, quantities, payment methods, and delivery records.",
      id: "Menerjemahkan hasil daur ulang menjadi produk, kategori, pesanan, jumlah, metode pembayaran, dan catatan pengiriman.",
    },
    entities: ["product", "categories", "order", "payment_method"],
  },
] as const;

function KiloinCaseStudy() {
  const pageRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { isDark } = useTheme();

  const [language, setLanguage] = useState<Language>("en");
  const [activeSection, setActiveSection] = useState("overview");
  const [activeService, setActiveService] = useState(0);
  const [businessView, setBusinessView] = useState<BusinessView>("market");
  const [activeDataModule, setActiveDataModule] = useState(0);
  const [activeScreenGroup, setActiveScreenGroup] = useState(SCREEN_GROUPS[0].id);
  const [wireframeIndex, setWireframeIndex] = useState(SCREEN_GROUPS[0].indexes[0]);
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

  const activeGroup = useMemo(
    () => SCREEN_GROUPS.find((group) => group.id === activeScreenGroup) ?? SCREEN_GROUPS[0],
    [activeScreenGroup],
  );

  const currentWireframe = WIREFRAME_IMAGES[wireframeIndex];

  useEffect(() => {
    const saved = window.localStorage.getItem("kiloin-language");
    if (saved === "en" || saved === "id") setLanguage(saved);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("kiloin-language", language);
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    const sections = SECTIONS.map(({ id }) => document.getElementById(id)).filter(
      (section): section is HTMLElement => Boolean(section),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry) setActiveSection(visibleEntry.target.id);
      },
      { rootMargin: "-32% 0px -55% 0px", threshold: [0.05, 0.2, 0.5] },
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

  const copy = (value: Bilingual) => value[language];

  const openGallery = (images: ProjectImage[], index = 0) => {
    setLightbox({ images, index });
  };

  const moveLightbox = (direction: "prev" | "next") => {
    setLightbox((current) => {
      if (!current) return current;
      const offset = direction === "next" ? 1 : -1;
      return {
        ...current,
        index: (current.index + offset + current.images.length) % current.images.length,
      };
    });
  };

  const selectScreenGroup = (groupId: string) => {
    const group = SCREEN_GROUPS.find((item) => item.id === groupId);
    if (!group) return;
    setActiveScreenGroup(groupId);
    setWireframeIndex(group.indexes[0]);
  };

  const moveWireframe = (direction: "prev" | "next") => {
    const currentPosition = activeGroup.indexes.indexOf(wireframeIndex);
    const safePosition = currentPosition >= 0 ? currentPosition : 0;
    const offset = direction === "next" ? 1 : -1;
    const nextPosition =
      (safePosition + offset + activeGroup.indexes.length) % activeGroup.indexes.length;
    setWireframeIndex(activeGroup.indexes[nextPosition]);
  };

  const lightboxPortal =
    typeof document !== "undefined"
      ? createPortal(
          <AnimatePresence>
            {lightbox && (
              <motion.div
                className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/92 p-3 backdrop-blur-xl md:p-7"
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
                  aria-label={copy(lightbox.images[lightbox.index].label)}
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.98 }}
                  transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                  onMouseDown={(event) => event.stopPropagation()}
                  className="relative flex max-h-[94vh] w-full max-w-[1440px] flex-col overflow-hidden rounded-[1.6rem] border border-white/15 bg-[#080808]"
                >
                  <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 md:px-7">
                    <div className="min-w-0">
                      <p className="text-[9px] uppercase tracking-[0.28em] text-amber-200/45">
                        {language === "en" ? "Project evidence" : "Bukti proyek"}
                      </p>
                      <p className="mt-1 truncate text-sm text-white/80">
                        {copy(lightbox.images[lightbox.index].label)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setLightbox(null)}
                      aria-label={language === "en" ? "Close preview" : "Tutup pratinjau"}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.05] text-white/70 transition hover:rotate-90 hover:text-white"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="relative min-h-0 flex-1 overflow-auto bg-black/55 p-4 md:p-7">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={lightbox.images[lightbox.index].src}
                        initial={{ opacity: 0, x: 18 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -18 }}
                        transition={{ duration: 0.28 }}
                        className="mx-auto flex min-h-full w-full items-start justify-center"
                      >
                        <ImageWithFallback
                          image={lightbox.images[lightbox.index]}
                          className="h-auto max-h-none max-w-full object-contain"
                        />
                      </motion.div>
                    </AnimatePresence>

                    {lightbox.images.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={() => moveLightbox("prev")}
                          aria-label="Previous"
                          className="fixed left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white/70 backdrop-blur-md md:left-8"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveLightbox("next")}
                          aria-label="Next"
                          className="fixed right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white/70 backdrop-blur-md md:right-8"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </>
                    )}
                  </div>

                  <div className="flex items-center justify-between border-t border-white/10 px-5 py-4 text-xs text-white/35 md:px-7">
                    <span>{language === "en" ? "Scroll to inspect the complete visual" : "Gulir untuk melihat visual secara lengkap"}</span>
                    <span className="font-display text-base italic text-white/65">
                      {String(lightbox.index + 1).padStart(2, "0")} / {String(lightbox.images.length).padStart(2, "0")}
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
      className={`relative overflow-clip ${
        isDark
          ? "bg-bg text-text-primary"
          : "bg-white text-slate-950 [&_.border-stroke]:border-slate-200 [&_.bg-surface]:bg-white [&_.bg-surface-elevated]:bg-white [&_.text-muted]:text-slate-600 [&_.text-text-primary]:text-slate-950 [&_.text-text-secondary]:text-slate-700"
      }`}
    >
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progressScale }}
        className={`fixed inset-x-0 top-0 z-[95] h-[2px] origin-left ${
          isDark ? "bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-500" : "bg-amber-950"
        }`}
      />

      <header className="fixed inset-x-0 top-0 z-[80] px-4 pt-4 md:px-7 md:pt-6">
        <div
          className={`mx-auto flex max-w-[1440px] items-center justify-between rounded-full border px-3 py-2 backdrop-blur-2xl md:px-4 ${
            isDark
              ? "border-white/10 bg-black/55 shadow-[0_18px_58px_rgba(0,0,0,0.48),inset_0_1px_0_rgba(255,255,255,0.07)]"
              : "border-white/75 bg-white/[0.68] shadow-[0_16px_42px_rgba(15,23,42,0.08),inset_0_1px_0_rgba(255,255,255,0.96)]"
          }`}
        >
          <a
            href="/#work"
            className={`group inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs transition ${
              isDark ? "text-white/65 hover:bg-white/[0.06] hover:text-white" : "text-slate-600 hover:bg-white/75 hover:text-slate-950"
            }`}
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            {language === "en" ? "Back to projects" : "Kembali ke proyek"}
          </a>

          <nav className="hidden items-center gap-1 xl:flex" aria-label="Kiloin chapters">
            {SECTIONS.map((section) => {
              const isActive = activeSection === section.id;
              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className={`rounded-full px-3 py-2 text-[10px] transition ${
                    isActive
                      ? isDark
                        ? "bg-white/10 text-white"
                        : "bg-slate-950 text-white"
                      : isDark
                        ? "text-white/45 hover:text-white"
                        : "text-slate-500 hover:text-slate-950"
                  }`}
                >
                  {copy(section.label)}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <div
              className={`flex items-center rounded-full border p-1 backdrop-blur-xl ${
                isDark ? "border-white/10 bg-white/[0.04]" : "border-white/70 bg-white/[0.52]"
              }`}
            >
              {(["en", "id"] as Language[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setLanguage(item)}
                  aria-pressed={language === item}
                  className={`rounded-full px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.12em] transition ${
                    language === item
                      ? isDark
                        ? "bg-white text-black"
                        : "bg-slate-950 text-white"
                      : isDark
                        ? "text-white/45 hover:text-white"
                        : "text-slate-500 hover:text-slate-950"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero layout intentionally preserved */}
      <section className="relative min-h-[100svh] overflow-hidden bg-black">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={HERO_POSTER_URL}
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={HERO_VIDEO_URL} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(250,204,21,0.18),transparent_34%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/75" />

        <div className="relative z-10 flex min-h-[100svh] items-center justify-center px-6 text-center">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[10px] uppercase tracking-[0.42em] text-yellow-100/65 md:text-xs">
              Tanaka Nawasena Company
            </p>
            <h1 className="mt-6 text-[clamp(4rem,10vw,8rem)] leading-[0.82] tracking-[-0.065em] text-white">
              Kiloin<span className="text-yellow-300">.</span>
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-sm leading-7 text-white/65 md:text-lg md:leading-8">
              {language === "en"
                ? "A digital recycling ecosystem that makes waste collection, processing, and reusable products easier to access."
                : "Ekosistem daur ulang digital yang memudahkan akses terhadap pengumpulan, pengolahan, dan produk hasil daur ulang."}
            </p>
          </motion.div>
        </div>

        <a
          href="#overview"
          aria-label="Scroll to overview"
          className="group absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-3 text-white/60 transition hover:text-yellow-300 md:bottom-10"
        >
          <span className="text-[9px] uppercase tracking-[0.32em]">
            {language === "en" ? "Scroll to explore" : "Gulir untuk melihat"}
          </span>
          <span className="relative flex h-12 w-7 justify-center rounded-full border border-current">
            <motion.span
              className="absolute top-2 h-1.5 w-1.5 rounded-full bg-current"
              animate={prefersReducedMotion ? undefined : { y: [0, 18, 0], opacity: [1, 0.25, 1] }}
              transition={prefersReducedMotion ? undefined : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
        </a>
      </section>

      <main className="mx-auto max-w-[1280px] px-5 md:px-9 lg:px-12">
        <section id="overview" className="scroll-mt-28 border-t border-stroke py-24 md:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
            <Reveal>
              <SectionHeading
                number="00"
                eyebrow={{ en: "Project overview", id: "Ringkasan proyek" }}
                title={{
                  en: "A mobile service designed around the complete recycling loop.",
                  id: "Layanan mobile yang dirancang berdasarkan siklus daur ulang secara utuh.",
                }}
                description={{
                  en: "Kiloin was prepared for the 2022 Business Plan Competition as a Software Engineering Technology project at IPB Vocational School. The proposal combines product design, system planning, operations, market entry, and financial projections.",
                  id: "Kiloin disusun untuk Business Plan Competition 2022 sebagai proyek Teknologi Rekayasa Perangkat Lunak di Sekolah Vokasi IPB. Proposalnya menggabungkan desain produk, perencanaan sistem, operasional, strategi masuk pasar, dan proyeksi keuangan.",
                }}
                language={language}
                isDark={isDark}
              />
            </Reveal>

            <div className="border-y border-stroke">
              {OVERVIEW_ROWS.map((item, index) => (
                <Reveal key={item.label.en} delay={index * 0.06}>
                  <div className="grid gap-3 border-b border-stroke py-7 last:border-b-0 md:grid-cols-[150px_minmax(0,1fr)] md:gap-8">
                    <p className={`text-[10px] font-medium uppercase tracking-[0.28em] ${isDark ? "text-yellow-300" : "text-amber-900"}`}>
                      {copy(item.label)}
                    </p>
                    <div>
                      <h3 className="text-lg tracking-[-0.02em] text-text-primary md:text-xl">{copy(item.title)}</h3>
                      <p className="mt-2 max-w-3xl text-sm leading-7 text-muted">{copy(item.text)}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.16}>
            <div className="mt-14 grid gap-6 border-y border-stroke py-8 md:grid-cols-[180px_minmax(0,1fr)] md:items-center md:gap-10">
              <div className="flex items-center gap-3">
                <Recycle className={`h-5 w-5 ${isDark ? "text-yellow-300" : "text-amber-900"}`} />
                <span className="text-[10px] uppercase tracking-[0.28em] text-muted">
                  {language === "en" ? "Product vision" : "Visi produk"}
                </span>
              </div>
              <p className="max-w-4xl text-xl leading-8 tracking-[-0.02em] text-text-primary md:text-2xl md:leading-9">
                {language === "en"
                  ? "Make recycling structured enough to operate, simple enough to join, and valuable enough to sustain."
                  : "Membuat daur ulang cukup terstruktur untuk dioperasikan, cukup sederhana untuk diikuti, dan cukup bernilai untuk dipertahankan."}
              </p>
            </div>
          </Reveal>
        </section>

        <section id="service" className="scroll-mt-28 border-t border-stroke py-24 md:py-32">
          <Reveal>
            <SectionHeading
              number="01"
              eyebrow={{ en: "Connected service loop", id: "Siklus layanan terhubung" }}
              title={{
                en: "Waste enters through Ko-Put and returns as value through Ko-Mart.",
                id: "Sampah masuk melalui Ko-Put dan kembali sebagai nilai melalui Ko-Mart.",
              }}
              description={{
                en: "Instead of presenting the two features as isolated products, the service is shown as one circular flow: collect, process, and return value to the community.",
                id: "Dua fitur tidak diposisikan sebagai produk terpisah, melainkan satu alur sirkular: mengumpulkan, mengolah, dan mengembalikan nilai kepada masyarakat.",
              }}
              language={language}
              isDark={isDark}
            />
          </Reveal>

          <div className="mt-12 grid gap-9 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div className="space-y-4">
              {SERVICE_STEPS.map((step, index) => {
                const Icon = step.icon;
                const isActive = activeService === index;
                return (
                  <button
                    key={step.number}
                    type="button"
                    onClick={() => setActiveService(index)}
                    className={`group relative w-full rounded-[1.9rem] border px-5 py-5 text-left transition-all duration-300 ${
                      isActive
                        ? isDark
                          ? "border-yellow-300/35 bg-[#111111] text-text-primary shadow-[0_24px_55px_-38px_rgba(250,204,21,0.35)]"
                          : "border-amber-900/25 bg-white text-text-primary shadow-[0_24px_45px_-36px_rgba(120,53,15,0.18)]"
                        : "border-stroke bg-surface/70 text-muted hover:border-white/15 hover:bg-surface hover:text-text-primary"
                    }`}
                  >
                    <div className="grid grid-cols-[56px_minmax(0,1fr)_auto] items-center gap-4">
                      <span
                        className={`flex h-14 w-14 items-center justify-center rounded-full border transition ${
                          isActive
                            ? isDark
                              ? "border-yellow-300 bg-yellow-300 text-black"
                              : "border-amber-950 bg-amber-950 text-white"
                            : "border-stroke bg-bg text-muted group-hover:border-current"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block text-[10px] uppercase tracking-[0.26em] text-muted">{copy(step.kicker)}</span>
                        <span className="mt-2 block text-[1.7rem] leading-none tracking-[-0.035em]">{copy(step.title)}</span>
                      </span>
                      <ArrowUpRight className={`h-5 w-5 transition ${isActive ? "opacity-100" : "opacity-35 group-hover:opacity-80"}`} />
                    </div>
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeService}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="border-l border-stroke pl-6 md:pl-9"
              >
                <p className={`font-display text-3xl italic ${isDark ? "text-yellow-300" : "text-amber-900"}`}>
                  {SERVICE_STEPS[activeService].number}
                </p>
                <h3 className="mt-4 text-3xl tracking-[-0.04em] text-text-primary md:text-4xl">
                  {copy(SERVICE_STEPS[activeService].title)}
                </h3>
                <p className="mt-5 max-w-xl text-sm leading-7 text-muted md:text-base">
                  {copy(SERVICE_STEPS[activeService].text)}
                </p>
                <div className="mt-8 border-t border-stroke pt-5">
                  <p className="text-[9px] uppercase tracking-[0.25em] text-muted">
                    {language === "en" ? "Design outcome" : "Hasil desain"}
                  </p>
                  <p className="mt-2 text-lg text-text-primary">{copy(SERVICE_STEPS[activeService].outcome)}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <Reveal delay={0.12}>
            <div className="mt-14 border-y border-stroke py-7">
              <p className="text-[9px] uppercase tracking-[0.28em] text-muted">
                {language === "en" ? "Initial audience" : "Audiens awal"}
              </p>
              <div className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { en: "Students", id: "Pelajar" },
                  { en: "University students", id: "Mahasiswa" },
                  { en: "Waste collectors", id: "Pengumpul sampah" },
                  { en: "Recycling communities", id: "Komunitas daur ulang" },
                ].map((item) => (
                  <div key={item.en} className="flex items-center gap-3 text-sm text-text-secondary">
                    <Check className={`h-4 w-4 ${isDark ? "text-yellow-300" : "text-amber-900"}`} />
                    {copy(item)}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        <section id="business" className="scroll-mt-28 border-t border-stroke py-24 md:py-32">
          <Reveal>
            <SectionHeading
              number="02"
              eyebrow={{ en: "Business plan deep dive", id: "Pendalaman rencana bisnis" }}
              title={{
                en: "The proposal connects market entry, operations, finance, and the business model.",
                id: "Proposal menghubungkan strategi pasar, operasional, keuangan, dan model bisnis.",
              }}
              description={{
                en: "The original competition document is translated into a readable digital ledger rather than a set of screenshots. All figures below are projections presented in the 2022 business plan.",
                id: "Dokumen kompetisi diterjemahkan menjadi catatan digital yang mudah dibaca, bukan kumpulan screenshot. Seluruh angka di bawah merupakan proyeksi dalam business plan 2022.",
              }}
              language={language}
              isDark={isDark}
            />
          </Reveal>

          <div className="mt-10 flex gap-2 overflow-x-auto border-y border-stroke py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {([
              ["market", { en: "Market", id: "Pasar" }],
              ["operations", { en: "Operations", id: "Operasional" }],
              ["finance", { en: "Finance", id: "Keuangan" }],
              ["canvas", { en: "Business canvas", id: "Business canvas" }],
            ] as [BusinessView, Bilingual][]).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setBusinessView(id)}
                aria-pressed={businessView === id}
                className={`shrink-0 rounded-full border px-4 py-2.5 text-xs transition ${
                  businessView === id
                    ? isDark
                      ? "border-yellow-300 bg-yellow-300 text-black"
                      : "border-amber-950 bg-amber-950 text-white"
                    : "border-stroke text-muted hover:text-text-primary"
                }`}
              >
                {copy(label)}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={businessView}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10"
            >
              {businessView === "market" && (
                <div>
                  <div className="grid gap-12 lg:grid-cols-[0.68fr_1.32fr]">
                    <div>
                      <p className={`text-[10px] uppercase tracking-[0.3em] ${isDark ? "text-yellow-300" : "text-amber-900"}`}>
                        {language === "en" ? "Market thesis" : "Tesis pasar"}
                      </p>
                      <h3 className="mt-4 text-3xl tracking-[-0.04em] text-text-primary">
                        {language === "en" ? "Start in Bogor, learn locally, then expand." : "Mulai dari Bogor, belajar secara lokal, kemudian berkembang."}
                      </h3>
                      <p className="mt-5 text-sm leading-7 text-muted">
                        {language === "en"
                          ? "The plan targets Android users across age groups, with students, university students, waste collectors, and recycling-minded communities as the earliest segments."
                          : "Rencana menargetkan pengguna Android dari berbagai kelompok usia, dengan pelajar, mahasiswa, pengumpul sampah, dan komunitas yang peduli daur ulang sebagai segmen awal."}
                      </p>
                    </div>

                    <div className="border-y border-stroke">
                      {SWOT_ITEMS.map((item, index) => (
                        <div key={item.code} className="grid gap-4 border-b border-stroke py-6 last:border-b-0 md:grid-cols-[48px_150px_minmax(0,1fr)] md:gap-6">
                          <span className={`font-display text-2xl italic ${isDark ? "text-yellow-300" : "text-amber-900"}`}>{item.code}</span>
                          <div>
                            <p className="text-[9px] uppercase tracking-[0.24em] text-muted">{copy(item.label)}</p>
                            <p className="mt-2 text-base text-text-primary">{copy(item.title)}</p>
                          </div>
                          <p className="text-sm leading-7 text-muted">{copy(item.text)}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-14">
                    <p className="text-[9px] uppercase tracking-[0.28em] text-muted">
                      {language === "en" ? "Go-to-market sequence" : "Urutan masuk pasar"}
                    </p>
                    <div className="relative mt-6 grid gap-0 md:grid-cols-3">
                      <div className="absolute left-0 right-0 top-6 hidden h-px bg-stroke md:block" />
                      {MARKET_STEPS.map((step, index) => (
                        <Reveal key={step.number} delay={index * 0.07}>
                          <div className="relative border-l border-stroke pb-8 pl-6 md:border-l-0 md:border-r md:px-6 md:pb-0 last:border-r-0">
                            <span className={`relative z-10 inline-flex h-12 w-12 items-center justify-center rounded-full border text-sm font-medium ${
                              isDark ? "border-yellow-300/35 bg-bg text-yellow-300" : "border-amber-950 bg-white text-amber-950"
                            }`}>
                              {step.number}
                            </span>
                            <h4 className="mt-5 text-lg text-text-primary">{copy(step.title)}</h4>
                            <p className="mt-3 text-sm leading-7 text-muted">{copy(step.text)}</p>
                          </div>
                        </Reveal>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {businessView === "operations" && (
                <div className="grid gap-12 xl:grid-cols-[1.1fr_0.9fr]">
                  <div>
                    <p className={`text-[10px] uppercase tracking-[0.3em] ${isDark ? "text-yellow-300" : "text-amber-900"}`}>
                      {language === "en" ? "Production workflow" : "Alur produksi"}
                    </p>
                    <div className="mt-5 border-y border-stroke">
                      {PRODUCTION_STEPS.map((step, index) => (
                        <div key={step.title.en} className="grid gap-4 border-b border-stroke py-6 last:border-b-0 md:grid-cols-[52px_minmax(0,1fr)]">
                          <span className={`font-display text-xl italic ${isDark ? "text-yellow-300" : "text-amber-900"}`}>
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <div>
                            <h4 className="text-lg text-text-primary">{copy(step.title)}</h4>
                            <p className="mt-2 text-sm leading-7 text-muted">{copy(step.text)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-[9px] uppercase tracking-[0.28em] text-muted">
                      {language === "en" ? "Project responsibilities" : "Tanggung jawab proyek"}
                    </p>
                    <div className="mt-5 border-y border-stroke">
                      {TEAM_ROLES.map((role) => {
                        const Icon = role.icon;
                        return (
                          <div key={role.title.en} className="grid gap-4 border-b border-stroke py-6 last:border-b-0 md:grid-cols-[42px_minmax(0,1fr)]">
                            <Icon className={`h-5 w-5 ${isDark ? "text-yellow-300" : "text-amber-900"}`} />
                            <div>
                              <h4 className="text-base text-text-primary">{copy(role.title)}</h4>
                              <p className="mt-3 text-sm leading-6 text-muted">{copy(role.text)}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-9 border-l-2 border-stroke pl-5">
                      <p className={`text-[9px] uppercase tracking-[0.28em] ${isDark ? "text-yellow-300" : "text-amber-900"}`}>
                        {language === "en" ? "Differentiation" : "Pembeda"}
                      </p>
                      <p className="mt-3 text-sm leading-7 text-muted">
                        {language === "en"
                          ? "The product direction uses a dedicated application rather than relying only on existing e-commerce platforms. Ko-Put, friendly service, and event-based discounts are positioned as the main differentiators."
                          : "Arah produk menggunakan aplikasi khusus, bukan hanya mengandalkan platform e-commerce yang sudah ada. Ko-Put, pelayanan ramah, dan diskon saat event diposisikan sebagai pembeda utama."}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {businessView === "finance" && (
                <div>
                  <div className="grid border-y border-stroke sm:grid-cols-2 lg:grid-cols-4">
                    {[
                      { label: { en: "Initial capital", id: "Modal awal" }, value: "Rp18,5 jt" },
                      { label: { en: "Monthly sales", id: "Penjualan bulanan" }, value: "Rp27,25 jt" },
                      { label: { en: "Monthly profit", id: "Laba bulanan" }, value: "Rp9,75 jt" },
                      { label: { en: "Break-even", id: "Titik impas" }, value: "113 unit" },
                    ].map((metric, index) => (
                      <div key={metric.value} className="border-b border-stroke px-5 py-6 sm:border-r lg:border-b-0 last:border-r-0">
                        <p className="text-[9px] uppercase tracking-[0.24em] text-muted">{copy(metric.label)}</p>
                        <p className="mt-3 text-2xl tracking-[-0.03em] text-text-primary">{metric.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-12 grid gap-12 xl:grid-cols-2">
                    <DataTable
                      title={language === "en" ? "Initial capital requirement" : "Kebutuhan modal awal"}
                      headers={language === "en" ? ["Item", "Amount"] : ["Kebutuhan", "Jumlah"]}
                      rows={CAPITAL_ROWS.map((row) => [copy(row.item), row.amount])}
                      footer={[language === "en" ? "Total capital" : "Total modal", "Rp18.500.000"]}
                      isDark={isDark}
                    />
                    <DataTable
                      title={language === "en" ? "Monthly sales projection" : "Proyeksi penjualan bulanan"}
                      headers={language === "en" ? ["Product", "Volume", "Unit price", "Total"] : ["Produk", "Volume", "Harga", "Total"]}
                      rows={SALES_ROWS.map((row) => [copy(row.item), row.volume, row.unit, row.total])}
                      footer={[language === "en" ? "Total revenue" : "Total pendapatan", "", "", "Rp27.250.000"]}
                      isDark={isDark}
                    />
                  </div>

                  <div className="mt-14 grid gap-12 xl:grid-cols-[1.05fr_0.95fr]">
                    <div>
                      <div className="flex items-end justify-between gap-5">
                        <div>
                          <p className="text-[9px] uppercase tracking-[0.28em] text-muted">
                            {language === "en" ? "Five-year sales projection" : "Proyeksi penjualan lima tahun"}
                          </p>
                          <h4 className="mt-3 text-xl text-text-primary">
                            {language === "en" ? "20% annual sales growth assumption" : "Asumsi pertumbuhan penjualan 20% per tahun"}
                          </h4>
                        </div>
                        <BarChart3 className={`h-5 w-5 ${isDark ? "text-yellow-300" : "text-amber-900"}`} />
                      </div>
                      <div className="mt-7 flex h-64 items-end gap-3 border-b border-l border-stroke px-4 pt-5">
                        {SALES_PROJECTIONS.map((item, index) => (
                          <div key={item.year} className="flex h-full flex-1 flex-col justify-end">
                            <motion.div
                              initial={{ height: 0 }}
                              whileInView={{ height: `${(item.value / 678.0672) * 100}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.75, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                              className={isDark ? "bg-yellow-300" : "bg-amber-950"}
                            />
                            <div className="pt-3 text-center">
                              <p className="text-[10px] text-muted">Y{item.year}</p>
                              <p className="mt-1 text-[9px] text-muted">{item.value.toFixed(item.year === "1" ? 0 : 1)}m</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-y border-stroke">
                      <div className="py-6">
                        <p className="text-[9px] uppercase tracking-[0.26em] text-muted">
                          {language === "en" ? "Funding mix" : "Sumber modal"}
                        </p>
                        <div className="mt-4 grid grid-cols-2 gap-5">
                          <div>
                            <p className="text-2xl text-text-primary">Rp5 jt</p>
                            <p className="mt-1 text-xs text-muted">{language === "en" ? "Donor capital" : "Modal donatur"}</p>
                          </div>
                          <div>
                            <p className="text-2xl text-text-primary">Rp13,5 jt</p>
                            <p className="mt-1 text-xs text-muted">{language === "en" ? "Loan" : "Pinjaman"}</p>
                          </div>
                        </div>
                      </div>
                      <div className="border-t border-stroke py-6">
                        <p className="text-[9px] uppercase tracking-[0.26em] text-muted">BEP</p>
                        <p className="mt-3 text-lg text-text-primary">
                          {language === "en" ? "113 units or Rp5.625.000 in sales" : "113 unit atau penjualan Rp5.625.000"}
                        </p>
                        <p className="mt-3 text-sm leading-6 text-muted">
                          {language === "en"
                            ? "Calculated in the plan using Rp4.500.000 fixed cost, Rp50.000 selling price, and Rp10.000 variable cost per unit."
                            : "Dihitung dalam dokumen menggunakan biaya tetap Rp4.500.000, harga jual Rp50.000, dan biaya variabel Rp10.000 per unit."}
                        </p>
                      </div>
                      <div className="border-t border-stroke py-6">
                        <p className="text-[9px] uppercase tracking-[0.26em] text-muted">
                          {language === "en" ? "Five-year closing cash" : "Kas akhir tahun kelima"}
                        </p>
                        <p className="mt-3 text-2xl text-text-primary">Rp1,275 miliar</p>
                        <p className="mt-3 text-sm leading-6 text-muted">
                          {language === "en"
                            ? "The plan assumes sales rise 20% annually while purchasing and operating costs rise 5%."
                            : "Rencana mengasumsikan penjualan naik 20% per tahun, sementara biaya pembelian dan operasional naik 5%."}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-14 overflow-x-auto border-y border-stroke">
                    <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                      <caption className="py-5 text-left text-[9px] uppercase tracking-[0.28em] text-muted">
                        {language === "en" ? "Cash-flow projection in millions of rupiah" : "Proyeksi arus kas dalam juta rupiah"}
                      </caption>
                      <thead>
                        <tr className="border-y border-stroke text-[10px] uppercase tracking-[0.18em] text-muted">
                          <th className="px-4 py-4">{language === "en" ? "Year" : "Tahun"}</th>
                          <th className="px-4 py-4">{language === "en" ? "Opening cash" : "Kas awal"}</th>
                          <th className="px-4 py-4">{language === "en" ? "Cash difference" : "Selisih kas"}</th>
                          <th className="px-4 py-4">{language === "en" ? "Closing cash" : "Kas akhir"}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {CASHFLOW_PROJECTIONS.map((row) => (
                          <tr key={row.year} className="border-b border-stroke last:border-b-0">
                            <td className="px-4 py-4 font-medium text-text-primary">{row.year}</td>
                            <td className="px-4 py-4 text-muted">{row.opening.toFixed(3)}</td>
                            <td className="px-4 py-4 text-muted">{row.difference.toFixed(3)}</td>
                            <td className="px-4 py-4 text-text-primary">{row.closing.toFixed(3)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {businessView === "canvas" && (
                <div className="grid gap-12 lg:grid-cols-[0.68fr_1.32fr]">
                  <div>
                    <p className={`text-[10px] uppercase tracking-[0.3em] ${isDark ? "text-yellow-300" : "text-amber-900"}`}>
                      Business Model Canvas
                    </p>
                    <h3 className="mt-4 text-3xl tracking-[-0.04em] text-text-primary">
                      {language === "en" ? "Nine decisions describe how the service can operate." : "Sembilan keputusan menjelaskan cara layanan dapat beroperasi."}
                    </h3>
                    <p className="mt-5 text-sm leading-7 text-muted">
                      {language === "en"
                        ? "The original one-page canvas is rewritten as a vertical model so every assumption is readable on mobile and desktop."
                        : "Canvas satu halaman ditulis ulang sebagai model vertikal agar setiap asumsi mudah dibaca melalui mobile maupun desktop."}
                    </p>

                    <div className="mt-9 border-l-2 border-stroke pl-5">
                      <p className="text-[9px] uppercase tracking-[0.26em] text-muted">
                        {language === "en" ? "Business timeline" : "Timeline usaha"}
                      </p>
                      {[
                        ["20 Sep 2022", { en: "Company establishment", id: "Berdirinya usaha" }],
                        ["10 Oct 2022", { en: "Business planning", id: "Rencana usaha" }],
                        ["1 Nov 2022", { en: "Planned implementation", id: "Pelaksanaan usaha" }],
                      ].map(([date, title]) => (
                        <div key={date as string} className="mt-5 grid grid-cols-[105px_minmax(0,1fr)] gap-4 text-sm">
                          <span className="text-muted">{date as string}</span>
                          <span className="text-text-primary">{copy(title as Bilingual)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-y border-stroke">
                    {BMC_ROWS.map((row, index) => (
                      <div key={row.label.en} className="grid gap-3 border-b border-stroke py-5 last:border-b-0 md:grid-cols-[180px_minmax(0,1fr)] md:gap-7">
                        <div className="flex items-start gap-3">
                          <span className={`font-display text-base italic ${isDark ? "text-yellow-300" : "text-amber-900"}`}>
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <p className="text-sm font-medium text-text-primary">{copy(row.label)}</p>
                        </div>
                        <p className="text-sm leading-7 text-muted">{copy(row.text)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </section>

        <section id="structure" className="scroll-mt-28 border-t border-stroke py-24 md:py-32">
          <Reveal>
            <SectionHeading
              number="03"
              eyebrow={{ en: "System structure", id: "Struktur sistem" }}
              title={{
                en: "The database connects people, pickups, waste inventory, and marketplace transactions.",
                id: "Database menghubungkan pengguna, penjemputan, persediaan sampah, dan transaksi marketplace.",
              }}
              description={{
                en: "The class diagram is kept as the single technical visual. The surrounding explanation decodes the system into readable modules so the page does not depend on a dense screenshot alone.",
                id: "Class diagram dipertahankan sebagai satu-satunya visual teknis. Penjelasan di sekelilingnya memecah sistem menjadi modul yang mudah dibaca agar halaman tidak bergantung pada screenshot yang padat.",
              }}
              language={language}
              isDark={isDark}
            />
          </Reveal>

          <div className="mt-12 grid gap-12 xl:grid-cols-[1.12fr_0.88fr] xl:items-start">
            <Reveal>
              <button
                type="button"
                onClick={() => openGallery([CLASS_DIAGRAM_IMAGE], 0)}
                className="group relative block w-full overflow-hidden border-y border-stroke bg-surface py-5 text-left"
              >
                <ImageWithFallback
                  image={CLASS_DIAGRAM_IMAGE}
                  className="max-h-[660px] w-full object-contain transition duration-700 group-hover:scale-[1.01]"
                />
                <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white/75 opacity-0 backdrop-blur-md transition group-hover:opacity-100">
                  <Maximize2 className="h-4 w-4" />
                </span>
              </button>
            </Reveal>

            <div>
              <p className="text-[9px] uppercase tracking-[0.28em] text-muted">
                {language === "en" ? "Decode the architecture" : "Membaca arsitektur"}
              </p>
              <div className="mt-5 space-y-3">
                {DATA_MODULES.map((module, index) => {
                  const isActive = activeDataModule === index;
                  return (
                    <button
                      key={module.title.en}
                      type="button"
                      onClick={() => setActiveDataModule(index)}
                      className={`group w-full rounded-[1.6rem] border px-4 py-4 text-left transition-all duration-300 ${
                        isActive
                          ? isDark
                            ? "border-yellow-300/35 bg-[#111111] text-text-primary shadow-[0_20px_45px_-34px_rgba(250,204,21,0.35)]"
                            : "border-amber-900/25 bg-white text-text-primary shadow-[0_20px_40px_-34px_rgba(120,53,15,0.18)]"
                          : "border-stroke bg-surface/70 text-muted hover:border-white/15 hover:bg-surface hover:text-text-primary"
                      }`}
                    >
                      <div className="grid grid-cols-[42px_minmax(0,1fr)_auto] items-center gap-4">
                        <span className={`flex h-10 w-10 items-center justify-center rounded-full border font-display text-base italic ${
                          isActive
                            ? isDark
                              ? "border-yellow-300/40 bg-yellow-300/10 text-yellow-300"
                              : "border-amber-900/30 bg-amber-900/5 text-amber-900"
                            : "border-stroke text-muted group-hover:border-current"
                        }`}>
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[15px] text-current">{copy(module.title)}</span>
                        <ArrowUpRight className={`h-4 w-4 ${isActive ? "opacity-100" : "opacity-35 group-hover:opacity-80"}`} />
                      </div>
                    </button>
                  );
                })}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDataModule}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="mt-7 border-l border-stroke pl-5"
                >
                  <h3 className="text-xl text-text-primary">{copy(DATA_MODULES[activeDataModule].title)}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted">{copy(DATA_MODULES[activeDataModule].text)}</p>
                  <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
                    {DATA_MODULES[activeDataModule].entities.map((entity) => (
                      <code key={entity} className={`text-xs ${isDark ? "text-yellow-300" : "text-amber-900"}`}>
                        {entity}
                      </code>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="mt-10 border-t border-stroke pt-6">
                <p className="text-[9px] uppercase tracking-[0.28em] text-muted">
                  {language === "en" ? "Use-case layer" : "Lapisan use case"}
                </p>
                <p className="mt-3 text-sm leading-7 text-muted">
                  {language === "en"
                    ? "The supporting use-case diagram centres on login and separates employee management, customer management, waste delivery, waste pickup, and Trashshop activities."
                    : "Use-case diagram pendukung berpusat pada login dan memisahkan aktivitas pengelolaan pegawai, nasabah, pengiriman sampah, penjemputan sampah, serta Trashshop."}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="prototype" className="scroll-mt-28 border-t border-stroke py-24 md:py-32">
          <Reveal>
            <SectionHeading
              number="04"
              eyebrow={{ en: "Prototype journey", id: "Perjalanan prototipe" }}
              title={{
                en: "Twenty-eight screens are organised as five user journeys, not a screenshot wall.",
                id: "Dua puluh delapan layar disusun menjadi lima perjalanan pengguna, bukan dinding screenshot.",
              }}
              description={{
                en: "Only one screen is shown at a time. Select a journey to understand its role, then move through the relevant wireframes inside the phone stage.",
                id: "Hanya satu layar ditampilkan pada satu waktu. Pilih perjalanan untuk memahami perannya, kemudian telusuri wireframe yang relevan melalui tampilan ponsel.",
              }}
              language={language}
              isDark={isDark}
            />
          </Reveal>

          <div className="mt-12 grid gap-9 xl:grid-cols-[250px_minmax(300px,0.72fr)_minmax(0,1fr)] xl:items-start">
            <div className="space-y-3">
              {SCREEN_GROUPS.map((group, index) => {
                const isActive = activeScreenGroup === group.id;
                return (
                  <button
                    key={group.id}
                    type="button"
                    onClick={() => selectScreenGroup(group.id)}
                    className={`group w-full rounded-[1.6rem] border px-4 py-4 text-left transition-all duration-300 ${
                      isActive
                        ? isDark
                          ? "border-yellow-300/35 bg-[#111111] text-text-primary shadow-[0_20px_45px_-34px_rgba(250,204,21,0.35)]"
                          : "border-amber-900/25 bg-white text-text-primary shadow-[0_20px_40px_-34px_rgba(120,53,15,0.18)]"
                        : "border-stroke bg-surface/70 text-muted hover:border-white/15 hover:bg-surface hover:text-text-primary"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border font-display text-base italic transition ${
                        isActive
                          ? isDark
                            ? "border-yellow-300/40 bg-yellow-300/10 text-yellow-300"
                            : "border-amber-900/30 bg-amber-900/5 text-amber-900"
                          : "border-stroke text-muted group-hover:border-current"
                      }`}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[15px] text-current">{copy(group.title)}</span>
                        <span className="mt-1 block text-[11px] uppercase tracking-[0.18em] text-muted">{group.indexes.length} {language === "en" ? "screens" : "layar"}</span>
                      </span>
                      <ArrowUpRight className={`h-4 w-4 shrink-0 transition ${isActive ? "opacity-100" : "opacity-35 group-hover:opacity-80"}`} />
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="relative mx-auto w-full max-w-[330px]">
              <div className={`absolute inset-x-8 top-10 h-[68%] rounded-full blur-[70px] ${isDark ? "bg-yellow-400/12" : "bg-transparent"}`} />
              <div className={`relative overflow-hidden rounded-[2.4rem] border-[7px] p-2 ${isDark ? "border-[#202024] bg-black" : "border-slate-900 bg-slate-950"}`}>
                <div className="mx-auto mb-2 h-5 w-24 rounded-full bg-black" />
                <button
                  type="button"
                  onClick={() => openGallery(WIREFRAME_IMAGES, wireframeIndex)}
                  className="group relative block w-full overflow-hidden rounded-[1.75rem] bg-white"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentWireframe.src}
                      initial={{ opacity: 0, x: 22 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -22 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ImageWithFallback image={currentWireframe} className="aspect-[9/20] w-full object-cover object-top" />
                    </motion.div>
                  </AnimatePresence>
                  <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white opacity-0 backdrop-blur-md transition group-hover:opacity-100">
                    <Maximize2 className="h-4 w-4" />
                  </span>
                </button>
              </div>
              <div className="mt-5 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => moveWireframe("prev")}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke text-muted transition hover:text-text-primary"
                  aria-label="Previous wireframe"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className={`font-display text-lg italic ${isDark ? "text-yellow-300" : "text-amber-900"}`}>
                  {String(wireframeIndex + 1).padStart(2, "0")} / 28
                </span>
                <button
                  type="button"
                  onClick={() => moveWireframe("next")}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke text-muted transition hover:text-text-primary"
                  aria-label="Next wireframe"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="border-y border-stroke">
              <div className="py-6">
                <p className={`text-[10px] uppercase tracking-[0.28em] ${isDark ? "text-yellow-300" : "text-amber-900"}`}>
                  {copy(activeGroup.title)}
                </p>
                <h3 className="mt-4 text-2xl tracking-[-0.03em] text-text-primary">{copy(currentWireframe.label)}</h3>
                <p className="mt-4 text-sm leading-7 text-muted">{copy(activeGroup.text)}</p>
              </div>

              <div className="border-t border-stroke py-6">
                <p className="text-[9px] uppercase tracking-[0.26em] text-muted">
                  {language === "en" ? "Screens in this journey" : "Layar dalam perjalanan ini"}
                </p>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {activeGroup.indexes.map((index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setWireframeIndex(index)}
                      className={`flex items-center gap-3 border-b border-stroke py-3 text-left text-sm transition ${
                        wireframeIndex === index ? "text-text-primary" : "text-muted hover:text-text-primary"
                      }`}
                    >
                      <span className={`font-display italic ${wireframeIndex === index ? (isDark ? "text-yellow-300" : "text-amber-900") : "text-muted"}`}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>{copy(WIREFRAME_IMAGES[index].label)}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="reflection" className="scroll-mt-28 border-y border-stroke py-24 md:py-32">
          <div className={`rounded-[2rem] border px-6 py-8 md:px-8 md:py-10 lg:px-10 lg:py-12 ${
            isDark ? "border-white/10 bg-[#0b0b0b]" : "border-slate-200 bg-white"
          }`}>
            <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
              <Reveal>
                <SectionHeading
                  number="05"
                  eyebrow={{ en: "Reflection", id: "Refleksi" }}
                  title={{
                    en: "Kiloin was not only an interface exercise; it was a connected product-and-business system.",
                    id: "Kiloin bukan hanya latihan antarmuka, tetapi sistem produk dan bisnis yang saling terhubung.",
                  }}
                  description={{
                    en: "The strongest lesson is that service design, database structure, operational roles, market strategy, and financial assumptions must reinforce the same user promise.",
                    id: "Pelajaran terpentingnya adalah desain layanan, struktur database, peran operasional, strategi pasar, dan asumsi keuangan harus memperkuat janji pengguna yang sama.",
                  }}
                  language={language}
                  isDark={isDark}
                />
              </Reveal>

              <div className={`rounded-[1.75rem] border p-6 md:p-7 ${isDark ? "border-white/10 bg-[#101010]" : "border-slate-200 bg-slate-50"}`}>
                {[
                  {
                    icon: RouteIcon,
                    title: { en: "One service loop", id: "Satu siklus layanan" },
                    text: {
                      en: "Ko-Put and Ko-Mart make more sense when shown as connected stages of a circular-economy journey.",
                      id: "Ko-Put dan Ko-Mart lebih kuat ketika ditampilkan sebagai tahapan yang terhubung dalam perjalanan ekonomi sirkular.",
                    },
                  },
                  {
                    icon: Database,
                    title: { en: "Operations need structure", id: "Operasional membutuhkan struktur" },
                    text: {
                      en: "The data model reveals that a simple pickup screen depends on identity, schedules, waste records, payments, stock, and fulfilment.",
                      id: "Model data menunjukkan bahwa layar penjemputan yang sederhana bergantung pada identitas, jadwal, catatan sampah, pembayaran, stok, dan pemenuhan pesanan.",
                    },
                  },
                  {
                    icon: Gauge,
                    title: { en: "Business assumptions need validation", id: "Asumsi bisnis perlu divalidasi" },
                    text: {
                      en: "The projections provide direction, while real-world testing would still be required to validate demand, logistics cost, pricing, and adoption.",
                      id: "Proyeksi memberi arah, tetapi pengujian nyata tetap dibutuhkan untuk memvalidasi permintaan, biaya logistik, harga, dan adopsi.",
                    },
                  },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Reveal key={item.title.en} delay={index * 0.07}>
                      <div className="grid gap-4 border-b border-stroke py-7 last:border-b-0 md:grid-cols-[52px_minmax(0,1fr)]">
                        <div className={`flex h-11 w-11 items-center justify-center rounded-full border ${isDark ? "border-yellow-300/20 bg-yellow-300/5" : "border-amber-900/15 bg-white"}`}>
                          <Icon className={`h-5 w-5 ${isDark ? "text-yellow-300" : "text-amber-900"}`} />
                        </div>
                        <div>
                          <h3 className="text-lg text-text-primary">{copy(item.title)}</h3>
                          <p className="mt-3 text-sm leading-7 text-muted">{copy(item.text)}</p>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>

            <Reveal delay={0.16}>
              <div className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-stroke pt-8 lg:flex-row lg:items-center">
                <p className="max-w-2xl text-sm leading-7 text-muted">
                  {language === "en"
                    ? "Case study reconstructed from the submitted Kiloin code, the 2022 competition business plan, the class diagram, and the complete 28-screen prototype archive."
                    : "Case study disusun ulang berdasarkan kode Kiloin, business plan kompetisi 2022, class diagram, dan arsip lengkap 28 layar prototipe."}
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="/#work"
                    className={`group inline-flex items-center gap-3 rounded-full border px-5 py-3 text-sm transition ${
                      isDark
                        ? "border-white/15 text-white/75 hover:border-yellow-300 hover:text-yellow-300"
                        : "border-slate-300 text-slate-700 hover:border-amber-950 hover:text-amber-950"
                    }`}
                  >
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    {language === "en" ? "Back to selected projects" : "Kembali ke proyek pilihan"}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {lightboxPortal}
    </div>
  );
}

function SectionHeading({
  number,
  eyebrow,
  title,
  description,
  language,
  isDark,
}: {
  number: string;
  eyebrow: Bilingual;
  title: Bilingual;
  description: Bilingual;
  language: Language;
  isDark: boolean;
}) {
  return (
    <div className="max-w-4xl">
      <div className="flex items-center gap-3">
        <span className={`font-display text-xl italic ${isDark ? "text-yellow-300" : "text-amber-900"}`}>{number}</span>
        <span className={`h-px w-9 ${isDark ? "bg-yellow-300/40" : "bg-amber-900/35"}`} />
        <span className="text-[9px] uppercase tracking-[0.3em] text-muted">{eyebrow[language]}</span>
      </div>
      <h2 className="mt-6 text-[clamp(2.15rem,4.5vw,3.9rem)] leading-[1.02] tracking-[-0.045em] text-text-primary">
        {title[language]}
      </h2>
      <p className="mt-5 max-w-3xl text-sm leading-7 text-muted md:text-[15px] md:leading-7">
        {description[language]}
      </p>
    </div>
  );
}

function DataTable({
  title,
  headers,
  rows,
  footer,
  isDark,
}: {
  title: string;
  headers: string[];
  rows: string[][];
  footer: string[];
  isDark: boolean;
}) {
  return (
    <div className="overflow-x-auto border-y border-stroke">
      <table className="w-full min-w-[520px] border-collapse text-left text-sm">
        <caption className={`py-5 text-left text-[10px] font-medium uppercase tracking-[0.25em] ${isDark ? "text-yellow-300" : "text-amber-900"}`}>
          {title}
        </caption>
        <thead>
          <tr className="border-y border-stroke text-[9px] uppercase tracking-[0.18em] text-muted">
            {headers.map((header) => (
              <th key={header} className="px-4 py-4">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-stroke">
              {row.map((cell, cellIndex) => (
                <td key={`${rowIndex}-${cellIndex}`} className={`px-4 py-4 ${cellIndex === 0 ? "text-text-primary" : "text-muted"}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t border-stroke font-medium text-text-primary">
            {footer.map((cell, index) => (
              <td key={index} className="px-4 py-4">{cell}</td>
            ))}
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

function ImageWithFallback({
  image,
  className,
}: {
  image: ProjectImage;
  className: string;
}) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [image.src]);

  if (hasError) {
    return (
      <div className={`flex items-center justify-center bg-surface-elevated p-6 ${className}`}>
        <div className="max-w-sm text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-stroke bg-surface">
            <ImageIcon className="h-6 w-6 text-amber-700" />
          </div>
          <p className="mt-5 text-sm font-medium text-text-primary">Add project image</p>
          <p className="mt-2 break-all font-mono text-[10px] leading-5 text-muted">{image.src}</p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={image.src}
      alt={image.alt}
      loading="lazy"
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
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24, filter: "blur(7px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: 0.62, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}