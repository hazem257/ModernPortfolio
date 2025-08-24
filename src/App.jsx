import React, { useState, useEffect } from 'react';
import Header from './_components/header/Header';
import Main from './_components/main/Main';
import TestimonialsSection from './_components/overView/TestimonialsSection';
import Grades from './_components/courses/Grades';
import FeaturesSection from './_components/FeaturesSection/FeaturesSection';
import Footer from './_components/footer/Footer';
import Login from './_components/pages/login/Login';
import Dashboard from './_components/pages/dashboard/Dashboard';
import Register from './_components/pages/register/Register';
import ProtectedRoute from './ProtectedRoute'
import ChemistryLoader from './_components/pages/loadingpage/ChemistryLoader';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Content from './_components/content/Content';
const SectionDivider = () => (
  <div style={{
    width: '100%',
    height: '2rem',
    backgroundColor: '#77bef023'
  }} />
);

function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState("light");

  useEffect(() => {

    const hour = new Date().getHours();
    setTheme(hour >= 19 || hour <= 6 ? "dark" : "light");


    let duration = 2500;
    if (navigator.connection && navigator.connection.downlink) {
      const speed = navigator.connection.downlink;
      if (speed < 1) duration = 5000;
      else if (speed < 3) duration = 3500;
      else duration = 2000;
    }

    const timer = setTimeout(() => {
      setLoading(false);
    }, duration);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <ChemistryLoader theme={theme} />;
  }

  return (
    <Router>
      <div className={`app-container ${theme === "dark" ? "dark-theme" : ""}`}>
        <Header />
       <Routes>
  <Route 
    path="/" 
    element={
      <ProtectedRoute>
        <>
          <SectionDivider />
          <Main />
          <SectionDivider />
          <Grades />
          <SectionDivider />
          <FeaturesSection />
          <SectionDivider />
          <TestimonialsSection />
        </>
      </ProtectedRoute>
    } 
  />
  <Route path="/register" element={<Register />} />
  <Route path="/login" element={<Login />} />
  <Route path="/grade/:gradeId" element={
    <ProtectedRoute>
      <Content />
    </ProtectedRoute>
  } />
  <Route path="/dashboard" element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  } />
</Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
