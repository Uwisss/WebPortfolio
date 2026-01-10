import React, { useState, useEffect, useMemo } from 'react';

const Hero = () => {
  const titles = useMemo(() => ['Web Developer', 'IT Student', 'Problem Solver', 'Tech Enthusiast'], []);
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentTitle = titles[currentTitleIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentTitle.length) {
          setDisplayText(currentTitle.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentTitleIndex, titles]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="hero-section">
      <div className="hero-bg-pattern"></div>
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <span className="hero-greeting">
              <i className="fas fa-hand-peace"></i> Hello, I'm
            </span>
            <h1 className="hero-name">Carl Luis</h1>
            <h2 className="hero-title">
              {displayText}<span className="typing-cursor">|</span>
            </h2>
            <p className="hero-intro">
              Passionate about creating beautiful, functional, and user-friendly 
              digital experiences. Currently pursuing IT at Cavite State University - Silang Campus.
            </p>
            <div className="hero-cta">
              <button 
                className="cta-button primary"
                onClick={() => scrollToSection('projects')}
              >
                <i className="fas fa-briefcase"></i>
                <span>View Projects</span>
              </button>
              <button 
                className="cta-button secondary"
                onClick={() => scrollToSection('about')}
              >
                <i className="fas fa-user"></i>
                <span>About Me</span>
              </button>
            </div>
            <div className="hero-stats">
              <div className="stat-item">
                <i className="fas fa-code"></i>
                <div className="stat-info">
                  <span className="stat-number">3+</span>
                  <span className="stat-label">Projects</span>
                </div>
              </div>
              <div className="stat-item">
                <i className="fas fa-certificate"></i>
                <div className="stat-info">
                  <span className="stat-number">2</span>
                  <span className="stat-label">Certifications</span>
                </div>
              </div>
              <div className="stat-item">
                <i className="fas fa-graduation-cap"></i>
                <div className="stat-info">
                  <span className="stat-number">4th</span>
                  <span className="stat-label">Year Student</span>
                </div>
              </div>
            </div>
          </div>
          <div className="hero-image-wrapper">
            <div className="hero-image-container">
              <img src={`${process.env.PUBLIC_URL}/img/profile/owes.png`} alt="Carl Luis C. Dimapilis" className="profile-image" />
              <div className="image-ring"></div>
              <div className="image-ring ring-2"></div>
              <div className="floating-icon icon-1"><i className="fab fa-react"></i></div>
              <div className="floating-icon icon-2"><i className="fab fa-js"></i></div>
              <div className="floating-icon icon-3"><i className="fab fa-html5"></i></div>
              <div className="floating-icon icon-4"><i className="fab fa-css3-alt"></i></div>
            </div>
          </div>
        </div>
      </div>
      <div className="tech-marquee">
        <div className="marquee-content">
          <i className="fab fa-react"></i>
          <i className="fab fa-js"></i>
          <i className="fab fa-html5"></i>
          <i className="fab fa-css3-alt"></i>
          <i className="fab fa-node-js"></i>
          <i className="fab fa-python"></i>
          <i className="fab fa-java"></i>
          <i className="fab fa-git-alt"></i>
          <i className="fab fa-github"></i>
          <i className="fab fa-docker"></i>
          <i className="fas fa-database"></i>
          <i className="fab fa-npm"></i>
          <i className="fab fa-react"></i>
          <i className="fab fa-js"></i>
          <i className="fab fa-html5"></i>
          <i className="fab fa-css3-alt"></i>
          <i className="fab fa-node-js"></i>
          <i className="fab fa-python"></i>
          <i className="fab fa-java"></i>
          <i className="fab fa-git-alt"></i>
          <i className="fab fa-github"></i>
          <i className="fab fa-docker"></i>
          <i className="fas fa-database"></i>
          <i className="fab fa-npm"></i>
        </div>
        <div className="marquee-content" aria-hidden="true">
          <i className="fab fa-react"></i>
          <i className="fab fa-js"></i>
          <i className="fab fa-html5"></i>
          <i className="fab fa-css3-alt"></i>
          <i className="fab fa-node-js"></i>
          <i className="fab fa-python"></i>
          <i className="fab fa-java"></i>
          <i className="fab fa-git-alt"></i>
          <i className="fab fa-github"></i>
          <i className="fab fa-docker"></i>
          <i className="fas fa-database"></i>
          <i className="fab fa-npm"></i>
          <i className="fab fa-react"></i>
          <i className="fab fa-js"></i>
          <i className="fab fa-html5"></i>
          <i className="fab fa-css3-alt"></i>
          <i className="fab fa-node-js"></i>
          <i className="fab fa-python"></i>
          <i className="fab fa-java"></i>
          <i className="fab fa-git-alt"></i>
          <i className="fab fa-github"></i>
          <i className="fab fa-docker"></i>
          <i className="fas fa-database"></i>
          <i className="fab fa-npm"></i>
        </div>
      </div>
    </section>
  );
};

export default Hero;
