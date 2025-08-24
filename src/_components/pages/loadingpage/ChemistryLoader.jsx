import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./ChemistryLoader.css";

const ChemistryLoader = ({ onFinish }) => {
  const [show, setShow] = useState(true);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // تحديد الوضع الليلي أو النهاري
    const hour = new Date().getHours();
    setTheme(hour >= 19 || hour <= 6 ? "dark" : "light");

    // تحديد مدة التحميل حسب سرعة النت
    let duration = 3000; // افتراضي
    if (navigator.connection && navigator.connection.downlink) {
      const speed = navigator.connection.downlink;
      if (speed < 1) duration = 6000;
      else if (speed < 3) duration = 4500;
      else duration = 2500;
    }

    const timer = setTimeout(() => {
      setShow(false);
      if (onFinish) onFinish();
    }, duration);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={`chem-loader ${theme}`}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(8px)" }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="test-tube"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="liquid"></div>
            <div className="bubbles">
              {[...Array(6)].map((_, i) => (
                <motion.span
                  key={i}
                  className="bubble"
                  initial={{ y: 0, opacity: 0 }}
                  animate={{ y: -60, opacity: 1 }}
                  transition={{
                    delay: i * 0.2,
                    duration: 1.2,
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                />
              ))}
            </div>
          </motion.div>
          <motion.h2
            className="loading-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            جاري تحضير المعمل...
          </motion.h2>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChemistryLoader;
