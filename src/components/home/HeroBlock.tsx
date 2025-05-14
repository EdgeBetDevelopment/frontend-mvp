// 'use client';

import React from 'react';

import Search from './Search';

const HeroBlock = () => {
  return (
    <div className="relative">
      {/* <HeroBlockGradient /> */}

      <div className="tl-container flex w-full flex-col items-center gap-6">
        <div className="flex max-w-[811px] flex-col items-center gap-6">
          <h2 className="text-center align-bottom text-3xl font-medium capitalize sm:text-6xl">
            Level Up Your Esports Experience with edgebet
          </h2>

          <p className="text-text-secondary text-center align-bottom text-lg leading-7 font-normal tracking-normal capitalize">
            Using AI to analyze and predict the outcomes of sports.
          </p>
        </div>

        <Search />
      </div>
    </div>
  );
};

export default HeroBlock;

export const HeroBlockGradient = () => {
  return (
    <>
      <div className="absolute right-0 bottom-[0%] h-[150px] w-[200%] rotate-[25deg] bg-gradient-to-r from-[#84fdf7]/20 to-transparent blur-3xl"></div>
      <div className="absolute top-[-40%] left-[-80%] h-[150px] w-[200%] rotate-[25deg] bg-gradient-to-r from-[#84fdf7]/20 to-transparent blur-3xl"></div>
      <div className="absolute top-[-20%] left-[-40%] h-[150px] w-[200%] rotate-[25deg] bg-gradient-to-r from-[#84fdf7]/20 to-transparent blur-3xl"></div>
      <div className="absolute top-0 left-0 h-[150px] w-[200%] rotate-[25deg] bg-gradient-to-r from-[#84fdf7]/20 to-transparent blur-3xl"></div>
    </>
  );
};
