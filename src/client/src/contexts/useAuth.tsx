import { createContext, useContext } from "react";
import { Token } from "@/types/auth";

type UserContextType = {
  user: Token | null;
  setUser: React.Dispatch<React.SetStateAction<Token | null>>;
};

const iUserContextState = {
  user: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUser: () => {},
};

export const UserContext = createContext<UserContextType>(iUserContextState);
export function useAuth() {
  return useContext(UserContext);
}
