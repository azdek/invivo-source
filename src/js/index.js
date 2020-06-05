import $ from "jquery";

import "./_card-slider-min";
import "./_nice-select-min";
import "./touchwipe.js";

import header from "./header";
import filter from "./filter";
import slider from "./slider";
import map from "./map";
import message from "./message";
import footer from "./footer";

$(function () {
  header();
  filter();
  slider();
  map();
  message();
  footer();
});
