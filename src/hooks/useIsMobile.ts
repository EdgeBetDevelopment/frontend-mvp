import { useEffect, useState } from 'react';

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023.98px)');
    const onChange = (e: MediaQueryListEvent | MediaQueryList) =>
      setIsMobile('matches' in e ? e.matches : (e as MediaQueryList).matches);

    setIsMobile(mq.matches);

    if (mq.addEventListener) mq.addEventListener('change', onChange as any);
    else mq.addListener(onChange as any);

    return () => {
      if (mq.removeEventListener)
        mq.removeEventListener('change', onChange as any);
      else mq.removeListener(onChange as any);
    };
  }, []);

  return isMobile;
};
