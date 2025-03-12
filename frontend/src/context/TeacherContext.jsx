import { createContext, useReducer } from "react";

const TeacherContext = createContext();

const teacherReducer = (state, action) => {
  switch (action.type) {
    case "SET_TEACHER":
      return {
        ...state,
        teacher: action.payload,
      };
    default:
      return state;
  }
};

export const TeacherProvider = ({ children }) => {
  const initialState = {
    teacher: {
    },
  };

  const [state, dispatch] = useReducer(teacherReducer, initialState);

  return (
    <TeacherContext.Provider value={{ state, dispatch }}>
      {children}
    </TeacherContext.Provider>
  );
};

export default TeacherContext;
