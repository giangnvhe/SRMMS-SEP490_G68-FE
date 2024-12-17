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
  startDate?: string;
  endDate?: string;
  totalPoints: number;
}

export interface AccountResponse {
  data: {
    accounts: AccountData[];
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
  const result = await axiosInstance.get(
    getApi("api", "account/list/employees"),
    {
      params,
    }
  );
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

export interface VerificationOTP {
  phoneNumber: string;
}

export interface OtpResponse {
  success: boolean;
  message: string;
}
export const forgetPassword = async (params: VerificationOTP) => {
  const result = await axiosInstance.post<
    VerificationOTP,
    AxiosResponse<OtpResponse>
  >(getApi("api", "forgot-password"), params);

  return result;
};

export interface RequestResetPassword {
  phoneNumber: string;
  newPassword: string;
}

export const resetPassword = async (params: RequestResetPassword) => {
  const result = await axiosInstance.post<
    RequestResetPassword,
    AxiosResponse<OtpResponse>
  >(getApi("api", "reset-password"), params);
  return result;
};

export interface ChangePasswordRequest {
  phone: number;
  oldPassword: number;
  newPassword: number;
  confirmNewPassword: number;
}

export const ChangePassword = async (params: ChangePasswordRequest) => {
  const result = await axiosInstance.post<
    ChangePasswordRequest,
    AxiosResponse<OtpResponse>
  >(getApi("api", "change-password"), params);
  return result;
};

interface accountCount {
  employeeCount: number;
}

export const getCountAccount = async (): Promise<accountCount> => {
  const result = await axiosInstance.get(getApi("api", "account/total"), {});
  return result.data;
};
