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

        const sectionTop =
            section.offsetTop;

        const sectionHeight =
            section.offsetHeight;

        const sectionCenter =
            sectionTop + sectionHeight / 2;

        const distance =
            Math.abs(
                scrollPosition - sectionCenter
            );


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
   SCROLL
========================================= */

window.addEventListener(
    "scroll",
    updateActiveSection,
    { passive: true }
);


/* =========================================
   SECTION DOTS
========================================= */

sectionDots.forEach((dot, index) => {

    dot.addEventListener(
        "click",
        (event) => {

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

        }
    );

});


/* =========================================
   ABOUT SLIDER
========================================= */

const aboutPages =
    document.querySelector(".about-pages");

const aboutPageElements =
    Array.from(
        document.querySelectorAll(".about-page")
    );

const aboutPrev =
    document.querySelector(".about-prev");

const aboutNext =
    document.querySelector(".about-next");

const aboutDots =
    Array.from(
        document.querySelectorAll(".about-dot")
    );


let currentAboutPage = 0;


/* =========================================
   ABOUT PAGE COUNT
========================================= */

function getAboutPageCount() {

    /*
     * Телефон:
     * 1 — Обо мне
     * 2 — Мой стек
     * 3 — Инструменты
     *
     * ПК:
     * 1 — Обо мне
     * 2 — Мой стек
     */

    if (window.innerWidth <= 768) {

        return 3;

    }

    return 2;

}


/* =========================================
   UPDATE ABOUT DOTS
========================================= */

function updateAboutDots() {

    const pageCount =
        getAboutPageCount();


    aboutDots.forEach((dot, index) => {

        if (index < pageCount) {

            dot.style.display = "block";

        } else {

            dot.style.display = "none";

        }


        dot.classList.toggle(
            "active",
            index === currentAboutPage
        );

    });

}


/* =========================================
   UPDATE ABOUT SLIDER
========================================= */

function updateAboutSlider() {

    if (!aboutPages) {
        return;
    }


    const pageCount =
        getAboutPageCount();


    /*
     * Защита от выхода
     * за пределы страниц.
     */

    if (currentAboutPage < 0) {

        currentAboutPage =
            pageCount - 1;

    }


    if (currentAboutPage >= pageCount) {

        currentAboutPage = 0;

    }


    /*
     * Двигаем именно весь контейнер.
     */

    const offset =
        currentAboutPage * 100;


    aboutPages.style.transform =
        `translate3d(-${offset}%, 0, 0)`;


    updateAboutDots();

}


/* =========================================
   NEXT ABOUT PAGE
========================================= */

if (aboutNext) {

    aboutNext.addEventListener(
        "click",
        () => {

            const pageCount =
                getAboutPageCount();


            currentAboutPage++;


            if (
                currentAboutPage >=
                pageCount
            ) {

                currentAboutPage = 0;

            }


            updateAboutSlider();

        }
    );

}


/* =========================================
   PREVIOUS ABOUT PAGE
========================================= */

if (aboutPrev) {

    aboutPrev.addEventListener(
        "click",
        () => {

            const pageCount =
                getAboutPageCount();


            currentAboutPage--;


            if (currentAboutPage < 0) {

                currentAboutPage =
                    pageCount - 1;

            }


            updateAboutSlider();

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

                const pageCount =
                    getAboutPageCount();


                if (index >= pageCount) {
                    return;
                }


                currentAboutPage =
                    index;


                updateAboutSlider();

            }
        );

    }
);


/* =========================================
   RESIZE
========================================= */

window.addEventListener(
    "resize",
    () => {

        const pageCount =
            getAboutPageCount();


        if (
            currentAboutPage >=
            pageCount
        ) {

            currentAboutPage =
                pageCount - 1;

        }


        updateAboutSlider();

        updateActiveSection();

    }
);


/* =========================================
   INITIAL ABOUT
========================================= */

updateAboutSlider();


/* =========================================
   DEVICES SLIDER
========================================= */

const devicesPages =
    document.querySelector(".devices-pages");

const devicePrev =
    document.querySelector(".device-prev");

const deviceNext =
    document.querySelector(".device-next");

const deviceDots =
    Array.from(
        document.querySelectorAll(".device-dot")
    );


let currentDevicePage = 0;

const totalDevicePages =
    deviceDots.length;


/* =========================================
   UPDATE DEVICE SLIDER
========================================= */

function updateDeviceSlider() {

    if (!devicesPages) {
        return;
    }


    devicesPages.style.transform =
        `translate3d(-${currentDevicePage * 100}%, 0, 0)`;


    deviceDots.forEach(
        (dot, index) => {

            dot.classList.toggle(
                "active",
                index === currentDevicePage
            );

        }
    );

}


/* =========================================
   NEXT DEVICE
========================================= */

if (deviceNext) {

    deviceNext.addEventListener(
        "click",
        () => {

            currentDevicePage++;


            if (
                currentDevicePage >=
                totalDevicePages
            ) {

                currentDevicePage = 0;

            }


            updateDeviceSlider();

        }
    );

}


/* =========================================
   PREVIOUS DEVICE
========================================= */

if (devicePrev) {

    devicePrev.addEventListener(
        "click",
        () => {

            currentDevicePage--;


            if (currentDevicePage < 0) {

                currentDevicePage =
                    totalDevicePages - 1;

            }


            updateDeviceSlider();

        }
    );

}


/* =========================================
   DEVICE DOTS
========================================= */

deviceDots.forEach(
    (dot, index) => {

        dot.addEventListener(
            "click",
            () => {

                currentDevicePage =
                    index;

                updateDeviceSlider();

            }
        );

    }
);


/* =========================================
   INITIAL DEVICE SLIDER
========================================= */

updateDeviceSlider();


/* =========================================
   KEYBOARD CONTROL
========================================= */

document.addEventListener(
    "keydown",
    (event) => {

        /*
         * Стрелки переключают About,
         * только когда About находится
         * в центре экрана.
         */

        const aboutSection =
            document.getElementById("about");


        if (!aboutSection) {
            return;
        }


        const rect =
            aboutSection.getBoundingClientRect();


        const aboutIsVisible =
            rect.top < window.innerHeight &&
            rect.bottom > 0;


        if (!aboutIsVisible) {
            return;
        }


        if (
            event.key === "ArrowLeft"
        ) {

            if (aboutPrev) {
                aboutPrev.click();
            }

        }


        if (
            event.key === "ArrowRight"
        ) {

            if (aboutNext) {
                aboutNext.click();
            }

        }

    }
);


/* =========================================
   MOSCOW CLOCK
========================================= */

const moscowTime =
    document.getElementById("moscow-time");


function updateMoscowTime() {

    if (!moscowTime) {
        return;
    }


    const now =
        new Date();


    const time =
        new Intl.DateTimeFormat(
            "ru-RU",
            {
                timeZone: "Europe/Moscow",

                hour: "2-digit",

                minute: "2-digit",

                second: "2-digit",

                hour12: false
            }
        ).format(now);


    moscowTime.textContent =
        time;

}


updateMoscowTime();


setInterval(
    updateMoscowTime,
    1000
);