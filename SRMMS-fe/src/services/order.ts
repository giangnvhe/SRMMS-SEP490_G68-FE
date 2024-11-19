import { AxiosResponse } from "axios";
import { getApi } from "../common/utils";
import axiosInstance from "../configs/axiosConfig";

interface AddToOrderRequest {
  tableId: number;
  orderDate: string;
  totalMoney: number;
  status?: boolean;
  codeId?: number;
  orderDetails: {
    proId: number;
    quantity: number;
    price: number;
  }[];
}

interface AddToOrderResponse {
  success: boolean;
  message: string;
}

export const AddToOrder = async (
  data: AddToOrderRequest
): Promise<AxiosResponse<AddToOrderResponse>> => {
  const result = await axiosInstance.post(
    getApi("api", "Order/AddOrder"),
    data
  );
  return result;
};
