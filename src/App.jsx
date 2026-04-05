import React, { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Certificate from "./components/Certificate";
import GitHubSection from "./components/GitHubSection";
import ParticlesBackground from "./components/ParticlesBackground";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import "./index.css";
import LoadingScreen from "./components/LoadingScreen";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [loading, setLoading] = useState(true);

  // 👉 REF para sa Contact section
  const contactRef = useRef(null);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  // 👉 AUTO SCROLL kapag nag-open ang Contact
  useEffect(() => {
    if (showContact && contactRef.current) {
      contactRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [showContact]);

  return (
    <div className="min-h-screen relative">
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      {/* Particle background */}
      <ParticlesBackground isDark={darkMode} />
      {!loading && (
        <>
          {/* Page content */}
          <Navbar
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            setShowContact={setShowContact}
          />

          <GitHubSection darkMode={darkMode} />
          <About darkMode={darkMode} />
          <Certificate darkMode={darkMode} />

          {/* 👉 CONTACT SECTION (toggle + scroll target) */}
          {showContact && (
            <div ref={contactRef}>
              <Contact darkMode={darkMode} />
            </div>
          )}

          <Footer darkMode={darkMode} />
        </>
      )}
    </div>
  );
}

export default App;
