import axios from "../config/axios.js";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setStudent } from "../store/studentSlice.js";

export function AttendanceTracker({ students }) {
  const [attendanceData, setAttendanceData] = useState(() => students || []);

  const { teacher } = useSelector((state) => state.teacher);
  const subjectName = teacher?.teacher.subject;
  const dispatch = useDispatch();


  // Update student attendance in state
  const handleChange = (prnno, field, value) => {
    setAttendanceData((prevData) =>
      prevData.map((student) =>
        student.prnno === prnno
          ? { ...student, [field]: Number(value) }
          : student
      )
    );
  };

  // Submit attendance update to backend
  const handleSubmitStudent = async (prnno) => {
    const student = attendanceData.find((s) => s.prnno === prnno);
    const attendancePercentage =
      student.conducted > 0
        ? ((student.attended / student.conducted) * 100).toFixed(2)
        : 0;

    axios
      .put("/teacher/attendance", {
        prnno,
        attendance: attendancePercentage,
        subjectName,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("Attendance updated successfully");
          dispatch(setStudent(response.data));
        }
      })
      .catch((error) => console.error("Error updating attendance:", error));
  };

  useEffect(() => {
    if (students && students.length > 0) {
      setAttendanceData(students);
    }
  }, [students]);

  return (
    <div className="overflow-x-auto p-6 bg-white rounded-xl shadow-lg border border-gray-200 max-w-5xl mx-auto mt-10">
      <h2 className="text-xl font-bold text-gray-700 mb-4">
        Attendance Tracker ({subjectName})
      </h2>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Student Name</th>
            <th className="border border-gray-300 px-4 py-2">Attended</th>
            <th className="border border-gray-300 px-4 py-2">Conducted</th>
            <th className="border border-gray-300 px-4 py-2">Attendance %</th>
            <th className="border border-gray-300 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((student) => {
            const percentage =
              student.conducted > 0
                ? ((student.attended / student.conducted) * 100).toFixed(2)
                : 0;

            return (
              <tr key={student.prnno} className="text-center">
                <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-700">
                  {student.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="number"
                    min="0"
                    value={student.attended}
                    onChange={(e) =>
                      handleChange(student.prnno, "attended", e.target.value)
                    }
                    className="w-full p-1 border border-gray-300 rounded"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="number"
                    min="0"
                    value={student.conducted}
                    onChange={(e) =>
                      handleChange(student.prnno, "conducted", e.target.value)
                    }
                    className="w-full p-1 border border-gray-300 rounded"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2 font-bold">
                  {percentage}%
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleSubmitStudent(student.prnno)}
                    className="bg-blue-600 text-white px-3 py-1 rounded shadow hover:bg-blue-700 transition"
                  >
                    Submit
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
