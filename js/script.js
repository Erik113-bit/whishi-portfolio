/* =========================================
   AVATAR PATH FALLBACK
========================================= */

const avatarImage =
  document.querySelector(".hero-image img");

if (avatarImage) {

  const avatarSources = [
    "./images/Wishi.png",
    "./images/Whishi.png",
    "./images/wishi.png"
  ];

  let avatarIndex =
    avatarSources.indexOf(
      avatarImage.getAttribute("src")
    );

  if (avatarIndex < 0) {
    avatarIndex = 0;
  }

  avatarImage.addEventListener(
    "error",
    () => {

      avatarIndex += 1;

      if (
        avatarIndex <
        avatarSources.length
      ) {

        avatarImage.src =
          avatarSources[avatarIndex];

      }

    }
  );

}

(() => {
  "use strict";


  /* =========================================
     MAIN SECTION NAVIGATION
  ========================================= */

  const sections = Array.from(
    document.querySelectorAll(".section")
  );

  const sideDots = Array.from(
    document.querySelectorAll(
      ".side-navigation .dot"
    )
  );

  const mobileProgress = Array.from(
    document.querySelectorAll(
      ".mobile-progress span"
    )
  );


  function setActiveSection(index) {

    sideDots.forEach((dot, i) => {

      dot.classList.toggle(
        "active",
        i === index
      );

    });


    mobileProgress.forEach((bar, i) => {

      bar.style.background =
        i === index
          ? "#fff"
          : "#555660";

      bar.style.height =
        i === index
          ? "23px"
          : "15px";

    });

  }


  sideDots.forEach((dot, index) => {

    dot.addEventListener(
      "click",
      (event) => {

        event.preventDefault();

        if (!sections[index]) {
          return;
        }

        sections[index].scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }
    );

  });


  /* =========================================
     SECTION OBSERVER
  ========================================== */

  if ("IntersectionObserver" in window) {

    const sectionObserver =
      new IntersectionObserver(

        (entries) => {

          const visible =
            entries

              .filter(
                (entry) =>
                  entry.isIntersecting
              )

              .sort(
                (a, b) =>
                  b.intersectionRatio -
                  a.intersectionRatio
              )[0];


          if (!visible) {
            return;
          }


          const index =
            sections.indexOf(
              visible.target
            );


          if (index !== -1) {
            setActiveSection(index);
          }

        },

        {
          threshold: [
            0.55,
            0.7,
            0.85
          ]
        }

      );


    sections.forEach(
      (section) =>
        sectionObserver.observe(section)
    );

  }


  setActiveSection(0);


  /* =========================================
     REUSABLE SLIDER
  ========================================== */

  function initSlider({
    rootSelector,
    prevSelector,
    nextSelector
  }) {

    const root =
      document.querySelector(
        rootSelector
      );


    if (!root) {
      return null;
    }


    const track =
      root.querySelector(
        ".slider-pages"
      );


    const pages =
      Array.from(
        root.querySelectorAll(
          ".slider-page"
        )
      );


    const navigation =
      root.parentElement?.querySelector(
        ".slider-navigation"
      );


    const dots =
      navigation
        ? Array.from(
            navigation.querySelectorAll(
              ".slider-dot"
            )
          )
        : [];


    const prevButton =
      document.querySelector(
        prevSelector
      );


    const nextButton =
      document.querySelector(
        nextSelector
      );


    if (
      !track ||
      pages.length === 0
    ) {

      return null;

    }


    let current = 0;


    /* ---------- render ---------- */

    function render() {

      current =
        Math.max(
          0,
          Math.min(
            current,
            pages.length - 1
          )
        );


      track.style.transform =
        `translate3d(
          -${current * 100}%,
          0,
          0
        )`;


      dots.forEach(
        (dot, index) => {

          const active =
            index === current;


          dot.classList.toggle(
            "active",
            active
          );


          dot.setAttribute(
            "aria-selected",
            String(active)
          );

        }
      );

    }


    /* ---------- go to page ---------- */

    function goTo(index) {

      current =
        (index + pages.length) %
        pages.length;


      render();

    }


    /* ---------- buttons ---------- */

    prevButton?.addEventListener(
      "click",
      () => {

        goTo(
          current - 1
        );

      }
    );


    nextButton?.addEventListener(
      "click",
      () => {

        goTo(
          current + 1
        );

      }
    );


    /* ---------- dots ---------- */

    dots.forEach(
      (dot, index) => {

        dot.addEventListener(
          "click",
          () => {

            goTo(index);

          }
        );

      }
    );


    /* =========================================
       TOUCH SWIPE
    ========================================== */

    let touchStartX = 0;
    let touchStartY = 0;


    root.addEventListener(
      "touchstart",
      (event) => {

        const touch =
          event.changedTouches[0];


        touchStartX =
          touch.clientX;


        touchStartY =
          touch.clientY;

      },
      {
        passive: true
      }
    );


    root.addEventListener(
      "touchend",
      (event) => {

        const touch =
          event.changedTouches[0];


        const deltaX =
          touch.clientX -
          touchStartX;


        const deltaY =
          touch.clientY -
          touchStartY;


        /* Ignore vertical movement */

        if (
          Math.abs(deltaX) < 45 ||
          Math.abs(deltaX) <
            Math.abs(deltaY)
        ) {

          return;

        }


        if (deltaX < 0) {

          goTo(
            current + 1
          );

        } else {

          goTo(
            current - 1
          );

        }

      },
      {
        passive: true
      }
    );


    render();


    return {

      next: () =>
        goTo(current + 1),

      prev: () =>
        goTo(current - 1)

    };

  }


  /* =========================================
     ABOUT SLIDER
  ========================================== */

  const aboutSlider =
    initSlider({

      rootSelector:
        ".about-slider",

      prevSelector:
        ".about-prev",

      nextSelector:
        ".about-next"

    });


  /* =========================================
     DEVICES SLIDER
  ========================================== */

  initSlider({

    rootSelector:
      ".devices-slider",

    prevSelector:
      ".device-prev",

    nextSelector:
      ".device-next"

  });


  /* =========================================
     CONTACT SLIDER
  ========================================== */

  initSlider({

    rootSelector:
      ".contact-slider",

    prevSelector:
      ".contact-prev",

    nextSelector:
      ".contact-next"

  });


  /* =========================================
     KEYBOARD CONTROLS
  ========================================== */

  document.addEventListener(
    "keydown",
    (event) => {

      const tag =
        document.activeElement?.tagName;


      const typing =
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT";


      if (
        typing ||
        !aboutSlider
      ) {

        return;

      }


      if (
        event.key ===
        "ArrowRight"
      ) {

        aboutSlider.next();

      }


      if (
        event.key ===
        "ArrowLeft"
      ) {

        aboutSlider.prev();

      }

    }
  );


  /* =========================================
     MOSCOW CLOCK
  ========================================== */

  const moscowTime =
    document.getElementById(
      "moscow-time"
    );


  function updateMoscowTime() {

    if (!moscowTime) {
      return;
    }


    const now =
      new Date();


    const formatter =
      new Intl.DateTimeFormat(
        "ru-RU",
        {

          timeZone:
            "Europe/Moscow",

          hour:
            "2-digit",

          minute:
            "2-digit",

          second:
            "2-digit",

          hour12:
            false

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

})();