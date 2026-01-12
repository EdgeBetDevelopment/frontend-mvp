import {
  I2FAConfirmResponse,
  I2FAEnableResponse,
  I2FARecoveryResponse,
} from '@/types/auth';
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

  async changePassword(data: {
    current_password: string;
    new_password: string;
    new_password_confirm: string;
  }): Promise<string> {
    const res = await axiosInstance.post(
      `/user/api/v1/user/me/change_password`,
      data,
    );
    return res.data;
  },

  // 2FA Management
  async enable2FA(): Promise<I2FAEnableResponse> {
    const res = await axiosInstance.post(`/user/api/v1/user/2fa/enable`);
    return res.data;
  },

  async confirm2FA(code: string): Promise<I2FAConfirmResponse> {
    const res = await axiosInstance.post(
      `/user/api/v1/user/2fa/confirm?code=${code}`,
    );
    return res.data;
  },

  async disable2FA(code: string): Promise<string> {
    const res = await axiosInstance.post(
      `/user/api/v1/user/2fa/disable?code=${code}`,
    );
    return res.data;
  },

  async recover2FA(backupCode: string): Promise<I2FARecoveryResponse> {
    const res = await axiosInstance.post(
      `/user/api/v1/user/2fa/recovery?backup_code=${backupCode}`,
    );
    return res.data;
  },
};
