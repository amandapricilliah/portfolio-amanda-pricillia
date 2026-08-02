import { useEffect, useState } from "react";

import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useTheme } from "@/components/theme/ThemeProvider";
import { useLanguage } from "./LanguageProvider";

const LINKS = [
  { label: { en: "Home", id: "Beranda" }, href: "#home" },
  { label: { en: "About", id: "Tentang" }, href: "#about" },
  { label: { en: "Education", id: "Pendidikan" }, href: "#education" },
  { label: { en: "Experience", id: "Pengalaman" }, href: "#experience" },
  { label: { en: "Projects", id: "Proyek" }, href: "#work" },
  { label: { en: "Certificate", id: "Sertifikat" }, href: "#certificate" },
  { label: { en: "Publisher", id: "Publikasi" }, href: "#journal" },
  { label: { en: "Contact", id: "Kontak" }, href: "#contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");
  const { isDark } = useTheme();
  const { language, setLanguage, copy } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex justify-center px-4 pt-4 md:pt-6">
      <div
        className="inline-flex max-w-full items-center overflow-x-auto rounded-full border border-stroke bg-surface/90 p-2 backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-300 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={
          scrolled
            ? {
                boxShadow: isDark
                  ? "0 14px 42px rgba(0, 0, 0, 0.48)"
                  : "0 14px 42px rgba(15, 23, 42, 0.08)",
              }
            : undefined
        }
      >
        <a
          href="#home"
          aria-label={copy({ en: "Back to home", id: "Kembali ke beranda" })}
          onClick={() => setActive("#home")}
          className="group relative h-9 w-9 shrink-0 rounded-full p-[1.5px] transition-transform duration-300 hover:scale-110"
        >
          <span className="absolute inset-0 rounded-full accent-gradient" />
          <span className="relative flex h-full w-full items-center justify-center rounded-full bg-bg">
            <span className="font-display text-[13px] italic text-text-primary">
              APH
            </span>
          </span>
        </a>

        <span className="ml-4 mr-5 hidden h-6 w-px shrink-0 bg-stroke sm:block" />

        <div className="flex shrink-0 items-center">
          {LINKS.map((link) => {
            const isActive = active === link.href;

            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setActive(link.href)}
                className={`shrink-0 rounded-full px-3 py-1.5 text-xs transition-colors duration-300 sm:px-4 sm:py-2 sm:text-sm ${
                  isActive
                    ? "bg-surface-elevated text-text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                    : "text-muted hover:bg-surface-elevated hover:text-text-primary"
                }`}
              >
                {copy(link.label)}
              </a>
            );
          })}
        </div>

        <span className="ml-3 mr-4 hidden h-5 w-px shrink-0 bg-stroke sm:block" />

        <div className="flex shrink-0 items-center gap-2.5">
          <div
            className="inline-flex items-center rounded-full border border-stroke bg-surface-elevated p-1"
            aria-label={copy({ en: "Language selector", id: "Pilihan bahasa" })}
          >
            {(["en", "id"] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setLanguage(option)}
                aria-pressed={language === option}
                className={`rounded-full px-2.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.12em] transition ${
                  language === option
                    ? "bg-text-primary text-bg"
                    : "text-muted hover:text-text-primary"
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          <ThemeToggle />

          <a
            href="/Amanda-Pricillia-CV.pdf"
            download="Amanda-Pricillia-CV.pdf"
            className="group relative shrink-0 rounded-full text-xs sm:text-sm"
          >
            <span className="absolute -inset-[2px] rounded-full accent-gradient opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="relative inline-flex items-center gap-1.5 rounded-full border border-stroke bg-surface-elevated px-3 py-1.5 text-text-primary backdrop-blur-md transition-colors duration-300 sm:px-4 sm:py-2">
              {copy({ en: "Download CV", id: "Unduh CV" })}
              <span aria-hidden="true">↓</span>
            </span>
          </a>
        </div>
      </div>
    </nav>
  );
}
