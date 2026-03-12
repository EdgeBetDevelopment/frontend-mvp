import { axiosInstance } from '@/shared/lib';
import type { ISubscriptionType, IUpdateSubscriptionPayload } from '../types';

const API_HEADERS = {
  'x-api-key': 'dSdnXN4q0dW1c8WIlPgvqUNAAnvv7qWt5PEetPjnk4KI30eHWi',
};

const paymentService = {
  async getSubscriptionTypes(): Promise<ISubscriptionType[]> {
    const response = await axiosInstance.get(
      `/payment/api/v1/subscription-type/`,
    );
    return response.data;
  },

  async subscribe(
    subscriptionId: number,
    promotekitReferral?: string,
  ): Promise<string> {
    const params = new URLSearchParams();
    if (promotekitReferral) {
      params.append('promotekit_referral', promotekitReferral);
    }

    const queryString = params.toString();
    const url = `/payment/api/v1/stripe/${subscriptionId}${queryString ? `?${queryString}` : ''}`;

    const response = await axiosInstance.get(url);
    return response.data.stripe_checkout_url;
  },

  async updateSubscription(payload: IUpdateSubscriptionPayload) {
    const res = await axiosInstance.patch(
      `/payment/api/v1/subscription/internal/update`,
      payload,
      { headers: API_HEADERS },
    );
    return res.data;
  },

  async cancelSubscription(subscriptionId: number, typeId: number) {
    return this.updateSubscription({
      subscription_id: subscriptionId,
      status: 'canceled',
    });
  },
};

export default paymentService;
