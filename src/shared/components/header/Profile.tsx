'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaRegUser } from 'react-icons/fa';
import { Send } from 'lucide-react';

import { useAuth } from '@/modules/auth';
import { ROUTES } from '@/shared/config/routes';
import { Button } from '../button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../dropdown-menu';

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
  const { clearTokens, isAdmin, isSuperAdmin } = useAuth();
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
          <DropdownMenuItem>My Account</DropdownMenuItem>
        </Link>

        <DropdownMenuSeparator />

        <Link className="cursor-pointer" href={ROUTES.PROFILE.PICK_OF_DAY}>
          <DropdownMenuItem>Pick Of The Day</DropdownMenuItem>
        </Link>

        <Link className="cursor-pointer" href={ROUTES.PROFILE.TRACKER}>
          <DropdownMenuItem>Tracker Page</DropdownMenuItem>
        </Link>

        {(isAdmin || isSuperAdmin) && (
          <DropdownMenuItem
            asChild
            className="border-b border-t border-border/50"
          >
            <Link
              href="/admin#/pick_of_the_day/create"
              className="flex cursor-pointer items-center gap-2 !bg-amber-400/15 !text-amber-400 hover:!bg-amber-400/25"
            >
              <Send className="h-4 w-4" />
              Submit Pick of the Day
            </Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuItem variant="destructive" onClick={onLogOut}>
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
