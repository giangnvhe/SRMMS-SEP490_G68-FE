import { getApi } from "../common/utils";
import axiosInstance from "../configs/axiosConfig";

export interface OrderKitchenData {
  key: React.Key;
  index: number;
  orderId: number;
  orderDate: string;
  totalMoney: number;
  status: number;
  tableId: number;
  tableName: string;
  products: [
    {
      productId: number;
      proName: string;
      quantity: number;
      price: number;
    }
  ];
  combos?: [
    {
      comboId: number;
      comboName: string;
      quantity: number;
      price: number;
    }
  ];
}

export interface OrderDataKitchenResponse {
  data: {
    orders: OrderKitchenData[];
    pageNumber: number;
    pageSize: number;
    totalOrders: number;
  };
}

export interface FormFields {
  tableName: string;
  pageNumber: number;
  pageSize: number;
  totalOrders: number;
}

export const getListOrderKitchen = async (
  params: FormFields
): Promise<OrderDataKitchenResponse> => {
  const result = await axiosInstance.get(
    getApi("api", "Order/listStatus2and3"),
    {
      params,
    }
  );
  return result;
};
