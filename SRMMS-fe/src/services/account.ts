import { AxiosResponse } from "axios";
import { getApi } from "../common/utils";
import axiosInstance from "../configs/axiosConfig";
import { FormFields } from "~/pages/Admin/Employees/TableAccount";

export interface AccountData {
  key: React.Key;
  accountId: number;
  index: number;
  fullName: string;
  email: string;
  phone: number;
  roleName: string;
  roleId: number;
  status: boolean;
  empDob?: string;
  empStartDate?: string;
  action: string;
}

export interface AccountResponse {
  data: {
    accounts: AccountData[];
    totalCustomers: number;
    totalEmployees: number;
    pageNumber: number;
    pageSize: number;
  };
}

export interface updateEmployeeResponse {
  data: AccountData[];
}

export interface NewEmployeeRequest {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  roleId: number;
}

export interface UpdateEmployeeRequest {
  fullName: string;
  email: string;
  phone: number;
  roleId: number;
  empDob?: string;
  empStartDate?: string;
  status: boolean;
}

interface NewEmployeeResponse {
  success: boolean;
  message: string;
  data: AccountResponse;
}

interface DeleteAccountResponse {
  success: boolean;
  message: string;
}

export const getListAccount = async (
  params: FormFields
): Promise<AccountResponse> => {
  const result = await axiosInstance.get(getApi("api", "account/list"), {
    params,
  });
  return result;
};

export const addNewEmployee = async (
  data: NewEmployeeRequest
): Promise<AxiosResponse<NewEmployeeResponse>> => {
  const result = await axiosInstance.post(
    getApi("api", "account/create"),
    data
  );
  return result;
};

export const getEmployeeById = async (
  id: number
): Promise<AxiosResponse<AccountData>> => {
  const result = await axiosInstance.get(
    getApi("api", `account/getByID/${id}`)
  );

  return result;
};

export const updateEmployee = async (
  id: number,
  employeeData: UpdateEmployeeRequest
) => {
  const response = await axiosInstance.put(
    getApi("api", `account/update/${id}`),
    employeeData
  );
  return response.data;
};

export const deleteAccount = async (
  id: string
): Promise<DeleteAccountResponse> => {
  const result = await axiosInstance.delete<DeleteAccountResponse>(
    getApi("api", `account/delete/${id}`)
  );
  return result.data;
};
