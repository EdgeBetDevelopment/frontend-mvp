import Link from "next/link";

import { ROUTES } from "@/shared/config/routes";

import LogoIcon from "@/assets/icons/logo.svg";

const Logo = () => {
  return (
    <Link href={ROUTES.HOME} className="tl-link flex items-center gap-2">
      <LogoIcon />
    </Link>
  );
};

export default Logo;
