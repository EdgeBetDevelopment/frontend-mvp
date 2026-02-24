import {
  I2FAConfirmResponse,
  I2FAEnableResponse,
  I2FARecoveryResponse,
} from '@/types/auth';
import { axiosInstance } from './client';
import { profileService } from '@/modules/profile';

export interface UpdateMeDto {
  email?: string;
  username?: string;
}

/**
 * UserService - handles user-related operations
 *
 * Note: Profile-related methods (getMe, updateMe, deleteMe, changePassword, 2FA methods)
 * have been moved to @/modules/profile/services.
 * This service now primarily handles admin/moderator operations.
 *
 * For backward compatibility, profile methods are proxied to profileService.
 */
export const userService = {
  // Profile methods - proxied to profileService for backward compatibility
  async getMe() {
    return profileService.getMe();
  },

  async updateMe(payload: UpdateMeDto) {
    return profileService.updateMe(payload);
  },

  async deleteMe() {
    return profileService.deleteMe();
  },

  async changePassword(data: {
    current_password: string;
    new_password: string;
    new_password_confirm: string;
  }): Promise<string> {
    return profileService.changePassword(data);
  },

  async enable2FA(): Promise<I2FAEnableResponse> {
    return profileService.enable2FA();
  },

  async confirm2FA(code: string): Promise<I2FAConfirmResponse> {
    return profileService.confirm2FA(code);
  },

  async disable2FA(code: string): Promise<string> {
    return profileService.disable2FA(code);
  },

  async recover2FA(backupCode: string): Promise<I2FARecoveryResponse> {
    return profileService.recover2FA(backupCode);
  },

  // Admin/Moderator methods - remain in userService
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
