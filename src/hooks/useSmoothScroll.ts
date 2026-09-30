import { useState, useEffect, useRef } from 'react';

export function useSmoothScroll() {
  const [progress, setProgress] = useState(0);
  const [velocity, setVelocity] = useState(0);

  const targetProgress = useRef(0);
  const currentProgress = useRef(0);
  const lastScrollY = useRef(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;

      const rawProgress = Math.min(1, Math.max(0, window.scrollY / scrollHeight));
      targetProgress.current = rawProgress;

      const deltaY = window.scrollY - lastScrollY.current;
      setVelocity(deltaY);
      lastScrollY.current = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Smooth 60 FPS animation loop with momentum interpolation
    const updateLoop = () => {
      const diff = targetProgress.current - currentProgress.current;
      // Smooth lerp easing factor
      currentProgress.current += diff * 0.085;

      if (Math.abs(diff) > 0.0001) {
        setProgress(currentProgress.current);
      } else {
        currentProgress.current = targetProgress.current;
        setProgress(targetProgress.current);
      }

      rafId.current = requestAnimationFrame(updateLoop);
    };

    rafId.current = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return { progress, velocity };
}

export function scrollToProgress(targetP: number) {
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  if (scrollHeight <= 0) return;
  window.scrollTo({
    top: targetP * scrollHeight,
    behavior: 'smooth'
  });
}
