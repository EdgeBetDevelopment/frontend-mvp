'use client';

import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  ReadonlyURLSearchParams,
  useRouter,
  useSearchParams,
} from 'next/navigation';

import MatchupPageFilters from '@/components/matchup/Filters';
import GameCard from '@/components/matchup/GameCard';
import GameAnalysisModal from '@/components/matchup/modals/GameAnalysisModal';
import AuthModal from '@/components/modals/AuthModal';
import TrackBetsModal from '@/components/modals/TrackBetsModal';
import { useAuth } from '@/context/AuthContext';
import useModalManager from '@/hooks/useModalManager';
import apiService from '@/services';
import { useStore } from '@/store';
import { IGameWithAI } from '@/types/game';
import { ScrollArea } from '@/ui/scroll-area';
import { Skeleton } from '@/ui/skeleton';

const MatchupPage = () => {
  const { isAuthenticated } = useAuth();
  const { openModal, closeModal, isModalOpen } = useModalManager();
  const { setTrackedGame, setSelectedGame } = useStore();
  const params = useSearchParams() as ReadonlyURLSearchParams;
  const type = params.get('type');
  const router = useRouter();

  const { data = [], isLoading } = useQuery({
    queryKey: ['scrore-board'],
    queryFn: () => apiService.getGames(),
  });

  useEffect(() => {
    if (!isAuthenticated) {
      // router.replace(ROUTES.AUTH.LOGIN);
    }
  }, [isAuthenticated, router]);

  const onClickTrackBet = (game: IGameWithAI) => {
    if (!isAuthenticated) {
      openModal('auth');
      return;
    } else {
      setTrackedGame(game);
      openModal('track-bet');
    }
  };

  const onClickClearTrackBet = () => {
    setTrackedGame(null);
    closeModal('track-bet');
  };

  const onClickFullAnalysis = (game: IGameWithAI) => {
    if (!isAuthenticated) {
      openModal('auth');
      return;
    } else {
      setSelectedGame(game);
      openModal('game-analysis');
    }
  };

  const onClickCloseModal = () => {
    closeModal('game-analysis');
    setSelectedGame(null);
  };

  return (
    <>
      <div className="tl-container mb-[90px] h-[840px] gap-10">
        <div className="flex flex-col gap-4">
          <MatchupPageFilters />

          {/* <ListRenderer
          isLoading={isLoading}
          data={data?.slice().reverse()}
          isError={!!error}
          errorComponent={<div>Error load a player</div>}
          loadingComponent={
            <Loader size="h-10 w-10" className="h-full w-full py-10" />
          }
          emptyComponent={
            <div>
              <Table className="">
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Stake</TableHead>
                    <TableHead>Bet</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
              </Table>
              <EmptyPlaceholder
                title="No bets found"
                subtitle="You don’t have any bets yet."
              />
            </div>
          }
        >
          {(bets) => (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Event</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Stake</TableHead>
                  <TableHead>Bet</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bets.map((data) => (
                  <TableRow key={data.id}>
                    <TableCell>
                      {dayjs(data.created_at).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell>
                      You placed a bet of ${data.amount} on the{' '}
                      {data.selected_team_name}
                    </TableCell>
                    <TableCell>Lorem lorem</TableCell>
                    <TableCell>{data.amount}</TableCell>
                    <TableCell>{data.odds_at_bet_time}</TableCell>
                    <TableCell>
                      <Badge
                        className="w-full max-w-[85px] py-2 capitalize"
                        variant={
                          data.status === 'won'
                            ? 'green'
                            : data.status === 'pending'
                              ? 'orange'
                              : 'red'
                        }
                      >
                        {data.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </ListRenderer> */}

          <ScrollArea className="pr-4">
            <div className="grid w-full grid-cols-2 gap-4">
              {isLoading
                ? Array.from({ length: 4 }).map((_, index) => (
                    <Skeleton
                      key={index}
                      className="h-[387px] w-[644px] rounded-3xl"
                    />
                  ))
                : data.map((game: IGameWithAI) => (
                    <GameCard
                      key={game.game.id}
                      type={type}
                      game={game}
                      onClickTrackBet={() => onClickTrackBet(game)}
                      onClickFullAnalysis={() => onClickFullAnalysis(game)}
                    />
                  ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      <AuthModal
        isOpen={isModalOpen('auth')}
        onClose={() => closeModal('auth')}
      />

      <TrackBetsModal
        isOpen={isModalOpen('track-bet')}
        onClose={onClickClearTrackBet}
      />

      <GameAnalysisModal
        open={isModalOpen('game-analysis')}
        onClose={onClickCloseModal}
      />
    </>
  );
};

export default MatchupPage;
