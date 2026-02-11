import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
    FileCode,
  Braces,
  Code,
  Terminal,
  TerminalSquare,
  Database,
  Settings,
  FileJson,
  Github,
  Star,
  GitBranch,
  ExternalLink,
  ArrowRightCircle,
} from "lucide-react";
import { GitHubCalendar } from "react-github-calendar";

/* ===============================
   RESPONSIVE ANIMATION DISTANCE
================================ */
const useResponsiveDistance = () => {
  const [dist, setDist] = useState(200);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      let d = 200;

      if (w < 480) d = 80;       // super small screens
      else if (w < 640) d = 120; // small mobile
      else if (w < 1024) d = 200; // tablet
      else d = 320;               // desktop

      // Clamp so it never exceeds screen width minus padding
      setDist(Math.min(d, w - 32));
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return dist;
};


export default function GitHubSectionPro({ darkMode = false }) {
  const username = "MarkPagkaliwagan";
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const DIST = useResponsiveDistance();
const [showTech, setShowTech] = useState(false);

  /* ===============================
     ANIMATION VARIANTS (INTACT)
  ================================ */
  const slideLeft = {
    hidden: {
      opacity: 0,
      x: -DIST,
      scale: 0.96,
      filter: "blur(6px)",
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      filter: "blur(0px)",
    },
  };

  const slideRight = {
    hidden: {
      opacity: 0,
      x: DIST,
      scale: 0.96,
      filter: "blur(6px)",
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      filter: "blur(0px)",
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  /* ===============================
     FETCH REPOS (UNCHANGED)
  ================================ */
  useEffect(() => {
    let mounted = true;

    const fetchRepos = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(
          `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`
        );
        if (!mounted) return;

        const sorted = res.data
          .slice()
          .sort(
            (a, b) =>
              b.stargazers_count - a.stargazers_count ||
              new Date(b.pushed_at) - new Date(a.pushed_at)
          );

        setRepos(sorted);
      } catch {
        if (!mounted) return;
        setError(
          "Failed to load repositories. GitHub API rate limit may be reached."
        );
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchRepos();
    return () => (mounted = false);
  }, [username]);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.08 },
    },
  };

  const card = {
    hidden: { opacity: 0, y: 30, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 160, damping: 18 },
    },
  };

  
const languages = [
  { name: "Python", icon: FileCode, color: "text-yellow-500" },
  { name: "JavaScript", icon: Braces, color: "text-yellow-400" },
  { name: "HTML", icon: Code, color: "text-orange-500" },
  { name: "CSS", icon: Code, color: "text-blue-500" },
  { name: "Java", icon: TerminalSquare, color: "text-red-500" },
  { name: "C", icon: TerminalSquare, color: "text-gray-500" },
  { name: "C++", icon: TerminalSquare, color: "text-indigo-400" },
  { name: "PHP", icon: FileCode, color: "text-purple-500" },
  { name: "SQL", icon: Database, color: "text-cyan-500" },
  { name: "Kotlin", icon: Settings, color: "text-pink-500" },
  { name: "Bash", icon: Terminal, color: "text-green-500" },
  { name: "Dart", icon: FileJson, color: "text-sky-500" },
];

  return (
    <section className="w-full mx-auto md:px-8  space-y-6">
      {/* HEADER */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        transition={{ duration: 0.6 }}
        className={`rounded-2xl p-6 border ${
          darkMode
            ? "bg-transparent border-gray-700 text-gray-100"
            : "bg-transparent border-gray-200 text-gray-900"
        }`}
      >
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div
              className={`p-3 rounded-lg ${
                darkMode ? "bg-blue-600/30" : "bg-blue-50"
              }`}
            >
              <Github className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">GitHub Overview</h3>
              <p className="text-sm opacity-70">
                Repositories, recent activity, and contributions.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-sm px-3 py-2 rounded-lg font-medium flex items-center gap-2 border">
              <Code className="w-4 h-4 text-blue-500" />
              <span>{loading ? "..." : repos.length}</span>
              <span className="opacity-60">repos</span>
            </div>

            <a
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-lg border hover:shadow-md"
            >
              View Profile
              <ArrowRightCircle className="w-4 h-4" />
            </a>
          </div>
        </div>
      </motion.div>

      {/* CONTENT GRID */}
      <div className="overflow-hidden">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* REPOSITORIES */}
        <motion.div
          variants={slideLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.85 }}
          className="xl:col-span-2"
        >
          <div
            className={`rounded-2xl p-6 border ${
              darkMode
                ? "bg-transparent border-gray-700 text-gray-100"
                : "bg-transparent border-gray-200 text-gray-900"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-lg flex items-center gap-2">
                <Code className="w-4 h-4 text-blue-500" />
                Repositories
              </h4>
              <div className="text-sm opacity-70">Top starred shown first</div>
            </div>

            {loading && (
              <div className="space-y-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="animate-pulse bg-gray-100 dark:bg-gray-700 rounded-lg h-20"
                  />
                ))}
              </div>
            )}

            {error && (
              <div className="text-sm text-red-500 p-3 rounded-md bg-red-50 dark:bg-red-900/20">
                {error}
              </div>
            )}

            {!loading && !error && (
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <AnimatePresence>
                  {repos.slice(0, 8).map((r) => (
                    <motion.a
                      key={r.id}
                      variants={card}
                      whileHover={{
                        y: -8,
                        scale: 1.02,
                        boxShadow: "0 12px 24px rgba(0,0,0,0.1)",
                      }}
                      whileTap={{ scale: 0.995 }}
                      layout
                      href={r.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className={`group block rounded-lg p-4 border shadow-sm relative overflow-hidden ${
                        darkMode
                          ? "bg-transparent border-gray-700 hover:border-blue-500"
                          : "bg-transparent border-gray-100 hover:border-blue-500"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h5 className="font-semibold mb-1 group-hover:text-blue-500">
                            {r.name}
                          </h5>
                          <p className="text-sm opacity-70 line-clamp-2">
                            {r.description || "No description"}
                          </p>
                        </div>

                        <div className="flex flex-col items-end text-xs opacity-80">
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4" />
                            <span>{r.stargazers_count}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <GitBranch className="w-4 h-4" />
                            <span>{r.forks_count}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center justify-between text-xs opacity-75">
                        <div className="flex items-center gap-3">
                          {r.language && (
                            <span className="px-2 py-1 rounded-full border">
                              {r.language}
                            </span>
                          )}
                          <span>
                            Updated {new Date(r.pushed_at).toLocaleDateString()}
                          </span>
                        </div>
                        <ExternalLink className="w-4 h-4 opacity-80" />
                      </div>
                    </motion.a>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* CONTRIBUTIONS */}
        <motion.div
          variants={slideRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.85 }}
          whileHover={{ scale: 1.02, boxShadow: "0 12px 24px rgba(0,0,0,0.15)" }}
        >
          <div
            className={`rounded-2xl p-6 border space-y-4 relative overflow-hidden ${
              darkMode
                ? "bg-transparent border-gray-700 text-gray-100"
                : "bg-transparent border-gray-200 text-gray-900"
            }`}
          >
            <div className="flex items-center justify-between">
              <h4 className="font-semibold flex items-center gap-2">
                <Code className="w-4 h-4 text-blue-500" />
                Contributions
              </h4>
              <div className="text-xs opacity-70">Last year</div>
            </div>

            <div className="relative z-10 overflow-x-auto">
              <GitHubCalendar
                username={username}
                blockSize={12}
                blockMargin={4}
                color={darkMode ? "#60a5fa" : "#2563eb"}
                fontSize={11}
              />
            </div>

          </div>
  {/* LANGUAGE LABEL */}
  <div className="mt-8 mb-4 flex items-center justify-center gap-3">
    <span className="h-px w-12 bg-gray-300 dark:bg-gray-700" />
    <span className="flex items-center gap-2 text-sm font-semibold tracking-wide text-gray-600 dark:text-gray-300">
      <Code className="w-4 h-4 text-blue-500" />
      Languages & Tools
    </span>
    <span className="h-px w-12 bg-gray-300 dark:bg-gray-700" />
  </div>

  {/* LANGUAGE BADGES */}
  <div className="relative w-full overflow-hidden pb-4">
    {/* fade edges */}
    <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-white dark:from-gray-900 to-transparent z-10" />
    <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10" />

    <div className="animate-marquee gap-4 whitespace-nowrap py-4">
      {[...languages, ...languages].map((lang, index) => {
        const Icon = lang.icon;
        return (
          <div
            key={index}
            className="
              group flex items-center gap-3 px-5 py-3 rounded-full
              border backdrop-blur-lg
              bg-white/80 dark:bg-gray-900/70
              border-gray-300 dark:border-gray-700
              text-base font-semibold
              text-gray-900 dark:text-gray-100
              transition-all duration-300
              hover:-translate-y-2 hover:scale-[1.08]
              hover:border-blue-500
              hover:shadow-[0_10px_30px_rgba(59,130,246,0.3)]
            "
          >
            <Icon
              className={`w-6 h-6 ${lang.color}
                transition-all duration-300
                group-hover:scale-125 group-hover:rotate-6`}
            />
            <span className="group-hover:text-blue-500 transition-colors">
              {lang.name}
            </span>
          </div>
        );
      })}
    </div>
  </div>
  {/* OPEN TECHNOLOGIES POPUP */}
  <div className="flex justify-center -mt-4 pb-2">
    <button
      onClick={() => setShowTech(true)}
      className="
        relative px-7 py-2.5 rounded-full
        bg-blue-500 text-white font-semibold text-sm
        shadow-[0_0_0_0_rgba(59,130,246,0.7)]
        animate-bluePulse
        hover:scale-110 hover:bg-blue-600
        transition-transform
      "
    >
      View Technologies
    </button>
  </div>

{showTech && (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    {/* BACKDROP */}
    <div
      className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      onClick={() => setShowTech(false)}
    />

    {/* MODAL */}
    <div className="
      relative z-10 w-[90%] max-w-lg
      rounded-2xl p-6
      bg-white dark:bg-gray-900
      border border-gray-300 dark:border-gray-700
      shadow-2xl
      animate-[fadeIn_0.25s_ease-out]
    ">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Technologies
        </h3>

        <button
          onClick={() => setShowTech(false)}
          className="text-gray-500 hover:text-red-500 transition"
        >
          ✕
        </button>
      </div>

      {/* DESCRIPTION */}
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        A total of{" "}
        <span className="font-semibold text-blue-500">
          {languages.length}
        </span>{" "}
        languages and technologies that I work and used to work with.
      </p>

      {/* TECHNOLOGY LIST */}
      <div className="flex flex-wrap gap-3">
        {languages.map((lang, i) => {
          const Icon = lang.icon;
          return (
            <div
              key={i}
              className="
                flex items-center gap-2 px-4 py-2 rounded-full
                bg-gray-100 dark:bg-gray-800
                border border-gray-300 dark:border-gray-700
                text-sm font-medium
                hover:border-blue-500 hover:shadow-md
                transition
              "
            >
              <Icon className={`w-4 h-4 ${lang.color}`} />
              {lang.name}
            </div>
          );
        })}
      </div>
    </div>
  </div>
)}


        </motion.div>
      </div>
            </div>

    </section>
  );
}
