import React, { useEffect, useRef, useState } from "react";

const LoadingScreen = ({ onComplete }) => {
  const canvasRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  // ✅ FIX: I-store ang onComplete sa ref para hindi mag-trigger ng re-run ang useEffect
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Particles animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.3,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.55 + 0.15,
    }));

    let animId;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100,220,180,${p.alpha})`;
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(100,220,180,${0.13 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []); // ✅ empty deps — isang beses lang mag-mount

  // Progress bar
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 3 + 1;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(() => {
            if (onCompleteRef.current) onCompleteRef.current(); // ✅ ref, hindi direct
          }, 700);
        }, 300);
      }
      setProgress(Math.min(100, Math.floor(current)));
    }, 80);

    return () => clearInterval(interval);
  }, []); // ✅ empty deps — isang beses lang mag-run

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#0a0a0f",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "opacity 0.7s ease, visibility 0.7s ease",
        opacity: fadeOut ? 0 : 1,
        visibility: fadeOut ? "hidden" : "visible",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "28px",
        }}
      >
        {/* Spinning monogram ring */}
        <div style={{ position: "relative", width: 80, height: 80 }}>
          <div
            style={{
              position: "absolute",
              inset: -8,
              borderRadius: "50%",
              border: "1px solid rgba(100,220,180,0.18)",
              animation: "ls-spin-reverse 6s linear infinite",
            }}
          />
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              border: "1.5px solid rgba(100,220,180,0.6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              animation: "ls-spin 3s linear infinite",
            }}
          >
            <span
              style={{
                fontFamily: "'Syne', 'Space Grotesk', sans-serif",
                fontSize: 28,
                fontWeight: 800,
                color: "#64dcb4",
                letterSpacing: "-1px",
                animation: "ls-spin-reverse 3s linear infinite",
              }}
            >
              {/* ✏️ PALITAN NG IYONG INITIALS */}
              JP
            </span>
          </div>
        </div>

        {/* Name + role */}
        <div style={{ textAlign: "center" }}>
          <p
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 22,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "0.08em",
              margin: "0 0 6px",
            }}
          >
            {/* ✏️ PALITAN NG IYONG PANGALAN */}
            Juan Portfolio
          </p>
          <p
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 11,
              color: "#64dcb4",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            {/* ✏️ PALITAN NG IYONG ROLE */}
            UI / UX Designer &amp; Developer
          </p>
        </div>

        {/* Progress bar */}
        <div style={{ width: 200 }}>
          <div
            style={{
              width: "100%",
              height: 1.5,
              background: "rgba(255,255,255,0.1)",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                background: "linear-gradient(90deg, #64dcb4, #3b9eff)",
                borderRadius: 2,
                transition: "width 0.1s ease",
              }}
            />
          </div>
          <p
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 9,
              color: "rgba(255,255,255,0.25)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              textAlign: "center",
              margin: "8px 0 0",
            }}
          >
            {progress < 100 ? "Loading portfolio..." : "Welcome"}
          </p>
        </div>

        {/* Bouncing dots */}
        <div style={{ display: "flex", gap: 6, marginTop: -10 }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: "rgba(100,220,180,0.6)",
                animation: "ls-pulse 1.2s ease-in-out infinite",
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;700;800&display=swap');
        @keyframes ls-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes ls-spin-reverse {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        @keyframes ls-pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.5); }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
