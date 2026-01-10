import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, Briefcase, GraduationCap, Calendar, MapPin } from "lucide-react";

/* ================================
   RESPONSIVE ANIMATION DISTANCE
================================ */
const getDistance = () => {
  if (typeof window === "undefined") return 120;

  const base = Math.min(window.innerWidth, window.innerHeight);
  const calculated = Math.max(120, base * 0.4);

  // Clamp distance so it never exceeds half of window width
  return Math.min(calculated, window.innerWidth / 2 - 16);
};


export default function About({ darkMode }) {
  const [dist, setDist] = useState(getDistance());

  useEffect(() => {
    const onResize = () => setDist(getDistance());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* ================================
     ANIMATION VARIANTS
  ================================ */
  const slideLeft = {
    hidden: { opacity: 0, x: -dist, scale: 0.96 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 90, damping: 18 },
    },
  };

  const slideRight = {
    hidden: { opacity: 0, x: dist, scale: 0.96 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 90, damping: 18 },
    },
  };

  return (
    <section className="w-full mx-auto px-2 sm:px-6 md:px-8 py-4">
      {/* ================= TITLE ================= */}
      <motion.h2
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-2xl sm:text-3xl font-bold mb-4 text-center sm:text-left"
      >
        About Me
      </motion.h2>

      {/* ================= GRID ================= */}
      <div className="overflow-hidden">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* ABOUT CARD */}
        <motion.div
          variants={slideLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.25 }}
          className={`group rounded-xl border p-6 transition-all hover:-translate-y-2 hover:shadow-xl
            ${darkMode ? "border-gray-700 hover:border-blue-500" : "border-gray-300 hover:border-blue-500"}`}
        >
          <div className="flex items-center gap-2 mb-3">
            <User className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-semibold">About</h3>
          </div>

          <p className="text-sm sm:text-base leading-relaxed break-words">
            I am a 4th-year BSIT student at San Pablo Colleges with almost two
            years of experience as a student assistant. I help with technical
            tasks and office work in the school.
          </p>
        </motion.div>

        {/* WORK EXPERIENCE CARD */}
        <motion.div
          variants={slideRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.25 }}
          className={`group rounded-xl border p-6 transition-all hover:-translate-y-2 hover:shadow-xl
            ${darkMode ? "border-gray-700 hover:border-blue-500" : "border-gray-300 hover:border-blue-500"}`}
        >
          <div className="flex items-center gap-2 mb-3">
            <Briefcase className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-semibold">Work Experience</h3>
          </div>

          <div className="space-y-2 text-sm sm:text-base">
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <Calendar className="w-4 h-4" />
              <span>August 2022 – June 2024</span>
            </div>

            <p className="font-medium break-words">
              Student Assistant – Guidance Office & Student Affairs and Services Office
            </p>

            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <MapPin className="w-4 h-4" />
              <span>San Pablo Colleges – San Pablo City, Laguna</span>
            </div>
          </div>
        </motion.div>

        {/* SOCIAL CARD */}
        <motion.div
          variants={slideLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.25 }}
          className={`group rounded-xl border p-6 transition-all hover:-translate-y-2 hover:shadow-xl
            ${darkMode ? "border-gray-700 hover:border-blue-500" : "border-gray-300 hover:border-blue-500"}`}
        >
          <div className="flex items-center gap-2 mb-3">
            <User className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-semibold">Socials</h3>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 mt-4">
            {/* Facebook */}
            <a href="https://www.facebook.com/share/1H33BtQhsk/" target="_blank" rel="noopener noreferrer"
              className="flex flex-col items-center text-blue-600 hover:scale-110 transition-transform">
              <svg className="w-8 h-8 mb-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12C22 6.48 17.52 2 12 2S2 6.48 2 12c0 5 3.66 9.13 8.44 9.88v-6.99H7.9v-2.89h2.54V9.79c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.89h-2.34v6.99C18.34 21.13 22 17 22 12z"/>
              </svg>
              <span className="text-xs font-medium">Facebook</span>
            </a>

            {/* Instagram */}
            <a href="https://www.instagram.com/yorr_mi?igsh=Mnltd2oxajd0eGx5" target="_blank" rel="noopener noreferrer"
              className="flex flex-col items-center text-pink-500 hover:scale-110 transition-transform">
              <svg className="w-8 h-8 mb-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.16c3.2 0 3.584.012 4.85.07 1.17.054 1.96.24 2.414.403a4.92 4.92 0 011.78 1.17 4.92 4.92 0 011.17 1.78c.163.454.35 1.244.403 2.414.058 1.266.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.24 1.96-.403 2.414a4.92 4.92 0 01-1.17 1.78 4.92 4.92 0 01-1.78 1.17c-.454.163-1.244.35-2.414.403-1.266.058-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.96-.24-2.414-.403a4.92 4.92 0 01-1.78-1.17 4.92 4.92 0 01-1.17-1.78c-.163-.454-.35-1.244-.403-2.414-.058-1.266-.07-1.65-.07-4.85s.012-3.584.07-4.85c.054-1.17.24-1.96.403-2.414a4.92 4.92 0 011.17-1.78 4.92 4.92 0 011.78-1.17c.454-.163 1.244-.35 2.414-.403 1.266-.058 1.65-.07 4.85-.07zm0-2.16C8.72 0 8.3.01 7.04.07 5.77.127 4.63.32 3.68.65a7.07 7.07 0 00-2.54 1.66A7.07 7.07 0 00.65 4.86c-.33.95-.523 2.09-.58 3.36C0 8.3 0 8.72 0 12s.01 3.7.07 4.96c.057 1.27.25 2.41.58 3.36a7.07 7.07 0 001.66 2.54 7.07 7.07 0 002.54 1.66c.95.33 2.09.523 3.36.58C8.3 24 8.72 24 12 24s3.7-.01 4.96-.07c1.27-.057 2.41-.25 3.36-.58a7.07 7.07 0 002.54-1.66 7.07 7.07 0 001.66-2.54c.33-.95.523-2.09.58-3.36C24 15.7 24 15.28 24 12s-.01-3.7-.07-4.96c-.057-1.27-.25-2.41-.58-3.36a7.07 7.07 0 00-1.66-2.54 7.07 7.07 0 00-2.54-1.66c-.95-.33-2.09-.523-3.36-.58C15.7 0 15.28 0 12 0z"/>
                <circle cx="12" cy="12" r="3.2"/>
                <circle cx="18.4" cy="5.6" r="1.44"/>
              </svg>
              <span className="text-xs font-medium">Instagram</span>
            </a>

            {/* TikTok */}
            <a href="https://www.tiktok.com/@mosh.v?_r=1&_t=ZS-92vfsiyD0c4" target="_blank" rel="noopener noreferrer"
              className="flex flex-col items-center text-black hover:scale-110 transition-transform">
              <svg className="w-8 h-8 mb-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2v19.09a4.91 4.91 0 01-2.94-.95 4.91 4.91 0 01-1.6-2.57c-.28-1.14-.02-2.32.73-3.22.75-.91 1.83-1.41 2.95-1.41h1.86v6.96s3.1.19 5.86-1.85V4h-2.8a4.7 4.7 0 01-1.99-.27 5.07 5.07 0 01-2.13-1.44z"/>
              </svg>
              <span className="text-xs font-medium">TikTok</span>
            </a>

            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/mark-jeus-pagkaliwagan-b37482303/" target="_blank" rel="noopener noreferrer"
              className="flex flex-col items-center text-blue-700 hover:scale-110 transition-transform">
              <svg className="w-8 h-8 mb-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4V8zm7 0h3.75v2.18h.05c.52-.98 1.79-2.01 3.7-2.01 3.95 0 4.68 2.6 4.68 5.98V24h-4v-7.55c0-1.8-.03-4.12-2.5-4.12-2.5 0-2.88 1.95-2.88 3.98V24h-4V8z"/>
              </svg>
              <span className="text-xs font-medium">LinkedIn</span>
            </a>
          </div>
        </motion.div>

        {/* EDUCATION CARD */}
        <motion.div
          variants={slideLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.25 }}
          className={`md:col-span-2 lg:col-span-3 group rounded-xl border p-6 transition-all hover:-translate-y-2 hover:shadow-xl
            ${darkMode ? "border-gray-700 hover:border-blue-500" : "border-gray-300 hover:border-blue-500"}`}
        >
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-semibold">Education</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-sm sm:text-base">
            {[
              {
                year: "2023 – Present",
                title: "Bachelor of Science in Information Technology",
                school: "San Pablo Colleges – San Pablo City",
              },
              {
                year: "2021 – 2022",
                title: "Senior High School – ICT Strand",
                school: "San Pablo Colleges – San Pablo City",
              },
              {
                year: "2018 – 2019",
                title: "Junior High School",
                school: "Atisan Integrated School – San Pablo City",
              },
              {
                year: "2014 – 2015",
                title: "Elementary",
                school: "Atisan Elementary School – San Pablo City",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                className="rounded-lg border p-4 hover:border-blue-400 hover:shadow-md transition-all"
              >
                <p className="text-xs opacity-70">{item.year}</p>
                <p className="font-medium break-words">{item.title}</p>
                <p className="text-xs opacity-70 break-words">{item.school}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
            </div>
    </section>
  );
}
