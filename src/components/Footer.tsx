'use client';

import React from 'react';
import Link from 'next/link';

import { HEADER_PAGES } from './header';
import Logo from './Logo';
import { Separator } from '../ui/separator';

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

        <div className="tl-flex-between">
          <p>Copyright © 2025. All rights reserved.</p>

          <div className="flex items-center gap-6">
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
