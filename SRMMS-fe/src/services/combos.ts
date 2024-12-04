import axiosInstance, { axiosInstanceFormData } from "../configs/axiosConfig";
import { getApi } from "../common/utils";
import { RcFile } from "antd/es/upload";
import { AxiosResponse } from "axios";

export interface CombosData {
  key: React.Key;
  index: number;
  comboId: number;
  comboName: string;
  comboDescription: string;
  comboImg?: string;
  comboMoney: number;
  comboStatus: boolean;
  ProductNames: string[];
  quantity: number;
}

export interface ComboResponse {
  data: {
    totalCount: number;
    pageNumber: number;
    pageSize: number;
    combos: CombosData[];
  };
}

interface ComboDataResponse {
  success: boolean;
  message: string;
}

export interface FormFields {
  cbName: string;
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
  ComboImg?: RcFile | string | null | undefined;
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

export const changeComboStatus = async (id: number): Promise<AxiosResponse> => {
  const response = await axiosInstance.patch(
    getApi("api", `comboProduct/changeStatus/${id}`)
  );
  return response.data;
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
  data: dataProduct[];
}

export const getListProduct = async (): Promise<ProductResponse> => {
  const result = await axiosInstance.get(getApi("api", "product/list-combo"));
  return result;
};

interface comboCount {
  totalCount: number;
}

export const getComboProduct = async (): Promise<comboCount> => {
  const result = await axiosInstance.get(getApi("api", "comboProduct/count"));
  return result.data;
};
