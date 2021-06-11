/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _script__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./script */ "./src/js/script.js");
/* harmony import */ var _script__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_script__WEBPACK_IMPORTED_MODULE_0__);


/***/ }),

/***/ "./src/js/script.js":
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

function createCircleChart(index, percent, color, size, stroke) {
  let svg = `<svg class="mkc_circle-chart" viewbox="0 0 36 36" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
        <path class="mkc_circle-bg" stroke="#7E8385" stroke-width="${stroke * 0.5}" fill="none" d="M18 2.0845
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
    chart.querySelector(".mkc_circle").setAttribute("stroke-dasharray", value + ", 100");
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
    chart.innerHTML = createCircleChart(i + 1, chart.dataset.percent, "#FF5F01", 64, 1);
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
  activateSliderButtons(); //Contact form

  const form = document.querySelector(".contact-form form");
  let inputsRequired = form.querySelectorAll(".contact-form .required input");
  inputsRequired.forEach(input => {
    input.addEventListener("keyup", function () {
      if (input.value.length > 0) {
        input.nextElementSibling.style.display = "none";
      } else {
        input.nextElementSibling.style.display = "inline";
      }
    });
  });
});

/***/ })

/******/ });
//# sourceMappingURL=script.js.map