'use client';

import { Loader2, Trash2 } from 'lucide-react';

import { Card } from '@/shared/components/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components/tabs';
import Footer from '@/shared/components/Footer';
import Navigation from '@/shared/components/Navigation';
import { useBetTracker } from '@/modules/tracker/hooks/useBetTracker';

import { BetSlip } from './BetSlip';
import { BetTrackerStats } from './BetTrackerStats';
import { DeleteHistoryModal } from './DeleteHistoryModal';

const BetTrackerTable = () => {
  const {
    activeTab,
    isLoading,
    betsToShow,
    activeBets,
    completedBets,
    allTrackedBets,
    stats,
    showDeleteConfirm,
    setShowDeleteConfirm,
    deleteHistory,
    isDeleting,
    onChangeTab,
  } = useBetTracker();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 font-display text-3xl font-bold text-foreground">
            Bet Tracker
          </h1>
          <p className="text-muted-foreground">
            Track and manage all your bets in one place
          </p>
        </div>

        <BetTrackerStats
          record={stats.record}
          winRate={stats.winRate}
          netProfit={stats.netProfit}
        />

        {showDeleteConfirm && (
          <DeleteHistoryModal
            onConfirm={() => deleteHistory()}
            onCancel={() => setShowDeleteConfirm(false)}
            isDeleting={isDeleting}
          />
        )}

        <Tabs value={activeTab} onValueChange={onChangeTab} className="w-full">
          <div className="mb-6 flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="active" className="px-6">
                Active Bets ({activeBets.length})
              </TabsTrigger>
              <TabsTrigger value="completed" className="px-6">
                Completed Bets ({completedBets.length})
              </TabsTrigger>
              <TabsTrigger value="all" className="px-6">
                All Bets ({allTrackedBets.length})
              </TabsTrigger>
            </TabsList>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="flex items-center gap-2 rounded-lg border border-red-600/50 px-4 py-2 text-sm font-medium text-red-500 hover:border-red-600 hover:bg-red-600/10"
            >
              <Trash2 className="h-4 w-4" />
              Delete History
            </button>
          </div>

          <TabsContent value={activeTab} className="mt-0">
            {isLoading ? (
              <Card className="border-border bg-card p-12 text-center">
                <Loader2 className="mx-auto h-10 w-10 animate-spin text-primary" />
              </Card>
            ) : betsToShow.length > 0 ? (
              <div className="grid gap-4">
                {betsToShow.map((bet) => (
                  <BetSlip key={bet.id} bet={bet} />
                ))}
              </div>
            ) : (
              <Card className="border-border bg-card p-12 text-center">
                <p className="font-display text-xl text-muted-foreground">
                  No{' '}
                  {activeTab === 'active'
                    ? 'active'
                    : activeTab === 'completed'
                      ? 'completed'
                      : ''}{' '}
                  bets yet
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Head to the Matchup page to place your first bet
                </p>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default BetTrackerTable;

