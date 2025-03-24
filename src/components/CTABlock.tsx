import React from 'react';

import { Button } from './ui/button';

import RightArrowIcon from '@/assets/icons/arrow-right.svg';

const CTABlock = () => {
  return (
    <div className="tl-container relative w-full overflow-hidden rounded-3xl bg-black p-9 py-20">
      <div className="relative z-10 flex w-full flex-col items-center justify-center gap-9">
        <div className="flex w-full max-w-[811px] flex-col items-center justify-center gap-4 text-center">
          <h3 className="text-center align-bottom text-[40px] font-normal tracking-normal">
            Get Exclusive Access to Expert Predictions{' '}
            <span className="text-primary-brand">Before Everyone Else</span>
          </h3>

          <p className="tl-paraghraph1">
            Join thousands of smart bettors who receive premium insights,
            real-time odds analysis, and expert predictions. Our AI-powered
            platform helps you make informed decisions and maximize your winning
            potential
          </p>
        </div>

        <Button>
          Sign Up <RightArrowIcon />
        </Button>
      </div>
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135.22deg, #84FDF7 -50.36%, rgba(0, 0, 0, 0) 20.71%)',
        }}
      />{' '}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(0deg, rgba(132, 253, 247, 0.2) -50.51%, rgba(0, 0, 0, 0) 40.72%)',
        }}
      />
      <div
        className="absolute top-0 right-0 h-full w-full"
        style={{
          background:
            'linear-gradient(197.42deg, #84FDF7 0%, rgba(132, 253, 247, 0.5) 13%, rgba(0, 0, 0, 0) 45%)',
        }}
      />
    </div>
  );
};

export default CTABlock;
