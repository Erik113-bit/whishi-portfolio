const sections = document.querySelectorAll(".section");
const dots = document.querySelectorAll(".side-navigation .dot");

let currentSection = 0;
let isScrolling = false;

let touchStartY = 0;
let touchEndY = 0;

const SWIPE_THRESHOLD = 35;
const SCROLL_LOCK_TIME = 750;


/* =========================
   FIND CURRENT SECTION
========================= */

function updateCurrentSection() {

    let closestIndex = 0;
    let smallestDistance = Infinity;

    sections.forEach((section, index) => {

        const rect = section.getBoundingClientRect();

        const distance = Math.abs(rect.top);

        if (distance < smallestDistance) {
            smallestDistance = distance;
            closestIndex = index;
        }
    });

    currentSection = closestIndex;

    updateDots();
}


/* =========================
   UPDATE DOTS
========================= */

function updateDots() {

    dots.forEach((dot, index) => {

        dot.classList.toggle(
            "active",
            index === currentSection
        );
    });
}


/* =========================
   GO TO SECTION
========================= */

function goToSection(index) {

    if (index < 0 || index >= sections.length) {
        return;
    }

    if (isScrolling) {
        return;
    }

    isScrolling = true;

    currentSection = index;

    updateDots();

    sections[index].scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    setTimeout(() => {

        isScrolling = false;

        updateCurrentSection();

    }, SCROLL_LOCK_TIME);
}


/* =========================
   DOT CLICK
========================= */

dots.forEach((dot, index) => {

    dot.addEventListener("click", (event) => {

        event.preventDefault();

        goToSection(index);
    });
});


/* =========================
   TOUCH START
========================= */

window.addEventListener(
    "touchstart",
    (event) => {

        if (window.innerWidth > 768) {
            return;
        }

        if (isScrolling) {
            return;
        }

        touchStartY = event.touches[0].clientY;
    },
    { passive: true }
);


/* =========================
   TOUCH END
========================= */

window.addEventListener(
    "touchend",
    (event) => {

        if (window.innerWidth > 768) {
            return;
        }

        if (isScrolling) {
            return;
        }

        touchEndY = event.changedTouches[0].clientY;

        const difference =
            touchStartY - touchEndY;


        if (Math.abs(difference) < SWIPE_THRESHOLD) {
            return;
        }


        if (difference > 0) {

            goToSection(
                currentSection + 1
            );

        } else {

            goToSection(
                currentSection - 1
            );
        }

    },
    { passive: true }
);


/* =========================
   MOUSE WHEEL
========================= */

window.addEventListener(
    "wheel",
    (event) => {

        if (window.innerWidth <= 768) {
            return;
        }

        if (isScrolling) {
            return;
        }

        if (Math.abs(event.deltaY) < 10) {
            return;
        }

        if (event.deltaY > 0) {

            goToSection(
                currentSection + 1
            );

        } else {

            goToSection(
                currentSection - 1
            );
        }

    },
    { passive: true }
);


/* =========================
   NORMAL SCROLL
========================= */

let scrollTimer;

window.addEventListener(
    "scroll",
    () => {

        clearTimeout(scrollTimer);

        scrollTimer = setTimeout(() => {

            if (!isScrolling) {
                updateCurrentSection();
            }

        }, 80);

    },
    { passive: true }
);


/* =========================
   START
========================= */

updateCurrentSection();
