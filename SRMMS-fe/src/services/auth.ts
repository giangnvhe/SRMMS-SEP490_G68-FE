import { AxiosResponse } from "axios";
import axiosInstance from "../configs/axiosConfig";
import { getApi } from "../common/utils";
interface LoginRequest {
  phone: string;
  password: string;
}

interface LoginResponse {
  id: number;
  roleName: string;
  phone: string;
  fullName: string;
  token: string;
}

interface RegisterRequest {
  email: string;
  password: string;
  phoneNumber: string;
  fullName: string;
}

interface RegisterResponse {
  success: boolean;
  message: string;
}

interface VerificationOTP {
  phoneNumber: string;
  verificationCode: string;
}

interface ResendOTP {
  phoneNumber: string;
}

export const login = async (params: LoginRequest) => {
  const result = await axiosInstance.post<
    LoginRequest,
    AxiosResponse<LoginResponse>
  >(getApi("api", "login"), params);

  return result;
};

export const register = async (params: RegisterRequest) => {
  const result = await axiosInstance.post<
    RegisterRequest,
    AxiosResponse<RegisterResponse>
  >(getApi("api", "register"), params);

  return result;
};

export const verifyOtp = async (params: VerificationOTP) => {
  const result = await axiosInstance.post<
    VerificationOTP,
    AxiosResponse<RegisterResponse>
  >(getApi("api", "verify-otp"), params);

  return result;
};

export const resendOtp = async (params: ResendOTP) => {
  const result = await axiosInstance.post<
    ResendOTP,
    AxiosResponse<RegisterResponse>
  >(getApi("api", "resend-otp"), params);

  return result;
};
