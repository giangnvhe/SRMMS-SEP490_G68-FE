import { hasAccessToken } from "../../configs/accessToken";

export const checkAuthentication = () => {
  if (!hasAccessToken()) {
    window.location.href = "/";
  }
};

export const checkLogin = () => {
  if (hasAccessToken()) {
    window.location.href = "/";
  }
};
