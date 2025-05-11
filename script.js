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