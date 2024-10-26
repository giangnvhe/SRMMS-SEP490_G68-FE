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
  action: string;
}

export interface AccountResponse {
  data: AccountData[];
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
  empFirstName: string;
  empLastName: string;
  empDob: string;
  empPhoneNumber: number;
  empEmail: string;
  empPassword: string;
  empStartDate: string;
  roleId: number;
  empStatus: boolean;
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
    getApi("api", `employee/getEmployee/${id}`)
  );

  return result;
};

export const updateEmployee = async (
  id: number,
  employeeData: UpdateEmployeeRequest
) => {
  const response = await axiosInstance.put(
    getApi("api", `employee/update/${id}`),
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
