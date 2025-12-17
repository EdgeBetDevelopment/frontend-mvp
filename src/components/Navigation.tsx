'use client';

import { Calendar, LogOut, Settings, Target, User } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import edgebetIcon from '@/assets/edgebet-icon.png';

interface NavigationProps {
  isLoggedIn?: boolean;
  onLogout?: () => void;
}

const Navigation = ({ isLoggedIn = true, onLogout }: NavigationProps) => {
  return (
    <header className="border-border bg-background/95 sticky top-0 z-50 border-b backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <img src={edgebetIcon.src} alt="EdgeBet" className="h-10 w-auto" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/matchup"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Sports
          </Link>
          <Link
            href="/pick-of-the-day"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Pick of the Day
          </Link>
          <Link
            href="/pricing"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/community"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Community
          </Link>
        </nav>

        {isLoggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="bg-primary/10 hover:bg-primary/20 rounded-full"
              >
                <User className="text-primary h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-card border-border w-48"
            >
              <DropdownMenuItem asChild>
                <Link
                  href="/pick-of-the-day"
                  className="flex cursor-pointer items-center gap-2"
                >
                  <Calendar className="h-4 w-4" />
                  Pick of the Day
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/tracker"
                  className="flex cursor-pointer items-center gap-2"
                >
                  <Target className="h-4 w-4" />
                  Tracker Page
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/account"
                  className="flex cursor-pointer items-center gap-2"
                >
                  <Settings className="h-4 w-4" />
                  My Account
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={onLogout}
                className="text-destructive focus:text-destructive flex cursor-pointer items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Get Started
          </Button>
        )}
      </div>
    </header>
  );
};

export default Navigation;
