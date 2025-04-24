import { IAuthRepsonse, ILogin, ISignUp } from '@/types/auth';

import { axiosInstance } from './client';

const apiService = {
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

    console.log(response);

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
};

export default apiService;
