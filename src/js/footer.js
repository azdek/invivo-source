import $ from "jquery";

export default () => {
  $("#to_top").click(() => {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
  });
};
