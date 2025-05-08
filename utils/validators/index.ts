export const isContainNumber = (value: string) => {
  return /[0-9]/.test(value);
};

export const isContainUppercase = (value: string) => {
  return /[A-Z]/.test(value);
};

export const isContainLowercase = (value: string) => {
  return /[a-z]/.test(value);
};

export const isContainSpecialChar = (value: string) => {
  return /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(value);
};
