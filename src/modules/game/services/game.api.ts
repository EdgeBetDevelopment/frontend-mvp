import { axiosInstance } from "@/shared/lib";
import { IGameWithAI } from "../types";

export const gameService = {
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
};
