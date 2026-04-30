'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { Sparkles, Crown, Zap, Bell, TrendingUp, Check } from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components/tabs';
import { Card, CardContent } from '@/shared/components/card';
import { Button } from '@/shared/components/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/shared/components/dialog';
import Navigation from '@/shared/components/Navigation';
import Footer from '@/shared/components/Footer';
import { picksApi } from '@/modules/picks';
import { useAuth } from '@/modules/auth';

import { ApiPickCard } from './ApiPickCard';
import { ModeratorStats } from './ModeratorStats';
import type { ApiPick } from '../types';

const PAYWALL_FEATURES = [
  { icon: Zap, text: 'Daily expert picks across NBA, NFL, NHL & more' },
  { icon: Crown, text: 'Exclusive 🔒 LOCK plays from Premier, Kelly & Rondo' },
  { icon: Bell, text: 'Instant email + SMS alerts when picks drop' },
  { icon: TrendingUp, text: 'Full pick history, ROI tracking & analytics' },
];

const PickOfDayPage = () => {
  const [activeTab, setActiveTab] = useState('today');
  const [paywallOpen, setPaywallOpen] = useState(false);
  const { isPremium, isPremiumLoading } = useAuth();

  const {
    data: todayPicks = [],
    isLoading: isTodayLoading,
    isError: isTodayError,
  } = useQuery({
    queryKey: ['pick-of-day', 'today'],
    queryFn: () => picksApi.getPickOfTheDayToday(),
    retry: false,
  });
  const {
    data: weekPicks = [],
    isLoading: isWeekLoading,
    isError: isWeekError,
  } = useQuery({
    queryKey: ['pick-of-day', 'this-week'],
    queryFn: () => picksApi.getPickOfTheDayThisWeek(),
    retry: false,
  });
  const {
    data: allPicks = [],
    isLoading: isAllLoading,
    isError: isAllError,
  } = useQuery({
    queryKey: ['pick-of-day', 'all'],
    queryFn: () => picksApi.getPickOfTheDayList(),
    retry: false,
  });

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
          <Card className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border-emerald-500/30 mb-8">
            <CardContent className="py-4">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <Sparkles className="h-5 w-5 text-emerald-400" />
                  <span className="text-foreground">
                    <span className="font-semibold text-emerald-400">Free Member Perk:</span> We drop a free Premium Pick every week — keep an eye out!
                  </span>
                </div>
                <Button
                  onClick={() => setPaywallOpen(true)}
                  size="sm"
                  className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white gap-2"
                >
                  <Crown className="h-4 w-4" />
                  Go Premium
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <ModeratorStats />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="border border-border/50 bg-card/50">
            <TabsTrigger value="today">Today's Picks</TabsTrigger>
            <TabsTrigger value="week">This Week</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="mt-6">
            <div className="space-y-6">
              {isTodayLoading ? (
                <div className="text-center text-muted-foreground">
                  Loading...
                </div>
              ) : null}
              {isTodayError ? (
                <div className="text-center text-red-500">
                  Error loading picks
                </div>
              ) : null}
              {!isTodayLoading && !isTodayError && todayPicks.length === 0 ? (
                <div className="text-center text-muted-foreground">
                  No picks for today yet.
                </div>
              ) : null}
              {!isTodayLoading &&
                !isTodayError &&
                todayPicks.map((pick: ApiPick) => (
                  <ApiPickCard key={pick.id} pick={pick} onUnlock={() => setPaywallOpen(true)} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="week" className="mt-6">
            <div className="space-y-6">
              {isWeekLoading ? (
                <div className="text-center text-muted-foreground">
                  Loading...
                </div>
              ) : null}
              {isWeekError ? (
                <div className="text-center text-red-500">
                  Error loading picks
                </div>
              ) : null}
              {!isWeekLoading && !isWeekError && weekPicks.length === 0 ? (
                <div className="text-center text-muted-foreground">
                  No picks for this week yet.
                </div>
              ) : null}
              {!isWeekLoading &&
                !isWeekError &&
                weekPicks.map((pick: ApiPick) => (
                  <ApiPickCard key={pick.id} pick={pick} onUnlock={() => setPaywallOpen(true)} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <div className="space-y-6">
              {isAllLoading ? (
                <div className="text-center text-muted-foreground">
                  Loading...
                </div>
              ) : null}
              {isAllError ? (
                <div className="text-center text-red-500">
                  Error loading picks
                </div>
              ) : null}
              {!isAllLoading && !isAllError && allPicks.length === 0 ? (
                <div className="text-center text-muted-foreground">
                  No picks yet.
                </div>
              ) : null}
              {!isAllLoading &&
                !isAllError &&
                allPicks.map((pick: ApiPick) => (
                  <ApiPickCard key={pick.id} pick={pick} onUnlock={() => setPaywallOpen(true)} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />

      <Dialog open={paywallOpen} onOpenChange={setPaywallOpen}>
        <DialogContent className="max-w-lg bg-card border-border/50">
          <DialogHeader>
            <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mb-4 shadow-lg shadow-amber-500/30">
              <Crown className="h-8 w-8 text-white" />
            </div>
            <DialogTitle className="text-center text-2xl font-display">
              Unlock <span className="text-primary">Premium Picks</span>
            </DialogTitle>
            <DialogDescription className="text-center text-base">
              Get instant access to every Pick of the Day from our top moderators.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 py-4">
            {PAYWALL_FEATURES.map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-background/50 border border-border/50">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Check className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm text-foreground pt-1">{item.text}</span>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-4 text-center">
            <p className="text-sm text-muted-foreground mb-1">Starting at</p>
            <p className="text-3xl font-bold text-foreground">
              $29<span className="text-base font-normal text-muted-foreground">/month</span>
            </p>
            <p className="text-xs text-muted-foreground mt-1">Cancel anytime</p>
          </div>

          <div className="flex flex-col gap-2">
            <Button
              asChild
              size="lg"
              className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold shadow-lg gap-2"
            >
              <Link href="/pricing">
                <Crown className="h-4 w-4" />
                Upgrade to Premium
              </Link>
            </Button>
            <Button variant="ghost" onClick={() => setPaywallOpen(false)} className="w-full">
              Maybe later
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PickOfDayPage;
