$(document).ready(function() {
  let a = [];
  let i = 1;
  var api = "http://morning-cliffs-75850.herokuapp.com/food-items";
  let link;
  var t = sessionStorage.getItem("userdata");
  let tmp1 = JSON.parse(t);
  console.log(tmp1);

  if (tmp1 == null) {
    a[0] = {};
  } else {
    a[0] = {
      user_id: tmp1.user_id,
      username: tmp1.username,
      password: tmp1.password,
      email: tmp1.email,
      area: tmp1.area
    };
  }
  console.log(a);

  $(".cart-link").on("click", function() {
    if (tmp1 == null) {
      alert("please login");
    } else {
      $(".cart-link")[0].href = "./cart.html";
      $(".cart-link")[1].href = "./cart.html";
    }
  });

  $.getJSON(api, function(data) {
    console.log(data);
    let html = "";
    for (let i = 0; i < data.length; i++) {
      link = "./css/img/del.jpeg";
      html +=
        "<div class='col-6 mx-auto my-0 store-item sweets'>" +
        "<div class='card'>" +
        "<div class='img-container'>" +
        " <img class='card-img-top store-img' src=" +
        link +
        ">" +
        "<span id='cart' class='store-item-icon'>" +
        "<i class='fa fa-shopping-cart'>" +
        "</i>" +
        "</span>" +
        "</div>" +
        "<div class='card-body'>" +
        "<div class='card-text justify-content-between text-capitalize'>" +
        "<h5 id='store-item-name'>" +
        data[i].item_name +
        "</h5>" +
        "<p class='sname'>" +
        data[i].shop_name +
        "</p>" +
        "<h5 class='store-item-value'>" +
        "Rs. " +
        "<strong id='store-item-price' class='font-weight-bold'>" +
        data[i].item_price +
        "</strong>" +
        "</h5>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>";

      console.log(data[0].item_price);
    }

    $("#store-items").html(html);
  });

  let Img, Name, Price, Shop;

  $(".cart-show #item-count").html(a.length - 1);
  $("ul #item-count").html(a.length - 1);
  // $(".cart-show #item-count").html("af");

  // $("window").on("load", function() {
  var temp = sessionStorage.getItem("example");
  var d = $.parseJSON(temp);

  if (d != null) {
    for (let index = 1; index < d.length; index++) {
      a.push(d[i]);
    }
    $(".cart-show #item-count").html(a.length - 1);
    $("ul #item-count").html(a.length - 1);
  }
  $("#store-items ").on("click", function(e) {
    if (tmp1 == null) {
      alert("please Login First!");
    } else {
      if (e.target.classList.contains("fa-shopping-cart")) {
        Img = e.target.parentElement.previousElementSibling.src;
        Name =
          e.target.parentElement.parentElement.nextElementSibling.children[0]
            .children[0].textContent;
        Price =
          e.target.parentElement.parentElement.nextElementSibling.children[0]
            .children[2].textContent;
        Shop =
          e.target.parentElement.parentElement.nextElementSibling.children[0]
            .children[1].textContent;
        Img = Img.slice(Img.indexOf("img"));

        Price = Price.slice(4);
        a.push({
          item_id: i,
          shop_id: 1,
          shop_name: Shop,
          img: Img,
          item_name: Name,
          item_price: Price
        });
        i++;
        console.log(a);
        $(".cart-show #item-count").html(a.length - 1);
        $("ul #item-count").html(a.length - 1);
        // $(".item-total").html(a.length - 1);

        sessionStorage.setItem("example", JSON.stringify(a));

        $.ajax({
          type: "POST",
          url: "https://morning-cliffs-75850.herokuapp.com/set-order",
          data: a,
          contentType: "json",
          processData: false,
          success: function(data) {
            console.log(data);

            // $("#save_message").html(data.message);
          },
          error: function(err) {
            console.log(err);

            // $("#save_message").html(data.message);
          }
        });
      }
    }
  });
});
