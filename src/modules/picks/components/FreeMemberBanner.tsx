import { Sparkles, Crown } from 'lucide-react';
import { Card, CardContent } from '@/shared/components/card';
import { Button } from '@/shared/components/button';

interface FreeMemberBannerProps {
  onUpgrade: () => void;
}

export const FreeMemberBanner = ({ onUpgrade }: FreeMemberBannerProps) => (
  <Card className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border-emerald-500/30 mb-8">
    <CardContent className="py-4">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <Sparkles className="h-5 w-5 text-emerald-400" />
          <span className="text-foreground">
            <span className="font-semibold text-emerald-400">Free Member Perk:</span>{' '}
            We drop a free Premium Pick every week — keep an eye out!
          </span>
        </div>
        <Button
          onClick={onUpgrade}
          size="sm"
          className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white gap-2"
        >
          <Crown className="h-4 w-4" />
          Go Premium
        </Button>
      </div>
    </CardContent>
  </Card>
);
