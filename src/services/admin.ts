import { DataProvider } from 'react-admin';

import { axiosInstance } from './client';

const customDataProvider: DataProvider = {
  getList: async (resource, params) => {
    let response;

    if (resource === 'users') {
      response = await axiosInstance.get('/api/v1/user/all');
      return {
        data: response.data,
        total: response.data.length,
      };
    }

    if (resource === 'usersWithBets') {
      response = await axiosInstance.get('/api/v1/user/all/bets');
      const users = response.data.map((user: any) => ({
        ...user,
        totalBets: user.bets?.length || 0,
      }));
      return {
        data: users,
        total: response.data.length,
      };
    }

    if (resource === 'review') {
      response = await axiosInstance.get('/api/v1/review/get_reviews');
      console.log(response.data.reviews);
      return {
        data: response.data.reviews,
        total: response.data.reviews.length,
      };
    }

    response = await axiosInstance.get(`/Prod/api/v1/${resource}`);
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

    if (resource === 'review') {
      const { data } = await axiosInstance.get(
        `/api/v1/review/get_review_by_id/${params.id}`,
      );

      return { data };
    }

    const { data } = await axiosInstance.get(
      `/api/v1/${resource}/${params.id}`,
    );
    return { data };
  },

  create: async (resource, params) => {
    if (resource === 'review') {
      const { data } = await axiosInstance.post(
        `/api/v1/review/create_review`,
        params.data,
      );
      return { data };
    }

    const { data } = await axiosInstance.post(
      `/Prod/api/v1/${resource}`,
      params.data,
    );
    return { data };
  },

  update: async (resource, params) => {
    if (resource === 'review') {
      const { data } = await axiosInstance.patch(
        `/api/v1/review/update_review/${params.id}`,
        params.data,
      );
      return { data };
    }

    const { data } = await axiosInstance.put(
      `/api/v1/${resource}/${params.id}`,
      params.data,
    );
    return { data };
  },

  delete: async (resource, params) => {
    if (resource === 'users' || resource === 'usersWithBets') {
      await axiosInstance.delete(`/api/v1/user/${params.id}`);
      return { data: { id: params.id } };
    }

    if (resource === 'review') {
      await axiosInstance.delete(`/api/v1/review/delete_review/${params.id}`);
      return { data: { id: params.id } };
    }

    await axiosInstance.delete(`/api/v1/${resource}/${params.id}`);
    return { data: { id: params.id } };
  },
};

export default customDataProvider;
