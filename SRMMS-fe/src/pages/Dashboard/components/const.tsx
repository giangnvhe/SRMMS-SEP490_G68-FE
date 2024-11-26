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

  const worksheetData = data.map((item) => ({
    Ngày: item.name,
    "Doanh thu": item.revenue,
  }));

  const worksheet = XLSX.utils.json_to_sheet(worksheetData);

  if (additionalData) {
    const summaryData = [
      { "Tiêu đề": "Tổng doanh thu", "Giá trị": additionalData.totalRevenue },
      {
        "Tiêu đề": "Tổng số đơn hàng",
        "Giá trị": additionalData.orders.length,
      },
    ];
    const summaryWorksheet = XLSX.utils.json_to_sheet(summaryData);

    XLSX.utils.book_append_sheet(workbook, worksheet, "Doanh thu theo ngày");
    XLSX.utils.book_append_sheet(workbook, summaryWorksheet, "Tổng quan");
  } else {
    XLSX.utils.book_append_sheet(workbook, worksheet, "Doanh thu theo ngày");
  }

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
