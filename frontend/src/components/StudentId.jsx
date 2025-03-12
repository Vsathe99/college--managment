import { motion } from "framer-motion";
import { useContext } from "react";
import StudentDetailContext from "../context/StudentDetailContext";

export function StudentId() {
  const { state } = useContext(StudentDetailContext);

  // Assuming logged-in student's details are available
  const loggedInStudent = state.students[0] || {}; // Replace with actual logged-in student logic

  return (
    <div className="flex items-center justify-center p-4 mt-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200"
        style={{
          background: "linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%)",
        }}
      >
        <div className="p-6 relative">
          {/* Student Photo */}
          <div className="flex justify-center mb-4">
            <div className="w-28 h-28 bg-gray-100 rounded-xl border border-gray-200 flex items-center justify-center">
              <svg
                className="w-14 h-14 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          </div>

          {/* Student Details */}
          <div className="space-y-3">
            {/* Name */}
            <div>
              <label className="text-xs font-semibold text-gray-500">
                NAME
              </label>
              <div className="text-lg font-bold text-gray-700 bg-gray-50 p-2 rounded-md border border-gray-200">
                {loggedInStudent.studentName || "STUDENT NAME"}
              </div>
            </div>

            {/* PRN */}
            <div>
              <label className="text-xs font-semibold text-gray-500">PRN</label>
              <div className="text-base font-mono text-gray-600 bg-gray-50 p-2 rounded-md border border-gray-200">
                {loggedInStudent.prnNumber || "XXXXXXXX"}
              </div>
            </div>

            {/* Department */}
            <div>
              <label className="text-xs font-semibold text-gray-500">
                DEPARTMENT
              </label>
              <div className="text-base text-gray-700 bg-gray-50 p-2 rounded-md border border-gray-200">
                {loggedInStudent.department || "COMPUTER"}
              </div>
            </div>

            {/* Year */}
            <div>
              <label className="text-xs font-semibold text-gray-500">
                YEAR
              </label>
              <div className="text-base text-gray-700 bg-gray-50 p-2 rounded-md border border-gray-200">
                {loggedInStudent.year || "THIRD YEAR"}
              </div>
            </div>

            {/* Fee Status */}
            <div>
              <label className="text-xs font-semibold text-gray-500">
                FEE STATUS
              </label>
              <div
                className={`text-base font-semibold p-2 rounded-md border ${
                  loggedInStudent.feeStatus === "PAID"
                    ? "bg-green-50 text-green-600 border-green-200"
                    : "bg-yellow-50 text-yellow-600 border-yellow-200"
                }`}
              >
                {loggedInStudent.feeStatus || "PENDING"}
              </div>
            </div>

            {/* Eligibility Status */}
            <div
              className={`p-3 text-center text-sm font-bold rounded-md border shadow-sm ${
                loggedInStudent.isEligible
                  ? "bg-green-50 text-green-600 border-green-200"
                  : "bg-red-50 text-red-600 border-red-200"
              }`}
            >
              {loggedInStudent.isEligible ? "ELIGIBLE" : "NOT ELIGIBLE"}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
