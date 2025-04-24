'use client';

import React from 'react';
import Link from 'next/link';

import { useAuth } from '@/context/AuthContext';
import { ROUTES } from '@/routes';
import { Button } from '../ui/button';

import RightArrowIcon from '@/assets/icons/arrow-right.svg';

const CTABlock = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) return null;

  return (
    <div className="tl-container relative w-full overflow-hidden rounded-3xl bg-black p-5 sm:p-9 sm:py-20">
      <div className="relative z-10 flex w-full flex-col items-center justify-center gap-9">
        <div className="flex w-full max-w-[811px] flex-col items-center justify-center gap-4 text-center">
          <h3 className="text-center align-bottom text-3xl font-normal tracking-normal md:text-[40px] md:font-bold">
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

        <Link className="w-full sm:w-auto" href={ROUTES.AUTH.SIGN_UP}>
          <Button className="w-full sm:w-auto">
            Sign Up <RightArrowIcon />
          </Button>
        </Link>
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
