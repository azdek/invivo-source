import $ from "jquery";
import Axios from "axios";
import { addToBasket } from "./header";

const $result = $(".search__result");

const createElem = ({ name, price, id }) => {
  return `
    <li class="search__item" data-name="${name}" data-id="${id}" data-price="${price}">
      <a href="#" class="search__item--name">${name}</a>
      <div class="search__item--price">${price} руб.</div>
      <img class="search__item--icon" src="img/icons/add.svg" />
    </li>
  `;
};

const handleSearch = async () => {
  // AJAX search Array[{id, name, price}]
  $result.empty();
  const value = $("#search").val();
  if (!value) {
    $result.removeClass("open");
    return;
  }

  const { data = [], status } = await Axios({
    url: "uploads/data.json",
    method: "get",
  });

  if (status === 200) {
    if (data.length) {
      $result.addClass("open");
      data.forEach((el) => {
        $result.append(createElem(el));
      });
    } else {
      $result.removeClass("open");
    }
  }
};

export default () => {
  $(".popup__news--close").click(() => {
    $(".popup__news").removeClass("open");
  });

  $(".search .icon").on("click", handleSearch);

  $(document).on("click", ".search__item--icon", function (e) {
    const $searchItem = $(this).closest(".search__item");
    addToBasket($searchItem.data());
  });
  $(document).on("click", function (e) {
    if (!$(e.target).closest(".search").length) {
      $(".search__result").removeClass("open");
    }
  });
};
