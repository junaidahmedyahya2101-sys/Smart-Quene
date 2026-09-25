import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

export function useGsapFadeIn(dependencies = []) {
  const elementRef = useRef(null);

  useLayoutEffect(() => {
    if (elementRef.current) {
      gsap.fromTo(
        elementRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, dependencies);

  return elementRef;
}