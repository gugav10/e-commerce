export const formatPrice = (cents: number) => {
  return (Math.ceil(cents) / 100).toFixed(2);
};
