import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MobileNav } from "./MobileNav";

function Navigation({ onUserTypeSelect, activeType }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Define available user types (removed admin)
  const userTypes = [
    { name: "Student", path: "/student", color: "#A294F9", icon: "👨‍🎓" },
    { name: "Faculty", path: "/faculty", color: "#8779E2", icon: "👨‍🏫" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Handler for navigation
  const handleNavigation = (userType, path) => {
    // Update state via provided callback
    if (onUserTypeSelect) {
      onUserTypeSelect(userType);
    }
    // Navigate directly to the path
    navigate(path);
  };

  return (
    <nav className="relative z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <div className="w-12 h-12 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-indigo-600 rounded-xl blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-gray-900 rounded-xl flex items-center justify-center border border-gray-700 z-10">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-500 font-bold text-xl">
                  SM
                </span>
              </div>
            </div>
            <div className="ml-3 text-white">
              <div className="text-lg font-bold group-hover:text-primary transition-colors duration-300">
                Student Management
              </div>
              <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                Education Portal
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="flex items-center bg-gray-900/60 backdrop-blur-md p-1.5 rounded-xl border border-gray-800">
              {userTypes.map(({ name, path, color, icon }) => (
                <button
                  key={path}
                  onClick={() => handleNavigation(name, path)}
                  className="relative px-5 py-2.5 mx-1 rounded-lg transition-all duration-300 group"
                >
                  <motion.div
                    className="absolute inset-0 rounded-lg z-0"
                    initial={false}
                    animate={{
                      backgroundColor:
                        activeType === name ? `${color}20` : "transparent",
                      boxShadow:
                        activeType === name ? `0 0 15px ${color}30` : "none",
                    }}
                    transition={{ duration: 0.2 }}
                    whileHover={{
                      backgroundColor:
                        activeType !== name
                          ? "rgba(255, 255, 255, 0.05)"
                          : `${color}30`,
                    }}
                  />

                  <div className="relative z-10 flex items-center space-x-2">
                    <span
                      className={`text-xl ${
                        activeType === name ? "opacity-100" : "opacity-70"
                      } group-hover:opacity-100 transition-opacity`}
                    >
                      {icon}
                    </span>
                    <span
                      className={`
                        font-medium
                        ${
                          activeType === name
                            ? "text-white"
                            : "text-gray-400 group-hover:text-white"
                        }
                        transition-colors duration-300
                      `}
                    >
                      {name}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="block lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2.5 rounded-lg bg-gray-900/80 border border-gray-800 text-white hover:bg-gray-800 focus:outline-none transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileNav
        onUserTypeSelect={handleNavigation}
        activeType={activeType}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </nav>
  );
}

export default Navigation;
