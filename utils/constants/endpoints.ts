export const END_POINTS = {
  EQUIPMENTS: 'equipments',
  CHEER_STYLES: 'cheer-styles',
  CHEER_TYPES: 'cheer-types',
  MEASUREMENT_UNITS: 'measurement/measurement-unit',
  ROLES: 'roles',
  USERS: 'users',
  USERS_ME: 'users/me',
  USERS_PROFILE: 'users/profile',
  USERS_ACKNOWLEDGE: 'users/acknowledge',

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
  SUBSCRIPTION_SUBSCRIBE_PLAN: 'stripe/create-subscription-session',
  SUBSCRIPTION_CHANGE: 'stripe/change-plan',
  BILLING_HISTORY: 'users/billing-history',
  VALIDATE_PROMOTION_CODE: 'stripe/validate-promotion-code',
  WEEKLY_SUMMARY: 'cardio/past-training/weekly-summary',
  WEEKLY_WORKOUTS: 'cardio/past-training/weekly-workouts',
  PERFORMANCE_METRICS: 'cardio/past-training/performance-metrics',

  STRENGTH_PROGRAMS: 'strength/program',
  STRENGTH_PROGRAMS_ALL: 'strength/program/all',
  STRENGTH_PROGRAMS_START: 'strength/program/start',
  STRENGTH_PROGRAMS_TRAINING_TYPES: 'strength/program/training-types',
  STRENGTH_PROGRAMS_COPY: 'strength/program/copy',
  STRENGTH_PAST_TRAINING_DATA: 'strength/program/past-training-data',
  STRENGTH_COMPLETE_WORKOUT: 'strength/complete-workout',
  STRENGTH_PAST_WORKOUTS: 'strength/program-exercise/{id}/past-training-data',
  STRENGTH_SKILLS: 'stunt',
  PROBLEMS: 'problem',
  EXERCISES_FILTER: 'strength/exercise/filter',
  TEAM_TRAINING_DATA: 'users/team-training-data',

  //Measurements
  MEASUREMENTS: 'measurement/measurement-list',
  ATHLETE_MEASUREMENTS: 'measurement/coach-student/get-all-student-by-coach-code',
  CREATE_MEASUREMENTS: 'measurement/measurement-session',
  BASES_SPOTTER: 'measurement/bases',
  FLYER: 'measurement/flyers',
  LATEST_RESULT: 'measurement/athlete-latest-result',
  IMPROVEMENT: 'measurement/athlete-improved-result',
  LAST_THREE_MONTHS: 'measurement/athlete-last-3-months',
  THREE_LATEST_RESULTS: 'measurement/athlete-three-latest-results',
  RESULT_FOR_ALL_MEASUREMENTS: 'measurement/athlete-latest-result-for-all-measurements',

  // Hit Miss
  HIT_MISS_ROUTINES: 'hitmiss/routine',
  SUMMARY_SECTION: 'hitmiss/session/summary-section',
  SUMMARY_GROUP: 'hitmiss/session/summary-group',
  HIT_MISS_SESSION: 'hitmiss/session/current',
  HIT_MISS_EVENT: 'hitmiss/session/:session_id/event',
  HIT_MISS_DELETE_EVENT:
    'hitmiss/session/:session_id/section/:section_id/group/:group_id/event/last',
  HIT_MISS_COMPLETE: 'hitmiss/session/:session_id/complete',

  // Check Off
  CHECK_OFF_TEAM_DATA: 'check-off/team-data',
  CHECK_OFF_STUDENT: 'check-off/student-checkoff',
  CHECK_OFF_NEW: 'check-off/new-checkoff',

  // Notification
  NOTIFICATION_SUBSCRIBE_WEB: 'notification/subscribe-web',

  // Dashboard
  DASHBOARD: 'dashboard',
};
