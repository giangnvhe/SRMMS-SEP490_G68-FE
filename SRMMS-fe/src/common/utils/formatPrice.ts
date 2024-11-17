export const formatPrice = (number: number) => {
  if (!number) return 0;
  return (number + "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formatVND = (value?: number) => {
  if (value === undefined) return "0 VNĐ";
  const formattedValue = new Intl.NumberFormat("vi-VN").format(value);
  return `${formattedValue} VNĐ`;
};
