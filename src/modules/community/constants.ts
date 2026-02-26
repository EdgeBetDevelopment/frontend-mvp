import EmptyPhotoImage from "@/assets/emptyPhoto.png";

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

export const COMMUNITY_FEATURES_DATA = [
  {
    title: "Secure Payment System",
    description:
      "Credit cards, e-wallets, and cryptocurrency deposits/withdrawals. Fast payouts and reliable transaction processing with advanced encryption security.",
    image: EmptyPhotoImage,
  },
  {
    title: "Live Betting Interface",
    description:
      "Real-time odds updates, live match statistics, and instant bet placement across multiple sports events simultaneously.",
    image: EmptyPhotoImage,
  },
  {
    title: "Expert Analysis",
    description:
      "Professional insights, match predictions, and detailed statistics to help inform your betting decisions from experienced sports analysts.",
    image: EmptyPhotoImage,
  },
  {
    title: "24/7 Support",
    description:
      "Round-the-clock customer service via live chat, email, and phone. Multilingual support team ready to assist with any questions.",
    image: EmptyPhotoImage,
  },
  {
    title: "Responsible Gaming",
    description:
      "Built-in tools for setting deposit limits, self-exclusion options, and resources for maintaining healthy betting habits.",
    image: EmptyPhotoImage,
  },
  {
    title: "Loyalty Rewards",
    description:
      "Earn points on every bet, unlock VIP benefits, and receive exclusive promotions and enhanced odds offers.",
    image: EmptyPhotoImage,
  },
];
