import React, { useState, useEffect } from "react";
import Loading from "./components/pages/Loading";
import Header from './components/header/Header';
import Hero from './components/hero/Hero';
import Contact from './components/contact/Contact';
import Footer from './components/footer/Footer';
import Projects from './components/main/Projects';
import About from './components/about/About';
import Experience from './components/experience/Experience';
import ProjectDetails from "./components/main/ProjectDetails";
import AddProjects from "./components/main/addProjects";
import ProjectDash from './components/main/projectDash';
import HeaderProSimple from "./components/header/HeaderProSimple";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import LinesBackground from "./components/LinesBackground";
import Certificatedash from "./components/certficate/Certficatedash";
import CertificateCards from "./components/certficate/CertificateCards";
// Divide Components //
const Divider = () => <div className="divider" style={{ margin: "3rem" }} />;
//Loading Page//
const PageWrapper = ({ children }) => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 800); // مدة اللودينج
    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (loading) return <Loading onFinish={() => setLoading(false)} />;

  return children;
};

function App() {
  const [showScroll, setShowScroll] = useState(false);
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Router>
      

      {/* 🔹 الخلفية الديناميكية */}

      <div id='up' className='container'>
                    <LinesBackground theme={theme} />

        <Routes>

          <Route path="/" element={

            <PageWrapper>

              <Header />
              <Hero />
              <Divider />
              <About />
              <Experience />
              <Divider />
              <Projects />
              <Divider />
              <CertificateCards />
              <Divider/>
              <Contact />
              <Divider />
              <Footer />
            </PageWrapper>
          } />

          <Route path="/project/:id" element={
            <PageWrapper>
              <HeaderProSimple/>
              <Divider />
              <ProjectDetails />
              <Divider />
              <Projects excludeId={true} />
              <Divider />
              <Footer />
            </PageWrapper>
          } />

          <Route path="/add-project" element={
            <PageWrapper>
              <HeaderProSimple/>
              <Divider />
              <AddProjects />
            </PageWrapper>
          } />

          <Route path='/projectDash' element={
            <PageWrapper>
              <HeaderProSimple/>
              <Divider />
              <ProjectDash />
            </PageWrapper>
          } />

<Route path="/certificatedash" element={
<PageWrapper>
  <HeaderProSimple/>
  <Divider />
  <Certificatedash />
</PageWrapper>
}/>

        </Routes>

        <AnimatePresence>
          {showScroll && (
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className='scroll2Top icon-chevron-up'
              style={{ opacity: showScroll ? 1 : 0, transition: "0.5s" }}
            />
          )}
        </AnimatePresence>
      </div>
    </Router>
  );
}


export default App;
