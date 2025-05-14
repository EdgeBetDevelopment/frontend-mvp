import { IAuthRepsonse, ILogin, ISignUp } from '@/types/auth';

import { axiosInstance } from './client';

const authService = {
  async login(data: ILogin): Promise<IAuthRepsonse> {
    const response = await axiosInstance.post(`/api/v1/auth/login`, data);

    return response.data;
  },

  async signUp(data: ISignUp): Promise<IAuthRepsonse> {
    const response = await axiosInstance.post(`/api/v1/auth/register`, data);

    return response.data;
  },

  async forgotPassword(email: string) {
    const response = await axiosInstance.post(
      `/api/v1/auth/forgot/password?email=${email}`,
    );

    return response.data;
  },

  async verificationCode(body: { email: string; code: string | number }) {
    const response = await axiosInstance.post(
      `/api/v1/auth/verify/code?email=${body.email}&code=${body.code}`,
    );

    return response.data;
  },

  async resetPassword(body: {
    email: string;
    new_password: string;
    new_password_repeat: string;
  }) {
    const response = await axiosInstance.post(
      `/api/v1/auth/change/password`,
      body,
    );

    return response.data;
  },

  async loginGoogle(): Promise<IAuthRepsonse> {
    const response = await axiosInstance.get(`/api/v1/auth/google`);

    return response.data;
  },
};

export default authService;
