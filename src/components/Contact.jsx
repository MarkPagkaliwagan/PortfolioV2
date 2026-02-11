import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, User, MessageCircle, MapPin, X } from "lucide-react";
import emailjs from "@emailjs/browser";

const containerVariants = {
  hidden: { opacity: 0, y: 6 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 16 } },
};

export default function Contact({ darkMode }) {
  const [formData, setFormData] = useState({ email: "", name: "", message: "" });
  const [status, setStatus] = useState("");
  const [visible, setVisible] = useState(true); // For close button

  const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .send("service_8fz0swg", "template_cys8wd2", formData, "ppysn2_4f0jRNDEDl")
      .then(() => {
        setStatus("Message sent! ✅");
        setFormData({ email: "", name: "", message: "" });
      })
      .catch(() => setStatus("Failed to send. ❌"));
  };

  if (!visible) return null; // Hide component when closed

  return (
    <section className="w-full mx-auto px-6 py-8 relative">
      {/* Close button */}
      <button
        onClick={() => setVisible(false)}
        className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-red-500 transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 140, damping: 16 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100 hover:text-blue-500 transition-colors">
          Get in touch.
        </h2>
        <p className="text-gray-700 dark:text-gray-300 hover:text-blue-400 transition-colors">
          Considering to be in contact with me regarding a project? Perhaps collaboration? Or just about anything?
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="mb-8 p-6 border rounded-lg shadow-sm"
        style={{ backgroundColor: "transparent" }} // remove background
      >
        <motion.p variants={itemVariants} className="mb-3 text-gray-800 dark:text-gray-200 hover:text-blue-500 transition-colors">
          With proven freelancing and professional experience across diverse projects, I’ve consistently delivered tailored solutions that exceed expectations. Having grown from independent work into formal roles, I bring adaptability, technical expertise, and the drive to excel in challenging opportunities that align with my interests and strengths.
        </motion.p>
        <motion.p variants={itemVariants} className="mb-3 text-gray-800 dark:text-gray-200 hover:text-blue-500 transition-colors">
          Sincerely, a tea-powered programmer fueled by curiosity and continuous growth.
        </motion.p>
        <motion.p variants={itemVariants} className="flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 transition-colors">
          <MapPin className="w-4 h-4" /> Currently based in the Philippines
        </motion.p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="p-6 border rounded-lg shadow-sm"
        style={{ backgroundColor: "transparent" }} // remove background
      >
        <motion.h3 variants={itemVariants} className="text-xl font-bold text-blue-600 mb-4 hover:text-blue-700 transition-colors">
          Send me a message!
        </motion.h3>

        <motion.form onSubmit={handleSubmit} className="grid gap-4">
          <motion.input
            variants={itemVariants}
            type="email"
            id="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:ring-blue-400 transition"
          />
          <motion.input
            variants={itemVariants}
            type="text"
            id="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:ring-blue-400 transition"
          />
          <motion.textarea
            variants={itemVariants}
            id="message"
            placeholder="Message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:ring-blue-400 transition resize-none"
          />

          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition flex items-center justify-center"
          >
            <span className="inline-block w-2 h-2 rounded-full mr-2 bg-white animate-pulse" />Submit
          </motion.button>
        </motion.form>

        {status && <motion.p variants={itemVariants} className="mt-3 text-center text-gray-700 dark:text-gray-200">{status}</motion.p>}
      </motion.div>
    </section>
  );
}
