 // 1. Theme Switcher (Dark / Light)
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    function setTheme(isDark) {
      if (isDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.body.classList.add('dark');
        themeIcon.className = 'fa-solid fa-sun';
      } else {
        document.documentElement.removeAttribute('data-theme');
        document.body.classList.remove('dark');
        themeIcon.className = 'fa-solid fa-moon';
      }
    }

    setTheme(true);

    themeToggleBtn.addEventListener('click', () => {
      const isDark = document.body.classList.contains('dark');
      setTheme(!isDark);
    });

    // 2. Mobile Drawer Navigation
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const sidebarCloseBtn = document.getElementById('sidebar-close-btn');
    const mobileSidebar = document.getElementById('mobile-sidebar');
    const mobileBackdrop = document.getElementById('mobile-backdrop');
    const sidebarLinks = document.querySelectorAll('.sidebar-nav-link');

    function openMobileMenu() {
      mobileSidebar.classList.add('open');
      mobileBackdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
      mobileSidebar.classList.remove('open');
      mobileBackdrop.classList.remove('open');
      document.body.style.overflow = '';
    }

    mobileMenuBtn.addEventListener('click', openMobileMenu);
    sidebarCloseBtn.addEventListener('click', closeMobileMenu);
    mobileBackdrop.addEventListener('click', closeMobileMenu);

    sidebarLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    // 3. Navbar Auto-Hide on Scroll Down / Show on Scroll Up
    let lastScrollY = window.scrollY;
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        navbar.classList.add('nav-hidden');
      } else if (currentScrollY < lastScrollY) {
        navbar.classList.remove('nav-hidden');
      }
      lastScrollY = currentScrollY;

      // Scroll to top button visibility
      const scrollTopBtn = document.getElementById('scroll-top-btn');
      if (currentScrollY > 400) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    });

    document.getElementById('scroll-top-btn').addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 4. Hero Background Interactive Canvas
    const heroCanvas = document.getElementById('hero-canvas');
    const ctx = heroCanvas.getContext('2d');
    let width, height, particles = [];

    function resizeHeroCanvas() {
      width = heroCanvas.width = heroCanvas.parentElement.offsetWidth;
      height = heroCanvas.height = heroCanvas.parentElement.offsetHeight;
    }
    resizeHeroCanvas();
    window.addEventListener('resize', resizeHeroCanvas);

    class HeroParticle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.7;
        this.vy = (Math.random() - 0.5) * 0.7;
        this.radius = Math.random() * 2 + 1;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }
      draw() {
        const isDark = document.body.classList.contains('dark');
        ctx.fillStyle = isDark ? '#38BDF8' : '#0284C7';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < 50; i++) particles.push(new HeroParticle());

    function animateHeroCanvas() {
      ctx.clearRect(0, 0, width, height);
      const isDark = document.body.classList.contains('dark');
      const lineColor = isDark ? 'rgba(56, 189, 248, 0.12)' : 'rgba(2, 132, 199, 0.12)';

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animateHeroCanvas);
    }
    animateHeroCanvas();

    // 5. Cursor Particle Blast Animation
    const cursorCanvas = document.getElementById('cursor-canvas');
    const cCtx = cursorCanvas.getContext('2d');
    let blastParticles = [];

    function resizeCursorCanvas() {
      cursorCanvas.width = window.innerWidth;
      cursorCanvas.height = window.innerHeight;
    }
    resizeCursorCanvas();
    window.addEventListener('resize', resizeCursorCanvas);

    class BlastParticle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1.5;
        this.speedX = (Math.random() - 0.5) * 4;
        this.speedY = (Math.random() - 0.5) * 4;
        this.alpha = 1;
        this.decay = Math.random() * 0.03 + 0.02;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha -= this.decay;
      }
      draw() {
        const isDark = document.body.classList.contains('dark');
        cCtx.fillStyle = isDark 
          ? `rgba(56, 189, 248, ${this.alpha})` 
          : `rgba(2, 132, 199, ${this.alpha})`;
        cCtx.beginPath();
        cCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        cCtx.fill();
      }
    }

    window.addEventListener('mousemove', (e) => {
      for (let i = 0; i < 2; i++) {
        blastParticles.push(new BlastParticle(e.clientX, e.clientY));
      }
    });

    function animateBlast() {
      cCtx.clearRect(0, 0, cursorCanvas.width, cursorCanvas.height);
      for (let i = blastParticles.length - 1; i >= 0; i--) {
        blastParticles[i].update();
        blastParticles[i].draw();
        if (blastParticles[i].alpha <= 0) {
          blastParticles.splice(i, 1);
        }
      }
      requestAnimationFrame(animateBlast);
    }
    animateBlast();

    // 6. Skills Data & Dynamic Filter Tabs
    const skillsData = [
      { name: 'Programmatic Ad Formats', cat: 'adtech', icon: 'fa-layer-group' },
      { name: 'Publisher Management', cat: 'adtech', icon: 'fa-network-wired' },
      { name: 'Static & Rich Media Banners', cat: 'adtech', icon: 'fa-image' },
      { name: 'Traffic Metric Analytics', cat: 'adtech', icon: 'fa-chart-line' },
      { name: 'Campaign Strategy & ROI', cat: 'adtech', icon: 'fa-bullseye' },
      { name: 'Full-Cycle Accounting', cat: 'accounts', icon: 'fa-receipt' },
      { name: 'Letter of Credit (LC) Mgmt', cat: 'accounts', icon: 'fa-file-invoice-dollar' },
      { name: 'Payroll Operations (1200+)', cat: 'accounts', icon: 'fa-users' },
      { name: 'Financial Statements', cat: 'accounts', icon: 'fa-chart-pie' },
      { name: 'Digital Marketing & Ops', cat: 'tech', icon: 'fa-globe' },
      { name: 'Microsoft Excel (Advanced)', cat: 'tech', icon: 'fa-table' },
      { name: 'MS Office & Presentations', cat: 'tech', icon: 'fa-desktop' },
      { name: 'BTEB Certified Apps', cat: 'tech', icon: 'fa-award' }
    ];

    const skillsGrid = document.getElementById('skills-grid');
    function renderSkills(filter = 'all') {
      skillsGrid.innerHTML = '';
      const filtered = filter === 'all' ? skillsData : skillsData.filter(s => s.cat === filter);
      filtered.forEach(skill => {
        const card = document.createElement('div');
        card.className = 'skill-item-card anim-target';
        card.innerHTML = `
          <div class="skill-icon"><i class="fa-solid ${skill.icon}"></i></div>
          <span style="font-weight:600; font-size: 0.95rem;">${skill.name}</span>
        `;
        skillsGrid.appendChild(card);
      });
      initGSAPScrollAnimations();
    }
    renderSkills();

    document.querySelectorAll('.skill-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.skill-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderSkills(btn.dataset.filter);
      });
    });

    // 7. Spotlight Glow Cursor Follow
    document.querySelectorAll('.spotlight-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
      });
    });

    // 8. Bidirectional GSAP Scroll Animations
    gsap.registerPlugin(ScrollTrigger);

    function initGSAPScrollAnimations() {
      gsap.utils.toArray('.anim-target').forEach(el => {
        gsap.fromTo(el, 
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              end: 'bottom 12%',
              toggleActions: 'play reverse play reverse'
            }
          }
        );
      });
    }
    initGSAPScrollAnimations();

    // Stats Numeric Roll-up on Scroll
    ScrollTrigger.create({
      trigger: '#stats',
      start: 'top 85%',
      toggleActions: 'play restart play restart',
      onEnter: () => animateCounters(),
      onEnterBack: () => animateCounters()
    });

    function animateCounters() {
      document.querySelectorAll('.counter').forEach(el => {
        const target = +el.dataset.target;
        gsap.fromTo(el, 
          { innerHTML: 0 },
          {
            innerHTML: target,
            duration: 1.8,
            snap: { innerHTML: 1 },
            ease: 'power2.out'
          }
        );
      });
    }