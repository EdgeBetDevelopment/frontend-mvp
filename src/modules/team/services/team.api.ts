import { axiosInstance } from '@/shared/lib';
import { ITeam } from '../types';

export const teamApi = {
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

  async getTeamById(teamId: string): Promise<ITeam> {
    const response = await axiosInstance.get(
      `/nba/api/v1/nba/get_team/${teamId}`,
    );
    return response.data;
  },
};
