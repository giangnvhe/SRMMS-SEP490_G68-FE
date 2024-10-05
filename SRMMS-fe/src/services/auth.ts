import { AxiosResponse } from "axios";
import axiosInstance from "../configs/axiosConfig";
import { getApi } from "../common/utils";
interface LoginRequest {
  empEmail: string;
  empPassword: string;
}

interface LoginResponse {
  empEmail: string;
  empPassword: string;
  token: string;
}

export const login = async (params: LoginRequest) => {
  const result = await axiosInstance.post<
    LoginRequest,
    AxiosResponse<LoginResponse>
  >(getApi("api", "login"), params);

  return result;
};
