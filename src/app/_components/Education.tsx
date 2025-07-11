"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useRef } from "react";

interface EducationItem {
  institution: string;
  degree: string;
  field: string;
  duration: string;
  achievements: string[];
  gpa?: string;
}

export function Education() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const education: EducationItem[] = [
    {
      institution: "National University of Singapore",
      degree: "Bachelor of Computing (Honours)",
      field: "Computer Science",
      duration: "2023 - 2027",
      gpa: "4.61/5.00",
      achievements: [
        "A+ for IS2238 Economics of IT and AI",
        "A for CS2100 Computer Organisation, CS2105 Introduction to Computer Networks, ST2334 Probability and Statistics, MA1521 Calculus for Computing"
      ]
    },
    {
      institution: "Anglo-Chinese Junior College",
      degree: "A-Level",
      field: "Science",
      duration: "2018 - 2019",
      gpa: "87.5 RP",
      achievements: [
        "6 A-Level Distinctions in Mathematics, Physics, Chemistry, Economics, Chinese, and Project Work"
      ]
    }
  ];

  const certifications = [
    { name: "AWS Solutions Architect", issuer: "Amazon Web Services", year: "2023", color: "from-orange-400 to-red-500" },
    { name: "Google Cloud Professional", issuer: "Google Cloud", year: "2022", color: "from-blue-400 to-cyan-500" },
    { name: "React Developer Certification", issuer: "Meta", year: "2022", color: "from-cyan-400 to-blue-500" },
    { name: "Kubernetes Administrator", issuer: "CNCF", year: "2021", color: "from-purple-400 to-pink-500" }
  ];

  return (
    <section
      id="education"
      ref={containerRef}
      className="relative min-h-screen py-32 px-6 bg-black overflow-hidden"
    >
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{ y }}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-green-500/20 to-cyan-500/20 rounded-full blur-3xl" />
      </motion.div>

      <div className="relative max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          ref={ref}
          className="text-center mb-32"
          initial={{ opacity: 0, y: 100 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <motion.div
            className="inline-block mb-8"
          >
            <h2 className="text-6xl md:text-8xl font-black tracking-tight">
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                EDUCATION
              </span>
            </h2>
          </motion.div>
          
          <motion.p
            className="text-xl text-gray-400 max-w-3xl mx-auto font-light"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            A journey of continuous learning, research, and academic achievement 
            in the ever-evolving field of computer science
          </motion.p>
        </motion.div>

        {/* Education Timeline */}
        <div className="relative mb-32">
          {/* Vertical timeline line */}
          <motion.div
            className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan-400 to-transparent transform -translate-x-1/2"
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ delay: 0.8, duration: 1.5 }}
          />

          <div className="space-y-32">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 1 + index * 0.3, duration: 0.8 }}
              >
                {/* Timeline dot */}
                <motion.div
                  className="absolute left-1/2 top-1/2 w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10"
                  whileHover={{ scale: 1.5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-ping opacity-75" />
                </motion.div>

                  {/* Education card */}
                 <motion.div
                   className={`w-full max-w-lg md:max-w-2xl ${
                     index % 2 === 0 ? 'mr-auto pr-6 md:pr-16' : 'ml-auto pl-6 md:pl-16'
                   }`}
                   whileHover={{ scale: 1.02, rotate: index % 2 === 0 ? 1 : -1 }}
                   transition={{ duration: 0.3 }}
                 >
                   <div className="relative group">
                     {/* Glass morphism card */}
                     <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl rounded-3xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300" />
                     
                     <div className="relative bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl rounded-3xl p-6 md:p-10 border border-white/10 group-hover:border-cyan-400/30 transition-all duration-300">
                       {/* Institution header with logo space */}
                       <div className="flex items-start gap-4 md:gap-6 mb-6 md:mb-8">
                         {/* Logo placeholder */}
                         <motion.div
                           className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/20 flex items-center justify-center group-hover:border-cyan-400/30 transition-all duration-300"
                           whileHover={{ scale: 1.1, rotate: 5 }}
                           transition={{ duration: 0.3 }}
                         >
                           {/* Placeholder for school logo */}
                           <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-xl flex items-center justify-center">
                             <span className="text-xl md:text-2xl">🎓</span>
                           </div>
                         </motion.div>

                         <div className="flex-1 min-w-0">
                           <motion.h3
                             className="text-xl md:text-3xl font-bold text-white mb-2 md:mb-3 group-hover:text-cyan-400 transition-colors duration-300"
                             whileHover={{ x: 5 }}
                           >
                             {edu.institution}
                           </motion.h3>
                           <h4 className="text-lg md:text-xl font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-1 md:mb-2">
                             {edu.degree}
                           </h4>
                           <p className="text-base md:text-lg text-gray-400 font-medium">{edu.field}</p>
                         </div>
                         
                         {edu.gpa && (
                           <motion.div
                             className="text-right flex-shrink-0"
                             whileHover={{ scale: 1.1 }}
                           >
                             <div className="text-xs md:text-sm text-gray-500 mb-1">GPA</div>
                             <div className="text-lg md:text-2xl font-bold text-green-400">{edu.gpa}</div>
                           </motion.div>
                         )}
                       </div>

                      {/* Duration with styling */}
                      <motion.div
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full px-4 py-2 mb-6"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                        <span className="text-cyan-400 font-medium text-sm">{edu.duration}</span>
                      </motion.div>

                      {/* Achievements with modern styling */}
                      <div className="space-y-3">
                        {edu.achievements.map((achievement, idx) => (
                          <motion.div
                            key={idx}
                            className="flex items-start gap-3 group/item"
                            initial={{ opacity: 0, y: 10 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 1.5 + index * 0.3 + idx * 0.1, duration: 0.5 }}
                            whileHover={{ x: 5 }}
                          >
                            <motion.div
                              className="w-1.5 h-1.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mt-2 flex-shrink-0"
                              whileHover={{ scale: 1.5 }}
                            />
                            <span className="text-gray-300 text-sm leading-relaxed group-hover/item:text-white transition-colors duration-200">
                              {achievement}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 