import React, { useState } from "react";
import './course.css';
import { Link, useParams } from "react-router-dom";
import { mycourse } from "./mycourse";
import { AnimatePresence, motion } from "framer-motion";
import { useForm, ValidationError } from '@formspree/react';

const MyCourses = ({ excludeId = false }) => {
    const { id } = useParams();
    const [currenActive, setCurrentActive] = useState("All Courses");
    const [showForm, setShowForm] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState('');

    // Formspree setup
    const [state, handleSubmit] = useForm("xkgbrqvv");

    const categories = ["All Courses", "HTML", "CSS", "JAVA SCRIPT", "DATA BASE", "REACT"];

    const filterCourses = (category) => {
        setCurrentActive(category);

        let filtered = mycourse;

        if (category !== "All Courses") {
            filtered = filtered.filter((item) =>
                item.courseTitle === category
            );
        }

        if (excludeId && id) {
            filtered = filtered.filter((p) => p.id !== Number(id));
        }

        return filtered;
    };

    const [arr, setArr] = useState(() => filterCourses("All Courses"));

    const handleClic = (category) => {
        const filtered = filterCourses(category);
        setArr(filtered);
    };

    const openForm = (courseTitle) => {
        setSelectedCourse(courseTitle);
        setShowForm(true);
    };

    return (
        <main className="flex">

            {/* الأزرار */}
            <section className="left-sec flex">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => handleClic(cat)}
                        className={currenActive === cat ? "Active" : ""}
                    >
                        {cat}
                    </button>
                ))}
            </section>

            {/* الكورسات */}
            <section className="flex right-sec">

                <AnimatePresence>
                    {arr.map((item) => (
                        <motion.article
                            layout
                            initial={{ transform: "scale(0)" }}
                            animate={{ transform: "scale(1)" }}
                            transition={{ type: "spring", damping: 8, stiffness: 60 }}
                            className="card"
                            key={item.id}
                        >
                            <img width={266} src={item.CourseImg} alt={item.courseTitle} />
                            <div style={{ width: "266px" }} className="box">
                                <h1 className="title">{item.courseTitle}</h1>
                                <br />
                                <div className="flex icons">
                                    <div style={{ gap: "11px" }} className="flex">
                                        <a href={item.tele} target="_blank" rel="noopener noreferrer">
                                            <div className="icon-telegram"></div>
                                        </a>
                                        <a href={item.whats} target="_blank" rel="noopener noreferrer">
                                            <div className="icon-whatsapp"></div>
                                        </a>
                                    </div>
                                    <button className="link flex" style={{color:'var(--blue)', font:"bold"}} onClick={() => openForm(item.courseTitle)}>
                                        Register
                                        <span className="icon-arrow-right" />
                                    </button>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </AnimatePresence>
            </section>

            {/* الفورم */}
            {showForm && (
                <div className="form-overlay">
                    <div className="form-container">
                        <h2>Register for {selectedCourse} Course</h2>
                        <form onSubmit={handleSubmit}>

                            <input
                                type="text"
                                name="Name"
                                placeholder="Your Name"
                                required
                            />
                            <ValidationError
                                prefix="Name"
                                field="Name"
                                errors={state.errors}
                            />

                            <input
                                type="text"
                                name="Phone"
                                placeholder="Phone Number"
                                required
                            />
                            <ValidationError
                                prefix="Phone"
                                field="Phone"
                                errors={state.errors}
                            />

                            <input
                                type="email"
                                name="Email"
                                placeholder="Your Email"
                                required
                            />
                            <ValidationError
                                prefix="Email"
                                field="Email"
                                errors={state.errors}
                            />

                            {/* الكورس المختار */}
                            <input
                                type="hidden"
                                name="Course"
                                value={selectedCourse}
                            />

                            <button type="submit" disabled={state.submitting}>
                                {state.submitting ? "Submitting..." : "Submit"}
                            </button>

                            {state.succeeded && (
                                <p style={{ marginTop: "20px", color: "green" }}>
                                    Thanks for registering in {selectedCourse} ! We'll contact you soon.
                                </p>
                            )}
                        </form>

                        <button onClick={() => setShowForm(false)} style={{ marginTop: "15px", color: "whate" }}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
};

export default MyCourses;
