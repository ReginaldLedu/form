let slider = document.querySelector(".wrapper");
let sliderList = slider.querySelector(".slider-container");
let sliderTrack = slider.querySelector(".slider-track");
let slides = slider.querySelectorAll(".hero");
let arrowL = document.querySelector(".swiper-button-prev");
let arrowR = document.querySelector(".swiper-button-next");
let slideWidth = slides[0].offsetWidth;
let slideIndex = 0;
let posInit = 0;
let posX1 = 0;
let posX2 = 0;
let posY1 = 0;
let posY2 = 0;
let posFinal = 0;
let isSwipe = false;
let isScroll = false;
let allowSwipe = true;
let transition = true;
let nextTrf = 0;
let prevTrf = 0;
let lastTrf = --slides.length * slideWidth;
let posThreshold = slides[0].offsetWidth * 0.35;
let trfRegExp = /([-0-9.]+(?=px))/;
let swipeStartTime;
let swipeEndTime;
function getEvent(event) {
  if (event.type.search("touch") !== -1) {
    return event.touches[0];
  } else {
    return event;
  }
}

function slide() {
  if (transition) {
    sliderTrack.style.transition = "transform .5s";
  }
  sliderTrack.style.transform = `translate3d(-${
    slideIndex * slideWidth
  }px, 0px, 0px)`;

  prev.classList.toggle("disabled", slideIndex === 0);
  next.classList.toggle("disabled", slideIndex === --slides.length);
}
function swipeStart() {
  let evt = getEvent();

  if (allowSwipe) {
    transition = true;

    nextTrf = (slideIndex + 1) * -slideWidth;
    prevTrf = (slideIndex - 1) * -slideWidth;

    posInit = posX1 = evt.clientX;
    posY1 = evt.clientY;

    sliderTrack.style.transition = "";

    document.addEventListener("touchmove", swipeAction);
    document.addEventListener("mousemove", swipeAction);
    document.addEventListener("touchend", swipeEnd);
    document.addEventListener("mouseup", swipeEnd);

    sliderList.classList.remove("grab");
    sliderList.classList.add("grabbing");
  }
}
function swipeAction() {
  let evt = getEvent();
  console.log(evt);
  style = sliderTrack.style.transform;
  transform = +style.match(trfRegExp)[0];

  posX2 = posX1 - evt.clientX;
  posX1 = evt.clientX;

  posY2 = posY1 - evt.clientY;
  posY1 = evt.clientY;

  // определение действия свайп или скролл
  if (!isSwipe && !isScroll) {
    let posY = Math.abs(posY2);
    if (posY > 7 || posX2 === 0) {
      isScroll = true;
      allowSwipe = false;
    } else if (posY < 7) {
      isSwipe = true;
    }
  }

  if (isSwipe) {
    // запрет ухода влево на первом слайде
    if (slideIndex === 0) {
      if (posInit < posX1) {
        setTransform(transform, 0);
        return;
      } else {
        allowSwipe = true;
      }
    }

    // запрет ухода вправо на последнем слайде
    if (slideIndex === --slides.length) {
      if (posInit > posX1) {
        setTransform(transform, lastTrf);
        return;
      } else {
        allowSwipe = true;
      }
    }

    // запрет протаскивания дальше одного слайда
    if (
      (posInit > posX1 && transform < nextTrf) ||
      (posInit < posX1 && transform > prevTrf)
    ) {
      reachEdge();
      return;
    }

    // двигаем слайд
    sliderTrack.style.transform = `translate3d(${
      transform - posX2
    }px, 0px, 0px)`;
  }
}
function swipeEnd() {
  posFinal = posInit - posX1;

  isScroll = false;
  isSwipe = false;

  document.removeEventListener("touchmove", swipeAction);
  document.removeEventListener("mousemove", swipeAction);
  document.removeEventListener("touchend", swipeEnd);
  document.removeEventListener("mouseup", swipeEnd);

  sliderList.classList.add("grab");
  sliderList.classList.remove("grabbing");

  if (allowSwipe) {
    if (Math.abs(posFinal) > posThreshold) {
      if (posInit < posX1) {
        slideIndex--;
      } else if (posInit > posX1) {
        slideIndex++;
      }
    }

    if (posInit !== posX1) {
      allowSwipe = false;
      slide();
    } else {
      allowSwipe = true;
    }
  } else {
    allowSwipe = true;
  }
}
(setTransform = function (transform, comapreTransform) {
  if (transform >= comapreTransform) {
    if (transform > comapreTransform) {
      sliderTrack.style.transform = `translate3d(${comapreTransform}px, 0px, 0px)`;
    }
  }
  allowSwipe = false;
}),
  (reachEdge = function () {
    transition = false;
    swipeEnd();
    allowSwipe = true;
  });

sliderTrack.style.transform = "translate3d(0px, 0px, 0px)";
sliderList.classList.add("grab");

sliderTrack.addEventListener("transitionend", () => (allowSwipe = true));
slider.addEventListener("touchstart", swipeStart);
slider.addEventListener("mousedown", swipeStart);

arrowL.addEventListener("click", function (event) {
  let target = event.target;

  if (target.classList.contains("next")) {
    slideIndex++;
  } else if (target.classList.contains("prev")) {
    slideIndex--;
  } else {
    return;
  }

  slide();
});

arrowR.addEventListener("click", function (event) {
  let target = event.target;

  if (target.classList.contains("next")) {
    slideIndex++;
  } else if (target.classList.contains("prev")) {
    slideIndex--;
  } else {
    return;
  }

  slide();
});
