import React from "react";
import StudentDashboard from "./Pages/StudentDashboard";
import { Route, Routes } from "react-router-dom";
import FeesStatus from "./Pages/FeesStatus";
import Classes from "./Pages/Classes";
import Sidebar from "./Pages/Sidebar";
import TeacherSidebar from "./Pages/TeacherSidebar";
import TeacherDashboard from "./Pages/TeacherDashboard";
import AssignmentsUpload from "./Pages/AssignmentsUpload";
import Attendance from "./Pages/Attendance";
import Homepage from "./Pages/Homepage";
import StudentLogin from "./Pages/StudentLogin";
import FacultyLogin from "./components/FacultyLogin";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/student" element={<StudentLogin />} />
        <Route path="/faculty" element={<FacultyLogin />} />
        <Route path="/teacherDashboard" element={<TeacherDashboard />} />
        <Route path="/assignments" element={<AssignmentsUpload />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/fees" element={<FeesStatus />} />
      </Routes>
    </div>
  );
};

export default App;
