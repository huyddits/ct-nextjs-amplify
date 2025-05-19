export const isContainNumber = (value: string) => {
  return /\d/.test(value);
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

export const isEmail = (value: string) => {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
};
