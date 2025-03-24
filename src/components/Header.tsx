import React from 'react';
import Link from 'next/link';

import { ROUTES } from '@/routes';

import Logo from './Logo';
import { Button } from './ui/button';

export const HEADER_PAGES = [
  {
    name: 'Testimonials',
    link: ROUTES.HOME,
  },

  {
    name: 'Methodology',
    link: ROUTES.HOME,
  },

  {
    name: 'Pricing',
    link: ROUTES.HOME,
  },

  {
    name: 'Community',
    link: ROUTES.HOME,
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

      <Button variant="gradient">Get Started</Button>
    </div>
  );
};

export default Header;
