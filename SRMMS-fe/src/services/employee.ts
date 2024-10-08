import { AxiosResponse } from "axios";
import { getApi } from "../common/utils";
import axiosInstance from "../configs/axiosConfig";
import { FormFields } from "../pages/Admin/Employees";

export interface EmployeesData {
  key: React.Key;
  empId: number;
  index: number;
  empFirstName: string;
  empLastName: string;
  empDob: string;
  empPhoneNumber: number;
  empGender: string;
  empEmail: string;
  empAddress: string;
  empStartDate: string;
  empStatus: boolean;
  roleId: number;
  roleName: string;
  empFullName?: string;
  action: string;
}

export interface EmployeesResponse {
  data: EmployeesData[];
}

export interface NewEmployeeRequest {
  empFirstName: string;
  empLastName: string;
  empDob: string;
  empPhoneNumber: number;
  empPassword: string;
  empGender: string;
  empEmail: string;
  empAddress: string;
  empStartDate: string;
  empStatus: boolean;
}

interface NewEmployeeResponse {
  success: boolean;
  message: string;
  data: EmployeesResponse;
}

export const getListEmployees = async (
  params: FormFields
): Promise<EmployeesResponse> => {
  const result = await axiosInstance.get(getApi("api", "getAllEmployees"), {
    params,
  });

  return result;
};

export const addNewEmployee = async (
  data: NewEmployeeRequest
): Promise<AxiosResponse<NewEmployeeResponse>> => {
  const result = await axiosInstance.post(getApi("api", "addEmployee"), data);
  return result;
};

export const getEmployeeById = async (id: number): Promise<EmployeesData> => {
  const result: AxiosResponse<EmployeesData> = await axiosInstance.get(
    getApi("api", `getEmployee/${id}`)
  );
  return result.data; // Ensure you return the 'data' property
};

export const updateEmployee = async (
  id: number,
  payload: NewEmployeeRequest
): Promise<AxiosResponse<NewEmployeeResponse>> => {
  const result = await axiosInstance.put<
    NewEmployeeRequest,
    AxiosResponse<NewEmployeeResponse>
  >(getApi("api", `updateEmployee/${id}`), payload);
  return result;
};
