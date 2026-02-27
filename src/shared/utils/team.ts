import { IGame } from '@/modules/game/types';

export const getTeamInfoByName = (
  teamName?: string | null,
  game?: IGame | null,
) => {
  if (!teamName || !game) return null;

  const normalized = teamName.trim().toLowerCase();

  const homeTeam = {
    name: game.home_team,
    id: game.home_team_id,
    logo: game.home_team_logo,
  };

  const awayTeam = {
    name: game.away_team,
    id: game.away_team_id,
    logo: game.away_team_logo,
  };

  if (homeTeam.name?.toLowerCase() === normalized) return homeTeam;
  if (awayTeam.name?.toLowerCase() === normalized) return awayTeam;

  return null;
};
