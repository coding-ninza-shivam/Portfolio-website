import "./styles/Education.css";
import { config } from "../config";

interface EducationItem {
  degree: string;
  institution: string;
  type?: "degree" | "course";
  cpi?: string;
  period?: string;
  status?: string;
  location?: string;
  badge?: string;
  coursework?: string[];
  highlightsTitle?: string;
  highlights?: string[];
}

const Education = () => {
  return (
    <div className="education-section section-container" id="study">
      <div className="education-container">
        <h2>
          My education <span>&</span>
          <br /> courses
        </h2>

        <div className="education-grid">
          {(config.education as EducationItem[]).map((edu, index) => (
            <div key={index} className="education-card">
              <div className="education-card-glow"></div>

              <div className="education-header">
                <div className="education-icon-wrapper">
                  {edu.type === "course" ? (
                    <svg
                      className="education-cap-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="8" r="6" />
                      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                    </svg>
                  ) : (
                    <svg
                      className="education-cap-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                      <path d="M6 12v5c3 3 9 3 12 0v-5" />
                    </svg>
                  )}
                </div>

                <div className="education-title-wrap">
                  <div className="education-degree-row">
                    <h3 className="education-degree">{edu.degree}</h3>
                    {edu.badge && (
                      <span className="education-status-badge">{edu.badge}</span>
                    )}
                  </div>
                  <div className="education-inst-row">
                    <h4 className="education-institution">{edu.institution}</h4>
                    {edu.cpi && (
                      <>
                        <span className="education-cpi-sep">|</span>
                        <span className="education-cpi-badge">{edu.cpi}</span>
                      </>
                    )}
                  </div>
                  {(edu.period || edu.location) && (
                    <div className="education-meta">
                      {edu.period && (
                        <span className="education-period">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                          </svg>
                          {edu.period}
                        </span>
                      )}
                      {edu.period && edu.location && (
                        <span className="education-meta-sep">•</span>
                      )}
                      {edu.location && (
                        <span className="education-location">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                          {edu.location}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="education-body">
                {edu.coursework && edu.coursework.length > 0 && (
                  <div className="education-coursework">
                    <span className="education-subheading">Core Academic Focus & Areas:</span>
                    <div className="education-pills">
                      {edu.coursework.map((course: string, cIdx: number) => (
                        <span key={cIdx} className="education-pill">
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {edu.highlights && edu.highlights.length > 0 && (
                  <div className="education-highlights">
                    <span className="education-subheading">
                      {edu.highlightsTitle || "Key Highlights & Leadership:"}
                    </span>
                    <ul className="education-highlights-list">
                      {edu.highlights.map((item: string, hIdx: number) => {
                        const colonIndex = item.indexOf(":");
                        if (colonIndex !== -1) {
                          const title = item.substring(0, colonIndex);
                          const desc = item.substring(colonIndex + 1);
                          return (
                            <li key={hIdx}>
                              <span className="education-highlight-title">{title}:</span>
                              {desc}
                            </li>
                          );
                        }
                        return <li key={hIdx}>{item}</li>;
                      })}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Education;
