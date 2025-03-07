// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Get all necessary elements
    const header = document.querySelector('header');
    const hamburger = document.querySelector('.hamburger');
    const navbar = document.querySelector('#navbar');
    const navLinks = document.querySelectorAll('nav ul li a');
    const backToTop = document.querySelector('.back-to-top');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const sections = document.querySelectorAll('section');
    const skillBars = document.querySelectorAll('.skill-progress');
    const contactForm = document.getElementById('contactForm');
    const socialIcons = document.querySelectorAll('.social-icons a');

    // Initialize particles.js
    if(typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#ffffff"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#ffffff",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }

    // Animate social media icons
    socialIcons.forEach((icon, index) => {
        setTimeout(() => {
            icon.style.transform = 'translateY(0) scale(1)';
            icon.style.opacity = '1';
        }, 200 * index);
        
        icon.addEventListener('mouseenter', function() {
            this.classList.add('animated');
            setTimeout(() => {
                this.classList.remove('animated');
            }, 1000);
        });
    });

    // Add skill icons to the skill items
    addSkillIcons();

    // Sticky Header
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
            backToTop.classList.add('active');
        } else {
            header.classList.remove('scrolled');
            backToTop.classList.remove('active');
        }
        
        // Active section highlight in navbar
        highlightActiveSection();
    });

    // Mobile Menu Toggle
    hamburger.addEventListener('click', function() {
        navbar.classList.toggle('active');
        this.classList.toggle('active');
        
        // Animate hamburger to X
        const bars = document.querySelectorAll('.bar');
        if (this.classList.contains('active')) {
            bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navbar.classList.remove('active');
            hamburger.classList.remove('active');
            
            // Reset hamburger icon
            const bars = document.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        });
    });

    // Back to Top button
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Project Filtering
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 200);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Animate skill bars on scroll
    function animateSkillBars() {
        const skillsSection = document.querySelector('.skills');
        const sectionPosition = skillsSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (sectionPosition < screenPosition) {
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 200);
            });
            
            // Remove event listener once animation is triggered
            window.removeEventListener('scroll', animateSkillBars);
        }
    }
    
    window.addEventListener('scroll', animateSkillBars);
    
    // Initially trigger the animation if skills section is already in view
    animateSkillBars();

    // Contact Form Submission (example - would need backend to fully implement)
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Basic validation
            if (name && email && subject && message) {
                // Simulate form submission
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = 'Sending...';
                submitBtn.disabled = true;
                
                // Simulate API call with timeout
                setTimeout(() => {
                    // Show success message (in a real app, you'd handle the actual form submission)
                    alert('Thank you for your message! I will get back to you soon.');
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Reset button
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 1500);
            } else {
                alert('Please fill in all fields');
            }
        });
    }

    // Highlight active section in navbar
    function highlightActiveSection() {
        let scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.project-card, .timeline-item, .skill-category');
    
    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('revealed');
            }
        });
    }
    
    window.addEventListener('scroll', revealOnScroll);
    // Initial check
    revealOnScroll();

    // Set current year in footer copyright
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2025', currentYear);
    }

    // Typing animation for hero section
    let typed = function(element, strings, typeSpeed = 100, backSpeed = 50, loop = false) {
        let currentText = '';
        let currentIndex = 0;
        let currentStringIndex = 0;
        let isDeleting = false;
        
        function type() {
            const currentString = strings[currentStringIndex];
            
            if (isDeleting) {
                currentText = currentString.substring(0, currentIndex - 1);
                currentIndex--;
            } else {
                currentText = currentString.substring(0, currentIndex + 1);
                currentIndex++;
            }
            
            element.textContent = currentText;
            
            let typingSpeed = isDeleting ? backSpeed : typeSpeed;
            
            if (!isDeleting && currentIndex === currentString.length) {
                typingSpeed = 1500; // Pause at the end of typing
                isDeleting = true;
            } else if (isDeleting && currentIndex === 0) {
                isDeleting = false;
                currentStringIndex = (currentStringIndex + 1) % strings.length;
                typingSpeed = 500; // Pause before typing the next string
            }
            
            setTimeout(type, typingSpeed);
        }
        
        type();
    };

    // Initialize typing animation for the role description
    const roleElement = document.querySelector('.hero-text h2');
    if (roleElement) {
        const originalText = roleElement.textContent;
        const roles = [
            originalText,
            "Java Expert",
            "Cloud Specialist",
            "Microservices Architect",
            "Full Stack Developer"
        ];
        typed(roleElement, roles);
    }

    // Function to add skill icons
    function addSkillIcons() {
        // Programming Languages
        addIconToSkill('Java', '<i class="fab fa-java"></i>');
        addIconToSkill('JavaScript/TypeScript', '<i class="fab fa-js"></i>');
        addIconToSkill('Python', '<i class="fab fa-python"></i>');
        addIconToSkill('SQL/PL/SQL', '<i class="fas fa-database"></i>');
        
        // Frameworks & Libraries
        addIconToSkill('Spring Boot', '<i class="fas fa-leaf"></i>');
        addIconToSkill('React/Next.js', '<i class="fab fa-react"></i>');
        addIconToSkill('Angular', '<i class="fab fa-angular"></i>');
        addIconToSkill('Hibernate/JPA', '<i class="fas fa-code"></i>');
        
        // Database & Cloud
        addIconToSkill('AWS', '<i class="fab fa-aws"></i>');
        addIconToSkill('Azure', '<i class="fab fa-microsoft"></i>');
        addIconToSkill('PostgreSQL', '<i class="fas fa-database"></i>');
        addIconToSkill('MongoDB', '<i class="fas fa-database"></i>');
        
        // DevOps & Tools
        addIconToSkill('Docker/Kubernetes', '<i class="fab fa-docker"></i>');
        addIconToSkill('Jenkins/CI/CD', '<i class="fab fa-jenkins"></i>');
        addIconToSkill('Git', '<i class="fab fa-git-alt"></i>');
        addIconToSkill('Terraform', '<i class="fas fa-cloud"></i>');
        
        // Add icons to skills categories
        addIconToCategory('Programming Languages', '<i class="fas fa-code"></i>');
        addIconToCategory('Frameworks & Libraries', '<i class="fas fa-layer-group"></i>');
        addIconToCategory('Database & Cloud', '<i class="fas fa-cloud"></i>');
        addIconToCategory('DevOps & Tools', '<i class="fas fa-tools"></i>');
    }

    // Helper function to add icon to skill
    function addIconToSkill(skillName, iconHTML) {
        const skillElements = document.querySelectorAll('.skill-name');
        skillElements.forEach(element => {
            if (element.textContent.trim() === skillName) {
                element.innerHTML = `<span class="skill-icon">${iconHTML}</span>${skillName}`;
            }
        });
    }

    // Helper function to add icon to category
    function addIconToCategory(categoryName, iconHTML) {
        const categoryElements = document.querySelectorAll('.skill-category h3');
        categoryElements.forEach(element => {
            if (element.textContent.trim() === categoryName) {
                element.innerHTML = `${iconHTML} ${categoryName}`;
            }
        });
    }
});