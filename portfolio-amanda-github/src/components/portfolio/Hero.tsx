import { useEffect, useRef, useState } from "react";
import { HlsVideo } from "./HlsVideo";
import { BACKGROUND_VIDEO_FALLBACK, BACKGROUND_VIDEO_SRC } from "@/lib/video-asset";

const ROLES = ["UI/UX Designer", "Graphics Designer", "Web Developer", "WordPress Developer"];

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setInterval(() => setRoleIndex((i) => (i + 1) % ROLES.length), 2000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;
    (async () => {
      const { gsap } = await import("gsap");
      if (!rootRef.current) return;
      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from(".name-reveal", { opacity: 0, y: 50, duration: 1.2, delay: 0.1 })
          .from(
            ".blur-in",
            { opacity: 0, filter: "blur(10px)", y: 20, duration: 1, stagger: 0.1 },
            "-=0.9",
          );
      }, rootRef);
    })();
    return () => ctx?.revert();
  }, []);

  return (
    <section
      id="home"
      ref={rootRef}
      className="relative min-h-screen w-full overflow-hidden bg-bg"
    >
      {/* Background video */}
      <div className="absolute inset-0 overflow-hidden">
        <HlsVideo
          src={BACKGROUND_VIDEO_SRC}
          fallbackSrc={BACKGROUND_VIDEO_FALLBACK}
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6">
        <p className="blur-in text-xs text-white uppercase tracking-[0.3em] mb-8">
          portfolio '26
        </p>
        <h1 className="name-reveal text-6xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-text-primary mb-6">
          Amanda Pricillia
        </h1>
        <p className="blur-in text-lg md:text-xl text-text-primary/90 mb-4">
          A{" "}
          <span
            key={roleIndex}
            className="font-display italic text-text-primary animate-role-fade-in inline-block"
          >
            {ROLES[roleIndex]}
          </span>{" "}
          crafting intuitive and functional digital experiences..
        </p>
        <p className="blur-in text-sm md:text-base text-white max-w-md mb-12">
          I combine user-centered design and web development to create intuitive, responsive, and functional digital solutions.
        </p>
        <div className="blur-in inline-flex flex-wrap justify-center gap-4">
          <a
  href="#work"
  className="group relative rounded-full px-7 py-3.5 text-sm transition-transform duration-300 hover:scale-105"
>
  <span className="pointer-events-none absolute inset-0 rounded-full bg-white opacity-100 transition-opacity duration-200 group-hover:opacity-0" />

  <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-500 opacity-0 shadow-[0_0_18px_rgba(236,72,153,0.8),0_0_38px_rgba(236,72,153,0.4)] transition-all duration-200 group-hover:opacity-100 group-hover:shadow-[0_0_25px_rgba(236,72,153,1),0_0_55px_rgba(236,72,153,0.7)]" />

  <span className="relative z-10 font-medium text-black transition-colors duration-200 group-hover:text-white">
    See Works
  </span>
</a>
          <a
  href="#contact"
  className="group relative rounded-full px-7 py-3.5 text-sm transition duration-300 hover:scale-105"
>
  <span className="absolute inset-0 rounded-full border border-pink-400/80 bg-pink-500/15 shadow-[0_0_12px_rgba(236,72,153,0.8),inset_0_0_12px_rgba(236,72,153,0.25)] transition-all duration-300 group-hover:border-pink-300 group-hover:bg-pink-500/25 group-hover:shadow-[0_0_20px_rgba(236,72,153,1),0_0_40px_rgba(236,72,153,0.65),inset_0_0_15px_rgba(236,72,153,0.35)]" />

  <span className="absolute inset-[2px] rounded-full bg-black/65 backdrop-blur-md" />

  <span className="relative z-10 text-pink-100 drop-shadow-[0_0_8px_rgba(244,114,182,1)] transition-colors duration-300 group-hover:text-white">
    Reach out
  </span>
</a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3">
        <span className="text-xs text-muted uppercase tracking-[0.2em]">Scroll</span>
        <div className="relative w-px h-10 bg-stroke overflow-hidden">
          <span className="absolute inset-0 w-full h-1/2 accent-gradient animate-scroll-down" />
        </div>
      </div>
    </section>
  );
}
