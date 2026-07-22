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
  ChevronLeft,
  ChevronRight,
  ImageIcon,
  Maximize2,
  MousePointer2,
  Sparkles,
  X,
} from "lucide-react";
import { createPortal } from "react-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

export const Route = createFileRoute("/client-websites")({
  component: ClientWebsitesCaseStudy,
});

type ProjectImage = {
  src: string;
  alt: string;
  label: string;
};

type ClientProject = {
  id: string;
  name: string;
  tone: "fuchsia" | "violet" | "cyan" | "rose" | "amber";
  images: ProjectImage[];
};

type LightboxState = {
  client: ClientProject;
  index: number;
} | null;

const CLIENTS: ClientProject[] = [
  {
    id: "sany-perkasa",
    name: "Sany Perkasa",
    tone: "fuchsia",
    images: [
      { src: "/images/client-websites/sany-perkasa/screen-01.png", alt: "Sany Perkasa website mockup 1", label: "Sany Perkasa" }
    ],
  },
  {
    id: "ocean-dental",
    name: "Ocean Dental",
    tone: "violet",
    images: [
      { src: "/images/client-websites/ocean-dental/screen-01.png", alt: "Ocean Dental website mockup 1", label: "Design Homepage healthcare 1" },
      { src: "/images/client-websites/ocean-dental/screen-02.png", alt: "Ocean Dental website mockup 2", label: "Design Homepage healthcare 2" },
      { src: "/images/client-websites/ocean-dental/screen-03.png", alt: "Ocean Dental website mockup 3", label: "Design Homepage healthcare 3" }
    ],
  },
  {
    id: "equnix",
    name: "Equnix",
    tone: "cyan",
    images: [
      { src: "/images/client-websites/equnix/screen-01.png", alt: "Equnix website mockup 1", label: "Homepage Equnix" }
    ],
  },
  {
    id: "ghelsa-aqua-tech",
    name: "Ghelsa Aqua Tech",
    tone: "rose",
    images: [
      { src: "/images/client-websites/ghelsa-aqua-tech/screen-01.png", alt: "Ghelsa Aqua Tech website mockup 1", label: "homepage" },
      { src: "/images/client-websites/ghelsa-aqua-tech/screen-02.png", alt: "Ghelsa Aqua Tech website mockup 2", label: "Kontak" },
      { src: "/images/client-websites/ghelsa-aqua-tech/screen-03.png", alt: "Ghelsa Aqua Tech website mockup 3", label: "Services" },
      { src: "/images/client-websites/ghelsa-aqua-tech/screen-04.png", alt: "Ghelsa Aqua Tech website mockup 4", label: "Tentang-Kami" }
    ],
  },
  {
    id: "bpb",
    name: "BPB",
    tone: "rose",
    images: [
      { src: "/images/client-websites/bpb/screen-01.png", alt: "BPB website mockup 1", label: "BPB" }
    ],
  },
  {
    id: "diyamatrix-cubicle",
    name: "Diyamatrix Cubicle",
    tone: "amber",
    images: [
      { src: "/images/client-websites/diyamatrix-cubicle/screen-01.png", alt: "Diyamatrix Cubicle website mockup 1", label: "About-Us" },
      { src: "/images/client-websites/diyamatrix-cubicle/screen-02.png", alt: "Diyamatrix Cubicle website mockup 2", label: "Contact-Us" },
      { src: "/images/client-websites/diyamatrix-cubicle/screen-03.png", alt: "Diyamatrix Cubicle website mockup 3", label: "diyamatrixcubicle-ΓÇô-Diya-Matrix-Cubicle-menyediakan-berbagai-material-bangunan-dan-interior-untuk-kebutuhan-proyek-komersial-maupun-industri--05-20-2026_10_51_AM" },
      { src: "/images/client-websites/diyamatrix-cubicle/screen-04.png", alt: "Diyamatrix Cubicle website mockup 4", label: "Product" },
      { src: "/images/client-websites/diyamatrix-cubicle/screen-05.png", alt: "Diyamatrix Cubicle website mockup 5", label: "Project" }
    ],
  },
  {
    id: "gmm-mobil",
    name: "GMM Mobil",
    tone: "amber",
    images: [
      { src: "/images/client-websites/gmm-mobil/screen-01.png", alt: "GMM Mobil website mockup 1", label: "gmm mobil" }
    ],
  },
  {
    id: "jaya-cocoa",
    name: "Jaya Cocoa",
    tone: "amber",
    images: [
      {
        src: "/images/client-websites/jaya-cocoa/screen-01.png",
        alt: "Jaya Cocoa website mockup 1",
        label: "Jaya Cocoa Page 01",
      },
      {
        src: "/images/client-websites/jaya-cocoa/screen-02.png",
        alt: "Jaya Cocoa website mockup 2",
        label: "Jaya Cocoa Page 02",
      },
      {
        src: "/images/client-websites/jaya-cocoa/screen-03.png",
        alt: "Jaya Cocoa website mockup 3",
        label: "Jaya Cocoa Page 03",
      },
      {
        src: "/images/client-websites/jaya-cocoa/screen-04.png",
        alt: "Jaya Cocoa website mockup 4",
        label: "Jaya Cocoa Page 04",
      },
      {
        src: "/images/client-websites/jaya-cocoa/screen-05.png",
        alt: "Jaya Cocoa website mockup 5",
        label: "Jaya Cocoa Page 05",
      },
      {
        src: "/images/client-websites/jaya-cocoa/screen-06.png",
        alt: "Jaya Cocoa website mockup 6",
        label: "Jaya Cocoa Page 06",
      },
    ],
  },
  {
    id: "nutrafor",
    name: "Nutrafor",
    tone: "fuchsia",
    images: [
      { src: "/images/client-websites/nutrafor/screen-01.png", alt: "Nutrafor website mockup 1", label: "Design Nutrafor" }
    ],
  },
  {
    id: "jaya-cocoa-international",
    name: "Jaya Cocoa International",
    tone: "fuchsia",
    images: [
      { src: "/images/client-websites/jaya-cocoa-international/screen-01.png", alt: "Jaya Cocoa International website mockup 1", label: "About Us" },
      { src: "/images/client-websites/jaya-cocoa-international/screen-02.png", alt: "Jaya Cocoa International website mockup 2", label: "About-Jaya-Cocoa-Indonesian-05-20-2026_11_10_AM" },
      { src: "/images/client-websites/jaya-cocoa-international/screen-03.png", alt: "Jaya Cocoa International website mockup 3", label: "Blog" },
      { src: "/images/client-websites/jaya-cocoa-international/screen-04.png", alt: "Jaya Cocoa International website mockup 4", label: "Contact-Jaya-Cocoa-Indonesian-05-20-2026_11_12_AM" },
      { src: "/images/client-websites/jaya-cocoa-international/screen-05.png", alt: "Jaya Cocoa International website mockup 5", label: "Contact" },
      { src: "/images/client-websites/jaya-cocoa-international/screen-06.png", alt: "Jaya Cocoa International website mockup 6", label: "Gallery-Jaya-Cocoa-Indonesian-05-20-2026_11_11_AM" },
      { src: "/images/client-websites/jaya-cocoa-international/screen-07.png", alt: "Jaya Cocoa International website mockup 7", label: "Gallery" },
      { src: "/images/client-websites/jaya-cocoa-international/screen-08.png", alt: "Jaya Cocoa International website mockup 8", label: "Insight-Jaya-Cocoa-Indonesian-05-20-2026_11_11_AM" },
      { src: "/images/client-websites/jaya-cocoa-international/screen-09.png", alt: "Jaya Cocoa International website mockup 9", label: "Jaya-Cocoa-Trusted-Supplier-Cocoa-Powder-From-Indonesia-05-20-2026_11_09_AM" },
      { src: "/images/client-websites/jaya-cocoa-international/screen-10.png", alt: "Jaya Cocoa International website mockup 10", label: "Jaya-Cocoa-ΓÇô-Custom-Cocoa-Solutions-for-Your-Business-05-19-2026_02_52_PM" },
      { src: "/images/client-websites/jaya-cocoa-international/screen-11.png", alt: "Jaya Cocoa International website mockup 11", label: "Our-Product-Jaya-Cocoa-Indonesian-05-20-2026_11_10_AM" },
      { src: "/images/client-websites/jaya-cocoa-international/screen-12.png", alt: "Jaya Cocoa International website mockup 12", label: "Product" }
    ],
  },
  {
    id: "stt-periago",
    name: "STT Periago",
    tone: "violet",
    images: [
      { src: "/images/client-websites/stt-periago/screen-01.png", alt: "STT Periago website mockup 1", label: "01_Homepage STT Periago" }
    ],
  },
  {
    id: "abadi-makmur-cemerlang",
    name: "Abadi Makmur Cemerlang",
    tone: "violet",
    images: [
      { src: "/images/client-websites/abadi-makmur-cemerlang/screen-01.png", alt: "Abadi Makmur Cemerlang website mockup 1", label: "homepage" },
      { src: "/images/client-websites/abadi-makmur-cemerlang/screen-02.png", alt: "Abadi Makmur Cemerlang website mockup 2", label: "About-Us" },
      { src: "/images/client-websites/abadi-makmur-cemerlang/screen-03.png", alt: "Abadi Makmur Cemerlang website mockup 3", label: "Contact" },
      { src: "/images/client-websites/abadi-makmur-cemerlang/screen-04.png", alt: "Abadi Makmur Cemerlang website mockup 4", label: "Product" },
      { src: "/images/client-websites/abadi-makmur-cemerlang/screen-05.png", alt: "Abadi Makmur Cemerlang website mockup 5", label: "Project-References" }
    ],
  },
  {
    id: "ekakarya",
    name: "Ekakarya",
    tone: "cyan",
    images: [
      { src: "/images/client-websites/ekakarya/screen-01.png", alt: "Ekakarya website mockup 1", label: "Ekakarya" }
    ],
  },
  {
    id: "cubicle-toilet",
    name: "Cubicle Toilet",
    tone: "cyan",
    images: [
      { src: "/images/client-websites/cubicle-toilet/screen-01.png", alt: "Cubicle Toilet website mockup 1", label: "About-Us-ΓÇô-cubicletoiletindonesia-05-20-2026_11_05_AM" },
      { src: "/images/client-websites/cubicle-toilet/screen-02.png", alt: "Cubicle Toilet website mockup 2", label: "Contact-Us-ΓÇô-cubicletoiletindonesia-05-20-2026_11_07_AM" },
      { src: "/images/client-websites/cubicle-toilet/screen-03.png", alt: "Cubicle Toilet website mockup 3", label: "cubicletoiletindonesia-ΓÇô-Cubicle-Toilet-Indonesia-adalah-supplier-dan-kontraktor-cubicle-toilet-05-20-2026_11_05_AM" },
      { src: "/images/client-websites/cubicle-toilet/screen-04.png", alt: "Cubicle Toilet website mockup 4", label: "Product-ΓÇô-cubicletoiletindonesia-05-20-2026_11_06_AM" },
      { src: "/images/client-websites/cubicle-toilet/screen-05.png", alt: "Cubicle Toilet website mockup 5", label: "Project-ΓÇô-cubicletoiletindonesia-05-20-2026_11_06_AM" }
    ],
  },
  {
    id: "yuropowertune",
    name: "Yuropowertune",
    tone: "amber",
    images: [
      { src: "/images/client-websites/yuropowertune/screen-01.png", alt: "Yuropowertune website mockup 1", label: "HOMEPAGE" }
    ],
  },
  {
    id: "sparta-server",
    name: "Sparta Server",
    tone: "rose",
    images: [
      { src: "/images/client-websites/sparta-server/screen-01.png", alt: "Sparta Server website mockup 1", label: "homepage" },
      { src: "/images/client-websites/sparta-server/screen-02.png", alt: "Sparta Server website mockup 2", label: "Email-Communication-Jasa-IT-Server-1-Indonesia-05-19-2026_02_20_PM" },
      { src: "/images/client-websites/sparta-server/screen-03.png", alt: "Sparta Server website mockup 3", label: "IT Support" },
      { src: "/images/client-websites/sparta-server/screen-04.png", alt: "Sparta Server website mockup 4", label: "Layanan ISP" },
      { src: "/images/client-websites/sparta-server/screen-05.png", alt: "Sparta Server website mockup 5", label: "Mikrotik-Routing-Solutions-Jasa-IT-Server-1-Indonesia-05-19-2026_02_19_PM" },
      { src: "/images/client-websites/sparta-server/screen-06.png", alt: "Sparta Server website mockup 6", label: "Network Support" },
      { src: "/images/client-websites/sparta-server/screen-07.png", alt: "Sparta Server website mockup 7", label: "Network-Internet-Services-Jasa-IT-Server-1-Indonesia-05-19-2026_02_18_PM" },
      { src: "/images/client-websites/sparta-server/screen-08.png", alt: "Sparta Server website mockup 8", label: "Sewa-Server-HP-ProLiant-HPE-Jasa-IT-Server-1-Indonesia-05-19-2026_03_31_PM" },
      { src: "/images/client-websites/sparta-server/screen-09.png", alt: "Sparta Server website mockup 9", label: "Sewa-Server-Huawei-Jasa-IT-Server-1-Indonesia-05-19-2026_03_32_PM" }
    ],
  },
  {
    id: "gundul-jujur",
    name: "Gundul Jujur",
    tone: "fuchsia",
    images: [
      { src: "/images/client-websites/gundul-jujur/screen-01.png", alt: "Gundul Jujur website mockup 1", label: "homepage" }
    ],
  },
  {
    id: "kusen-aluminium-jogja",
    name: "Kusen Aluminium Jogja",
    tone: "cyan",
    images: [
      { src: "/images/client-websites/kusen-aluminium-jogja/screen-01.png", alt: "Kusen Aluminium Jogja website mockup 1", label: "homepage" },
      { src: "/images/client-websites/kusen-aluminium-jogja/screen-02.png", alt: "Kusen Aluminium Jogja website mockup 2", label: "blog" },
      { src: "/images/client-websites/kusen-aluminium-jogja/screen-03.png", alt: "Kusen Aluminium Jogja website mockup 3", label: "kontak kami" },
      { src: "/images/client-websites/kusen-aluminium-jogja/screen-04.png", alt: "Kusen Aluminium Jogja website mockup 4", label: "produk kami" },
      { src: "/images/client-websites/kusen-aluminium-jogja/screen-05.png", alt: "Kusen Aluminium Jogja website mockup 5", label: "tentang kami" }
    ],
  },
  {
    id: "jasa-pindahan-adv",
    name: "Jasa Pindahan ADV",
    tone: "violet",
    images: [
      { src: "/images/client-websites/jasa-pindahan-adv/screen-01.png", alt: "Jasa Pindahan ADV website mockup 1", label: "Jasa-Pindahan-ΓÇô-Tanpa-Ribet-Semua-Kami-Urus-05-19-2026_02_50_PM" }
    ],
  },
  {
    id: "laptopgo",
    name: "LaptopGO",
    tone: "rose",
    images: [
      { src: "/images/client-websites/laptopgo/screen-01.png", alt: "LaptopGO website mockup 1", label: "homepage" },
      { src: "/images/client-websites/laptopgo/screen-02.png", alt: "LaptopGO website mockup 2", label: "Laptop-Asus-LaptopGO-05-19-2026_03_34_PM" },
      { src: "/images/client-websites/laptopgo/screen-03.png", alt: "LaptopGO website mockup 3", label: "Laptop-HP-LaptopGO-05-19-2026_03_35_PM" },
      { src: "/images/client-websites/laptopgo/screen-04.png", alt: "LaptopGO website mockup 4", label: "Lokasi-Toko-LaptopGO-05-19-2026_03_37_PM" },
      { src: "/images/client-websites/laptopgo/screen-05.png", alt: "LaptopGO website mockup 5", label: "Service-Laptop-LaptopGO-05-19-2026_03_35_PM" },
      { src: "/images/client-websites/laptopgo/screen-06.png", alt: "LaptopGO website mockup 6", label: "Toko-Laptop-Pasar-Minggu-LaptopGo-Jakarta-Selatan-05-19-2026_03_38_PM" },
      { src: "/images/client-websites/laptopgo/screen-07.png", alt: "LaptopGO website mockup 7", label: "Toko-Laptop-Summarecon-Bekasi-LaptopGo-Bekasi-05-19-2026_03_37_PM" },
      { src: "/images/client-websites/laptopgo/screen-08.png", alt: "LaptopGO website mockup 8", label: "Upgrade-Laptop-LaptopGO-05-19-2026_03_36_PM" }
    ],
  },
  {
    id: "pijat-panggilan-jakarta",
    name: "Pijat Panggilan Jakarta",
    tone: "fuchsia",
    images: [
      { src: "/images/client-websites/pijat-panggilan-jakarta/screen-01.png", alt: "Pijat Panggilan Jakarta website mockup 1", label: "Pijat-Panggilan-Jakarta-Aromatherapy" }
    ],
  },
  {
    id: "fajar-mulia-teknologi",
    name: "Fajar Mulia Teknologi",
    tone: "amber",
    images: [
      { src: "/images/client-websites/fajar-mulia-teknologi/screen-01.png", alt: "Fajar Mulia Teknologi website mockup 1", label: "Fajar-Mulia-Teknologi-ΓÇô-Solusi-Sistem-Keamanan-Berkualitas-05-19-2026_03_14_PM" },
      { src: "/images/client-websites/fajar-mulia-teknologi/screen-02.png", alt: "Fajar Mulia Teknologi website mockup 2", label: "Paket-Harga-ΓÇô-Fajar-Mulia-Teknologi-05-19-2026_03_16_PM" }
    ],
  },
  {
    id: "me-massage-indonesia",
    name: "Me Massage Indonesia",
    tone: "cyan",
    images: [
      { src: "/images/client-websites/me-massage-indonesia/screen-01.png", alt: "Me Massage Indonesia website mockup 1", label: "Me-Massage-Indonesia" }
    ],
  },
  {
    id: "merveille-design-studio",
    name: "Merveille Design Studio",
    tone: "violet",
    images: [
      { src: "/images/client-websites/merveille-design-studio/screen-01.png", alt: "Merveille Design Studio website mockup 1", label: "homepage" },
      { src: "/images/client-websites/merveille-design-studio/screen-02.png", alt: "Merveille Design Studio website mockup 2", label: "LLOYD-3BR-ΓÇô-Merveille-Design-Studio-05-19-2026_03_09_PM" },
      { src: "/images/client-websites/merveille-design-studio/screen-03.png", alt: "Merveille Design Studio website mockup 3", label: "Portfolio" },
      { src: "/images/client-websites/merveille-design-studio/screen-04.png", alt: "Merveille Design Studio website mockup 4", label: "Sutera-Onyx-ΓÇô-Merveille-Design-Studio-05-19-2026_03_09_PM" }
    ],
  },
  {
    id: "raysan-abadi",
    name: "Raysan Abadi",
    tone: "rose",
    images: [
      { src: "/images/client-websites/raysan-abadi/screen-01.png", alt: "Raysan Abadi website mockup 1", label: "Raysan-Abadi-05-19-2026_03_44_PM" }
    ],
  },
  {
    id: "kontika",
    name: "Kontika",
    tone: "rose",
    images: [
      { src: "/images/client-websites/kontika/screen-01.png", alt: "Kontika website mockup 1", label: "homepage" },
      { src: "/images/client-websites/kontika/screen-02.png", alt: "Kontika website mockup 2", label: "Artificial-Intelligence-Regulation-In-Indonesian-Education-Frameworks-Challenges-And-Policy-Directions-ΓÇô-KONTIKA-05-19-2026_03_02_PM" },
      { src: "/images/client-websites/kontika/screen-03.png", alt: "Kontika website mockup 3", label: "Publications" },
      { src: "/images/client-websites/kontika/screen-04.png", alt: "Kontika website mockup 4", label: "Streaming-Platform-Regulation-Lessons-From-The-United-Kingdom-For-IndonesiaΓÇÖs-Growing-And-Protected-Digital-Ecosystem-ΓÇô-KONTIKA-05-19-2026_03_01_PM" },
      { src: "/images/client-websites/kontika/screen-05.png", alt: "Kontika website mockup 5", label: "The-Market-Crisis-Why-Knowledge-Management-Has-Become-Business-Critical-ΓÇô-KONTIKA-05-19-2026_03_01_PM" }
    ],
  },
  {
    id: "klinik-sehati",
    name: "Klinik Sehati",
    tone: "amber",
    images: [
      { src: "/images/client-websites/klinik-sehati/screen-01.png", alt: "Klinik Sehati website mockup 1", label: "Klinik-Sehati-05-21-2026_04_42_PM" }
    ],
  },
  {
    id: "megah-agung-sukses",
    name: "Megah Agung Sukses",
    tone: "amber",
    images: [
      { src: "/images/client-websites/megah-agung-sukses/screen-01.png", alt: "Megah Agung Sukses website mockup 1", label: "Home" },
      { src: "/images/client-websites/megah-agung-sukses/screen-02.png", alt: "Megah Agung Sukses website mockup 2", label: "About-Us" },
      { src: "/images/client-websites/megah-agung-sukses/screen-03.png", alt: "Megah Agung Sukses website mockup 3", label: "Contact" },
      { src: "/images/client-websites/megah-agung-sukses/screen-04.png", alt: "Megah Agung Sukses website mockup 4", label: "Product" },
      { src: "/images/client-websites/megah-agung-sukses/screen-05.png", alt: "Megah Agung Sukses website mockup 5", label: "Project" }
    ],
  },
  {
    id: "smp-al-nur",
    name: "SMP Al-Nur",
    tone: "fuchsia",
    images: [
      { src: "/images/client-websites/smp-al-nur/screen-01.png", alt: "SMP Al-Nur website mockup 1", label: "homepage" },
      { src: "/images/client-websites/smp-al-nur/screen-02.png", alt: "SMP Al-Nur website mockup 2", label: "Berita" },
      { src: "/images/client-websites/smp-al-nur/screen-03.png", alt: "SMP Al-Nur website mockup 3", label: "Fasilitas" },
      { src: "/images/client-websites/smp-al-nur/screen-04.png", alt: "SMP Al-Nur website mockup 4", label: "Guru-dan-Staf" },
      { src: "/images/client-websites/smp-al-nur/screen-05.png", alt: "SMP Al-Nur website mockup 5", label: "Informasi" },
      { src: "/images/client-websites/smp-al-nur/screen-06.png", alt: "SMP Al-Nur website mockup 6", label: "Profil-Sekolah" }
    ],
  },
  {
    id: "shirin-zein",
    name: "Shirin Zein",
    tone: "violet",
    images: [
      { src: "/images/client-websites/shirin-zein/screen-01.png", alt: "Shirin Zein website mockup 1", label: "About-us" },
      { src: "/images/client-websites/shirin-zein/screen-02.png", alt: "Shirin Zein website mockup 2", label: "Affiliate" },
      { src: "/images/client-websites/shirin-zein/screen-03.png", alt: "Shirin Zein website mockup 3", label: "ARISTA-SERIES-ΓÇô-Shirin-Zein-05-19-2026_03_52_PM" },
      { src: "/images/client-websites/shirin-zein/screen-04.png", alt: "Shirin Zein website mockup 4", label: "BLOUSE-MAUDY-ΓÇô-Shirin-Zein-05-19-2026_03_51_PM" },
      { src: "/images/client-websites/shirin-zein/screen-05.png", alt: "Shirin Zein website mockup 5", label: "Collaboration" },
      { src: "/images/client-websites/shirin-zein/screen-06.png", alt: "Shirin Zein website mockup 6", label: "Shirin-Zein" },
      { src: "/images/client-websites/shirin-zein/screen-07.png", alt: "Shirin Zein website mockup 7", label: "Shop" },
      { src: "/images/client-websites/shirin-zein/screen-08.png", alt: "Shirin Zein website mockup 8", label: "Wholesale" }
    ],
  },
  {
    id: "symphony-ac",
    name: "Symphony AC",
    tone: "cyan",
    images: [
      { src: "/images/client-websites/symphony-ac/screen-01.png", alt: "Symphony AC website mockup 1", label: "Jual-AC-Ceiling-Suspended-ΓÇô-Jual-AC-Split-Daikin-05-20-2026_04_14_PM" },
      { src: "/images/client-websites/symphony-ac/screen-02.png", alt: "Symphony AC website mockup 2", label: "Jual-AC-Flife-by-Gree-ΓÇô-Jual-AC-Split-Daikin-05-20-2026_04_12_PM" },
      { src: "/images/client-websites/symphony-ac/screen-03.png", alt: "Symphony AC website mockup 3", label: "Jual-AC-Gree-Split-ΓÇô-Jual-AC-Split-Daikin-05-20-2026_04_13_PM" },
      { src: "/images/client-websites/symphony-ac/screen-04.png", alt: "Symphony AC website mockup 4", label: "Jual-AC-Multi-S-Daikin-ΓÇô-Jual-AC-Split-Daikin-05-20-2026_04_11_PM" },
      { src: "/images/client-websites/symphony-ac/screen-05.png", alt: "Symphony AC website mockup 5", label: "Jual-AC-Split-Daikin-ΓÇô-Toko-Spesialis-AC-Distributor-AC-Tangerang-05-20-2026_04_11_PM" },
      { src: "/images/client-websites/symphony-ac/screen-06.png", alt: "Symphony AC website mockup 6", label: "Jual-Air-Purifier-ΓÇô-Jual-AC-Split-Daikin-05-20-2026_04_13_PM" }
    ],
  }
];

const TONE_STYLES: Record<ClientProject["tone"], {
  glow: string;
  text: string;
  border: string;
  soft: string;
}> = {
  fuchsia: {
    glow: "rgba(217,70,239,0.22)",
    text: "text-fuchsia-400",
    border: "border-fuchsia-400/30",
    soft: "bg-fuchsia-500/10",
  },
  violet: {
    glow: "rgba(139,92,246,0.22)",
    text: "text-violet-400",
    border: "border-violet-400/30",
    soft: "bg-violet-500/10",
  },
  cyan: {
    glow: "rgba(34,211,238,0.2)",
    text: "text-cyan-400",
    border: "border-cyan-400/30",
    soft: "bg-cyan-500/10",
  },
  rose: {
    glow: "rgba(244,63,94,0.2)",
    text: "text-rose-400",
    border: "border-rose-400/30",
    soft: "bg-rose-500/10",
  },
  amber: {
    glow: "rgba(245,158,11,0.2)",
    text: "text-amber-400",
    border: "border-amber-400/30",
    soft: "bg-amber-500/10",
  },
};

type ClientLayout =
  | "wide"
  | "split"
  | "split-reverse"
  | "fan"
  | "rail";

const CLIENT_LAYOUTS: Record<string, ClientLayout> = {
  "sany-perkasa": "wide",
  "ocean-dental": "split",
  equnix: "wide",
  bpb: "wide",
  "gmm-mobil": "wide",
  nutrafor: "wide",
  "stt-periago": "wide",
  ekakarya: "wide",
  "ghelsa-aqua-tech": "fan",
  "diyamatrix-cubicle": "rail",
  "jaya-cocoa": "rail",
  "jaya-cocoa-international": "fan",
  "abadi-makmur-cemerlang": "split-reverse",
  "cubicle-toilet": "fan",
  "sparta-server": "rail",
  yuropowertune: "wide",
  "gundul-jujur": "split",
  "jasa-pindahan-adv": "wide",
  "kusen-aluminium-jogja": "fan",
  laptopgo: "rail",
  "fajar-mulia-teknologi": "wide",
  "pijat-panggilan-jakarta": "split",
  "merveille-design-studio": "split-reverse",
  "me-massage-indonesia": "wide",
  kontika: "rail",
  "megah-agung-sukses": "rail",
  "smp-al-nur": "split",
  "shirin-zein": "split-reverse",
  "symphony-ac": "fan",
  "raysan-abadi": "wide",
  "klinik-sehati": "wide",
};


function ClientWebsitesCaseStudy() {
  const pageRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { isDark } = useTheme();

  const [lightbox, setLightbox] = useState<LightboxState>(null);
  const [activeClient, setActiveClient] = useState(CLIENTS[0].id);

  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end end"],
  });

  const progressScale = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.25,
  });

  const heroY = useTransform(scrollYProgress, [0, 0.14], [0, -130]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0.25]);

  const heroClients = useMemo(() => {
    const heroClientIds = [
      "sany-perkasa",
      "ocean-dental",
      "equnix",
      "bpb",
      "gmm-mobil",
      "nutrafor",
      "stt-periago",
      "ekakarya",
      "ghelsa-aqua-tech",
      "diyamatrix-cubicle",
      "jaya-cocoa",
      "jaya-cocoa-international",
    ];

    return heroClientIds
      .map((clientId) => CLIENTS.find((client) => client.id === clientId))
      .filter((client): client is ClientProject => Boolean(client));
  }, []);

  const moveLightbox = (direction: "prev" | "next") => {
    setLightbox((current) => {
      if (!current) return current;

      const offset = direction === "next" ? 1 : -1;
      return {
        ...current,
        index:
          (current.index + offset + current.client.images.length) %
          current.client.images.length,
      };
    });
  };

  useEffect(() => {
    const sections = CLIENTS.map((client) =>
      document.getElementById(`client-${client.id}`),
    ).filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          setActiveClient(visible.target.id.replace("client-", ""));
        }
      },
      {
        rootMargin: "-28% 0px -58% 0px",
        threshold: [0.05, 0.18, 0.42],
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
                  aria-label={`${lightbox.client.name} website preview`}
                  initial={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: 28, scale: 0.97 }
                  }
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: 20, scale: 0.98 }
                  }
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  onMouseDown={(event) => event.stopPropagation()}
                  className="relative flex max-h-[94vh] w-full max-w-[1500px] flex-col overflow-hidden rounded-[1.8rem] border border-white/15 bg-[#070707] shadow-[0_35px_140px_rgba(0,0,0,0.92)]"
                >
                  <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 md:px-7">
                    <div className="min-w-0">
                      <p className="text-[9px] uppercase tracking-[0.3em] text-white/35">
                        Client Website Archive
                      </p>
                      <p className="mt-1 truncate text-sm text-white/80 md:text-base">
                        {lightbox.client.name} · {lightbox.client.images[lightbox.index].label}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setLightbox(null)}
                      aria-label="Close image preview"
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/[0.05] text-white/65 transition hover:rotate-90 hover:border-fuchsia-300/45 hover:text-white"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="relative min-h-0 flex-1 overflow-auto bg-black/60 p-3 md:p-6">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={lightbox.client.images[lightbox.index].src}
                        initial={{ opacity: 0, x: 18 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -18 }}
                        transition={{ duration: 0.28 }}
                        className="mx-auto flex min-h-full w-full items-start justify-center"
                      >
                        <ImageWithFallback
                          image={lightbox.client.images[lightbox.index]}
                          className="h-auto max-h-none w-full max-w-[1240px] object-contain"
                        />
                      </motion.div>
                    </AnimatePresence>

                    {lightbox.client.images.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={() => moveLightbox("prev")}
                          aria-label="Previous website screen"
                          className="fixed left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white/70 backdrop-blur-md transition hover:border-fuchsia-300/50 hover:bg-fuchsia-500/20 hover:text-white md:left-8"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => moveLightbox("next")}
                          aria-label="Next website screen"
                          className="fixed right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white/70 backdrop-blur-md transition hover:border-fuchsia-300/50 hover:bg-fuchsia-500/20 hover:text-white md:right-8"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </>
                    )}
                  </div>

                  <div className="flex items-center justify-between border-t border-white/10 px-5 py-4 md:px-7">
                    <span className="text-xs text-white/35">
                      Scroll to inspect the complete page
                    </span>
                    <span className="font-display text-lg italic text-white/70">
                      {String(lightbox.index + 1).padStart(2, "0")}
                      <span className="mx-1.5 text-white/20">/</span>
                      {String(lightbox.client.images.length).padStart(2, "0")}
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
    <div ref={pageRef} className="relative overflow-clip bg-bg text-text-primary">
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progressScale }}
        className="fixed inset-x-0 top-0 z-[90] h-[2px] origin-left bg-gradient-to-r from-fuchsia-400 via-violet-400 to-cyan-400"
      />

      <header className="fixed inset-x-0 top-0 z-[70] px-4 pt-4 md:px-7 md:pt-6">
        <div
          className={`mx-auto flex max-w-[1440px] items-center justify-between rounded-full border border-stroke bg-surface/82 px-3 py-2 backdrop-blur-xl md:px-4 ${
            isDark
              ? "shadow-[0_15px_55px_rgba(0,0,0,0.48),inset_0_1px_0_rgba(255,255,255,0.07)]"
              : "shadow-[0_15px_50px_rgba(70,35,65,0.14),inset_0_1px_0_rgba(255,255,255,0.95)]"
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
            31 Client Websites · Visual Archive
          </span>

          <ThemeToggle />
        </div>
      </header>

      <section className="relative min-h-[100svh] overflow-hidden bg-[#050505]">
        <motion.div
          style={prefersReducedMotion ? undefined : { y: heroY, opacity: heroOpacity }}
          className="absolute inset-0"
        >
          <HeroCollage clients={heroClients} />
        </motion.div>

        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,70,239,0.18),transparent_32%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/40 to-black/85" />

        <div className="relative z-10 flex min-h-[100svh] items-center justify-center px-6 text-center">
          <motion.div
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 30, scale: 0.97 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[10px] uppercase tracking-[0.42em] text-white/55 md:text-xs">
              Multi-industry web design archive
            </p>

            <h1 className="mx-auto mt-6 max-w-6xl text-[clamp(4rem,11vw,10rem)] leading-[0.82] tracking-[-0.075em] text-white">
              31 Client
              <span className="block font-display italic text-fuchsia-300">
                Websites.
              </span>
            </h1>

            <p className="mx-auto mt-8 max-w-2xl text-sm leading-7 text-white/62 md:text-lg md:leading-8">
              A visual-first collection of client websites across technology,
              healthcare, retail, education, architecture, services, and more.
            </p>
          </motion.div>
        </div>

        <a
          href="#archive"
          aria-label="Scroll to client website archive"
          className="group absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-3 text-white/55 transition hover:text-fuchsia-300 md:bottom-10"
        >
          <span className="text-[9px] uppercase tracking-[0.32em]">
            Scroll to explore
          </span>
          <span className="relative flex h-12 w-7 justify-center rounded-full border border-current">
            <motion.span
              className="absolute top-2 h-1.5 w-1.5 rounded-full bg-current"
              animate={
                prefersReducedMotion
                  ? undefined
                  : { y: [0, 18, 0], opacity: [1, 0.25, 1] }
              }
              transition={
                prefersReducedMotion
                  ? undefined
                  : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
              }
            />
          </span>
        </a>
      </section>

      <section id="archive" className="scroll-mt-28 px-5 py-24 md:px-9 md:py-32 lg:px-14">
        <div className="mx-auto max-w-[1180px]">
          <Reveal>
            <div className="grid gap-8 border-b border-stroke pb-12 xl:grid-cols-[0.88fr_1.12fr] xl:items-end">
              <div>
                <p className="text-[10px] uppercase tracking-[0.34em] text-fuchsia-400">
                  Selected client archive
                </p>
                <h2 className="mt-4 text-4xl leading-[0.98] tracking-[-0.055em] text-text-primary md:text-5xl xl:text-6xl">
                  The websites are the story.
                </h2>
              </div>

              <div className="xl:pb-2">
                <p className="max-w-2xl text-sm leading-7 text-muted md:text-base md:leading-8">
                  Each client is presented through a different visual rhythm—full-width browser frames,
                  layered windows, split compositions, and animated image rails—so the archive stays expressive without hiding the work behind long explanations.
                </p>
                <div className="mt-6 flex items-center gap-3 text-xs text-muted">
                  <MousePointer2 className="h-4 w-4 text-fuchsia-400" />
                  Click any mockup to inspect the full page.
                </div>
              </div>
            </div>
          </Reveal>

          <div className="mt-12 space-y-16 md:mt-16 md:space-y-20">
            {CLIENTS.map((client, index) => (
              <ClientShowcase
                key={client.id}
                client={client}
                index={index}
                isActive={activeClient === client.id}
                onOpen={(imageIndex) => setLightbox({ client, index: imageIndex })}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-24 md:px-9 md:pb-36 lg:px-14">
        <div className="mx-auto max-w-[1180px]">
          <div className="relative overflow-hidden rounded-[2.7rem] border border-stroke bg-surface px-6 py-16 text-center md:px-10 md:py-24">
            <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[650px] -translate-x-1/2 rounded-full bg-fuchsia-500/12 blur-[120px]" />
            <div className="relative">
              <Sparkles className="mx-auto h-7 w-7 text-fuchsia-400" />
              <p className="mt-7 text-[9px] uppercase tracking-[0.34em] text-muted">
                Visual archive complete
              </p>
              <h2 className="mx-auto mt-5 max-w-4xl text-4xl leading-[1.04] tracking-[-0.05em] text-text-primary md:text-6xl">
                Different industries. Different visual systems. One evolving web-design practice.
              </h2>
              <a
                href="/#work"
                className="group mx-auto mt-10 inline-flex items-center gap-3 rounded-full border border-stroke bg-surface-elevated px-6 py-3.5 text-sm text-text-secondary transition hover:-translate-y-1 hover:border-fuchsia-400/45 hover:bg-fuchsia-500/10 hover:text-text-primary"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to selected projects
              </a>
            </div>
          </div>
        </div>
      </section>

      {lightboxPortal}
    </div>
  );
}

function HeroCollage({ clients }: { clients: ClientProject[] }) {
  const prefersReducedMotion = useReducedMotion();
  const columns = [
    clients.slice(0, 4),
    clients.slice(4, 8),
    clients.slice(8, 12),
  ];

  return (
    <div className="grid h-full grid-cols-3 gap-4 px-3 opacity-80 md:gap-6 md:px-7">
      {columns.map((column, columnIndex) => {
        const movement =
          columnIndex % 2 === 0
            ? { y: [20, -220, 20] }
            : { y: [-190, 30, -190] };

        return (
          <motion.div
            key={columnIndex}
            className="flex flex-col gap-4 md:gap-6"
            animate={prefersReducedMotion ? undefined : movement}
            transition={
              prefersReducedMotion
                ? undefined
                : {
                    duration: 12 + columnIndex * 1.5,
                    repeat: Infinity,
                    ease: "linear",
                  }
            }
            style={{
              willChange: "transform",
              transform: "translateZ(0)",
            }}
          >
            {column.map((client) => (
              <div
                key={client.id}
                className="overflow-hidden rounded-[1.2rem] border border-white/10 bg-white/[0.04] p-1.5 shadow-[0_18px_45px_rgba(0,0,0,0.28)] md:rounded-[1.6rem] md:p-2"
                style={{
                  contain: "layout paint",
                  transform: "translateZ(0)",
                }}
              >
                <ImageWithFallback
                  image={client.images[0]}
                  className="aspect-[4/3] w-full rounded-[0.9rem] object-cover object-top md:rounded-[1.25rem]"
                />
              </div>
            ))}
          </motion.div>
        );
      })}
    </div>
  );
}

function ClientShowcase({
  client,
  index,
  isActive,
  onOpen,
}: {
  client: ClientProject;
  index: number;
  isActive: boolean;
  onOpen: (imageIndex: number) => void;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [55, -55]);
  const tone = TONE_STYLES[client.tone];
  const resolvedLayout = CLIENT_LAYOUTS[client.id] ?? "wide";

  const previewImages = client.images.slice(
    0,
    Math.min(client.images.length, 3),
  );

  const disableSectionParallax =
    prefersReducedMotion || resolvedLayout === "wide";

  return (
    <motion.section
      ref={sectionRef}
      id={`client-${client.id}`}
      className="scroll-mt-32"
      style={{ "--client-glow": tone.glow } as CSSProperties}
    >
      <div className="mx-auto w-full max-w-[920px]">
        <Reveal>
          <div className="mb-5 flex w-full items-end justify-between gap-5 md:mb-6">
            <div>
              <p
                className={`text-[9px] uppercase tracking-[0.3em] ${tone.text}`}
              >
                {String(index + 1).padStart(2, "0")} · Client website
              </p>

              <h3 className="mt-2 text-2xl tracking-[-0.04em] text-text-primary md:text-3xl">
                {client.name}
              </h3>
            </div>

            <div
              className={`hidden shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 text-[11px] text-muted md:flex ${
                isActive
                  ? `${tone.border} ${tone.soft}`
                  : "border-stroke bg-surface-elevated"
              }`}
            >
              {client.images.length}{" "}
              {client.images.length === 1 ? "screen" : "screens"}

              <ArrowUpRight className={`h-4 w-4 ${tone.text}`} />
            </div>
          </div>
        </Reveal>

        <motion.div style={disableSectionParallax ? undefined : { y }}>
          {resolvedLayout === "wide" && (
            <WideBrowserVisual
              client={client}
              image={previewImages[0]}
              onOpen={() => onOpen(0)}
            />
          )}

          {resolvedLayout === "split" && (
            <SplitVisual
              client={client}
              images={previewImages}
              reverse={false}
              onOpen={onOpen}
            />
          )}

          {resolvedLayout === "split-reverse" && (
            <SplitVisual
              client={client}
              images={previewImages}
              reverse
              onOpen={onOpen}
            />
          )}

          {resolvedLayout === "fan" && (
            <FanVisual
              client={client}
              images={previewImages}
              onOpen={onOpen}
            />
          )}

          {resolvedLayout === "rail" && (
            <RailVisual
              client={client}
              images={client.images}
              onOpen={onOpen}
            />
          )}
        </motion.div>
      </div>
    </motion.section>
  );
}

function BrowserFrame({
  image,
  className = "",
  imageClassName = "",
  onClick,
}: {
  image: ProjectImage;
  className?: string;
  imageClassName?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group overflow-hidden rounded-[1.3rem] border border-stroke bg-surface text-left shadow-[0_18px_58px_rgba(0,0,0,0.18)] transition duration-500 hover:-translate-y-1 hover:border-fuchsia-400/35 ${className}`}
      aria-label={`Open ${image.alt}`}
    >
      <div className="flex h-9 items-center gap-2 border-b border-stroke bg-surface-elevated px-3.5">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
        <span className="ml-3 h-5 flex-1 rounded-full border border-stroke bg-surface/70" />
      </div>
      <div className={`relative overflow-hidden bg-black/5 ${imageClassName}`}>
        <ImageWithFallback
          image={image}
          className="h-full w-full scale-[1.12] object-cover object-top transition duration-700 group-hover:scale-[1.17]"
        />
        <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white/75 opacity-0 backdrop-blur-md transition group-hover:opacity-100">
          <Maximize2 className="h-4 w-4" />
        </span>
      </div>
    </button>
  );
}

function WideBrowserVisual({
  client,
  image,
  onOpen,
}: {
  client: ClientProject;
  image: ProjectImage;
  onOpen: () => void;
}) {
  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute inset-x-[12%] -top-12 h-44 rounded-full blur-[85px]"
        style={{ background: "var(--client-glow)" }}
      />
      <BrowserFrame
        image={image}
        onClick={onOpen}
        className="relative mx-auto w-full max-w-full !translate-y-0 !rotate-0 transform-none hover:!translate-y-0"
        imageClassName="h-[250px] md:h-[340px]"
      />
      {client.images.length > 1 && (
        <p className="mx-auto mt-3 max-w-full text-right text-[11px] text-muted">
          +{client.images.length - 1} additional screens in the gallery
        </p>
      )}
    </div>
  );
}

function SplitVisual({
  client,
  images,
  reverse,
  onOpen,
}: {
  client: ClientProject;
  images: ProjectImage[];
  reverse: boolean;
  onOpen: (index: number) => void;
}) {
  const secondary = images[1] ?? images[0];
  const tertiary = images[2] ?? secondary;

  return (
    <div
      className={`mx-auto grid max-w-full gap-4 xl:grid-cols-[1.1fr_0.9fr] ${
        reverse ? "xl:[&>*:first-child]:order-2" : ""
      }`}
    >
      <BrowserFrame
        image={images[0]}
        onClick={() => onOpen(0)}
        imageClassName="h-[250px] md:h-[350px]"
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
        <BrowserFrame
          image={secondary}
          onClick={() => onOpen(Math.min(1, client.images.length - 1))}
          imageClassName="h-[150px] md:h-[165px]"
        />
        <BrowserFrame
          image={tertiary}
          onClick={() => onOpen(Math.min(2, client.images.length - 1))}
          imageClassName="h-[150px] md:h-[165px]"
        />
      </div>
    </div>
  );
}

function FanVisual({
  client,
  images,
  onOpen,
}: {
  client: ClientProject;
  images: ProjectImage[];
  onOpen: (index: number) => void;
}) {
  const arranged = [images[1] ?? images[0], images[0], images[2] ?? images[0]];

  return (
    <div className="relative mx-auto flex min-h-[340px] max-w-full items-center justify-center overflow-hidden rounded-[1.8rem] border border-stroke bg-surface p-4 md:min-h-[440px] md:p-7">
      <div
        className="pointer-events-none absolute h-[520px] w-[520px] rounded-full blur-[110px]"
        style={{ background: "var(--client-glow)" }}
      />
      {arranged.map((image, arrangedIndex) => {
        const rotations = [-7, 0, 7];
        const positions = ["-translate-x-[28%] translate-y-8", "z-10", "translate-x-[28%] translate-y-8"];
        const originalIndex = client.images.findIndex((item) => item.src === image.src);

        return (
          <motion.button
            key={`${image.src}-${arrangedIndex}`}
            type="button"
            onClick={() => onOpen(Math.max(0, originalIndex))}
            whileHover={{ y: -12, scale: 1.025, rotate: 0 }}
            className={`absolute w-[52%] max-w-[480px] overflow-hidden rounded-[1.25rem] border border-stroke bg-surface shadow-[0_24px_70px_rgba(0,0,0,0.26)] ${positions[arrangedIndex]}`}
            style={{ rotate: `${rotations[arrangedIndex]}deg` }}
          >
            <ImageWithFallback
              image={image}
              className="aspect-[16/10] w-full scale-[1.1] object-cover object-top"
            />
          </motion.button>
        );
      })}
    </div>
  );
}

function RailVisual({
  client,
  images,
  onOpen,
}: {
  client: ClientProject;
  images: ProjectImage[];
  onOpen: (index: number) => void;
}) {
  const rail = images.length > 1 ? [...images, ...images] : images;

  return (
    <div className="mx-auto max-w-full overflow-hidden rounded-[1.8rem] border border-stroke bg-surface py-5 md:py-6">
      <motion.div
        className="flex w-max gap-4 px-4 md:gap-5 md:px-6"
        animate={{ x: [0, images.length > 1 ? -900 : 0] }}
        transition={{
          duration: Math.max(18, images.length * 4),
          repeat: Infinity,
          repeatType: "mirror",
          ease: "linear",
        }}
      >
        {rail.map((image, index) => (
          <button
            key={`${image.src}-${index}`}
            type="button"
            onClick={() => onOpen(index % client.images.length)}
            className="group w-[64vw] max-w-[480px] shrink-0 overflow-hidden rounded-[1.25rem] border border-stroke bg-surface-elevated shadow-[0_20px_58px_rgba(0,0,0,0.18)]"
          >
            <ImageWithFallback
              image={image}
              className="aspect-[16/10] w-full scale-[1.12] object-cover object-top transition duration-700 group-hover:scale-[1.17]"
            />
          </button>
        ))}
      </motion.div>
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
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-fuchsia-500/10 via-surface-elevated to-cyan-500/10 p-6 ${className}`}
      >
        <div className="max-w-sm text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-fuchsia-300/25 bg-fuchsia-500/10">
            <ImageIcon className="h-6 w-6 text-fuchsia-400" />
          </div>
          <p className="mt-5 text-sm font-medium text-text-primary">
            Add website mockup
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
      className={className}
    >
      {children}
    </motion.div>
  );
}