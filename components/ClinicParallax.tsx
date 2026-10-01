"use client";

import { useEffect } from "react";

export default function ClinicParallax() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const imgs = document.querySelectorAll<HTMLElement>(".clinic-gallery .gallery-img");
    if (!imgs.length) return;
    let frame = 0;
    const tick = () => {
      frame = 0;
      if (reduced.matches) {
        imgs.forEach((img) => (img.style.transform = ""));
        return;
      }
      const gallery = document.querySelector(".clinic-gallery");
      if (!gallery) return;
      const r = gallery.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      const p = (window.innerHeight / 2 - (r.top + r.height / 2)) / window.innerHeight;
      imgs.forEach((img, i) => {
        const amp = i === 0 ? 18 : 10;
        img.style.transform = `translate3d(0, ${p * amp}px, 0) scale(1.06)`;
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      window.removeEventListener("scroll", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
  return null;
}
