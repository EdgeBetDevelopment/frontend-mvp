import { axiosInstance } from '@/shared/lib';

export const playerApi = {
  async getPlayerById(playerId: string): Promise<any> {
    const response = await axiosInstance.get(
      `/nba/api/v1/nba/get_player_by_id/${playerId}`,
    );
    return response.data;
  },

  async getPlayerByName(playerName: string): Promise<any> {
    const response = await axiosInstance.get(
      `/nba/api/v1/nba/get_player_stats_by_name/${playerName}`,
    );
    return response.data;
  },

  async getPlayerSeasonByName(playerName: string): Promise<any> {
    const response = await axiosInstance.get(
      `/nba/api/v1/nba/get_player_season_games_by_name/${playerName}`,
    );
    return response.data;
  },

  async searchPlayer(query: string): Promise<any> {
    const response = await axiosInstance.get(
      `/nba/api/v1/nba/search_player/${query}`,
    );
    return response.data;
  },
};
