import { IGameWithAI } from '@/types/game';
import { ITeam } from '@/types/team';
import { IGameTracker } from '@/types/tracker';

import { axiosInstance } from './client';

const apiService = {
  async getGames(): Promise<IGameWithAI[]> {
    const response = await axiosInstance.get(`/api/v1/nba/games`);
    console.log(response.data);
    return response.data;
  },

  async getScoreboard(): Promise<any> {
    const response = await axiosInstance.get(`/api/v1/nba/get_scoreboard`);

    return response.data.scoreboard;
  },

  async findTeam(query: string): Promise<any> {
    const response = await axiosInstance.get(`/api/v1/nba/find_team/${query}`);

    return response.data;
  },

  async searchTeam(query: string): Promise<any> {
    const response = await axiosInstance.get(
      `/api/v1/nba/search_team/${query}`,
    );

    return response.data;
  },

  async getPlayerById(query: string): Promise<any> {
    const response = await axiosInstance.get(
      `/api/v1/nba/get_player_by_id/${query}`,
    );
    return response.data;
  },

  async getPlayerByName(query: string): Promise<any> {
    const response = await axiosInstance.get(
      `/api/v1/nba/get_player_stats_by_name/${query}`,
    );
    return response.data;
  },

  async getPlayerSeasonByName(query: string): Promise<any> {
    const response = await axiosInstance.get(
      `/api/v1/nba/get_player_season_games_by_name/${query}`,
    );
    return response.data;
  },

  async getTeamById(query: string): Promise<ITeam> {
    const response = await axiosInstance.get(`/api/v1/nba/get_team/${query}`);

    return response.data;
  },

  async searchPlayer(query: string): Promise<any> {
    const response = await axiosInstance.get(
      `/api/v1/nba/search_player/${query}`,
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

    const mixed = [...normalizedTeams, ...normalizedPlayers];

    return mixed.sort(() => Math.random() - 0.5);
  },

  async createBet(data: any): Promise<string> {
    const response = await axiosInstance.post(`/api/v1/bet/create_bet`, data);

    return response.data;
  },

  async createSingleBets(data: any): Promise<string> {
    const response = await axiosInstance.post(
      `/api/v1/bet/create_single_bets
`,
      data,
    );

    return response.data;
  },

  async getBetList(body: {
    filter: string;
    sort: { field: string; direction: string }[];
  }): Promise<IGameTracker[]> {
    const response = await axiosInstance.post(`/api/v1/bet/bet_list`, body);

    return response.data;
  },

  async getPickOfTheDayList(): Promise<any[]> {
    const response = await axiosInstance.get(`/api/v1/pick_of_the_day/`);
    return response.data;
  },
};

export default apiService;
