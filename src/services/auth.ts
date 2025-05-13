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

  async loginGoogle(): Promise<IAuthRepsonse> {
    const response = await axiosInstance.get(`/api/v1/auth/google`);

    return response.data;
  },
};

export default authService;
