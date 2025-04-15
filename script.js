// Typing Animation
const heroTitle = document.querySelector('.hero-title');
const textsToType = ['Web Developer', 'Problem Solver', 'Tech Enthusiast', 'IT Student'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeText() {
    const currentText = textsToType[textIndex];
    
    if (isDeleting) {
        heroTitle.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        heroTitle.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(typeText, 1500); // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textsToType.length;
        setTimeout(typeText, 500); // Pause before next word
    } else {
        setTimeout(typeText, isDeleting ? 50 : 100);
    }
}


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

    // Start typing animation
    setTimeout(typeText, 500);

    // Observe skills section
    if (skillsSection) {
        observer.observe(skillsSection);
    }

    // Project Gallery Modal
    const projectModal = document.getElementById('imageModal');
    if (projectModal) {
        const modalImg = document.getElementById('modalImage');
        const modalCaption = projectModal.querySelector('.modal-caption');
        const closeBtn = projectModal.querySelector('.modal-close');
        const prevBtn = projectModal.querySelector('.modal-prev');
        const nextBtn = projectModal.querySelector('.modal-next');

        // Get all gallery triggers
        const galleryTriggers = document.querySelectorAll('.gallery-trigger');

        galleryTriggers.forEach(trigger => {
            trigger.addEventListener('click', function() {
                const gallery = this.closest('.project-gallery');
                const images = gallery.querySelectorAll('.gallery-images img');
                
                // Store gallery images for navigation
                projectGalleryImages = Array.from(images);
                projectCurrentImageIndex = 0;
                
                // Show first image
                showProjectImage(projectCurrentImageIndex);
                projectModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        });

        // Close modal
        closeBtn.addEventListener('click', () => {
            projectModal.style.display = 'none';
            document.body.style.overflow = '';
        });

        // Navigation
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                projectCurrentImageIndex = (projectCurrentImageIndex - 1 + projectGalleryImages.length) % projectGalleryImages.length;
                showProjectImage(projectCurrentImageIndex);
            });

            nextBtn.addEventListener('click', () => {
                projectCurrentImageIndex = (projectCurrentImageIndex + 1) % projectGalleryImages.length;
                showProjectImage(projectCurrentImageIndex);
            });
        }

        // Close on outside click
        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) {
                projectModal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }

    // Quiz Modal Functionality
    const quizModal = document.getElementById('quizModal');
    if (quizModal) {
        const modalQuizImg = document.getElementById('modalQuizImage');
        const modalQuizCaption = quizModal.querySelector('.modal-caption');
        const closeQuizBtn = quizModal.querySelector('.modal-close');
        const quizPreviews = document.querySelectorAll('.quiz-paper-preview');

        // Open modal when clicking on quiz paper preview
        quizPreviews.forEach(preview => {
            preview.addEventListener('click', function() {
                const img = this.querySelector('img');
                const quizItem = this.closest('.quiz-item');
                const quizTitle = quizItem.querySelector('h3').textContent;
                const quizScore = quizItem.querySelector('.quiz-score').textContent;
                
                modalQuizImg.src = img.src;
                modalQuizCaption.textContent = `${quizTitle} - ${quizScore}`;
                quizModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        });

        // Close modal when clicking close button
        closeQuizBtn.addEventListener('click', () => {
            quizModal.style.display = 'none';
            document.body.style.overflow = '';
        });

        // Close modal when clicking outside
        quizModal.addEventListener('click', (e) => {
            if (e.target === quizModal) {
                quizModal.style.display = 'none';
                document.body.style.overflow = '';
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
});

// Separate function for project image display
function showProjectImage(index) {
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.querySelector('#imageModal .modal-caption');
    const image = projectGalleryImages[index];
    
    if (modalImg && image) {
        modalImg.src = image.src;
        modalImg.alt = image.alt;
        if (modalCaption && image.dataset.caption) {
            modalCaption.textContent = image.dataset.caption;
        }
    }
}
