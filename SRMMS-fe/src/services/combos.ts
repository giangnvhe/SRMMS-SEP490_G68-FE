import axiosInstance, { axiosInstanceFormData } from "../configs/axiosConfig";
import { getApi } from "../common/utils";
import { RcFile } from "antd/es/upload";
import { AxiosResponse } from "axios";

export interface ComboData {
  key: React.Key;
  index: number;
  comboId: number;
  comboName: string;
  comboDescription: string;
  comboImg?: string;
  comboMoney: number;
  comboStatus: boolean;
  ProductNames: string[];
}

export interface ComboResponse {
  data: {
    totalCount: number;
    pageNumber: number;
    pageSize: number;
    combos: ComboData[];
  };
}

interface ComboDataResponse {
  success: boolean;
  message: string;
}

export interface FormFields {
  cbName: string;
  pagination: { pageNumber: number; pageSize: number };
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  minPrice: number;
  maxPrice: number;
}

export interface NewComboRequest {
  ComboName: string;
  ComboDescription: string;
  ComboMoney: number;
  ComboStatus: boolean;
  ComboImg?: RcFile | null;
  ProductNames: string[];
}

export const getLisComboProduct = async (
  params: FormFields
): Promise<ComboResponse> => {
  const result = await axiosInstance.get(getApi("api", "comboProduct/list"), {
    params,
  });
  return result;
};

export const deleteComboProduct = async (
  id: string
): Promise<ComboDataResponse> => {
  const result = await axiosInstance.delete<ComboDataResponse>(
    getApi("api", `comboProduct/${id}`)
  );
  return result.data;
};

export const addNewCombo = async (
  data: NewComboRequest
): Promise<AxiosResponse<ComboDataResponse>> => {
  const result = await axiosInstanceFormData.post(
    getApi("api", "comboProduct/create"),
    data
  );
  return result;
};

export const updateCombo = async (id: number, ComboData: NewComboRequest) => {
  const response = await axiosInstanceFormData.put(
    getApi("api", `comboProduct/update/${id}`),
    ComboData
  );
  return response.data;
};

interface dataProduct {
  key: React.Key;
  index: number;
  productId: number;
  productName: string;
  description: string;
  price: number;
  category: string;
  quantity: number;
  image: string;
  calories: string;
  status: boolean;
}

interface ProductResponse {
  data: {
    products: dataProduct[];
  };
}

export const getListProduct = async (): Promise<ProductResponse> => {
  const result = await axiosInstance.get(
    getApi("api", "product/product/list"),
    {}
  );
  return result;
};
