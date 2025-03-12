import React from "react";
import { TiHome } from "react-icons/ti";
import { IoDocumentTextOutline } from "react-icons/io5";
import { SiGoogleclassroom } from "react-icons/si";
import { PiSignOutBold } from "react-icons/pi";
import { Link } from "react-router-dom";

const Classes = () => {
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
            className={`flex items-center w-[12rem] gap-2 p-5 rounded-xl mt-5 bg-[#31363F] text-white`}
          >
            <span className={"text-white"}>
              <SiGoogleclassroom size={30} />
            </span>
            <h1
              className={`text-xl font-semibold text-white 
              `}
            >
              Notice
            </h1>
          </button>
        </Link>

        {/* Fees Status Button */}
        <Link to="/fees">
          <button
            className={`flex items-center w-[12rem] gap-2 p-5 rounded-xl mt-5 
             bg-transparent`}
          >
            <span className={"text-black"}>
              <IoDocumentTextOutline size={30} />
            </span>
            <h1 className={`text-xl font-semibold text-black`}>Fees Status</h1>
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
      <div className="w-[85%] h-full bg-[#222831] rounded-3xl p-8 ">
        <div className="w-full h-full bg-gray-200 rounded-xl flex justify-center items-center">
          <h1>There is no new Annoucement or notice</h1>
        </div>
      </div>
    </div>
  );
};

export default Classes;
