import { KeyboardEvent } from 'react';

// export const DEFAULT_DATE_FORMAT = 'MM-DD-YYYY';
export const DEFAULT_DATE_FORMAT = 'MM-dd-yyyy';

export const capitalize = (str: string) => {
  return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase());
};

export const formatCurrency = (
  amount: number,
  currency: string,
  locale: string = 'en-US'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amount);
};

export const generateRandomChar = () => {
  // generate random query string from a to z or A to Z
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const randomIndex = Math.floor(Math.random() * characters.length);
  return characters[randomIndex];
};

/**
 * Checks if the pressed key is a number (0-9)
 * Prevents default action for non-number keys
 * @param evt Keyboard event
 * @returns boolean indicating whether the key is a number
 */
export const isNumber = (e: KeyboardEvent, allowDecimal = false): boolean => {
  console.log(e.key);
  const allowed = [
    'Backspace',
    'Delete',
    'ArrowLeft',
    'ArrowRight',
    'Tab',
    'ArrowUp',
    'ArrowDown',
    'Escape',
    'Enter',
  ].concat(allowDecimal ? ['.'] : []);
  if ((e.key >= '0' && e.key <= '9') || allowed.includes(e.key)) {
    return true;
  }
  e.preventDefault();
  return false;
};
