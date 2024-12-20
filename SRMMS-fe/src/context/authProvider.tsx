import { createContext, useContext, useMemo, useState } from "react";
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from "~/configs/accessToken";
import { getUserW, removeUserW, setUserW } from "../configs/user";
export type UserInformation = {
  id: number;
  phone: string;
  roleName: string;
  fullName: string;
};
type MyContextValue = {
  token: string | undefined;
  user: UserInformation | null;
  setToken: (token: string) => void | undefined;
  setUser: (user: UserInformation) => void | undefined;
  removeToken: () => void | undefined;
};
interface Props {
  children: React.ReactNode;
}
const AuthContext = createContext<MyContextValue>({
  token: "",
  user: null,
  setToken: () => {},
  setUser: () => {},
  removeToken: () => {},
});

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [token, setToken_] = useState<string | undefined>(getAccessToken());
  const [user, setUser_] = useState<UserInformation | null>(getUserW());
  const setToken = (newToken: string) => {
    setToken_(newToken);
    setAccessToken(newToken);
  };
  const removeToken = () => {
    setToken_(undefined);
    setUser_(null);
    removeAccessToken();
    removeUserW();
  };
  const setUser = (user: UserInformation) => {
    setUser_(user);
    setUserW(user);
  };

  const contextValue = useMemo(
    () => ({ token, user, setToken, setUser, removeToken }),
    [token, user]
  );
  // useEffect(() => {
  //   const token = getAccessToken()
  //   const fetchAPI = async () => {
  //     try {
  //       const response = await getUserToken()
  //       if (response.object)
  //         setUser({
  //           id: response.object.id,
  //           name: response.object.name,
  //           role: response.object.role,
  //           email: response.object.email,
  //           avatar: response.object.avatar,
  //           permissions: response.object.permissions
  //         })
  //     } catch (e) {
  //       removeToken()
  //       window.location.href = '/'
  //     }
  //   }
  //   if (token) fetchAPI()
  // }, [])
  return (
    <>
      <AuthContext.Provider value={contextValue}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
