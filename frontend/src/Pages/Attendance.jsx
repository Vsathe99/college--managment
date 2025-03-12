import { useEffect, useState } from "react";
import { TiHome } from "react-icons/ti";
import { IoDocumentTextOutline } from "react-icons/io5";
import { SiGoogleclassroom } from "react-icons/si";
import { PiSignOutBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import axios from "../config/axios.js"

import { useSelector } from "react-redux";


import { AttendanceTracker } from "../components/AttendanceTracker";

const Attendance = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { teacher } = useSelector((state) => state.teacher);
  const subjectName = teacher?.teacher.subject;

   // Replace with dynamic subject selection if needed

  useEffect(() => {
    axios
    .post("/student/subStudents", { subjectName })
    .then((response) => {
      const studentsData = response.data
      console.log(studentsData)

      setStudents(studentsData);
    })
    .catch((error) => console.error("Error fetching student data:", error));
  }, []);

  return (
    <div className="w-full h-screen bg-gradient-to-l from-[#A294F9] to-[#FBF8EF] py-5 px-1 flex justify-around gap-1">
      {/* Sidebar */}
      <div className="w-[16%] h-full flex flex-col items-center">
        <h1 className="text-black text-3xl font-bold mb-10">SGU (Teacher)</h1>

        <Link to="/teacherDashboard">
          <button className="flex items-center w-[12rem] gap-2 p-5 rounded-xl mt-5 bg-transparent">
            <span className="text-black">
              <TiHome size={30} />
            </span>
            <h1 className="text-xl font-semibold">Dashboard</h1>
          </button>
        </Link>

        <Link to="/assignments">
          <button className="flex items-center w-[12rem] gap-2 p-5 rounded-xl mt-5 bg-transparent">
            <span className="text-black">
              <SiGoogleclassroom size={30} />
            </span>
            <h1 className="text-xl font-semibold">Classes</h1>
          </button>
        </Link>

        <Link to="/attendance">
          <button className="flex items-center w-[12rem] gap-2 p-5 rounded-xl mt-5  bg-[#31363F] text-white">
            <span className="text-white">
              <IoDocumentTextOutline size={30} />
            </span>
            <h1 className="text-xl font-semibold">Students</h1>
          </button>
        </Link>

        <button className="absolute text-lg bottom-10 flex items-center gap-5">
          Signout
          <span>
            <PiSignOutBold />
          </span>
        </button>
      </div>

      {/* Main Content */}
      <div className="w-[79%] h-full bg-[#222831] rounded-3xl p-6 flex justify-between">
        <div className="w-full h-full">
          {loading ? (
            <p className="text-white text-center">Loading...</p>
          ) : error ? (
            <p className="text-red-400 text-center">{error}</p>
          ) : (
            <AttendanceTracker students={students}  />
          )}
        </div>
      </div>
    </div>
  );
};

export default Attendance;
