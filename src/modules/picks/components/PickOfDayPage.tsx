'use client';

import { useState } from 'react';
import { Crown, Lock } from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components/tabs';
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
import AuthGuard from '@/app/profile/AuthGuard';

const PickOfDayPage = () => {
  const [activeTab, setActiveTab] = useState('today');
  const [paywallOpen, setPaywallOpen] = useState(false);
  const { isSubscribed, isPremiumLoading, isSubscriptionLoaded } = useAuth();
  const { today, week, all, users } = usePicksData(isSubscribed);
  const { startingPrice, isLoading: isPriceLoading } = useStartingPrice();

  const openPaywall = () => setPaywallOpen(true);

  const lockedTab = (message: string) => (
    <div className="py-12 text-center text-muted-foreground">
      <Lock className="mx-auto mb-3 h-8 w-8 opacity-50" />
      <p>{message}</p>
      <Button
        onClick={openPaywall}
        className="mt-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:from-amber-600 hover:to-orange-700"
      >
        Upgrade to Premium
      </Button>
    </div>
  );

  return (
    <AuthGuard message="Please login to access the Pick of the Day feature.">
      <div className="min-h-screen bg-background">
        <Navigation />

        <main className="container mx-auto px-6 py-8">
          <div className="mb-10 text-center">
            {isSubscribed && (
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
                <Crown className="h-5 w-5 text-primary" />
                <span className="font-medium text-primary">Premium Access</span>
              </div>
            )}

            <h1 className="mb-4 font-display text-4xl font-bold md:text-5xl">
              Pick of the <span className="text-primary">Day</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Expert picks from our top moderators. These are the plays we're
              putting our money on.
            </p>
          </div>

          {isSubscriptionLoaded && !isSubscribed && (
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
                users={users}
                isLoading={today.isLoading || isPremiumLoading}
                emptyMessage="No picks for today yet."
                onUnlock={openPaywall}
              />
            </TabsContent>

            <TabsContent value="week" className="mt-6">
              {isPremiumLoading ? (
                <div className="py-12 text-center text-muted-foreground">
                  Loading...
                </div>
              ) : isSubscribed ? (
                <PicksList
                  {...week}
                  users={users}
                  emptyMessage="No picks for this week yet."
                  onUnlock={openPaywall}
                />
              ) : (
                lockedTab('Premium members see all picks from the past 7 days.')
              )}
            </TabsContent>

            <TabsContent value="history" className="mt-6">
              {isPremiumLoading ? (
                <div className="py-12 text-center text-muted-foreground">
                  Loading...
                </div>
              ) : isSubscribed ? (
                <PicksList
                  {...all}
                  users={users}
                  emptyMessage="No picks yet."
                  onUnlock={openPaywall}
                />
              ) : (
                lockedTab('Full pick history with results and ROI tracking.')
              )}
            </TabsContent>
          </Tabs>
        </main>

        <Footer />

        <PaywallModal
          open={paywallOpen}
          onClose={() => setPaywallOpen(false)}
          startingPrice={startingPrice}
          isPriceLoading={isPriceLoading}
        />
      </div>
    </AuthGuard>
  );
};

export default PickOfDayPage;
