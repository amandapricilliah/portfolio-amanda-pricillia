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
import type { ReactNode } from "react";

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


function ClientWebsitesCaseStudy() {
  const pageRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { isDark } = useTheme();

  const [lightbox, setLightbox] = useState<LightboxState>(null);
  const [activeClientId, setActiveClientId] = useState(CLIENTS[0].id);
  const [activeImageIndexes, setActiveImageIndexes] = useState<Record<string, number>>({});

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

  const activeClientIndex = Math.max(
    0,
    CLIENTS.findIndex((client) => client.id === activeClientId),
  );
  const activeClient = CLIENTS[activeClientIndex] ?? CLIENTS[0];
  const activeImageIndex = Math.min(
    activeImageIndexes[activeClient.id] ?? 0,
    activeClient.images.length - 1,
  );
  const activeImage = activeClient.images[activeImageIndex];
  const activeTone = TONE_STYLES[activeClient.tone];

  const selectClient = (clientId: string) => {
    setActiveClientId(clientId);
  };

  const selectImage = (index: number) => {
    setActiveImageIndexes((current) => ({
      ...current,
      [activeClient.id]: index,
    }));
  };

  const moveClient = (direction: "prev" | "next") => {
    const offset = direction === "next" ? 1 : -1;
    const nextIndex =
      (activeClientIndex + offset + CLIENTS.length) % CLIENTS.length;
    setActiveClientId(CLIENTS[nextIndex].id);
  };

  const moveImage = (direction: "prev" | "next") => {
    const offset = direction === "next" ? 1 : -1;
    const nextIndex =
      (activeImageIndex + offset + activeClient.images.length) %
      activeClient.images.length;
    selectImage(nextIndex);
  };

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
                  className="relative w-full max-w-[1600px]"
                >
                  <button
                    type="button"
                    onClick={() => setLightbox(null)}
                    aria-label="Close image preview"
                    className="absolute right-1 top-1 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-black/65 text-white/70 backdrop-blur-md transition hover:rotate-90 hover:border-fuchsia-300/45 hover:text-white md:right-3 md:top-3"
                  >
                    <X className="h-5 w-5" />
                  </button>

                  <div className="relative px-2 pt-10 md:px-6 md:pt-4">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={lightbox.client.images[lightbox.index].src}
                        initial={{ opacity: 0, x: 18 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -18 }}
                        transition={{ duration: 0.28 }}
                        className="mx-auto w-full"
                      >
                        <MacbookWebsitePreview
                          client={lightbox.client}
                          image={lightbox.client.images[lightbox.index]}
                        />
                      </motion.div>
                    </AnimatePresence>

                    {lightbox.client.images.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={() => moveLightbox("prev")}
                          aria-label="Previous website screen"
                          className="absolute left-0 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white/70 backdrop-blur-md transition hover:border-fuchsia-300/50 hover:bg-fuchsia-500/20 hover:text-white md:left-3"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => moveLightbox("next")}
                          aria-label="Next website screen"
                          className="absolute right-0 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white/70 backdrop-blur-md transition hover:border-fuchsia-300/50 hover:bg-fuchsia-500/20 hover:text-white md:right-3"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </>
                    )}

                    <div className="mt-4 flex items-center justify-between px-1 text-[11px] text-white/35 md:px-3">
                      <span>Scroll inside the browser window to inspect the full page</span>
                      <span className="font-display text-base italic text-white/65">
                        {String(lightbox.index + 1).padStart(2, "0")}
                        <span className="mx-1.5 text-white/20">/</span>
                        {String(lightbox.client.images.length).padStart(2, "0")}
                      </span>
                    </div>
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

      {/* HERO — unchanged */}
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

      <section
        id="archive"
        className="scroll-mt-28 px-5 py-20 md:px-9 md:py-28 lg:px-14"
      >
        <div className="mx-auto max-w-[1360px]">
          <Reveal>
            <div className="grid gap-8 border-b border-stroke pb-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
              <div>
                <p className="text-[9px] uppercase tracking-[0.32em] text-fuchsia-400">
                  Interactive visual index
                </p>
                <h2 className="mt-4 max-w-xl text-3xl leading-[1.02] tracking-[-0.045em] text-text-primary md:text-5xl">
                  One viewing stage. Thirty-one different visual systems.
                </h2>
              </div>

              <div className="lg:pb-1">
                <p className="max-w-2xl text-sm leading-7 text-muted md:text-base">
                  The archive now behaves like a design index instead of a wall of cards. Choose a company, move through its pages, and open any screen at full size without leaving the stage.
                </p>
                <div className="mt-5 flex items-center gap-3 text-xs text-muted">
                  <MousePointer2 className="h-4 w-4 text-fuchsia-400" />
                  Select a client from the index, then choose a page from the filmstrip.
                </div>
              </div>
            </div>
          </Reveal>

          {/* Mobile client index */}
          <div className="mt-8 flex gap-1 overflow-x-auto border-y border-stroke py-2 lg:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {CLIENTS.map((client, index) => {
              const isActive = client.id === activeClient.id;
              const tone = TONE_STYLES[client.tone];

              return (
                <button
                  key={client.id}
                  type="button"
                  onClick={() => selectClient(client.id)}
                  className={`shrink-0 border-r border-stroke px-4 py-3 text-left transition last:border-r-0 ${
                    isActive ? "text-text-primary" : "text-muted"
                  }`}
                >
                  <span className={`block text-[9px] uppercase tracking-[0.2em] ${isActive ? tone.text : "text-muted"}`}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-1 block whitespace-nowrap text-sm">
                    {client.name}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-12">
            {/* Desktop editorial index — no cards */}
            <aside className="hidden lg:block">
              <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto border-y border-stroke pr-3 [scrollbar-width:thin]">
                {CLIENTS.map((client, index) => {
                  const isActive = client.id === activeClient.id;
                  const tone = TONE_STYLES[client.tone];

                  return (
                    <button
                      key={client.id}
                      type="button"
                      onClick={() => selectClient(client.id)}
                      className={`group grid w-full grid-cols-[34px_minmax(0,1fr)_auto] items-center gap-3 border-b border-stroke py-4 text-left transition last:border-b-0 ${
                        isActive
                          ? "text-text-primary"
                          : "text-muted hover:text-text-primary"
                      }`}
                    >
                      <span className={`font-display text-base italic ${isActive ? tone.text : "text-muted"}`}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm leading-5">{client.name}</span>
                      <span className={`text-[9px] uppercase tracking-[0.18em] transition ${isActive ? tone.text : "text-muted group-hover:text-text-primary"}`}>
                        {client.images.length}
                      </span>
                    </button>
                  );
                })}
              </div>
            </aside>

            {/* One large editorial stage */}
            <div ref={stageRef} className="min-w-0">
              <div className="flex flex-wrap items-end justify-between gap-5 border-b border-stroke pb-5">
                <div>
                  <p className={`text-[9px] uppercase tracking-[0.3em] ${activeTone.text}`}>
                    {String(activeClientIndex + 1).padStart(2, "0")} · Client website
                  </p>
                  <AnimatePresence mode="wait">
                    <motion.h3
                      key={activeClient.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.24 }}
                      className="mt-2 text-2xl tracking-[-0.035em] text-text-primary md:text-4xl"
                    >
                      {activeClient.name}
                    </motion.h3>
                  </AnimatePresence>
                </div>

                <div className="flex items-center gap-2">
                  <span className="mr-2 text-[10px] uppercase tracking-[0.18em] text-muted">
                    {activeClient.images.length} {activeClient.images.length === 1 ? "screen" : "screens"}
                  </span>
                  <button
                    type="button"
                    onClick={() => moveClient("prev")}
                    aria-label="Previous client"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke text-muted transition hover:border-fuchsia-400/40 hover:text-text-primary"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveClient("next")}
                    aria-label="Next client"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke text-muted transition hover:border-fuchsia-400/40 hover:text-text-primary"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="mt-6 overflow-hidden border-y border-stroke bg-surface">
                <div className="flex h-10 items-center gap-2 border-b border-stroke bg-surface-elevated px-4">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                  <span className="ml-3 truncate text-[10px] text-muted">
                    {activeClient.name} · {activeImage.label}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setLightbox({ client: activeClient, index: activeImageIndex })}
                  className="group relative block w-full cursor-zoom-in overflow-hidden bg-black/5 text-left"
                  aria-label={`Open ${activeImage.alt}`}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeImage.src}
                      initial={{ opacity: 0, x: 24, scale: 0.99 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -24, scale: 1.005 }}
                      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <ImageWithFallback
                        image={activeImage}
                        className="aspect-[16/10] w-full object-cover object-top transition duration-700 group-hover:scale-[1.01]"
                      />
                    </motion.div>
                  </AnimatePresence>

                  <span className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white/80 opacity-0 backdrop-blur-md transition group-hover:opacity-100">
                    <Maximize2 className="h-4 w-4" />
                  </span>
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/68 via-black/8 to-transparent px-5 pb-5 pt-20 text-right text-[9px] uppercase tracking-[0.24em] text-white/75 opacity-0 transition group-hover:opacity-100">
                    Open full page
                  </span>
                </button>

                <div className="flex items-center justify-between gap-4 border-t border-stroke px-4 py-4 md:px-5">
                  <div className="min-w-0">
                    <p className="truncate text-sm text-text-primary">{activeImage.label}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-muted">
                      Page {String(activeImageIndex + 1).padStart(2, "0")} of {String(activeClient.images.length).padStart(2, "0")}
                    </p>
                  </div>

                  {activeClient.images.length > 1 && (
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => moveImage("prev")}
                        aria-label="Previous page"
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-stroke text-muted transition hover:text-text-primary"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveImage("next")}
                        aria-label="Next page"
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-stroke text-muted transition hover:text-text-primary"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact sheet: images are exposed, but not as rounded cards */}
              {activeClient.images.length > 1 && (
                <div className="mt-8 border-y border-stroke py-4">
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <p className="text-[9px] uppercase tracking-[0.28em] text-muted">
                      Page sequence
                    </p>
                    <p className="text-xs text-muted">
                      Select a screen to replace the main preview.
                    </p>
                  </div>

                  <div className="flex gap-4 overflow-x-auto pb-2 [scrollbar-width:thin]">
                    {activeClient.images.map((image, index) => {
                      const isActive = activeImageIndex === index;

                      return (
                        <button
                          key={image.src}
                          type="button"
                          onClick={() => selectImage(index)}
                          className="group w-[190px] shrink-0 text-left md:w-[220px]"
                        >
                          <div
                            className={`overflow-hidden border-b-2 bg-surface-elevated transition ${
                              isActive
                                ? activeTone.border
                                : "border-transparent group-hover:border-stroke"
                            }`}
                          >
                            <ImageWithFallback
                              image={image}
                              className={`aspect-[16/10] w-full object-cover object-top transition duration-500 ${
                                isActive ? "opacity-100" : "opacity-55 group-hover:opacity-90"
                              }`}
                            />
                          </div>
                          <div className="mt-3 flex gap-3">
                            <span className={`font-display text-sm italic ${isActive ? activeTone.text : "text-muted"}`}>
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <span className={`line-clamp-2 text-xs leading-5 ${isActive ? "text-text-primary" : "text-muted"}`}>
                              {image.label}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-stroke pt-5">
                <p className="max-w-xl text-sm leading-7 text-muted">
                  The company names and every original image path remain unchanged, so this layout can replace the current route without re-uploading or renaming any asset.
                </p>
                <button
                  type="button"
                  onClick={() => setLightbox({ client: activeClient, index: activeImageIndex })}
                  className={`group inline-flex items-center gap-3 rounded-full border px-5 py-3 text-sm transition hover:-translate-y-0.5 ${activeTone.border} ${activeTone.soft} ${activeTone.text}`}
                >
                  View complete screen
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-24 md:px-9 md:pb-32 lg:px-14">
        <div className="mx-auto max-w-[1360px] border-y border-stroke py-14 text-center md:py-20">
          <Sparkles className="mx-auto h-6 w-6 text-fuchsia-400" />
          <p className="mt-6 text-[9px] uppercase tracking-[0.32em] text-muted">
            Visual archive complete
          </p>
          <h2 className="mx-auto mt-4 max-w-3xl text-3xl leading-[1.06] tracking-[-0.04em] text-text-primary md:text-5xl">
            Different industries, shown through one focused viewing system.
          </h2>
          <a
            href="/#work"
            className="group mx-auto mt-8 inline-flex items-center gap-3 rounded-full border border-stroke px-6 py-3.5 text-sm text-text-secondary transition hover:-translate-y-1 hover:border-fuchsia-400/45 hover:text-text-primary"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to selected projects
          </a>
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

function MacbookWebsitePreview({
  client,
  image,
}: {
  client: ClientProject;
  image: ProjectImage;
}) {
  const address = `https://${client.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}.com`;

  return (
    <div className="mx-auto w-full max-w-[1440px]">
      <div className="overflow-hidden rounded-[2rem] border border-white/12 bg-[#07080c] shadow-[0_35px_140px_rgba(0,0,0,0.78)]">
        <div className="flex items-center gap-3 border-b border-white/10 bg-[#111214] px-3 py-3 md:px-5">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="min-w-0 flex-1 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] text-white/60 md:text-xs">
            <span className="block truncate">{address}</span>
          </div>
        </div>

        <div className="h-[66vh] overflow-y-auto bg-[#050505] md:h-[80vh]">
          <ImageWithFallback
            image={image}
            className="h-auto w-full object-contain align-top"
          />
        </div>
      </div>
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
        className={`flex items-center justify-center bg-surface-elevated p-6 ${className}`}
      >
        <div className="max-w-sm text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-stroke bg-surface">
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