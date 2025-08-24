import React, { useRef, useEffect } from "react";

const LinesBackground = ({ theme = "dark" }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const dpr = window.devicePixelRatio || 1;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particleCount = window.innerWidth < 768 ? 30 : 50; // أخف على الأداء
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.7, // أسرع شوي
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 2 + 1
      });
    }

    const mouse = { x: null, y: null };

    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const pointColor =
        theme === "dark" ? "rgba(100,150,255,0.7)" : "rgba(0,0,0,0.7)";
      const lineColorBase = theme === "dark" ? [100, 150, 255] : [0, 0, 0];

      // تحديث مواقع الجزيئات
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x > window.innerWidth || p.x < 0) p.vx *= -1;
        if (p.y > window.innerHeight || p.y < 0) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = pointColor;
        ctx.fill();
      });

      // رسم الخطوط فقط للجزيئات القريبة
      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = dx * dx + dy * dy; // تربيع المسافة لتقليل sqrt

          if (dist < 120 * 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${lineColorBase[0]},${lineColorBase[1]},${lineColorBase[2]},${
              1 - Math.sqrt(dist) / 120
            })`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // تأثير الماوس خفيف
      if (mouse.x !== null && mouse.y !== null) {
        particles.forEach((p) => {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = dx * dx + dy * dy;
          if (dist < 100 * 100) {
            p.vx += dx / 10000; // أقل تأثير
            p.vy += dy / 10000;
          }
        });
      }

      requestAnimationFrame(animate);
    };

    animate();

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -10,
        pointerEvents: "none",
      }}
    />
  );
};

export default LinesBackground;
