import { axiosInstance } from '@/shared/lib';
import { IGameTracker } from '../types';

export const trackerApi = {
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
};
