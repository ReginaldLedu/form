import "./style-burg.css";
import "./burger.js";
//import "./swipeTouch.js";
import "./form.js";
import "./form.css";
import "./gallery-slider.js";

const heroes = document.querySelectorAll(".hero__title");

const heroesBox = document.querySelector(".heroes__box");
if (heroesBox !== null) {
  const userHero = heroesBox.querySelector(".heroes__fromUser");
  const heroCont = heroesBox.querySelector(".heroes");
  const helpBox = heroCont.querySelector(".help");
  const allHeroesInHeroCont = heroCont.querySelectorAll(".hero");
  console.log(helpBox);
  const helpButton = document.querySelectorAll(".help__button");
  const content = document.querySelector(".content");
  const container = document.querySelector(".container");
  const heroWrapper = document.querySelector(".wrapper");

  let position = 0;
  let counter = 1;
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

  const allHeroes = [
    "машенька",
    "минни маус",
    "микки маус",
    "роза барбоскина",
    "кеша (мимимишки)",
    "свинка пеппа",
    "карамелька",
    "пчелка (куклы лол)",
    "единорожка (куклы лол)",
    "симка (фиксики)",
    "нолик (фиксики)",
    "эльза (холодное сердце)",
    "анна (холодное сердце)",
    "олаф (холодное сердце)",
    "пираты",
    "леди баг",
    "пони радуга",
    "рарити единорог",
    "ариэль (русалочка)",
    "жасмин принцесса",
    "рапунцель",
    "аленка (сказочный патруль)",
    "маршал (щенячий патруль)",
    "скай (щенячий патруль)",
    "молния маквин",
    "железный человек",
    "бамблби",
    "гарри поттер",
    "гермиона",
    "человек-паук",
    "тик-ток ведущая",
    "ютуб ведущий",
    "лунтик",
    "тролль розочка",
    "феечка",
    "игра в кальмара",
    "малефисента",
    "уэнсдей",
  ];

  const searchBox = document.querySelector(".hero__search");
  const buttonFind = document.querySelector(".heroes__find");

  /*поиск персонажа*/
  function heroFind() {
    counter = 1;
    position = 0;
    checkBtns();
    const previous = document.querySelectorAll(".suggest");
    if (previous !== null) {
      previous.forEach((item) => (item.textContent = ""));
    }
    heroes.forEach((item) =>
      item.parentElement.classList.replace("hidden", "hero")
    );
    allHeroesInHeroCont.forEach((item) =>
      item.parentElement.classList.replace("hidden", "heroes")
    );
    heroWrapper.style.height = `470px`;
    const filteredData = allHeroes.filter((item) =>
      item.startsWith(userHero.value.toLowerCase())
    );

    if (userHero.value.length === 0) {
      alert("Введите название персонажа");
    }
    if (filteredData.length === 0) {
      heroWrapper.style.height = "0px";
      btnNext.style.height = "0px";
      btnPrev.style.height = "0px";
    }
    if (filteredData.length !== 0) {
      console.log(filteredData);
      for (let i = 0; i < heroes.length; i++) {
        if (filteredData.includes(heroes[i].textContent.toLowerCase())) {
        } else {
          heroes[i].parentElement.classList.replace("hero", "hidden");
        }
      }
    }
  }
  btnNext.addEventListener("click", (event) => {
    const currentItemCount = document.querySelectorAll(".hero").length;
    console.log(currentItemCount);
    counter++;
    if (counter > currentItemCount) {
      counter = 1;
      position = 0;
      const itemLeft =
        itemCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;
      position -=
        itemLeft >= slidesToScroll ? movePosition : itemLeft * itemWidth;
      setPosition();
      checkBtns();
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

  function suggestedHeroRemove() {
    const suggest = document.querySelector(".suggest");
    if (suggest !== null) {
      suggest.remove();
    }
  }
  buttonFind.addEventListener("click", heroFind);
  userHero.addEventListener("blur", suggestedHeroRemove);

  items.forEach((item) => {
    if (itemWidth < 300) {
      item.style.minWidth = `300px`;
    } else {
      item.style.minWidth = `${itemWidth}px`;
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
    btnNext.style.height = "25px";
    btnPrev.style.height = "25px";
  };
  checkBtns();
}

/*отрисовка формы заказа*/
