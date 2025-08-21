'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaRegUser } from 'react-icons/fa';

import { useAuth } from '@/context/AuthContext';
import { ROUTES } from '@/routes';
import { Button } from '@/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu';

const Profile = () => {
  const { isAuthenticated } = useAuth();

  return <>{isAuthenticated ? <AuthorizedUser /> : <UnauthorizedUser />}</>;
};

export default Profile;

const UnauthorizedUser = () => {
  return (
    <Link href={ROUTES.AUTH.LOGIN}>
      <Button variant="gradient">Get Started</Button>
    </Link>
  );
};

const AuthorizedUser = () => {
  const { clearTokens } = useAuth();
  const router = useRouter();
  const onLogOut = () => {
    clearTokens();
    router.push(ROUTES.HOME);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={'icon'} variant="gradient">
          <FaRegUser />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-background text-white">
        <Link className="cursor-pointer" href={ROUTES.PROFILE.PROFILE}>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
        </Link>

        <DropdownMenuSeparator />

        <Link className="cursor-pointer" href={ROUTES.PROFILE.PICK_OF_DAY}>
          <DropdownMenuItem>Pick Of The Day</DropdownMenuItem>
        </Link>

        <Link className="cursor-pointer" href={ROUTES.PROFILE.TRACKER}>
          <DropdownMenuItem>Tracker Page</DropdownMenuItem>
        </Link>

        <DropdownMenuItem variant="destructive" onClick={onLogOut}>
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
