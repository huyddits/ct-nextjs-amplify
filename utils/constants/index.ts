export * from './options';
export * from './endpoints';
export * from './routes';
export * from './storage';

export const USER_TYPE = {
  ATHLETE: 'athlete',
  COACH: 'coach',
};

export const ERROR_MESSAGES = {
  INPUT: 'This field is required. Please enter a value to continue.',
  SELECT: 'This field is required. Please select an option to continue.',
  EMAIL: 'Please enter a valid email address (example: name@domain.com).',
  NAME: `Users are allowed to input any characters except the special characters specified in the following list: '@, #, !, *, $, %, ^, &, +'`,
};

export const DEFAULT_LIMIT = 10;
