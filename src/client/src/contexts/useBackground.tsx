import { createContext, useContext } from "react";
export type Background = {
  color?: string;
  icon?: React.FC<React.SVGProps<SVGElement>>;
  image?: string;
};

type BackgroundContextType = {
  background: Background | undefined;
  setBackground: React.Dispatch<React.SetStateAction<Background | undefined>>;
};

const BackgroundContextState = {
  background: undefined,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setBackground: () => {},
};

export const BackgroundContext = createContext<BackgroundContextType>(
  BackgroundContextState
);
// eslint-disable-next-line react-refresh/only-export-components
export function useBackground() {
  return useContext(BackgroundContext);
}
