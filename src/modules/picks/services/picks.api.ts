import { axiosInstance } from '@/shared/lib';
import { ApiPick, PickOfDayUser } from '../types';

export const picksApi = {
  async getPickOfTheDayList(): Promise<ApiPick[]> {
    const response = await axiosInstance.get(`/nba/api/v1/pick_of_the_day/`);
    return response.data;
  },

  async getPickOfTheDaySports(): Promise<string[]> {
    const response = await axiosInstance.get(
      `/nba/api/v1/pick_of_the_day/sports`,
    );
    return response.data;
  },

  async getPickOfTheDayToday(): Promise<ApiPick[]> {
    const response = await axiosInstance.get(
      `/nba/api/v1/pick_of_the_day/today`,
    );
    return response.data;
  },

  async getPickOfTheDayThisWeek(): Promise<ApiPick[]> {
    const response = await axiosInstance.get(
      `/nba/api/v1/pick_of_the_day/this_week`,
    );
    return response.data;
  },

  async getPickOfTheDayUsers(): Promise<PickOfDayUser[]> {
    const response = await axiosInstance.get(
      `/nba/api/v1/pick_of_the_day/users`,
    );
    return response.data;
  },
};
