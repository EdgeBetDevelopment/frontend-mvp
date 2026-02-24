import {
  I2FAConfirmResponse,
  I2FAEnableResponse,
  I2FARecoveryResponse,
} from '@/types/auth';
import { axiosInstance } from '@/services/client';
import { UpdateMeDto, ChangePasswordDto, ProfileUser } from './types';

export const profileService = {
  async getMe(): Promise<ProfileUser> {
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

  async changePassword(data: ChangePasswordDto): Promise<string> {
    const res = await axiosInstance.post(
      `/user/api/v1/user/me/change_password`,
      data,
    );
    return res.data;
  },

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
