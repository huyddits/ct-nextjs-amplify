export * from './options';
export * from './endpoints';
export * from './routes';
export * from './storage';
export * from './cache';

export const USER_TYPE = {
  ATHLETE: 'athlete',
  COACH: 'coach',
};

export const ERROR_MESSAGES = {
  INPUT: 'This field is required. Please enter a value to continue.',
  SELECT: 'This field is required. Please select an option to continue.',
  EMAIL: 'Please enter a valid email address (example: name@domain.com).',
  NAME: `Users are allowed to input any characters except the special characters specified in the following list: '@, #, !, *, $, %, ^, &, +'`,
  MAX_LENGTH: (max = 50) =>
    `Text exceeds maximum length of ${max} characters. Please shorten your entry.`,
};

export const DEFAULT_LIMIT = 10;

export const MAXIMUM_EXERCISES_PER_PROGRAM = 15;
export const MAXIMUM_SETS_PER_EXERCISE = 8;

export const MIN_DATE_OF_BIRTH = 13; // yo

export const TIME_UNIT = {
  SECONDS: 'Seconds',
  MINUTES: 'Minutes',
};

export const DEEP_LINK_ROOT = 'cheertrainer://app';
