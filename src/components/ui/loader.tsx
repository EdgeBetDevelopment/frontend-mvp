import React from 'react';

import { cn } from '@/lib/utils';

interface LoaderProps {
  size?: string;
  color?: string;
  text?: string;
  textPosition?: 'top' | 'bottom';
  className?: string;
}

function Loader({
  size = 'h-7 w-7',
  color = 'border-[#84FDF7]',
  text,
  textPosition = 'bottom',
  className,
}: LoaderProps) {
  return (
    <div className={cn('flex flex-col items-center', className)}>
      {textPosition === 'top' && text && (
        <p className="text-muted-foreground mb-2 text-sm">{text}</p>
      )}

      <div
        className={cn(
          `inline-block animate-spin rounded-full border-4 border-solid ${color} ${size} border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]`,
        )}
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !border-0 !p-0 !whitespace-nowrap ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>

      {textPosition === 'bottom' && text && (
        <p className="text-muted-foreground mt-2 text-sm">{text}</p>
      )}
    </div>
  );
}

export default Loader;
