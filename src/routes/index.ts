export const ROUTES = {
  HOME: '/',
  NOT_FOUND: '*',
  TESTIMONIALS: '/testimonials',
  METHODOLOGY: '/methodology',
  PRICING: '/pricing',
  COMMUNITY: '/community',
  MATCHUP: '/matchup',
  PLAYER: (id: string) => `/player/${id}`,
  TEAM: (id: string | number) => `/team/${id}`,

  PROFILE: {
    TRACKER: '/profile/tracker',
    PICK_OF_DAY: '/profile/pick-of-day',
  },

  AUTH: {
    LOGIN: '/login',
    SIGN_UP: '/sign-up',
    FORGOT_PASS: '/forgot-password',
    VERIFY_CODE: '/verification-code',
    RESET_PASS: '/reset-password',
    RESET_PASS_SUCCESS: '/reset-password/successfully',
  },
};
