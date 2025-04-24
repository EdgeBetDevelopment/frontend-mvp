'use client';

import React from 'react';
import Link from 'next/link';

import { Separator } from '../ui/separator';

import { HEADER_PAGES } from './header';
import Logo from './Logo';

import FacebookIcon from '@/assets/icons/facebook.svg';
import InstagramIcon from '@/assets/icons/instagram.svg';
import YoutubeIcon from '@/assets/icons/youtube.svg';

const SOCIAL_LINKS = [
  {
    name: 'Instagram',
    link: 'https://www.instagram.com/',
    icon: InstagramIcon,
  },

  {
    name: 'Facebook',
    link: 'https://www.facebook.com/',
    icon: FacebookIcon,
  },

  {
    name: 'Youtube',
    link: 'https://www.youtube.com/',
    icon: YoutubeIcon,
  },
];

const Footer = () => {
  return (
    <div className="border-border border-t">
      <div className="tl-container flex flex-col gap-8 py-12">
        <div className="tl-flex-between">
          <Logo />

          <div className="flex items-center gap-6">
            {SOCIAL_LINKS.map((item) => (
              <Link target="_blank" key={item.name} href={item.link}>
                <item.icon />
              </Link>
            ))}
          </div>
        </div>

        <Separator className="bg-border" />

        <div className="lg:tl-flex-between flex flex-col items-center gap-6 lg:flex-row lg:items-center lg:justify-between">
          <p className="order-1 text-center sm:text-left lg:order-0">
            Copyright © 2025. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6">
            {HEADER_PAGES.map((item) => (
              <Link className="tl-link" key={item.name} href={item.link}>
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
