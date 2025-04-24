import { useEffect } from 'react';

export function useClickOutside<T extends HTMLElement>(
  ref: React.RefObject<HTMLDivElement | null>,
  callback: () => void,
) {
  useEffect(() => {
    if (!ref.current) return;

    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
}
