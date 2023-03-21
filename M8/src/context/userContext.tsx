import { createContext, ReactNode } from "react";
import { useUserData } from "../hooks/useUserData";

interface IUserDataContext {
  username?: string;
  avatarSrc?: string;
}

export const userDataContext = createContext<IUserDataContext>({});
export const UserDataContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [userData] = useUserData();

  return (
    <userDataContext.Provider value={userData}>
      {children}
    </userDataContext.Provider>
  );
};
