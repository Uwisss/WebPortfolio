import React, { useState, useEffect, useRef } from 'react';

const Skills = () => {
  const [animated, setAnimated] = useState(false);
  const sectionRef = useRef(null);

  const frontendSkills = [
    { name: 'HTML5', icon: 'fab fa-html5', color: '#E34F26', percent: 90 },
    { name: 'CSS3', icon: 'fab fa-css3-alt', color: '#1572B6', percent: 85 },
    { name: 'JavaScript', icon: 'fab fa-js-square', color: '#F7DF1E', percent: 75 },
    { name: 'React', icon: 'fab fa-react', color: '#61DAFB', percent: 70 },
  ];

  const backendSkills = [
    { name: 'C#', icon: 'fas fa-code', color: '#239120', percent: 88 },
    { name: 'C++', icon: 'fas fa-cogs', color: '#00599C', percent: 85 },
    { name: 'SQLite', icon: 'fas fa-database', color: '#003B57', percent: 88 },
    { name: 'Xamarin', icon: 'fab fa-microsoft', color: '#3498DB', percent: 90 },
  ];

  const toolsSkills = [
    { name: 'VS Code', icon: 'fas fa-laptop-code', color: '#007ACC', percent: 95 },
    { name: 'Git', icon: 'fab fa-git-alt', color: '#F05032', percent: 80 },
    { name: 'Figma', icon: 'fab fa-figma', color: '#F24E1E', percent: 70 },
    { name: 'Packet Tracer', icon: 'fas fa-network-wired', color: '#1BA0D7', percent: 85 },
  ];

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

  const SkillItem = ({ skill, delay }) => (
    <div className="skill-item" style={{ animationDelay: `${delay}ms` }}>
      <div className="skill-header">
        <span className="skill-icon" style={{ color: skill.color }}>
          <i className={skill.icon}></i>
        </span>
        <span className="skill-name">{skill.name}</span>
        <span className="skill-percent">{skill.percent}%</span>
      </div>
      <div className="skill-progress">
        <div 
          className="progress-bar" 
          style={{ 
            width: animated ? `${skill.percent}%` : '0%',
            transitionDelay: `${delay}ms`
          }}
        />
      </div>
    </div>
  );

  const SkillCategory = ({ title, skills, icon }) => (
    <article className="skill-category">
      <div className="category-header">
        <span className="category-icon"><i className={icon}></i></span>
        <h3>{title}</h3>
      </div>
      <div className="skill-items">
        {skills.map((skill, index) => (
          <SkillItem key={index} skill={skill} delay={index * 100} />
        ))}
      </div>
    </article>
  );

  return (
    <section id="skills" className="skills-section" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">Skills & Expertise</h2>
        <p className="section-subtitle">Technologies I work with</p>
        <div className="skills-grid">
          <SkillCategory title="Frontend" skills={frontendSkills} icon="fas fa-palette" />
          <SkillCategory title="Backend" skills={backendSkills} icon="fas fa-server" />
          <SkillCategory title="Tools" skills={toolsSkills} icon="fas fa-tools" />
        </div>
      </div>
    </section>
  );
};

export default Skills;
