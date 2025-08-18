import React from 'react';
import Image, { StaticImageData } from 'next/image';

import PageTitle from '@/components/PageTitle';

import EmptyPhotoImage from '@/assets/emptyPhoto.png';

const COMMUNITY_FEATURES_DATA = [
  {
    title: 'Secure Payment System',
    description:
      'Credit cards, e-wallets, and cryptocurrency deposits/withdrawals. Fast payouts and reliable transaction processing with advanced encryption security.',
    image: EmptyPhotoImage,
  },
  {
    title: 'Live Betting Interface',
    description:
      'Real-time odds updates, live match statistics, and instant bet placement across multiple sports events simultaneously.',
    image: EmptyPhotoImage,
  },
  {
    title: 'Expert Analysis',
    description:
      'Professional insights, match predictions, and detailed statistics to help inform your betting decisions from experienced sports analysts.',
    image: EmptyPhotoImage,
  },
  {
    title: '24/7 Support',
    description:
      'Round-the-clock customer service via live chat, email, and phone. Multilingual support team ready to assist with any questions.',
    image: EmptyPhotoImage,
  },
  {
    title: 'Responsible Gaming',
    description:
      'Built-in tools for setting deposit limits, self-exclusion options, and resources for maintaining healthy betting habits.',
    image: EmptyPhotoImage,
  },
  {
    title: 'Loyalty Rewards',
    description:
      'Earn points on every bet, unlock VIP benefits, and receive exclusive promotions and enhanced odds offers.',
    image: EmptyPhotoImage,
  },
];

const CommunityFeatures = () => {
  return (
    <div className="relative flex flex-col items-center gap-7">
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

      <ul className="grid gap-x-5 gap-y-12 sm:grid-cols-2 md:grid-cols-3">
        {COMMUNITY_FEATURES_DATA.map((feature, index) => (
          <FeatureCard key={feature.title} {...feature} num={index + 1} />
        ))}
      </ul>
    </div>
  );
};

export default CommunityFeatures;

interface IFeatureCard {
  title: string;
  description: string;
  image: StaticImageData;
  num: number;
}

const FeatureCard = ({ title, description, image, num }: IFeatureCard) => {
  return (
    <div className="border-border flex flex-col gap-4 rounded-3xl border bg-transparent p-4 pb-8">
      <div className="">
        <Image className="w-full" src={image} alt={title} />
      </div>

      <div className="flex flex-col gap-2">
        <div className="align-middle text-2xl font-bold tracking-normal">
          {num}. {title}
        </div>

        <p className="tl-paraghraph2 !text-text-primary">{description}</p>
      </div>
    </div>
  );
};
