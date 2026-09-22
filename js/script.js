(() => {
    "use strict";


    /* =====================================================
       MOSCOW CLOCK
    ====================================================== */

    const moscowTime =
        document.getElementById("moscow-time");


    function updateMoscowTime() {

        if (!moscowTime) {
            return;
        }


        const now = new Date();


        const formatter =
            new Intl.DateTimeFormat(
                "ru-RU",
                {
                    timeZone: "Europe/Moscow",

                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",

                    hour12: false
                }
            );


        moscowTime.textContent =
            formatter.format(now);

    }


    updateMoscowTime();


    window.setInterval(
        updateMoscowTime,
        1000
    );


    /* =====================================================
       GENERIC SLIDER
    ====================================================== */

    function createSlider({
        name,
        trackSelector,
        controlsSelector,
        counterSelector
    }) {

        const track =
            document.querySelector(
                trackSelector
            );


        const controls =
            document.querySelector(
                controlsSelector
            );


        const counter =
            document.querySelector(
                counterSelector
            );


        if (
            !track ||
            !controls
        ) {
            return null;
        }


        const pages =
            Array.from(
                track.children
            );


        if (
            pages.length === 0
        ) {
            return null;
        }


        const previousButton =
            controls.querySelector(
                '[data-action="prev"]'
            );


        const nextButton =
            controls.querySelector(
                '[data-action="next"]'
            );


        const dots =
            Array.from(
                controls.querySelectorAll(
                    ".slider-dot"
                )
            );


        let currentIndex = 0;


        /* ==============================================
           UPDATE UI
        ============================================== */

        function updateUI() {

            const total =
                pages.length;


            track.style.transform =
                `translate3d(
                    -${currentIndex * 100}%,
                    0,
                    0
                )`;


            pages.forEach(
                (
                    page,
                    index
                ) => {

                    page.classList.toggle(
                        "is-active",
                        index === currentIndex
                    );

                }
            );


            dots.forEach(
                (
                    dot,
                    index
                ) => {

                    const isActive =
                        index === currentIndex;


                    dot.classList.toggle(
                        "active",
                        isActive
                    );


                    dot.setAttribute(
                        "aria-selected",
                        String(isActive)
                    );

                }
            );


            if (counter) {

                counter.textContent =
                    `PAGE ${currentIndex + 1}/${total}`;

            }


            /*
             * Намеренно НЕ зацикливаем.
             * На первой странице ← отключена.
             * На последней → отключена.
             * Это исключает ощущение неправильного направления.
             */

            if (previousButton) {

                previousButton.disabled =
                    currentIndex === 0;

            }


            if (nextButton) {

                nextButton.disabled =
                    currentIndex === total - 1;

            }

        }


        /* ==============================================
           GO TO PAGE
        ============================================== */

        function goTo(index) {

            const safeIndex =
                Math.max(
                    0,
                    Math.min(
                        index,
                        pages.length - 1
                    )
                );


            currentIndex =
                safeIndex;


            updateUI();

        }


        /* ==============================================
           PREVIOUS
        ============================================== */

        previousButton?.addEventListener(
            "click",
            () => {

                if (
                    currentIndex <= 0
                ) {
                    return;
                }


                goTo(
                    currentIndex - 1
                );

            }
        );


        /* ==============================================
           NEXT
        ============================================== */

        nextButton?.addEventListener(
            "click",
            () => {

                if (
                    currentIndex >=
                    pages.length - 1
                ) {
                    return;
                }


                goTo(
                    currentIndex + 1
                );

            }
        );


        /* ==============================================
           DOTS
        ============================================== */

        dots.forEach(
            (dot) => {

                dot.addEventListener(
                    "click",
                    () => {

                        const index =
                            Number(
                                dot.dataset.index
                            );


                        if (
                            Number.isNaN(index)
                        ) {
                            return;
                        }


                        goTo(index);

                    }
                );

            }
        );


        /* ==============================================
           TOUCH SWIPE
        ============================================== */

        let startX = 0;
        let startY = 0;

        let isTouching = false;


        track.parentElement?.addEventListener(
            "touchstart",
            (event) => {

                const touch =
                    event.changedTouches[0];


                if (!touch) {
                    return;
                }


                startX =
                    touch.clientX;


                startY =
                    touch.clientY;


                isTouching = true;

            },
            {
                passive: true
            }
        );


        track.parentElement?.addEventListener(
            "touchend",
            (event) => {

                if (!isTouching) {
                    return;
                }


                isTouching = false;


                const touch =
                    event.changedTouches[0];


                if (!touch) {
                    return;
                }


                const deltaX =
                    touch.clientX -
                    startX;


                const deltaY =
                    touch.clientY -
                    startY;


                const horizontal =
                    Math.abs(deltaX) >
                    Math.abs(deltaY);


                const enough =
                    Math.abs(deltaX) >= 50;


                /*
                 * Меняем страницу только тогда,
                 * когда движение реально горизонтальное.
                 *
                 * Поэтому вертикальный свайп страницы
                 * больше не ломает направление слайдера.
                 */

                if (
                    !horizontal ||
                    !enough
                ) {
                    return;
                }


                if (deltaX < 0) {

                    goTo(
                        currentIndex + 1
                    );

                } else {

                    goTo(
                        currentIndex - 1
                    );

                }

            },
            {
                passive: true
            }
        );


        /* ==============================================
           RETURN API
        ============================================== */

        updateUI();


        return {

            getIndex() {
                return currentIndex;
            },

            goTo(index) {
                goTo(index);
            },

            next() {
                goTo(
                    currentIndex + 1
                );
            },

            previous() {
                goTo(
                    currentIndex - 1
                );
            }

        };

    }


    /* =====================================================
       INIT SLIDERS
    ====================================================== */

    const aboutSlider =
        createSlider({
            name: "about",

            trackSelector:
                ".about-track",

            controlsSelector:
                '[data-slider-controls="about"]',

            counterSelector:
                ".about-counter"
        });


    const devicesSlider =
        createSlider({
            name: "devices",

            trackSelector:
                ".devices-track",

            controlsSelector:
                '[data-slider-controls="devices"]',

            counterSelector:
                ".devices-counter"
        });


    const contactSlider =
        createSlider({
            name: "contact",

            trackSelector:
                ".contact-track",

            controlsSelector:
                '[data-slider-controls="contact"]',

            counterSelector:
                ".contact-counter"
        });


    /* =====================================================
       DESKTOP KEYBOARD
    ====================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            const activeElement =
                document.activeElement;


            const tagName =
                activeElement?.tagName;


            const isTyping =
                tagName === "INPUT" ||
                tagName === "TEXTAREA" ||
                tagName === "SELECT";


            if (isTyping) {
                return;
            }


            /*
             * Стрелки клавиатуры меняют About.
             * Вертикальный скролл от этого не страдает.
             */

            if (
                event.key === "ArrowLeft"
            ) {

                event.preventDefault();


                aboutSlider?.previous();

            }


            if (
                event.key === "ArrowRight"
            ) {

                event.preventDefault();


                aboutSlider?.next();

            }

        }
    );


    /* =====================================================
       MAIN SECTION NAVIGATION
    ====================================================== */

    const sections =
        Array.from(
            document.querySelectorAll(
                ".section"
            )
        );


    const sectionDots =
        Array.from(
            document.querySelectorAll(
                ".section-nav-dot"
            )
        );


    function setActiveSection(index) {

        sectionDots.forEach(
            (
                dot,
                dotIndex
            ) => {

                dot.classList.toggle(
                    "active",
                    dotIndex === index
                );

            }
        );

    }


    sectionDots.forEach(
        (
            dot,
            index
        ) => {

            dot.addEventListener(
                "click",
                (event) => {

                    event.preventDefault();


                    if (
                        !sections[index]
                    ) {
                        return;
                    }


                    sections[index].scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });


                    setActiveSection(
                        index
                    );

                }
            );

        }
    );


    /* =====================================================
       SECTION OBSERVER
    ====================================================== */

    if (
        "IntersectionObserver" in window
    ) {

        const observer =
            new IntersectionObserver(
                (
                    entries
                ) => {

                    let bestEntry = null;


                    entries.forEach(
                        (entry) => {

                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }


                            if (
                                !bestEntry ||
                                entry.intersectionRatio >
                                bestEntry.intersectionRatio
                            ) {

                                bestEntry =
                                    entry;

                            }

                        }
                    );


                    if (!bestEntry) {
                        return;
                    }


                    const index =
                        sections.indexOf(
                            bestEntry.target
                        );


                    if (
                        index !== -1
                    ) {

                        setActiveSection(
                            index
                        );

                    }

                },
                {
                    threshold: [
                        0.35,
                        0.55,
                        0.7
                    ]
                }
            );


        sections.forEach(
            (section) => {

                observer.observe(
                    section
                );

            }
        );

    }


    setActiveSection(0);


    /* =====================================================
       AVATAR ERROR PROTECTION
    ====================================================== */

    const avatar =
        document.querySelector(
            ".avatar-image"
        );


    if (avatar) {

        avatar.addEventListener(
            "error",
            () => {

                avatar.style.display =
                    "none";

            }
        );

    }


    /* =====================================================
       HASH NAVIGATION
    ====================================================== */

    window.addEventListener(
        "load",
        () => {

            const hash =
                window.location.hash;


            if (!hash) {
                return;
            }


            const target =
                document.querySelector(
                    hash
                );


            if (!target) {
                return;
            }


            window.setTimeout(
                () => {

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                },
                100
            );

        }
    );

})();