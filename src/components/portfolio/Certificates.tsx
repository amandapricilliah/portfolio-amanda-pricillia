import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

import {
  Award,
  BadgeCheck,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Eye,
  ShieldCheck,
  X,
} from "lucide-react";

import { useTheme } from "@/components/theme/ThemeProvider";

import type { LucideIcon } from "lucide-react";

type CertificateItem = {
  number: string;
  title: string;
  issuer: string;
  year: string;
  category: string;
  description: string;
  mark: string;
  icon: LucideIcon;
  images: string[];
};

const CERTIFICATES: CertificateItem[] = [
  {
    number: "01",
    title: "UI/UX Designer Certification",
    issuer: "Badan Nasional Sertifikasi Profesi",
    year: "2025",
    category: "Professional Certification",
    description:
      "National professional competency certification in user interface and user experience design.",
    mark: "BNSP",
    icon: ShieldCheck,
    images: [
      "/images/ui-ux-designer-certification-1.jpg",
      "/images/ui-ux-designer-certification-2.jpg",
    ],
  },
  {
    number: "02",
    title: "Graphics Designer Certification",
    issuer: "Badan Nasional Sertifikasi Profesi",
    year: "2026",
    category: "Professional Certification",
    description:
      "National professional competency certification covering graphic design and visual communication.",
    mark: "BNSP",
    icon: Award,
    images: [
      "/images/graphics-designer-certification.jpg",
    ],
  },
  {
    number: "03",
    title: "Becoming Professional UI/UX Designer",
    issuer: "Alterra Academy · MSIB Kemendikbudristek",
    year: "2024",
    category: "Professional Development",
    description:
      "Completed an end-to-end UI/UX learning program covering research, design thinking, prototyping, and usability testing.",
    mark: "ALT",
    icon: BadgeCheck,
    images: [
      "/images/becoming-professional-ui-ux-designer-1.jpg",
      "/images/becoming-professional-ui-ux-designer-2.jpg",
    ],
  },
  {
    number: "04",
    title: "UI/UX Designer Internship",
    issuer: "PT MNC Televisi Network · iNews TV",
    year: "2024",
    category: "Internship Certificate",
    description:
      "UI/UX design internship focused on product features, user flows, prototyping, and front-end collaboration.",
    mark: "MNC",
    icon: BadgeCheck,
    images: [
      "/images/ui-ux-designer-internship.jpg",
    ],
  },
  {
    number: "05",
    title: "UI/UX Designer Apprenticeship",
    issuer: "Kementerian Ketenagakerjaan Republik Indonesia",
    year: "2026",
    category: "Apprenticeship Certificate",
    description:
      "Participated in a professional apprenticeship program focused on practical UI/UX design experience.",
    mark: "KMR",
    icon: ShieldCheck,
    images: [
      "/images/ui-ux-designer-apprenticeship.jpg",
    ],
  },
  {
    number: "06",
    title: "UI/UX Designer & Front-End Internship",
    issuer: "PT Max Samasta Group",
    year: "2024",
    category: "Internship Certificate",
    description:
      "Completed a design and front-end internship by creating and implementing an employee attendance platform.",
    mark: "MS",
    icon: BadgeCheck,
    images: [
      "/images/ui-ux-designer-front-end-internship.jpg",
    ],
  },
];

export function Certificates() {
  const { isDark } = useTheme();

  const [selectedCertificate, setSelectedCertificate] =
    useState<CertificateItem | null>(null);

  const [activeImageIndex, setActiveImageIndex] =
    useState(0);

  const openCertificate = (
    certificate: CertificateItem,
  ) => {
    setSelectedCertificate(certificate);
    setActiveImageIndex(0);
  };

  const closeCertificate = () => {
    setSelectedCertificate(null);
    setActiveImageIndex(0);
  };

  const showPreviousImage = () => {
    if (!selectedCertificate) return;

    setActiveImageIndex((currentIndex) => {
      const totalImages =
        selectedCertificate.images.length;

      return (
        (currentIndex - 1 + totalImages) %
        totalImages
      );
    });
  };

  const showNextImage = () => {
    if (!selectedCertificate) return;

    setActiveImageIndex((currentIndex) => {
      const totalImages =
        selectedCertificate.images.length;

      return (currentIndex + 1) % totalImages;
    });
  };

  /*
   * Escape menutup popup.
   * Panah keyboard berpindah gambar.
   * Scroll halaman dikunci ketika popup terbuka.
   */
  useEffect(() => {
    if (!selectedCertificate) return;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (
      event: KeyboardEvent,
    ) => {
      if (event.key === "Escape") {
        closeCertificate();
      }

      if (
        event.key === "ArrowLeft" &&
        selectedCertificate.images.length > 1
      ) {
        showPreviousImage();
      }

      if (
        event.key === "ArrowRight" &&
        selectedCertificate.images.length > 1
      ) {
        showNextImage();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [selectedCertificate]);

  const certificateModal =
    typeof document !== "undefined"
      ? createPortal(
          <AnimatePresence>
            {selectedCertificate && (
              <motion.div
                key="certificate-modal"
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                transition={{
                  duration: 0.3,
                }}
                onMouseDown={(event) => {
                  if (
                    event.target ===
                    event.currentTarget
                  ) {
                    closeCertificate();
                  }
                }}
                className="fixed inset-0 z-[10000] flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-xl md:p-8"
              >
                <motion.div
                  role="dialog"
                  aria-modal="true"
                  aria-label={`${selectedCertificate.title} certificate`}
                  initial={{
                    opacity: 0,
                    y: 35,
                    scale: 0.94,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: 25,
                    scale: 0.96,
                  }}
                  transition={{
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  onMouseDown={(event) => {
                    event.stopPropagation();
                  }}
                  className={`relative my-auto w-full max-w-[1100px] overflow-hidden rounded-[2rem] border border-stroke bg-surface ${
                    isDark
                      ? "shadow-[0_30px_100px_rgba(0,0,0,0.85),0_0_60px_rgba(236,72,153,0.13),inset_0_1px_0_rgba(255,255,255,0.1)]"
                      : "shadow-[0_30px_100px_rgba(50,30,42,0.28),0_0_60px_rgba(236,72,153,0.12),inset_0_1px_0_rgba(255,255,255,0.95)]"
                  }`}
                >
                  {/* Modal glow */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-pink-500/[0.13] blur-[110px]"
                  />

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-fuchsia-500/[0.09] blur-[120px]"
                  />

                  {/* Header popup */}
                  <div className="relative z-10 flex items-start justify-between gap-5 border-b border-stroke px-5 py-5 md:px-8 md:py-6">
                    <div className="min-w-0">
                      <p
                        className={`mb-2 text-[9px] uppercase tracking-[0.3em] ${
                          isDark
                            ? "text-pink-200/55"
                            : "text-pink-700/70"
                        }`}
                      >
                        Certificate Preview
                      </p>

                      <h3 className="text-xl font-medium leading-tight text-text-primary md:text-2xl">
                        {selectedCertificate.title}
                      </h3>

                      <p className="mt-2 text-sm text-muted">
                        {selectedCertificate.issuer} ·{" "}
                        {selectedCertificate.year}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={closeCertificate}
                      aria-label="Close certificate"
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-stroke bg-surface-elevated text-muted transition duration-300 hover:rotate-90 hover:border-pink-400/40 hover:bg-pink-500/10 hover:text-text-primary"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Area gambar */}
                  <div className="relative z-10 p-4 md:p-8">
                    {/*
                     * Area ini tetap gelap pada kedua tema
                     * supaya foto sertifikat tetap kontras.
                     */}
                    <div className="relative flex min-h-[300px] items-center justify-center overflow-hidden rounded-[1.4rem] border border-white/[0.12] bg-black/75 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.07)] md:min-h-[560px] md:p-6">
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={
                            selectedCertificate.images[
                              activeImageIndex
                            ]
                          }
                          src={
                            selectedCertificate.images[
                              activeImageIndex
                            ]
                          }
                          alt={`${selectedCertificate.title} — page ${
                            activeImageIndex + 1
                          }`}
                          initial={{
                            opacity: 0,
                            scale: 0.97,
                            x: 15,
                          }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                            x: 0,
                          }}
                          exit={{
                            opacity: 0,
                            scale: 0.97,
                            x: -15,
                          }}
                          transition={{
                            duration: 0.35,
                            ease: [
                              0.22,
                              1,
                              0.36,
                              1,
                            ],
                          }}
                          draggable={false}
                          className="max-h-[70vh] w-full select-none object-contain"
                        />
                      </AnimatePresence>

                      {/* Navigasi dua foto */}
                      {selectedCertificate.images
                        .length > 1 && (
                        <>
                          <button
                            type="button"
                            onClick={
                              showPreviousImage
                            }
                            aria-label="Previous certificate image"
                            className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/[0.16] bg-black/60 text-white/75 shadow-xl backdrop-blur-md transition duration-300 hover:scale-105 hover:border-pink-300/50 hover:bg-pink-500/25 hover:text-white md:left-5 md:h-12 md:w-12"
                          >
                            <ChevronLeft className="h-5 w-5" />
                          </button>

                          <button
                            type="button"
                            onClick={showNextImage}
                            aria-label="Next certificate image"
                            className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/[0.16] bg-black/60 text-white/75 shadow-xl backdrop-blur-md transition duration-300 hover:scale-105 hover:border-pink-300/50 hover:bg-pink-500/25 hover:text-white md:right-5 md:h-12 md:w-12"
                          >
                            <ChevronRight className="h-5 w-5" />
                          </button>
                        </>
                      )}
                    </div>

                    {/* Footer popup */}
                    <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div>
                        <p className="text-sm text-text-secondary">
                          {
                            selectedCertificate.category
                          }
                        </p>

                        <p className="mt-1 text-xs text-muted">
                          Click outside or press Esc to
                          close
                        </p>
                      </div>

                      {selectedCertificate.images
                        .length > 1 && (
                        <div className="flex items-center gap-3">
                          {/* Thumbnail */}
                          <div className="flex items-center gap-2">
                            {selectedCertificate.images.map(
                              (
                                image,
                                imageIndex,
                              ) => (
                                <button
                                  key={image}
                                  type="button"
                                  onClick={() =>
                                    setActiveImageIndex(
                                      imageIndex,
                                    )
                                  }
                                  aria-label={`Open certificate image ${
                                    imageIndex + 1
                                  }`}
                                  className={`relative h-12 w-16 overflow-hidden rounded-lg border transition duration-300 ${
                                    activeImageIndex ===
                                    imageIndex
                                      ? "border-pink-400/70 shadow-[0_0_15px_rgba(244,114,182,0.28)]"
                                      : "border-stroke opacity-45 hover:opacity-80"
                                  }`}
                                >
                                  <img
                                    src={image}
                                    alt=""
                                    draggable={false}
                                    className="h-full w-full object-cover"
                                  />
                                </button>
                              ),
                            )}
                          </div>

                          <div
                            className={`min-w-[54px] text-right font-display text-lg italic ${
                              isDark
                                ? "text-pink-100/70"
                                : "text-pink-700/75"
                            }`}
                          >
                            {String(
                              activeImageIndex + 1,
                            ).padStart(2, "0")}

                            <span className="mx-1 text-muted">
                              /
                            </span>

                            {String(
                              selectedCertificate
                                .images.length,
                            ).padStart(2, "0")}
                          </div>
                        </div>
                      )}
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
    <>
      <section
        id="certificate"
        className="relative overflow-clip bg-bg pb-24 pt-2 md:pb-32 md:pt-4"
      >
        {/* Ambient background glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-52 top-[12%] h-[34rem] w-[34rem] rounded-full bg-fuchsia-500/[0.07] blur-[150px]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-52 bottom-[5%] h-[36rem] w-[36rem] rounded-full bg-pink-500/[0.08] blur-[160px]"
        />

        <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
          {/* Section header */}
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
            className="mb-12 md:mb-16"
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-stroke" />

              <span className="text-xs uppercase tracking-[0.3em] text-muted">
                Certificates
              </span>

              <span className="h-px flex-1 bg-gradient-to-r from-pink-400/70 to-transparent" />
            </div>

            <div className="max-w-3xl">
              <h2 className="text-5xl leading-[0.95] tracking-[-0.045em] text-text-primary sm:text-6xl md:text-7xl">
                Credentials that
                <br />
                validate the{" "}
                <span
                  className={`font-display italic ${
                    isDark
                      ? "text-pink-200"
                      : "text-pink-600"
                  }`}
                >
                  craft.
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-sm leading-7 text-text-secondary md:text-base">
                Certifications and professional programs
                that reflect my continued growth across
                design, development, and visual
                communication.
              </p>
            </div>
          </motion.div>

          {/* Certificate cards */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 xl:gap-4">
            {CERTIFICATES.map(
              (certificate, index) => {
                const Icon = certificate.icon;

                return (
                  <motion.button
                    key={certificate.title}
                    type="button"
                    onClick={() =>
                      openCertificate(certificate)
                    }
                    initial={{
                      opacity: 0,
                      y: 40,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    whileHover={{
                      y: -6,
                      scale: 1.01,
                    }}
                    whileTap={{
                      scale: 0.985,
                    }}
                    transition={{
                      duration: 0.7,
                      delay: index * 0.06,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    viewport={{
                      once: true,
                      amount: 0.15,
                    }}
                    aria-label={`View ${certificate.title}`}
                    className={`group relative h-full min-h-[390px] overflow-hidden rounded-[1.75rem] border border-stroke bg-surface text-left transition-all duration-500 hover:border-pink-400/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/60 ${
                      isDark
                        ? "shadow-[0_22px_60px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.09)] hover:shadow-[0_28px_75px_rgba(0,0,0,0.7),0_0_32px_rgba(236,72,153,0.13),inset_0_1px_0_rgba(255,255,255,0.12)]"
                        : "shadow-[0_22px_60px_rgba(65,40,53,0.12),inset_0_1px_0_rgba(255,255,255,0.95)] hover:shadow-[0_28px_75px_rgba(65,40,53,0.18),0_0_32px_rgba(236,72,153,0.14),inset_0_1px_0_rgba(255,255,255,1)]"
                    }`}
                  >
                    {/* Glossy surface */}
                    <div
                      aria-hidden="true"
                      className={`pointer-events-none absolute inset-0 ${
                        isDark
                          ? "bg-gradient-to-br from-white/[0.08] via-transparent to-black/80"
                          : "bg-gradient-to-br from-white/80 via-transparent to-pink-100/30"
                      }`}
                    />

                    {/* Pink hover glow */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-pink-500/0 blur-[80px] transition-all duration-700 group-hover:bg-pink-500/[0.16]"
                    />

                    {/* Moving reflection */}
                    <div
                      aria-hidden="true"
                      className={`pointer-events-none absolute -left-[40%] -top-[70%] h-[170%] w-[65%] rotate-[24deg] bg-gradient-to-r from-transparent to-transparent blur-2xl transition-transform duration-1000 group-hover:translate-x-32 ${
                        isDark
                          ? "via-white/[0.055]"
                          : "via-white/50"
                      }`}
                    />

                    {/* Top highlight */}
                    <div
                      aria-hidden="true"
                      className={`absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent to-transparent ${
                        isDark
                          ? "via-white/35"
                          : "via-white"
                      }`}
                    />

                    <div className="relative z-10 flex h-full min-h-[390px] flex-col p-6">
                      {/* Card header */}
                      <div className="flex items-start justify-between gap-4">
                        <div
                          className={`flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-2xl border border-stroke bg-surface-elevated ${
                            isDark
                              ? "shadow-[0_12px_28px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)]"
                              : "shadow-[0_12px_28px_rgba(65,40,53,0.1),inset_0_1px_0_rgba(255,255,255,0.95)]"
                          }`}
                        >
                          <Icon
                            className={`h-[18px] w-[18px] ${
                              isDark
                                ? "text-pink-300"
                                : "text-pink-600"
                            }`}
                          />

                          <span className="mt-1 text-[8px] font-medium uppercase tracking-[0.17em] text-muted">
                            {certificate.mark}
                          </span>
                        </div>

                        <span
                          className={`font-display text-xl italic ${
                            isDark
                              ? "text-pink-200/65"
                              : "text-pink-700/75"
                          }`}
                        >
                          {certificate.number}
                        </span>
                      </div>

                      {/* Card content */}
                      <div className="mt-5">
                        <span
                          className={`inline-flex min-h-7 items-center rounded-full border border-pink-400/25 bg-pink-500/[0.09] px-3 py-1.5 text-[9px] uppercase tracking-[0.16em] ${
                            isDark
                              ? "text-pink-100/75"
                              : "text-pink-700/80"
                          }`}
                        >
                          {certificate.category}
                        </span>

                        <h3 className="mt-3 line-clamp-2 text-[1.3rem] font-medium leading-[1.2] tracking-tight text-text-primary">
                          {certificate.title}
                        </h3>

                        <p className="mt-2 line-clamp-2 text-sm font-medium leading-6 text-text-secondary">
                          {certificate.issuer}
                        </p>

                        <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted transition-colors duration-300 group-hover:text-text-secondary">
                          {certificate.description}
                        </p>
                      </div>

                      {/* Card footer */}
                      <div className="mt-auto pt-6">
                        <div className="h-px bg-gradient-to-r from-stroke via-stroke/60 to-transparent" />

                        <div className="mt-5 flex items-center justify-between gap-3">
                          <div className="inline-flex items-center gap-2 text-sm text-muted">
                            <CalendarDays
                              className={`h-4 w-4 shrink-0 ${
                                isDark
                                  ? "text-pink-300"
                                  : "text-pink-600"
                              }`}
                            />

                            {certificate.year}
                          </div>

                         <span
  className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[9px] font-medium uppercase tracking-[0.14em] transition-all duration-300 ${
    isDark
      ? "border-pink-300/25 bg-pink-500/10 text-pink-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] group-hover:border-pink-300/50 group-hover:bg-pink-500/20 group-hover:shadow-[0_0_20px_rgba(236,72,153,0.22),inset_0_1px_0_rgba(255,255,255,0.12)]"
      : "border-pink-300/60 bg-pink-50 text-pink-700 shadow-[0_6px_18px_rgba(219,39,119,0.10),inset_0_1px_0_rgba(255,255,255,0.9)] group-hover:border-pink-400/80 group-hover:bg-pink-100 group-hover:shadow-[0_8px_24px_rgba(219,39,119,0.18)]"
  }`}
>
  <Eye className="h-4 w-4 shrink-0" />

  View certificate
</span>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                );
              },
            )}
          </div>
        </div>
      </section>

      {certificateModal}
    </>
  );
}