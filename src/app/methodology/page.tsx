"use client";

import React from "react";
import Link from "next/link";

import CTABlock from "@/shared/components/CTABlock";
import {
  useActiveSectionContext,
  useSectionInView,
} from "@/context/ActiveSectionContext";
import { cn } from "@/shared/utils/helper";

const SECTIONS_DATA = [
  {
    id: "historical",
    hash: "#historical",
    title: "Historical Context Analysis",
    subtitle: "Deep Learning from Past Performance",
    text: [
      "Our sophisticated AI system performs comprehensive analysis of historical match data spanning multiple years and competitions. The system processes millions of past events, examining every aspect of team performance, from individual player statistics to overall team dynamics. ",
      "We dive deep into seasonal patterns, analyzing how teams perform under various conditions and circumstances. This includes studying head-to-head matchups, evaluating performance trends across different tournaments, and understanding how external factors like weather conditions or venue changes impact results. ",
      "Our AI also examines historical betting patterns and outcomes, identifying successful strategies and potential pitfalls. This wealth of historical data serves as the cornerstone for our predictive models, enabling us to spot patterns and trends that might be missed by traditional analysis methods.",
    ],
  },
  {
    id: "market",
    hash: "#market",
    title: "Market Data Integration",
    subtitle: "Real-Time Odds Analysis",
    text: [
      "Our platform maintains a constant connection to global betting markets, monitoring odds movements and market dynamics in real-time. ",
      "This sophisticated market integration system tracks odds across multiple bookmakers simultaneously, identifying value betting opportunities as they emerge. The system analyzes betting volumes, market sentiment, and price movements to detect inefficiencies and arbitrage opportunities. ",
      "By combining this real-time market data with our historical analysis, we can identify when the market may be undervaluing or overvaluing certain outcomes. This comprehensive market surveillance allows us to provide our users with timely alerts about profitable betting opportunities, ensuring they never miss out on valuable plays. The integration of market data also helps validate our predictive models, providing an additional layer of confirmation for our betting recommendations.",
    ],
  },
  {
    id: "process",
    hash: "#process",
    title: "Analysis Process",
    subtitle: "Advanced Statistical Modeling",
    text: [
      "At the heart of our platform lies a sophisticated prediction engine that combines multiple analytical approaches into a unified forecasting system. We employ advanced machine learning models trained on our extensive historical database, continuously refining their accuracy through iterative learning. These models work alongside traditional statistical analysis methods, creating a hybrid approach that captures both historical patterns and current dynamics. ",
      "Our system considers countless variables, from team composition and player fitness to tactical matchups and motivation factors. Professional sports analysts provide additional oversight, adding human expertise to our algorithmic predictions. The entire process is underpinned by robust risk assessment and probability calculations, ensuring that our predictions are not just accurate but also pragmatic for betting purposes.",
    ],
  },
  {
    id: "tracking",
    hash: "#tracking",
    title: "Historical Context Analysis",
    subtitle: "Performance Tracking & Optimization",
    text: [
      "Our commitment to accuracy drives us to maintain rigorous monitoring and evaluation of all predictions. We employ a comprehensive tracking system that continuously assesses the performance of our predictions across different sports, leagues, and betting markets.",
      "This ongoing analysis helps us identify strengths and areas for improvement in our models. We examine not just the raw success rates but also the ROI achieved through different betting strategies and approaches. This data feeds back into our optimization process, allowing us to fine-tune our models and enhance their accuracy over time. ",
      "We maintain complete transparency in our performance reporting, giving users full visibility into our track record and helping them make informed decisions about their betting strategies.",
    ],
  },
];

const Methodology = () => {
  return (
    <div className="mb-24 flex flex-col gap-24">
      <div className="relative flex flex-col items-start bg-[#1A1A1A] p-4 sm:p-6 md:flex-row">
        <MobileNav />
        <div className="sticky top-0 hidden max-h-screen overflow-y-auto md:block md:w-80 md:flex-none md:p-10">
          <MethodologyNav />
        </div>

        <div className="w-full md:flex-1">
          <MethodologyContent />
        </div>
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
    <nav className="w-full">
      <div className="flex flex-col items-start gap-8">
        {SECTIONS_DATA.map(({ id, title, hash }, index) => (
          <Link
            href={hash}
            key={id}
            onClick={() => {
              setActiveSection(id);
              setTimeOfLastClick(Date.now());
            }}
            className={cn(
              "w-full border-l-4 border-l-[#1A1A1A] pl-3 text-xl font-bold tracking-normal transition",
              { "border-l-primary-brand": activeSection === id },
            )}
          >
            <span className="mr-2 tabular-nums">0{index + 1}</span>
            {title}
          </Link>
        ))}
      </div>
    </nav>
  );
};

const MobileNav = () => {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();

  return (
    <div className="w-full pb-4 md:hidden">
      <div className="no-scrollbar flex gap-2 overflow-x-auto">
        {SECTIONS_DATA.map(({ id, title, hash }) => (
          <Link
            key={id}
            href={hash}
            onClick={() => {
              setActiveSection(id);
              setTimeOfLastClick(Date.now());
            }}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium whitespace-nowrap",
              activeSection === id ? "border-primary-brand" : "border-white/10",
            )}
          >
            {title}
          </Link>
        ))}
      </div>
    </div>
  );
};

type SectionData = {
  id: string;
  title: string;
  subtitle: string;
  text: string[];
};

const MethodologySection = ({ id, title, subtitle, text }: SectionData) => {
  const { ref } = useSectionInView(id);

  return (
    <section
      ref={ref}
      id={id}
      className="flex scroll-mt-24 flex-col gap-4 sm:gap-6 md:scroll-mt-[142px]"
    >
      <h2 className="text-2xl font-bold tracking-normal sm:text-3xl md:text-[40px]">
        {title}
      </h2>

      <div className="tl-paraghraph2 flex flex-col gap-3 sm:gap-4">
        <p className="text-text-primary text-base font-medium tracking-normal sm:text-lg md:text-2xl">
          {subtitle}
        </p>

        {text.map((paragraph, index) => (
          <p
            key={`${title}-${index}`}
            className="text-sm leading-relaxed sm:text-base"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
};

const MethodologyContent = () => {
  return (
    <div className="flex w-full flex-col gap-16 rounded-3xl bg-black p-6 sm:gap-20 sm:p-8 md:p-10 md:pl-20">
      {SECTIONS_DATA.map((section) => (
        <MethodologySection key={section.id} {...section} />
      ))}
    </div>
  );
};
