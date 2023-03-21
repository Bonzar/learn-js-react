import { createContext, ReactNode } from "react";
import { useToken } from "../hooks/useToken";

export const tokenContext = createContext("");

export const TokenContextProvider = ({ children }: { children: ReactNode }) => {
  const [token] = useToken();

  return (
    <tokenContext.Provider value={token}>{children}</tokenContext.Provider>
  );
};
