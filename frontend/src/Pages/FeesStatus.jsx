import React from "react";
import { TiHome } from "react-icons/ti";
import { IoDocumentTextOutline } from "react-icons/io5";
import { SiGoogleclassroom } from "react-icons/si";
import { PiSignOutBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import StudentIDCard from "../components/StudentIDCard";
import { StudentId } from "../components/StudentId";

const FeesStatus = () => {
  return (
    <div className="w-full h-screen bg-gradient-to-l from-[#A294F9] to-[#FBF8EF] py-5 px-1 flex justify-around gap-1 ">
      <div className="w-[16%] h-full flex flex-col items-center">
        <h1 className="text-black text-3xl font-bold mb-10">SGU</h1>

        {/* Dashboard Button */}
        <Link to="/dashboard">
          <button
            className={`flex items-center w-[12rem] gap-2 p-5 rounded-xl mt-5 bg-transparent`}
          >
            <span className={"text-black"}>
              <TiHome size={30} />
            </span>
            <h1 className={`text-xl font-semibold text-black`}>Dashboard</h1>
          </button>
        </Link>

        {/* Classes Button */}
        <Link to="/classes">
          <button
            className={`flex items-center w-[12rem] gap-2 p-5 rounded-xl mt-5 bg-transparent`}
          >
            <span className={"text-black"}>
              <SiGoogleclassroom size={30} />
            </span>
            <h1 className={`text-xl font-semibold text-black`}>Notice</h1>
          </button>
        </Link>

        {/* Fees Status Button */}
        <Link to="/fees">
          <button
            className={`flex items-center w-[12rem] gap-2 p-5 rounded-xl mt-5 bg-[#31363F] text-white`}
          >
            <span className={"text-white"}>
              <IoDocumentTextOutline size={30} />
            </span>
            <h1 className={`text-xl font-semibold text-white`}>Fees Status</h1>
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
      <div className="w-[85%] h-full bg-[#222831] rounded-3xl ">
        <StudentId />
      </div>
    </div>
  );
};

export default FeesStatus;
