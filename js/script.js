const sections = document.querySelectorAll(".section");
const dots = document.querySelectorAll(".side-navigation .dot");

let currentSection = 0;
let isScrolling = false;

let touchStartY = 0;

const SWIPE_THRESHOLD = 20;
const SCROLL_LOCK_TIME = 800;


/* =========================================
   UPDATE ACTIVE DOT
========================================= */

function updateActiveDot() {

    dots.forEach((dot, index) => {
        dot.classList.toggle(
            "active",
            index === currentSection
        );
    });
}


/* =========================================
   FIND CURRENT SECTION
========================================= */

function updateCurrentSection() {

    let closest = 0;
    let smallestDistance = Infinity;

    sections.forEach((section, index) => {

        const distance = Math.abs(
            section.getBoundingClientRect().top
        );

        if (distance < smallestDistance) {

            smallestDistance = distance;
            closest = index;

        }
    });

    currentSection = closest;

    updateActiveDot();
}


/* =========================================
   GO TO SECTION
========================================= */

function goToSection(index) {

    if (index < 0 || index >= sections.length) {
        return;
    }

    if (isScrolling) {
        return;
    }

    isScrolling = true;

    currentSection = index;

    updateActiveDot();

    sections[index].scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    setTimeout(() => {

        isScrolling = false;

        updateCurrentSection();

    }, SCROLL_LOCK_TIME);
}


/* =========================================
   TOUCH START
========================================= */

window.addEventListener("touchstart", (event) => {

    if (window.innerWidth > 768) {
        return;
    }

    touchStartY = event.touches[0].clientY;

}, { passive: true });


/* =========================================
   TOUCH END
========================================= */

window.addEventListener("touchend", (event) => {

    if (window.innerWidth > 768) {
        return;
    }

    if (isScrolling) {
        return;
    }

    const touchEndY =
        event.changedTouches[0].clientY;

    const difference =
        touchStartY - touchEndY;


    /* Swipe UP */

    if (difference > SWIPE_THRESHOLD) {

        goToSection(currentSection + 1);

        return;
    }


    /* Swipe DOWN */

    if (difference < -SWIPE_THRESHOLD) {

        goToSection(currentSection - 1);
    }

}, { passive: true });


/* =========================================
   MOUSE WHEEL
========================================= */

window.addEventListener("wheel", (event) => {

    if (window.innerWidth > 768) {
        return;
    }

    if (isScrolling) {
        event.preventDefault();
        return;
    }

    if (Math.abs(event.deltaY) < 15) {
        return;
    }

    event.preventDefault();


    if (event.deltaY > 0) {

        goToSection(currentSection + 1);

    } else {

        goToSection(currentSection - 1);

    }

}, { passive: false });


/* =========================================
   MANUAL SCROLL
========================================= */

window.addEventListener("scroll", () => {

    if (!isScrolling) {

        updateCurrentSection();

    }

});


/* =========================================
   CLICK ON RIGHT DOT
========================================= */

dots.forEach((dot, index) => {

    dot.addEventListener("click", (event) => {

        event.preventDefault();

        goToSection(index);

    });

});


/* =========================================
   INITIAL STATE
========================================= */

updateCurrentSection();
