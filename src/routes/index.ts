export const ROUTES = {
  HOME: '/',
  NOT_FOUND: '*',
  TESTIMONIALS: '/testimonials',
  METHODOLOGY: '/methodology',
  PRICING: '/pricing',
  COMMUNITY: '/community',
  MATCHUP: '/matchup',
  PLAYER: (id: string) => `/player/${id}`,

  PROFILE: {
    TRACKER: '/profile/tracker',
  },

  AUTH: {
    LOGIN: '/auth/login',
    SIGN_UP: '/auth/sign-up',
    RESET_PASS: '/auth/reset-password',
  },
};
