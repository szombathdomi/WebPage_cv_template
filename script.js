/**
 * Portfólió & Önéletrajz Sablon - JavaScript Funkciók
 */

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------------------------------------------------
  // 1. Theme Toggle (Dark / Light Mode)
  // -------------------------------------------------------------------------
  const themeToggle = document.getElementById('themeToggle');
  const htmlRoot = document.documentElement;

  // Retrieve saved theme or system preference
  const savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme) {
    htmlRoot.setAttribute('data-theme', savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    htmlRoot.setAttribute('data-theme', 'light');
  } else {
    htmlRoot.setAttribute('data-theme', 'dark');
  }

  themeToggle.addEventListener('click', () => {
    const currentTheme = htmlRoot.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    htmlRoot.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
    showToast(`Téma átváltva: ${newTheme === 'dark' ? 'Sötét mód' : 'Világos mód'}`, 'info');
  });

  // -------------------------------------------------------------------------
  // 2. Mobile Navigation Menu
  // -------------------------------------------------------------------------
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mainNav = document.getElementById('mainNav');
  const navLinks = document.querySelectorAll('.nav-link');

  function toggleMenu(isOpen) {
    const shouldOpen = isOpen !== undefined ? isOpen : !mainNav.classList.contains('open');
    if (shouldOpen) {
      mainNav.classList.add('open');
      mobileMenuBtn.classList.add('open');
      mobileMenuBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    } else {
      mainNav.classList.remove('open');
      mobileMenuBtn.classList.remove('open');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  }

  mobileMenuBtn.addEventListener('click', () => toggleMenu());

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mainNav.classList.contains('open')) {
        toggleMenu(false);
      }
    });
  });

  // Close mobile menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mainNav.classList.contains('open')) {
      toggleMenu(false);
    }
  });

  // -------------------------------------------------------------------------
  // 3. Scroll Active Link Highlighting (IntersectionObserver)
  // -------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -50% 0px',
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const activeId = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${activeId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => navObserver.observe(sec));

  // -------------------------------------------------------------------------
  // 4. Back to Top Button
  // -------------------------------------------------------------------------
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 450) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.pointerEvents = 'auto';
      } else {
        backToTopBtn.style.opacity = '0.5';
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // -------------------------------------------------------------------------
  // 5. Animated Number Counters
  // -------------------------------------------------------------------------
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  const countUp = (el, target) => {
    let current = 0;
    const duration = 1200;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = target / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
        el.textContent = `${target}${target === 100 ? '%' : '+'}`;
      } else {
        el.textContent = `${Math.floor(current)}${target === 100 ? '%' : '+'}`;
      }
    }, stepTime);
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        statNumbers.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-target'), 10);
          if (!isNaN(target)) {
            countUp(stat, target);
          }
        });
      }
    });
  }, { threshold: 0.5 });

  const statsGrid = document.querySelector('.stats-grid');
  if (statsGrid) {
    statsObserver.observe(statsGrid);
  }

  // -------------------------------------------------------------------------
  // 6. Copy Email to Clipboard
  // -------------------------------------------------------------------------
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async () => {
      const email = copyEmailBtn.getAttribute('data-email');
      try {
        await navigator.clipboard.writeText(email);
        showToast('E-mail cím másolva a vágólapra!', 'success');
      } catch (err) {
        // Fallback for older browsers
        const tempInput = document.createElement('input');
        tempInput.value = email;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showToast('E-mail cím másolva a vágólapra!', 'success');
      }
    });
  }

  // -------------------------------------------------------------------------
  // 7. Download CV (Sample Generator)
  // -------------------------------------------------------------------------
  const downloadCvBtn = document.getElementById('downloadCvBtn');
  if (downloadCvBtn) {
    downloadCvBtn.addEventListener('click', () => {
      const cvText = `======================================================
VEZETÉKNÉV KERESZTNÉV - FULL-STACK FEJLESZTŐ & SZOFTVERMÉRNÖK
======================================================
E-mail: kapcsolat@domain.hu | Tel: +36 20 000 0000
Helyszín: Budapest, Magyarország / Remote
Weboldal: https://pelda-weboldal.hu

SZAKMAI TAPASZTALAT
-------------------
• Senior Full-stack Fejlesztő @ Technológiai Vállalat / Cég Neve (2024 - Jelenleg)
  - Vállalati szintű Next.js / TypeScript rendszerek fejlesztése
  - Mikroszolgáltatások és performancia-optimalizálás (45% sebességnövekedés)

• Frontend Fejlesztő @ Digitális Ügynökség (2022 - 2024)
  - Reszponzív, interaktív UI/UX felületek készítése React és CSS segítségével
  - 12+ sikeres projekt átadása, REST API integrációk

• Junior Webfejlesztő @ Szoftverfejlesztő Iroda (2021 - 2022)
  - Landing oldalak, belső automatizációk, komponensek fejlesztése

TANULMÁNYOK
-----------
• Mérnökinformatikus BSc (2020 - 2024)
  Egyetem Neve / Felsőoktatási Intézmény
• Műszaki Informatikai Szakgimnázium (2016 - 2020)

FŐBB KÉSZSÉGEK
--------------
• Frontend: HTML5, CSS3, JavaScript (ES6+), TypeScript, React, Next.js
• Backend: Node.js, Express, Python, PostgreSQL, REST API
• Eszközök: Git, Docker, Figma, CI/CD, Agile/Scrum
======================================================`;

      const blob = new Blob([cvText], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'oneletrajz_sablon_minta.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      showToast('Önéletrajz minta sablon letöltve (.txt formátumban)!', 'success');
    });
  }

  // -------------------------------------------------------------------------
  // 8. Contact Form Handling
  // -------------------------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');

  if (contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    function validateField(input, condition) {
      const parent = input.closest('.form-group');
      if (condition) {
        parent.classList.remove('has-error');
        return true;
      } else {
        parent.classList.add('has-error');
        return false;
      }
    }

    // Input listeners to clear errors
    [nameInput, emailInput, messageInput].forEach(inp => {
      inp.addEventListener('input', () => {
        inp.closest('.form-group').classList.remove('has-error');
      });
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = validateField(nameInput, nameInput.value.trim().length >= 2);
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isEmailValid = validateField(emailInput, emailPattern.test(emailInput.value.trim()));
      const isMessageValid = validateField(messageInput, messageInput.value.trim().length >= 5);

      if (!isNameValid || !isEmailValid || !isMessageValid) {
        showToast('Kérlek, töltsd ki helyesen a megjelölt mezőket!', 'error');
        return;
      }

      // Simulate sending
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        contactForm.reset();
        showToast('Köszönjük a megkeresést! Az üzenet sikeresen elküldve (szimuláció).', 'success');
      }, 1000);
    });
  }

  // -------------------------------------------------------------------------
  // 9. Toast Notification System
  // -------------------------------------------------------------------------
  function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let icon = 'ℹ️';
    if (type === 'success') icon = '✅';
    if (type === 'error') icon = '⚠️';

    toast.innerHTML = `
      <span class="toast-icon">${icon}</span>
      <span class="toast-msg">${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('toast-exit');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 3500);
  }
});
