// ===== Language Toggle =====
const langToggle = document.getElementById('langToggle');
const body = document.body;

langToggle.addEventListener('click', () => {
  const current = body.getAttribute('data-lang');
  const next = current === 'zh' ? 'en' : 'zh';
  body.setAttribute('data-lang', next);
  langToggle.textContent = next === 'zh' ? 'EN' : '中文';
});

// ===== Publication Filter =====
const filterBtns = document.querySelectorAll('.filter-btn');
const pubItems = document.querySelectorAll('.pub-item');
const pubYearGroups = document.querySelectorAll('.pub-year-group');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    pubItems.forEach(item => {
      if (filter === 'all') {
        item.classList.remove('hidden');
      } else {
        const tags = item.getAttribute('data-tags') || '';
        item.classList.toggle('hidden', !tags.includes(filter));
      }
    });

    // Hide year groups with no visible items
    pubYearGroups.forEach(group => {
      const hasVisible = group.querySelectorAll('.pub-item:not(.hidden)').length > 0;
      group.style.display = hasVisible ? '' : 'none';
    });
  });
});

// ===== Active Nav on Scroll =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.site-nav a');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === '#' + entry.target.id
          ? 'var(--accent)'
          : '';
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => observer.observe(s));
