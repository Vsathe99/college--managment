import React from "react";

const SubjectCard = ({ subject, assignments }) => {
  return (
    <div className="bg-[#413d4b] shadow-lg rounded-xl p-3 w-64 h-80 overflow-y-scroll subjectCard max-h-[200px]"> 
      <h2 className="text-xl font-bold text-center mb-4">{subject}</h2>
      <div className="space-y-2">
        {assignments.length > 0 ? (
          assignments.map((assignment, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 bg-gray-100 rounded-lg"
            >
              <span className="text-lg font-medium">
                Assignment {index + 1}
              </span>
              <button
                className={`px-3 py-1 rounded-md text-white text-sm ${
                  assignment.completed ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {assignment.completed ? "Completed" : "Pending"}
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-white">No assignments available</p>
        )}
      </div>
    </div>
  );
};

export default SubjectCard;
