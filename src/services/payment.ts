import { axiosInstance } from './client';

export interface ISubscriptionType {
  id: number;
  name: string;
  description: string;
  price: number;
}

type SubscriptionStatus = 'active' | 'canceled' | 'paused';

interface IUpdateSubscriptionPayload {
  subscription_id: number;
  status: SubscriptionStatus;
  type_id?: number;
}

const paymentService = {
  async getSubscriptionTypes(): Promise<ISubscriptionType[]> {
    const response = await axiosInstance.get(
      `/payment/api/v1/subscription-type/`,
    );
    return response.data;
  },

  async subscribe(subscriptionId: number): Promise<string> {
    const response = await axiosInstance.get(
      `/payment/api/v1/stripe/${subscriptionId}`,
    );
    return response.data.stripe_checkout_url;
  },

  async updateSubscription(payload: IUpdateSubscriptionPayload) {
    const res = await axiosInstance.patch(
      `/payment/api/v1/subscription/internal/update`,
      payload,
    );
    return res.data;
  },

  async cancelSubscription(subscriptionId: number, typeId: number) {
    return this.updateSubscription({
      subscription_id: subscriptionId,
      status: 'canceled',
      type_id: typeId,
    });
  },
};

export default paymentService;
