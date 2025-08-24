import React, { useState, useEffect } from "react";
import "./head.css";

const HeaderProSimple = () => {
  const [theme, setTheme] = useState(localStorage.getItem("currentMode") ?? "dark");

  // تطبيق الثيم
  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
  }, [theme]);

  // تبديل الثيم
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    localStorage.setItem("currentMode", newTheme);
    setTheme(newTheme);
  };

  // زر العودة للهوم
  const goHome = () => {
    window.location.href = "/";
  };

  return (
    <header className="header-pro-simple flex-container">
      {/* زر العودة للهوم */}
      <button onClick={goHome} className="header-home-btn">
        Home
      </button>

      {/* زر تغيير الثيم */}
      <button onClick={toggleTheme} className="header-theme-btn">
        {theme === "dark" ? (
          <span className="icon-moon-o"></span>
        ) : (
          <span className="icon-sun"></span>
        )}
      </button>
    </header>
  );
};

export default HeaderProSimple;
