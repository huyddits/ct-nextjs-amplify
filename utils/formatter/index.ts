export const DEFAULT_DATE_FORMAT = 'MM-DD-YYYY';

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
