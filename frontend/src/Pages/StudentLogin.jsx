import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import axios from "../config/axios.js"
import StudentDetailContext from "../context/StudentDetailContext.jsx";
import LoginCard from "../components/LoginCard";
import { GradientBackground } from "../components/GradientBackground";
import { SplashCursor } from "../components/SplashCursor";
import {useDispatch} from 'react-redux'
import { setStudent } from "../store/studentSlice.js";

export default function StudentLogin() {
  const [prnno, setPrnno] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // const { state, dispatch } = useContext(StudentDetailContext);
  const dispatch = useDispatch();


  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!prnno || !password) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    axios.post('/student/login', {prnno, password})
        .then(res => {
            console.log(res.data)
            localStorage.setItem('token', res.data.token)
            dispatch(setStudent(res.data));
            navigate('/dashboard')
            setIsLoading(false);
        })
        .catch(err => {
            console.log(err.response.data)
        })

       
  };

 

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
            userType="Student"
            prnno={prnno}
            setPrnno={setPrnno}
            password={password}
            setPassword={setPassword}
            isLoading={isLoading}
            handleLogin={handleLogin}
            error={error}
          />

        </motion.div>
      </div>
    </div>
  );
}
