import { TiHome } from "react-icons/ti";
import { IoDocumentTextOutline } from "react-icons/io5";
import { SiGoogleclassroom } from "react-icons/si";
import { PiSignOutBold } from "react-icons/pi";
import { Link } from "react-router-dom";

import "react-circular-progressbar/dist/styles.css";
import StudentRight from "../components/StudentRight";
import ProfileTitle from "../components/ProfileTitle";
import TeacherProfileTitle from "../components/TeacherProfileTitle";
import { NewAssignment } from "../components/NewAssignment";
import { AssignmentTracker } from "../components/AssignmentTracker";

const AssignmentsUpload = () => {
  return (
    <div className="w-full h-screen bg-gradient-to-l from-[#A294F9] to-[#FBF8EF] py-5 px-1 flex justify-around gap-1">
      {/* Sidebar */}
      <div className="w-[16%] h-full flex flex-col items-center">
        <h1 className="text-black text-3xl font-bold mb-10">SGU (Teacher)</h1>

        {/* Sidebar Buttons */}
        <Link to="/teacherDashboard">
          <button className="flex items-center w-[12rem] gap-2 p-5 rounded-xl mt-5 bg-transparent">
            <span className="text-black">
              <TiHome size={30} />
            </span>
            <h1 className="text-xl font-semibold">Dashboard</h1>
          </button>
        </Link>

        <Link to="/assignments">
          <button className="flex items-center w-[12rem] gap-2 p-5 rounded-xl mt-5  bg-[#31363F] text-white">
            <span className="text-white">
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
        <div className="w-[65%] h-full bg-[##31363F] text-white p-6 rounded-xl shadow-lg border border-gray-200 py-40">
          <AssignmentTracker />
        </div>
        <div className="w-[30%] h-full">
          <NewAssignment />
        </div>
      </div>
    </div>
  );
};

export default AssignmentsUpload;
