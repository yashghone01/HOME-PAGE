document.addEventListener('DOMContentLoaded', function() {
    // Fade in content on page load
    setTimeout(() => {
        document.querySelector('.content-wrapper').style.opacity = '1';
    }, 100);

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add hover animation for social icons
    const socialIcons = document.querySelectorAll('.social-icons a');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add mobile menu toggle functionality
    function handleResize() {
        const width = window.innerWidth;
        const navMenu = document.querySelector('.nav-menu');
        if (width <= 768) {
            navMenu.style.display = 'none';
            // Add mobile menu button if it doesn't exist
            if (!document.querySelector('.mobile-menu-btn')) {
                const menuBtn = document.createElement('button');
                menuBtn.classList.add('mobile-menu-btn');
                menuBtn.innerHTML = '☰';
                document.querySelector('.left-section').appendChild(menuBtn);
                
                menuBtn.addEventListener('click', () => {
                    navMenu.style.display = navMenu.style.display === 'none' ? 'block' : 'none';
                });
            }
        } else {
            navMenu.style.display = 'block';
            const menuBtn = document.querySelector('.mobile-menu-btn');
            if (menuBtn) menuBtn.remove();
        }
    }

    // Initial check and add event listener for window resize
    handleResize();
    window.addEventListener('resize', handleResize);
});
