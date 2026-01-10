import React, { useState } from 'react';
import Modal from './Modal';

const Projects = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImages, setCurrentImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [filter, setFilter] = useState('all');

  const basePath = process.env.PUBLIC_URL;

  const projects = [
    {
      id: 1,
      title: 'CodeXplore',
      category: 'mobile',
      description: 'A mobile coding companion app featuring interactive programming lessons and quiz games. Built for students learning Java and other languages.',
      thumbnail: `${basePath}/img/CodexLogo2.png`,
      tech: ['C#', 'Xamarin', 'SQLite'],
      featured: true,
      images: [
        { src: `${basePath}/img/CodexMain.jpg`, caption: 'Home Screen' },
        { src: `${basePath}/img/CodexNavs.jpg`, caption: 'Navigation' },
        { src: `${basePath}/img/CodexLes.jpg`, caption: 'Lessons' },
        { src: `${basePath}/img/CodexMainLes.jpg`, caption: 'Lesson Content' },
        { src: `${basePath}/img/CodexGame.jpg`, caption: 'Quiz Games' },
        { src: `${basePath}/img/CodexMainGame.jpg`, caption: 'Game Interface' },
        { src: `${basePath}/img/CodexSettings.jpg`, caption: 'Settings' }
      ]
    },
    {
      id: 2,
      title: 'HxH WebFandom',
      category: 'web',
      description: 'A responsive fan website for Hunter x Hunter featuring character profiles, story arcs, and community features.',
      thumbnail: `${basePath}/img/FandomLogo.png`,
      tech: ['HTML', 'CSS', 'JavaScript'],
      featured: true,
      images: [
        { src: `${basePath}/img/FandomMain.png`, caption: 'Homepage' },
        { src: `${basePath}/img/FandomCategory.png`, caption: 'Categories' },
        { src: `${basePath}/img/FandomMainContent.png`, caption: 'Content Page' },
        { src: `${basePath}/img/FandomNews.png`, caption: 'News Section' }
      ]
    },
    {
      id: 3,
      title: 'Network Infrastructure',
      category: 'network',
      description: 'Enterprise network design with VLAN segmentation, routing protocols, and security implementation using Cisco Packet Tracer.',
      thumbnail: `${basePath}/img/CiscoTopology.png`,
      tech: ['Cisco Packet Tracer', 'Networking'],
      featured: false,
      images: [
        { src: `${basePath}/img/CiscoTopology.png`, caption: 'Network Topology' },
        { src: `${basePath}/img/CiscoMiniature.jpg`, caption: 'Physical Setup' },
        { src: `${basePath}/img/CiscoTest.jpg`, caption: 'Testing' },
        { src: `${basePath}/img/CiscoTeam.jpg`, caption: 'Team Project' }
      ]
    }
  ];

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web' },
    { id: 'mobile', label: 'Mobile' },
    { id: 'network', label: 'Network' }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  const openModal = (images) => {
    setCurrentImages(images);
    setCurrentImageIndex(0);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentImages([]);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev < currentImages.length - 1 ? prev + 1 : prev
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => prev > 0 ? prev - 1 : prev);
  };

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <h2 className="section-title">My Projects</h2>
        <p className="section-subtitle">A showcase of my recent work</p>

        <div className="project-filters">
          {categories.map(cat => (
            <button 
              key={cat.id}
              className={`filter-btn ${filter === cat.id ? 'active' : ''}`}
              onClick={() => setFilter(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <article 
              key={project.id} 
              className={`project-card ${project.featured ? 'featured' : ''}`}
            >
              <div className="project-image" onClick={() => openModal(project.images)}>
                <img src={project.thumbnail} alt={project.title} />
                <div className="project-overlay">
                  <i className="fas fa-search-plus"></i>
                  <span>View Gallery</span>
                </div>
              </div>
              <div className="project-content">
                <div className="project-header">
                  <h3>{project.title}</h3>
                  {project.featured && <span className="featured-badge">Featured</span>}
                </div>
                <p>{project.description}</p>
                <div className="project-tech">
                  {project.tech.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <Modal 
        isOpen={modalOpen}
        onClose={closeModal}
        images={currentImages}
        currentIndex={currentImageIndex}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </section>
  );
};

export default Projects;
