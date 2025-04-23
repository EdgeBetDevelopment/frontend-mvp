'use client';

import React from 'react';
import Link from 'next/link';
import { FaRegUser } from 'react-icons/fa';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { ROUTES } from '@/routes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

const Profile = () => {
  const { isAuthenticated } = useAuth();

  return <>{isAuthenticated ? <AuthorizedUser /> : <UnauthorizedUser />}</>;
};

export default Profile;

const UnauthorizedUser = () => {
  return (
    <Link href={ROUTES.LOGIN}>
      <Button variant="gradient">Get Started</Button>
    </Link>
  );
};

const AuthorizedUser = () => {
  const { clearTokens } = useAuth();

  const onLogOut = () => {
    clearTokens();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="gradient">
          <FaRegUser />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-background text-white">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => {}}>Tracker Page</DropdownMenuItem>

        <DropdownMenuItem variant="destructive" onClick={onLogOut}>
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
