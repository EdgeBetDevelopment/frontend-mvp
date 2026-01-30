import { IGameWithAI } from '@/types/game';
import { ITeam } from '@/types/team';
import { IGameTracker } from '@/types/tracker';

import { axiosInstance } from './client';

const apiService = {
  async getGames(lastId?: number): Promise<IGameWithAI[]> {
    const response = await axiosInstance.get(`/nba/api/v1/nba/games`, {
      params: lastId ? { last_id: lastId } : {},
    });

    return response.data;
  },

  async getGameById(gameId: string): Promise<any> {
    const response = await axiosInstance.get(
      `/nba/api/v1/nba/game_details/${gameId}`,
    );

    return response.data;
  },

  async getScoreboard(): Promise<any> {
    const response = await axiosInstance.get(`/nba/api/v1/nba/get_scoreboard`);

    return response.data.scoreboard;
  },

  async findTeam(query: string): Promise<any> {
    const response = await axiosInstance.get(
      `/nba/api/v1/nba/find_team/${query}`,
    );

    return response.data;
  },

  async searchTeam(query: string): Promise<any> {
    const response = await axiosInstance.get(
      `/nba/api/v1/nba/search_team/${query}`,
    );

    return response.data;
  },

  async getPlayerById(query: string): Promise<any> {
    const response = await axiosInstance.get(
      `/nba/api/v1/nba/get_player_by_id/${query}`,
    );
    return response.data;
  },

  async getPlayerByName(query: string): Promise<any> {
    const response = await axiosInstance.get(
      `/nba/api/v1/nba/get_player_stats_by_name/${query}`,
    );
    return response.data;
  },

  async getPlayerSeasonByName(query: string): Promise<any> {
    const response = await axiosInstance.get(
      `/nba/api/v1/nba/get_player_season_games_by_name/${query}`,
    );
    return response.data;
  },

  async getTeamById(query: string): Promise<ITeam> {
    const response = await axiosInstance.get(
      `/nba/api/v1/nba/get_team/${query}`,
    );

    return response.data;
  },

  async searchPlayer(query: string): Promise<any> {
    const response = await axiosInstance.get(
      `/nba/api/v1/nba/search_player/${query}`,
    );

    return response.data;
  },

  async searchTeamsAndPlayers(query: string): Promise<any[]> {
    const [teams, players] = await Promise.all([
      apiService.searchTeam(query),
      apiService.searchPlayer(query),
    ]);

    const normalizedTeams = teams.map((team: any) => ({
      ...team,
      type: 'team',
      full_name: team.full_name,
    }));

    const normalizedPlayers = players.map((player: any) => ({
      ...player,
      type: 'player',
      full_name: player.full_name,
    }));

    if (normalizedPlayers.length === 0 && normalizedTeams.length > 0) {
      const teamPlayers: any[] = [];
      normalizedTeams.forEach((team: any) => {
        if (team.players && Array.isArray(team.players)) {
          team.players.forEach((player: any) => {
            teamPlayers.push({
              ...player,
              type: 'player',
              full_name: player.full_name,
              team_id: team.id,
              team_name: team.full_name,
              sport: team.sport,
              team_abbreviation: team.abbreviation,
            });
          });
        }
      });
      return [...normalizedTeams, ...teamPlayers];
    }

    return [...normalizedTeams, ...normalizedPlayers];
  },
  async createBet(data: any): Promise<string> {
    const response = await axiosInstance.post(
      `/bet/api/v1/bet/create_bet`,
      data,
    );

    return response.data;
  },

  async createSingleBets(data: any): Promise<string> {
    const response = await axiosInstance.post(
      `/bet/api/v1/bet/create_single_bets`,
      data,
    );

    return response.data;
  },

  async getBetList(body: {
    filter: string;
    sort: { field: string; direction: string }[];
  }): Promise<IGameTracker[]> {
    const response = await axiosInstance.post(`/bet/api/v1/bet/bet_list`, body);

    return response.data;
  },

  async getPickOfTheDayList(): Promise<any[]> {
    const response = await axiosInstance.get(`/nba/api/v1/pick_of_the_day/`);
    return response.data;
  },

  async getPickOfTheDaySports(): Promise<string[]> {
    const response = await axiosInstance.get(
      `/nba/api/v1/pick_of_the_day/sports`,
    );
    return response.data;
  },

  async getPickOfTheDayToday(): Promise<any[]> {
    const response = await axiosInstance.get(
      `/nba/api/v1/pick_of_the_day/today`,
    );
    return response.data;
  },

  async getPickOfTheDayThisWeek(): Promise<any[]> {
    const response = await axiosInstance.get(
      `/nba/api/v1/pick_of_the_day/this_week`,
    );
    return response.data;
  },
};

export default apiService;
