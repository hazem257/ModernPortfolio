import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./loading.css"; // نضيف CSS خاص بالأنيميشن

const Loading = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          onFinish();
          return 100;
        }
        return prev + 2;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <AnimatePresence>
      <motion.div
        className="loading-screen"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="loading-logo"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 120 }}
        >
          Dragon
        </motion.h1>

        <div className="loading-bar-container">
          <motion.div
            className="loading-bar"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeInOut", duration: 0.1 }}
          />
        </div>

        <motion.p
          className="loading-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Loading Portfolio...
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
};

export default Loading;
