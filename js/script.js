/* =========================================
   MAIN SECTIONS
========================================= */

const sections = document.querySelectorAll(".section");
const dots = document.querySelectorAll(".side-navigation .dot");

let currentSection = 0;
let isScrolling = false;

let touchStartY = 0;
let touchStartX = 0;

const SWIPE_THRESHOLD = 35;
const SCROLL_LOCK_TIME = 700;



/* =========================================
   ABOUT SLIDER
========================================= */

const aboutPages = document.querySelector(".about-pages");

const aboutPrev = document.querySelector(".about-prev");
const aboutNext = document.querySelector(".about-next");

const aboutDots = document.querySelectorAll(".about-dot");

let currentAboutPage = 0;



/* =========================================
   UPDATE ABOUT
========================================= */

function updateAboutSlider() {

    if (!aboutPages) {
        return;
    }

    aboutPages.style.transform =
        `translateX(-${currentAboutPage * 50}%)`;


    aboutDots.forEach((dot, index) => {

        dot.classList.toggle(
            "active",
            index === currentAboutPage
        );

    });

}



/* =========================================
   GO TO ABOUT PAGE
========================================= */

function goToAboutPage(index) {

    if (index < 0) {
        index = 0;
    }

    if (index > 1) {
        index = 1;
    }

    currentAboutPage = index;

    updateAboutSlider();
}



/* =========================================
   ABOUT PREVIOUS
========================================= */

if (aboutPrev) {

    aboutPrev.addEventListener(
        "click",
        () => {

            goToAboutPage(
                currentAboutPage - 1
            );

        }
    );

}



/* =========================================
   ABOUT NEXT
========================================= */

if (aboutNext) {

    aboutNext.addEventListener(
        "click",
        () => {

            goToAboutPage(
                currentAboutPage + 1
            );

        }
    );

}



/* =========================================
   ABOUT DOTS
========================================= */

aboutDots.forEach(
    (dot, index) => {

        dot.addEventListener(
            "click",
            () => {

                goToAboutPage(index);

            }
        );

    }
);



/* =========================================
   CURRENT MAIN SECTION
========================================= */

function updateCurrentSection() {

    let closestIndex = 0;
    let smallestDistance = Infinity;


    sections.forEach(
        (section, index) => {

            const rect =
                section.getBoundingClientRect();


            const distance =
                Math.abs(
                    rect.top
                );


            if (
                distance <
                smallestDistance
            ) {

                smallestDistance =
                    distance;

                closestIndex =
                    index;

            }

        }
    );


    currentSection =
        closestIndex;


    updateDots();
}



/* =========================================
   UPDATE MAIN DOTS
========================================= */

function updateDots() {

    dots.forEach(
        (dot, index) => {

            dot.classList.toggle(
                "active",
                index === currentSection
            );

        }
    );
}



/* =========================================
   GO TO MAIN SECTION
========================================= */

function goToSection(index) {

    if (
        index < 0 ||
        index >= sections.length
    ) {
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


    setTimeout(
        () => {

            isScrolling = false;

            updateCurrentSection();

        },
        SCROLL_LOCK_TIME
    );
}



/* =========================================
   MAIN DOT CLICK
========================================= */

dots.forEach(
    (dot, index) => {

        dot.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                goToSection(index);

            }
        );

    }
);



/* =========================================
   TOUCH START
========================================= */

window.addEventListener(
    "touchstart",
    (event) => {

        if (
            window.innerWidth > 768
        ) {
            return;
        }


        if (isScrolling) {
            return;
        }


        touchStartY =
            event.touches[0].clientY;

        touchStartX =
            event.touches[0].clientX;

    },
    {
        passive: true
    }
);



/* =========================================
   TOUCH END
========================================= */

window.addEventListener(
    "touchend",
    (event) => {

        if (
            window.innerWidth > 768
        ) {
            return;
        }


        if (isScrolling) {
            return;
        }


        const touchEndY =
            event.changedTouches[0].clientY;

        const touchEndX =
            event.changedTouches[0].clientX;


        const differenceY =
            touchStartY - touchEndY;

        const differenceX =
            touchStartX - touchEndX;



        /*
           Если пользователь находится
           внутри About и двигает пальцем
           по горизонтали — переключаем
           About страницы.
        */

        const aboutSection =
            document.querySelector("#about");


        if (aboutSection) {

            const rect =
                aboutSection.getBoundingClientRect();


            const insideAbout =
                rect.top <= window.innerHeight / 2 &&
                rect.bottom >= window.innerHeight / 2;


            if (
                insideAbout &&
                Math.abs(differenceX) >
                Math.abs(differenceY) &&
                Math.abs(differenceX) >
                SWIPE_THRESHOLD
            ) {

                if (differenceX > 0) {

                    goToAboutPage(
                        currentAboutPage + 1
                    );

                } else {

                    goToAboutPage(
                        currentAboutPage - 1
                    );

                }

                return;
            }
        }



        /*
           Обычный вертикальный swipe
        */

        if (
            Math.abs(differenceY) <
            SWIPE_THRESHOLD
        ) {
            return;
        }


        if (differenceY > 0) {

            goToSection(
                currentSection + 1
            );

        } else {

            goToSection(
                currentSection - 1
            );

        }

    },
    {
        passive: true
    }
);



/* =========================================
   MOUSE WHEEL
========================================= */

window.addEventListener(
    "wheel",
    (event) => {

        if (
            window.innerWidth <= 768
        ) {
            return;
        }


        if (isScrolling) {
            return;
        }


        if (
            Math.abs(event.deltaY) <
            10
        ) {
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
    {
        passive: true
    }
);



/* =========================================
   NORMAL SCROLL
========================================= */

let scrollTimer;


window.addEventListener(
    "scroll",
    () => {

        clearTimeout(scrollTimer);


        scrollTimer =
            setTimeout(
                () => {

                    if (!isScrolling) {

                        updateCurrentSection();

                    }

                },
                80
            );

    },
    {
        passive: true
    }
);



/* =========================================
   START
========================================= */

updateCurrentSection();

updateAboutSlider();
