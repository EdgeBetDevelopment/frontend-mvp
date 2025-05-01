import { IAuthRepsonse, ILogin, ISignUp } from '@/types/auth';
import { IGameWithAI } from '@/types/game';
import { ITeam } from '@/types/team';
import { IGameTracker } from '@/types/tracker';

import { axiosInstance } from './client';

const apiService = {
  async getGames(): Promise<IGameWithAI[]> {
    const response = await axiosInstance.get(`/api/v1/nba/games`);

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

  async login(data: ILogin): Promise<IAuthRepsonse> {
    const response = await axiosInstance.post(`/api/v1/auth/login`, data);

    return response.data;
  },

  async signUp(data: ISignUp): Promise<IAuthRepsonse> {
    const response = await axiosInstance.post(`/api/v1/auth/register`, data);

    return response.data;
  },

  async createBet(data: any): Promise<string> {
    const response = await axiosInstance.post(`/api/v1/bet/create_bet`, data);

    console.log(response);
    return response.data;
  },

  async getBetList(): Promise<IGameTracker[]> {
    const response = await axiosInstance.get(
      `/api/v1/bet/bet_list
`,
    );

    console.log(response);
    return response.data;
  },
};

export default apiService;
