import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import "./ProjectDetails.css";

// 🔹 تحويل رابط يوتيوب إلى رابط Embeded
const convertToEmbedURL = (url) => {
  if (!url) return "";
  if (url.includes("watch?v=")) return url.replace("watch?v=", "embed/");
  if (url.includes("youtu.be/")) {
    const id = url.split("youtu.be/")[1];
    return `https://www.youtube.com/embed/${id}`;
  }
  return url;
};

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // @ts-ignore
  const API_URL = import.meta.env.VITE_API_URL ;

  // 🔹 جلب بيانات المشروع من السيرفر
  useEffect(() => {
    fetch(`${API_URL}/projects/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("فشل تحميل المشروع");
        return res.json();
      })
      .then((data) => {
        setProject(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  // 🔹 حالة التحميل
  if (loading) return <p className="loading">⏳ جاري تحميل المشروع...</p>;

  // 🔹 حالة الخطأ
  if (error)
    return (
      <div className="errorContainer">
        <h2>❌ {error}</h2>
        <Link to="/">🔙 الرجوع إلى المشاريع</Link>
      </div>
    );

  // 🔹 إذا المشروع غير موجود
  if (!project)
    return (
      <div className="errorContainer">
        <h2>❌ المشروع غير موجود</h2>
        <Link to="/">🔙 الرجوع إلى المشاريع</Link>
      </div>
    );

  return (
    <>
      {/* 🌌 Particles Background */}
      <Particles
        id="particles-js"
        options={{
          background: { color: { value: "transparent" } },
          fpsLimit: 60,
          particles: {
            color: { value: "#3b82f6" },
            links: { enable: true, color: "#3b82f6", distance: 120 },
            collisions: { enable: false },
            move: { enable: true, speed: 2, outModes: "bounce" },
            number: { value: 50, density: { enable: true, area: 800 } },
            opacity: { value: 0.5 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 4 } },
          },
          detectRetina: true,
        }}
      />

      {/* 🔹 تفاصيل المشروع */}
      <section className="project-details">
        {/* 🖼️ Header: الصورة والعنوان */}
        <section className="project-header flex">
          <motion.img
            whileHover={{ scale: 1.05 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            src={project.imgpath}
            alt={project.projectTitle}
            className="project-img-deta"
          />
          <motion.h1
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="project-title"
          >
            {project.projectTitle}
          </motion.h1>
        </section>

        {/* 📖 About Section */}
        <div className="project-about flex">
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="project-desc"
          >
            {project.about}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="project-links flex"
          >
            {project.live && (
              <a href={project.live} target="_blank" rel="noreferrer">
                🌍 Live
              </a>
            )}
            {project.Github && (
              <a href={project.Github} target="_blank" rel="noreferrer">
                💻 GitHub
              </a>
            )}
          </motion.div>
        </div>

        <div className="divider"></div>

        {/* 🎥 Video Section */}
        {project.videoLink ? (
          <section className="video-cont flex">
            <h2>
               {project.projectTitle} <span>Demo</span> 
            </h2>
            <motion.iframe
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              src={convertToEmbedURL(project.videoLink)}
              title={project.projectTitle}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="project-video"
            />
          </section>
        ) : (
          <p className="no-video">🎥 لا يوجد فيديو لهذا المشروع</p>
        )}

        {/* 🔙 Back Button */}
        <Link to="/" className="back-btn">
          Home
        </Link>
      </section>
    </>
  );
};

export default ProjectDetails;
