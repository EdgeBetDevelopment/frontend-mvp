'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components/tabs';
import Navigation from '@/shared/components/Navigation';
import Footer from '@/shared/components/Footer';
import { picksApi } from '@/modules/picks';

import { ApiPickCard } from './ApiPickCard';
import { ModeratorStats } from './ModeratorStats';
import type { ApiPick } from '../types';

const PickOfDayPage = () => {
  const [activeTab, setActiveTab] = useState('today');

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
