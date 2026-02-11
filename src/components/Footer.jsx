// Footer.jsx
import React, { useState, useEffect, useRef } from "react";
import { Users, Facebook, Instagram, Music, Linkedin, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Footer({ darkMode = false }) {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [maxExpandedWidth, setMaxExpandedWidth] = useState(420); // fallback
  const containerRef = useRef(null);

  const socialLinks = [
    { label: "Facebook", url: "https://www.facebook.com/share/1H33BtQhsk/", Icon: Facebook },
    { label: "Instagram", url: "https://www.instagram.com/yorr_mi?igsh=Mnltd2oxajd0eGx5", Icon: Instagram },
    { label: "TikTok", url: "https://www.tiktok.com/@mosh.v?_r=1&_t=ZS-92vfsiyD0c4", Icon: Music },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/mark-jeus-pagkaliwagan-b37482303/", Icon: Linkedin },
    { label: "Email", url: "mailto:info.markpagkaliwagan@gmail.com", Icon: Mail },
  ];

  // Close when clicking outside
  useEffect(() => {
    function onDocClick(e) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // Track mobile vs desktop (mobile = max-width 767px)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 767px)");
    const listener = (ev) => setIsMobile(ev.matches);
    setIsMobile(mq.matches);
    mq.addEventListener ? mq.addEventListener("change", listener) : mq.addListener(listener);
    return () => {
      mq.removeEventListener ? mq.removeEventListener("change", listener) : mq.removeListener(listener);
    };
  }, []);

  // Calculate safe expanded width based on viewport so it won't overflow horizontally
  useEffect(() => {
    function calcMax() {
      if (typeof window === "undefined") return;
      // base expanded: 180 + per-link space (approx)
      const desired = 180 + socialLinks.length * 90;
      // leave some side padding (32px)
      const cap = Math.max(180, Math.min(desired, window.innerWidth - 32));
      setMaxExpandedWidth(cap);
    }
    calcMax();
    window.addEventListener("resize", calcMax);
    return () => window.removeEventListener("resize", calcMax);
  }, [socialLinks.length]);

  function handleKeyDown(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen((s) => !s);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  // Motion variants
  const desktopLinksVariants = {
    hidden: { opacity: 0, x: 6 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.16 } },
    exit: { opacity: 0, x: 6, transition: { duration: 0.12 } },
  };

  const mobilePanelVariants = {
    hidden: { opacity: 0, y: 10, x: 6, scale: 0.98 },
    visible: { opacity: 1, y: 0, x: 0, scale: 1, transition: { duration: 0.18 } },
    exit: { opacity: 0, y: 8, x: 6, scale: 0.98, transition: { duration: 0.12 } },
  };

  return (
    <footer
      className={`w-full py-3 border-t bg-transparent ${darkMode ? "border-gray-700" : "border-gray-300"}`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-0">
        <p className="text-sm text-gray-500 dark:text-gray-400 min-w-0">
          © {new Date().getFullYear()} Mark Pagkaliwagan.
        </p>

        <div className="relative flex items-center min-w-0">
          {/* Pulsing ripple (positioned inside button container) */}
          <div className="relative">
            <motion.div
              aria-hidden
              className="absolute rounded-full pointer-events-none"
              style={{
                width: 56,
                height: 56,
                right: 6,
                zIndex: 0,
                boxShadow: "0 0 0 2px rgba(59,130,246,0.18)",
              }}
              animate={{ scale: [1, 1.45, 1], opacity: [0.8, 0.25, 0.8] }}
              transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Main button container: prevent flex growth/push and avoid overflow */}
            <motion.div
              role="button"
              aria-expanded={open}
              aria-haspopup="true"
              tabIndex={0}
              onKeyDown={handleKeyDown}
              onClick={() => setOpen((s) => !s)}
              initial={false}
              // animate width but clamp to maxExpandedWidth so it never overflows viewport
              animate={
                !isMobile
                  ? { width: open ? maxExpandedWidth : 180 }
                  : { width: 56 }
              }
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              style={{ transformOrigin: "right center" }}
              className={`z-10 cursor-pointer flex items-center justify-between rounded-full h-12 overflow-hidden shadow-lg select-none flex-shrink-0
                ${darkMode ? "bg-blue-600/95 text-white" : "bg-blue-500 text-white"}`}
            >
              {/* Desktop links */}
              {!isMobile && (
                <AnimatePresence>
                  {open && (
                    <motion.div
                      key="links"
                      variants={desktopLinksVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="flex items-center gap-3 px-3 min-w-0 overflow-hidden"
                    >
                      {socialLinks.map((s) => {
                        const Icon = s.Icon;
                        return (
                          <a
                            key={s.label}
                            href={s.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-2 text-sm font-medium text-white/95 hover:text-white transition-colors whitespace-nowrap"
                          >
                            <Icon size={14} />
                            <span className="hidden md:inline">{s.label}</span>
                          </a>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}

              {/* Right: always-visible Users icon + label */}
              <div className="flex items-center gap-2 px-4 min-w-0">
                {!open && !isMobile && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm font-semibold hidden md:inline select-none truncate"
                    aria-hidden={open}
                  >
                    Connect with me
                  </motion.span>
                )}
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10 flex-shrink-0"
                  style={{ backdropFilter: "blur(6px)" }}
                >
                  <Users size={16} />
                </div>
              </div>
            </motion.div>
          </div>

          {/* MOBILE: drop-up and left panel (constrained to viewport width) */}
          <AnimatePresence>
            {isMobile && open && (
              <motion.div
                key="mobile-panel"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={mobilePanelVariants}
                className="absolute bottom-14 right-0 z-30"
                style={{ right: 12 }}
              >
                <div
                  className={`rounded-2xl p-3 shadow-2xl w-64 max-w-[calc(100vw-32px)] 
                    ${darkMode ? "bg-slate-800/95 text-white" : "bg-white text-slate-800"}`}
                  role="menu"
                  aria-label="Social links"
                >
                  <div className="flex flex-col gap-2">
                    {socialLinks.map((s) => {
                      const Icon = s.Icon;
                      return (
                        <a
                          key={s.label}
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setOpen(false)}
                          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1
                            ${darkMode ? "hover:bg-slate-700/60" : "hover:bg-slate-100"}`}
                          role="menuitem"
                          aria-label={s.label}
                        >
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-blue-50/40 flex-shrink-0">
                            <Icon size={18} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium truncate">{s.label}</div>
                            <div className="text-xs text-slate-500 truncate">{s.url.replace(/^https?:\/\//, "")}</div>
                          </div>
                          <div className="text-xs opacity-70">Open</div>
                        </a>
                      );
                    })}
                  </div>

                  {/* Small close button */}
                  <div className="mt-3 flex justify-end">
                    <button
                      onClick={() => setOpen(false)}
                      className={`px-3 py-1 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-1
                        ${darkMode ? "bg-slate-700/60 text-white hover:bg-slate-700" : "bg-slate-100 text-slate-800 hover:bg-slate-200"}`}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </footer>
  );
}
