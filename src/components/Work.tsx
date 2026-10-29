import "./styles/Work.css";
import { config } from "../config";

const Work = () => {
  return (
    <div className="work-section section-container" id="work">
      <div className="work-container">
        <h2>
          My <span>Work</span>
        </h2>

        <div className="work-tbu-wrapper">
          <div className="work-tbu-card">
            <div className="work-tbu-glow"></div>

            <div className="work-tbu-badge">
              <span className="work-tbu-pulse"></span>
              To Be Updated
            </div>

            <div className="work-tbu-icon-wrapper">
              <svg
                className="work-tbu-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m18 16 4-4-4-4" />
                <path d="m6 8-4 4 4 4" />
                <path d="m14.5 4-5 16" />
              </svg>
            </div>

            <h3 className="work-tbu-title">Projects Under Curation</h3>

            <p className="work-tbu-desc">
              Featured works, intelligent systems, and automated machine learning pipelines are currently being updated and documented.
            </p>

            <a
              href={config.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="work-tbu-btn"
              data-cursor="disable"
            >
              <span>Explore GitHub Repositories</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
