// @ts-nocheck
import React, { useState } from "react";
import './add.css'
const AddProjects = () => {
  const [formData, setFormData] = useState({
    id: "",
    projectTitle: "",
    category: "",
    about: "",
    imgpath: "",
    live: "",
    Github: "",
    videoLink: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:3000/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        projectTitle: formData.projectTitle,
        category: formData.category.split(",").map(c => c.trim()), // حول النص لمصفوفة
        about: formData.about,
        imgpath: formData.imgpath,
        live: formData.live,
        Github: formData.Github,
        videoLink: formData.videoLink,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to add project");
    }

    const data = await response.json();
    console.log("Project added:", data);

    // إعادة تعيين الفورم
    setFormData({
      id: "",
      projectTitle: "",
      category: "",
      about: "",
      imgpath: "",
      live: "",
      Github: "",
      videoLink: "",
    });

    alert("Project added successfully ✅");
  } catch (error) {
    console.error(error);
    alert("Error adding project ❌");
  }
};


  return (
    <div className="add-projects-container">
      <h2 className="form-title">➕ Add New Project</h2>

      <form onSubmit={handleSubmit} className="form-box">
        <div className="form-group">
          <label>ID</label>
          <input
            type="number"
            name="id"
            value={formData.id}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Project Title</label>
          <input
            type="text"
            name="projectTitle"
            value={formData.projectTitle}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>About</label>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
            rows="4"
          />
        </div>

        <div className="form-group">
          <label>Image Path</label>
          <input
            type="text"
            name="imgpath"
            value={formData.imgpath}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Live Link</label>
          <input
            type="url"
            name="live"
            value={formData.live}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Github Link</label>
          <input
            type="url"
            name="Github"
            value={formData.Github}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Video Link</label>
          <input
            type="url"
            name="videoLink"
            value={formData.videoLink}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="submit-btn">Add Project</button>
      </form>
    </div>
  );
};

export default AddProjects;
