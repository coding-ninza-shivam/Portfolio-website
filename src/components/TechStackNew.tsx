import { useState, useMemo, useRef, useEffect } from "react";
import "./styles/TechStackNew.css";

export interface TechItem {
  name: string;
  fullName?: string;
  category: string;
  icon: string;
  url: string;
}

// Inverted pyramid rows for "All" view: 9 -> 8 -> 7 -> 6 -> 4 -> 3 = 37 items
export const techStackPyramid: TechItem[][] = [
  // Row 1 - 9 items: Languages, Core Web, APIs & Core Data
  [
    { name: "Python", fullName: "Python Programming", category: "Languages & Core", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", url: "https://python.org" },
    { name: "HTML", fullName: "HTML5", category: "Languages & Core", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
    { name: "CSS", fullName: "CSS3", category: "Languages & Core", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
    { name: "FastAPI", fullName: "FastAPI High-Performance APIs", category: "Backend & APIs", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg", url: "https://fastapi.tiangolo.com" },
    { name: "Flask", fullName: "Flask Web Framework", category: "Backend & APIs", icon: "/images/icons/flask.svg", url: "https://flask.palletsprojects.com" },
    { name: "Streamlit", fullName: "Streamlit Data Applications", category: "Backend & APIs", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/streamlit/streamlit-original.svg", url: "https://streamlit.io" },
    { name: "NumPy", fullName: "NumPy Scientific Computing", category: "Data Science & AI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg", url: "https://numpy.org" },
    { name: "Pandas", fullName: "Pandas Data Analysis", category: "Data Science & AI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg", url: "https://pandas.pydata.org" },
    { name: "Scikit-Learn", fullName: "Scikit-learn Machine Learning", category: "Data Science & AI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg", url: "https://scikit-learn.org" },
  ],
  // Row 2 - 8 items: AI, Deep Learning, LLMs & Analytics
  [
    { name: "TensorFlow", fullName: "TensorFlow Deep Learning", category: "Data Science & AI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg", url: "https://tensorflow.org" },
    { name: "PyTorch", fullName: "PyTorch Deep Learning", category: "Data Science & AI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg", url: "https://pytorch.org" },
    { name: "Keras", fullName: "Keras Deep Learning", category: "Data Science & AI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/keras/keras-original.svg", url: "https://keras.io" },
    { name: "Hugging Face", fullName: "Hugging Face Transformers & Hub", category: "Data Science & AI", icon: "https://huggingface.co/front/assets/huggingface_logo-noborder.svg", url: "https://huggingface.co" },
    { name: "Ollama", fullName: "Ollama Local Large Language Models", category: "Data Science & AI", icon: "/images/icons/ollama.svg", url: "https://ollama.com" },
    { name: "Matplotlib", fullName: "Matplotlib Visualization", category: "Data Science & AI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg", url: "https://matplotlib.org" },
    { name: "Seaborn", fullName: "Seaborn Statistical Data Viz", category: "Data Science & AI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/seaborn/seaborn-original.svg", url: "https://seaborn.pydata.org" },
    { name: "MSSQL", fullName: "Microsoft SQL Server", category: "Databases", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg", url: "https://www.microsoft.com/sql-server" },
  ],
  // Row 3 - 7 items: Databases, BI & DevOps
  [
    { name: "MySQL", fullName: "MySQL Relational Database", category: "Databases", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", url: "https://mysql.com" },
    { name: "SQLite", fullName: "SQLite Embedded Database", category: "Databases", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg", url: "https://sqlite.org" },
    { name: "Intellicus", fullName: "Intellicus Business Intelligence (BI)", category: "BI & Automation", icon: "/images/icons/intellicus.svg", url: "https://intellicus.com" },
    { name: "n8n", fullName: "n8n Workflow Automation", category: "BI & Automation", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/n8n/n8n-original.svg", url: "https://n8n.io" },
    { name: "Git", fullName: "Git Version Control", category: "DevOps & VCS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", url: "https://git-scm.com" },
    { name: "GitHub", fullName: "GitHub Code Hosting & CI/CD", category: "DevOps & VCS", icon: "/images/icons/github.svg", url: "https://github.com" },
    { name: "Docker", fullName: "Docker Containerization", category: "DevOps & VCS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", url: "https://docker.com" },
  ],
  // Row 4 - 6 items: Cloud, Notebooks & IDEs
  [
    { name: "VS Code", fullName: "Visual Studio Code", category: "Cloud & Environments", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg", url: "https://code.visualstudio.com" },
    { name: "Jupyter", fullName: "Jupyter Notebook", category: "Cloud & Environments", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg", url: "https://jupyter.org" },
    { name: "Colab", fullName: "Google Colaboratory", category: "Cloud & Environments", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecolab/googlecolab-original.svg", url: "https://colab.research.google.com" },
    { name: "Kaggle", fullName: "Kaggle Platform", category: "Cloud & Environments", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kaggle/kaggle-original.svg", url: "https://kaggle.com" },
    { name: "Replit", fullName: "Replit Cloud IDE", category: "Cloud & Environments", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/replit/replit-original.svg", url: "https://replit.com" },
    { name: "Vercel", fullName: "Vercel Cloud Deployment", category: "Cloud & Environments", icon: "/images/icons/vercel.svg", url: "https://vercel.com" },
  ],
  // Row 5 - 4 items: GUI, API Testing & UI Design
  [
    { name: "Tkinter", fullName: "Python Tkinter GUI Framework", category: "Python GUI & Graphics", icon: "/images/icons/tkinter.svg", url: "https://docs.python.org/3/library/tkinter.html" },
    { name: "Turtle", fullName: "Python Turtle Graphics", category: "Python GUI & Graphics", icon: "/images/icons/turtle.svg", url: "https://docs.python.org/3/library/turtle.html" },
    { name: "Postman", fullName: "Postman API Testing", category: "API Testing", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg", url: "https://postman.com" },
    { name: "Figma", fullName: "Figma Collaborative Interface Design", category: "Design & Productivity", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", url: "https://figma.com" },
  ],
  // Row 6 - 3 items: Vector Design, Graphics & Productivity
  [
    { name: "Illustrator", fullName: "Adobe Illustrator Vector Graphics", category: "Design & Productivity", icon: "/images/icons/illustrator.svg", url: "https://adobe.com/products/illustrator" },
    { name: "CorelDraw", fullName: "CorelDRAW Vector Illustration", category: "Design & Productivity", icon: "/images/icons/coreldraw.svg", url: "https://coreldraw.com" },
    { name: "MS Office", fullName: "Microsoft 365 & Office Suite", category: "Design & Productivity", icon: "https://img.icons8.com/color/48/microsoft-office-2019.png", url: "https://microsoft.com/microsoft-365" },
  ],
];

export const CATEGORIES = [
  "All",
  "Languages & Core",
  "Backend & APIs",
  "Data Science & AI",
  "Databases",
  "BI & Automation",
  "DevOps & VCS",
  "Cloud & Environments",
  "Python GUI & Graphics",
  "API Testing",
  "Design & Productivity",
] as const;

export type CategoryName = (typeof CATEGORIES)[number];

const TechStackNew = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryName>("All");

  // Flatten all items for filtering
  const allItems = useMemo(
    () => techStackPyramid.flatMap((row) => row),
    []
  );

  // Filter items when a specific category is active
  const filteredItems = useMemo(() => {
    if (activeCategory === "All") return null;
    return allItems.filter((item) => item.category === activeCategory);
  }, [activeCategory, allItems]);

  // Compute item counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: allItems.length };
    allItems.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, [allItems]);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;

    const playVideo = () => {
      const promise = video.play();
      if (promise !== undefined) {
        promise.catch((err) => {
          console.warn("TechStack video autoplay prevented:", err);
        });
      }
    };

    playVideo();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            playVideo();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="techstack-new">
      {/* Video Background */}
      <div className="techstack-video-container">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="techstack-video"
        >
          <source src="/video/video.webm" type="video/webm" />
        </video>
        {/* Glowing Center Accent */}
        <div className="techstack-center-glow" aria-hidden="true"></div>
        {/* Dark Vignette Overlay */}
        <div className="techstack-overlay"></div>
      </div>

      {/* Content */}
      <div className="techstack-content">
        <h2>Tech Stack</h2>

        {/* Category Filter Tabs */}
        <div className="techstack-categories">
          {CATEGORIES.map((cat) => {
            const count = categoryCounts[cat] || 0;
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                className={`techstack-category-btn ${isActive ? "active" : ""}`}
                onClick={() => setActiveCategory(cat)}
                data-cursor="disable"
              >
                <span>{cat}</span>
                <span className="techstack-category-badge">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Display: Inverted Pyramid for "All", Centered Grid for Filtered */}
        {activeCategory === "All" ? (
          <div className="techstack-pyramid">
            {techStackPyramid.map((row, rowIndex) => (
              <div key={rowIndex} className="techstack-row">
                {row.map((tech, techIndex) => (
                  <a
                    key={techIndex}
                    href={tech.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="techstack-item"
                    title={tech.fullName || tech.name}
                    data-cursor="disable"
                  >
                    <img src={tech.icon} alt={tech.name} loading="lazy" decoding="async" />
                    <span>{tech.name}</span>
                  </a>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="techstack-filtered-wrapper">
            <div className="techstack-filtered-header">
              <span className="techstack-filtered-title">{activeCategory}</span>
              <span className="techstack-filtered-meta">
                {filteredItems?.length} {filteredItems?.length === 1 ? "tool" : "tools"}
              </span>
            </div>
            <div className="techstack-filtered-grid">
              {filteredItems?.map((tech, index) => (
                <a
                  key={index}
                  href={tech.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="techstack-item"
                  title={tech.fullName || tech.name}
                  data-cursor="disable"
                >
                  <img src={tech.icon} alt={tech.name} loading="lazy" decoding="async" />
                  <span>{tech.name}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TechStackNew;
