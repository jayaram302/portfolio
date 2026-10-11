
const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

// Mobile navigation
const menuButton = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

menuButton.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.textContent = isOpen ? "✕" : "☰";
});

navMenu.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.textContent = "☰";
  });
});

// Current year
document.getElementById("year").textContent =
  new Date().getFullYear();

// Typing animation
const typingElement = document.getElementById("typing-text");
const phrases = [
  "Data Science Student",
  "Aspiring Developer",
  "Python Learner",
  "Technology Enthusiast"
];

if (reducedMotion) {
  typingElement.textContent = phrases[0];
} else {
  let phraseIndex = 0;
  let characterIndex = phrases[0].length;
  let deleting = true;

  function typeEffect() {
    const currentPhrase = phrases[phraseIndex];

    if (deleting) {
      characterIndex--;
    } else {
      characterIndex++;
    }

    typingElement.textContent =
      currentPhrase.substring(0, characterIndex);

    let delay = deleting ? 45 : 85;

    if (!deleting && characterIndex === currentPhrase.length) {
      deleting = true;
      delay = 1400;
    } else if (deleting && characterIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 350;
    }

    setTimeout(typeEffect, delay);
  }

  setTimeout(typeEffect, 1400);
}

// Reveal sections when they enter the screen
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && !reducedMotion) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach(element => observer.observe(element));
} else {
  revealElements.forEach(element => element.classList.add("visible"));
}

// 3D tilt effect for cards
const tiltCards = document.querySelectorAll(".tilt-card");

if (!reducedMotion && window.matchMedia("(hover: hover)").matches) {
  tiltCards.forEach(card => {
    card.addEventListener("pointermove", event => {
      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width;
      const y = (event.clientY - bounds.top) / bounds.height;

      const rotateY = (x - 0.5) * 12;
      const rotateX = (0.5 - y) * 12;

      card.style.transform =
        `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
    });

    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  });
}
