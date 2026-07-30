import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: ReactNode;
  italic: string;
  subtext: string;
  cta?: { label: string; href: string };
};

export function SectionHeader({ eyebrow, title, italic, subtext, cta }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      viewport={{ once: true, margin: "-100px" }}
      className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16"
    >
      <div>
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-px bg-stroke" />
          <span className="text-xs text-muted uppercase tracking-[0.3em]">{eyebrow}</span>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl text-text-primary tracking-tight leading-[1.05]">
          {title} <span className="font-display italic">{italic}</span>
        </h2>
        <p className="mt-4 text-sm md:text-base text-muted max-w-md">{subtext}</p>
      </div>
      {cta && (
        <a
          href={cta.href}
          className="group relative hidden md:inline-flex items-center gap-2 rounded-full text-sm px-5 py-3 self-start md:self-end"
        >
          <span className="absolute inset-0 rounded-full border border-stroke bg-surface group-hover:opacity-0 transition-opacity" />
          <span className="absolute -inset-[2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="absolute inset-[2px] rounded-full bg-bg opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="relative text-text-primary flex items-center gap-2">
            {cta.label} <span aria-hidden>→</span>
          </span>
        </a>
      )}
    </motion.div>
  );
}
