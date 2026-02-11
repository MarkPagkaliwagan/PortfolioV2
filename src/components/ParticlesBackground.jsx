// src/components/ParticlesBackground.jsx
import React, { useCallback } from "react";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";

const ParticlesBackground = ({ isDark = false }) => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    console.log("Particles loaded", container);
  }, []);

  const particlesConfig = {
    background: { color: { value: "transparent" } },
    fpsLimit: 60,
    interactivity: {
      events: {
        onClick: { enable: true, mode: "push" },
        onHover: { enable: true, mode: "repulse" },
        resize: true,
      },
      modes: {
        push: { quantity: 2 },
        repulse: { distance: 100, duration: 0.4 },
      },
    },
    particles: {
      color: { value: isDark ? "#ffffff" : "#080808" },
      links: {
        color: isDark ? "#ffffff" : "#080808",
        distance: 150,
        enable: true,
        opacity: isDark ? 0.3 : 0.2,
        width: 1,
      },
      move: { direction: "none", enable: true, outModes: { default: "bounce" }, random: false, speed: 2, straight: false },
      number: { density: { enable: true, area: 800 }, value: 60 },
      opacity: { value: isDark ? 0.6 : 0.4, animation: { enable: true, speed: 1, minimumValue: 0.1, sync: false } },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 5 }, animation: { enable: true, speed: 2, minimumValue: 0.1, sync: false } },
    },
    detectRetina: true,
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={particlesConfig}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        pointerEvents: "none",
      }}
    />
  );
};

export default ParticlesBackground;
