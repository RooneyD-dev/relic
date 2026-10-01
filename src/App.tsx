import { useCallback, useEffect, useRef, useState } from "react";
import { MotionConfig } from "framer-motion";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Manifesto } from "./components/Manifesto";
import { Discover } from "./components/Discover";
import { Artists } from "./components/Artists";
import { HowItWorks } from "./components/HowItWorks";
import { Principles } from "./components/Principles";
import { JoinList } from "./components/JoinList";
import { Footer } from "./components/Footer";
import { ArtworkDialog } from "./components/ArtworkDialog";
import { GrainOverlay } from "./components/ui";
import { useMediaQuery } from "./hooks/useMediaQuery";
import { WORKS } from "./data/content";

export default function App() {
  const [openWorkId, setOpenWorkId] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");

  const work = openWorkId
    ? (WORKS.find((item) => item.id === openWorkId) ?? null)
    : null;

  const openWork = useCallback((id: string, trigger: HTMLElement) => {
    if (!WORKS.some((item) => item.id === id)) return;
    triggerRef.current = trigger;
    setOpenWorkId(id);
  }, []);

  const closeWork = useCallback(() => setOpenWorkId(null), []);

  /* Return focus to whichever control opened the artwork detail. */
  useEffect(() => {
    if (work) return;
    const trigger = triggerRef.current;
    triggerRef.current = null;
    if (trigger?.isConnected) trigger.focus();
  }, [work]);

  /* The menu panel and the dialog both live outside #top, so the page behind
     them can be made inert without disabling the surface itself. */
  const pageInert = work !== null || menuOpen;

  return (
    <MotionConfig reducedMotion={reduce ? "always" : "never"}>
      <div id="top" inert={pageInert}>
        <Header open={menuOpen} setOpen={setMenuOpen} />
        <main id="main" tabIndex={-1}>
          <Hero />
          <Manifesto />
          <Discover onOpenWork={openWork} />
          <Artists onOpenWork={openWork} />
          <HowItWorks />
          <Principles />
          <JoinList />
        </main>
        <Footer />
      </div>

      <GrainOverlay />
      <ArtworkDialog work={work} onClose={closeWork} onNavigate={setOpenWorkId} />
    </MotionConfig>
  );
}
