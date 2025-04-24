import React from 'react';

import { cn } from '@/lib/utils';

import GridBgImage from '@/assets/gridBg.png';

interface IBackgroundOverlay {
  bgClassName?: string;
}

const BackgroundOverlay = ({ bgClassName }: IBackgroundOverlay) => {
  return (
    <>
      <div
        className={cn(
          'bg-primary-brand/60 absolute top-1/3 left-1/2 -z-10 h-[200px] w-1/3 -translate-x-1/2 rounded-full blur-[300px]',
          bgClassName,
        )}
      />
      <div
        style={{ backgroundImage: `url(${GridBgImage.src})` }}
        className="absolute inset-0 -z-10 h-full w-full"
      />
    </>
  );
};

export default BackgroundOverlay;
