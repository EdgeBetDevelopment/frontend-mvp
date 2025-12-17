import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="border-border bg-card/50 border-t py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-muted-foreground text-sm">
            Copyright © 2025. All rights reserved.
          </p>
          <nav className="flex items-center gap-6">
            <Link
              href="/matchup"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              Matchup
            </Link>
            <Link
              href="/pricing"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/community"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              Community
            </Link>
            <Link
              href="/methodology"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
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
