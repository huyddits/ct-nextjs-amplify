export const ROUTES = {
  WELCOME: 'welcome',
  HOME: 'home',
  SIGNUP: 'signup',
  LOGIN: 'login',
  PROFILE: 'profile',
  PRIVACY: 'privacy',
  TERMS_AND_CONDITIONS: 'term-and-conditions',
  ABOUT_US: 'about-us',
  TRAINING: 'training',
  TRAINING_STRENGTH: 'training/strength',
  TRAINING_CARDIO: 'training/cardio',
  TRAINING_TEAM_TRAINING_LOG: 'training/team-training-log',
  MEASUREMENT: 'measurement',
  MEASUREMENT_NEW: 'measurement/new',
  MEASUREMENT_TEAM_DATA: 'measurement/team-data',
};

export const WHITE_LIST = [`${ROUTES.TERMS_AND_CONDITIONS}`, `/${ROUTES.ABOUT_US}`];
