
import React, { useState, useRef, useEffect } from 'react';
import {
  Mail,
  Phone,
  DownloadCloud,
  Sun,
  Moon,
  MapPin,
  Check
} from 'lucide-react';

import profilePic1 from '../assets/profile1.jpg';
import profilePic2 from '../assets/profile2.jpg';
import resumePDF from '../assets/resumePDF.pdf';

export default function ProfileHeaderReplica({ darkMode, setDarkMode, setShowContact }) {
  const [hover, setHover] = useState(false);
  const [hoverBtn, setHoverBtn] = useState(null);
  const btnRefs = useRef({});
  const [time, setTime] = useState(new Date());
const [visitors, setVisitors] = useState(0);

useEffect(() => {
  const hasVisited = sessionStorage.getItem('hasVisitedPortfolio');

  if (!hasVisited) {
    fetch('https://api.countapi.xyz/hit/portfolio-markjeus/visitors')
      .then(res => res.json())
      .then(data => {
        setVisitors(data.value);
        sessionStorage.setItem('hasVisitedPortfolio', 'true');
      })
      .catch(err => console.error('Error fetching visitor count:', err));
  } else {
    // kuha lang ng current count, walang dagdag
    fetch('https://api.countapi.xyz/get/portfolio-markjeus/visitors')
      .then(res => res.json())
      .then(data => setVisitors(data.value))
      .catch(err => console.error('Error fetching visitor count:', err));
  }
}, []);
useEffect(() => {
  const syncVisitors = setInterval(() => {
    fetch('https://api.countapi.xyz/get/portfolio-markjeus/visitors')
      .then(res => res.json())
      .then(data => setVisitors(data.value))
      .catch(() => {});
  }, 3000); // every 3 seconds

  return () => clearInterval(syncVisitors);
}, []);




  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const buttons = [
    {
      id: 'resume',
      label: 'Download Resume',
      icon: <DownloadCloud />,
      href: resumePDF,
      download: true
    },
    {
      id: 'contact',
      label: 'Contact Me',
      icon: <Mail />,
      onClick: () => setShowContact(prev => !prev),
    },
  ];

  // Typing effect
  const fullText = 'Information Technology Student | Aspiring Full-Stack Developer';
  const [typedText, setTypedText] = useState('');
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let timeout;
    const speed = deleting ? 20 : 50;
    const pause = 1000;

    if (!deleting && index <= fullText.length) {
      timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, index));
        setIndex(index + 1);
        if (index + 1 > fullText.length) {
          setTimeout(() => setDeleting(true), pause);
        }
      }, speed);
    } else if (deleting && index >= 0) {
      timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, index));
        setIndex(index - 1);
        if (index - 1 < 0) {
          setDeleting(false);
          setIndex(0);
        }
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [index, deleting, fullText]);

  // Format time like HH:MM:SS
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour12: false });
  };

  return (
    <header className="w-full profile-header py-2 sm:py-8">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        {/* Card */}
        <div
          className="relative w-full bg-transparent rounded-2xl p-4 sm:p-6 md:p-8"
          aria-label="profile header card"
        >

          {/* Dark Mode Toggle - responsive positioning */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="absolute top-4 right-4 sm:top-6 sm:right-8 z-20 flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full text-sm backdrop-blur-md bg-white/40 dark:bg-blue-800/20 border border-gray-300/40 dark:border-gray-600/40 shadow-sm transition-transform duration-200 hover:scale-105"
            aria-pressed={darkMode}
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <Sun className="w-4 h-4 text-yellow-400" />
            ) : (
              <Moon className="w-4 h-4 text-gray-700 dark:text-gray-300" />
            )}
            <span className="hidden sm:inline text-xs sm:text-sm">
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </span>
          </button>

          {/* Content - responsive layout */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-6 w-full">

            {/* Profile Image */}
            <div
              className="flex-shrink-0 rounded-lg overflow-hidden cursor-pointer transition-transform duration-200 hover:scale-105"
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              style={{ width: 'auto' }}
            >
              <img
                src={hover ? profilePic2 : profilePic1}
                alt="Profile"
                className="block w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 object-cover"
              />
            </div>

            {/* Details */}
            <div className="flex-1 w-full mt-2 sm:mt-0 text-center sm:text-left">

              {/* Name */}
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight truncate">
                  Pagkaliwagan, Mark Jeus
                </h1>
                <span className="inline-flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#1DA1F2]">
                  <Check className="w-3 h-3 text-white" />
                </span>
              </div>

              {/* Location */}
              <div className="mt-1 flex items-center gap-2 justify-center sm:justify-start text-sm sm:text-base">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                <p className="mt-0">Laguna, San Pablo City</p>
              </div>

              {/* Role / typing */}
              <p className="mt-2 text-sm sm:text-base md:text-lg min-h-[1.5rem]">
                {typedText}
                <span className="animate-pulse">|</span>
              </p>

              {/* Buttons + Visitor Card */}
              <div className="mt-3 flex flex-col sm:flex-row sm:items-center gap-3 w-full">

                {/* Visitor Card */}
                <div
                  className="flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-white/40 dark:bg-blue-800/30 border border-gray-300/40 dark:border-gray-500/40 text-gray-700 dark:text-gray-200 font-mono text-xs sm:text-sm shadow-sm transition-transform duration-200 hover:scale-105"
                >
                  <span>{formatTime(time)}</span>
                  <span className="mx-1">|</span>
                  <span>VISITORS</span>
                  <span className="mx-1">|</span>
                  <span>{visitors}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex-1 sm:flex-none w-full sm:w-auto relative">
                  {/* Hover highlight - absolutely positioned inside this block */}
                  <div
                    className="absolute rounded-md transition-all duration-300 pointer-events-none z-0"
                    style={{
                      top: hoverBtn ? hoverBtn.offsetTop : -9999,
                      left: hoverBtn ? hoverBtn.offsetLeft : -9999,
                      width: hoverBtn ? hoverBtn.offsetWidth : 0,
                      height: hoverBtn ? hoverBtn.offsetHeight : 0,
                      backgroundColor: '#3b82f6',
                      boxShadow: '0 2px 8px rgba(59,130,246,0.25)'
                    }}
                  />

                  <div className="flex flex-col sm:flex-row gap-2 w-full">
                    {buttons.map((btn) =>
                      btn.onClick ? (
                        <button
                          key={btn.id}
                          onClick={btn.onClick}
                          ref={(el) => (btnRefs.current[btn.id] = el)}
                          onMouseEnter={() => setHoverBtn(btnRefs.current[btn.id])}
                          onMouseLeave={() => setHoverBtn(null)}
                          className={`relative z-10 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm transition-shadow shadow-sm w-full sm:w-auto ${
                            darkMode ? 'text-white border border-gray-600/50' : 'text-black border border-gray-300/60'
                          }`}
                        >
                          {btn.icon}
                          <span className="truncate">{btn.label}</span>
                        </button>
                      ) : (
                        <a
                          key={btn.id}
                          href={btn.href}
                          download={btn.download || false}
                          ref={(el) => (btnRefs.current[btn.id] = el)}
                          onMouseEnter={() => setHoverBtn(btnRefs.current[btn.id])}
                          onMouseLeave={() => setHoverBtn(null)}
                          className={`relative z-10 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm transition-shadow shadow-sm w-full sm:w-auto ${
                            darkMode ? 'text-white border border-gray-600/50' : 'text-black border border-gray-300/60'
                          }`}
                        >
                          {btn.icon}
                          <span className="truncate">{btn.label}</span>
                        </a>
                      )
                    )}
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
