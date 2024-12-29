document.addEventListener('DOMContentLoaded', function() {
    // Cache DOM elements for better performance
    const contentWrapper = document.querySelector('.content-wrapper');
    const navMenu = document.querySelector('.nav-menu');
    let mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const socialIcons = document.querySelectorAll('.social-icons a');
    
    // Fade in content on page load
    setTimeout(() => {
        contentWrapper.style.opacity = '1';
    }, 100);

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Close mobile menu if open
                if (window.innerWidth <= 768 && navMenu.style.display === 'block') {
                    toggleMobileMenu();
                }
                
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Enhanced social icons interaction
    socialIcons.forEach(icon => {
        // Mouse interactions
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });

        // Touch interactions for mobile
        icon.addEventListener('touchstart', function(e) {
            e.preventDefault();
            this.style.transform = 'translateY(-3px)';
        });

        icon.addEventListener('touchend', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Mobile menu functionality
    function createMobileMenu() {
        if (!mobileMenuBtn) {
            mobileMenuBtn = document.createElement('button');
            mobileMenuBtn.classList.add('mobile-menu-btn');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            document.querySelector('.container').appendChild(mobileMenuBtn);
            
            // Add click event listener to mobile menu button
            mobileMenuBtn.addEventListener('click', toggleMobileMenu);
        }
    }

    function toggleMobileMenu() {
        const isMenuVisible = navMenu.style.display === 'block';
        navMenu.style.display = isMenuVisible ? 'none' : 'block';
        
        // Toggle menu icon
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }

        // Add slide animation class
        navMenu.classList.toggle('active');
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && 
            navMenu.style.display === 'block' && 
            !navMenu.contains(e.target) && 
            e.target !== mobileMenuBtn) {
            toggleMobileMenu();
        }
    });

    // Improved resize handling with debounce
    let resizeTimeout;
    function handleResize() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const width = window.innerWidth;
            
            if (width <= 768) {
                navMenu.style.display = 'none';
                createMobileMenu();
            } else {
                navMenu.style.display = 'block';
                navMenu.classList.remove('active');
                if (mobileMenuBtn) {
                    mobileMenuBtn.remove();
                    mobileMenuBtn = null;
                }
            }
        }, 250); // Debounce delay
    }

    // Initialize mobile menu and add resize listener
    handleResize();
    window.addEventListener('resize', handleResize);

    // Handle keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && 
            window.innerWidth <= 768 && 
            navMenu.style.display === 'block') {
            toggleMobileMenu();
        }
    });

    // Handle page visibility changes
    document.addEventListener('visibilitychange', function() {
        if (document.hidden && 
            window.innerWidth <= 768 && 
            navMenu.style.display === 'block') {
            toggleMobileMenu();
        }
    });
});