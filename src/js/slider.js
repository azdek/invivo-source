import $ from "jquery";

const initSlider = ({ id }) => {
  const $elem = $(id);
  const prevArrow =
    '<img class="slider__nav prev" src="img/arrows/arrow-right-secondary.svg" alt="">';
  const nextArrow =
    '<img class="slider__nav next" src="img/arrows/arrow-right-secondary.svg" alt="">';

  if (!$elem) return console.error(id + " undefined");

  const slider = $elem.cardSlider({
    slideTag: "div",
    slideClass: "slide",
  });
  $elem.prepend(prevArrow);
  $elem.append(nextArrow);

  $elem.children(".prev").click(() => {
    slider.prev();
  });
  $elem.children(".next").click(() => {
    slider.next();
  });

  $(id).touchwipe({
    wipeLeft: () => {
      slider.next();
    },
    wipeRight: () => {
      slider.prev();
    },
  });
};

export default () => {
  initSlider({
    id: "#packets_slider",
  });
  initSlider({
    id: "#actions_slider",
  });
  initSlider({
    id: "#news_slider",
  });
};
