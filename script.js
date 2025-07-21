const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

function toggleScrollLock(lock) {
  document.body.style.overflow = lock ? 'hidden' : '';
}

function closeMenu() {
  nav.classList.remove('active');
  hamburger.classList.remove('active');
  toggleScrollLock(false);
}

function toggleMenu() {
  const isActive = nav.classList.toggle('active');
  hamburger.classList.toggle('active');
  toggleScrollLock(isActive);
}

hamburger.addEventListener('click', toggleMenu);

hamburger.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    toggleMenu();
  }
});

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('click', e => {
  if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
    closeMenu();
  }
});

const topBar = document.querySelector('.top-bar');
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    topBar.classList.add('hidden');
    header.classList.add('shift-up');
    //document.body.style.paddingTop = '70px';  // padding za header
  } else {
    topBar.classList.remove('hidden');
    header.classList.remove('shift-up');
    //document.body.style.paddingTop = '100px'; // padding za top-bar + header
  }
});


  const scrollToTopBtn = document.getElementById("scrollToTopBtn");

  window.onscroll = function () {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
      scrollToTopBtn.style.display = "block";
    } else {
      scrollToTopBtn.style.display = "none";
    }
  };

  scrollToTopBtn.onclick = function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };



// Fade in efekat sekcija na scroll - jedan po jedan
function revealSections() {
  const sections = document.querySelectorAll('main > section');
  const triggerBottom = window.innerHeight * 0.85;

  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop < triggerBottom) {
      if (!section.classList.contains('visible')) {
        section.classList.add('visible');
      }
    }
  });
}

window.addEventListener('scroll', revealSections);
window.addEventListener('load', revealSections);

// Slider galerija
const sliderTrack = document.querySelector('.slider-track');
const slides = document.querySelectorAll('.slider-track img');
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');

let currentIndex = 0;

function updateSlider() {
const slideWidth = slides[0].offsetWidth;
sliderTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
  updateSlider();
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
  updateSlider();
});

  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav a");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - sectionHeight / 2) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  const images = document.querySelectorAll('.gallery-image');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

images.forEach(img => observer.observe(img));

