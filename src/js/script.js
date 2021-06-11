function createCircleChart(index, percent, color, size, stroke) {
  let svg = `<svg class="mkc_circle-chart" viewbox="0 0 36 36" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
        <path class="mkc_circle-bg" stroke="#7E8385" stroke-width="${
          stroke * 0.5
        }" fill="none" d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"/>
        <path class="mkc_circle" stroke="${color}" stroke-width="${stroke}" stroke-dasharray="${percent},100" stroke-linecap="round" fill="none"
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831" />
        <text class="mkc_info" x="50%" y="50%" alignment-baseline="central" text-anchor="middle" font-size="9">${index}</text>
    </svg>`;
  return svg;
}

window.addEventListener("DOMContentLoaded", function () {
  function activateSliderButtons() {
    sliderButtons.children[0].addEventListener("click", changeSlidePrev);
    sliderButtons.children[1].addEventListener("click", changeSlideNext);
  }
  function deactivateSliderButtons() {
    sliderButtons.children[0].removeEventListener("click", changeSlidePrev);
    sliderButtons.children[1].removeEventListener("click", changeSlideNext);
  }

  function setChartValue(value = 0) {
    const chart = sliderCharts[activeSlide];
    chart
      .querySelector(".mkc_circle")
      .setAttribute("stroke-dasharray", value + ", 100");
  }
  function slideTimerAdd() {
    slideTimerValue += 1;
    if (slideTimerValue < 100) {
      setChartValue(slideTimerValue);
    } else {
      slideTimerValue = 0;
      setChartValue(slideTimerValue);
      changeSlide();
    }
  }

  function changeSlide(outTime, inTime, mode = true) {
    function fadeOut() {
      if (opacity > 0) {
        opacity--;
        slides[activeSlide].style.opacity = opacity / 100;
      } else {
        slides[activeSlide].style.opacity = "unset";
        slides[activeSlide].classList.remove("active");

        if (mode) {
          if (activeSlide >= slides.length - 1) {
            activeSlide = 0;
          } else {
            activeSlide++;
          }
        } else {
          if (activeSlide > 0) {
            activeSlide--;
          } else {
            activeSlide = slides.length - 1;
          }
        }

        slides[activeSlide].classList.add("active");

        inInterval = setInterval(fadeIn, inTime);
        clearInterval(outInterval);
      }
    }
    function fadeIn() {
      if (opacity >= 100) {
        opacity = 100;
        slides[activeSlide].style.opacity = 1;
        clearInterval(inInterval);
        slideTimer = setInterval(slideTimerAdd, 70);
        slidingNow = false;
        activateSliderButtons();
      } else {
        opacity++;
        slides[activeSlide].style.opacity = opacity / 100;
      }
    }

    deactivateSliderButtons();
    clearInterval(slideTimer);
    slideTimerValue = 0;
    setChartValue(slideTimerValue);
    let inInterval = null;
    let outInterval = setInterval(fadeOut, outTime);
  }
  function changeSlidePrev() {
    changeSlide(5, 5, false);
  }
  function changeSlideNext() {
    changeSlide(5, 5, true);
  }

  let opacity = 100;
  let slideTimerValue = 0;
  let slideTimer = setInterval(slideTimerAdd, 70);

  const slides = document.querySelectorAll(".slide");
  let activeSlide = 0;
  slides[activeSlide].classList.add("active");

  const sliderControllers = document.querySelector(".slider__charts");
  let sliderCharts;
  for (let i = 0; i < slides.length; i++) {
    const chart = document.createElement("div");
    chart.setAttribute("data-percent", 0);
    chart.classList.add("slider__chart");

    chart.innerHTML = createCircleChart(
      i + 1,
      chart.dataset.percent,
      "#FF5F01",
      64,
      1
    );
    sliderControllers.append(chart);
    sliderCharts = document.querySelectorAll(".slider__chart");
  }

  sliderControllers.addEventListener("mouseover", function (event) {
    const target = event.target;
    if (target && target.classList.contains("slider__chart")) {
      clearInterval(slideTimer);
    }
  });
  sliderControllers.addEventListener("mouseout", function (event) {
    const target = event.target;
    if (target && target.classList.contains("slider__chart")) {
      clearInterval(slideTimer);
      slideTimer = setInterval(slideTimerAdd, 70);
    }
  });

  const sliderButtons = document.querySelector(".slider__chevrons");
  activateSliderButtons();

  //Contact form
  const form = document.querySelector(".contact-form form");
  let inputsRequired = form.querySelectorAll(".contact-form .required input");
  inputsRequired.forEach((input) => {
    input.addEventListener("keyup", function () {
      if (input.value.length > 0) {
        input.nextElementSibling.style.display = "none";
      } else {
        input.nextElementSibling.style.display = "inline";
      }
    });
  });
});
