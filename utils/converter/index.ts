export const safeParseInt = (value: string) => {
  const parsed = parseInt(value);
  return isNaN(parsed) ? 0 : parsed;
};
