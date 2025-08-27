// CertificateCards.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./CertificateCards.css";

const CertificateCards = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  // @ts-ignore
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const res = await fetch(`${API_URL}/certificates`);
        if (!res.ok) throw new Error("Failed to fetch certificates");
        const data = await res.json();
        setCertificates(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCertificates();
  }, []);

  if (loading) return <p className="loading">Loading...</p>;

  return (
    <div className="certificates-grid" id="certificates">
      <h2>My Certificates</h2>
      {certificates.map(cert => (
        <motion.div
          key={cert._id}
          className="certificate-card"
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <img src={cert.imageUrl} alt={cert.title} className="certificate-img" />
          <h3>{cert.title}</h3>
          <p className="certificate-company">{cert.company}</p>
          <p className="certificate-date">{cert.date}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default CertificateCards;
