/**
 * home.js — Home page JavaScript
 * Typewriter effect, counter animation, parallax, staggered hero entrance
 */

document.addEventListener('DOMContentLoaded', () => {
  initStaggeredHero();
  initTypewriter();
  initYearCounter();
  initParallaxBackground();
  initGoldLinePulse();
});

/* ─── Staggered Hero Entrance ─── */
function initStaggeredHero() {
  const main = document.querySelector('main');
  if (!main) return;

  const children = main.children;
  Array.from(children).forEach((child, i) => {
    child.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700', 'ease-out');
    child.style.transitionDelay = `${(i + 1) * 200}ms`;

    // Trigger after a short delay for page load
    setTimeout(() => {
      child.classList.remove('opacity-0', 'translate-y-8');
      child.classList.add('opacity-100', 'translate-y-0');
    }, 100 + i * 200);
  });
}

/* ─── Typewriter Effect ─── */
function initTypewriter() {
  const typewriterEl = document.getElementById('typewriter');
  if (!typewriterEl) return;

  const fullText = typewriterEl.dataset.text || typewriterEl.textContent;
  typewriterEl.textContent = '';
  typewriterEl.classList.remove('invisible');

  let charIndex = 0;
  const cursorSpan = document.createElement('span');
  cursorSpan.className = 'animate-pulse text-[#8b7500]';
  cursorSpan.textContent = '|';
  typewriterEl.appendChild(cursorSpan);

  function type() {
    if (charIndex < fullText.length) {
      // Insert character before cursor
      const textNode = document.createTextNode(fullText[charIndex]);
      typewriterEl.insertBefore(textNode, cursorSpan);
      charIndex++;

      // Variable speed for natural feel
      const delay = fullText[charIndex - 1] === '.' ? 200 : 
                    fullText[charIndex - 1] === ' ' ? 80 : 
                    50 + Math.random() * 40;
      setTimeout(type, delay);
    } else {
      // Remove cursor after typing is done, with a blink delay
      setTimeout(() => {
        cursorSpan.remove();
      }, 2000);
    }
  }

  // Start typing after hero animation
  setTimeout(type, 800);
}

/* ─── Year Counter Animation ─── */
function initYearCounter() {
  const counterEl = document.getElementById('year-counter');
  if (!counterEl) return;

  const targetYear = parseInt(counterEl.dataset.target) || 2019;
  const currentYear = new Date().getFullYear();
  const yearsActive = currentYear - targetYear;
  
  // Count up the years of operation
  let current = 0;
  const duration = 2000;
  const startTime = performance.now();

  function animate(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    current = Math.round(eased * yearsActive);
    counterEl.textContent = `${current}+ Years of Excellence`;

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      counterEl.textContent = `${yearsActive}+ Years of Excellence`;
    }
  }

  // Start counter after a delay
  setTimeout(() => {
    requestAnimationFrame(animate);
  }, 1200);
}

/* ─── Parallax Background ─── */
function initParallaxBackground() {
  const body = document.body;
  if (!body.style.backgroundImage && !body.className.includes('bg-[url')) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        body.style.backgroundPositionY = `${scrolled * 0.3}px`;
        ticking = false;
      });
      ticking = true;
    }
  });
}

/* ─── Gold Line Pulse ─── */
function initGoldLinePulse() {
  const goldLine = document.getElementById('gold-divider');
  if (!goldLine) return;

  // Animate width from 0 to full
  goldLine.classList.add('transition-all', 'duration-1500', 'ease-out');
  goldLine.style.width = '0';

  setTimeout(() => {
    goldLine.style.width = '';
    goldLine.classList.add('w-[50vw]');
  }, 1500);
}
