import React, { useContext, useEffect, useState } from "react";
import TeacherContext from "../context/TeacherContext";
import { useSelector, useDispatch } from "react-redux";


const TeacherProfileTitle = () => {
  const { teacher } = useSelector((state) => state.teacher);

  const [dateTime, setDateTime] = useState({
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime({
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
      });
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const {state} = useContext(TeacherContext);

  return (
    <div className="w-full h-40 bg-[#413d4b] flex justify-between p-5 rounded-2xl text-white mb-8">
      <div className="flex justify-between">
        <div className="w-40 mr-6  flex justify-center items-center">
          <img
            src="../src/assets/teacherProfile.png"
            alt="studentpic"
            className="w-[14rem]"
          />
        </div>
        <div className="w-80  text-start flex items-center px-4">
          <div>
            <h1 className="font-bold text-3xl">Welcome Back!</h1>
            <p className="text-xl font-medium"> {teacher?.teacher?.name}</p>
            <p className="text-[1rem] font-normal"> {teacher?.teacher?._id}</p>
          </div>
        </div>
      </div>
      {/* Date & Time Section */}
      <div className="w-[12rem] mx-10  flex flex-col justify-center items-end p-3 rounded-xl">
        <h1 className="text-[1.3rem] font-semibold">{dateTime.date}</h1>
        <p className="text-sm font-bold">{dateTime.time}</p>
      </div>
    </div>
  );
};

export default TeacherProfileTitle;
