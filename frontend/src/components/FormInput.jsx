import { useState } from "react";
import { motion } from "framer-motion";

export function FormInput({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  error,
  className = "",
  iconLeft,
  iconRight,
  disabled = false,
  accentColor = "#A294F9",
  helperText,
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const actualType = type === "password" && showPassword ? "text" : type;

  return (
    <div className={`group relative ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className={`
            block text-sm font-medium mb-1.5 tracking-wide transition-colors duration-200
            ${
              isFocused
                ? "text-primary"
                : "text-component-light/80 group-hover:text-component"
            }
            ${disabled ? "opacity-60" : ""}
            ${
              required
                ? 'after:content-["*"] after:ml-0.5 after:text-error'
                : ""
            }
          `}
        >
          {label}
        </label>
      )}

      <div className="relative">
        {iconLeft && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-component/50">
            {iconLeft}
          </div>
        )}

        <input
          id={id}
          type={actualType}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            w-full rounded-lg px-4 py-2.5 transition-all duration-200
            ${iconLeft ? "pl-10" : ""}
            ${type === "password" || iconRight ? "pr-10" : ""}
            bg-white/95 border backdrop-blur-sm
            placeholder:text-component/30
            disabled:bg-secondary/50 disabled:text-component/40 disabled:cursor-not-allowed
            ${
              error
                ? "border-error/50 focus:border-error focus:ring-2 focus:ring-error/30"
                : "border-component/20 focus:border-primary focus:ring-2 focus:ring-primary/30"
            }
            ${isFocused ? "shadow-sm" : ""}
          `}
          {...props}
        />

        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-component/50 hover:text-component transition-colors"
          >
            {showPassword ? (
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
                  d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
            ) : (
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
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            )}
          </button>
        )}

        {iconRight && type !== "password" && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-component/50">
            {iconRight}
          </div>
        )}

        {/* Focus indicator line animation */}
        {isFocused && !error && (
          <motion.div
            className="absolute bottom-0 left-0 h-0.5 rounded-full bg-primary"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        )}

        {/* Error indicator line animation */}
        {isFocused && error && (
          <motion.div
            className="absolute bottom-0 left-0 h-0.5 rounded-full bg-error"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        )}
      </div>

      {/* Helper text or error message */}
      {(helperText || error) && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className={`mt-1.5 text-xs ${
            error ? "text-error" : "text-component/60"
          }`}
        >
          {error || helperText}
        </motion.div>
      )}
    </div>
  );
}
