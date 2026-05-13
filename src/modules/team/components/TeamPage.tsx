'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Crown, Lock } from 'lucide-react';

import { useAuth } from '@/context/AuthContext';
import { ROUTES } from '@/shared/config/routes';
import { useTeam } from '@/modules/team/hooks';
import { Button } from '@/shared/components/button';
import Loader from '@/shared/components/loader';
import Navigation from '@/shared/components/Navigation';
import Footer from '@/shared/components/Footer';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components/tabs';

import { TeamHeader } from './TeamHeader';
import { TeamStatCards } from './TeamStatCards';
import { TeamOverviewTab } from './TeamOverviewTab';
import { TeamRosterTab } from './TeamRosterTab';
import { TeamScheduleTab } from './TeamScheduleTab';
import { TeamStatsTab } from './TeamStatsTab';

const TeamPage = () => {
  const params = useParams();
  const teamId = params?.id as string;
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') ?? 'overview';
  const { isAuthenticated } = useAuth();

  const { data: team, isLoading, authError } = useTeam(teamId, isAuthenticated);

  if (isLoading) {
    return (
      <Loader
        size="h-14 w-14"
        className="flex h-[70vh] w-full items-center justify-center"
      />
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
                  Please login to access team details and statistics.
                </p>
                <Button
                  className="w-full"
                  onClick={() => router.push(ROUTES.AUTH.LOGIN)}
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

  if (authError === 402) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-6 py-8">
          <div className="flex min-h-[60vh] items-center justify-center">
            <Card className="max-w-md">
              <CardHeader>
                <div className="mb-4 flex justify-center">
                  <div className="rounded-full bg-primary/10 p-4">
                    <Crown className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-center text-2xl">
                  Premium Access Required
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-center text-muted-foreground">
                  Get access to detailed team statistics and insights with a
                  premium subscription.
                </p>
                <div className="space-y-2">
                  {[
                    'Complete team statistics',
                    'Player performance data',
                    'Injury reports & updates',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <Crown className="mt-0.5 h-4 w-4 text-primary" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <Button
                  className="w-full"
                  onClick={() => router.push(ROUTES.PRICING)}
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

  if (!team) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-6 py-24 text-center">
          <h1 className="mb-4 text-2xl font-bold">Team not found</h1>
          <Button onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-6 py-24">
        <TeamHeader team={team} onBack={() => router.back()} />
        <TeamStatCards overall_stats={team.overall_stats} />
        <Tabs
          value={activeTab}
          onValueChange={(tab) =>
            router.replace(`/team/${teamId}?tab=${tab}`, { scroll: false })
          }
          className="mt-4 space-y-6"
        >
          <TabsList className="grid w-full grid-cols-4 lg:inline-grid lg:w-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="roster">Roster</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-6">
            <TeamOverviewTab
              team={team}
              onGameClick={(id) => router.push(ROUTES.GAME(id))}
            />
          </TabsContent>
          <TabsContent value="roster">
            <TeamRosterTab
              players={team.player_statistics}
              onPlayerClick={(id) => router.push(ROUTES.PLAYER(String(id)))}
            />
          </TabsContent>
          <TabsContent value="schedule" className="space-y-6">
            <TeamScheduleTab
              team={team}
              onGameClick={(id) => router.push(ROUTES.GAME(id))}
            />
          </TabsContent>
          <TabsContent value="stats" className="space-y-6">
            <TeamStatsTab team={team} />
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default TeamPage;
