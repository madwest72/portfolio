const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');

if (toggle && links) {
  toggle.addEventListener('click', () => links.classList.toggle('open'));
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => links.classList.remove('open'));
  });
}

const sections = document.querySelectorAll('main section[id], #hero');
const navLinks = document.querySelectorAll('.nav-links a');
const progress = document.getElementById('scrollProgress');

function updateNav() {
  if (!sections.length) return;
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 130) current = section.id;
  });
  navLinks.forEach(a => {
    const href = a.getAttribute('href') || '';
    a.classList.toggle('active', href === '#' + current || href.endsWith('.html#' + current));
  });
}

function updateProgress() {
  if (!progress) return;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const value = max > 0 ? (window.scrollY / max) * 100 : 0;
  progress.style.width = value + '%';
}

window.addEventListener('scroll', () => {
  updateNav();
  updateProgress();
}, { passive: true });
updateNav();
updateProgress();

const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && reveals.length) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  reveals.forEach(reveal => observer.observe(reveal));
} else {
  reveals.forEach(reveal => reveal.classList.add('visible'));
}

document.querySelectorAll('.proj-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.proj-tab').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.proj-pane').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    const target = document.getElementById('tab-' + btn.dataset.tab);
    if (target) target.classList.add('active');
  });
});

const typedSkill = document.getElementById('typedSkill');
if (typedSkill) {
  const phrases = ['des interfaces propres', 'des applis PHP / SQL', 'des outils utiles'];
  let index = 0;
  let char = 0;
  let deleting = false;

  const tick = () => {
    const current = phrases[index];
    if (!deleting) {
      char += 1;
      typedSkill.textContent = current.slice(0, char);
      if (char >= current.length) {
        deleting = true;
        setTimeout(tick, 1200);
        return;
      }
    } else {
      char -= 1;
      typedSkill.textContent = current.slice(0, char);
      if (char <= 0) {
        deleting = false;
        index = (index + 1) % phrases.length;
      }
    }
    setTimeout(tick, deleting ? 55 : 70);
  };

  tick();
}

document.querySelectorAll('.proj-card').forEach(card => {
  card.addEventListener('mousemove', event => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -5;
    const rotateY = ((x / rect.width) - 0.5) * 6;
    card.style.transform = `translateY(-3px) perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
