import { getApi } from "~/common/utils";
import axiosInstance from "~/configs/axiosConfig";

export interface AccountCusData {
  key: React.Key;
  index: number;
  accountId: number;
  fullName: string;
  email: string;
  phone: number;
  roleName: string;
  roleId: number;
  status: boolean;
  startDate?: string;
  endDate?: string;
}

export interface AccountCusResponse {
  data: {
    accounts: AccountCusData[];
    totalCustomers: number;
    pageNumber: number;
    pageSize: number;
  };
}

export interface FormFields {
  name: string;
  description: string;
  pageNumber: number;
  pageSize: number;
  totalCustomers: number;
}

export const getListCustomers = async (
  params: FormFields
): Promise<AccountCusResponse> => {
  const result = await axiosInstance.get(
    getApi("api", "account/list/customers"),
    {
      params,
    }
  );
  return result;
};
