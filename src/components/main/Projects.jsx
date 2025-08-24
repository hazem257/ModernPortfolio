// @ts-nocheck
import React, { useState, useEffect } from "react";
import './main.css';
import { Link, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const Projects = ({ excludeId = false }) => {
  const { id } = useParams();
  const [currenActive, setCurrentActive] = useState("all");
  const [projects, setProjects] = useState([]); // البيانات من API
  const [arr, setArr] = useState([]);           // البيانات المعروضة بعد الفلترة
const API_URL = import.meta.env.VITE_API_URL ;
  // 🟢 تجيب المشاريع من NestJS API
  useEffect(() => {
    fetch(`${API_URL}/projects`)
      .then((res) => res.json())
      .then((data) => {
        let filtered = excludeId && id
          ? data.filter((p) => p._id !== id) 
          : data;
        setProjects(data);
        setArr(filtered);
      })
      .catch((err) => console.error(err));
  }, [excludeId, id]);

  const handleClic = (category) => {
    setCurrentActive(category);
    let filtered = projects;

    if (category !== "all") {
      filtered = filtered.filter((item) =>
        item.category.includes(category)
      );
    }

    if (excludeId && id) {
      filtered = filtered.filter((p) => p._id !== id);
    }

    setArr(filtered);
  };

  return (
    <main className="flex">
      {/* الأزرار */}
      <section className="left-sec flex" id="#projects">
        {["all", "css", "react", "full stack"].map((cat) => (
          <button
            key={cat}
            onClick={() => handleClic(cat)}
            className={currenActive === cat ? "Active" : null}
          >
            {cat === "css" ? "html & CSS" : cat === "full stack" ? "Full Stack" : cat === "all" ? "All projects" : "React JS"}
          </button>
        ))}
      </section>

      {/* Projects */}
      <section className="flex right-sec">
        <AnimatePresence>
          {arr.map((item) => (
            <motion.article
              layout
              initial={{ transform: "scale(0)" }}
              animate={{ transform: "scale(1)" }}
              transition={{ type: "spring", damping: 8, stiffness: 60 }}
              className="card" key={item._id}>
              <img width={266} src={item.imgpath} alt={item.projectTitle} />
              <div style={{ width: "266px" }} className="box">
                <h1 className="title1">{item.projectTitle}</h1>
                <p className="subtitle">{item.about}</p>
                <div className="flex icons">
                  <div style={{ gap: "11px" }} className="flex">
                    <a href={item.live} target="_blank" rel="noopener noreferrer">
                      <div className="icon-link"></div>
                    </a>
                    <a href={item.Github} target="_blank" rel="noopener noreferrer">
                      <div className="icon-github"></div>
                    </a>
                  </div>
                  <Link className="link flex" to={`/project/${item._id}`}>
                    more
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
