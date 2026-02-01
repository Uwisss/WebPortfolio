import React, { useState } from 'react';
import Modal from './Modal';

const Projects = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImages, setCurrentImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [imageErrors, setImageErrors] = useState({});

  const basePath = process.env.PUBLIC_URL;

  const projects = [
    {
      id: 1,
      title: 'Sole Explorer Travel & Tours',
      category: 'web',
      type: 'Client Project',
      client: 'Sole Explorer',
      description: 'A full-featured travel agency website with multi-language support, currency conversion, tour packages, cruise bookings, live chat support, and admin dashboard for content management.',
      thumbnail: `${basePath}/img/soleexplorer/homepageEnglish.jfif`,
      tech: ['React', 'Laravel', 'Firebase', 'Tawk.to'],
      featured: true,
      color: '#059669',
      images: [
        { src: `${basePath}/img/soleexplorer/translatinganimation.jfif`, caption: 'Loading Animation' },
        { src: `${basePath}/img/soleexplorer/homepageEnglish.jfif`, caption: 'Homepage - English' },
        { src: `${basePath}/img/soleexplorer/homepageKoreanLanguage.jfif`, caption: 'Homepage - Korean' },
        { src: `${basePath}/img/soleexplorer/servicesKorean.jfif`, caption: 'Services Section' },
        { src: `${basePath}/img/soleexplorer/aboutus.jfif`, caption: 'About Us' },
        { src: `${basePath}/img/soleexplorer/findus.jfif`, caption: 'Find Us - Map' },
        { src: `${basePath}/img/soleexplorer/internationalTours.jfif`, caption: 'International Tours' },
        { src: `${basePath}/img/soleexplorer/tours.jfif`, caption: 'Wellness Tours' },
        { src: `${basePath}/img/soleexplorer/cruises.jfif`, caption: 'Cruise Packages' },
        { src: `${basePath}/img/soleexplorer/admindashboard.jfif`, caption: 'Admin Dashboard' },
        { src: `${basePath}/img/soleexplorer/adminChatwithus.jfif`, caption: 'Live Chat Support' },
        { src: `${basePath}/img/soleexplorer/tourpackageconfig.jfif`, caption: 'Tour Package Config' },
        { src: `${basePath}/img/soleexplorer/bookingservices.jfif`, caption: 'Booking Services' },
        { src: `${basePath}/img/soleexplorer/accreditations.jfif`, caption: 'Accreditations' }
      ]
    },
    {
      id: 2,
      title: 'SchedCode Generator',
      category: 'web',
      type: 'Capstone Project',
      client: 'CvSU Silang',
      description: 'An automated schedule code generation system for academic programs. Features dashboard analytics, batch code generation, curriculum management, section configuration, and archive management.',
      thumbnail: `${basePath}/img/schedcode/dashboard.jfif`,
      tech: ['React', 'Laravel', 'MySQL', 'REST API'],
      featured: true,
      color: '#7c3aed',
      images: [
        { src: `${basePath}/img/schedcode/login.jfif`, caption: 'Login Page' },
        { src: `${basePath}/img/schedcode/dashboard.jfif`, caption: 'Dashboard Overview' },
        { src: `${basePath}/img/schedcode/generatesched.jfif`, caption: 'Generate Schedule Codes' },
        { src: `${basePath}/img/schedcode/viewsched.jfif`, caption: 'View Generated Schedules' },
        { src: `${basePath}/img/schedcode/sectionconfig.jfif`, caption: 'Section Configuration' },
        { src: `${basePath}/img/schedcode/curriculum.jfif`, caption: 'Curriculum Management' },
        { src: `${basePath}/img/schedcode/archives.jfif`, caption: 'Archived Schedules' }
      ]
    },
    {
      id: 3,
      title: 'CodeXplore',
      category: 'mobile',
      type: 'Academic Project',
      client: null,
      description: 'A mobile coding companion app featuring interactive programming lessons and quiz games. Built for students learning Java and other languages.',
      thumbnail: `${basePath}/img/CodexLogo2.png`,
      tech: ['C#', 'Xamarin', 'SQLite'],
      featured: true,
      color: '#2563eb',
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
      id: 4,
      title: 'HxH WebFandom',
      category: 'web',
      type: 'Personal Project',
      client: null,
      description: 'A responsive fan website for Hunter x Hunter featuring character profiles, story arcs, and community features.',
      thumbnail: `${basePath}/img/FandomLogo.png`,
      tech: ['HTML', 'CSS', 'JavaScript'],
      featured: false,
      color: '#dc2626',
      images: [
        { src: `${basePath}/img/FandomMain.png`, caption: 'Homepage' },
        { src: `${basePath}/img/FandomCategory.png`, caption: 'Categories' },
        { src: `${basePath}/img/FandomMainContent.png`, caption: 'Content Page' },
        { src: `${basePath}/img/FandomNews.png`, caption: 'News Section' }
      ]
    },
    {
      id: 5,
      title: 'Network Infrastructure',
      category: 'network',
      type: 'Academic Project',
      client: null,
      description: 'Enterprise network design with VLAN segmentation, routing protocols, and security implementation using Cisco Packet Tracer.',
      thumbnail: `${basePath}/img/CiscoTopology.png`,
      tech: ['Cisco Packet Tracer', 'Networking'],
      featured: false,
      color: '#0891b2',
      images: [
        { src: `${basePath}/img/CiscoTopology.png`, caption: 'Network Topology' },
        { src: `${basePath}/img/CiscoMiniature.jpg`, caption: 'Physical Setup' },
        { src: `${basePath}/img/CiscoTest.jpg`, caption: 'Testing' },
        { src: `${basePath}/img/CiscoTeam.jpg`, caption: 'Team Project' }
      ]
    }
  ];

  const handleImageError = (projectId) => {
    setImageErrors(prev => ({ ...prev, [projectId]: true }));
  };

  const categories = [
    { id: 'all', label: 'All Projects', icon: 'fas fa-layer-group' },
    { id: 'web', label: 'Web', icon: 'fas fa-globe' },
    { id: 'mobile', label: 'Mobile', icon: 'fas fa-mobile-alt' },
    { id: 'network', label: 'Network', icon: 'fas fa-network-wired' }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  const openModal = (images, project) => {
    setCurrentImages(images);
    setCurrentImageIndex(0);
    setSelectedProject(project);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentImages([]);
    setCurrentImageIndex(0);
    setSelectedProject(null);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev < currentImages.length - 1 ? prev + 1 : prev
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => prev > 0 ? prev - 1 : prev);
  };

  // Placeholder component for missing images
  const ImagePlaceholder = ({ title, color }) => (
    <div className="image-placeholder" style={{ background: `linear-gradient(135deg, ${color}, ${color}dd)` }}>
      <i className="fas fa-image"></i>
      <span>{title}</span>
    </div>
  );

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Portfolio</span>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">A showcase of my recent work and creative solutions</p>
        </div>

        <div className="project-filters">
          {categories.map(cat => (
            <button 
              key={cat.id}
              className={`filter-btn ${filter === cat.id ? 'active' : ''}`}
              onClick={() => setFilter(cat.id)}
            >
              <i className={cat.icon}></i>
              {cat.label}
            </button>
          ))}
        </div>

        <div className="projects-showcase">
          {filteredProjects.map((project, index) => (
            <article 
              key={project.id} 
              className={`project-card-new ${project.featured ? 'featured' : ''} ${index === 0 ? 'highlight' : ''}`}
              style={{ '--accent-color': project.color }}
            >
              <div className="project-image-wrapper" onClick={() => openModal(project.images, project)}>
                {imageErrors[project.id] ? (
                  <ImagePlaceholder title={project.title} color={project.color} />
                ) : (
                  <img 
                    src={project.thumbnail} 
                    alt={project.title}
                    onError={() => handleImageError(project.id)}
                  />
                )}
                <div className="project-overlay-new">
                  <div className="overlay-content">
                    <i className="fas fa-images"></i>
                    <span>View {project.images.length} Screenshots</span>
                  </div>
                </div>
                {project.type && (
                  <span className="project-type-badge" style={{ background: project.color }}>
                    {project.type}
                  </span>
                )}
              </div>
              
              <div className="project-info">
                <div className="project-meta">
                  {project.client && (
                    <span className="project-client">
                      <i className="fas fa-building"></i>
                      {project.client}
                    </span>
                  )}
                  <span className="project-category">
                    <i className={categories.find(c => c.id === project.category)?.icon}></i>
                    {project.category}
                  </span>
                </div>
                
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                <div className="project-tech-stack">
                  {project.tech.map((tech, idx) => (
                    <span key={idx} className="tech-pill">{tech}</span>
                  ))}
                </div>
                
                <button 
                  className="view-project-btn"
                  onClick={() => openModal(project.images, project)}
                >
                  <span>View Project</span>
                  <i className="fas fa-arrow-right"></i>
                </button>
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
