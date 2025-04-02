import React from 'react';

import CommunityFeatures from '@/components/community/CommunityFeatures';
import DiscordBlock from '@/components/community/DiscordBlock';

const CommunityPage = () => {
  return (
    <div className="tl-container my-[90px] flex flex-col items-center gap-[90px]">
      <DiscordBlock />

      <CommunityFeatures />
    </div>
  );
};

export default CommunityPage;
