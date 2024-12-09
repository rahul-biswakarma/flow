"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface AIAvatarProps {
  isStreaming?: boolean;
  size?: "sm" | "lg";
}

export const AIAvatar = ({
  isStreaming = false,
  size = "sm",
}: AIAvatarProps) => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const sizeClass = size === "lg" ? "w-20 h-20" : "w-8 h-8";

  return (
    <div className={`relative bg-gray-10 flex-shrink-0 ${sizeClass}`}>
      {/* Background fill */}
      <div className="absolute inset-0 rounded-full bg-blue-600/10" />

      {/* Outer ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-cyan-500/30"
        animate={{
          scale: isStreaming ? [1, 1.1, 1] : [1, 1.05, 1],
          rotate: rotation,
        }}
        transition={{
          duration: isStreaming ? 1 : 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Middle ring */}
      <motion.div
        className="absolute inset-1 rounded-full border-2 border-blue-500/40"
        animate={{
          scale: isStreaming ? [0.9, 1.1, 0.9] : [0.95, 1.05, 0.95],
          rotate: -rotation,
        }}
        transition={{
          duration: isStreaming ? 0.8 : 1.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Inner circle */}
      <motion.div
        className="absolute inset-2 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600"
        animate={{
          scale: isStreaming ? [0.8, 1, 0.8] : [0.9, 1, 0.9],
        }}
        transition={{
          duration: isStreaming ? 0.5 : 1.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <motion.div
          className="absolute inset-0 rounded-full bg-blue-400/50 mix-blend-overlay"
          animate={{
            opacity: isStreaming ? [0.3, 0.7, 0.3] : [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: isStreaming ? 0.3 : 1,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </div>
  );
};
