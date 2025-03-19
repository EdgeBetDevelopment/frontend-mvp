import React from 'react';
import Link from 'next/link';

import { ROUTES } from '@/routes';

import LogoIcon from '@/assets/icons/logo.svg';

const Logo = () => {
  return (
    <Link href={ROUTES.HOME} className="tl-link flex items-center gap-2">
      <LogoIcon />
      Edgebet
    </Link>
  );
};

export default Logo;
