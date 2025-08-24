import React, { useState, useEffect } from "react";
import "./header.css";

const Header = () => {
  const [showModel, setShowModel] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("currentMode") ?? "dark");

  // ✅ تطبيق الثيم
  useEffect(() => {
    if (theme === "light") {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    }
  }, [theme]);

  // ✅ روابط التنقل
  const links = [
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
    { href: "/admindash", label: "Dashboard" },
  ];

  return (
    <header className="flex" style={{ direction: "rtl" }}>
      {/* زر القائمة */}
      <button
        onClick={() => setShowModel(true)}
        className="menu icon-menu flex"
      ></button>

      {/* الناف بار */}
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
      <button
        onClick={() => {
          const newTheme = theme === "dark" ? "light" : "dark";
          localStorage.setItem("currentMode", newTheme);
          setTheme(newTheme);
        }}
        className="mode flex"
      >
        {theme === "dark" ? (
          <span className="icon-moon-o"></span>
        ) : (
          <span className="icon-sun"></span>
        )}
      </button>

      {/* الموديل (الموبايل منيو) */}
      {showModel && (
        <div className="fixed">
          <ul className="model">
            <li>
              <button
                className="icon-clear"
                onClick={() => setShowModel(false)}
              />
            </li>
            {links.map((link, i) => (
              <li key={i}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
