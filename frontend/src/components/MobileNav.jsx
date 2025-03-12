import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

export function MobileNav({ onUserTypeSelect, activeType, isOpen, onClose }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // User types
  const userTypes = [
    { name: "Student", path: "/student", icon: "👨‍🎓", color: "#A294F9" },
    { name: "Faculty", path: "/faculty", icon: "👨‍🏫", color: "#8779E2" },
  ];

  // Sync menu open state with isOpen prop
  useEffect(() => {
    if (isOpen !== undefined) {
      setIsMenuOpen(isOpen);
    }
  }, [isOpen]);

  const toggleMenu = () => {
    const newState = !isMenuOpen;
    setIsMenuOpen(newState);
    if (!newState && onClose) {
      onClose();
    }
  };

  const handleNavClick = (userType, path) => {
    // Close the menu
    setIsMenuOpen(false);
    if (onClose) {
      onClose();
    }

    // Handle navigation - either via callback or direct navigation
    if (onUserTypeSelect) {
      onUserTypeSelect(userType, path);
    } else {
      navigate(path);
    }
  };

  return (
    <div className="lg:hidden">
      {/* Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm"
            onClick={toggleMenu}
          />
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 z-50 w-80 h-full bg-gray-900 shadow-2xl overflow-y-auto border-l border-gray-800"
          >
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-800">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">
                    Student Management
                  </h2>
                  <p className="text-sm text-gray-400">Select your portal</p>
                </div>
                <button
                  onClick={toggleMenu}
                  className="p-2 rounded-lg bg-gray-800/70 text-white hover:bg-gray-700 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-6 space-y-5">
              <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                SELECT USER TYPE
              </h3>

              <div className="space-y-4">
                {userTypes.map((type) => (
                  <button
                    key={type.path}
                    onClick={() => handleNavClick(type.name, type.path)}
                    className="block w-full text-left"
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative p-4 rounded-xl ${
                        activeType === type.name
                          ? "bg-gradient-to-r from-gray-800 to-gray-900"
                          : "bg-gray-800/50 hover:bg-gray-800/80"
                      } transition-all duration-300 overflow-hidden`}
                    >
                      {/* Background gradient effect for active item */}
                      {activeType === type.name && (
                        <div
                          className="absolute inset-0 opacity-30"
                          style={{
                            background: `linear-gradient(120deg, ${type.color}40, transparent 70%)`,
                            borderLeft: `3px solid ${type.color}`,
                          }}
                        />
                      )}

                      <div className="flex items-center">
                        {/* Icon container */}
                        <div
                          className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                            activeType === type.name
                              ? "bg-gray-900/60"
                              : "bg-gray-900/40"
                          } mr-4`}
                        >
                          <span className="text-2xl">{type.icon}</span>
                        </div>

                        {/* Text content */}
                        <div className="flex-grow">
                          <p className="font-semibold text-white">
                            {type.name} Portal
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            {activeType === type.name
                              ? "Currently selected"
                              : "Click to access"}
                          </p>
                        </div>

                        {/* Checkmark for active item */}
                        {activeType === type.name && (
                          <div className="flex-shrink-0 ml-2">
                            <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                              <svg
                                className="h-4 w-4 text-primary"
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
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </button>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-800 bg-gray-900/50 backdrop-blur-sm">
              <div className="text-center">
                <div className="h-8 w-8 mx-auto bg-gradient-to-r from-primary to-indigo-600 rounded-lg flex items-center justify-center mb-2 shadow-lg shadow-primary/20">
                  <span className="text-white text-xs font-bold">SM</span>
                </div>
                <p className="text-gray-400 text-xs">
                  © 2023 Student Management System
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
