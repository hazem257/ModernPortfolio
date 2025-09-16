// @ts-nocheck
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Toast from "../animation/Toast";
import './CertificateCards.css';

const Certificatedash = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "" });

  const API_URL = import.meta.env.VITE_API_URL ;

  const [newCertificate, setNewCertificate] = useState({
    title: "",
    description: "",
    company: "",
    date: "",
    imageFile: null,
  });

  const [editCertificate, setEditCertificate] = useState(null);

  // 🔹 Toast helper
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "" }), 3000);
  };

  // 🔹 fetch certificates
  useEffect(() => {
    fetch(`${API_URL}/certificates`)
      .then(res => res.json())
      .then(data => {
        setCertificates(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
        showToast("Failed to fetch certificates", "error");
      });
  }, []);

  // 🔹 handle Add form change
  const handleAddChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imageFile") {
      setNewCertificate(prev => ({ ...prev, imageFile: files[0] }));
    } else {
      setNewCertificate(prev => ({ ...prev, [name]: value }));
    }
  };

  // 🔹 submit Add form
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", newCertificate.title);
      formData.append("company", newCertificate.company);
      formData.append("date", newCertificate.date);
      formData.append("description", newCertificate.description);
      if (newCertificate.imageFile) formData.append("file", newCertificate.imageFile);

      const res = await fetch(`${API_URL}/certificates`, { method: "POST", body: formData });
      if (!res.ok) throw new Error("Failed to add certificate");
      const data = await res.json();
      setCertificates([...certificates, data]);
      setShowAdd(false);
      setNewCertificate({ title: "", description: "", company: "", date: "", imageFile: null });
      showToast("Certificate added successfully!", "success");
    } catch (err) {
      console.error(err);
      showToast("Error adding certificate", "error");
    }
  };

  // 🔹 handle Edit form change
  const handleEditChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imageFile") {
      setEditCertificate(prev => ({ ...prev, imageFile: files[0] }));
    } else {
      setEditCertificate(prev => ({ ...prev, [name]: value }));
    }
  };

  // 🔹 submit Edit form
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", editCertificate.title);
      formData.append("company", editCertificate.company);
      formData.append("date", editCertificate.date);
      formData.append("description", editCertificate.description);
      if (editCertificate.imageFile) formData.append("file", editCertificate.imageFile);

      const res = await fetch(`${API_URL}/certificates/${editCertificate._id}`, { method: "PUT", body: formData });
      if (!res.ok) throw new Error("Failed to update certificate");
      const data = await res.json();
      setCertificates(certificates.map(c => c._id === data._id ? data : c));
      setShowEdit(false);
      setEditCertificate(null);
      showToast("Certificate updated successfully!", "success");
    } catch (err) {
      console.error(err);
      showToast("Error updating certificate", "error");
    }
  };

  // 🔹 delete certificate
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await fetch(`${API_URL}/certificates/${id}`, { method: "DELETE" });
      setCertificates(certificates.filter(c => c._id !== id));
      showToast("Certificate deleted successfully!", "success");
    } catch (err) {
      console.error(err);
      showToast("Error deleting certificate", "error");
    }
  };

  if (loading) return <p className="loading">Loading...</p>;

  return (
    <div className="dashboard">
      <h2 className="dash-title">Certificates Dashboard</h2>
      <button className="add-btn" onClick={() => setShowAdd(true)}>➕ Add Certificate</button>

      <div className="certificates-grid">
        {certificates.map(certificate => (
          <motion.div key={certificate._id} className="certificate-card" whileHover={{ scale: 1.05 }}>
            <img src={certificate.imageUrl} alt={certificate.title} className="certificate-img" />
            <h3>{certificate.title}</h3>
            <p className="certificate-company">{certificate.company}</p>
            <p className="certificate-date">{certificate.date}</p>
            <div className="certificate-actions">
              <button onClick={() => setSelectedCertificate(certificate)}>View</button>
              <button onClick={() => { setEditCertificate(certificate); setShowEdit(true); }}>Edit</button>
              <button onClick={() => handleDelete(certificate._id)}>Delete</button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View Modal */}
      <AnimatePresence>
        {selectedCertificate && (
          <motion.div className="modal-overlay" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>
            <motion.div className="modal-content" initial={{ scale:0 }} animate={{ scale:1 }} exit={{ scale:0 }}>
              <h2>{selectedCertificate.title}</h2>
              <p><strong>Company:</strong> {selectedCertificate.company}</p>
              <p><strong>Date:</strong> {selectedCertificate.date}</p>
              <p><strong>Description:</strong> {selectedCertificate.description}</p>
              <img src={selectedCertificate.imageUrl} alt={selectedCertificate.title} className="certificate-img" />
              <button onClick={() => setSelectedCertificate(null)} className="close-btn">Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Modal */}
      <AnimatePresence>
        {showAdd && (
          <motion.div className="modal-overlay" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>
            <motion.div className="modal-content" initial={{ scale:0 }} animate={{ scale:1 }} exit={{ scale:0 }}>
              <h3>Add New Certificate</h3>
              <form onSubmit={handleAddSubmit} className="add-form">
                <input name="title" placeholder="Title" value={newCertificate.title} onChange={handleAddChange} required/>
                <input name="company" placeholder="Company" value={newCertificate.company} onChange={handleAddChange} required/>
                <input type="date" name="date" value={newCertificate.date} onChange={handleAddChange} required/>
                <textarea name="description" placeholder="Description" value={newCertificate.description} onChange={handleAddChange} />
                <input type="file" name="imageFile" onChange={handleAddChange} accept="image/*" />
                <div className="btn-cont">
                  <button type="submit" className="submit-btn">Add Certificate</button>
                  <button type="button" onClick={() => setShowAdd(false)} className="close-btn">Cancel</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Modal */}
      <AnimatePresence>
        {showEdit && editCertificate && (
          <motion.div className="modal-overlay" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>
            <motion.div className="modal-content" initial={{ scale:0 }} animate={{ scale:1 }} exit={{ scale:0 }}>
              <h3>Edit Certificate</h3>
              <form onSubmit={handleEditSubmit} className="add-form">
                <input name="title" placeholder="Title" value={editCertificate.title} onChange={handleEditChange} required/>
                <input name="company" placeholder="Company" value={editCertificate.company} onChange={handleEditChange} required/>
                <input type="date" name="date" value={editCertificate.date} onChange={handleEditChange} required/>
                <textarea name="description" placeholder="Description" value={editCertificate.description} onChange={handleEditChange} />
                <input type="file" name="imageFile" onChange={handleEditChange} accept="image/*" />
                <div className="btn-cont">
                  <button type="submit" className="submit-btn">Update Certificate</button>
                  <button type="button" onClick={() => setShowEdit(false)} className="close-btn">Cancel</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast */}
      <Toast message={toast.message} type={toast.type} />
    </div>
  );
};

export default Certificatedash;
