import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "../hooks/useMediaQuery";

/** How early a clip starts loading before its section scrolls into view. */
const LOAD_MARGIN = "400px 0px";

/**
 * Decorative background video with a still-image fallback underneath, so every
 * section keeps its atmosphere when playback is blocked, slow, or unwanted.
 *
 * The clip is only mounted while its section is near the viewport: four ~10 MB
 * loops decoding at once while the visitor is still reading the hero is not a
 * cost worth paying. Reduced-motion visitors never fetch a clip at all.
 */
export function BackdropVideo({
  src,
  fallback,
  videoClassName = "",
}: {
  src: string;
  fallback: string;
  videoClassName?: string;
}) {
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [failed, setFailed] = useState(false);
  /* Without an observer there is no way to know when the section is on screen,
     so assume it is and mount the clip. */
  const [near, setNear] = useState(
    () => typeof window === "undefined" || !("IntersectionObserver" in window),
  );
  const videoRef = useRef<HTMLVideoElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => setNear(entries.some((entry) => entry.isIntersecting)),
      { rootMargin: LOAD_MARGIN },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const showVideo = near && !reduce && !failed;

  useEffect(() => {
    if (!showVideo) return;
    /* muted + playsInline: never audible, never blocked by autoplay policy */
    void videoRef.current?.play().catch(() => {
      /* playback refused — the still backdrop below carries the section */
    });
  }, [showVideo]);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden bg-ink"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${fallback})` }}
      />
      {showVideo && (
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover ${videoClassName}`}
          src={src}
          muted
          loop
          playsInline
          preload="auto"
          tabIndex={-1}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
