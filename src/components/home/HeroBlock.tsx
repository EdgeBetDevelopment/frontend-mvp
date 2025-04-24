import React from 'react';

import Search from './Search';

const HeroBlock = () => {
  return (
    <div className="tl-container flex w-full flex-col items-center gap-6">
      <div className="flex max-w-[811px] flex-col items-center gap-6">
        <h2 className="text-center align-bottom text-6xl font-medium capitalize">
          Level Up Your Esports Experience with edgebet
        </h2>

        <p className="text-text-secondary text-center align-bottom text-lg leading-7 font-normal tracking-normal capitalize">
          Using AI to analyze and predict the outcomes of sports.
        </p>
      </div>

      <Search />
    </div>
  );
};

export default HeroBlock;
