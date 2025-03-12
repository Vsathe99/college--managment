import React, { useContext } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import StudentDetailContext from "../context/StudentDetailContext";
import { useSelector } from "react-redux";

const StudentRight = () => {
  const { state } = useContext(StudentDetailContext);
  const { student } = useSelector((state) => state.student);
  const totalAttendance = student.student.Mainattendance

  // Assuming logged-in student's PRN is available
  const loggedInStudent = state.students[0] || {}; // Replace with actual logged-in student logic
 
  const subjectAttendance = loggedInStudent.attendance?.subjects || [];

  return (
    <div className="bg-[#413d4b] w-[25%] h-full rounded-xl flex flex-col items-center p-5">
      {/* Progress Bar at the Top */}
      <div className="w-[150px] h-[300px] flex flex-col items-center mb-10">
        <div className="mb-5">
          <h1 className="text-white text-2xl font-bold">Attendance</h1>
          <p className="text-gray-200 text-sm">(Previous Month)</p>
        </div>
        <CircularProgressbar
          value={totalAttendance}
          text={`${student.student.Mainattendance}%`}
          styles={buildStyles({
            textSize: "18px",
            pathColor: "#76ABAE",
            textColor: "#EEEEEE",
            trailColor: "#555",
            strokeLinecap: "round",
          })}
        />
      </div>

      {/* Scrollable Subjects List */}
      <div className="w-full h-full overflow-y-auto space-y-4">
        {student.student.subAttendance.map((subject) => (
          <div
            key={subject.subjectName}
            className="w-full h-[100px] bg-[#5C5470] p-5 text-white rounded-lg flex justify-between"
          >
            <div>
              <h3 className="text-xl">{subject.subjectName}</h3>
              <p>Attendance</p>
            </div>
            <div className="w-16 h-16">
              <CircularProgressbar
                value={subject.attendance}
                text={`${subject.attendance}%`}
                styles={buildStyles({
                  textSize: "18px",
                  pathColor: "#76ABAE",
                  textColor: "#EEEEEE",
                  trailColor: "#555",
                  strokeLinecap: "round",
                })}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentRight;
