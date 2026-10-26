/**
 * Swaraj Mandal - Portfolio Interactive Logic
 * Mobile navigation, smooth scrolling, copy-to-clipboard, active link highlight
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const spans = mobileToggle.querySelectorAll('span');
      if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Close mobile nav when clicking a link
    navMenu.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = mobileToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }

  // Active Link Highlighting on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-item');

  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavOnScroll);

  // Copy AI Context Markdown to Clipboard
  const copyAiBtn = document.getElementById('copyAiBtn');
  if (copyAiBtn) {
    copyAiBtn.addEventListener('click', async () => {
      try {
        const response = await fetch('Swaraj_Mandal_CV_AI_Context.md');
        if (!response.ok) throw new Error('File not found');
        const text = await response.text();
        await navigator.clipboard.writeText(text);

        const originalHtml = copyAiBtn.innerHTML;
        copyAiBtn.innerHTML = '<i class="fa-solid fa-check"></i> <span>Copied Context!</span>';
        copyAiBtn.style.borderColor = 'var(--accent-emerald)';
        copyAiBtn.style.color = 'var(--accent-emerald)';

        setTimeout(() => {
          copyAiBtn.innerHTML = originalHtml;
          copyAiBtn.style.borderColor = '';
          copyAiBtn.style.color = '';
        }, 3000);
      } catch (err) {
        window.open('Swaraj_Mandal_CV_AI_Context.md', '_blank');
      }
    });
  }

  // Subtle Parallax glow effect following cursor
  const glow1 = document.querySelector('.glow-1');
  const glow2 = document.querySelector('.glow-2');

  window.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    if (glow1) {
      glow1.style.transform = `translate(${mouseX * 30}px, ${mouseY * 30}px)`;
    }
    if (glow2) {
      glow2.style.transform = `translate(${-mouseX * 25}px, ${-mouseY * 25}px)`;
    }
  });
});
