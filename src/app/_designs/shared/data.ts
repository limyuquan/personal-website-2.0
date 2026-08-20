import type { IconType } from "react-icons";
import {
  SiPython,
  SiGo,
  SiOpenjdk,
  SiPhp,
  SiFastapi,
  SiDjango,
  SiFlask,
  SiLaravel,
  SiReact,
  SiNextdotjs,
  SiSvelte,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiPostgresql,
  SiMysql,
  SiAwslambda,
  SiAmazons3,
  SiDocker,
  SiGit,
  SiGitlab,
  SiJira,
  SiConfluence,
  SiPytest,
  SiJest,
} from "react-icons/si";

export const profile = {
  name: "Yu Quan Lim",
  firstName: "Yu Quan",
  role: "Full-Stack Software Engineer",
  location: "Singapore",
  school: "National University of Singapore",
  degree: "Computer Science",
  blurb:
    "I build digital experiences that are both beautiful and functional, across modern web frontends and backend systems.",
  currently:
    "Backend engineer intern at ByteDance, Computer Science undergraduate at NUS.",
  email: "limyuquan02@gmail.com",
  resumeUrl: "/files/limyuquan-resume.pdf",
  photo: "/images/photos/limyuquan.jpg",
  github: "https://github.com/limyuquan",
  linkedin: "https://linkedin.com/in/limyuquan",
};

export interface ExperienceItem {
  company: string;
  position: string;
  duration: string;
  /** Short years label, e.g. "2026" for compact list layouts */
  year: string;
  /** One-line summary for compact layouts */
  summary: string;
  description: string[];
  technologies: string[];
  logo: string;
  projectUrl?: string;
  projectName?: string;
}

export const experiences: ExperienceItem[] = [
  {
    company: "ByteDance",
    position: "Backend Software Engineer Intern",
    duration: "Jan 2026 - Present",
    year: "2026",
    summary:
      "Backend features and LLM evaluation workflows for ByteCloud's AI Assistant.",
    description: [
      "Built backend features for ByteCloud's AI Assistant, including per-agent LLM evaluation workflows for comparing model performance across agents",
      "Created evaluation dashboards and simplified run management to make model selection and experiment review easier for internal teams",
      "Integrated the AI Assistant with a ByteDance knowledge base product, allowing users to attach configurable knowledge bases to their assistants",
      "Built multi-tenant backend capabilities for ByteClaw, supporting external business integrations and safer lifecycle management for OpenClaw instances",
    ],
    technologies: [
      "Go",
      "Python",
      "MongoDB",
      "LLM Evaluation",
      "REST APIs",
      "OpenClaw",
      "ByteCloud",
    ],
    logo: "/images/logos/bytedance.svg",
  },
  {
    company: "Rakuten",
    position: "Full Stack Engineer Intern",
    duration: "Aug 2025 - Dec 2025",
    year: "2025",
    summary:
      "AI ad banner generation platform for merchants in the Visual Intelligence department.",
    description: [
      "Under the Visual Intelligence department, worked on an AI ad banner generation platform for merchants to utilise AI to generate Ad banners for their products",
      "Developed responsive and intuitive user interfaces enabling merchants to seamlessly create AI-powered advertisement banners",
      "Collaborated with cross-functional teams to integrate AI models with frontend components for real-time banner generation",
    ],
    technologies: ["Next.js", "TypeScript", "React", "Tailwind CSS"],
    logo: "/images/logos/rakuten.png",
  },
  {
    company: "Razer",
    position: "Software Engineer (Cloud) Intern",
    duration: "Jan 2025 - Jun 2025",
    year: "2025",
    summary:
      "Cloud services, scheduled jobs, and internal tooling across Go, Python, and Django.",
    description: [
      "Enhanced internal Customer Service Dashboard with new features and backend optimizations using Django, streamlining support agent workflows",
      "Designed and implemented a greenfield Go scheduled job to automate gift-with-purchase processing, including warranty registration validation and automated license code delivery",
      "Developed internal systems for exporting and uploading product serial numbers to Amazon Transparency using Go, ensuring secure and efficient data transfers",
      "Upgraded internal Jira Syncing tool with Python, enabling seamless ticket synchronization and improving cross-team collaboration",
    ],
    technologies: ["Python", "Go", "Django", "MySQL", "AWS S3"],
    logo: "/images/logos/razer.webp",
  },
  {
    company: "GovTech Singapore",
    position: "Software Engineer Intern",
    duration: "Jan 2024 - Nov 2024",
    year: "2024",
    summary:
      "Career Kaki, an LLM-powered Ministry of Manpower initiative for Singaporean employability.",
    description: [
      "Developed Career Kaki, a Ministry of Manpower initiative integrating LLMs to enhance Singaporean employability using agile methodologies",
      "Built responsive front-end interfaces with Svelte, TypeScript, and Tailwind CSS while developing scalable back-end APIs using Python and FastAPI",
      "Created end-to-end data pipeline with TypeScript for career-site scraping and Python for embedding generation and vector store indexing for RAG retrieval",
      "Developed GitLab CI/CD pipelines with automated testing, security (SAST & DAST) scans, and multi-environment deployments, enforcing code quality and reliability",
      "Integrated Google Analytics and built custom dashboards for user interaction metrics, enabling data-informed insights",
    ],
    technologies: [
      "Python",
      "FastAPI",
      "Svelte",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "AWS Lambda",
      "AWS S3",
      "GitLab CI/CD",
      "Google Analytics",
    ],
    logo: "/images/logos/govtech.gif",
    projectUrl: "https://careerkaki.gov.sg/",
    projectName: "Career Kaki",
  },
  {
    company: "Learna Systems Pte Ltd",
    position: "Software Engineer Intern",
    duration: "Feb 2023 - Jan 2024",
    year: "2023",
    summary:
      "Ruiche, an educational social media platform for parents and educators.",
    description: [
      "Developed and maintained Ruiche, an educational social media platform for parents and educators",
      "Led design and implementation of paid subscription service, spearheading app monetisation strategy with exclusive content delivery",
      "Enhanced platform UI/UX resulting in increased user engagement and satisfaction",
      "Built scalable backend systems to support growing user base and feature expansion",
    ],
    technologies: ["React", "JavaScript", "PHP", "Laravel", "SQL"],
    logo: "/images/logos/ruiche.png",
  },
];

export interface EducationItem {
  institution: string;
  degree: string;
  field: string;
  duration: string;
  gpa: string;
  gpaLabel: string;
  achievements: string[];
  logo: string;
}

export const education: EducationItem[] = [
  {
    institution: "National University of Singapore",
    degree: "Bachelor of Computing (Honours)",
    field: "Computer Science",
    duration: "2023 - 2027",
    gpa: "4.61/5.00",
    gpaLabel: "GPA",
    achievements: [
      "A+ for CS2106 Introduction to Operating Systems, IS2238 Economics of IT and AI",
      "A for CS3219 Software Engineering Principles and Patterns, CS2100 Computer Organisation, CS2105 Introduction to Computer Networks, ST2334 Probability and Statistics, MA1521 Calculus for Computing, GEX1014 Logic",
    ],
    logo: "/images/logos/nus.png",
  },
  {
    institution: "Anglo-Chinese Junior College",
    degree: "A-Level",
    field: "Science",
    duration: "2018 - 2019",
    gpa: "87.5 RP",
    gpaLabel: "Rank Points",
    achievements: [
      "6 A-Level Distinctions in Mathematics, Physics, Chemistry, Economics, Chinese, and Project Work",
    ],
    logo: "/images/logos/acjc.png",
  },
];

export interface ProjectItem {
  title: string;
  description: string;
  features: string[];
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  imageUrls: string[];
  /** Accent used for the scroll-highlight background treatment */
  accentHex: string;
  /** Same accent as "r, g, b" for alpha compositing */
  accentRGB: string;
}

export const projects: ProjectItem[] = [
  {
    title: "Multitwitcher",
    description:
      "A platform to watch multiple Twitch streamers at once, or switch between them with a single click. The best way to view live-streamed events from multiple POVs.",
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Twitch API",
      "Vercel",
    ],
    features: [
      "Watch multiple Twitch streamers at once",
      "Customisable stream windows",
      "Real time chat",
      "Custom group themes",
    ],
    githubUrl: "https://github.com/limyuquan/multitwitch",
    liveUrl: "https://multitwitcher.vercel.app/",
    imageUrls: [
      "/images/projects/multitwitcher1.png",
      "/images/projects/multitwitcher.png",
    ],
    accentHex: "#a78bfa",
    accentRGB: "167, 139, 250",
  },
  {
    title: "Reflective Minds",
    description:
      "A journaling platform designed to give users a simple and intuitive place to record their daily thoughts and experiences.",
    technologies: [
      "React",
      "Flask",
      "Javascript",
      "Python",
      "MySQL",
      "Vercel",
      "Heroku",
    ],
    features: [
      "AI-powered journal prompt generation",
      "Journal entry creation, editing, and deletion",
      "Search, sorting and filtering",
      "Emotion-labeling, tagging, and templating",
      "Emotion visualization",
      "Achievement system",
    ],
    githubUrl: "https://github.com/limyuquan/orbital-reflectiveminds",
    imageUrls: [
      "/images/projects/journal.png",
      "/images/projects/journal1.png",
      "/images/projects/journal2.png",
      "/images/projects/journal3.png",
      "/images/projects/journal4.png",
    ],
    accentHex: "#34d399",
    accentRGB: "52, 211, 153",
  },
];

export interface TechItem {
  name: string;
  Icon: IconType;
  /** Brand hex for the icon */
  color: string;
}

export interface TechGroup {
  title: string;
  items: TechItem[];
}

export const techGroups: TechGroup[] = [
  {
    title: "Backend",
    items: [
      { name: "Python", Icon: SiPython, color: "#3776AB" },
      { name: "Go", Icon: SiGo, color: "#00ADD8" },
      { name: "Java", Icon: SiOpenjdk, color: "#ED8B00" },
      { name: "PHP", Icon: SiPhp, color: "#777BB4" },
      { name: "FastAPI", Icon: SiFastapi, color: "#009688" },
      { name: "Django", Icon: SiDjango, color: "#44B78B" },
      { name: "Flask", Icon: SiFlask, color: "#ffffff" },
      { name: "Laravel", Icon: SiLaravel, color: "#FF2D20" },
    ],
  },
  {
    title: "Frontend",
    items: [
      { name: "React", Icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", Icon: SiNextdotjs, color: "#ffffff" },
      { name: "Svelte", Icon: SiSvelte, color: "#FF3E00" },
      { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
      { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
      { name: "HTML", Icon: SiHtml5, color: "#E34F26" },
      { name: "CSS", Icon: SiCss3, color: "#1572B6" },
      { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4" },
    ],
  },
  {
    title: "Database & Cloud",
    items: [
      { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
      { name: "MySQL", Icon: SiMysql, color: "#4479A1" },
      { name: "AWS Lambda", Icon: SiAwslambda, color: "#FF9900" },
      { name: "AWS S3", Icon: SiAmazons3, color: "#569A31" },
      { name: "Docker", Icon: SiDocker, color: "#2496ED" },
    ],
  },
  {
    title: "Tools",
    items: [
      { name: "Git", Icon: SiGit, color: "#F05032" },
      { name: "GitLab CI", Icon: SiGitlab, color: "#FC6D26" },
      { name: "Jira", Icon: SiJira, color: "#0052CC" },
      { name: "Confluence", Icon: SiConfluence, color: "#ffffff" },
      { name: "Pytest", Icon: SiPytest, color: "#0A9EDC" },
      { name: "Jest", Icon: SiJest, color: "#C21325" },
    ],
  },
];

export interface NavSection {
  name: string;
  id: string;
  isExternal?: boolean;
}

export const navSections: NavSection[] = [
  { name: "Home", id: "#" },
  { name: "About", id: "about" },
  { name: "Experience", id: "experience" },
  { name: "Stack", id: "tech-stack" },
  { name: "Education", id: "education" },
  { name: "Projects", id: "projects" },
];
