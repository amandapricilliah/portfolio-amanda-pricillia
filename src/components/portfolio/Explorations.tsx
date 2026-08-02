import { useEffect, useRef, useState } from "react";
import { useLanguage } from "./LanguageProvider";

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
  const { copy } = useLanguage();

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    void (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      if (!sectionRef.current || !contentRef.current) return;

      const context = gsap.context(() => {
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

      cleanup = () => context.revert();
    })();

    return () => cleanup?.();
  }, []);

  const colA = ITEMS.slice(0, 3);
  const colB = ITEMS.slice(3);

  return (
    <section
      ref={sectionRef}
      id="explorations"
      className="relative min-h-[300vh] bg-bg"
    >
      <div
        ref={contentRef}
        className="relative z-10 flex h-screen w-full flex-col items-center justify-center px-6 text-center"
      >
        <div className="mb-6 flex items-center gap-3">
          <span className="h-px w-8 bg-stroke" />
          <span className="text-xs uppercase tracking-[0.3em] text-muted">
            {copy({ en: "Graphic Designer", id: "Desainer Grafis" })}
          </span>
          <span className="h-px w-8 bg-stroke" />
        </div>

        <h2 className="text-5xl tracking-tight text-text-primary md:text-7xl">
          {copy({ en: "Graphic", id: "Eksplorasi" })}{" "}
          <span className="font-display italic">
            {copy({ en: "Mockup", id: "Visual" })}
          </span>
        </h2>

        <p className="mt-4 max-w-md text-sm text-muted md:text-base">
          {copy({
            en: "A curated collection of branding, editorial, social media, poster, and promotional design explorations.",
            id: "Kumpulan terkurasi berisi eksplorasi branding, editorial, media sosial, poster, dan desain promosi.",
          })}
        </p>

        <a
          href="/graphics-design"
          className="group relative mt-8 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm"
        >
          <span className="absolute inset-0 rounded-full border border-stroke bg-surface transition-opacity group-hover:opacity-0" />
          <span className="accent-gradient absolute -inset-[2px] rounded-full opacity-0 transition-opacity group-hover:opacity-100" />
          <span className="absolute inset-[2px] rounded-full bg-bg opacity-0 transition-opacity group-hover:opacity-100" />
          <span className="relative flex items-center gap-2 text-text-primary">
            {copy({
              en: "Explore graphic works",
              id: "Lihat karya grafis",
            })}{" "}
            <span aria-hidden>↗</span>
          </span>
        </a>
      </div>

      <div className="pointer-events-none absolute inset-0 z-20">
        <div className="mx-auto grid h-full max-w-[1400px] grid-cols-2 gap-12 px-6 md:gap-40 md:px-10">
          <div
            ref={colARef}
            className="flex flex-col items-end gap-24 pt-[10vh] md:gap-40"
          >
            {colA.map((item, index) => (
              <button
                key={item.img}
                type="button"
                onClick={() => setLightbox(item.img)}
                aria-label={copy({
                  en: `Open graphic exploration ${index + 1}`,
                  id: `Buka eksplorasi grafis ${index + 1}`,
                })}
                className="pointer-events-auto block aspect-square w-full max-w-[320px] overflow-hidden rounded-3xl border border-stroke bg-surface shadow-2xl shadow-black/40"
                style={{ transform: `rotate(${item.rot}deg)` }}
              >
                <img
                  src={item.img}
                  alt=""
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>

          <div
            ref={colBRef}
            className="flex flex-col items-start gap-24 pt-[30vh] md:gap-40"
          >
            {colB.map((item, index) => (
              <button
                key={item.img}
                type="button"
                onClick={() => setLightbox(item.img)}
                aria-label={copy({
                  en: `Open graphic exploration ${index + 4}`,
                  id: `Buka eksplorasi grafis ${index + 4}`,
                })}
                className="pointer-events-auto block aspect-square w-full max-w-[320px] overflow-hidden rounded-3xl border border-stroke bg-surface shadow-2xl shadow-black/40"
                style={{ transform: `rotate(${item.rot}deg)` }}
              >
                <img
                  src={item.img}
                  alt=""
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-[100] flex cursor-zoom-out items-center justify-center bg-black/90 p-6 backdrop-blur-md"
        >
          <img
            src={lightbox}
            alt=""
            className="max-h-full max-w-full rounded-2xl"
          />
        </div>
      )}
    </section>
  );
}
