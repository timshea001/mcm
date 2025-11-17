// ========================================
// MCM Studios Landing Page - JavaScript
// ========================================

(function() {
    'use strict';

    // ========================================
    // Form Validation & Submission
    // ========================================

    const leadForm = document.getElementById('leadForm');

    if (leadForm) {
        leadForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Reset previous errors
            clearErrors();

            // Validate form
            let isValid = true;

            // First Name validation
            const firstName = document.getElementById('firstName');
            if (!firstName.value.trim()) {
                showError(firstName, 'First name is required');
                isValid = false;
            }

            // Last Name validation
            const lastName = document.getElementById('lastName');
            if (!lastName.value.trim()) {
                showError(lastName, 'Last name is required');
                isValid = false;
            }

            // Email validation
            const email = document.getElementById('email');
            if (!email.value.trim()) {
                showError(email, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email');
                isValid = false;
            }

            // Phone validation
            const phone = document.getElementById('phone');
            if (!phone.value.trim()) {
                showError(phone, 'Phone number is required');
                isValid = false;
            } else if (!isValidPhone(phone.value)) {
                showError(phone, 'Please enter a valid phone number');
                isValid = false;
            }

            // Project Type validation
            const projectType = document.getElementById('projectType');
            if (!projectType.value) {
                showError(projectType, 'Please select a project type');
                isValid = false;
            }

            // If valid, submit form
            if (isValid) {
                handleFormSubmission();
            }
        });

        // Real-time validation on blur
        const formInputs = leadForm.querySelectorAll('input, select');
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });

            // Clear error on input
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    clearFieldError(this);
                }
            });
        });
    }

    function showError(field, message) {
        field.classList.add('error');
        const errorElement = field.parentElement.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('visible');
        }
    }

    function clearFieldError(field) {
        field.classList.remove('error');
        const errorElement = field.parentElement.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.classList.remove('visible');
        }
    }

    function clearErrors() {
        const errorFields = leadForm.querySelectorAll('.error');
        errorFields.forEach(field => clearFieldError(field));
    }

    function validateField(field) {
        const fieldId = field.id;

        switch(fieldId) {
            case 'firstName':
            case 'lastName':
                if (!field.value.trim()) {
                    showError(field, `${field.placeholder.replace('*', '')} is required`);
                }
                break;
            case 'email':
                if (!field.value.trim()) {
                    showError(field, 'Email is required');
                } else if (!isValidEmail(field.value)) {
                    showError(field, 'Please enter a valid email');
                }
                break;
            case 'phone':
                if (!field.value.trim()) {
                    showError(field, 'Phone number is required');
                } else if (!isValidPhone(field.value)) {
                    showError(field, 'Please enter a valid phone number');
                }
                break;
            case 'projectType':
                if (!field.value) {
                    showError(field, 'Please select a project type');
                }
                break;
        }
    }

    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function isValidPhone(phone) {
        // Remove all non-numeric characters
        const cleanPhone = phone.replace(/\D/g, '');
        // Check if it's at least 10 digits
        return cleanPhone.length >= 10;
    }

    function handleFormSubmission() {
        // Get form data
        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            projectType: document.getElementById('projectType').value,
            message: document.getElementById('message').value
        };

        console.log('Form submitted:', formData);

        // Track conversion
        trackConversion('form_submission', formData);

        // In production, you would send this to your backend
        // For now, show success message
        showSuccessMessage();

        // Reset form
        leadForm.reset();
    }

    function showSuccessMessage() {
        // Create success message
        const successDiv = document.createElement('div');
        successDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            text-align: center;
            max-width: 400px;
        `;

        successDiv.innerHTML = `
            <h3 style="margin-bottom: 1rem; color: #00D9FF;">Thank You!</h3>
            <p style="margin-bottom: 1.5rem; color: #374151;">Your quote request has been received. We'll contact you within 24 hours.</p>
            <button onclick="this.parentElement.remove()" style="
                background: #00D9FF;
                border: none;
                padding: 0.75rem 1.5rem;
                border-radius: 8px;
                font-weight: 600;
                cursor: pointer;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            ">Close</button>
        `;

        document.body.appendChild(successDiv);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (successDiv.parentElement) {
                successDiv.remove();
            }
        }, 5000);
    }

    // ========================================
    // FAQ Accordion
    // ========================================

    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');

            // Close all FAQ items
            faqItems.forEach(faq => faq.classList.remove('active'));

            // If it wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // ========================================
    // Smooth Scrolling
    // ========================================

    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Skip if it's just "#"
            if (href === '#') return;

            e.preventDefault();

            const target = document.querySelector(href);
            if (target) {
                const headerHeight = document.querySelector('.sticky-header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // Header Scroll Effect
    // ========================================

    const header = document.querySelector('.sticky-header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        // Add shadow on scroll
        if (currentScroll > 10) {
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
        }

        lastScroll = currentScroll;
    });

    // ========================================
    // Phone Number Formatting
    // ========================================

    const phoneInput = document.getElementById('phone');

    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');

            // Format as (XXX) XXX-XXXX
            if (value.length > 0) {
                if (value.length <= 3) {
                    value = `(${value}`;
                } else if (value.length <= 6) {
                    value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
                } else {
                    value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
                }
            }

            e.target.value = value;
        });
    }

    // ========================================
    // Analytics & Tracking (Placeholder)
    // ========================================

    function trackConversion(eventName, data) {
        // Google Analytics 4 tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, {
                'event_category': 'form',
                'event_label': data.projectType,
                'value': 1
            });
        }

        // Google Ads conversion tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', 'conversion', {
                'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL'
            });
        }

        console.log('Conversion tracked:', eventName, data);
    }

    // Track button clicks
    const ctaButtons = document.querySelectorAll('.btn');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();

            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    'event_category': 'button',
                    'event_label': buttonText
                });
            }

            console.log('Button clicked:', buttonText);
        });
    });

    // Track outbound phone clicks
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            trackConversion('phone_call', { source: 'landing_page' });
        });
    });

    // ========================================
    // Intersection Observer for Animations
    // ========================================

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.studio-card, .differentiator-card, .testimonial-card');
    animateElements.forEach(el => observer.observe(el));

    // ========================================
    // UTM Parameter Capture
    // ========================================

    function captureUTMParameters() {
        const urlParams = new URLSearchParams(window.location.search);
        const utmParams = {};

        ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach(param => {
            if (urlParams.has(param)) {
                utmParams[param] = urlParams.get(param);
            }
        });

        // Store in sessionStorage
        if (Object.keys(utmParams).length > 0) {
            sessionStorage.setItem('utm_params', JSON.stringify(utmParams));
            console.log('UTM parameters captured:', utmParams);
        }
    }

    // Capture UTM parameters on page load
    captureUTMParameters();

    // ========================================
    // Page Load Performance Tracking
    // ========================================

    window.addEventListener('load', function() {
        // Track page load time
        if (window.performance && window.performance.timing) {
            const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
            console.log('Page load time:', loadTime + 'ms');

            if (typeof gtag !== 'undefined') {
                gtag('event', 'timing_complete', {
                    'name': 'page_load',
                    'value': loadTime,
                    'event_category': 'performance'
                });
            }
        }
    });

    // ========================================
    // Logo Carousel Animation (Optional)
    // ========================================

    const logoCarousel = document.querySelector('.logo-carousel');

    if (logoCarousel && window.innerWidth >= 768) {
        // Add hover pause effect
        logoCarousel.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });

        logoCarousel.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
    }

    // ========================================
    // Initialize
    // ========================================

    console.log('MCM Studios Landing Page - Initialized');
    console.log('Form validation active');
    console.log('FAQ accordion ready');
    console.log('Analytics tracking configured');

})();
