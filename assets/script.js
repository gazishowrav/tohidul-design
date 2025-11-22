
document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const closeIcon = document.getElementById('close-icon');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('is-open');
        // Toggle icons
        hamburgerIcon.classList.toggle('hidden');
        closeIcon.classList.toggle('hidden');
    });

    // Custom cursor effect for the entire page
    const customCursor = document.getElementById('custom-cursor');

    document.body.addEventListener('mousemove', (e) => {
        customCursor.style.display = 'block';
        customCursor.style.left = `${e.clientX}px`;
        customCursor.style.top = `${e.clientY}px`;
    });

    document.body.addEventListener('mouseleave', () => {
        customCursor.style.display = 'none';
    });


    // Hero section mouse move effect
    const heroSection = document.getElementById('home');
    const imageWrapper = document.getElementById('hero-image-wrapper');

    if (heroSection) {
        heroSection.addEventListener('mousemove', function (e) {
            const { left, top, width, height } = heroSection.getBoundingClientRect();
            const x = e.clientX - left;
            const y = e.clientY - top;

            const moveX = (x - width / 2) / (width / 2);
            const moveY = (y - height / 2) / (height / 2);

            const rotateX = -moveY * 8; // Rotate on X-axis
            const rotateY = moveX * 8;  // Rotate on Y-axis

            imageWrapper.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });

        heroSection.addEventListener('mouseleave', function () {
            imageWrapper.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    }

    // Initialize Skills Carousel for continuous scroll
    const skillsSwiper = new Swiper('.skills-carousel', {
        loop: true,
        speed: 4000,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
        },
        slidesPerView: 2,
        breakpoints: {
            768: {
                slidesPerView: 3,
            },
            1024: {
                slidesPerView: 5,
            }
        },
        allowTouchMove: false,
    });

    // Initialize Swiper
    const swiper = new Swiper('.featured-works-carousel', {
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            // when window width is >= 640px
            640: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            // when window width is >= 768px
            768: {
                slidesPerView: 2,
                spaceBetween: 30
            },
            // when window width is >= 1024px
            1024: {
                slidesPerView: 3,
                spaceBetween: 40
            }
        }
    });

    // Work filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const workItems = document.querySelectorAll('#work-grid .work-card');

    if (filterButtons.length > 0 && workItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Reset all buttons to inactive state
                filterButtons.forEach(btn => {
                    btn.classList.remove('active', 'bg-accent', 'text-white');
                    btn.classList.add('bg-secondary-dark', 'text-gray-300');
                });

                // Set the clicked button to active state
                button.classList.remove('bg-secondary-dark', 'text-gray-300');
                button.classList.add('active', 'bg-accent', 'text-white');

                const filter = button.getAttribute('data-filter');

                workItems.forEach(item => {
                    const categories = item.getAttribute('data-category').split(' ');
                    const workGrid = document.getElementById('work-grid');
                    if (workGrid) {
                        if (filter === 'all' || categories.includes(filter)) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    }
                });
            });
        });
    }
    // GSAP Animation for Floating Icons
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        const heroSection = document.getElementById('home');
        const skillsSection = document.getElementById('skills');
        const icons = document.querySelectorAll('.floating-icon');

        if (heroSection && skillsSection && icons.length > 0) {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: heroSection,
                    start: "top top",
                    end: "bottom center", // Extended end point for slower animation
                    scrub: 1, // Smooth scrubbing
                    invalidateOnRefresh: true, // Recalculate on resize
                }
            });

            // Animate icons
            tl.to(icons, {
                y: () => {
                    // Recalculate distance dynamically
                    const heroRect = heroSection.getBoundingClientRect();
                    const skillsRect = skillsSection.getBoundingClientRect();
                    return skillsRect.top - heroRect.top + (skillsRect.height / 2) - (heroRect.height / 2);
                },
                x: (i) => (i % 2 === 0 ? -50 : 50) + (Math.random() * 40 - 20), // Scatter slightly horizontally
                scale: 0.5, // Shrink to fit in better
                opacity: 0.2, // Don't fade out completely, keep slightly visible
                rotation: (i) => Math.random() * 180 - 90, // Random rotation
                stagger: 0.1, // Stagger start times for natural feel
                ease: "power1.out" // Smoother easing
            });
        }
    }
});
