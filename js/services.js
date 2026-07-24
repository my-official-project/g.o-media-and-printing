/**
 * services.js — Services page JavaScript
 * Category filter tabs, lightbox modal, card hover effects, scroll-triggered reveals
 */

document.addEventListener('DOMContentLoaded', () => {
  initFilterTabs();
  initLightbox();
  initCardHoverEffects();
  initServiceCounters();
});

/* ─── Category Filter Tabs ─── */
function initFilterTabs() {
  const tabContainer = document.getElementById('filter-tabs');
  const sections = document.querySelectorAll('[data-category]');
  if (!tabContainer || sections.length === 0) return;

  const tabs = tabContainer.querySelectorAll('[data-filter]');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const filter = tab.dataset.filter;

      // Update active tab styling
      tabs.forEach(t => {
        t.classList.remove('bg-[#8b7500]', 'text-black', 'shadow-lg', 'shadow-[#8b7500]/30');
        t.classList.add('bg-[#1a1610]', 'text-[#8b7500]');
      });
      tab.classList.add('bg-[#8b7500]', 'text-black', 'shadow-lg', 'shadow-[#8b7500]/30');
      tab.classList.remove('bg-[#1a1610]', 'text-[#8b7500]');

      // Filter sections
      sections.forEach(section => {
        if (filter === 'all' || section.dataset.category === filter) {
          section.classList.remove('hidden', 'opacity-0', 'scale-95');
          section.classList.add('opacity-100', 'scale-100');
          // Animate in
          requestAnimationFrame(() => {
            section.style.maxHeight = section.scrollHeight + 'px';
            section.classList.remove('opacity-0');
          });
        } else {
          section.classList.add('opacity-0', 'scale-95');
          setTimeout(() => {
            section.classList.add('hidden');
          }, 300);
        }
      });
    });
  });
}

/* ─── Lightbox Modal ─── */
function initLightbox() {
  // Create lightbox overlay
  const lightbox = document.createElement('div');
  lightbox.id = 'lightbox-overlay';
  lightbox.className = `
    fixed inset-0 z-50 bg-black/90 backdrop-blur-md
    flex items-center justify-center p-8
    opacity-0 pointer-events-none transition-opacity duration-300
  `.trim();

  const lightboxContent = document.createElement('div');
  lightboxContent.className = 'relative max-w-4xl max-h-[85vh] w-full';

  const lightboxImg = document.createElement('img');
  lightboxImg.id = 'lightbox-img';
  lightboxImg.className = 'w-full h-full object-contain rounded-xl shadow-2xl shadow-[#8b7500]/20 transition-transform duration-500 scale-90';

  const lightboxCaption = document.createElement('p');
  lightboxCaption.id = 'lightbox-caption';
  lightboxCaption.className = 'text-[#c9a227] text-center mt-4 text-xl font-light tracking-wider';

  const closeBtn = document.createElement('button');
  closeBtn.className = 'absolute -top-4 -right-4 w-10 h-10 bg-[#8b7500] text-black rounded-full flex items-center justify-center text-xl font-bold hover:bg-[#c9a227] transition-colors cursor-pointer';
  closeBtn.innerHTML = '&times;';
  closeBtn.setAttribute('aria-label', 'Close lightbox');

  lightboxContent.appendChild(lightboxImg);
  lightboxContent.appendChild(closeBtn);
  lightboxContent.appendChild(lightboxCaption);
  lightbox.appendChild(lightboxContent);
  document.body.appendChild(lightbox);

  // Click handlers on service card images
  const cardImages = document.querySelectorAll('section img');
  cardImages.forEach(img => {
    img.classList.add('cursor-pointer', 'hover:opacity-80', 'transition-opacity', 'duration-300');
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      // Get the card title as caption
      const card = img.closest('div');
      const title = card ? card.querySelector('h3') : null;
      lightboxCaption.textContent = title ? title.textContent : '';

      lightbox.classList.remove('opacity-0', 'pointer-events-none');
      lightbox.classList.add('opacity-100', 'pointer-events-auto');

      setTimeout(() => {
        lightboxImg.classList.remove('scale-90');
        lightboxImg.classList.add('scale-100');
      }, 50);

      document.body.classList.add('overflow-hidden');
    });
  });

  // Close lightbox
  function closeLightbox() {
    lightboxImg.classList.add('scale-90');
    lightboxImg.classList.remove('scale-100');
    lightbox.classList.add('opacity-0', 'pointer-events-none');
    lightbox.classList.remove('opacity-100', 'pointer-events-auto');
    document.body.classList.remove('overflow-hidden');
  }

  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
}

/* ─── Card Hover Effects (enhanced via JS) ─── */
function initCardHoverEffects() {
  const cards = document.querySelectorAll('section > div[class*="bg-[#1a1610]"]');

  cards.forEach(card => {
    card.classList.add('transition-all', 'duration-300', 'ease-out');

    card.addEventListener('mouseenter', () => {
      card.classList.add('scale-[1.02]', '-translate-y-1', 'shadow-xl', 'shadow-[#8b7500]/20', 'border-[#8b7500]/60');
    });

    card.addEventListener('mouseleave', () => {
      card.classList.remove('scale-[1.02]', '-translate-y-1', 'shadow-xl', 'shadow-[#8b7500]/20', 'border-[#8b7500]/60');
    });
  });
}

/* ─── Service Category Counters ─── */
function initServiceCounters() {
  const counterEls = document.querySelectorAll('[data-count]');
  if (counterEls.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        animateCounter(el, target);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counterEls.forEach(el => observer.observe(el));
}

function animateCounter(el, target) {
  let current = 0;
  const duration = 1500;
  const start = performance.now();

  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    current = Math.round(eased * target);
    el.textContent = current + '+';

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  }

  requestAnimationFrame(tick);
}
