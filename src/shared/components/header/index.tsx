"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

import { ROUTES } from "@/shared/config/routes";
import { Button } from "../button";
import Logo from "../Logo";

import Profile from "./Profile";

export const HEADER_PAGES = [
  {
    name: "Matchup",
    link: ROUTES.MATCHUP,
  },
  {
    name: "Pricing",
    link: ROUTES.PRICING,
  },
  {
    name: "Community",
    link: ROUTES.COMMUNITY,
  },
  {
    name: "Methodology",
    link: ROUTES.METHODOLOGY,
  },
];

const Header = () => {
  return (
    <div className="border-border flex w-full items-center justify-between rounded-2xl border bg-transparent p-3 backdrop-blur-xl">
      <Logo />

      <div className="hidden items-center gap-4 sm:flex">
        {HEADER_PAGES.map((item) => (
          <Link className="tl-link" key={item.name} href={item.link}>
            {item.name}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <div className="order-2">
          <MenuBurger />
        </div>

        <Profile />
      </div>
    </div>
  );
};

export default Header;

const MenuBurger = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="sm:hidden">
      <Button
        variant="gradient"
        size={"icon"}
        onClick={() => setMenuOpen(!menuOpen)}
        className="text-white focus:outline-none"
      >
        {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {menuOpen && (
        <div className="border-border bg-background absolute top-full right-0 z-50 mt-2 w-full rounded-xl border px-4 py-3 shadow-xl">
          {HEADER_PAGES.map((item) => (
            <Link
              key={item.name}
              href={item.link}
              onClick={() => setMenuOpen(false)}
              className="hover:text-text-primary block py-2 text-sm font-medium text-white"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
