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
    <div className="  min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col justify-center items-center text-center min-h-screen w-full pt-40">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl font-bold mb-4"
        >
          Building Secure, Scalable & Smart Web Experiences
        </motion.h1>
        <motion.p
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1.5 }}
  className="text-xl max-w leading-relaxed mt-5"
>
  Welcome to my Portfolio👋 — I began my journey with a B.Tech. in Computer Science and Engineering, complemented by a Minor in Big Data Analytics. During my time at university, I became actively involved with the Manipal Information Security Team, where I grew from a curious learner into a Board Member, shaping initiatives around cybersecurity.

While still pursuing my degree, I took on the role of Teacher Assistant at Coding Ninjas, where I taught Data Structures, Algorithms, and Data Analysis to aspiring developers. Teaching turned out to be a deeply fulfilling experience—it not only sharpened my own concepts but also gave me the joy of mentoring others.

After graduation, I stepped into the industry as a Backend Developer at Bank of America, where I got hands-on exposure to enterprise-level software development. Building on that foundation, I further expanded my skill set by joining the Google Cloud Cohort, strengthening my expertise in cloud technologies.

Currently, I’m working as a Full-Stack Developer Intern at EazyByts, where I continue to broaden my horizons by contributing to end-to-end application development while keeping my focus on speed, security, and scalability.  
  <br /><br />
  And now… you’re looking at my portfolio — not just a website, but a working demo of my full-stack skills.  
  Built with the MERN Stack (MongoDB, Express, React, Node), it ties together everything I enjoy: designing secure backends, building smooth frontends, and sprinkling in automation that makes life easier.  
  I’ve also built gaming projects and automation pipelines — because sometimes the best way to learn is to play, and the best way to work is to automate.  
  <br /><br />
  Beyond the code, I stay grounded through music, meditation, reading, and living a life of service.  
  For me, development isn’t just about apps — it’s about harmony: between tech and people, between creation and peace.  
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
              company: "EazyByts",
              role: "Full-Stack Developer Intern",
              duration: "September 2025 - Present",
              details: "Built a Portfolio Website as the Week 1 Project with integrated CMS using the MERN stack (MongoDB, Express, React, Node.js), featuring JWT authentication, CRUD operations, contact form with email notifications, and responsive UI.",
                
            },
            {
              company: "Google Cloud Skills Boost",
              role: "Cloud Developer Trainee",
              duration: "August 2025 - September 2025",
              details: "Developed Node.js REST APIs, managed PostgreSQL database, and implemented JWT-based authentication. Deployed serverless web applications using Compute Engine and Cloud Run Functions, integrating with Pub/Sub, Cloud Storage and API Gateway. Earned skill badges validating expertise in cloud-native development, and container orchestration",
            },
            {
              company: "Bank of America",
              role: "Sr. Tech. Associate - Backend Developer",
              duration: "June 2022 - April 2023",
              details: "Developed and maintained RESTful APIs using Python (FastAPI) to support banking operations while designing and managing sql queries and procedures using Toad for SQL to write, test and optimize those queries, ensuring high reliability across datasets exceeding 1M+ records and bring response time down by 20%. Collaborated with Innovation Team to build a virtual banking environment prototype in Unreal Engine, driving innovation and influencing future digital banking experiences for which I received Global Recognition. Authored clear and reusable technical documentation and API specifications, enabling faster onboarding of new developers and improving knowledge transfer efficiency.",
              isLast: true,
            },
            {
              company: "Coding Ninjas",
              role: "Teaching Assistant",
              duration: "September 2021 - January 2022",
              details: "Assisted 200+ learners in mastering Data Structures & Algorithms (DSA) with Python and SQL, maintaining an average learner rating of 4.7/5. Conducted doubt resolution sessions, debugged student code, and provided optimized solutions for algorithmic and sql query problems.",
              isLast: true,
            },
            {
              company: "Manipal Information Security Team",
              role: "Board Member",
              duration: "June 2020 - April 2021",
              details: "Grew from a curious Club Member into a Board Member, shaping initiatives around cybersecurity",
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
      <section className="px-6 py-12 relative">
        <h2 className="text-3xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-center animate-gradient-x">Certifications</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Cloud Development with GCP",
              organization: "Google Cloud Skills Boost",
              description: "Integrating Pub/Sub, Cloud Storage, Compute Machines and API Gateway to build and deploy serverless web applications on Google Cloud Platform using Docker Containers.",
            },
            {
              title: "Linux Unhatched",
              organization: "Cisco",
              description: "Developed foundational Linux skills, including command-line proficiency, file system navigation, and scripting.",
            },
            {
              title: "User Experience Design",
              organization: "Google",
              description: "Gained knowledge of UX design principles, user research, and prototyping along with hands-on experience using Figma.",
            },
            {
              title: "Python for AI and Development",
              organization: "IBM",
              description: "Developed skills in Python programming, machine learning, and AI workflow optimization.",
            },
            {
              title: "Big Data Analytics",
              organization: "University of California, San Diego",
              description: "Big data concepts, tools, and techniques for analyzing large datasets effectively.",
            },
            {
              title: "Cyberops Infosec Expert [CO-ISE]",
              organization: "Cyberops Infosec LLP",
              description: "Cybersecurity principles, threat analysis, and defense mechanisms.",
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
