import { DataProvider } from 'react-admin';

import { axiosInstance } from './client';

const customDataProvider: DataProvider = {
  getList: async (resource, params) => {
    let response;

    if (resource === 'users') {
      response = await axiosInstance.get('/user/all');
      return {
        data: response.data,
        total: response.data.length,
      };
    }

    if (resource === 'usersWithBets') {
      response = await axiosInstance.get('/user/all/bets');
      return {
        data: response.data,
        total: response.data.length,
      };
    }

    response = await axiosInstance.get(`/api/${resource}`);
    return {
      data: response.data,
      total: response.data.length,
    };
  },

  getOne: async (resource, params) => {
    const { data } = await axiosInstance.get(`/api/${resource}/${params.id}`);
    return { data };
  },
  create: async (resource, params) => {
    const { data } = await axiosInstance.post(`/api/${resource}`, params.data);
    return { data };
  },
  update: async (resource, params) => {
    const { data } = await axiosInstance.put(
      `/api/${resource}/${params.id}`,
      params.data,
    );
    return { data };
  },
  delete: async (resource, params) => {
    await axiosInstance.delete(`/api/${resource}/${params.id}`);
    return { data: { id: params.id } };
  },
};

export default customDataProvider;
