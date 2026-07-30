import { motion } from "framer-motion";

const STATS = [
  { value: "2+", label: "Years Experience" },
  { value: "50+", label: "Projects Done" },
  { value: "200%", label: "Satisfied Clients" },
];

export function Stats() {
  return (
    <section className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true, margin: "-80px" }}
            className="border-t border-stroke pt-6"
          >
            <div className="text-6xl md:text-7xl font-display italic text-text-primary tracking-tight">
              {s.value}
            </div>
            <div className="mt-2 text-xs text-muted uppercase tracking-[0.3em]">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
