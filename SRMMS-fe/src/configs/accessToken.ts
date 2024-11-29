// import Cookies from "js-cookie";

// const ACCESS_TOKEN = "ACCESS_TOKEN";

// export const setAccessToken = (token: string) => Cookies.set(ACCESS_TOKEN, token);

// export const getAccessToken = () => Cookies.get(ACCESS_TOKEN);

// export const removeAccessToken = () => Cookies.remove(ACCESS_TOKEN);

// export const hasAccessToken = () => !!Cookies.get(ACCESS_TOKEN);

import Cookies from "js-cookie";
export const getAccessToken = () => {
  return Cookies.get("token");
};
export const setAccessToken = (token: string) => {
  Cookies.set("token", token);
};
export const removeAccessToken = () => {
  Cookies.remove("token");
};
export const hasAccessToken = () => {
  return !!Cookies.get("token");
};
