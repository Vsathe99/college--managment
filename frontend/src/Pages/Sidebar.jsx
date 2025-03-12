import React, { useState } from "react";
import { TiHome } from "react-icons/ti";
import { IoDocumentTextOutline } from "react-icons/io5";
import { SiGoogleclassroom } from "react-icons/si";
import { PiSignOutBold } from "react-icons/pi";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [activeButton, setActiveButton] = useState("Dashboard");

  return (
    <div className="w-full h-screen bg-gradient-to-l from-[#A294F9] to-[#FBF8EF] py-5 px-1 flex justify-around gap-1 ">
      <div className="w-[16%] h-full flex flex-col items-center">
        <h1 className="text-black text-3xl font-bold mb-10">SGU</h1>

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

        {/* Fees Status Button */}
        <Link to="/fees">
          <button
            onClick={() => setActiveButton("Fees Status")}
            className={`flex items-center w-[12rem] gap-2 p-5 rounded-xl mt-5 ${
              activeButton === "Fees Status"
                ? "bg-[#31363F] text-white"
                : "bg-transparent"
            }`}
          >
            <span
              className={
                activeButton === "Fees Status" ? "text-white" : "text-black"
              }
            >
              <IoDocumentTextOutline size={30} />
            </span>
            <h1
              className={`text-xl font-semibold ${
                activeButton === "Fees Status" ? "text-white" : "text-black"
              }`}
            >
              Fees Status
            </h1>
          </button>
        </Link>

        {/* Signout Button (Doesn't Change Active State) */}
        <button className="absolute text-lg bottom-10 justify-center flex items-center gap-5">
          Signout
          <span>
            <PiSignOutBold />
          </span>
        </button>
      </div>

      {/* Right Section */}
      <div className="w-[85%] h-full bg-[#222831] rounded-3xl"></div>
    </div>
  );
};

export default Sidebar;
