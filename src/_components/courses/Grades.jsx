import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom'; // ✅ إضافة Link
import './course.css';

const Grades = () => {
  const [activeStage, setActiveStage] = useState("اعدادي");
  const [visibleCount, setVisibleCount] = useState(3);
  const [tiltData, setTiltData] = useState({});

  const allCourses = [
    { id: 1, title: "الصف الاول الاعدادي", stage: "اعدادي", img: "./1.jpg", link: `1` },
    { id: 2, title: "الصف الثاني الاعدادي", stage: "اعدادي", img: "./3702823.jpg", link: `2` },
    { id: 3, title: "الصف الثالث الاعدادي", stage: "اعدادي", img: "./de1.jpg", link: `3` },
    { id: 4, title: "الصف الاول الثانوي", stage: "ثانوي", img: "./de2.jpg", link: `th1` },
    { id: 5, title: "الصف الثاني الثانوي", stage: "ثانوي", img: "./de3.jpg", link: `th2` },
    { id: 6, title: "الصف الثالث الثانوي", stage: "ثانوي", img: "./3359732.jpg", link: `th3` },
  ];

  const filteredCourses = allCourses.filter(course => course.stage === activeStage);
  const visibleCourses = filteredCourses.slice(0, visibleCount);

  const handleShowMore = () => setVisibleCount(prev => prev + 3);
  const resetVisibleCount = () => setVisibleCount(3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
  };

  const handleMouseMove = (e, id) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    const rotateX = (y - 0.5) * 15;
    const rotateY = (x - 0.5) * -15;

    setTiltData(prev => ({
      ...prev,
      [id]: { rotateX, rotateY, glowX: x * 100, glowY: y * 100 }
    }));
  };

  const handleMouseLeave = (id) => {
    setTiltData(prev => ({
      ...prev,
      [id]: { rotateX: 0, rotateY: 0, glowX: 50, glowY: 50 }
    }));
  };

  return (
    <section className="courses" style={{ direction: "rtl" }}>
      <h2>المراحل التعليمية</h2>

      <div className="cont-key">
        <button
          className={activeStage === "اعدادي" ? "Active" : "notActive"}
          onClick={() => { setActiveStage("اعدادي"); resetVisibleCount(); }}
        >
          المرحلة الإعدادية
        </button>
        <button
          className={activeStage === "ثانوي" ? "Active" : "notActive"}
          onClick={() => { setActiveStage("ثانوي"); resetVisibleCount(); }}
        >
          المرحلة الثانوية
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeStage + visibleCount}
          className="course-container"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {visibleCourses.map(course => {
            const tilt = tiltData[course.id] || { rotateX: 0, rotateY: 0, glowX: 50, glowY: 50 };

            return (
              <motion.div
                key={course.id}
                className="course-item"
                variants={cardVariants}
                style={{
                  transformStyle: "preserve-3d",
                  background: `radial-gradient(circle at ${tilt.glowX}% ${tilt.glowY}%, rgba(255,255,255,0.4), transparent)`,
                }}
                onMouseMove={(e) => handleMouseMove(e, course.id)}
                onMouseLeave={() => handleMouseLeave(course.id)}
                animate={{
                  rotateX: tilt.rotateX,
                  rotateY: tilt.rotateY,
                }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <img className="course-img" src={course.img} alt={course.title} loading="lazy" />
                <h3>{course.title}</h3>
                {/* /grade/gradeId */}
                <Link to={`/grade/${course.link}`}>صفحة المحتوى</Link>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {visibleCount < filteredCourses.length && (
        <motion.button
          className="show-more-btn"
          onClick={handleShowMore}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          عرض المزيد
        </motion.button>
      )}
    </section>
  );
};

export default Grades;
