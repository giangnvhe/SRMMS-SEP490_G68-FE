import { AxiosResponse } from "axios";
import axiosInstance from "../configs/axiosConfig";
import { getApi } from "../common/utils";

export interface RolesData {
  key: React.Key;
  roleId: number;
  index: number;
  roleName: String;
  description: String;
}

interface RolesResponse {
  data: RolesData[];
}
interface convertRoleResponse {
  value: String;
  label: String;
}

interface getRoleData {
  roleId: number;
  roleName: String;
}

export const getRoles = async (): Promise<convertRoleResponse[]> => {
  const result = await axiosInstance.get<unknown, AxiosResponse<RolesResponse>>(
    getApi("api", "list-roles")
  );
  const convertRole = result?.data?.data?.map((role: getRoleData) => ({
    value: role.roleId + "",
    label: role.roleName,
  }));
  return convertRole;
};
