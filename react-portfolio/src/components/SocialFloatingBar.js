import React from 'react';

const SocialFloatingBar = () => {
  const socials = [
    { href: 'https://github.com/Uwisss', icon: 'fab fa-github', label: 'GitHub', color: '#333' },
    { href: 'https://www.linkedin.com/in/dimapilis-carl-luis-c-66b63631b/', icon: 'fab fa-linkedin-in', label: 'LinkedIn', color: '#0077B5' },
    { href: 'https://instagram.com/not.owes', icon: 'fab fa-instagram', label: 'Instagram', color: '#E4405F' },
    { href: 'https://www.facebook.com/carlluis.dimapilis', icon: 'fab fa-facebook-f', label: 'Facebook', color: '#1877F2' },
    { href: 'https://www.tiktok.com/@crllss', icon: 'fab fa-tiktok', label: 'TikTok', color: '#000000' }
  ];

  return (
    <>
      {/* Desktop Floating Bar */}
      <div className="social-floating-bar">
        <div className="social-line top"></div>
        {socials.map((social, index) => (
          <a 
            key={index}
            href={social.href} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-link"
            aria-label={social.label}
            style={{ '--hover-color': social.color }}
          >
            <i className={social.icon}></i>
            <span className="tooltip">{social.label}</span>
          </a>
        ))}
        <div className="social-line bottom"></div>
      </div>

      {/* Mobile Bottom Bar */}
      <div className="social-mobile-bar">
        {socials.map((social, index) => (
          <a 
            key={index}
            href={social.href} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-mobile-link"
            aria-label={social.label}
            style={{ '--hover-color': social.color }}
          >
            <i className={social.icon}></i>
          </a>
        ))}
      </div>
    </>
  );
};

export default SocialFloatingBar;
