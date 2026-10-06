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
  SiClaude,
  SiOpenai,
} from "react-icons/si";
import { AntigravityIcon, CursorIcon, T3CodeIcon } from "./brandIcons";

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
      "Built an automated security review system for TAE, ByteDance's agent platform, and worked with the security team to streamline approval rules, increasing network policy releases handled without manual review from 3% to 90% over four months.",
      "Led a zero-downtime migration of TAE's security policy service, MySQL database, and Redis cache to a new data center; resolved a performance bottleneck that reduced policy publishing time from 87 seconds to 5 seconds.",
      "Built identity and access controls for TAE's agent-to-service connections, migrating more than 13,600 connections across China and international production environments.",
      "Developed multi-tenant access controls and APIs for ByteClaw, a managed AI agent platform, enabling business teams and external customers to manage agent instances, backups, model changes, and remote jobs programmatically.",
      "Built an LLM evaluation framework for ByteCloud's AI Assistant, with 350 test cases and a results dashboard, enabling engineers to compare model accuracy, latency, and cost across four AI agent roles.",
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
  githubUrl?: string;
  liveUrl?: string;
  /** Text for the live link when it is not a running app, e.g. a landing page */
  liveLabel?: string;
  screenshots: { src: string; alt: string; label: string }[];
  /** Accent used for the scroll-highlight background treatment */
  accentHex: string;
  /** Same accent as "r, g, b" for alpha compositing */
  accentRGB: string;
}

// Plan Dashboard leads as the featured open-source project; the rest are ordered
// by the combined strength of engineering scope and visual design.
export const projects: ProjectItem[] = [
  {
    title: "Plan Dashboard",
    description:
      "An open-source dashboard for reading the HTML and Markdown plans that coding agents write. Every plan, explainer, and recap of a task phase opens side by side in editor-style split panes and reloads the moment an agent writes or edits it. Works with any agent that writes files.",
    features: [
      "Editor-style split panes with drag-and-drop tabs and resizable layouts",
      "Workspaces per project phase, remembered layouts, and shareable deep links",
      "Live notifications and in-place reloads as agents write plans, with scroll positions kept",
      "Folder layout, phases, and file types configured in settings, with a live preview",
      "Bundled agent skills that generate readable HTML plan pages",
    ],
    technologies: ["TypeScript", "React", "Node.js", "Vite"],
    githubUrl: "https://github.com/limyuquan/planner",
    liveUrl: "https://limyuquan.github.io/planner/",
    liveLabel: "Landing page",
    screenshots: [
      {
        src: "/images/projects/plan-dashboard-home.webp",
        alt: "Plan Dashboard landing page with the headline Keep up with what your agents plan, a new plan notification, and a live demo with three plans open side by side",
        label: "Landing page with live demo",
      },
      {
        src: "/images/projects/plan-dashboard-panes.webp",
        alt: "Plan Dashboard with a workspace sidebar and a plan, an ELI5 explainer, and a recap open in three split panes",
        label: "Plans from one phase in split panes",
      },
      {
        src: "/images/projects/plan-dashboard-settings.webp",
        alt: "Plan Dashboard settings dialog with folder rules, phase pattern, and doc types beside a live preview of the tasks, phases, and docs it finds",
        label: "Folder rules with a live preview",
      },
      {
        src: "/images/projects/plan-dashboard-recap.webp",
        alt: "An agent-written recap page rendered in Plan Dashboard with a bar chart of lines per file and a written breakdown of the change",
        label: "An agent-written recap page",
      },
    ],
    accentHex: "#5eead4",
    accentRGB: "94, 234, 212",
  },
  {
    title: "nayaPoca",
    description:
      "A full-stack photocard platform for izna fans: discover cards, build a collection, and identify a card from a photo. A searchable catalog brings the collecting experience together with community contributions and moderation.",
    features: [
      "Virtualized catalog with faceted search and shareable filters",
      "3D card viewer with front/back images and GIF export",
      "Collection tracking, progress, and shareable templates",
      "On-device image recognition and moderated image contributions",
    ],
    technologies: ["Next.js", "TypeScript", "Convex", "WorkOS"],
    liveUrl: "https://nayapoca.vercel.app/",
    screenshots: [
      {
        src: "/images/projects/nayapoca-home-v2.webp",
        alt: "nayaPoca landing page with a colorful photocard arrangement and catalog and collection links",
        label: "Photocard collecting for every naya",
      },
      {
        src: "/images/projects/nayapoca-catalog-v2.webp",
        alt: "nayaPoca catalog populated with Set The Tempo photocards and era, card type, and image filters",
        label: "Searchable photocard catalog",
      },
      {
        src: "/images/projects/nayapoca-viewer-v2.webp",
        alt: "nayaPoca interactive 3D photocard viewer with an angled card, viewing controls, and card details",
        label: "Interactive 3D card viewer",
      },
    ],
    accentHex: "#22d3ee",
    accentRGB: "34, 211, 238",
  },
  {
    title: "naya/bio",
    description:
      "A link-in-bio builder that turns a fan profile into a personal collect book. Fans arrange links, socials, music, and a custom fan card, then publish a page with a look inspired by their favorite member or era.",
    features: [
      "Drag-and-drop block editor with a live page preview",
      "Member, era, and custom themes with accessible colors",
      "Draft autosave, undo/redo, and explicit publishing",
      "Custom usernames, share links, and QR codes",
    ],
    technologies: ["Next.js", "TypeScript", "Convex", "WorkOS"],
    liveUrl: "https://nayabio.vercel.app/",
    screenshots: [
      {
        src: "/images/projects/nayabio-home-v2.webp",
        alt: "naya/bio landing page with a photocard fan and custom username input",
        label: "Create a fan card",
      },
      {
        src: "/images/projects/nayabio-style-v2.webp",
        alt: "naya/bio theme picker with member and era designs beside a populated Nebula fan-page preview",
        label: "Theme builder and live preview",
      },
      {
        src: "/images/projects/nayabio-editor-v2.webp",
        alt: "naya/bio block editor with a sample profile, social icons, links, and a live Nebula page preview",
        label: "Drag-and-drop page editor",
      },
    ],
    accentHex: "#ec4899",
    accentRGB: "236, 72, 153",
  },
  {
    title: "izna Showcase",
    description:
      "An interactive fan site with six individually art-directed member experiences. Each page has its own visual language, pairing curated photography with scroll-driven storytelling, playful interactions, and an explorable discography.",
    features: [
      "Six distinct member designs and interactive photo galleries",
      "Scroll-driven transitions, typography, and visual effects",
      "Era-by-era photography and member profiles",
      "Responsive layouts and optimized image variants",
    ],
    technologies: ["Astro", "TypeScript", "CSS"],
    liveUrl: "https://izna-showcase.vercel.app/",
    screenshots: [
      {
        src: "/images/projects/showcase-home-v2.webp",
        alt: "izna Showcase home page presenting six member photo albums on glass shelves",
        label: "Interactive member album shelf",
      },
      {
        src: "/images/projects/showcase-mai.webp",
        alt: "izna Showcase Mai page with an orange magazine cover, portrait, playful typography, and era navigation",
        label: "Mai: magazine-inspired art direction",
      },
      {
        src: "/images/projects/showcase-koko-v2.webp",
        alt: "izna Showcase Koko page with violet typography, portrait, and paw-shaped navigation",
        label: "Koko: a distinct visual identity",
      },
      {
        src: "/images/projects/showcase-saebi.webp",
        alt: "izna Showcase Saebi page with a sharp portrait framed by pink and gold palace artwork and elegant typography",
        label: "Saebi: a pink and gold palace",
      },
    ],
    accentHex: "#a78bfa",
    accentRGB: "167, 139, 250",
  },
  {
    title: "Multitwitcher",
    description:
      "A multi-stream Twitch workspace for following live events from several perspectives. A keyboard-driven channel launcher feeds a flexible viewing layout, with live previews, resizable tiles, and switchable chat.",
    features: [
      "Channel search with live status and multiview previews",
      "Resizable stream tiles with focus and drag-to-reorder",
      "Keyboard command palette for managing the viewing layout",
      "Switchable Twitch chat and stream-group themes",
    ],
    technologies: ["Next.js", "TypeScript", "Twitch API"],
    githubUrl: "https://github.com/limyuquan/multitwitch",
    liveUrl: "https://multitwitcher.vercel.app/",
    screenshots: [
      {
        src: "/images/projects/multitwitch-setup.webp",
        alt: "Multitwitcher keyboard-driven channel launcher with two live channels and side-by-side stream previews",
        label: "Channel launcher and live previews",
      },
      {
        src: "/images/projects/multitwitch-watch.webp",
        alt: "Multitwitcher showing two Twitch streams side by side with switchable chat",
        label: "Multi-stream viewing and chat",
      },
    ],
    accentHex: "#9147ff",
    accentRGB: "145, 71, 255",
  },
  {
    title: "izna Seatmate Finder",
    description:
      "A real-time seatmate finder for an izna concert in Singapore. Fans locate their seat or standing queue number, discover nearby fans, and find people sharing freebies through an interactive venue map.",
    features: [
      "Zoomable SVG seating map and standing queue grids",
      "Live seat claims, nearby fans, and freebie discovery",
      "Search and member filters with optional profile details",
      "Cross-device PIN recovery, rate limits, and moderation",
    ],
    technologies: ["Next.js", "TypeScript", "Convex"],
    liveUrl: "https://izna-seatmap.vercel.app/",
    screenshots: [
      {
        src: "/images/projects/seatmap-populated-v2.webp",
        alt: "izna Seatmate Finder venue map with sample claimed seats, member colors, and freebie markers",
        label: "Interactive venue map",
      },
      {
        src: "/images/projects/seatmap-neighbours-v2.webp",
        alt: "izna Seatmate Finder sample fan profile with a map of nearby fans and their seats",
        label: "Meet the fans around your seat",
      },
    ],
    accentHex: "#f9a8d4",
    accentRGB: "249, 168, 212",
  },
  {
    title: "naya Calendar",
    description:
      "A fan calendar for keeping up with izna performances, releases, broadcasts, and member activities. A galaxy-inspired interface brings a busy schedule into one place, with local-time event details and Google Calendar integration.",
    features: [
      "Live event updates and member-specific activity filters",
      "Desktop month grid and mobile day-by-day agenda",
      "Local-time event details with all-day event support",
      "Google Calendar synchronization and calendar subscription",
    ],
    technologies: ["Next.js", "TypeScript", "Convex", "Google Calendar API"],
    liveUrl: "https://nayacalendar.com/",
    screenshots: [
      {
        src: "/images/projects/calendar-month-v2.webp",
        alt: "naya Calendar June 2026 month view populated with comeback activities, performances, and broadcasts",
        label: "A full month of fan activities",
      },
      {
        src: "/images/projects/calendar-event-v2.webp",
        alt: "naya Calendar Set The Tempo Comeback event details with date, local time, and participating members",
        label: "Event details in local time",
      },
    ],
    accentHex: "#c084fc",
    accentRGB: "192, 132, 252",
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
  {
    title: "AI Tools",
    items: [
      { name: "Claude Code", Icon: SiClaude, color: "#D97757" },
      { name: "Codex", Icon: SiOpenai, color: "#ffffff" },
      { name: "T3 Code", Icon: T3CodeIcon, color: "#ffffff" },
      { name: "Cursor", Icon: CursorIcon, color: "#ffffff" },
      { name: "Antigravity", Icon: AntigravityIcon, color: "#ffffff" },
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
  { name: "Blog", id: "/blog", isExternal: true },
];
