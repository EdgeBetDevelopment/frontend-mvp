import { axiosInstance } from './client';

export interface UpdateMeDto {
  email?: string;
  username?: string;
}

export const userService = {
  async getMe() {
    const res = await axiosInstance.get(`/user/api/v1/user/me`);
    return res.data;
  },

  async updateMe(payload: UpdateMeDto) {
    const res = await axiosInstance.patch(`/user/api/v1/user/me`, payload, {
      headers: { 'Content-Type': 'application/json' },
    });
    return res.data;
  },

  async deleteMe() {
    const res = await axiosInstance.delete(`/user/api/v1/user/me`);
    return res.data;
  },
};
