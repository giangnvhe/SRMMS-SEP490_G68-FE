import { AxiosResponse } from "axios";
import axiosInstance from "../configs/axiosConfig";

export interface requestVietQr {
  accountNo: string;
  accountName: string;
  acqId: string;
  addInfo: string;
  amount: string;
  template: string;
}

interface VietqrResponse {
  success: boolean;
  message: string;
}

export const PostVietQR = async (
  data: requestVietQr
): Promise<AxiosResponse<VietqrResponse>> => {
  const result = await axiosInstance.post(
    "https://api.vietqr.io/v2/generate",
    data,
    {
      headers: {
        "x-client-id": "8b447938-648c-4ca3-b2c7-3e816259b83a",
        "x-api-key": "7bb0ce83-99e8-49c7-a027-912afa21d906",
      },
    }
  );
  return result.data;
};
