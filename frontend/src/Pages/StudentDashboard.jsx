import { TiHome } from "react-icons/ti";
import { IoDocumentTextOutline } from "react-icons/io5";
import { SiGoogleclassroom } from "react-icons/si";
import { PiSignOutBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import { use, useContext, useEffect } from "react";
import StudentDetailContext from "../context/StudentDetailContext";

import "react-circular-progressbar/dist/styles.css";
import StudentRight from "../components/StudentRight";
import ProfileTitle from "../components/ProfileTitle";
import SubjectCard from "../components/SubjectCard";
import { useSelector, useDispatch } from "react-redux";

const StudentDashboard = () => {
  // const { state } = useContext(StudentDetailContext);
  const { student } = useSelector((state) => state.student);
  


    const subjects = student?.student?.subjects || [];
    console.log("sub:",subjects);
    

  // const assignments = loggedInStudent.assignments || {}; // Assignments data from backend

  return (
    <div className="w-full h-screen bg-gradient-to-l from-[#A294F9] to-[#FBF8EF] py-5 px-1 flex justify-around gap-1">
      {/* Sidebar */}
      <div className="w-[16%] h-full flex flex-col items-center">
        <h1 className="text-black text-3xl font-bold mb-10">SGU</h1>

        {/* Sidebar Buttons */}
        <Link to="/dashboard">
          <button
            className={`flex items-center w-[12rem] gap-2 p-5 rounded-xl mt-5 
              bg-[#31363F] text-white           
            `}
          >
            <span className={"text-white"}>
              <TiHome size={30} />
            </span>
            <h1 className="text-xl font-semibold">Dashboard</h1>
          </button>
        </Link>

        <Link to="/classes">
          <button
            className={`flex items-center w-[12rem] gap-2 p-5 rounded-xl mt-5 bg-transparent`}
          >
            <span className={"text-black"}>
              <SiGoogleclassroom size={30} />
            </span>
            <h1 className="text-xl font-semibold">Notice</h1>
          </button>
        </Link>

        <Link to="/fees">
          <button
            className={`flex items-center w-[12rem] gap-2 p-5 rounded-xl mt-5 bg-transparent
            `}
          >
            <span className={"text-black"}>
              <IoDocumentTextOutline size={30} />
            </span>
            <h1 className="text-xl font-semibold">Fees Status</h1>
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
      <div className="w-[85%] h-full bg-[#222831] rounded-3xl p-6 flex justify-between">
        {/* Left Section */}
        <div className=" w-[72%] h-full">
          <ProfileTitle />
          <div className="w-full h-[10rem] p-4">
            <h1 className="text-4xl text-[#525CEB] font-semibold ">
              Your Courses
            </h1>
            <ul className="flex text-white w-full h-[6rem] justify-around items-center text-lg">
              {subjects.length > 0 ? (
                subjects.map((subject, index) => <li key={index}>{subject.subjectName}</li>)
              ) : (
                <li>No subjects available</li>
              )}
            </ul>
            <hr />
          </div>
          <div className="flex w-full  justify-around overflow-y-scroll">
            {subjects.length > 0 ? (
              subjects.map((subject, index) => (
                <SubjectCard
                  key={index}
                  subject={subject.subjectName}
                  assignments={subject.assignments}
                />
              ))
            ) : (
              <p className="text-white">No subjects found</p>
            )}
          </div>
        </div>

        {/* Right Section (Progress & Subjects) */}
        <StudentRight />
      </div>
    </div>
  );
};

export default StudentDashboard;
