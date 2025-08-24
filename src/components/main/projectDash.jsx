import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import './dash.css';

const ProjectDash = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
// @ts-ignore
const API_URL = import.meta.env.VITE_API_URL ;
  const [newProject, setNewProject] = useState({
    projectTitle: "",
    category: "",
    about: "",
    imgFile: null,
    live: "",
    Github: "",
    videoLink: "",
  });

  const [editProject, setEditProject] = useState(null);

  // 🔹 جلب المشاريع
  useEffect(() => {
    fetch(`${API_URL}/projects`)
      .then(res => res.json())
      .then(data => {
        setProjects(data);
        setLoading(false);
      });
  }, []);

  // 🔹 تحديث FormData
  const createFormData = (project) => {
    const formData = new FormData();
    Object.keys(project).forEach(key => {
      if (project[key] !== null && project[key] !== undefined) {
        formData.append(key, project[key]);
      }
    });
    return formData;
  };

  // 🔹 إضافة مشروع
  const handleAddChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imgFile") setNewProject(prev => ({ ...prev, imgFile: files[0] }));
    else setNewProject(prev => ({ ...prev, [name]: value }));
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = createFormData(newProject);
      const res = await fetch(`${API_URL}/projects`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Failed to add project");
      const data = await res.json();
      setProjects([...projects, data]);
      setShowAdd(false);
      setNewProject({ projectTitle: "", category: "", about: "", imgFile: null, live: "", Github: "", videoLink: "" });
    } catch (err) {
      console.error(err);
      alert("Error adding project");
    }
  };

  // 🔹 تعديل مشروع
  const handleEditChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imgFile") setEditProject(prev => ({ ...prev, imgFile: files[0] }));
    else setEditProject(prev => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
  e.preventDefault();
  try {
    const formData = new FormData();

    Object.keys(editProject).forEach(key => {
      let value = editProject[key];

      // لو key هو category (array) حنحوله string
      if (key === 'category' && Array.isArray(value)) {
        value = value.join(',');
      }

      if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });

    const res = await fetch(`${API_URL}/projects/${editProject._id}`, {
      method: "PUT",
      body: formData,
    });

    if (!res.ok) throw new Error("Failed to update project");
    const data = await res.json();

    // تحديث المشروع في state
    setProjects(projects.map(p => p._id === data._id ? data : p));
    setShowEdit(false);
    setEditProject(null);

  } catch (err) {
    console.error(err);
    alert("Error updating project");
  }
};


  // 🔹 حذف مشروع
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    await fetch(`${API_URL}/projects/${id}`, { method: "DELETE" });
    setProjects(projects.filter(p => p._id !== id));
  };

  if (loading) return <p className="loading">Loading...</p>;

  return (
    <div className="dashboard">
      <h2 className="dash-title">Projects Dashboard</h2>
      <button className="add-btn" onClick={() => setShowAdd(true)}>➕ Add Project</button>

      <div className="projects-grid">
        {projects.map(project => (
          <motion.div key={project._id} className="project-card" whileHover={{ scale: 1.05 }}>
            <img src={project.imgpath} alt={project.projectTitle} className="project-img" />
            <h3>{project.projectTitle}</h3>
            <p className="project-cat">{project.category.join(", ")}</p>
            <div className="project-actions">
              <button onClick={() => setSelectedProject(project)}>View</button>
              <button onClick={() => { setEditProject(project); setShowEdit(true); }}>Edit</button>
              <button onClick={() => handleDelete(project._id)}>Delete</button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div className="modal-overlay" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>
            <motion.div className="modal-content" initial={{ scale:0 }} animate={{ scale:1 }} exit={{ scale:0 }}>
              <h2>{selectedProject.projectTitle}</h2>
              <p><strong>Category:</strong> {selectedProject.category.join(", ")}</p>
              <p><strong>About:</strong> {selectedProject.about}</p>
              {selectedProject.live && <p><strong>Live:</strong> <a href={selectedProject.live} target="_blank">{selectedProject.live}</a></p>}
              {selectedProject.Github && <p><strong>Github:</strong> <a href={selectedProject.Github} target="_blank">{selectedProject.Github}</a></p>}
              {selectedProject.videoLink && <iframe width="100%" height="250" src={selectedProject.videoLink} title="Video" />}
              <button onClick={() => setSelectedProject(null)} className="close-btn">Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Modal */}
      <AnimatePresence>
        {showAdd && (
          <motion.div className="modal-overlay" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>
            <motion.div className="modal-content" initial={{ scale:0 }} animate={{ scale:1 }} exit={{ scale:0 }}>
              <h3>Add New Project</h3>
              <form onSubmit={handleAddSubmit} className="add-form">
                <input name="projectTitle" placeholder="Title" value={newProject.projectTitle} onChange={handleAddChange} required/>
                <input name="category" placeholder="Category (comma separated)" value={newProject.category} onChange={handleAddChange} />
                <textarea name="about" placeholder="About" value={newProject.about} onChange={handleAddChange} />
                <input type="file" name="imgFile" onChange={handleAddChange} accept="image/*" />
                <input name="live" placeholder="Live URL" value={newProject.live} onChange={handleAddChange} />
                <input name="Github" placeholder="Github URL" value={newProject.Github} onChange={handleAddChange} />
                <input name="videoLink" placeholder="Video Link" value={newProject.videoLink} onChange={handleAddChange} />
                <button type="submit" className="submit-btn">Add Project</button>
                <button type="button" onClick={() => setShowAdd(false)} className="close-btn">Cancel</button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Modal */}
      <AnimatePresence>
        {showEdit && editProject && (
          <motion.div className="modal-overlay" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>
            <motion.div className="modal-content" initial={{ scale:0 }} animate={{ scale:1 }} exit={{ scale:0 }}>
              <h3>Edit Project</h3>
              <form onSubmit={handleEditSubmit} className="add-form">
                <input name="projectTitle" placeholder="Title" value={editProject.projectTitle} onChange={handleEditChange} required/>
                <input name="category" placeholder="Category (comma separated)" value={editProject.category.join ? editProject.category.join(", ") : editProject.category} onChange={handleEditChange} />
                <textarea name="about" placeholder="About" value={editProject.about} onChange={handleEditChange} />
                <input type="file" name="imgFile" onChange={handleEditChange} accept="image/*" />
                <input name="live" placeholder="Live URL" value={editProject.live} onChange={handleEditChange} />
                <input name="Github" placeholder="Github URL" value={editProject.Github} onChange={handleEditChange} />
                <input name="videoLink" placeholder="Video Link" value={editProject.videoLink} onChange={handleEditChange} />
                <button type="submit" className="submit-btn">Update Project</button>
                <button type="button" onClick={() => setShowEdit(false)} className="close-btn">Cancel</button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectDash;
