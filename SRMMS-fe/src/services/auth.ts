import { AxiosResponse } from "axios";
import axiosInstance from "../configs/axiosConfig";
import { getApi } from "../common/utils";
interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  roleName: string;
  email: string;
  fullName: string;
  token: string;
}

export const login = async (params: LoginRequest) => {
  const result = await axiosInstance.post<
    LoginRequest,
    AxiosResponse<LoginResponse>
  >(getApi("api", "login"), params);

  return result;
};
