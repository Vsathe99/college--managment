import { createContext, useEffect, useReducer, useState } from "react";

// Initial state (stores multiple students)
const initialState = {
  students:[], // Array of student objects
  subjects: [], // List of subject names
};

// Reducer function
const studentReducer = (state, action) => {
  switch (action.type) {
    case "SET_STUDENTS": // Set all student details at once
      return {
        ...state,
        students: action.payload, // Payload should be an array of students
      };

    case "SET_SUBJECTS": // Set subject names
      return {
        ...state,
        subjects: action.payload, // Payload should be an array of subjects
      };

    case "UPDATE_STUDENT": // Update a specific student's details
      return {
        ...state,
        students: state.students.map((student) =>
          student.prn === action.payload.prn
            ? { ...student, ...action.payload }
            : student
        ),
      };

    case "UPDATE_ATTENDANCE": // Update attendance for a specific student
      return {
        ...state,
        students: state.students.map((student) =>
          student.prn === action.payload.prn
            ? {
                ...student,
                attendance: {
                  ...student.attendance,
                  subjects: action.payload.subjects, // Attendance for each subject
                  totalPercentage: action.payload.totalPercentage, // Total attendance percentage
                },
              }
            : student
        ),
      };

    case "UPDATE_ASSIGNMENT": // Update assignment submission for a specific student
      return {
        ...state,
        students: state.students.map((student) =>
          student.prn === action.payload.prn
            ? {
                ...student,
                assignments: student.assignments.map((assignment, index) =>
                  index === action.payload.index
                    ? {
                        ...assignment,
                        submitted: action.payload.submitted,
                        checked: action.payload.checked, // Marks whether the assignment is checked or not
                        subject: action.payload.subject, // Stores the subject related to the assignment
                      }
                    : assignment
                ),
              }
            : student
        ),
      };

    default:
      return state;
  }
};

// Create context
const StudentDetailContext = createContext();

// Provider component
export const StudentDetailProvider = ({ children }) => {
  const [state, dispatch] = useReducer(studentReducer, initialState);


  return (
    <StudentDetailContext.Provider value={{ state, dispatch }}>
      {children}
    </StudentDetailContext.Provider>
  );
};

export default StudentDetailContext;
