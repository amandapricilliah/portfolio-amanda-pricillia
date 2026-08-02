import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "./LanguageProvider";

const WORDS = [
  { en: "UI/UX Design", id: "Desain UI/UX" },
  { en: "Graphic Design", id: "Desain Grafis" },
  { en: "Web Development", id: "Pengembangan Web" },
] as const;

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const { copy } = useLanguage();

  useEffect(() => {
    const duration = 2700;
    const start = performance.now();
    let animationFrame = 0;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      setCount(Math.floor(progress * 100));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(tick);
      } else {
        window.setTimeout(onComplete, 400);
      }
    };

    animationFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrame);
  }, [onComplete]);

  useEffect(() => {
    const id = window.setInterval(
      () => setWordIndex((index) => (index + 1) % WORDS.length),
      900,
    );
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden bg-bg">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute left-6 top-6 text-xs uppercase tracking-[0.3em] text-muted"
      >
        Portfolio
      </motion.div>

      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.h2
            key={`${wordIndex}-${copy(WORDS[wordIndex])}`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="font-display text-4xl italic text-text-primary/80 md:text-6xl lg:text-7xl"
          >
            {copy(WORDS[wordIndex])}
          </motion.h2>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-8 right-8 font-display text-6xl tabular-nums text-text-primary md:text-8xl lg:text-9xl">
        {String(count).padStart(3, "0")}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-stroke/50">
        <div
          className="accent-gradient h-full origin-left"
          style={{
            transform: `scaleX(${count / 100})`,
            boxShadow: "0 0 8px rgba(137, 170, 204, 0.35)",
            transition: "transform 60ms linear",
          }}
        />
      </div>
    </div>
  );
}
