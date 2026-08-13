/**
 * shared.js — Shared JavaScript for all pages
 * Hamburger menu, active nav, scroll-to-top, scroll-reveal, page transitions
 */

document.addEventListener('DOMContentLoaded', () => {
  initPageTransition();
  initHamburgerMenu();
  initActiveNav();
  initScrollToTop();
  initScrollReveal();
});

/* ─── Page Load Transition ─── */
function initPageTransition() {
  document.body.classList.add('opacity-0', 'transition-opacity', 'duration-700', 'ease-out');
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.body.classList.remove('opacity-0');
      document.body.classList.add('opacity-100');
    });
  });
}

/* ─── Mobile Hamburger Menu ─── */
function initHamburgerMenu() {
  const header = document.querySelector('header');
  const nav = document.querySelector('header nav');
  if (!header || !nav) return;

  // Get all nav links
  const navLinks = Array.from(nav.querySelectorAll('a'));

  // Create hamburger button
  const hamburger = document.createElement('button');
  hamburger.id = 'hamburger-btn';
  hamburger.setAttribute('aria-label', 'Toggle navigation menu');
  hamburger.setAttribute('aria-expanded', 'false');
  hamburger.className = 'md:hidden text-white text-2xl focus:outline-none z-50 relative cursor-pointer';
  hamburger.innerHTML = `
    <div class="flex flex-col gap-1.5 w-7">
      <span class="block h-0.5 w-full bg-[#8b7500] transition-all duration-300 origin-center" id="bar1"></span>
      <span class="block h-0.5 w-full bg-[#8b7500] transition-all duration-300" id="bar2"></span>
      <span class="block h-0.5 w-full bg-[#8b7500] transition-all duration-300 origin-center" id="bar3"></span>
    </div>
  `;

  // Create mobile nav container
  const mobileNav = document.createElement('div');
  mobileNav.id = 'mobile-nav';
  mobileNav.className = `
    fixed inset-0 bg-[#0d0d0d]/95 backdrop-blur-lg z-40
    flex flex-col items-center justify-center gap-8
    transition-all duration-500 ease-in-out
    opacity-0 pointer-events-none -translate-y-full
    md:hidden
  `.trim();

  // Populate mobile nav with links
  navLinks.forEach((link, i) => {
    const mobileLink = link.cloneNode(true);
    mobileLink.className = `
      text-white text-3xl font-light tracking-widest
      hover:text-[#8b7500] transition-all duration-300
      opacity-0 translate-y-8 transition-all
    `.trim();
    mobileLink.style.transitionDelay = `${(i + 1) * 100}ms`;
    mobileNav.appendChild(mobileLink);
  });

  // Add decorative divider in mobile nav
  const divider = document.createElement('div');
  divider.className = 'bg-[#8b7500] w-32 h-0.5 rounded-full mt-4 opacity-0 transition-opacity duration-500 delay-500';
  mobileNav.appendChild(divider);

  // Add tagline
  const tagline = document.createElement('p');
  tagline.className = 'text-[#8b7500]/60 text-sm tracking-wider opacity-0 transition-opacity duration-500 delay-700';
  tagline.textContent = 'Efficient · Accurate · Professional';
  mobileNav.appendChild(tagline);

  // Insert into DOM
  header.classList.add('relative');
  nav.classList.add('hidden', 'md:flex');
  header.insertBefore(hamburger, header.firstChild);
  document.body.appendChild(mobileNav);

  // Toggle logic
  let isOpen = false;
  hamburger.addEventListener('click', () => {
    isOpen = !isOpen;
    hamburger.setAttribute('aria-expanded', isOpen.toString());

    const bar1 = document.getElementById('bar1');
    const bar2 = document.getElementById('bar2');
    const bar3 = document.getElementById('bar3');

    if (isOpen) {
      // Animate bars to X
      bar1.classList.add('rotate-45', 'translate-y-2');
      bar2.classList.add('opacity-0', 'scale-x-0');
      bar3.classList.add('-rotate-45', '-translate-y-2');

      // Show mobile nav
      mobileNav.classList.remove('opacity-0', 'pointer-events-none', '-translate-y-full');
      mobileNav.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');

      // Animate links in
      mobileNav.querySelectorAll('a').forEach(link => {
        link.classList.remove('opacity-0', 'translate-y-8');
        link.classList.add('opacity-100', 'translate-y-0');
      });

      // Show divider and tagline
      divider.classList.remove('opacity-0');
      divider.classList.add('opacity-100');
      tagline.classList.remove('opacity-0');
      tagline.classList.add('opacity-100');

      document.body.classList.add('overflow-hidden');
    } else {
      // Animate bars back
      bar1.classList.remove('rotate-45', 'translate-y-2');
      bar2.classList.remove('opacity-0', 'scale-x-0');
      bar3.classList.remove('-rotate-45', '-translate-y-2');

      // Hide mobile nav
      mobileNav.classList.add('opacity-0', 'pointer-events-none', '-translate-y-full');
      mobileNav.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');

      // Reset links
      mobileNav.querySelectorAll('a').forEach(link => {
        link.classList.add('opacity-0', 'translate-y-8');
        link.classList.remove('opacity-100', 'translate-y-0');
      });

      divider.classList.add('opacity-0');
      divider.classList.remove('opacity-100');
      tagline.classList.add('opacity-0');
      tagline.classList.remove('opacity-100');

      document.body.classList.remove('overflow-hidden');
    }
  });

  // Close menu on link click
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (isOpen) hamburger.click();
    });
  });
}

/* ─── Active Nav Link Highlighting ─── */
function initActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('header nav a, #mobile-nav a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('text-[#8b7500]', 'border-b-2', 'border-[#8b7500]', 'pb-1');
    }
  });
}

/* ─── Scroll-to-Top Button ─── */
function initScrollToTop() {
  const btn = document.createElement('button');
  btn.id = 'scroll-to-top';
  btn.setAttribute('aria-label', 'Scroll to top');
  btn.className = `
    fixed bottom-8 right-8 z-50 w-12 h-12
    bg-[#8b7500] hover:bg-[#c9a227] text-black
    rounded-full shadow-lg shadow-[#8b7500]/30
    flex items-center justify-center
    transition-all duration-500 ease-out
    opacity-0 translate-y-10 pointer-events-none
    hover:scale-110 cursor-pointer
  `.trim();
  btn.innerHTML = `
    <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7"/>
    </svg>
  `;

  document.body.appendChild(btn);

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      btn.classList.remove('opacity-0', 'translate-y-10', 'pointer-events-none');
      btn.classList.add('opacity-100', 'translate-y-0', 'pointer-events-auto');
    } else {
      btn.classList.add('opacity-0', 'translate-y-10', 'pointer-events-none');
      btn.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
    }
  });
}

/* ─── Scroll Reveal Animation ─── */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('[data-reveal]');
  if (revealElements.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const direction = el.dataset.reveal || 'up';
        const delay = parseInt(el.dataset.revealDelay) || 0;

        setTimeout(() => {
          el.classList.remove('opacity-0');
          el.classList.add('opacity-100');

          switch (direction) {
            case 'up':
              el.classList.remove('translate-y-10');
              el.classList.add('translate-y-0');
              break;
            case 'down':
              el.classList.remove('-translate-y-10');
              el.classList.add('translate-y-0');
              break;
            case 'left':
              el.classList.remove('translate-x-4');
              el.classList.add('translate-x-0');
              break;
            case 'right':
              el.classList.remove('-translate-x-4');
              el.classList.add('translate-x-0');
              break;
            case 'scale':
              el.classList.remove('scale-90');
              el.classList.add('scale-100');
              break;
          }
        }, delay);

        observer.unobserve(el);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  revealElements.forEach(el => {
    // Set initial hidden state
    el.classList.add('transition-all', 'duration-700', 'ease-out', 'opacity-0');
    const direction = el.dataset.reveal || 'up';

    switch (direction) {
      case 'up':
        el.classList.add('translate-y-10');
        break;
      case 'down':
        el.classList.add('-translate-y-10');
        break;
      case 'left':
        el.classList.add('translate-x-4');
        break;
      case 'right':
        el.classList.add('-translate-x-4');
        break;
      case 'scale':
        el.classList.add('scale-90');
        break;
    }

    observer.observe(el);
  });
}