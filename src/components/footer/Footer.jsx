import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin, FaGithub, FaYoutube } from "react-icons/fa";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer flex">
      {/* Links Section */}
      <div className="footer-links">
        <ul className="flex">
          <li><a href="#about">About</a></li>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#projects">Projects</a></li>
          <li><a href="#certificates">Certificates</a></li>
          <li>
            <a
              href="https://api.whatsapp.com/send?phone=201025547663"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact
            </a>
          </li>
        </ul>
      </div>

      {/* Social Media Section */}
      <div className="social-icons flex">
        <a
          href="https://www.facebook.com/hazemgm21"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook />
        </a>

        <a
          href="https://www.instagram.com/hazemgm21"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram />
        </a>
        <a
          href="https://www.linkedin.com/in/hazemgmall/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://github.com/hazem257"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub />
        </a>
        <a
        href="https://www.youtube.com/@hz_deve"
        target="_blank"
        rel="noopener noreferrer"
        
        >
          <FaYoutube/>  
        </a>
      </div>

      {/* Copyright */}
      <p className="copyright">
        © {new Date().getFullYear()} Hazem Gamal. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
