export const formatPrice = (number: number) => {
  if (!number) return 0;
  return (number + "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formatVND = (value?: number) => {
  if (value === undefined) return "0 ₫"; 
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
};
