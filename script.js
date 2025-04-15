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

// Modal Gallery Functionality
let currentImageIndex = 0;
let galleryImages = [];

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

    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.querySelector('.modal-caption');
    const closeBtn = document.querySelector('.modal-close');
    const prevBtn = document.querySelector('.modal-prev');
    const nextBtn = document.querySelector('.modal-next');

    // Get all gallery triggers
    const galleryTriggers = document.querySelectorAll('.gallery-trigger');

    galleryTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const gallery = this.closest('.project-gallery');
            const images = gallery.querySelectorAll('.gallery-images img');
            
            // Store gallery images for navigation
            galleryImages = Array.from(images);
            currentImageIndex = 0;
            
            // Show first image
            showImage(currentImageIndex);
            modal.style.display = 'block';
        });
    });

    // Close modal
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Navigation
    prevBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        showImage(currentImageIndex);
    });

    nextBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        showImage(currentImageIndex);
    });

    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'block') {
            if (e.key === 'ArrowLeft') {
                currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
                showImage(currentImageIndex);
            } else if (e.key === 'ArrowRight') {
                currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
                showImage(currentImageIndex);
            } else if (e.key === 'Escape') {
                modal.style.display = 'none';
            }
        }
    });
});

function showImage(index) {
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.querySelector('.modal-caption');
    const image = galleryImages[index];
    
    modalImg.src = image.src;
    modalImg.alt = image.alt;
    modalCaption.textContent = image.dataset.caption;
}