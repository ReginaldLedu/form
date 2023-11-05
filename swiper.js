let position = 0;
counter = 0;
const slidesToScroll = 1;
const containerSlider = document.querySelector(".slider-container");
const track = document.querySelector(".slider-track");
const btnPrev = document.querySelector(".swiper-button-prev");
const btnNext = document.querySelector(".swiper-button-next");
const itemCount = document.querySelectorAll(".hero").length;
const items = document.querySelectorAll(".hero");
const itemWidth = 300;
//const itemWidth = containerSlider.clientWidth / slidesToShow;
const slidesToShow = Math.floor(track.parentElement.style.width / itemWidth);
const movePosition = slidesToScroll * itemWidth;

items.forEach((item) => {
  if (itemWidth < 300) {
    item.style.minWidth = `350px`;
  } else {
    item.style.minWidth = `${itemWidth}px`;
  }
});

btnNext.addEventListener("click", (event) => {
  const currentItemCount = document.querySelectorAll(".hero").length;
  console.log(currentItemCount);
  counter++;
  if (counter >= currentItemCount) {
    event.preventDefault();
  } else {
    console.log("works");
    console.log(slidesToShow);
    const itemLeft =
      itemCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;
    position -=
      itemLeft >= slidesToScroll ? movePosition : itemLeft * itemWidth;
    setPosition();
    checkBtns();
  }
});

btnPrev.addEventListener("click", () => {
  console.log("works");
  const itemLeft = Math.abs(position) / itemWidth;
  position += itemLeft >= slidesToScroll ? movePosition : itemLeft * itemWidth;
  setPosition();
  checkBtns();
});

const setPosition = () => {
  track.style.transform = `translateX(${position}px)`;
};

const checkBtns = () => {
  btnPrev.disabled = position === 0;
  btnNext.disabled = position <= -(itemCount - slidesToShow) * itemWidth;
};
checkBtns();
