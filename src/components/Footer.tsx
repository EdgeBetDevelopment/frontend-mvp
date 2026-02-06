import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/50 py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            Copyright © 2026. All rights reserved.
          </p>
          <nav className="flex items-center gap-6">
            <Link
              href="/matchup"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Matchup
            </Link>
            <Link
              href="/pricing"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Pricing
            </Link>
            <Link
              href="/community"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Community
            </Link>
            <Link
              href="/methodology"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Methodology
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
