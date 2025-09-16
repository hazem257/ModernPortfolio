// @ts-nocheck
import { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import "./CertificateCards.css";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const elementVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const CertificateCard = ({ cert }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-50, 50], [15, -15]);
  const rotateY = useTransform(x, [-50, 50], [-15, 15]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;
    x.set(offsetX);
    y.set(offsetY);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      className="hz-cert-card"
      variants={cardVariants}
      style={{ rotateX, rotateY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.07 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <motion.img
        src={cert.imageUrl}
        alt={cert.title}
        className="hz-cert-img"
        variants={elementVariants}
      />
      <motion.h3 className="hz-cert-title" variants={elementVariants}>
        {cert.title}
      </motion.h3>
      <motion.div className="hz-cert-content" variants={elementVariants}>
        <p className="hz-cert-company">{cert.company}</p>
        <p className="hz-cert-hour">{cert.hour}</p>
        <p className="hz-cert-date">{cert.date}</p>
      </motion.div>
    </motion.div>
  );
};

const CertificateCards = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const res = await fetch(`${API_URL}/certificates`);
        if (!res.ok) throw new Error("Failed to fetch certificates");
        const data = await res.json();
        setCertificates(data);
      } catch (err) {
        console.error(err);
      } finally { setLoading(false); }
    };
    fetchCertificates();
  }, []);

  if (loading) return <p className="hz-cert-loading">Loading...</p>;

  return (
    <motion.div
      className="hz-cert-grid"
      id="certificates"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h2>My Certificates</h2>
      {certificates.map((cert) => (
        <CertificateCard key={cert._id} cert={cert} />
      ))}
    </motion.div>
  );
};

export default CertificateCards;
