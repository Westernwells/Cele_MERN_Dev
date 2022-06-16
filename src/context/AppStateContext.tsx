import React, { createContext, useContext, useReducer } from "react";
import { nanoid } from "nanoid";

type Action =
  | {
      type: "ADD_LIST";
      payload: string;
    }
  | {
      type: "ADD_TASK";
      payload: { text: string; listId: string };
    }
  | {
      type: "MOVE_LIST";
      payload: {
        dragIndex: number;
        hoverIndex: number;
      };
    };

// const AppStateContext = createContext();
const appStateReducer = (state: AppState, action: Action): AppState => {
  //   debugger;
  switch (action.type) {
    case "ADD_LIST": {
      // Reducer logic here...
      return {
        ...state,
        lists: [
          ...state.lists,
          { id: nanoid(), text: action.payload, tasks: [] },
        ],
      };
    }
    case "ADD_TASK": {
      // Reducer logic here...

      return {
        ...state,
      };
    }
    case "MOVE_LIST": {
      return { ...state };
    }
    default: {
      return state;
    }
  }
};
export interface AppState {
  lists: List[];
  // draggedItem?: DragItem | undefined;
}
interface Task {
  id: string;
  text: string;
}
interface List {
  id: string;
  text: string;
  tasks: Task[];
}
const appData: AppState = {
  lists: [
    {
      id: "0",
      text: "To Do",
      tasks: [{ id: "c0", text: "Generate app scaffold" }],
    },
    {
      id: "1",
      text: "In Progress",
      tasks: [{ id: "c2", text: "Learn Typescript" }],
    },
    {
      id: "2",
      text: "Done",
      tasks: [{ id: "c3", text: "Begin to use static typing" }],
    },
  ],
};
const AppStateContext = createContext<AppStateContextProps>(
  {} as AppStateContextProps
);
interface AppStateContextProps {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

export const AppStateProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(appStateReducer, appData);
  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  //   debugger;
  //   console.log(useContext(AppStateContext));
  return useContext(AppStateContext);
};
