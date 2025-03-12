import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Navigation from "../components/Navigation";
import AnimatedBackground from "../components/AnimatedBackground";

// Page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: -20,
  },
};

// Page transition options
const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
};

// Staggered items animation
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Homepage() {
  const navigate = useNavigate();
  const location = useLocation();

  // State for selected user type (Student or Faculty)
  const [activeUserType, setActiveUserType] = useState("Student");
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Set the active user type based on the current URL
  useEffect(() => {
    const path = location.pathname;
    if (path === "/student") {
      setActiveUserType("Student");
    } else if (path === "/faculty") {
      setActiveUserType("Faculty");
    }
  }, [location, navigate]);

  // Handle user type selection and navigation
  const handleUserTypeSelect = (userType) => {
    if (activeUserType !== userType) {
      setIsTransitioning(true);

      // Determine the path based on user type
      let path = "/";
      if (userType === "Student") path = "/student";
      else if (userType === "Faculty") path = "/faculty";

      // Navigate immediately
      setActiveUserType(userType);
      navigate(path);

      // Reset transition state after a delay
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }
  };

  // Welcome screen component (home page)
  const WelcomeScreen = () => (
    <motion.div
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="mt-10 text-center max-w-3xl mx-auto px-4"
    >
      <motion.h1
        variants={itemVariants}
        className="text-5xl md:text-6xl font-bold mb-6 text-white"
      >
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-primary to-purple-400">
          Student Management System
        </span>
      </motion.h1>

      <motion.p
        variants={itemVariants}
        className="text-xl text-gray-300 mb-10 leading-relaxed"
      >
        A comprehensive platform designed to streamline educational processes
        and enhance the academic experience for students and faculty.
      </motion.p>

      <motion.div
        variants={itemVariants}
        className="flex flex-wrap justify-center gap-6 mb-16"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative group"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-purple-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-500"></div>
          <Link to="/student">
            <button
              onClick={() => handleUserTypeSelect("Student")}
              className="relative px-8 py-4 bg-gray-900 rounded-xl leading-none flex items-center divide-x divide-gray-600"
            >
              <span className="flex items-center space-x-3">
                <span className="text-2xl">👨‍🎓</span>
                <span className="pr-6 text-gray-100 text-lg font-medium">
                  Student Portal
                </span>
              </span>
              <span className="pl-6 text-primary group-hover:text-indigo-200 transition duration-300">
                Access Now →
              </span>
            </button>
          </Link>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative group"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-700 to-blue-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-500"></div>
          <button
            onClick={() => handleUserTypeSelect("Faculty")}
            className="relative px-8 py-4 bg-gray-900 rounded-xl leading-none flex items-center divide-x divide-gray-600"
          >
            <span className="flex items-center space-x-3">
              <span className="text-2xl">👨‍🏫</span>
              <span className="pr-6 text-gray-100 text-lg font-medium">
                Faculty Portal
              </span>
            </span>
            <span className="pl-6 text-indigo-400 group-hover:text-indigo-200 transition duration-300">
              Access Now →
            </span>
          </button>
        </motion.div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left"
      >
        <div className="bg-gray-900/60 backdrop-blur-sm p-8 rounded-2xl border border-gray-800 shadow-xl relative overflow-hidden group hover:border-primary/50 transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">For Students</h3>
            </div>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <svg
                  className="w-4 h-4 mr-2 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Access course materials and assignments
              </li>
              <li className="flex items-center">
                <svg
                  className="w-4 h-4 mr-2 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                View grades and academic progress
              </li>
              <li className="flex items-center">
                <svg
                  className="w-4 h-4 mr-2 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Submit assignments and get feedback
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-900/60 backdrop-blur-sm p-8 rounded-2xl border border-gray-800 shadow-xl relative overflow-hidden group hover:border-indigo-500/50 transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-indigo-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">For Faculty</h3>
            </div>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <svg
                  className="w-4 h-4 mr-2 text-indigo-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Manage courses and track attendance
              </li>
              <li className="flex items-center">
                <svg
                  className="w-4 h-4 mr-2 text-indigo-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Grade assignments and provide feedback
              </li>
              <li className="flex items-center">
                <svg
                  className="w-4 h-4 mr-2 text-indigo-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Access student records and performance analytics
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Enhanced Gradient Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black z-0"></div>

      {/* Animated Accents */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-br from-primary/20 to-transparent opacity-30 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-full h-1/3 bg-gradient-to-tl from-indigo-600/20 to-transparent opacity-30 blur-3xl"></div>

        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-primary/20 to-purple-600/20 blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-indigo-500/20 to-blue-600/20 blur-3xl opacity-20 animate-float-delayed"></div>
      </div>

      {/* Subtle Animated Background (less prominent) */}
      <div className="fixed inset-0 z-0 opacity-30">
        <AnimatedBackground />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto py-8">
        {/* Header with Navigation */}
        <header className="mb-12">
          <Navigation
            onUserTypeSelect={handleUserTypeSelect}
            activeType={activeUserType}
          />
        </header>

        {/* Main Content Area - Only render welcome screen in Homepage */}
        <main>
          <WelcomeScreen />
        </main>

        {/* Enhanced Footer */}
      </div>
    </div>
  );
}
