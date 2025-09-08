import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import ExperienceCard from "../components/ExperienceCard"; // Make sure path is correct

export default function Home() {
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  const [lineHeight, setLineHeight] = useState(0);
  const [cardPositions, setCardPositions] = useState([]);

  // Measure timeline cards for line height and node positions
  useEffect(() => {
    const updateLayout = () => {
      if (containerRef.current) {
        const cards = Array.from(containerRef.current.querySelectorAll(".timeline-card"));
        if (cards.length > 0) {
          const firstTop = cards[0].offsetTop + 16;
          const lastBottom = cards[cards.length - 1].offsetTop + cards[cards.length - 1].offsetHeight - 16;
          setLineHeight(lastBottom - firstTop);

          const positions = cards.map((card) => card.offsetTop + card.offsetHeight / 2);
          setCardPositions(positions);
        }
      }
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  // Track scroll to animate nodes with line growth
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const containerTop = containerRef.current?.getBoundingClientRect().top || 0;
      setScrollY(window.innerHeight - containerTop);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-darkBg text-white min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col justify-center items-center text-center min-h-screen px-4 pt-24">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl font-bold mb-4"
        >
          Ishaan Taneja
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="text-xl max-w-xl"
        >
          Full-Stack Web Developer specializing in secure, high-performance web apps with AI-driven workflow optimization.
        </motion.p>
      </section>

      {/* Experience Section */}
      <section className="px-6 py-12 relative">
        <h2 className="text-3xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-center animate-gradient-x">Experience</h2>

        <div className="flex flex-col relative" ref={containerRef}>
          {/* Timeline Line */}
          <motion.div
            ref={lineRef}
            className="absolute left-4 top-0 w-1 bg-blue-500 origin-top"
            style={{ height: 0 }}
            initial={{ height: 0 }}
            animate={{ height: Math.min(scrollY, lineHeight) }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          />

          {/* Cards with scroll animations and node sync */}
          {[
            {
              company: "Company A",
              role: "Frontend Developer",
              duration: "Jan 2023 - Present",
              details:
                "Built React components, optimized performance, integrated dark mode, and followed secure coding practices.",
            },
            {
              company: "Company B",
              role: "Backend Developer",
              duration: "Jun 2022 - Dec 2022",
              details:
                "Developed Node.js REST APIs, managed PostgreSQL database, and implemented JWT-based authentication.",
            },
            {
              company: "Company C",
              role: "Intern",
              duration: "Jan 2022 - May 2022",
              details: "Worked on Python scripts for automation, learned software security best practices.",
              isLast: true,
            },
          ].map((exp, index) => (
            <div key={index} className="ml-10 timeline-card relative">
              {/* Node */}
              <motion.div
                className="absolute left-0 w-4 h-4 rounded-full bg-blue-500 origin-center"
                animate={{
                  scale:
                    cardPositions[index] && scrollY >= cardPositions[index] - 50
                      ? 1.5
                      : 1,
                }}
                transition={{ type: "spring", stiffness: 300 }}
              />

              {/* Card */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <ExperienceCard {...exp} />
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications Section */}
      <section className="px-6 py-12 relative bg-darkBg">
        <h2 className="text-3xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-center animate-gradient-x">Certifications</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "React Developer",
              organization: "Meta",
              description: "Completed in-depth React course, covering hooks, state management, and performance optimization.",
            },
            {
              title: "Full-Stack Web Development",
              organization: "Coursera",
              description: "Built full-stack projects with Node.js, Express, React, and MongoDB following secure coding practices.",
            },
            {
              title: "AWS Cloud Practitioner",
              organization: "Amazon",
              description: "Gained foundational knowledge of AWS services, cloud architecture, and security best practices.",
            },
            {
              title: "Python Security Automation",
              organization: "Udemy",
              description: "Automated security testing using Python scripts and learned secure development workflows.",
            },
            {
              title: "Python Security Automation",
              organization: "Udemy",
              description: "Automated security testing using Python scripts and learned secure development workflows.",
            },
            {
              title: "JavaScript Algorithms & Data Structures",
              organization: "freeCodeCamp",
              description: "Mastered algorithms and data structures in JS with practical implementations.",
            },
          ].map((cert, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 cursor-pointer transition-transform duration-300 w-full"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{cert.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-300">{cert.organization}</p>
              <p className="mt-2 text-gray-700 dark:text-gray-200">{cert.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
