'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { cn } from '@/lib/utils';
import { useStore } from '@/store';

const ODDS_TYPE = [
  { label: 'American', value: 'american' },
  { label: 'European', value: 'european' },
];

export function OddsTypeSwitcher() {
  const params = useSearchParams();
  const router = useRouter();
  const current = params.get('odds') || 'american';

  const [indicatorStyle, setIndicatorStyle] = useState({
    transform: `translateY(-50%)`,
    width: '200px',
  });
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  const setIsAmerican = useStore((state) => state.setIsAmerican);

  const onChange = (val: string) => {
    const newParams = new URLSearchParams(params.toString());
    newParams.set('odds', val);
    router.push(`?${newParams.toString()}`);
  };

  useEffect(() => {
    const activeBtn = refs.current[current];
    if (activeBtn) {
      const { offsetLeft, offsetWidth } = activeBtn;
      setIndicatorStyle({
        width: `${offsetWidth}px`,
        transform: `translate(${offsetLeft}px, -50%)`,
      });

      setIsAmerican(current === 'american');
    }
  }, [current, setIsAmerican]);

  return (
    <div className="bg-surface-primary border-border relative flex w-full rounded-full border p-1.5">
      <span
        className="bg-surface-secondary absolute top-[50%] left-0 h-[80%] rounded-full transition-all duration-300"
        style={indicatorStyle}
      />

      {ODDS_TYPE.map((option) => (
        <button
          key={option.value}
          ref={(el) => {
            refs.current[option.value] = el;
          }}
          onClick={() => onChange(option.value)}
          className={cn(
            'relative z-10 w-full cursor-pointer rounded-full p-1.5 px-6 text-sm font-semibold transition-colors duration-300',
            current === option.value ? 'text-white' : 'text-text-secondary',
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
