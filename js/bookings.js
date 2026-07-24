/**
 * bookings.js — Bookings page JavaScript
 * Stepper animation, contact card actions, copy-to-clipboard, toast
 */

document.addEventListener('DOMContentLoaded', () => {
  initContactCardLinks();
  initCopyToClipboard();
  initStepperAnimation();
  initContactCardEntrance();
});

function showToast(message) {
  const existing = document.getElementById('toast-notification');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'toast-notification';
  toast.className = 'fixed top-6 right-6 z-50 bg-[#8b7500] text-black px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-sm font-medium translate-x-full opacity-0 transition-all duration-500 ease-out';
  toast.innerHTML = '<span class="w-6 h-6 bg-black/20 rounded-full flex items-center justify-center text-white text-xs font-bold">✓</span><span>' + message + '</span>';
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toast.classList.remove('translate-x-full', 'opacity-0');
      toast.classList.add('translate-x-0', 'opacity-100');
    });
  });

  setTimeout(() => {
    toast.classList.add('translate-x-full', 'opacity-0');
    toast.classList.remove('translate-x-0', 'opacity-100');
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}

function initContactCardLinks() {
  const contactCards = document.querySelectorAll('[data-contact]');
  contactCards.forEach(card => {
    card.classList.add('cursor-pointer', 'transition-all', 'duration-300', 'hover:border-[#8b7500]', 'hover:scale-[1.03]');
    card.addEventListener('click', () => {
      const type = card.dataset.contact;
      const urls = {
        whatsapp: 'https://wa.me/2348165814577',
        instagram: 'https://instagram.com/g.o_collections',
        facebook: 'https://facebook.com',
        tiktok: 'https://tiktok.com/@generalgeeo',
        location: 'https://maps.google.com/?q=Shop+19+El+Tof+Plaza+Jos'
      };
      if (urls[type]) window.open(urls[type], '_blank');
      card.classList.add('scale-95');
      setTimeout(() => card.classList.remove('scale-95'), 150);
    });
  });
}

function initCopyToClipboard() {
  const copyElements = document.querySelectorAll('[data-copy]');
  copyElements.forEach(el => {
    el.classList.add('cursor-pointer', 'hover:text-[#c9a227]', 'transition-colors', 'duration-200');
    el.title = 'Click to copy';
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      const text = el.dataset.copy || el.textContent.trim();
      navigator.clipboard.writeText(text).then(() => showToast('Copied: ' + text)).catch(() => showToast('Copied: ' + text));
      el.classList.add('text-[#c9a227]', 'scale-110');
      setTimeout(() => el.classList.remove('text-[#c9a227]', 'scale-110'), 500);
    });
  });
}

function initStepperAnimation() {
  const steps = document.querySelectorAll('[data-step]');
  if (steps.length === 0) return;

  steps.forEach(step => {
    step.classList.add('opacity-0', 'translate-x-8', 'transition-all', 'duration-500', 'ease-out');
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        steps.forEach((step, i) => {
          setTimeout(() => {
            step.classList.remove('opacity-0', 'translate-x-8');
            step.classList.add('opacity-100', 'translate-x-0');
            const num = step.querySelector('h2');
            if (num) {
              num.classList.add('scale-125');
              setTimeout(() => num.classList.remove('scale-125'), 300);
            }
          }, i * 400);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  if (steps[0]) observer.observe(steps[0]);
}

function initContactCardEntrance() {
  const cards = document.querySelectorAll('[data-contact]');
  cards.forEach((card, i) => {
    card.classList.add('opacity-0', 'scale-90', 'transition-all', 'duration-500', 'ease-out');
    setTimeout(() => {
      card.classList.remove('opacity-0', 'scale-90');
      card.classList.add('opacity-100', 'scale-100');
    }, 300 + i * 150);
  });
}
