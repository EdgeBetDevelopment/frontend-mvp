export interface ISubscriptionType {
  id: number;
  name: string;
  description: string[];
  price: number;
}

export type SubscriptionStatus = "active" | "canceled" | "paused";

export interface IUpdateSubscriptionPayload {
  subscription_id: number;
  status: SubscriptionStatus;
  type_id?: number;
}

export interface MappedPlan {
  id: number;
  name: string;
  originalName: string;
  price: string;
  period: string;
  description: string;
  highlight: string;
  features: string[];
  popular: boolean;
}

export interface UiConfig {
  displayName: string;
  period: string;
  uiDescription: string;
  highlight: string;
  popular: boolean;
}
