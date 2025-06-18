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
