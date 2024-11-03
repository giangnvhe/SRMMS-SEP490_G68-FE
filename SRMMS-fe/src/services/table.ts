import { AxiosResponse } from "axios";
import { getApi } from "../common/utils";
import axiosInstance from "../configs/axiosConfig";

export interface TableData {
  tableId: number;
  tableName: string;
  statusName: string;
  bookingId: number | null;
  tableOfPeople: number | null;
}

interface TableResponse {
  data: TableData[];
}

export interface RequestTable {
  table_Name: string;
  statusId: number;
  tableOfPeople: number;
}
interface ResponseTable {
  success: boolean;
  message: string;
  data: TableResponse;
}

export const getTables = async (): Promise<TableResponse> => {
  const result = await axiosInstance.get(getApi("api", "table/list"));
  return result;
};

export const CreateTable = async (
  data: RequestTable
): Promise<AxiosResponse<ResponseTable>> => {
  const result = await axiosInstance.post(getApi("api", "table/create"), data);
  return result;
};
