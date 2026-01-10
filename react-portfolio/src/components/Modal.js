import React, { useEffect, useCallback } from 'react';

const Modal = ({ isOpen, onClose, images, currentIndex, onNext, onPrev }) => {
  const handleKeyDown = useCallback((e) => {
    if (!isOpen) return;
    
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowLeft' && onPrev) {
      onPrev();
    } else if (e.key === 'ArrowRight' && onNext) {
      onNext();
    }
  }, [isOpen, onClose, onNext, onPrev]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !images || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
        
        <div className="modal-image-container">
          {images.length > 1 && (
            <button 
              className="modal-nav"
              onClick={onPrev}
              disabled={currentIndex === 0}
            >
              <i className="fas fa-chevron-left"></i>
            </button>
          )}
          
          <img 
            src={currentImage.src} 
            alt={currentImage.caption || 'Gallery image'} 
            className="modal-image"
          />
          
          {images.length > 1 && (
            <button 
              className="modal-nav"
              onClick={onNext}
              disabled={currentIndex === images.length - 1}
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          )}
        </div>
        
        {currentImage.caption && (
          <p className="modal-caption">{currentImage.caption}</p>
        )}
        
        {images.length > 1 && (
          <p className="modal-counter">{currentIndex + 1} / {images.length}</p>
        )}
      </div>
    </div>
  );
};

export default Modal;
