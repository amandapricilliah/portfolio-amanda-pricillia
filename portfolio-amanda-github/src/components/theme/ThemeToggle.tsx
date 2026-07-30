import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      whileHover={{
        scale: 1.06,
      }}
      whileTap={{
        scale: 0.94,
      }}
      aria-label={
        isDark
          ? "Switch to light mode"
          : "Switch to dark mode"
      }
      title={
        isDark
          ? "Switch to light mode"
          : "Switch to dark mode"
      }
      className="group relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-stroke bg-surface-elevated text-text-primary shadow-[0_8px_24px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-300 hover:border-pink-400/45"
    >
      {/* Pink glow ketika hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full bg-pink-500/0 blur-xl transition-colors duration-300 group-hover:bg-pink-500/20"
      />

      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          /*
           * Saat Dark Mode aktif,
           * matahari menunjukkan pilihan menuju Light Mode.
           */
          <motion.span
            key="sun"
            initial={{
              opacity: 0,
              rotate: -90,
              scale: 0.5,
            }}
            animate={{
              opacity: 1,
              rotate: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              rotate: 90,
              scale: 0.5,
            }}
            transition={{
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative z-10"
          >
            <Sun className="h-[18px] w-[18px] text-pink-400" />
          </motion.span>
        ) : (
          /*
           * Saat Light Mode aktif,
           * bulan menunjukkan pilihan menuju Dark Mode.
           */
          <motion.span
            key="moon"
            initial={{
              opacity: 0,
              rotate: 90,
              scale: 0.5,
            }}
            animate={{
              opacity: 1,
              rotate: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              rotate: -90,
              scale: 0.5,
            }}
            transition={{
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative z-10"
          >
            <Moon className="h-[18px] w-[18px] text-pink-500" />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}