import React, { useEffect, useCallback, useState, useRef } from 'react';

const Modal = ({ isOpen, onClose, images, currentIndex, onNext, onPrev }) => {
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const containerRef = useRef(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

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

  // Touch handlers for swipe
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe && onNext && currentIndex < images.length - 1) {
      onNext();
    }
    if (isRightSwipe && onPrev && currentIndex > 0) {
      onPrev();
    }
  };

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
        
        <div 
          className="modal-image-container"
          ref={containerRef}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {images.length > 1 && (
            <button 
              className="modal-nav modal-nav-prev"
              onClick={(e) => { e.stopPropagation(); onPrev(); }}
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
              className="modal-nav modal-nav-next"
              onClick={(e) => { e.stopPropagation(); onNext(); }}
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
          <>
            <p className="modal-counter">{currentIndex + 1} / {images.length}</p>
            <div className="modal-dots">
              {images.map((_, idx) => (
                <span 
                  key={idx} 
                  className={`modal-dot ${idx === currentIndex ? 'active' : ''}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
