import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  teacher: null,
};

export const teacherSlice = createSlice({
  name: "teacher",
  initialState,
  reducers: {
    // ✅ Set Teacher Data After Login
    setTeacher: (state, action) => {
      state.teacher = action.payload;
    },

    // ✅ Logout Teacher
    logoutTeacher: (state) => {
      state.teacher = null;
    },

    // ✅ Update Teacher's Subject or Any Info
    updateTeacher: (state, action) => {
      state.teacher = { ...state.teacher, ...action.payload };
    },
  },
});

export const { setTeacher, logoutTeacher, updateTeacher } =
  teacherSlice.actions;
export default teacherSlice.reducer;
