'use client';

import { useState } from 'react';
import { Lock } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/tabs';
import { Button } from '@/shared/components/button';
import Navigation from '@/shared/components/Navigation';
import Footer from '@/shared/components/Footer';
import { useAuth } from '@/modules/auth';

import { ModeratorStats } from './ModeratorStats';
import { FreeMemberBanner } from './FreeMemberBanner';
import { PaywallModal } from './PaywallModal';
import { PicksList } from './PicksList';
import { usePicksData } from '../hooks/usePicksData';
import { useStartingPrice } from '../hooks/useStartingPrice';

const PickOfDayPage = () => {
  const [activeTab, setActiveTab] = useState('today');
  const [paywallOpen, setPaywallOpen] = useState(false);
  const { isPremium, isSubscribed, isPremiumLoading } = useAuth();
  const { today, week, all } = usePicksData(isPremium);
  const { startingPrice, isLoading: isPriceLoading } = useStartingPrice();

  const openPaywall = () => setPaywallOpen(true);

  const lockedTab = (message: string) => (
    <div className="text-center py-12 text-muted-foreground">
      <Lock className="h-8 w-8 mx-auto mb-3 opacity-50" />
      <p>{message}</p>
      <Button
        onClick={openPaywall}
        className="mt-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white"
      >
        Upgrade to Premium
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-6 py-8">
        <div className="mb-10 text-center">
          <h1 className="mb-4 font-display text-4xl font-bold md:text-5xl">
            Pick of the <span className="text-primary">Day</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Expert picks from our top moderators. These are the plays we're
            putting our money on.
          </p>
        </div>

        {!isSubscribed && !isPremiumLoading && (
          <FreeMemberBanner onUpgrade={openPaywall} />
        )}

        <ModeratorStats />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="border border-border/50 bg-card/50">
            <TabsTrigger value="today">Today's Picks</TabsTrigger>
            <TabsTrigger value="week">This Week</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="mt-6">
            <PicksList
              {...today}
              isLoading={today.isLoading || isPremiumLoading}
              emptyMessage="No picks for today yet."
              onUnlock={openPaywall}
            />
          </TabsContent>

          <TabsContent value="week" className="mt-6">
            {isPremiumLoading
              ? <div className="text-center text-muted-foreground py-12">Loading...</div>
              : isPremium
                ? <PicksList {...week} emptyMessage="No picks for this week yet." onUnlock={openPaywall} />
                : lockedTab('Premium members see all picks from the past 7 days.')}
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            {isPremiumLoading
              ? <div className="text-center text-muted-foreground py-12">Loading...</div>
              : isPremium
                ? <PicksList {...all} emptyMessage="No picks yet." onUnlock={openPaywall} />
                : lockedTab('Full pick history with results and ROI tracking.')}
          </TabsContent>
        </Tabs>
      </main>

      <Footer />

      <PaywallModal open={paywallOpen} onClose={() => setPaywallOpen(false)} startingPrice={startingPrice} isPriceLoading={isPriceLoading} />
    </div>
  );
};

export default PickOfDayPage;
