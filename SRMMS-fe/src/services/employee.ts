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
  empPassword: string;
  empPhoneNumber: number;
  empGender: string;
  empEmail: string;
  empAddress: string;
  empStartDate: string;
  empStatus: boolean;
  roleId: number;
  empRole: {
    roleName: string;
  };
  empFullName?: string;
  action: string;
}

export interface EmployeesResponse {
  data: EmployeesData[];
}

export interface updateEmployeeResponse {
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
  data: EmployeesResponse;
}

export const getListEmployees = async (
  params: FormFields
): Promise<EmployeesResponse> => {
  const result = await axiosInstance.get(getApi("api", "getAllEmployees"), {
    params,
  });

  console.log(result);

  return result;
};

export const addNewEmployee = async (
  data: NewEmployeeRequest
): Promise<AxiosResponse<NewEmployeeResponse>> => {
  const result = await axiosInstance.post(getApi("api", "addEmployee"), data);
  return result;
};

export const getEmployeeById = async (
  id: number
): Promise<AxiosResponse<EmployeesData>> => {
  const result = await axiosInstance.get(
    getApi("api", `getEmployeeByID/${id}`)
  );

  return result;
};

export const updateEmployee = async (
  id: number,
  employeeData: UpdateEmployeeRequest
) => {
  const response = await axiosInstance.put(
    getApi("api", `updateEmployee/${id}`),
    employeeData
  );
  return response.data; // Ensure this returns the expected response
};
