import {
  I2FAConfirmResponse,
  I2FAEnableResponse,
  I2FARecoveryResponse,
} from '@/modules/auth';
import { axiosInstance } from '@/shared/lib';
import { UpdateMeDto, ChangePasswordDto } from '../types';

export const profileApi = {
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

  async getUsersByEmail(email: string) {
    const res = await axiosInstance.get(
      `/user/api/v1/user/get_users_by_email`,
      {
        params: { email },
      },
    );
    return res.data;
  },

  async getModerators(skip = 0, limit = 100) {
    const res = await axiosInstance.get(`/user/api/v1/user/moderators`, {
      params: { skip, limit },
    });
    return res.data;
  },

  async getModerator(moderatorId: number) {
    const res = await axiosInstance.get(
      `/user/api/v1/user/moderator/${moderatorId}`,
    );
    return res.data;
  },

  async updateModeratorPermissions(
    moderatorId: number,
    permissions: Partial<{ is_admin: boolean; is_super_admin: boolean }>,
  ) {
    const res = await axiosInstance.post(
      `/user/api/v1/user/moderator/${moderatorId}`,
      permissions,
    );
    return res.data;
  },
};

export const userService = profileApi;