let position = 0;
counter = 0;
const slidesToScroll = 1;
const containerSlider = document.querySelector(".gallery-slider-container");
if (containerSlider !== null) {
  const track = document.querySelector(".gallery-slider-track");
  const btnPrev = document.querySelector(".gallery-swiper-button-prev");
  const btnNext = document.querySelector(".gallery-swiper-button-next");
  const itemCount = document.querySelectorAll(".gallery-swiper-slide").length;
  const items = document.querySelectorAll(".gallery-swiper-slide");
  const itemWidth = 360;
  //const itemWidth = containerSlider.clientWidth / slidesToShow;
  const slidesToShow = Math.floor(track.parentElement.style.width / itemWidth);
  const movePosition = slidesToScroll * itemWidth;

  items.forEach((item) => {
    if (itemWidth < 300) {
      item.style.minWidth = `360px`;
    } else {
      item.style.minWidth = `${itemWidth}px`;
    }
  });

  btnNext.addEventListener("click", (event) => {
    const itemLeft =
      itemCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;
    if (position > -6120) {
      position -=
        itemLeft >= slidesToScroll ? movePosition : itemLeft * itemWidth;
      setPosition();
      checkBtns();
    } else {
      position = 360;
    }
  });

  btnPrev.addEventListener("click", () => {
    console.log("works");
    const itemLeft = Math.abs(position) / itemWidth;
    position +=
      itemLeft >= slidesToScroll ? movePosition : itemLeft * itemWidth;
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
}
