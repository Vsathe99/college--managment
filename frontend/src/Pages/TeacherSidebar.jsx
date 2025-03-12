import React, { useState } from "react";
import { TiHome } from "react-icons/ti";
import { IoDocumentTextOutline } from "react-icons/io5";
import { SiGoogleclassroom } from "react-icons/si";
import { MdAssignment } from "react-icons/md";
import { AiOutlineBarChart } from "react-icons/ai";
import { PiSignOutBold } from "react-icons/pi";
import { Link } from "react-router-dom";

const TeacherSidebar = () => {
  const [activeButton, setActiveButton] = useState("Dashboard");

  return (
    <div className="w-full h-screen bg-gradient-to-l from-[#A294F9] to-[#FBF8EF] py-5 px-1 flex justify-around gap-1">
      {/* Sidebar */}
      <div className="w-[16%] h-full flex flex-col items-center">
        <h1 className="text-black text-3xl font-bold mb-10">SGU (Teacher)</h1>

        {/* Dashboard Button */}
        <Link to="/dashboard">
          <button
            onClick={() => setActiveButton("Dashboard")}
            className={`flex items-center w-[12rem] gap-2 p-5 rounded-xl mt-5 ${
              activeButton === "Dashboard"
                ? "bg-[#31363F] text-white"
                : "bg-transparent"
            }`}
          >
            <span
              className={
                activeButton === "Dashboard" ? "text-white" : "text-black"
              }
            >
              <TiHome size={30} />
            </span>
            <h1
              className={`text-xl font-semibold ${
                activeButton === "Dashboard" ? "text-white" : "text-black"
              }`}
            >
              Dashboard
            </h1>
          </button>
        </Link>

        {/* Classes Button */}
        <Link to="/classes">
          <button
            onClick={() => setActiveButton("Classes")}
            className={`flex items-center w-[12rem] gap-2 p-5 rounded-xl mt-5 ${
              activeButton === "Classes"
                ? "bg-[#31363F] text-white"
                : "bg-transparent"
            }`}
          >
            <span
              className={
                activeButton === "Classes" ? "text-white" : "text-black"
              }
            >
              <SiGoogleclassroom size={30} />
            </span>
            <h1
              className={`text-xl font-semibold ${
                activeButton === "Classes" ? "text-white" : "text-black"
              }`}
            >
              Classes
            </h1>
          </button>
        </Link>

        {/* Assignments Button */}
        <Link to="/assignments">
          <button
            onClick={() => setActiveButton("Assignments")}
            className={`flex items-center w-[12rem] gap-2 p-5 rounded-xl mt-5 ${
              activeButton === "Assignments"
                ? "bg-[#31363F] text-white"
                : "bg-transparent"
            }`}
          >
            <span
              className={
                activeButton === "Assignments" ? "text-white" : "text-black"
              }
            >
              <MdAssignment size={30} />
            </span>
            <h1
              className={`text-xl font-semibold ${
                activeButton === "Assignments" ? "text-white" : "text-black"
              }`}
            >
              Assignments
            </h1>
          </button>
        </Link>

        {/* Reports Button */}
        <Link to="/reports">
          <button
            onClick={() => setActiveButton("Reports")}
            className={`flex items-center w-[12rem] gap-2 p-5 rounded-xl mt-5 ${
              activeButton === "Reports"
                ? "bg-[#31363F] text-white"
                : "bg-transparent"
            }`}
          >
            <span
              className={
                activeButton === "Reports" ? "text-white" : "text-black"
              }
            >
              <AiOutlineBarChart size={30} />
            </span>
            <h1
              className={`text-xl font-semibold ${
                activeButton === "Reports" ? "text-white" : "text-black"
              }`}
            >
              Reports
            </h1>
          </button>
        </Link>

        {/* Signout Button */}
        <button className="absolute text-lg bottom-10 flex items-center gap-5">
          Signout
          <span>
            <PiSignOutBold size={24} />
          </span>
        </button>
      </div>

      {/* Right Section */}
      <div className="w-[85%] h-full bg-[#222831] rounded-3xl"></div>
    </div>
  );
};

export default TeacherSidebar;
