import { useEffect, useRef } from "react";
import {
  ArrowUpRight,
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
} from "lucide-react";

import { HlsVideo } from "./HlsVideo";
import {
  BACKGROUND_VIDEO_FALLBACK,
  BACKGROUND_VIDEO_SRC,
} from "@/lib/video-asset";

const CONTACT_LINKS = [
  {
  label: "WhatsApp",
  description: "Send me a message",
  href:
    "https://wa.me/6285158442408?text=Hi%20Amanda%2C%0A%0AI%20came%20across%20your%20portfolio%20and%20would%20love%20to%20discuss%20a%20potential%20project%20or%20collaboration%20with%20you.%0A%0AThank%20you.",
  icon: MessageCircle,
  external: true,
},
  {
  label: "Email",
  description: "Discuss a project",
  href:
    "https://mail.google.com/mail/?view=cm&fs=1&to=pricilliaamanda916@gmail.com&su=Project%20Collaboration&body=Hi%20Amanda%2C%0A%0AI%20would%20like%20to%20discuss%20a%20project%20with%20you.",
  icon: Mail,
  external: true,
},
  {
    label: "Instagram",
    description: "See my visual updates",
    href: "https://instagram.com/amandapricilliah",
    icon: Instagram,
    external: true,
  },
  {
    label: "LinkedIn",
    description: "Connect professionally",
    href: "https://linkedin.com/in/amandapricillia",
    icon: Linkedin,
    external: true,
  },
];

export function Contact() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    void (async () => {
      const { gsap } = await import("gsap");

      if (!marqueeRef.current) return;

      const tween = gsap.to(marqueeRef.current, {
        xPercent: -50,
        duration: 40,
        ease: "none",
        repeat: -1,
      });

      cleanup = () => tween.kill();
    })();

    return () => cleanup?.();
  }, []);

  const phrase = "BUILDING THE FUTURE • ";

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-black pb-8 pt-16 md:pb-12 md:pt-20"
    >
      {/* Background video */}
      <div className="absolute inset-0 overflow-hidden">
        <HlsVideo
          src={BACKGROUND_VIDEO_SRC}
          fallbackSrc={BACKGROUND_VIDEO_FALLBACK}
          className="absolute left-1/2 top-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 scale-y-[-1] object-cover"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/70" />

        {/* Pink ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 top-1/3 h-[28rem] w-[28rem] rounded-full bg-fuchsia-500/15 blur-[140px]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-pink-500/15 blur-[150px]"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16">
        {/* Marquee */}
        <div className="overflow-hidden py-8 md:py-16">
          <div
            ref={marqueeRef}
            className="flex whitespace-nowrap will-change-transform"
          >
            {Array.from({ length: 10 }).map((_, index) => (
              <span
                key={index}
                className="pr-8 font-display text-6xl italic text-white/90 md:text-8xl lg:text-9xl"
              >
                {phrase}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center py-12 text-center md:py-16">
          <p className="text-xs uppercase tracking-[0.3em] text-white/55">
            Get in touch
          </p>

          <h2 className="mt-6 max-w-3xl font-display text-4xl italic text-white md:text-6xl">
            Let&apos;s build something worth remembering.
          </h2>

          <p className="mt-5 max-w-xl text-sm leading-7 text-white/55 md:text-base">
            Have a project, collaboration, or opportunity in mind? Reach me
            through any platform below.
          </p>

          {/* Contact buttons */}
          <div className="mt-10 grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CONTACT_LINKS.map((contact) => {
              const Icon = contact.icon;

              return (
                <a
                  key={contact.label}
                  href={contact.href}
                  target={contact.external ? "_blank" : undefined}
                  rel={contact.external ? "noreferrer" : undefined}
                  className="group relative overflow-hidden rounded-[1.5rem] border border-white/15 bg-white/[0.06] p-5 text-left backdrop-blur-md transition duration-300 hover:-translate-y-2 hover:border-pink-300/40"
                >
                  {/* Hover glow */}
                  <span className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-pink-500/20 blur-3xl transition duration-500 group-hover:scale-150 group-hover:bg-fuchsia-400/30" />

                  <div className="relative">
                    <div className="flex items-start justify-between gap-4">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-pink-200 transition duration-300 group-hover:scale-110 group-hover:bg-pink-300 group-hover:text-black">
                        <Icon className="h-5 w-5" />
                      </span>

                      <ArrowUpRight className="h-4 w-4 text-white/40 transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-pink-200" />
                    </div>

                    <h3 className="mt-8 text-base font-medium text-white">
                      {contact.label}
                    </h3>

                    <p className="mt-2 text-xs leading-5 text-white/45">
                      {contact.description}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 flex flex-col items-center justify-between gap-6 border-t border-white/15 pt-8 text-sm md:flex-row">
          <div className="flex items-center gap-2 text-white/60">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-75" />

              <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
            </span>

            Available for projects
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5">
            {CONTACT_LINKS.map((contact) => (
              <a
                key={contact.label}
                href={contact.href}
                target={contact.external ? "_blank" : undefined}
                rel={contact.external ? "noreferrer" : undefined}
                className="text-white/55 transition-colors duration-300 hover:text-pink-200"
              >
                {contact.label}
              </a>
            ))}
          </div>

          <div className="text-xs text-white/45">
            © 2026 Amanda Pricillia
          </div>
        </div>
      </div>
    </section>
  );
}