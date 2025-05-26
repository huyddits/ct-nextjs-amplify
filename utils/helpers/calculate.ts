export const calculateSavePercentFromPrice = (basePrice: number, actualPrice: number) => {
  return Math.round(((basePrice - actualPrice) / basePrice) * 100);
};
