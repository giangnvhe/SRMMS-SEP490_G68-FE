import { AxiosResponse } from "axios";
import { getApi } from "../common/utils";
import axiosInstance from "../configs/axiosConfig";

export interface TableOrderData {
  key: React.Key;
  index: number;
  orderId: number;
  orderDate: string;
  totalMoney: string;
  status: boolean;
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

export interface TableOrderResponse {
  data: TableOrderData[];
}

export const getOrderTable = async (
  id: number
): Promise<AxiosResponse<TableOrderResponse>> => {
  const result = await axiosInstance.get(
    getApi("api", `Order/listOrderByTable/${id}`)
  );
  return result;
};