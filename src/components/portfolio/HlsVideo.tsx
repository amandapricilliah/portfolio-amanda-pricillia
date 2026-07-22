import { useEffect, useRef } from "react";

type Props = {
  src: string;
  fallbackSrc?: string;
  className?: string;
};

export function HlsVideo({ src, fallbackSrc, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const isHls = src.endsWith(".m3u8") || src.includes(".m3u8");

  useEffect(() => {
    if (!isHls) return;
    const video = ref.current;
    if (!video) return;
    let hls: { destroy: () => void } | null = null;

    (async () => {
      const HlsMod = (await import("hls.js")).default;
      if (HlsMod.isSupported()) {
        const instance = new HlsMod();
        instance.loadSource(src);
        instance.attachMedia(video);
        hls = instance;
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = src;
      }
    })();

    return () => {
      hls?.destroy();
    };
  }, [src, isHls]);

  if (isHls) {
    return (
      <video
        ref={ref}
        autoPlay
        muted
        loop
        playsInline
        className={className}
      />
    );
  }

  return (
    <video
      ref={ref}
      autoPlay
      muted
      loop
      playsInline
      className={className}
    >
      <source src={src} type={`video/${src.split(".").pop()}`} />
      {fallbackSrc && <source src={fallbackSrc} type={`video/${fallbackSrc.split(".").pop()}`} />}
    </video>
  );
}
