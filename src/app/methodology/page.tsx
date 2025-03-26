'use client';

import React from 'react';
import Link from 'next/link';

import CTABlock from '@/components/CTABlock';
import {
  useActiveSectionContext,
  useSectionInView,
} from '@/context/ActiveSectionContext';
import { cn } from '@/lib/utils';

const SECTIONS_DATA = [
  {
    id: 'historical',
    hash: '#historical',
    title: 'Historical Context Analysis',
    subtitle: 'Deep Learning from Past Performance',
    text: [
      'Our sophisticated AI system performs comprehensive analysis of historical match data spanning multiple years and competitions. The system processes millions of past events, examining every aspect of team performance, from individual player statistics to overall team dynamics. ',
      'We dive deep into seasonal patterns, analyzing how teams perform under various conditions and circumstances. This includes studying head-to-head matchups, evaluating performance trends across different tournaments, and understanding how external factors like weather conditions or venue changes impact results. ',
      'Our AI also examines historical betting patterns and outcomes, identifying successful strategies and potential pitfalls. This wealth of historical data serves as the cornerstone for our predictive models, enabling us to spot patterns and trends that might be missed by traditional analysis methods.',
    ],
  },
  {
    id: 'market',
    hash: '#market',
    title: 'Market Data Integration',
    subtitle: 'Real-Time Odds Analysis',
    text: [
      'Our platform maintains a constant connection to global betting markets, monitoring odds movements and market dynamics in real-time. ',
      'This sophisticated market integration system tracks odds across multiple bookmakers simultaneously, identifying value betting opportunities as they emerge. The system analyzes betting volumes, market sentiment, and price movements to detect inefficiencies and arbitrage opportunities. ',
      'By combining this real-time market data with our historical analysis, we can identify when the market may be undervaluing or overvaluing certain outcomes. This comprehensive market surveillance allows us to provide our users with timely alerts about profitable betting opportunities, ensuring they never miss out on valuable plays. The integration of market data also helps validate our predictive models, providing an additional layer of confirmation for our betting recommendations.',
    ],
  },
  {
    id: 'process',
    hash: '#process',
    title: 'Analysis Process',
    subtitle: 'Advanced Statistical Modeling',
    text: [
      'At the heart of our platform lies a sophisticated prediction engine that combines multiple analytical approaches into a unified forecasting system. We employ advanced machine learning models trained on our extensive historical database, continuously refining their accuracy through iterative learning. These models work alongside traditional statistical analysis methods, creating a hybrid approach that captures both historical patterns and current dynamics. ',
      'Our system considers countless variables, from team composition and player fitness to tactical matchups and motivation factors. Professional sports analysts provide additional oversight, adding human expertise to our algorithmic predictions. The entire process is underpinned by robust risk assessment and probability calculations, ensuring that our predictions are not just accurate but also pragmatic for betting purposes.',
    ],
  },
  {
    id: 'tracking',
    hash: '#tracking',
    title: 'Historical Context Analysis',
    subtitle: 'Performance Tracking & Optimization',
    text: [
      'Our commitment to accuracy drives us to maintain rigorous monitoring and evaluation of all predictions. We employ a comprehensive tracking system that continuously assesses the performance of our predictions across different sports, leagues, and betting markets.',
      'This ongoing analysis helps us identify strengths and areas for improvement in our models. We examine not just the raw success rates but also the ROI achieved through different betting strategies and approaches. This data feeds back into our optimization process, allowing us to fine-tune our models and enhance their accuracy over time. ',
      'We maintain complete transparency in our performance reporting, giving users full visibility into our track record and helping them make informed decisions about their betting strategies.',
    ],
  },
];

const Methodology = () => {
  return (
    <div className="mb-[90px] flex flex-col gap-[90px]">
      <div className="relative flex items-start bg-[#1A1A1A] p-2">
        <MethodologyNav />
        <MethodologyContent />
      </div>

      <CTABlock />
    </div>
  );
};

export default Methodology;

const MethodologyNav = () => {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();

  return (
    <div className="sticky top-0 w-[400px] flex-1/3 p-[60px]">
      <div className="flex flex-col items-start gap-12">
        {SECTIONS_DATA.map(({ id, title, hash }, index) => (
          <Link
            href={hash}
            key={id}
            onClick={() => {
              setActiveSection(id);
              setTimeOfLastClick(Date.now());
            }}
            className={cn(
              'border-l-[4px] border-l-[#1A1A1A] pl-2.5 align-middle text-2xl font-bold tracking-normal transition',
              { 'border-l-primary-brand': activeSection === id },
            )}
          >
            <span>0{index + 1}</span> {title}
          </Link>
        ))}
      </div>
    </div>
  );
};

const MethodologyContent = () => {
  const { ref: historicalRef } = useSectionInView('historical');
  const { ref: marketRef } = useSectionInView('market');
  const { ref: processRef } = useSectionInView('process');
  const { ref: trackingRef } = useSectionInView('tracking');

  const refs: { [key: string]: (node?: Element | null) => void } = {
    historical: historicalRef,
    market: marketRef,
    process: processRef,
    tracking: trackingRef,
  };

  return (
    <div className="flex w-full flex-2/3 flex-col gap-[92px] rounded-3xl bg-black p-[60px] pl-[100px]">
      {SECTIONS_DATA.map(({ id, title, subtitle, text }) => (
        <div
          ref={refs[id]}
          key={id}
          id={id}
          className="flex scroll-mt-[142px] flex-col gap-9"
        >
          <h2 className="align-middle text-[40px] font-bold tracking-normal">
            {title}
          </h2>
          <div className="tl-paraghraph2 flex flex-col gap-4">
            <p className="text-text-primary align-middle text-2xl font-medium tracking-normal">
              {subtitle}
            </p>
            {text.map((paragraph, index) => (
              <p key={`${title}-${index}`}>{paragraph}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
