'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { cn } from '@/lib/utils';

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

  useEffect(() => {
    const activeBtn = refs.current[current];
    if (activeBtn) {
      const { offsetLeft, offsetWidth } = activeBtn;
      setIndicatorStyle({
        width: `${offsetWidth}px`,
        transform: `translate(${offsetLeft}px, -50%)`,
      });
    }
  }, [current]);

  const onChange = (val: string) => {
    const newParams = new URLSearchParams(params.toString());
    newParams.set('odds', val);
    router.push(`?${newParams.toString()}`);
  };

  return (
    <div className="bg-primary-brand relative flex rounded-full p-2">
      <span
        className="bg-primary absolute top-[50%] left-0 h-[90%] rounded-full transition-all duration-300"
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
            'relative z-10 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300',
            current === option.value ? 'text-primary-brand' : 'text-primary',
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
