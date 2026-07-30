import { useEffect, useState } from "react";

import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useTheme } from "@/components/theme/ThemeProvider";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Education", href: "#education" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#work" },
  { label: "Publisher", href: "#journal" },
  { label: "Certificate", href: "#certificate" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("Home");

  const { isDark } = useTheme();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex justify-center px-4 pt-4 md:pt-6">
      <div
        className="inline-flex max-w-full items-center overflow-x-auto rounded-full border border-stroke bg-surface p-2 backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-300 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={
          scrolled
            ? {
                boxShadow: isDark
                  ? "0 14px 42px rgba(0, 0, 0, 0.48)"
                  : "0 14px 42px rgba(45, 28, 38, 0.14)",
              }
            : undefined
        }
      >
        {/* Logo */}
        <a
          href="#home"
          aria-label="Back to home"
          onClick={() => setActive("Home")}
          className="group relative h-9 w-9 shrink-0 rounded-full p-[1.5px] transition-transform duration-300 hover:scale-110"
        >
          <span className="absolute inset-0 rounded-full accent-gradient" />

          <span className="relative flex h-full w-full items-center justify-center rounded-full bg-bg">
            <span className="font-display text-[13px] italic text-text-primary">
              APH
            </span>
          </span>
        </a>

        {/* Divider */}
        <span className="ml-4 mr-5 hidden h-6 w-px shrink-0 bg-stroke sm:block" />

        {/* Navigation links */}
        <div className="flex shrink-0 items-center">
          {LINKS.map((link) => {
            const isActive = active === link.label;

            return (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setActive(link.label)}
                className={`shrink-0 rounded-full px-3 py-1.5 text-xs transition-colors duration-300 sm:px-4 sm:py-2 sm:text-sm ${
                  isActive
                    ? "bg-surface-elevated text-text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                    : "text-muted hover:bg-surface-elevated hover:text-text-primary"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        {/* Divider sebelum tombol dark/light */}
        <span className="ml-3 mr-4 hidden h-5 w-px shrink-0 bg-stroke sm:block" />

        {/* Theme dan Contact */}
        <div className="flex shrink-0 items-center gap-5">
          <ThemeToggle />

          <a
            href="#contact"
            onClick={() => setActive("Contact")}
            className="group relative shrink-0 rounded-full text-xs sm:text-sm"
          >
            {/* Gradient border saat hover */}
            <span className="absolute -inset-[2px] rounded-full accent-gradient opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <span className="relative inline-flex items-center gap-1 rounded-full border border-stroke bg-surface-elevated px-3 py-1.5 text-text-primary backdrop-blur-md transition-colors duration-300 sm:px-4 sm:py-2">
              Contact Me
              <span aria-hidden="true">↗</span>
            </span>
          </a>
        </div>
      </div>
    </nav>
  );
}