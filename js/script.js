const sections = document.querySelectorAll(".section");

let currentSection = 0;
let isScrolling = false;

let touchStartY = 0;
let touchEndY = 0;

const SWIPE_THRESHOLD = 15;
const SCROLL_LOCK_TIME = 650;


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
}


function goToSection(index) {

    if (index < 0 || index >= sections.length) return;
    if (isScrolling) return;

    isScrolling = true;
    currentSection = index;

    sections[index].scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    setTimeout(() => {
        isScrolling = false;
    }, SCROLL_LOCK_TIME);
}


/* ---------- TOUCH SWIPE ---------- */

window.addEventListener("touchstart", (event) => {

    if (window.innerWidth > 768) return;

    touchStartY = event.touches[0].clientY;

}, { passive: true });


window.addEventListener("touchend", (event) => {

    if (window.innerWidth > 768) return;
    if (isScrolling) return;

    touchEndY = event.changedTouches[0].clientY;

    const difference = touchStartY - touchEndY;


    /* свайп вверх */

    if (difference > SWIPE_THRESHOLD) {

        goToSection(currentSection + 1);

        return;
    }


    /* свайп вниз */

    if (difference < -SWIPE_THRESHOLD) {

        goToSection(currentSection - 1);
    }

}, { passive: true });


/* ---------- MOUSE WHEEL ---------- */

window.addEventListener("wheel", (event) => {

    if (window.innerWidth > 768) return;
    if (isScrolling) return;

    if (Math.abs(event.deltaY) < 10) return;

    event.preventDefault();


    if (event.deltaY > 0) {

        goToSection(currentSection + 1);

    } else {

        goToSection(currentSection - 1);
    }

}, { passive: false });


/* ---------- MANUAL SCROLL ---------- */

window.addEventListener("scroll", () => {

    if (!isScrolling) {
        updateCurrentSection();
    }

});
