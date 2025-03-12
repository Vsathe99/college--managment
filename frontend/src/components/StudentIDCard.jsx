import React from "react";

const StudentIDCard = () => {
  return (
    <div className="w-80 bg-white shadow-lg rounded-lg p-5 flex flex-col items-center border border-gray-300">
      {/* Profile Picture */}
      <div className="flex">
        <div>
          <img
            src="../assets/studentprofile.png"
            alt="Student"
            className="w-24 h-24 rounded-full border-2 border-gray-500"
          />

          {/* Student Details */}
          <h2 className="text-xl font-bold mt-3">Bhushan Tawade</h2>
        </div>
        <div className="mt-2 w-full text-left">
          <p className="text-gray-600 text-sm">
            Computer Science & Engineering
          </p>
          <p className="text-md font-semibold">🎓 Year: 3rd Year</p>
          <p className="text-md font-semibold">📜 PRN: 22SC11428</p>
        </div>

        {/* College Logo */}
        <div className="w-full flex justify-center mt-3">
          <img
            src="https://via.placeholder.com/50"
            alt="College Logo"
            className="w-16 h-16"
          />
        </div>
      </div>

      {/* Fees Status */}
      <div className="mt-5 text-lg font-semibold px-4 py-2 rounded-md bg-green-200 text-green-800">
        ✅ You are eligible for exam
      </div>
    </div>
  );
};

export default StudentIDCard;
