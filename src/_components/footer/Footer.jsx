import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="custom-footer fade-in-up">
      <div className="footer-container">
        <div className="footer-left fade-in-up fade-delay-1">
          <img src="/E1.png" alt="Logo" className="footer-logo" />
          <p className="footer-copy">جميع الحقوق محفوظة © 2025 لدى <a href="/" className="footer-brand-link">المارد</a></p>
          <p className="footer-copy">
            Designed & Developed by:{" "}
            <a
              href="https://www.facebook.com/hazemgm21"
              className="footer-brand-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Hazem Gamal
            </a>
          </p>
        </div>

        <div className="footer-right">
          <div className="footer-column fade-in-up fade-delay-2">
            <h4>الصفحات</h4>
            <a href="/home">الرئيسية</a>
            <a href="/help">المساعدة</a>
            <a href="/register">إنشاء حساب</a>
            <a href="/login">تسجيل الدخول</a>
          </div>

          <div className="footer-column fade-in-up fade-delay-3">
            <h4>السوشيال ميديا</h4>
            <a
              href="https://www.facebook.com/hazemgm21/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-item"
            >
              <img src="/facebook.svg" alt="Facebook" className="icon" />
              فيسبوك
            </a>
            <a
              href="https://www.instagram.com/hazemgm21/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-item"
            >
              <img src="/insta.svg" alt="Instagram" className="icon" />
              انستجرام
            </a>
            <a
              href="https://www.youtube.com/@hz_deve"
              target="_blank"
              rel="noopener noreferrer"
              className="social-item"
            >
              <img src="/youtube.svg" alt="YouTube" className="icon" />
              يوتيوب
            </a>
            <a
              href="https://www.linkedin.com/in/hazemgamal"
              target="_blank"
              rel="noopener noreferrer"
              className="social-item"
            >
              <img src="/link.svg" alt="LinkedIn" className="icon" />
              لينكد إن
            </a>
          </div>

          <div className="footer-column fade-in-up fade-delay-4">
            <h4>تواصل معنا</h4>
            <a href="https://api.whatsapp.com/send?phone=201159655999">واتساب</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
