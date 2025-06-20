import { differenceInYears } from 'date-fns';
import { MIN_DATE_OF_BIRTH } from '../constants';

export const PATTERN = {
  NAME: /^[\p{L}\p{M} '-]+$/u,
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  NUMBER: /\d/,
  UPPERCASE: /[A-Z]/,
  LOWERCASE: /[a-z]/,
  SPECIAL_CHAR: /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/,
};

export const isContainNumber = (value: string) => {
  return PATTERN.NUMBER.test(value);
};

export const isContainUppercase = (value: string) => {
  return PATTERN.UPPERCASE.test(value);
};

export const isContainLowercase = (value: string) => {
  return PATTERN.LOWERCASE.test(value);
};

export const isContainSpecialChar = (value: string) => {
  return PATTERN.SPECIAL_CHAR.test(value);
};

export const isEmail = (value: string) => {
  return PATTERN.EMAIL.test(value);
};

export const isName = (value: string) => {
  return PATTERN.NAME.test(value);
};

export const isEnoughYearOld = (value: string) => {
  if (!value) return false;
  const age = differenceInYears(new Date(), value);
  return age >= MIN_DATE_OF_BIRTH;
};
