import { AxiosResponse } from "axios";
import { getApi } from "../common/utils";
import axiosInstance from "../configs/axiosConfig";

export interface TableData {
  tableId: number;
  tableName: string;
  statusName: string;
  statusId: number;
  bookingId: number | null;
  tableOfPeople: number | null;
}

export interface TableResponse {
  data: TableData[];
}

export interface TableRequest {
  table_Id?: number;
  table_Name?: string;
  tableOfPeople?: number;
  statusId?: number;
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
  return result.data;
};

export const getTableId = async (
  id: number
): Promise<AxiosResponse<TableData>> => {
  const result = await axiosInstance.get(getApi("api", `table/${id}`));
  return result;
};

export const updateTable = async (id: number, tableData: TableRequest) => {
  const result = await axiosInstance.put(
    getApi("api", `table/update/${id}`),
    tableData
  );
  return result.data;
};
