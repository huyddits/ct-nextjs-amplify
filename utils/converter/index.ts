export const safeParseInt = (value: string) => {
  const parsed = parseInt(value);
  return isNaN(parsed) ? 0 : parsed;
};

export const transformToOption = (
  source: { [key: string]: any },
  keyLabel: string,
  keyValue: string
) => {
  return {
    label: source[keyLabel],
    value: source[keyValue],
  };
};
