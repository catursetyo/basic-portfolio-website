import { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroller() {
  useEffect(() => {
    const hash = window.location.hash;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const hashFrame = requestAnimationFrame(() => {
        if (hash) document.querySelector(hash)?.scrollIntoView();
      });
      return () => cancelAnimationFrame(hashFrame);
    }

    const lenis = new Lenis({ duration: 1.05, anchors: true });
    let frame;
    const hashFrame = requestAnimationFrame(() => {
      if (hash) lenis.scrollTo(hash, { immediate: true });
    });

    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(hashFrame);
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}
