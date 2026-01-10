import React, { useState } from 'react';
import Modal from './Modal';

const Certifications = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentCert, setCurrentCert] = useState(null);

  const basePath = process.env.PUBLIC_URL;

  const certifications = [
    {
      id: 'networking',
      title: 'Networking Basics',
      issuer: 'Cisco',
      issuerLogo: 'fab fa-cisco',
      description: 'Fundamental networking concepts including network types, protocols, and OSI model layers.',
      image: `${basePath}/img/CertNetworking.png`,
      credentialUrl: 'https://www.credly.com/earner/earned/badge/4aa04497-0bfc-4373-9e29-03f7dbb6ecfc',
      date: '2024',
      skills: ['TCP/IP', 'OSI Model', 'Routing']
    },
    {
      id: 'intro',
      title: 'Introduction To Cisco',
      issuer: 'Cisco',
      issuerLogo: 'fab fa-cisco',
      description: 'Digital models of IP Networks and IoT Systems using Packet Tracer.',
      image: `${basePath}/img/CertIntro.png`,
      credentialUrl: 'https://www.credly.com/earner/earned/badge/530197dc-068c-41d1-9d30-ecb172fca2b3',
      date: '2024',
      skills: ['Packet Tracer', 'IoT', 'Simulation']
    }
  ];

  const openModal = (cert) => {
    setCurrentCert(cert);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentCert(null);
  };

  return (
    <section id="certifications" className="certifications-section">
      <div className="container">
        <h2 className="section-title">Certifications</h2>
        <p className="section-subtitle">Professional achievements and credentials</p>
        <div className="certifications-grid">
          {certifications.map((cert) => (
            <article key={cert.id} className="cert-card">
              <div className="cert-badge-wrapper">
                <div className="cert-image" onClick={() => openModal(cert)}>
                  <img src={cert.image} alt={cert.title} />
                  <div className="cert-glow"></div>
                  <div className="cert-image-overlay">
                    <i className="fas fa-search-plus"></i>
                    <span>View Badge</span>
                  </div>
                </div>
                <div className="verified-badge">
                  <i className="fas fa-check-circle"></i>
                  <span>Verified</span>
                </div>
              </div>
              <div className="cert-content">
                <div className="cert-issuer">
                  <i className={cert.issuerLogo}></i>
                  <span>{cert.issuer}</span>
                  <span className="cert-year">{cert.date}</span>
                </div>
                <h3>{cert.title}</h3>
                <p>{cert.description}</p>
                <div className="cert-skills">
                  {cert.skills.map((skill, index) => (
                    <span key={index} className="cert-skill-tag">{skill}</span>
                  ))}
                </div>
                <a 
                  href={cert.credentialUrl} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-link"
                >
                  <span>View Credential</span>
                  <i className="fas fa-arrow-right"></i>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>

      {currentCert && (
        <Modal 
          isOpen={modalOpen}
          onClose={closeModal}
          images={[{ src: currentCert.image, caption: currentCert.title }]}
          currentIndex={0}
          onNext={null}
          onPrev={null}
        />
      )}
    </section>
  );
};

export default Certifications;
