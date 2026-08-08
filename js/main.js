/* ==========================================================================
   ASAD RAZA PORTFOLIO — MAIN JS MODULE v2.0
   Navigation, Preloader, Cinematic Scroll Animations, & Scroll Progress
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initNavigation();
  initLucideIcons();
  initScrollProgress();
  initScrollAnimations();
});

/* --------------------------------------------------------------------------
   1. Preloader Handler
   -------------------------------------------------------------------------- */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  const progress = document.querySelector('.preloader-progress');
  
  if (!preloader || !progress) return;
  
  let currentProgress = 0;
  const interval = setInterval(() => {
    currentProgress += Math.floor(Math.random() * 20) + 10;
    if (currentProgress > 100) currentProgress = 100;
    progress.style.width = `${currentProgress}%`;
    
    if (currentProgress === 100) {
      clearInterval(interval);
      setTimeout(() => {
        preloader.classList.add('loaded');
      }, 400);
    }
  }, 100);
}

/* --------------------------------------------------------------------------
   2. Navigation & Header Blur
   -------------------------------------------------------------------------- */
function initNavigation() {
  const header = document.querySelector('.header');
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  
  // Highlight active link based on scroll position
  function updateActiveLink() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    let current = '';
    const scrollPosition = window.scrollY + 140;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();
  
  // Mobile Hamburger Menu
  if (hamburger && mobileNav) {
    function closeMobileNav() {
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileNav.classList.remove('active');
      document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = hamburger.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', isActive ? 'true' : 'false');
      mobileNav.classList.toggle('active');
      document.body.style.overflow = isActive ? 'hidden' : '';
    });
    
    // Close mobile nav when clicking any link inside
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMobileNav);
    });

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
        closeMobileNav();
      }
    });
  }
}

/* --------------------------------------------------------------------------
   3. Lucide Icons Loader
   -------------------------------------------------------------------------- */
function initLucideIcons() {
  // Convert any remaining data-lucide brand icons (removed in Lucide v0.300+) to SVG
  document.querySelectorAll('[data-lucide]').forEach(el => {
    const name = el.getAttribute('data-lucide');
    if (name === 'github' || name === 'linkedin') {
      const w = el.style.width || '20px';
      const h = el.style.height || '20px';
      const numW = parseInt(w, 10) || 20;
      const numH = parseInt(h, 10) || 20;
      
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('width', numW);
      svg.setAttribute('height', numH);
      svg.setAttribute('viewBox', '0 0 24 24');
      svg.setAttribute('fill', 'none');
      svg.setAttribute('stroke', 'currentColor');
      svg.setAttribute('stroke-width', '2');
      svg.setAttribute('stroke-linecap', 'round');
      svg.setAttribute('stroke-linejoin', 'round');
      svg.setAttribute('class', `lucide lucide-${name}`);
      
      if (name === 'github') {
        svg.innerHTML = '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path>';
      } else if (name === 'linkedin') {
        svg.innerHTML = '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle>';
      }
      el.replaceWith(svg);
    }
  });

  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  }
}

/* --------------------------------------------------------------------------
   4. Scroll Progress Bar
   -------------------------------------------------------------------------- */
function initScrollProgress() {
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.body.appendChild(bar);

  window.addEventListener('scroll', () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (window.scrollY / scrollHeight) * 100;
    bar.style.width = `${scrollPercent}%`;
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   5. GSAP Cinematic ScrollTrigger Reveals (with Fallback)
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // --- Section Headers: Slide from left + blur dissolve ---
    gsap.utils.toArray('.section-header').forEach(header => {
      gsap.from(header, {
        scrollTrigger: {
          trigger: header,
          start: 'top 92%',
          once: true
        },
        opacity: 0,
        x: -40,
        filter: 'blur(8px)',
        duration: 0.8,
        clearProps: 'all',
        ease: 'power3.out'
      });
    });

    // --- About Cards: 3D Flip-in with scale ---
    const aboutGrid = document.querySelector('.about-grid');
    if (aboutGrid) {
      gsap.from(aboutGrid.children, {
        scrollTrigger: {
          trigger: aboutGrid,
          start: 'top 92%',
          once: true
        },
        opacity: 0,
        y: 40,
        scale: 0.92,
        rotateX: 8,
        duration: 0.7,
        stagger: 0.12,
        ease: 'back.out(1.4)',
        clearProps: 'all'
      });
    }

    // --- Project Cards: Stagger fade-up with scale ---
    const projectsGrid = document.querySelector('.projects-grid');
    if (projectsGrid) {
      gsap.from(projectsGrid.children, {
        scrollTrigger: {
          trigger: projectsGrid,
          start: 'top 92%',
          once: true
        },
        opacity: 0,
        y: 50,
        scale: 0.94,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        clearProps: 'all'
      });
    }

    // --- Service Cards: Stagger from right ---
    const servicesGrid = document.querySelector('.services-grid');
    if (servicesGrid) {
      gsap.from(servicesGrid.children, {
        scrollTrigger: {
          trigger: servicesGrid,
          start: 'top 92%',
          once: true
        },
        opacity: 0,
        x: 30,
        y: 20,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        clearProps: 'all'
      });
    }

    // --- Skill Cards: Horizontal slide-in stagger ---
    gsap.utils.toArray('.skills-grid').forEach(grid => {
      gsap.from(grid.children, {
        scrollTrigger: {
          trigger: grid,
          start: 'top 92%',
          once: true
        },
        opacity: 0,
        x: -30,
        duration: 0.5,
        stagger: 0.06,
        ease: 'power2.out',
        clearProps: 'all'
      });
    });

    // --- Timeline: Clip-path reveal from left ---
    gsap.utils.toArray('.timeline-content').forEach(content => {
      gsap.from(content, {
        scrollTrigger: {
          trigger: content,
          start: 'top 92%',
          once: true
        },
        opacity: 0,
        x: -50,
        clipPath: 'inset(0 100% 0 0)',
        duration: 0.8,
        ease: 'power3.out',
        clearProps: 'all'
      });
    });

    // --- Timeline Markers: Pop-in ---
    gsap.utils.toArray('.timeline-marker').forEach(marker => {
      gsap.from(marker, {
        scrollTrigger: {
          trigger: marker,
          start: 'top 92%',
          once: true
        },
        scale: 0,
        duration: 0.4,
        ease: 'back.out(3)',
        clearProps: 'all'
      });
    });

    // --- Contact Grid: Fade + rise ---
    const contactGrid = document.querySelector('.contact-grid');
    if (contactGrid) {
      gsap.from(contactGrid.children, {
        scrollTrigger: {
          trigger: contactGrid,
          start: 'top 92%',
          once: true
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        clearProps: 'all'
      });
    }

    // --- Hero Content: Stagger entrance ---
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      gsap.from(heroContent.children, {
        opacity: 0,
        y: 30,
        filter: 'blur(4px)',
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.8,
        clearProps: 'all'
      });
    }

    // --- Hero Avatar: Scale in ---
    const avatarWrapper = document.querySelector('.hero-avatar-wrapper');
    if (avatarWrapper) {
      gsap.from(avatarWrapper, {
        opacity: 0,
        scale: 0.8,
        duration: 1,
        ease: 'elastic.out(1, 0.6)',
        delay: 1.2,
        clearProps: 'all'
      });
    }

    // --- Section Parallax: Subtle depth effect ---
    gsap.utils.toArray('.section-spacing').forEach(section => {
      const header = section.querySelector('.section-header');
      if (header) {
        gsap.to(header, {
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'top 20%',
            scrub: 1.5
          },
          y: -15,
          ease: 'none'
        });
      }
    });
  }

  // Safety Fallback: Guarantee all cards & grids are 100% visible
  setTimeout(() => {
    document.querySelectorAll('.project-card, .service-card, .glass-card, .section-header, .skill-card, .timeline-content, .timeline-marker').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.style.visibility = 'visible';
      el.style.clipPath = 'none';
      el.style.filter = 'none';
    });
  }, 2500);
}
