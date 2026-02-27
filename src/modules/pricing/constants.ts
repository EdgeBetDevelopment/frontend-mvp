import type { UiConfig } from './types';

export const UI_CONFIGS: Record<string, UiConfig> = {
  'Starter': {
    displayName: 'Starter',
    period: 'week',
    uiDescription: '3-day free trial included',
    highlight: 'Try risk-free',
    popular: false,
  },
  'Pro': {
    displayName: 'Pro',
    period: 'month',
    uiDescription: 'Most popular choice',
    highlight: 'Best value',
    popular: true,
  },
  'Premium': {
    displayName: 'Premium',
    period: 'month',
    uiDescription: 'Everything you need',
    highlight: 'Full access',
    popular: false,
  },
};

export const DEFAULT_UI_CONFIG: UiConfig = {
  displayName: '',
  period: 'month',
  uiDescription: 'Premium features',
  highlight: 'Full access',
  popular: false,
};

export const FAQS = [
  {
    question: "How do your predictions work?",
    answer: "Our AI analyzes thousands of data points including player stats, team performance, historical matchups, and real-time conditions to generate accurate predictions with confidence ratings.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Yes, you can cancel your subscription at any time from your account settings. Your access will continue until the end of your current billing period.",
  },
  {
    question: "What sports do you cover?",
    answer: "We currently cover NBA, NFL, MLB, NHL, Soccer, and UFC. We're constantly expanding our coverage based on user demand and data availability.",
  },
  {
    question: "How is the free trial different from a paid subscription?",
    answer: "The 3-day free trial gives you full access to all features included in the Starter plan. If you don't cancel before the trial ends, you'll be automatically charged for the subscription.",
  },
  {
    question: "Do you offer refunds?",
    answer: "Refunds are not provided once a subscription begins, unless otherwise stated by EdgeBet staff. We recommend using the free trial to ensure our service meets your needs.",
  },
] as const;
