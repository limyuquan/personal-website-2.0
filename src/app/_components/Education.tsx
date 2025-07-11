"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface EducationItem {
  institution: string;
  degree: string;
  field: string;
  duration: string;
  achievements: string[];
  gpa?: string;
}

export function Education() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const education: EducationItem[] = [
    {
      institution: "Stanford University",
      degree: "Master of Science",
      field: "Computer Science",
      duration: "2017 - 2019",
      gpa: "3.8/4.0",
      achievements: [
        "Specialized in Machine Learning and Distributed Systems",
        "Research Assistant in AI Lab working on NLP projects",
        "Teaching Assistant for Data Structures and Algorithms",
        "Published 2 papers in top-tier conferences"
      ]
    },
    {
      institution: "University of California, Berkeley",
      degree: "Bachelor of Science",
      field: "Electrical Engineering & Computer Science",
      duration: "2013 - 2017",
      gpa: "3.7/4.0",
      achievements: [
        "Dean's List for 4 consecutive semesters",
        "President of Computer Science Student Association",
        "Won 1st place in University Hackathon 2016",
        "Completed senior thesis on Blockchain Technology"
      ]
    }
  ];

  const certifications = [
    { name: "AWS Solutions Architect", issuer: "Amazon Web Services", year: "2023" },
    { name: "Google Cloud Professional", issuer: "Google Cloud", year: "2022" },
    { name: "React Developer Certification", issuer: "Meta", year: "2022" },
    { name: "Kubernetes Administrator", issuer: "CNCF", year: "2021" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <motion.section
      id="education"
      ref={ref}
      className="min-h-screen py-20 px-6 bg-gradient-to-b from-black to-gray-900"
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div className="text-center mb-20" variants={itemVariants}>
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            Education &
            <span className="block bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Learning
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Continuous learning and academic excellence in computer science
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              className="relative"
              variants={itemVariants}
            >
              <motion.div
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 h-full"
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-6">
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mb-4"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <span className="text-2xl">🎓</span>
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {edu.institution}
                  </h3>
                  <h4 className="text-xl text-green-400 mb-1">
                    {edu.degree}
                  </h4>
                  <p className="text-lg text-blue-400 mb-2">
                    {edu.field}
                  </p>
                  <div className="flex justify-between items-center text-gray-400">
                    <span>{edu.duration}</span>
                    {edu.gpa && <span className="font-semibold">GPA: {edu.gpa}</span>}
                  </div>
                </div>

                <ul className="space-y-3">
                  {edu.achievements.map((achievement, idx) => (
                    <motion.li
                      key={idx}
                      className="text-gray-300 flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.1 * idx, duration: 0.5 }}
                    >
                      <span className="text-green-400 mr-3 mt-2">•</span>
                      {achievement}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div variants={itemVariants}>
          <h3 className="text-3xl font-bold text-white mb-12 text-center">
            Professional Certifications
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
                             <motion.div
                 key={index}
                 className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 text-center"
                 whileHover={{ y: -5, scale: 1.05 }}
                 transition={{ duration: 0.2, delay: 0.1 * index }}
                 initial={{ opacity: 0, y: 20 }}
                 animate={inView ? { opacity: 1, y: 0 } : {}}
               >
                <motion.div
                  className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4"
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.4 }}
                >
                  <span className="text-xl">🏆</span>
                </motion.div>
                
                <h4 className="text-lg font-semibold text-white mb-2">
                  {cert.name}
                </h4>
                <p className="text-sm text-gray-400 mb-1">
                  {cert.issuer}
                </p>
                <p className="text-sm text-blue-400 font-medium">
                  {cert.year}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mt-20 text-center"
          variants={itemVariants}
        >
          <motion.div
            className="inline-flex items-center gap-4 bg-white/5 rounded-full px-8 py-4"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
            <span className="text-yellow-400 font-medium">
              Currently pursuing: PhD in Computer Science
            </span>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
} 