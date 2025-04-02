import React from 'react';

import CTABlock from '@/components/CTABlock';
import PricingBlock from '@/components/pricing/page';

const PricingPage = () => {
  return (
    <div className="tl-container my-[90px] flex w-full flex-col items-center gap-[90px]">
      <PricingBlock />

      <CTABlock />
    </div>
  );
};

export default PricingPage;
