export const TABLE_SIZE = {
  SMALL: "SMALL",
  MEDIUM: "MEDIUM",
  LARGE: "LARGE",
};

export const tableCategories = [
  { id: 0, displayName: "All", statusValue: "ALL" },
  { id: 1, displayName: "Đang sử dụng", statusValue: "Đang sử dụng" },
  { id: 2, displayName: "Đã đặt bàn", statusValue: "Đã đặt bàn" },
  { id: 3, displayName: "Trống", statusValue: "Trống" },
  { id: 4, displayName: "Đang sửa chữa", statusValue: "Đang sửa chữa" },
];

export const HEIGHT_CONTENT_CONTAINER = "calc(100vh - 64px - 200px)";

export const CONSTANT_TABLE = {
  TABLE: "Table",
  ORDER_CODE: "Order Code",
  START_ORDER: "Start Order",
  ALERT: "Cannot generate order code for occupied table",
  TABLE_VISIBLE: "Tables Visible",
};

export const NOTIFICATION_TABLE = {
  UNDER_REPAIR: "Bàn hiện đang sữa chữa. Hiện không thể sử dụng",
  BOOKED: "Bàn đã đặt, hiện không thể sử dụng",
  IN_USE: "Bàn đang sử dụng, hiện đang có khách ngồi",
};

export const TABLE_STATUS = {
  AVAILABLE: "Trống",
  IN_USE: "Đang sử dụng",
  UNDER_REPAIR: "Đang sửa chữa",
  BOOKED: "Đã đặt",
};

export const getStatusColor = (status: any) => {
  switch (status) {
    case TABLE_STATUS.AVAILABLE:
      return "green";
    case TABLE_STATUS.IN_USE:
      return "purple";
    case TABLE_STATUS.UNDER_REPAIR:
      return "red";
    case TABLE_STATUS.BOOKED:
      return "orange";
    default:
      return "gray";
  }
};
