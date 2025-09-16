/* eslint-disable no-unused-vars */
// @ts-nocheck
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { AnimatePresence , motion } from "framer-motion";
import "./main.css";

const Projects = ({ excludeId = false }) => {
  const { id } = useParams();

  // ✅ State
  const [currenActive, setCurrentActive] = useState("all");
  const [projects, setProjects] = useState([]); // all projects
  const [arr, setArr] = useState([]);           // filtered projects

  const API_URL = import.meta.env.VITE_API_URL;

  // ✅ Fetch projects from API
  useEffect(() => {
    fetch(`${API_URL}/projects`)
      .then((res) => res.json())
      .then((data) => {
        const filtered = excludeId && id
          ? data.filter((p) => p._id !== id)
          : data;

        setProjects(data);
        setArr(filtered);
      })
      .catch((err) => console.error("❌ API Error:", err));
  }, [excludeId, id]);

  // ✅ Filter by category
  const handleClick = (category) => {
    setCurrentActive(category);

    let filtered = category === "all"
      ? projects
      : projects.filter((item) => item.category.includes(category));

    if (excludeId && id) {
      filtered = filtered.filter((p) => p._id !== id);
    }

    setArr(filtered);
  };

  // ✅ Categories list
  const categories = [
    { key: "all", label: "All projects" },
    { key: "css", label: "HTML & CSS" },
    { key: "react", label: "React JS" },
    { key: "full stack", label: "Full Stack" },
  ];

  return (
    <main className="flex">
      {/* Filter buttons */}
      <section className="left-sec flex" id="#projects">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => handleClick(cat.key)}
            className={currenActive === cat.key ? "Active" : null}
          >
            {cat.label}
          </button>
        ))}
      </section>

      {/* Projects grid */}
      <section className="flex right-sec" id="projects">
        <AnimatePresence>
          {arr.map((item) => (
            <motion.article
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ type: "spring", damping: 15, stiffness: 120 }}
              className="card"
              key={item._id}
            >
              {/* Project image */}
              <div className="card-img">
                <img src={item.imgpath} alt={item.projectTitle} />
              </div>

              {/* Project content */}
              <div className="card-content">
                <h1 className="card-title">{item.projectTitle}</h1>
                <p className="card-subtitle">{item.about}</p>

                {/* Footer with links */}
                <div className="card-footer">
                  <div className="links">
                    <a href={item.live} target="_blank" rel="noopener noreferrer">
                      <div className="icon-link"></div>
                    </a>
                    <a href={item.Github} target="_blank" rel="noopener noreferrer">
                      <div className="icon-github"></div>
                    </a>
                  </div>

                  {/* More details link */}
                  <Link className="more-link" to={`/project/${item._id}`}>
                    More
                    <span className="icon-arrow-right" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </section>
    </main>
  );
};

export default Projects;
