import { TiHome } from "react-icons/ti";
import { IoDocumentTextOutline } from "react-icons/io5";
import { SiGoogleclassroom } from "react-icons/si";
import { PiSignOutBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import TeacherContext from "../context/TeacherContext";
import axios from "../config/axios.js";
import { useSelector, useDispatch } from "react-redux";

import "react-circular-progressbar/dist/styles.css";
import TeacherProfileTitle from "../components/TeacherProfileTitle";

const TeacherDashboard = () => {
  const [students, setStudents] = useState([]);
  const { teacher } = useSelector((state) => state.teacher);
 
 
  useEffect(()=>{
    axios.get('/student/allstudents')
    .then(res => {
      
      setStudents(res.data.students)
    })
    .catch(err => {
      console.log(err.response.data)
    })
  },[])

  
  


  return (
    <div className="w-full h-screen bg-gradient-to-l from-[#A294F9] to-[#FBF8EF] py-5 px-1 flex justify-around gap-1">
      {/* Sidebar */}
      <div className="w-[16%] h-full flex flex-col items-center">
        <h1 className="text-black text-3xl font-bold mb-10">SGU (Teacher)</h1>

        {/* Sidebar Buttons */}
        <Link to="/teacherDashboard">
          <button className="flex items-center w-[12rem] gap-2 p-5 rounded-xl mt-5  bg-[#31363F] text-white">
            <span className="text-white">
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
          <button className="flex items-center w-[12rem] gap-2 p-5 rounded-xl mt-5 bg-transparent">
            <span className="text-black">
              <IoDocumentTextOutline size={30} />
            </span>
            <h1 className="text-xl font-semibold">Students</h1>
          </button>
        </Link>

        {/* Signout Button */}
        <button className="absolute text-lg bottom-10 flex items-center gap-5">
          Signout
          <span>
            <PiSignOutBold />
          </span>
        </button>
      </div>

      {/* Main Content */}
      <div className="w-[79%] h-full bg-[#222831] rounded-3xl p-6 flex justify-between">
        {/* Left Section */}
        <div className="w-full h-full">
          <TeacherProfileTitle />
          <div className="w-full h-[20rem] p-4">
            <h1 className="text-4xl text-[#525CEB] font-semibold">
              Student List
            </h1>
            <div className="bg-white p-4 rounded-lg shadow-lg mt-4 h-full">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#525CEB] text-white">
                    <th className="p-2">Name</th>
                    <th className="p-2">PRN</th>
                    <th className="p-2">Department</th>
                    <th className="p-2">Attendance</th>
                  </tr>
                </thead>
                <tbody>
                  {students.length > 0 ? (
                    students.map((student, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-2 text-center">{student.name}</td>
                        <td className="p-2 text-center">{student.prn}</td>
                        <td className="p-2 text-center">
                          {student.department}
                        </td>
                        <td className="p-2 text-center">
                          {student.Mainattendance}%
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="p-2 text-center text-gray-500">
                        No students available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="w-full  p-4 mt-8 flex justify-center items-center">
              <h1 className="text-white text-xl">
                "A teacher’s purpose is not to create students in their own
                image, but to develop students who can create their own."
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
