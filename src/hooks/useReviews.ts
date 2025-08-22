import { useQuery } from '@tanstack/react-query';

import { axiosInstance } from '@/services/client';

export interface Review {
  id: number;
  name: string;
  text: string;
  rating: number;
}

export const useReviews = () => {
  return useQuery<Review[]>({
    queryKey: ['reviews'],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        '/review/api/v1/review/get_reviews?skip=0&limit=100',
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      return data?.reviews;
    },
  });
};
