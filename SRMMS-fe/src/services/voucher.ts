import { FormFields } from "~/pages/Admin/Voucher";
import { getApi } from "../common/utils";
import axiosInstance from "../configs/axiosConfig";
import { AxiosResponse } from "axios";

export interface DiscountData {
  key: React.Key;
  index: number;
  codeId: number;
  codeDetail: string;
  discountValue: number;
  startDate: string;
  endDate: string;
  status: boolean;
}
export interface DiscountResponse {
  data: {
    discountCodes: DiscountData[];
    pageNumber: number;
    pageSize: number;
    totalDiscountCode: number;
  };
}

export const getDiscount = async (
  params: FormFields
): Promise<DiscountResponse> => {
  const result = await axiosInstance.get(getApi("api", "DiscountCodes/list"), {
    params,
  });
  return result;
};

export interface VoucherRequest {
  codeDetail: string;
  discountValue: number;
  startDate: string;
  endDate: string;
  status: boolean;
}

interface VoucherResponse {
  success: boolean;
  message: string;
  data: DiscountResponse;
}

export const addVoucher = async (
  data: VoucherRequest
): Promise<AxiosResponse<VoucherResponse>> => {
  const result = await axiosInstance.post(
    getApi("api", "DiscountCodes/createDiscountCode"),
    data
  );
  return result;
};

export const updateVoucher = async (
  id: number,
  employeeData: VoucherRequest
) => {
  const response = await axiosInstance.put(
    getApi("api", `DiscountCodes/update/${id}`),
    employeeData
  );
  return response.data;
};
