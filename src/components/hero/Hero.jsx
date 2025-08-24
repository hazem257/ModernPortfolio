import React, { useEffect, useRef } from "react";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import Typed from "typed.js";   // 👈 مهم
import HackerAnim from "../../../public/animation/hacker.json";
import "./hero.css";

const Hero = () => {
  const lottieRef = useRef(null);
  const typedRef = useRef(null);

  useEffect(() => {
    // تشغيل الأنيميشن بتاع الكتابة
    const typed = new Typed(typedRef.current, {
      strings: ["Designer .", "Youtuber .", "Developer .", "Cyber Security Engineer ."],
      loop: true,
      typeSpeed: 100,
      backSpeed: 80,
      backDelay: 2000,
    });

    return () => {
      typed.destroy(); // تنظيف عند إلغاء المكون
    };
  }, []);

  return (
    <section className="hero flex">
      <div className="left-sec">
        <div className="parent-avatar flex">
          <motion.img
            initial={{ scale: 0 }}
            animate={{ scale: 1.1 }}
            transition={{ damping: 7, type: "spring", stiffness: 100 }}
            className="avatar"
            src="./hazem1.png"
            alt="avatar"
          />
          <div className="icon-verified"></div>
        </div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="title"
          style={{fontFamily:"Poppins"}}
        >
          <span ref={typedRef}></span> {/* 👈 هنا الكتابة المتحركة */}
        </motion.h1>

      <p className="subtitle">
  I'm Hazem Gamal, a Full Stack Developer, Cyber Security Engineer, 
  and Founder of Dragon, a startup software company.
</p>


        <div className="all-icons flex">
          <a href=""><div className="icon icon-twitter"></div></a>
          <a href="https://www.instagram.com/h_a_z_e_m_g_m_a_l_l/"><div className="icon icon-instagram"></div></a>
          <a href="https://github.com/hazem257"><div className="icon icon-github"></div></a>
          <a href="https://www.linkedin.com/in/hazemgmall/ "><div className="icon icon-linkedin"></div></a>
           <a href="https://www.youtube.com/@hz_deve"><div className=" icon fa-brands fa-youtube"></div></a>
        </div>
      </div>

      <div className="right-sec animation">
        <Lottie
          lottieRef={lottieRef}
          className="contact-anim"
          style={{ height: 400 }}
          onLoadedImages={() => {
            if (lottieRef.current) {
              lottieRef.current.setSpeed(0.55); // 👈 عندك مكتوبة setSpaed بالغلط
            }
          }}
          animationData={HackerAnim}
        />
      </div>
    </section>
  );
};

export default Hero;
