import { DataProvider } from 'react-admin';

import { axiosInstance } from './client';
import { userService } from './user';

const customDataProvider: DataProvider = {
  getList: async (resource, params) => {
    let response;

    if (resource === 'users') {
      response = await axiosInstance.get('/user/api/v1/user/all');
      return {
        data: response.data,
        total: response.data.length,
      };
    }

    if (resource === 'usersWithBets') {
      response = await axiosInstance.get('/user/api/v1/user/all/bets');
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
      response = await axiosInstance.get('/review/api/v1/review/get_reviews');
      console.log(response.data.reviews);
      return {
        data: response.data.reviews,
        total: response.data.reviews.length,
      };
    }

    if (resource === 'pick_of_the_day') {
      response = await axiosInstance.get('/nba/api/v1/pick_of_the_day/');
      return {
        data: response.data,
        total: response.data.length,
      };
    }

    if (resource === 'subscribers') {
      response = await axiosInstance.get('/subscribe/api/v1/subscriber/');
      return {
        data: response.data,
        total: response.data.length,
      };
    }

    if (resource === 'moderators') {
      response = { data: await userService.getModerators() };
      return {
        data: response.data,
        total: response.data.length,
      };
    }

    response = await axiosInstance.get(`/nba/api/v1/${resource}`);
    return {
      data: response.data,
      total: response.data.length,
    };
  },

  getOne: async (resource, params) => {
    if (resource === 'users') {
      const { data } = await axiosInstance.get(
        `/user/api/v1/user/${params.id}`,
      );
      return { data };
    }

    if (resource === 'usersWithBets') {
      const { data } = await axiosInstance.get(
        `/user/api/v1/user/${params.id}/bets`,
      );
      return { data };
    }

    if (resource === 'review') {
      const { data } = await axiosInstance.get(
        `/review/api/v1/review/get_review_by_id/${params.id}`,
      );

      return { data };
    }

    if (resource === 'pick_of_the_day') {
      const { data } = await axiosInstance.get(
        `/nba/api/v1/pick_of_the_day/${params.id}`,
      );
      return { data };
    }

    if (resource === 'subscribers') {
      const { data } = await axiosInstance.get(
        `/subscribe/api/v1/subscriber/${params.id}`,
      );
      return { data };
    }

    if (resource === 'moderators') {
      const data = await userService.getModerator(params.id as number);
      return { data };
    }

    const { data } = await axiosInstance.get(
      `/user/api/v1/${resource}/${params.id}`,
    );
    return { data };
  },

  create: async (resource, params) => {
    if (resource === 'users' || resource === 'usersWithBets') {
      const { data } = await axiosInstance.post(
        `/user/api/v1/user`,
        params.data,
      );
      return { data };
    }

    if (resource === 'review') {
      const { data } = await axiosInstance.post(
        `/review/api/v1/review/create_review`,
        params.data,
      );
      return { data };
    }

    if (resource === 'pick_of_the_day') {
      const sport = String(params.data?.sport || '').toLowerCase();
      const url =
        sport && sport !== 'nba'
          ? `/nba/api/v1/pick_of_the_day/create_other_sport`
          : `/nba/api/v1/pick_of_the_day/`;
      const { data } = await axiosInstance.post(url, params.data);
      return { data };
    }

    if (resource === 'subscribers') {
      const { data } = await axiosInstance.post(
        `/subscribe/api/v1/subscriber/`,
        params.data,
      );
      return { data };
    }

    const { data } = await axiosInstance.post(
      `/Prod/user/api/v1/${resource}`,
      params.data,
    );
    return { data };
  },

  update: async (resource, params) => {
    if (resource === 'users' || resource === 'usersWithBets') {
      const { data } = await axiosInstance.put(
        `/user/api/v1/user/${params.id}`,
        params.data,
      );
      return { data };
    }

    if (resource === 'review') {
      const { data } = await axiosInstance.patch(
        `/review/api/v1/review/update_review/${params.id}`,
        params.data,
      );
      return { data };
    }

    if (resource === 'pick_of_the_day') {
      console.log('DataProvider update - pick_of_the_day:', {
        id: params.id,
        data: params.data,
      });
      try {
        const { data } = await axiosInstance.patch(
          `/nba/api/v1/pick_of_the_day/${params.id}`,
          params.data,
        );
        console.log('DataProvider update - response:', data);
        return { data };
      } catch (error) {
        console.error('DataProvider update - error:', error);
        throw error;
      }
    }

    if (resource === 'subscribers') {
      const { data } = await axiosInstance.patch(
        `/subscribe/api/v1/subscriber/${params.id}`,
        params.data,
      );
      return { data };
    }

    if (resource === 'moderators') {
      const data = await userService.updateModeratorPermissions(
        params.id as number,
        params.data,
      );
      return { data };
    }

    const { data } = await axiosInstance.put(
      `/user/api/v1/${resource}/${params.id}`,
      params.data,
    );
    return { data };
  },

  delete: async (resource, params) => {
    if (resource === 'users' || resource === 'usersWithBets') {
      await axiosInstance.delete(`/user/api/v1/user/${params.id}`);
      return { data: { id: params.id } };
    }

    if (resource === 'review') {
      await axiosInstance.delete(
        `/review/api/v1/review/delete_review/${params.id}`,
      );
      return { data: { id: params.id } };
    }

    if (resource === 'pick_of_the_day') {
      await axiosInstance.delete(`/nba/api/v1/pick_of_the_day/${params.id}`);
      return { data: { id: params.id } };
    }

    if (resource === 'subscribers') {
      await axiosInstance.delete(`/subscribe/api/v1/subscriber/${params.id}`);
      return { data: { id: params.id } };
    }

    await axiosInstance.delete(`/user/api/v1/${resource}/${params.id}`);
    return { data: { id: params.id } };
  },
};

export default customDataProvider;
