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
  image: string;
  calories: string;
  cookingTime: number;
  status: boolean;
}

export interface NewProductRequest {
  ProductName: string;
  Description: string;
  Price: number;
  Category: number;
  Image: RcFile | null;
  Calories: string;
  CookingTime: number;
  Status: boolean;
}

interface ProductResponse {
  data: ProductData[];
}

export interface FormFields {
  name: string;
  categoryId: number;
  pagination: { pageNumber: number; pageSize: number };
  pageNumber: number;
  pageSize: number;
  totalProducts: number;
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
