"use client";

import { Calendar, LogOut, Settings, Target, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";

import edgebetIcon from "@/assets/edgebet-icon.png";
import { useAuth } from "@/modules/auth";

interface NavigationProps {
  isLoggedIn?: boolean;
  onLogout?: () => void;
}

const Navigation = ({
  isLoggedIn: isLoggedInProp,
  onLogout,
}: NavigationProps) => {
  const router = useRouter();
  const { isAuthenticated, clearTokens } = useAuth();

  const isLoggedIn = isLoggedInProp ?? isAuthenticated;

  const handleLogout = () => {
    clearTokens();
    if (onLogout) {
      onLogout();
    }
    router.push("/login");
  };
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <img src={edgebetIcon.src} alt="EdgeBet" className="h-10 w-auto" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/matchup"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Sports
          </Link>
          <Link
            href="/profile/pick-of-the-day"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Pick of the Day
          </Link>
          <Link
            href="/pricing"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Pricing
          </Link>
          <Link
            href="/community"
            className="text-muted-foreground transition-colors hover:text-foreground"
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
                className="rounded-full bg-primary/10 hover:bg-primary/20"
              >
                <User className="h-5 w-5 text-primary" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48 border-border bg-card"
            >
              <DropdownMenuItem asChild>
                <Link
                  href="/profile/pick-of-the-day"
                  className="flex cursor-pointer items-center gap-2"
                >
                  <Calendar className="h-4 w-4" />
                  Pick of the Day
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/profile/tracker"
                  className="flex cursor-pointer items-center gap-2"
                >
                  <Target className="h-4 w-4" />
                  Tracker Page
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/profile"
                  className="flex cursor-pointer items-center gap-2"
                >
                  <Settings className="h-4 w-4" />
                  My Account
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleLogout}
                className="flex cursor-pointer items-center gap-2 text-destructive focus:text-destructive"
              >
                <LogOut className="h-4 w-4" />
                Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => router.push("/login")}
          >
            Get Started
          </Button>
        )}
      </div>
    </header>
  );
};

export default Navigation;
