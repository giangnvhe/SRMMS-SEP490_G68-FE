import axios from "axios";
import { getAccessToken, removeAccessToken } from "./accessToken";
import { NOT_FOUND, UNAUTHORIZED } from "~/common/const";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL ?? "",
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosInstanceFormData = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 100000,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// export const provinceInstance = axios.create({
//   baseURL: BASE_PROVINCE_URL,
//   timeout: 100000,
//   headers: {
//     'Content-Type': 'application/json'
//   }
// })
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
    //return Promise.reject(new Error("No access token"));
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    switch (error?.response) {
      case UNAUTHORIZED:
        removeAccessToken();
        window.location.href = "/";
        break;

      case NOT_FOUND:
        window.location.href = "/not-found";
        break;
    }

    return Promise.reject(error);
  }
);

axiosInstanceFormData.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers["Authorization"] = "Bearer " + accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstanceFormData.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default axiosInstance;
