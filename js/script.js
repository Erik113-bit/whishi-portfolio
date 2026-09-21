/* =========================================
   SECTION NAVIGATION
========================================= */

const sections = Array.from(
    document.querySelectorAll(".section")
);

const dots = Array.from(
    document.querySelectorAll(".side-navigation .dot")
);


function updateSectionNavigation() {

    if (!sections.length) return;

    const scrollPosition =
        window.scrollY + window.innerHeight / 2;

    let activeIndex = 0;

    sections.forEach((section, index) => {

        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;

        if (
            scrollPosition >= top &&
            scrollPosition < bottom
        ) {
            activeIndex = index;
        }

    });

    dots.forEach((dot, index) => {

        dot.classList.toggle(
            "active",
            index === activeIndex
        );

    });
}


window.addEventListener(
    "scroll",
    updateSectionNavigation,
    { passive: true }
);

window.addEventListener(
    "resize",
    updateSectionNavigation
);

updateSectionNavigation();


/* =========================================
   ABOUT SLIDER
========================================= */

const aboutPages =
    document.querySelector(".about-pages");

const aboutDots =
    Array.from(
        document.querySelectorAll(".about-dot")
    );

const aboutPrev =
    document.querySelector(".about-prev");

const aboutNext =
    document.querySelector(".about-next");

let currentAboutPage = 0;


function getAboutPageCount() {
    return 3;
}


function updateAboutSlider() {

    if (!aboutPages) return;

    const pageCount =
        getAboutPageCount();


    if (currentAboutPage >= pageCount) {

        currentAboutPage =
            pageCount - 1;

    }


    aboutPages.style.transform =
        `translateX(-${currentAboutPage * 100}%)`;


    aboutDots.forEach((dot, index) => {

        dot.style.display =
            index < pageCount
                ? ""
                : "none";

        dot.classList.toggle(
            "active",
            index === currentAboutPage
        );

    });

}


aboutPrev?.addEventListener(
    "click",
    () => {

        currentAboutPage--;

        if (currentAboutPage < 0) {

            currentAboutPage =
                getAboutPageCount() - 1;

        }

        updateAboutSlider();

    }
);


aboutNext?.addEventListener(
    "click",
    () => {

        currentAboutPage++;

        if (
            currentAboutPage >=
            getAboutPageCount()
        ) {

            currentAboutPage = 0;

        }

        updateAboutSlider();

    }
);


aboutDots.forEach((dot, index) => {

    dot.addEventListener(
        "click",
        () => {

            if (
                index >=
                getAboutPageCount()
            ) {
                return;
            }

            currentAboutPage = index;

            updateAboutSlider();

        }
    );

});


window.addEventListener(
    "resize",
    updateAboutSlider
);

updateAboutSlider();


/* =========================================
   DEVICES SLIDER
========================================= */

const devicesPages =
    document.querySelector(".devices-pages");

const deviceDots =
    Array.from(
        document.querySelectorAll(".device-dot")
    );

const devicePrev =
    document.querySelector(".device-prev");

const deviceNext =
    document.querySelector(".device-next");

let currentDevicePage = 0;


function updateDeviceSlider() {

    if (!devicesPages) return;

    devicesPages.style.transform =
        `translateX(-${currentDevicePage * 100}%)`;


    deviceDots.forEach((dot, index) => {

        dot.classList.toggle(
            "active",
            index === currentDevicePage
        );

    });

}


devicePrev?.addEventListener(
    "click",
    () => {

        currentDevicePage--;

        if (currentDevicePage < 0) {

            currentDevicePage = 1;

        }

        updateDeviceSlider();

    }
);


deviceNext?.addEventListener(
    "click",
    () => {

        currentDevicePage++;

        if (currentDevicePage > 1) {

            currentDevicePage = 0;

        }

        updateDeviceSlider();

    }
);


deviceDots.forEach((dot, index) => {

    dot.addEventListener(
        "click",
        () => {

            currentDevicePage = index;

            updateDeviceSlider();

        }
    );

});


updateDeviceSlider();


/* =========================================
   CONTACT / CHANNELS SLIDER
========================================= */

const contactPages =
    document.querySelector(".contact-pages");

const contactDots =
    Array.from(
        document.querySelectorAll(".contact-dot")
    );

const contactPrev =
    document.querySelector(".contact-prev");

const contactNext =
    document.querySelector(".contact-next");

let currentContactPage = 0;


function updateContactSlider() {

    if (!contactPages) return;

    contactPages.style.transform =
        `translateX(-${currentContactPage * 100}%)`;


    contactDots.forEach((dot, index) => {

        dot.classList.toggle(
            "active",
            index === currentContactPage
        );

    });

}


contactPrev?.addEventListener(
    "click",
    () => {

        currentContactPage--;

        if (currentContactPage < 0) {

            currentContactPage = 1;

        }

        updateContactSlider();

    }
);


contactNext?.addEventListener(
    "click",
    () => {

        currentContactPage++;

        if (currentContactPage > 1) {

            currentContactPage = 0;

        }

        updateContactSlider();

    }
);


contactDots.forEach((dot, index) => {

    dot.addEventListener(
        "click",
        () => {

            currentContactPage = index;

            updateContactSlider();

        }
    );

});


updateContactSlider();


/* =========================================
   KEYBOARD NAVIGATION
========================================= */

document.addEventListener(
    "keydown",
    (event) => {

        const activeElement =
            document.activeElement;

        if (
            activeElement &&
            (
                activeElement.tagName === "INPUT" ||
                activeElement.tagName === "TEXTAREA" ||
                activeElement.tagName === "BUTTON"
            )
        ) {
            return;
        }


        if (event.key === "ArrowLeft") {

            if (
                document.activeElement ===
                document.body
            ) {

                currentAboutPage--;

                if (currentAboutPage < 0) {

                    currentAboutPage =
                        getAboutPageCount() - 1;

                }

                updateAboutSlider();

            }

        }


        if (event.key === "ArrowRight") {

            if (
                document.activeElement ===
                document.body
            ) {

                currentAboutPage++;

                if (
                    currentAboutPage >=
                    getAboutPageCount()
                ) {

                    currentAboutPage = 0;

                }

                updateAboutSlider();

            }

        }

    }
);


/* =========================================
   MOSCOW CLOCK
========================================= */

const moscowTime =
    document.getElementById(
        "moscow-time"
    );


function updateMoscowTime() {

    if (!moscowTime) return;


    const now = new Date();


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