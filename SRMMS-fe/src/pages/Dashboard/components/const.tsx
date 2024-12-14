import { OrderData, ResponseRevenue } from "~/services/order";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export interface ChartDataPoint {
  name: string;
  revenue: number;
  date: string;
}

export const formatDayOfWeek = (dateString: string): string => {
  const days = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
  const date = new Date(dateString);
  return days[date.getDay()];
};

export const groupOrdersByDayOfWeek = (
  orders: OrderData[]
): ChartDataPoint[] => {
  const groupedRevenue = orders.reduce((acc, order) => {
    const day = formatDayOfWeek(order.orderDate);
    if (!acc[day]) {
      acc[day] = { name: day, revenue: 0, date: order.orderDate };
    }
    acc[day].revenue += order.totalMoney;
    return acc;
  }, {} as Record<string, ChartDataPoint>);

  const dayOrder = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
  return dayOrder.map((day) => groupedRevenue[day]).filter(Boolean);
};

export const downloadRevenueAsExcel = (
  data: ChartDataPoint[],
  additionalData?: ResponseRevenue
) => {
  const workbook = XLSX.utils.book_new();

  // Daily Revenue Worksheet
  const worksheetData = data.map((item) => ({
    Ngày: item.name,
    "Doanh thu": item.revenue,
  }));
  const worksheet = XLSX.utils.json_to_sheet(worksheetData);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Doanh thu theo ngày");

  // Detailed Orders Worksheet
  if (additionalData && additionalData.orders.length > 0) {
    const ordersWorksheetData = additionalData.orders.map((order) => ({
      "Mã đơn hàng": order.orderId,
      "Ngày đặt": order.orderDate,
      "Tổng tiền": `${order.totalMoney} VNĐ`,
      "Trạng thái": getOrderStatusText(order.status),
      Bàn: order.tableName,
      "Sản phẩm": order.products
        .map((p) => `${p.proName} (SL: ${p.quantity})`)
        .join(", "),
      Combo: order.combos
        ? order.combos
            .map((c) => `${c.comboName} (SL: ${c.quantity})`)
            .join(", ")
        : "Không có",
      "Giảm giá":
        order.discountValue > 0 ? `${order.discountValue}%` : "Không có",
      "Điểm áp dụng": order.pointIds
        ? order.pointIds.map((p) => p.pointName).join(", ")
        : "Không có",
    }));
    const ordersWorksheet = XLSX.utils.json_to_sheet(ordersWorksheetData);
    XLSX.utils.book_append_sheet(
      workbook,
      ordersWorksheet,
      "Chi tiết đơn hàng"
    );
  }

  // Summary Worksheet
  if (additionalData) {
    const summaryData = [
      {
        "Tiêu đề": "Tổng doanh thu",
        "Giá trị": `${additionalData.totalRevenue} VNĐ`,
      },
      {
        "Tiêu đề": "Tổng số đơn hàng",
        "Giá trị": additionalData.orders.length,
      },
      {
        "Tiêu đề": "Đơn hàng theo trạng thái",
        "Giá trị": countOrderStatuses(additionalData.orders),
      },
      {
        "Tiêu đề": "Doanh thu trung bình/đơn",
        "Giá trị": (
          additionalData.totalRevenue / additionalData.orders.length
        ).toFixed(2),
      },
    ];
    const summaryWorksheet = XLSX.utils.json_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(workbook, summaryWorksheet, "Tổng quan");
  }

  // Write and save the file
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  const currentDate = new Date();
  const filename = `Doanh_thu_${currentDate.getFullYear()}_${
    currentDate.getMonth() + 1
  }_${currentDate.getDate()}.xlsx`;

  saveAs(blob, filename);
};

// Helper function to get order status text
const getOrderStatusText = (status: number): string => {
  switch (status) {
    case 0:
      return "Chờ xác nhận";
    case 1:
      return "Đã xác nhận";
    case 2:
      return "Đang chuẩn bị";
    case 3:
      return "Đang giao";
    case 4:
      return "Đã hoàn thành";
    case 5:
      return "Đã hủy";
    default:
      return "Không xác định";
  }
};

// Helper function to count order statuses
const countOrderStatuses = (orders: OrderData[]): string => {
  const statusCounts = orders.reduce((acc, order) => {
    const status = getOrderStatusText(order.status);
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(statusCounts)
    .map(([status, count]) => `${status}: ${count}`)
    .join(", ");
};
