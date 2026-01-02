'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Crown, Star, Clock } from 'lucide-react';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import GameAnalysisModal from '@/components/modals/game-analysis';
import TrackBetsModal from '@/components/modals/TrackBetsModal';
import useModalManager from '@/hooks/useModalManager';
import apiService from '@/services';
import { useStore } from '@/store';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/ui/button';
import { Avatar, AvatarImage } from '@/ui/avatar';
import { formatUtcToLocalDate, formatUtcToLocalTimeAmPm } from '@/utils/time';

interface PickOfTheDayData {
  id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  is_premium: boolean;
  game_prediction: {
    id: number;
    home_team_id: number;
    away_team_id: number;
    home_team_logo: string;
    away_team_logo: string;
    win_probability_home: number;
    win_probability_away: number;
    odds_home: number;
    odds_away: number;
    predicted_winner: string;
    favorite_team: string;
    analysis: {
      overview: string[];
    };
    game: {
      id: number;
      nba_game_id: string;
      home_team: string;
      away_team: string;
      start_time: string;
      status: string;
      final_score: string;
    };
  };
}

const ConfidenceBadge = () => {
  return (
    <Badge className="border border-amber-500/30 bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400">
      🔒 LOCK
    </Badge>
  );
};

const PickCard = ({
  pick,
  onClickFullAnalysis,
  onClickTrackBet,
}: {
  pick: PickOfTheDayData;
  onClickFullAnalysis: () => void;
  onClickTrackBet: () => void;
}) => {
  const homeTeam = pick?.game_prediction?.game?.home_team || 'Home Team';
  const awayTeam = pick?.game_prediction?.game?.away_team || 'Away Team';
  const homeTeamLogo = pick?.game_prediction?.home_team_logo || '';
  const awayTeamLogo = pick?.game_prediction?.away_team_logo || '';

  const predictedWinner = pick?.game_prediction?.predicted_winner;
  const favoriteTeam = pick?.game_prediction?.favorite_team;

  const isPredictedHome = predictedWinner === homeTeam;
  const isFavoriteHome = favoriteTeam === homeTeam;

  const odds = isPredictedHome
    ? pick?.game_prediction?.odds_home
    : pick?.game_prediction?.odds_away;

  const spread = isFavoriteHome
    ? `${homeTeam} +${Math.abs(odds)}`
    : `${awayTeam} +${Math.abs(odds)}`;

  const oddsFormatted = odds > 0 ? `+${odds}` : odds;
  const analysis = pick?.game_prediction?.analysis?.overview?.[0] || '';

  const formattedDate = formatUtcToLocalDate(
    pick?.game_prediction?.game?.start_time,
  );
  const formattedTime = formatUtcToLocalTimeAmPm(
    pick?.game_prediction?.game?.start_time,
  );

  return (
    <Card className="overflow-hidden border-border/50 bg-card/50 transition-all duration-300 hover:border-primary/30">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Avatar className="h-12 w-12 rounded-full">
                <AvatarImage src={homeTeamLogo} />
              </Avatar>
              <Avatar className="h-12 w-12 rounded-full">
                <AvatarImage src={awayTeamLogo} />
              </Avatar>
            </div>
            {pick?.is_premium && (
              <div>
                <div className="flex items-center gap-2">
                  <Crown className="h-4 w-4 text-amber-400" />
                  <Badge
                    variant="outline"
                    className="border-primary/30 bg-primary/10 text-primary"
                  >
                    Premium
                  </Badge>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col items-end gap-2">
            <ConfidenceBadge />
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {formattedDate}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="rounded-lg border border-border/50 bg-background/50 p-4">
          <div className="mb-2 flex items-center justify-between">
            <Badge variant="outline" className="text-xs">
              NBA
            </Badge>
            <span className="text-sm text-muted-foreground">3 Units</span>
          </div>
          <p className="mb-1 text-sm text-muted-foreground">
            {homeTeam} vs {awayTeam}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-foreground">{spread}</span>
            <span className="text-lg font-semibold text-primary">-110</span>
          </div>
        </div>

        <div className="pt-2">
          <h4 className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
            <Star className="h-4 w-4 text-primary" />
            Analysis
          </h4>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {analysis}
          </p>
        </div>

        <div className="pt-2">
          <Button
            onClick={onClickFullAnalysis}
            variant="outline"
            className="w-full"
          >
            Full Analysis
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const PickOfDayPage = () => {
  const { openModal, closeModal, isModalOpen } = useModalManager();
  const { setTrackedGame, setSelectedGame } = useStore();

  const {
    data: picks = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['picks'],
    queryFn: () => apiService.getPickOfTheDayList(),
  });

  const onClickFullAnalysis = (game: PickOfTheDayData) => {
    const simplifiedGame = {
      id: game?.game_prediction?.id,
      game: {
        ...game?.game_prediction?.game,
        home_team_id: game?.game_prediction?.home_team_id,
        home_team_logo: game?.game_prediction?.home_team_logo,
        away_team_logo: game?.game_prediction?.away_team_logo,
        away_team_id: game?.game_prediction?.away_team_id,
        home_team: game?.game_prediction?.game?.home_team,
        away_team: game?.game_prediction?.game?.away_team,
      },
      prediction: {
        win_probability_away: game?.game_prediction?.win_probability_away,
        win_probability_home: game?.game_prediction?.win_probability_home,
        odds_away: game?.game_prediction?.odds_away,
        odds_home: game?.game_prediction?.odds_home,
        favorite_team: game?.game_prediction?.favorite_team,
        predicted_winner: game?.game_prediction?.predicted_winner,
        analysis: game?.game_prediction?.analysis,
      },
      nba_game_id: game?.game_prediction?.game?.nba_game_id,
      start_time: game?.game_prediction?.game?.start_time,
      status: game?.game_prediction?.game?.status,
      final_score: game?.game_prediction?.game?.final_score,
      scoreboard: null,
    };

    setSelectedGame(simplifiedGame);
    openModal('gameAnalysis');
  };

  const onClickCloseModal = () => {
    closeModal('gameAnalysis');
    setSelectedGame(null);
  };

  const onClickTrackBet = (game: PickOfTheDayData) => {
    const simplifiedGame = {
      game: {
        id: game?.game_prediction?.game?.id,
        game_prediction: game?.game_prediction,
        home_team_id: game?.game_prediction?.home_team_id,
        home_team_logo: game?.game_prediction?.home_team_logo,
        away_team_logo: game?.game_prediction?.away_team_logo,
        away_team_id: game?.game_prediction?.away_team_id,
        home_team: game?.game_prediction?.game?.home_team,
        away_team: game?.game_prediction?.game?.away_team,
        start_time: game?.game_prediction?.game?.start_time,
        status: game?.game_prediction?.game?.status,
        final_score: game?.game_prediction?.game?.final_score,
        nba_game_id: game?.game_prediction?.game?.nba_game_id,
      },
      prediction: {
        win_probability_away: game?.game_prediction?.win_probability_away,
        win_probability_home: game?.game_prediction?.win_probability_home,
        odds_away: game?.game_prediction?.odds_away,
        odds_home: game?.game_prediction?.odds_home,
        favorite_team: game?.game_prediction?.favorite_team,
        predicted_winner: game?.game_prediction?.predicted_winner,
        analysis: game?.game_prediction?.analysis,
      },
      scoreboard: null,
    };

    setTrackedGame(simplifiedGame);
    openModal('track-bet');
  };

  const onClickClearTrackBet = () => {
    setTrackedGame(null);
    closeModal('track-bet');
  };

  if (isLoading) {
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

  if (isError) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-6 py-8">
          <div className="text-center text-red-500">Error loading picks</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-background">
        <Navigation />

        <main className="container mx-auto px-6 py-8">
          {/* Header */}
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

          {/* Picks Grid */}
          <div className="space-y-6">
            {picks.map((pick) => (
              <PickCard
                key={pick.id}
                pick={pick}
                onClickFullAnalysis={() => onClickFullAnalysis(pick)}
                onClickTrackBet={() => onClickTrackBet(pick)}
              />
            ))}
          </div>
        </main>

        <Footer />
      </div>

      <GameAnalysisModal
        open={isModalOpen('gameAnalysis')}
        onClose={onClickCloseModal}
      />

      <TrackBetsModal
        isOpen={isModalOpen('track-bet')}
        onClose={onClickClearTrackBet}
      />
    </>
  );
};

export default PickOfDayPage;
