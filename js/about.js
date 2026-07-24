/**
 * about.js — About page JavaScript
 * Timeline animation, parallax, stat counters, text reveal
 */

document.addEventListener('DOMContentLoaded', () => {
  initStatsSection();
  initTextReveal();
  initImageParallax();
  initTimelineMarkers();
});

/* ─── Stats Section ─── */
function initStatsSection() {
  const statsContainer = document.getElementById('stats-grid');
  if (!statsContainer) return;

  const stats = [
    { value: 5, suffix: '+', label: 'Years of Excellence' },
    { value: 500, suffix: '+', label: 'Projects Completed' },
    { value: 200, suffix: '+', label: 'Happy Clients' },
    { value: 15, suffix: '+', label: 'Services Offered' }
  ];

  stats.forEach((stat, i) => {
    const statEl = document.createElement('div');
    statEl.className = 'text-center opacity-0 translate-y-6 transition-all duration-700 ease-out';
    statEl.style.transitionDelay = i * 150 + 'ms';
    statEl.innerHTML = `
      <p class="text-4xl md:text-5xl font-bold text-[#8b7500] stat-number" data-target="${stat.value}" data-suffix="${stat.suffix}">0${stat.suffix}</p>
      <p class="text-[#aaaaaa] text-sm mt-2 tracking-wider uppercase">${stat.label}</p>
    `;
    statsContainer.appendChild(statEl);
  });

  // Observe and animate
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const items = statsContainer.children;
        Array.from(items).forEach(item => {
          item.classList.remove('opacity-0', 'translate-y-6');
          item.classList.add('opacity-100', 'translate-y-0');
        });

        // Animate counters
        document.querySelectorAll('.stat-number').forEach(el => {
          const target = parseInt(el.dataset.target);
          const suffix = el.dataset.suffix;
          animateCount(el, target, suffix);
        });

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(statsContainer);
}

function animateCount(el, target, suffix) {
  const duration = 2000;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/* ─── Text Reveal Animation ─── */
function initTextReveal() {
  const paragraphs = document.querySelectorAll('[data-text-reveal]');
  if (paragraphs.length === 0) return;

  paragraphs.forEach((p, i) => {
    p.classList.add('opacity-0', 'translate-y-6', 'transition-all', 'duration-700', 'ease-out');
    p.style.transitionDelay = i * 200 + 'ms';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('opacity-0', 'translate-y-6');
        entry.target.classList.add('opacity-100', 'translate-y-0');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  paragraphs.forEach(p => observer.observe(p));
}

/* ─── Image Parallax ─── */
function initImageParallax() {
  const img = document.querySelector('#about-hero-img');
  if (!img) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        const rect = img.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
          img.style.transform = 'translateY(' + (scrolled * 0.15) + 'px) scale(1.05)';
        }
        ticking = false;
      });
      ticking = true;
    }
  });
}

/* ─── Timeline Markers ─── */
function initTimelineMarkers() {
  const timeline = document.getElementById('timeline-section');
  if (!timeline) return;

  const milestones = [
    { year: '2019', title: 'Founded', desc: 'G.O World of Media & Prints was born in Jos' },
    { year: '2020', title: 'Expansion', desc: 'Added DTF and sublimation printing services' },
    { year: '2021', title: 'Growth', desc: 'Expanded to corporate branding and bulk production' },
    { year: '2023', title: 'Digital', desc: 'Launched digital media and social presence' },
    { year: '2025', title: 'Today', desc: 'Full-service branding, media, and printing house' }
  ];

  milestones.forEach((m, i) => {
    const item = document.createElement('div');
    item.className = 'flex gap-4 items-start opacity-0 translate-x-8 transition-all duration-700 ease-out';
    item.style.transitionDelay = i * 200 + 'ms';
    item.dataset.timelineItem = '';

    const isLeft = i % 2 === 0;
    item.innerHTML = `
      <div class="flex flex-col items-center shrink-0">
        <div class="w-4 h-4 rounded-full bg-[#8b7500] border-2 border-[#c9a227] shadow-lg shadow-[#8b7500]/40"></div>
        ${i < milestones.length - 1 ? '<div class="w-0.5 h-16 bg-[#3a2e12]"></div>' : ''}
      </div>
      <div class="pb-8">
        <span class="text-[#8b7500] text-sm font-bold tracking-wider">${m.year}</span>
        <h4 class="text-[#e8c060] text-lg font-semibold">${m.title}</h4>
        <p class="text-[#aaaaaa] text-sm">${m.desc}</p>
      </div>
    `;
    timeline.appendChild(item);
  });

  // Observe and animate
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('opacity-0', 'translate-x-8');
        entry.target.classList.add('opacity-100', 'translate-x-0');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('[data-timeline-item]').forEach(el => observer.observe(el));
}
