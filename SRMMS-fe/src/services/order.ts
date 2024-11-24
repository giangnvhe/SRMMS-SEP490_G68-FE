import { AxiosResponse } from "axios";
import { getApi } from "../common/utils";
import axiosInstance from "../configs/axiosConfig";
import { FormFields } from "~/pages/Admin/OrderMana/components/conts";

export interface OrderData {
  key: React.Key;
  index: number;
  orderId: number;
  orderDate: string;
  totalMoney: number;
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
  customers?: [
    {
      customerId: number;
      customerName: string;
      customerAddress: string;
      customerPhone: string;
    }
  ];
  discountId?: number;
  discountValue: number;
  pointIds?: [
    {
      pointId: number;
      pointName: string;
      pointValue: number;
    }
  ];
}

interface OrderDataResponse {
  data: {
    orders: OrderData[];
    pageNumber: number;
    pageSize: number;
    totalOrders: number;
  };
}

interface AddToOrderRequest {
  tableId: number;
  orderDate: string;
  totalMoney: number;
  status?: boolean;
  codeId?: number;
  productDetails?: {
    proId: number;
    quantity: number;
    price: number;
  }[];
  comboDetails?: {
    comboId?: number;
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

export const getListOrder = async (
  params: FormFields
): Promise<OrderDataResponse> => {
  const result = await axiosInstance.get(getApi("api", "Order/list"), {
    params,
  });
  return result;
};

export const getOrderById = async (
  id: number
): Promise<AxiosResponse<OrderData>> => {
  const result = await axiosInstance.get(getApi("api", `Order/order/${id}`));
  return result;
};
