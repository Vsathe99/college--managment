"use client";

import { useEffect, useRef } from "react";
import { cn } from "../lib/utils";

export function ShimmerButton({
  children,
  shimmerColor = "#A294F9",
  background = "#31363F",
  className,
  disabled,
  ...props
}) {
  const buttonRef = useRef(null);
  const shimmerRef = useRef(null);

  useEffect(() => {
    if (!buttonRef.current || !shimmerRef.current) return;

    const button = buttonRef.current;
    const shimmer = shimmerRef.current;

    const handleMouseMove = (e) => {
      if (disabled) return;

      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Update the shimmer position based on mouse coordinates
      shimmer.style.setProperty("--x", `${x}px`);
      shimmer.style.setProperty("--y", `${y}px`);
      shimmer.style.opacity = "1";
    };

    const handleMouseLeave = () => {
      shimmer.style.opacity = "0";
    };

    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [disabled]);

  return (
    <button
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-lg px-4 py-2 transition-all duration-300 hover:shadow-md",
        className,
        disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer"
      )}
      ref={buttonRef}
      disabled={disabled}
      style={{
        background,
        "--shimmer-color": shimmerColor,
      }}
      {...props}
    >
      {/* Shimmer effect */}
      <div
        ref={shimmerRef}
        className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 400px at var(--x, 0) var(--y, 0), var(--shimmer-color) 0%, transparent 50%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </div>
    </button>
  );
}
