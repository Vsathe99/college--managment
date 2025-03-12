import { createSlice } from "@reduxjs/toolkit";

// Get student data from localStorage (if exists)
const studentData = JSON.parse(localStorage.getItem("student")) || null;

const studentSlice = createSlice({
  name: "student",
  initialState: {
    student: studentData, // Persist data on page reload
  },
  reducers: {
    // ✅ Set Student Data after Login
    setStudent: (state, action) => {
      state.student = action.payload;
      localStorage.setItem("student", JSON.stringify(action.payload));
    },

    // ✅ Update Subjects (Optional)
    updateSubjects: (state, action) => {
      if (state.student) {
        state.student.subjects = action.payload;
        localStorage.setItem("student", JSON.stringify(state.student));
      }
    },

    // ✅ Clear Data on Logout
    logoutStudent: (state) => {
      state.student = null;
      localStorage.removeItem("student");
    },
  },
});

// Export Actions
export const { setStudent, updateSubjects, logoutStudent } = studentSlice.actions;

// Export Reducer
export default studentSlice.reducer;
