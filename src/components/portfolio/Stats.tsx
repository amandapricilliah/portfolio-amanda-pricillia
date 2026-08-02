import { motion } from "framer-motion";
import { useLanguage } from "./LanguageProvider";

const STATS = [
  {
    value: "2+",
    label: { en: "Years Experience", id: "Tahun Pengalaman" },
  },
  {
    value: "50+",
    label: { en: "Projects Done", id: "Proyek Diselesaikan" },
  },
  {
    value: "200%",
    label: { en: "Satisfied Clients", id: "Kepuasan Klien" },
  },
] as const;

export function Stats() {
  const { copy } = useLanguage();

  return (
    <section className="bg-bg py-16 md:py-24">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 px-6 md:grid-cols-3 md:px-10 lg:px-16">
        {STATS.map((stat, index) => (
          <motion.div
            key={stat.value}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: index * 0.1,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            viewport={{ once: true, margin: "-80px" }}
            className="border-t border-stroke pt-6"
          >
            <div className="font-display text-6xl italic tracking-tight text-text-primary md:text-7xl">
              {stat.value}
            </div>
            <div className="mt-2 text-xs uppercase tracking-[0.3em] text-muted">
              {copy(stat.label)}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
