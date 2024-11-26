import { RcFile } from "antd/es/upload";
import { AxiosResponse } from "axios";
import { getApi } from "~/common/utils";
import axiosInstance, { axiosInstanceFormData } from "~/configs/axiosConfig";

export interface ProductData {
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

export interface ComboData {
  key: React.Key;
  index: number;
  comboId?: number;
  comboMoney: number;
  quantity: number;
}

export interface NewProductRequest {
  ProductName: string;
  Description: string;
  Price: number;
  Category: number;
  Image: RcFile | null;
  Calories: string;
  Status: boolean;
}

interface ProductResponse {
  data: {
    products: ProductData[];
    pageNumber: number;
    pageSize: number;
    totalProducts: number;
  };
}

export interface FormFields {
  name: string;
  categoryId: number | undefined;
  pageNumber: number;
  pageSize: number;
  totalProducts: number;
  minPrice: number;
  maxPrice: number;
}

interface NewProductResponse {
  success: boolean;
  message: string;
  data: ProductResponse;
}

interface DeleteProductResponse {
  success: boolean;
  message: string;
}

export const getListProduct = async (
  params: FormFields
): Promise<ProductResponse> => {
  const result = await axiosInstance.get(getApi("api", "product/list"), {
    params,
  });
  return result;
};

export const addNewProduct = async (
  data: NewProductRequest
): Promise<AxiosResponse<NewProductResponse>> => {
  const result = await axiosInstanceFormData.post(
    getApi("api", "product/create"),
    data
  );
  return result;
};

export const getProductById = async (
  id: number
): Promise<AxiosResponse<ProductData>> => {
  const result = await axiosInstance.get(
    getApi("api", `product/getProductById/${id}`)
  );
  return result;
};

export const updateProduct = async (
  id: number,
  employeeData: NewProductRequest
) => {
  const response = await axiosInstance.put(
    getApi("api", `product/update/${id}`),
    employeeData
  );
  return response.data;
};

export interface CategoryDataProduct {
  catId: number;
  catName: string;
}

export const getCategorySelect = async (): Promise<
  AxiosResponse<CategoryDataProduct[] | []>
> => {
  const result = await axiosInstance.get(getApi("api", "category/list"));

  return result;
};

export const deleteProduct = async (
  id: string
): Promise<DeleteProductResponse> => {
  const result = await axiosInstance.delete<DeleteProductResponse>(
    getApi("api", `product/delete/${id}`)
  );
  return result.data;
};

export const getListProducts = async (
  params: FormFields
): Promise<ProductResponse> => {
  const { data } = await axiosInstance.get(getApi("api", "product/list"), {
    params,
  });
  return data;
};

interface productCount {
  totalCount: number;
}

export const getCountProduct = async (): Promise<productCount> => {
  const result = await axiosInstance.get(getApi("api", "product/count"), {});
  return result.data;
};
