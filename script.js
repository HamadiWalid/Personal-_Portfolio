document.addEventListener("mousemove", function (e) {
  const svg = document.querySelector(".rotate-svg");
  const svgRect = svg.getBoundingClientRect();

  const svgCenterX = svgRect.left + svgRect.width / 2;
  const svgCenterY = svgRect.top + svgRect.height / 2;

  const angle =
    Math.atan2(e.clientY - svgCenterY, e.clientX - svgCenterX) *
    (180 / Math.PI);

  svg.style.transform = `rotate(${angle}deg)`;
});

document.addEventListener("mousemove", function (e) {
  const element = document.querySelector(".tr");
  const cursorX = e.clientX;
  const cursorY = e.clientY;

  const rect = element.getBoundingClientRect();
  const elementX = rect.left + rect.width / 2;
  const elementY = rect.top + rect.height / 2;

  const deltaX = cursorX - elementX;
  const deltaY = cursorY - elementY;
  const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

  element.style.transform = `translate(1000px, 200px) rotate(${angle}deg)`;
});

const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");

window.addEventListener("mousemove", function (e) {
  const posX = e.clientX;
  const posY = e.clientY;
  cursorDot.style.left = `${posX}px`;
  cursorDot.style.top = `${posY}px`;
  //  cursorOutline.style.left = `${posX}px`;
  // cursorOutline.style.top = `${posY}px`;

  cursorOutline.animate(
    { left: `${posX}px`, top: `${posY}px` },
    { duration: 500, fill: "forwards" }
  );
});

//txttype
var TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName("typewrite");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-type");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
  document.body.appendChild(css);
};

//Langage

document.addEventListener("DOMContentLoaded", () => {
  const langButtons = document.querySelectorAll(".language-btn");

  langButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const lang = button.getAttribute("data-lang");
      changeLanguage(lang);

      // Toggle button visibility
      toggleLanguageButtons(lang);
    });
  });

  function changeLanguage(lang) {
    const translatableElements = document.querySelectorAll("[data-en]");

    translatableElements.forEach((element) => {
      if (
        element.tagName.toLowerCase() === "input" &&
        element.hasAttribute("placeholder")
      ) {
        element.placeholder = element.dataset[lang];
      } else if (
        element.tagName.toLowerCase() === "a" &&
        element.hasAttribute("data-href-en")
      ) {
        element.href = element.getAttribute(`data-href-${lang}`);
        element.download = element.getAttribute(`data-download-${lang}`);
        element.textContent = element.dataset[lang];
      } else {
        element.textContent = element.dataset[lang];
      }
    });
  }

  function toggleLanguageButtons(lang) {
    const enButton = document.getElementById("enBtn");
    const frButton = document.getElementById("frBtn");

    if (lang === "fr") {
      enButton.style.display = "none";
      frButton.style.display = "inline-block";
    } else {
      enButton.style.display = "inline-block";
      frButton.style.display = "none";
    }
  }
});
