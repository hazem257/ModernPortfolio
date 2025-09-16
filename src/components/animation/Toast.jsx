import { motion, AnimatePresence } from "framer-motion";

const Toast = ({ message, type }) => {
  const bgColor = type === "success" ? "var(--success)" : type === "error" ? "var(--danger)" : "var(--accent)";
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "fixed",
            top: 20,
            right: 20,
            padding: "12px 20px",
            background: bgColor,
            color: "#fff",
            borderRadius: "12px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
            zIndex: 200,
          }}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
