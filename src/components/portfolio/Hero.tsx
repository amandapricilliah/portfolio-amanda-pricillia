import { useEffect, useRef, useState } from "react";
import { HlsVideo } from "./HlsVideo";
import { BACKGROUND_VIDEO_FALLBACK, BACKGROUND_VIDEO_SRC } from "@/lib/video-asset";
import { useLanguage } from "./LanguageProvider";

const ROLES = [
  { en: "UI/UX Designer", id: "UI/UX Designer" },
  { en: "Graphic Designer", id: "Desainer Grafis" },
  { en: "Web Developer", id: "Web Developer" },
  { en: "WordPress Developer", id: "WordPress Developer" },
] as const;

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const { copy } = useLanguage();

  useEffect(() => {
    const id = window.setInterval(
      () => setRoleIndex((index) => (index + 1) % ROLES.length),
      2000,
    );
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    let context: { revert: () => void } | undefined;

    void (async () => {
      const { gsap } = await import("gsap");
      if (!rootRef.current) return;

      context = gsap.context(() => {
        const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
        timeline
          .from(".name-reveal", {
            opacity: 0,
            y: 50,
            duration: 1.2,
            delay: 0.1,
          })
          .from(
            ".blur-in",
            {
              opacity: 0,
              filter: "blur(10px)",
              y: 20,
              duration: 1,
              stagger: 0.1,
            },
            "-=0.9",
          );
      }, rootRef);
    })();

    return () => context?.revert();
  }, []);

  return (
    <section
      id="home"
      ref={rootRef}
      className="relative min-h-screen w-full overflow-hidden bg-bg"
    >
      <div className="absolute inset-0 overflow-hidden">
        <HlsVideo
          src={BACKGROUND_VIDEO_SRC}
          fallbackSrc={BACKGROUND_VIDEO_FALLBACK}
          className="absolute left-1/2 top-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <p className="blur-in mb-8 text-xs uppercase tracking-[0.3em] text-white">
          portfolio ’26
        </p>

        <h1 className="name-reveal mb-6 font-display text-6xl italic leading-[0.9] tracking-tight text-white md:text-8xl lg:text-9xl">
          Amanda Pricillia
        </h1>

        <p className="blur-in mb-4 text-lg text-white/90 md:text-xl">
          {copy({ en: "A", id: "Seorang" })}{" "}
          <span
            key={roleIndex}
            className="animate-role-fade-in inline-block font-display italic text-white"
          >
            {copy(ROLES[roleIndex])}
          </span>{" "}
          {copy({
            en: "crafting intuitive and functional digital experiences.",
            id: "yang merancang pengalaman digital intuitif dan fungsional.",
          })}
        </p>

        <p className="blur-in mb-12 max-w-md text-sm text-white md:text-base">
          {copy({
            en: "I combine user-centered design and web development to create intuitive, responsive, and functional digital solutions.",
            id: "Saya menggabungkan desain yang berpusat pada pengguna dan pengembangan web untuk menghasilkan solusi digital yang intuitif, responsif, dan fungsional.",
          })}
        </p>

        <div className="blur-in inline-flex flex-wrap justify-center gap-4">
          <a
            href="#work"
            className="group relative rounded-full px-7 py-3.5 text-sm transition-transform duration-300 hover:scale-105"
          >
            <span className="pointer-events-none absolute inset-0 rounded-full bg-white opacity-100 transition-opacity duration-200 group-hover:opacity-0" />
            <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-500 opacity-0 shadow-[0_0_18px_rgba(236,72,153,0.8),0_0_38px_rgba(236,72,153,0.4)] transition-all duration-200 group-hover:opacity-100 group-hover:shadow-[0_0_25px_rgba(236,72,153,1),0_0_55px_rgba(236,72,153,0.7)]" />
            <span className="relative z-10 font-medium text-black transition-colors duration-200 group-hover:text-white">
              {copy({ en: "See Works", id: "Lihat Proyek" })}
            </span>
          </a>

          <a
            href="#contact"
            className="group relative rounded-full px-7 py-3.5 text-sm transition duration-300 hover:scale-105"
          >
            <span className="absolute inset-0 rounded-full border border-pink-400/80 bg-pink-500/15 shadow-[0_0_12px_rgba(236,72,153,0.8),inset_0_0_12px_rgba(236,72,153,0.25)] transition-all duration-300 group-hover:border-pink-300 group-hover:bg-pink-500/25 group-hover:shadow-[0_0_20px_rgba(236,72,153,1),0_0_40px_rgba(236,72,153,0.65),inset_0_0_15px_rgba(236,72,153,0.35)]" />
            <span className="absolute inset-[2px] rounded-full bg-black/65 backdrop-blur-md" />
            <span className="relative z-10 text-pink-100 drop-shadow-[0_0_8px_rgba(244,114,182,1)] transition-colors duration-300 group-hover:text-white">
              {copy({ en: "Reach out", id: "Hubungi Saya" })}
            </span>
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3">
        <span className="text-xs uppercase tracking-[0.2em] text-white/60">
          {copy({ en: "Scroll", id: "Gulir" })}
        </span>
        <div className="relative h-10 w-px overflow-hidden bg-white/25">
          <span className="accent-gradient absolute inset-0 h-1/2 w-full animate-scroll-down" />
        </div>
      </div>
    </section>
  );
}
