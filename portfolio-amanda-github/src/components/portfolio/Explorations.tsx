import { useEffect, useRef, useState } from "react";

const ITEMS = [
  { img: "/images/graphics-design/greeting/feed-01.png", rot: -2 },
  { img: "/images/graphics-design/greeting/feed-02.png", rot: 3 },
  { img: "/images/graphics-design/greeting/feed-04.png", rot: -3 },
  { img: "/images/graphics-design/boba/poster-04.png", rot: 2 },
  { img: "/images/graphics-design/pricelist/feed-01.png", rot: -1 },
  { img: "/images/graphics-design/shoe/feed-02.png", rot: 4 },
];

export function Explorations() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const colARef = useRef<HTMLDivElement>(null);
  const colBRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      if (!sectionRef.current || !contentRef.current) return;

      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: contentRef.current,
          pinSpacing: false,
        });

        gsap.to(colARef.current, {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });
        gsap.to(colBRef.current, {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });
      }, sectionRef);

      cleanup = () => ctx.revert();
    })();
    return () => cleanup?.();
  }, []);

  const colA = ITEMS.slice(0, 3);
  const colB = ITEMS.slice(3);

  return (
    <section ref={sectionRef} id="explorations" className="relative min-h-[300vh] bg-bg">
      {/* Pinned center */}
      <div
        ref={contentRef}
        className="h-screen w-full flex flex-col items-center justify-center text-center px-6 relative z-10"
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-px bg-stroke" />
          <span className="text-xs text-muted uppercase tracking-[0.3em]">Graphics Designer</span>
          <span className="w-8 h-px bg-stroke" />
        </div>
        <h2 className="text-5xl md:text-7xl text-text-primary tracking-tight">
          Graphic <span className="font-display italic">Mockup</span>
        </h2>
        <p className="mt-4 text-sm md:text-base text-muted max-w-md">
          A curated collection of branding, editorial, social media, poster, and promotional design explorations.
        </p>
        <a
  href="/graphics-design"
  className="group relative mt-8 inline-flex items-center gap-2 rounded-full text-sm px-5 py-3"
>
          <span className="absolute inset-0 rounded-full border border-stroke bg-surface group-hover:opacity-0 transition-opacity" />
          <span className="absolute -inset-[2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="absolute inset-[2px] rounded-full bg-bg opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="relative text-text-primary flex items-center gap-2">
            Explore graphic works <span aria-hidden>↗</span>
          </span>
        </a>
      </div>

      {/* Parallax columns */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-full grid grid-cols-2 gap-12 md:gap-40">
          <div ref={colARef} className="flex flex-col gap-24 md:gap-40 pt-[10vh] items-end">
            {colA.map((it, i) => (
              <button
                key={i}
                onClick={() => setLightbox(it.img)}
                className="pointer-events-auto block aspect-square w-full max-w-[320px] rounded-3xl overflow-hidden border border-stroke bg-surface shadow-2xl shadow-black/40"
                style={{ transform: `rotate(${it.rot}deg)` }}
              >
                <img src={it.img} alt="" className="w-full h-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
          <div ref={colBRef} className="flex flex-col gap-24 md:gap-40 pt-[30vh] items-start">
            {colB.map((it, i) => (
              <button
                key={i}
                onClick={() => setLightbox(it.img)}
                className="pointer-events-auto block aspect-square w-full max-w-[320px] rounded-3xl overflow-hidden border border-stroke bg-surface shadow-2xl shadow-black/40"
                style={{ transform: `rotate(${it.rot}deg)` }}
              >
                <img src={it.img} alt="" className="w-full h-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-6 cursor-zoom-out"
        >
          <img src={lightbox} alt="" className="max-w-full max-h-full rounded-2xl" />
        </div>
      )}
    </section>
  );
}
