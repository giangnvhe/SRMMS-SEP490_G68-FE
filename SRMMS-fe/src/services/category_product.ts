import { AxiosResponse } from "axios";
import { getApi } from "~/common/utils";
import axiosInstance from "~/configs/axiosConfig";

export interface CategoryData {
  key: React.Key;
  index: number;
  catId: number;
  catName: string;
  description: string;
}

export interface NewCategoryRequest {
  catName: string;
  description: string;
}

interface NewCategoryResponse {
  success: boolean;
  message: string;
  data: CategoryResponse;
}

export interface CategoryResponse {
  data: CategoryData[];
}

export interface FormFields {
  pagination: { pageNumber: number; pageSize: number };
  pageNumber: number;
  pageSize: number;
}

interface DeleteCategoryResponse {
  success: boolean;
  message: string;
}

export const getListCategory = async (
  params: FormFields
): Promise<CategoryResponse> => {
  const result = await axiosInstance.get(getApi("api", "category/list"), {
    params,
  });
  return result;
};

export const addNewCategory = async (
  data: NewCategoryRequest
): Promise<AxiosResponse<NewCategoryResponse>> => {
  const result = await axiosInstance.post(
    getApi("api", "category/create"),
    data
  );
  return result;
};

export const getCategoryById = async (
  id: number
): Promise<AxiosResponse<CategoryData>> => {
  const result = await axiosInstance.get(
    getApi("api", `category/getCategoryById/${id}`)
  );
  return result;
};

export const updateCategory = async (
  id: number,
  employeeData: NewCategoryRequest
) => {
  const response = await axiosInstance.put(
    getApi("api", `category/update/${id}`),
    employeeData
  );
  return response.data;
};

export const deleteCategory = async (
  id: string
): Promise<DeleteCategoryResponse> => {
  const result = await axiosInstance.delete<DeleteCategoryResponse>(
    getApi("api", `category/delete/${id}`)
  );
  return result.data;
};
