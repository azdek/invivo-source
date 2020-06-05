import $ from "jquery";

const open = () => {
  $(".message").addClass("open");
};

const close = () => {
  $(".message").removeClass("open");
};

export default () => {
  $(window).scroll(function () {
    const ifDown =
      $(window).scrollTop() + $(window).height() >= $(window).height() * 1.5;
    const ifFooter =
      $(window).scrollTop() + $(window).height() >= $(document).height() - 60;
    if (ifDown) {
      open();
    } else {
      close();
    }
    if (ifFooter) {
      $(".message").css("bottom", "15%");
    } else {
      $(".message").css("bottom", "2%");
    }
  });
};
