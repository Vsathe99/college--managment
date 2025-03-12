import React, { useContext, useEffect } from "react";
import ProfileTitle from "./ProfileTitle";
import StudentDetailContext from "../context/StudentDetailContext";

const TestComponent = () => {
  const { dispatch } = useContext(StudentDetailContext);

  useEffect(() => {
    // Simulating backend response with multiple students
    const studentsData = [
      {
        prn: "22SC12345",
        name: "John Doe",
        year: "3rd",
        attendance: 85,
        assignments: Array(10).fill(false),
      },
      {
        prn: "22SC54321",
        name: "Jane Smith",
        year: "2nd",
        attendance: 90,
        assignments: Array(10).fill(true),
      },
    ];

    // Dispatch action to set students in context
    dispatch({ type: "SET_STUDENTS", payload: studentsData });
  }, [dispatch]);

  return <ProfileTitle prn="22SC12345" />; // Show ProfileTitle for John Doe
};

export default TestComponent;
