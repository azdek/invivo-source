import $ from "jquery";
import Axios from "axios";

const openLocation = () => {
  $(".mid").css("display", "none");
  $(".mid__open").css("display", "flex");
};

const closeLocation = () => {
  $(".mid").css("display", "flex");
  $(".mid__open").css("display", "none");
};

const closeHeaderPopups = () => {
  $(".popups__item").removeClass("open");
};

const openContacts = () => {
  closeHeaderPopups();
  $(".popups__contacts").addClass("open");
};

const openBasket = () => {
  closeHeaderPopups();
  $(".popups__basket").addClass("open");
};

const openNavigation = () => {
  closeLocation();
  closeHeaderPopups();
  $("header").addClass("open");
};

const closeNavigation = () => {
  $("header").removeClass("open");
};

const scrollToMap = () => {
  $("html, body").animate({ scrollTop: $(".map").offset().top }, "slow");
  return false;
};

export default () => {
  $(".mid").click(openLocation);
  $(".mid__open--close").click(closeLocation);
  $(".popups .phones").click(openContacts);
  $(".popups .basket").click(openBasket);
  $(".popups__item--close").click(closeHeaderPopups);
  $(".hamburger").click(openNavigation);
  $(".navigation__close").click(closeNavigation);
  $(".to_maps").click(scrollToMap);
  $(".basket__clear").click(clearBasket);
  $(".basket__total--amount button").click(handlePay);
};

export const addToBasket = ({ name, price, id }) => {
  const $list = $(".basket__list");
  $list.append(`
    <div class="basket__item" data-name="${name}" data-id="${id}" data-price="${price}">
      <div class="name">${name}</div>
      <div class="price">${price} руб.</div>
      <img src="img/icons/tick.svg" alt="">
    </div>
  `);
  handleBudgeCounter($(".basket__list .basket__item").length);
  reduceBasketSum();
};

export const clearBasket = () => {
  console.log("clearBasket");
  $(".basket__list").html("");
  $(".basket__total--amount span").html("0 руб.");
  handleBudgeCounter(0);
};

export const reduceBasketSum = () => {
  let sum = 0;
  const list = Array.from(document.querySelectorAll(".basket__item"));
  list.forEach(({ dataset }) => {
    sum += +dataset.price;
  });
  $(".basket__total--amount span").html(sum + " руб.");
};

export const handleBudgeCounter = (i) => {
  console.log("handleBudgeCounter: ", i);
  const $budge = $(".budge");
  if (+i === 0) {
    $budge.css("display", "none");
  } else {
    $budge.css("display", "flex");
    $budge.html(i);
  }
};

export const handlePay = async () => {
  const data = [];
  const list = Array.from(document.querySelectorAll(".basket__item"));
  list.forEach(({ dataset }) => {
    data.push(dataset.id);
  });
  // AJAX json Array[id]

  const { status } = await Axios({
    url: "/your-endpoint",
    method: "post",
    data,
  });

  if (status === 201) {
    clearBasket();
  }
};
