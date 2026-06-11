// ===== BOARD MASTERY - SHARED JAVASCRIPT =====

// ===== THEME MANAGEMENT =====
const Theme = {
  init() {
    const saved = localStorage.getItem('bm_theme') || 'light';
    this.apply(saved);
  },
  apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('bm_theme', theme);
    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.textContent = theme === 'dark' ? '☀️' : '🌙';
      btn.title = theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    });
  },
  toggle() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    this.apply(current === 'dark' ? 'light' : 'dark');
  }
};

// ===== LOADER =====
function initLoader() {
  const loader = document.getElementById('page-loader');
  if (!loader) return;
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('hidden'), 800);
  });
  setTimeout(() => loader.classList.add('hidden'), 2000);
}

// ===== NAVBAR =====
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  // Scrolled state
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Active link
  const links = document.querySelectorAll('.nav-link');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Mobile menu
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
    });
    // Close on link click
    mobileMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
      });
    });
  }

  // Theme toggle
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.addEventListener('click', () => Theme.toggle());
  });
}

// ===== TOAST NOTIFICATIONS =====
const Toast = {
  container: null,
  init() {
    this.container = document.querySelector('.toast-container');
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.className = 'toast-container';
      document.body.appendChild(this.container);
    }
  },
  show(message, type = 'info', duration = 3000) {
    const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${icons[type] || icons.info}</span><span>${message}</span>`;
    this.container.appendChild(toast);
    setTimeout(() => {
      toast.style.animation = 'none';
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }
};

// ===== SCROLL REVEAL =====
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ===== MOTIVATIONAL QUOTES =====
const QUOTES = [
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "— Winston Churchill" },
  { text: "The secret of getting ahead is getting started.", author: "— Mark Twain" },
  { text: "It always seems impossible until it's done.", author: "— Nelson Mandela" },
  { text: "Education is the most powerful weapon which you can use to change the world.", author: "— Nelson Mandela" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "— Eleanor Roosevelt" },
  { text: "Strive for progress, not perfection.", author: "— Unknown" },
  { text: "Hard work beats talent when talent doesn't work hard.", author: "— Tim Notke" },
  { text: "Your limitation—it's only your imagination.", author: "— Unknown" },
  { text: "Dream it. Wish it. Do it.", author: "— Unknown" },
  { text: "Stay focused and never give up.", author: "— Anuprit Patil" },
];

function initQuoteRotator(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  let current = 0;
  const textEl = container.querySelector('.quote-text');
  const authorEl = container.querySelector('.quote-author');
  const dots = container.querySelectorAll('.quote-dot');

  const updateQuote = (idx) => {
    current = idx;
    if (textEl) textEl.textContent = QUOTES[idx].text;
    if (authorEl) authorEl.textContent = QUOTES[idx].author;
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
  };

  dots.forEach((dot, i) => dot.addEventListener('click', () => updateQuote(i)));
  updateQuote(0);

  setInterval(() => {
    updateQuote((current + 1) % QUOTES.length);
  }, 5000);
}

// ===== COUNTDOWN =====
function initCountdown(targetDate, elementId) {
  const container = document.getElementById(elementId);
  if (!container) return;

  const update = () => {
    const now = new Date();
    const target = new Date(targetDate);
    const diff = target - now;

    if (diff <= 0) {
      container.querySelector('.countdown-days').textContent = '00';
      container.querySelector('.countdown-hours').textContent = '00';
      container.querySelector('.countdown-mins').textContent = '00';
      container.querySelector('.countdown-secs').textContent = '00';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    const pad = n => String(n).padStart(2, '0');
    if (container.querySelector('.countdown-days')) container.querySelector('.countdown-days').textContent = pad(days);
    if (container.querySelector('.countdown-hours')) container.querySelector('.countdown-hours').textContent = pad(hours);
    if (container.querySelector('.countdown-mins')) container.querySelector('.countdown-mins').textContent = pad(mins);
    if (container.querySelector('.countdown-secs')) container.querySelector('.countdown-secs').textContent = pad(secs);
  };

  update();
  setInterval(update, 1000);
}

// ===== BOARD READINESS SCORE =====
function getBoardReadiness() {
  const tasks = JSON.parse(localStorage.getItem('bm_tasks') || '[]');
  const completed = tasks.filter(t => t.completed).length;
  const total = tasks.length;
  const taskScore = total > 0 ? (completed / total) * 40 : 0;

  const quizHistory = JSON.parse(localStorage.getItem('bm_quiz_history') || '[]');
  const avgQuiz = quizHistory.length > 0
    ? quizHistory.reduce((a, b) => a + (b.score / b.total), 0) / quizHistory.length * 40
    : 0;

  const streak = parseInt(localStorage.getItem('bm_streak') || '0');
  const streakScore = Math.min(streak * 2, 20);

  return Math.round(taskScore + avgQuiz + streakScore);
}

// ===== STATS COUNTER =====
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'));
        const duration = 1500;
        const start = performance.now();
        const animate = (now) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(eased * target).toLocaleString();
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => observer.observe(el));
}

// ===== MODAL HELPERS =====
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add('open');
}
function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove('open');
}
function initModals() {
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.classList.remove('open');
    });
    const closeBtn = overlay.querySelector('.modal-close');
    if (closeBtn) closeBtn.addEventListener('click', () => overlay.classList.remove('open'));
  });
}

// ===== STREAK MANAGEMENT =====
const Streak = {
  get() { return parseInt(localStorage.getItem('bm_streak') || '0'); },
  getLastDate() { return localStorage.getItem('bm_streak_date') || ''; },
  update() {
    const today = new Date().toDateString();
    const last = this.getLastDate();
    if (last === today) return this.get();

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (last === yesterday.toDateString()) {
      const newStreak = this.get() + 1;
      localStorage.setItem('bm_streak', newStreak);
      localStorage.setItem('bm_streak_date', today);
      return newStreak;
    } else if (!last) {
      localStorage.setItem('bm_streak', 1);
      localStorage.setItem('bm_streak_date', today);
      return 1;
    } else {
      localStorage.setItem('bm_streak', 1);
      localStorage.setItem('bm_streak_date', today);
      return 1;
    }
  }
};

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  Theme.init();
  Toast.init();
  initLoader();
  initNavbar();
  initScrollReveal();
  initModals();
  initCounters();
  Streak.update();
});
