import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./studentSlice";
import teacherReducer from "./teacherSlice";

export const store = configureStore({
  reducer: {
    student: studentReducer,
    teacher: teacherReducer,
  },
});

