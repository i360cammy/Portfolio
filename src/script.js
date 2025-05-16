const carousel = document.querySelector("[data-carousel]");
const slides = carousel.querySelectorAll("[data-slides] .slide");
const dots = carousel.querySelectorAll(".carousel-dots .dot");
const buttons = carousel.querySelectorAll("[data-carousel-button]");

function goToSlide(index) {
    // Guard against invalid index
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;

    // Update active slide
    carousel.querySelector("[data-active]").removeAttribute("data-active");
    slides[index].setAttribute("data-active", "");

    // Update dots
    carousel.querySelector(".carousel-dots .dot.active")?.classList.remove("active");
    dots[index].classList.add("active");
}

// Handle nav dots
dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        goToSlide(index);
    });
});

// Handle arrows
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const offset = button.dataset.carouselButton === "next" ? 1 : -1;
        const activeIndex = [...slides].findIndex(slide => slide.hasAttribute("data-active"));
        goToSlide(activeIndex + offset);
    });
});

// Navigation scroll animation
const navbar = document.querySelector("nav");
const showNavBtn = document.getElementById("show-nav-btn");
const heroSection = document.querySelector(".hero-container");

let navHidden = false;

window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;
    const heroBottom = heroSection.offsetTop + heroSection.offsetHeight - 20;

    if (currentScroll > heroBottom && !navHidden) {
        navbar.classList.add("nav-hidden");
        showNavBtn.classList.add("visible");
        navHidden = true;
    }

    if (currentScroll <= heroBottom && navHidden) {
        navbar.classList.remove("nav-hidden");
        showNavBtn.classList.remove("visible");
        navHidden = false;
    }
});

showNavBtn.addEventListener("click", () => {
    navbar.classList.remove("nav-hidden");
    showNavBtn.classList.remove("visible");
    navHidden = false;
    scrollUpDistance = 0;
});

//Smooth scroll when anchors are clicked (sometimes the CSS doesn't work as expected, so this is a fallback)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href").slice(1);
      const targetElement = document.getElementById(targetId);
  
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
