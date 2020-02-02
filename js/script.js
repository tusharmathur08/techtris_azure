$(function() {
  let t = sessionStorage.getItem("userdata");
  let tmp1 = JSON.parse(t);

  if (window.location.href.indexOf("/index.html") < 0) {
    window.location.href = "/index.html";
  }

  if (tmp1 !== null) {
    $(".userlogout").removeClass("non");
    $(".userlogin").addClass("non");
  } else {
    $(".userlogout").addClass("non");
    $(".userlogin").removeClass("non");
  }
});

$(function() {
  $("#team-members").owlCarousel({
    items: 2,
    autoplay: true,
    smartSpeed: 700,
    loop: true,
    autoplayHoverPause: true,
    nav: true,
    dots: false,
    navText: [
      '<i class="fa fa-angle-left"></i>',
      '<i class="fa fa-angle-right"></i>'
    ],
    responsive: {
      0: {
        items: 1
      },
      480: {
        items: 2
      }
    }
  });
});
$(function() {
  $("#progress-elements").waypoint(
    function() {
      $(".progress-bar").each(function() {
        $(this).animate(
          {
            width: $(this).attr("aria-valuenow") + "%"
          },
          1000
        );
      });
      this.destroy();
    },
    {
      offset: "bottom-in-view"
    }
  );
});

$(function() {
  $("#service-tabs").responsiveTabs({
    animation: "slide"
  });
});
$(function() {
  $(".counter").counterUp({
    delay: 10,
    time: 2000
  });
});

$(function() {
  if ($(window).scrollTop() > 50) {
    $("nav").addClass("white-nav-top");
  } else {
    $("nav").removeClass("white-nav-top");
  }
  $(window).scroll(function() {
    showHideNav();
  });

  function showHideNav() {
    if ($(window).scrollTop() > 50) {
      $("nav").addClass("white-nav-top");
      $("#back-to-up").fadeIn();
    } else {
      $("nav").removeClass("white-nav-top");
      $("#back-to-up").fadeOut();
    }
  }
});
$(function() {
  $("a.smooth-scroll").click(function() {
    event.preventDefault();
    var section_id = $(this).attr("href");
    $("html,body").animate(
      {
        scrollTop: $(section_id).offset().top - 74
      },
      1250,
      "easeInOutExpo"
    );
  });
});
$(function() {
  new WOW().init();
});
$(window).on("load", function() {
  $("#home-heading-1").addClass("animated fadeInDown");
  $("#home-text").addClass("animated zoomIn");
  $("#home-btn").addClass("animated zoomIn");
  $("#arrow-down i").addClass("animated fadeInDown infinite");
});
$(function() {
  $("#mobile-nav-open-btn").click(function() {
    $("#mobile-nav").css("height", "100%");
  });
});
$(function() {
  $("#mobile-nav-close-btn,#mobile-nav a").click(function() {
    $("#mobile-nav").css("height", "0%");
  });
});
$(function() {
  $(".btn-open").click(function() {
    $("#products").css("display", "block");
  });
});
$(function() {
  $(".tap").click(function() {
    $(".search").css("display", "none");
    $(".amount").css("display", "block");
  });
});
