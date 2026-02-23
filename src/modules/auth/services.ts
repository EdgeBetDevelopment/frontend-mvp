import { axiosInstance } from "@/services/client";

import { IAuthRepsonse, ILogin, ISignUp } from "./types";

const authService = {
  async login(data: ILogin): Promise<IAuthRepsonse> {
    const response = await axiosInstance.post(`/auth/api/v1/auth/login`, data);

    return response.data;
  },

  async signUp(data: ISignUp): Promise<IAuthRepsonse> {
    const response = await axiosInstance.post(
      `/auth/api/v1/auth/register
`,
      data,
    );

    return response.data;
  },

  async forgotPassword(email: string) {
    const response = await axiosInstance.post(
      `/auth/api/v1/auth/forgot/password?email=${email}`,
    );

    return response.data;
  },

  async verificationCode(body: { email: string; code: string | number }) {
    const response = await axiosInstance.post(
      `/auth/api/v1/auth/verify/code?email=${body.email}&code=${body.code}`,
    );

    return response.data;
  },

  async resetPassword(body: {
    email: string;
    new_password: string;
    new_password_repeat: string;
  }) {
    const response = await axiosInstance.post(
      `/auth/api/v1/auth/change/password`,
      body,
    );

    return response.data;
  },

  async loginGoogle(body: { token: string }): Promise<IAuthRepsonse> {
    const response = await axiosInstance.post(
      `/auth/api/v1/auth/google/token?token=${body.token}`,
    );

    return response.data;
  },

  // 2FA Login methods
  async login2FA(data: {
    code: string;
    temp_token: string;
  }): Promise<IAuthRepsonse> {
    const response = await axiosInstance.post(
      `/auth/api/v1/auth/login/2fa`,
      data,
    );
    return response.data;
  },

  async login2FABackup(data: {
    code: string;
    temp_token: string;
  }): Promise<IAuthRepsonse> {
    const response = await axiosInstance.post(
      `/auth/api/v1/auth/login/2fa/backup`,
      data,
    );
    return response.data;
  },

  async refreshToken(token: string): Promise<{ token: string }> {
    const response = await axiosInstance.post(`/auth/api/v1/auth/refresh`, {
      token,
    });
    return response.data;
  },
};

export default authService;
