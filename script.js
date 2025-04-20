// Hero Title Animation
document.addEventListener('DOMContentLoaded', () => {
const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const texts = [
            heroTitle.getAttribute('data-text-1'),
            heroTitle.getAttribute('data-text-2'),
            heroTitle.getAttribute('data-text-3')
        ].filter(Boolean);
        
        let currentIndex = 0;
        
        function changeText() {
            heroTitle.classList.add('fade-out');
            
            setTimeout(() => {
                currentIndex = (currentIndex + 1) % texts.length;
                heroTitle.textContent = texts[currentIndex];
                heroTitle.classList.remove('fade-out');
                heroTitle.classList.add('fade-in');
                
                setTimeout(() => {
                    heroTitle.classList.remove('fade-in');
                }, 500);
            }, 500);
        }
        
        setInterval(changeText, 4000);
    }
});

// Skill Progress Animation
function animateSkills() {
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        const percent = bar.getAttribute('data-percent');
        bar.style.width = percent + '%';
    });
}

// Intersection Observer for Skills Animation
const skillsSection = document.querySelector('.skills-section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkills();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Project Gallery Variables
let projectCurrentImageIndex = 0;
let projectGalleryImages = [];

// Quiz Modal Variables
let quizCurrentImageIndex = 0;
let quizGalleryImages = [];

document.addEventListener('DOMContentLoaded', () => {
    // Burger menu functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const body = document.body;
    const header = document.querySelector('.site-header');
    let lastScrollTop = 0;
    const scrollThreshold = 100; // Minimum scroll before hiding nav

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            menuToggle.classList.toggle('active');
            mainNav.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', mainNav.classList.contains('active'));
            body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking on a link
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                mainNav.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (mainNav.classList.contains('active') && 
                !mainNav.contains(e.target) && 
                !menuToggle.contains(e.target)) {
                menuToggle.classList.remove('active');
                mainNav.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                body.style.overflow = '';
            }
        });
    }

    // Enhanced sticky header functionality
    let prevScrollpos = window.pageYOffset;
    let isNavVisible = true;
    
    function handleScroll() {
        const currentScrollPos = window.pageYOffset;
        const scrollingUp = prevScrollpos > currentScrollPos;
        const scrolledPastThreshold = currentScrollPos > scrollThreshold;
        
        // Only hide nav when scrolling down AND past threshold
        if (!scrollingUp && scrolledPastThreshold && isNavVisible) {
            header.style.top = `-${header.offsetHeight}px`;
            isNavVisible = false;
        } 
        // Show nav when scrolling up OR at top
        else if ((scrollingUp || currentScrollPos < scrollThreshold) && !isNavVisible) {
            header.style.top = "0";
            isNavVisible = true;
        }
        
        prevScrollpos = currentScrollPos;

        // Close menu if open while scrolling
        if (mainNav && mainNav.classList.contains('active')) {
            menuToggle.classList.remove('active');
            mainNav.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            body.style.overflow = '';
        }
    }

    // Throttle scroll event for better performance
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Observe skills section
    if (skillsSection) {
        observer.observe(skillsSection);
    }

    // Project Modal Functionality
    const projectModal = document.getElementById('imageModal');
    if (projectModal) {
        const projectImage = projectModal.querySelector('.modal__image');
        const projectCaption = projectModal.querySelector('.modal__caption');
        const projectCloseButton = projectModal.querySelector('.modal__close');
        const projectPrevButton = projectModal.querySelector('.modal__nav-button--prev');
        const projectNextButton = projectModal.querySelector('.modal__nav-button--next');
        
        let projectCurrentIndex = 0;
        let projectGalleryImages = [];
        
        // Function to show project image
        function showProjectImage(index) {
            projectImage.src = projectGalleryImages[index].src;
            projectImage.alt = projectGalleryImages[index].alt;
            projectCaption.textContent = projectGalleryImages[index].dataset.caption || projectGalleryImages[index].alt;
            projectCurrentIndex = index;
            
            // Update navigation button states
            projectPrevButton.style.display = index === 0 ? 'none' : 'block';
            projectNextButton.style.display = index === projectGalleryImages.length - 1 ? 'none' : 'block';
        }
        
        // Open project modal
        document.querySelectorAll('.gallery-trigger').forEach((trigger) => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                const gallery = e.target.closest('.project-gallery');
                projectGalleryImages = Array.from(gallery.querySelectorAll('.gallery-images img'));
                projectCurrentIndex = 0;
                
                showProjectImage(projectCurrentIndex);
                projectModal.classList.add('show');
                document.body.style.overflow = 'hidden';
            });
        });
        
        // Close project modal
        function closeProjectModal() {
            projectModal.classList.remove('show');
            document.body.style.overflow = '';
        }
        
        projectCloseButton.addEventListener('click', closeProjectModal);
        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) {
                closeProjectModal();
            }
        });
        
        // Project navigation
        projectPrevButton.addEventListener('click', () => {
            if (projectCurrentIndex > 0) {
                showProjectImage(projectCurrentIndex - 1);
            }
        });
        
        projectNextButton.addEventListener('click', () => {
            if (projectCurrentIndex < projectGalleryImages.length - 1) {
                showProjectImage(projectCurrentIndex + 1);
            }
        });
        
        // Project keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!projectModal.classList.contains('show')) return;
            
            if (e.key === 'Escape') {
                closeProjectModal();
            } else if (e.key === 'ArrowLeft' && projectCurrentIndex > 0) {
                showProjectImage(projectCurrentIndex - 1);
            } else if (e.key === 'ArrowRight' && projectCurrentIndex < projectGalleryImages.length - 1) {
                showProjectImage(projectCurrentIndex + 1);
            }
        });
    }

    // Quiz Modal Functionality
    const quizModal = document.getElementById('quizModal');
    if (quizModal) {
        const quizImage = quizModal.querySelector('.modal__image');
        const quizCaption = quizModal.querySelector('.modal__caption');
        const quizCloseButton = quizModal.querySelector('.modal__close');
        
        // Function to show quiz image
        function showQuizImage(image) {
            quizImage.src = image.src;
            quizImage.alt = image.alt;
            const quizItem = image.closest('.quiz-item');
            const quizTitle = quizItem.querySelector('h3').textContent;
            const quizScore = quizItem.querySelector('.quiz-score').textContent;
            const quizGrade = quizItem.querySelector('.quiz-grade').textContent;
            quizCaption.textContent = `${quizTitle} - ${quizGrade} - ${quizScore}`;
        }
        
        // Open quiz modal
        document.querySelectorAll('.quiz-paper-preview').forEach((preview) => {
            preview.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const thumbImage = preview.querySelector('.quiz-paper-thumb');
                showQuizImage(thumbImage);
                quizModal.classList.add('show');
                document.body.style.overflow = 'hidden';
            });
        });
        
        // Close quiz modal
        function closeQuizModal() {
            quizModal.classList.remove('show');
            document.body.style.overflow = '';
        }
        
        quizCloseButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            closeQuizModal();
        });

        quizModal.addEventListener('click', (e) => {
            if (e.target === quizModal) {
                closeQuizModal();
            }
        });
        
        // Quiz keyboard navigation (only Escape to close)
        document.addEventListener('keydown', (e) => {
            if (!quizModal.classList.contains('show')) return;
            
            if (e.key === 'Escape') {
                closeQuizModal();
            }
        });
    }

    // Global keyboard navigation for both modals
    document.addEventListener('keydown', (e) => {
        const projectModal = document.getElementById('imageModal');
        const quizModal = document.getElementById('quizModal');

        if (projectModal && projectModal.style.display === 'block') {
            if (e.key === 'ArrowLeft') {
                projectCurrentImageIndex = (projectCurrentImageIndex - 1 + projectGalleryImages.length) % projectGalleryImages.length;
                showProjectImage(projectCurrentImageIndex);
            } else if (e.key === 'ArrowRight') {
                projectCurrentImageIndex = (projectCurrentImageIndex + 1) % projectGalleryImages.length;
                showProjectImage(projectCurrentImageIndex);
            } else if (e.key === 'Escape') {
                projectModal.style.display = 'none';
                document.body.style.overflow = '';
            }
        } else if (quizModal && quizModal.style.display === 'block' && e.key === 'Escape') {
            quizModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    // Projects and Quizzes Animation
    function animateContent() {
        // Animate hero content
        const projectsHero = document.querySelector('.projects-hero-content');
        const quizzesHero = document.querySelector('.quizzes-hero-content');
        
        if (projectsHero) {
            projectsHero.classList.add('fade-in');
        }
        if (quizzesHero) {
            quizzesHero.classList.add('fade-in');
        }

        // Create intersection observer for project and quiz items
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target); // Stop observing once animated
                }
            });
        }, {
            threshold: 0.1, // Trigger when 10% of the item is visible
            rootMargin: '50px' // Start animation slightly before the item comes into view
        });

        // Observe project items
        document.querySelectorAll('.project-item').forEach(item => {
            observer.observe(item);
        });

        // Observe quiz items
        document.querySelectorAll('.quiz-item').forEach(item => {
            observer.observe(item);
        });
    }

    // Call animation function
    animateContent();

    // Certification Popup Functionality
    function initCertificationPopups() {
        const certItems = document.querySelectorAll('.certification-item');
        const popups = document.querySelectorAll('.certification-popup');
        const closeButtons = document.querySelectorAll('.popup-close');

        // Add click event to certification items
        certItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                popups[index].classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            });
        });

        // Close popup when clicking close button
        closeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const popup = button.closest('.certification-popup');
                popup.classList.remove('active');
                document.body.style.overflow = ''; // Restore scrolling
            });
        });

        // Close popup when clicking outside
        popups.forEach(popup => {
            popup.addEventListener('click', (e) => {
                if (e.target === popup) {
                    popup.classList.remove('active');
                    document.body.style.overflow = ''; // Restore scrolling
                }
            });
        });

        // Close popup with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                popups.forEach(popup => {
                    popup.classList.remove('active');
                    document.body.style.overflow = ''; // Restore scrolling
                });
            }
        });
    }

    // Enhanced Progress Bar Animation
    function initProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar');
        const skillsSection = document.querySelector('.skills-section');
        let animated = false; // Flag to track if animation has occurred

        function animateProgressBars() {
            if (animated) return; // Skip if already animated
            
            progressBars.forEach(bar => {
                const percent = bar.getAttribute('data-percent');
                bar.style.width = '0';
                bar.querySelector('.percent').style.opacity = '0';
                
                // Trigger animation
                setTimeout(() => {
                    bar.style.width = percent + '%';
                    bar.querySelector('.percent').style.opacity = '1';
                }, 200);
            });
            animated = true; // Set flag to true after animation
        }

        function resetProgressBars() {
            progressBars.forEach(bar => {
                bar.style.width = '0';
                bar.querySelector('.percent').style.opacity = '0';
            });
            animated = false; // Reset animation flag
        }

        // Create Intersection Observer for progress bars
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateProgressBars();
                } else {
                    resetProgressBars();
                }
            });
        }, {
            threshold: 0.2, // Trigger when 20% of the section is visible
            rootMargin: '-50px' // Add some margin to delay trigger
        });

        // Start observing the skills section
        if (skillsSection) {
            observer.observe(skillsSection);
        }
    }

    // Initialize all functionalities
    initCertificationPopups();
    initProgressBars();
});

// Function to center the modal image
function centerModalImage(modalImg) {
    if (!modalImg || !modalImg.complete) return;
    
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    const imageRatio = modalImg.naturalWidth / modalImg.naturalHeight;
    const isPortrait = modalImg.naturalHeight > modalImg.naturalWidth;
    
    modalImg.setAttribute('data-orientation', isPortrait ? 'portrait' : 'landscape');
    
    if (window.innerWidth <= 480) { // Mobile devices
        if (isPortrait) {
            modalImg.style.maxWidth = 'min(95%, 80vh)';
            modalImg.style.maxHeight = '75vh';
        } else {
            modalImg.style.maxWidth = '98%';
            modalImg.style.maxHeight = '70vh';
        }
    } else if (window.innerWidth <= 768) { // Tablets
        if (isPortrait) {
            modalImg.style.maxWidth = 'min(90%, 70vh)';
            modalImg.style.maxHeight = '80vh';
        } else {
            modalImg.style.maxWidth = '95%';
            modalImg.style.maxHeight = '75vh';
        }
    } else { // Desktop
        if (isPortrait) {
            modalImg.style.maxWidth = 'min(85%, 60vh)';
            modalImg.style.maxHeight = '85vh';
        } else {
            modalImg.style.maxWidth = '90%';
            modalImg.style.maxHeight = '80vh';
        }
    }
}

// Floating Social Bar Functionality
document.addEventListener('DOMContentLoaded', () => {
    const socialBar = document.querySelector('.social-floating-bar');
    const footer = document.querySelector('.site-footer');
    let lastScrollTop = 0;
    let scrollTimeout;

    // Add load effect
    if (socialBar) {
        // Initial state setup
        socialBar.style.opacity = '0';
        socialBar.style.transform = window.innerWidth <= 480 
            ? 'translateY(50px)' 
            : 'translateX(-50px) translateY(-50%)';

        // Trigger load animation after a short delay
        setTimeout(() => {
            socialBar.classList.add('loaded');
            socialBar.style.opacity = ''; // Remove inline styles
            socialBar.style.transform = ''; // Remove inline styles
        }, 500); // Delay the animation for better visual effect
    }

    function updateSocialBarTheme() {
        if (!socialBar) return;

        const socialBarRect = socialBar.getBoundingClientRect();
        const sections = document.querySelectorAll('section, footer');
        let isDarkBackground = false;

        sections.forEach(section => {
            const sectionRect = section.getBoundingClientRect();
            const backgroundColor = window.getComputedStyle(section).backgroundColor;
            
            // Check if social bar overlaps with this section
            if (socialBarRect.top < sectionRect.bottom && 
                socialBarRect.bottom > sectionRect.top) {
                // Convert backgroundColor to RGB values
                const rgb = backgroundColor.match(/\d+/g);
                if (rgb) {
                    // Calculate relative luminance
                    const luminance = (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255;
                    if (luminance < 0.5) {
                        isDarkBackground = true;
                    }
                }
            }
        });

        socialBar.classList.toggle('dark-theme', isDarkBackground);
    }

    function handleScroll() {
        if (!socialBar || !footer) return;

        const currentScroll = window.pageYOffset;
        const footerRect = footer.getBoundingClientRect();
        const isMobile = window.innerWidth <= 480;

        // Handle footer visibility
        if (footerRect.top <= window.innerHeight) {
            socialBar.classList.add('footer-visible');
        } else {
            socialBar.classList.remove('footer-visible');
        }

        // Handle mobile scroll behavior
        if (isMobile) {
            if (currentScroll > lastScrollTop) {
                // Scrolling down
                socialBar.classList.add('mobile-hidden');
            } else {
                // Scrolling up
                socialBar.classList.remove('mobile-hidden');
            }
        }

        lastScrollTop = currentScroll;

        // Update theme with throttling
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(updateSocialBarTheme, 100);
    }

    // Initial theme check
    updateSocialBarTheme();

    // Add scroll event listener with passive option for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateSocialBarTheme, { passive: true });

    // Intersection Observer for smoother transitions
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateSocialBarTheme();
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section, footer').forEach(section => {
        observer.observe(section);
    });
});
