/* ==========================================================================
   HairExercises.com — Main JavaScript Module
   Vanilla JS | No Dependencies | Privacy-First
   ========================================================================== */

(function () {
  'use strict';

  /* ---------- Utility Helpers ---------- */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const on = (el, evt, fn, opts) => el && el.addEventListener(evt, fn, opts);
  const ready = (fn) => {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  };

  /* ---------- 1. Navigation ---------- */
  function initNav() {
    const nav = $('.nav');
    const toggle = $('.nav-toggle');
    const mobileNav = $('.mobile-nav');
    const overlay = $('.mobile-nav-overlay');

    // Scroll behavior
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (nav) {
        nav.classList.toggle('scrolled', scrollY > 60);
      }
      lastScroll = scrollY;
    }, { passive: true });

    // Mobile menu
    function toggleMenu() {
      const isOpen = mobileNav && mobileNav.classList.contains('open');
      if (mobileNav) mobileNav.classList.toggle('open', !isOpen);
      if (overlay) overlay.classList.toggle('open', !isOpen);
      if (toggle) toggle.classList.toggle('active', !isOpen);
      document.body.style.overflow = isOpen ? '' : 'hidden';
    }

    on(toggle, 'click', toggleMenu);
    on(overlay, 'click', toggleMenu);

    // Close mobile menu on link click
    $$('.mobile-nav-link').forEach(link => {
      on(link, 'click', () => {
        if (mobileNav && mobileNav.classList.contains('open')) toggleMenu();
      });
    });

    // Smooth scroll for anchor links
    $$('a[href^="#"]').forEach(anchor => {
      on(anchor, 'click', (e) => {
        const target = $(anchor.getAttribute('href'));
        if (target) {
          e.preventDefault();
          const offset = nav ? nav.offsetHeight : 0;
          const top = target.getBoundingClientRect().top + window.scrollY - offset - 16;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });
  }

  /* ---------- 2. Language Switcher ---------- */
  function initLangSwitcher() {
    const btn = $('.lang-btn');
    const dropdown = $('.lang-dropdown');

    if (!btn || !dropdown) return;

    on(btn, 'click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('open');
    });

    on(document, 'click', () => {
      dropdown.classList.remove('open');
    });

    $$('.lang-option').forEach(opt => {
      on(opt, 'click', () => {
        const lang = opt.dataset.lang;
        const paths = { en: '/', es: '/es/', fr: '/fr/' };
        if (paths[lang]) window.location.href = paths[lang];
      });
    });
  }

  /* ---------- 3. Scroll Reveal Animations ---------- */
  function initReveal() {
    const elements = $$('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    elements.forEach(el => observer.observe(el));
  }

  /* ---------- 4. Animated Counters ---------- */
  function initCounters() {
    const counters = $$('[data-count]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(el => observer.observe(el));

    function animateCounter(el) {
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      const prefix = el.dataset.prefix || '';
      const duration = 2000;
      const start = performance.now();

      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * target);
        el.textContent = prefix + current.toLocaleString() + suffix;
        if (progress < 1) requestAnimationFrame(update);
      }

      requestAnimationFrame(update);
    }
  }

  /* ---------- 5. Hair Quiz ---------- */
  function initQuiz() {
    const quizEl = $('.quiz-widget');
    if (!quizEl) return;

    let currentStep = 0;
    let answers = {};

    const steps = $$('.quiz-step', quizEl);
    const progressSteps = $$('.quiz-progress-step', quizEl);
    const nextBtn = $('.quiz-next', quizEl);
    const prevBtn = $('.quiz-prev', quizEl);

    function showStep(index) {
      steps.forEach((s, i) => {
        s.classList.toggle('active', i === index);
      });
      progressSteps.forEach((p, i) => {
        p.classList.remove('active', 'completed');
        if (i < index) p.classList.add('completed');
        if (i === index) p.classList.add('active');
      });
      if (prevBtn) prevBtn.style.visibility = index > 0 ? 'visible' : 'hidden';
      if (nextBtn) {
        const isLast = index === steps.length - 2; // -1 for result step
        nextBtn.textContent = isLast
          ? (nextBtn.dataset.finishText || 'See Results')
          : (nextBtn.dataset.nextText || 'Next');
      }
    }

    // Handle option selection
    $$('.quiz-option', quizEl).forEach(opt => {
      on(opt, 'click', () => {
        const step = opt.closest('.quiz-step');
        $$('.quiz-option', step).forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        answers[currentStep] = opt.dataset.value;

        // Auto-advance after short delay
        setTimeout(() => {
          if (currentStep < steps.length - 2) {
            currentStep++;
            showStep(currentStep);
          } else if (currentStep === steps.length - 2) {
            currentStep++;
            showResults();
            showStep(currentStep);
          }
        }, 350);
      });
    });

    on(nextBtn, 'click', () => {
      if (currentStep < steps.length - 1) {
        if (currentStep === steps.length - 2) {
          showResults();
        }
        currentStep++;
        showStep(currentStep);
      }
    });

    on(prevBtn, 'click', () => {
      if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
      }
    });

    function showResults() {
      // Calculate a simple score based on answers
      const totalQuestions = Object.keys(answers).length;
      const score = Math.min(100, Math.round((totalQuestions / (steps.length - 1)) * 85 + Math.random() * 15));
      const scoreEl = $('.quiz-result-score-number', quizEl);
      const scoreCircle = $('.quiz-result-score', quizEl);
      const resultType = $('.quiz-result-type', quizEl);

      if (scoreEl) scoreEl.textContent = score;
      if (scoreCircle) scoreCircle.style.setProperty('--score-deg', (score / 100 * 360) + 'deg');

      // Determine hair type recommendation
      const types = ['straight', 'wavy', 'curly', 'coily', 'thinning'];
      const recommended = answers[0] || types[Math.floor(Math.random() * 4)];
      if (resultType) resultType.textContent = recommended.charAt(0).toUpperCase() + recommended.slice(1);

      // Save to localStorage
      try {
        localStorage.setItem('hairexercises_quiz', JSON.stringify({ answers, score, type: recommended, date: new Date().toISOString() }));
      } catch (e) { /* silent */ }

      // Mark all progress as completed
      progressSteps.forEach(p => {
        p.classList.remove('active');
        p.classList.add('completed');
      });
    }

    showStep(0);
  }

  /* ---------- 6. Habit Filtering ---------- */
  function initHabitFilter() {
    const container = $('.habits-filterable');
    if (!container) return;

    const filterBtns = $$('.filter-btn', container);
    const cards = $$('.habit-card', container);

    filterBtns.forEach(btn => {
      on(btn, 'click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        cards.forEach(card => {
          const categories = (card.dataset.category || '').split(',');
          const show = filter === 'all' || categories.includes(filter);
          card.style.display = show ? '' : 'none';
          if (show) {
            card.style.opacity = '0';
            card.style.transform = 'translateY(8px)';
            requestAnimationFrame(() => {
              card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            });
          }
        });
      });
    });
  }

  /* ---------- 7. Daily Tip Rotator ---------- */
  function initDailyTip() {
    const tipEl = $('.daily-tip-text');
    if (!tipEl) return;

    const tips = JSON.parse(tipEl.dataset.tips || '[]');
    if (!tips.length) return;

    // Use date-based index for consistent daily tip
    const dayIndex = Math.floor(Date.now() / 86400000) % tips.length;
    tipEl.textContent = tips[dayIndex];

    const nextBtn = $('.daily-tip-next');
    let tipIndex = dayIndex;

    on(nextBtn, 'click', () => {
      tipIndex = (tipIndex + 1) % tips.length;
      tipEl.style.opacity = '0';
      tipEl.style.transform = 'translateY(-8px)';
      setTimeout(() => {
        tipEl.textContent = tips[tipIndex];
        tipEl.style.opacity = '1';
        tipEl.style.transform = 'translateY(0)';
      }, 250);
    });

    // Save tip
    const saveBtn = $('.daily-tip-save');
    on(saveBtn, 'click', () => {
      try {
        const saved = JSON.parse(localStorage.getItem('hairexercises_tips') || '[]');
        if (!saved.includes(tips[tipIndex])) {
          saved.push(tips[tipIndex]);
          localStorage.setItem('hairexercises_tips', JSON.stringify(saved));
          if (saveBtn) {
            saveBtn.textContent = saveBtn.dataset.savedText || 'Saved!';
            setTimeout(() => { saveBtn.textContent = saveBtn.dataset.saveText || 'Save Tip'; }, 2000);
          }
        }
      } catch (e) { /* silent */ }
    });
  }

  /* ---------- 8. Hair Vitality Score Calculator ---------- */
  function initVitalityCalc() {
    const calc = $('.vitality-calculator');
    if (!calc) return;

    const sliders = $$('.vitality-slider', calc);
    const resultNumber = $('.vitality-result-number', calc);
    const resultLabel = $('.vitality-result-label', calc);

    function calculate() {
      let total = 0;
      let count = 0;

      sliders.forEach(slider => {
        const val = parseInt(slider.value, 10);
        const display = slider.closest('.vitality-slider-group').querySelector('.vitality-slider-value');
        if (display) display.textContent = val + '/10';
        total += val;
        count++;
      });

      const score = count > 0 ? Math.round((total / (count * 10)) * 100) : 0;
      if (resultNumber) resultNumber.textContent = score;

      if (resultLabel) {
        if (score >= 80) resultLabel.textContent = resultLabel.dataset.excellent || 'Excellent';
        else if (score >= 60) resultLabel.textContent = resultLabel.dataset.good || 'Good';
        else if (score >= 40) resultLabel.textContent = resultLabel.dataset.fair || 'Fair — Room for improvement';
        else resultLabel.textContent = resultLabel.dataset.low || 'Let\'s build some habits';
      }
    }

    sliders.forEach(slider => {
      on(slider, 'input', calculate);
    });

    calculate();
  }

  /* ---------- 9. 30-Day Challenge Calendar ---------- */
  function initChallenge() {
    const calendar = $('.challenge-calendar');
    const tipText = $('.challenge-tip-text');
    if (!calendar || !tipText) return;

    const days = $$('.calendar-day', calendar);
    const tipData = JSON.parse(tipText.dataset.tips || '{}');

    // Load completion state from localStorage
    let completed = {};
    try {
      completed = JSON.parse(localStorage.getItem('hairexercises_challenge') || '{}');
    } catch (e) { /* silent */ }

    days.forEach(day => {
      const num = day.dataset.day;
      if (completed[num]) day.classList.add('completed');

      on(day, 'click', () => {
        if (day.classList.contains('completed')) {
          day.classList.remove('completed');
          delete completed[num];
        } else {
          day.classList.add('completed');
          completed[num] = true;
        }

        try {
          localStorage.setItem('hairexercises_challenge', JSON.stringify(completed));
        } catch (e) { /* silent */ }

        // Show tip for the day
        if (tipData[num]) {
          tipText.style.opacity = '0';
          setTimeout(() => {
            tipText.textContent = tipData[num];
            tipText.style.opacity = '1';
          }, 200);
        }
      });
    });

    // Mark today
    const today = new Date().getDate();
    days.forEach(day => {
      if (parseInt(day.dataset.day, 10) === today) {
        day.classList.add('today');
      }
    });
  }

  /* ---------- 10. Back to Top ---------- */
  function initBackToTop() {
    const btn = $('.back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });

    on(btn, 'click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- 11. Newsletter Form ---------- */
  function initNewsletter() {
    const form = $('.newsletter-form');
    if (!form) return;

    on(form, 'submit', (e) => {
      e.preventDefault();
      const email = $('input[type="email"]', form);
      if (email && email.value) {
        const btn = $('button', form);
        const originalText = btn ? btn.textContent : '';
        if (btn) {
          btn.textContent = btn.dataset.successText || 'Subscribed!';
          btn.disabled = true;
          setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;
            email.value = '';
          }, 3000);
        }
      }
    });
  }

  /* ---------- 12. Story Progress Bars ---------- */
  function initStoryProgress() {
    const bars = $$('.story-progress-fill');
    if (!bars.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const width = entry.target.dataset.width || '0%';
          entry.target.style.width = width;
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    bars.forEach(bar => {
      bar.style.width = '0%';
      observer.observe(bar);
    });
  }

  /* ---------- 13. Image Lazy Loading ---------- */
  function initLazyLoad() {
    const images = $$('img[data-src]');
    if (!images.length) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            if (img.dataset.srcset) img.srcset = img.dataset.srcset;
            img.removeAttribute('data-src');
            img.removeAttribute('data-srcset');
            observer.unobserve(img);
          }
        });
      }, { rootMargin: '200px' });

      images.forEach(img => observer.observe(img));
    } else {
      // Fallback
      images.forEach(img => {
        img.src = img.dataset.src;
        if (img.dataset.srcset) img.srcset = img.dataset.srcset;
      });
    }
  }

  /* ---------- 14. Search Functionality ---------- */
  function initSearch() {
    const searchInput = $('#site-search');
    const searchResults = $('.search-results');
    if (!searchInput || !searchResults) return;

    // Simple client-side search using data attributes
    const searchItems = $$('[data-searchable]');
    let debounceTimer;

    on(searchInput, 'input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        const query = searchInput.value.toLowerCase().trim();
        if (query.length < 2) {
          searchResults.innerHTML = '';
          searchResults.style.display = 'none';
          return;
        }

        const results = searchItems.filter(item => {
          const text = (item.dataset.searchable || '').toLowerCase();
          return text.includes(query);
        });

        if (results.length) {
          searchResults.innerHTML = results.slice(0, 8).map(item => {
            const title = item.dataset.title || '';
            const url = item.dataset.url || '#';
            const type = item.dataset.type || '';
            return `<a href="${url}" class="search-result-item">
              <span class="search-result-type">${type}</span>
              <span class="search-result-title">${title}</span>
            </a>`;
          }).join('');
          searchResults.style.display = 'block';
        } else {
          searchResults.innerHTML = '<div class="search-no-results">No results found</div>';
          searchResults.style.display = 'block';
        }
      }, 200);
    });

    // Close on click outside
    on(document, 'click', (e) => {
      if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.style.display = 'none';
      }
    });
  }

  /* ---------- 15. Typing Effect (Hero) ---------- */
  function initTyping() {
    const el = $('.typing-text');
    if (!el) return;

    const words = JSON.parse(el.dataset.words || '[]');
    if (!words.length) return;

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function type() {
      const current = words[wordIndex];
      if (isDeleting) {
        el.textContent = current.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 40;
      } else {
        el.textContent = current.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 80;
      }

      if (!isDeleting && charIndex === current.length) {
        typingSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingSpeed = 300;
      }

      setTimeout(type, typingSpeed);
    }

    type();
  }

  /* ---------- 16. Parallax Effect ---------- */
  function initParallax() {
    const elements = $$('[data-parallax]');
    if (!elements.length) return;

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      elements.forEach(el => {
        const speed = parseFloat(el.dataset.parallax) || 0.3;
        const offset = scrollY * speed;
        el.style.transform = `translateY(${offset}px)`;
      });
    }, { passive: true });
  }

  /* ---------- Initialize Everything ---------- */
  ready(() => {
    initNav();
    initLangSwitcher();
    initReveal();
    initCounters();
    initQuiz();
    initHabitFilter();
    initDailyTip();
    initVitalityCalc();
    initChallenge();
    initBackToTop();
    initNewsletter();
    initStoryProgress();
    initLazyLoad();
    initSearch();
    initTyping();
    initParallax();
  });

})();
