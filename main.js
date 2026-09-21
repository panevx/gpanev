// Scroll to Top Logic
window.addEventListener('scroll', () => {
  const btn = document.getElementById('backToTop');
  if (window.scrollY > 400) {
    btn.classList.add('visible');
  } else {
    btn.classList.remove('visible');
  }
});

// Language Toggle Logic
let currentLang = localStorage.getItem('siteLang') || (navigator.language && navigator.language.toLowerCase().startsWith('bg') ? 'bg' : 'en');

function applyLang(lang) {
  document.querySelectorAll('[data-bg]').forEach(function(el) {
    if (!el.hasAttribute('data-en-cache')) {
      el.setAttribute('data-en-cache', el.innerHTML);
    }
    el.innerHTML = lang === 'bg' ? el.getAttribute('data-bg') : el.getAttribute('data-en-cache');
  });
  document.documentElement.lang = lang;
  var btn = document.getElementById('langToggle');
  if (btn) btn.textContent = lang === 'bg' ? 'EN' : 'BG';
  currentLang = lang;
  localStorage.setItem('siteLang', lang);
}

function toggleLang() {
  applyLang(currentLang === 'bg' ? 'en' : 'bg');
}

applyLang(currentLang);

// Modal DOM Injection
function openModal(key) {
  const tpl = document.getElementById('tpl-' + key);
  if (!tpl) return;
  
  // Clone the template content dynamically
  const content = tpl.content.cloneNode(true);
  
  const title = content.querySelector('.m-title');
  const sub = content.querySelector('.m-sub');
  const body = content.querySelector('.m-body');
  
  document.getElementById('modalTitle').innerHTML = '';
  if (title) document.getElementById('modalTitle').appendChild(title);
  
  document.getElementById('modalSubtitle').innerHTML = '';
  if (sub) document.getElementById('modalSubtitle').appendChild(sub);
  
  document.getElementById('modalBody').innerHTML = '';
  if (body) document.getElementById('modalBody').appendChild(body);
  
  const overlay = document.getElementById('modalOverlay');
  overlay.classList.add('active');
  overlay.setAttribute('aria-hidden', 'false');
  
  // Ensure the newly inserted text honors the current language selection
  applyLang(currentLang);
}

function closeModal() {
  const overlay = document.getElementById('modalOverlay');
  overlay.classList.remove('active');
  overlay.setAttribute('aria-hidden', 'true');
}

document.getElementById('modalOverlay').addEventListener('click', function(e) {
  if(e.target === this) closeModal();
});

// Scroll Reveal
(function() {
  var els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach(function(el) { el.classList.add('is-visible'); });
    return;
  }
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  els.forEach(function(el) { observer.observe(el); });
})();
