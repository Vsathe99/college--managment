import { motion } from "framer-motion";

export function GradientBackground() {
  return (
    <motion.div
      className="fixed inset-0 w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#A294F9] via-[#9785F8] to-[#31363F] animate-gradient" />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(162,148,249,0.2),transparent_50%)]" />
      </div>
    </motion.div>
  );
}
