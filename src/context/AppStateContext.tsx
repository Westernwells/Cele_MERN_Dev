import React, { createContext, useContext, useReducer, useState } from "react";

export interface AppState {
  formState: IFormState;
}
interface IFormState {
  who?: string;
  month?: string;
  day?: string;
  year?: string;
  gender?: string;
  keywords?: string[];
  occasion?: string;
  range: number[];
}

const appData: AppState = {
  formState: {
    who: "",
    month: "",
    day: "",
    year: "",
    gender: "",
    keywords: [],
    occasion: "",
    range: [5, 1000],
  },
};
const AppStateContext = createContext<AppStateContextProps>(
  {} as AppStateContextProps
);
interface AppStateContextProps {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
}
export const AppStateProvider = ({ children }: React.PropsWithChildren<{}>) => {
  // const [state, dispatch] = useReducer(appStateReducer, appData);
  const [state, setState] = useState(appData);
  return (
    <AppStateContext.Provider value={{ state, setState }}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  return useContext(AppStateContext);
};
