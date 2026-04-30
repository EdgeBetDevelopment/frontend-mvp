'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/tabs';
import Navigation from '@/shared/components/Navigation';
import Footer from '@/shared/components/Footer';
import { useAuth } from '@/modules/auth';

import { ModeratorStats } from './ModeratorStats';
import { FreeMemberBanner } from './FreeMemberBanner';
import { PaywallModal } from './PaywallModal';
import { PicksList } from './PicksList';
import { usePicksData } from '../hooks/usePicksData';

const PickOfDayPage = () => {
  const [activeTab, setActiveTab] = useState('today');
  const [paywallOpen, setPaywallOpen] = useState(false);
  const { isPremium, isPremiumLoading } = useAuth();
  const { today, week, all } = usePicksData();

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

        {!isPremium && !isPremiumLoading && (
          <FreeMemberBanner onUpgrade={() => setPaywallOpen(true)} />
        )}

        <ModeratorStats />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="border border-border/50 bg-card/50">
            <TabsTrigger value="today">Today's Picks</TabsTrigger>
            <TabsTrigger value="week">This Week</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="mt-6">
            <PicksList {...today} emptyMessage="No picks for today yet." onUnlock={() => setPaywallOpen(true)} />
          </TabsContent>

          <TabsContent value="week" className="mt-6">
            <PicksList {...week} emptyMessage="No picks for this week yet." onUnlock={() => setPaywallOpen(true)} />
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <PicksList {...all} emptyMessage="No picks yet." onUnlock={() => setPaywallOpen(true)} />
          </TabsContent>
        </Tabs>
      </main>

      <Footer />

      <PaywallModal open={paywallOpen} onClose={() => setPaywallOpen(false)} />
    </div>
  );
};

export default PickOfDayPage;
