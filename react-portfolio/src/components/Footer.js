import React from 'react';

const Footer = () => {
  const socialLinks = [
    { href: 'mailto:carlluis57@gmail.com', icon: 'fas fa-envelope', label: 'Email', color: '#EA4335' },
    { href: 'https://github.com/Uwisss', icon: 'fab fa-github', label: 'GitHub', color: '#333' },
    { href: 'https://www.linkedin.com/in/dimapilis-carl-luis-c-66b63631b/', icon: 'fab fa-linkedin-in', label: 'LinkedIn', color: '#0077B5' },
    { href: 'https://www.facebook.com/carlluis.dimapilis', icon: 'fab fa-facebook-f', label: 'Facebook', color: '#1877F2' }
  ];

  const quickLinks = [
    { href: '#hero', label: 'Home', icon: 'fas fa-home' },
    { href: '#about', label: 'About', icon: 'fas fa-user' },
    { href: '#skills', label: 'Skills', icon: 'fas fa-code' },
    { href: '#projects', label: 'Projects', icon: 'fas fa-folder-open' },
    { href: '#certifications', label: 'Certifications', icon: 'fas fa-certificate' }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="footer-glow"></div>
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <h3 className="footer-logo">OWES</h3>
            <p>Creating digital experiences with passion and precision. Based in the Philippines.</p>
            <div className="footer-contact">
              <a href="mailto:carlluis57@gmail.com" className="contact-item">
                <i className="fas fa-envelope"></i>
                <span>carlluis57@gmail.com</span>
              </a>
              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>Bulacan, Philippines</span>
              </div>
            </div>
          </div>
          
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href}>
                    <i className={link.icon}></i>
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-social">
            <h4>Let's Connect</h4>
            <p className="social-subtitle">Follow me on social media</p>
            <div className="social-icons">
              {socialLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="social-icon"
                  style={{ '--hover-color': link.color }}
                >
                  <i className={link.icon}></i>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            <span>© {new Date().getFullYear()}</span>
            <span className="divider">•</span>
            <span>Carl Luis C. Dimapilis</span>
            <span className="divider">•</span>
            <span>Built with <i className="fab fa-react spin"></i> React</span>
          </p>
          <button className="back-to-top" onClick={scrollToTop} aria-label="Back to top">
            <i className="fas fa-chevron-up"></i>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
