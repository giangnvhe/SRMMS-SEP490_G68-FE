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
  roleName: string;
  empFullName?: string;
  action: string;
}

export interface EmployeesResponse {
  data: EmployeesData[];
}

export const getListEmployees = async (
  params: FormFields
): Promise<EmployeesResponse> => {
  const result = await axiosInstance.get(getApi("api", "getAllEmployees"), {
    params,
  });

  return result;
};
