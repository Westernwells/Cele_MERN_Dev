import React, { createContext, useContext, useReducer, useState } from "react";
import { RatedItemType } from "../pages/Recommendations";
import { OccasionAndDate } from "../pages/SavedProfile";
import { ProductType } from "../Reducers/ProductReducer";

export interface AppState {
  formState: IFormState;
  collections: Array<ProductType>;
}
interface IFormState {
  who?: string;
  month?: string;
  day?: string;
  year?: string;
  gender?: string;
  keywords?: string[];
  occasion?: string;
  profileName?: string;
  otherOccasion?: string;
  otherOccasions: Array<OccasionAndDate>;
  recommendedItems: Array<RatedItemType>;
  range: number[];
  isProfileSaved: boolean;
  isInitialOnboardingCompleted: boolean;
  userEmail: string;
  isEditing: boolean;
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
    recommendedItems: [],
    range: [5, 1000],
    profileName: "",
    otherOccasion: "",
    otherOccasions: [{ occasion: "Select Occasion", date: null }],
    isProfileSaved: false,
    isInitialOnboardingCompleted: false,
    userEmail: "",
    isEditing: false,
  },
  collections: [],
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
