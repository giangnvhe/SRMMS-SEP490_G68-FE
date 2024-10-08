import { AxiosResponse } from "axios";
import axiosInstance from "../configs/axiosConfig";
import { getApi } from "../common/utils";

export interface RolesData {
  roleId: number;
  roleName: string;
}

export const getRoles = async (): Promise<AxiosResponse<RolesData[] | []>> => {
  const result = await axiosInstance.get(getApi("api", "list-roles"));

  return result;
};
