'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Crown, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';

import Navigation from '@/shared/components/Navigation';
import Footer from '@/shared/components/Footer';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components/tabs';
import { Button } from '@/shared/components/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/card';
import { picksApi } from '@/modules/picks';
import { userService } from '@/modules/profile/services';

import { ApiPickCard } from './ApiPickCard';
import { ModeratorStats } from './ModeratorStats';
import type { ApiPick } from '../types';

const PickOfDayPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('today');

  const {
    data: userData,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useQuery({
    queryKey: ['me'],
    queryFn: userService.getMe,
    retry: false,
  });

  const isAuthenticated = !isUserError && !!userData;
  const hasActiveSubscription =
    isAuthenticated &&
    userData?.subscriptions &&
    userData.subscriptions.length > 0;

  const {
    data: todayPicks = [],
    isLoading: isTodayLoading,
    isError: isTodayError,
  } = useQuery({
    queryKey: ['pick-of-day', 'today'],
    queryFn: () => picksApi.getPickOfTheDayToday(),
    enabled: hasActiveSubscription,
  });
  const {
    data: weekPicks = [],
    isLoading: isWeekLoading,
    isError: isWeekError,
  } = useQuery({
    queryKey: ['pick-of-day', 'this-week'],
    queryFn: () => picksApi.getPickOfTheDayThisWeek(),
    enabled: hasActiveSubscription,
  });
  const {
    data: allPicks = [],
    isLoading: isAllLoading,
    isError: isAllError,
  } = useQuery({
    queryKey: ['pick-of-day', 'all'],
    queryFn: () => picksApi.getPickOfTheDayList(),
    enabled: hasActiveSubscription,
  });

  if (isUserLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-6 py-8">
          <div className="text-center text-muted-foreground">Loading...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-6 py-8">
          <div className="flex min-h-[60vh] items-center justify-center">
            <Card className="max-w-md">
              <CardHeader>
                <div className="mb-4 flex justify-center">
                  <div className="rounded-full bg-primary/10 p-4">
                    <Lock className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-center text-2xl">
                  Login Required
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-center text-muted-foreground">
                  Please login to access Pick of the Day feature.
                </p>
                <Button
                  className="w-full"
                  onClick={() => router.push('/login')}
                >
                  Login
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!hasActiveSubscription) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-6 py-8">
          <div className="flex min-h-[60vh] items-center justify-center">
            <Card className="max-w-md">
              <CardHeader>
                <div className="mb-4 flex justify-center">
                  <div className="rounded-full bg-primary/10 p-4">
                    <Lock className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-center text-2xl">
                  Premium Access Required
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-center text-muted-foreground">
                  Get access to expert picks from our top moderators with a
                  premium subscription.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Crown className="mt-0.5 h-4 w-4 text-primary" />
                    <span className="text-sm">Daily expert picks</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Crown className="mt-0.5 h-4 w-4 text-primary" />
                    <span className="text-sm">Detailed analysis</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Crown className="mt-0.5 h-4 w-4 text-primary" />
                    <span className="text-sm">Track record & stats</span>
                  </div>
                </div>
                <Button
                  className="w-full"
                  onClick={() => router.push('/pricing')}
                >
                  View Premium Plans
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-6 py-8">
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
            <Crown className="h-5 w-5 text-primary" />
            <span className="font-medium text-primary">Premium Access</span>
          </div>
          <h1 className="mb-4 font-display text-4xl font-bold md:text-5xl">
            Pick of the <span className="text-primary">Day</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Expert picks from our top moderators. These are the plays we're
            putting our money on.
          </p>
        </div>

        {/* <NotificationBanner /> */}
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
                  <ApiPickCard key={pick.id} pick={pick} />
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
                  <ApiPickCard key={pick.id} pick={pick} />
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
                  <ApiPickCard key={pick.id} pick={pick} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default PickOfDayPage;
