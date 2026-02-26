import { axiosInstance } from '@/services/client';
import { ITeam, TeamSearchResult } from './types';

export const teamService = {
  async getTeamById(teamId: string): Promise<ITeam> {
    const res = await axiosInstance.get(`/nba/api/v1/nba/get_team/${teamId}`);
    return res.data;
  },

  async findTeam(query: string): Promise<TeamSearchResult[]> {
    const res = await axiosInstance.get(`/nba/api/v1/nba/find_team/${query}`);
    return res.data;
  },

  async searchTeam(query: string): Promise<TeamSearchResult[]> {
    const res = await axiosInstance.get(`/nba/api/v1/nba/search_team/${query}`);
    return res.data;
  },
};
