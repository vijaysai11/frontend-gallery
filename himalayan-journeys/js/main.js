/**
 * Bharat Yatra Hub — Main JavaScript
 * Handles: custom cursor, mobile nav, tab switching,
 *          scroll reveal, parallax, booking form, modal
 */

document.addEventListener('DOMContentLoaded', () => {

  // ── Custom Cursor (desktop only) ──────────────────────
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;

  const isTouch = () => window.matchMedia('(hover: none)').matches;

  if (!isTouch()) {
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top = my + 'px';
    });

    (function animRing() {
      rx += (mx - rx) * .13;
      ry += (my - ry) * .13;
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
      requestAnimationFrame(animRing);
    })();

    document.querySelectorAll('button, a, .pkg-card, .dest-card, .itin-day, input, select, textarea').forEach(el => {
      el.addEventListener('mouseenter', () => { cursor.classList.add('hover'); ring.classList.add('hover'); });
      el.addEventListener('mouseleave', () => { cursor.classList.remove('hover'); ring.classList.remove('hover'); });
    });

    document.addEventListener('mouseleave', () => { cursor.style.opacity = '0'; ring.style.opacity = '0'; });
    document.addEventListener('mouseenter', () => { cursor.style.opacity = '1'; ring.style.opacity = '1'; });
  }

  // ── Navbar scroll state ───────────────────────────────
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  // ── Mobile navigation ─────────────────────────────────
  const burger = document.getElementById('navBurger');
  const navLinks = document.getElementById('navLinks');
  const navClose = document.getElementById('navClose');

  burger.addEventListener('click', () => navLinks.classList.add('open'));
  navClose.addEventListener('click', () => navLinks.classList.remove('open'));

  // Close when any nav link is tapped
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  // ── Scroll Reveal ─────────────────────────────────────
  const revealEls = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: .1, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObs.observe(el));

  // Re-observe when panels switch (hidden panels aren't observed)
  function reObservePanels() {
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
      revealObs.observe(el);
    });
  }

  // ── Tab Switching ─────────────────────────────────────
  window.switchDest = function (dest, btn) {
    // Hide all panels
    document.querySelectorAll('.pkg-panel').forEach(p => p.classList.remove('active'));
    // Show target
    const panel = document.getElementById('panel-' + dest);
    if (panel) panel.classList.add('active');
    // Update buttons
    document.querySelectorAll('.pkg-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    setTimeout(reObservePanels, 50);
  };

  window.switchItin = function (dest, btn) {
    document.querySelectorAll('.itin-panel').forEach(p => p.classList.remove('active'));
    const panel = document.getElementById('itin-' + dest);
    if (panel) panel.classList.add('active');
    document.querySelectorAll('.itin-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    setTimeout(reObservePanels, 50);
  };

  window.switchInc = function (dest, btn) {
    document.querySelectorAll('.inc-panel').forEach(p => p.classList.remove('active'));
    const panel = document.getElementById('inc-' + dest);
    if (panel) panel.classList.add('active');
    document.querySelectorAll('.inc-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    setTimeout(reObservePanels, 50);
  };

  // ── Destination card clicks (sync tabs) ───────────────
  window.selectDestination = function (dest) {
    // Scroll to packages
    document.getElementById('packages').scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      // Find and click the matching tab
      const tab = [...document.querySelectorAll('.pkg-tab')]
        .find(t => t.textContent.trim().toLowerCase().replace(/\s+/g, '-') === dest
          || t.getAttribute('onclick')?.includes(dest));
      if (tab) tab.click();
    }, 600);
  };

  // ── Traveller counter ─────────────────────────────────
  const counts = { adults: 2, children: 0 };

  window.adjustCount = function (type, delta) {
    const min = type === 'adults' ? 1 : 0;
    counts[type] = Math.max(min, Math.min(20, counts[type] + delta));
    document.getElementById(type + '-count').textContent = counts[type];
  };

  // ── Booking form submit ───────────────────────────────
  window.submitBooking = function (e) {
    e.preventDefault();

    const destination = document.getElementById("bookDest").value;
    const tier = document.getElementById("bookTier").value;
    const name = document.getElementById("bookName").value;
    const phone = document.getElementById("bookPhone").value;
    const month = document.getElementById("bookMonth").value;
    const notes = document.getElementById("bookNotes").value;

    const adults = document.getElementById("adults-count").textContent;
    const children = document.getElementById("children-count").textContent;

    const message = `Hello Bharat Yatra Hub,

Booking Request

Destination: ${destination}
Package: ${tier}

Name: ${name}
Phone: ${phone}

Travel Month: ${month}

Adults: ${adults}
Children: ${children}

Notes:
${notes}`;

    window.open(
      `https://wa.me/919317573821?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  }

  window.resetBooking = function () {
    const form = document.getElementById('bookingForm');
    const success = document.getElementById('bookingSuccess');
    form.reset();
    counts.adults = 2; counts.children = 0;
    document.getElementById('adults-count').textContent = '2';
    document.getElementById('children-count').textContent = '0';
    success.style.display = 'none';
    form.style.display = 'flex';
  };

  // ── Modal ─────────────────────────────────────────────
  let currentModal = {};

  window.openBook = function (dest, tier, price) {
    currentModal = { dest, tier, price };
    const overlay = document.getElementById('modalOverlay');
    const sub = document.getElementById('modalSub');

    const destLabels = { manali: 'Manali (3N 4D)', kashmir: 'Kashmir (4N 5D)', 'shimla-manali': 'Shimla + Manali (6N 7D)' };
    const priceText = price === 'contact' ? 'On Request' : '₹' + Number(price).toLocaleString('en-IN') + ' per person';

    sub.textContent = destLabels[dest] + ' · ' + tier + ' · ' + priceText;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  window.closeModal = function () {
    document.getElementById('modalOverlay').classList.remove('open');
    document.body.style.overflow = '';
  };

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });

  window.submitModal = function (e) {
    e.preventDefault();
    const name = document.getElementById('modalName').value;
    const phone = document.getElementById('modalPhone').value;
    const month = document.getElementById('modalMonth').value;

    const message = `Hello Himalayan Journeys,

I would like to book a tour.

Destination: ${currentModal.dest}
Package: ${currentModal.tier}
Price: ${currentModal.price}

Name: ${name}
Phone: ${phone}
Travel Month: ${month}`;

    window.open(
      `https://wa.me/919317573821?text=${encodeURIComponent(message)}`,
      "_blank"
    );

    closeModal();

    showToast("Redirecting to WhatsApp...");
    e.target.reset();
  };

  // ── Toast notification ─────────────────────────────────
  function showToast(msg) {
    const toast = document.createElement('div');
    toast.textContent = msg;
    Object.assign(toast.style, {
      position: 'fixed',
      bottom: '2rem',
      left: '50%',
      transform: 'translateX(-50%)',
      background: '#c9a96e',
      color: '#0a0d0f',
      padding: '.85rem 2rem',
      fontSize: '.82rem',
      letterSpacing: '.1em',
      zIndex: '9999',
      opacity: '0',
      transition: 'opacity .4s',
      fontFamily: 'Inter, sans-serif',
      textAlign: 'center',
      maxWidth: '90vw',
    });
    document.body.appendChild(toast);
    setTimeout(() => { toast.style.opacity = '1'; }, 50);
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 500);
    }, 3500);
  }

  // ── Smooth anchor scrolling ────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  // ── Hero background cycle through destinations ─────────
  const heroImgs = [
    "url('images/hero-manali.jpg')",
    "url('images/hero-kashmir.jpg')",
    "url('images/hero-shimla.jpg')"
  ];
  let heroIdx = 0;
  const heroBg = document.getElementById('heroBg');

  setInterval(() => {
    heroIdx = (heroIdx + 1) % heroImgs.length;
    heroBg.style.transition = 'opacity 1.5s ease';
    heroBg.style.opacity = '0';
    setTimeout(() => {
      heroBg.style.backgroundImage = heroImgs[heroIdx];
      heroBg.style.opacity = '1';
    }, 750);
  }, 5000);

  // ── Pkg card tilt on desktop ───────────────────────────
  if (!isTouch()) {
    document.querySelectorAll('.pkg-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - .5;
        const y = (e.clientY - r.top) / r.height - .5;
        card.style.transform = `perspective(900px) rotateY(${x * 3.5}deg) rotateX(${-y * 3.5}deg)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

});
