const sections = document.querySelectorAll(".section");
const dots = document.querySelectorAll(".dot");

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop;

        if (scrollY >= sectionTop - 300) {
            currentSection = section.id;
        }

    });

    dots.forEach(dot => {
        dot.classList.remove("active");

        if (dot.getAttribute("href") === "#" + currentSection) {
            dot.classList.add("active");
        }
    });

});