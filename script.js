// ============================================
// LOADING SCREEN
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loading-screen');
    
    setTimeout(() => {
        loadingScreen.classList.add('loaded');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1500);
});

// ============================================
// TASK 1: TYPING ANIMATION FOR "FULL STACK DEVELOPER"
// ============================================
function initTypingAnimation() {
    const text = "Full Stack Developer";
    const typingElement = document.getElementById('typed-text');
    let index = 0;
    let isDeleting = false;
    let isWaiting = false;
    let typingSpeed = 100;
    let pauseDuration = 5000; // 5 seconds pause

    function type() {
        if (!typingElement) return;

        if (isWaiting) {
            // Wait for pause duration
            setTimeout(() => {
                isWaiting = false;
                isDeleting = true;
                type();
            }, pauseDuration);
            return;
        }

        if (!isDeleting && index < text.length) {
            // Typing forward
            typingElement.textContent = text.substring(0, index + 1);
            index++;
            typingSpeed = Math.random() * 50 + 50; // Random speed between 50-100ms
            setTimeout(type, typingSpeed);
        } else if (isDeleting && index > 0) {
            // Deleting
            typingElement.textContent = text.substring(0, index - 1);
            index--;
            typingSpeed = Math.random() * 30 + 30; // Faster deletion
            setTimeout(type, typingSpeed);
        } else if (index === text.length) {
            // Finished typing, start waiting
            isWaiting = true;
            setTimeout(type, 100);
        } else if (index === 0) {
            // Finished deleting, start typing again
            isDeleting = false;
            setTimeout(type, 500); // Short pause before retyping
        }
    }

    // Start the typing effect
    setTimeout(type, 1000); // Delay start for loading screen
}

// ============================================
// BACK TO TOP BUTTON
// ============================================
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ============================================
// NAVBAR SCROLL BEHAVIOR
// ============================================
let lastScrollY = window.scrollY;
const nav = document.querySelector('.navbar');
let isMobileMenuOpen = false;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    // Add/remove scrolled class based on scroll position
    if (currentScrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    // Show/hide navbar based on scroll direction (only if mobile menu is closed)
    if (!isMobileMenuOpen) {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
    }
    
    lastScrollY = currentScrollY;
    
    // Always show navbar when at the top of the page
    if (currentScrollY < 10) {
        nav.style.transform = 'translateY(0)';
    }
    
    // Show/hide back to top button
    const backToTopBtn = document.getElementById('backToTop');
    if (currentScrollY > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
    
    // Animate skill bars when they come into view
    animateSkillBars();
});

// ============================================
// SKILL BARS ANIMATION
// ============================================
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.progress-bar');
    
    skillBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        const isVisible = (rect.top >= 0 && rect.bottom <= window.innerHeight);
        
        if (isVisible && !bar.classList.contains('animated')) {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
            bar.classList.add('animated');
        }
    });
}

// ============================================
// PORTFOLIO FILTER
// ============================================
function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.work');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ============================================
// TAB SWITCHING FUNCTION
// ============================================
function opentab(tabname, event) {
    const tablinks = document.getElementsByClassName("tab-links");
    const tabcontents = document.getElementsByClassName("tab-contents");
    
    // Remove active classes from all tabs
    for (let tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for (let tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }
    
    // Add active classes to clicked tab
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
    
    // Animate skill bars when skills tab is opened
    if (tabname === 'skills') {
        setTimeout(animateSkillBars, 300);
    }
}

// ============================================
// THEME TOGGLE SYSTEM
// ============================================
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    const moonIcon = document.getElementById('moonIcon');
    const sunIcon = document.getElementById('sunIcon');
    
    // Check for saved theme or prefer-color-scheme
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('theme');
    
    // Set initial theme
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
    } else {
        const systemTheme = prefersDarkScheme.matches ? 'dark' : 'light';
        htmlElement.setAttribute('data-theme', systemTheme);
        localStorage.setItem('theme', systemTheme);
    }
    
    // Set initial icon states based on current theme
    updateThemeIcons(htmlElement.getAttribute('data-theme'));
    
    // Theme toggle click handler
    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcons(newTheme);
    });
    
    // Listen for system theme changes
    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            htmlElement.setAttribute('data-theme', newTheme);
            updateThemeIcons(newTheme);
        }
    });
}

function updateThemeIcons(theme) {
    const moonIcon = document.getElementById('moonIcon');
    const sunIcon = document.getElementById('sunIcon');
    
    if (theme === 'dark') {
        moonIcon.style.display = 'block';
        sunIcon.style.display = 'none';
    } else {
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
    }
}

// ============================================
// MOBILE MENU TOGGLE
// ============================================
function initMobileMenu() {
    const menu = document.querySelector(".nav-links");
    const menuIcon = document.querySelector(".mobile-menu-toggle");
    const closeIcon = document.querySelector(".mobile-menu-close");
    
    // Initial setup based on screen width
    updateMobileMenuIcons();
    
    // Toggle mobile menu when menu icon is clicked
    if (menuIcon) {
        menuIcon.addEventListener("click", function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMobileMenu(true);
        });
    }
    
    // Close mobile menu when close icon is clicked
    if (closeIcon) {
        closeIcon.addEventListener("click", function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMobileMenu(false);
        });
    }
    
    // Close menu when clicking on navigation links
    const navLinks = document.querySelectorAll(".nav-links li a");
    navLinks.forEach(link => {
        link.addEventListener("click", function() {
            toggleMobileMenu(false);
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (isMobileMenuOpen && 
            !menu.contains(e.target) && 
            e.target !== menuIcon && 
            !closeIcon.contains(e.target)) {
            toggleMobileMenu(false);
        }
    });
    
    // Close menu with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isMobileMenuOpen) {
            toggleMobileMenu(false);
        }
    });
    
    // Update on window resize
    window.addEventListener('resize', function() {
        updateMobileMenuIcons();
        if (window.innerWidth > 768 && isMobileMenuOpen) {
            toggleMobileMenu(false);
        }
    });
}

function toggleMobileMenu(open) {
    const menu = document.querySelector(".nav-links");
    const menuIcon = document.querySelector(".mobile-menu-toggle");
    const closeIcon = document.querySelector(".mobile-menu-close");
    
    if (!menu || !menuIcon || !closeIcon) return;
    
    if (open) {
        // Open menu
        menu.classList.add("open");
        isMobileMenuOpen = true;
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        // Update navbar position
        document.querySelector('.navbar').style.transform = 'translateY(0)';
    } else {
        // Close menu
        menu.classList.remove("open");
        isMobileMenuOpen = false;
        // Restore body scroll
        document.body.style.overflow = '';
    }
    
    updateMobileMenuIcons();
}

function updateMobileMenuIcons() {
    const menuIcon = document.querySelector(".mobile-menu-toggle");
    const closeIcon = document.querySelector(".mobile-menu-close");
    
    if (!menuIcon || !closeIcon) return;
    
    if (window.innerWidth <= 768) {
        // Mobile view
        if (isMobileMenuOpen) {
            menuIcon.style.display = 'none';
            closeIcon.style.display = 'block';
        } else {
            menuIcon.style.display = 'block';
            closeIcon.style.display = 'none';
        }
    } else {
        // Desktop view - hide both icons
        menuIcon.style.display = 'none';
        closeIcon.style.display = 'none';
    }
}

// ============================================
// FORM VALIDATION AND SUBMISSION
// ============================================
function initForm() {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = form.querySelector('input[name="Name"]').value.trim();
            const email = form.querySelector('input[name="email"]').value.trim();
            const subject = form.querySelector('input[name="Subject"]').value.trim();
            const message = form.querySelector('textarea[name="Message"]').value.trim();
            
            // Remove existing error messages
            clearErrors();
            
            // Validate form
            let isValid = true;
            
            // Name validation
            if (!name) {
                showError('Name', 'Please enter your name');
                isValid = false;
            } else if (name.length < 2) {
                showError('Name', 'Name must be at least 2 characters long');
                isValid = false;
            }
            
            // Email validation
            if (!email) {
                showError('email', 'Please enter your email');
                isValid = false;
            } else if (!isValidEmail(email)) {
                showError('email', 'Please enter a valid email address');
                isValid = false;
            }
            
            // Message validation
            if (!message) {
                showError('Message', 'Please enter your message');
                isValid = false;
            } else if (message.length < 10) {
                showError('Message', 'Message must be at least 10 characters long');
                isValid = false;
            }
            
            // If form is valid, show success message
            if (isValid) {
                // Create form data object
                const formData = {
                    name: name,
                    email: email,
                    subject: subject,
                    message: message,
                    timestamp: new Date().toISOString()
                };
                
                // Log form data (in real app, send to server)
                console.log('Form submitted:', formData);
                
                // Show success message
                successMessage.classList.remove('hidden');
                successMessage.classList.remove('fade-out');
                
                // Reset form
                form.reset();
                
                // Hide success message after 3 seconds with fade effect
                setTimeout(() => {
                    successMessage.classList.add('fade-out');
                    setTimeout(() => {
                        successMessage.classList.add('hidden');
                    }, 500);
                }, 3000);
            }
        });
        
        // Add input event listeners to clear errors when user starts typing
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                clearFieldError(this.name);
            });
        });
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(fieldName, message) {
    const field = document.querySelector(`[name="${fieldName}"]`);
    if (field) {
        field.classList.add('error');
        
        // Create or update error message
        let errorElement = field.parentNode.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            field.parentNode.appendChild(errorElement);
        }
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

function clearFieldError(fieldName) {
    const field = document.querySelector(`[name="${fieldName}"]`);
    if (field) {
        field.classList.remove('error');
        
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.classList.remove('show');
        }
    }
}

function clearErrors() {
    const errors = document.querySelectorAll('.error');
    errors.forEach(error => error.classList.remove('error'));
    
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.classList.remove('show'));
}

// ============================================
// INITIALIZE EVERYTHING ON PAGE LOAD
// ============================================
document.addEventListener("DOMContentLoaded", function() {
    // Initialize all features
    initTheme();
    initMobileMenu();
    initBackToTop();
    initForm();
    initTypingAnimation();
    initPortfolioFilter();
    
    // Initialize animations on scroll
    animateSkillBars();
});