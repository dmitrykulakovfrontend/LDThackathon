import { createContext, useContext } from "react";
import { Token } from "@/types/auth";

type UserContextType = {
  user: Token | undefined | null;
  setUser: React.Dispatch<React.SetStateAction<Token | undefined | null>>;
};

const iUserContextState = {
  user: undefined,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUser: () => {},
};

export const UserContext = createContext<UserContextType>(iUserContextState);
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(UserContext);
}
