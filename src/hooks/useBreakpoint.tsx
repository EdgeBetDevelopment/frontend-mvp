'use client';

import { useEffect, useState } from 'react';

export const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState<'sm' | 'md' | 'lg'>('lg');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;

      if (width < 768) {
        setBreakpoint('sm');
      } else if (width < 1024) {
        setBreakpoint('md');
      } else {
        setBreakpoint('lg');
      }
    };

    update();
    setIsInitialized(true);
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  if (!isInitialized) {
    return 'lg'; // Default value during SSR
  }

  return breakpoint;
};
