import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SocialFloatingBar from './components/SocialFloatingBar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Footer from './components/Footer';

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="App">
      <SocialFloatingBar />
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main role="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certifications />
      </main>
      <Footer />
    </div>
  );
}

export default App;
