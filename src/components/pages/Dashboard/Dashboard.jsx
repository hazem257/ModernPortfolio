import React, { useEffect, useState } from "react";
import "./dashboard.css";
import { PlusCircle, Folder, Award } from "lucide-react";

const Dashboard = () => {
  const [projectsCount, setProjectsCount] = useState(null);
  const [certificatesCount, setCertificatesCount] = useState(null);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [error, setError] = useState(null);

  const API_URL = "http://localhost:3000";

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // ✅ جلب عدد المشاريع والشهادات
        const statsRes = await fetch(`${API_URL}/stats`);
        if (!statsRes.ok) throw new Error("Failed to fetch stats");
        const statsData = await statsRes.json();
        setProjectsCount(statsData.projectsCount);
        setCertificatesCount(statsData.certificatesCount);

        // ✅ جلب آخر 5 مشاريع
        const projectsRes = await fetch(`${API_URL}/projects`);
        if (!projectsRes.ok) throw new Error("Failed to fetch projects");
        const projectsData = await projectsRes.json();
        setProjects(projectsData.slice(-5).reverse()); // آخر 5 مشاريع

        // ✅ جلب آخر 5 شهادات
        const certsRes = await fetch(`${API_URL}/certificates`);
        if (!certsRes.ok) throw new Error("Failed to fetch certificates");
        const certsData = await certsRes.json();
        setCertificates(certsData.slice(-5).reverse()); // آخر 5 شهادات
      } catch (err) {
        console.error(err);
        setError("⚠️ Error loading stats");
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="dashboard">
      {/* Top Section - Stats */}
      <div className="stats">
        <div className="card">
          <Folder size={32} />
          <h3>Projects</h3>
          {error ? (
            <p className="number error">{error}</p>
          ) : projectsCount === null ? (
            <p className="number">Loading...</p>
          ) : (
            <p className="number">{projectsCount}</p>
          )}
          <a href="/projectDash" className="btn">
            <PlusCircle size={18} />  Projects
          </a>
        </div>

        <div className="card">
          <Award size={32} />
          <h3>Certificates</h3>
          {error ? (
            <p className="number error">{error}</p>
          ) : certificatesCount === null ? (
            <p className="number">Loading...</p>
          ) : (
            <p className="number">{certificatesCount}</p>
          )}
          <a href="/certificatedash" className="btn">
            <PlusCircle size={18} /> Certificate
          </a>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="view">
        <h2>Overview</h2>
        <div className="grid">
          {projects.map((p) => (
            <div key={p._id} className="item">
              📂 {p.projectTitle || "Untitled Project"}
            </div>
          ))}
          {certificates.map((c) => (
            <div key={c._id} className="item">
              🏅 {c.title || "Untitled Certificate"}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
