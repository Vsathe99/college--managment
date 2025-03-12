import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "../config/axios.js"; 
import { useNavigate } from 'react-router-dom';
import TeacherContext from "../context/TeacherContext.jsx";
import { GradientBackground } from "./GradientBackground";
import { SplashCursor } from "./SplashCursor";
import LoginCard from "./LoginCard";
import {useDispatch} from 'react-redux'
import { setTeacher } from "../store/teacherSlice.js";


export default function FacultyLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  // const {state, dispatch } = useContext(TeacherContext);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!email|| !password) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    axios.post('/teacher/login', {email, password})
    .then(res => {
        console.log(res.data)
        localStorage.setItem('token', res.data.token)
        dispatch(setTeacher(res.data));
        console.log("Teacher Data:", res.data);
        navigate('/teacherDashboard')
        setIsLoading(false);
    })
    .catch(err => {
        console.log(err.response.data)
    })
  };

  //  useEffect(() => {
  //     console.log("✅ Student Data Updated:", state.teacher);
  //   }, [state.teacher]);

  return (
    <div className="relative w-full">
      <GradientBackground />
      <SplashCursor />
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-5rem)] p-4">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <LoginCard
            userType="Faculty"
            prnno={email}
            setPrnno={setEmail}
            password={password}
            setPassword={setPassword}
            isLoading={isLoading}
            handleLogin={handleLogin}
            error={error}
          />

          {/* Removed Faculty Resources Section */}
        </motion.div>
      </div>
    </div>
  );
}
