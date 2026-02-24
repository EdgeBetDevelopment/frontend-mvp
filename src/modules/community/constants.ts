export const FREE_FEATURES = [
  { text: "Access to free channels", included: true },
  { text: "Betting terminology resources", included: true },
  { text: "One free pick per day", included: true },
  { text: "Community discussions", included: false },
  { text: "Premium channels access", included: false },
  { text: "Additional plays & insights", included: false },
  { text: "Moderator bet logic & analysis", included: false },
] as const;

export const PREMIUM_FEATURES = [
  { text: "Access to all free channels", included: true },
  { text: "Betting terminology resources", included: true },
  { text: "All daily picks", included: true },
  { text: "Community discussions", included: true },
  { text: "Premium channels access", included: true },
  { text: "Additional plays & insights", included: true },
  { text: "Moderator bet logic & analysis", included: true },
] as const;
