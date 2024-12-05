import { AxiosResponse } from "axios";
import { getApi } from "../common/utils";
import axiosInstance from "../configs/axiosConfig";

export interface PointRequest {
  moneyToPointRate: number;
  pointToMoneyRate: number;
}

interface PointResponse {
  success: boolean;
  message: string;
}

export const SettingPoints = async (
  data: PointRequest
): Promise<AxiosResponse<PointResponse>> => {
  const result = await axiosInstance.post(
    getApi("api", "Point/SettingPoint"),
    data
  );

  return result;
};

export interface DataPoint {
  moneyToPointRate: number;
  pointToMoneyRate: number;
}

export interface DataPointResponse {
  data: DataPoint[];
}

export const getPoint = async (): Promise<DataPointResponse> => {
  const result = await axiosInstance.get(getApi("api", "Point/GetConversionPoint"));
  return result;
};

