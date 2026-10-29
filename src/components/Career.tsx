import "./styles/Career.css";
import { config } from "../config";

const getDisplayYear = (period: string) => {
  if (period.includes("Present")) return "NOW";
  if (period.includes(" - ")) {
    return period.split(" - ")[0]; // Show start year for ranges
  }
  return period; // Single year like "2021"
};

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          {config.experiences.map((exp, index) => (
            <div key={index} className="career-info-box">
              <div className="career-info-in">
                <div className="career-role">
                  <h4>{exp.position}</h4>
                  <h5>
                    {exp.company}
                    {exp.employmentType && (
                      <span className="career-employment-badge">
                        {exp.employmentType}
                      </span>
                    )}
                  </h5>
                  <div className="career-meta">
                    <span className="career-meta-period">
                      {exp.period} · {exp.duration}
                    </span>
                    <span className="career-meta-loc">{exp.location}</span>
                  </div>
                </div>
                <h3 className="career-year">
                  {(exp.displayYear || getDisplayYear(exp.period))
                    .split("\n")
                    .map((line, lIdx) => (
                      <span key={lIdx} className="career-year-line">
                        {line}
                      </span>
                    ))}
                </h3>
              </div>
              <div className="career-info-desc">
                <p>{exp.description}</p>
                {exp.skills && exp.skills.length > 0 && (
                  <div className="career-skills-list">
                    {exp.skills.map((skill: string, sIdx: number) => (
                      <span key={sIdx} className="career-skill-pill">
                        {skill}
                      </span>
                    ))}
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

export default Career;
