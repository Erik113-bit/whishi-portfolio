/* =========================================
   SECTION NAVIGATION
========================================= */

const sections = Array.from(
    document.querySelectorAll(".section")
);

const sectionDots = Array.from(
    document.querySelectorAll(".side-navigation .dot")
);

let currentSection = 0;


/* =========================================
   ACTIVE SECTION
========================================= */

function updateActiveSection() {

    const scrollPosition =
        window.scrollY + window.innerHeight / 2;


    let closestSection = 0;

    let closestDistance = Infinity;


    sections.forEach((section, index) => {

        const sectionTop = section.offsetTop;

        const sectionHeight = section.offsetHeight;

        const sectionCenter =
            sectionTop + sectionHeight / 2;


        const distance =
            Math.abs(scrollPosition - sectionCenter);


        if (distance < closestDistance) {

            closestDistance = distance;

            closestSection = index;

        }

    });


    currentSection = closestSection;


    sectionDots.forEach((dot, index) => {

        dot.classList.toggle(
            "active",
            index === currentSection
        );

    });

}


/* =========================================
   SCROLL EVENT
========================================= */

window.addEventListener(
    "scroll",
    updateActiveSection,
    { passive: true }
);


/* =========================================
   INITIAL STATE
========================================= */

updateActiveSection();


/* =========================================
   SECTION DOTS
========================================= */

sectionDots.forEach((dot, index) => {

    dot.addEventListener("click", (event) => {

        event.preventDefault();


        const targetSection =
            sections[index];


        if (!targetSection) {
            return;
        }


        targetSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* =========================================
   ABOUT SLIDER
========================================= */

const aboutPages =
    document.querySelector(".about-pages");

const aboutPrev =
    document.querySelector(".about-prev");

const aboutNext =
    document.querySelector(".about-next");

const aboutDots =
    Array.from(
        document.querySelectorAll(".about-dot")
    );


let currentAboutPage = 0;

const totalAboutPages =
    aboutDots.length;


/* =========================================
   UPDATE ABOUT SLIDER
========================================= */

function updateAboutSlider() {

    if (!aboutPages) {
        return;
    }


    aboutPages.style.transform =
        `translateX(-${currentAboutPage * 100}%)`;


    aboutDots.forEach((dot, index) => {

        dot.classList.toggle(
            "active",
            index === currentAboutPage
        );

    });

}


/* =========================================
   NEXT PAGE
========================================= */

if (aboutNext) {

    aboutNext.addEventListener(
        "click",
        () => {

            currentAboutPage++;

            if (
                currentAboutPage >=
                totalAboutPages
            ) {

                currentAboutPage = 0;

            }


            updateAboutSlider();

        }
    );

}


/* =========================================
   PREVIOUS PAGE
========================================= */

if (aboutPrev) {

    aboutPrev.addEventListener(
        "click",
        () => {

            currentAboutPage--;

            if (currentAboutPage < 0) {

                currentAboutPage =
                    totalAboutPages - 1;

            }


            updateAboutSlider();

        }
    );

}


/* =========================================
   ABOUT DOTS
========================================= */

aboutDots.forEach((dot, index) => {

    dot.addEventListener(
        "click",
        () => {

            currentAboutPage = index;

            updateAboutSlider();

        }
    );

});


/* =========================================
   INITIALIZE ABOUT
========================================= */

updateAboutSlider();


/* =========================================
   KEYBOARD CONTROL
========================================= */

document.addEventListener(
    "keydown",
    (event) => {

        /*
         * About slider:
         * ← previous
         * → next
         */

        if (
            event.key === "ArrowLeft" &&
            document.activeElement !== aboutPrev
        ) {

            if (aboutPrev) {
                aboutPrev.click();
            }

        }


        if (
            event.key === "ArrowRight" &&
            document.activeElement !== aboutNext
        ) {

            if (aboutNext) {
                aboutNext.click();
            }

        }

    }
);


/* =========================================
   MOBILE TOUCH
========================================= */

let touchStartY = 0;

let touchEndY = 0;


document.addEventListener(
    "touchstart",
    (event) => {

        touchStartY =
            event.changedTouches[0].screenY;

    },
    { passive: true }
);


document.addEventListener(
    "touchend",
    (event) => {

        touchEndY =
            event.changedTouches[0].screenY;


        const difference =
            touchStartY - touchEndY;


        /*
         * Небольшое движение пальца
         * не считается свайпом.
         */

        if (Math.abs(difference) < 70) {
            return;
        }

    },
    { passive: true }
);
