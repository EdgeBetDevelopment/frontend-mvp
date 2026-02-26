'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

import EmptyPlaceholder from '@/components/EmptyPlaceholder';
import { teamService, TeamPageContent } from '@/modules/nba/team';
import { Button } from '@/ui/button';
import Loader from '@/ui/loader';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const TeamPage = () => {
  const params = useParams();
  const teamId = params?.id as string;
  const router = useRouter();

  const {
    data: team,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['team', teamId],
    queryFn: () => teamService.getTeamById(teamId),
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });

  if (isLoading) {
    return (
      <Loader
        size="h-14 w-14"
        className="flex h-[70vh] w-full items-center justify-center"
      />
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
      <TeamPageContent team={team} />
      <Footer />
    </div>
  );
};

export default TeamPage;

