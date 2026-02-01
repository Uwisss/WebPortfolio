import React, { useState, useEffect, useRef } from 'react';

const Skills = () => {
  const [animated, setAnimated] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const sectionRef = useRef(null);
  const maxYears = 4;

  const frontendSkills = [
    { name: 'HTML5', icon: 'fab fa-html5', color: '#E34F26', years: 4 },
    { name: 'CSS3', icon: 'fab fa-css3-alt', color: '#1572B6', years: 4 },
    { name: 'JavaScript', icon: 'fab fa-js-square', color: '#F7DF1E', years: 3 },
    { name: 'React', icon: 'fab fa-react', color: '#61DAFB', years: 2 },
  ];

  const backendSkills = [
    { name: 'PHP', icon: 'fab fa-php', color: '#777BB4', years: 3 },
    { name: 'Laravel', icon: 'fab fa-laravel', color: '#FF2D20', years: 2 },
    { name: 'Blade', icon: 'fas fa-leaf', color: '#F9322C', years: 2 },
    { name: 'CodeIgniter', icon: 'fas fa-fire', color: '#EF4223', years: 2 },
    { name: 'Python', icon: 'fab fa-python', color: '#3776AB', years: 3 },
    { name: 'C#', icon: 'fas fa-code', color: '#239120', years: 4 },
    { name: 'C++', icon: 'fas fa-cogs', color: '#00599C', years: 4 },
    { name: 'SQLite', icon: 'fas fa-database', color: '#003B57', years: 3 },
    { name: 'Xamarin', icon: 'fab fa-microsoft', color: '#3498DB', years: 2 },
  ];

  const toolsSkills = [
    { name: 'VS Code', icon: 'fas fa-laptop-code', color: '#007ACC', years: 4 },
    { name: 'Git', icon: 'fab fa-git-alt', color: '#F05032', years: 3 },
    { name: 'GitHub', icon: 'fab fa-github', color: '#181717', years: 3 },
    { name: 'Node.js', icon: 'fab fa-node-js', color: '#339933', years: 2 },
    { name: 'npm', icon: 'fab fa-npm', color: '#CB3837', years: 2 },
    { name: 'Docker', icon: 'fab fa-docker', color: '#2496ED', years: 1 },
    { name: 'Figma', icon: 'fab fa-figma', color: '#F24E1E', years: 2 },
    { name: 'XAMPP', icon: 'fas fa-server', color: '#FB7A24', years: 4 },
    { name: 'MySQL Workbench', icon: 'fas fa-database', color: '#4479A1', years: 3 },
    { name: 'Packet Tracer', icon: 'fas fa-network-wired', color: '#1BA0D7', years: 3 },
  ];

  const categories = [
    { id: 'all', label: 'All Skills', icon: 'fas fa-layer-group' },
    { id: 'frontend', label: 'Frontend', icon: 'fas fa-palette' },
    { id: 'backend', label: 'Backend', icon: 'fas fa-server' },
    { id: 'tools', label: 'Tools', icon: 'fas fa-tools' },
  ];

  const getAllSkills = () => {
    switch (activeCategory) {
      case 'frontend':
        return frontendSkills;
      case 'backend':
        return backendSkills;
      case 'tools':
        return toolsSkills;
      default:
        return [...frontendSkills, ...backendSkills, ...toolsSkills];
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated) {
            setAnimated(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [animated]);

  const getYearLabel = (years) => {
    if (years === 4) return 'Expert';
    if (years === 3) return 'Advanced';
    if (years === 2) return 'Intermediate';
    return 'Beginner';
  };

  const SkillCard = ({ skill, index }) => {
    const progressPercent = (skill.years / maxYears) * 100;
    return (
      <div 
        className={`skill-card ${animated ? 'animate' : ''}`} 
        style={{ 
          animationDelay: `${index * 50}ms`,
          '--skill-color': skill.color 
        }}
      >
        <div className="skill-card-icon" style={{ background: `${skill.color}15`, color: skill.color }}>
          <i className={skill.icon}></i>
        </div>
        <div className="skill-card-content">
          <h4 className="skill-card-name">{skill.name}</h4>
          <div className="skill-card-meta">
            <span className="skill-card-years">{skill.years} {skill.years === 1 ? 'year' : 'years'}</span>
            <span className="skill-card-level" style={{ color: skill.color }}>{getYearLabel(skill.years)}</span>
          </div>
          <div className="skill-card-progress">
            <div 
              className="skill-card-progress-bar" 
              style={{ 
                width: animated ? `${progressPercent}%` : '0%',
                background: `linear-gradient(90deg, ${skill.color}, ${skill.color}99)`,
                transitionDelay: `${index * 50}ms`
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  const totalSkills = frontendSkills.length + backendSkills.length + toolsSkills.length;
  const avgYears = (
    [...frontendSkills, ...backendSkills, ...toolsSkills].reduce((sum, s) => sum + s.years, 0) / totalSkills
  ).toFixed(1);

  return (
    <section id="skills" className="skills-section" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">Skills & Expertise</h2>
        <p className="section-subtitle">Technologies I've been working with</p>

        {/* Stats Summary */}
        <div className="skills-stats">
          <div className="stat-item">
            <span className="stat-number">{totalSkills}</span>
            <span className="stat-label">Technologies</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{maxYears}</span>
            <span className="stat-label">Years Learning</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{avgYears}</span>
            <span className="stat-label">Avg. Experience</span>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="skills-tabs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`skills-tab ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <i className={cat.icon}></i>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="skills-card-grid">
          {getAllSkills().map((skill, index) => (
            <SkillCard key={`${skill.name}-${index}`} skill={skill} index={index} />
          ))}
        </div>

        {/* Experience Legend */}
        <div className="skills-legend">
          <div className="legend-item">
            <span className="legend-dot" style={{ background: '#22c55e' }}></span>
            <span>4 yrs - Expert</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot" style={{ background: '#3b82f6' }}></span>
            <span>3 yrs - Advanced</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot" style={{ background: '#f59e0b' }}></span>
            <span>2 yrs - Intermediate</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot" style={{ background: '#ef4444' }}></span>
            <span>1 yr - Beginner</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
