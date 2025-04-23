'use client';

import React from 'react';
import Link from 'next/link';

import { ROUTES } from '@/routes';
import Logo from '../Logo';

import Profile from './Profile';

export const HEADER_PAGES = [
  {
    name: 'Testimonials',
    link: ROUTES.TESTIMONIALS,
  },

  {
    name: 'Methodology',
    link: ROUTES.METHODOLOGY,
  },

  {
    name: 'Pricing',
    link: ROUTES.PRICING,
  },

  {
    name: 'Community',
    link: ROUTES.COMMUNITY,
  },
  {
    name: 'Matchup',
    link: ROUTES.MATCHUP,
  },
];

const Header = () => {
  return (
    <div className="border-border flex w-full items-center justify-between rounded-2xl border bg-transparent p-3 backdrop-blur-xl">
      <Logo />

      <div className="flex items-center gap-4">
        {HEADER_PAGES.map((item) => (
          <Link className="tl-link" key={item.name} href={item.link}>
            {item.name}
          </Link>
        ))}
      </div>

      <Profile />
    </div>
  );
};

export default Header;
