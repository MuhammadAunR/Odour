'use client'
import React, { useEffect } from 'react'
import Lenis from 'lenis';

const LenisWrapper = ({ children }) => {
  useEffect(() => {

    const lenis = new Lenis({
      duration: 0.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    window.lenis = lenis;

    const resizeObserver = new ResizeObserver(() => {
      lenis.resize(); 
    });
    resizeObserver.observe(document.body)

    let rafId;

    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      resizeObserver.disconnect();
    };
  }, []);

  return <>{children}</>
}

export default LenisWrapper