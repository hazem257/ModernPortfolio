import React, { useState, useEffect } from "react";
import "./header.css";

const Header = () => {
  const [showModel, setShowModel] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("currentMode") ?? "dark");

  // ✅ تطبيق الثيم
  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
  }, [theme]);

  // ✅ روابط التنقل
  const links = [
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
    { href: "/admindash", label: "Dashboard" },
  ];

  // ✅ تغيير الثيم
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    localStorage.setItem("currentMode", newTheme);
    setTheme(newTheme);
  };

  return (
    <header className="flex">
      {/* زر القائمة (يظهر في الموبايل فقط) */}
      <button
        onClick={() => setShowModel(true)}
        className="menu icon-menu flex"
      />

      {/* الناف بار (يختفي في الموبايل) */}
      <nav>
        <ul className="flex">
          {links.map((link, i) => (
            <li key={i}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      </nav>

      {/* زر تغيير الثيم */}
      <button onClick={toggleTheme} className="mode flex">
        {theme === "dark" ? (
          <span className="icon-moon-o"></span>
        ) : (
          <span className="icon-sun"></span>
        )}
      </button>

      {/* المينيو الجانبية (موبايل/تابلت) */}
      {showModel && (
        <div className="fixed" onClick={() => setShowModel(false)}>
          <ul
            className="model"
            onClick={(e) => e.stopPropagation()} // علشان ما يقفلش لو دوست جوا
          >
            <li className="close-btn">
              <button
                className="icon-clear"
                onClick={() => setShowModel(false)}
              />
            </li>
            {links.map((link, i) => (
              <li key={i}>
                <a href={link.href} onClick={() => setShowModel(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
