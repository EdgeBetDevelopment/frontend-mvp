import React from 'react';
import Image from 'next/image';

import PageTitle from '@/components/PageTitle';
import { Button } from '@/ui/button';

import DiscordImage from '@/assets/discord.png';
import GridBgImage from '@/assets/gridBg.png';
import ArrowRightIcon from '@/assets/icons/arrow-right.svg';

const DiscrodBlock = () => {
  return (
    <div
      style={{
        background:
          'linear-gradient(90deg, rgba(12, 12, 12) 0%, rgba(233, 233, 233, 0.01) 50%, rgba(12, 12, 12) 100%)',
      }}
      className="relative flex w-full flex-col items-center gap-9 overflow-hidden rounded-4xl bg-[#E9E9E90D] px-14 py-12 pb-64"
    >
      <div
        style={{ backgroundImage: `url(${GridBgImage.src})` }}
        className="absolute inset-0 -z-10 h-full w-full"
      />

      <div className="bg-primary-brand/30 absolute top-0 left-1/2 -z-10 h-full w-1/3 -translate-x-1/2 rounded-full blur-[300px]" />

      <PageTitle
        className="max-w-[1100px]"
        title={
          <div>
            Our <span className="text-primary-brand">discord</span> Community
          </div>
        }
        description={
          <p className="max-w-[890px]">
            Join our thriving community of sports betting enthusiasts. Get
            instant access to exclusive picks, real-time alerts, and expert
            analysis. Our Discord server is your hub for 24/7 betting
            discussions, professional insights, and collaboration with fellow
            successful bettors.
          </p>
        }
      />

      <Button
        className="text-center align-middle text-2xl font-bold tracking-normal"
        variant="gradient"
      >
        Join Our Discord Server <ArrowRightIcon />
      </Button>

      <div className="absolute -bottom-20 h-[272px] w-[580px]">
        <Image placeholder="blur" src={DiscordImage} alt={'Discord'} />
      </div>
    </div>
  );
};

export default DiscrodBlock;
