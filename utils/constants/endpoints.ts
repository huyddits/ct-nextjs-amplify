export const END_POINTS = {
  EQUIPMENTS: 'equipments',
  CHEER_STYLES: 'cheer-styles',
  CHEER_TYPES: 'cheer-types',
  ROLES: 'roles',
  USERS: 'users',
  USERS_ME: 'users/me',

  USERS_FORGOT_PASSWORD: 'users/forgot-password',
  USERS_RESET_PASSWORD: 'users/reset-password',
  SIGNUP: 'users/signup',
  AUTH_LOGIN: 'auth/login',
  AUTH_LOGIN_SOCIAL: 'auth/social-login',
  AUTH_LOGIN_TWITTER: 'auth/twitter/login',
  EXERCISES: 'cardio/exercises',
  CARDIO_CREATE: 'cardio/session',
  RPE: 'cardio/rpes',

  // billing and subscription
  SUBSCRIPTION_PLANS: 'plans',
  SUBSCRIPTION_CANCEL: 'stripe/cancel-subscription',
  SUBSCRIPTION_CREATE_SESSION: 'stripe/create-subscription-session',
  SUBSCRIPTION_CHANGE_PREVIEW: 'stripe/preview-plan-change',
  SUBSCRIPTION_CHANGE: 'stripe/change-plan',
  BILLING_HISTORY: 'users/billing-history', // need recheck
  BILLING_ADD_PROMOTION_CODE: 'billing/promotion/add', // need recheck
};
