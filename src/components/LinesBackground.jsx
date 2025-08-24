import React, { useRef, useEffect } from "react";

const LinesBackground = ({ theme = "dark" }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const mouse = { x: null, y: null };
    const particleCount = 80;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: Math.random() * 0.5 - 0.25,
        vy: Math.random() * 0.5 - 0.25,
        radius: Math.random() * 2 + 1
      });
    }

    const animate = () => {
      // الخلفية شفافة حسب الوضع
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const pointColor = theme === "dark" ? "rgba(100,150,255,0.7)" : "rgba(0,0,0,0.7)";
      const lineColorBase = theme === "dark" ? [100,150,255] : [0,0,0];

      // رسم النقاط
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x > canvas.width || p.x < 0) p.vx *= -1;
        if (p.y > canvas.height || p.y < 0) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI*2);
        ctx.fillStyle = pointColor;
        ctx.fill();
      });

      // رسم الخطوط
      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${lineColorBase[0]},${lineColorBase[1]},${lineColorBase[2]},${1 - dist/120})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // تفاعل مع الماوس
      if (mouse.x && mouse.y) {
        particles.forEach(p => {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < 100) {
            p.vx += dx/5000;
            p.vy += dy/5000;
          }
        });
      }

      requestAnimationFrame(animate);
    };

    animate();

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      canvas.style.cursor = "pointer"; // مؤشر الماوس pointer
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
        position:"fixed",
        top:0,
        left:0,
        width:"100%",
        height:"100%",
        zIndex:-1,
        pointerEvents:"none" // عشان عناصر الموقع تتفاعل مع الماوس
      }}
    />
  );
};

export default LinesBackground;
