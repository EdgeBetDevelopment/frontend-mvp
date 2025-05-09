import { DataProvider } from 'react-admin';

import { axiosInstance } from './client';

const customDataProvider: DataProvider = {
  getList: async (resource, params) => {
    // const page = params.pagination?.page ?? 1;
    // const perPage = params.pagination?.perPage ?? 10;

    let response;

    if (resource === 'users') {
      response = await axiosInstance.get('/api/v1/user/all', {
        // params: {
        //   skip: (page - 1) * perPage,
        //   limit: perPage,
        // },
      });
      console.log(response);
      return {
        data: response.data,
        total: response.data.length,
      };
    }

    if (resource === 'usersWithBets') {
      response = await axiosInstance.get('/api/v1/user/all/bets', {
        // params: {
        //   skip: (page - 1) * perPage,
        //   limit: perPage,
        // },
      });
      console.log(response);

      const users = response.data.map((user: any) => ({
        ...user,
        totalBets: user.bets?.length || 0,
      }));

      return {
        data: users,
        total: response.data.length,
      };
    }

    response = await axiosInstance.get(`/api/v1/${resource}`);
    return {
      data: response.data,
      total: response.data.length,
    };
  },

  getOne: async (resource, params) => {
    if (resource === 'users') {
      const { data } = await axiosInstance.get(`/api/v1/user/${params.id}`);
      return { data };
    }

    if (resource === 'usersWithBets') {
      const { data } = await axiosInstance.get(
        `/api/v1/user/${params.id}/bets`,
      );
      return { data };
    }
    const { data } = await axiosInstance.get(
      `/api/v1/${resource}/${params.id}`,
    );
    return { data };
  },
  create: async (resource, params) => {
    const { data } = await axiosInstance.post(
      `/api/v1/${resource}`,
      params.data,
    );
    return { data };
  },
  update: async (resource, params) => {
    const { data } = await axiosInstance.put(
      `/api/v1/${resource}/${params.id}`,
      params.data,
    );
    return { data };
  },
  delete: async (resource, params) => {
    if (resource === 'users') {
      await axiosInstance.delete(`/api/v1/user/${params.id}`);
      return { data: { id: params.id } };
    }

    if (resource === 'usersWithBets') {
      await axiosInstance.delete(`/api/v1/user/${params.id}`);
      return { data: { id: params.id } };
    }
    await axiosInstance.delete(`/api/v1/${resource}/${params.id}`);
    return { data: { id: params.id } };
  },
};

export default customDataProvider;
