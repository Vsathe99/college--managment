import { useState } from "react";
import { motion } from "framer-motion";

import { BorderBeam } from "./BorderBeam";
import { ShimmerButton } from "./ShimmerButton";
import { FormInput } from "./FormInput";

export function LoginCard({
  userType,
  prnno,
  setPrnno,
  password,
  setPassword,
  isLoading,
  handleLogin,
  error,
}) {
  // User type specific configurations
  const configs = {
    Student: {
      title: "Student Portal",
      subtitle: "Access your courses, assignments, and grades",
      accentColor: "#A294F9",
      secondaryColor: "#8779E2",
      icon: "👨‍🎓",
      emailPlaceholder: "student@university.edu",
    },
    Faculty: {
      title: "Faculty Portal",
      subtitle: "Manage your classes and student records",
      accentColor: "#8779E2",
      secondaryColor: "#6C60C9",
      icon: "👨‍🏫",
      emailPlaceholder: "faculty@university.edu",
    },
    Administration: {
      title: "Administration Portal",
      subtitle: "System management and oversight",
      accentColor: "#6C60C9",
      secondaryColor: "#5451B5",
      icon: "👨‍💼",
      emailPlaceholder: "admin@university.edu",
    },
  };

  const config = configs[userType] || configs.Student;

  return (
    <div className="relative min-h-[calc(100vh-5rem)] sm:min-h-screen flex items-center justify-center w-full overflow-hidden px-4 py-8 sm:py-0">
      <motion.div
        className="w-full max-w-md mx-auto relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Card Container with Border Effect */}
        <div className="relative rounded-2xl overflow-hidden shadow-strong">
          {/* Border Beam Container */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden z-0">
            <div className="absolute inset-0 bg-component-dark/90 backdrop-blur-sm rounded-2xl" />
            <BorderBeam
              duration={3}
              className="opacity-70"
              colorFrom={config.accentColor}
              colorTo={config.secondaryColor}
            />
            <BorderBeam
              duration={5}
              delay={1}
              className="opacity-50"
              colorFrom={config.secondaryColor}
              colorTo={config.accentColor}
              reverse={true}
            />
            <BorderBeam
              duration={7}
              delay={2}
              className="opacity-30"
              colorFrom="#ffffff"
              colorTo={config.accentColor}
            />
          </div>

          {/* Header */}
          <div
            className="relative z-10 flex items-center gap-4 p-6 sm:p-7 rounded-t-2xl text-white"
            style={{
              background: `linear-gradient(145deg, ${config.accentColor}, #31363F)`,
              boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
            }}
          >
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center relative overflow-hidden shadow-lg"
              style={{ background: "#31363F" }}
            >
              <motion.div
                className="text-2xl font-bold relative z-10"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                {config.icon}
              </motion.div>
              <div
                className="absolute inset-0 opacity-60"
                style={{
                  background: `radial-gradient(circle at center, ${config.accentColor}90, transparent)`,
                }}
              />
            </div>
            <div>
              <motion.h2
                className="text-xl sm:text-2xl font-semibold text-white tracking-tight"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                {config.title}
              </motion.h2>
              <motion.p
                className="text-sm text-white/80"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                {config.subtitle}
              </motion.p>
            </div>
          </div>

          {/* Main Card Body */}
          <div className="relative z-10 bg-white/95 backdrop-blur-md p-6 sm:p-8 rounded-b-2xl">
            <form
              onSubmit={handleLogin}
              className="space-y-5 sm:space-y-6 relative z-10"
            >
              <FormInput
                id="prnno"
                label="PRN Number"
                type="text"
                value={prnno}
                onChange={(e) => setPrnno(e.target.value)}
                accentColor={config.accentColor}
                required
                iconLeft={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                }
              />

              <FormInput
                id="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                accentColor={config.accentColor}
                required
                iconLeft={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                    />
                  </svg>
                }
                error={error}
              />

              <div className="pt-2">
                <ShimmerButton
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 text-white font-medium rounded-lg text-sm"
                  shimmerColor={config.accentColor}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    "Sign in"
                  )}
                </ShimmerButton>
              </div>

              <div className="pt-2 text-center">
                <motion.button
                  type="button"
                  className="text-sm text-component/70 hover:text-primary transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Forgot your password?
                </motion.button>
              </div>
            </form>
          </div>
        </div>

        {/* Card Glow Effect */}
        <div
          className="absolute -inset-0.5 rounded-2xl blur-xl opacity-30 pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, ${config.accentColor}50, transparent 70%)`,
          }}
        />
      </motion.div>
    </div>
  );
}

export default LoginCard;
