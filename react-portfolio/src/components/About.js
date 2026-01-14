import React from 'react';

const About = () => {
  const contactInfo = [
    { icon: 'fas fa-envelope', label: 'Email', value: 'carlluis57@gmail.com', link: 'mailto:carlluis57@gmail.com' },
    { icon: 'fas fa-map-marker-alt', label: 'Location', value: 'General Trias, Cavite' },
    { icon: 'fab fa-github', label: 'GitHub', value: 'Uwisss', link: 'https://github.com/Uwisss' },
    { icon: 'fab fa-linkedin', label: 'LinkedIn', value: 'Carl Luis Dimapilis', link: 'https://www.linkedin.com/in/dimapilis-carl-luis-c-66b63631b/' }
  ];

  const education = [
    { 
      school: 'Cavite State University - Silang Campus',
      degree: 'BS Information Technology',
      year: '2022 - Present',
      status: 'current'
    },
    { 
      school: 'Luis Y. Ferrer Jr. SHS',
      degree: 'Senior High School',
      year: '2020 - 2022'
    },
    { 
      school: 'Our Lady of Remedios Montessori',
      degree: 'Junior High School',
      year: '2016 - 2020'
    }
  ];

  const interests = [
    { icon: 'fas fa-film', label: 'Movies' },
    { icon: 'fas fa-gamepad', label: 'Gaming' },
    { icon: 'fas fa-coffee', label: 'Coffee' },
    { icon: 'fas fa-camera', label: 'Photography' },
    { icon: 'fas fa-music', label: 'Music' },
    { icon: 'fas fa-basketball-ball', label: 'Basketball' }
  ];

  return (
    <section id="about" className="about-section">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <p className="section-subtitle">Get to know me better</p>
        
        <div className="about-content">
          <div className="about-main">
            <div className="about-card intro-card">
              <div className="card-icon"><i className="fas fa-user-circle"></i></div>
              <h3>Who I Am</h3>
              <p>
                I'm <strong>Carl Luis Dimapilis</strong>, a passionate IT student with a love for 
                web development and creating digital solutions. I enjoy turning complex problems 
                into simple, beautiful, and intuitive designs.
              </p>
              <p>
                When I'm not coding, you'll find me exploring new technologies, watching movies, 
                or enjoying a good cup of coffee.
              </p>
              <a href={`${process.env.PUBLIC_URL}/DIMAPILIS_CARL_LUIS_CV.pdf`} target="_blank" rel="noopener noreferrer" className="download-cv" download>
                <i className="fas fa-download"></i>
                <span>Download CV</span>
              </a>
            </div>

            <div className="about-card education-card">
              <div className="card-icon"><i className="fas fa-graduation-cap"></i></div>
              <h3>Education</h3>
              <div className="timeline">
                {education.map((edu, index) => (
                  <div key={index} className={`timeline-item ${edu.status || ''}`}>
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <h4>{edu.school}</h4>
                      <p className="degree">{edu.degree}</p>
                      <span className="year"><i className="far fa-calendar-alt"></i> {edu.year}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="about-sidebar">
            <div className="about-card contact-card">
              <div className="card-icon"><i className="fas fa-address-card"></i></div>
              <h3>Contact Info</h3>
              <ul className="contact-list">
                {contactInfo.map((item, index) => (
                  <li key={index}>
                    {item.link ? (
                      <a href={item.link} target="_blank" rel="noopener noreferrer">
                        <i className={item.icon}></i>
                        <div>
                          <span className="contact-label">{item.label}</span>
                          <span className="contact-value">{item.value}</span>
                        </div>
                      </a>
                    ) : (
                      <span className="contact-info-item">
                        <i className={item.icon}></i>
                        <div>
                          <span className="contact-label">{item.label}</span>
                          <span className="contact-value">{item.value}</span>
                        </div>
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="about-card interests-card">
              <div className="card-icon"><i className="fas fa-heart"></i></div>
              <h3>Interests</h3>
              <div className="interests-tags">
                {interests.map((interest, index) => (
                  <span key={index} className="tag">
                    <i className={interest.icon}></i> {interest.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
