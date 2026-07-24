/**
 * team.js — Team page JavaScript
 * Dynamic team card rendering, flip animation, staggered entrance
 */

const teamMembers = [
  {
    name: 'Eze Kingsley Tochukwu',
    role: 'CEO & Founder',
    image: 'public/images/G.O LOGO.jpeg',
    bio: 'Visionary leader and founder of G.O World of Media & Prints. With over 5 years of experience in branding and printing, he has built a legacy of excellence, accuracy, and professionalism.',
    skills: ['Brand Strategy', 'Business Development', 'Creative Direction']
  },
  {
    name: 'Creative Director',
    role: 'Head of Design',
    image: 'public/images/705.jpeg',
    bio: 'Leading the design team with innovative concepts and cutting-edge visual solutions. Specializes in brand identity creation and corporate design systems.',
    skills: ['Graphic Design', 'Brand Identity', 'Typography']
  },
  {
    name: 'Production Manager',
    role: 'Print Operations Lead',
    image: 'public/images/industrial.jpeg',
    bio: 'Oversees all printing operations from DTF to large-scale offset printing. Ensures quality control and timely delivery on every project.',
    skills: ['Print Production', 'Quality Control', 'Logistics']
  },
  {
    name: 'Digital Media Specialist',
    role: 'Social Media & Content',
    image: 'public/images/digital media.jpeg',
    bio: 'Manages the digital presence and social media strategy for G.O World. Creates engaging content that connects brands with their audience.',
    skills: ['Social Media', 'Content Creation', 'Digital Marketing']
  }
];

document.addEventListener('DOMContentLoaded', () => {
  renderTeamSection();
  initFlipCards();
  initStaggeredEntrance();
});

function renderTeamSection() {
  const body = document.querySelector('body');
  const header = document.querySelector('header');
  if (!header) return;

  // Create main section
  const main = document.createElement('main');
  main.className = 'mt-10 pb-20 px-4 md:px-10 lg:px-20';

  // Section header
  main.innerHTML = `
    <div class="text-center mb-12" data-reveal="up">
      <div class="flex justify-center gap-3 items-center mb-4">
        <div class="bg-[#8b7500] w-12 h-0.5 rounded-full"></div>
        <h1 class="text-[#8b7500] text-sm md:text-lg tracking-[0.3em] uppercase">The Team</h1>
        <div class="bg-[#8b7500] w-12 h-0.5 rounded-full"></div>
      </div>
      <h2 class="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-3">Meet Our <span class="text-[#8b7500]">Experts</span></h2>
      <p class="text-[#aaaaaa] text-lg max-w-2xl mx-auto">The talented individuals behind G.O World of Media & Prints who bring your vision to life.</p>
    </div>

    <div id="team-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"></div>

    <div class="text-center mt-16" data-reveal="up" data-reveal-delay="800">
      <div class="bg-[#8b7500] w-32 h-0.5 mx-auto rounded-full mb-6"></div>
      <p class="text-[#8b7500] text-xl font-light tracking-wider">Efficient · Accurate · Professional</p>
      <p class="text-[#aaaaaa] mt-2">Since 2019</p>
    </div>
  `;

  // Render team cards
  const grid = main.querySelector('#team-grid');
  teamMembers.forEach((member, i) => {
    const card = document.createElement('div');
    card.className = 'team-card group relative cursor-pointer';
    card.dataset.index = i;
    card.style.perspective = '1000px';

    card.innerHTML = `
      <div class="card-inner relative w-full transition-transform duration-700" style="transform-style: preserve-3d; min-height: 380px;">
        <!-- Front -->
        <div class="card-front absolute inset-0 rounded-2xl border border-[#3a2e12] bg-[#1a1610] overflow-hidden" style="backface-visibility: hidden;">
          <div class="h-48 overflow-hidden">
            <img src="${member.image}" alt="${member.name}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
          </div>
          <div class="p-5 text-center">
            <h3 class="text-[#e8c060] text-xl font-semibold mb-1">${member.name}</h3>
            <p class="text-[#8b7500] text-sm tracking-wider uppercase mb-3">${member.role}</p>
            <div class="bg-[#8b7500] w-12 h-0.5 mx-auto rounded-full mb-3"></div>
            <p class="text-[#aaaaaa]/60 text-xs">Click to learn more →</p>
          </div>
        </div>
        <!-- Back -->
        <div class="card-back absolute inset-0 rounded-2xl border border-[#8b7500] bg-[#1a1610] p-6 flex flex-col justify-center" style="backface-visibility: hidden; transform: rotateY(180deg);">
          <h3 class="text-[#e8c060] text-xl font-semibold mb-1">${member.name}</h3>
          <p class="text-[#8b7500] text-sm tracking-wider uppercase mb-4">${member.role}</p>
          <p class="text-[#aaaaaa] text-sm leading-relaxed mb-4">${member.bio}</p>
          <div class="flex flex-wrap gap-2">
            ${member.skills.map(s => '<span class="bg-[#2a1f08] text-[#8b7500] text-xs px-3 py-1 rounded-full border border-[#3a2e12]">' + s + '</span>').join('')}
          </div>
          <p class="text-[#aaaaaa]/60 text-xs mt-4">Click to flip back ←</p>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });

  // Insert after header
  header.insertAdjacentElement('afterend', main);
}

function initFlipCards() {
  const cards = document.querySelectorAll('.team-card');
  cards.forEach(card => {
    let flipped = false;
    const inner = card.querySelector('.card-inner');

    card.addEventListener('click', () => {
      flipped = !flipped;
      inner.style.transform = flipped ? 'rotateY(180deg)' : 'rotateY(0deg)';
    });
  });
}

function initStaggeredEntrance() {
  const cards = document.querySelectorAll('.team-card');
  cards.forEach((card, i) => {
    card.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-700', 'ease-out');
    setTimeout(() => {
      card.classList.remove('opacity-0', 'translate-y-10');
      card.classList.add('opacity-100', 'translate-y-0');
    }, 500 + i * 200);
  });
}
