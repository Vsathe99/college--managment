import { useEffect, useState } from "react";
import axios from "../config/axios.js";
import { useSelector } from "react-redux";

export function AssignmentTracker() {
  // State to store student data
  const [students, setStudents] = useState([]);
  const { teacher } = useSelector((state) => state.teacher);
  const subjectName = teacher?.teacher.subject;

  useEffect(() => {
    if (!subjectName) return;

    axios
      .post("/student/subStudents", { subjectName })
      .then((response) => {
        const studentsData = response.data.map((student) => {
          // Find the subject that matches the teacher's subject
          const subject = student.subjects.find(
            (subj) => subj.subjectName === subjectName
          );

          return {
            ...student,
            assignments: subject ? subject.assignments : [],
          };
        });

        setStudents(studentsData);
      })
      .catch((error) => console.error("Error fetching student data:", error));
  }, [subjectName]);

  // Handle checkbox change
  const handleCheckboxChange = (studentId, assignmentIndex, checked) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student._id === studentId
          ? {
              ...student,
              assignments: student.assignments.map((assignment, index) =>
                index === assignmentIndex
                  ? { ...assignment, isCompleted: checked }
                  : assignment
              ),
            }
          : student
      )
    );
  };

  // Handle assignment submission
  const handleSubmit = (studentId) => {
    const studentData = students.find((student) => student._id === studentId);

    axios
      .post("/api/updateAssignments", studentData)
      .then(() => alert("Assignments updated successfully!"))
      .catch((error) => console.error("Error updating assignments:", error));
  };

  return (
    <div className="overflow-x-auto p-6 bg-white rounded-xl shadow-lg border border-gray-200 max-w-5xl mx-auto">
      <h2 className="text-xl font-bold text-gray-700 mb-4">
        Assignment Tracker
      </h2>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-500">
            <th className="border border-gray-300 px-4 py-2">Student Name</th>
            {[...Array(10)].map((_, i) => (
              <th key={i} className="border border-gray-300 px-3 py-2 text-center">
                Assignment {i + 1}
              </th>
            ))}
            <th className="border border-gray-300 px-4 py-2 text-center">Submit</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student._id} className="text-center">
              <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-700">
                {student.name}
              </td>

              {[...Array(10)].map((_, index) => {
                const assignment = student.assignments[index]; // Ensure correct assignment indexing
                return (
                  <td key={index} className="border border-gray-300 px-3 py-2">
                    {assignment ? (
                      <input
                        type="checkbox"
                        className="w-5 h-5 cursor-pointer"
                        checked={assignment.isCompleted}
                        onChange={(e) =>
                          handleCheckboxChange(student._id, index, e.target.checked)
                        }
                      />
                    ) : (
                      "-"
                    )}
                  </td>
                );
              })}

              {/* Submit Button */}
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleSubmit(student._id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded-md transition"
                >
                  Submit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
