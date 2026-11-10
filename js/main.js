/* ==========================================================================
   MIVI EVENTS — MASTER INTERACTION & ROUTING SYSTEM
   ========================================================================== */

(function () {
  'use strict';

  // --- 1. Custom Cursor (#dot) ---
  const dot = document.getElementById('dot');
  if (dot) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let curX = mouseX;
    let curY = mouseY;

    window.addEventListener('pointermove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }, { passive: true });

    function cursorLoop() {
      curX += (mouseX - curX) * 0.2;
      curY += (mouseY - curY) * 0.2;
      dot.style.transform = `translate3d(${curX.toFixed(2)}px, ${curY.toFixed(2)}px, 0)`;
      requestAnimationFrame(cursorLoop);
    }
    requestAnimationFrame(cursorLoop);

    document.addEventListener('mouseover', (e) => {
      if (e.target.closest('a, button, .project-card, .service-card, .faq-question, input, select, textarea, .insta-item')) {
        dot.classList.add('wide');
      } else {
        dot.classList.remove('wide');
      }
    });
  }

  // --- 2. Header Scroll Effect ---
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // --- 3. Mobile Fullscreen Menu Toggle ---
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.getElementById('menu');

  if (menuToggle && menu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = document.body.classList.toggle('menu-open');
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        document.body.classList.remove('menu-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && document.body.classList.contains('menu-open')) {
        document.body.classList.remove('menu-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // --- 4. Portfolio Projects Data & Modal System ---
  const PROJECTS_DATA = {
    'royal-pavilion': {
      title: 'The Royal Pavilion Wedding',
      category: 'Destination Weddings',
      location: 'Rajah Hall & Grounds · Muthuvattoor, Thrissur',
      concept: 'An opulent ivory-and-gold pavilion styled with thousands of fragrant white blooms, custom crystal chandeliers, and grand ceremonial entry pathways.',
      description: 'Designed for a signature destination celebration in Thrissur. The couple envisioned a majestic royal ambiance that respected heritage while offering contemporary luxury. Mivi Events orchestrated the custom stage architecture, ambient amber uplighting, acoustic balance, and guest flow across 1,200 attendees.',
      cover: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80'
      ]
    },
    'emerald-soiree': {
      title: 'Emerald & Gold Reception',
      category: 'Receptions & Celebrations',
      location: 'Waterfront Pavilion · Kochi',
      concept: 'Deep botanical greens, gilded mirror arches, suspended eucalyptus canopies, and intimate candlelight dining.',
      description: 'An evening celebration set along the scenic Kochi waterfront. The visual direction united deep emerald tones with metallic gold accents. From live jazz acoustic coordination to ambient string canopy lighting, every detail was carefully executed.',
      cover: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&w=800&q=80'
      ]
    },
    'sunset-sangeet': {
      title: 'Sunset Symphony Sangeet',
      category: 'Celebrations',
      location: 'Heritage Courtyard · Guruvayoor',
      concept: 'Festive marigold drapery, brass uruli installations, colorful seating lounges, and an energized performance stage.',
      description: 'A pre-wedding celebration bursting with warmth and rhythm. Mivi Events transformed an open courtyard into a vibrant night bazaar with fairy light roofs, traditional flower carpets, high-end sound engineering, and synchronized dance lighting.',
      cover: 'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=800&q=80'
      ]
    },
    'lakeside-vows': {
      title: 'Lakeside Minimalist Vows',
      category: 'Destination Weddings',
      location: 'Backwater Luxury Resort · Alappuzha',
      concept: 'Floating floral podium, sheer linen drapery, tropical palm silhouettes, and serene water reflections.',
      description: 'An intimate sunset gathering designed around tranquil backwaters. The aesthetic focused on architectural simplicity and organic foliage. Subtle acoustic amplification and candlelight boat arrivals created an indelible memory.',
      cover: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80'
      ]
    },
    'prestige-gala': {
      title: 'Prestige Retail Inauguration',
      category: 'Corporate & Stage',
      location: 'Commercial Hub · Calicut',
      concept: 'High-gloss black mirror runways, geometric LED matrix tunnels, gold ribbon cutting backdrop, and pyrotechnic cold sparks.',
      description: 'A flagship store inauguration managed from end to end. Mivi Events delivered flawless VIP management, red carpet media walls, high-definition audio visual setups, and live stream coordination for brand partners.',
      cover: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80'
      ]
    },
    'pastel-soiree': {
      title: 'Pastel Garden Birthday Soirée',
      category: 'Private Celebrations',
      location: 'Private Villa Estate · Thrissur',
      concept: 'Blush pink, champagne, and ivory balloon arches with organic botanical gardens and custom dessert installations.',
      description: 'A bespoke milestone birthday gathering planned with personalized details, acoustic live performance, gourmet catering station styling, and custom memory photo galleries.',
      cover: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=800&q=80'
      ]
    }
  };

  const projectModal = document.getElementById('projectModal');
  if (projectModal) {
    const modalImg = projectModal.querySelector('.modal-media img');
    const modalTag = projectModal.querySelector('.modal-tag');
    const modalLoc = projectModal.querySelector('.modal-loc');
    const modalTitle = projectModal.querySelector('.modal-title');
    const modalDesc = projectModal.querySelector('.modal-desc');
    const modalGallery = projectModal.querySelector('.modal-gallery');
    const modalClose = projectModal.querySelector('.modal-close');

    function openProjectModal(slug) {
      const data = PROJECTS_DATA[slug];
      if (!data) return;

      modalImg.src = data.cover;
      modalTag.textContent = data.category;
      modalLoc.textContent = data.location;
      modalTitle.textContent = data.title;
      modalDesc.textContent = data.description;

      modalGallery.innerHTML = '';
      data.gallery.forEach(imgUrl => {
        const thumb = document.createElement('img');
        thumb.src = imgUrl;
        thumb.alt = data.title;
        thumb.addEventListener('click', () => {
          modalImg.src = imgUrl;
        });
        modalGallery.appendChild(thumb);
      });

      projectModal.classList.add('active');
      document.body.classList.add('locked');
    }

    function closeProjectModal() {
      projectModal.classList.remove('active');
      document.body.classList.remove('locked');
    }

    modalClose.addEventListener('click', closeProjectModal);
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) closeProjectModal();
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && projectModal.classList.contains('active')) {
        closeProjectModal();
      }
    });

    document.querySelectorAll('[data-project-slug]').forEach(card => {
      card.addEventListener('click', () => {
        const slug = card.getAttribute('data-project-slug');
        openProjectModal(slug);
      });
    });

    // Check URL parameters for direct modal open (e.g. ?project=royal-pavilion)
    const urlParams = new URLSearchParams(window.location.search);
    const querySlug = urlParams.get('project');
    if (querySlug && PROJECTS_DATA[querySlug]) {
      setTimeout(() => openProjectModal(querySlug), 300);
    }
  }

  // --- 5. Portfolio Filtering ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length > 0 && projectCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');
        projectCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = 'block';
            setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 50);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(15px)';
            setTimeout(() => { card.style.display = 'none'; }, 300);
          }
        });
      });
    });
  }

  // --- 6. FAQ Accordion ---
  const faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length > 0) {
    faqItems.forEach(item => {
      const q = item.querySelector('.faq-question');
      q.addEventListener('click', () => {
        const wasActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!wasActive) {
          item.classList.add('active');
        }
      });
    });
  }

  // --- 7. Interactive Contact Form with Validation & WhatsApp Connect ---
  const contactForm = document.getElementById('enquiryForm');
  if (contactForm) {
    const alertBox = contactForm.querySelector('.form-alert');

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = contactForm.querySelector('#fullName').value.trim();
      const phone = contactForm.querySelector('#phoneNumber').value.trim();
      const eventType = contactForm.querySelector('#eventType').value;
      const message = contactForm.querySelector('#message').value.trim();
      const date = contactForm.querySelector('#eventDate') ? contactForm.querySelector('#eventDate').value : '';
      const location = contactForm.querySelector('#eventLocation') ? contactForm.querySelector('#eventLocation').value : '';

      if (!name || !phone || !eventType || !message) {
        alertBox.className = 'form-alert error';
        alertBox.textContent = 'Please fill in all required fields (Name, Phone, Event Type, and Message).';
        alertBox.style.display = 'block';
        return;
      }

      // Format WhatsApp pre-filled message
      const waText = encodeURIComponent(
        `*New Enquiry via Mivi Events Website*\n` +
        `• Name: ${name}\n` +
        `• Phone: ${phone}\n` +
        `• Event Type: ${eventType}\n` +
        (date ? `• Preferred Date: ${date}\n` : '') +
        (location ? `• Location: ${location}\n` : '') +
        `• Message: ${message}`
      );

      // Feedback to user
      alertBox.className = 'form-alert success';
      alertBox.innerHTML = `
        <strong>Thank you, ${name}!</strong> Your enquiry has been recorded.<br>
        To connect directly on WhatsApp with our planning team, click below:<br>
        <a href="https://wa.me/919846000000?text=${waText}" target="_blank" rel="noopener" class="btn btn-gold" style="margin-top:12px; display:inline-flex;">
          <svg style="width:14px;height:14px;fill:currentColor;margin-right:6px;" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.668-.699c.969.586 1.838.88 2.792.88 3.182 0 5.77-2.587 5.77-5.766.001-3.18-2.585-5.766-5.77-5.766zm0 10.364c-.887 0-1.748-.25-2.488-.724l-.178-.113-1.849.485.493-1.802-.12-.191c-.534-.849-.816-1.724-.816-2.453 0-2.536 2.064-4.6 4.601-4.6 2.536 0 4.6 2.064 4.6 4.6 0 2.537-2.064 4.603-4.601 4.603z"/></svg>
          Continue to WhatsApp Direct
        </a>
      `;
      alertBox.style.display = 'block';
      contactForm.reset();
    });
  }

})();
