import { axiosInstance } from "@/shared/lib";
import type { ISubscriptionType, IUpdateSubscriptionPayload } from "../types";

const API_HEADERS = {
  "x-api-key": process.env.NEXT_PUBLIC_PAYMENT_API_KEY || "",
};

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
      { headers: API_HEADERS },
    );
    return res.data;
  },

  async cancelSubscription(subscriptionId: number, typeId: number) {
    return this.updateSubscription({
      subscription_id: subscriptionId,
      status: "canceled",
    });
  },
};

export default paymentService;
