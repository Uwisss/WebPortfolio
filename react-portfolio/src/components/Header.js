import React, { useState, useEffect } from 'react';

const Header = ({ theme, toggleTheme }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'quizzes', label: 'Quizzes' },
    { id: 'certifications', label: 'Certifications' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setMenuOpen(false);
  };

  return (
    <>
      <header 
        className={`header ${!isVisible ? 'header-hidden' : ''}`} 
        role="banner"
      >
        <div className="nav-container" role="navigation" aria-label="Main navigation">
          <a href="#hero" className="nav-logo" aria-label="Home" onClick={(e) => {
            e.preventDefault();
            scrollToSection('hero');
          }}>UWIS</a>

          {/* Desktop navigation - hidden on mobile */}
          <ul className="nav-menu desktop-nav" role="menu">
            {navItems.map(item => (
              <li key={item.id} role="none">
                <a 
                  href={`#${item.id}`}
                  className="nav-link"
                  role="menuitem"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          
          <div className="nav-actions">
            <button 
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              <i className={`fas ${theme === 'light' ? 'fa-moon' : 'fa-sun'}`}></i>
            </button>
            <button 
              className={`mobile-toggle ${menuOpen ? 'active' : ''}`}
              aria-label="Toggle menu" 
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile sidebar - outside header to avoid clipping */}
      <nav className={`mobile-sidebar ${menuOpen ? 'active' : ''}`} role="navigation" aria-label="Mobile navigation">
        <ul className="mobile-nav-menu" role="menu">
          {navItems.map(item => (
            <li key={item.id} role="none">
              <a 
                href={`#${item.id}`}
                className="nav-link"
                role="menuitem"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* Mobile menu overlay */}
      <div 
        className={`menu-overlay ${menuOpen ? 'active' : ''}`}
        onClick={() => setMenuOpen(false)}
      ></div>
    </>
  );
};

export default Header;
