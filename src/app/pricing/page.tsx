import React from 'react';

import CTABlock from '@/components/CTABlock';
import PageTitle from '@/components/PageTitle';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import ArrowRightIcon from '@/assets/icons/arrow-right.svg';
import CheckIcon from '@/assets/icons/check.svg';

const PricingPage = () => {
  return (
    <div className="tl-container my-[90px] flex flex-col items-center gap-[90px]">
      <PageTitle
        className="max-w-[1100px]"
        title={
          <div>
            Start Winning with{' '}
            <span className="text-primary-brand">Expert Predictions</span>
          </div>
        }
        description={
          <p className="max-w-[850px]">
            Join thousands of successful bettors who use our AI-powered platform
            to make smarter betting decisions. Get access to professional
            predictions, real-time analytics, and a supportive community of
            experts.
          </p>
        }
      />

      <div className="w-full max-w-[720px]">
        <PricingCard />
      </div>

      <CTABlock />
    </div>
  );
};

export default PricingPage;

const PricingCard = () => {
  return (
    <div className="border-border flex w-full flex-col gap-[18px] rounded-3xl border bg-black p-7">
      <div className="tl-flex-between">
        <div className="tl-heading2">Subscription</div>
        <div className="tl-heading2 text-primary-brand flex items-center gap-1">
          <div>$49.99</div>
          <span className="text-text-secondary text-xl leading-6 font-normal tracking-normal lowercase">
            / month
          </span>
        </div>
      </div>

      <Separator />

      <ul className="tl-paraghraph1 !text-text-primary flex flex-col gap-4">
        <li className="tl-flex-icon">
          <CheckIcon /> Projections for multiple sports
        </li>
        <li className="tl-flex-icon">
          <CheckIcon /> Access to a private Discord community with 24/7 support
        </li>
        <li className="tl-flex-icon">
          <CheckIcon /> Premium picks
        </li>
      </ul>

      <Button variant="gradient">
        Get Started <ArrowRightIcon />
      </Button>
    </div>
  );
};
