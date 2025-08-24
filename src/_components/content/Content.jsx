import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import "./content.css";

// استيراد بيانات الدروس - تأكد إن المسار صحيح وملف contentVeiw.js يصدر gradesData
import { gradesData } from "./contentVeiw";

/** مساعدة لاستخراج YouTube ID من أنواع URL مختلفة */
const getYouTubeId = (url) => {
  if (!url) return null;
  const m = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|.*[?&]v=)|youtu\.be\/)([A-Za-z0-9_\-]{6,})/
  );
  return m ? m[1] : null;
};

const Content = () => {
  const { gradeId } = useParams();
  const key = String(gradeId || "1");

  // جلب الدروس من gradesData (لو مفيش => مصفوفة فاضية)
  const rawLessons = gradesData[key] || [];

  // إزالة التكرار على أساس videoId (لو في نفس الفيديو اتكرر)
  const lessons = useMemo(() => {
    const map = new Map();
    rawLessons.forEach((l) => {
      const id = getYouTubeId(l.url) || l.url;
      if (!map.has(id)) map.set(id, { ...l, videoId: id });
    });
    return Array.from(map.values());
  }, [rawLessons]);

  const [currentLesson, setCurrentLesson] = useState(null);

  // نحدّث الدرس الحالي كلما تغيّرت الدروس أو gradeId
  useEffect(() => {
    if (lessons.length) setCurrentLesson(lessons[0]);
    else setCurrentLesson(null);
  }, [gradeId, lessons]);

  // UI لو مفيش دروس
  if (!lessons.length) {
    return (
      <div className="content-page" dir="rtl">
        <div className="lessons-list">
          <h3>دروس الصف {gradeId}</h3>
          <p>لا يوجد دروس لهذا الصف.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="content-page" dir="rtl">
      <aside className="lessons-list">
        <h3>محتوى {lessons[0]?.grade}</h3>
       {lessons.map((lesson) =>
  lesson.thumbnail && lesson.title ? (
    <li
      key={lesson.videoId}
      className={currentLesson && lesson.videoId === currentLesson.videoId ? "active" : ""}
      onClick={() => setCurrentLesson(lesson)}
    >
      <img src={lesson.thumbnail} alt={lesson.title} />
      <div className="meta">
        <span className="title">{lesson.title}</span>
      </div>
    </li>
  ) : null
)}

      </aside>

      <main className="video-player">
        {currentLesson ? (
          <>
            <h2 className="lesson-heading">{currentLesson.title}</h2>
            <div
              className="player-wrapper"
              style={{ position: "relative", paddingTop: "56.25%" }} // نسبة 16:9
            >
             <iframe
  key={currentLesson.videoId}
  src={`https://www.youtube.com/embed/${currentLesson.videoId}?modestbranding=1&rel=0&autoplay=1`}
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
  title={currentLesson.title}
  style={{
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  }}
/>

            </div>
          </>
        ) : (
          <p>اختر درساً لعرضه</p>
        )}
      </main>
    </div>
  );
};

export default Content;
