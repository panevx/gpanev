// Language Toggle Logic
let currentLang = localStorage.getItem('siteLang') || (navigator.language && navigator.language.toLowerCase().startsWith('bg') ? 'bg' : 'en');

function applyLang(lang) {
  document.querySelectorAll('[data-bg]').forEach(el => {
    if (!el.hasAttribute('data-en-cache')) {
      el.setAttribute('data-en-cache', el.innerHTML);
    }
    el.innerHTML = lang === 'bg' ? el.getAttribute('data-bg') : el.getAttribute('data-en-cache');
  });
  document.documentElement.lang = lang;
  const btn = document.getElementById('langToggle');
  if (btn) btn.textContent = lang === 'bg' ? 'EN' : 'BG';
  currentLang = lang;
  localStorage.setItem('siteLang', lang);
}

function toggleLang() {
  applyLang(currentLang === 'bg' ? 'en' : 'bg');
}

// Modal Data mapping using template clones
const modalTitles = {
  animalsync: { en: "AnimalSync", bg: "AnimalSync" },
  soapi: { en: "Invest Sofia (SOAPI)", bg: "Invest Sofia (SOAPI)" },
  erasmus: { en: "Erasmus+ Delegation", bg: "Делегация Erasmus+" },
  euipo: { en: "Intellectual Property Training", bg: "Обучение по Интелектуална Собственост" },
  tiktok: { en: "Audience Acquisition Experiment", bg: "Експеримент за Придобиване на Аудитория" }
};

const modalSubtitles = {
  animalsync: { en: "Product Prototype & Junior Achievement Qualifier", bg: "Продуктов Прототип и Финалист на Junior Achievement" },
  soapi: { en: "Municipal Investment Agency (2025–2026)", bg: "Общинска Инвестиционна Агенция (2025–2026)" },
  erasmus: { en: "ICT and STEM Mobility Project (June 2026)", bg: "Проект за Мобилност по ИКТ и STEM (Юни 2026)" },
  euipo: { en: "Sustainable Business Development (Oct 2025)", bg: "Устойчиво Развитие на Бизнеса (Окт. 2025)" },
  tiktok: { en: "TikTok Account Revival (2025)", bg: "Съживяване на TikTok Профил (2025)" }
};

function openModal(key) {
  const tmplId = `tmpl-${key}-${currentLang}`;
  const tmpl = document.getElementById(tmplId);
  if (!tmpl) return;

  document.getElementById('modalTitle').textContent = modalTitles[key][currentLang] || modalTitles[key]['en'];
  document.getElementById('modalSubtitle').textContent = modalSubtitles[key][currentLang] || modalSubtitles[key]['en'];
  
  const modalBody = document.getElementById('modalBody');
  modalBody.innerHTML = '';
  modalBody.appendChild(tmpl.content.cloneNode(true));
  
  document.getElementById('modalOverlay').classList.add('active');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('active');
}

// Event Listeners initialization
document.addEventListener('DOMContentLoaded', () => {
  // Apply Language on initial load
  applyLang(currentLang);

  // Toggle button listener
  const langToggleBtn = document.getElementById('langToggle');
  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', toggleLang);
  }

  // Modal open button triggers
  document.querySelectorAll('[data-modal-target]').forEach(button => {
    button.addEventListener('click', () => {
      const targetKey = button.getAttribute('data-modal-target');
      openModal(targetKey);
    });
  });

  // Modal close triggers
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  const modalOverlay = document.getElementById('modalOverlay');
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  // Back to Top button scroll handler
  window.addEventListener('scroll', () => {
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  // Scroll Reveal Animations via IntersectionObserver
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-visible'));
  }
});
